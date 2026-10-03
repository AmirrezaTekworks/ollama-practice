import { writeFileSync } from "fs";

const text = process.argv.slice(2).join(" ") || "The quick brown fox jumps over the lazy dog.";

const response = await fetch("http://localhost:11434/api/embeddings", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "nomic-embed-text",
    prompt: text
  })
});

const data = await response.json();

console.log("Text:", text);
console.log("Embedding length:", data.embedding.length);
console.log("First 5 numbers:", data.embedding.slice(0, 5));

writeFileSync("embedding.json", JSON.stringify(data.embedding, null, 2));
console.log("Saved to embedding.json");
