---
title: useResizeObserver Hook
sidebar_label: useResizeObserver
category: Browser
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useResizeObserver"
---

# useResizeObserver()

<PackageData fn="useResizeObserver" />

## Usage

```tsx
const ref = useRef<HTMLDivElement>(null);
const { width, height } = useResizeObserver(ref);
```

## Copy-paste hook

```tsx
import { RefObject, useEffect, useState } from "react";

export default function useResizeObserver(targetRef: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const target = targetRef.current;
    if (!target || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetRef]);

  return size;
}
```
