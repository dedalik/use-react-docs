import fs from 'node:fs'
import path from 'node:path'

const docsDir = path.resolve(process.cwd(), 'docs/functions')

const titles = {
  useAbortController: 'Cancel stale async requests',
  useAsync: 'Manage async state and execution',
  useClickOutside: 'Handle clicks outside an element',
  useCopyToClipboard: 'Copy text to the clipboard',
  useDebounce: 'Delay value updates until input settles',
  useDraggable: 'Make an element draggable',
  useEventCallback: 'Keep callback identity stable',
  useEventListener: 'Attach and clean up event listeners',
  useFavicon: 'Update the page favicon dynamically',
  useHash: 'Read and update URL hash state',
  useIdle: 'Detect user inactivity',
  useIntersectionObserver: 'Track element visibility in viewport',
  useInterval: 'Run a callback on an interval',
  useLatest: 'Store the latest value in a ref',
  useLocalStorage: 'Persist state in localStorage',
  useLockBodyScroll: 'Lock body scrolling while active',
  useMediaQuery: 'React to media query matches',
  useMountedState: 'Check if component is mounted',
  useMutationObserver: 'Observe DOM mutations',
  useOnMount: 'Run logic when component mounts',
  usePageVisibility: 'Track page visibility changes',
  usePrevious: 'Read the previous value',
  useRafState: 'Schedule state updates with requestAnimationFrame',
  useResizeObserver: 'Track element size changes',
  useScript: 'Load external scripts with status',
  useSessionStorage: 'Persist state in sessionStorage',
  useTextareaAutoSize: 'Auto-resize textarea to fit content',
  useThrottle: 'Limit update frequency',
  useTimeout: 'Run a callback after a delay',
  useTitle: 'Set and restore document title',
  useToggle: 'Toggle boolean state',
  useWindowSize: 'Track window width and height',
}

const files = fs.readdirSync(docsDir).filter((name) => /^use.*\.md$/.test(name))

for (const file of files) {
  const hookName = path.basename(file, '.md')
  const title = titles[hookName]
  if (!title) continue

  const filePath = path.join(docsDir, file)
  const content = fs.readFileSync(filePath, 'utf8')
  const next = content.replace(/^title:\s*.+$/m, `title: ${title}`)
  fs.writeFileSync(filePath, next, 'utf8')
}

console.log(`Updated titles for ${files.length} hook docs.`)
