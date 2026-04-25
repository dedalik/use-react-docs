---
title: Singleton result for a composable
sidebar_label: createSharedComposable
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/createSharedComposable.tsx'
description: >-
  createSharedComposable from @dedalik/use-react: first call wins, shared return forever.
---

# createSharedComposable()

<PackageData fn="createSharedComposable" />

Last updated: 24/04/2026

## Overview

`createSharedComposable` wraps a **factory** `(...args: A) => R` and returns a **new** function. The **first** time that function is **invoked**, it runs **`factory(...args)`**, **stores** the return value, and **sets** a **flag**; every **later** invocation **ignores** new **arguments** and returns the **same** **cached** **instance**. This is useful when the **factory** is a **custom** **hook** (or **hook**-shaped **composable**): the **first** **mounting** **component** “wins” the **state**; **siblings** **share** it. It is **not** React-**concurrent**-safe by **itself** if the **factory** has **per-call** **assumptions**-use for **intentional** **singletons** (e.g. one **shared** **ref** or **event** **buffer**). For **independent** **state** per **call** **site**, do **not** use this **wrapper**.

### What it accepts

1. **`factory`**: `(...args: A) => R`

### What it returns

- A function **`(...args: A) => R`** that **returns the first** **computed** **`R`**

## Usage

**First** **hook** **call** with **`'alpha'`** **freezes** the **label**; a **second** **component** calling with **`'beta'`** still sees **`'alpha'`** (intentional **singleton**).

```tsx
import { useState } from 'react'
import createSharedComposable from '@dedalik/use-react/createSharedComposable'

const useSharedLabel = createSharedComposable((prefix: string) => {
  const [text, setText] = useState(prefix)
  return { text, setText }
})

function A() {
  const { text } = useSharedLabel('alpha')
  return <p>A reads: {text}</p>
}

function B() {
  const { setText } = useSharedLabel('beta')
  return (
    <button type="button" onClick={() => setText('from B')}>
      Update shared state
    </button>
  )
}

function Example() {
  return (
    <div>
      <A />
      <B />
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `createSharedComposable`

**Signature:** `createSharedComposable<A extends unknown[], R>(factory: (...args: A) => R): (...args: A) => R`

## Copy-paste hook

### TypeScript

```ts
/**
 * Creates a shared singleton result for plain composable factories.
 */
export default function createSharedComposable<A extends unknown[], R>(factory: (...args: A) => R) {
  let initialized = false
  let sharedValue: R

  return (...args: A): R => {
    if (!initialized) {
      sharedValue = factory(...args)
      initialized = true
    }
    return sharedValue
  }
}
```

### JavaScript

```js
/**
 * Creates a shared singleton result for plain composable factories.
 */
export default function createSharedComposable(factory) {
  let initialized = false
  let sharedValue

  return (...args) => {
    if (!initialized) {
      sharedValue = factory(...args)
      initialized = true
    }
    return sharedValue
  }
}
```
