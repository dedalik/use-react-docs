---
title: Convert any value to string
sidebar_label: useToString
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useToString.tsx'
description: >-
  useToString from @dedalik/use-react: memoized String(value) for display and keys.
---

# useToString()

<PackageData fn="useToString" />

Last updated: 24/04/2026

## Overview

`useToString` wraps **`String(value)`** in **`useMemo`** with **`[value]`** as the only dependency, so the **string** is **recomputed** only when **`value`** changes by **reference** or **primitive** equality. It is a small **convenience** to avoid **`String(…)`** in **render** paths when you need a **stable** string for **text** **nodes**, **attributes**, or **keys** derived from **unknown** or **union** values, without pulling in a heavier **formatting** library. **`Symbol`** and **`object`** use normal **`String`** / **`[object Object]`** semantics. Pair with **controlled** **inputs** when you need both **string** and **raw** value.

### What it accepts

1. **`value`**: `unknown`

### What it returns

- **`string`**

## Usage

Coerce a **number** to a **string** for a **data attribute** and **string** **methods** (e.g. **length**).

```tsx
import { useState } from 'react'
import useToString from '@dedalik/use-react/useToString'

function Example() {
  const [count, setCount] = useState(0)
  const asText = useToString(count)

  return (
    <div>
      <p>
        Digits: {asText.length} - <span data-count={asText}>{asText}</span>
      </p>
      <button type='button' onClick={() => setCount((c) => c + 1)}>
        Increment
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useToString`

**Signature:** `useToString(value: unknown): string`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

/**
 * Converts any value to string with stable memoization.
 */
export default function useToString(value: unknown): string {
  return useMemo(() => String(value), [value])
}
```

### JavaScript

```js
import { useMemo } from 'react'

/**
 * Converts any value to string with stable memoization.
 */
export default function useToString(value) {
  return useMemo(() => String(value), [value])
}
```
