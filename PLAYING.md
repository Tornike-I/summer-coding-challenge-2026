# How to open and play the games

Each game is a **single self-contained `index.html`**. There is nothing to install, build or serve — that
is the whole point of the contest. Download the repo, find the file, double-click it.

```bash
git clone <this repo>
cd summer-coding-challenge-2026
```

Then open any of these directly from disk:

| game | file |
|---|---|
| Districts, build 1 | `candidates/r1-districts/run-1/index.html` |
| Districts, build 2 | `candidates/r1-districts/run-2/index.html` |
| Bloom, build 1 | `candidates/r1-bloom/run-1/index.html` |
| Bloom, build 2 | `candidates/r1-bloom/run-2/index.html` |

On Windows, double-click the file or right-click → *Open with* → your browser. From a terminal:

```bash
start candidates/r1-districts/run-1/index.html
```

They also work if you drag the file onto an open browser window, or paste its path into the address bar.

> The two builds of each game are **independent generations from the same prompt**, not versions — that is
> the reproducibility test the contest scores. Expect the same rules and different wording, layout and
> level design between them. Play either.
>
> `candidates/r1-paradox-loop/run-1/index.html` is a **truncated file** — its agent was stopped mid-write.
> It will open to a blank page. There is no build of Paradox Loop to play.

---

## Districts

A grid of voters, each Teal or Amber. Teal is outnumbered. Carve the grid into equal, connected districts
so that Teal still takes **more districts than Amber** — winning the council on fewer votes. Five levels.
The result screen puts the popular vote next to the seat count so you can see what you just did.

**Playing.** Click or tap any unclaimed cell to start a district. After that you may only add cells
**touching that district**, so it can never end up in two pieces. Drag across cells to add several at once.
When a district reaches its required size it locks and the next one starts automatically. The level is
judged once every cell is assigned. An even split inside a district is a **tie** and counts for nobody, so
a board full of ties is still a loss.

**Controls.**

| | |
|---|---|
| Mouse / touch | Click or tap a cell to add it; drag to add a run of cells |
| Arrow keys | Move the cursor around the grid |
| `Enter` or `Space` | Add the cell under the cursor |
| `U` | Undo the last cell |
| `R` | Clear the board and start over |
| `Esc` | Pause |

On-screen buttons cover all of it: **Undo**, **Clear**, **Hint**, **Pause**. Build 2 prints the shortcut on
each button; build 1 lists them on its *How to play* screen.

**Worth trying:** level 3 is the first board where Teal genuinely cannot win on votes. Take the Amber
stronghold and pack as much of it as you can into one district you concede — then win the rest narrowly.

---

## Bloom

Puzzle golf on Conway's Game of Life. Some cells are marked as **buds**. You get a small allowance of
seeds. Plant them, press **Grow**, and the grid runs Life. You win if at any *single* generation before
the limit **every bud is alive at once**. You never touch the garden after planting — the whole game is
choosing where the seeds go. Six levels.

The two Life rules: a dead cell with exactly three live neighbours is born; a live cell with two or three
live neighbours survives; everything else dies. The grid is bounded — anything outside it is dead.

**Playing.** Click or tap cells to toggle seeds, or drag to plant several. **Stone** cells can never be
seeded, but they take part in Life like anything else. Press **Grow** to run, **Step** for one generation,
**Pause** to hold, **Reset** to return to your planting with the seeds still in place so you can adjust one
cell rather than start over. **Hint** reveals one cell of the reference solution at a score penalty.

If the generation limit runs out you get told your best moment — "3 of 4 buds, at generation 11" — which is
usually enough to see what to move.

**Controls.**

| | build 1 | build 2 |
|---|---|---|
| Mouse / touch | toggle a seed; drag to plant several | same |
| Arrow keys | move the cursor | move the cursor |
| `Enter` / `Space` | toggle the seed under the cursor | same |
| `G` / `S` / `R` / `H` | Grow / Step / Reset / Hint | — use the buttons |
| `Esc` | pause | pause |

**Worth trying:** level 2 wants a glider. Three cells in an L plus two more will walk diagonally across the
board — aim it at the buds and count the generations.

---

## If something looks wrong

Both games are fully playable on a phone; they were checked at 320, 375 and 1440 px wide with no horizontal
scrolling. They also run with `prefers-reduced-motion: reduce` (all animation drops out, every state change
stays) and they survive `localStorage` being blocked — you lose saved best scores, nothing else.

To re-run the automated checks on any build:

```bash
cd tools && npm install && npx playwright install chromium && cd ..
node tools/validate.js candidates/r1-bloom/run-1
```
