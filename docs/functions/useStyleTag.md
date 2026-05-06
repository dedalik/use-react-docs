---
title: Inject dynamic CSS style tag
sidebar_label: useStyleTag
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useStyleTag.tsx'
description: >-
  useStyleTag from @dedalik/use-react: injects and cleans up dynamic styles.
---

# useStyleTag()

<PackageData fn="useStyleTag" />

<HookLiveDemo demo="useStyleTag/basic" />

## Overview

`useStyleTag` runs in an effect keyed by the **`css`** string: when **`css`** is non-empty it generates a unique **`<style id="use-react-style-…">`**, appends it to **`document.head`**, and sets **`loaded`** / **`id`**; when **`css`** is empty or **`document`** is missing (SSR), it resets to **`{ id: null, loaded: false, error: false }`** without leaving nodes behind. The effect cleanup **removes** the element on dependency change or unmount so hot-swapping theme snippets or scoped component CSS does not accumulate orphaned tags; **`error`** flips **`true`** only if creation or append throws (extremely rare).

### What it accepts

- **`css`** (optional) - Full stylesheet text to inject. Omit or pass `''` to inject nothing and clear state.

### What it returns

- **`id`** - Assigned `<style>` element id, or `null`.
- **`loaded`** - Whether a style node was successfully mounted for the current **`css`**.
- **`error`** - Whether the last mount attempt threw (`boolean`).

## Usage

Toggle a snippet that paints a class on the page; show **`id`**, **`loaded`**, and **`error`** (no `JSON.stringify`).

```tsx
import { useState } from 'react'
import useStyleTag from '@dedalik/use-react/useStyleTag'

function Example() {
  const [on, setOn] = useState(false)
  const css = on ? `.style-tag-demo-box { outline: 3px solid #6366f1; outline-offset: 4px; border-radius: 8px; }` : ''

  const { id, loaded, error } = useStyleTag(css)

  return (
    <div>
      <h3>Injected style</h3>
      <p>
        Tag id: <strong>{id ?? '-'}</strong> - loaded: <strong>{loaded ? 'yes' : 'no'}</strong> - error:{' '}
        <strong>{error ? 'yes' : 'no'}</strong>
      </p>
      <button type='button' onClick={() => setOn((value) => !value)}>
        {on ? 'Remove CSS' : 'Inject CSS'}
      </button>
      <div className='style-tag-demo-box' style={{ marginTop: 16, padding: 12, maxWidth: 360 }}>
        This box gets an outline when injected CSS is on.
      </div>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useStyleTag`

**Signature:** `useStyleTag(css?: string): UseStyleTagReturn`

#### Parameters

- **`css`** (`string`, optional) - Stylesheet body for a new `<style>` in `<head>`.

#### Returns

**`UseStyleTagReturn`**:

- **`id`** (`string | null`) - Created element id.
- **`loaded`** (`boolean`) - Success flag for current **`css`**.
- **`error`** (`boolean`) - Injection failure flag.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export interface UseStyleTagReturn {
  id: string | null
  loaded: boolean
  error: boolean
}

/**
 * Injects a style tag into document head.
 */
export default function useStyleTag(css?: string): UseStyleTagReturn {
  const [state, setState] = useState<UseStyleTagReturn>({ id: null, loaded: false, error: false })

  useEffect(() => {
    if (!css || typeof document === 'undefined') {
      setState({ id: null, loaded: false, error: false })
      return undefined
    }

    try {
      const id = `use-react-style-${Math.random().toString(36).slice(2, 10)}`
      const style = document.createElement('style')
      style.id = id
      style.textContent = css
      document.head.appendChild(style)
      setState({ id, loaded: true, error: false })

      return () => {
        style.remove()
      }
    } catch {
      setState({ id: null, loaded: false, error: true })
      return undefined
    }
  }, [css])

  return state
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

export default function useStyleTag(css) {
  const [state, setState] = useState({ id: null, loaded: false, error: false })

  useEffect(() => {
    if (!css || typeof document === 'undefined') {
      setState({ id: null, loaded: false, error: false })
      return undefined
    }

    try {
      const id = `use-react-style-${Math.random().toString(36).slice(2, 10)}`
      const style = document.createElement('style')
      style.id = id
      style.textContent = css
      document.head.appendChild(style)
      setState({ id, loaded: true, error: false })

      return () => {
        style.remove()
      }
    } catch {
      setState({ id: null, loaded: false, error: true })
      return undefined
    }
  }, [css])

  return state
}
```
