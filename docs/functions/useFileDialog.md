---
title: Open and read file chooser
sidebar_label: useFileDialog
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useFileDialog.tsx'
description: >-
  useFileDialog from @dedalik/use-react: opens a file picker and tracks selected files.
---

# useFileDialog()

<PackageData fn="useFileDialog" />
<HookLiveDemo demo="useFileDialog/basic" title="Live demo: useFileDialog" />

## Overview

`useFileDialog` lazily creates a hidden `<input type="file">`, wires its `change` event to React state, and gives you imperative `open` / `reset` helpers so you can trigger the native picker from any button without embedding an input in your markup. Options map directly to that input: `accept` filters MIME types or extensions, `multiple` allows multi-select, and `capture` hints camera vs gallery on mobile. After selection, `files` is a `File[]` you can read with `FileReader`, upload, or validate; `reset` clears the input value and empties `files` so the same file can be chosen again.

### What it accepts

- Optional **`accept`** - Passed to `input.accept` (for example `image/*` or `.png,.jpg`).
- Optional **`multiple`** - When `true`, the user can pick more than one file. Default `false`.
- Optional **`capture`** - Forwarded as the input `capture` attribute (for example `user` / `environment` on supported devices).

### What it returns

- **`files`** - Selected files from the last `change` event (`File[]`).
- **`open`** - Programmatically opens the file dialog (`click()` on the hidden input).
- **`reset`** - Clears the input value and resets `files` to `[]`.

## Usage

Picker for several images with an accept mask; list chosen names and clear the selection.

```tsx
import useFileDialog from '@dedalik/use-react/useFileDialog'

function Example() {
  const { files, open, reset } = useFileDialog({
    accept: 'image/png,image/jpeg,image/webp',
    multiple: true,
    capture: 'environment',
  })

  return (
    <div>
      <h3>Images</h3>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <button type='button' onClick={open}>
          Choose files
        </button>
        <button type='button' onClick={reset}>
          Clear
        </button>
      </div>
      {files.length === 0 ? (
        <p>No files selected.</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={`${file.name}-${file.size}`}>
              <strong>{file.name}</strong> - {(file.size / 1024).toFixed(1)} KB
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useFileDialog`

**Signature:** `useFileDialog(options?: UseFileDialogOptions): UseFileDialogReturn`

#### Parameters

Optional **`options`** (`UseFileDialogOptions`):

- **`accept`** (`string`, optional) - `input.accept` filter.
- **`multiple`** (`boolean`, optional) - Multi-file selection. Default `false`.
- **`capture`** (`string`, optional) - `capture` attribute on the hidden input.

#### Returns

Object with:

- **`files`** - Latest selection as `File[]`.
- **`open`** - Opens the native file chooser (`() => void`).
- **`reset`** - Clears value and `files` (`() => void`).

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useMemo, useRef, useState } from 'react'

export interface UseFileDialogOptions {
  accept?: string
  multiple?: boolean
  capture?: string
}

export interface UseFileDialogReturn {
  files: File[]
  open: () => void
  reset: () => void
}

/**
 * Opens a hidden file input and exposes selected files.
 */
export default function useFileDialog(options: UseFileDialogOptions = {}): UseFileDialogReturn {
  const { accept, multiple = false, capture } = options
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [files, setFiles] = useState<File[]>([])

  const ensureInput = useCallback(() => {
    if (inputRef.current) return inputRef.current

    const input = document.createElement('input')
    input.type = 'file'
    if (accept) input.accept = accept
    input.multiple = multiple
    if (capture) input.setAttribute('capture', capture)
    input.style.display = 'none'

    input.addEventListener('change', () => {
      setFiles(Array.from(input.files ?? []))
    })

    document.body.appendChild(input)
    inputRef.current = input
    return input
  }, [accept, capture, multiple])

  const open = useCallback(() => {
    if (typeof document === 'undefined') return
    ensureInput().click()
  }, [ensureInput])

  const reset = useCallback(() => {
    const input = inputRef.current
    if (!input) return
    input.value = ''
    setFiles([])
  }, [])

  return useMemo(() => ({ files, open, reset }), [files, open, reset])
}
```

### JavaScript

```js
import { useCallback, useMemo, useRef, useState } from 'react'

export default function useFileDialog(options = {}) {
  const { accept, multiple = false, capture } = options
  const inputRef = useRef(null)
  const [files, setFiles] = useState([])

  const ensureInput = useCallback(() => {
    if (inputRef.current) return inputRef.current

    const input = document.createElement('input')
    input.type = 'file'
    if (accept) input.accept = accept
    input.multiple = multiple
    if (capture) input.setAttribute('capture', capture)
    input.style.display = 'none'

    input.addEventListener('change', () => {
      setFiles(Array.from(input.files ?? []))
    })

    document.body.appendChild(input)
    inputRef.current = input
    return input
  }, [accept, capture, multiple])

  const open = useCallback(() => {
    if (typeof document === 'undefined') return
    ensureInput().click()
  }, [ensureInput])

  const reset = useCallback(() => {
    const input = inputRef.current
    if (!input) return
    input.value = ''
    setFiles([])
  }, [])

  return useMemo(() => ({ files, open, reset }), [files, open, reset])
}
```
