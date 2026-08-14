import json, os, urllib.request, uuid

API = "https://api.scrubmytext.com"
KEY = os.environ["SCRUBMYTEXT_API_KEY"]
action_key = "example-" + uuid.uuid4().hex

def post(path, body):
    req = urllib.request.Request(
        API + path,
        data=json.dumps(body).encode(),
        headers={"Content-Type":"application/json","Authorization":"Bearer " + KEY},
        method="POST",
    )
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())

lock = post("/v1/actions/lock", {
    "key": action_key,
    "lock_ttl_seconds": 300,
    "completion_ttl_seconds": 3600,
})
print("lock:", lock)

if lock.get("safe_to_execute"):
    # Perform your consequential action here.
    result = post("/v1/actions/complete", {
        "key": action_key,
        "lock_id": lock["lock_id"],
    })
    print("complete:", result)
