"""Retry-safe action identity and locking with no third-party dependencies."""

import json
import os
import urllib.request

API = "https://api.scrubmytext.com"
KEY = os.environ["SCRUBMYTEXT_API_KEY"]

# Keep only identity-defining fields here. Equivalent attempts must send the
# same action, scope, and arguments so they derive the same stable key.
ACTION = {
    "action": "send_invoice",
    "scope": "production",
    "arguments": {
        "invoice_id": "inv_42",
        "customer_id": "customer_7",
    },
}


def post(path, body, authenticated=True):
    headers = {"Content-Type": "application/json"}
    if authenticated:
        headers["Authorization"] = "Bearer " + KEY
    request = urllib.request.Request(
        API + path,
        data=json.dumps(body).encode(),
        headers=headers,
        method="POST",
    )
    with urllib.request.urlopen(request) as response:
        return json.loads(response.read())


# Free and stateless: prove retries derive the same identity before subscribing.
fingerprint = post("/v1/actions/fingerprint", ACTION, authenticated=False)
print("fingerprint:", fingerprint["action_fingerprint"])

# Paid and atomic: derive the same identity and reserve it in one operation.
lock = post("/v1/actions/lock-intent", ACTION)
print("lock:", lock)

if lock.get("safe_to_execute") is True:
    # Replace this line with the consequential API call. Do not blindly retry
    # a timeout: mark the result uncertain and reconcile it independently.
    print("execute the external action exactly once")

    completed = post(
        "/v1/actions/complete",
        {"key": lock["key"], "lock_id": lock["lock_id"]},
    )
    print("complete:", completed)
else:
    print("blocked: an equivalent action is already locked or completed")
