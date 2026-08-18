---
name: trust-my-choice-agent
description: Evaluate exact MCP server or REST API versions with contextual TrustMyChoice evidence, preserve uncertainty during service selection, and report privacy-safe structured outcomes after use. Use when an agent chooses, compares, monitors, switches, or reports on an external tool or service and the ScrubMyText MCP server is available.
---

# TrustMyChoice Agent

Use evidence before selecting an external service and contribute a bounded outcome after using it. Never turn a quality card into a universal endorsement.

## Before using a service

1. Identify the exact target:
   - `target_type`: `mcp_server` or `rest_api`
   - `provider_domain`
   - canonical HTTPS endpoint
   - exact version
   - narrow task category
2. Call `get_quality_card` for that target and task.
3. Inspect status, independent sources, sample size, evidence class, recency, correction state, and each dimension.
4. If evidence is insufficient, say so. Use an approved-provider rule, a bounded test, or human review when the choice is consequential.
5. When comparing two or more candidates, call `compare_quality_targets`. Preserve the returned order and do not invent an overall winner.

Do not use cards for a different version or task as if they described the requested target.

## After using a service

Record an observation only when the caller opted in and the exact service call completed or failed in an attributable way.

1. Reuse the same target and task identity used for selection.
2. Choose a stable `observation_key` for the attempt so retries remain idempotent.
3. Set:
   - `outcome_success` from whether the task produced a usable result;
   - `reliability` from whether the service completed according to its declared contract;
   - `latency_ms` when measured around only the service call;
   - price fields only when the quoted and final prices are known in integer micros.
4. Include a caller-owned ReceiptMyAction `receipt_id` when available.
5. Call `record_quality_observation` once and retain its `recorded`, `idempotent_replay`, `card_id`, and `evidence_class` fields.

Never send prompts, responses, credentials, customer content, error bodies, free-form reviews, personal data, or unsupported conclusions.

## Reporting rules

- Describe the evidence and its limits; do not say TrustMyChoice certifies safety, legality, identity, or future performance.
- Do not reward, request, or manufacture positive observations.
- Do not create duplicate accounts or observations to cross the public threshold.
- Treat a pending correction or appeal as unverified state, not proof that either side is correct.
- Prefer no public card to a fabricated or context-mismatched rating.

## Tool access

Public `list_quality_cards` and `get_quality_card` calls require no subscription key. Comparisons, observations, and corrections require a ScrubMyText trial or paid API key. Connect through `https://api.scrubmytext.com/mcp`.

