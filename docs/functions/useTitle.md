---
title: Set and restore document title
sidebar_label: useTitle
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useTitle.tsx'
description: >-
  useTitle from @dedalik/use-react: Set and restore document title. TypeScript,
  tree-shakable import, examples, SSR notes.
---

# useTitle()

<PackageData fn="useTitle" />

Last updated: 24/04/2026

## Overview

`useTitle` runs a **`useEffect`** whenever **`title`** or **`restoreOnUnmount`** changes: on mount it assigns **`document.title`** to your string (no-op when **`document`** is missing), and when **`restoreOnUnmount`** is **`true`** it captures the previous title and restores it in the effect cleanup-handy for route-level pages that should hand the tab label back to the parent shell when unmounted. With **`restoreOnUnmount: false`** (default), the title you set remains after navigation, which matches many SPAs that treat the last written title as global until something else updates it.

### What it accepts

- **`title`** - String written to **`document.title`**.
- **`restoreOnUnmount`** (optional) - When **`true`**, revert to the title that existed before this effect ran. Default **`false`**.

### What it returns

- Nothing (**`void`**) - side effects only.

## Usage

Drive the tab label from local state; pass **`restoreOnUnmount`** explicitly so the snippet shows both parameters (no `JSON.stringify`).

```tsx
import { useState } from 'react'
import useTitle from '@dedalik/use-react/useTitle'

function Example() {
  const [topic, setTopic] = useState('Dashboard')

  useTitle(`use-react - ${topic}`, true)

  return (
    <div>
      <h3>Document title</h3>
      <p>
        Tab should read: <strong>use-react - {topic}</strong> (restore on unmount is on).
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button type='button' onClick={() => setTopic('Dashboard')}>
          Dashboard
        </button>
        <button type='button' onClick={() => setTopic('Settings')}>
          Settings
        </button>
      </div>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useTitle`

**Signature:** `useTitle(title: string, restoreOnUnmount?: boolean): void`

#### Parameters

1. **`title`** (`string`) - Next `document.title`.
2. **`restoreOnUnmount`** (`boolean`, optional) - Restore previous title on cleanup. Default **`false`**.

#### Returns

**`void`** - No return value; updates `document.title` via an effect.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect } from 'react'

export default function useTitle(title: string, restoreOnUnmount = false) {
  useEffect(() => {
    if (typeof document === 'undefined') return

    const previousTitle = document.title
    document.title = title

    if (!restoreOnUnmount) return

    return () => {
      document.title = previousTitle
    }
  }, [restoreOnUnmount, title])
}
```

### JavaScript

```js
import { useEffect } from 'react'

export default function useTitle(title, restoreOnUnmount = false) {
  useEffect(() => {
    if (typeof document === 'undefined') return

    const previousTitle = document.title
    document.title = title

    if (!restoreOnUnmount) return

    return () => {
      document.title = previousTitle
    }
  }, [restoreOnUnmount, title])
}
```
