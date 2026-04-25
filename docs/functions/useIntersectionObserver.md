---
title: Track element visibility in viewport
sidebar_label: useIntersectionObserver
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useIntersectionObserver.tsx'
description: >-
  useIntersectionObserver from @dedalik/use-react: Track element visibility in
  viewport. TypeScript, tree-shakable import, examples, SSR notes.
---

# useIntersectionObserver()

<PackageData fn="useIntersectionObserver" />

Last updated: 24/04/2026

## Overview

`useIntersectionObserver` keeps the latest **`IntersectionObserverEntry`** (or **`null`**) for a ref-mounted element, forwarding **`root`**, **`rootMargin`**, **`threshold`**, and other **`IntersectionObserverInit`** fields and adding **`freezeOnceVisible`**: when **`true`**, the hook stops re-subscribing after the first intersecting pass so you can “fire once” lazy load or analytics without extra effect churn. The effect depends on the current entry’s **`isIntersecting`** for freeze logic-**memoize the `options` object** at the call site if you pass inline objects every render. If **`IntersectionObserver`** is missing, the effect is a no-op and **`entry`** stays **`null`**.

### What it accepts

- **`elementRef`** - Target node to **observe**.
- **`options`** - `IntersectionObserverInit` plus optional **`freezeOnceVisible`**.

### What it returns

- **`IntersectionObserverEntry | null`** - Latest entry from the observer.

## Usage

`useMemo`d options: **threshold**, **rootMargin**, **`freezeOnceVisible`**.

```tsx
import { useMemo, useRef } from 'react'
import useIntersectionObserver from '@dedalik/use-react/useIntersectionObserver'

function Example() {
  const ref = useRef<HTMLDivElement>(null)
  const options = useMemo(
    () => ({
      root: null,
      rootMargin: '0px 0px -40% 0px',
      threshold: [0, 0.5, 1],
      freezeOnceVisible: true,
    }),
    [],
  )
  const entry = useIntersectionObserver(ref, options)

  return (
    <div>
      <h3>Visibility</h3>
      <p style={{ minHeight: '50vh' }}>Scroll down…</p>
      <div
        ref={ref}
        style={{ padding: 24, background: entry?.isIntersecting ? '#d1fae5' : '#f1f5f9', borderRadius: 8 }}
      >
        <p style={{ marginTop: 0 }}>
          Intersection ratio: <strong>{entry ? entry.intersectionRatio.toFixed(2) : '-'}</strong>
        </p>
        <p style={{ marginBottom: 0 }}>isIntersecting: {entry?.isIntersecting ? 'yes' : 'no'}</p>
      </div>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useIntersectionObserver`

**Signature:** `useIntersectionObserver(elementRef, options?: UseIntersectionObserverOptions): IntersectionObserverEntry | null`

#### Parameters

- **`elementRef`** (`RefObject<Element | null>`) - Observed element.
- **`options`** - `UseIntersectionObserverOptions` (`IntersectionObserverInit` + **`freezeOnceVisible?`**). Default **`{}`**.

#### Returns

**`IntersectionObserverEntry | null`**.

## Copy-paste hook

### TypeScript

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

### JavaScript

```js
import { useEffect, useState } from 'react'

export default function useIntersectionObserver(elementRef, options = {}) {
  const [entry, setEntry] = useState(null)
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
