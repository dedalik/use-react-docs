---
title: Runtime feature support check
sidebar_label: useSupported
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useSupported.tsx'
description: >-
  useSupported from @dedalik/use-react: safe feature detect, false on SSR.
---

# useSupported()

<PackageData fn="useSupported" />

Last updated: 24/04/2026

## Overview

`useSupported` runs a **synchronous** **predicate** **`test()`** once per **`test` reference** in **`useMemo`**: on the **server** (no **`window`**) it returns **`false`**, and if **`test()`** **throws** it also returns **`false`**. If the test returns a **truthy** value, the hook returns **`true`**. Because **`[test]`** is the **dependency array**, you should pass a **stable** function (typically **`useCallback`**) or a **hoisted** **module-level** function; an **inline** `() => …` is a **new** function every render, so the **check** re-runs every time (still **safe**, just not **optimal**). It does **not** re-check when **browser** **state** **changes** (e.g. permission **grants**) unless the **`test`** function identity **changes**-for **dynamic** capability, add your own **effect** or **event** **listeners**. Use to **gate** **optional** **APIs** (Clipboard, **Share**, **View Transitions**).

### What it accepts

1. **`test`**: `() => unknown` - should return a **truthy** value when the feature is present

### What it returns

- **`boolean`**

## Usage

**Web Share** button only when **navigator.share** exists; **stable** **`useCallback`** keeps the check from re-running needlessly.

```tsx
import { useCallback } from 'react'
import useSupported from '@dedalik/use-react/useSupported'

function Example() {
  const canShare = useSupported(
    useCallback(() => typeof navigator !== 'undefined' && typeof navigator.share === 'function', []),
  )

  return (
    <button
      type='button'
      disabled={!canShare}
      onClick={() => {
        void navigator.share({ title: 'Demo', text: 'Hello from the hook doc' })
      }}
    >
      {canShare ? 'Share' : 'Sharing not supported'}
    </button>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useSupported`

**Signature:** `useSupported(test: () => unknown): boolean`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

/**
 * Checks whether a feature test passes in the current runtime.
 */
export default function useSupported(test: () => unknown): boolean {
  return useMemo(() => {
    if (typeof window === 'undefined') return false
    try {
      return Boolean(test())
    } catch {
      return false
    }
  }, [test])
}
```

### JavaScript

```js
import { useMemo } from 'react'

/**
 * Checks whether a feature test passes in the current runtime.
 */
export default function useSupported(test) {
  return useMemo(() => {
    if (typeof window === 'undefined') return false
    try {
      return Boolean(test())
    } catch {
      return false
    }
  }, [test])
}
```
