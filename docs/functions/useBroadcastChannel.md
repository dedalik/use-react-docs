---
title: BroadcastChannel wrapper hook
sidebar_label: useBroadcastChannel
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useBroadcastChannel.tsx'
description: >-
  useBroadcastChannel from @dedalik/use-react: cross-tab messaging with reactive last payload.
---

# useBroadcastChannel()

<PackageData fn="useBroadcastChannel" />
<HookLiveDemo demo="useBroadcastChannel/basic" title="Live demo: useBroadcastChannel" />

## Overview

`useBroadcastChannel` opens a `BroadcastChannel` for a given `name` and keeps the latest received payload in React state, updating whenever `onmessage` fires from any same-origin browsing context (tabs/windows/iframes) using the same channel name. It exposes `post` to broadcast structured-cloneable messages, `close` to shut down the channel, and `isSupported` so you can degrade gracefully when `BroadcastChannel` is unavailable (older browsers, some embedded webviews, or restricted environments).

### What it accepts

- `name: string`.

### What it returns

- `isSupported`: Whether `BroadcastChannel` exists in this runtime. Type `boolean`.
- `data`: Last message payload received from `onmessage` (or `null` before the first message). Type `T | null`.
- `post`: Sends a message to all other subscribers on the same channel name. Type `(value: T) => void`.
- `close`: Closes the underlying channel (also happens on unmount via the effect cleanup). Type `() => void`.

## Usage

Real-world example: a tiny “shared counter” across tabs using a typed payload and the channel `name`.

```tsx
import { useMemo, useState } from 'react'
import useBroadcastChannel from '@dedalik/use-react/useBroadcastChannel'

type CounterMessage = { type: 'set'; value: number }

function Example() {
  const { isSupported, data, post, close } = useBroadcastChannel<CounterMessage>('demo:counter')
  const [draft, setDraft] = useState(0)

  const last = useMemo(() => {
    if (!data) return '-'
    if (data.type === 'set') return String(data.value)
    return 'unknown message'
  }, [data])

  return (
    <div>
      <h3>Cross-tab counter</h3>

      {!isSupported ? (
        <p>BroadcastChannel is not supported in this environment.</p>
      ) : (
        <>
          <p>
            Last received value: <strong>{last}</strong>
          </p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <input type='number' value={draft} onChange={(event) => setDraft(Number(event.target.value))} />
            <button type='button' onClick={() => post({ type: 'set', value: draft })}>
              Broadcast value
            </button>
            <button type='button' onClick={close}>
              Close channel
            </button>
          </div>

          <p style={{ marginTop: 12, opacity: 0.75 }}>
            Open this page in another tab and broadcast a number - both tabs should update <code>data</code>.
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

### `useBroadcastChannel`

**Signature:** `useBroadcastChannel<T = unknown>(name: string): UseBroadcastChannelReturn<T>`

#### Parameters

1. **`name`** (`string`) - Channel name shared by all participating contexts (`new BroadcastChannel(name)`).

#### Returns

Object with:

- `isSupported` - Whether `BroadcastChannel` exists in this runtime. (`boolean`).
- `data` - Last message payload received from `onmessage` (or `null` before the first message). (`T | null`).
- `post` - Sends a message to all other subscribers on the same channel name. (`(value: T) => void`).
- `close` - Closes the underlying channel (also happens on unmount via the effect cleanup). (`() => void`).

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useMemo, useRef, useState } from 'react'

export interface UseBroadcastChannelReturn<T> {
  isSupported: boolean
  data: T | null
  post: (value: T) => void
  close: () => void
}

/**
 * Small BroadcastChannel wrapper with reactive last message.
 */
export default function useBroadcastChannel<T = unknown>(name: string): UseBroadcastChannelReturn<T> {
  const channelRef = useRef<BroadcastChannel | null>(null)
  const [data, setData] = useState<T | null>(null)

  const isSupported = typeof BroadcastChannel !== 'undefined'

  useEffect(() => {
    if (!isSupported) return

    const channel = new BroadcastChannel(name)
    channelRef.current = channel
    channel.onmessage = (event) => setData(event.data as T)

    return () => {
      channel.close()
      channelRef.current = null
    }
  }, [isSupported, name])

  const post = useMemo(() => (value: T) => channelRef.current?.postMessage(value), [])
  const close = useMemo(() => () => channelRef.current?.close(), [])

  return { isSupported, data, post, close }
}
```

### JavaScript

```js
import { useEffect, useMemo, useRef, useState } from 'react'

export default function useBroadcastChannel(name) {
  const channelRef = useRef(null)
  const [data, setData] = useState(null)

  const isSupported = typeof BroadcastChannel !== 'undefined'

  useEffect(() => {
    if (!isSupported) return

    const channel = new BroadcastChannel(name)
    channelRef.current = channel
    channel.onmessage = (event) => setData(event.data)

    return () => {
      channel.close()
      channelRef.current = null
    }
  }, [isSupported, name])

  const post = useMemo(() => (value) => channelRef.current?.postMessage(value), [])
  const close = useMemo(() => () => channelRef.current?.close(), [])

  return { isSupported, data, post, close }
}
```
