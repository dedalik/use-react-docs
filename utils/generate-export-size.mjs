import fs from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";

const docsRepoRoot = process.cwd();
const hooksDistDir = path.resolve(docsRepoRoot, "../use-react/dist/esm/hooks");
const outputPath = path.resolve(docsRepoRoot, "docs/export-size.json");

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  return `${kb.toFixed(1)} kB`;
}

if (!fs.existsSync(hooksDistDir)) {
  console.error(`Missing hooks dist directory: ${hooksDistDir}`);
  console.error("Run `npm run build` in ../use-react first.");
  process.exit(1);
}

const hookFiles = fs
  .readdirSync(hooksDistDir)
  .filter((fileName) => fileName.endsWith(".js"))
  .sort((a, b) => a.localeCompare(b));

const exportSizeMap = {};

for (const fileName of hookFiles) {
  const filePath = path.join(hooksDistDir, fileName);
  const content = fs.readFileSync(filePath);
  const hookName = fileName.replace(/\.js$/, "");

  exportSizeMap[hookName] = {
    size: formatSize(content.length),
    gzipped: formatSize(gzipSync(content).length),
  };
}

fs.writeFileSync(outputPath, `${JSON.stringify(exportSizeMap, null, 2)}\n`, "utf8");
console.log(`Updated ${outputPath} with ${hookFiles.length} hook entries.`);
