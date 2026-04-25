---
title: Singleton result for a composable
sidebar_label: createSharedComposable
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/factories/createSharedComposable.tsx'
description: >-
  createSharedComposable from @dedalik/use-react: first call wins, shared return forever.
---

# createSharedComposable()

<PackageData fn="createSharedComposable" />

Last updated: 24/04/2026

## Overview

`createSharedComposable` wraps a **factory** `(...args: A) => R` and returns a **new** function. The **first** time that function is **invoked**, it runs **`factory(...args)`**, **stores** the return value, and **sets** a **flag**; every **later** invocation **ignores** new **arguments** and returns the **same** **cached** **instance**.

**Rules of Hooks:** `factory` must **not** call React hooks (`useState`, `useEffect`, …). Because the factory runs **only once**, a hook-based factory would execute hooks a single time and break React’s expectations for per-component hook order. Use this helper only for **hook-free** singletons: plain objects, services, caches, or composables that do not use React state or effects. For per-component state, use normal hooks or context instead.

### What it accepts

1. **`factory`**: `(...args: A) => R`

### What it returns

- A function **`(...args: A) => R`** that **returns the first** **computed** **`R`**

## Usage

**First** call passes **`'app'`** into the factory; a **second** component calling with **`'other'`** still receives the **same** logger object (arguments after the first call are ignored).

```tsx
import createSharedComposable from '@dedalik/use-react/factories/createSharedComposable'

type Logger = { log: (message: string) => void }

const getSharedLogger = createSharedComposable((prefix: string): Logger => ({
  log(message: string) {
    // eslint-disable-next-line no-console
    console.log(`[${prefix}] ${message}`)
  },
}))

function A() {
  const { log } = getSharedLogger('app')
  return (
    <button type="button" onClick={() => log('click from A')}>
      A
    </button>
  )
}

function B() {
  const { log } = getSharedLogger('other')
  return (
    <button type="button" onClick={() => log('click from B')}>
      B
    </button>
  )
}

function Example() {
  return (
    <div>
      <A />
      <B />
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `createSharedComposable`

**Signature:** `createSharedComposable<A extends unknown[], R>(factory: (...args: A) => R): (...args: A) => R`

## Copy-paste hook

### TypeScript

```ts
/**
 * Returns a singleton wrapper around `factory`.
 * `factory` must not call React hooks - only plain singletons or hook-free composables.
 */
export default function createSharedComposable<A extends unknown[], R>(factory: (...args: A) => R) {
  let initialized = false
  let sharedValue: R

  return (...args: A): R => {
    if (!initialized) {
      sharedValue = factory(...args)
      initialized = true
    }
    return sharedValue
  }
}
```

### JavaScript

```js
/**
 * Returns a singleton wrapper around `factory`.
 * `factory` must not call React hooks.
 */
export default function createSharedComposable(factory) {
  let initialized = false
  let sharedValue

  return (...args) => {
    if (!initialized) {
      sharedValue = factory(...args)
      initialized = true
    }
    return sharedValue
  }
}
```
