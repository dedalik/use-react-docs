---
title: Track drag-and-drop zone state
sidebar_label: useDropZone
category: Elements
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useDropZone.tsx'
description: >-
  useDropZone from @dedalik/use-react: observe drag-over state and dropped files.
---

# useDropZone()

<PackageData fn="useDropZone" />
<HookLiveDemo demo="useDropZone/basic" title="Live demo: useDropZone" />

## Overview

`useDropZone` attaches `dragover`, `dragleave`, and `drop` listeners to the DOM node behind `target`, keeps a boolean `isOverDropZone` while a drag is hovering (with `preventDefault` on `dragover`/`drop` so the browser allows dropping), and stores the last dropped `File[]` from `dataTransfer`. An optional `onDrop` callback runs after the files state updates, which is convenient for uploads, import wizards, or any UI that needs both reactive state and a side-effect hook.

### What it accepts

- `target: RefObject<HTMLElement | null>`.
- `options: UseDropZoneOptions = {}`.

### What it returns

- `isOverDropZone`: `true` while the pointer is dragging over the drop target. Type `boolean`.
- `files`: Files from the most recent `drop` event (empty until the first successful drop). Type `File[]`.

## Usage

Real-world example: a file drop target with hover styling, listing dropped files, and an `onDrop` side-effect.

```tsx
import { useRef, useState } from 'react'
import useDropZone from '@dedalik/use-react/useDropZone'

function Example() {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const [log, setLog] = useState<string[]>([])

  const { isOverDropZone, files } = useDropZone(targetRef, {
    onDrop: (dropped) => {
      setLog((prev) =>
        [`Dropped ${dropped.length} file(s): ${dropped.map((f) => f.name).join(', ')}`, ...prev].slice(0, 4),
      )
    },
  })

  return (
    <div>
      <h3>Upload drop zone</h3>

      <div
        ref={targetRef}
        style={{
          border: `2px dashed ${isOverDropZone ? '#2563eb' : '#ccc'}`,
          borderRadius: 12,
          padding: 16,
          minHeight: 140,
          background: isOverDropZone ? '#eff6ff' : '#fafafa',
        }}
      >
        <p style={{ marginTop: 0 }}>Drag and drop files here.</p>
        {files.length ? (
          <ul>
            {files.map((file) => (
              <li key={`${file.name}-${file.size}`}>
                <strong>{file.name}</strong> ({file.type || 'unknown type'}) - {file.size} bytes
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ opacity: 0.75 }}>No files dropped yet.</p>
        )}
      </div>

      {log.length ? (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Recent drops</div>
          <ol>
            {log.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useDropZone`

**Signature:** `useDropZone(target: RefObject<HTMLElement | null>, options: UseDropZoneOptions = {}): UseDropZoneReturn`

#### Parameters

1. **`target`** (`RefObject<HTMLElement | null>`) - Ref attached to the element that should accept drag/drop.
2. **`options`** (optional `UseDropZoneOptions`) - Optional callbacks; `onDrop` runs after files are captured from `dataTransfer`. Default: `{}`.

#### Returns

Object with:

- `isOverDropZone` - `true` while the pointer is dragging over the drop target. (`boolean`).
- `files` - Files from the most recent `drop` event (empty until the first successful drop). (`File[]`).

## Copy-paste hook

### TypeScript

```tsx
import { RefObject, useCallback, useEffect, useState } from 'react'

export interface UseDropZoneOptions {
  onDrop?: (files: File[]) => void
}

export interface UseDropZoneReturn {
  isOverDropZone: boolean
  files: File[]
}

/**
 * Tracks drag-over/drop state and files for a target element.
 */
export default function useDropZone(
  target: RefObject<HTMLElement | null>,
  options: UseDropZoneOptions = {},
): UseDropZoneReturn {
  const { onDrop } = options
  const [isOverDropZone, setIsOverDropZone] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const handleDragOver = useCallback((event: Event) => {
    const dragEvent = event as unknown as DragEvent
    dragEvent.preventDefault()
    setIsOverDropZone(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsOverDropZone(false)
  }, [])

  const handleDrop = useCallback(
    (event: Event) => {
      const dragEvent = event as unknown as DragEvent
      dragEvent.preventDefault()
      setIsOverDropZone(false)

      const dropped = Array.from(dragEvent.dataTransfer?.files ?? [])
      setFiles(dropped)
      onDrop?.(dropped)
    },
    [onDrop],
  )

  useEffect(() => {
    const node = target.current
    if (!node) return

    node.addEventListener('dragover', handleDragOver)
    node.addEventListener('dragleave', handleDragLeave)
    node.addEventListener('drop', handleDrop)

    return () => {
      node.removeEventListener('dragover', handleDragOver)
      node.removeEventListener('dragleave', handleDragLeave)
      node.removeEventListener('drop', handleDrop)
    }
  }, [handleDragLeave, handleDragOver, handleDrop, target])

  return { isOverDropZone, files }
}
```

### JavaScript

```js
import { useCallback, useEffect, useState } from 'react'

export default function useDropZone(target, options = {}) {
  const { onDrop } = options
  const [isOverDropZone, setIsOverDropZone] = useState(false)
  const [files, setFiles] = useState([])

  const handleDragOver = useCallback((event) => {
    const dragEvent = event
    dragEvent.preventDefault()
    setIsOverDropZone(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsOverDropZone(false)
  }, [])

  const handleDrop = useCallback(
    (event) => {
      const dragEvent = event
      dragEvent.preventDefault()
      setIsOverDropZone(false)

      const dropped = Array.from(dragEvent.dataTransfer?.files ?? [])
      setFiles(dropped)
      onDrop?.(dropped)
    },
    [onDrop],
  )

  useEffect(() => {
    const node = target.current
    if (!node) return

    node.addEventListener('dragover', handleDragOver)
    node.addEventListener('dragleave', handleDragLeave)
    node.addEventListener('drop', handleDrop)

    return () => {
      node.removeEventListener('dragover', handleDragOver)
      node.removeEventListener('dragleave', handleDragLeave)
      node.removeEventListener('drop', handleDrop)
    }
  }, [handleDragLeave, handleDragOver, handleDrop, target])

  return { isOverDropZone, files }
}
```
