---
title: Type guard for defined values
sidebar_label: isDefined
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/utils/isDefined.tsx'
description: >-
  isDefined from @dedalik/use-react: null and undefined type guard, filter-friendly.
---

# isDefined()

<PackageData fn="isDefined" />

Last updated: 24/04/2026

## Overview

`isDefined` is a **type guard** `value is T` for **`value: T | null | undefined`**: it returns **true** when the **value** is **neither** **`null` nor **`undefined`**, and **false** otherwise, allowing **TypeScript** to **narrow** in **`if`**, **ternary**, and **`.filter(isDefined)`** on **arrays** without a **wider** return type. It is a **one-line** check-no **deep** **falsy** handling (**`0`**, **empty** **string**, **`NaN`** are still **“defined”**). It often pairs with **optional** **API** **fields** or **partial** **records** when you need a **typed** list of “present” **values**.

### What it accepts

1. **`value`**: `T | null | undefined`

### What it returns

- **`boolean`**, narrows to **`T`** when **true**

## Usage

**Filter** a **list** of **ids** (some **missing**); **map** to **length** only for **defined** **strings**.

```tsx
import isDefined from '@dedalik/use-react/utils/isDefined'

function Example() {
  const ids = ['a', null, 'bb', undefined, 'ccc'] as (string | null | undefined)[]

  const lengths = ids.filter(isDefined).map((s) => s.length)

  return (
    <ul>
      {lengths.map((n) => (
        <li key={n}>Length {n}</li>
      ))}
    </ul>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `isDefined`

**Signature:** `isDefined<T>(value: T | null | undefined): value is T`

## Copy-paste hook

### TypeScript

```ts
/**
 * Type guard for non-null and non-undefined values.
 */
export default function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}
```

### JavaScript

```js
/**
 * Type guard for non-null and non-undefined values.
 */
export default function isDefined(value) {
  return value !== null && value !== undefined
}
```
