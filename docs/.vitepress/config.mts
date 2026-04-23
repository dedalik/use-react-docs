import { defineConfig } from "vitepress";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "en-US",
  title: "useReact",
  description: "Collection of React Hooks",
  cleanUrls: true,
  lastUpdated: true,
  plugins: [vueJsx()],
  markdown: {
    image: {
      // image lazy loading is disabled by default
      lazyLoading: true,
    },
    theme: {
      light: "vitesse-light",
      dark: "vitesse-dark",
    },
  },
  themeConfig: {
    logo: "/favicon.png",
    editLink: {
      pattern: "https://github.com/dedalik/use-react/tree/main/:path",
      text: "Suggest changes to this page",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/get-started" },
      { text: "Functions", link: "/functions/" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright:
        "Copyright © 2024-present <a href='https://github.com/dedalik'>Radiks Alijevs</a>",
    },

    sidebar: [
      {
        text: "Guide",
        collapsed: false,
        items: [
          { text: "Get Started", link: "/guide/get-started" },
          { text: "Best Practice", link: "/guide/best-practice" },
          { text: "Configurations", link: "/guide/configurations" },
          { text: "Bundle Optimization", link: "/guide/bundle-optimization" },
          { text: "Components", link: "/guide/components" },
          { text: "Contributing", link: "/guide/contributing" },
          { text: "Guidelines", link: "/guide/guidelines" },
        ],
      },
      {
        text: "Core Functions",
        collapsed: false,
        items: [
          {
            text: "Overview",
            link: "/functions/",
          },
          {
            text: "State",
            link: "/functions/state",
            collapsed: false,
            items: [
              { text: "useToggle", link: "/functions/useToggle" },
              { text: "useDebounce", link: "/functions/useDebounce" },
              { text: "usePrevious", link: "/functions/usePrevious" },
              { text: "useLatest", link: "/functions/useLatest" },
              { text: "useThrottle", link: "/functions/useThrottle" },
            ],
          },
          {
            text: "Elements",
            link: "/functions/elements",
            collapsed: false,
            items: [
              { text: "useTextareaAutoSize", link: "/functions/useTextareaAutoSize" },
              { text: "useClickOutside", link: "/functions/useClickOutside" },
              { text: "useDraggable", link: "/functions/useDraggable" },
            ],
          },
          {
            text: "Browser",
            link: "/functions/browser",
            collapsed: true,
            items: [
              { text: "useHash", link: "/functions/useHash" },
              { text: "useFavicon", link: "/functions/useFavicon" },
              { text: "useMediaQuery", link: "/functions/useMediaQuery" },
              { text: "useWindowSize", link: "/functions/useWindowSize" },
              { text: "useTitle", link: "/functions/useTitle" },
              { text: "useLockBodyScroll", link: "/functions/useLockBodyScroll" },
              { text: "useScript", link: "/functions/useScript" },
              { text: "usePageVisibility", link: "/functions/usePageVisibility" },
              { text: "useCopyToClipboard", link: "/functions/useCopyToClipboard" },
            ],
          },
          {
            text: "Sensors",
            link: "/functions/sensors",
            collapsed: true,
            items: [
              { text: "useIdle", link: "/functions/useIdle" },
              { text: "useIntersectionObserver", link: "/functions/useIntersectionObserver" },
              { text: "useResizeObserver", link: "/functions/useResizeObserver" },
              { text: "useMutationObserver", link: "/functions/useMutationObserver" },
            ],
          },
          {
            text: "Network",
            link: "/functions/network",
            collapsed: true,
            items: [
              { text: "useAsync", link: "/functions/useAsync" },
              { text: "useAbortController", link: "/functions/useAbortController" },
            ],
          },
          {
            text: "Animation",
            link: "/functions/animation",
            collapsed: true,
            items: [{ text: "useRafState", link: "/functions/useRafState" }],
          },
          {
            text: "Component",
            link: "/functions/component",
            collapsed: true,
            items: [
              { text: "useOnMount", link: "/functions/useOnMount" },
              { text: "useMountedState", link: "/functions/useMountedState" },
            ],
          },
          {
            text: "Watch",
            link: "/functions/watch",
            collapsed: true,
            items: [{ text: "useEventListener", link: "/functions/useEventListener" }],
          },
          {
            text: "Reactivity",
            link: "/functions/reactivity",
            collapsed: true,
            items: [{ text: "useEventCallback", link: "/functions/useEventCallback" }],
          },
          {
            text: "Array",
            link: "/functions/array",
            collapsed: true,
            items: [],
          },
          {
            text: "Time",
            link: "/functions/time",
            collapsed: true,
            items: [
              { text: "useTimeout", link: "/functions/useTimeout" },
              { text: "useInterval", link: "/functions/useInterval" },
            ],
          },
          {
            text: "Utilities",
            link: "/functions/utilities",
            collapsed: true,
            items: [
              { text: "useLocalStorage", link: "/functions/useLocalStorage" },
              { text: "useSessionStorage", link: "/functions/useSessionStorage" },
            ],
          },
        ],
      },
    ] as any,

    head: [
      ["meta", { name: "theme-color", content: "#ffffff" }],
      ["link", { rel: "icon", href: "/favicon-32x32.png", type: "image/png" }],
      ["link", { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
      ["meta", { name: "author", content: "Radiks Alijevs" }],
      ["meta", { property: "og:title", content: "UseReact" }],
      [
        "meta",
        { property: "og:image", content: "https://usereact.org/logo.png" },
      ],
      [
        "meta",
        {
          property: "og:description",
          content: "React Hooks and Utilities Collection",
        },
      ],
      ["meta", { name: "twitter:card", content: "summary_large_image" }],
      ["meta", { name: "twitter:creator", content: "@antfu7" }],
      [
        "meta",
        { name: "twitter:image", content: "https://usereact.org/logo.png" },
      ],
      [
        "meta",
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, viewport-fit=cover",
        },
      ],

      ["link", { rel: "dns-prefetch", href: "https://fonts.gstatic.com" }],
      [
        "link",
        {
          rel: "preconnect",
          crossorigin: "anonymous",
          href: "https://fonts.gstatic.com",
        },
      ],
      [
        "link",
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
        },
      ],
      [
        "link",
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fira+Code&display=swap",
        },
      ],
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/dedalik/use-react" },
    ],

    search: {
      provider: "local",
    },
  },
});
