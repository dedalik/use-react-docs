---
title: List media devices
sidebar_label: useDevicesList
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useDevicesList.tsx'
description: >-
  useDevicesList from @dedalik/use-react: enumerate and refresh available media devices.
---

# useDevicesList()

<PackageData fn="useDevicesList" />

Last updated: 24/04/2026

## Overview

`useDevicesList` calls **`navigator.mediaDevices.enumerateDevices()`** to list cameras, mics, and other media devices as **`MediaDeviceInfo`**. On mount it runs an initial **`refresh`**, and it subscribes to **`devicechange`** to reload when the user plugs hardware in or out. **`loading`** is true while a list fetch is in flight. **`isSupported`** is true when **`enumerateDevices`** exists. Labels may be empty until the user has granted device access in some browsers-calling **`getUserMedia`** once often unlocks human-readable **label** values on the next enumeration.

### What it accepts

- None.

### What it returns

- **`isSupported`**: `boolean`
- **`devices`**: `MediaDeviceInfo[]`
- **`loading`**: `boolean`
- **`refresh`**: `() => Promise<MediaDeviceInfo[]>`

## Usage

List devices and allow manual re-fetch. Use **`kind`**, **`label`**, and **`deviceId`** in a `<select>` or for passing into **`getUserMedia`**.

```tsx
import useDevicesList from '@dedalik/use-react/useDevicesList'

function Example() {
  const { isSupported, devices, loading, refresh } = useDevicesList()

  if (!isSupported) {
    return <p>mediaDevices.enumerateDevices is not available.</p>
  }

  return (
    <div>
      <p>
        <button type='button' onClick={() => void refresh()} disabled={loading}>
          {loading ? 'Loading…' : 'Refresh list'}
        </button>
      </p>
      <ul>
        {devices.map((d) => (
          <li key={d.deviceId || `${d.kind}-${d.label}`}>
            <strong>{d.kind}</strong>
            {d.label ? ` - ${d.label}` : ' (no label - grant permission to see names)'}
            {d.groupId && (
              <span>
                {' '}
                <small>group: {d.groupId.slice(0, 8)}…</small>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useDevicesList`

**Signature:** `useDevicesList(): UseDevicesListState`

#### Parameters

None.

#### Returns

Object with:

- `isSupported` - `enumerateDevices` exists.
- `devices` - Last enumerated list.
- `loading` - `true` during `refresh`.
- `refresh` - Awaits `enumerateDevices()` and updates `devices`.

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useState } from 'react'

export interface UseDevicesListState {
  isSupported: boolean
  devices: MediaDeviceInfo[]
  loading: boolean
  refresh: () => Promise<MediaDeviceInfo[]>
}

/**
 * Lists media input/output devices and watches for changes.
 */
export default function useDevicesList(): UseDevicesListState {
  const isSupported = typeof navigator !== 'undefined' && !!navigator.mediaDevices?.enumerateDevices
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [loading, setLoading] = useState(false)

  const refresh = useCallback(async () => {
    if (!isSupported) return []

    setLoading(true)
    try {
      const list = await navigator.mediaDevices.enumerateDevices()
      setDevices(list)
      return list
    } finally {
      setLoading(false)
    }
  }, [isSupported])

  useEffect(() => {
    if (!isSupported || typeof navigator === 'undefined') return

    const handleChange = () => {
      void refresh()
    }

    void refresh()
    navigator.mediaDevices.addEventListener('devicechange', handleChange)
    return () => navigator.mediaDevices.removeEventListener('devicechange', handleChange)
  }, [isSupported, refresh])

  return { isSupported, devices, loading, refresh }
}
```

### JavaScript

```js
import { useCallback, useEffect, useState } from 'react'

/**
 * Lists media input/output devices and watches for changes.
 */
export default function useDevicesList() {
  const isSupported = typeof navigator !== 'undefined' && !!navigator.mediaDevices?.enumerateDevices
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(false)

  const refresh = useCallback(async () => {
    if (!isSupported) return []

    setLoading(true)
    try {
      const list = await navigator.mediaDevices.enumerateDevices()
      setDevices(list)
      return list
    } finally {
      setLoading(false)
    }
  }, [isSupported])

  useEffect(() => {
    if (!isSupported || typeof navigator === 'undefined') return

    const handleChange = () => {
      void refresh()
    }

    void refresh()
    navigator.mediaDevices.addEventListener('devicechange', handleChange)
    return () => navigator.mediaDevices.removeEventListener('devicechange', handleChange)
  }, [isSupported, refresh])

  return { isSupported, devices, loading, refresh }
}
```
