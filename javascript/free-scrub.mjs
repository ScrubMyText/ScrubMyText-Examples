const response = await fetch("https://api.scrubmytext.com/v1/scrub", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: "Hello world", mode: "standard" }),
});
console.log(await response.json());
