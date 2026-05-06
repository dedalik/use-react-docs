---
title: Track reduced transparency preference
sidebar_label: usePreferredReducedTransparency
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/usePreferredReducedTransparency.tsx'
description: >-
  usePreferredReducedTransparency from @dedalik/use-react: reacts to reduced transparency preference.
---

# usePreferredReducedTransparency()

<PackageData fn="usePreferredReducedTransparency" />

<HookLiveDemo demo="usePreferredReducedTransparency/basic" title="usePreferredReducedTransparency interactive demo" />

## Overview

`usePreferredReducedTransparency` is implemented as **`useMediaQuery('(prefers-reduced-transparency: reduce)')`**, so it tracks the same accessibility hint as CSS: when **`true`**, users often want fewer layered glass effects, heavy `backdrop-filter` stacks, or translucent overlays that make text harder to read. The hook updates when system settings change and inherits **`useMediaQuery`**’s SSR-safe defaults-use it to swap frosted panels for solid surfaces or lower alpha on scrims without polling `matchMedia` yourself.

### What it accepts

- None.

### What it returns

- **`boolean`** - `true` when reduced transparency is preferred.

## Usage

Swap a frosted panel for a solid surface when the preference is on (no `JSON.stringify`).

```tsx
import usePreferredReducedTransparency from '@dedalik/use-react/usePreferredReducedTransparency'

function Example() {
  const reduceTransparency = usePreferredReducedTransparency()

  return (
    <div
      style={{
        padding: 20,
        borderRadius: 12,
        maxWidth: 420,
        background: reduceTransparency ? '#f1f5f9' : 'rgba(255, 255, 255, 0.55)',
        backdropFilter: reduceTransparency ? undefined : 'blur(12px)',
        border: reduceTransparency ? '1px solid #cbd5e1' : '1px solid rgba(148, 163, 184, 0.5)',
      }}
    >
      <h3 style={{ marginTop: 0 }}>Transparency preference</h3>
      <p style={{ marginBottom: 0 }}>
        <code>(prefers-reduced-transparency: reduce)</code>: <strong>{reduceTransparency ? 'yes' : 'no'}</strong>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `usePreferredReducedTransparency`

**Signature:** `usePreferredReducedTransparency(): boolean`

#### Parameters

None.

#### Returns

**`boolean`** - Whether `(prefers-reduced-transparency: reduce)` matches.

## Copy-paste hook

### TypeScript

```tsx
import useMediaQuery from './useMediaQuery'

/**
 * Returns true when user prefers reduced transparency effects.
 */
export default function usePreferredReducedTransparency(): boolean {
  return useMediaQuery('(prefers-reduced-transparency: reduce)')
}
```

### JavaScript

```js
import useMediaQuery from './useMediaQuery'

export default function usePreferredReducedTransparency() {
  return useMediaQuery('(prefers-reduced-transparency: reduce)')
}
```
