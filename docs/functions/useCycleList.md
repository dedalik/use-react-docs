---
title: Cycle through a list with state
sidebar_label: useCycleList
category: Array
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useCycleList.tsx'
description: >-
  useCycleList from @dedalik/use-react: cyclic next/prev index and current item.
---

# useCycleList()

<PackageData fn="useCycleList" />

Last updated: 24/04/2026

## Overview

`useCycleList` stores an **index** into **`list`** and exposes **`state`** ( **`list[index]`** ) and **`index`**. **`next` / `prev`** move with **wraparound** (negative mod math). **`setIndex`** clamps to **[0, length-1])** (via `normalize`); if **`list`** is **empty**, index becomes **-1** and **`state` is `undefined`**. **`set(value)`** jumps to **`list.indexOf(value)`** and does **nothing** if the value is missing (by **`===`**, like **`indexOf`**. **`initialIndex`** is normalized to list length on first render only. Changing **`list` length** does not automatically re-run the initial `useState`-children should handle empty lists; cycling uses current **`list.length`**.

### What it accepts

1. **`list`**: `readonly T[]`
2. Optional **`initialIndex`**: `number` (default **0**)

### What it returns

- **`{ state, index, next, prev, setIndex, set }`**

## Usage

Carousel of slide titles; start at **index 1**, **Next/Prev** wrap, **set** to jump by label.

```tsx
import useCycleList from '@dedalik/use-react/useCycleList'

const slides = ['Hi', 'Features', 'Pricing', 'Bye'] as const

function Example() {
  const { state, index, next, prev, set } = useCycleList(slides, 1)

  return (
    <div>
      <h2>Slide: {String(state)}</h2>
      <p>
        index {index} of {slides.length - 1}
      </p>
      <p>
        <button type='button' onClick={prev}>
          Prev
        </button>{' '}
        <button type='button' onClick={next}>
          Next
        </button>
      </p>
      <p>
        <button type='button' onClick={() => set('Bye')}>
          Jump to “Bye”
        </button>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useCycleList`

**Signature:** `useCycleList<T>(list: readonly T[], initialIndex?: number): UseCycleListReturn<T>`

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useMemo, useState } from 'react'

export interface UseCycleListReturn<T> {
  state: T | undefined
  index: number
  next: () => void
  prev: () => void
  setIndex: (nextIndex: number) => void
  set: (value: T) => void
}

function normalize(index: number, length: number): number {
  if (length === 0) return -1
  const r = index % length
  return r < 0 ? r + length : r
}

export default function useCycleList<T>(list: readonly T[], initialIndex = 0): UseCycleListReturn<T> {
  const normalizedInitial = useMemo(() => normalize(initialIndex, list.length), [initialIndex, list.length])
  const [index, setIndexState] = useState(normalizedInitial)

  const setIndex = useCallback(
    (nextIndex: number) => {
      setIndexState(normalize(nextIndex, list.length))
    },
    [list.length],
  )

  const next = useCallback(() => {
    setIndexState((i) => normalize(i + 1, list.length))
  }, [list.length])

  const prev = useCallback(() => {
    setIndexState((i) => normalize(i - 1, list.length))
  }, [list.length])

  const set = useCallback(
    (value: T) => {
      const idx = list.indexOf(value)
      if (idx >= 0) setIndexState(idx)
    },
    [list],
  )

  const state = index >= 0 ? list[index] : undefined

  return { state, index, next, prev, setIndex, set }
}
```

### JavaScript

```js
import { useCallback, useMemo, useState } from 'react'

function normalize(index, length) {
  if (length === 0) return -1
  const r = index % length
  return r < 0 ? r + length : r
}

export default function useCycleList(list, initialIndex = 0) {
  const normalizedInitial = useMemo(() => normalize(initialIndex, list.length), [initialIndex, list.length])
  const [index, setIndexState] = useState(normalizedInitial)

  const setIndex = useCallback(
    (nextIndex) => {
      setIndexState(normalize(nextIndex, list.length))
    },
    [list.length],
  )

  const next = useCallback(() => {
    setIndexState((i) => normalize(i + 1, list.length))
  }, [list.length])

  const prev = useCallback(() => {
    setIndexState((i) => normalize(i - 1, list.length))
  }, [list.length])

  const set = useCallback(
    (value) => {
      const idx = list.indexOf(value)
      if (idx >= 0) setIndexState(idx)
    },
    [list],
  )

  const state = index >= 0 ? list[index] : undefined

  return { state, index, next, prev, setIndex, set }
}
```
