---
title: Factory for a tiny event bus
sidebar_label: createEventHook
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/createEventHook.tsx'
description: >-
  createEventHook from @dedalik/use-react: on/off/trigger/clear outside React, module-friendly.
---

# createEventHook()

<PackageData fn="createEventHook" />

Last updated: 24/04/2026

## Overview

`createEventHook` builds a **one-off** pub/sub object: **`on(handler)`** adds a listener to an internal **`Set`**, returns **`off`**, and **`off(handler)`** removes; **`trigger(value)`** iterates the **set** and calls every handler **synchronously**; **`clear()`** drops **all** listeners. The store lives **outside** the React **tree**-suitable for **module**-singleton **buses** or long-lived **cross-widget** **signals** without `context`. The generic **`T`** (default **`void`**) is the **payload** type. **No** `useState` is involved: React components that **subscribe** should store **results** in local state in **`on`**, and **re-render** on updates. This is **not** a **hook**; call **`createEventHook` once** (e.g. at module **scope**), not on every **render**, or you will create a **new** bus each time and lose **subscribers**.

### What it accepts

- No arguments, optional type parameter: **`createEventHook<Payload>()`**

### What it returns

- **`{ on, off, trigger, clear }`**

## Usage

A **module-level** bus carries **file names** after **save**; a panel **subscribes** in **`useEffect`**.

```tsx
import { useEffect, useState } from 'react'
import createEventHook from '@dedalik/use-react/createEventHook'

const fileSaved = createEventHook<string>()

function StatusBar() {
  const [last, setLast] = useState('(none)')

  useEffect(() => {
    return fileSaved.on((name) => setLast(name))
  }, [])

  return <p>Last saved: {last}</p>
}

function SaveButton() {
  return (
    <button
      type="button"
      onClick={() => {
        fileSaved.trigger('notes.md')
      }}
    >
      Save
    </button>
  )
}

function Example() {
  return (
    <div>
      <SaveButton />
      <StatusBar />
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `createEventHook`

**Signature:** `createEventHook<T = void>(): EventHook<T>`

## Copy-paste hook

### TypeScript

```ts
export type EventHookHandler<T> = (value: T) => void

export interface EventHook<T> {
  on: (handler: EventHookHandler<T>) => () => void
  off: (handler: EventHookHandler<T>) => void
  trigger: (value: T) => void
  clear: () => void
}

/**
 * Creates a tiny pub/sub event hook outside React lifecycle.
 */
export default function createEventHook<T = void>(): EventHook<T> {
  const handlers = new Set<EventHookHandler<T>>()

  const on = (handler: EventHookHandler<T>) => {
    handlers.add(handler)
    return () => off(handler)
  }

  const off = (handler: EventHookHandler<T>) => {
    handlers.delete(handler)
  }

  const trigger = (value: T) => {
    handlers.forEach((handler) => handler(value))
  }

  const clear = () => {
    handlers.clear()
  }

  return { on, off, trigger, clear }
}
```

### JavaScript

```js
/**
 * Creates a tiny pub/sub event hook outside React lifecycle.
 */
export default function createEventHook() {
  const handlers = new Set()

  const on = (handler) => {
    handlers.add(handler)
    return () => off(handler)
  }

  const off = (handler) => {
    handlers.delete(handler)
  }

  const trigger = (value) => {
    handlers.forEach((handler) => handler(value))
  }

  const clear = () => {
    handlers.clear()
  }

  return { on, off, trigger, clear }
}
```
