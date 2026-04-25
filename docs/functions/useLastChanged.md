---
title: Track timestamp of last value change
sidebar_label: useLastChanged
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useLastChanged.tsx'
description: >-
  useLastChanged from @dedalik/use-react: returns timestamp of the last observed value change.
---

# useLastChanged()

<PackageData fn="useLastChanged" />

Last updated: 24/04/2026

## Overview

`useLastChanged` tracks when a watched value last changed and returns that moment as a Unix timestamp (`Date.now()` milliseconds). On every render it compares the current and previous values with `Object.is`; when the value actually changes, it records a new timestamp, which is useful for "last updated" labels, stale-data indicators, autosave timers, or rate/idle logic tied to value changes.

### What it accepts

- `value: T`.

### What it returns

- Returns `number`.

## Usage

Real-world example: show when a draft text was last edited.

```tsx
import { useMemo, useState } from 'react'
import useLastChanged from '@dedalik/use-react/useLastChanged'

function Example() {
  const [draft, setDraft] = useState('')
  const lastChangedAt = useLastChanged(draft)
  const lastChangedLabel = useMemo(() => new Date(lastChangedAt).toLocaleTimeString(), [lastChangedAt])

  return (
    <div>
      <h3>Draft editor</h3>
      <textarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder='Write something...'
        rows={4}
      />
      <p>Characters: {draft.length}</p>
      <p>Last changed at: {lastChangedLabel}</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useLastChanged`

**Signature:** `useLastChanged(value: T): number`

#### Parameters

1. **`value`** (`T`) - See type in signature.

#### Returns

Returns `number`.

## Copy-paste hook

```tsx
import { useEffect, useRef, useState } from 'react'

/**
 * Timestamp of the most recent value change.
 */
export default function useLastChanged<T>(value: T): number {
  const previousRef = useRef(value)
  const [lastChanged, setLastChanged] = useState(() => Date.now())

  useEffect(() => {
    if (!Object.is(previousRef.current, value)) {
      previousRef.current = value
      setLastChanged(Date.now())
    }
  }, [value])

  return lastChanged
}
```

```js
import { useEffect, useRef, useState } from 'react'

export default function useLastChanged(value) {
  const previousRef = useRef(value)
  const [lastChanged, setLastChanged] = useState(() => Date.now())

  useEffect(() => {
    if (!Object.is(previousRef.current, value)) {
      previousRef.current = value
      setLastChanged(Date.now())
    }
  }, [value])

  return lastChanged
}
```
