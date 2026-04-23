---
title: Limit update frequency
sidebar_label: useThrottle
category: State
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useThrottle"
---

# useThrottle()

<PackageData fn="useThrottle" />


Last updated: 23/04/2026, 15:56
## Overview

`useThrottle` limits how often a rapidly changing value is updated.

Use it for scroll, resize, and high-frequency events when debouncing is too delayed and you still need periodic updates.

### What it accepts

- `value`: input value to throttle.
- `delay` (optional): interval in milliseconds.

### What it returns

- Throttled value with the same type as input.


## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useState } from "react";
import useThrottle from "@dedalik/use-react/useThrottle";

function ThrottledSearchExample() {
  const [query, setQuery] = useState("");
  const throttled = useThrottle(query, 500);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <p>Throttled: {throttled}</p>
    </div>
  );
}

export default function ThrottledSearchDemo() {
  return <ThrottledSearchExample />;
}
```

## API Reference

### `useThrottle`

**Signature:** `useThrottle<T>(value: T, delay?: number): T`

#### Parameters

1. **`value`** - Frequently changing input.
2. **`delay`** - Minimum spacing between propagated updates (default `500`).

#### Returns

Throttled value that updates at most according to the throttle schedule.

## Copy-paste hook

```tsx
import { useEffect, useRef, useState } from 'react'

export default function useThrottle<T>(value: T, delay = 500): T {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastExecuted = useRef(0)

  useEffect(() => {
    const now = Date.now()
    const remaining = delay - (now - lastExecuted.current)

    if (remaining <= 0) {
      lastExecuted.current = now
      setThrottledValue(value)
      return
    }

    const timeoutId = globalThis.setTimeout(() => {
      lastExecuted.current = Date.now()
      setThrottledValue(value)
    }, remaining)

    return () => globalThis.clearTimeout(timeoutId)
  }, [delay, value])

  return throttledValue
}
```

### JavaScript version

```js
import { useEffect, useRef, useState } from "react";

export default function useThrottle(value, delay = 500) {
  const [throttledValue, setThrottledValue] = useState(value);

  const lastExecuted = useRef(0);

  useEffect(() => {
    const now = Date.now();

    const remaining = delay - (now - lastExecuted.current);

    if (remaining <= 0) {
      lastExecuted.current = now;
      setThrottledValue(value);
      return;
    }

    const timeoutId = globalThis.setTimeout(() => {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    }, remaining);
    return () => globalThis.clearTimeout(timeoutId);
  }, [delay, value]);

  return throttledValue;
}
```
