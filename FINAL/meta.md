# meta.md — agent, tooling, model, settings

Submission form asks for: *název AI agenta, použitý tooling, verzi modelu a případné další nastavení.*

| | |
|---|---|
| **AI agent** | Claude Code (Anthropic), running in the Claude desktop app |
| **Model** | `claude-opus-5` — the exact identifier the API reported for every generation run |
| **Tooling** | Claude Code's own file and shell tools only. Each game was produced by a **sub-agent** given the prompt as its entire input, working in an empty directory, with no follow-up messages and no human intervention once started. |
| **Settings** | Default permission mode. No temperature override, no custom system prompt, no MCP servers, no plugins, no network access used by the agents. |
| **Platform** | Windows 11, Node 22.14 and Python 3.13 available to the agent |

## Run durations

Measured wall-clock, single agent per run.

| game | run used | duration | notes |
|---|---|---|---|
| paradox-loop | attempt 4 | **51 min** | 98 tool calls. Inside the contest's 60-minute cap, but not by much. |
| bloom | run 2 | not recorded | The agent was stopped by me while still in its self-verification phase; the file it had already written is what ships. |
| districts | run 1 | not recorded | Same — stopped during self-verification. |

**Be straight about this on the form if asked**: the Bloom and Districts runs were interrupted by me
partway through their own final checks, so their true unattended duration is unknown. Only
paradox-loop has a clean, complete, measured run. None of the three was edited by hand afterwards.

## Verification tooling (mine, not the agent's)

Not part of the submission, but this is how the outputs were checked:

- `tools/validate.js` — 25 automated checks per build in headless Chromium via Playwright: single file,
  no remote URLs, no ES modules, no `fetch`/XHR/WebSocket, no encoded asset blobs, clean console, no
  horizontal overflow at 320/375/1440 px, interaction changes state, a 40-click fuzz pass, a pass with
  `localStorage` forced to throw, and a pass under `prefers-reduced-motion: reduce`.
- `tools/checkprompt.js` — contest compliance for the prompt: character count, code fences, base64
  blobs, data URIs.
- Blind judging: a separate sub-agent per build, given only the rubric, that build's prompt, its
  `index.html`, its automated report and its screenshots — never my notes, never which candidate it was.
