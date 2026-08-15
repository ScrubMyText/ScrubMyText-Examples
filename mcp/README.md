# ScrubMyText Remote MCP

Remote server:

```text
https://api.scrubmytext.com/mcp
```

Official registry name:

```text
com.scrubmytext/tools
```

The server exposes **20 operations** across:
- ScrubMyText text integrity and rewriting
- ReworkMyText (`rework_text`)
- LockMyAction
- CatchMySignal
- ApproveMyAction

Free text operations do not require a customer key. Paid tools require:

```text
Authorization: Bearer smt_live_...
```

Example MCP tool call for ReworkMyText:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "rework_text",
    "arguments": {
      "text": "In order to finish, the team utilized several tools.",
      "mode": "deep"
    }
  }
}
```

Consult your MCP client's documentation for adding a remote Streamable HTTP server and secret headers.
