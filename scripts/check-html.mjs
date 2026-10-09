import fs from "node:fs";
import assert from "node:assert/strict";
const base = process.env.TEST_URL || "http://localhost:3001";
const home = JSON.parse(fs.readFileSync("content/forside.json"));
const pages = JSON.parse(fs.readFileSync("content/sider.json"));
const entries = [["", home], ...Object.entries(pages)];
const plain = (s) =>
  s
    .replace(/<br\s*\/?\s*>/g, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/<!--.*?-->/g, "")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
const checked = new Set();
for (const [slug, page] of entries) {
  const response = await fetch(base + "/" + slug);
  assert.equal(response.status, 200, slug);
  const html = await response.text();
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `Én H1: ${slug}`);
  const h1 = plain(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] || "");
  assert.equal(h1, page.h1);
  for (const heading of page.sections || [])
    assert(html.includes(heading.title), `${slug}: ${heading.title}`);
  for (const f of page.faq || []) assert(html.includes(f.a), f.q);
  for (const token of ["22 77 88 54", "Flegebakken 40", "36042605"])
    assert(html.includes(token), `${slug}: ${token}`);
  for (const match of html.matchAll(/href="(\/(?!_next)[^"#?]*)"/g)) {
    const path = match[1];
    if (checked.has(path)) continue;
    checked.add(path);
    const r = await fetch(base + path);
    assert(r.ok, `${path} ${r.status}`);
  }
  console.log(`OK HTML og links /${slug}`);
}
assert.equal((await fetch(base + "/keystatic")).status, 404);
assert.equal((await fetch(base + "/api/keystatic/test")).status, 404);
const origin = "http://localhost:3000";
const payload = {
  name: "Test",
  email: "test@example.com",
  phone: "",
  subject: "Et nyt hjem",
  message: "Automatisk test uden afsendelse",
  website: "",
};
const post = (body, headers = {}) =>
  fetch(base + "/api/kontakt", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
assert.equal((await fetch(base + "/api/kontakt")).status, 405);
assert.equal(
  (await post(payload, { Origin: "https://example.com" })).status,
  403,
);
assert.equal(
  (await post(payload, { "Content-Type": "text/plain" })).status,
  415,
);
assert.equal(
  (await post({ ...payload, message: "x".repeat(17000) })).status,
  413,
);
assert.equal((await post({ ...payload, unknown: true })).status, 400);
assert.equal((await post({ ...payload, website: "bot" })).status, 204);
assert.equal((await post(payload)).status, 503);
console.log(
  "OK API: 405, 403, 415, 413, 400, honeypot 204, manglende opsætning 503. Ingen mail sendt.",
);
