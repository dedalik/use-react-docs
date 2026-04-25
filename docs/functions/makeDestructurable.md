---
title: Add tuple destructuring to object
sidebar_label: makeDestructurable
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/utils/makeDestructurable.tsx'
description: >-
  makeDestructurable from @dedalik/use-react: object + iterable for dual destructuring.
---

# makeDestructurable()

<PackageData fn="makeDestructurable" />

Last updated: 24/04/2026

## Overview

`makeDestructurable` **clones** **`obj`**, attaches **`Symbol.iterator`** that **yields** the **entries** of the **`arr`** **tuple** in order, and returns the result typed as **`T & A`**. You can then **`{ ... }`**-destructure **named** **keys** from **`obj`** _and_ **array**-destructure **positional** **values** from **`arr`** off the **same** **value**-a pattern popularized by **VueUse**-style **APIs** that return **metadata** as an **object** and **a** **tuple** of **primitives** for **convenience**. The **iterable** **does** **not** **delegate** to **`Array`**: it is a **custom** **generator** over the **passed** **`arr`**. The **return** is a **shallow** **copy** of **`obj`**; **mutating** **iterable**-only **data** in **`arr`** does not **sync** to **fields** of **`obj`**. Not a **React** **API**; safe to use in **hooks** for **return** **shapes**.

### What it accepts

1. **`obj`**: `T` - **object** (shallow-copied)
2. **`arr`**: `A` - **tuple**-like **readonly** **array** for **iteration** order

### What it returns

- **`T & A`** (structurally): **object** **plus** **iterable** for **`arr`**

## Usage

**Response**-style **value**: **object** for **`path`**, **tuple** for **HTTP** **code** and **text**.

```tsx
import makeDestructurable from '@dedalik/use-react/utils/makeDestructurable'

function Example() {
  const res = makeDestructurable({ path: '/dashboard' }, [200, 'OK'])
  const { path } = res
  const [code, text] = res

  return (
    <p>
      {path} - {code} {text}
    </p>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `makeDestructurable`

**Signature:** `makeDestructurable<T extends object, A extends readonly unknown[]>(obj: T, arr: A): T & A`

## Copy-paste hook

### TypeScript

```ts
/**
 * Merges object shape with iterable tuple destructuring support.
 */
export default function makeDestructurable<T extends object, A extends readonly unknown[]>(obj: T, arr: A): T & A {
  const clone = { ...obj } as T & Partial<A>

  ;(clone as T & { [Symbol.iterator]: () => Iterator<unknown> })[Symbol.iterator] = function* iterator() {
    for (const item of arr) yield item
  }

  return clone as T & A
}
```

### JavaScript

```js
/**
 * Merges object shape with iterable tuple destructuring support.
 */
export default function makeDestructurable(obj, arr) {
  const clone = { ...obj }

  clone[Symbol.iterator] = function* iterator() {
    for (const item of arr) yield item
  }

  return clone
}
```
