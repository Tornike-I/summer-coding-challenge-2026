# DECISIONS.md — assumptions and judgement calls
Timestamps are local (Europe/Prague), 2026.

## 2026-09-04 21:05 — D1. Source of truth
Fetched the contest page and the terms PDF. The PDF is legal/admin boilerplate only (organiser, prizes,
GDPR, copyright); **all technical rules live on the contest page**. Everything in the handoff brief was
verified against the page and holds. Extracted to `constraints.md`; raw text kept in `page.txt` / `terms.txt`.

## 2026-09-04 21:05 — D2. Which agent the verification run uses is ambiguous
The page says the prompt is run "v připraveném AI coding agentovi" (in a *prepared* AI coding agent) and
the organiser "jednou spustí stejný prompt". It does not say they use the entrant's agent.
**Decision:** write the prompt to be agent- and model-agnostic. No Claude Code specifics (no slash commands,
no MCP, no assumptions about which CLI/browser/test tooling exists), no assumption of network access, and
self-verification phrased as "if you can run a browser/headless check do so, otherwise re-read the code and
trace each state". This costs a little prompt length but protects the 10 % reproducibility score.

## 2026-09-04 21:05 — D3. `file://` is the target environment
Judges "open the app in a clean browser profile". That means `file://`, offline, no extensions, possibly
no `localStorage` (opaque origin in some browsers) and definitely no `<script type="module">` (CORS-blocked
from `file://` in Chromium). **Decision:** the prompt forbids ES modules and requires every storage access
to be wrapped so the game is fully playable when storage throws.

## 2026-09-04 21:05 — D4. Originality guardrail — genre exclusions
Per the brief I will not open the two linked example entries (Blastman, Leap). From the names I assume
shooter and platformer. Excluded genres for all candidates: shooters, platformers/jumpers, Snake, Tetris,
Flappy-style, Breakout, 2048, Wordle clones, memory match, tic-tac-toe, whack-a-mole, Sokoban, Minesweeper,
match-3, endless runners, Simon-says.

## 2026-09-04 21:05 — D5. Turn-based over real-time
The largest risk to the 25 % "app runs" score is an autonomous agent shipping broken real-time physics or
collision. Every shortlisted concept is **discrete and turn-based**: no frame-rate dependence, no collision
resolution, no tuning of feel. Deterministic rules are also far easier to reproduce on the verification run.

## 2026-09-04 21:05 — D6. Level content: described, not encoded
The rules forbid "a substantial part of finished source code or encoded assets". A packed level string in
the prompt would sit uncomfortably close to that line. **Decision:** describe levels by *teaching purpose*
and constraints in prose and require the agent to author the exact layouts itself and prove each is
solvable. Slightly less byte-identical reproduction, but safely inside the rules and it makes the
self-verification instruction do real work.

## 2026-09-04 21:20 — D7. Prompt length target
"Kvalita promptu" is scored on being *thoughtful and economical*. Padding to 10 000 chars would read as
the opposite. Target 4 500–6 500 characters; hard ceiling 10 000 with margin.

## 2026-09-04 21:20 — D8. Sub-agent runs simulate the contest honestly
Each generation run is a fresh sub-agent whose entire input is the prompt text verbatim, working in an
empty directory, with no follow-ups from me. I do not fix its output. If a run produces a broken file,
that is the candidate's score.

## 2026-09-04 22:40 — D9. No audio by default
Autoplay policies + `file://` make WebAudio unreliable and a jury opening in a clean profile may get a
console warning. Sound is opt-in behind a user gesture toggle, default off, and never required to play.

## 2026-09-05 00:05 — D10. Judge is blind
The judging sub-agent gets only: the rubric text from `constraints.md`, the `prompt.md`, the `index.html`,
and two screenshots. It is not told which candidate or round it is looking at, and never sees my notes.

## 2026-09-05 13:05 — D11. Blind judges shared a browser instance
The judge scoring `r1-bloom/run-2` reported that a `zoom` call returned a different candidate's tab
from the shared preview browser. It says it disregarded the content and that the tab played no part
in its score, and its written justifications contain nothing from another candidate — so I am keeping
the verdict rather than rerunning it. But the blindness guarantee is weaker than intended: judges run
in parallel against one browser.
**Decision:** for the remaining judging, instruct judges to score from the file and screenshots only,
without driving the browser. That costs some behavioural verification, which the automated validator
already covers, and buys back real isolation.

## 2026-09-05 13:25 — D12. Paradox Loop's prompt was revised before attempt three
Two attempts produced no build, so nothing was ever judged under the original text and no comparison
is lost by changing it. Rather than burn a third identical attempt I folded in the round-1 findings,
all of which came from judges or from the failed run itself — not from me guessing:
- **"Prove the exit is not reachable while ignoring the doors."** The run-2 agent found this exact bug
  in its own generated levels ("levels 3 and 4 had connectivity leaks") before it died. A solver
  reports such a level solvable; it is still broken. This is the single most valuable line added.
- **A wide-screen layout requirement.** Both Districts judges called out a phone-shaped column adrift
  at 1440px as the weakest thing about an otherwise polished build.
- **Modal focus trapping.** The Districts judge found `aria-modal` overlays that neither trap Tab nor
  make the background inert — the only accessibility hole in a careful build.
- **Section 8 trimmed** to the lines it does not already state elsewhere, since all four judges docked
  prompt quality for the checklist restating sections 5–7.
`candidates/r1-paradox-loop/prompt.md` now holds the exact text that was run, and the directory keeps
its `r1-` name only because the running agents write into it — treat it as a round-2 prompt.

## 2026-09-05 13:25 — D13. Districts is dropped, Bloom gets an isolated economy pass
Round 1 put both at 4.25–4.35 with originality pinned at 4 by four independent judges. Districts'
ceiling is the harder of the two — two judges said it adds nothing on top of a known concept and the
back half is the same insight at larger scale — so per the brief it is dropped rather than polished.
Bloom gets exactly one change, the economy cut, so any movement in prompt quality is attributable.
