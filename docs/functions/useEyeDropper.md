---
title: Sample colors with the EyeDropper API
sidebar_label: useEyeDropper
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useEyeDropper.tsx'
description: >-
  useEyeDropper from @dedalik/use-react: open system color picker and read sRGB hex.
---

# useEyeDropper()

<PackageData fn="useEyeDropper" />

Last updated: 24/04/2026

## Overview

`useEyeDropper` wraps the **EyeDropper API** when **`window.EyeDropper`** exists: **`open()`** shows the browser/OS color sampler, then stores **`sRGBHex`** (e.g. **`#aabbcc`**) and clears **`error`**. If the user cancels or the API throws, **`error`** is set and the promise resolves **`null`**. Support is **Chromium-based**-Safari/Firefox may set **`isSupported`** to **false**; `open()` is a no-op in that case. The hook has no automatic cleanup; it is a one-shot **async** call per **pick**.

### What it accepts

- None.

### What it returns

- **`isSupported`**: `boolean`
- **`sRGBHex`**: `string | null` - last successful pick
- **`error`**: `string | null`
- **`open`**: `() => Promise<string | null>`

## Usage

Button triggers **`open()`**; show the swatch and hex when supported (may require **HTTPS** and a user gesture in some environments).

```tsx
import useEyeDropper from '@dedalik/use-react/useEyeDropper'

function Example() {
  const { isSupported, sRGBHex, error, open } = useEyeDropper()

  if (!isSupported) {
    return <p>EyeDropper is not available in this browser.</p>
  }

  return (
    <div>
      <p>
        <button type='button' onClick={() => void open()}>
          Pick a color
        </button>
      </p>
      {error && <p role='alert'>{error}</p>}
      {sRGBHex && (
        <p>
          <span
            aria-hidden
            style={{
              display: 'inline-block',
              width: 32,
              height: 32,
              border: '1px solid #999',
              background: sRGBHex,
              verticalAlign: 'middle',
            }}
          />{' '}
          <code>{sRGBHex}</code>
        </p>
      )}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useEyeDropper`

**Signature:** `useEyeDropper(): UseEyeDropperReturn`

#### Parameters

None.

#### Returns

**`isSupported`**, **`sRGBHex`**, **`error`**, **`open`**

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useState } from 'react'

export interface UseEyeDropperReturn {
  isSupported: boolean
  sRGBHex: string | null
  error: string | null
  open: () => Promise<string | null>
}

/**
 * Opens EyeDropper and stores the last selected color.
 */
export default function useEyeDropper(): UseEyeDropperReturn {
  const [sRGBHex, setSRGBHex] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const isSupported = typeof window !== 'undefined' && 'EyeDropper' in window

  const open = useCallback(async () => {
    if (!isSupported) return null

    try {
      const eyeDropperWindow = window as unknown as Window & {
        EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> }
      }
      const EyeDropperCtor = eyeDropperWindow.EyeDropper
      const eyeDropper = new EyeDropperCtor()
      const result = await eyeDropper.open()
      setSRGBHex(result.sRGBHex)
      setError(null)
      return result.sRGBHex
    } catch (err) {
      const message = err instanceof Error ? err.message : 'EyeDropper failed'
      setError(message)
      return null
    }
  }, [isSupported])

  return { isSupported, sRGBHex, error, open }
}
```

### JavaScript

```js
import { useCallback, useState } from 'react'

/**
 * Opens EyeDropper and stores the last selected color.
 */
export default function useEyeDropper() {
  const [sRGBHex, setSRGBHex] = useState(null)
  const [error, setError] = useState(null)

  const isSupported = typeof window !== 'undefined' && 'EyeDropper' in window

  const open = useCallback(async () => {
    if (!isSupported) return null

    try {
      const eyeDropper = new window.EyeDropper()
      const result = await eyeDropper.open()
      setSRGBHex(result.sRGBHex)
      setError(null)
      return result.sRGBHex
    } catch (err) {
      const message = err instanceof Error ? err.message : 'EyeDropper failed'
      setError(message)
      return null
    }
  }, [isSupported])

  return { isSupported, sRGBHex, error, open }
}
```
