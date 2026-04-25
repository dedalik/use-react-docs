---
title: Trigger callback when cursor leaves page
sidebar_label: usePageLeave
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/usePageLeave.tsx'
description: >-
  usePageLeave from @dedalik/use-react: invokes callback when pointer leaves viewport from top edge.
---

# usePageLeave()

<PackageData fn="usePageLeave" />

Last updated: 24/04/2026

## Overview

`usePageLeave` registers **`document`** **`mouseout`**: when the pointer leaves toward **`relatedTarget === null`** and **`clientY <= 0`**, it treats that as a top-edge “closing” gesture-common for “wait, don’t leave yet” interstitials or email capture. The latest **`onLeave`** is kept in a ref so a stable event subscription can see updated callbacks. This is a heuristic, not a reliable “user closed tab” signal, and it won’t cover touch or keyboard-only exits.

### What it accepts

- **`onLeave`** - Function called on that top-exit condition.

### What it returns

- **`void`**.

## Usage

Increment a counter when the hook thinks the user moved up past the top chrome (no `JSON.stringify`).

```tsx
import { useCallback, useState } from 'react'
import usePageLeave from '@dedalik/use-react/usePageLeave'

function Example() {
  const [nudges, setNudges] = useState(0)

  const onLeave = useCallback(() => {
    setNudges((c) => c + 1)
  }, [])

  usePageLeave(onLeave)

  return (
    <div>
      <h3>Page leave hint</h3>
      <p>
        Top-edge “leave” events: <strong>{nudges}</strong>
      </p>
      <p style={{ fontSize: 14, opacity: 0.8 }}>Move the cursor quickly upward past the top of the page.</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `usePageLeave`

**Signature:** `usePageLeave(onLeave: () => void): void`

#### Parameters

- **`onLeave`** - Callback invoked for the top-edge `mouseout` case.

#### Returns

**`void`**.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useRef } from 'react'

/**
 * Calls callback when pointer leaves viewport from top edge.
 */
export default function usePageLeave(onLeave: () => void): void {
  const callbackRef = useRef(onLeave)

  useEffect(() => {
    callbackRef.current = onLeave
  }, [onLeave])

  useEffect(() => {
    if (typeof document === 'undefined') return

    const onMouseOut = (event: MouseEvent) => {
      const target = event.relatedTarget as Node | null
      if (!target && event.clientY <= 0) {
        callbackRef.current()
      }
    }

    document.addEventListener('mouseout', onMouseOut)
    return () => document.removeEventListener('mouseout', onMouseOut)
  }, [])
}
```

### JavaScript

```js
import { useEffect, useRef } from 'react'

export default function usePageLeave(onLeave) {
  const callbackRef = useRef(onLeave)

  useEffect(() => {
    callbackRef.current = onLeave
  }, [onLeave])

  useEffect(() => {
    if (typeof document === 'undefined') return

    const onMouseOut = (event) => {
      const target = event.relatedTarget
      if (!target && event.clientY <= 0) {
        callbackRef.current()
      }
    }

    document.addEventListener('mouseout', onMouseOut)
    return () => document.removeEventListener('mouseout', onMouseOut)
  }, [])
}
```
