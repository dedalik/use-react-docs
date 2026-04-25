---
title: Check CSS feature support
sidebar_label: useCssSupports
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useCssSupports.tsx'
description: >-
  useCssSupports from @dedalik/use-react: checks CSS.supports for conditions and declarations.
---

# useCssSupports()

<PackageData fn="useCssSupports" />

Last updated: 24/04/2026

## Overview

`useCssSupports` memoizes a call to `CSS.supports`: when you pass **`property`** and **`value`**, it evaluates the declaration form `CSS.supports(property, value)` (for example whether `subgrid` is accepted for `grid-template-columns`); when **`value`** is omitted, it treats **`property`** as a full condition string and calls the unary overload `CSS.supports(condition)`-useful for queries like `(display: grid)` or modern media-like expressions the API accepts. If `CSS` is missing or `supports` throws (some embeds), the hook returns `false`, so feature UI can branch without try/catch in components.

### What it accepts

- **`property`** - Either a CSS property name (with **`value`**) or a complete `@supports` condition string (without **`value`**).
- **`value`** (optional) - Declaration value paired with **`property`**.

### What it returns

- **`boolean`** - Whether the browser reports support for the given check.

## Usage

Two checks in one screen: declaration form **and** unary condition form.

```tsx
import useCssSupports from '@dedalik/use-react/useCssSupports'

function Example() {
  const supportsSubgrid = useCssSupports('grid-template-columns', 'subgrid')
  const supportsContainer = useCssSupports('(container-type: inline-size)')

  return (
    <div>
      <h3>CSS feature probes</h3>
      <ul>
        <li>
          <code>grid-template-columns: subgrid</code> -{' '}
          <strong>{supportsSubgrid ? 'supported' : 'not supported'}</strong>
        </li>
        <li>
          <code>(container-type: inline-size)</code> -{' '}
          <strong>{supportsContainer ? 'supported' : 'not supported'}</strong>
        </li>
      </ul>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useCssSupports`

**Signature:** `useCssSupports(property: string, value?: string): boolean`

#### Parameters

1. **`property`** (`string`) - Property name plus **`value`**, or a full condition when **`value`** is omitted.
2. **`value`** (`string`, optional) - Second argument to `CSS.supports(property, value)`.

#### Returns

`boolean` - Support result, or `false` when `CSS.supports` is unavailable or throws.

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

/**
 * Checks CSS.supports for a property/value pair or raw condition.
 */
export default function useCssSupports(property: string, value?: string): boolean {
  return useMemo(() => {
    if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') return false
    try {
      return value === undefined ? CSS.supports(property) : CSS.supports(property, value)
    } catch {
      return false
    }
  }, [property, value])
}
```

### JavaScript

```js
import { useMemo } from 'react'

export default function useCssSupports(property, value) {
  return useMemo(() => {
    if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') return false
    try {
      return value === undefined ? CSS.supports(property) : CSS.supports(property, value)
    } catch {
      return false
    }
  }, [property, value])
}
```
