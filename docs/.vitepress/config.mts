import { defineConfig } from 'vitepress'
import type { PageData } from 'vitepress'
import path from 'node:path'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { buildCoreFunctionsSidebarGroup } from './data/hookCatalog'
import { transformHead as seoTransformHead } from './seo/transformHead'
import { SOCIAL_X_URL } from './seo/social'

// use-react-docs/ (this file is docs/.vitepress/config.mts)
const DOCS_PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')

// Monorepo: use sibling `../use-react` so docs don’t use a **stale** Vite prebundle of `node_modules/@dedalik/use-react`.
const USE_REACT_DEV_ENTRY = path.resolve(DOCS_PROJECT_ROOT, '../use-react/src/index.ts')
const USE_REACT_ALIASED = existsSync(USE_REACT_DEV_ENTRY)
/** Resolves `import x from '@dedalik/use-react/useX'` to source files when developing against local `../use-react`. */
const USE_REACT_HOOKS_SRC = path.resolve(DOCS_PROJECT_ROOT, '../use-react/src/hooks')

// Keep paths posix-ish: Vite optimizeDeps works reliably with forward slashes in this repo.
const REACT_DEMO_BASENAMES = [
  'useAsyncState.basic.ts',
  'useCounter.basic.ts',
  'useDebouncedRefHistory.basic.ts',
  'useDebounce.basic.ts',
  'useEventCallback.basic.ts',
  'useLastChanged.basic.ts',
  'useLatest.basic.ts',
  'useManualRefHistory.basic.ts',
  'useOnMount.basic.ts',
  'usePrevious.basic.ts',
  'useRefHistory.basic.ts',
  'useStorageAsync.basic.ts',
  'useStorage.basic.ts',
  'useThrottledRefHistory.basic.ts',
  'useThrottle.basic.ts',
  'useToggle.basic.ts',
] as const

const optimizeDepsInclude = [
  'react',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
  'react-dom',
  'react-dom/client',
  'shikiji',
  'shikiji/wasm',
  'shikiji-core',
  'tslib',
  ...(!USE_REACT_ALIASED ? (['@dedalik/use-react'] as const) : []),
  ...REACT_DEMO_BASENAMES.map((file) => path.posix.join('docs/.vitepress/theme/react-demos', file)),
]

function editUrlForPage(page: PageData): string {
  const m = page.relativePath.match(/^functions\/(.+)\.md$/)
  if (m) {
    return `https://github.com/dedalik/use-react/blob/main/src/hooks/${m[1]}.tsx`
  }
  return `https://github.com/dedalik/use-react-docs/blob/main/docs/${page.relativePath}`
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'useReact',
  titleTemplate: ':title | useReact',
  description: 'Collection of React Hooks',
  cleanUrls: true,
  lastUpdated: true,
  async transformHead(ctx) {
    return seoTransformHead({
      siteData: ctx.siteData,
      pageData: ctx.pageData,
      title: ctx.title,
      description: ctx.description,
    })
  },
  plugins: [vueJsx()],
  vite: {
    resolve: {
      // Prevent multiple React copies (breaks hooks when @dedalik/use-react resolves a different instance).
      dedupe: ['react', 'react-dom', 'react-dom/client'],
      // Hard pin React to a single on-disk module in dev (Vite prebundles can still split without this).
      // Subpath `import from '@dedalik/use-react/useX'` must resolve before the barrel alias; order matters.
      alias: [
        ...(USE_REACT_ALIASED
          ? ([
              {
                find: /^@dedalik\/use-react\/(.+)$/,
                replacement: `${USE_REACT_HOOKS_SRC.replace(/\\/g, '/')}/$1.tsx`,
              },
              { find: '@dedalik/use-react', replacement: USE_REACT_DEV_ENTRY },
            ] as const)
          : []),
        { find: 'react', replacement: path.join(DOCS_PROJECT_ROOT, 'node_modules/react') },
        { find: 'react/jsx-runtime', replacement: path.join(DOCS_PROJECT_ROOT, 'node_modules/react/jsx-runtime.js') },
        { find: 'react/jsx-dev-runtime', replacement: path.join(DOCS_PROJECT_ROOT, 'node_modules/react/jsx-dev-runtime.js') },
        { find: 'react-dom', replacement: path.join(DOCS_PROJECT_ROOT, 'node_modules/react-dom') },
        { find: 'react-dom/client', replacement: path.join(DOCS_PROJECT_ROOT, 'node_modules/react-dom/client.js') },
      ],
    },
    ssr: {
      noExternal: ['@dedalik/use-react'],
    },
    optimizeDeps: {
      include: optimizeDepsInclude,
      // Local `use-react` must not be served from a cached `node_modules/.vite/deps` snapshot.
      exclude: USE_REACT_ALIASED ? (['@dedalik/use-react'] as const) : [],
    },
  },
  markdown: {
    image: {
      // image lazy loading is disabled by default
      lazyLoading: true,
    },
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/favicon-32x32.png', type: 'image/png' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { property: 'og:title', content: 'UseReact' }],
    ['meta', { property: 'og:image', content: 'https://usereact.org/logo.png' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'React Hooks and Utilities Collection',
      },
    ],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:creator', content: SOCIAL_X_URL }],
    ['meta', { name: 'twitter:image', content: 'https://usereact.org/logo.png' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
      },
    ],

    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
    [
      'link',
      {
        rel: 'preconnect',
        crossorigin: 'anonymous',
        href: 'https://fonts.gstatic.com',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap',
      },
    ],

  ],

  themeConfig: {
    logo: '/favicon.png',
    editLink: {
      pattern: editUrlForPage,
      text: 'Suggest changes to this page',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/get-started' },
      { text: 'Functions', link: '/functions/' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: "Copyright © 2024-present <a href='https://github.com/dedalik'>Radiks Alijevs</a>",
    },

    sidebar: [
      {
        text: 'Guide',
        collapsed: false,
        items: [
          { text: 'Get Started', link: '/guide/get-started' },
          { text: 'How to', link: '/guide/how-to' },
          { text: 'Best Practice', link: '/guide/best-practice' },
          { text: 'Configurations', link: '/guide/configurations' },
          { text: 'Bundle Optimization', link: '/guide/bundle-optimization' },
          { text: 'Components', link: '/guide/components' },
          { text: 'Contributing', link: '/guide/contributing' },
          { text: 'Guidelines', link: '/guide/guidelines' },
        ],
      },
      ...buildCoreFunctionsSidebarGroup(),
    ] as any,

    socialLinks: [{ icon: 'github', link: 'https://github.com/dedalik/use-react' }],

    search: {
      provider: 'local',
    },
  },
})
