import json
import urllib.request

body = json.dumps({"text": "Hello world", "mode": "standard"}).encode()
req = urllib.request.Request(
    "https://api.scrubmytext.com/v1/scrub",
    data=body,
    headers={"Content-Type": "application/json"},
    method="POST",
)
with urllib.request.urlopen(req) as r:
    print(r.read().decode())
