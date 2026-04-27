---
title: Track element viewport visibility
sidebar_label: useElementVisibility
category: Elements
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useElementVisibility.tsx'
description: >-
  useElementVisibility from @dedalik/use-react: observe if element intersects viewport.
---

# useElementVisibility()

<PackageData fn="useElementVisibility" />
<HookLiveDemo demo="useElementVisibility/basic" title="Live demo: useElementVisibility" />

## Overview

`useElementVisibility` wraps `IntersectionObserver` to expose a boolean that reflects whether `target` is currently intersecting its observed root (the browser viewport by default, or a scroll container when you pass `options.root`). You can tune sensitivity with `threshold`, `rootMargin`, and related `IntersectionObserverInit` fields-useful for lazy rendering, infinite scroll sentinels, “read more” affordances, and analytics-style “element became visible” triggers without manual scroll math.

### What it accepts

- `target: RefObject<HTMLElement | null>` - Element to observe.
- `options?: IntersectionObserverInit` - Optional observer tuning (`root`, `rootMargin`, `threshold`, ...).

### What it returns

- `visible`: `true` when the latest intersection entry is intersecting. Type `boolean`.

## Usage

Real-world example: detect when a “load more” sentinel becomes visible inside a scroll container, using `options.root` + `threshold`.

```tsx
import { useMemo, useRef, useState } from 'react'
import useElementVisibility from '@dedalik/use-react/useElementVisibility'

function Example() {
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const [scrollRoot, setScrollRoot] = useState<HTMLDivElement | null>(null)

  const ioOptions = useMemo<IntersectionObserverInit>(
    () => ({
      root: scrollRoot ?? undefined,
      rootMargin: '0px',
      threshold: 0.75,
    }),
    [scrollRoot],
  )

  const visible = useElementVisibility(sentinelRef, ioOptions)

  return (
    <div>
      <h3>Infinite scroll sentinel</h3>
      <p>Sentinel visible (75%+ inside scroll root): {visible ? 'yes' : 'no'}</p>

      <div
        ref={setScrollRoot}
        style={{
          height: 220,
          overflow: 'auto',
          border: '1px solid #ddd',
          borderRadius: 12,
          background: '#fafafa',
        }}
      >
        <div style={{ padding: 16, height: 900 }}>
          <p>Scroll down until the sentinel is mostly visible inside this panel.</p>
          <div style={{ height: 520 }} />
          <div
            ref={sentinelRef}
            style={{
              padding: 12,
              borderRadius: 12,
              border: '1px solid #ccc',
              background: visible ? '#ecfdf5' : 'white',
            }}
          >
            Load more… (demo)
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useElementVisibility`

**Signature:** `useElementVisibility(target: RefObject<HTMLElement | null>, options?: IntersectionObserverInit): boolean`

#### Parameters

1. **`target`** (`RefObject<HTMLElement | null>`) - Element to observe.
2. **`options?`** (optional `IntersectionObserverInit`) - Observer tuning; most commonly `root` (scroll container), `rootMargin`, and `threshold`.

#### Returns

`visible` - `true` when the latest intersection entry is intersecting. (`boolean`).

## Copy-paste hook

### TypeScript

```tsx
import { RefObject, useEffect, useState } from 'react'

/**
 * Tracks whether element intersects viewport.
 */
export default function useElementVisibility(
  target: RefObject<HTMLElement | null>,
  options?: IntersectionObserverInit,
): boolean {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = target.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      setVisible(Boolean(entry?.isIntersecting))
    }, options)

    observer.observe(node)
    return () => observer.disconnect()
  }, [options, target])

  return visible
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

export default function useElementVisibility(target, options) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = target.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      setVisible(Boolean(entry?.isIntersecting))
    }, options)

    observer.observe(node)
    return () => observer.disconnect()
  }, [options, target])

  return visible
}
```
