---
title: Format dates with Intl.DateTimeFormat
sidebar_label: useDateFormat
category: Time
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useDateFormat'
description: >-
  useDateFormat from @dedalik/use-react: memoized date formatting with Intl.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useDateFormat()

<PackageData fn="useDateFormat" />

Last updated: 24/04/2026

## Overview

`useDateFormat` formats a `Date` or timestamp with `Intl.DateTimeFormat` and returns a memoized string.

### What it accepts

1. **`input`** — `Date`, timestamp number, `null`, or `undefined`.
2. **`options`** — `Intl.DateTimeFormatOptions` plus optional `locale`.

### What it returns

- `string` — formatted value or empty string when input is nullish/invalid.

## SSR

Safe for SSR; use explicit `timeZone` for consistent server/client output.

## Usage

```tsx
import useDateFormat from '@dedalik/use-react/useDateFormat'

export default function DateCell({ value }: { value: Date }) {
  const text = useDateFormat(value, { locale: 'en-GB', dateStyle: 'medium', timeZone: 'UTC' })
  return <span>{text}</span>
}
```

## API Reference

### `useDateFormat`

**Signature:** `useDateFormat(input, options?): string`
