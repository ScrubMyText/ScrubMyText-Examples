# ScrubMyText API & MCP Examples

Copy/paste examples for the ScrubMyText text-integrity API and agent-infrastructure products.

- API: `https://api.scrubmytext.com`
- Remote MCP: `https://api.scrubmytext.com/mcp`
- Docs: `https://scrubmytext.com/developers/`
- Agent tools: `https://scrubmytext.com/agent-infrastructure/`

## Free first call

`scrub_text` and `inspect_text` can be used without an API key, subject to the current public free allowance.

```bash
curl -X POST https://api.scrubmytext.com/v1/scrub \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world","mode":"standard"}'
```

## Paid examples

Set your ScrubMyText customer API key in an environment variable instead of putting it in source code:

```text
SCRUBMYTEXT_API_KEY=smt_live_...
```

Examples are provided for:
- Free text cleaning
- LockMyAction idempotency
- CatchMySignal temporary webhooks
- ApproveMyAction human approval
- Remote MCP configuration

Never commit a real `smt_live_...` API key.
