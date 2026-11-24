// SPDX-License-Identifier: MIT
// Make the AI Judge Laugh: Developer Excuses
// Writes one funny single-line developer excuse to /output/entry.txt
// (or the path given with --output, else $OUTPUT_PATH when set,
// for local testing).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY_LINE =
  "I didn't break prod \u2014 my 'temporary fix' from 2021 just handed in its notice and took the database with it.";

const MAX_CHARS = 200;

function validate(text: string): string {
  if (!(text.length >= 1 && text.length <= MAX_CHARS)) {
    throw new Error(`line must be 1-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (text !== text.trim()) {
    throw new Error("no leading/trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("must be a single line");
  }
  if (!text.trim()) {
    throw new Error("must not be only whitespace");
  }
  return text;
}

function write_entry(text: string, outPath: string): void {
  const valid = validate(text);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, valid, "utf8");
  console.log(`Wrote ${valid.length} characters to ${outPath}`);
}

function parse_output_flag(argv: string[]): string | undefined {
  const idx = argv.indexOf("--output");
  if (idx !== -1) {
    const value = argv[idx + 1];
    if (!value || value.startsWith("--")) {
      throw new Error("--output needs a path");
    }
    return value;
  }
  return undefined;
}

const outPath =
  parse_output_flag(process.argv.slice(2)) ??
  process.env.OUTPUT_PATH ??
  "/output/entry.txt";

write_entry(ENTRY_LINE, outPath);
