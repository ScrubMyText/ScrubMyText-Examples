# ScrubMyText Remote MCP

Remote server:

```text
https://api.scrubmytext.com/mcp
```

Official registry name:

```text
com.scrubmytext/tools
```

The server exposes 19 operations across:
- ScrubMyText text integrity
- LockMyAction
- CatchMySignal
- ApproveMyAction

Free text operations do not require a customer key. Paid tools require:

```text
Authorization: Bearer smt_live_...
```

Consult your MCP client's documentation for adding a remote Streamable HTTP server and secret headers.
