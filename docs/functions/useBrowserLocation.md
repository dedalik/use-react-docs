---
title: Track browser URL location fields
sidebar_label: useBrowserLocation
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useBrowserLocation.tsx'
description: >-
  useBrowserLocation from @dedalik/use-react: reactive snapshot of URL fields with
  popstate/hashchange updates.
---

# useBrowserLocation()

<PackageData fn="useBrowserLocation" />

<HookLiveDemo demo="useBrowserLocation/basic" />

## Overview

`useBrowserLocation` returns a small reactive snapshot of the current URL (`href`, `pathname`, `search`, `hash`) derived from `window.location`, and keeps it updated when the user navigates with the back/forward buttons (`popstate`) or when the hash changes (`hashchange`). It is useful for lightweight URL-driven UI and debugging, but note it does not automatically subscribe to every client-side navigation API-`history.pushState`/`replaceState` won’t emit `popstate`-so for SPA navigations you typically pair this with your router events or call your own update mechanism when you mutate history outside these events.

### What it accepts

- No arguments.

### What it returns

- Object with:
  - `href`: Full URL string (`window.location.href`). Type `string`.
  - `pathname`: URL path (`window.location.pathname`). Type `string`.
  - `search`: Query string including `?` (`window.location.search`). Type `string`.
  - `hash`: Hash including `#` (`window.location.hash`). Type `string`.

## Usage

Real-world example: display live URL parts and demonstrate updates from hash changes (and back/forward navigation via `popstate`).

```tsx
import { useMemo, useState } from 'react'
import useBrowserLocation from '@dedalik/use-react/useBrowserLocation'

function Example() {
  const loc = useBrowserLocation()
  const [counter, setCounter] = useState(0)

  const pretty = useMemo(() => {
    const q = loc.search ? ` ${loc.search}` : ''
    const h = loc.hash ? ` ${loc.hash}` : ''
    return `${loc.pathname}${q}${h}`
  }, [loc.hash, loc.pathname, loc.search])

  return (
    <div>
      <h3>Browser location</h3>
      <p>
        <strong>href:</strong> <code>{loc.href || '-'}</code>
      </p>
      <p>
        <strong>path + query + hash:</strong> <code>{pretty || '-'}</code>
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button type='button' onClick={() => (window.location.hash = `#tab-${counter}`)}>
          Set hash
        </button>
        <button type='button' onClick={() => setCounter((c) => c + 1)}>
          Bump counter (hash uses this)
        </button>
      </div>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useBrowserLocation`

**Signature:** `useBrowserLocation(): BrowserLocationState`

#### Parameters

None.

#### Returns

Object with:

- `href` - Full URL string (`window.location.href`). (`string`).
- `pathname` - URL path (`window.location.pathname`). (`string`).
- `search` - Query string including `?` (`window.location.search`). (`string`).
- `hash` - Hash including `#` (`window.location.hash`). (`string`).

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export interface BrowserLocationState {
  href: string
  pathname: string
  search: string
  hash: string
}

const emptyLocation: BrowserLocationState = {
  href: '',
  pathname: '',
  search: '',
  hash: '',
}

function readLocation(): BrowserLocationState {
  return {
    href: window.location.href,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  }
}

/**
 * Tracks browser location changes from history and hash events.
 */
export default function useBrowserLocation(): BrowserLocationState {
  const [state, setState] = useState<BrowserLocationState>(() =>
    typeof window === 'undefined' ? emptyLocation : readLocation(),
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const update = () => setState(readLocation())
    update()

    window.addEventListener('popstate', update)
    window.addEventListener('hashchange', update)

    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener('hashchange', update)
    }
  }, [])

  return state
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

const emptyLocation = {
  href: '',
  pathname: '',
  search: '',
  hash: '',
}

function readLocation() {
  return {
    href: window.location.href,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  }
}

export default function useBrowserLocation() {
  const [state, setState] = useState(() => (typeof window === 'undefined' ? emptyLocation : readLocation()))

  useEffect(() => {
    if (typeof window === 'undefined') return

    const update = () => setState(readLocation())
    update()

    window.addEventListener('popstate', update)
    window.addEventListener('hashchange', update)

    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener('hashchange', update)
    }
  }, [])

  return state
}
```
