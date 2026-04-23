---
title: Best Practice
---

# Best Practice

The fastest way to keep a hooks-based codebase healthy is to separate concerns early and keep each hook
focused on one responsibility. The practices below are designed for teams that ship features often and
need predictable behavior in both browser-only and SSR environments.

## Choose hooks by responsibility

- State transitions: `useToggle`, `usePrevious`, `useThrottle`
- Browser interaction: `useMediaQuery`, `useWindowSize`, `useTitle`
- Async/network: `useAsync`, `useAbortController`

When selecting hooks, start from the problem domain instead of implementation details. For example, if
the problem is "too many requests", pick timing/network hooks first (`useDebounce`, `useAbortController`)
before adding custom state complexity.

## Keep hooks copy-paste friendly

Each hook page includes a **Copy-paste hook** block so teams can vendor logic when needed. This is useful
for projects with strict dependency policies or internal platform repos that cannot consume shared packages directly.

## Prefer explicit cancellation

For request-heavy screens, combine `useAbortController` with `useAsync` to avoid race conditions.

This is especially important in UI flows where users type quickly, switch tabs, or update filters repeatedly.
Without cancellation, stale responses can overwrite newer state and create misleading UI.

## Keep UI reactive, not noisy

Use `useDebounce` and `useThrottle` for input and scroll-driven updates.

## Practical architecture pattern

1. Keep raw view state inside the component.
2. Move repeated logic into hooks once it appears in 2+ places.
3. Keep hook APIs narrow and explicit (inputs, outputs, side effects).
4. Document edge cases in the hook page before shipping.
