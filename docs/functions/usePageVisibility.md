---
title: usePageVisibility Hook
sidebar_label: usePageVisibility
category: Browser
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/usePageVisibility"
---

# usePageVisibility()

<PackageData fn="usePageVisibility" />

## Usage

```tsx
const isVisible = usePageVisibility();
```

## Copy-paste hook

```tsx
import { useEffect, useState } from "react";

const getVisibility = () => (typeof document === "undefined" ? true : !document.hidden);

export default function usePageVisibility() {
  const [isVisible, setIsVisible] = useState<boolean>(() => getVisibility());

  useEffect(() => {
    if (typeof document === "undefined") return;
    const onVisibilityChange = () => setIsVisible(getVisibility());
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return isVisible;
}
```
