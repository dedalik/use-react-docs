/**
 * Adds meta description (and optional title) to docs Markdown when missing.
 * Pass --force to overwrite existing descriptions (except docs/index.md home).
 *
 * Run: node utils/inject-seo.mjs
 *       node utils/inject-seo.mjs --force
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, dirname, extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { loadHookNamesByCategory } from './parse-hook-catalog.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const docsRoot = join(__dirname, '../docs')
const force = process.argv.includes('--force')

const guideDescriptions = {
  'how-to.md':
    'How to use @dedalik/use-react: npm install, per-hook imports for tree-shaking, React + TypeScript patterns, Vite and Next.js, SSR-safe usage, FAQ (CRA, App Router, tree-shaking), and links to Functions docs.',
  'get-started.md':
    'Install @dedalik/use-react: tree-shakable React hooks for TypeScript, Vite, Next.js, and React 17-19. Quick start with per-hook imports.',
  'best-practice.md':
    'React hooks best practices: responsibilities, SSR-safe patterns, and testing with @dedalik/use-react.',
  'configurations.md':
    'Configure TypeScript, bundlers, and SSR safety for @dedalik/use-react hooks in production React apps.',
  'bundle-optimization.md':
    'Tree-shake @dedalik/use-react: per-hook imports, Vite and webpack bundle tips, lean production builds.',
  'components.md': 'Vue components embedded in the useReact VitePress docs: function filters and interactive listings.',
  'contributing.md':
    'Contribute to @dedalik/use-react and docs: hook catalog, tests, ssr-support.json, and focused pull requests.',
  'guidelines.md': 'Documentation and API guidelines for @dedalik/use-react hooks published on usereact.org.',
}

function walkMarkdown(dir, out = []) {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name)
    if (ent.isDirectory()) {
      if (ent.name === '.vitepress' || ent.name === 'public') continue
      walkMarkdown(p, out)
    } else if (ent.isFile() && extname(ent.name) === '.md') out.push(p)
  }
  return out
}

function truncateWords(s, max = 155) {
  if (s.length <= max) return s
  const cut = s.slice(0, max - 1)
  const sp = cut.lastIndexOf(' ')
  return `${(sp > 40 ? cut.slice(0, sp) : cut).trim()}…`
}

function hookDescription(title, hookName) {
  const short = title.length > 56 ? `${title.slice(0, 53).trim()}…` : title
  const base = `${hookName} from @dedalik/use-react: ${short}. TypeScript, tree-shakable import, examples, SSR notes.`
  return truncateWords(base, 155)
}

function categoryDescription(title, hooks) {
  const label = title.replace(/\s+hooks?$/i, '').trim() || title
  const head = hooks.slice(0, 4).join(', ')
  const tail = hooks.length > 4 ? ` (+${hooks.length - 4} more)` : ''
  const base = `${label}: ${head}${tail}. @dedalik/use-react TypeScript docs.`
  return truncateWords(base, 155)
}

function functionsIndexDescription(byCat) {
  const total = Object.values(byCat).reduce((n, a) => n + a.length, 0)
  const base = `Browse ${total} React hooks from @dedalik/use-react: filter by category, copy-paste examples, bundle sizes, SSR table. TypeScript-first.`
  return truncateWords(base, 155)
}

function main() {
  const byCat = loadHookNamesByCategory()
  const files = walkMarkdown(docsRoot)
  let updated = 0

  for (const file of files) {
    const rel = relative(docsRoot, file).replace(/\\/g, '/')
    if (rel === 'index.md') continue

    const raw = readFileSync(file, 'utf8')
    const { data, content } = matter(raw)

    if (data.layout === 'home') continue

    const shouldWriteDesc = (d) => force || d === undefined || d === null || String(d).trim() === ''

    if (rel === 'functions/index.md') {
      if (shouldWriteDesc(data.description)) {
        data.description = functionsIndexDescription(byCat)
        writeFileSync(file, matter.stringify(content, data))
        updated++
      }
      continue
    }

    if (rel.startsWith('guide/')) {
      const g = basename(rel)
      const next = guideDescriptions[g]
      if (next && shouldWriteDesc(data.description)) {
        data.description = next
        writeFileSync(file, matter.stringify(content, data))
        updated++
      }
      continue
    }

    if (rel.startsWith('functions/')) {
      const base = basename(rel, '.md')
      if (base.startsWith('use')) {
        if (shouldWriteDesc(data.description)) {
          const title = typeof data.title === 'string' ? data.title : base
          data.description = hookDescription(title, base)
          writeFileSync(file, matter.stringify(content, data))
          updated++
        }
        continue
      }
      const hooks = byCat[base]
      if (hooks && hooks.length && shouldWriteDesc(data.description)) {
        const title = typeof data.title === 'string' ? data.title : `${base} hooks`
        data.description = categoryDescription(title, hooks)
        writeFileSync(file, matter.stringify(content, data))
        updated++
        continue
      }
      if (hooks && hooks.length === 0 && base === 'array' && shouldWriteDesc(data.description)) {
        data.description =
          'Array utilities roadmap for @dedalik/use-react: reserved category for future list-focused hooks and docs.'
        writeFileSync(file, matter.stringify(content, data))
        updated++
      }
    }
  }

  console.log(`inject-seo: updated ${updated} files${force ? ' (force)' : ''}`)
}

main()
