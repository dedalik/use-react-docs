---
title: Run a callback after a delay
sidebar_label: useTimeout
category: Async
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useTimeout"
---

# useTimeout()

<PackageData fn="useTimeout" />


Last updated: 23/04/2026, 15:56
## Overview

`useTimeout` runs a callback once after a configured delay.

It provides safe timeout lifecycle handling and avoids stale callback behavior in React components.

### What it accepts

- `callback`: function to run after delay.
- `delay`: timeout in milliseconds (`null` disables timeout).

### What it returns

- This hook returns nothing.


## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useState } from "react";
import useTimeout from "@dedalik/use-react/useTimeout";

function ToastExample() {
  const [show, setShow] = useState(false);

  useTimeout(
    () => {
      setShow(false);
    },
    show ? 2000 : null,
  );

  return (
    <div>
      <button type="button" onClick={() => setShow(true)}>
        Show message 2s
      </button>
      {show ? <p>Auto-hides...</p> : null}
    </div>
  );
}

export default function ToastDemo() {
  return <ToastExample />;
}
```

## API Reference

### `useTimeout`

**Signature:** `useTimeout(callback: () => void, delay: number | null): void`

#### Parameters

1. **`callback`** - Runs once after `delay` ms when `delay` is a number.
2. **`delay`** - Milliseconds, or `null` to skip scheduling.

#### Returns

Nothing (`void`).

## Copy-paste hook

```tsx
import { useEffect, useRef } from 'react'

export default function useTimeout(callback: () => void, delay: number | null) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (delay == null) return

    const timeoutId = globalThis.setTimeout(() => {
      callbackRef.current()
    }, delay)

    return () => globalThis.clearTimeout(timeoutId)
  }, [delay])
}
```

### JavaScript version

```js
import { useEffect, useRef } from "react";

export default function useTimeout(callback, delay) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay == null) return;

    const timeoutId = globalThis.setTimeout(() => {
      callbackRef.current();
    }, delay);
    return () => globalThis.clearTimeout(timeoutId);
  }, [delay]);
}
```
