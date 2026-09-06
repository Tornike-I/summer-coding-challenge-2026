# Popis aplikace a její funkcionality / Application description

Společné pro všechny tři hry: **celá aplikace je v jediném souboru `index.html`**. Otevře se v běžném
prohlížeči přímo z disku — bez instalace, bez buildu, bez serveru a bez připojení k internetu. Veškerá
grafika je vykreslená kódem (CSS, DOM, vložené SVG), žádné obrázky ani externí fonty. Hra funguje myší,
dotykem i klávesnicí, respektuje `prefers-reduced-motion` a zůstane plně hratelná i tehdy, když prohlížeč
zakáže `localStorage` — jen se neuloží nejlepší výsledky.

*Common to all three: the entire application lives in a single `index.html`. It opens in a normal browser
straight from disk — no install, no build, no server, no network. Every graphic is drawn in code (CSS,
DOM, inline SVG); no images, no web fonts. Mouse, touch and keyboard all work, `prefers-reduced-motion`
is respected, and the game stays fully playable when the browser denies `localStorage` — you just lose
saved best scores.*

---

## Bloom

**CZ.** Logická hra postavená na Conwayově Hře života. Na mřížce je označeno několik **poupat**. Dostaneš
omezený počet semínek — méně, než by se ti hodilo — a rozsadíš je, kam chceš. Pak stiskneš **Grow** a
zahrada se rozběhne podle pravidel Hry života. Vyhráváš ve chvíli, kdy je v jedné jediné generaci naživu
**každé poupě zároveň**. Po zasetí už do zahrady nezasáhneš; celá hra je v tom, kam semínka umístíš.

Šest úrovní se stoupající obtížností. Kamenná políčka nelze osít, ale do života se počítají. Tlačítka
Grow, Step, Pause a Reset (vrátí zahradu do stavu po zasetí, semínka zůstanou). Nápověda odhalí jedno
políčko referenčního řešení za bodovou srážku. Když dojde limit generací, hra neřekne jen „prohrál jsi“,
ale ohlásí nejlepší okamžik — například „3 ze 4 poupat v generaci 11“. Skóre je počet semínek a generací,
méně je lépe. Každá úroveň si pamatuje nejlepší výsledek.

**EN.** A puzzle built on Conway's Game of Life. A few cells on the grid are marked as **buds**. You get a
limited handful of seeds — fewer than you would like — and plant them where you choose. Then you press
**Grow** and the garden runs Life. You win the moment one single generation has **every bud alive at
once**. After planting you never touch the garden again; the whole game is where the seeds go.

Six levels of rising difficulty. Stone cells cannot be seeded but take part in Life normally. Grow, Step,
Pause and Reset (returns to your planting with the seeds intact). A hint reveals one cell of the
reference solution at a score penalty. When the generation limit runs out the game does not just say
"failed" — it reports your best moment, e.g. "3 of 4 buds at generation 11". Score is seeds and
generations, fewer better, with a per-level best.

---

## Districts

**CZ.** Logická hra o rozdělování volebních obvodů. Mřížka je plná voličů dvou barev — tyrkysové a
jantarové — a tyrkysová je ve výrazné menšině. Úkolem je rozkrájet mřížku na **stejně velké souvislé
obvody** tak, aby tyrkysová přesto získala **většinu mandátů**. Méně hlasů, více křesel.

Obvod se kreslí tak, že klikneš na volné políčko a pak přidáváš už jen políčka, která s obvodem sousedí —
souvislost tedy nejde porušit ani omylem. Táhnutím přidáš víc políček najednou. Jakmile obvod dosáhne
předepsané velikosti, uzamkne se a začne další. K dispozici je Zpět, Vymazat a nápověda. Obvod s
nerozhodným poměrem hlasů nezískává mandát pro nikoho, takže deska plná remíz je stále prohra — a hra to
řekne narovinu. Na závěrečné obrazovce stojí vedle sebe **lidové hlasování a počet mandátů**, aby bylo
vidět, co se vlastně stalo. Pět úrovní.

**EN.** A puzzle about drawing electoral districts. The grid is full of voters in two colours — Teal and
Amber — and Teal is heavily outnumbered. The task is to carve the grid into **equal-size contiguous
districts** so that Teal nonetheless wins **the majority of seats**. Fewest votes, most seats.

You draw a district by clicking an unclaimed cell and then adding only cells adjacent to that district,
so contiguity cannot be broken even by accident. Drag to add several at once. When a district reaches its
required size it locks and the next begins. Undo, Clear and a hint are available. A district with an even
split gives its seat to nobody, so a board full of ties is still a loss — and the game says so plainly.
The result screen puts the **popular vote next to the seat count** so the trick is visible. Five levels.

---

## Paradox Loop

**CZ.** Tahová logická hra na malé mřížce. Místnost potřebuje víc rukou, než máš — tak si půjčíš vlastní
minulost. Každý tvůj tah se zaznamenává. Když stiskneš **Rewind**, místnost se vrátí do výchozího stavu a
na startu se objeví **duch**, který přehrává tvůj právě dokončený pokus tah po tahu, zatímco ty vedle něj
hraješ pokus nový. Další Rewind a duchové jsou dva. Úroveň je vyřešená, když na otevřeném východu stojíš
**ty** — nikdy ne duch.

Dveře jsou otevřené, dokud na tlakové desce jejich barvy někdo stojí, ať už ty, nebo duch. Tah do zdi,
zavřených dveří nebo na obsazené políčko je odmítnut a tah se nespotřebuje. Duch, kterému něco stojí v
cestě, prostě jeden tah počká a pokračuje dál — nikdy nezmizí a nikdy nepřeplánuje. Každá úroveň má limit
tahů na jeden pokus a limit pokusů (par). Šest ručně navržených úrovní, u každé je strojově ověřeno, že je
řešitelná v rámci paru a že se k východu nedá dojít bez otevření dveří.

**EN.** A turn-based puzzle on a small grid. The room needs more hands than you have — so you borrow your
own past. Every action you take is recorded. Press **Rewind** and the room snaps back to its starting
state while a **ghost** appears at the start, replaying your just-finished attempt one action per turn as
you play a fresh attempt beside it. Rewind again and there are two ghosts. The level is solved when
**you** — never a ghost — stand on an open exit.

A door stays open while any body, yours or a ghost's, stands on a pressure plate of its colour. Moving
into a wall, a shut door or an occupied tile is refused and costs no turn. A blocked ghost simply waits
one turn and carries on — it never vanishes and never re-plans. Each level sets a turn limit per attempt
and a limit on attempts (par). Six hand-designed levels, each machine-verified to be solvable within par
and to be impossible to finish without opening a door.
