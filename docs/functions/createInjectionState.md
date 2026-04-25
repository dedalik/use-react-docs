---
title: Create Provider + injector pair
sidebar_label: createInjectionState
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/factories/createInjectionState.tsx'
description: >-
  createInjectionState from @dedalik/use-react: context from a custom hook and args tuple.
---

# createInjectionState()

<PackageData fn="createInjectionState" />

Last updated: 24/04/2026

## Overview

`createInjectionState` takes **your** composable **`useValue(...args: A) => T`** and returns a **tuple** **`[Provider, useInjected]`**. **`Provider`** renders **`useValue(...props.args)`** and puts the **result** into **`createContext`**. **`useInjected`** reads that **context** and **throws** if the tree is **outside** the matching **`Provider`**. The **`args`** prop is a **tuple** typed as **`A`**-use it to pass **IDs**, **flags**, or **config** so each **provider instance** can run a **different** **state** **hook** with different **inputs**. This is **per-subtree** **injection**, unlike [`createGlobalState`](./createGlobalState)’s **module** singleton. The **inner** **`useValue`** must follow **hook** rules; **`Provider`** is the **only** place it **runs** for that **subtree**.

### What it accepts

1. **`useValue`**: `(...args: A) => T` - a **custom hook** (function that uses hooks)

### What it returns

- **`[Provider, useInjected]`** - **`Provider`** expects **`{ args: A; children }`**

## Usage

A **search** model hook takes an **initial** **query** string; **`args={['']}`** is a **one-tuple** of type **`[string]`**.

```tsx
import { useState } from 'react'
import createInjectionState from '@dedalik/use-react/factories/createInjectionState'

function useSearchModel(initialQuery: string) {
  const [query, setQuery] = useState(initialQuery)
  return { query, setQuery, clear: () => setQuery('') }
}

const [SearchProvider, useSearch] = createInjectionState(useSearchModel)

function Field() {
  const { query, setQuery, clear } = useSearch()
  return (
    <label>
      Search
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button type="button" onClick={clear}>
        Clear
      </button>
    </label>
  )
}

function Example() {
  return (
    <SearchProvider args={['']}>
      <Field />
    </SearchProvider>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `createInjectionState`

**Signature:** `createInjectionState<T, A extends unknown[]>(useValue: (...args: A) => T): readonly [Provider, () => T]`

## Copy-paste hook

### TypeScript

```tsx
import React, { createContext, ReactNode, useContext } from 'react'

/**
 * Creates Provider + consumer hook pair for shared context state.
 */
export default function createInjectionState<T, A extends unknown[]>(useValue: (...args: A) => T) {
  const InjectionContext = createContext<T | undefined>(undefined)

  function Provider(props: { args: A; children: ReactNode }) {
    const value = useValue(...props.args)
    return <InjectionContext.Provider value={value}>{props.children}</InjectionContext.Provider>
  }

  function useInjected() {
    const value = useContext(InjectionContext)
    if (value === undefined) {
      throw new Error('useInjected must be used inside its Provider')
    }
    return value
  }

  return [Provider, useInjected] as const
}
```

### JavaScript

```jsx
import React, { createContext, useContext } from 'react'

/**
 * Creates Provider + consumer hook pair for shared context state.
 */
export default function createInjectionState(useValue) {
  const InjectionContext = createContext(undefined)

  function Provider(props) {
    const value = useValue(...props.args)
    return <InjectionContext.Provider value={value}>{props.children}</InjectionContext.Provider>
  }

  function useInjected() {
    const value = useContext(InjectionContext)
    if (value === undefined) {
      throw new Error('useInjected must be used inside its Provider')
    }
    return value
  }

  return [Provider, useInjected]
}
```
