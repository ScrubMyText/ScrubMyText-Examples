# ScrubMyText Remote MCP

Connect a Streamable HTTP MCP client to:

```text
https://api.scrubmytext.com/mcp
```

Official registry name: `com.scrubmytext/tools`

The server exposes **22 deterministic operations** across text integrity, rewriting, action identity and locking, temporary webhook inboxes, and human approval.

Tool discovery and the public free allowance do not require a customer key. Subscription tools require this secret connection header:

```text
Authorization: Bearer smt_live_...
```

A common client configuration looks like this; use your client's secret or environment-variable syntax instead of committing a key:

```json
{
  "mcpServers": {
    "scrubmytext": {
      "url": "https://api.scrubmytext.com/mcp"
    }
  }
}
```

## Recommended action-safety sequence

1. Call `fingerprint_action` to confirm equivalent attempts derive one identity. This is free and does not reserve anything.
2. Call `lock_action_intent` with the same action, scope, and identity-defining arguments.
3. Execute the external action only when `safe_to_execute` is exactly `true`.
4. Call `complete_action` with the returned `key` and `lock_id` after confirmed success.
5. If the external result is unknown, call `mark_action_uncertain` and reconcile independently before retrying.

LockMyAction coordinates retries; it does not authorize the action or prove that an external side effect occurred.

- Five-minute quickstart: https://scrubmytext.com/agent-action-safety-quickstart/
- All agent quickstarts: https://scrubmytext.com/agent-quickstarts/
- Pricing and seven-day Starter trial: https://scrubmytext.com/pricing/
