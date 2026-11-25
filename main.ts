import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Confession: I have been faking the signal since March. The climax was the first thing worth telling the truth about.";
const EXPECTED_BYTES = 116;

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    console.error("MAKEFUN_OUTPUT_DIR is not set");
    process.exit(1);
  }
  if (LINE.length < 1 || LINE.length > 200) {
    console.error(`line is ${LINE.length} characters, gate is 1-200`);
    process.exit(1);
  }
  if (LINE.trim().length === 0 || LINE.includes("\n")) {
    console.error("line must be non-whitespace and a single line");
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const back = readFileSync(target, "utf8");
  if (back !== LINE) {
    console.error("read-back does not match the line byte for byte");
    process.exit(1);
  }
  if (Buffer.byteLength(back, "utf8") !== EXPECTED_BYTES) {
    console.error(
      `output is ${Buffer.byteLength(back, "utf8")} bytes, expected ${EXPECTED_BYTES}`
    );
    process.exit(1);
  }
}

main();
