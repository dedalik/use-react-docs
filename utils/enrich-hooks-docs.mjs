import fs from 'node:fs'
import path from 'node:path'

const docsDir = path.resolve(process.cwd(), 'docs/functions')

const overviewMap = {
  useAbortController: {
    intro:
      '`useAbortController` helps you cancel stale async work when a component unmounts or when a new request should replace an old one.',
    details:
      'For beginners, this hook is a safe default for fetch-heavy UIs: search, filters, tab switches, and any screen where users can trigger requests repeatedly.',
    accepts: ['No arguments.'],
    returns: [
      '`controller`: current `AbortController` instance (or `null` when unavailable).',
      '`signal`: current `AbortSignal` you pass to `fetch` and other cancellable APIs.',
      '`renew()`: aborts previous controller and creates a fresh one.',
      '`abort()`: aborts current controller immediately.',
    ],
  },
  useAsync: {
    intro: '`useAsync` wraps an async function and gives you a simple request lifecycle state in one place.',
    details:
      'It is useful for beginners because it standardizes loading, success, and error handling, so your component code stays focused on rendering instead of promise bookkeeping.',
    accepts: ['`asyncFunction`: a function that returns a `Promise`.'],
    returns: [
      '`loading`: `true` while request is running.',
      '`data`: resolved value (or `null` before success).',
      '`error`: captured error state (or `null` when there is no error).',
      '`execute(...args)`: runs the async function with arguments and returns the resulting promise.',
    ],
  },
  useClickOutside: {
    intro: '`useClickOutside` detects clicks or touches outside one element (or multiple refs).',
    details:
      'This is a common building block for dropdowns, popovers, and modals. It prevents repetitive event wiring in every component.',
    accepts: [
      '`refs`: one `ref` or an array of refs to track as the inside area.',
      '`handler`: callback fired when interaction happens outside tracked refs.',
    ],
    returns: ['This hook returns nothing. It attaches and cleans up listeners automatically.'],
  },
  useCopyToClipboard: {
    intro: '`useCopyToClipboard` gives you a copy action and remembers the last copied value.',
    details:
      'It is handy for share links, token copying, and developer tooling UIs where users frequently copy values.',
    accepts: ['No arguments.'],
    returns: ['`[copiedText, copy]` where `copy(text)` returns `Promise<boolean>`.'],
  },
  useDebounce: {
    intro: '`useDebounce` delays value updates until changes stop for the configured delay.',
    details:
      'Beginners often use it for search inputs to avoid hitting the API on every keystroke and to smooth expensive computations.',
    accepts: ['`value`: value to debounce.', '`delay` (optional): delay in milliseconds.'],
    returns: ['Debounced value with the same type as the input value.'],
  },
  useDraggable: {
    intro: '`useDraggable` enables drag behavior for an element and tracks its position.',
    details:
      'Use it for floating widgets, draggable cards, and custom canvas-like interactions where pointer movement needs explicit control.',
    accepts: ['`targetRef`: element ref to make draggable.', '`options` (optional): drag behavior options.'],
    returns: ['Hook metadata such as current position, drag state, and style helpers.'],
  },
  useEventCallback: {
    intro: '`useEventCallback` returns a stable callback reference that always executes the latest callback logic.',
    details:
      'This avoids stale closure bugs in event listeners, timers, and external integrations while keeping a stable function identity.',
    accepts: ['`fn`: callback function you want to keep up to date.'],
    returns: ['A stable callback function with the same call signature as `fn`.'],
  },
  useEventListener: {
    intro:
      '`useEventListener` attaches an event listener to `window`, `document`, an element, or another supported target.',
    details:
      'This hook simplifies setup and cleanup logic so beginners can avoid memory leaks and duplicate listener code.',
    accepts: [
      '`eventName`: event to listen for.',
      '`listener`: event handler.',
      '`target` (optional): event target or ref.',
    ],
    returns: ['This hook returns nothing. It manages subscription lifecycle internally.'],
  },
  useFavicon: {
    intro: '`useFavicon` updates the page favicon dynamically at runtime.',
    details:
      'It is useful for branding changes, status indicators, or context-driven visual cues in tabs (for example, alerts).',
    accepts: ['`options` (optional): initial icon, base URL, relation type, and target document.'],
    returns: ['`[favicon, setFavicon]` tuple for reading and updating current favicon value.'],
  },
  useHash: {
    intro: '`useHash` reads and writes `window.location.hash` reactively.',
    details:
      'It helps beginners build lightweight URL-based state (tabs, anchor-driven navigation, filters) without a router dependency.',
    accepts: ['No arguments.'],
    returns: ['`[hash, setHash]` tuple for current hash value and a setter function.'],
  },
  useIdle: {
    intro: '`useIdle` tells you whether the user has been inactive for a given timeout.',
    details:
      'Use it for auto-logout prompts, low-priority refreshes, and UI behavior that should change when users stop interacting.',
    accepts: ['`timeout` (optional): inactivity window in milliseconds.'],
    returns: ['`boolean` idle state (`true` when user is inactive).'],
  },
  useIntersectionObserver: {
    intro: '`useIntersectionObserver` observes whether an element is visible inside a viewport or container.',
    details: 'This is a foundational hook for lazy loading, infinite scrolling, and in-view animations.',
    accepts: [
      '`elementRef`: target element ref.',
      '`options` (optional): standard intersection observer options plus `freezeOnceVisible`.',
    ],
    returns: ['Latest `IntersectionObserverEntry` (or `null` before first observation).'],
  },
  useInterval: {
    intro: '`useInterval` runs a callback repeatedly at a fixed interval.',
    details: 'It avoids stale callback issues and keeps interval setup/cleanup safe inside React lifecycle.',
    accepts: ['`callback`: function to execute.', '`delay`: milliseconds between runs (`null` disables interval).'],
    returns: ['This hook returns nothing.'],
  },
  useLatest: {
    intro: '`useLatest` stores the most recent value inside a ref.',
    details:
      'It is often used together with listeners and async handlers to read fresh values without re-subscribing effects.',
    accepts: ['`value`: any value that should be kept up to date.'],
    returns: ['A ref object with `.current` always equal to the latest value.'],
  },
  useLocalStorage: {
    intro:
      '`useLocalStorage` syncs React state with browser `localStorage` and keeps a fallback when storage is unavailable.',
    details:
      'It is beginner-friendly for persisted settings (theme, layout, filters) and includes options for SSR-safe initialization and custom serialization.',
    accepts: [
      '`key`: storage key.',
      '`initialValue`: initial state or lazy initializer function.',
      '`options` (optional): serializer, deserializer, and storage behavior flags.',
    ],
    returns: ['`[value, setValue, removeValue]` tuple for reading, updating, and clearing persisted state.'],
  },
  useLockBodyScroll: {
    intro: '`useLockBodyScroll` prevents page scrolling while a UI state is active.',
    details:
      'Typical use case is modal or drawer overlays where background scrolling should be disabled to keep focus on foreground content.',
    accepts: ['`locked` (optional): whether scroll lock should be enabled.'],
    returns: ['This hook returns nothing.'],
  },
  useMediaQuery: {
    intro: '`useMediaQuery` evaluates a media query and returns whether it currently matches.',
    details:
      'Use it for behavior-level responsiveness, such as conditional data density, rendering strategy, and interaction model.',
    accepts: [
      '`query`: CSS media query string.',
      '`options` (optional): default value, initialization mode, and custom target window.',
    ],
    returns: ['`boolean` indicating whether the media query currently matches.'],
  },
  useMountedState: {
    intro: '`useMountedState` returns a function that tells whether component is still mounted.',
    details: 'This is useful for guarding async callbacks to avoid updates after unmount in complex request flows.',
    accepts: ['No arguments.'],
    returns: ['Function `() => boolean` that reports mounted status.'],
  },
  useMutationObserver: {
    intro: '`useMutationObserver` observes DOM mutations on a target node.',
    details:
      'Use it when UI logic depends on external DOM changes (content injection, portal updates, or third-party widgets).',
    accepts: [
      '`elementRef`: node ref to observe.',
      '`callback`: mutation handler.',
      '`options` (optional): observer configuration.',
    ],
    returns: ['This hook returns nothing.'],
  },
  useOnMount: {
    intro: '`useOnMount` runs a callback when component mounts.',
    details:
      'It keeps mount-only setup concise for beginners and avoids repeating lifecycle boilerplate in components.',
    accepts: ['`fn`: function to run on mount.'],
    returns: ['This hook returns nothing.'],
  },
  usePageVisibility: {
    intro: '`usePageVisibility` tracks whether the current page is visible to the user.',
    details:
      'Useful for pausing background work, controlling auto-refresh, and reducing unnecessary processing when tab is hidden.',
    accepts: ['No arguments.'],
    returns: ['`boolean` visibility state (`true` when page is visible).'],
  },
  usePrevious: {
    intro: '`usePrevious` gives you the value from the previous render.',
    details:
      'Great for change comparisons, transition logic, and conditionally triggering effects only when value changes in a specific way.',
    accepts: ['`value`: current value to track.'],
    returns: ['Previous value (`undefined` on first render).'],
  },
  useRafState: {
    intro: '`useRafState` updates state in `requestAnimationFrame` instead of immediately.',
    details: 'It helps smooth frequent UI updates driven by pointer movement, scrolling, or animation loops.',
    accepts: ['`initialState`: initial value for state.'],
    returns: ['`[state, setState]` tuple with RAF-scheduled updates.'],
  },
  useResizeObserver: {
    intro: '`useResizeObserver` tracks element size changes using the Resize Observer API.',
    details: 'Use it for responsive components that depend on actual element dimensions instead of viewport size.',
    accepts: ['`targetRef`: element ref to observe.'],
    returns: ['Object with `width` and `height` of observed element.'],
  },
  useScript: {
    intro: '`useScript` loads external scripts and reports their loading status.',
    details:
      'Useful for integrating third-party SDKs in a controlled way while handling loading and error states in React UI.',
    accepts: ['`src` (optional): script URL to load.'],
    returns: ['Status string: `idle`, `loading`, `ready`, or `error`.'],
  },
  useSessionStorage: {
    intro: '`useSessionStorage` stores state in session storage for the current browser tab session.',
    details:
      'It behaves similarly to local storage hooks but data resets when the session ends, which is useful for temporary UI state.',
    accepts: [
      '`key`: storage key.',
      '`initialValue`: initial state or lazy initializer.',
      '`options` (optional): serializer and deserializer config.',
    ],
    returns: ['`[value, setValue, removeValue]` tuple.'],
  },
  useTextareaAutoSize: {
    intro: '`useTextareaAutoSize` automatically resizes a textarea based on content height.',
    details: 'This improves typing experience by removing fixed-height friction and keeping long-form inputs readable.',
    accepts: ['`options` (optional): textarea ref, current input, resize callback, and custom style target.'],
    returns: ['Object containing `textareaRef`, `input`, `setInput`, and `triggerResize`.'],
  },
  useThrottle: {
    intro: '`useThrottle` limits how often a rapidly changing value is updated.',
    details:
      'Use it for scroll, resize, and high-frequency events when debouncing is too delayed and you still need periodic updates.',
    accepts: ['`value`: input value to throttle.', '`delay` (optional): interval in milliseconds.'],
    returns: ['Throttled value with the same type as input.'],
  },
  useTimeout: {
    intro: '`useTimeout` runs a callback once after a configured delay.',
    details: 'It provides safe timeout lifecycle handling and avoids stale callback behavior in React components.',
    accepts: [
      '`callback`: function to run after delay.',
      '`delay`: timeout in milliseconds (`null` disables timeout).',
    ],
    returns: ['This hook returns nothing.'],
  },
  useTitle: {
    intro: '`useTitle` updates `document.title` from your component.',
    details:
      'Useful for route-like screens and contextual tab labels. Optional restore behavior helps revert title on unmount.',
    accepts: [
      '`title`: new page title.',
      '`restoreOnUnmount` (optional): restore previous title when component unmounts.',
    ],
    returns: ['This hook returns nothing.'],
  },
  useToggle: {
    intro: '`useToggle` manages a boolean value with convenient toggle and setter actions.',
    details:
      'It is one of the simplest and most practical hooks for UI states like open/closed, enabled/disabled, and visible/hidden.',
    accepts: ['`initialValue` (optional): starting boolean state.'],
    returns: ['`[value, toggle, set]` tuple.'],
  },
  useWindowSize: {
    intro: '`useWindowSize` tracks the browser viewport width and height.',
    details:
      'This hook is useful for responsive rendering decisions and layout behavior that depends on viewport dimensions.',
    accepts: ['No arguments.'],
    returns: ['Object with current `width` and `height`.'],
  },
}

function buildOverview(hookName) {
  const data = overviewMap[hookName] || {
    intro: `\`${hookName}\` provides a focused utility for this interaction pattern in React applications.`,
    details:
      'This hook is designed to keep component code simpler by extracting repeated behavior into a reusable unit.',
    accepts: ['See the usage example and type declarations below for supported parameters.'],
    returns: ['See return details in the usage and type declarations section.'],
  }

  const accepts = data.accepts.map((item) => `- ${item}`).join('\n')
  const returns = data.returns.map((item) => `- ${item}`).join('\n')

  return `## Overview

${data.intro}

${data.details}

### What it accepts

${accepts}

### What it returns

${returns}
`
}

function toJavaScript(source) {
  let out = source

  out = out.replace(/^type\s+.+$/gm, '')
  out = out.replace(/^interface\s+\w+\s*\{[\s\S]*?^\}/gm, '')
  out = out.replace(/^export interface\s+\w+\s*\{[\s\S]*?^\}/gm, '')
  out = out.replace(/^export type\s+.+$/gm, '')
  out = out.replace(/:\s*React\.[A-Za-z0-9_<>\[\]\|,&\s]+/g, '')
  out = out.replace(/:\s*[A-Za-z0-9_<>\[\]\|,&\s]+(?=[),=;])/g, '')
  out = out.replace(/<\s*[A-Za-z0-9_,\s extends|&\[\]?]+\s*>/g, '')
  out = out.replace(/\)\s*:\s*[A-Za-z0-9_<>\[\]\|,&\s]+/g, ')')
  out = out.replace(/\s+as\s+[A-Za-z0-9_<>\[\]\|,&\s]+/g, '')
  out = out.replace(/import\s+\{([^}]+)\}\s+from\s+"react";/g, (_, imports) => {
    const cleaned = imports
      .split(',')
      .map((part) => part.trim())
      .filter((part) => part && !part.startsWith('type '))
      .join(', ')
    return cleaned ? `import { ${cleaned} } from "react";` : `import "react";`
  })

  out = out
    .split('\n')
    .filter((line) => line.trim() !== '')
    .join('\n')

  return out.trim()
}

function processFile(filePath) {
  const hookName = path.basename(filePath, '.md')
  let content = fs.readFileSync(filePath, 'utf8')

  const overviewBlock = buildOverview(hookName)

  if (/## Overview[\s\S]*?(?=\n##\s|\n```|$)/m.test(content)) {
    content = content.replace(/## Overview[\s\S]*?(?=\n##\s|$)/m, `${overviewBlock}\n`)
  } else {
    content = content.replace(/(<PackageData\s+fn="[^"]+"\s*\/>\n)/, `$1\n${overviewBlock}\n`)
  }

  const copyPasteMatch = content.match(/## Copy-paste hook[\s\S]*?```(?:ts|tsx|javascript|js)\n([\s\S]*?)```/m)
  const hasJsBlock = /### JavaScript version[\s\S]*?```js/m.test(content)

  if (copyPasteMatch && !hasJsBlock) {
    const tsCode = copyPasteMatch[1]
    const jsCode = toJavaScript(tsCode)
    const jsBlock = `\n### JavaScript version\n\n\`\`\`js\n${jsCode}\n\`\`\`\n`
    content = content.replace(copyPasteMatch[0], `${copyPasteMatch[0]}${jsBlock}`)
  }

  fs.writeFileSync(filePath, content, 'utf8')
}

const files = fs
  .readdirSync(docsDir)
  .filter((fileName) => /^use.*\.md$/.test(fileName))
  .map((fileName) => path.join(docsDir, fileName))

files.forEach(processFile)
console.log(`Updated ${files.length} hook docs files.`)
