import fs from 'node:fs'
import path from 'node:path'

const docsDir = path.resolve(process.cwd(), 'docs/functions')

/** @type {Record<string, string>} */
const apiSections = {
  useAbortController: `## API Reference

### \`useAbortController\`

**Signature:** \`useAbortController(): UseAbortControllerReturn\`

#### Parameters

None.

#### Returns

Object with:

- \`controller\`: current \`AbortController\` or \`null\` if unavailable.
- \`signal\`: \`AbortSignal\` to pass to \`fetch\` / \`axios\` / other cancellable APIs.
- \`renew()\`: aborts the previous controller, creates a new one, returns it.
- \`abort()\`: aborts the active controller and replaces it with a fresh instance.
`,

  useAsync: `## API Reference

### \`useAsync\`

**Signature:** \`useAsync(asyncFunction): UseAsyncResult<T, Args>\`

#### Parameters

1. **\`asyncFunction\`** - \`(...args: Args) => Promise<T>\`. The async work to run when \`execute\` is called.

#### Returns

Object combining state and an executor:

- \`loading\`, \`data\`, \`error\` - request lifecycle fields.
- \`execute(...args)\` - runs \`asyncFunction\` with arguments; updates state and returns the same promise.
`,

  useClickOutside: `## API Reference

### \`useClickOutside\`

**Signature:** \`useClickOutside(refs, handler): void\`

#### Parameters

1. **\`refs\`** - A single \`RefObject<HTMLElement | null>\` or an array of refs. Clicks inside any of these nodes are ignored.
2. **\`handler\`** - \`(event: MouseEvent | TouchEvent) => void\`, called when the user interacts outside all refs.

#### Returns

Nothing (\`void\`). Listeners are registered and cleaned up inside the hook.
`,

  useCopyToClipboard: `## API Reference

### \`useCopyToClipboard\`

**Signature:** \`useCopyToClipboard(): [string, CopyFn]\`

#### Parameters

None.

#### Returns

Tuple:

1. **\`copiedText\`** - Last string successfully passed to \`copy\`, or empty string.
2. **\`copy\`** - \`(value: string) => Promise<boolean>\`. Returns \`false\` if the Clipboard API is unavailable or write fails.
`,

  useDebounce: `## API Reference

### \`useDebounce\`

**Signature:** \`useDebounce<T>(value: T, delay?: number): T\`

#### Parameters

1. **\`value\`** - Any value to debounce (string, number, object, etc.).
2. **\`delay\`** - Optional debounce window in milliseconds (default \`500\`).

#### Returns

The latest **debounced** value: it updates only after \`value\` stops changing for \`delay\` ms.
`,

  useDraggable: `## API Reference

### \`useDraggable\`

**Signature:** \`useDraggable(targetRef, options?)\`

#### Parameters

1. **\`targetRef\`** - \`RefObject\` to the element that should move while dragging.
2. **\`options\`** (optional) - \`UseDraggableOptions\` for drag behavior (axis, bounds, handlers, pointer types, etc.).

#### Options (common fields)

- \`exact\`, \`preventDefault\`, \`stopPropagation\`, \`capture\` - event handling flags.
- \`draggingElement\`, \`containerElement\`, \`handle\` - elements for events and bounds.
- \`pointerTypes\` - which pointer kinds trigger dragging.
- \`initialValue\` - starting \`x\` / \`y\` position.
- \`onStart\`, \`onMove\`, \`onEnd\` - lifecycle callbacks.
- \`axis\` - restrict movement to \`"x"\` or \`"y"\` when needed.

#### Returns

- \`position\` - current drag position.
- \`isDragging\` - whether a drag is active.
- \`style\` - inline styles to apply to the draggable element.
`,

  useEventCallback: `## API Reference

### \`useEventCallback\`

**Signature:** \`useEventCallback<T extends (...args: any[]) => any>(fn: T): T\`

#### Parameters

1. **\`fn\`** - Callback whose latest implementation should always run (avoids stale closures).

#### Returns

A **stable** function reference with the same call signature as \`fn\`, always forwarding to the newest \`fn\`.
`,

  useEventListener: `## API Reference

### \`useEventListener\`

**Signature:** \`useEventListener(eventName, listener, target?)\`

#### Parameters

1. **\`eventName\`** - DOM event name (typed against \`WindowEventMap\` when targeting \`window\`).
2. **\`listener\`** - Handler invoked when the event fires.
3. **\`target\`** (optional) - \`Window\`, \`Document\`, \`HTMLElement\`, \`MediaQueryList\`, or a ref to one of these. Defaults to \`window\` in the browser.

#### Returns

Nothing (\`void\`). Subscribes on mount/update and unsubscribes on cleanup.
`,

  useFavicon: `## API Reference

### \`useFavicon\`

**Signature:** \`useFavicon(options?): [string, React.Dispatch<React.SetStateAction<string>>]\`

#### Parameters

Optional **\`options\`** object:

- \`newIcon\` - Initial favicon path or URL.
- \`baseUrl\` - Prefix applied before \`newIcon\`.
- \`rel\` - Link \`rel\` (default \`icon\`).
- \`doc\` - Target \`Document\` (tests / non-default documents).

#### Returns

Tuple \`[favicon, setFavicon]\` - current favicon string and setter to update it (and the DOM link).
`,

  useHash: `## API Reference

### \`useHash\`

**Signature:** \`useHash(): [string, (newHash: string) => void]\`

#### Parameters

None.

#### Returns

Tuple:

1. **\`hash\`** - Current \`window.location.hash\` string; updates on \`hashchange\`.
2. **\`setHash\`** - Setter that updates the hash when it differs from the current value.
`,

  useIdle: `## API Reference

### \`useIdle\`

**Signature:** \`useIdle(timeout?: number): boolean\`

#### Parameters

1. **\`timeout\`** - Milliseconds without user activity before switching to idle (default \`60000\`).

#### Returns

\`true\` when the user is considered idle, \`false\` while activity resets the timer.
`,

  useIntersectionObserver: `## API Reference

### \`useIntersectionObserver\`

**Signature:** \`useIntersectionObserver(elementRef, options?): IntersectionObserverEntry | null\`

#### Parameters

1. **\`elementRef\`** - Ref to the element to observe.
2. **\`options\`** - Standard \`IntersectionObserverInit\` plus optional \`freezeOnceVisible\` to stop observing after first intersection.

#### Returns

Latest \`IntersectionObserverEntry\`, or \`null\` before the first callback.
`,

  useInterval: `## API Reference

### \`useInterval\`

**Signature:** \`useInterval(callback: () => void, delay: number | null): void\`

#### Parameters

1. **\`callback\`** - Function invoked on each tick.
2. **\`delay\`** - Interval in ms, or \`null\` to disable the interval.

#### Returns

Nothing (\`void\`).
`,

  useLatest: `## API Reference

### \`useLatest\`

**Signature:** \`useLatest<T>(value: T): React.MutableRefObject<T>\`

#### Parameters

1. **\`value\`** - Any value to keep in \`.current\` on every render.

#### Returns

A ref whose \`.current\` always equals the latest \`value\`.
`,

  useLocalStorage: `## API Reference

### \`useLocalStorage\`

**Signature:** \`useLocalStorage<T>(key, initialValue, options?)\`

#### Parameters

1. **\`key\`** - \`localStorage\` key string.
2. **\`initialValue\`** - Initial value or lazy \`() => T\` when nothing is stored yet.
3. **\`options\`** (optional) - \`initializeWithValue\`, \`enabled\`, \`serializer\`, \`deserializer\`, \`storage\`.

#### Returns

Tuple \`[value, setValue, removeValue]\` - same ergonomics as \`useState\`, plus explicit removal from storage.
`,

  useLockBodyScroll: `## API Reference

### \`useLockBodyScroll\`

**Signature:** \`useLockBodyScroll(locked?: boolean): void\`

#### Parameters

1. **\`locked\`** - When \`true\` (default), sets \`document.body.style.overflow = "hidden"\` and restores the previous value on cleanup.

#### Returns

Nothing (\`void\`).
`,

  useMediaQuery: `## API Reference

### \`useMediaQuery\`

**Signature:** \`useMediaQuery(query: string, options?): boolean\`

#### Parameters

1. **\`query\`** - Any valid CSS media query string.
2. **\`options\`** (optional) - \`defaultValue\`, \`initializeWithValue\`, \`targetWindow\` for SSR or iframes.

#### Returns

\`true\` when the query matches, \`false\` otherwise.
`,

  useMountedState: `## API Reference

### \`useMountedState\`

**Signature:** \`useMountedState(): () => boolean\`

#### Parameters

None.

#### Returns

A function \`isMounted()\` that returns whether the component is still mounted (useful after \`await\`).
`,

  useMutationObserver: `## API Reference

### \`useMutationObserver\`

**Signature:** \`useMutationObserver(elementRef, callback, options?): void\`

#### Parameters

1. **\`elementRef\`** - Ref to the DOM node to observe.
2. **\`callback\`** - \`MutationCallback\` invoked on mutations.
3. **\`options\`** - \`MutationObserverInit\` (defaults include subtree/childList where applicable).

#### Returns

Nothing (\`void\`).
`,

  useOnMount: `## API Reference

### \`useOnMount\`

**Signature:** \`useOnMount(fn: () => void): void\`

#### Parameters

1. **\`fn\`** - Side effect to run once after mount. Should be a stable or intentionally changing function (runs when \`fn\` identity changes per \`useEffect\` rules).

#### Returns

Nothing (\`void\`).
`,

  usePageVisibility: `## API Reference

### \`usePageVisibility\`

**Signature:** \`usePageVisibility(): boolean\`

#### Parameters

None.

#### Returns

\`true\` when the document is visible, \`false\` when the tab is hidden.
`,

  usePrevious: `## API Reference

### \`usePrevious\`

**Signature:** \`usePrevious<T>(value: T): T | undefined\`

#### Parameters

1. **\`value\`** - Current render value to track.

#### Returns

The **previous** render’s \`value\`. On the first render, returns \`undefined\`.
`,

  useRafState: `## API Reference

### \`useRafState\`

**Signature:** \`useRafState<T>(initialState: T): [T, React.Dispatch<React.SetStateAction<T>>]\`

#### Parameters

1. **\`initialState\`** - Initial state (same as \`useState\`).

#### Returns

Tuple \`[state, setState]\` where updates are scheduled via \`requestAnimationFrame\` in the browser.
`,

  useResizeObserver: `## API Reference

### \`useResizeObserver\`

**Signature:** \`useResizeObserver(targetRef): { width: number; height: number }\`

#### Parameters

1. **\`targetRef\`** - Ref to the element whose content box size should be tracked.

#### Returns

Object with numeric \`width\` and \`height\` from the latest \`ResizeObserver\` entry.
`,

  useScript: `## API Reference

### \`useScript\`

**Signature:** \`useScript(src?: string): ScriptStatus\`

#### Parameters

1. **\`src\`** - Script URL. Omit or pass \`undefined\` for idle state without loading.

#### Returns

Status string: \`idle\` | \`loading\` | \`ready\` | \`error\`.
`,

  useSessionStorage: `## API Reference

### \`useSessionStorage\`

**Signature:** \`useSessionStorage<T>(key, initialValue, options?)\`

#### Parameters

1. **\`key\`** - \`sessionStorage\` key.
2. **\`initialValue\`** - Initial value or lazy initializer.
3. **\`options\`** (optional) - \`initializeWithValue\`, \`serializer\`, \`deserializer\`.

#### Returns

Tuple \`[value, setValue, removeValue]\` mirroring \`useState\` plus storage removal.
`,

  useTextareaAutoSize: `## API Reference

### \`useTextareaAutoSize\`

**Signature:** \`useTextareaAutoSize(options?)\`

#### Parameters

Optional **\`options\`**:

- \`elementRef\` / internal ref - textarea element.
- \`input\` - controlled text value driving height recalculation.
- \`onResize\` - callback after height change.
- \`styleTarget\` - optional element whose height should mirror the textarea.

#### Returns

\`{ textareaRef, input, setInput, triggerResize }\` - refs, state, and manual resize trigger.
`,

  useThrottle: `## API Reference

### \`useThrottle\`

**Signature:** \`useThrottle<T>(value: T, delay?: number): T\`

#### Parameters

1. **\`value\`** - Frequently changing input.
2. **\`delay\`** - Minimum spacing between propagated updates (default \`500\`).

#### Returns

Throttled value that updates at most according to the throttle schedule.
`,

  useTimeout: `## API Reference

### \`useTimeout\`

**Signature:** \`useTimeout(callback: () => void, delay: number | null): void\`

#### Parameters

1. **\`callback\`** - Runs once after \`delay\` ms when \`delay\` is a number.
2. **\`delay\`** - Milliseconds, or \`null\` to skip scheduling.

#### Returns

Nothing (\`void\`).
`,

  useTitle: `## API Reference

### \`useTitle\`

**Signature:** \`useTitle(title: string, restoreOnUnmount?: boolean): void\`

#### Parameters

1. **\`title\`** - Next \`document.title\`.
2. **\`restoreOnUnmount\`** - When \`true\`, restores the previous title on unmount.

#### Returns

Nothing (\`void\`).
`,

  useToggle: `## API Reference

### \`useToggle\`

**Signature:** \`useToggle(initialValue?: boolean): UseToggleReturn\`

#### Parameters

1. **\`initialValue\`** - Starting boolean (default \`false\`).

#### Returns

Tuple \`[value, toggle, set]\` - current flag, flip function, and explicit setter.
`,

  useWindowSize: `## API Reference

### \`useWindowSize\`

**Signature:** \`useWindowSize(): { width: number; height: number }\`

#### Parameters

None.

#### Returns

Latest inner width and height of the \`window\` (zeros when \`window\` is unavailable).
`,
}

function stripOldApiReference(md) {
  let out = md
  out = out.replace(/\n## API Reference[\s\S]*?(?=\n## (?:Copy-paste hook|Type declarations|Type Declarations)\b)/m, '')
  if (/\n## API Reference\b/.test(out)) {
    const tailMatch = out.match(/\n## API Reference([\s\S]*)$/)
    if (tailMatch) {
      const tail = tailMatch[1]
      const tsFence = tail.match(/\n```(?:typescript|ts)\n([\s\S]*?)```\s*$/)
      if (tsFence && !out.includes('\n## Type declarations') && !out.includes('\n## Type Declarations')) {
        const restored = `\n## Type declarations\n\n\`\`\`typescript\n${tsFence[1]}\`\`\`\n`
        out = out.replace(/\n## API Reference[\s\S]*$/, restored)
      } else {
        out = out.replace(/\n## API Reference[\s\S]*$/, '')
      }
    }
  }
  return out
}

function insertApiReference(md, hookName, section) {
  const markers = ['\n## Copy-paste hook', '\n## Type declarations', '\n## Type Declarations']
  let best = -1
  for (const m of markers) {
    const i = md.indexOf(m)
    if (i !== -1 && (best === -1 || i < best)) best = i
  }
  const block = `\n${section.trim()}\n`
  if (best === -1) return `${md.trimEnd()}${block}\n`
  return `${md.slice(0, best)}${block}${md.slice(best)}`
}

const files = fs.readdirSync(docsDir).filter((f) => /^use.*\.md$/.test(f))

for (const file of files) {
  const hookName = path.basename(file, '.md')
  const section = apiSections[hookName]
  if (!section) {
    console.warn('Missing API template for', hookName)
    continue
  }
  const filePath = path.join(docsDir, file)
  let md = fs.readFileSync(filePath, 'utf8')
  md = stripOldApiReference(md)
  if (!md.includes('\n## API Reference')) {
    md = insertApiReference(md, hookName, section)
  }
  fs.writeFileSync(filePath, md, 'utf8')
}

console.log(`Unified API Reference in ${files.length} hook docs.`)
