# ScrubMyText API & MCP Examples

Copy/paste examples for deterministic work AI agents should not improvise: cleaning untrusted text, validating outputs, preventing duplicate actions, waiting for webhooks, requiring human approval, and selecting services with contextual quality evidence.

- API: `https://api.scrubmytext.com`
- Remote MCP: `https://api.scrubmytext.com/mcp`
- Agent quickstarts: https://scrubmytext.com/agent-quickstarts/
- No-card Founding Access and paid plans: https://scrubmytext.com/pricing/

The remote MCP server exposes **49 deterministic REST/MCP operations** spanning text integrity, agent controls, and contextual service-quality evidence.

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

## TrustMyChoice evidence loop

Install the portable agent skill from [`skills/trust-my-choice-agent`](skills/trust-my-choice-agent/) or use the [zero-dependency JavaScript observer](https://scrubmytext.com/sdk/trustmychoice-observer.mjs). Both workflows check evidence for an exact service version and task before use, then submit only structured success, reliability, latency, and optional price metrics afterward. They do not send prompts, service inputs or outputs, credentials, customer content, or exception text.

- [TrustMyChoice onboarding](https://scrubmytext.com/trust-my-choice/get-started/)
- [Public evidence directory](https://scrubmytext.com/trust-my-choice/)
- [REST/MCP quickstart](https://scrubmytext.com/agent-quickstarts/trust-my-choice/)

## Run the complete examples without a card

Founding Access unlocks all 49 tools for 30 days or 1,000 total calls, whichever comes first. The allowance has a hard stop and no automatic overage charge. Start at https://scrubmytext.com/pricing/ and keep the issued key in an environment variable instead of source code.

## Continue on a paid plan

After Founding Access, the card-required seven-day Starter trial renews at $15/month unless canceled before the trial ends. There are no automatic overages.

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
- TrustMyChoice service selection and structured outcome reporting

Never commit a real `smt_live_...` API key, webhook URL, approval URL, or secret-bearing payload.
