---
title: useRafState Hook
sidebar_label: useRafState
category: Performance
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useRafState"
---

# useRafState()

<PackageData fn="useRafState" />

## Usage

```tsx
const [state, setState] = useRafState(0);
```

## Copy-paste hook

```tsx
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";

type SetRafState<T> = Dispatch<SetStateAction<T>>;

export default function useRafState<T>(initialState: T): [T, SetRafState<T>] {
  const frameRef = useRef<number>();
  const [state, setState] = useState(initialState);

  const setRafState: SetRafState<T> = useCallback((value) => {
    if (typeof window === "undefined") {
      setState(value);
      return;
    }

    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => setState(value));
  }, []);

  return [state, setRafState];
}
```
