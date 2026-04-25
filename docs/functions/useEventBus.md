---
title: Lightweight in-memory event bus
sidebar_label: useEventBus
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useEventBus.tsx'
description: >-
  useEventBus from @dedalik/use-react: module-level channels by name, on/off/emit/reset.
---

# useEventBus()

<PackageData fn="useEventBus" />

Last updated: 24/04/2026

## Overview

`useEventBus` returns a small **API** for a **named channel** (`name: string`): handlers register with **`on`**, return an **unsubscribe** function, or remove with **`off`**; **`emit(payload)`** invokes **all** current handlers **synchronously** in the **Set** iteration order. Channels live in a **module-level** `Map`, so all components using the **same** `name` share **one** bus-handy for **decoupling** list panels and **detail** views, or **wizard** step broadcasts **without** prop drilling. **`reset()`** **deletes** the **channel** and drops all **handlers** (subsequent **`emit`** is a no-op until **`on`** runs again and **re-creates** the set via **`getChannel`**). The hook **memoizes** the `{ on, off, emit, reset }` object per `name`. It is **not** tied to the React **tree** lifecycle: listeners **must** be removed or **`reset`** when appropriate to avoid **leaks**.

### What it accepts

1. **`name`**: `string` - channel id

### What it returns

- **`EventBus<T>`**: `{ on, off, emit, reset }`

## Usage

**Toaster** and **broadcaster** share the channel **`'demo:toast'`**; **emit** a **string** **payload**.

```tsx
import { useEffect, useState } from 'react'
import useEventBus from '@dedalik/use-react/useEventBus'

const CHANNEL = 'demo:toast'

function Listener() {
  const bus = useEventBus<string>(CHANNEL)
  const [msg, setMsg] = useState('(no message yet)')

  useEffect(() => {
    return bus.on((text) => setMsg(text))
  }, [bus])

  return <p>Last event: {msg}</p>
}

function Sender() {
  const bus = useEventBus<string>(CHANNEL)
  return (
    <button type='button' onClick={() => bus.emit(`Hello at ${new Date().toLocaleTimeString()}`)}>
      Broadcast
    </button>
  )
}

function Example() {
  return (
    <div>
      <Sender />
      <Listener />
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useEventBus`

**Signature:** `useEventBus<T = unknown>(name: string): EventBus<T>`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

export interface EventBus<T = unknown> {
  on: (handler: (payload: T) => void) => () => void
  off: (handler: (payload: T) => void) => void
  emit: (payload: T) => void
  reset: () => void
}

const channels = new Map<string, Set<(payload: unknown) => void>>()

function getChannel(name: string): Set<(payload: unknown) => void> {
  const existing = channels.get(name)
  if (existing) return existing
  const next = new Set<(payload: unknown) => void>()
  channels.set(name, next)
  return next
}

/**
 * Simple in-memory event bus scoped by channel name.
 */
export default function useEventBus<T = unknown>(name: string): EventBus<T> {
  return useMemo(() => {
    const on = (handler: (payload: T) => void) => {
      const channel = getChannel(name)
      channel.add(handler as unknown as (payload: unknown) => void)
      return () => {
        channel.delete(handler as unknown as (payload: unknown) => void)
      }
    }

    const off = (handler: (payload: T) => void) => {
      const channel = channels.get(name)
      if (!channel) return
      channel.delete(handler as unknown as (payload: unknown) => void)
    }

    const emit = (payload: T) => {
      const channel = channels.get(name)
      if (!channel) return
      channel.forEach((handler) => {
        const typedHandler = handler as (value: T) => void
        typedHandler(payload)
      })
    }

    const reset = () => {
      channels.delete(name)
    }

    return { on, off, emit, reset }
  }, [name])
}
```

### JavaScript

```js
import { useMemo } from 'react'

const channels = new Map()

function getChannel(name) {
  const existing = channels.get(name)
  if (existing) return existing
  const next = new Set()
  channels.set(name, next)
  return next
}

/**
 * Simple in-memory event bus scoped by channel name.
 */
export default function useEventBus(name) {
  return useMemo(() => {
    const on = (handler) => {
      const channel = getChannel(name)
      channel.add(handler)
      return () => {
        channel.delete(handler)
      }
    }

    const off = (handler) => {
      const channel = channels.get(name)
      if (!channel) return
      channel.delete(handler)
    }

    const emit = (payload) => {
      const channel = channels.get(name)
      if (!channel) return
      channel.forEach((handler) => {
        handler(payload)
      })
    }

    const reset = () => {
      channels.delete(name)
    }

    return { on, off, emit, reset }
  }, [name])
}
```
