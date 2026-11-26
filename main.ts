// Entry for the make.fun bounty "Funniest Time Machine Warning Label":
// reads ENTRY.md and writes it to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(here, "ENTRY.md"), "utf8");
// The bounty wants one line of at most 120 characters. Fail loudly instead
// of writing an entry that runs over the limit.
const text = entry.trim();
if (text.length > 120) {
  process.stderr.write("warning label must be at most 120 characters\n");
  process.exit(1);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
process.stdout.write(entry);
