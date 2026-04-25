---
title: Lock body scrolling while active
sidebar_label: useLockBodyScroll
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useLockBodyScroll.tsx'
description: >-
  useLockBodyScroll from @dedalik/use-react: Lock body scrolling while active.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useLockBodyScroll()

<PackageData fn="useLockBodyScroll" />

Last updated: 24/04/2026

## Overview

`useLockBodyScroll` toggles **`document.body.style.overflow`** to **`'hidden'`** while **`locked`** is truthy, snapshotting the previous inline overflow string so cleanup can restore exactly what was there-important when multiple overlays stack or other code also mutates body styles. When **`locked`** flips to **`false`** or the component unmounts, the effect cleanup puts overflow back, re-enabling background scroll; SSR short-circuits because **`document`** is undefined. Pass **`locked={isModalOpen}`** so opening a dialog freezes the page behind it without manual `document.body` bookkeeping.

### What it accepts

- **`locked`** (optional) - When **`true`**, set `body` overflow hidden. Default **`true`**.

### What it returns

- Nothing (**`void`**) - side effects only.

## Usage

Modal open state drives **`locked`**; long page behind proves scroll lock (no `JSON.stringify`).

```tsx
import { useState } from 'react'
import useLockBodyScroll from '@dedalik/use-react/useLockBodyScroll'

function Example() {
  const [open, setOpen] = useState(false)
  useLockBodyScroll(open)

  return (
    <div>
      <h3>Body scroll lock</h3>
      <button type='button' onClick={() => setOpen(true)}>
        Open overlay
      </button>
      <div style={{ marginTop: 16, lineHeight: 1.7 }}>
        {Array.from({ length: 24 }, (_, index) => (
          <p key={index}>Scrollable copy block {index + 1} - try with overlay open.</p>
        ))}
      </div>

      {open ? (
        <div
          role='dialog'
          aria-modal='true'
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 20,
              maxWidth: 360,
              boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
            }}
          >
            <p style={{ marginTop: 0 }}>Background scroll should be locked while this is open.</p>
            <button type='button' onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useLockBodyScroll`

**Signature:** `useLockBodyScroll(locked?: boolean): void`

#### Parameters

- **`locked`** (`boolean`, optional) - Apply `overflow: hidden` on `document.body`. Default **`true`**.

#### Returns

**`void`** - No return value.

## Copy-paste hook

### TypeScript

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

### JavaScript

```js
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
