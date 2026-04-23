---
title: useLockBodyScroll Hook
sidebar_label: useLockBodyScroll
category: Browser
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useLockBodyScroll"
---

# useLockBodyScroll()

<PackageData fn="useLockBodyScroll" />

## Usage

```tsx
useLockBodyScroll(isModalOpen);
```

## Copy-paste hook

```tsx
import { useEffect } from "react";

export default function useLockBodyScroll(locked = true) {
  useEffect(() => {
    if (typeof document === "undefined" || !locked) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [locked]);
}
```
