---
title: Track window width and height
sidebar_label: useWindowSize
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useWindowSize'
description: >-
  useWindowSize from @dedalik/use-react: Track window width and height.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useWindowSize()

<PackageData fn="useWindowSize" />


Last updated: 23/04/2026, 15:56
## Overview

`useWindowSize` tracks the browser viewport width and height.

This hook is useful for responsive rendering decisions and layout behavior that depends on viewport dimensions.

### What it accepts

- No arguments.

### What it returns

- Object with current `width` and `height`.


## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import useWindowSize from "@dedalik/use-react/useWindowSize";

function ViewportReadoutExample() {
  const { width, height } = useWindowSize();

  return (
    <p>
      {width} × {height}
    </p>
  );
}

export default function ViewportReadoutDemo() {
  return <ViewportReadoutExample />;
}
```

## API Reference

### `useWindowSize`

**Signature:** `useWindowSize(): { width: number; height: number }`

#### Parameters

None.

#### Returns

Latest inner width and height of the `window` (zeros when `window` is unavailable).

## Copy-paste hook

```tsx
import { useEffect, useState } from 'react'

export interface WindowSize {
  width: number
  height: number
}

const isBrowser = typeof window !== 'undefined'

export default function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>(() => ({
    width: isBrowser ? window.innerWidth : 0,
    height: isBrowser ? window.innerHeight : 0,
  }))

  useEffect(() => {
    if (!isBrowser) return

    const onResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return size
}
```

### JavaScript version

```js
import { useEffect, useState } from "react";

const isBrowser = typeof window !== 'undefined';
export default function useWindowSize() {
  const [size, setSize] = useState(() => ({
    width: isBrowser ? window.innerWidth : 0,
    height: isBrowser ? window.innerHeight : 0,
  }));

  useEffect(() => {
    if (!isBrowser) return;

    const onResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return size;
}
```
