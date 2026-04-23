---
title: Auto-resize textarea to fit content
sidebar_label: useTextareaAutoSize
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useTextareaAutoSize'
description: >-
  useTextareaAutoSize from @dedalik/use-react: Auto-resize textarea to fit
  content. TypeScript, tree-shakable import, examples, SSR notes.
---

# useTextareaAutoSize()

<PackageData fn="useTextareaAutoSize" />

Last updated: 23/04/2026, 15:56

## Overview

`useTextareaAutoSize` automatically resizes a textarea based on content height.

This improves typing experience by removing fixed-height friction and keeping long-form inputs readable.

### What it accepts

- `options` (optional): textarea ref, current input, resize callback, and custom style target.

### What it returns

- Object containing `textareaRef`, `input`, `setInput`, and `triggerResize`.

Automatically adjust the height of a textarea based on its content.

## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import useTextareaAutoSize from '@dedalik/use-react/useTextareaAutoSize'

function AutoGrowNotesExample() {
  const { textareaRef, input, setInput } = useTextareaAutoSize()

  return (
    <textarea
      ref={textareaRef}
      value={input ?? ''}
      onChange={(e) => setInput(e.target.value)}
      rows={1}
      style={{ width: '100%', minHeight: 40 }}
      placeholder='Type multiple lines...'
    />
  )
}

export default function AutoGrowNotesDemo() {
  return <AutoGrowNotesExample />
}
```

## CSS to hide scroll

```css
/* Hide scrollbar for Chrome, Safari and Opera */
textarea::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
textarea {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
```

## API Reference

### `useTextareaAutoSize`

**Signature:** `useTextareaAutoSize(options?)`

#### Parameters

Optional **`options`**:

- `elementRef` / internal ref - textarea element.
- `input` - controlled text value driving height recalculation.
- `onResize` - callback after height change.
- `styleTarget` - optional element whose height should mirror the textarea.

#### Returns

`{ textareaRef, input, setInput, triggerResize }` - refs, state, and manual resize trigger.

## Copy-paste hook

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

### JavaScript version

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
```

## Type declarations

```typescript
interface UseTextareaAutosizeOptions {
  /** Textarea element to autosize. */
  element?: HTMLTextAreaElement | undefined
  /** Textarea content. */
  input?: string | undefined
  /** Function called when the textarea size changes. */
  onResize?: () => void
  /** Specify style target to apply the height based on textarea content. If not provided it will use textarea itself.  */
  styleTarget?: HTMLElement
}
export declare function useTextareaAutoSize(options?: UseTextareaAutosizeOptions): {
  textarea: import('react').MutableRefObject<HTMLTextAreaElement | null>
  input: string | undefined
  setInput: import('react').Dispatch<import('react').SetStateAction<string | undefined>>
  triggerResize: () => void
}
export type UseTextareaAutosizeReturn = ReturnType<typeof useTextareaAutoSize>
```
