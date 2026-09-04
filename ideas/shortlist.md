# Phase 1 — Concept pool
Scored 1–5 on: **ORIG** (how a jury of developers would rate novelty), **FEAS** (survivability in one
autonomous 60-min run — simpler is better), **UX** (potential to feel good in 30 seconds).

| # | Name | Core mechanic | ORIG | FEAS | UX | Verdict |
|---|------|---------------|:----:|:----:|:--:|---------|
| 1 | **Paradox Loop** | Turn-based grid room. You cannot solve it alone — press *Rewind* and your previous attempt replays as a ghost that repeats your exact keystrokes, while you play alongside it. Cooperate with your own past selves to hold plates open and reach the exit. | 5 | 4 | 5 | **ROUND 1** |
| 2 | **Districts** | A grid of two-coloured voters. Drag to carve the grid into N equal-size contiguous districts so *your* colour wins the majority of districts, not the majority of votes. Gerrymandering as a puzzle. | 5 | 3 | 4 | **ROUND 1** |
| 3 | **Seed** | Cellular-automaton golf: place at most *par* live cells, press Run, and Conway's Life must light the target squares within N generations. Deterministic, tiny rule set, huge depth. | 5 | 4 | 3 | **ROUND 1** |
| 4 | Two Bodies | One input, two avatars moving mirrored on a grid; get both to their goals. | 3 | 5 | 4 | fallback (mirrored-twin puzzles are a recognised genre) |
| 5 | Orbital | Place gravity wells to slingshot a probe into a target ring; fire and watch. | 3 | 3 | 4 | fallback (physics tuning is the risk) |
| 6 | Latency | Your input is deliberately delayed N turns; you must plan ahead of yourself. | 4 | 4 | 2 | fallback (mechanic reads as a bug, frustrating) |
| 7 | Prophecy | Declare your next five moves in advance, then watch them execute against a board that also moves. | 4 | 4 | 3 | fallback (overlaps #1, weaker hook) |
| 8 | Chroma Audit | Find the odd swatch in a grid; tolerance narrows each round. | 2 | 5 | 3 | reject — well-known casual format |
| 9 | Aspect | The browser window *is* the playfield; you resize it to solve puzzles. | 5 | 1 | 1 | reject — `resizeTo` is blocked, impossible on mobile |
| 10 | Beam | Rotate mirrors to route a laser through targets. | 2 | 4 | 4 | reject — very well-trodden |
| 11 | Kerning | Space the letters of a word to match a hidden ideal spacing. | 4 | 4 | 2 | reject — barely a game, no fail state |
| 12 | Chain | Place one bomb, chain the explosions. | 1 | 5 | 4 | reject — Boomshine clone |

## Why the three finalists
All three are **discrete and deterministic** (see D5): no physics, no frame-rate dependence, no collision
tuning — the failure modes that kill an unsupervised generation run. All three draw entirely with CSS/DOM
or 2D canvas primitives, so no assets are needed. All three have a one-sentence rule set and a visible
score/par, which is what makes a *mini*-game legible to a jury in 30 seconds.

Risk each carries:
- **Paradox Loop** — time-travel edge cases (a ghost blocked by the player). Fixed by one rule: a blocked
  ghost simply waits that turn. Must be stated in the prompt or runs will diverge.
- **Districts** — contiguity checking and drag-painting on touch are the two places an agent slips. Needs
  explicit "flood fill to validate" and "pointer events, not mouse events" instructions.
- **Seed** — risk is that it reads as a toy rather than a game. Needs a hard par, a fail state and levels.
