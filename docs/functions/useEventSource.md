---
title: Subscribe to server-sent events
sidebar_label: useEventSource
category: Network
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useEventSource.tsx'
description: >-
  useEventSource from @dedalik/use-react: status and payload state for SSE streams.
---

# useEventSource()

<PackageData fn="useEventSource" />

Last updated: 24/04/2026

## Overview

`useEventSource` instantiates **`new EventSource(url)`** on **`[url]`** and mirrors **`onopen`**, default **`onmessage`**, and **`onerror`**. Status moves **`CONNECTING`** after construction, then **`OPEN`**; cleanup **closes** the source and sets **`CLOSED`**. The **`data`** field holds the **string** from the last **`message`** event; named events (`addEventListener('tick', ...)`) are **not** handled here-this helper only uses **`onmessage`**. **`onerror`** stores the event object for visibility; the browser will often **retry** the connection unless you call **`close`**. CORS, cookies, and HTTPS follow normal **`EventSource`** rules. If **`url`** is omitted or **`EventSource`** is missing, the hook is a no-op with initial **`CLOSED`**.

### What it accepts

- Optional **`url`**: `string` - **SSE** endpoint (same origin or CORS-enabled as required)

### What it returns

- **`status`**: `'CLOSED' | 'CONNECTING' | 'OPEN'`
- **`data`**: `string | null` - last **`message`** data
- **`error`**: `Event | null`

## Usage

Point **`url`** at a server you control (or a demo that emits `text/event-stream`), then show connection state and the latest chunk.

```tsx
import { useState } from 'react'
import useEventSource from '@dedalik/use-react/useEventSource'

// Replace with your own `text/event-stream` URL (many apps expose `/api/events` or similar).
const DEMO_STREAM = 'https://sse-cache.vercel.app/clock'

function Example() {
  const [enabled, setEnabled] = useState(true)
  const { status, data, error } = useEventSource(enabled ? DEMO_STREAM : undefined)

  return (
    <div>
      <p>
        <label>
          <input type='checkbox' checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
          Connect
        </label>
      </p>
      <p>Status: {status}</p>
      {error && <p>Last error event: {String(error.type)}</p>}
      <p>Last data: {data != null ? data : '-'}</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

> Use an operational SSE URL in your environment; the sample URL may be unavailable or rate-limited.

## API Reference

### `useEventSource`

**Signature:** `useEventSource(url?: string): UseEventSourceState`

#### Parameters

1. **`url`** (optional) - Drives (re)connection on change.

#### Returns

**`status`**, **`data`**, **`error`**

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useRef, useState } from 'react'

export interface UseEventSourceState {
  status: 'CLOSED' | 'CONNECTING' | 'OPEN'
  data: string | null
  error: Event | null
}

/**
 * EventSource helper tracking status and last payload.
 */
export default function useEventSource(url?: string): UseEventSourceState {
  const sourceRef = useRef<EventSource | null>(null)
  const [state, setState] = useState<UseEventSourceState>({ status: 'CLOSED', data: null, error: null })

  useEffect(() => {
    if (!url || typeof EventSource === 'undefined') return

    const source = new EventSource(url)
    sourceRef.current = source
    setState({ status: 'CONNECTING', data: null, error: null })

    source.onopen = () => setState((prev) => ({ ...prev, status: 'OPEN' }))
    source.onmessage = (event) => setState((prev) => ({ ...prev, data: event.data }))
    source.onerror = (event) => setState((prev) => ({ ...prev, error: event }))

    return () => {
      source.close()
      sourceRef.current = null
      setState((prev) => ({ ...prev, status: 'CLOSED' }))
    }
  }, [url])

  return state
}
```

### JavaScript

```js
import { useEffect, useRef, useState } from 'react'

/**
 * EventSource helper tracking status and last payload.
 */
export default function useEventSource(url) {
  const sourceRef = useRef(null)
  const [state, setState] = useState({ status: 'CLOSED', data: null, error: null })

  useEffect(() => {
    if (!url || typeof EventSource === 'undefined') return

    const source = new EventSource(url)
    sourceRef.current = source
    setState({ status: 'CONNECTING', data: null, error: null })

    source.onopen = () => setState((prev) => ({ ...prev, status: 'OPEN' }))
    source.onmessage = (event) => setState((prev) => ({ ...prev, data: event.data }))
    source.onerror = (event) => setState((prev) => ({ ...prev, error: event }))

    return () => {
      source.close()
      sourceRef.current = null
      setState((prev) => ({ ...prev, status: 'CLOSED' }))
    }
  }, [url])

  return state
}
```
