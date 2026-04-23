import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const docsDir = path.resolve(process.cwd(), "docs/functions");
const distHooksDir = path.resolve(process.cwd(), "../use-react/dist/esm/hooks");
const srcHooksDir = path.resolve(process.cwd(), "../use-react/src/hooks");
const tsRequire = createRequire(path.resolve(process.cwd(), "../use-react/package.json"));
const ts = tsRequire("typescript");
let prettier = null;
try {
  prettier = tsRequire("prettier");
} catch {
  prettier = null;
}

function relaxJsFormatting(code) {
  let out = code;

  // One blank line after the last import before the rest of the file.
  out = out.replace(/^((?:import [^\n]+\n)+)(?=\S)/m, "$1\n");

  // Breathing room after common hook "setup" statements (2-space body).
  out = out.replace(/;\n(  (?:const|let|useEffect|useCallback|return)\b)/g, ";\n\n$1");
  out = out.replace(/\}\);\n(  (?:const|let|useEffect|useCallback|return)\b)/g, "});\n\n$1");

  // Deeper nesting (4+ spaces, multiples of 2): blank before the next statement.
  out = out.replace(/;\n((?: {2}){2,}(?:if|const|let)\b)/g, ";\n\n$1");
  out = out.replace(/\}\n((?: {2}){2,}(?:if|const|let)\b)/g, "}\n\n$1");

  // Before file-level export.
  out = out.replace(/\}\nexport default\b/g, "}\n\nexport default");
  out = out.replace(/\};\nexport default\b/g, "};\n\nexport default");
  out = out.replace(/\);\nexport default\b/g, ");\n\nexport default");

  // Normalize excessive blank lines.
  out = out.replace(/\n{3,}/g, "\n\n");
  return out.trim();
}

async function normalizeJsCopyBlockForDocs(js) {
  const normalized = js
    .replace(/from\s+'([^']+)'/g, 'from "$1"')
    .replace(/^import\s+React,\s*\{\s*([^}]+)\s*\}\s+from\s+"react";$/gm, 'import { $1 } from "react";')
    .trim();

  const withIndent = normalized
    .split("\n")
    .map((line) => {
      const m = line.match(/^(\s+)/);
      if (!m) return line;
      const n = m[1].length;
      if (n < 4 || n % 4 !== 0) return line;
      return " ".repeat(n / 2) + line.slice(n);
    })
    .join("\n");

  if (!prettier) return relaxJsFormatting(withIndent);
  try {
    const formatted = (
      await prettier.format(withIndent, {
        parser: "babel",
        singleQuote: true,
        trailingComma: "es5",
        semi: true,
        printWidth: 72,
        bracketSpacing: true,
        arrowParens: "always",
      })
    ).trim();

    const withModuleQuotes = formatted.replace(
      /^(import\s+[^;]+?from\s+)['"]([^'"]+)['"];/gm,
      '$1"$2";',
    );

    return relaxJsFormatting(withModuleQuotes);
  } catch {
    return relaxJsFormatting(withIndent);
  }
}

function readHookJsCode(hookName) {
  const distPath = path.join(distHooksDir, `${hookName}.js`);

  if (fs.existsSync(distPath)) {
    return fs.readFileSync(distPath, "utf8").replace(/^\/\/# sourceMappingURL=.*$/gm, "").trim();
  }
  return null;
}

function readHookTsCode(hookName) {
  const tsxPath = path.join(srcHooksDir, `${hookName}.tsx`);
  const tsPath = path.join(srcHooksDir, `${hookName}.ts`);
  const sourcePath = fs.existsSync(tsxPath) ? tsxPath : tsPath;
  if (!sourcePath || !fs.existsSync(sourcePath)) return null;
  return fs.readFileSync(sourcePath, "utf8").trim();
}

function transpileTsSourceToJs(tsCode, fileName) {
  const result = ts.transpileModule(tsCode, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.Preserve,
      removeComments: false,
      esModuleInterop: false,
    },
    fileName,
  });
  return result.outputText.trim().replace(/^\/\/# sourceMappingURL=.*$/gm, "").trim();
}

function buildCopyPasteSection(tsCode, jsCode) {
  return `## Copy-paste hook

\`\`\`tsx
${tsCode}
\`\`\`

### JavaScript version

\`\`\`js
${jsCode}
\`\`\``;
}

function insertCopyPasteSection(md, section) {
  const markerRegex = /\n## (Type declarations|Type Declarations)\b/m;
  const marker = md.match(markerRegex);
  if (marker && typeof marker.index === "number") {
    return `${md.slice(0, marker.index)}\n${section}\n\n${md.slice(marker.index + 1)}`;
  }
  return `${md.trimEnd()}\n\n${section}\n`;
}

const files = fs.readdirSync(docsDir).filter((fileName) => /^use.*\.md$/.test(fileName));
const missingImplementations = [];

for (const fileName of files) {
  const hookName = fileName.replace(/\.md$/, "");
  const mdPath = path.join(docsDir, fileName);

  let md = fs.readFileSync(mdPath, "utf8");
  const tsCode = readHookTsCode(hookName);
  const rawJs = tsCode
    ? transpileTsSourceToJs(tsCode, `${hookName}.tsx`)
    : readHookJsCode(hookName);
  if (!rawJs || !tsCode) {
    if (!md.includes("## Copy-paste hook")) {
      missingImplementations.push(hookName);
    }
    continue;
  }
  const jsCode = await normalizeJsCopyBlockForDocs(rawJs);
  const section = buildCopyPasteSection(tsCode, jsCode);

  if (!md.includes("## Copy-paste hook")) {
    md = insertCopyPasteSection(md, section);
  } else {
    md = md.replace(/## Copy-paste hook[\s\S]*?(?=\n## [^\n]+|$)/, section);
  }

  fs.writeFileSync(mdPath, `${md}\n`, "utf8");
}

console.log(`Refreshed JavaScript blocks for ${files.length} files.`);
if (missingImplementations.length > 0) {
  console.log(`Skipped (no source implementation found): ${missingImplementations.join(", ")}`);
}
