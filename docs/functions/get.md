---
title: Read deep property by path
sidebar_label: get
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/utils/get.tsx'
description: >-
  get from @dedalik/use-react: safe nested get by dot path with optional fallback.
---

# get()

<PackageData fn="get" />

Last updated: 24/04/2026

## Overview

`get` reads a **nested** **value** from **`source`** (typed **`unknown`**) by splitting **`path`** on **`.`** and walking one **key** at a time. If **`path`** is **empty**, it returns **`source ?? fallback`**. At any **step**-**null/undefined** **cursor**, **non**-**object** **value**, or **missing** own **key** on an **object**-it **short**-**circuits** to **`fallback`**. If the **final** value is **`undefined`**, it also returns **`fallback`**. It does **not** parse **bracket** or **array** **indices** (only **dot** **segments** are **keys** on **plain** **objects**). It is a **synchronous** **utility**, not a **React** **hook**.

### What it accepts

1. **`source`**: `unknown`
2. **`path`**: `string` (dot-separated)
3. **`fallback`**: `unknown` (optional)

### What it returns

- **`unknown`** (resolved **value** or **fallback**)

## Usage

**Render** a **name** from a **nested** **profile**; **missing** paths show **“Guest”**.

```tsx
import get from '@dedalik/use-react/utils/get'

type Row = { user?: { profile?: { displayName?: string } } } | null

function Example() {
  const row: Row = { user: { profile: { displayName: 'Kim' } } }
  const name = get(row, 'user.profile.displayName', 'Guest') as string

  const empty: Row = {}
  const fallback = get(empty, 'user.profile.displayName', 'Guest') as string

  return (
    <p>
      {name} / {fallback}
    </p>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `get`

**Signature:** `get(source: unknown, path: string, fallback?: unknown): unknown`

## Copy-paste hook

### TypeScript

```ts
/**
 * Reads nested property value by dot-separated path.
 */
export default function get(source: unknown, path: string, fallback?: unknown): unknown {
  if (!path) return source ?? fallback

  const keys = path.split('.')
  let cursor: unknown = source

  for (const key of keys) {
    if (cursor == null || typeof cursor !== 'object' || !(key in (cursor as Record<string, unknown>))) {
      return fallback
    }
    cursor = (cursor as Record<string, unknown>)[key]
  }

  return cursor === undefined ? fallback : cursor
}
```

### JavaScript

```js
/**
 * Reads nested property value by dot-separated path.
 */
export default function get(source, path, fallback) {
  if (!path) return source ?? fallback

  const keys = path.split('.')
  let cursor = source

  for (const key of keys) {
    if (cursor == null || typeof cursor !== 'object' || !(key in cursor)) {
      return fallback
    }
    cursor = cursor[key]
  }

  return cursor === undefined ? fallback : cursor
}
```
