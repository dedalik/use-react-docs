---
title: Live Date on an interval
sidebar_label: useNow
category: Time
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useNow'
description: >-
  useNow from @dedalik/use-react: live Date value on a configurable interval.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useNow()

<PackageData fn="useNow" />

Last updated: 24/04/2026

## Overview

`useNow` returns a `Date` that refreshes on a timer. It is useful for clocks and relative-time UIs that need a full date object.

### What it accepts

- **`options.interval`** (optional, default `1000`) — ms between updates, or `null` / `0` to freeze at mount value.

### What it returns

- `Date` — latest timestamp as `Date` instance.

## SSR

First render uses server time; after hydration, ticking may update rendered output.

## Usage

```tsx
import useNow from '@dedalik/use-react/useNow'

export default function ClockDemo() {
  const now = useNow({ interval: 1000 })
  return <time dateTime={now.toISOString()}>{now.toLocaleTimeString()}</time>
}
```

## API Reference

### `useNow`

**Signature:** `useNow(options?): Date`
