---
title: React to media query matches
sidebar_label: useMediaQuery
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useMediaQuery'
description: >-
  useMediaQuery from @dedalik/use-react: React to media query matches.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useMediaQuery()

<PackageData fn="useMediaQuery" />

Last updated: 23/04/2026, 15:56

## Overview

`useMediaQuery` evaluates a media query and returns whether it currently matches.

Use it for behavior-level responsiveness, such as conditional data density, rendering strategy, and interaction model.

### What it accepts

- `query`: CSS media query string.
- `options` (optional): default value, initialization mode, and custom target window.

### What it returns

- `boolean` indicating whether the media query currently matches.

`useMediaQuery` listens to a media query and returns whether it currently matches. It is useful for responsive logic in components, not only responsive CSS styles.

## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import useMediaQuery from '@dedalik/use-react/useMediaQuery'

function ColorSchemeExample() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

  return <p>Dark mode preference: {String(prefersDark)}</p>
}

export default function ColorSchemeDemo() {
  return <ColorSchemeExample />
}
```

## API Reference

### `useMediaQuery`

**Signature:** `useMediaQuery(query: string, options?): boolean`

#### Parameters

1. **`query`** - Any valid CSS media query string.
2. **`options`** (optional) - `defaultValue`, `initializeWithValue`, `targetWindow` for SSR or iframes.

#### Returns

`true` when the query matches, `false` otherwise.

## Copy-paste hook

```tsx
import { useEffect, useState } from 'react'

export interface UseMediaQueryOptions {
  defaultValue?: boolean
  initializeWithValue?: boolean
  targetWindow?: Window
}

const isBrowser = typeof window !== 'undefined'

export default function useMediaQuery(query: string, options: UseMediaQueryOptions = {}): boolean {
  const { defaultValue = false, initializeWithValue = true, targetWindow = isBrowser ? window : undefined } = options

  const getMatches = (): boolean => {
    if (!targetWindow || typeof targetWindow.matchMedia !== 'function') {
      return defaultValue
    }

    return targetWindow.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => (initializeWithValue ? getMatches() : defaultValue))

  useEffect(() => {
    if (!targetWindow || typeof targetWindow.matchMedia !== 'function') {
      return
    }

    const mediaQueryList = targetWindow.matchMedia(query)
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    setMatches(mediaQueryList.matches)
    mediaQueryList.addEventListener('change', listener)

    return () => {
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [query, targetWindow])

  return matches
}

export type UseMediaQueryType = ReturnType<typeof useMediaQuery>
```

### JavaScript version

```js
import { useEffect, useState } from 'react'

const isBrowser = typeof window !== 'undefined'
export default function useMediaQuery(query, options = {}) {
  const { defaultValue = false, initializeWithValue = true, targetWindow = isBrowser ? window : undefined } = options

  const getMatches = () => {
    if (!targetWindow || typeof targetWindow.matchMedia !== 'function') {
      return defaultValue
    }
    return targetWindow.matchMedia(query).matches
  }

  const [matches, setMatches] = useState(() => (initializeWithValue ? getMatches() : defaultValue))

  useEffect(() => {
    if (!targetWindow || typeof targetWindow.matchMedia !== 'function') {
      return
    }

    const mediaQueryList = targetWindow.matchMedia(query)

    const listener = (event) => {
      setMatches(event.matches)
    }
    setMatches(mediaQueryList.matches)
    mediaQueryList.addEventListener('change', listener)
    return () => {
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [query, targetWindow])

  return matches
}
```

## Type declarations

```ts
declare function useMediaQuery(
  query: string,
  options?: {
    defaultValue?: boolean
    initializeWithValue?: boolean
    targetWindow?: Window
  },
): boolean

export default useMediaQuery
```
