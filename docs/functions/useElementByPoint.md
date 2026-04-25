---
title: Resolve element by viewport point
sidebar_label: useElementByPoint
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useElementByPoint.tsx'
description: >-
  useElementByPoint from @dedalik/use-react: helper for document.elementFromPoint.
---

# useElementByPoint()

<PackageData fn="useElementByPoint" />

Last updated: 24/04/2026

## Overview

`useElementByPoint` returns a **stable** callback that calls **`document.elementFromPoint(x, y)`** in viewport CSS pixels, or **`null`** when **`document`** is missing. Topmost hit testing respects stacking context and `pointer-events`; for coordinates outside the viewport the engine may return **`null`**. Pair with **`useMouse`** or click handlers to inspect what lies under the cursor for debugging or custom pickers.

### What it accepts

- None.

### What it returns

- **`(x, y) => Element | null`**.

## Usage

Combine with **`useMouse`**: show the top element’s tag at the pointer (no `JSON.stringify`).

```tsx
import useElementByPoint from '@dedalik/use-react/useElementByPoint'
import useMouse from '@dedalik/use-react/useMouse'

function Example() {
  const { x, y } = useMouse()
  const elementFromPoint = useElementByPoint()
  const el = elementFromPoint(x, y)

  return (
    <div>
      <h3>Hit test</h3>
      <p>
        At ({x}, {y}): <strong>{el ? el.tagName.toLowerCase() : '-'}</strong>
        {el?.id ? (
          <>
            {' '}
            <code>#{el.id}</code>
          </>
        ) : null}
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useElementByPoint`

**Signature:** `useElementByPoint(): (x: number, y: number) => Element | null`

#### Parameters

None.

#### Returns

**Function** - `elementFromPoint` wrapper.

## Copy-paste hook

### TypeScript

```tsx
import { useCallback } from 'react'

/**
 * Returns helper to resolve element at viewport coordinates.
 */
export default function useElementByPoint(): (x: number, y: number) => Element | null {
  return useCallback((x: number, y: number) => {
    if (typeof document === 'undefined') return null
    return document.elementFromPoint(x, y)
  }, [])
}
```

### JavaScript

```js
import { useCallback } from 'react'

export default function useElementByPoint() {
  return useCallback((x, y) => {
    if (typeof document === 'undefined') return null
    return document.elementFromPoint(x, y)
  }, [])
}
```
