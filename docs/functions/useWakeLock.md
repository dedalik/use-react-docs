---
title: Manage screen wake lock state
sidebar_label: useWakeLock
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWakeLock.tsx'
description: >-
  useWakeLock from @dedalik/use-react: request and release screen wake locks safely.
---

# useWakeLock()

<PackageData fn="useWakeLock" />

<HookLiveDemo demo="useWakeLock/basic" />

## Overview

`useWakeLock` wraps the Screen Wake Lock API: **`request()`** calls **`navigator.wakeLock.request('screen')`**, stores the sentinel in a ref, and sets **`isActive`** when the OS grants a lock so the display stays on during video or kiosk-style tasks; **`release()`** awaits **`sentinel.release()`** and clears state. An effect cleanup runs **`release`** on unmount to avoid leaking locks across route changes. **`isSupported`** gates Chromium-style availability (often requires **secure context** and visible document); denied requests or invisible tabs resolve **`request()`** to **`false`** without throwing to the caller beyond the internal try/catch.

### What it accepts

- None.

### What it returns

- **`isSupported`**, **`isActive`**, **`request`**, **`release`** - See API Reference.

## Usage

Keep screen awake while reading: request on demand, release explicitly (no `JSON.stringify`).

```tsx
import useWakeLock from '@dedalik/use-react/useWakeLock'

function Example() {
  const { isSupported, isActive, request, release } = useWakeLock()

  return (
    <div>
      <h3>Wake lock</h3>

      {!isSupported ? (
        <p>Screen Wake Lock API is not available (try HTTPS + Chromium).</p>
      ) : (
        <>
          <p>
            Lock active: <strong>{isActive ? 'yes' : 'no'}</strong>
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button type='button' onClick={() => request()}>
              Request screen wake lock
            </button>
            <button type='button' onClick={() => void release()}>
              Release
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useWakeLock`

**Signature:** `useWakeLock(): UseWakeLockReturn`

#### Parameters

None.

#### Returns

Object with:

- **`isSupported`** - `'wakeLock'` on `navigator` (`boolean`).
- **`isActive`** - Whether a sentinel is held (`boolean`).
- **`request`** - Acquires `'screen'` wake lock (`() => Promise<boolean>`).
- **`release`** - Releases current sentinel (`() => Promise<void>`).

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useRef, useState } from 'react'

interface WakeLockSentinelLike {
  released: boolean
  release: () => Promise<void>
}

interface WakeLockLike {
  request: (type: 'screen') => Promise<WakeLockSentinelLike>
}

export interface UseWakeLockReturn {
  isSupported: boolean
  isActive: boolean
  request: () => Promise<boolean>
  release: () => Promise<void>
}

/**
 * Manages screen wake lock with request/release helpers.
 */
export default function useWakeLock(): UseWakeLockReturn {
  const sentinelRef = useRef<WakeLockSentinelLike | null>(null)
  const [isActive, setIsActive] = useState(false)

  const isSupported = typeof navigator !== 'undefined' && 'wakeLock' in navigator

  const release = useCallback(async () => {
    if (!sentinelRef.current) return
    await sentinelRef.current.release()
    sentinelRef.current = null
    setIsActive(false)
  }, [])

  const request = useCallback(async () => {
    if (!isSupported) return false

    try {
      const wakeLock = (navigator as Navigator & { wakeLock: WakeLockLike }).wakeLock
      sentinelRef.current = await wakeLock.request('screen')
      setIsActive(true)
      return true
    } catch {
      sentinelRef.current = null
      setIsActive(false)
      return false
    }
  }, [isSupported])

  useEffect(() => {
    return () => {
      void release()
    }
  }, [release])

  return { isSupported, isActive, request, release }
}
```

### JavaScript

```js
import { useCallback, useEffect, useRef, useState } from 'react'

export default function useWakeLock() {
  const sentinelRef = useRef(null)
  const [isActive, setIsActive] = useState(false)

  const isSupported = typeof navigator !== 'undefined' && 'wakeLock' in navigator

  const release = useCallback(async () => {
    if (!sentinelRef.current) return
    await sentinelRef.current.release()
    sentinelRef.current = null
    setIsActive(false)
  }, [])

  const request = useCallback(async () => {
    if (!isSupported) return false

    try {
      sentinelRef.current = await navigator.wakeLock.request('screen')
      setIsActive(true)
      return true
    } catch {
      sentinelRef.current = null
      setIsActive(false)
      return false
    }
  }, [isSupported])

  useEffect(() => {
    return () => {
      void release()
    }
  }, [release])

  return { isSupported, isActive, request, release }
}
```
