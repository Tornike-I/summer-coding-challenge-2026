# Form field: agent, tooling, model, settings

*"Název AI agenta, použitý tooling, verzi modelu a případné další nastavení."*

Paste this:

> **Agent:** Claude Code (Anthropic), spuštěný v desktopové aplikaci Claude.
>
> **Model:** claude-opus-5
>
> **Tooling:** pouze vestavěné nástroje Claude Code pro práci se soubory a shellem. Hra vznikla v jediném
> běhu podřízeného agenta, jehož celým vstupem byl odevzdaný prompt, v prázdném adresáři, bez jakéhokoli
> dalšího lidského zásahu po spuštění. Agent si sám napsal pomocné skripty pro návrh a ověření úrovní a
> po dokončení je smazal.
>
> **Nastavení:** výchozí. Žádná úprava teploty, žádný vlastní systémový prompt, žádné MCP servery ani
> pluginy. Agent nepoužil síť.
>
> **Délka generování:** 51 minut, 139 volání nástrojů — v rámci šedesátiminutového limitu.
>
> **Platforma:** Windows 11; agentovi byl k dispozici Node 22 a Python 3.13.

---

### English, for reference

| | |
|---|---|
| **Agent** | Claude Code (Anthropic), running in the Claude desktop app |
| **Model** | `claude-opus-5` — the identifier the API reported for the run |
| **Tooling** | Claude Code's own file and shell tools only. The game came out of a single sub-agent run whose entire input was the submitted prompt, in an empty directory, with no human intervention after launch. The agent wrote its own throwaway scripts to design and verify the levels, and deleted them when done. |
| **Settings** | Default. No temperature override, no custom system prompt, no MCP servers, no plugins. The agent used no network. |
| **Duration** | 51 minutes, 139 tool calls — inside the 60-minute cap |
| **Platform** | Windows 11, with Node 22 and Python 3.13 available |

The run was clean and unattended: the agent decided on its own that it was finished.
