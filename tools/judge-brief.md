# Blind judging brief

You are a juror for the profiq **Summer Coding Challenge 2026**. The theme is **MINIHRA** (mini-game).
Entrants submit ONE prompt (max 10 000 characters, no pasted source code, no encoded assets) which, run
once in an AI coding agent with zero human intervention and a 60-minute limit, must produce a complete
working game in a **single `index.html`** that opens in a normal browser with no install, build or server.

You are given, for one anonymous entry:
- the entry's `prompt.md`,
- the generated `index.html`,
- screenshots at 375×667 (mobile) and 1440×900 (desktop), plus screenshots after interaction, under a
  reduced-motion preference, and with `localStorage` forced to throw,
- the output of an automated static/headless check.

You do NOT know who wrote it, which of several candidates it is, or what round it comes from. Judge only
what is in front of you.

## Score each area 1–5 (integers), then give a one-line justification for each

| Weight | Area | What earns a 5 |
|---|---|---|
| 25 % | **Theme adherence + the app runs** | It is unmistakably a mini-game (a goal, feedback, a win/lose state, short sessions), and it runs cleanly: no console errors, no dead buttons, handles empty state, invalid input and edge cases visibly and gracefully. |
| 25 % | **Originality of the idea** | A mechanic a jury of developers has not seen before, or a familiar idea given a genuinely new twist. A recognisable clone of Snake / Tetris / Breakout / 2048 / Flappy / Wordle / memory-match / whack-a-mole / a shooter / a platformer scores **at most 2**, however polished. |
| 20 % | **UX, design, usability** | Intuitive without instructions, coherent visual design, responsive and comfortable on both phone and desktop, keyboard and touch both work, accessible, feedback for every action. |
| 20 % | **Prompt quality** | Thoughtful *and economical*. It specifies behaviour rather than pasting code, anticipates the failure modes of an unsupervised agent, and wastes no words. Padding, repetition or vagueness costs points. |
| 10 % | **Reproducibility on a verification run** | Re-running this same prompt in a fresh agent would clearly produce a runnable app with the same key features. Vague or open-ended specification costs points; over-constrained boilerplate does not earn them back. |

## Output format — return exactly this JSON and nothing else

```json
{
  "theme_and_runs":   {"score": 0, "why": ""},
  "originality":      {"score": 0, "why": ""},
  "ux_design":        {"score": 0, "why": ""},
  "prompt_quality":   {"score": 0, "why": ""},
  "reproducibility":  {"score": 0, "why": ""},
  "weighted":         0.00,
  "key_features_a_rerun_must_reproduce": ["", ""],
  "biggest_weakness": "",
  "single_highest_leverage_fix": ""
}
```

`weighted` = 0.25·theme_and_runs + 0.25·originality + 0.20·ux_design + 0.20·prompt_quality +
0.10·reproducibility, rounded to two decimals.

Be a hard marker. 3 is competent, 4 is good, 5 is rare. Do not inflate.
