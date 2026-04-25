---
title: Normalize value-or-getter to getter
sidebar_label: createUnrefFn
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/createUnrefFn.tsx'
description: >-
  createUnrefFn from @dedalik/use-react: MaybeGetter to zero-arg read function.
---

# createUnrefFn()

<PackageData fn="createUnrefFn" />

Last updated: 24/04/2026

## Overview

`createUnrefFn` turns **`MaybeGetter<T>`** (either a **plain** **`T`** or a **zero-**arg **`() => T`**) into a **single** **shape**: **`() => T`**. If **`source`** is already a **function**, it is **returned** as the **getter**; otherwise the result is a **function** that **returns** the **captured** **value** so the **read** is **always** **lazy**-ready. In Vue, **refs** and **getters** are often **unified**; here you can pass **APIs** that accept “**static** or **reactive**” the same way. It does **not** **unwrap** **object**-shaped **functions** that are not meant as **getters**-a **class** **constructor** would be misclassified if passed by mistake. Use **`useMemo`** in React to **stabilize** a **getter** that **closes** over **fresh** state each **render** if the **input** is built **inline**.

### What it accepts

1. **`source`**: `T | (() => T)`

### What it returns

- **`() => T`**

## Usage

A **fixed** number and a **getter** whose **return** **tracks** **React** **state** (getter **rebuilt** when **`i`** **changes**).

```tsx
import { useMemo, useState } from 'react'
import createUnrefFn from '@dedalik/use-react/createUnrefFn'

function Example() {
  const readFixed = createUnrefFn(10)
  const [i, setI] = useState(0)
  const readLive = useMemo(() => createUnrefFn(() => i * 2), [i])

  return (
    <div>
      <p>Constant: {readFixed()}</p>
      <p>Double: {readLive()}</p>
      <button type="button" onClick={() => setI((n) => n + 1)}>
        i++
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `createUnrefFn`

**Signature:** `createUnrefFn<T>(source: MaybeGetter<T>): () => T`

## Copy-paste hook

### TypeScript

```ts
export type MaybeGetter<T> = T | (() => T)

/**
 * Normalizes value-or-getter into a getter function.
 */
export default function createUnrefFn<T>(source: MaybeGetter<T>): () => T {
  if (typeof source === 'function') {
    return source as () => T
  }
  return () => source
}
```

### JavaScript

```js
/**
 * Normalizes value-or-getter into a getter function.
 */
export default function createUnrefFn(source) {
  if (typeof source === 'function') {
    return source
  }
  return () => source
}
```
