---
title: Track device motion
sidebar_label: useDeviceMotion
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useDeviceMotion.tsx'
description: >-
  useDeviceMotion from @dedalik/use-react: reactive acceleration and rotation values from devicemotion.
---

# useDeviceMotion()

<PackageData fn="useDeviceMotion" />

Last updated: 24/04/2026

## Overview

`useDeviceMotion` subscribes to the **`devicemotion`** event on **`window`** and copies **`acceleration`**, **`accelerationIncludingGravity`**, **`rotationRate`**, and **`interval`** into React state. These values are primarily relevant on phones and tablets; many desktop browsers will not fire meaningful motion, and some mobile browsers require a secure context or explicit user permission before motion data is available. **`isSupported`** reflects presence of the **`DeviceMotionEvent`** API, not a guarantee of live sensor data. Until the first event, motion fields are **`null`**.

### What it accepts

- None.

### What it returns

- **`isSupported`**: `boolean`
- **`acceleration`**: `DeviceMotionEventAcceleration | null`
- **`accelerationIncludingGravity`**: `DeviceMotionEventAcceleration | null`
- **`rotationRate`**: `DeviceMotionEventRotationRate | null`
- **`interval`**: `number | null`

## Usage

Show raw readings when the device reports them (values may stay `null` on unsupported clients).

```tsx
import useDeviceMotion from '@dedalik/use-react/useDeviceMotion'

function formatAccel(a: { x: number | null; y: number | null; z: number | null } | null) {
  if (!a) return '-'
  return [
    a.x != null ? a.x.toFixed(2) : '-',
    a.y != null ? a.y.toFixed(2) : '-',
    a.z != null ? a.z.toFixed(2) : '-',
  ].join(' / ')
}

function Example() {
  const { isSupported, acceleration, rotationRate, interval } = useDeviceMotion()

  if (!isSupported) {
    return <p>Device motion API is not available in this environment.</p>
  }

  return (
    <dl>
      <dt>Acceleration (no gravity)</dt>
      <dd>{formatAccel(acceleration)}</dd>
      <dt>Rotation rate (α/β/γ)</dt>
      <dd>
        {rotationRate
          ? [
              rotationRate.alpha != null ? rotationRate.alpha.toFixed(1) : '-',
              rotationRate.beta != null ? rotationRate.beta.toFixed(1) : '-',
              rotationRate.gamma != null ? rotationRate.gamma.toFixed(1) : '-',
            ].join(' / ')
          : '-'}
      </dd>
      <dt>Event interval (ms)</dt>
      <dd>{interval != null ? interval : '-'}</dd>
    </dl>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useDeviceMotion`

**Signature:** `useDeviceMotion(): UseDeviceMotionState`

#### Parameters

None.

#### Returns

Object with:

- `isSupported` - `'DeviceMotionEvent' in window`.
- `acceleration` - `event.acceleration`.
- `accelerationIncludingGravity` - `event.accelerationIncludingGravity`.
- `rotationRate` - `event.rotationRate`.
- `interval` - `event.interval` or `null`.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export interface UseDeviceMotionState {
  isSupported: boolean
  acceleration: DeviceMotionEventAcceleration | null
  accelerationIncludingGravity: DeviceMotionEventAcceleration | null
  rotationRate: DeviceMotionEventRotationRate | null
  interval: number | null
}

/**
 * Tracks values from the devicemotion event.
 */
export default function useDeviceMotion(): UseDeviceMotionState {
  const isSupported = typeof window !== 'undefined' && 'DeviceMotionEvent' in window
  const [state, setState] = useState<UseDeviceMotionState>({
    isSupported,
    acceleration: null,
    accelerationIncludingGravity: null,
    rotationRate: null,
    interval: null,
  })

  useEffect(() => {
    if (!isSupported || typeof window === 'undefined') return

    const onMotion = (event: DeviceMotionEvent) => {
      setState({
        isSupported: true,
        acceleration: event.acceleration,
        accelerationIncludingGravity: event.accelerationIncludingGravity,
        rotationRate: event.rotationRate,
        interval: event.interval ?? null,
      })
    }

    window.addEventListener('devicemotion', onMotion as EventListener)
    return () => window.removeEventListener('devicemotion', onMotion as EventListener)
  }, [isSupported])

  return state
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

/**
 * Tracks values from the devicemotion event.
 */
export default function useDeviceMotion() {
  const isSupported = typeof window !== 'undefined' && 'DeviceMotionEvent' in window
  const [state, setState] = useState({
    isSupported,
    acceleration: null,
    accelerationIncludingGravity: null,
    rotationRate: null,
    interval: null,
  })

  useEffect(() => {
    if (!isSupported || typeof window === 'undefined') return

    const onMotion = (event) => {
      setState({
        isSupported: true,
        acceleration: event.acceleration,
        accelerationIncludingGravity: event.accelerationIncludingGravity,
        rotationRate: event.rotationRate,
        interval: event.interval ?? null,
      })
    }

    window.addEventListener('devicemotion', onMotion)
    return () => window.removeEventListener('devicemotion', onMotion)
  }, [isSupported])

  return state
}
```
