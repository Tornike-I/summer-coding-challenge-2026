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

