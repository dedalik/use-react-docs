---
title: Manage URL search query params
sidebar_label: useUrlSearchParams
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useUrlSearchParams.tsx'
description: >-
  useUrlSearchParams from @dedalik/use-react: read and update URL query params.
---

# useUrlSearchParams()

<PackageData fn="useUrlSearchParams" />

Last updated: 24/04/2026

## Overview

`useUrlSearchParams` keeps a **`URLSearchParams`** snapshot in sync with **`window.location.search`**, listens for **`popstate`** so back/forward restores the query string into React, and exposes **`setSearchParams`** which **`replaceState`**s the current path + optional hash while normalizing either a plain record of strings or an existing **`URLSearchParams`** instance-ideal for shareable filters without a router, or lightweight demos on static hosts. Updates do not add history entries (replace only), which avoids cluttering the stack when sliders or toggles write frequently.

### What it accepts

- None.

### What it returns

- Tuple **`[params, setSearchParams]`** - Current params and updater accepting **`URLSearchParams | Record<string, string>`**.

## Usage

Mini “search” UI: read **`q`**, update via **record** and via **`URLSearchParams`** clone (no `JSON.stringify`).

```tsx
import useUrlSearchParams from '@dedalik/use-react/useUrlSearchParams'

function Example() {
  const [params, setSearchParams] = useUrlSearchParams()
  const q = params.get('q') ?? ''
  const page = params.get('page') ?? '1'

  return (
    <div>
      <h3>Query string</h3>
      <p>
        <code>q</code>: <strong>{q || '-'}</strong> - <code>page</code>: <strong>{page}</strong>
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
        <input
          type='search'
          placeholder='Search…'
          value={q}
          onChange={(event) =>
            setSearchParams({
              q: event.target.value,
              page: '1',
            })
          }
        />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            type='button'
            onClick={() => {
              const next = new URLSearchParams(params)
              const pageNum = Number.parseInt(page, 10)
              next.set('page', String(Number.isFinite(pageNum) ? pageNum + 1 : 2))
              setSearchParams(next)
            }}
          >
            Next page (URLSearchParams)
          </button>
          <button type='button' onClick={() => setSearchParams({})}>
            Clear all
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useUrlSearchParams`

**Signature:** `useUrlSearchParams(): UseUrlSearchParamsReturn`

#### Parameters

None.

#### Returns

Tuple:

1. **`URLSearchParams`** - Parsed from `window.location.search` (empty on SSR).
2. **`setSearchParams`** - `(next: URLSearchParams | Record<string, string>) => void` - Replaces the URL query via `history.replaceState` and updates state.

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useState } from 'react'

export type UseUrlSearchParamsReturn = [URLSearchParams, (next: URLSearchParams | Record<string, string>) => void]

function readParams(): URLSearchParams {
  if (typeof window === 'undefined') return new URLSearchParams()
  return new URLSearchParams(window.location.search)
}

/**
 * Tracks and updates URL search params.
 */
export default function useUrlSearchParams(): UseUrlSearchParamsReturn {
  const [params, setParams] = useState<URLSearchParams>(() => readParams())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onChange = () => setParams(readParams())
    window.addEventListener('popstate', onChange)
    return () => window.removeEventListener('popstate', onChange)
  }, [])

  const setSearchParams = useCallback((next: URLSearchParams | Record<string, string>) => {
    if (typeof window === 'undefined') return

    const normalized = next instanceof URLSearchParams ? next : new URLSearchParams(next)
    const query = normalized.toString()
    const url = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`
    window.history.replaceState({}, '', url)
    setParams(new URLSearchParams(query))
  }, [])

  return [params, setSearchParams]
}
```

### JavaScript

```js
import { useCallback, useEffect, useState } from 'react'

function readParams() {
  if (typeof window === 'undefined') return new URLSearchParams()
  return new URLSearchParams(window.location.search)
}

export default function useUrlSearchParams() {
  const [params, setParams] = useState(() => readParams())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onChange = () => setParams(readParams())
    window.addEventListener('popstate', onChange)
    return () => window.removeEventListener('popstate', onChange)
  }, [])

  const setSearchParams = useCallback((next) => {
    if (typeof window === 'undefined') return

    const normalized = next instanceof URLSearchParams ? next : new URLSearchParams(next)
    const query = normalized.toString()
    const url = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`
    window.history.replaceState({}, '', url)
    setParams(new URLSearchParams(query))
  }, [])

  return [params, setSearchParams]
}
```
