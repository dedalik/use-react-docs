---
title: Track device pixel ratio
sidebar_label: useDevicePixelRatio
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useDevicePixelRatio.tsx'
description: >-
  useDevicePixelRatio from @dedalik/use-react: reactive device pixel ratio value.
---

# useDevicePixelRatio()

<PackageData fn="useDevicePixelRatio" />

Last updated: 24/04/2026

## Overview

`useDevicePixelRatio` returns the current **`window.devicePixelRatio`** (how many physical pixels map to one CSS pixel). The hook mirrors that value in React state and re-reads it on **`window` `resize`**, which is the practical signal browsers fire when the ratio can change (for example, zoom, moving the window between displays, or in some environments, resolution changes). It does not listen to every possible DPR change on all platforms, but it matches the implementation in the library. On the server, the initial value is **1** until a client `resize` or hydration updates it.

### What it accepts

- None.

### What it returns

- A **`number`**: the device pixel ratio.

## Usage

Show the live ratio in the UI (useful for picking `@2x` assets or debugging layout).

```tsx
import useDevicePixelRatio from '@dedalik/use-react/useDevicePixelRatio'

function Example() {
  const dpr = useDevicePixelRatio()

  return (
    <p>
      Device pixel ratio: <strong>{dpr.toFixed(2)}</strong>
    </p>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useDevicePixelRatio`

**Signature:** `useDevicePixelRatio(): number`

#### Parameters

None.

#### Returns

A **`number`**: current `window.devicePixelRatio` (or **1** when `window` is undefined).

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

function readRatio(): number {
  if (typeof window === 'undefined') return 1
  return window.devicePixelRatio || 1
}

/**
 * Tracks device pixel ratio changes.
 */
export default function useDevicePixelRatio(): number {
  const [ratio, setRatio] = useState(() => readRatio())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const update = () => setRatio(readRatio())
    window.addEventListener('resize', update)

    return () => window.removeEventListener('resize', update)
  }, [])

  return ratio
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

function readRatio() {
  if (typeof window === 'undefined') return 1
  return window.devicePixelRatio || 1
}

/**
 * Tracks device pixel ratio changes.
 */
export default function useDevicePixelRatio() {
  const [ratio, setRatio] = useState(() => readRatio())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const update = () => setRatio(readRatio())
    window.addEventListener('resize', update)

    return () => window.removeEventListener('resize', update)
  }, [])

  return ratio
}
```
