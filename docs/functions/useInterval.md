---
title: useInterval Hook
sidebar_label: useInterval
category: Async
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useInterval"
---

# useInterval()

<PackageData fn="useInterval" />

## Usage

```tsx
useInterval(() => setCount((value) => value + 1), 1000);
```

## Copy-paste hook

```tsx
import { useEffect, useRef } from "react";

export default function useInterval(callback: () => void, delay: number | null) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay == null) return;
    const intervalId = globalThis.setInterval(() => callbackRef.current(), delay);
    return () => globalThis.clearInterval(intervalId);
  }, [delay]);
}
```
