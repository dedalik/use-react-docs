/**
 * Lightweight line parse of docs/.vitepress/data/hookCatalog.ts (no TS runtime).
 * Returns { categoryId: string[] hookNames }.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export function loadHookNamesByCategory() {
  const path = join(__dirname, '../docs/.vitepress/data/hookCatalog.ts')
  const text = readFileSync(path, 'utf8')
  /** @type {Record<string, string[]>} */
  const map = {}
  let current = null
  for (const line of text.split('\n')) {
    const idm = line.match(/^\s*id:\s*"([^"]+)",?\s*$/)
    if (idm) {
      current = idm[1]
      map[current] = []
      continue
    }
    const nm = line.match(/\{\s*name:\s*"([^"]+)",\s*link:/)
    if (current && nm) map[current].push(nm[1])
  }
  return map
}
