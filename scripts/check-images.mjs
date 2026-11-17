// Verifies that every Unsplash photo used on the site responds with HTTP 200 and an image.
// Usage: npm run check:images
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../data/content.ts", import.meta.url), "utf8");
const ids = [...new Set([...source.matchAll(/id:\s*"(\d{10,}-[a-f0-9]{12})"/g)].map((m) => m[1]))];

if (!ids.length) {
  console.error("No photo ids found in data/content.ts");
  process.exit(1);
}

let failed = 0;
for (const id of ids) {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=60`;
  try {
    const res = await fetch(url, { method: "HEAD" });
    const type = res.headers.get("content-type") ?? "";
    const ok = res.ok && type.startsWith("image/");
    if (!ok) failed++;
    console.log(`${ok ? "OK  " : "FAIL"} ${res.status} ${type.padEnd(12)} ${id}`);
  } catch (err) {
    failed++;
    console.log(`FAIL ERR  ${id} — ${err.message}`);
  }
}

console.log(`\n${ids.length - failed}/${ids.length} images reachable`);
process.exit(failed ? 1 : 0);
