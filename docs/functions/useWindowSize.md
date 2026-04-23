---
title: useWindowSize Hook
sidebar_label: useWindowSize
category: Browser
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useWindowSize"
---

# useWindowSize()

<PackageData fn="useWindowSize" />

## Usage

```tsx
const { width, height } = useWindowSize();
```

## Copy-paste hook

```tsx
import { useEffect, useState } from "react";

const isBrowser = typeof window !== "undefined";

export default function useWindowSize() {
  const [size, setSize] = useState({
    width: isBrowser ? window.innerWidth : 0,
    height: isBrowser ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (!isBrowser) return;
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size;
}
```
