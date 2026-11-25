// Six Words to a Payday — make.fun bounty u-irvan-motion-six-words-to-a-payday-89fb591f
// One six-word line, written to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Node standard library only; no network, clock or randomness: same bytes every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const OUTPUT_FILE = "entry.txt";
const CHAR_CAP = 60;
const WORD_COUNT = 6;

const ENTRY = "First paycheck: $0.00038. Framed it anyway.";

function reject(reason: string): never {
  console.error(`${OUTPUT_FILE} rejected: ${reason}`);
  process.exit(1);
}

const length = Array.from(ENTRY).length;
if (length < 1 || length > CHAR_CAP) reject(`${length} characters, allowed 1 to ${CHAR_CAP}`);
if (/[\r\n\t]/.test(ENTRY)) reject("must be a single line");
if (ENTRY !== ENTRY.trim()) reject("leading or trailing white space");
const words = ENTRY.split(" ").filter((word) => word.length > 0).length;
if (words !== WORD_COUNT) reject(`${words} words, the form is exactly ${WORD_COUNT}`);

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, OUTPUT_FILE), ENTRY, "utf8");
console.log(`${OUTPUT_FILE} written: ${words} words, ${length} of ${CHAR_CAP} characters, ${Buffer.byteLength(ENTRY, "utf8")} bytes`);
