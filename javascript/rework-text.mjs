const API = "https://api.scrubmytext.com";
const key = process.env.SCRUBMYTEXT_API_KEY;

if (!key) throw new Error("Set SCRUBMYTEXT_API_KEY first");

const response = await fetch(`${API}/v1/rework`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${key}`,
  },
  body: JSON.stringify({
    text: "In order to finish, the team utilized several tools.",
    mode: "deep",
  }),
});

if (!response.ok) {
  throw new Error(`${response.status}: ${await response.text()}`);
}

console.log(await response.json());
