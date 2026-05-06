---
title: Track document text direction
sidebar_label: useTextDirection
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useTextDirection.tsx'
description: >-
  useTextDirection from @dedalik/use-react: observes `dir` attribute changes and returns ltr/rtl.
---

# useTextDirection()

<PackageData fn="useTextDirection" />

<HookLiveDemo demo="useTextDirection/basic" title="useTextDirection interactive demo" />

## Overview

`useTextDirection` reads **`document.documentElement.getAttribute('dir')`**, normalizes anything other than **`rtl`** to **`ltr`**, and keeps a **`MutationObserver`** on `<html>` filtered to the **`dir`** attribute so React state updates when your app, a framework, or an i18n layer flips global direction for Arabic/Hebrew locales or accessibility testing. SSR returns **`ltr`** because `document` is absent; the observer is only installed in the browser, so there is no polling cost after the initial read.

### What it accepts

- None.

### What it returns

- **`TextDirection`** - `'ltr' | 'rtl'`.

## Usage

Show the live direction and buttons that set **`document.documentElement.dir`** (demo-only; in real apps i18n usually owns this).

```tsx
import useTextDirection from '@dedalik/use-react/useTextDirection'

function Example() {
  const direction = useTextDirection()

  return (
    <div dir={direction} style={{ maxWidth: 420 }}>
      <h3>Document direction</h3>
      <p>
        Observed <code>document.documentElement</code>: <strong>{direction}</strong>
      </p>
      <p style={{ textAlign: direction === 'rtl' ? 'end' : 'start' }}>
        Sample paragraph aligns to the logical start edge.
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button type='button' onClick={() => (document.documentElement.dir = 'ltr')}>
          Set LTR
        </button>
        <button type='button' onClick={() => (document.documentElement.dir = 'rtl')}>
          Set RTL
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

### `useTextDirection`

**Signature:** `useTextDirection(): TextDirection`

#### Parameters

None.

#### Returns

**`TextDirection`** - `'ltr' | 'rtl'` derived from the root `dir` attribute.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export type TextDirection = 'ltr' | 'rtl'

function readDirection(): TextDirection {
  if (typeof document === 'undefined') return 'ltr'
  const dir = (document.documentElement.getAttribute('dir') || 'ltr').toLowerCase()
  return dir === 'rtl' ? 'rtl' : 'ltr'
}

/**
 * Tracks document text direction (`ltr` or `rtl`).
 */
export default function useTextDirection(): TextDirection {
  const [direction, setDirection] = useState<TextDirection>(() => readDirection())

  useEffect(() => {
    if (typeof document === 'undefined') return

    const observer = new MutationObserver(() => {
      setDirection(readDirection())
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir'],
    })

    return () => observer.disconnect()
  }, [])

  return direction
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

function readDirection() {
  if (typeof document === 'undefined') return 'ltr'
  const dir = (document.documentElement.getAttribute('dir') || 'ltr').toLowerCase()
  return dir === 'rtl' ? 'rtl' : 'ltr'
}

export default function useTextDirection() {
  const [direction, setDirection] = useState(() => readDirection())

  useEffect(() => {
    if (typeof document === 'undefined') return

    const observer = new MutationObserver(() => {
      setDirection(readDirection())
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir'],
    })

    return () => observer.disconnect()
  }, [])

  return direction
}
```
