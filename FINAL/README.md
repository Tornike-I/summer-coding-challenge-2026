# FINAL — three finished games

**The contest takes one entry: one `prompt.md` and the one `index.html` it generated.** All three are
here because they were asked for. Pick one before submitting — see `REPORT.md` for which and why.

```
bloom/         prompt.md + index.html    weighted 4.35   ← highest scored
districts/     prompt.md + index.html    weighted 4.25
paradox-loop/  prompt.md + index.html    weighted 3.75
```

Each `index.html` is the **raw, hand-unedited output** of a single autonomous agent run against the
`prompt.md` sitting beside it. Verified byte-identical to the run output in `candidates/`.

## To play

Double-click any `index.html`, or drag it onto a browser window. No install, no build, no server, no
network. `play.png` in each folder shows the game running.

| game | what you do |
|---|---|
| **bloom** | Plant a few seeds, press **Grow**, and Conway's Life runs. You win if one single generation has every bud alive at once. Six levels. |
| **districts** | Carve a grid of Teal and Amber voters into equal connected districts so the *outnumbered* colour wins the council. Five levels. |
| **paradox-loop** | Turn-based room you can't solve alone. **Rewind**, and your recorded past attempt replays beside you as a ghost. Six levels. |

Full controls for all three: [`../PLAYING.md`](../PLAYING.md).

## Verified state

Each was re-checked in this folder with `node tools/validate.js FINAL/<game>`:

| | bloom | districts | paradox-loop |
|---|:--:|:--:|:--:|
| automated checks | 24/25 | 24/25 | 24/25 |
| console errors driving it to the play screen | 0 | 0 | 0 |
| standards mode (`CSS1Compat`) | ✓ | ✓ | ✓ |
| survives `localStorage` throwing | ✓ | ✓ | ✓ |
| no horizontal scroll at 320 / 375 / 1440 px | ✓ | ✓ | ✓ |

The single check each one "fails" is `single_file`, which counts the files in the directory — it sees
`prompt.md` next to `index.html`. Each game **is** one self-contained file; the check is measuring this
folder's layout, not the game.
