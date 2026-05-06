---
title: Read viewport width with SSR fallback
sidebar_label: useSSRWidth
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useSSRWidth.tsx'
description: >-
  useSSRWidth from @dedalik/use-react: client width with safe server fallback.
---

# useSSRWidth()

<PackageData fn="useSSRWidth" />

<HookLiveDemo demo="useSSRWidth/basic" title="useSSRWidth interactive demo" />

## Overview

`useSSRWidth` returns **`fallback`** when `window` is undefined (typical SSR / static generation) so layout code can branch on a predictable number instead of `0`, and on the client it **`useMemo`**izes **`window.innerWidth` once** for the current **`fallback`** dependency-meaning you get the viewport width captured at first render but **not** a live value after browser resizes. Pick **`fallback`** to match your mobile-first or desktop-first assumed canvas (for example `375` or `1280`); for responsive width that updates, use **`useWindowSize`** or **`useBreakpoints`** instead.

### What it accepts

- **`fallback`** (optional) - Width used when `window` is missing. Default `1024`.

### What it returns

- **`number`** - `fallback` on the server; initial `innerWidth` on the client (memoized, not resize-aware).

## Usage

Assume a narrow viewport during SSR (**`375`**) while still reading the real first-paint width on the client for a simple two-column hint.

```tsx
import useSSRWidth from '@dedalik/use-react/useSSRWidth'

function Example() {
  const width = useSSRWidth(375)
  const isWide = width >= 768

  return (
    <div>
      <h3>SSR-safe width</h3>
      <p>
        Resolved width: <strong>{width}px</strong> (SSR would see <strong>375</strong> until client code runs).
      </p>
      <p>
        Layout hint: <strong>{isWide ? 'two-column' : 'single-column'}</strong>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useSSRWidth`

**Signature:** `useSSRWidth(fallback?: number): number`

#### Parameters

- **`fallback`** (`number`, optional) - Substitute width when `window` is undefined. Default `1024`.

#### Returns

**`number`** - `fallback` during SSR; otherwise memoized `window.innerWidth` from the first evaluation (does not update on window resize).

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

/**
 * Returns viewport width on client and fallback width on server.
 */
export default function useSSRWidth(fallback = 1024): number {
  return useMemo(() => {
    if (typeof window === 'undefined') return fallback
    return window.innerWidth
  }, [fallback])
}
```

### JavaScript

```js
import { useMemo } from 'react'

export default function useSSRWidth(fallback = 1024) {
  return useMemo(() => {
    if (typeof window === 'undefined') return fallback
    return window.innerWidth
  }, [fallback])
}
```
