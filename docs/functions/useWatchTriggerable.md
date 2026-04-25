---
title: Watcher with manual trigger
sidebar_label: useWatchTriggerable
category: Watch
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWatchTriggerable.tsx'
description: >-
  useWatchTriggerable from @dedalik/use-react: re-run watch side effects on demand.
---

# useWatchTriggerable()

<PackageData fn="useWatchTriggerable" />

Last updated: 24/04/2026

## Overview

`useWatchTriggerable` calls **`callback(next, previous)`** whenever **`value`**, **`deps`**, or a **manual** tick from **`trigger()`** changes. **`trigger(valueOverride?)`** can force the next run to use a **synthetic** value; **`previous`** is still the last _committed_ prior result from the watch’s own bookkeeping. The effect clears **`valueOverride`** after a run, so a normal **`value`** update on the next render still flows through. This is a thin combination of a watch + "run again" counter-use for **"sync now"** buttons that should reuse the same side-effect body.

### What it accepts

1. **`value`**: `T`
2. **`callback`**: `(value: T, previous: T | undefined) => void`
3. Optional **`deps`**: `DependencyList`

### What it returns

- **`trigger`**: `(valueOverride?: T) => void`

## Usage

A slug string plus a **"Re-run"** button that calls **`trigger()`** to re-apply the same "saved" effect without changing **`slug`**.

```tsx
import { useState } from 'react'
import useWatchTriggerable from '@dedalik/use-react/useWatchTriggerable'

function Example() {
  const [slug, setSlug] = useState('page-a')
  const [events, setEvents] = useState<string[]>([])

  const { trigger } = useWatchTriggerable(slug, (s) => {
    setEvents((e) => [...e.slice(-4), `load ${s} @ ${new Date().toLocaleTimeString()}`])
  })

  return (
    <div>
      <p>slug: {slug}</p>
      <p>
        <button type='button' onClick={() => setSlug((s) => (s === 'page-a' ? 'page-b' : 'page-a'))}>
          Toggle slug
        </button>{' '}
        <button type='button' onClick={() => trigger()}>
          Trigger again (no slug change)
        </button>
      </p>
      <ol>
        {events.map((ev, i) => (
          <li key={i}>{ev}</li>
        ))}
      </ol>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useWatchTriggerable`

**Signature:** `useWatchTriggerable<T>(value: T, callback: (value: T, previous: T | undefined) => void, deps?: DependencyList): WatchTriggerableControls<T>`

#### Parameters

1. **`value`**
2. **`callback`**
3. **`deps`**

#### Returns

**`{ trigger }`**

## Copy-paste hook

### TypeScript

```tsx
import { DependencyList, useCallback, useEffect, useRef, useState } from 'react'

export interface WatchTriggerableControls<T> {
  trigger: (valueOverride?: T) => void
}

/**
 * Watcher that also supports manual triggering.
 */
export default function useWatchTriggerable<T>(
  value: T,
  callback: (value: T, previous: T | undefined) => void,
  deps: DependencyList = [],
): WatchTriggerableControls<T> {
  const previousRef = useRef<T | undefined>(undefined)
  const [manualTick, setManualTick] = useState(0)
  const manualValueRef = useRef<T | undefined>(undefined)

  const trigger = useCallback((valueOverride?: T) => {
    manualValueRef.current = valueOverride
    setManualTick((v) => v + 1)
  }, [])

  useEffect(() => {
    const next = manualValueRef.current === undefined ? value : manualValueRef.current
    callback(next, previousRef.current)
    previousRef.current = next
    manualValueRef.current = undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, manualTick, ...deps])

  return { trigger }
}
```

### JavaScript

```js
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Watcher that also supports manual triggering.
 */
export default function useWatchTriggerable(value, callback, deps = []) {
  const previousRef = useRef(undefined)
  const [manualTick, setManualTick] = useState(0)
  const manualValueRef = useRef(undefined)

  const trigger = useCallback((valueOverride) => {
    manualValueRef.current = valueOverride
    setManualTick((v) => v + 1)
  }, [])

  useEffect(() => {
    const next = manualValueRef.current === undefined ? value : manualValueRef.current
    callback(next, previousRef.current)
    previousRef.current = next
    manualValueRef.current = undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, manualTick, ...deps])

  return { trigger }
}
```
