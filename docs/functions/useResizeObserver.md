---
title: Track element size changes
sidebar_label: useResizeObserver
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useResizeObserver'
description: >-
  useResizeObserver from @dedalik/use-react: Track element size changes.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useResizeObserver()

<PackageData fn="useResizeObserver" />


Last updated: 23/04/2026, 15:56
## Overview

`useResizeObserver` tracks element size changes using the Resize Observer API.

Use it for responsive components that depend on actual element dimensions instead of viewport size.

### What it accepts

- `targetRef`: element ref to observe.

### What it returns

- Object with `width` and `height` of observed element.


## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useRef } from "react";
import useResizeObserver from "@dedalik/use-react/useResizeObserver";

function MeasuredBoxExample() {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useResizeObserver(ref);

  return (
    <div ref={ref} style={{ resize: "both", overflow: "auto", border: "1px solid #ccc", padding: 8 }}>
      <p>
        {Math.round(width)} × {Math.round(height)} px
      </p>
    </div>
  );
}

export default function MeasuredBoxDemo() {
  return <MeasuredBoxExample />;
}
```

## API Reference

### `useResizeObserver`

**Signature:** `useResizeObserver(targetRef): { width: number; height: number }`

#### Parameters

1. **`targetRef`** - Ref to the element whose content box size should be tracked.

#### Returns

Object with numeric `width` and `height` from the latest `ResizeObserver` entry.

## Copy-paste hook

```tsx
import { RefObject, useEffect, useState } from 'react'

export interface UseResizeObserverSize {
  width: number
  height: number
}

export default function useResizeObserver(targetRef: RefObject<HTMLElement | null>): UseResizeObserverSize {
  const [size, setSize] = useState<UseResizeObserverSize>({ width: 0, height: 0 })

  useEffect(() => {
    const target = targetRef.current
    if (!target || typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return

      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      })
    })

    observer.observe(target)
    return () => observer.disconnect()
  }, [targetRef])

  return size
}
```

### JavaScript version

```js
import { useEffect, useState } from "react";

export default function useResizeObserver(targetRef) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const target = targetRef.current;

    if (!target || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) return;
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetRef]);

  return size;
}
```
