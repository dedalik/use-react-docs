---
title: Track device orientation
sidebar_label: useDeviceOrientation
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useDeviceOrientation.tsx'
description: >-
  useDeviceOrientation from @dedalik/use-react: reactive alpha/beta/gamma orientation values.
---

# useDeviceOrientation()

<PackageData fn="useDeviceOrientation" />

Last updated: 24/04/2026

## Overview

`useDeviceOrientation` listens to **`deviceorientation`** on **`window`** and stores **`alpha`** (compass heading–like rotation around Z), **`beta`** (front-back tilt), **`gamma`** (left-right tilt), and **`absolute`** (whether the angles are relative to the Earth’s frame, when the browser provides it). This is the same data used for “device tilt” and compass-style UIs. Support is indicated by **`isSupported`**; iOS and other browsers may require user gesture or permission before values become non-**`null`**. The hook updates on each orientation event, so the UI re-renders as the device moves.

### What it accepts

- None.

### What it returns

- **`isSupported`**: `boolean`
- **`alpha`**: `number | null`
- **`beta`**: `number | null`
- **`gamma`**: `number | null`
- **`absolute`**: `boolean | null`

## Usage

Display degrees when the platform delivers them (mobile Safari / Chrome may show `null` until permission is granted).

```tsx
import useDeviceOrientation from '@dedalik/use-react/useDeviceOrientation'

function deg(n: number | null) {
  if (n == null || Number.isNaN(n)) return '-'
  return `${n.toFixed(1)}°`
}

function Example() {
  const { isSupported, alpha, beta, gamma, absolute } = useDeviceOrientation()

  if (!isSupported) {
    return <p>Device orientation API is not available in this environment.</p>
  }

  return (
    <ul>
      <li>
        α (Z): <strong>{deg(alpha)}</strong>
      </li>
      <li>
        β (X): <strong>{deg(beta)}</strong>
      </li>
      <li>
        γ (Y): <strong>{deg(gamma)}</strong>
      </li>
      <li>
        Absolute: <strong>{absolute == null ? '-' : String(absolute)}</strong>
      </li>
    </ul>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useDeviceOrientation`

**Signature:** `useDeviceOrientation(): UseDeviceOrientationState`

#### Parameters

None.

#### Returns

Object with:

- `isSupported` - `'DeviceOrientationEvent' in window`.
- `alpha`, `beta`, `gamma` - from the event, or `null` until data exists.
- `absolute` - `event.absolute` or `null`.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export interface UseDeviceOrientationState {
  isSupported: boolean
  alpha: number | null
  beta: number | null
  gamma: number | null
  absolute: boolean | null
}

/**
 * Tracks values from the deviceorientation event.
 */
export default function useDeviceOrientation(): UseDeviceOrientationState {
  const isSupported = typeof window !== 'undefined' && 'DeviceOrientationEvent' in window
  const [state, setState] = useState<UseDeviceOrientationState>({
    isSupported,
    alpha: null,
    beta: null,
    gamma: null,
    absolute: null,
  })

  useEffect(() => {
    if (!isSupported || typeof window === 'undefined') return

    const onOrientation = (event: DeviceOrientationEvent) => {
      setState({
        isSupported: true,
        alpha: event.alpha ?? null,
        beta: event.beta ?? null,
        gamma: event.gamma ?? null,
        absolute: event.absolute ?? null,
      })
    }

    window.addEventListener('deviceorientation', onOrientation as EventListener)
    return () => window.removeEventListener('deviceorientation', onOrientation as EventListener)
  }, [isSupported])

  return state
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

/**
 * Tracks values from the deviceorientation event.
 */
export default function useDeviceOrientation() {
  const isSupported = typeof window !== 'undefined' && 'DeviceOrientationEvent' in window
  const [state, setState] = useState({
    isSupported,
    alpha: null,
    beta: null,
    gamma: null,
    absolute: null,
  })

  useEffect(() => {
    if (!isSupported || typeof window === 'undefined') return

    const onOrientation = (event) => {
      setState({
        isSupported: true,
        alpha: event.alpha ?? null,
        beta: event.beta ?? null,
        gamma: event.gamma ?? null,
        absolute: event.absolute ?? null,
      })
    }

    window.addEventListener('deviceorientation', onOrientation)
    return () => window.removeEventListener('deviceorientation', onOrientation)
  }, [isSupported])

  return state
}
```
