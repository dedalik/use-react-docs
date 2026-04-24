---
title: Return a deep-cloned value
sidebar_label: useCloned
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useCloned'
description: >-
  useCloned from @dedalik/use-react: memoized deep clone with structuredClone
  fallback. TypeScript, tree-shakable import, examples, SSR notes.
---

# useCloned()

<PackageData fn="useCloned" />

Last updated: 24/04/2026

## Overview

`useCloned` returns a memoized deep clone of the provided value. It is useful when you need an isolated copy for local UI mutations while keeping source data immutable.

### What it accepts

- **`value`** — any serializable value to clone.

### What it returns

- Deep-cloned value with the same shape/type (`T`).

## SSR

Safe for SSR as long as the input is serializable in your runtime.

## Usage

```tsx
import useCloned from '@dedalik/use-react/useCloned'

export default function DraftEditor({ payload }: { payload: { title: string } }) {
  const draft = useCloned(payload)
  return <pre>{JSON.stringify(draft, null, 2)}</pre>
}
```

## API Reference

### `useCloned`

**Signature:** `useCloned<T>(value: T): T`

#### Parameters

1. **`value`** - Input to clone.

#### Returns

Deep-cloned copy.

## Copy-paste hook

Source of truth: [`useCloned.tsx` on GitHub](https://github.com/dedalik/use-react/blob/main/src/hooks/useCloned.tsx).

## Type declarations

```ts
declare function useCloned<T>(value: T): T

export default useCloned
```
