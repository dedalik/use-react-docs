---
title: Lock body scrolling while active
sidebar_label: useLockBodyScroll
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useLockBodyScroll'
description: >-
  useLockBodyScroll from @dedalik/use-react: Lock body scrolling while active.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useLockBodyScroll()

<PackageData fn="useLockBodyScroll" />


Last updated: 23/04/2026, 15:56
## Overview

`useLockBodyScroll` prevents page scrolling while a UI state is active.

Typical use case is modal or drawer overlays where background scrolling should be disabled to keep focus on foreground content.

### What it accepts

- `locked` (optional): whether scroll lock should be enabled.

### What it returns

- This hook returns nothing.


## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useState } from "react";
import useLockBodyScroll from "@dedalik/use-react/useLockBodyScroll";

function ModalScrollLockExample() {
  const [open, setOpen] = useState(false);

  useLockBodyScroll(open);

  return (
    <div>
      <button type="button" onClick={() => setOpen((v) => !v)}>
        {open ? "Close overlay" : "Open overlay"}
      </button>
      {open ? (
        <div
          role="dialog"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <div style={{ background: "#fff", padding: 24 }}>Scroll is locked on the body</div>
        </div>
      ) : null}
    </div>
  );
}

export default function ModalScrollLockDemo() {
  return <ModalScrollLockExample />;
}
```

## API Reference

### `useLockBodyScroll`

**Signature:** `useLockBodyScroll(locked?: boolean): void`

#### Parameters

1. **`locked`** - When `true` (default), sets `document.body.style.overflow = "hidden"` and restores the previous value on cleanup.

#### Returns

Nothing (`void`).

## Copy-paste hook

```tsx
import { useEffect } from 'react'

export default function useLockBodyScroll(locked = true) {
  useEffect(() => {
    if (typeof document === 'undefined' || !locked) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [locked])
}
```

### JavaScript version

```js
import { useEffect } from "react";

export default function useLockBodyScroll(locked = true) {
  useEffect(() => {
    if (typeof document === 'undefined' || !locked) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [locked]);
}
```
