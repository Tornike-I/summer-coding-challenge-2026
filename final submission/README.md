# Final submission — Bloom

Summer Coding Challenge 2026 (profiq), theme **MINIHRA**. One prompt, one game, one file.
Deadline **7 September 2026** · [submission form](https://docs.google.com/forms/d/e/1FAIpQLSfUiIbd515AAsc9NG3x_ryi9anWXzoKD0pJFQEomQ/viewform)

## Upload these two, exactly as they are

| | file | |
|---|---|---|
| 1 | **`prompt.md`** | 9 580 characters, under the 10 000 cap |
| 2 | **`index.html`** | 53 707 bytes, raw agent output |

**Do not open either in an editor and save.** `index.html` is the unmodified output of a single
autonomous run and must stay byte-for-byte what the agent wrote — even a stray trailing newline breaks
the rule. Both files are verified identical to `../candidates/r3-bloom/`.

## The other two form fields

- **Agent, tooling, model, settings** → paste from [`meta.md`](meta.md)
- **Short description of the app and its functionality** → paste from [`description.md`](description.md)
  (Czech first, English underneath)

## What the game is

Plant a handful of seeds on a grid, press **Grow**, and Conway's Game of Life runs. You win if at any
single generation **every marked bud is alive at once**. After planting you never touch the garden again —
the whole game is choosing where the seeds go. Six levels, each designed backwards from a verified seed so
it is guaranteed solvable.

This is the version **with the pattern primer**: a catalogue of Life's basic structures — block, beehive,
blinker, T-tetromino, glider and more — each drawn as a small grid animated by the game's own engine, so
it can never disagree with the rules. It sits on *How to play* and one tap away during play, and every
level names the pattern it wants in plain words. That was the fix for the game being hard to grasp on
first contact.

`screenshots/` shows the play screen, the primer, the how-to and the phone layout.

## Verified

`prompt.md` ≤ 10 000 chars with no source code, base64 or data URIs · `index.html` loads from `file://` in
standards mode with zero console errors or warnings · no remote URLs, no ES modules, no network calls · no
horizontal scroll at 320 / 375 / 1440 px · fully playable with `localStorage` throwing · 51-minute
unattended generation run, inside the 60-minute cap.

Full detail in [`checks.md`](checks.md). The reasoning that got here is in [`../LOG.md`](../LOG.md) and
[`../DECISIONS.md`](../DECISIONS.md); the two runner-up games and every intermediate build are in
[`../FINAL/`](../FINAL/) and [`../candidates/`](../candidates/).

## One caveat

This build was never blind-judged. Its predecessor scored **4.35** weighted, and every change since went
in a direction the judges asked for — but the primer's effect is a question of feel. **Play it once before
you upload.**
