/**
 * Writes sitemap.xml into the VitePress dist folder after `vitepress build docs`.
 * Set SITE_URL (no trailing slash), e.g. SITE_URL=https://usereact.org npm run docs:build
 */
import { createWriteStream } from "node:fs"
import { readdirSync, statSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const siteUrl = (process.env.SITE_URL || "https://usereact.org").replace(/\/$/, "")
const distDir = join(__dirname, "../docs/.vitepress/dist")

function walkHtml(dir, acc = []) {
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return acc
  }
  for (const ent of entries) {
    const p = join(dir, ent.name)
    if (ent.isDirectory()) walkHtml(p, acc)
    else if (ent.isFile() && ent.name.endsWith(".html")) acc.push(p)
  }
  return acc
}

function htmlPathToUrl(fullPath) {
  const rel = fullPath.slice(distDir.length).replace(/\\/g, "/")
  if (rel === "/index.html" || rel === "index.html") return `${siteUrl}/`
  let path = rel.replace(/^\/+/, "")
  path = path.replace(/index\.html$/, "")
  path = path.replace(/\.html$/, "")
  path = path.replace(/\/$/, "")
  return `${siteUrl}/${path}`
}

function escapeXml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

function main() {
  const files = walkHtml(distDir)
  if (!files.length) {
    console.error("generate-sitemap: no HTML files under", distDir, "- run vitepress build first")
    process.exit(1)
  }

  const urls = []
  for (const f of files) {
    const name = f.split(/[/\\]/).pop()
    if (name === "404.html") continue
    const loc = htmlPathToUrl(f)
    const lastmod = statSync(f).mtime.toISOString()
    const priority =
      loc === `${siteUrl}/` ? "1.0" : loc.includes("/functions/use") ? "0.85" : loc.includes("/guide/") ? "0.8" : "0.75"
    urls.push({ loc, lastmod, priority })
  }

  urls.sort((a, b) => a.loc.localeCompare(b.loc))

  const outPath = join(distDir, "sitemap.xml")
  const stream = createWriteStream(outPath, { encoding: "utf8" })
  stream.write('<?xml version="1.0" encoding="UTF-8"?>\n')
  stream.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
  for (const { loc, lastmod, priority } of urls) {
    stream.write("  <url>\n")
    stream.write(`    <loc>${escapeXml(loc)}</loc>\n`)
    stream.write(`    <lastmod>${lastmod}</lastmod>\n`)
    stream.write(`    <changefreq>weekly</changefreq>\n`)
    stream.write(`    <priority>${priority}</priority>\n`)
    stream.write("  </url>\n")
  }
  stream.write("</urlset>\n")
  stream.end()
  console.log("generate-sitemap: wrote", urls.length, "entries to", outPath)
}

main()
