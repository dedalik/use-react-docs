export const hookCategoryOverrides: Record<string, string> = {
  useTextareaAutoSize: 'Elements',
  useClickOutside: 'Elements',
  useDraggable: 'Elements',
  useIdle: 'Sensors',
  useIntersectionObserver: 'Sensors',
  useResizeObserver: 'Sensors',
  useMutationObserver: 'Sensors',
  useEventListener: 'Watch',
  useEventCallback: 'Reactivity',
  useOnMount: 'Component',
  useInterval: 'Time',
  useTimeout: 'Time',
}

export const categoryToSlug: Record<string, string> = {
  State: 'state',
  Elements: 'elements',
  Browser: 'browser',
  Sensors: 'sensors',
  Network: 'network',
  Animation: 'animation',
  Component: 'component',
  Watch: 'watch',
  Reactivity: 'reactivity',
  Array: 'array',
  Time: 'time',
  Utilities: 'utilities',
}

export const slugToCategory: Record<string, string> = Object.fromEntries(
  Object.entries(categoryToSlug).map(([category, slug]) => [slug, category]),
)

const categoryAliases: Record<string, string> = {
  Storage: 'Utilities',
  Async: 'Network',
  Lifecycle: 'Component',
  Performance: 'Animation',
}

export function normalizeHookCategory(hookName: string | undefined, category?: string) {
  if (hookName && hookCategoryOverrides[hookName]) return hookCategoryOverrides[hookName]
  if (!category) return 'Utilities'
  return categoryAliases[category] || category
}

export function getCategoryFromPath(pathname: string) {
  const match = pathname.match(/^\/functions\/([^/]+)\/?$/)
  if (!match) return null
  return slugToCategory[match[1].toLowerCase()] || null
}

export function getCategoryPath(category: string) {
  const slug = categoryToSlug[category]
  if (!slug) return '/functions/'
  return `/functions/${slug}`
}
