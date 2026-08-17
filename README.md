# ScrubMyText API & MCP Examples

Copy/paste examples for deterministic work AI agents should not improvise: cleaning untrusted text, validating outputs, preventing duplicate actions, waiting for webhooks, and requiring human approval.

- API: `https://api.scrubmytext.com`
- Remote MCP: `https://api.scrubmytext.com/mcp`
- Agent quickstarts: https://scrubmytext.com/agent-quickstarts/
- Pricing and 7-day Starter trial: https://scrubmytext.com/pricing/

The remote MCP server exposes **22 deterministic operations**: 10 text tools and 12 agent-infrastructure operations.

## Fastest first success: stable action identity

This call is free and requires no account or API key. Equivalent JSON arguments produce the same action fingerprint even when object-key order changes.

```bash
curl https://api.scrubmytext.com/v1/actions/fingerprint \
  -H "Content-Type: application/json" \
  -d '{"action":"send_invoice","scope":"production","arguments":{"invoice_id":"inv_42","customer_id":"customer_7"}}'
```

Fingerprinting identifies equivalent intent; it does not reserve the action. For a consequential action, use the paid `lock_action_intent` workflow and execute only when `safe_to_execute` is `true`.

- [Python retry-safe action](python/lock_my_action.py)
- [JavaScript retry-safe action](javascript/retry-safe-action.mjs)
- [Five-minute action-safety quickstart](https://scrubmytext.com/agent-action-safety-quickstart/)

## Free text cleaning

`scrub_text` and `inspect_text` can be used without an API key, subject to the public free allowance.

```bash
curl https://api.scrubmytext.com/v1/scrub \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world","mode":"standard"}'
```

## Remote MCP

Connect a Streamable HTTP MCP client to:

```text
https://api.scrubmytext.com/mcp
```

The official MCP Registry name is `com.scrubmytext/tools`. Tool discovery and free operations do not require an API key. Subscription operations send `Authorization: Bearer smt_live_...` as a secret connection header.

See [the MCP examples and recommended action-safety sequence](mcp/README.md).

## Paid examples

Start the card-required seven-day Starter trial at https://scrubmytext.com/pricing/. Unless canceled before the trial ends, Starter renews at $15/month; there are no automatic overages.

Store the resulting API key in an environment variable instead of source code:

```text
SCRUBMYTEXT_API_KEY=smt_live_...
```

Examples are provided for:

- ReworkMyText deterministic rewriting
- LockMyAction retry and duplicate protection
- CatchMySignal temporary webhooks
- ApproveMyAction human approval
- Remote MCP configuration

Never commit a real `smt_live_...` API key, webhook URL, approval URL, or secret-bearing payload.
