/**
 * One-line copy for the HookLiveDemo block (replaces the generic “React mounts here…” line).
 * Keys are `useX/basic` as passed to the `demo` prop.
 */
export const hookDemoSubtitles: Record<string, string> = {
  'useActiveElement/basic':
    'Mirror document.activeElement and inspect focus transitions across inputs, textarea, buttons, and links.',
  'useClickOutside/basic':
    'Close a panel when clicks happen outside multiple protected refs (toggle button + content area).',
  'useDraggable/basic':
    'Drag a card by its handle and keep it inside a container while tracking position and drag state.',
  'useDropZone/basic': 'Track drag-over state and capture dropped files with hover feedback and recent-drop logging.',
  'useElementBounding/basic':
    'Track full DOMRect values (x/y/edges/size) while a target moves inside a scrollable container.',
  'useElementSize/basic':
    'Observe a panel size with ResizeObserver while changing width, height, and inner padding live.',
  'useElementVisibility/basic':
    'Observe when a sentinel becomes visible inside a scroll root with configurable threshold.',
  'useParentElement/basic':
    'Resolve and inspect a target node parentElement, and interact with the parent wrapper through the returned node.',
  'useWindowFocus/basic': 'Reflect current window focus/blur state and demonstrate focus-aware background ticking.',
  'useWindowScroll/basic': 'Track live window scrollX/scrollY and expose quick actions for top/middle/end navigation.',
  'useTextareaAutoSize/basic':
    'Autosize a textarea to content height; optionally sync the measured height to a wrapper via styleTarget.',
  'useToggle/basic':
    'Boolean (or set) state with a flip/toggle, optional custom setters, and a stable toggler function.',
  'useCounter/basic': 'Increment, decrement, or set a number with optional min/max so values stay in range.',
  'useDebounce/basic': 'Debounce a value: the output updates only after the input has settled for a chosen delay.',
  'usePrevious/basic':
    'Read the value from the previous render - handy for diffs, animations, and simple undo of values.',
  'useLatest/basic':
    'A ref that always points at the latest value, so callbacks and effects can read fresh data without re-subscribing.',
  'useThrottle/basic': 'Throttle a value so it can change at most once per interval while the input keeps moving.',
  'useAsyncState/basic': 'Async loadable state: loading / ready / error, optional data, and cancel for stale work.',
  'useStorage/basic': 'Sync React state with `localStorage` (or any `Storage`) with JSON and optional `remove`.',
  'useStorageAsync/basic':
    'Async storage: load with `getItem` after mount, then persist with a loading flag and serializers.',
  'useLastChanged/basic':
    'Record when a value last changed, expose a time difference, and reset the timer when needed.',
  'useRefHistory/basic': 'Every change becomes a history snapshot: undo, redo, clear, and cap length with capacity.',
  'useManualRefHistory/basic':
    'Ref-based history, but you commit snapshots explicitly for frequent or batched updates.',
  'useDebouncedRefHistory/basic':
    'Ref history: record a new snapshot only after the value has been still for a debounce period.',
  'useThrottledRefHistory/basic':
    'Ref history: record at most one snapshot per throttle window while the value changes fast.',
  'useEventCallback/basic': 'Event handler with a stable identity that always calls the latest implementation.',
  'useOnMount/basic': 'Run a function once on mount, optionally with a returned cleanup on unmount.',
}

export const defaultHookLiveDemoFallback = 'Live preview: React mounts here and runs the hook in your browser.'
