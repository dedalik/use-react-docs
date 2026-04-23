---
title: Schedule state updates with requestAnimationFrame
sidebar_label: useRafState
category: Performance
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useRafState'
description: >-
  useRafState from @dedalik/use-react: Schedule state updates with
  requestAnimationFrame. TypeScript, tree-shakable import, examples, SSR notes.
---

# useRafState()

<PackageData fn="useRafState" />


Last updated: 23/04/2026, 15:56
## Overview

`useRafState` updates state in `requestAnimationFrame` instead of immediately.

It helps smooth frequent UI updates driven by pointer movement, scrolling, or animation loops.

### What it accepts

- `initialState`: initial value for state.

### What it returns

- `[state, setState]` tuple with RAF-scheduled updates.


## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useState } from "react";
import useRafState from "@dedalik/use-react/useRafState";

function SmoothCounterExample() {
  const [count, setCount] = useRafState(0);

  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        RAF increment
      </button>
    </div>
  );
}

export default function SmoothCounterDemo() {
  return <SmoothCounterExample />;
}
```

## API Reference

### `useRafState`

**Signature:** `useRafState<T>(initialState: T): [T, React.Dispatch<React.SetStateAction<T>>]`

#### Parameters

1. **`initialState`** - Initial state (same as `useState`).

#### Returns

Tuple `[state, setState]` where updates are scheduled via `requestAnimationFrame` in the browser.

## Copy-paste hook

```tsx
import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'

type SetRafState<T> = Dispatch<SetStateAction<T>>

export default function useRafState<T>(initialState: T): [T, SetRafState<T>] {
  const frameRef = useRef<number>()
  const [state, setState] = useState(initialState)

  const setRafState: SetRafState<T> = useCallback((value) => {
    if (typeof window === 'undefined') {
      setState(value)
      return
    }

    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current)
    }

    frameRef.current = window.requestAnimationFrame(() => {
      setState(value)
    })
  }, [])

  return [state, setRafState]
}
```

### JavaScript version

```js
import { useCallback, useRef, useState } from "react";

export default function useRafState(initialState) {
  const frameRef = useRef();

  const [state, setState] = useState(initialState);

  const setRafState = useCallback((value) => {
    if (typeof window === 'undefined') {
      setState(value);
      return;
    }

    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
    }
    frameRef.current = window.requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  return [state, setRafState];
}
```
