import json, os, urllib.request

API = "https://api.scrubmytext.com"
KEY = os.environ["SCRUBMYTEXT_API_KEY"]

def post(path, body):
    req=urllib.request.Request(
        API+path,
        data=json.dumps(body).encode(),
        headers={"Content-Type":"application/json","Authorization":"Bearer "+KEY},
        method="POST",
    )
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())

approval = post("/v1/approvals/request", {
    "title":"Refund customer $725",
    "description":"Duplicate payment detected. Review before refunding.",
    "expires_in_seconds":86400,
})
print("Deliver this link to the reviewer:", approval["approval_url"])

# Later:
status = post("/v1/approvals/check", {"approval_id":approval["approval_id"]})
print(status)
