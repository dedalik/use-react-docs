---
title: Track active focused element
sidebar_label: useActiveElement
category: Elements
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useActiveElement.tsx'
description: >-
  useActiveElement from @dedalik/use-react: reactive document.activeElement tracker.
---

# useActiveElement()

<PackageData fn="useActiveElement" />
<HookLiveDemo demo="useActiveElement/basic" title="Live demo: useActiveElement" />

## Overview

`useActiveElement` mirrors `document.activeElement` into React state by listening to `focusin` / `focusout` on `document`, so your UI can react whenever focus moves between inputs, buttons, links, or contenteditable regions (including focus changes caused by programmatic `.focus()` calls). The initial value reads `document.activeElement` on the client and falls back to `null` during SSR; after mount, updates happen on every focus transition until the component unmounts.

### What it accepts

- No arguments.

### What it returns

- The current `document.activeElement`, or `null` when unavailable. Type `Element | null`.

## Usage

Real-world example: show which control is currently focused in a small form (no `document.activeElement` calls in render logic).

```tsx
import useActiveElement from '@dedalik/use-react/useActiveElement'

function Example() {
  const active = useActiveElement()

  const describe = (el: Element | null) => {
    if (!el || !(el instanceof HTMLElement)) return 'none'
    const id = el.id ? `#${el.id}` : ''
    const name = 'name' in el && typeof (el as HTMLInputElement).name === 'string' ? (el as HTMLInputElement).name : ''
    return `${el.tagName.toLowerCase()}${id}${name ? `[name=${name}]` : ''}`
  }

  return (
    <div>
      <h3>Focus inspector</h3>
      <p>
        Active element: <code>{describe(active)}</code>
      </p>

      <div style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
        <label htmlFor='email'>
          Email
          <input id='email' name='email' type='email' placeholder='you@example.com' style={{ width: '100%' }} />
        </label>
        <label htmlFor='notes'>
          Notes
          <textarea id='notes' name='notes' rows={3} placeholder='Type here…' style={{ width: '100%' }} />
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type='button'>Save</button>
          <button type='button'>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useActiveElement`

**Signature:** `useActiveElement(): Element | null`

#### Parameters

None.

#### Returns

The current `document.activeElement`, or `null` when unavailable. (`Element | null`).

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

/**
 * Tracks current document.activeElement.
 */
export default function useActiveElement(): Element | null {
  const [activeElement, setActiveElement] = useState<Element | null>(() =>
    typeof document !== 'undefined' ? document.activeElement : null,
  )

  useEffect(() => {
    const update = () => setActiveElement(document.activeElement)

    document.addEventListener('focusin', update)
    document.addEventListener('focusout', update)

    return () => {
      document.removeEventListener('focusin', update)
      document.removeEventListener('focusout', update)
    }
  }, [])

  return activeElement
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

export default function useActiveElement() {
  const [activeElement, setActiveElement] = useState(() =>
    typeof document !== 'undefined' ? document.activeElement : null,
  )

  useEffect(() => {
    const update = () => setActiveElement(document.activeElement)

    document.addEventListener('focusin', update)
    document.addEventListener('focusout', update)

    return () => {
      document.removeEventListener('focusin', update)
      document.removeEventListener('focusout', update)
    }
  }, [])

  return activeElement
}
```
