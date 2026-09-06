# REPORT

## What to submit

**Submit `bloom/`.** It scored highest (4.35 weighted), it is the only candidate whose two independent
runs both scored above 4.2, and its prompt contains the single instruction that made every good build in
this exercise good. `districts/` (4.25) is a defensible alternative if you prefer its look — it is the
better-looking game on a phone. `paradox-loop/` (3.75) should not be submitted; it is here because you
asked for all three.

The contest takes **one** entry: one `prompt.md` and the one `index.html` it produced.

## Final scores — five builds, each judged blind by a separate agent

Judges received only the rubric, that build's prompt, its `index.html`, its automated report and its
screenshots. Never my notes, never which candidate or round.

| build | theme+runs | orig | UX | prompt | repro | **weighted** |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| **bloom** (`r1-bloom/run-2`) | 5 | 4 | 4 | 4 | 5 | **4.35** |
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
- **Bloom's board is too dim.** Confirmed visually in `bloom/play.png`: empty cells barely separate from
  the background and an unplanted seed is hard to spot at phone width — on the one screen the player never
  leaves. The judge called it the biggest weakness. The win overlay also covers the board you just built.
- **Bloom's back half is hard.** Levels 3 and 6 need two exactly-positioned, exactly-phased gliders
  against three hints. A player who does not already know Life patterns has no route from stuck to solved.
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
5. **Bloom's prompt is 8 630 characters** against a 10 000 limit — compliant, but "úsporně" (economy) is
   part of the 20 % prompt score, and every judge docked it for a closing checklist that restates earlier
   sections. A revised, denser version exists at `candidates/r2-bloom/prompt.md` (8 351 chars, redundancy
   removed, five defects addressed), but **its build was never judged**, so it is not what ships here.

## What was left undone

The loop stopped by request before round 2 completed. `candidates/r2-bloom/` holds a revised prompt and
one unjudged build. A second `r2-bloom` run and a blind judgement on both would very likely have produced
a better entry than the 4.35 shipping here — the revised prompt fixes the dim board, the hint scaling, the
desktop layout, the win overlay, and a degenerate-solution hole where planting straight onto the buds won
without ever growing.
