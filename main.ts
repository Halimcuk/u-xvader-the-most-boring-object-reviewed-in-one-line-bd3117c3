import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line review of a doorstop: it does nothing all day except hold
// one door open, and that total lack of ambition is exactly why it is
// the most reliable employee in the house. (True detail first, twist last.)
const ENTRY =
  "This doorstop does nothing all day except hold one door open \u2014 and after six years without a single sick day, it is the most reliable employee in the house.";

const outputDir = process.env.OUTPUT_DIR || "/output";
const outputPath = join(outputDir, "entry.txt");

// Gate: 1 to 200 characters of UTF-8 text, not only whitespace, one line.
// Count Unicode code points so a multi-byte character counts as one.
const charCount = [...ENTRY].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`Entry must be 1-200 characters, got ${charCount}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("Entry must be a single line");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, ENTRY, "utf8");
console.log(`Wrote ${charCount} characters to ${outputPath}`);
