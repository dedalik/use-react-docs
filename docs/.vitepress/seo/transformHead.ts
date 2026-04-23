import type { HeadConfig, PageData, SiteData } from 'vitepress'

const SITE = (process.env.SITE_URL || 'https://usereact.org').replace(/\/$/, '')
const AUTHOR_NAME = 'Radiks Alijevs'
const AUTHOR_URL = 'https://github.com/dedalik'
const PUBLISHER_NAME = 'useReact'

/** Map markdown path to site pathname (clean URLs, no .html). */
function pathFromMd(relativePath: string): string {
  const n = relativePath.replace(/\\/g, '/').replace(/\.md$/, '')
  if (n === 'index') return '/'
  if (n.endsWith('/index')) {
    const p = `/${n.slice(0, -'/index'.length)}`
    return p === '/' ? '/' : p.replace(/\/$/, '') || '/'
  }
  return `/${n}`
}

function buildCanonical(siteData: SiteData, pageData: PageData): string {
  const pathname = pathFromMd(pageData.relativePath)
  const base = siteData.base || '/'
  const baseNorm = base === '/' ? '' : base.replace(/\/$/, '')
  if (pathname === '/') return `${SITE}${baseNorm}/`.replace(/([^:]\/)\/+/, '$1/')
  return `${SITE}${baseNorm}${pathname}`
}

function buildJsonLd(args: { canonical: string; title: string; description: string; lang: string }): string {
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: PUBLISHER_NAME,
      url: `${SITE}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/logo.png`,
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: `${SITE}/`,
      name: PUBLISHER_NAME,
      inLanguage: args.lang,
      publisher: { '@id': `${SITE}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${args.canonical}#webpage`,
      url: args.canonical,
      name: args.title,
      description: args.description,
      isPartOf: { '@id': `${SITE}/#website` },
      inLanguage: args.lang,
      author: {
        '@type': 'Person',
        name: AUTHOR_NAME,
        url: AUTHOR_URL,
      },
      publisher: { '@id': `${SITE}/#organization` },
    },
  ]

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  })
}

export interface TransformHeadContext {
  siteData: SiteData
  pageData: PageData
  title: string
  description: string
}

export function transformHead(ctx: TransformHeadContext): HeadConfig[] {
  const { siteData, pageData, title, description } = ctx
  if (pageData.isNotFound) return []

  const canonical = buildCanonical(siteData, pageData)
  const lang = siteData.lang || 'en-US'
  const ld = buildJsonLd({ canonical, title, description, lang })

  const head: HeadConfig[] = [
    ['link', { rel: 'canonical', href: canonical }],
    [
      'meta',
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    ],
    ['meta', { name: 'author', content: AUTHOR_NAME }],
    ['meta', { property: 'article:author', content: AUTHOR_NAME }],
    ['meta', { property: 'article:author:url', content: AUTHOR_URL }],
    ['meta', { property: 'article:publisher', content: PUBLISHER_NAME }],
    ['meta', { property: 'article:publisher:url', content: `${SITE}/` }],
    ['meta', { name: 'publisher', content: PUBLISHER_NAME }],
    ['meta', { property: 'og:url', content: canonical }],
    ['script', { type: 'application/ld+json' }, ld],
  ]

  return head
}
