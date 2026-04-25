---
title: Track browser online status
sidebar_label: useOnline
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useOnline.tsx'
description: >-
  useOnline from @dedalik/use-react: reactive online/offline network status.
---

# useOnline()

<PackageData fn="useOnline" />

Last updated: 24/04/2026

## Overview

`useOnline` tracks **`navigator.onLine`** and subscribes to the window **`online`** and **`offline`** events so React updates when the laptop loses Wi‑Fi, the user enables airplane mode, or the browser fires spurious flips (always pair with request retries, not as a hard “server reachable” guarantee). Server-side rendering assumes **online** (`true`) when **`navigator`** is absent. Use **`useNetwork`** if you also need **Network Information API** quality signals.

### What it accepts

- None.

### What it returns

- **`boolean`** - `true` when the UA reports an online data path.

## Usage

Banner for offline / online (no `JSON.stringify`).

```tsx
import useOnline from '@dedalik/use-react/useOnline'

function Example() {
  const online = useOnline()

  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        background: online ? '#ecfdf5' : '#fef2f2',
        color: online ? '#065f46' : '#991b1b',
      }}
    >
      <h3 style={{ marginTop: 0 }}>Connectivity</h3>
      <p style={{ marginBottom: 0 }}>
        You appear <strong>{online ? 'online' : 'offline'}</strong> - toggle network in devtools to test.
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useOnline`

**Signature:** `useOnline(): boolean`

#### Parameters

None.

#### Returns

**`boolean`**.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

function getOnlineStatus(): boolean {
  if (typeof navigator === 'undefined') return true
  return navigator.onLine
}

/**
 * Tracks browser online/offline status.
 */
export default function useOnline(): boolean {
  const [online, setOnline] = useState(() => getOnlineStatus())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onOnline = () => setOnline(true)
    const onOffline = () => setOnline(false)

    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)

    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  return online
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

function getOnlineStatus() {
  if (typeof navigator === 'undefined') return true
  return navigator.onLine
}

export default function useOnline() {
  const [online, setOnline] = useState(() => getOnlineStatus())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onOnline = () => setOnline(true)
    const onOffline = () => setOnline(false)

    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)

    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  return online
}
```
