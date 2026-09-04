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

- **Grid.** Bounded, 12x12 up to 16x16. Everything outside the grid is permanently dead — no wrapping.
- **Life.** Standard B3/S23: a dead cell with exactly three live neighbours becomes alive; a live cell with
  two or three live neighbours survives; everything else dies. All eight neighbours count. Every cell
  updates simultaneously from the previous generation — compute into a new buffer, never in place.
- **Planting.** Before growing, click or tap any cell to toggle a seed. A level gives you **at most N
  seeds** (the par) and marks some cells as **stone**: stone cells can never be seeded, but they take part
  in Life normally. Seeding is refused, visibly, when you are out of seeds or the cell is stone.
- **Growing.** Grow runs generation by generation, roughly four per second, up to the level's generation
  limit. Step advances exactly one. Pause holds. Reset returns to your planting, seeds intact, so you can
  adjust rather than start over — this matters, make it one click.
- **Winning.** The instant a generation has every bud alive simultaneously, you win — freeze the board and
  celebrate. Extra live cells elsewhere are fine; the buds are the only requirement.
- **Losing.** The generation limit passes without that happening. Do not just say "failed": report the
  best moment — "best: 3 of 4 buds, at generation 11" — and offer Retry with the seeds still in place.
- **Score.** Seeds used and generations taken; fewer of each is better. Keep a per-level best.
- **Hint.** Reveals one cell of the reference solution, once per press, at a marked score penalty. Cap it,
  show how many remain, and never let it reveal a cell the player has already planted.

**Design every level backwards, and this is not optional:** pick a legal seed pattern of at most N cells,
run your own Life implementation forward, look at the live cells at some generation G, and take a subset of
them as the buds. This guarantees the level is solvable, hands you the generation limit (a comfortable
margin above G) and hands you the reference solution the Hint needs. Verify each finished level by running
its reference solution through the shipped game logic. Do not ship a level you have not seen solved.
Delete any scratch files afterwards.

**Six levels** in this teaching order — you invent the exact boards:
1. Three buds in a row, two seeds spare. Teaches planting and Grow — a blinker will do it.
2. Buds that a glider must travel to. Teaches that patterns move.
3. Buds reachable only if two small patterns collide.
4. Stone cells appear and block the obvious route.
5. A tight par: exactly the seed count needed, no spare.
6. The finale — a longer run, two clusters that must arrive in step.

## 3. Screens and states — all of them must exist and be reachable

Title (name, one-line hook, Play, How to play, Levels) → How to play (the two Life rules shown as three
tiny animated CSS grids, not a wall of text) → Level select (locked levels visibly locked, best score or an
em-dash when never played) → Planting → Growing → Paused → Solved (seeds, generations, best, Next / Retry)
→ Out of generations (best-moment report, Retry / Back) → All levels complete (a real ending screen).
A persistent status bar shows level, seeds left, generation of limit, and buds currently lit.

## 4. Controls

Mouse, touch and keyboard all complete. Use **pointer events** so dragging across cells to plant several
works identically with a finger and a mouse; set `touch-action: none` on the board. Keyboard: arrows move a
visible cursor, Enter or Space toggles a seed, G grows, S steps, R resets to your planting, Esc pauses.
Every action also exists as a visible on-screen button. Tap targets at least 44px.

## 5. Hard technical constraints

- Exactly one file: `index.html`, with all CSS and JS inline in it.
- **Zero network.** No CDN, no web fonts, no images, no audio files, no `fetch`/`XMLHttpRequest`/WebSocket,
  no `import`. Do not reference any `http://` or `https://` URL anywhere. Use a system font stack.
- **No `<script type="module">`** — modules are blocked under `file://`. One plain inline script.
- All graphics drawn in code: CSS, DOM and inline SVG. Build the grid as a CSS Grid of elements, not a
  canvas — it stays crisp, responsive and accessible. Sparing emoji are fine; no other characters as art.
- Drive the generation clock with `setInterval` or a `requestAnimationFrame` loop that you **stop** on
  pause, win, loss and screen change. No orphaned timers — leaking one is the classic way this game breaks.
- **Zero console errors or warnings** during a whole playthrough.
- Persist best scores and progress in `localStorage` under one namespaced key, every access wrapped in
  `try`/`catch`. Under `file://` storage can be unavailable or throw — the game must stay **fully
  playable** in that case, silently falling back to in-memory state. Treat malformed or foreign stored
  data as absent rather than trusting it.
- No audio by default. If you add sound, make it generated WebAudio behind a toggle that is **off** until
  the player turns it on, and never let it throw.

## 6. Design and accessibility — this is scored

One coherent palette driven by CSS custom properties — a dark soil background, one luminous hue for living
cells, a distinct outlined treatment for buds so a lit bud and an unlit bud are told apart by **shape as
well as colour**, and a flat muted stone. Living cells should feel alive: a short scale-in as they are
born, a fade as they die, both suppressed under reduced motion. Generous spacing, one readable size ramp.

- Responsive from 320px to 1920px. The board scales to fit; **never any horizontal scrolling**, and on a
  375x667 phone the whole game — board, status bar and controls — fits without the page scrolling.
- Respect `prefers-reduced-motion: reduce`: drop every transition and animation, keep every state change.
- Real `<button>` elements, visible focus outlines, sensible labels, and an ARIA live region announcing
  generation milestones, refused plantings, wins and losses.

## 7. Verify before you declare it finished

If you can run a browser or headless browser, open the file from `file://`, read the console, and play.
If you cannot, re-read your finished file top to bottom and trace each path by hand. Either way, walk all
of these and fix what you find:

1. First ever load, empty storage: no `undefined`, no `NaN`, no empty boxes on screen.
2. Every screen in section 3 reachable, and every button on it does something.
3. Each of the six levels solved by its reference solution, inside the shipped game.
4. Life is correct: a blinker oscillates with period 2, a block stays still, a glider moves diagonally and
   dies cleanly at the wall.
5. Refused input: seed a stone cell, seed with zero seeds left, plant during Grow.
6. Grow with zero seeds planted; Reset mid-grow; Step past the limit; pause, resume, leave and return —
   no timer keeps running in the background.
7. Reload mid-game, then reload with storage disabled entirely.
8. 375x667 and 1440x900: no horizontal scroll, nothing clipped or overlapping.
9. Re-read for undeclared variables, use-before-definition, and listeners added in a loop.

## 8. Final checklist — tick every line, fix anything unticked, then stop

☐ one file `index.html`, nothing else in the directory ☐ no `http`/`https` reference anywhere ☐ no modules
☐ opens from `file://` with an empty console ☐ every level designed backwards from a verified seed and
solved in the shipped build ☐ B3/S23 correct on a bounded grid ☐ no orphaned timers ☐ every screen and
button works ☐ storage failure is survivable ☐ no horizontal scroll at 320px ☐ reduced motion respected
☐ pointer, keyboard and touch all complete
