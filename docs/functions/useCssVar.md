---
title: Read and update CSS variables
sidebar_label: useCssVar
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useCssVar.tsx'
description: >-
  useCssVar from @dedalik/use-react: reactive CSS custom property getter/setter.
---

# useCssVar()

<PackageData fn="useCssVar" />

<HookLiveDemo demo="useCssVar/basic" title="useCssVar interactive demo" />

## Overview

`useCssVar` reads a custom property from **`getComputedStyle`** on mount and whenever **`name`** or the **`target`** ref identity changes, seeding React state with the trimmed computed value. The returned setter calls `element.style.setProperty(name, next)` on either the resolved **`target.current`** or, if you omit the ref, `document.documentElement`, then updates state-so local React UI and inline CSS variables stay in sync for theming, spacing tokens, or per-component tokens without reaching for a global stylesheet manager.

### What it accepts

- **`name`** - Variable name as used in CSS (typically `--token-name`).
- **`target`** (optional) - `RefObject<HTMLElement | null>`; defaults to reading/writing on `<html>`.

### What it returns

- Tuple **`[value, setVar]`** - Current string value and updater `(next: string) => void`.

## Usage

Accent color on a card: **`name`** + **`target`** ref; text color reads the same variable.

```tsx
import { useRef } from 'react'
import useCssVar from '@dedalik/use-react/useCssVar'

function Example() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [accent, setAccent] = useCssVar('--accent', cardRef)

  return (
    <div>
      <h3>Theme token</h3>
      <div
        ref={cardRef}
        style={{
          ['--accent' as string]: '#6366f1',
          padding: 16,
          borderRadius: 8,
          color: 'var(--accent)',
          border: '2px solid var(--accent)',
        }}
      >
        <p style={{ marginTop: 0 }}>
          Computed <code>--accent</code>: {accent || '(empty)'}
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type='button' onClick={() => setAccent('#059669')}>
            Green
          </button>
          <button type='button' onClick={() => setAccent('#b45309')}>
            Amber
          </button>
          <button type='button' onClick={() => setAccent('#6366f1')}>
            Indigo
          </button>
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

### `useCssVar`

**Signature:** `useCssVar(name: string, target?: RefObject<HTMLElement | null>): [string, (next: string) => void]`

#### Parameters

1. **`name`** (`string`) - Custom property name (for example `--accent`).
2. **`target`** (`RefObject<HTMLElement | null>`, optional) - Element whose computed style is read and whose `style` is updated; defaults to `document.documentElement`.

#### Returns

Tuple:

1. **`string`** - Last read or set variable value (trimmed on read).
2. **`(next: string) => void`** - Writes `name` on the target and updates local state.

## Copy-paste hook

### TypeScript

```tsx
import { RefObject, useEffect, useState } from 'react'

/**
 * Reads and updates a CSS custom property on a target element.
 */
export default function useCssVar(
  name: string,
  target?: RefObject<HTMLElement | null>,
): [string, (next: string) => void] {
  const [value, setValue] = useState('')

  useEffect(() => {
    const node = target?.current ?? document.documentElement
    const next = getComputedStyle(node).getPropertyValue(name).trim()
    setValue(next)
  }, [name, target])

  const update = (next: string) => {
    const node = target?.current ?? document.documentElement
    node.style.setProperty(name, next)
    setValue(next)
  }

  return [value, update]
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

export default function useCssVar(name, target) {
  const [value, setValue] = useState('')

  useEffect(() => {
    const node = target?.current ?? document.documentElement
    const next = getComputedStyle(node).getPropertyValue(name).trim()
    setValue(next)
  }, [name, target])

  const update = (next) => {
    const node = target?.current ?? document.documentElement
    node.style.setProperty(name, next)
    setValue(next)
  }

  return [value, update]
}
```
