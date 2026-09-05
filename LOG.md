# LOG.md — round-by-round

Weighted score = 0.25·theme+runs + 0.25·originality + 0.20·UX + 0.20·prompt + 0.10·reproducibility,
each area 1–5, so the maximum is 5.00.

## Round 1 — judging in progress

Blind judge, one sub-agent per build. Each saw only the rubric, that build's `prompt.md`, its
`index.html`, its `validate.json` and its six screenshots.

| build | theme+runs | orig | UX | prompt | repro | **weighted** |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| `r1-bloom/run-1` | 5 | 4 | 4 | 4 | 4 | **4.25** |

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

