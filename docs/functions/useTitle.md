---
title: useTitle Hook
sidebar_label: useTitle
category: Browser
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useTitle"
---

# useTitle()

<PackageData fn="useTitle" />

## Usage

```tsx
useTitle("Dashboard");
```

## Copy-paste hook

```tsx
import { useEffect } from "react";

export default function useTitle(title: string, restoreOnUnmount = false) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const previousTitle = document.title;
    document.title = title;
    if (!restoreOnUnmount) return;
    return () => {
      document.title = previousTitle;
    };
  }, [restoreOnUnmount, title]);
}
```
