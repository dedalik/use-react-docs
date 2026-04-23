import { defineConfig } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { buildCoreFunctionsSidebarGroup } from './data/hookCatalog'
import { transformHead as seoTransformHead } from './seo/transformHead'

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
  themeConfig: {
    logo: '/favicon.png',
    editLink: {
      pattern: 'https://github.com/dedalik/use-react/tree/main/:path',
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
      buildCoreFunctionsSidebarGroup(),
    ] as any,

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
      ['meta', { name: 'twitter:creator', content: '@antfu7' }],
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

    socialLinks: [{ icon: 'github', link: 'https://github.com/dedalik/use-react' }],

    search: {
      provider: 'local',
    },
  },
})
