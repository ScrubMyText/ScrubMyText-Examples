# ScrubMyText Deep Rewrite prototype

This prototype adds a semantic-reconstruction product concept intended to produce a fresh expression of source text while preserving factual meaning.

## Product positioning

Suggested public name: **Deep Rewrite**

Suggested description: **Rebuild the writing, not just the words. Deep Rewrite reconstructs text while preserving meaning, facts and important details. Useful when you want a fresh expression of machine-generated text and fewer inherited AI-style or provenance signatures.**

Do not promise that a provider-specific watermark has been removed unless an authorized/compatible detector actually verifies that result.

## Proposed endpoint

`POST /v1/reconstruct`

```json
{
  "text": "Text to reconstruct",
  "mode": "strong"
}
```

Modes: `light`, `strong`, `reconstruct`.

Suggested response:

```json
{
  "text": "Reconstructed text",
  "mode": "strong",
  "metrics": {
    "lexical_change": 0.63,
    "structural_change": 0.54
  },
  "verification": {
    "watermark_removed": null,
    "claim": "not_tested"
  }
}
```

## Integration

- `deep-rewrite.html` is a standalone responsive product-page prototype.
- `reconstruct-route.mjs` contains the reconstruction logic and an adapter point called `callModel`.
- Replace `callModel` with the model provider already used by the production API.
- Mount the route at `/v1/reconstruct` and move the page into the production site's framework.
- Keep provider-specific watermark detection separate from reconstruction. If a permitted detector becomes available later, populate verification from that detector rather than inferring removal from rewrite metrics.
