# The three required fields

## 1. "Task result (URL of your index.html)"

**Not available yet — needs hosting.** See *Hosting* below.

## 2. "Solution to the task (URL of your prompt.md)"

**Not available yet — needs hosting.** See *Hosting* below.

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

# Hosting — what fields 1 and 2 need

Both files must be at public URLs before the form can be submitted. The repo is private, so its links
will not work for the judges.

**Field 1 should render the game, not show its source.** The judges open it in a clean browser profile;
a `raw.githubusercontent.com` link serves HTML as `text/plain`, so they would see code instead of a
playable game. GitHub Pages serves it as a real page.

## Recommended: a small public repo with Pages

Create a public repo containing just `index.html` and `prompt.md`, enable Pages on the default branch,
and the two answers become:

```
Field 1:  https://<user>.github.io/<repo>/
Field 2:  https://github.com/<user>/<repo>/blob/main/prompt.md
```

Field 2 can also be the raw link — `prompt.md` reads fine either way, and the blob view renders it
nicely.

## Alternative: make the existing repo public

Faster, but it publishes the whole working record — `LOG.md`, `DECISIONS.md`, every candidate prompt and
the blind judges' verdicts on all of them, including the two games that lost. Nothing there is
embarrassing, but it is a lot of context handed to the jury that they did not ask for, and it names
scores the jury is meant to assign themselves.

## Check after publishing

Open the field 1 URL in a private window before submitting. You should get a playable game, not source
code and not a 404.
