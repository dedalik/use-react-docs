---
title: Relative time with Intl.RelativeTimeFormat
sidebar_label: useTimeAgo
category: Time
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useTimeAgo'
description: >-
  useTimeAgo from @dedalik/use-react: relative labels like “2 hours ago”.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useTimeAgo()

<PackageData fn="useTimeAgo" />

Last updated: 24/04/2026

## Overview

`useTimeAgo` creates localized relative-time labels from a target date or timestamp. It can auto-refresh at a configured interval.

### What it accepts

1. **`target`** — `Date`, timestamp number, `null`, or `undefined`.
2. **`options`** — `{ locale?, updateInterval?, relativeOptions? }`.

### What it returns

- `string` — relative-time label (or empty string for null/invalid input).

## SSR

First render uses server clock; client output may shift after hydration if ticking is enabled.

## Usage

```tsx
import useTimeAgo from '@dedalik/use-react/useTimeAgo'

export default function LastSeen({ at }: { at: Date }) {
  const text = useTimeAgo(at, { locale: 'en', updateInterval: 30_000 })
  return <span>{text}</span>
}
```

## API Reference

### `useTimeAgo`

**Signature:** `useTimeAgo(target, options?): string`
