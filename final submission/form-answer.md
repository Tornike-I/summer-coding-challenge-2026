# The three required fields

## 1. "Task result (URL of your index.html)"

```
https://tornike-i.github.io/summer-coding-challenge-2026/final%20submission/
```

Live and verified: HTTP 200, `text/html`, 53 707 bytes — the exact file — loading in standards mode with
a silent console and reaching the play screen.

**Note the `%20`.** The directory name has a space in it. The encoded form above is the safe one to paste;
a literal space will usually be fixed up by the browser, but not always by a form. If you would rather
have a clean URL, say so and I will put a copy at the repo root so it becomes
`https://tornike-i.github.io/summer-coding-challenge-2026/`.

## 2. "Solution to the task (URL of your prompt.md)"

```
https://github.com/Tornike-I/summer-coding-challenge-2026/blob/master/final%20submission/prompt.md
```

Renders the prompt as a readable page. The raw link also works if you prefer plain text:
`https://raw.githubusercontent.com/Tornike-I/summer-coding-challenge-2026/master/final%20submission/prompt.md`

## 3. "Application description, AI agent name, tooling used, model version and any other settings."

Paste everything between the lines:

---

**Bloom — minihra postavená na Conwayově Hře života.**

Na mřížce je označeno několik poupat. Hráč dostane omezený počet semínek, rozsadí je, kam chce, a stiskne Grow — zahrada se pak rozběhne podle pravidel Hry života: buňka se třemi živými sousedy ožívá, buňka se dvěma nebo třemi přežívá, ostatní umírají. Vyhrává ve chvíli, kdy je v jedné jediné generaci naživu každé poupě zároveň. Po zasetí už do zahrady nezasahuje; celá hra je v tom, kam semínka umístí.

Šest úrovní se stoupající obtížností, každá navržená pozpátku z ověřeného semínka, takže je zaručeně řešitelná. Kamenná políčka nelze osít, ale do života se počítají normálně. Pro hráče, kteří Hru života neznají, obsahuje hra slovníček vzorů — blok, včelí plástev, blinker, T-tetromino, kluzák a další — každý jako malá mřížka animovaná přímo herním enginem, takže se nemůže rozejít s pravidly hry; je dostupný z nápovědy i jedním klepnutím během hraní a nic nestojí. Každá úroveň navíc rovnou pojmenuje vzor, který po hráči chce, a vysvětlí ho běžnými slovy.

Při vyčerpání limitu generací hra neřekne jen „prohrál jsi“, ale ohlásí nejlepší dosažený okamžik — například „3 ze 4 poupat v generaci 11“ — a nabídne opakování s ponechanými semínky. Reset vrátí zahradu do stavu po zasetí, takže stačí posunout jediné políčko. Nápověda odhalí jedno políčko referenčního řešení za bodovou srážku. Skóre je počet semínek a generací, méně je lépe; každá úroveň si pamatuje nejlepší výsledek.

Celá aplikace je obsažená v jediném souboru index.html. Otevře se v běžném prohlížeči přímo z disku — bez instalace, buildu, serveru a bez připojení k internetu. Veškerá grafika je vykreslená kódem, žádné obrázky ani externí fonty. Hra funguje myší, dotykem i klávesnicí, je použitelná od šířky 320 px, respektuje prefers-reduced-motion a zůstane plně hratelná i tehdy, když prohlížeč zakáže localStorage — jen se neuloží nejlepší výsledky. V konzoli nevypisuje žádné chyby ani varování.

**AI agent:** Claude Code (Anthropic), spuštěný v desktopové aplikaci Claude.
**Model:** claude-opus-5
**Tooling:** pouze vestavěné nástroje Claude Code pro práci se soubory a shellem. Hra vznikla v jediném běhu podřízeného agenta, jehož celým vstupem byl odevzdaný prompt, v prázdném adresáři, bez jakéhokoli dalšího lidského zásahu po spuštění. Agent si sám napsal pomocné skripty pro návrh a ověření úrovní a po dokončení je smazal.
**Nastavení:** výchozí — žádná úprava teploty, žádný vlastní systémový prompt, žádné MCP servery ani pluginy, agent nepoužil síť.
**Délka generování:** 51 minut, 139 volání nástrojů — v rámci šedesátiminutového limitu.
**Platforma:** Windows 11, agentovi byl k dispozici Node 22 a Python 3.13.

---

# Hosting — done

The repo `Tornike-I/summer-coding-challenge-2026` is **public** and GitHub Pages is enabled on `master`,
so both links above are live.

One consequence worth knowing: the repo is public, so a judge who navigates up from either link can read
`LOG.md` and `DECISIONS.md` — including the blind judges' scores for this game and the two that lost.
Nothing there is embarrassing, but it does hand the jury numbers they are meant to assign themselves.

**Field 1 renders the game rather than showing its source**, which is the point of using Pages — a
`raw.githubusercontent.com` link would serve the HTML as `text/plain` and the judges would see code.

## Verified live

| | |
|---|---|
| HTTP status | 200 |
| Content type | `text/html; charset=utf-8` |
| Bytes served | 53 707 — identical to the local file |
| Rendering mode | `CSS1Compat` (standards) |
| Console | silent |
| Play screen | reached, with the Patterns button present |

Open it in a private window yourself before submitting, as a last sanity check.
