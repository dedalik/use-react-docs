---
title: Read and save files
sidebar_label: useFileSystemAccess
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useFileSystemAccess.tsx'
description: >-
  useFileSystemAccess from @dedalik/use-react: open and save text files with File System Access API.
---

# useFileSystemAccess()

<PackageData fn="useFileSystemAccess" />

Last updated: 24/04/2026

## Overview

`useFileSystemAccess` wraps Chromium-style `window.showOpenFilePicker` and `window.showSaveFilePicker` into a small state machine: `open` lets the user pick one text file and stores its name plus UTF-8 string contents, while `saveAs(name, data)` opens the native save dialog with a suggested filename, writes the string through a `FileSystemWritableFileStream`, and mirrors the saved name and content back into state. It exposes `isSupported` so you can hide the UI in Safari or older browsers, and `error` surfaces user cancellation or IO failures as a readable message. The hook takes no parameters; capability is inferred entirely from the global pickers at runtime.

### What it accepts

- None.

### What it returns

- **`isSupported`** - `true` when both open and save pickers exist on `window`.
- **`fileName`** - Last successfully opened or saved basename (or `null`).
- **`content`** - Last file text / last saved payload (or `null`).
- **`error`** - Last error message, or `null` when idle or successful.
- **`open`** - Opens one file, reads `.text()`, updates state; returns whether it succeeded.
- **`saveAs`** - Save dialog + write; arguments are suggested name and string body.

## Usage

Mini note editor: open a `.txt` file, edit in a textarea, save as a new file when the API is available.

```tsx
import { useEffect, useState } from 'react'
import useFileSystemAccess from '@dedalik/use-react/useFileSystemAccess'

function Example() {
  const { isSupported, fileName, content, error, open, saveAs } = useFileSystemAccess()
  const [draft, setDraft] = useState('')

  useEffect(() => {
    if (content !== null) {
      setDraft(content)
    }
  }, [content])

  return (
    <div>
      <h3>Text file (File System Access)</h3>

      {!isSupported ? (
        <p>This demo needs a browser with showOpenFilePicker / showSaveFilePicker (for example Chromium).</p>
      ) : (
        <>
          {error ? (
            <p role='alert' style={{ color: 'crimson' }}>
              {error}
            </p>
          ) : null}

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            <button type='button' onClick={() => open()}>
              Open…
            </button>
            <button
              type='button'
              onClick={async () => {
                const suggested = fileName?.replace(/\.[^.]+$/, '') ?? 'notes'
                await saveAs(`${suggested}-copy.txt`, draft)
              }}
            >
              Save as…
            </button>
          </div>

          <p>
            Active file: <strong>{fileName ?? '-'}</strong>
          </p>

          <textarea
            rows={8}
            style={{ width: '100%', maxWidth: 480, fontFamily: 'monospace' }}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder='Open a file or type here, then Save as…'
          />
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

### `useFileSystemAccess`

**Signature:** `useFileSystemAccess(): UseFileSystemAccessReturn`

#### Parameters

None.

#### Returns

Object with:

- **`isSupported`** - Whether both picker APIs are present (`boolean`).
- **`fileName`** - Last successful file basename (`string | null`).
- **`content`** - Last read or saved text (`string | null`).
- **`error`** - Human-readable failure (`string | null`).
- **`open`** - Native open picker, reads first file as text (`() => Promise<boolean>`).
- **`saveAs`** - Native save picker with `suggestedName`, writes UTF-8 string (`(name: string, data: string) => Promise<boolean>`).

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useState } from 'react'

export interface UseFileSystemAccessReturn {
  isSupported: boolean
  fileName: string | null
  content: string | null
  error: string | null
  open: () => Promise<boolean>
  saveAs: (name: string, data: string) => Promise<boolean>
}

/**
 * Minimal File System Access API helper for reading/saving text files.
 */
export default function useFileSystemAccess(): UseFileSystemAccessReturn {
  const [fileName, setFileName] = useState<string | null>(null)
  const [content, setContent] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const browserWindow =
    typeof window !== 'undefined'
      ? (window as unknown as Window & {
          showOpenFilePicker?: () => Promise<Array<{ getFile: () => Promise<File> }>>
          showSaveFilePicker?: (options: { suggestedName: string }) => Promise<{
            createWritable: () => Promise<{ write: (value: string) => Promise<void>; close: () => Promise<void> }>
          }>
        })
      : undefined
  const isSupported = !!browserWindow?.showOpenFilePicker && !!browserWindow?.showSaveFilePicker

  const open = useCallback(async () => {
    if (!isSupported) return false

    try {
      const picker = browserWindow?.showOpenFilePicker
      if (!picker) return false
      const [handle] = await picker()
      const file = await handle.getFile()
      setFileName(file.name)
      setContent(await file.text())
      setError(null)
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to open file'
      setError(message)
      return false
    }
  }, [browserWindow, isSupported])

  const saveAs = useCallback(
    async (name: string, data: string) => {
      if (!isSupported) return false

      try {
        const picker = browserWindow?.showSaveFilePicker
        if (!picker) return false
        const handle = await picker({ suggestedName: name })
        const writable = await handle.createWritable()
        await writable.write(data)
        await writable.close()
        setFileName(name)
        setContent(data)
        setError(null)
        return true
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to save file'
        setError(message)
        return false
      }
    },
    [browserWindow, isSupported],
  )

  return { isSupported, fileName, content, error, open, saveAs }
}
```

### JavaScript

```js
import { useCallback, useState } from 'react'

export default function useFileSystemAccess() {
  const [fileName, setFileName] = useState(null)
  const [content, setContent] = useState(null)
  const [error, setError] = useState(null)

  const browserWindow = typeof window !== 'undefined' ? window : undefined
  const isSupported = !!(browserWindow?.showOpenFilePicker && browserWindow?.showSaveFilePicker)

  const open = useCallback(async () => {
    if (!isSupported) return false

    try {
      const picker = browserWindow?.showOpenFilePicker
      if (!picker) return false
      const [handle] = await picker()
      const file = await handle.getFile()
      setFileName(file.name)
      setContent(await file.text())
      setError(null)
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to open file'
      setError(message)
      return false
    }
  }, [browserWindow, isSupported])

  const saveAs = useCallback(
    async (name, data) => {
      if (!isSupported) return false

      try {
        const picker = browserWindow?.showSaveFilePicker
        if (!picker) return false
        const handle = await picker({ suggestedName: name })
        const writable = await handle.createWritable()
        await writable.write(data)
        await writable.close()
        setFileName(name)
        setContent(data)
        setError(null)
        return true
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to save file'
        setError(message)
        return false
      }
    },
    [browserWindow, isSupported],
  )

  return { isSupported, fileName, content, error, open, saveAs }
}
```
