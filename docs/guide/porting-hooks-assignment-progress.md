---
title: Porting hooks assignment progress
description: >-
  Working checklist for the assignment hook list. Mark done, skipped, or
  covered-by-existing-name without duplicating APIs.
---

# Assignment progress tracker

## Rules

- Mark each item as one of:
  - `[x]` done
  - `[ ]` todo
  - `[~]` covered-by-existing-name (do not implement duplicate)
  - `[-]` skipped / not planned for this package
- If a hook exists under a different stable name, **do not re-implement** it.
- Keep this file updated in the same PR/commit where hook status changes.

## State

- [x] createGlobalState
- [x] createInjectionState
- [x] createSharedComposable
- [~] injectLocal (covered-by-existing: createInjectionState)
- [~] provideLocal (covered-by-existing: createInjectionState)
- [x] useAsyncState
- [x] useDebouncedRefHistory
- [x] useLastChanged
- [x] useLocalStorage
- [x] useManualRefHistory
- [x] useRefHistory
- [x] useSessionStorage
- [x] useStorage
- [x] useStorageAsync
- [x] useThrottledRefHistory

## Elements

- [x] useActiveElement
- [~] useDocumentVisibility (covered by `usePageVisibility`)
- [x] useDraggable
- [x] useDropZone
- [x] useElementBounding
- [x] useElementSize
- [x] useElementVisibility
- [x] useIntersectionObserver
- [x] useMouseInElement
- [x] useMutationObserver
- [x] useParentElement
- [x] useResizeObserver
- [x] useWindowFocus
- [x] useWindowScroll
- [x] useWindowSize

## Browser

- [x] useBluetooth
- [x] useBreakpoints
- [x] useBroadcastChannel
- [x] useBrowserLocation
- [~] useClipboard (covered by `useCopyToClipboard`)
- [x] useClipboardItems
- [x] useColorMode
- [x] useCssSupports
- [x] useCssVar
- [x] useDark
- [x] useEventListener
- [x] useEyeDropper
- [x] useFavicon
- [x] useFileDialog
- [x] useFileSystemAccess
- [x] useFullscreen
- [x] useGamepad
- [x] useImage
- [x] useMediaControls
- [x] useMediaQuery
- [x] useMemory
- [x] useObjectUrl
- [x] usePerformanceObserver
- [x] usePermission
- [x] usePreferredColorScheme
- [x] usePreferredContrast
- [x] usePreferredDark
- [x] usePreferredLanguages
- [x] usePreferredReducedMotion
- [x] usePreferredReducedTransparency
- [x] useScreenOrientation
- [x] useScreenSafeArea
- [~] useScriptTag (covered by `useScript`)
- [x] useShare
- [x] useSSRWidth
- [x] useStyleTag
- [~] useTextareaAutosize (covered by `useTextareaAutoSize`)
- [x] useTextDirection
- [x] useTitle
- [x] useUrlSearchParams
- [x] useVibrate
- [x] useWakeLock
- [x] useWebNotification
- [x] useWebWorker
- [x] useWebWorkerFn

## Sensors

- [~] onClickOutside (covered by `useClickOutside`)
- [x] onElementRemoval
- [x] onKeyStroke
- [x] onLongPress
- [x] onStartTyping
- [x] useBattery
- [x] useDeviceMotion
- [x] useDeviceOrientation
- [x] useDevicePixelRatio
- [x] useDevicesList
- [x] useDisplayMedia
- [x] useElementByPoint
- [x] useElementHover
- [x] useFocus
- [x] useFocusWithin
- [x] useFps
- [x] useGeolocation
- [x] useIdle
- [x] useInfiniteScroll
- [x] useKeyModifier
- [x] useMagicKeys
- [x] useMouse
- [x] useMousePressed
- [x] useNavigatorLanguage
- [x] useNetwork
- [x] useOnline
- [x] usePageLeave
- [x] useParallax
- [x] usePointer
- [x] usePointerLock
- [x] usePointerSwipe
- [x] useScroll
- [~] useScrollLock (covered by `useLockBodyScroll`)
- [x] useSpeechRecognition
- [x] useSpeechSynthesis
- [x] useSwipe
- [x] useTextSelection
- [x] useUserMedia

## Network

- [x] useEventSource
- [x] useFetch
- [x] useWebSocket

## Animation

- [x] useAnimate
- [x] useInterval
- [x] useIntervalFn
- [x] useNow
- [x] useRafFn
- [x] useTimeout
- [x] useTimeoutFn
- [x] useTimestamp
- [x] usePresenceTransition

## Component

- [-] computedInject
- [-] createReusableTemplate
- [-] createTemplatePromise
- [-] templateRef
- [-] tryOnBeforeMount
- [-] tryOnBeforeUnmount
- [~] tryOnMounted (covered-by-existing: useOnMount)
- [-] tryOnScopeDispose
- [-] tryOnUnmounted
- [-] unrefElement
- [-] useCurrentElement
- [~] useMounted (covered-by-existing: useMountedState)
- [-] useTemplateRefsList
- [x] useVirtualList
- [-] useVModel
- [-] useVModels

## Watch

- [~] until (covered-by-existing: watchOnce + whenever)
- [x] watchArray
- [x] watchAtMost
- [x] watchDebounced
- [x] watchDeep
- [x] watchIgnorable
- [x] watchImmediate
- [x] watchOnce
- [x] watchPausable
- [x] watchThrottled
- [x] watchTriggerable
- [x] watchWithFilter
- [x] whenever

## Reactivity

- [~] computedAsync (covered-by-existing: useAsync)
- [-] computedEager
- [-] computedWithControl
- [~] createRef (covered-by-existing: React.createRef)
- [-] extendRef
- [-] reactify
- [-] reactifyObject
- [-] reactiveComputed
- [-] reactiveOmit
- [-] reactivePick
- [x] refAutoReset
- [x] refDebounced
- [-] refDefault
- [-] refManualReset
- [x] refThrottled
- [-] refWithControl
- [-] syncRef
- [-] syncRefs
- [-] toReactive
- [~] toRef (covered-by-existing: React.useRef)
- [~] toRefs (covered-by-existing: React.useRef + object mapping)

## Array

- [x] useArrayDifference
- [x] useArrayEvery
- [x] useArrayFilter
- [x] useArrayFind
- [x] useArrayFindIndex
- [x] useArrayFindLast
- [x] useArrayIncludes
- [x] useArrayJoin
- [x] useArrayMap
- [x] useArrayReduce
- [x] useArraySome
- [x] useArrayUnique
- [x] useSorted

## Time

- [x] useCountdown
- [x] useDateFormat
- [x] useTimeAgo
- [x] useTimeAgoIntl

## Utilities

- [-] createDisposableDirective
- [x] createEventHook
- [x] createUnrefFn
- [x] get
- [x] isDefined
- [x] makeDestructurable
- [x] set
- [x] useAsyncQueue
- [x] useBase64
- [x] useCached
- [x] useCloned
- [x] useConfirmDialog
- [x] useCounter
- [x] useCycleList
- [x] useDebounceFn
- [x] useEventBus
- [x] useMemoize
- [x] useOffsetPagination
- [x] usePrevious
- [x] useStepper
- [x] useSupported
- [x] useThrottleFn
- [x] useTimeoutPoll
- [x] useToggle
- [x] useToNumber
- [x] useToString

## Notes

- Current package exports are intentionally leaner than the full assignment list.
- Synced with actual `use-react/src/index.ts` exports and existing docs pages.
- This tracker is the source of truth for scope and completion decisions.
