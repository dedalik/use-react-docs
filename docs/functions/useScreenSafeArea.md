---
title: Read safe-area insets
sidebar_label: useScreenSafeArea
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useScreenSafeArea.tsx'
description: >-
  useScreenSafeArea from @dedalik/use-react: reads top/right/bottom/left safe-area values.
---

# useScreenSafeArea()

<PackageData fn="useScreenSafeArea" />

<HookLiveDemo demo="useScreenSafeArea/basic" />

## Overview

`useScreenSafeArea` parses **`getComputedStyle(document.documentElement)`** for env-style variables **`--sat`**, **`--sar`**, **`--sab`**, **`--sal`** (top/right/bottom/left safe-area tokens some stacks inject) and falls back to the root’s **`padding-*`** strings converted to numbers, giving you pixel-ish insets for notching home indicators on phones or MacBook camera housing layouts. It re-reads on **`resize`** and **`orientationchange`** so rotating a device or entering split-screen updates padding math you might apply to fixed footers or full-bleed modals; SSR returns all zeros because **`document`** is absent until hydration.

### What it accepts

- None.

### What it returns

- **`top`**, **`right`**, **`bottom`**, **`left`** - Parsed inset values in CSS pixels (`number`).

## Usage

Pad a fixed footer using the bottom inset and list all edges (no `JSON.stringify`).

```tsx
import useScreenSafeArea from '@dedalik/use-react/useScreenSafeArea'

function Example() {
  const { top, right, bottom, left } = useScreenSafeArea()

  return (
    <div>
      <h3>Safe area</h3>
      <ul>
        <li>
          top: <strong>{top}px</strong>
        </li>
        <li>
          right: <strong>{right}px</strong>
        </li>
        <li>
          bottom: <strong>{bottom}px</strong>
        </li>
        <li>
          left: <strong>{left}px</strong>
        </li>
      </ul>
      <footer
        style={{
          marginTop: 24,
          padding: `12px 16px calc(12px + ${bottom}px)`,
          background: '#0f172a',
          color: '#e2e8f0',
          borderRadius: 8,
        }}
      >
        Fixed-style bar - extra bottom padding follows the safe-area inset.
      </footer>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useScreenSafeArea`

**Signature:** `useScreenSafeArea(): ScreenSafeArea`

#### Parameters

None.

#### Returns

**`ScreenSafeArea`** object:

- **`top`**, **`right`**, **`bottom`**, **`left`** (`number`) - From `--sat` / `--sar` / `--sab` / `--sal` or root padding fallbacks.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export interface ScreenSafeArea {
  top: number
  right: number
  bottom: number
  left: number
}

function toPixels(value: string): number {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function readSafeArea(): ScreenSafeArea {
  if (typeof document === 'undefined') return { top: 0, right: 0, bottom: 0, left: 0 }

  const root = document.documentElement
  const styles = getComputedStyle(root)

  return {
    top: toPixels(styles.getPropertyValue('--sat') || styles.getPropertyValue('padding-top')),
    right: toPixels(styles.getPropertyValue('--sar') || styles.getPropertyValue('padding-right')),
    bottom: toPixels(styles.getPropertyValue('--sab') || styles.getPropertyValue('padding-bottom')),
    left: toPixels(styles.getPropertyValue('--sal') || styles.getPropertyValue('padding-left')),
  }
}

/**
 * Reads screen safe-area inset values from computed styles.
 */
export default function useScreenSafeArea(): ScreenSafeArea {
  const [safeArea, setSafeArea] = useState<ScreenSafeArea>(() => readSafeArea())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const update = () => setSafeArea(readSafeArea())
    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  return safeArea
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

function toPixels(value) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function readSafeArea() {
  if (typeof document === 'undefined') return { top: 0, right: 0, bottom: 0, left: 0 }

  const root = document.documentElement
  const styles = getComputedStyle(root)

  return {
    top: toPixels(styles.getPropertyValue('--sat') || styles.getPropertyValue('padding-top')),
    right: toPixels(styles.getPropertyValue('--sar') || styles.getPropertyValue('padding-right')),
    bottom: toPixels(styles.getPropertyValue('--sab') || styles.getPropertyValue('padding-bottom')),
    left: toPixels(styles.getPropertyValue('--sal') || styles.getPropertyValue('padding-left')),
  }
}

export default function useScreenSafeArea() {
  const [safeArea, setSafeArea] = useState(() => readSafeArea())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const update = () => setSafeArea(readSafeArea())
    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  return safeArea
}
```
