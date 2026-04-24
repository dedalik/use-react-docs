---
title: Live Unix timestamp in milliseconds
sidebar_label: useTimestamp
category: Time
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useTimestamp'
description: >-
  useTimestamp from @dedalik/use-react: Date.now() on an interval. TypeScript,
  tree-shakable import, examples, SSR notes.
---

# useTimestamp()

<PackageData fn="useTimestamp" />

Last updated: 23/04/2026

## Overview

`useTimestamp` returns `Date.now()` and refreshes it on a timer—lighter than keeping a full `Date` (`useNow`) when you only need a millisecond epoch for keys, cache busting, or comparisons.

### What it accepts

- **`options.interval`** (optional, default `1000`) — ms between updates, or `null` / `0` to freeze at mount.

### What it returns

- `number` — Unix timestamp in milliseconds.

## SSR

First render uses the server clock; after hydration the interval may advance the value—same caveats as `useNow`.

## Usage

```tsx
import useTimestamp from '@dedalik/use-react/useTimestamp'

export default function EpochDemo() {
  const ts = useTimestamp({ interval: 1000 })
  return <output>{ts}</output>
}
```

## API Reference

### `useTimestamp`

**Signature:** `useTimestamp(options?): number`

#### Parameters

1. **`options`** — `{ interval?: number | null }`.

#### Returns

Milliseconds since Unix epoch.

## Copy-paste hook

Source of truth: [`useTimestamp.tsx` on GitHub](https://github.com/dedalik/use-react/blob/main/src/hooks/useTimestamp.tsx).

## Type declarations

```ts
declare function useTimestamp(options?: { interval?: number | null }): number

export default useTimestamp
```
