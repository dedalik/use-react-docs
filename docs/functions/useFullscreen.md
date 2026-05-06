---
title: Fullscreen control hook
sidebar_label: useFullscreen
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useFullscreen.tsx'
description: >-
  useFullscreen from @dedalik/use-react: enter, exit, and toggle fullscreen mode.
---

# useFullscreen()

<PackageData fn="useFullscreen" />

<HookLiveDemo demo="useFullscreen/basic" title="useFullscreen interactive demo" />

## Overview

`useFullscreen` listens to the standard `fullscreenchange` event and compares `document.fullscreenElement` to either the DOM node behind an optional `target` ref or, if you omit the ref, the root `<html>` element, so `isFullscreen` stays in sync when the user hits Escape or the browser UI exits fullscreen. `enter` calls `requestFullscreen` on that node, `exit` delegates to `document.exitFullscreen`, and `toggle` picks the right path from the latest boolean state. `isSupported` guards environments without the unprefixed Fullscreen API (SSR, embedded webviews, or very old browsers).

### What it accepts

- Optional **`target`** - `RefObject<HTMLElement | null>`. When set, fullscreen is scoped to that element; otherwise the hook uses `document.documentElement`.

### What it returns

- **`isSupported`** - Whether `requestFullscreen` exists on the root element.
- **`isFullscreen`** - Whether the chosen node is currently the fullscreen element.
- **`enter`**, **`exit`**, **`toggle`** - Async helpers returning `true` on success and `false` if the API is missing or the browser rejects the transition.

## Usage

Fullscreen a specific card (pass a ref as `target`); fall back messaging when unsupported.

```tsx
import { useRef } from 'react'
import useFullscreen from '@dedalik/use-react/useFullscreen'

function Example() {
  const panelRef = useRef<HTMLDivElement>(null)
  const { isSupported, isFullscreen, enter, exit, toggle } = useFullscreen(panelRef)

  return (
    <div>
      <h3>Panel fullscreen</h3>

      {!isSupported ? (
        <p>Fullscreen API is not available here.</p>
      ) : (
        <>
          <div
            ref={panelRef}
            style={{
              padding: 16,
              border: '1px solid #ccc',
              borderRadius: 8,
              maxWidth: 420,
              background: isFullscreen ? '#111' : '#f7f7f7',
              color: isFullscreen ? '#fff' : '#111',
            }}
          >
            <p style={{ marginTop: 0 }}>This box is the fullscreen target.</p>
            <p style={{ marginBottom: 0 }}>Mode: {isFullscreen ? 'fullscreen' : 'inline'}</p>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
            <button type='button' onClick={() => enter()}>
              Enter
            </button>
            <button type='button' onClick={() => exit()}>
              Exit
            </button>
            <button type='button' onClick={() => toggle()}>
              Toggle
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

### `useFullscreen`

**Signature:** `useFullscreen(target?: RefObject<HTMLElement | null>): UseFullscreenReturn`

#### Parameters

- **`target`** (`RefObject<HTMLElement | null>`, optional) - Element to request fullscreen on. If omitted, the hook uses `document.documentElement`.

#### Returns

Object with:

- **`isSupported`** - Fullscreen API availability (`boolean`).
- **`isFullscreen`** - Whether the resolved target is fullscreen (`boolean`).
- **`enter`** - `requestFullscreen` on the target (`() => Promise<boolean>`).
- **`exit`** - `document.exitFullscreen` when something is fullscreen (`() => Promise<boolean>`).
- **`toggle`** - Enters or exits based on `isFullscreen` (`() => Promise<boolean>`).

## Copy-paste hook

### TypeScript

```tsx
import { RefObject, useCallback, useEffect, useState } from 'react'

export interface UseFullscreenReturn {
  isSupported: boolean
  isFullscreen: boolean
  enter: () => Promise<boolean>
  exit: () => Promise<boolean>
  toggle: () => Promise<boolean>
}

/**
 * Controls element fullscreen state via the Fullscreen API.
 */
export default function useFullscreen(target?: RefObject<HTMLElement | null>): UseFullscreenReturn {
  const isSupported =
    typeof document !== 'undefined' &&
    !!document.documentElement &&
    typeof document.documentElement.requestFullscreen === 'function'

  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (!isSupported) return

    const handleChange = () => {
      const node = target?.current ?? document.documentElement
      setIsFullscreen(document.fullscreenElement === node)
    }

    document.addEventListener('fullscreenchange', handleChange)
    handleChange()

    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [isSupported, target])

  const enter = useCallback(async () => {
    if (!isSupported) return false

    const node = target?.current ?? document.documentElement
    try {
      await node.requestFullscreen()
      return true
    } catch {
      return false
    }
  }, [isSupported, target])

  const exit = useCallback(async () => {
    if (!isSupported || !document.fullscreenElement) return false

    try {
      await document.exitFullscreen()
      return true
    } catch {
      return false
    }
  }, [isSupported])

  const toggle = useCallback(async () => {
    return isFullscreen ? exit() : enter()
  }, [enter, exit, isFullscreen])

  return { isSupported, isFullscreen, enter, exit, toggle }
}
```

### JavaScript

```js
import { useCallback, useEffect, useState } from 'react'

export default function useFullscreen(target) {
  const isSupported =
    typeof document !== 'undefined' &&
    !!document.documentElement &&
    typeof document.documentElement.requestFullscreen === 'function'

  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (!isSupported) return

    const handleChange = () => {
      const node = target?.current ?? document.documentElement
      setIsFullscreen(document.fullscreenElement === node)
    }

    document.addEventListener('fullscreenchange', handleChange)
    handleChange()

    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [isSupported, target])

  const enter = useCallback(async () => {
    if (!isSupported) return false

    const node = target?.current ?? document.documentElement
    try {
      await node.requestFullscreen()
      return true
    } catch {
      return false
    }
  }, [isSupported, target])

  const exit = useCallback(async () => {
    if (!isSupported || !document.fullscreenElement) return false

    try {
      await document.exitFullscreen()
      return true
    } catch {
      return false
    }
  }, [isSupported])

  const toggle = useCallback(async () => {
    return isFullscreen ? exit() : enter()
  }, [enter, exit, isFullscreen])

  return { isSupported, isFullscreen, enter, exit, toggle }
}
```
