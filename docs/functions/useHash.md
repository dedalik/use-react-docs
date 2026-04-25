---
title: Read and update URL hash state
sidebar_label: useHash
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useHash.tsx'
description: >-
  useHash from @dedalik/use-react: Read and update URL hash state. TypeScript,
  tree-shakable import, examples, SSR notes.
---

# useHash()

<PackageData fn="useHash" />

Last updated: 24/04/2026

## Overview

`useHash` exposes the current URL hash (`window.location.hash`) as reactive state and provides a setter that writes `window.location.hash` when it actually changes. It listens for the browser `hashchange` event so updates still propagate when the hash changes via back/forward navigation, manual edits to the URL, or other code paths-not only through the returned setter-making it a simple building block for hash-routed tabs, deep links, and lightweight client-side navigation without a router.

### What it accepts

- No arguments.

### What it returns

- Tuple `[hash, setHash]`:
  - `hash`: Current hash string (including `#` if present in `location.hash`). Type `string`.
  - `setHash`: Updates `window.location.hash` when different. Type `(newHash: string) => void`.

## Usage

Real-world example: hash-driven tabs (`#profile` / `#security`) with a text field that can jump to an arbitrary hash.

```tsx
import { useMemo, useState } from 'react'
import useHash from '@dedalik/use-react/useHash'

function Example() {
  const [hash, setHash] = useHash()
  const [custom, setCustom] = useState('#settings')

  const active = useMemo(() => {
    if (hash === '#profile') return 'profile'
    if (hash === '#security') return 'security'
    if (hash === '#settings') return 'settings'
    return 'home'
  }, [hash])

  return (
    <div>
      <h3>Hash routing (lightweight)</h3>
      <p>
        Current hash: <code>{hash || '(empty)'}</code> - active panel: <code>{active}</code>
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button type='button' onClick={() => setHash('')}>
          Clear hash
        </button>
        <button type='button' onClick={() => setHash('#profile')}>
          #profile
        </button>
        <button type='button' onClick={() => setHash('#security')}>
          #security
        </button>
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <input value={custom} onChange={(event) => setCustom(event.target.value)} style={{ minWidth: 240 }} />
        <button type='button' onClick={() => setHash(custom)}>
          Go
        </button>
      </div>

      <div style={{ marginTop: 16, padding: 12, border: '1px solid #ddd', borderRadius: 12 }}>
        {active === 'profile' ? <p>Profile panel</p> : null}
        {active === 'security' ? <p>Security panel</p> : null}
        {active === 'settings' ? <p>Settings panel</p> : null}
        {active === 'home' ? <p>Home panel (no matching hash)</p> : null}
      </div>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useHash`

**Signature:** `useHash(): [string, (newHash: string) => void]`

#### Parameters

None.

#### Returns

Tuple:

1. `hash` - Current `window.location.hash` value. (`string`)
2. `setHash` - Sets `window.location.hash` when it differs from the current location. (`(newHash: string) => void`)

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useState } from 'react'

/**
 * Reads and writes `window.location.hash`, keeping React state in sync via the `hashchange` event.
 */
export default function useHash(): [string, (newHash: string) => void] {
  const [hash, setLocalHash] = useState<string>(() => (typeof window === 'undefined' ? '' : window.location.hash))

  const onHashChange = useCallback(() => {
    setLocalHash(window.location.hash)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [onHashChange])

  const setHash = useCallback((newHash: string) => {
    if (typeof window === 'undefined') return
    if (newHash !== window.location.hash) {
      window.location.hash = newHash
    }
  }, [])

  return [hash, setHash]
}
```

### JavaScript

```js
import { useCallback, useEffect, useState } from 'react'

export default function useHash() {
  const [hash, setLocalHash] = useState(() => (typeof window === 'undefined' ? '' : window.location.hash))

  const onHashChange = useCallback(() => {
    setLocalHash(window.location.hash)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [onHashChange])

  const setHash = useCallback((newHash) => {
    if (typeof window === 'undefined') return
    if (newHash !== window.location.hash) {
      window.location.hash = newHash
    }
  }, [])

  return [hash, setHash]
}
```
