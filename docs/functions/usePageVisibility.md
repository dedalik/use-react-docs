---
title: Track page visibility changes
sidebar_label: usePageVisibility
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/usePageVisibility.tsx'
description: >-
  usePageVisibility from @dedalik/use-react: Track page visibility changes.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# usePageVisibility()

<PackageData fn="usePageVisibility" />

<HookLiveDemo demo="usePageVisibility/basic" />

## Overview

`usePageVisibility` mirrors the Page Visibility API: it initializes from **`!document.hidden`** (treating SSR as **visible** / **`true`** so timers don’t assume a backgrounded tab), then listens for **`visibilitychange`** on **`document`** to flip a boolean whenever the user switches tabs, minimizes the window, or the mobile OS backgrounds your PWA. Use it to pause expensive animations, throttle analytics beacons, or defer network work while the document is not prerender-visible-without polling `document.visibilityState` yourself.

### What it accepts

- None.

### What it returns

- **`boolean`** - **`true`** when the page is visible (`!document.hidden`).

## Usage

Show a “live” badge and hint to pause work when the tab is hidden (no `JSON.stringify`).

```tsx
import usePageVisibility from '@dedalik/use-react/usePageVisibility'

function Example() {
  const isVisible = usePageVisibility()

  return (
    <div>
      <h3>Tab visibility</h3>
      <p>
        Page visible: <strong>{isVisible ? 'yes' : 'no'}</strong>
      </p>
      <p style={{ marginBottom: 0, opacity: 0.85 }}>
        {isVisible ? 'Safe to run timers / video.' : 'Consider pausing heavy work until the user returns.'}
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `usePageVisibility`

**Signature:** `usePageVisibility(): boolean`

#### Parameters

None.

#### Returns

**`boolean`** - Whether the document is currently visible.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

const getVisibility = (): boolean => {
  if (typeof document === 'undefined') return true
  return !document.hidden
}

export default function usePageVisibility(): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(() => getVisibility())

  useEffect(() => {
    if (typeof document === 'undefined') return

    const onVisibilityChange = () => {
      setIsVisible(getVisibility())
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  return isVisible
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

const getVisibility = () => {
  if (typeof document === 'undefined') return true
  return !document.hidden
}

export default function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(() => getVisibility())

  useEffect(() => {
    if (typeof document === 'undefined') return

    const onVisibilityChange = () => {
      setIsVisible(getVisibility())
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  return isVisible
}
```
