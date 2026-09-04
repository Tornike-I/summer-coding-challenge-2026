# RESUME.md — pick the work up from here

Repo: `C:\Users\USER\ccMC\scc2026` → `github.com/Tornike-I/summer-coding-challenge-2026` (private).
Read `README.md`, `constraints.md`, `DECISIONS.md` and `ideas/shortlist.md` before doing anything.

**Submission deadline: Sunday 7 September 2026.** Loop paused 4 September 2026, ~22:00 (Europe/Prague),
because the session hit its usage limit.

---

## Checkpoint protocol — follow this from the first minute

The session that resumes this will probably hit a usage limit too. Work so that being cut off mid-thought
costs nothing:

1. **Commit and push after every completed unit of work** — one validated run, one judged build, one prompt
   edit, one section of a report. Not at the end of a phase; at the end of each item.
2. **Append to `LOG.md` as you go**, not retrospectively. A half-finished round must still leave a readable
   record of what was tried and what it scored.
3. **Never leave the tree dirty when idle.** If something is half-written, commit it with `WIP:` in the
   subject and a line saying what is missing.
4. **Log every judgement call to `DECISIONS.md`** with a timestamp, at the moment you make it.
5. **Raw agent output is never hand-edited.** If a generated `index.html` is wrong, that is the candidate's
   score — change the *prompt* and regenerate. This is a contest rule, not a preference.
6. **When you run out of budget, stop cleanly**: commit everything, update this file's *Next actions* list
   to match reality, push, and say plainly where you stopped. Do not start a sub-agent you cannot see finish.

---

## State as of the pause

| candidate | prompt | runs | outcome |
|---|---:|---|---|
| `r1-paradox-loop` | 7 600 ch | run-1 truncated, run-2 never written | **no usable build** |
| `r1-districts` | 7 601 ch | run-1, run-2 both complete | 25/25 automated checks each |
| `r1-bloom` | 8 630 ch | run-1, run-2 both complete | 25/25 automated checks each |

All six generation agents were killed mid-run when the loop was stopped, so each was still inside its own
self-verification phase. The four complete builds pass every automated check but **no human or judge has
scored them against the rubric** and no round has been logged.

Tooling is built and working: `tools/validate.js` (25 checks, Playwright + Chromium, includes a
storage-hostile pass and a reduced-motion pass), `tools/checkprompt.js` (length / code / base64
compliance), `tools/judge-brief.md` (the blind rubric to hand a judging sub-agent).

`FINAL/` is empty. Nothing has been assembled.

---

## Next actions, in order

1. **Regenerate Paradox Loop, twice.** It scored highest on originality in `ideas/shortlist.md` and has no
   build at all, so it is the biggest open question in the whole exercise. Fresh sub-agent per run, entire
   input = `candidates/r1-paradox-loop/prompt.md` verbatim plus one line naming the working directory
   (`candidates/r1-paradox-loop/run-1` and `run-2`, cleared first). No follow-ups, no fixes from you.
   Validate each with `node tools/validate.js <runDir>`. Commit after each.
2. **Blind-judge all six builds.** One judging sub-agent per build. It gets only `tools/judge-brief.md`,
   the build's `prompt.md`, its `index.html`, and its screenshots from `run-N/shots/` — never your notes,
   never which candidate or round it is. Store its JSON as `run-N/judge.json`, merge with the automated
   report into `candidates/<slug>/eval.json`. Commit after each.
3. **Write round 1 into `LOG.md`**: per candidate — prompt length, automated pass/fail, the five rubric
   scores, weighted total, how far the two runs diverged in key features, and the one change you will make.
4. **Round 2.** Drop the weakest candidate. Apply **one class of change per candidate** so improvements are
   attributable (see Phase 5 in the original brief, restated in `DECISIONS.md` context): broken → tighten
   self-verification and state specification; low reproducibility → make key features more explicit; low UX
   → concrete design direction; low originality → swap in a fallback concept from `ideas/shortlist.md`
   rather than polishing a weak idea; prompt too long → cut anything the agent did unprompted.
   `r1-bloom` at 8 630 characters is the obvious candidate for the economy cut — "úsporně" is scored.
5. **Stop** when five rounds are done, or the best weighted score has not improved for two consecutive
   rounds, whichever is first.
6. **Assemble `FINAL/`**: `prompt.md` (verify ≤ 10 000 chars and no code with `checkprompt.js`),
   `index.html` (**one actual run output, picked, never merged or edited**), `meta.md` (agent name, exact
   model version string, tooling, settings, run duration), `description.md` (short description of the game
   and its functionality — Czech first, English underneath), `REPORT.md` (concept, final weighted score,
   reproducibility across every run of the final prompt, known weaknesses, and what to double-check before
   submitting).

## Standing constraints

- **Never ask the user a question.** Ambiguity → pick the most defensible option, write it to
  `DECISIONS.md`, continue.
- Do not open, fetch or read the two example entries linked from the contest page (Blastman, Leap).
  Excluded genres are listed in `DECISIONS.md` D4.
- The prompt must stay agent- and model-agnostic — the organiser re-runs it in *their* agent (D2).
- The generated game is opened from `file://` in a clean profile: no ES modules, no network, storage
  failure must be survivable (D3).
