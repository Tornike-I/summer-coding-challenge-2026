# REPORT

## What to submit

**Submit `bloom/`.** The build here is the **r3 revision, which has not been judged** — it replaced the
4.35-scoring r2 build after the game proved hard to grasp on first contact. It adds a pattern primer and
fixes three defects judges named against its predecessor. It is validated (25/25 in isolation) and
verified by hand, but its score is unknown; the lineage it comes from scored 4.25 and 4.35, and the
changes are all in the direction judges asked for. `districts/` (4.25) is a defensible alternative if you prefer its look — it is the
better-looking game on a phone. `paradox-loop/` (3.75) should not be submitted; it is here because you
asked for all three.

The contest takes **one** entry: one `prompt.md` and the one `index.html` it produced.

## Final scores — five builds, each judged blind by a separate agent

Judges received only the rubric, that build's prompt, its `index.html`, its automated report and its
screenshots. Never my notes, never which candidate or round.

| build | theme+runs | orig | UX | prompt | repro | **weighted** |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| `r1-bloom/run-2` — *superseded by the r3 build now in `bloom/`* | 5 | 4 | 4 | 4 | 5 | **4.35** |
| `r1-bloom/run-1` | 5 | 4 | 4 | 4 | 4 | 4.25 |
| **districts** (`r1-districts/run-1`) | 5 | 4 | 4 | 4 | 4 | **4.25** |
| `r1-districts/run-2` | 5 | 4 | 4 | 4 | 4 | 4.25 |
| **paradox-loop** (`r1-paradox-loop/run-1`) | 4 | 3 | 4 | 4 | 4 | **3.75** |

## Reproducibility

This is the 10 % the organiser tests by re-running your prompt once. The evidence is good:

- **Districts scored 4.25 on both runs, identical in all five areas**, judged by two agents who never saw
  each other's work. That is the strongest reproducibility signal in the exercise.
- **Bloom scored 4.25 and 4.35**, differing only on the reproducibility axis itself (4 vs 5) — judge
  variance, not a difference between the builds. Both judges independently re-simulated all six levels
  and confirmed every reference solution wins at exactly the generation the code claims.
- Paradox Loop needed **four attempts** to produce one valid build. Three died mid-run. See the risk below.

## What made the builds work

One transferable finding, and it is the most useful thing here: **give the agent a procedure, not an
assertion.** "Design each level backwards from a seed you actually ran forward" (Bloom) and "write and run
a brute-force solver proving every level winnable, then delete it" (Districts) both demonstrably executed,
and the judges verified the results independently. Telling an agent a level "must be solvable" produces
nothing checkable; telling it *how to know* produces levels that are provably solvable.

## Known weaknesses

- **Originality is capped at 4 across the board.** Five judges, five independent 4s and a 3, all with the
  same reasoning: excellent execution of an idea a developer jury has already met. Conway's Life is the
  most familiar automaton in the room; gerrymandering puzzles are recognisable prior art; ghost-replay
  co-op is a known genre. Originality is 25 % of the score and **this is the ceiling on the whole entry**.
  Fixing it needs a different idea, not a better build.
- **Bloom's r3 build is unjudged.** Everything below it in this list was found by a judge; the r3 build
  has only my own validation and a hand playthrough behind it. One blind judgement would settle whether
  the primer moved UX and whether the longer prompt cost anything on economy.
- **Bloom's prompt is now 9 580 characters against a 10 000 cap.** Compliant, but economy is part of the
  20 % prompt score, and this is the least economical prompt in the exercise. The primer bullet is the
  first thing to compress if that matters more than the feature.
- ~~Bloom's board is too dim~~ and ~~the back half is unlearnable~~ were the two biggest complaints
  against the previous build. Both are addressed in r3 — the board grid now reads clearly, each level
  names the pattern it wants in plain words, and a Patterns panel is one tap away during play. Verified
  visually in `bloom/play.png` and `bloom/patterns.png`.
- **Districts is a phone that tolerates a desktop.** At 1440px it is a 640px column adrift in dead space.
  Its modals also do not trap focus.
- **Paradox Loop ships a broken level.** My prompt says a door opens "while at least one plate of its
  colour is occupied", then asks level 3 for "two plates… needs two ghosts". Under my own rule the second
  plate is decorative, and the judge verified level 3 falls to a single ghost — identical to level 2. The
  agent implemented my contradiction faithfully.

## Things to double-check before you submit

1. **Which agent does the organiser re-run the prompt in?** The page says "a *prepared* AI coding agent"
   and that the organiser "runs the same prompt once", but never says whose. All three prompts were
   written to be agent- and model-agnostic — no Claude Code specifics, no assumed CLI, no network — so
   they should survive a re-run elsewhere. Worth a sanity read before sending.
2. **Run durations.** Only paradox-loop has a clean measured run (51 min, inside the 60-minute cap but not
   comfortably). The Bloom and Districts runs were interrupted by me during their own self-verification,
   so their true unattended duration is unknown. `meta.md` says so; do not claim otherwise on the form.
3. **The prompt you submit must be the one in the same folder as the `index.html` you submit.** They were
   copied together and verified byte-identical to the raw run; do not mix a prompt from one folder with a
   build from another.
4. **Nothing here was hand-edited.** Every `index.html` is raw agent output. If you change so much as a
   character before submitting, the entry breaks the rules.
5. **Play Bloom yourself before submitting.** The r3 build has no blind judgement behind it — it was
   swapped in because the game was hard to grasp, and the fix is the kind of thing you should confirm by
   feel rather than by checklist. Open `bloom/index.html`, hit Play, and see whether level 1's brief and
   the Patterns panel actually get you moving.

## What was left undone

The loop stopped by request before round 2 completed. `candidates/r2-bloom/` holds a revised prompt and
one unjudged build. A second `r2-bloom` run and a blind judgement on both would very likely have produced
a better entry than the 4.35 shipping here — the revised prompt fixes the dim board, the hint scaling, the
desktop layout, the win overlay, and a degenerate-solution hole where planting straight onto the buds won
without ever growing.
