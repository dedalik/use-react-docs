---
title: Track element visibility in viewport
sidebar_label: useIntersectionObserver
category: Browser
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useIntersectionObserver"
---

# useIntersectionObserver()

<PackageData fn="useIntersectionObserver" />


Last updated: 23/04/2026, 15:56
## Overview

`useIntersectionObserver` observes whether an element is visible inside a viewport or container.

This is a foundational hook for lazy loading, infinite scrolling, and in-view animations.

### What it accepts

- `elementRef`: target element ref.
- `options` (optional): standard intersection observer options plus `freezeOnceVisible`.

### What it returns

- Latest `IntersectionObserverEntry` (or `null` before first observation).


## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useRef } from "react";
import useIntersectionObserver from "@dedalik/use-react/useIntersectionObserver";

function SentinelExample() {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, { threshold: 0.5 });

  return (
    <div style={{ height: "140vh" }}>
      <p>Scroll until the box is half visible.</p>
      <div ref={ref} style={{ height: 80, background: "#eee" }}>
        {entry?.isIntersecting ? "Visible" : "Not visible"}
      </div>
    </div>
  );
}

export default function SentinelDemo() {
  return <SentinelExample />;
}
```

## API Reference

### `useIntersectionObserver`

**Signature:** `useIntersectionObserver(elementRef, options?): IntersectionObserverEntry | null`

#### Parameters

1. **`elementRef`** - Ref to the element to observe.
2. **`options`** - Standard `IntersectionObserverInit` plus optional `freezeOnceVisible` to stop observing after first intersection.

#### Returns

Latest `IntersectionObserverEntry`, or `null` before the first callback.

## Copy-paste hook

```tsx
import { RefObject, useEffect, useState } from 'react'

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

export default function useIntersectionObserver(
  elementRef: RefObject<Element | null>,
  options: UseIntersectionObserverOptions = {},
): IntersectionObserverEntry | null {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const { freezeOnceVisible = false, ...observerOptions } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const isFrozen = freezeOnceVisible && entry?.isIntersecting
    if (isFrozen) return

    const observer = new IntersectionObserver(([nextEntry]) => {
      setEntry(nextEntry)
    }, observerOptions)

    observer.observe(element)
    return () => observer.disconnect()
  }, [elementRef, entry?.isIntersecting, freezeOnceVisible, observerOptions])

  return entry
}
```

### JavaScript version

```js
import { useEffect, useState } from "react";

export default function useIntersectionObserver(
  elementRef,
  options = {}
) {
  const [entry, setEntry] = useState(null);

  const { freezeOnceVisible = false, ...observerOptions } = options;

  useEffect(() => {
    const element = elementRef.current;

    if (!element || typeof IntersectionObserver === 'undefined') return;

    const isFrozen = freezeOnceVisible && entry?.isIntersecting;

    if (isFrozen) return;

    const observer = new IntersectionObserver(([nextEntry]) => {
      setEntry(nextEntry);
    }, observerOptions);
    observer.observe(element);
    return () => observer.disconnect();
  }, [
    elementRef,
    entry?.isIntersecting,
    freezeOnceVisible,
    observerOptions,
  ]);

  return entry;
}
```
