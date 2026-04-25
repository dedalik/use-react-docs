---
title: Convert any value to number
sidebar_label: useToNumber
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useToNumber.tsx'
description: >-
  useToNumber from @dedalik/use-react: memoized Number() with NaN replaced by fallback.
---

# useToNumber()

<PackageData fn="useToNumber" />

Last updated: 24/04/2026

## Overview

`useToNumber` applies **`Number(value)`** and **memoizes** the result on **`[value, fallback]`**. If the conversion is **`NaN`**, it returns **`options.fallback`** (default **0**), which is common for **uncontrolled** inputs, **query** params, or **`unknown`** API **fields** where **missing** or **garbled** data should not propagate as **`NaN`**. The **`value`** itself is not **coerced** beyond **`Number`**: strings like **`"12px"`** become **NaN** and hit **fallback**. It does not **parse** **int** ranges or **strip** units; use a dedicated **parser** for that. Compare with [`useToString`](./useToString) for the **string** counterpart.

### What it accepts

1. **`value`**: `unknown`
2. **`options`** (optional): `{ fallback?: number }` - default **fallback 0**

### What it returns

- **`number`**

## Usage

**Controlled** number input: empty string maps to **fallback** **-1** so the UI can show a **placeholder** or validation state.

```tsx
import { useState } from 'react'
import useToNumber from '@dedalik/use-react/useToNumber'

function Example() {
  const [raw, setRaw] = useState('')
  const n = useToNumber(raw, { fallback: -1 })

  return (
    <div>
      <label>
        Quantity
        <input inputMode="numeric" value={raw} onChange={(e) => setRaw(e.target.value)} />
      </label>
      <p>Coerced: {n === -1 ? '(use fallback)' : n}</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useToNumber`

**Signature:** `useToNumber(value: unknown, options?: UseToNumberOptions): number`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

export interface UseToNumberOptions {
  fallback?: number
}

/**
 * Converts value to number with stable memoization.
 */
export default function useToNumber(value: unknown, options: UseToNumberOptions = {}): number {
  const { fallback = 0 } = options

  return useMemo(() => {
    const next = Number(value)
    return Number.isNaN(next) ? fallback : next
  }, [value, fallback])
}
```

### JavaScript

```js
import { useMemo } from 'react'

/**
 * Converts value to number with stable memoization.
 */
export default function useToNumber(value, options = {}) {
  const { fallback = 0 } = options

  return useMemo(() => {
    const next = Number(value)
    return Number.isNaN(next) ? fallback : next
  }, [value, fallback])
}
```
