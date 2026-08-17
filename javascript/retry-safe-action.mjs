const API = "https://api.scrubmytext.com";
const key = process.env.SCRUBMYTEXT_API_KEY;

if (!key) throw new Error("Set SCRUBMYTEXT_API_KEY before running this example.");

const action = {
  action: "send_invoice",
  scope: "production",
  arguments: { invoice_id: "inv_42", customer_id: "customer_7" },
};

async function post(path, body, authenticated = true) {
  const headers = { "Content-Type": "application/json" };
  if (authenticated) headers.Authorization = `Bearer ${key}`;

  const response = await fetch(`${API}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`${path} failed with HTTP ${response.status}`);
  return response.json();
}

// Free and stateless: equivalent attempts derive the same identity.
const fingerprint = await post("/v1/actions/fingerprint", action, false);
console.log("fingerprint:", fingerprint.action_fingerprint);

// Paid and atomic: derive the identity and reserve it in one operation.
const lock = await post("/v1/actions/lock-intent", action);
console.log("lock:", lock);

if (lock.safe_to_execute === true) {
  // Replace this line with the consequential API call. If that call times out,
  // mark the action uncertain and reconcile it before any retry.
  console.log("execute the external action exactly once");

  const completed = await post("/v1/actions/complete", {
    key: lock.key,
    lock_id: lock.lock_id,
  });
  console.log("complete:", completed);
} else {
  console.log("blocked: an equivalent action is already locked or completed");
}
