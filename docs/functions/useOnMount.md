---
title: Run logic when component mounts
sidebar_label: useOnMount
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useOnMount'
description: >-
  useOnMount from @dedalik/use-react: Run logic when component mounts.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useOnMount()

<PackageData fn="useOnMount" />

Last updated: 23/04/2026, 15:56

## Overview

`useOnMount` runs a callback when component mounts.

It keeps mount-only setup concise for beginners and avoids repeating lifecycle boilerplate in components.

### What it accepts

- `fn`: function to run on mount.

### What it returns

- This hook returns nothing.

`useOnMount` is a custom React hook designed to execute a callback function when a component mounts. This hook provides a clear and concise way to handle side-effects or initialize states when the component first renders, similar to the `componentDidMount` lifecycle method in class components.

## Features

- **Simplicity and Clarity:** Allows for a more readable and straightforward approach to executing code on component mount.
- **Reusable Logic:** Encapsulates component mount logic in a reusable hook, promoting cleaner code and reducing repetition across components.
- **Type Safety:** Ensures that the passed argument is a function, providing additional safety in TypeScript projects.

## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useCallback, useState } from 'react'
import useOnMount from '@dedalik/use-react/useOnMount'

function MountPingExample() {
  const [msg, setMsg] = useState('waiting...')
  const onMount = useCallback(() => setMsg('mounted'), [])

  useOnMount(onMount)

  return <p>{msg}</p>
}

export default function MountPingDemo() {
  return <MountPingExample />
}
```

## API Reference

### `useOnMount`

**Signature:** `useOnMount(fn: () => void): void`

#### Parameters

1. **`fn`** - Side effect to run once after mount. Should be a stable or intentionally changing function (runs when `fn` identity changes per `useEffect` rules).

#### Returns

Nothing (`void`).

## Copy-paste hook

```tsx
import { useEffect } from 'react'

type Fn = () => void

export default function useOnMount(fn: Fn): void {
  useEffect(() => {
    if (typeof fn === 'function') {
      fn()
    }
  }, [fn])
}
```

### JavaScript version

```js
import { useEffect } from 'react'

export default function useOnMount(fn) {
  useEffect(() => {
    if (typeof fn === 'function') {
      fn()
    }
  }, [fn])
}
```

## Type Declarations

- `Fn`: Type alias for a function with no arguments and no return value. This is the type of the `fn` argument expected by `useOnMount`.

The `useOnMount` hook is particularly useful in scenarios where certain actions, such as API calls, state initializations, or DOM manipulations, are required when the component first renders. It provides a clean and declarative way to handle such operations in functional components.
