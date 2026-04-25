---
title: Track network connection metadata
sidebar_label: useNetwork
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useNetwork.tsx'
description: >-
  useNetwork from @dedalik/use-react: online status and connection metadata when available.
---

# useNetwork()

<PackageData fn="useNetwork" />

Last updated: 24/04/2026

## Overview

`useNetwork` merges **online/offline** with the non-standard **Network Information API** when present: it mirrors **`navigator.onLine`** and, if **`navigator.connection`** exists, exposes **`effectiveType`**, **`downlink`**, **`rtt`**, and **`saveData`** for adaptive media or deferring big downloads. **`online`/`offline`** and the connection object’s **`change`** event both trigger updates; on browsers without `connection` only **`online`** is reliable, other fields stay **`undefined`**. SSR returns **`{ online: true }`** with no connection metadata.

### What it accepts

- None.

### What it returns

- **`UseNetworkState`** - **`online`** plus optional **`effectiveType`**, **`downlink`**, **`rtt`**, **`saveData`**.

## Usage

List all fields when the browser exposes them (no `JSON.stringify`).

```tsx
import useNetwork from '@dedalik/use-react/useNetwork'

function Example() {
  const { online, effectiveType, downlink, rtt, saveData } = useNetwork()

  return (
    <div>
      <h3>Network</h3>
      <ul>
        <li>
          online: <strong>{online ? 'yes' : 'no'}</strong>
        </li>
        <li>
          effectiveType: <strong>{effectiveType ?? '-'}</strong>
        </li>
        <li>
          downlink (Mb/s): <strong>{downlink != null ? downlink : '-'}</strong>
        </li>
        <li>
          rtt (ms): <strong>{rtt != null ? rtt : '-'}</strong>
        </li>
        <li>
          saveData: <strong>{saveData != null ? (saveData ? 'on' : 'off') : '-'}</strong>
        </li>
      </ul>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useNetwork`

**Signature:** `useNetwork(): UseNetworkState`

#### Parameters

None.

#### Returns

**`UseNetworkState`**.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

interface NetworkInformationLike extends EventTarget {
  effectiveType?: string
  downlink?: number
  rtt?: number
  saveData?: boolean
  addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void
  removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void
}

export interface UseNetworkState {
  online: boolean
  effectiveType?: string
  downlink?: number
  rtt?: number
  saveData?: boolean
}

function readNetworkState(): UseNetworkState {
  if (typeof navigator === 'undefined') return { online: true }

  const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection
  return {
    online: navigator.onLine,
    effectiveType: connection?.effectiveType,
    downlink: connection?.downlink,
    rtt: connection?.rtt,
    saveData: connection?.saveData,
  }
}

/**
 * Tracks connection data and online status.
 */
export default function useNetwork(): UseNetworkState {
  const [state, setState] = useState<UseNetworkState>(() => readNetworkState())

  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return

    const update = () => setState(readNetworkState())
    const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection

    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    connection?.addEventListener('change', update)

    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
      connection?.removeEventListener('change', update)
    }
  }, [])

  return state
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

function readNetworkState() {
  if (typeof navigator === 'undefined') return { online: true }

  const connection = navigator.connection
  return {
    online: navigator.onLine,
    effectiveType: connection?.effectiveType,
    downlink: connection?.downlink,
    rtt: connection?.rtt,
    saveData: connection?.saveData,
  }
}

export default function useNetwork() {
  const [state, setState] = useState(() => readNetworkState())

  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return

    const update = () => setState(readNetworkState())
    const connection = navigator.connection

    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    connection?.addEventListener('change', update)

    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
      connection?.removeEventListener('change', update)
    }
  }, [])

  return state
}
```
