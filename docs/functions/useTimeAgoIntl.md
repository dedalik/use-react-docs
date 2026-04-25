---
title: Intl relative time (alias)
sidebar_label: useTimeAgoIntl
category: Time
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useTimeAgoIntl.tsx'
description: >-
  useTimeAgoIntl from @dedalik/use-react: same behavior as useTimeAgo, Intl-oriented name.
---

# useTimeAgoIntl()

<PackageData fn="useTimeAgoIntl" />

Last updated: 24/04/2026

## Overview

`useTimeAgoIntl` is a **zero-logic** alias: it **only** forwards **`(target, options?)`** to [`useTimeAgo`](./useTimeAgo) and returns the same string. The separate export exists so codebases can name imports after **`Intl`**-style “relative time” while keeping a single implementation. Parameters (**`UseTimeAgoOptions`**: **`locale`**, **`updateInterval`**, **`relativeOptions`**) and behavior (threshold bucketing, ticking, **`''`** for invalid) are **identical**; choose either hook based on naming only.

### What it accepts

Same as **useTimeAgo**: `target: Date | number | null | undefined` and optional **`options`**

### What it returns

- **`string`**

## Usage

Same as **useTimeAgo**; here a **meeting in 1 hour 15 minutes**, **`en`**, and **live** refresh every **5 s** so the label can move as time passes (short demo period).

```tsx
import { useState } from 'react'
import useTimeAgoIntl from '@dedalik/use-react/useTimeAgoIntl'

function Example() {
  const [at] = useState(() => new Date(Date.now() + 75 * 60 * 1000))
  const label = useTimeAgoIntl(at, {
    locale: 'en',
    updateInterval: 5000,
    relativeOptions: { numeric: 'auto' },
  })
  return <p>Meeting starts: {label}</p>
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useTimeAgoIntl`

**Signature:** `useTimeAgoIntl(target: Date | number | null | undefined, options?: UseTimeAgoOptions): string`

`UseTimeAgoOptions` is defined in [`useTimeAgo`](./useTimeAgo).

## Copy-paste hook

### TypeScript

```tsx
import useTimeAgo, { type UseTimeAgoOptions } from './useTimeAgo'

/**
 * Intl-focused alias for useTimeAgo.
 */
export default function useTimeAgoIntl(target: Date | number | null | undefined, options?: UseTimeAgoOptions): string {
  return useTimeAgo(target, options)
}
```

### JavaScript

```js
import useTimeAgo from './useTimeAgo'

/**
 * Intl-focused alias for useTimeAgo.
 */
export default function useTimeAgoIntl(target, options) {
  return useTimeAgo(target, options)
}
```
