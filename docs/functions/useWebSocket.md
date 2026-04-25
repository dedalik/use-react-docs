---
title: WebSocket connection and message state
sidebar_label: useWebSocket
category: Network
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWebSocket.tsx'
description: >-
  useWebSocket from @dedalik/use-react: connection status, last message, and send helper.
---

# useWebSocket()

<PackageData fn="useWebSocket" />

Last updated: 24/04/2026

## Overview

`useWebSocket` opens a **`WebSocket(url)`** when **`url`** is defined and the **`WebSocket`** constructor exists, and tracks **`status`**: **`CONNECTING`** after construction, **`OPEN`**, or **`CLOSED`**. The hook stores only the **last** string payload from **`onmessage`** (coerced with **`String(data)`**). **`send(msg)`** returns **`false`** if the socket is not open; otherwise it sends a text frame. When **`url`** changes, the old socket is **closed** and a new one is created. The hook is minimal-no reconnection, queueing, or binary frames-suitable for demos and simple UIs. Omit **`url`** to leave the connection idle (**`CLOSED`**).

### What it accepts

- Optional **`url`**: `string` -**`wss://`** (or **`ws://`**) endpoint

### What it returns

- **`status`**: `'CLOSED' | 'CONNECTING' | 'OPEN'`
- **`lastMessage`**: `string | null`
- **`send`**: `(message: string) => boolean`
- **`close`**: `() => void`

## Usage

Connect to a public echo service (or your own **`wss://`**), show status, send a ping, and read the last message.

```tsx
import { useState } from 'react'
import useWebSocket from '@dedalik/use-react/useWebSocket'

const ECHO_URL = 'wss://echo.websocket.events/'

function Example() {
  const { status, lastMessage, send, close } = useWebSocket(ECHO_URL)
  const [out, setOut] = useState('hello')

  return (
    <div>
      <p>
        Status: <strong>{status}</strong>
      </p>
      <p>
        <input value={out} onChange={(e) => setOut(e.target.value)} size={32} />
        <button
          type='button'
          onClick={() => {
            const ok = send(out)
            if (!ok) {
              // closed or not ready
            }
          }}
        >
          Send
        </button>{' '}
        <button type='button' onClick={close}>
          Close
        </button>
      </p>
      <p>Last message: {lastMessage != null ? lastMessage : '-'}</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useWebSocket`

**Signature:** `useWebSocket(url?: string): UseWebSocketState`

#### Parameters

1. **`url`** (optional) - Drives connect/disconnect when it changes.

#### Returns

**`status`**, **`lastMessage`**, **`send`**, **`close`**

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseWebSocketState {
  status: 'CLOSED' | 'CONNECTING' | 'OPEN'
  lastMessage: string | null
  send: (message: string) => boolean
  close: () => void
}

/**
 * WebSocket lifecycle helper with last message tracking.
 */
export default function useWebSocket(url?: string): UseWebSocketState {
  const socketRef = useRef<WebSocket | null>(null)
  const [status, setStatus] = useState<'CLOSED' | 'CONNECTING' | 'OPEN'>('CLOSED')
  const [lastMessage, setLastMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!url || typeof WebSocket === 'undefined') return

    const ws = new WebSocket(url)
    socketRef.current = ws
    setStatus('CONNECTING')

    ws.onopen = () => setStatus('OPEN')
    ws.onclose = () => setStatus('CLOSED')
    ws.onmessage = (event) => setLastMessage(String(event.data))

    return () => {
      ws.close()
      socketRef.current = null
      setStatus('CLOSED')
    }
  }, [url])

  const send = useCallback((message: string) => {
    const ws = socketRef.current
    if (!ws || ws.readyState !== WebSocket.OPEN) return false
    ws.send(message)
    return true
  }, [])

  const close = useCallback(() => {
    socketRef.current?.close()
    setStatus('CLOSED')
  }, [])

  return { status, lastMessage, send, close }
}
```

### JavaScript

```js
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * WebSocket lifecycle helper with last message tracking.
 */
export default function useWebSocket(url) {
  const socketRef = useRef(null)
  const [status, setStatus] = useState('CLOSED')
  const [lastMessage, setLastMessage] = useState(null)

  useEffect(() => {
    if (!url || typeof WebSocket === 'undefined') return

    const ws = new WebSocket(url)
    socketRef.current = ws
    setStatus('CONNECTING')

    ws.onopen = () => setStatus('OPEN')
    ws.onclose = () => setStatus('CLOSED')
    ws.onmessage = (event) => setLastMessage(String(event.data))

    return () => {
      ws.close()
      socketRef.current = null
      setStatus('CLOSED')
    }
  }, [url])

  const send = useCallback((message) => {
    const ws = socketRef.current
    if (!ws || ws.readyState !== WebSocket.OPEN) return false
    ws.send(message)
    return true
  }, [])

  const close = useCallback(() => {
    socketRef.current?.close()
    setStatus('CLOSED')
  }, [])

  return { status, lastMessage, send, close }
}
```
