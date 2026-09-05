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

