import fs from 'node:fs'
import path from 'node:path'

const docsDir = path.resolve(process.cwd(), 'docs/functions')
const stamp = 'Last updated: 23/04/2026'

const files = fs.readdirSync(docsDir).filter((name) => /^use.*\.md$/.test(name))

for (const file of files) {
  const filePath = path.join(docsDir, file)
  const content = fs.readFileSync(filePath, 'utf8')

  let next = content.replace(/^Last updated:.*$/m, stamp)

  if (!/^Last updated:.*$/m.test(next)) {
    if (next.includes('<PackageData')) {
      next = next.replace(/(<PackageData[^\n]*>\s*\n)/, `$1\n${stamp}\n`)
    } else {
      next = next.replace(/(^# .+\n)/m, `$1\n${stamp}\n`)
    }
  }

  fs.writeFileSync(filePath, next, 'utf8')
}

console.log(`Updated Last updated in ${files.length} hook docs.`)
