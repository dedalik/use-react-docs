---
title: Copy text to the clipboard
sidebar_label: useCopyToClipboard
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useCopyToClipboard.tsx'
description: >-
  useCopyToClipboard from @dedalik/use-react: Copy text to the clipboard.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useCopyToClipboard()

<PackageData fn="useCopyToClipboard" />

<HookLiveDemo demo="useCopyToClipboard/basic" />

## Overview

`useCopyToClipboard` keeps the last successfully written string in React state and exposes an async **`copy(value)`** that uses **`navigator.clipboard.writeText`** when available (secure context + permission), returning **`true`** or **`false`** without throwing on failure. The first tuple slot mirrors what was last accepted by the clipboard API-handy for “Copied!” badges-while failures leave the previous value unchanged; there is no built-in timeout reset, so clear **`copiedText`** in your own effect if you want ephemeral feedback.

### What it accepts

- None.

### What it returns

- Tuple **`[copiedText, copy]`** - Last copied string and **`copy`** async function.

## Usage

Controlled input plus copy button; show outcome without `JSON.stringify`.

```tsx
import { useState } from 'react'
import useCopyToClipboard from '@dedalik/use-react/useCopyToClipboard'

function Example() {
  const [draft, setDraft] = useState('Hello from use-react')
  const [copiedText, copy] = useCopyToClipboard()
  const [lastOk, setLastOk] = useState<boolean | null>(null)

  return (
    <div>
      <h3>Clipboard</h3>
      <textarea
        rows={3}
        style={{ width: '100%', maxWidth: 420, fontFamily: 'monospace' }}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
        <button
          type='button'
          onClick={async () => {
            const ok = await copy(draft)
            setLastOk(ok)
          }}
        >
          Copy to clipboard
        </button>
      </div>
      <p>
        Last hook state:{' '}
        <strong>{copiedText ? `"${copiedText.slice(0, 40)}${copiedText.length > 40 ? '…' : ''}"` : '-'}</strong>
      </p>
      <p style={{ marginBottom: 0 }}>
        Last call: <strong>{lastOk === null ? '-' : lastOk ? 'success' : 'failed (permissions / context)'}</strong>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useCopyToClipboard`

**Signature:** `useCopyToClipboard(): [string, CopyFn]`

#### Parameters

None.

#### Returns

Tuple:

1. **`copiedText`** (`string`) - Last string passed to a successful `writeText`.
2. **`copy`** (`(value: string) => Promise<boolean>`) - Writes text to the clipboard.

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useState } from 'react'

type CopyFn = (value: string) => Promise<boolean>

export default function useCopyToClipboard(): [string, CopyFn] {
  const [copiedText, setCopiedText] = useState('')

  const copy: CopyFn = useCallback(async (value) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
      return false
    }

    try {
      await navigator.clipboard.writeText(value)
      setCopiedText(value)
      return true
    } catch {
      return false
    }
  }, [])

  return [copiedText, copy]
}
```

### JavaScript

```js
import { useCallback, useState } from 'react'

export default function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState('')

  const copy = useCallback(async (value) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
      return false
    }

    try {
      await navigator.clipboard.writeText(value)
      setCopiedText(value)
      return true
    } catch {
      return false
    }
  }, [])

  return [copiedText, copy]
}
```
