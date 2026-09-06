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

**The loop was stopped by the user on 6 September 2026 to stop consuming usage limits.** `FINAL/` is
assembled with all three games and is submittable as it stands. Nothing below is required; it is what
would have come next.

1. **Judge `candidates/r2-bloom/run-1`** (built, validated 25/25, never judged). Its agent died saying it
   was fixing issues it had spotted in its own code, so it is untrusted until scored.
2. **Run `r2-bloom` a second time** for reproducibility evidence, then judge that too.
3. If either beats 4.35, swap `FINAL/bloom/` to that prompt and build — **as a pair**, never mixed.
4. Only then consider a round 3. The binding constraint is originality, which no polish moves; a higher
   score needs a different idea from `ideas/shortlist.md`, not a better build of these.

## Standing constraints

- **Never ask the user a question.** Ambiguity → pick the most defensible option, write it to
  `DECISIONS.md`, continue.
- Do not open, fetch or read the two example entries linked from the contest page (Blastman, Leap).
  Excluded genres are listed in `DECISIONS.md` D4.
- The prompt must stay agent- and model-agnostic — the organiser re-runs it in *their* agent (D2).
- The generated game is opened from `file://` in a clean profile: no ES modules, no network, storage
  failure must be survivable (D3).
