---
title: Read the previous value
sidebar_label: usePrevious
category: State
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/usePrevious"
---

# usePrevious()

<PackageData fn="usePrevious" />


Last updated: 23/04/2026, 15:56
## Overview

`usePrevious` gives you the value from the previous render.

Great for change comparisons, transition logic, and conditionally triggering effects only when value changes in a specific way.

### What it accepts

- `value`: current value to track.

### What it returns

- Previous value (`undefined` on first render).



`usePrevious` returns the previous render value for a given input. It is helpful when you need to compare the current and previous values without creating re-render loops.

## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useState } from "react";
import usePrevious from "@dedalik/use-react/usePrevious";

function CounterHistoryExample() {
  const [count, setCount] = useState(0);
  const prev = usePrevious(count);

  return (
    <div>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Increment
      </button>
      <p>
        Now: {count}, before: {prev ?? "none"}
      </p>
    </div>
  );
}

export default function CounterHistoryDemo() {
  return <CounterHistoryExample />;
}
```

## API Reference

### `usePrevious`

**Signature:** `usePrevious<T>(value: T): T | undefined`

#### Parameters

1. **`value`** - Current render value to track.

#### Returns

The **previous** render’s `value`. On the first render, returns `undefined`.

## Copy-paste hook

```tsx
import { useEffect, useRef } from 'react'

/**
 * Returns the previous value from the last render cycle.
 */
export default function usePrevious<T>(value: T): T | undefined {
  const previousRef = useRef<T>()

  useEffect(() => {
    previousRef.current = value
  }, [value])

  return previousRef.current
}

export type UsePreviousType = ReturnType<typeof usePrevious>
```

### JavaScript version

```js
import { useEffect, useRef } from "react";

/**
 * Returns the previous value from the last render cycle.
 */
export default function usePrevious(value) {
  const previousRef = useRef();

  useEffect(() => {
    previousRef.current = value;
  }, [value]);

  return previousRef.current;
}
```
## Type declarations

```ts
declare function usePrevious<T>(value: T): T | undefined;
export default usePrevious;
```
