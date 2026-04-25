---
title: Share content with Web Share API
sidebar_label: useShare
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useShare.tsx'
description: >-
  useShare from @dedalik/use-react: share data via native Web Share API with fallback.
---

# useShare()

<PackageData fn="useShare" />

Last updated: 24/04/2026

## Overview

`useShare` exposes **`navigator.share`** when it exists: **`share(data)`** forwards **`title`**, **`text`**, and **`url`** to the native sheet (mobile Safari/Chrome, some desktop builds), resolves **`true`** on success and **`false`** when the API is missing, the user dismisses the sheet, or the browser throws. **`isSupported`** lets you hide the affordance or fall back to “copy link” on unsupported engines; the hook does not polyfill sharing-only wraps the promise with a boolean for ergonomic UI state machines.

### What it accepts

- None.

### What it returns

- **`isSupported`** - Whether `navigator.share` is callable (`boolean`).
- **`share`** - Invokes the Web Share API with **`UseShareData`** (`Promise<boolean>`).

## Usage

Share the current page with **title**, **text**, and **url**; show last result without `JSON.stringify`.

```tsx
import { useState } from 'react'
import useShare from '@dedalik/use-react/useShare'

function Example() {
  const { isSupported, share } = useShare()
  const [status, setStatus] = useState<'idle' | 'shared' | 'cancelled' | 'unsupported'>('idle')

  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div>
      <h3>Web Share</h3>

      {!isSupported ? (
        <p>Native share sheet is not available. Copy the link manually.</p>
      ) : (
        <>
          <button
            type='button'
            onClick={async () => {
              const ok = await share({
                title: 'use-react docs',
                text: 'Sharing from the useShare() demo.',
                url: pageUrl,
              })
              setStatus(ok ? 'shared' : 'cancelled')
            }}
          >
            Share this page…
          </button>
          <p>
            Last action: <strong>{status}</strong>
          </p>
        </>
      )}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useShare`

**Signature:** `useShare(): UseShareReturn`

#### Parameters

None.

#### Returns

Object with:

- **`isSupported`** - `navigator.share` availability (`boolean`).
- **`share`** - `(data: UseShareData) => Promise<boolean>` where **`UseShareData`** has optional **`title`**, **`text`**, **`url`**.

## Copy-paste hook

### TypeScript

```tsx
import { useCallback } from 'react'

export interface UseShareData {
  title?: string
  text?: string
  url?: string
}

export interface UseShareReturn {
  isSupported: boolean
  share: (data: UseShareData) => Promise<boolean>
}

/**
 * Wrapper around Web Share API with safe fallback.
 */
export default function useShare(): UseShareReturn {
  const isSupported = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  const share = useCallback(
    async (data: UseShareData) => {
      if (!isSupported) return false

      try {
        await navigator.share(data)
        return true
      } catch {
        return false
      }
    },
    [isSupported],
  )

  return { isSupported, share }
}
```

### JavaScript

```js
import { useCallback } from 'react'

export default function useShare() {
  const isSupported = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  const share = useCallback(
    async (data) => {
      if (!isSupported) return false

      try {
        await navigator.share(data)
        return true
      } catch {
        return false
      }
    },
    [isSupported],
  )

  return { isSupported, share }
}
```
