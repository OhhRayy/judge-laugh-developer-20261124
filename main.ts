// SPDX-License-Identifier: MIT
// Make the AI Judge Laugh: Developer Excuses
// Writes one funny single-line developer excuse to /output/entry.txt
// (or $OUTPUT_PATH when set, for local testing).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "I didn't break prod \u2014 my 'temporary fix' from 2021 just handed in its notice and took the database with it.";

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE + "\n", "utf8");
console.log(`Wrote ${LINE.length} characters to ${outPath}`);
