/**
 * Single source of truth for Functions navigation and the home page category grid.
 * When adding a hook: append it here under the right category, then rebuild docs.
 */

export interface HookEntry {
  name: string
  link: string
}

export interface HookCategoryCatalog {
  id: string
  title: string
  overviewLink: string
  description: string
  /** VitePress sidebar group collapsed state */
  sidebarCollapsed: boolean
  hooks: HookEntry[]
}

export const hookCategoriesCatalog: HookCategoryCatalog[] = [
  {
    id: "state",
    title: "State",
    overviewLink: "/functions/state",
    description:
      "Shape component data flow with toggles, debounced values, throttling, refs to the latest value, and access to the previous render.",
    sidebarCollapsed: false,
    hooks: [
      { name: "useToggle", link: "/functions/useToggle" },
      { name: "useDebounce", link: "/functions/useDebounce" },
      { name: "usePrevious", link: "/functions/usePrevious" },
      { name: "useLatest", link: "/functions/useLatest" },
      { name: "useThrottle", link: "/functions/useThrottle" },
    ],
  },
  {
    id: "elements",
    title: "Elements",
    overviewLink: "/functions/elements",
    description:
      "DOM-focused ergonomics: auto-growing text areas, detecting outside clicks, and pointer-driven dragging.",
    sidebarCollapsed: false,
    hooks: [
      { name: "useTextareaAutoSize", link: "/functions/useTextareaAutoSize" },
      { name: "useClickOutside", link: "/functions/useClickOutside" },
      { name: "useDraggable", link: "/functions/useDraggable" },
    ],
  },
  {
    id: "browser",
    title: "Browser",
    overviewLink: "/functions/browser",
    description:
      "Surface browser APIs - URL hash, favicons, media queries, window size, document title, scroll lock, third-party scripts, visibility, and clipboard helpers.",
    sidebarCollapsed: true,
    hooks: [
      { name: "useHash", link: "/functions/useHash" },
      { name: "useFavicon", link: "/functions/useFavicon" },
      { name: "useMediaQuery", link: "/functions/useMediaQuery" },
      { name: "useWindowSize", link: "/functions/useWindowSize" },
      { name: "useTitle", link: "/functions/useTitle" },
      { name: "useLockBodyScroll", link: "/functions/useLockBodyScroll" },
      { name: "useScript", link: "/functions/useScript" },
      { name: "usePageVisibility", link: "/functions/usePageVisibility" },
      { name: "useCopyToClipboard", link: "/functions/useCopyToClipboard" },
    ],
  },
  {
    id: "sensors",
    title: "Sensors",
    overviewLink: "/functions/sensors",
    description:
      "Observe users and layout: idle detection, intersection for lazy sections, element resize, and DOM mutation tracking.",
    sidebarCollapsed: true,
    hooks: [
      { name: "useIdle", link: "/functions/useIdle" },
      { name: "useIntersectionObserver", link: "/functions/useIntersectionObserver" },
      { name: "useResizeObserver", link: "/functions/useResizeObserver" },
      { name: "useMutationObserver", link: "/functions/useMutationObserver" },
    ],
  },
  {
    id: "network",
    title: "Network",
    overviewLink: "/functions/network",
    description: "Async data with explicit loading and error states, plus AbortController wiring for cancellable requests.",
    sidebarCollapsed: true,
    hooks: [
      { name: "useAsync", link: "/functions/useAsync" },
      { name: "useAbortController", link: "/functions/useAbortController" },
    ],
  },
  {
    id: "animation",
    title: "Animation",
    overviewLink: "/functions/animation",
    description: "State updates synchronized to animation frames for smooth, jank-free visuals.",
    sidebarCollapsed: true,
    hooks: [{ name: "useRafState", link: "/functions/useRafState" }],
  },
  {
    id: "component",
    title: "Component",
    overviewLink: "/functions/component",
    description: "Mount-focused helpers for effects that should run once or for rendering only after hydration.",
    sidebarCollapsed: true,
    hooks: [
      { name: "useOnMount", link: "/functions/useOnMount" },
      { name: "useMountedState", link: "/functions/useMountedState" },
    ],
  },
  {
    id: "watch",
    title: "Watch",
    overviewLink: "/functions/watch",
    description: "Attach DOM event listeners with automatic cleanup when dependencies or targets change.",
    sidebarCollapsed: true,
    hooks: [{ name: "useEventListener", link: "/functions/useEventListener" }],
  },
  {
    id: "reactivity",
    title: "Reactivity",
    overviewLink: "/functions/reactivity",
    description:
      "Stable function identities that always invoke your latest logic - ideal for callbacks passed deep into children.",
    sidebarCollapsed: true,
    hooks: [{ name: "useEventCallback", link: "/functions/useEventCallback" }],
  },
  {
    id: "array",
    title: "Array",
    overviewLink: "/functions/array",
    description: "Reserved for list-focused utilities. Explore the roadmap while the set grows.",
    sidebarCollapsed: true,
    hooks: [],
  },
  {
    id: "time",
    title: "Time",
    overviewLink: "/functions/time",
    description:
      "Timers without stale closures - one-shot delays and repeating intervals tied to the component lifecycle.",
    sidebarCollapsed: true,
    hooks: [
      { name: "useTimeout", link: "/functions/useTimeout" },
      { name: "useInterval", link: "/functions/useInterval" },
    ],
  },
  {
    id: "utilities",
    title: "Utilities",
    overviewLink: "/functions/utilities",
    description: "Typed bridges to session and local storage with JSON serialization and change listeners.",
    sidebarCollapsed: true,
    hooks: [
      { name: "useLocalStorage", link: "/functions/useLocalStorage" },
      { name: "useSessionStorage", link: "/functions/useSessionStorage" },
    ],
  },
]

export const totalHooks = hookCategoriesCatalog.reduce((n, c) => n + c.hooks.length, 0)

/** Builds the "Core Functions" sidebar block from the catalog. */
export function buildCoreFunctionsSidebarGroup() {
  return {
    text: "Core Functions",
    collapsed: false,
    items: [
      { text: "Overview", link: "/functions/" },
      ...hookCategoriesCatalog.map((cat) => ({
        text: cat.title,
        link: cat.overviewLink,
        collapsed: cat.sidebarCollapsed,
        items: cat.hooks.map((h) => ({ text: h.name, link: h.link })),
      })),
    ],
  }
}
