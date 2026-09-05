# Build a finished browser mini-game: **Paradox Loop**

Deliver **one file — `index.html`** — in the working directory, and nothing else. It is opened by
double-clicking it from disk in a clean, offline browser profile. Plan, build, then test and fix it
yourself; you get no follow-up instructions.

## 1. The game

A turn-based puzzle on a small grid. The room needs more hands than you have, so you borrow your own past.

Every action you take is recorded. Press **Rewind** and the room snaps back to its starting state — but a
**ghost** now stands on the start tile and replays your just-finished attempt, one recorded action per
turn, while you play a fresh attempt beside it. Rewind again and there are two ghosts. The level is solved
when **you** — never a ghost — stand on an open exit.

## 2. Rules — implement exactly these, they are the specification

- **Grid.** Rectangular, no larger than 9×7. Tile kinds: floor, wall, start, exit, pressure plate, door.
  Every plate and every door carries one of two colours; a door is **open** while at least one plate of its
  colour is occupied by any body (you or a ghost), and shut otherwise.
- **Turns.** One input = one turn. Move orthogonally one tile, or wait. Bodies never share a tile and never
  push each other. Moving into a wall, a shut door or an occupied tile is **refused**: the tile flashes, the
  turn is *not* consumed, and nothing is recorded. Everything resolves in one order every turn: your action
  first, then each ghost in the order it was created.
- **Ghosts.** A ghost replays its recording literally. If its next recorded move is blocked it **waits that
  turn** and keeps the rest of its recording — it never re-plans, never vanishes, never causes an error.
  When a ghost's recording runs out it stands still forever.
- **Loop.** Each level sets a turn limit per loop and a **loop limit (par)**. Hitting the turn limit ends
  the loop automatically, exactly as if Rewind were pressed. Rewinding when no loops remain is refused with
  a clear message; the only way on is Restart level.
- **Win / lose.** Standing on an open exit wins immediately. Running out of loops loses; offer *Retry* and
  *Back to levels*, never a dead end.
- **Score.** Loops used vs par, and total turns across all loops. Lower is better. Keep a per-level best.

**Six levels, hand-designed, in this teaching order** — you invent the exact layouts:
1. walk to the exit; no plate, par 1 — teaches movement.
2. the exit door needs a plate you must stand on — impossible alone, teaches Rewind.
3. two plates of the same colour hold one door — needs two ghosts.
4. a door that shuts again when a plate is released — teaches timing, not just presence.
5. a corridor where a careless ghost blocks your own route — teaches planning around yourself.
6. both colours, par 3 — the finale.

**Prove every level is solvable within its par and turn limit before you finish.** Write a short throwaway
solver or search in your head, play each one through, and adjust the layout or the limits until it works.
Do not ship a level you have not solved. Delete any scratch files afterwards.

**Also prove every level actually requires what it teaches**: check that the exit is *not* reachable while
ignoring the doors. A level whose exit can be walked to without ever opening a door is a broken level, even
though a solver will happily report it solvable.

## 3. Controls

Arrow keys or WASD to move, Space to wait, Enter to Rewind, Backspace to restart the level, Esc for the
pause menu. Every one of those also exists as a visible on-screen button, so the whole game is playable by
touch alone. Swipes on the grid move too. Tap targets at least 44px.

## 4. Screens and states — all of them must exist and be reachable

Title (name, one-line hook, Play, How to play, Levels) → How to play (three short illustrated-in-CSS steps,
no wall of text) → Level select (locked levels visibly locked, best score or an em-dash when never played)
→ Playing → Paused → Level complete (turns, loops, par, best, Next / Retry) → Out of loops → All levels
complete (a real ending screen with the total). A persistent status bar during play shows level, turn
limit remaining, loops remaining and a ghost count.

## 5. Hard technical constraints

- Exactly one file: `index.html`, with all CSS and JS inline in it.
- **Zero network.** No CDN, no web fonts, no images, no audio files, no `fetch`/`XMLHttpRequest`/WebSocket,
  no `import`. Do not reference any `http://` or `https://` URL anywhere. Use a system font stack.
- **No `<script type="module">`** — modules are blocked under `file://`. One plain inline script.
- All graphics drawn in code: CSS, DOM and inline SVG. Build the grid as a CSS Grid of elements, not a
  canvas — it stays crisp, responsive and accessible. Sparing emoji are fine; no other characters as art.
- **Zero console errors or warnings** during a whole playthrough.
- Persist best scores and progress in `localStorage` under one namespaced key, every access wrapped in
  `try`/`catch`. Under `file://` storage can be unavailable or throw — the game must stay **fully
  playable** in that case, silently falling back to in-memory state. Treat malformed or foreign stored
  data as absent rather than trusting it.
- No audio by default. If you add sound, make it generated WebAudio behind a toggle that is **off** until
  the player turns it on, and never let it throw.

## 6. Design and accessibility — this is scored

One coherent dark palette driven by CSS custom properties: a deep desaturated background, one bright
accent for you, a clearly different warm hue for ghosts at reduced opacity so the timeline reads at a
glance, and unmistakable colour **plus shape** difference between the two plate/door colours so it works
for colour-blind players. Generous spacing, rounded tiles, a clear visual hierarchy, one readable size
ramp. Motion is short and purposeful.

- Responsive from 320px to 1920px. The board scales to fit; **never any horizontal scrolling**, and on a
  375×667 phone the whole game — board, status bar and controls — fits without the page scrolling.
  On a wide screen do not leave the game as a narrow phone-shaped column: give it a layout that uses the
  width, with the board beside the status and controls.
- Respect `prefers-reduced-motion: reduce`: drop every transition and animation, keep every state change.
- Real `<button>` elements, visible focus outlines, sensible labels, and an ARIA live region that announces
  turn refusals, rewinds, wins and losses. Any modal must trap Tab inside itself and leave the background
  out of the tab order.

## 7. Verify before you declare it finished

If you can run a browser or headless browser, open the file from `file://`, read the console, and play.
If you cannot, re-read your finished file top to bottom and trace each path by hand. Either way, walk all
of these and fix what you find:

1. First ever load, empty storage: no `undefined`, no `NaN`, no empty boxes on screen.
2. Every screen in section 4 reachable, and every button on it does something.
3. Each of the six levels completed within its par, and none solvable while ignoring the doors.
4. Refused moves: walk into a wall, a shut door and a ghost — turn counter must not move.
5. Rewind on turn 0; rewind with zero loops left; restart mid-loop; pause and resume mid-loop.
6. Hammer the keys during any animation — the state must not desynchronise or double-step.
7. Reload mid-game, then reload with storage disabled entirely.
8. 375×667 and 1440×900: no horizontal scroll, nothing clipped or overlapping.
9. Re-read for undeclared variables, use-before-definition, and listeners added in a loop.

## 8. Final checklist — tick every line, fix anything unticked, then stop

☐ one file `index.html`, nothing else in the directory ☐ opens from `file://` with an empty console
☐ all six levels solved, and none of them solvable with the doors ignored ☐ ghosts replay faithfully and
wait when blocked ☐ every screen and button works ☐ storage failure is survivable ☐ no horizontal scroll
at 320px and no wasted column at 1440px ☐ reduced motion respected ☐ keyboard and touch both complete
