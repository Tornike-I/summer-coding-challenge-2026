# Pre-flight — run against the two files in this directory

## Contest rules

| rule | check | result |
|---|---|---|
| Prompt ≤ 10 000 characters | `checkprompt.js` | **9 580** (420 spare) |
| Prompt must not contain a substantial part of finished source code | no code fences, no `function`/`<script>`/`<div>` lines | none |
| Prompt must not contain encoded assets | no base64 blobs, no `data:` URIs | none |
| Entire application in a single `index.html` | one file, 53 707 bytes, all CSS and JS inline | ✓ |
| Runs in a normal browser without errors | loaded from `file://`, console watched | **silent** — no errors, no warnings |
| No install, build or server | opened by double-click from disk | ✓ |
| Generated file must be unmodified by hand | byte-compared to `../candidates/r3-bloom/run-1/index.html` | **identical** |
| Generation within 60 minutes | single unattended agent run | **51 min**, 139 tool calls |

## Technical

| check | result |
|---|---|
| Standards mode (not quirks) | `document.compatMode === "CSS1Compat"` ✓ |
| `<html lang>` set | `en` ✓ |
| No remote URLs anywhere (`http://`, `https://`) | none |
| No ES modules (blocked under `file://`) | none |
| No `fetch` / `XMLHttpRequest` / `WebSocket` / `EventSource` | none |
| No images, web fonts or external assets | none — every graphic drawn in code |
| Horizontal scroll at 320×640 | none |
| Horizontal scroll at 375×667 | none |
| Horizontal scroll at 1440×900 | none |
| Fully playable with `localStorage` throwing | ✓ — falls back to memory and says so |
| Loads under `prefers-reduced-motion: reduce` | ✓ |
| Survives a 40-click random fuzz pass | ✓ no exceptions |
| Interaction changes state | ✓ |

Automated suite: **24/25**. The single miss is `single_file`, which counts files in the directory and
sees `prompt.md`, `README.md` and the rest sitting beside `index.html`. The game itself is one
self-contained file — that is what the byte-comparison above confirms.

## What the agent verified about the game itself

From its own report, and consistent with everything above:

- Every level designed backwards from a legal seed run forward through the same B3/S23 engine the game
  ships, then **driven through the finished page** with synthetic pointer events and watched winning.
- Level 3's two-glider beehive collision and level 4's four-cell seed were found by brute-force search
  over that engine, not guessed.
- Primer grids provably frozen after a screen change; grow timer cleared on pause, win, loss and screen
  change — no leaked timers.
- Storage parser unit-tested against missing, throwing, malformed, array, foreign and hostile stored
  data; all treated as absent.

## Not verified

**No blind judgement on this build.** Its predecessor scored 4.35 weighted and every change since
addressed something a judge asked for, but this exact build has only the checks above and a hand
playthrough behind it.

**Only one run of this prompt.** Reproducibility is 10 % of the score; the evidence for Bloom comes from
two runs of an earlier version of the prompt, which scored 4.25 and 4.35. This prompt is strictly more
specific, so a re-run should land closer rather than further — but that is an argument, not a measurement.
