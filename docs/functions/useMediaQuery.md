---
title: React to media query matches
sidebar_label: useMediaQuery
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useMediaQuery.tsx'
description: >-
  useMediaQuery from @dedalik/use-react: React to media query matches.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useMediaQuery()

<PackageData fn="useMediaQuery" />

<HookLiveDemo demo="useMediaQuery/basic" title="useMediaQuery interactive demo" />

## Overview

`useMediaQuery` subscribes to `window.matchMedia(query)` (or a `targetWindow` you pass) and returns a boolean that updates whenever the query’s truth value flips-typical uses are responsive breakpoints, `prefers-reduced-motion`, color-scheme, or pointer/hover capabilities. On the server or when `matchMedia` is missing, it falls back to **`defaultValue`**, and **`initializeWithValue`** lets you skip the synchronous read on first render (useful if you want a stable SSR markup then hydrate to the real match in `useEffect`). The effect re-binds when `query` or `targetWindow` changes so derived layout stays correct across navigation or embedded iframes.

### What it accepts

1. **`query`** - Any valid CSS media query string (for example `(max-width: 768px)`).
2. Optional **`options`** - `defaultValue`, `initializeWithValue`, `targetWindow`.

### What it returns

- **`boolean`** - Whether the media query currently matches.

## Usage

Breakpoint plus explicit options: mobile-first default during SSR, then live `matchMedia` in the browser window.

```tsx
import useMediaQuery from '@dedalik/use-react/useMediaQuery'

function Example() {
  const isNarrow = useMediaQuery('(max-width: 640px)', {
    defaultValue: true,
    initializeWithValue: false,
    targetWindow: typeof window !== 'undefined' ? window : undefined,
  })

  return (
    <div>
      <h3>Layout hint</h3>
      <p>
        Viewport treats this as <strong>{isNarrow ? 'narrow' : 'wide'}</strong> (&lt;= 640px).
      </p>
      <nav
        style={{
          display: 'flex',
          flexDirection: isNarrow ? 'column' : 'row',
          gap: 8,
        }}
      >
        <a href='#a'>Home</a>
        <a href='#b'>Docs</a>
        <a href='#c'>Contact</a>
      </nav>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useMediaQuery`

**Signature:** `useMediaQuery(query: string, options?: UseMediaQueryOptions): boolean`

#### Parameters

1. **`query`** (`string`) - Media query evaluated via `matchMedia`.
2. **`options`** (`UseMediaQueryOptions`, optional) - Default: `{}`.
   - **`defaultValue`** (`boolean`, optional) - Used when `targetWindow` / `matchMedia` is unavailable. Default `false`.
   - **`initializeWithValue`** (`boolean`, optional) - If `true`, initial state calls `matchMedia` synchronously; if `false`, starts from `defaultValue`. Default `true`.
   - **`targetWindow`** (`Window`, optional) - Window whose `matchMedia` to use; defaults to global `window` in the browser.

#### Returns

`boolean` - Current `matches` for the query.

## Copy-paste hook

### TypeScript

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

### JavaScript

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
