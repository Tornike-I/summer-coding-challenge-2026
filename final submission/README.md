# Final submission — Bloom

Summer Coding Challenge 2026 (profiq), theme **MINIHRA**. One prompt, one game, one file.
Deadline **7 September 2026** · [submission form](https://docs.google.com/forms/d/e/1FAIpQLSfUiIbd515AAsc9NG3x_ryi9anWXzoKD0pJFQOH3sDJgKEomQ/viewform)

## The form takes URLs, not files

There is **no file upload on the form** and no zip. It asks for two links, so both files have to be
hosted somewhere public first. Fields, in order:

| # | field | what goes in |
|---|---|---|
| 1 | E‑mail | yours |
| 2 | **Výsledek úkolu (URL tvého index.html)** | public link to `index.html` |
| 3 | **Řešení úkolu (URL tvého prompt.md)** | public link to `prompt.md` |
| 4 | **Popis aplikace, název AI agenta, použitý tooling, verze modelu a…** | one paragraph — paste [`form-answer.md`](form-answer.md) |
| 5–7 | Jméno, Příjmení, Telefon | yours |
| 8–9 | two consent checkboxes | your call |

Field 4 is a **single** paragraph box covering both the description and the agent details, which is why
`form-answer.md` merges them. `description.md` and `meta.md` hold the longer standalone versions.

Signing in with a Google account is required.

## Hosting the two files

Whatever you choose, the link for field 2 should ideally **render the game**, not show its source — the
judges open it in a clean browser profile. A `raw.githubusercontent.com` link serves HTML as plain text,
so it shows code rather than a playable game.

- **GitHub Pages** on a public repo gives `https://<user>.github.io/<repo>/index.html`, which plays. Best
  option for field 2.
- **A public gist** works for field 3 (`prompt.md` renders fine as text) but not well for field 2.
- The current repo is **private**, so its links will 404 for the judges.

## The two files

| file | |
|---|---|
| **`index.html`** | 53 707 bytes, raw agent output, byte-identical to `../candidates/r3-bloom/run-1/` |
| **`prompt.md`** | 9 580 characters, the exact prompt that produced it |

**Never open `index.html` in an editor and save.** It must stay byte-for-byte what the agent wrote.
Copying, uploading and serving it are all fine; re-saving is not.

## What the game is

Plant a handful of seeds on a grid, press **Grow**, and Conway's Game of Life runs. You win if at any
single generation **every marked bud is alive at once**. After planting you never touch the garden again —
the whole game is choosing where the seeds go. Six levels, each designed backwards from a verified seed so
it is guaranteed solvable.

This is the version **with the pattern primer**: a catalogue of Life's basic structures — block, beehive,
blinker, T-tetromino, glider and more — each drawn as a small grid animated by the game's own engine, so
it can never disagree with the rules. It sits on *How to play* and one tap away during play, and every
level names the pattern it wants in plain words. That was the fix for the game being hard to grasp on
first contact.

`screenshots/` shows the play screen, the primer, the how-to and the phone layout.

## Verified

`prompt.md` ≤ 10 000 chars with no source code, base64 or data URIs · `index.html` loads from `file://` in
standards mode with zero console errors or warnings · no remote URLs, no ES modules, no network calls · no
horizontal scroll at 320 / 375 / 1440 px · fully playable with `localStorage` throwing · 51-minute
unattended generation run, inside the 60-minute cap.

Full detail in [`checks.md`](checks.md). The reasoning that got here is in [`../LOG.md`](../LOG.md) and
[`../DECISIONS.md`](../DECISIONS.md); the two runner-up games and every intermediate build are in
[`../FINAL/`](../FINAL/) and [`../candidates/`](../candidates/).

## One caveat

This build was never blind-judged. Its predecessor scored **4.35** weighted, and every change since went
in a direction the judges asked for — but the primer's effect is a question of feel. **Play it once before
you submit.**

## Rule 4

*"Vyplnění soutěžního formuláře musí proběhnout samostatně bez pomoci jiných osob."* The form has to be
filled in by you, without help. Everything here is staged for pasting; the submitting is yours.
