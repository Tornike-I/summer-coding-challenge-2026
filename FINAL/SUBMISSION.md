# Submission sheet — Bloom

**You have to fill the form in yourself.** Rule 4 of the terms: *"Vyplnění soutěžního formuláře musí
proběhnout samostatně bez pomoci jiných osob."* — the form must be completed independently, without help
from anyone else. It also wants your own contact details. So this page is everything ready to paste; the
submitting is yours.

Form: https://docs.google.com/forms/d/e/1FAIpQLSfUiIbd515AAsc9NG3x_ryi9anWXzoKD0pJFQOH3sDJgKEomQ/viewform
Deadline: **7 September 2026.**

---

## Files to upload

| | path |
|---|---|
| **prompt.md** | `scc2026/FINAL/bloom/prompt.md` — 9 580 characters |
| **index.html** | `scc2026/FINAL/bloom/index.html` — 53 707 bytes |

Upload these two exactly as they are. Do not open them in an editor and save.

---

## "Název AI agenta, použitý tooling, verze modelu a případné další nastavení"

Paste:

> **Agent:** Claude Code (Anthropic), spuštěný v desktopové aplikaci Claude.
> **Model:** claude-opus-5
> **Tooling:** pouze vestavěné nástroje Claude Code pro práci se soubory a shellem. Hra vznikla v jediném
> běhu podřízeného agenta, jehož celým vstupem byl odevzdaný prompt, v prázdném adresáři, bez jakéhokoli
> dalšího lidského zásahu po spuštění.
> **Nastavení:** výchozí. Žádná úprava teploty, žádný vlastní systémový prompt, žádné MCP servery ani
> pluginy. Agent nepoužil síť.
> **Délka generování:** 51 minut, 139 volání nástrojů — v rámci šedesátiminutového limitu.
> **Platforma:** Windows 11, agentovi byl k dispozici Node 22 a Python 3.13.

---

## "Krátký popis aplikace a její funkcionality"

Paste (the long version with an English translation is in `description.md`):

> **Bloom** je logická hra postavená na Conwayově Hře života. Na mřížce je označeno několik **poupat**.
> Dostaneš omezený počet semínek — méně, než by se hodilo — a rozsadíš je, kam chceš. Pak stiskneš
> **Grow** a zahrada se rozběhne podle pravidel Hry života. Vyhráváš ve chvíli, kdy je v jedné jediné
> generaci naživu **každé poupě zároveň**. Po zasetí už do zahrady nezasáhneš; celá hra je v tom, kam
> semínka umístíš.
>
> Šest úrovní se stoupající obtížností, každá navržená pozpátku z ověřeného semínka, takže je zaručeně
> řešitelná. Kamenná políčka nelze osít, ale do života se počítají. Aby hra nebyla nesrozumitelná pro
> někoho, kdo Hru života nezná, obsahuje **slovníček vzorů** — blok, blinker, kluzák a další, každý jako
> malá mřížka animovaná přímo herním enginem, takže se nemůže rozejít s pravidly hry. Je dostupný z
> nápovědy i jedním klepnutím během hraní, a každá úroveň navíc rovnou pojmenuje vzor, který po hráči
> chce.
>
> Když dojde limit generací, hra neřekne jen „prohrál jsi“, ale ohlásí nejlepší okamžik — například
> „3 ze 4 poupat v generaci 11“. Reset vrátí zahradu do stavu po zasetí, semínka zůstanou, takže stačí
> posunout jedno políčko. Nápověda odhalí jedno políčko referenčního řešení za bodovou srážku.
>
> Celá aplikace je v jediném souboru `index.html`. Otevře se v běžném prohlížeči přímo z disku — bez
> instalace, buildu, serveru a bez připojení k internetu. Veškerá grafika je vykreslená kódem, žádné
> obrázky ani externí fonty. Funguje myší, dotykem i klávesnicí, respektuje `prefers-reduced-motion` a
> zůstane plně hratelná i tehdy, když prohlížeč zakáže `localStorage` — jen se neuloží nejlepší výsledky.

---

## Pre-flight, run just now

| check | result |
|---|---|
| prompt ≤ 10 000 characters | 9 580 ✓ |
| prompt contains no source code, no base64, no data URIs | ✓ |
| `index.html` byte-identical to the raw agent run | ✓ |
| prompt is the one that produced this build | ✓ |
| never hand-edited since it was generated | ✓ |
| loads from `file://` in standards mode (`CSS1Compat`) | ✓ |
| console errors and warnings | none |
| no remote URLs, no ES modules, no `fetch`/XHR/WebSocket | ✓ |
| no horizontal scroll at 320 / 375 / 1440 px | ✓ |
| playable with `localStorage` throwing | ✓ |
| automated checks | 24/25 — the only miss is `single_file`, which counts `prompt.md` sitting next to it in this folder |

## Last thing

**Play it once yourself before you upload.** This build has no blind judgement behind it — it was made
after you said the game was hard to grasp, and whether the primer actually fixes that is a question of
feel, not of checklists. Open `bloom/index.html`, press Play, and see whether level 1 gets you moving.
