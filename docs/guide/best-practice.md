---
title: Best Practice
description: >-
  React hooks best practices: responsibilities, SSR-safe patterns, and testing
  with @dedalik/use-react.
---

# Best Practice

The fastest way to keep a hooks-based codebase healthy is to separate concerns early and keep each hook
focused on one responsibility. The practices below are designed for teams that ship features often and
need predictable behavior in both browser-only and SSR environments.

## Choose hooks by responsibility

- State transitions: `useToggle`, `useCounter`, `usePrevious`, `useThrottle`, `useVModel`
- Browser interaction: `useMediaQuery`, `useBreakpoints`, `useWindowSize`, `useTitle`, `useUserMedia`, `useDisplayMedia`
- Layout reads: `useElementBounding`, `useElementSize`, `useResizeObserver`, `useElementVisibility`
- Async/network: `useAsync`, `useAbortController`, `useFetch`, `useWebSocket`
- Small collections: `useList`, `useCycleList`, `useStepper`
- Clocks and ticks: `useNow`, `useTimestamp`, `useDateFormat`, `useTimeAgo`, `useCountdown`, `useInterval`, `useTimeout`
- File picking and drops: `useFileDialog`, `useDropZone`
- Selection UI: `useTextSelection`
- Gestures: `usePointer`, `useSwipe`, `useDraggable`
- Storage: `useLocalStorage`, `useSessionStorage`, `useStorage`

When selecting hooks, start from the problem domain instead of implementation details. For example, if
the problem is "too many requests", pick timing/network hooks first (`useDebounce`, `useAbortController`)
before adding custom state complexity.

## Keep hooks copy-paste friendly

Each hook page includes a **Copy-paste hook** block so teams can vendor logic when needed. This is useful
for projects with strict dependency policies or internal platform repos that cannot consume shared packages directly.

## Prefer explicit cancellation

For request-heavy screens, combine `useAbortController` with `useAsync`, or use `useFetch` for declarative GET-style JSON loads with built-in abort on dependency changes.

This is especially important in UI flows where users type quickly, switch tabs, or update filters repeatedly.
Without cancellation, stale responses can overwrite newer state and create misleading UI.

## Keep UI reactive, not noisy

Use `useDebounce` and `useThrottle` for input and scroll-driven updates.

## Practical architecture pattern

1. Keep raw view state inside the component.
2. Move repeated logic into hooks once it appears in 2+ places.
3. Keep hook APIs narrow and explicit (inputs, outputs, side effects).
4. Document edge cases in the hook page before shipping.
