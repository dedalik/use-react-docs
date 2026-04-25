---
title: Auto-resize textarea to fit content
sidebar_label: useTextareaAutoSize
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useTextareaAutoSize.tsx'
description: >-
  useTextareaAutoSize from @dedalik/use-react: Auto-resize textarea to fit
  content. TypeScript, tree-shakable import, examples, SSR notes.
---

# useTextareaAutoSize()

<PackageData fn="useTextareaAutoSize" />

Last updated: 24/04/2026

## Overview

`useTextareaAutoSize` measures a `<textarea>`’s `scrollHeight` and applies the computed height either directly on the textarea or on an optional `styleTarget` wrapper, so the field grows/shrinks as the user types without manual height bookkeeping. It also exposes `input`/`setInput` state (kept in sync with `options.input` when provided) and `triggerResize` for cases where layout changes without a value change (fonts loaded, window resized, programmatic DOM updates).

### What it accepts

- `options?: UseTextareaAutoSizeOptions` - Optional configuration (`elementRef`, `input`, `onResize`, `styleTarget`).

### What it returns

- `textareaRef`: Ref to attach to the `<textarea>` (or your provided `elementRef`). Type `React.RefObject<HTMLTextAreaElement | null>`.
- `input`: Current textarea text managed by the hook. Type `string | undefined`.
- `setInput`: Updates `input` and triggers a resize pass. Type `(next: string | undefined) => void`.
- `triggerResize`: Recomputes height from the current DOM state. Type `() => void`.

## Usage

Real-world example: auto-grow a comment box, optionally sizing a wrapper (`styleTarget`) and observing resize events via `onResize`.

```tsx
import { useEffect, useRef, useState } from 'react'
import useTextareaAutoSize from '@dedalik/use-react/useTextareaAutoSize'

function Example() {
  const shellRef = useRef<HTMLDivElement | null>(null)
  const [styleTarget, setStyleTarget] = useState<HTMLElement | undefined>(undefined)
  const [resizeCount, setResizeCount] = useState(0)

  useEffect(() => {
    setStyleTarget(shellRef.current ?? undefined)
  }, [])

  const { textareaRef, input, setInput } = useTextareaAutoSize({
    styleTarget,
    onResize: () => setResizeCount((c) => c + 1),
  })

  return (
    <div>
      <h3>Comment</h3>
      <div
        ref={shellRef}
        style={{
          border: '1px solid #ddd',
          borderRadius: 8,
          padding: 12,
          minHeight: 120,
        }}
      >
        <textarea
          ref={textareaRef}
          value={input ?? ''}
          onChange={(event) => setInput(event.target.value)}
          placeholder='Write a comment…'
          style={{ width: '100%', resize: 'none', lineHeight: 1.4 }}
        />
      </div>
      <p>Characters: {(input ?? '').length}</p>
      <p>Resize events: {resizeCount}</p>
      <button type='button' onClick={() => setInput(`${input ?? ''}\nThanks!`)}>
        Append line
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useTextareaAutoSize`

**Signature:** `useTextareaAutoSize(options?: UseTextareaAutoSizeOptions)`

#### Parameters

1. **`options?`** (optional `UseTextareaAutoSizeOptions`) - `elementRef` uses an external textarea ref; `input` controls the text from outside; `onResize` runs after height updates; `styleTarget` applies height to a wrapper element instead of the textarea.

#### Returns

Object with:

- `textareaRef` - Ref to attach to the `<textarea>` (or your provided `elementRef`). (`React.RefObject<HTMLTextAreaElement | null>`).
- `input` - Current textarea text managed by the hook. (`string | undefined`).
- `setInput` - Updates `input` and triggers a resize pass. (`(next: string | undefined) => void`).
- `triggerResize` - Recomputes height from the current DOM state. (`() => void`).

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useRef, useState, useCallback, RefObject } from 'react'

interface UseTextareaAutoSizeOptions {
  /** Textarea element ref. */
  elementRef?: RefObject<HTMLTextAreaElement>
  /** Textarea content. */
  input?: string | undefined
  /** Function called when the textarea size changes. */
  onResize?: () => void
  /** Specify style target to apply the height based on textarea content. If not provided it will use textarea itself.  */
  styleTarget?: HTMLElement
}

export default function useTextareaAutoSize(options?: UseTextareaAutoSizeOptions) {
  const [input, setInput] = useState<string | undefined>(options?.input)
  const internalTextareaRef = useRef<HTMLTextAreaElement | null>(null)
  const textareaRef = options?.elementRef || internalTextareaRef

  const triggerResize = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    let height = ''

    textarea.style.height = '1px'
    const textareaScrollHeight = textarea.scrollHeight

    // If style target is provided update its height
    if (options?.styleTarget) {
      options.styleTarget.style.height = `${textareaScrollHeight}px`
    }
    // else update textarea's height by updating height variable
    else {
      height = `${textareaScrollHeight}px`
    }

    textarea.style.height = height

    options?.onResize?.()
  }, [options, textareaRef])

  useEffect(() => {
    triggerResize()
  }, [input, triggerResize])

  // Updating the local state when the input prop changes
  useEffect(() => {
    setInput(options?.input)
  }, [options?.input])

  return {
    textareaRef,
    input,
    setInput, // To allow updating the input externally
    triggerResize,
  }
}

export type UseTextareaAutoSizeType = ReturnType<typeof useTextareaAutoSize>
```

### JavaScript

```js
import { useEffect, useRef, useState, useCallback } from 'react'

export default function useTextareaAutoSize(options) {
  const [input, setInput] = useState(options?.input)
  const internalTextareaRef = useRef(null)
  const textareaRef = options?.elementRef || internalTextareaRef

  const triggerResize = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    let height = ''

    textarea.style.height = '1px'
    const textareaScrollHeight = textarea.scrollHeight

    if (options?.styleTarget) {
      options.styleTarget.style.height = `${textareaScrollHeight}px`
    } else {
      height = `${textareaScrollHeight}px`
    }

    textarea.style.height = height

    options?.onResize?.()
  }, [options, textareaRef])

  useEffect(() => {
    triggerResize()
  }, [input, triggerResize])

  useEffect(() => {
    setInput(options?.input)
  }, [options?.input])

  return {
    textareaRef,
    input,
    setInput,
    triggerResize,
  }
}
```
