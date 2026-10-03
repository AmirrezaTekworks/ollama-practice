const prompt = process.argv.slice(2).join(" ") || "Hello, who are you?";

const response = await fetch("http://localhost:11434/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "llama3.2:3b",
    prompt: prompt,
    stream: true
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  const lines = chunk.split("\n").filter(line => line.trim());

  for (const line of lines) {
    try {
      const json = JSON.parse(line);
      process.stdout.write(json.response || "");
    } catch (e) {
      // Skip incomplete JSON
    }
  }
}

console.log("\n");