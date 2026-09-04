# scc2026 — Summer Coding Challenge 2026 (profiq)

Work towards an entry for the [profiq Summer Coding Challenge 2026](https://www.pracujprosiliconvalley.cz/summer-coding-challenge-2026/):
theme **MINIHRA**. The contest asks for **one prompt** (≤ 10 000 characters, no pasted source, no encoded
assets) that, run once in an AI coding agent with **zero human intervention** and a 60-minute cap, produces
a complete browser mini-game as a **single `index.html`** — no install, no build, no server.

Deadline 7 September 2026. Scoring: 25 % theme + runs, 25 % originality, 20 % UX, 20 % prompt quality,
10 % reproducibility on the organiser's own re-run.

## Status

**The tuning loop was stopped part-way through round 1.** Nothing here is a finished submission — `FINAL/`
is empty and no blind judging was run. What exists is the rule extraction, the concept work, three
candidate prompts, five generation runs (four complete), and the validation tooling.

## Layout

```
constraints.md              every rule extracted from the contest page + terms PDF
DECISIONS.md                timestamped assumptions and judgement calls
LOG.md                      round log (only the header — no round completed)
ideas/shortlist.md          12 concepts scored on originality / feasibility / UX, 3 shortlisted
candidates/<slug>/
  prompt.md                 the exact candidate prompt
  run-N/index.html          raw agent output, never hand-edited
  run-N/validate.json       full automated report
  run-N/shots/*.png         screenshots at 375×667, 1440×900, 320px, post-interaction,
                            reduced-motion, and with localStorage forced to throw
tools/validate.js           25 automated checks per run (Playwright + headless Chromium)
tools/checkprompt.js        prompt compliance: length, code fences, base64, data URIs
tools/judge-brief.md        rubric handed to a blind judging agent
page.txt / terms.txt        source-of-truth text pulled in Step 0
FINAL/                      submission package — empty, never assembled
```

## Candidates

| slug | prompt | idea |
|---|---:|---|
| `r1-paradox-loop` | 7 600 ch | Turn-based room you cannot solve alone. Rewind, and your recorded past attempt replays beside you as a ghost — cooperate with yourself to hold plates and reach the exit. |
| `r1-districts` | 7 601 ch | A grid of Teal and Amber voters. Carve it into equal contiguous districts so the *outnumbered* colour still wins the council. The result screen shows popular vote next to seats. |
| `r1-bloom` | 8 630 ch | Puzzle golf on Conway's Life. Plant at most N seeds, press Grow, and win if every marked bud is alive at one single generation. Levels are designed backwards from a known seed, which guarantees solvability and supplies the hint system. |

All three prompts pass `checkprompt.js`: under 10 000 characters, no code fences, no base64, no data URIs.

## Generation runs

Every run was a fresh sub-agent whose entire input was the prompt text, working in an empty directory,
with no follow-ups — the contest's conditions. **All six were killed when the loop was stopped**, so each
was somewhere in its own self-verification or polish phase rather than finished by its own judgement.

| run | result | automated checks |
|---|---|---|
| `r1-bloom/run-1` | complete file | 25 / 25 |
| `r1-bloom/run-2` | complete file | 25 / 25 |
| `r1-districts/run-1` | complete file | 25 / 25 |
| `r1-districts/run-2` | complete file | 25 / 25 |
| `r1-paradox-loop/run-1` | truncated — cut off just after `<body>` | not run |
| `r1-paradox-loop/run-2` | no file written yet | — |

The four complete builds each pass all 25 checks: one file only, no remote URLs, no ES modules, no
`fetch`/XHR/WebSocket, no encoded asset blobs, clean console (no errors, exceptions or warnings), no
horizontal overflow at 320/375/1440 px, interaction changes state, survives a 40-click fuzz pass, survives
`localStorage` throwing, and loads under `prefers-reduced-motion: reduce`.

Passing the automated checks is not the same as being good — the four builds have not been played through
by a human or scored against the rubric.

## Running things

```bash
node tools/checkprompt.js candidates/r1-bloom/prompt.md
node tools/validate.js    candidates/r1-bloom/run-1
```

`tools/` needs `npm install` and `npx playwright install chromium` once.

To play a build, open its `index.html` directly from disk — that is exactly how the jury opens it.
