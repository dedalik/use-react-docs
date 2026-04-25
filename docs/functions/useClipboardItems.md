---
title: Read ClipboardItem entries
sidebar_label: useClipboardItems
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useClipboardItems.tsx'
description: >-
  useClipboardItems from @dedalik/use-react: reads rich clipboard items via navigator.clipboard.read.
---

# useClipboardItems()

<PackageData fn="useClipboardItems" />

Last updated: 24/04/2026

## Overview

`useClipboardItems` wraps **`navigator.clipboard.read()`** (rich clipboard) behind an imperative **`read()`** helper: on success it stores the returned **`ClipboardItem[]`** in state and clears **`error`**; on failure it captures a string message and empties **`items`**. **`isSupported`** is **`false`** when **`read`** is missing-common outside secure contexts or Firefox defaults-so UI should fall back to paste events or plain text APIs. Reading still requires user activation and appropriate **`clipboard-read`** permission in Chromium; the hook does not auto-poll.

### What it accepts

- None.

### What it returns

- **`isSupported`**, **`items`**, **`error`**, **`read`** - See API Reference.

## Usage

Button calls **`read()`**; list MIME types per item (no `JSON.stringify`).

```tsx
import useClipboardItems from '@dedalik/use-react/useClipboardItems'

function Example() {
  const { isSupported, items, error, read } = useClipboardItems()

  return (
    <div>
      <h3>Clipboard items</h3>

      {!isSupported ? (
        <p>
          <code>navigator.clipboard.read</code> is not available here.
        </p>
      ) : (
        <>
          {error ? (
            <p role='alert' style={{ color: 'crimson' }}>
              {error}
            </p>
          ) : null}
          <button type='button' onClick={() => read()}>
            Read clipboard
          </button>
          {items.length === 0 ? (
            <p style={{ marginTop: 12 }}>No items yet - copy rich content, then read.</p>
          ) : (
            <ul style={{ marginTop: 12 }}>
              {items.map((item, index) => (
                <li key={index}>
                  Item {index + 1}: <code>{item.types.join(', ') || '(no types)'}</code>
                </li>
              ))}
            </ul>
          )}
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

### `useClipboardItems`

**Signature:** `useClipboardItems(): UseClipboardItemsReturn`

#### Parameters

None.

#### Returns

Object with:

- **`isSupported`** - `navigator.clipboard.read` exists (`boolean`).
- **`items`** - Latest `ClipboardItem[]` from a successful read.
- **`error`** - Last error message or `null` (`string | null`).
- **`read`** - Invokes `navigator.clipboard.read()` (`() => Promise<ClipboardItem[]>`).

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useState } from 'react'

export interface UseClipboardItemsReturn {
  isSupported: boolean
  items: ClipboardItem[]
  error: string | null
  read: () => Promise<ClipboardItem[]>
}

/**
 * Reads ClipboardItem entries from the async Clipboard API.
 */
export default function useClipboardItems(): UseClipboardItemsReturn {
  const [items, setItems] = useState<ClipboardItem[]>([])
  const [error, setError] = useState<string | null>(null)

  const isSupported = typeof navigator !== 'undefined' && !!navigator.clipboard?.read

  const read = useCallback(async () => {
    if (!isSupported) return []

    try {
      const next = await navigator.clipboard.read()
      setItems(next)
      setError(null)
      return next
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to read clipboard items'
      setError(message)
      return []
    }
  }, [isSupported])

  return { isSupported, items, error, read }
}
```

### JavaScript

```js
import { useCallback, useState } from 'react'

export default function useClipboardItems() {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  const isSupported = typeof navigator !== 'undefined' && !!navigator.clipboard?.read

  const read = useCallback(async () => {
    if (!isSupported) return []

    try {
      const next = await navigator.clipboard.read()
      setItems(next)
      setError(null)
      return next
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to read clipboard items'
      setError(message)
      return []
    }
  }, [isSupported])

  return { isSupported, items, error, read }
}
```
