---
title: Reactive image loader
sidebar_label: useImage
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useImage.tsx'
description: >-
  useImage from @dedalik/use-react: load image sources with loading/error state.
---

# useImage()

<PackageData fn="useImage" />

Last updated: 24/04/2026

## Overview

`useImage` creates a browser **`Image`**, assigns **`src`**, and optionally sets **`crossOrigin`** and **`referrerPolicy`** from **`options`** so CORS or referrer rules match what you would put on an **`<img>`** tag. While loading you get **`isLoading: true`**, on success the same **`HTMLImageElement`** is exposed for drawing to canvas or passing to **`<img srcObject>`**-style flows, and on error you receive a string message and **`image: null`**. Changing **`src`** or options aborts the previous load logically via a cancel flag; empty **`src`** clears state-ideal for remote thumbnails or user-picked file URLs.

### What it accepts

- **`src`** - URL or data URL to load.
- Optional **`options`** - **`crossOrigin`**, **`referrerPolicy`**.

### What it returns

- **`isLoading`**, **`error`**, **`image`** - Loading flag, error string or `null`, loaded element or `null`.

## Usage

Load a CORS-friendly photo with **`crossOrigin: 'anonymous'`** and show dimensions when ready (no `JSON.stringify`).

```tsx
import useImage from '@dedalik/use-react/useImage'

const DEMO_SRC = 'https://picsum.photos/seed/use-react/320/200'

function Example() {
  const { isLoading, error, image } = useImage(DEMO_SRC, {
    crossOrigin: 'anonymous',
    referrerPolicy: 'no-referrer',
  })

  return (
    <div>
      <h3>Image loader</h3>
      {isLoading && <p>Loading…</p>}
      {error && <p role='alert'>{error}</p>}
      {image && (
        <p>
          Loaded: <strong>{image.naturalWidth}</strong> × <strong>{image.naturalHeight}</strong> px
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

### `useImage`

**Signature:** `useImage(src: string, options?: UseImageOptions): UseImageReturn`

#### Parameters

- **`src`** (`string`) - Image URL; empty string clears the hook state.
- **`options`** (`UseImageOptions`, optional) - `crossOrigin`, `referrerPolicy`.

#### Returns

**`UseImageReturn`** - `isLoading`, `error`, `image` (`HTMLImageElement | null`).

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useMemo, useState } from 'react'

export interface UseImageOptions {
  crossOrigin?: '' | 'anonymous' | 'use-credentials'
  referrerPolicy?: ReferrerPolicy
}

export interface UseImageReturn {
  isLoading: boolean
  error: string | null
  image: HTMLImageElement | null
}

/**
 * Loads an image source and tracks loading/error state.
 */
export default function useImage(src: string, options: UseImageOptions = {}): UseImageReturn {
  const { crossOrigin, referrerPolicy } = options
  const [isLoading, setIsLoading] = useState(Boolean(src))
  const [error, setError] = useState<string | null>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!src) {
      setIsLoading(false)
      setError(null)
      setImage(null)
      return
    }

    let cancelled = false
    const img = new Image()
    if (crossOrigin !== undefined) img.crossOrigin = crossOrigin
    if (referrerPolicy !== undefined) img.referrerPolicy = referrerPolicy

    setIsLoading(true)
    setError(null)

    img.onload = () => {
      if (cancelled) return
      setImage(img)
      setIsLoading(false)
    }

    img.onerror = () => {
      if (cancelled) return
      setError(`Failed to load image: ${src}`)
      setIsLoading(false)
      setImage(null)
    }

    img.src = src

    return () => {
      cancelled = true
    }
  }, [crossOrigin, referrerPolicy, src])

  return useMemo(() => ({ isLoading, error, image }), [error, image, isLoading])
}
```

### JavaScript

```js
import { useEffect, useMemo, useState } from 'react'

export default function useImage(src, options = {}) {
  const { crossOrigin, referrerPolicy } = options
  const [isLoading, setIsLoading] = useState(Boolean(src))
  const [error, setError] = useState(null)
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (!src) {
      setIsLoading(false)
      setError(null)
      setImage(null)
      return
    }

    let cancelled = false
    const img = new Image()
    if (crossOrigin !== undefined) img.crossOrigin = crossOrigin
    if (referrerPolicy !== undefined) img.referrerPolicy = referrerPolicy

    setIsLoading(true)
    setError(null)

    img.onload = () => {
      if (cancelled) return
      setImage(img)
      setIsLoading(false)
    }

    img.onerror = () => {
      if (cancelled) return
      setError(`Failed to load image: ${src}`)
      setIsLoading(false)
      setImage(null)
    }

    img.src = src

    return () => {
      cancelled = true
    }
  }, [crossOrigin, referrerPolicy, src])

  return useMemo(() => ({ isLoading, error, image }), [error, image, isLoading])
}
```
