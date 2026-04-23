---
title: Handle clicks outside an element
sidebar_label: useClickOutside
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useClickOutside'
description: >-
  useClickOutside from @dedalik/use-react: Handle clicks outside an element.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useClickOutside()

<PackageData fn="useClickOutside" />


Last updated: 23/04/2026, 15:56
## Overview

`useClickOutside` detects clicks or touches outside one element (or multiple refs).

This is a common building block for dropdowns, popovers, and modals. It prevents repetitive event wiring in every component.

### What it accepts

- `refs`: one `ref` or an array of refs to track as the inside area.
- `handler`: callback fired when interaction happens outside tracked refs.

### What it returns

- This hook returns nothing. It attaches and cleans up listeners automatically.


## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useRef, useState } from "react";
import useClickOutside from "@dedalik/use-react/useClickOutside";

function OutsideMenuExample() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useClickOutside(panelRef, () => setOpen(false));

  return (
    <div>
      <button type="button" onClick={() => setOpen((v) => !v)}>
        Toggle panel
      </button>
      {open ? (
        <div ref={panelRef} style={{ marginTop: 8, padding: 12, border: "1px solid #ccc" }}>
          Click outside to close
        </div>
      ) : null}
    </div>
  );
}

export default function OutsideMenuDemo() {
  return <OutsideMenuExample />;
}
```

## API Reference

### `useClickOutside`

**Signature:** `useClickOutside(refs, handler): void`

#### Parameters

1. **`refs`** - A single `RefObject<HTMLElement | null>` or an array of refs. Clicks inside any of these nodes are ignored.
2. **`handler`** - `(event: MouseEvent | TouchEvent) => void`, called when the user interacts outside all refs.

#### Returns

Nothing (`void`). Listeners are registered and cleaned up inside the hook.

## Copy-paste hook

```tsx
import { RefObject, useEffect, useRef } from 'react'

type ElementRef = RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[]

export default function useClickOutside(refs: ElementRef, handler: (event: MouseEvent | TouchEvent) => void) {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    if (typeof document === 'undefined') return
    const refList = Array.isArray(refs) ? refs : [refs]

    const onPointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node
      const isInside = refList.some((ref) => ref.current?.contains(target))
      if (!isInside) {
        handlerRef.current(event)
      }
    }

    document.addEventListener('mousedown', onPointer)
    document.addEventListener('touchstart', onPointer)

    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('touchstart', onPointer)
    }
  }, [refs])
}
```

### JavaScript version

```js
import { useEffect, useRef } from "react";

export default function useClickOutside(refs, handler) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const refList = Array.isArray(refs) ? refs : [refs];

    const onPointer = (event) => {
      const target = event.target;

      const isInside = refList.some((ref) =>
        ref.current?.contains(target)
      );

      if (!isInside) {
        handlerRef.current(event);
      }
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('touchstart', onPointer);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('touchstart', onPointer);
    };
  }, [refs]);
}
```
