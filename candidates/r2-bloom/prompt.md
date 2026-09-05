# Build a finished browser mini-game: **Bloom**

Deliver **one file — `index.html`** — in the working directory, and nothing else. It is opened by
double-clicking it from disk in a clean, offline browser profile. Plan, build, then test and fix it
yourself; you get no follow-up instructions.

## 1. The game

A garden on a grid. A few cells are marked as **buds**. You get a small handful of seeds — fewer than you
would like — and you plant them wherever you like. Then you press **Grow**, and the garden runs Conway's
Game of Life. You win if, at any single generation before the clock runs out, **every bud is alive at
once**. You never touch the garden again after planting; the whole game is choosing where the seeds go.

Puzzle golf on a cellular automaton: two lines of rules, and a solution space nobody can hold in their head.

## 2. Rules — implement exactly these, they are the specification

- **Grid.** Bounded, 12x12 up to 16x16. Everything outside it is permanently dead — no wrapping.
- **Life.** B3/S23 on all eight neighbours: three live neighbours births a dead cell, two or three keeps a
  live one alive, everything else dies. Step into a fresh buffer, never in place.
- **Planting.** Click or tap a cell to toggle a seed. A level allows **at most N seeds** (the par) and
  marks some cells **stone** — stone can never be seeded but takes part in Life normally. Seeding is
  refused, visibly, when you are out of seeds or the cell is stone.
- **Growing.** Grow runs about four generations a second up to the level's limit. Step advances one.
  Pause holds. Reset returns to your planting with the seeds intact, so you can adjust one cell rather
  than start over — one click, and it matters.
- **Winning.** The instant one generation has every bud alive at once, freeze the board and celebrate.
  Extra live cells elsewhere are fine.
- **Losing.** The limit passes without that happening. Never just say "failed" — report the best moment
  ("best: 3 of 4 buds, at generation 11") and offer Retry with the seeds still in place.
- **Score.** Seeds used and generations taken, fewer better, with a per-level best.
- **Hint.** Reveals one cell of the reference solution at a marked score penalty. Cap it, show how many
  remain, and never reveal a cell already planted. Scale the cap to the size of the solution — a level
  needing ten precise cells cannot be hinted with three.

**Design every level backwards, and this is not optional:** choose a legal seed of at most N cells, run
your own Life forward, and take a subset of the live cells at some generation G as the buds. That
guarantees solvability, hands you the generation limit (a comfortable margin above G) and hands you the
reference solution the Hint needs. Then verify each level by running its reference solution through the
**shipped** game logic. Never ship a level you have not seen solved. Delete scratch files afterwards.

**Six levels** in this teaching order — you invent the exact boards:
1. Three buds in a row, two seeds spare. A blinker does it — teaches planting and Grow.
2. Buds a glider must travel to. Teaches that patterns move.
3. Buds reachable only if two small patterns collide.
4. Stone appears and blocks the obvious route.
5. A tight par: exactly the seeds needed, none spare.
6. The finale — a longer run, two clusters arriving in step.

Keep the back half winnable by someone who does not already know Life patterns. If a level needs a
precise multi-cell construction, its hints must be able to get a stuck player there.

## 3. Screens and states — all of them must exist and be reachable

Title (name, one-line hook, Play, How to play, Levels) → How to play (the two Life rules as three tiny
animated CSS grids, not a wall of text) → Level select (locked levels visibly locked, best score or an
em-dash when never played) → Planting → Growing → Paused → Solved (seeds, generations, best,
Next / Retry) → Out of generations (best-moment report, Retry / Back) → All levels complete (a real
ending screen). A status bar during play shows level, seeds left, generation of limit, and buds lit.

## 4. Controls

Pointer, touch and keyboard all complete. Use **pointer events** so dragging across cells to plant several
works the same with a finger and a mouse; `touch-action: none` on the board. Keyboard: arrows move a
visible cursor, Enter or Space toggles a seed, G grows, S steps, R resets, H hints, Esc pauses. Every
action also has a visible on-screen button, and every shortcut is listed where the player can find it.
Tap targets at least 44px.

## 5. Hard technical constraints

- One file, all CSS and JS inline. No build step.
- **Zero network**: no CDN, web fonts, images, audio files, `fetch`/`XMLHttpRequest`/WebSocket or
  `import`, and no `http://` or `https://` URL anywhere. System font stack.
- **No `<script type="module">`** — modules are blocked under `file://`. One plain inline script.
- Every graphic drawn in code: CSS, DOM, inline SVG. The grid is a CSS Grid of elements, not a canvas —
  it stays crisp, responsive and accessible.
- Stop the generation clock on pause, win, loss and every screen change. A leaked timer is the classic
  way this game breaks.
- **Zero console errors or warnings** in a whole playthrough.
- Persist progress in `localStorage` under one namespaced key, every access wrapped in `try`/`catch`.
  Storage can be unavailable or throw under `file://`; the game must stay **fully playable**, falling
  back to memory. Treat malformed or foreign stored data as absent.
- No audio unless it is generated WebAudio behind a toggle that starts **off** and cannot throw.

## 6. Design and accessibility — this is scored

One palette in CSS custom properties: dark soil, one luminous hue for living cells, stone flat and muted,
and buds outlined so a lit bud and an unlit bud differ in **shape as well as colour**. **The board is the
screen the player never leaves — give it real contrast.** An empty cell must read clearly against the
soil and an unplanted seed must be obvious at 375px, or the mechanic you are selling is invisible. Cells
scale in as they are born and fade as they die, both dropped under reduced motion.

- Responsive 320px to 1920px, never a horizontal scroll. At 375x667 the whole game fits without the page
  scrolling. On a wide screen use the width — board beside the status and controls, not a phone-shaped
  column stranded in the middle.
- `prefers-reduced-motion: reduce` drops every transition and animation and keeps every state change.
- Real `<button>`s, visible focus outlines, an ARIA live region for refusals, milestones, wins and losses.
  Modals trap Tab and leave the background out of the tab order.
- Do not let the win overlay cover the board. The player just engineered that pattern; let them see it.

## 7. Verify before you declare it finished

If you can drive a browser, open the file from `file://`, read the console and play it. If you cannot,
re-read the finished file top to bottom and trace each path by hand. Either way, walk these and fix what
you find:

1. First load, empty storage: no `undefined`, no `NaN`, no empty boxes.
2. Every screen reachable, every button does something.
3. Every level solved by its reference solution inside the shipped game.
4. Life is right: a blinker has period 2, a block sits still, a glider travels diagonally and dies cleanly
   at the wall.
5. Refusals: stone, zero seeds left, planting during Grow.
6. Grow with nothing planted; Reset mid-grow; Step past the limit; pause, resume, leave and return with no
   timer still running.
7. Reload mid-game, then reload with storage disabled.
8. 375x667 and 1440x900: nothing clipped, overlapping or scrolling sideways.
9. Re-read for undeclared variables, use-before-definition, and listeners added in a loop.

## 8. Before you stop

Two things decide whether this shipped, and neither shows in the code: **every level was designed
backwards from a seed you actually ran forward, and you watched that seed win inside the finished
build.** If either is untrue of any level, the game is broken however good it looks. Fix it, then stop.
