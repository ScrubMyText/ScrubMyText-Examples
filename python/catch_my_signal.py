import json, os, urllib.request

API = "https://api.scrubmytext.com"
KEY = os.environ["SCRUBMYTEXT_API_KEY"]

def post(path, body, auth=True):
    headers={"Content-Type":"application/json"}
    if auth:
        headers["Authorization"]="Bearer " + KEY
    req=urllib.request.Request(API+path,data=json.dumps(body).encode(),headers=headers,method="POST")
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())

signal = post("/v1/signals/create", {
    "label":"Example callback",
    "expires_in_seconds":3600,
    "max_events":10,
})
print("Give this URL to the external service:", signal["webhook_url"])

# Later:
events = post("/v1/signals/events", {"inbox_id":signal["inbox_id"],"limit":10})
print(events)
