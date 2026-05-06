---
title: Track window width and height
sidebar_label: useWindowSize
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWindowSize.tsx'
description: >-
  useWindowSize from @dedalik/use-react: Track window width and height.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useWindowSize()

<PackageData fn="useWindowSize" />

<HookLiveDemo demo="useWindowSize/basic" />

## Overview

`useWindowSize` seeds **`width`** and **`height`** from **`window.innerWidth` / `innerHeight`** on the client (and **`0` / `0`** during SSR), then attaches a **`resize`** listener that copies fresh dimensions into React state on every viewport change-unlike **`useSSRWidth`**, this value stays live for responsive layouts, canvas sizing, or breakpoint-free “fluid” UI. The listener is removed on unmount; there is no debounce, so very chatty resize handlers elsewhere should not duplicate heavy work inside render-derive memoized layout flags instead.

### What it accepts

- None.

### What it returns

- **`width`**, **`height`** - Current inner viewport size in CSS pixels (`number`).

## Usage

Show dimensions and a simple orientation hint (no `JSON.stringify`).

```tsx
import useWindowSize from '@dedalik/use-react/useWindowSize'

function Example() {
  const { width, height } = useWindowSize()
  const orientation = width >= height ? 'landscape-ish' : 'portrait-ish'

  return (
    <div>
      <h3>Viewport</h3>
      <p>
        <strong>{width}</strong> × <strong>{height}</strong> px
      </p>
      <p>
        Aspect hint: <strong>{orientation}</strong>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useWindowSize`

**Signature:** `useWindowSize(): WindowSize`

#### Parameters

None.

#### Returns

Object **`WindowSize`**:

- **`width`** (`number`) - `window.innerWidth` (0 on server).
- **`height`** (`number`) - `window.innerHeight` (0 on server).

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export interface WindowSize {
  width: number
  height: number
}

const isBrowser = typeof window !== 'undefined'

export default function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>(() => ({
    width: isBrowser ? window.innerWidth : 0,
    height: isBrowser ? window.innerHeight : 0,
  }))

  useEffect(() => {
    if (!isBrowser) return

    const onResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return size
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

const isBrowser = typeof window !== 'undefined'

export default function useWindowSize() {
  const [size, setSize] = useState(() => ({
    width: isBrowser ? window.innerWidth : 0,
    height: isBrowser ? window.innerHeight : 0,
  }))

  useEffect(() => {
    if (!isBrowser) return

    const onResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return size
}
```
