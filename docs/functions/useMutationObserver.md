---
title: useMutationObserver Hook
sidebar_label: useMutationObserver
category: Browser
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useMutationObserver"
---

# useMutationObserver()

<PackageData fn="useMutationObserver" />

## Usage

```tsx
const ref = useRef<HTMLDivElement>(null);
useMutationObserver(ref, () => console.log("changed"));
```

## Copy-paste hook

```tsx
import { RefObject, useEffect } from "react";

export default function useMutationObserver(
  elementRef: RefObject<Node | null>,
  callback: MutationCallback,
  options: MutationObserverInit = { childList: true, subtree: true }
) {
  useEffect(() => {
    const target = elementRef.current;
    if (!target || typeof MutationObserver === "undefined") return;
    const observer = new MutationObserver(callback);
    observer.observe(target, options);
    return () => observer.disconnect();
  }, [callback, elementRef, options]);
}
```
