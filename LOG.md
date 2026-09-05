# LOG.md — round-by-round

Weighted score = 0.25·theme+runs + 0.25·originality + 0.20·UX + 0.20·prompt + 0.10·reproducibility,
each area 1–5, so the maximum is 5.00.

## Round 1 — judging in progress

Blind judge, one sub-agent per build. Each saw only the rubric, that build's `prompt.md`, its
`index.html`, its `validate.json` and its six screenshots.

| build | theme+runs | orig | UX | prompt | repro | **weighted** |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| `r1-bloom/run-1` | 5 | 4 | 4 | 4 | 4 | **4.25** |
| `r1-bloom/run-2` | 5 | 4 | 4 | 4 | 5 | **4.35** |
| `r1-districts/run-2` | 5 | 4 | 4 | 4 | 4 | **4.25** |
| `r1-districts/run-1` | 5 | 4 | 4 | 4 | 4 | **4.25** |

### `r1-bloom/run-1` — 4.25
The judge independently re-implemented the shipped Life rule and ran all six stored reference
solutions through it: every one reaches every bud at the declared generation, inside par, never
seeding stone. The prompt's "design each level backwards from a verified seed" instruction is
doing real work — that is what separates it from a Life sandbox.

- **Originality capped at 4**: Conway is the most familiar automaton a developer jury will be shown.
  The golf inversion is a genuine idea, but it is a new twist on very known material.
- **Biggest weakness**: the difficulty curve breaks in the back half. Levels 3 and 6 need two
  exactly-positioned, exactly-phased gliders — ten of eleven seeds — against only three hints. A
  player who does not already know Life patterns has no route from stuck to solved.
- **Highest-leverage fix**: scale the hint allowance to the solution size and let a hint plant its
  cell directly.
- Also noted: text-heavy how-to, and the desktop layout wastes most of a 1440px screen.
- **Prompt** lost a point for overlap between the section 7 verification walk and the section 8
  checklist, plus some soft design prose.
- **Reproducibility** risk named: the agent invents the boards itself, so a rerun that skimps on the
  backwards-design verification could ship an unsolvable level and break the premise.

### `r1-bloom/run-2` — 4.35

Same prompt, second generation. The judge again re-simulated all six levels independently and
confirmed every reference solution wins at exactly the generation the code claims, then solved
level 2's glider inside the shipped build. Its preview happened to serve the page from a `data:`
URL, so the entire playthrough ran with `localStorage` throwing — the game stayed fully playable on
in-memory progression with no console output. That is the storage-failure requirement proven by
accident.

- **Reproducibility scored 5 here against 4 on run-1** — judge variance on the same prompt, not a
  difference in the builds. Treat the pair as ~4.5 with a spread.
- **Biggest weakness — and this one is new**: the board is too dim for its own good. Empty cells
  barely separate from the background and an unplanted seed is a dim green dot that is hard to spot
  at 375px. On the one screen the player never leaves. The win overlay then covers the board, so you
  never see the bloom you engineered.
- **Highest-leverage fix**: lift board contrast and shrink or offset the win card so the solved
  garden stays visible. A few lines of CSS.
- Also: no focus trap behind `aria-modal`, and an `H` hint key that is bound but never listed.
- **Prompt** lost its point on economy for the same reason run-1's judge gave: section 8 restates
  sections 5 and 7 almost line for line, and several constraints appear three times.

Both Bloom judges independently capped originality at 4 with the same reasoning — Conway is the most
familiar automaton a developer jury will be shown, so the novelty sits in the wrapper, not the
simulation. That is a ceiling no amount of polish moves.

### `r1-districts/run-2` — 4.25

The judge wrote its own brute-force partition solver, independently confirmed all five boards admit a
legal Teal-majority map, fed those solutions back into the live game, and watched it accept every one
and roll to a real ending screen with an empty console — including under a `data:` origin where
`localStorage` genuinely throws, which the game absorbs and honestly reports to the player.

The prompt instruction that paid off here: *write and run a throwaway brute force proving every level
winnable, then delete it.* It demonstrably worked. Same shape as Bloom's backwards-design trick — give
the agent a procedure, not an assertion.

- **Originality 4**, and for a reason that matters: gerrymandering explainer/puzzle demos are
  recognisable prior art. Fresh *execution* of an idea some jurors will already have met.
- **Biggest weakness**: the desktop presentation. The whole game is a 640px phone-shaped column adrift
  in a 1440px viewport, and the title screen's left-aligned block reads as a mis-centred accident
  rather than a choice. Designed as a phone that merely tolerates a desktop.
- **Highest-leverage fix**: a ≥900px layout putting the board beside the status/chips/controls column,
  and focus the grid on entering a level so arrow keys work without hunting for Tab.
- Craft the judge singled out: district outlines that round only where a region actually turns,
  a live-region flip trick so repeated announcements re-fire, refusal messages that name the offending
  district, and a 7×7 board landing on exactly 44px cells at 375×667.
- **Prompt** docked the same point as Bloom's: section 8's checklist restates sections 5–7 near-verbatim.
- **Reproducibility** risk named: the winnability guarantee leans on the agent actually running a
  solver, and the prompt's "or trace it by hand" fallback is the one path that could ship an
  unwinnable finale.

### `r1-districts/run-1` — 4.25

Identical scores to run-2 in every area — the strongest reproducibility signal in the round, since two
judges who never saw each other's work scored two independent builds of one prompt the same way.
This judge also brute-forced all five boards, confirmed the advertised vote totals are exact
(including the deliberate 9-cell solid Amber corner in level 4), and walked every edge case the
prompt itself enumerates without finding a failure.

Singled out for praise: **contiguity being unbreakable by construction rather than validated after
the fact**. That was a deliberate prompt choice and it is the one carrying the build.

- **This judge found a real bug in my prompt**: section 2 says the board is "5×5 up to 7×7", then the
  level list specifies a 4×4 level 1. A flat self-contradiction, and it cost a point on prompt quality.
  Free fix.
- **Concrete defect in the build**: `aria-modal` overlays neither trap focus nor make the background
  inert, and U/R only fire while the board itself has focus. Stands out because the rest of the
  accessibility work is deliberate.
- **The ceiling, stated plainly**: "it renders a well-known real-world concept faithfully and adds
  nothing on top of it, so the later levels are the same insight at larger scale." Once the player has
  the level-3 "wait, that works?" moment, the rest is more of the same at larger size.

---

## Round 1 — result

| candidate | run-1 | run-2 | spread | verdict |
|---|:--:|:--:|:--:|---|
| `r1-bloom` | 4.25 | 4.35 | 0.10 | strong, one soft ceiling |
| `r1-districts` | 4.25 | 4.25 | 0.00 | strong, one hard ceiling |
| `r1-paradox-loop` | — | — | — | regenerating; no build existed in round 1 |

**Both surviving candidates converged on 4.25–4.35 and both lost the same point in the same place:
originality.** Four judges, four independent 4s, four different justifications that reduce to one
sentence — *this is excellent execution of an idea a developer jury has already met*. Nothing about
the builds fixes that; only a different idea does.

### What every judge agreed on
1. **Originality 4, never 5.** Conway's Life and gerrymandering are both prior art to this audience.
2. **Prompt quality 4, docked for the same repetition** — section 8's checklist restates sections 5–7
   near-verbatim. Both prompts, four judges, same complaint.
3. **Theme + runs 5.** Every build ran clean, handled its edge cases and survived storage failure.
4. **The procedure instructions are what made the builds trustworthy** — "design levels backwards from
   a verified seed" and "write and run a brute-force solver, then delete it". Both demonstrably
   executed. This is the transferable finding of the round: *give the agent a procedure, not an
   assertion.*

### Changes for round 2 — one class of change per candidate
- **`r1-districts` — originality is a hard ceiling. Drop it.** Two judges independently said the idea
  adds nothing on top of a known concept and that the back half is the same insight at larger scale.
  Polishing a 4 into a 4 is not worth a round. Per the brief: swap in a fallback rather than polish a
  weak idea.
- **`r1-bloom` — economy pass only.** 8 630 chars is the longest prompt and the checklist is the
  redundant part every judge named. Cut section 8 down to the lines not already stated, fix nothing
  else, and see whether prompt quality moves 4 → 5 in isolation.
- **`r1-paradox-loop` — judge the regenerated builds first.** It is the only candidate whose mechanic
  no judge has called prior art, so it is the only one with a live shot at originality 5.
- **Both prompts carry a fixable defect**: Districts' "5×5 up to 7×7" versus its 4×4 level 1. If
  Districts is revived, that goes first.

## Paradox Loop — second failed generation attempt (2026-09-05 13:18)

Both regeneration agents died on a session rate limit before writing a usable file. run-1 left a
3 115-byte stub; run-2 wrote nothing, though its last words were substantive — it had found that
*"levels 3 and 4 had connectivity leaks (the exit was reachable without the door)"* and was building a
staged verifier to fix them.

That is now **two attempts, zero builds** — once killed by me, once by the rate limit. Neither failure
is the prompt's fault, but the pattern is worth recording: Paradox Loop asks for more implementation
than either other candidate (ghost recording and replay, six levels, a solvability proof per level),
so it runs longest and is the most exposed to any interruption. **Under the contest's real 60-minute
cap that is a genuine risk, not just an inconvenience here.** If the third attempt also runs long,
that is evidence about the prompt and not about my infrastructure.

The run-2 agent's own finding — that its generated levels had connectivity leaks letting the player
reach the exit without opening the door — is exactly the failure the "prove every level is solvable"
instruction is meant to catch, and it caught it. Same procedure-not-assertion pattern that worked for
Bloom and Districts.

## Paradox Loop — attempt three: a build, but a defective one (2026-09-05 16:17)

Both agents hit the session limit again. run-1 wrote nothing; **run-2 produced a complete-looking
48 856-byte game** that scores 24/25 on the automated checks and renders a genuinely handsome title
screen. It is still not shippable:

- **The file has no `<!DOCTYPE html>`, no `<html>`, no `<head>` and no `<body>`.** It begins at
  `<meta charset>` and ends at `</script>`. Chromium reports `compatMode: "BackCompat"` — **the game
  runs in quirks mode**, with the old box model. It happens to look right; that is luck, not design.
- No `<html lang>`, the one automated check it fails.
- The title screen is left-aligned in a 1440px viewport — the exact "phone column adrift on desktop"
  defect the Districts judges named, which this prompt revision explicitly told it to avoid.

The agent died mid-repair. Its last words: *"the screenshot caught a real bug: `#s-play`'s ID rule
outranks `.screen[hidden]`, so the play screen was rendering on top of every other screen. Fixing."*
It got that fix in — screens switch correctly now — but never restored the document shell.

**Contest rules forbid hand-editing the output**, so a two-line fix I could make in ten seconds is not
available. The build is evidence, not a candidate.

### What three failures actually tell us
The failures were caused by *my* session limits, not the agent's own budget, so the evidence is
confounded. But the surviving artefact is the tell: this agent was still rewriting its document shell
after building six levels, a ghost replay engine and a solver. **Paradox Loop asks for more than the
other two candidates by a wide margin**, and under the contest's real 60-minute cap that is a live
risk to both "app runs" (25 %) and reproducibility (10 %) — the organiser's own re-run could easily
land exactly here.

### Stop rule set now, before the next attempt
One more Paradox Loop run, with a line requiring a complete HTML document. **If attempt four does not
produce a valid, complete build, Paradox Loop is dropped and Bloom becomes the submission.** Bloom
already has two judged builds at 4.25 and 4.35 and a revised round-2 prompt ready to run.

## Paradox Loop — attempt four: a real build (2026-09-05 21:24)

46 933 bytes, one file, **25/25 automated checks**, and independently confirmed by me:
`compatMode: "CSS1Compat"`, doctype present, `lang="en"`. The quirks-mode defect is gone. Single
agent this time rather than two, and the "write a valid skeleton to disk first, then grow the game
inside it" instruction did its job.

What the agent reports having verified — worth recording because most of it is the kind of claim the
earlier attempts could not make:
- It wrote a throwaway solver that **loaded the shipped engine out of `index.html`** and checked every
  level, then deleted it. Six levels, each machine-checked: solved within par and turn limit; exit
  **not** reachable with doors treated as walls; not solvable alone in one loop for levels 2–6; solid
  border; every door colour has a plate.
- A breadth-first search over all loop-1 endings confirms **level 6 genuinely cannot be done in two
  loops** — the finale really does need two ghosts. That is the design intent proven, not asserted.
- Its test browser served the page from an opaque origin where `localStorage` throws `SecurityError`,
  so the storage-failure path was the *default* environment, and it separately fed the loader
  malformed JSON, arrays, junk, negatives, `Infinity` and a prototype-pollution payload — all treated
  as absent, nothing thrown.

Two rule decisions it made that the prompt did not specify, both defensible:
- **Doors evaluate power after the mover moves**, so you cannot stand on the only lit plate and step
  through its own door. Without this, levels 2 and 4 collapse. This is a genuine gap in my spec.
- **All bodies start stacked on the start tile**, rendered offset, with no-sharing applying the moment
  anyone steps off. Also a gap in my spec — I never said where a ghost stands on turn 0.

Bugs it found and fixed during its own testing, none of which the automated checks would have caught:
a side panel auto-placing into a phantom third column and squeezing the board to 364px at 1440px;
board sizing deferred to `requestAnimationFrame`, which never fires in a background tab, leaving the
grid collapsed; floor and wall tiles nearly indistinguishable; open doors rendering as black pits.

**Paradox Loop survives the stop rule.** Going to blind judging.

