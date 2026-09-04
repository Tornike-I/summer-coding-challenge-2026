# constraints.md — Summer Coding Challenge 2026 (profiq)
Sources of truth, fetched 2026-09-04:
- Contest page: https://www.pracujprosiliconvalley.cz/summer-coding-challenge-2026/ (raw text saved as `page.txt`)
- Terms PDF: https://www.pracujprosiliconvalley.cz/wp-content/uploads/2026/08/SummerCodingChallenge2026-podminky_a_pravidla.pdf (text saved as `terms.txt`)

## 1. Theme
**MINIHRA** (mini-game). "Letošní soutěž ... prověří tvou schopnost vytvořit webovou aplikaci jedním promptem." — build a web app with a single prompt.

## 2. The task (verbatim CZ → EN)
> "Tvým úkolem je vytvořit jeden prompt, který po spuštění v připraveném AI coding agentovi vygeneruje kompletní funkční aplikaci (hru). Jakmile generování začne, už nesmí přijít žádný další lidský zásah. Žádné doplňující prompty, žádné ruční úpravy."

EN: Create ONE prompt that, run in a *prepared AI coding agent*, generates a complete working application (a game). Once generation starts, no further human intervention — no follow-up prompts, no manual edits.

> "Výsledkem musí být jediný soubor index.html, který se otevře v běžném prohlížeči bez instalace, buildu nebo serveru."

EN: The result must be a single `index.html` that opens in a normal browser with no install, build, or server.

## 3. Hard application requirements
- 🎯 Matches the Mini-game theme.
- 🌐 Runs in a normal browser **without errors** and without further configuration.
- 📄 The **entire** application is contained in a single `index.html`.
- "Aplikace musí zůstat v jednom index.html a spustitelná bez dalších závislostí." — one file, no further dependencies.

Derived (not literally stated but required by "no server / no dependencies / clean profile"):
- Must work from a `file://` URL (judges open the file in a clean browser profile).
- No CDN, no remote fonts/images/audio, no network calls — those break under `file://`, offline, or a locked-down profile.
- No build step, no modules requiring a server (`<script type="module">` from `file://` is blocked by CORS in Chrome → forbidden).

## 4. Prompt rules
- **One prompt only**, max **10,000 characters**.
- "Prompt nesmí obsahovat podstatnou část hotového zdrojového kódu ani zakódované assety." — must NOT contain a substantial part of finished source code, nor encoded assets (no base64 blobs, no data-URI payloads, no pasted functions).
- Total generation limit: **60 minutes**.
- After the prompt is launched: no answering the agent, no additional prompts, no editing files.
- Preparation and tuning of the prompt beforehand is unlimited.
- The agent MAY autonomously plan, test the result and fix bugs within the single run. (→ the prompt should explicitly instruct it to do so.)

## 5. What is submitted (Google Form, by 7 Sep 2026)
1. Exact prompt text in a file **`prompt.md`**
2. Name of the AI agent, tooling used, model version, any further settings
3. The generated, **hand-unmodified** `index.html`
4. A short description of the application and its functionality
5. (+ contact details; entry must be filled in by the participant alone, one entry per person, 18+)

## 6. Verification procedure
1. Organisers open the submitted app **in a clean browser profile** and verify the declared functionality.
2. The organiser runs the **same prompt once**. Output need not be identical, but must again produce a runnable application **with the same key features**.
3. Jury scores each area independently 1–5; grades are converted with the weight table.
4. Three highest totals win. Ties broken by draw.

## 7. Rubric (weights)
| Weight | Area |
|---|---|
| 25 % | dodržení tématu a spustitelnost aplikace — theme adherence + the app runs |
| 25 % | originalita nápadu — originality of the idea |
| 20 % | UX, design a použitelnost — UX, design, usability |
| 20 % | kvalita promptu — prompt quality ("jak promyšleně a úsporně je napsaný" = how thoughtfully and *economically* it is written) |
| 10 % | opakovatelnost při ověřovacím běhu — reproducibility on the verification run |

Jury explicitly looks at:
- **Funkčnost**: "Jak si aplikace poradí s prázdnými stavy, chybnými vstupy nebo edge cases." — empty states, invalid input, edge cases.
- **UX & Design**: intuitive, responsive, pleasant; everything works as it should.
- **Originalita**: an idea nobody else thought of.
- **Kvalita promptu**: thoughtful and economical wording.

## 8. Dates / admin
- Contest runs 24 Aug – **7 Sep 2026**. Results by 23 Sep 2026.
- Prizes 7 000 / 5 000 / 3 000 CZK, paid by bank transfer, collected in person at a profiq office.
- 18+, one entry per person, employees of profiq and their family excluded.
- Copyright: submitting grants profiq only the right to accept, run, test, check and evaluate the solution. No transfer of economic copyright, no commercial licence.

## 9. Consequences for prompt design (my reading)
- "Připravený AI coding agent" implies the organiser has **their own** agent set up; the model may not be Claude. → the prompt must be **agent-agnostic and model-agnostic**: no Claude Code-specific tooling, no slash commands, no assumptions about available CLIs, no MCP.
- Reproducibility is 10 % but "same key features" is checked by a human. → key features must be **few, named, and unambiguous**.
- Economy is scored inside the 20 % prompt-quality bucket. → do not pad to 10 000 chars. Target 4 000–7 000.
- The generated file is opened from disk in a clean profile → `localStorage` on `file://` is origin-`null` in some browsers and can throw in others; any persistence must be wrapped in try/catch and the game must be fully playable without it.
