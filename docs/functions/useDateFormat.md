---
title: Format dates with Intl
sidebar_label: useDateFormat
category: Time
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useDateFormat.tsx'
description: >-
  useDateFormat from @dedalik/use-react: memoized Intl.DateTimeFormat output string.
---

# useDateFormat()

<PackageData fn="useDateFormat" />

Last updated: 24/04/2026

## Overview

`useDateFormat` formats a **`Date`**, a **ms timestamp**, **`null`**, or **`undefined`** with **`Intl.DateTimeFormat`**. It strips **`locale`** ( **`locale?: string | string[]`** on options) and passes the rest to **`DateTimeFormat`**. **`input == null`**, **invalid** dates, or a thrown **`Intl`** call yield **`''`**. **`useMemo`** re-runs when **`input`**, **`locale`**, or a **stable key** of the other format options (derived via sorted-key **`JSON.stringify`**) change-**inline** option **objects** with the same *values* are equal only if the **key** string matches, so reusing a **const** or **`useMemo`**d options object avoids churn. **No** date-fns or Moment dependency.

### What it accepts

1. **`input`**: `Date | number | null | undefined`
2. Optional **`options`**: `UseDateFormatOptions` - `Intl.DateTimeFormatOptions` plus optional **`locale`**

### What it returns

- **`string`**

## Usage

**Short** date in **`de-DE`** and **24h** time.

```tsx
import { useState } from 'react'
import useDateFormat from '@dedalik/use-react/useDateFormat'

const opts = { locale: 'de-DE' as const, day: '2-digit' as const, month: 'short' as const, year: 'numeric' as const }

function Example() {
  const [d, setD] = useState(new Date('2025-12-15T15:30:00'))
  const label = useDateFormat(d, opts)
  return (
    <div>
      <p>{label}</p>
      <input
        type="date"
        value={d.toISOString().slice(0, 10)}
        onChange={(e) => {
          const v = e.target.value
          if (v) setD((prev) => new Date(`${v}T${prev.toTimeString().slice(0, 8)}`))
        }}
      />
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useDateFormat`

**Signature:** `useDateFormat(input: Date | number | null | undefined, options?: UseDateFormatOptions): string`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

export type UseDateFormatOptions = Intl.DateTimeFormatOptions & {
  locale?: string | string[]
}

function stableOptionsKey(options: Intl.DateTimeFormatOptions): string {
  return JSON.stringify(options, Object.keys(options).sort())
}

function formatOptionsOnly(options?: UseDateFormatOptions): Intl.DateTimeFormatOptions {
  if (!options) return {}
  const copy: Record<string, unknown> = { ...options }
  delete copy.locale
  return copy as Intl.DateTimeFormatOptions
}

/**
 * Formats a `Date` or timestamp with `Intl.DateTimeFormat` (no extra date libraries).
 */
export default function useDateFormat(
  input: Date | number | null | undefined,
  options?: UseDateFormatOptions,
): string {
  const locale = options?.locale
  const formatOptions = formatOptionsOnly(options)
  const optionsKey = stableOptionsKey(formatOptions)

  return useMemo(() => {
    if (input == null) return ''
    const date = typeof input === 'number' ? new Date(input) : input
    if (Number.isNaN(date.getTime())) return ''
    try {
      return new Intl.DateTimeFormat(locale, formatOptions).format(date)
    } catch {
      return ''
    }
  }, [input, locale, optionsKey])
}
```

### JavaScript

```js
import { useMemo } from 'react'

function stableOptionsKey(options) {
  return JSON.stringify(options, Object.keys(options).sort())
}

function formatOptionsOnly(options) {
  if (!options) return {}
  const copy = { ...options }
  delete copy.locale
  return copy
}

/**
 * Formats a `Date` or timestamp with `Intl.DateTimeFormat` (no extra date libraries).
 */
export default function useDateFormat(input, options) {
  const locale = options?.locale
  const formatOptions = formatOptionsOnly(options)
  const optionsKey = stableOptionsKey(formatOptions)

  return useMemo(() => {
    if (input == null) return ''
    const date = typeof input === 'number' ? new Date(input) : input
    if (Number.isNaN(date.getTime())) return ''
    try {
      return new Intl.DateTimeFormat(locale, formatOptions).format(date)
    } catch {
      return ''
    }
  }, [input, locale, optionsKey])
}
```
