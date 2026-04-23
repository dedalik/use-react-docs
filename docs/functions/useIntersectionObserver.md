---
title: useIntersectionObserver Hook
sidebar_label: useIntersectionObserver
category: Browser
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useIntersectionObserver"
---

# useIntersectionObserver()

<PackageData fn="useIntersectionObserver" />

## Usage

```tsx
const ref = useRef<HTMLDivElement>(null);
const entry = useIntersectionObserver(ref, { threshold: 0.5 });
```

## Copy-paste hook

```tsx
import { RefObject, useEffect, useState } from "react";

export default function useIntersectionObserver(
  elementRef: RefObject<Element | null>,
  options: IntersectionObserverInit & { freezeOnceVisible?: boolean } = {}
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const { freezeOnceVisible = false, ...observerOptions } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const isFrozen = freezeOnceVisible && entry?.isIntersecting;
    if (isFrozen) return;

    const observer = new IntersectionObserver(([nextEntry]) => setEntry(nextEntry), observerOptions);
    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, entry?.isIntersecting, freezeOnceVisible, observerOptions]);

  return entry;
}
```
