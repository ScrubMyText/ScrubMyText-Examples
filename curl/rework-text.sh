#!/usr/bin/env bash
set -euo pipefail

: "${SCRUBMYTEXT_API_KEY:?Set SCRUBMYTEXT_API_KEY first}"

curl -sS -X POST https://api.scrubmytext.com/v1/rework \
  -H "Authorization: Bearer ${SCRUBMYTEXT_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"text":"In order to finish, the team utilized several tools.","mode":"deep"}'
