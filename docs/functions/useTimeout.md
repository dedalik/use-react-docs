---
title: useTimeout Hook
sidebar_label: useTimeout
category: Async
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useTimeout"
---

# useTimeout()

<PackageData fn="useTimeout" />

## Usage

```tsx
useTimeout(() => setVisible(false), 2000);
```

## Copy-paste hook

```tsx
import { useEffect, useRef } from "react";

export default function useTimeout(callback: () => void, delay: number | null) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay == null) return;
    const timeoutId = globalThis.setTimeout(() => callbackRef.current(), delay);
    return () => globalThis.clearTimeout(timeoutId);
  }, [delay]);
}
```
