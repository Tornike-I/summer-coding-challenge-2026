# Build a finished browser mini-game: **Districts**

Deliver **one file — `index.html`** — in the working directory, and nothing else. It is opened by
double-clicking it from disk in a clean, offline browser profile. Plan, build, then test and fix it
yourself; you get no follow-up instructions.

## 1. The game

A grid of voters, each one **Teal** or **Amber**. Teal is losing badly — outnumbered on the board. Your job
is to carve the grid into districts so that Teal *still wins the council*. Fewest votes, most seats. The
whole game is the moment a player realises how easy that is.

## 2. Rules — implement exactly these, they are the specification

- **Board.** A rectangular grid, 5×5 up to 7×7, every cell a voter of one of two colours. Fixed per level.
- **Districts.** Each level names a district count *K* that divides the cell count exactly. Every district
  must end up with **exactly** cellCount/K cells and be **orthogonally contiguous**.
- **Drawing.** You fill one district at a time. The first click on any unassigned cell starts it; after
  that you may only add a cell **orthogonally adjacent to that district**, which makes contiguity
  impossible to break. Dragging across cells adds them in sequence. When a district reaches its size it
  locks and the next one begins automatically. Undo removes the last cell added; Clear resets the board.
- **Counting.** A district is won by whichever colour holds more of its cells; an even split is a **tie**
  and counts for nobody. Show each district's tally on the board as it fills.
- **Winning.** The level is passed when every cell is assigned and Teal holds strictly more districts than
  Amber. Ties count for neither side, so a tie-heavy map can still be a loss — say so plainly.
- **The point.** On the result screen, put the popular vote and the district result side by side —
  "Amber 15 voters, Teal 10 — Teal takes the council 3–2" — so the trick is visible, not just scored.
- **Score.** Moves used, and a per-level best. Show a hint counter, not a hint that solves it for them.

**Five hand-designed levels** in this teaching order — you invent the exact boards:
1. 4×4, K=4, Teal already ahead. A gentle one that teaches drawing and contiguity.
2. 5×5, K=5, dead even. Teaches that shape decides the winner.
3. 6×6, K=6, Teal a clear minority — the first real "wait, that works?" level.
4. 6×6, K=4 with a compact Amber block that must be *packed into one district* and wasted.
5. 7×7, K=7, Teal heavily outnumbered. The finale.

**Prove every level is winnable before you finish.** Write a throwaway brute-force or randomised search,
run it, and adjust the board until it passes. Do not ship a level you have not solved. Ship no scratch
files — delete them.

## 3. Screens and states — all of them must exist and be reachable

Title (name, one-line hook, Play, How to play, Levels) → How to play (three short steps, illustrated with
real CSS cells, no wall of text) → Level select (locked levels visibly locked, best score or an em-dash
when never played) → Playing → Paused → Level solved (popular vote vs seats, moves, best, Next / Retry)
→ Board full but Teal did not win (a clear "here's why" summary, Retry / Back) → All levels complete
(a real ending screen). A persistent status bar shows level, current district, cells left in it, districts
remaining, and the live seat count.

## 4. Controls

Mouse, touch and keyboard all complete. Use **pointer events** so drag-painting works identically with a
finger and a mouse. Keyboard: arrows move a visible cursor across the grid, Enter or Space assigns the
cell, U undoes, R clears, Esc pauses. Tap targets at least 44px; the grid must be comfortable to drag on a
phone without the page scrolling underneath — set `touch-action: none` on the board.

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

One coherent palette driven by CSS custom properties. Teal and Amber must be distinguishable by **shape or
pattern as well as hue** — a dot versus a ring, say — so colour-blind players can play. District
boundaries want a thick drawn border between differing districts rather than a fill wash, so the shapes
read as regions. Generous spacing, rounded cells, one readable size ramp, a clear hierarchy.

- Responsive from 320px to 1920px. The board scales to fit; **never any horizontal scrolling**, and on a
  375×667 phone the whole game — board, status bar and controls — fits without the page scrolling.
- Respect `prefers-reduced-motion: reduce`: drop every transition and animation, keep every state change.
- Real `<button>` elements, visible focus outlines, sensible labels, and an ARIA live region announcing
  district completions, refused clicks and results.
- Keep it politically neutral: two invented colours on an abstract council. No real parties, no real places.

## 7. Verify before you declare it finished

If you can run a browser or headless browser, open the file from `file://`, read the console, and play.
If you cannot, re-read your finished file top to bottom and trace each path by hand. Either way, walk all
of these and fix what you find:

1. First ever load, empty storage: no `undefined`, no `NaN`, no empty boxes on screen.
2. Every screen in section 3 reachable, and every button on it does something.
3. Each of the five levels actually solved.
4. Refused input: click a non-adjacent cell, an already-assigned cell, and a cell after the last district
   is full. Each must be visibly refused and must not corrupt the counts.
5. Undo at the very start; undo across a district boundary; Clear mid-draw; pause and resume mid-draw.
6. Drag off the edge of the board and release outside the window — no stuck drag state.
7. Reload mid-game, then reload with storage disabled entirely.
8. 375×667 and 1440×900: no horizontal scroll, nothing clipped or overlapping.
9. Re-read for undeclared variables, use-before-definition, and listeners added in a loop.

## 8. Final checklist — tick every line, fix anything unticked, then stop

☐ one file `index.html`, nothing else in the directory ☐ no `http`/`https` reference anywhere ☐ no modules
☐ opens from `file://` with an empty console ☐ all five levels verified winnable and won ☐ districts are
always exact-size and contiguous by construction ☐ every screen and button works ☐ storage failure is
survivable ☐ no horizontal scroll at 320px ☐ reduced motion respected ☐ pointer, keyboard and touch all
complete
