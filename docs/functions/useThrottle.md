---
title: useThrottle Hook
sidebar_label: useThrottle
category: State
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useThrottle"
---

# useThrottle()

<PackageData fn="useThrottle" />

## Usage

```tsx
const throttledQuery = useThrottle(query, 300);
```

## Copy-paste hook

```tsx
import { useEffect, useRef, useState } from "react";

export default function useThrottle<T>(value: T, delay = 500): T {
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
