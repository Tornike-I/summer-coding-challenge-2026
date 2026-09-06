# Form field: description of the app and its functionality

*"Krátký popis aplikace a její funkcionality."*

Paste the Czech below. The English is underneath for reference only.

---

## Česky

> **Bloom** je logická hra postavená na Conwayově Hře života. Na mřížce je označeno několik **poupat**.
> Dostaneš omezený počet semínek — méně, než by se hodilo — a rozsadíš je, kam chceš. Pak stiskneš
> **Grow** a zahrada se rozběhne podle pravidel Hry života: buňka se třemi živými sousedy ožívá, buňka se
> dvěma nebo třemi přežívá, ostatní umírají. Vyhráváš ve chvíli, kdy je v jedné jediné generaci naživu
> **každé poupě zároveň**. Po zasetí už do zahrady nezasáhneš; celá hra je v tom, kam semínka umístíš.
>
> Šest úrovní se stoupající obtížností. Každá je navržená pozpátku z ověřeného semínka — vzor se nechal
> doběhnout dopředu a poupata jsou jeho živé buňky v cílové generaci — takže je zaručeně řešitelná.
> Kamenná políčka nelze osít, ale do života se počítají normálně.
>
> Aby hra nebyla neprůchodná pro někoho, kdo Hru života nezná, obsahuje **slovníček vzorů**: blok,
> včelí plástev, blinker, T-tetromino, kluzák a další, každý jako malá mřížka animovaná přímo herním
> enginem, takže se nemůže rozejít s pravidly hry. Je dostupný z nápovědy i jedním klepnutím během hraní
> a nic nestojí. Každá úroveň navíc rovnou pojmenuje vzor, který po hráči chce, a vysvětlí ho běžnými
> slovy.
>
> Když dojde limit generací, hra neřekne jen „prohrál jsi“, ale ohlásí nejlepší okamžik — například
> „3 ze 4 poupat v generaci 11“ — a nabídne opakování s ponechanými semínky. Reset vrátí zahradu do stavu
> po zasetí, takže stačí posunout jediné políčko. Nápověda odhalí jedno políčko referenčního řešení za
> bodovou srážku. Skóre je počet semínek a generací, méně je lépe; každá úroveň si pamatuje nejlepší
> výsledek.
>
> Celá aplikace je v jediném souboru `index.html`. Otevře se v běžném prohlížeči přímo z disku — bez
> instalace, buildu, serveru a bez připojení k internetu. Veškerá grafika je vykreslená kódem, žádné
> obrázky ani externí fonty. Hra funguje myší, dotykem i klávesnicí, je použitelná od šířky 320 px,
> respektuje `prefers-reduced-motion` a zůstane plně hratelná i tehdy, když prohlížeč zakáže
> `localStorage` — jen se neuloží nejlepší výsledky.

---

## English

> **Bloom** is a puzzle built on Conway's Game of Life. A few cells on the grid are marked as **buds**.
> You get a limited handful of seeds — fewer than you would like — and plant them where you choose. Then
> you press **Grow** and the garden runs Life: a cell with three live neighbours is born, one with two or
> three survives, everything else dies. You win the moment one single generation has **every bud alive at
> once**. After planting you never touch the garden again; the whole game is where the seeds go.
>
> Six levels of rising difficulty. Each is designed backwards from a verified seed — the pattern was run
> forward and the buds are its live cells at the target generation — so every level is guaranteed
> solvable. Stone cells cannot be seeded but take part in Life normally.
>
> So that the game is not a wall for someone who has never seen Life, it ships a **pattern primer**:
> block, beehive, blinker, T-tetromino, glider and more, each a small grid animated by the game's own
> engine so it can never disagree with the rules. It is reachable from the help screen and one tap away
> during play, and it costs nothing. Every level also names the pattern it wants and explains it in plain
> words.
>
> When the generation limit runs out the game does not just say "failed" — it reports your best moment,
> e.g. "3 of 4 buds at generation 11", and offers a retry with the seeds still in place. Reset returns the
> garden to your planting so you can move a single cell. A hint reveals one cell of the reference solution
> at a score penalty. Score is seeds and generations, fewer better, with a per-level best.
>
> The entire application is one `index.html`. It opens in a normal browser straight from disk — no
> install, no build, no server, no network. Every graphic is drawn in code; no images, no web fonts. Mouse,
> touch and keyboard all work, it is usable from 320 px wide, it respects `prefers-reduced-motion`, and it
> stays fully playable when the browser denies `localStorage` — you just lose saved best scores.
