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
  'useBroadcastChannel/basic':
    'Broadcast structured messages across tabs on one channel and inspect the latest received payload.',
  'useBrowserLocation/basic':
    'Watch href/path/search/hash updates from popstate/hashchange and try quick hash navigation actions.',
  'useFileDialog/basic': 'Open the native file chooser, capture selected files, and reset selection programmatically.',
  'useFileSystemAccess/basic':
    'Open a text file with native picker, edit content, and save it back through the File System Access API.',
  'useBluetooth/basic': 'Trigger the Web Bluetooth device picker and track selected device name and request errors.',
  'useFullscreen/basic':
    'Enter, exit, and toggle fullscreen for a target element while tracking real-time fullscreen state.',
  'useMediaControls/basic':
    'Control a media element with custom play/pause, mute, volume, and seek interactions synced from events.',
  'useMemory/basic': 'Poll performance.memory in Chromium and display live used/total/limit JS heap snapshots.',
  'useMediaQuery/basic':
    'Subscribe to multiple media queries and watch match booleans react to viewport and system preference changes.',
  'useCssSupports/basic':
    'Check CSS.supports in both property/value and condition-string forms with live user-entered input.',
  'useCssVar/basic': 'Read and update a CSS custom property on a target element, keeping UI state in sync with styles.',
  'useBreakpoints/basic':
    'Resolve active breakpoint names from window width and inspect current, active list, boolean flags, and >= checks.',
  'usePreferredColorScheme/basic':
    'Read prefers-color-scheme changes and map them to light/dark/no-preference UI behavior.',
  'usePreferredDark/basic':
    'Return a boolean from prefers-color-scheme: dark for straightforward dark-mode branching in UI.',
  'useDark/basic':
    'Persist an explicit dark/light choice and synchronize dark/light classes on the chosen DOM element.',
  'usePreferredLanguages/basic':
    'Expose navigator language priority order and refresh when the browser locale preference changes.',
  'usePreferredReducedMotion/basic':
    'Observe prefers-reduced-motion and conditionally disable non-essential animations in UI.',
  'usePreferredContrast/basic':
    'Read prefers-contrast (more/less/custom/no-preference) and map it to stronger or softer visual emphasis.',
  'usePreferredReducedTransparency/basic':
    'Observe prefers-reduced-transparency and replace frosted/translucent UI surfaces with solid backgrounds.',
  'useColorMode/basic':
    'Persist light/dark/auto mode and expose resolved dark state while syncing theme attribute/class on the root.',
  'useUrlSearchParams/basic':
    'Read current URL query values and replace search params through record or URLSearchParams updates.',
  'useSSRWidth/basic':
    'Return fallback width on server and initial window width on client for SSR-safe layout branching.',
  'useScreenOrientation/basic':
    'Track screen orientation type and angle, then derive portrait/landscape oriented UI hints.',
  'useShare/basic':
    'Open the native share sheet with title, text, and URL, then reflect whether share succeeded or was dismissed.',
  'useVibrate/basic':
    'Invoke short and patterned device vibrations from user gestures, and report whether the browser accepted calls.',
  'useWakeLock/basic':
    'Acquire and release a screen wake lock, tracking active state and request outcomes in real time.',
  'useStyleTag/basic':
    'Inject CSS into a dynamic style tag, swap style variants live, and observe id/loaded/error state.',
  'useWebNotification/basic':
    'Request notification permission and send a browser notification while tracking permission/action outcomes.',
  'useScreenSafeArea/basic':
    'Read top/right/bottom/left safe-area insets and preview layout padding adjusted with current values.',
  'useWindowSize/basic':
    'Track live viewport width/height from resize events and derive orientation/aspect display hints.',
  'useTitle/basic': 'Set document.title from component state and optionally restore the previous title on unmount.',
  'useLockBodyScroll/basic':
    'Toggle body overflow lock with overlay state so background page scrolling is disabled while open.',
  'useScript/basic':
    'Load and track an external script URL with idle/loading/ready/error status and global availability checks.',
  'usePageVisibility/basic':
    'Mirror document visibility state and pause visible-only work while the tab or window is hidden.',
  'useCopyToClipboard/basic':
    'Copy text to navigator.clipboard, track success/failure, and expose the hook stored copied value.',
  'useClipboardItems/basic':
    'Read ClipboardItem entries from the async clipboard API and inspect returned MIME type groups.',
  'usePermission/basic':
    'Observe Permissions API state for selected names and watch updates when browser settings change.',
  'usePerformanceObserver/basic':
    'Subscribe to PerformanceObserver entry types and inspect buffered navigation/resource timeline events.',
  'useTextDirection/basic':
    'Watch document dir changes and switch UI direction between ltr and rtl with a simple state value.',
  'useFavicon/basic': 'Swap the tab icon dynamically using preset and custom favicon URLs.',
  'useHash/basic': 'Read and update window.location.hash with quick presets and custom hash input.',
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
