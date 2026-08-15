import json
import os
import urllib.request

API = "https://api.scrubmytext.com"
KEY = os.environ["SCRUBMYTEXT_API_KEY"]

payload = {
    "text": "In order to finish, the team utilized several tools.",
    "mode": "deep",
}

req = urllib.request.Request(
    API + "/v1/rework",
    data=json.dumps(payload).encode(),
    headers={
        "Content-Type": "application/json",
        "Authorization": "Bearer " + KEY,
    },
    method="POST",
)

with urllib.request.urlopen(req) as response:
    print(json.loads(response.read()))
