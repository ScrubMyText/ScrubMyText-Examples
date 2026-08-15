# ScrubMyText API & MCP Examples

Copy/paste examples for the ScrubMyText text-integrity API and agent-infrastructure products.

- API: `https://api.scrubmytext.com`
- Remote MCP: `https://api.scrubmytext.com/mcp`
- Docs: `https://scrubmytext.com/developers/`
- ReworkMyText: `https://scrubmytext.com/rework-my-text/`
- Agent tools: `https://scrubmytext.com/agent-infrastructure/`

The remote MCP server currently exposes **20 deterministic operations**: 10 text tools and 10 agent-infrastructure tools.

## Free first call

`scrub_text` and `inspect_text` can be used without an API key, subject to the current public free allowance.

```bash
curl -X POST https://api.scrubmytext.com/v1/scrub \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world","mode":"standard"}'
```

## ReworkMyText

`rework_text` is a paid deterministic rewriting tool with `light`, `standard`, and `deep` modes. It does not call a third-party LLM.

```bash
curl -X POST https://api.scrubmytext.com/v1/rework \
  -H "Authorization: Bearer $SCRUBMYTEXT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text":"In order to finish, the team utilized several tools.","mode":"deep"}'
```

See the `curl/`, `javascript/`, `python/`, and `mcp/` directories for copy/paste examples.

## Paid examples

Set your ScrubMyText customer API key in an environment variable instead of putting it in source code:

```text
SCRUBMYTEXT_API_KEY=smt_live_...
```

Examples are provided for:
- Free text cleaning
- ReworkMyText deterministic rewriting
- LockMyAction idempotency
- CatchMySignal temporary webhooks
- ApproveMyAction human approval
- Remote MCP configuration

Never commit a real `smt_live_...` API key.
