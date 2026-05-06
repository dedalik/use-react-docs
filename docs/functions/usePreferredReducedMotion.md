---
title: Track reduced-motion preference
sidebar_label: usePreferredReducedMotion
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/usePreferredReducedMotion.tsx'
description: >-
  usePreferredReducedMotion from @dedalik/use-react: true when prefers-reduced-motion is reduce.
---

# usePreferredReducedMotion()

<PackageData fn="usePreferredReducedMotion" />

<HookLiveDemo demo="usePreferredReducedMotion/basic" title="usePreferredReducedMotion interactive demo" />

## Overview

`usePreferredReducedMotion` delegates to **`useMediaQuery('(prefers-reduced-motion: reduce)')`**, so it tracks the same accessibility signal as CSS with a live `matchMedia` subscription, SSR-safe defaults from `useMediaQuery`, and updates when the user enables “reduce motion” in macOS, Windows, or mobile accessibility settings. When **`true`**, you should skip large parallax transitions, autoplaying carousels, or decorative CSS animations; when **`false`**, you can still keep subtle, non-vestibular-triggering motion if your design system allows.

### What it accepts

- None.

### What it returns

- **`boolean`** - `true` if the user prefers reduced motion.

## Usage

Conditionally render a CSS animation class on a badge (no `JSON.stringify`).

```tsx
import usePreferredReducedMotion from '@dedalik/use-react/usePreferredReducedMotion'

function Example() {
  const reduceMotion = usePreferredReducedMotion()

  return (
    <div>
      <h3>Motion preference</h3>
      <p>
        <code>(prefers-reduced-motion: reduce)</code>: <strong>{reduceMotion ? 'yes' : 'no'}</strong>
      </p>
      <span
        style={{
          display: 'inline-block',
          padding: '6px 12px',
          borderRadius: 999,
          background: '#e0e7ff',
          animation: reduceMotion ? undefined : 'pulse-soft 1.6s ease-in-out infinite',
        }}
      >
        Status
      </span>
      <style>{`
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.04); opacity: 0.85; }
        }
      `}</style>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `usePreferredReducedMotion`

**Signature:** `usePreferredReducedMotion(): boolean`

#### Parameters

None.

#### Returns

**`boolean`** - Whether `(prefers-reduced-motion: reduce)` matches.

## Copy-paste hook

### TypeScript

```tsx
import useMediaQuery from './useMediaQuery'

/**
 * Returns true when user prefers reduced motion.
 */
export default function usePreferredReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
```

### JavaScript

```js
import useMediaQuery from './useMediaQuery'

export default function usePreferredReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
```
