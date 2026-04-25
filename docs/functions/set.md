---
title: Set deep property by path
sidebar_label: set
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/set.tsx'
description: >-
  set from @dedalik/use-react: mutates object tree by dot path, creates empty objects.
---

# set()

<PackageData fn="set" />

Last updated: 24/04/2026

## Overview

`set` **mutates** a **plain** **object** **tree** **`target`** in place: it **splits** **`path`** on **`.`** (dropping **empty** **segments**), **walks** to the **parent** of the **final** **key**, and assigns **`value`**. If an **intermediate** **key** is **missing** or holds a **non**-**object** **value**, it **creates** a new **empty** **`{}`** and **replaces** that **slot** so the **path** can **continue**-it does **not** merge **with** **existing** **primitives** **in** **place** beyond that **replace**. The **return** is the **same** **reference** **`target`** for **chaining**. It only supports **string** **keys** in the **path** (no **raw** **brackets** for **array** **indices**). Use for **imperative** **form** **drafts** or **plugins**; for **React** state prefer **immutable** **updates** unless you **control** a **mutable** **draft** (e.g. **Immer**-style) **separately**.

### What it accepts

1. **`target`**: `Record<string, unknown>` - **mutated**
2. **`path`**: `string` - dot-separated
3. **`value`**: `unknown`

### What it returns

- The **same** **`target`** reference after **mutation**

## Usage

**Build** a **nested** **config** in one **object** with **dot** **paths**; **read** with **UI** to verify.

```tsx
import { useState } from 'react'
import set from '@dedalik/use-react/set'

function Example() {
  const [draft, setDraft] = useState<Record<string, unknown>>({})

  const apply = () => {
    setDraft((prev) => {
      const next = { ...prev }
      set(next, 'alerts.email.enabled', true)
      set(next, 'alerts.slack.webhook', 'https://example.com/hook')
      return next
    })
  }

  return (
    <div>
      <button type="button" onClick={apply}>
        Apply nested settings
      </button>
      <p>alerts: {String(draft.alerts != null)}</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `set`

**Signature:** `set(target: Record<string, unknown>, path: string, value: unknown): Record<string, unknown>`

## Copy-paste hook

### TypeScript

```ts
/**
 * Sets nested property value by dot-separated path on target object.
 */
export default function set(target: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
  const keys = path.split('.').filter(Boolean)
  if (keys.length == 0) return target

  let cursor: Record<string, unknown> = target

  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i]
    const next = cursor[key]
    if (typeof next === 'object' && next !== null) {
      cursor = next as Record<string, unknown>
      continue
    }

    const created: Record<string, unknown> = {}
    cursor[key] = created
    cursor = created
  }

  cursor[keys[keys.length - 1]] = value
  return target
}
```

### JavaScript

```js
/**
 * Sets nested property value by dot-separated path on target object.
 */
export default function set(target, path, value) {
  const keys = path.split('.').filter(Boolean)
  if (keys.length == 0) return target

  let cursor = target

  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i]
    const next = cursor[key]
    if (typeof next === 'object' && next !== null) {
      cursor = next
      continue
    }

    const created = {}
    cursor[key] = created
    cursor = created
  }

  cursor[keys[keys.length - 1]] = value
  return target
}
```
