---
title: Memoized array join
sidebar_label: useArrayJoin
category: Array
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useArrayJoin.tsx'
description: >-
  useArrayJoin from @dedalik/use-react: useMemo around Array.join.
---

# useArrayJoin()

<PackageData fn="useArrayJoin" />

Last updated: 24/04/2026

## Overview

`useArrayJoin` memoizes **`source.join(separator)`** (default **separator** **`,`**). **Numbers** and **strings** stringify like native **join**; other types use **toString** behavior. Dependencies are **`[separator, source]`**. Use for **human-readable** labels from string **parts** without re-joining when neither changes.

### What it accepts

1. **`source`**: `T[]` (typically `string[]` or `number[]` for display)
2. Optional **`separator`**: `string` (default **`,`**)

### What it returns

- **`string`**

## Usage

Build a **“ · ”**-separated **breadcrumb** from path segments.

```tsx
import { useState } from 'react'
import useArrayJoin from '@dedalik/use-react/useArrayJoin'

function Example() {
  const [parts, setParts] = useState(['App', 'Settings', 'Account'])
  const line = useArrayJoin(parts, ' · ')

  return (
    <div>
      <p>{line}</p>
      <button type='button' onClick={() => setParts((p) => p.slice(0, -1))}>
        go up
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useArrayJoin`

**Signature:** `useArrayJoin<T>(source: T[], separator?: string): string`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

/**
 * Memoized Array.join for derived string output.
 */
export default function useArrayJoin<T>(source: T[], separator = ','): string {
  return useMemo(() => source.join(separator), [separator, source])
}
```

### JavaScript

```js
import { useMemo } from 'react'

/**
 * Memoized Array.join for derived string output.
 */
export default function useArrayJoin(source, separator = ',') {
  return useMemo(() => source.join(separator), [separator, source])
}
```
