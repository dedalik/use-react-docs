---
title: Request Bluetooth devices
sidebar_label: useBluetooth
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useBluetooth.tsx'
description: >-
  useBluetooth from @dedalik/use-react: request and track selected Bluetooth device.
---

# useBluetooth()

<PackageData fn="useBluetooth" />

Last updated: 24/04/2026

## Overview

`useBluetooth` wraps `navigator.bluetooth.requestDevice` in React state: **`requestDevice(options)`** opens the browser’s chooser with the same shape as the Web Bluetooth options object (`acceptAllDevices`, `filters`, `optionalServices`), resolves to a lightweight device handle (the hook only keeps **`deviceName`** from `device.name`), and clears **`error`** on success. User cancellation or unsupported environments surface as **`error`** strings and `null` results; **`isSupported`** is `false` when `requestDevice` is missing so you can hide the button or show install instructions. The hook does not maintain a GATT connection-it only captures the outcome of the permissioned picker step.

### What it accepts

- None.

### What it returns

- **`isSupported`** - Web Bluetooth picker available (`boolean`).
- **`deviceName`** - Last chosen device `name`, if any (`string | null`).
- **`error`** - Last failure message, or `null` (`string | null`).
- **`requestDevice`** - Calls `navigator.bluetooth.requestDevice` with optional **`options`** (`(options?) => Promise<BluetoothDeviceLike | null>`).

## Usage

Pick a device with **filters** and **optionalServices** (requires a secure context and Chromium); fallback when unsupported.

```tsx
import useBluetooth from '@dedalik/use-react/useBluetooth'

function Example() {
  const { isSupported, deviceName, error, requestDevice } = useBluetooth()

  return (
    <div>
      <h3>Bluetooth</h3>

      {!isSupported ? (
        <p>Web Bluetooth is not available in this browser or context (HTTPS required).</p>
      ) : (
        <>
          {error ? (
            <p role='alert' style={{ color: 'crimson' }}>
              {error}
            </p>
          ) : null}

          <button
            type='button'
            onClick={() =>
              requestDevice({
                acceptAllDevices: false,
                filters: [{ namePrefix: 'My' }],
                optionalServices: ['battery_service'],
              })
            }
          >
            Choose device…
          </button>

          <p>
            Selected: <strong>{deviceName ?? '-'}</strong>
          </p>
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

### `useBluetooth`

**Signature:** `useBluetooth(): UseBluetoothReturn`

#### Parameters

None.

#### Returns

Object with:

- **`isSupported`** - `navigator.bluetooth.requestDevice` exists (`boolean`).
- **`deviceName`** - `device.name` from the last successful request (`string | null`).
- **`error`** - Message from failures or user abort (`string | null`).
- **`requestDevice`** - Optional **`RequestDeviceOptionsLike`**: `acceptAllDevices`, `filters`, `optionalServices`. Default in implementation is `{ acceptAllDevices: true }` when you call `requestDevice()` with no args.

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useState } from 'react'

interface BluetoothDeviceLike {
  name?: string
}

interface RequestDeviceOptionsLike {
  acceptAllDevices?: boolean
  filters?: Array<Record<string, unknown>>
  optionalServices?: string[]
}

export interface UseBluetoothReturn {
  isSupported: boolean
  deviceName: string | null
  error: string | null
  requestDevice: (options?: RequestDeviceOptionsLike) => Promise<BluetoothDeviceLike | null>
}

/**
 * Requests a Bluetooth device and stores the last selected name.
 */
export default function useBluetooth(): UseBluetoothReturn {
  const [deviceName, setDeviceName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const bluetoothNavigator =
    typeof navigator !== 'undefined'
      ? (navigator as Navigator & {
          bluetooth?: { requestDevice: (options: RequestDeviceOptionsLike) => Promise<BluetoothDeviceLike> }
        })
      : undefined
  const isSupported = !!bluetoothNavigator?.bluetooth?.requestDevice

  const requestDevice = useCallback(
    async (options: RequestDeviceOptionsLike = { acceptAllDevices: true }) => {
      if (!isSupported) return null

      try {
        const device = await bluetoothNavigator?.bluetooth?.requestDevice(options)
        if (!device) return null
        setDeviceName(device.name ?? null)
        setError(null)
        return device
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Bluetooth request failed'
        setError(message)
        return null
      }
    },
    [bluetoothNavigator, isSupported],
  )

  return { isSupported, deviceName, error, requestDevice }
}
```

### JavaScript

```js
import { useCallback, useState } from 'react'

export default function useBluetooth() {
  const [deviceName, setDeviceName] = useState(null)
  const [error, setError] = useState(null)

  const bluetoothNavigator = typeof navigator !== 'undefined' ? navigator : undefined
  const isSupported = !!bluetoothNavigator?.bluetooth?.requestDevice

  const requestDevice = useCallback(
    async (options = { acceptAllDevices: true }) => {
      if (!isSupported) return null

      try {
        const device = await bluetoothNavigator.bluetooth.requestDevice(options)
        if (!device) return null
        setDeviceName(device.name ?? null)
        setError(null)
        return device
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Bluetooth request failed'
        setError(message)
        return null
      }
    },
    [bluetoothNavigator, isSupported],
  )

  return { isSupported, deviceName, error, requestDevice }
}
```
