---
title: Track current text selection
sidebar_label: useTextSelection
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useTextSelection.tsx'
description: >-
  useTextSelection from @dedalik/use-react: current selected text and collapsed state.
---

# useTextSelection()

<PackageData fn="useTextSelection" />

Last updated: 24/04/2026

## Overview

`useTextSelection` mirrors the document selection: on **`selectionchange`** it re-reads **`window.getSelection()`** and stores **`toString()`** plus **`isCollapsed`**, so you can show selection length, copy affordances, or format-bar state. Empty selection yields **`text: ''`** and **`isCollapsed: true`**. It does not normalize multiple ranges (only the stringified view); for rich editor selections you may need a deeper `Selection` API integration.

### What it accepts

- None.

### What it returns

- **`{ text, isCollapsed }`**.

## Usage

Selectable paragraph: show snippet length and collapse flag (no `JSON.stringify`).

```tsx
import useTextSelection from '@dedalik/use-react/useTextSelection'

function Example() {
  const { text, isCollapsed } = useTextSelection()
  const preview = text.length > 80 ? `${text.slice(0, 80)}…` : text

  return (
    <div>
      <h3>Selection</h3>
      <p style={{ userSelect: 'text', lineHeight: 1.6, maxWidth: 480 }}>
        Select any part of this sentence and the hook will mirror the current document selection. You can extend this
        across multiple lines as well.
      </p>
      <p>
        Length: <strong>{text.length}</strong> - collapsed: <strong>{isCollapsed ? 'yes' : 'no'}</strong>
      </p>
      {text ? <p style={{ fontFamily: 'monospace', fontSize: 13, whiteSpace: 'pre-wrap' }}>{preview}</p> : null}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useTextSelection`

**Signature:** `useTextSelection(): UseTextSelectionState`

#### Parameters

None.

#### Returns

**`UseTextSelectionState`**.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export interface UseTextSelectionState {
  text: string
  isCollapsed: boolean
}

function readSelection(): UseTextSelectionState {
  if (typeof window === 'undefined') return { text: '', isCollapsed: true }

  const selection = window.getSelection()
  if (!selection) return { text: '', isCollapsed: true }

  return {
    text: selection.toString(),
    isCollapsed: selection.isCollapsed,
  }
}

/**
 * Tracks current document text selection.
 */
export default function useTextSelection(): UseTextSelectionState {
  const [state, setState] = useState<UseTextSelectionState>(() => readSelection())

  useEffect(() => {
    if (typeof document === 'undefined') return

    const update = () => setState(readSelection())
    document.addEventListener('selectionchange', update)

    return () => {
      document.removeEventListener('selectionchange', update)
    }
  }, [])

  return state
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

function readSelection() {
  if (typeof window === 'undefined') return { text: '', isCollapsed: true }

  const selection = window.getSelection()
  if (!selection) return { text: '', isCollapsed: true }

  return {
    text: selection.toString(),
    isCollapsed: selection.isCollapsed,
  }
}

export default function useTextSelection() {
  const [state, setState] = useState(() => readSelection())

  useEffect(() => {
    if (typeof document === 'undefined') return

    const update = () => setState(readSelection())
    document.addEventListener('selectionchange', update)

    return () => {
      document.removeEventListener('selectionchange', update)
    }
  }, [])

  return state
}
```
