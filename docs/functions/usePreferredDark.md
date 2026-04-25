---
title: Track preferred dark mode
sidebar_label: usePreferredDark
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/usePreferredDark.tsx'
description: >-
  usePreferredDark from @dedalik/use-react: boolean flag for dark preference.
---

# usePreferredDark()

<PackageData fn="usePreferredDark" />

Last updated: 24/04/2026

## Overview

`usePreferredDark` is a thin wrapper around **`useMediaQuery('(prefers-color-scheme: dark)')`**, so it tracks the same OS-level dark preference with `matchMedia` listeners, SSR-safe defaults from `useMediaQuery`, and reactive updates when the user changes system theme. It returns a plain **`boolean`**-**`true`** when dark is preferred-making conditional rendering or class toggles simpler than handling the three-state string from `usePreferredColorScheme` when you only care about dark vs not-dark.

### What it accepts

- None.

### What it returns

- **`boolean`** - `true` if `(prefers-color-scheme: dark)` matches.

## Usage

Toggle a data attribute on a container for CSS hooks (no `JSON.stringify`).

```tsx
import usePreferredDark from '@dedalik/use-react/usePreferredDark'

function Example() {
  const prefersDark = usePreferredDark()

  return (
    <div
      data-theme={prefersDark ? 'dark' : 'light'}
      style={{
        padding: 16,
        borderRadius: 8,
        background: prefersDark ? '#0f172a' : '#f1f5f9',
        color: prefersDark ? '#e2e8f0' : '#0f172a',
      }}
    >
      <h3 style={{ marginTop: 0 }}>Preferred dark</h3>
      <p>
        <code>(prefers-color-scheme: dark)</code> matches: <strong>{prefersDark ? 'yes' : 'no'}</strong>
      </p>
      <p style={{ marginBottom: 0, opacity: 0.85 }}>
        Use <code>data-theme</code> or your design system tokens to align with system appearance.
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `usePreferredDark`

**Signature:** `usePreferredDark(): boolean`

#### Parameters

None.

#### Returns

**`boolean`** - Whether the user agent reports a dark color scheme preference.

## Copy-paste hook

### TypeScript

```tsx
import useMediaQuery from './useMediaQuery'

/**
 * Returns true when the OS/browser prefers dark scheme.
 */
export default function usePreferredDark(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)')
}
```

### JavaScript

```js
import useMediaQuery from './useMediaQuery'

export default function usePreferredDark() {
  return useMediaQuery('(prefers-color-scheme: dark)')
}
```
