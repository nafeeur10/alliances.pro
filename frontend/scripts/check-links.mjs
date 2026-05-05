#!/usr/bin/env node
/**
 * Crawl every internal href referenced from the navbar and footer data files
 * and assert each one returns a 2xx (or a tolerated 3xx redirect that lands on
 * 2xx). Run with `npm run check-links`.
 *
 * The script reads the .ts data files as plain text and grabs every
 * `url: "..."` / `href: "..."` literal — that way we don't have to transpile
 * TypeScript to run the linter.
 *
 * Usage:
 *   npm run check-links                              # uses BASE_URL or http://localhost
 *   BASE_URL=https://alliances.pro npm run check-links
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BASE = (process.env.BASE_URL ?? "http://localhost").replace(/\/$/, "");

const ANSI = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  dim: "\x1b[2m"
};

function colorize(code, text) {
  if (code >= 200 && code < 300) return `${ANSI.green}${text}${ANSI.reset}`;
  if (code >= 300 && code < 400) return `${ANSI.yellow}${text}${ANSI.reset}`;
  return `${ANSI.red}${text}${ANSI.reset}`;
}

const SOURCES = ["@data/footer.ts", "@data/navbar.ts"];
const EXTRA_INTERNAL_ROUTES = ["/blog"]; // dynamic routes / not in data

function extractInternalHrefs() {
  const found = new Set();
  for (const rel of SOURCES) {
    const full = join(ROOT, rel);
    const text = readFileSync(full, "utf8");
    for (const match of text.matchAll(/(?:url|href):\s*"([^"]+)"/g)) {
      const value = match[1];
      if (!value.startsWith("/")) continue;          // skip external + anchors
      const path = value.split("#")[0] || "/";       // drop hash, keep root if just "#"
      found.add(path);
    }
  }
  for (const p of EXTRA_INTERNAL_ROUTES) found.add(p);
  return [...found].sort();
}

async function checkOne(path) {
  const url = `${BASE}${path}`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    return { path, status: res.status, ok: res.ok };
  } catch (err) {
    return { path, status: 0, ok: false, error: err.message };
  }
}

async function main() {
  const links = extractInternalHrefs();
  console.log(`${ANSI.dim}Checking ${links.length} internal links against ${BASE}${ANSI.reset}\n`);

  const results = await Promise.all(links.map(checkOne));

  for (const r of results) {
    const code = r.status === 0 ? "ERR" : String(r.status);
    const tag = colorize(r.status, code.padStart(3));
    console.log(`  ${tag}  ${r.path}${r.error ? ` ${ANSI.dim}(${r.error})${ANSI.reset}` : ""}`);
  }

  const failed = results.filter((r) => !r.ok);
  console.log("");
  if (failed.length === 0) {
    console.log(`${ANSI.green}✓ All ${results.length} links resolved.${ANSI.reset}`);
    process.exit(0);
  } else {
    console.log(`${ANSI.red}✗ ${failed.length} of ${results.length} links failed.${ANSI.reset}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
