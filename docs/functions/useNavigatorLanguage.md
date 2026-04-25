---
title: Track active browser language
sidebar_label: useNavigatorLanguage
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useNavigatorLanguage.tsx'
description: >-
  useNavigatorLanguage from @dedalik/use-react: current navigator language with languagechange updates.
---

# useNavigatorLanguage()

<PackageData fn="useNavigatorLanguage" />

Last updated: 24/04/2026

## Overview

`useNavigatorLanguage` reads **`navigator.language`** (BCP 47 tag such as `en-GB`) on the client, defaults to **`en`** when **`navigator`** is missing during SSR, and re-reads on the window **`languagechange`** event so locale switches in browser or OS settings propagate to React. For a full **priority list** use **`usePreferredLanguages`**, which is broader than this single string hook.

### What it accepts

- None.

### What it returns

- **`string`** - Current primary `navigator.language`.

## Usage

Show the tag in UI (no `JSON.stringify`).

```tsx
import useNavigatorLanguage from '@dedalik/use-react/useNavigatorLanguage'

function Example() {
  const language = useNavigatorLanguage()

  return (
    <div>
      <h3>Language</h3>
      <p>
        <code>navigator.language</code>: <strong>{language}</strong>
      </p>
      <p style={{ marginBottom: 0, fontSize: 14, opacity: 0.85 }}>
        For the full list, use <code>usePreferredLanguages</code>.
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useNavigatorLanguage`

**Signature:** `useNavigatorLanguage(): string`

#### Parameters

None.

#### Returns

**`string`**.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

function readLanguage(): string {
  if (typeof navigator === 'undefined') return 'en'
  return navigator.language || 'en'
}

/**
 * Returns current navigator language and reacts to languagechange.
 */
export default function useNavigatorLanguage(): string {
  const [language, setLanguage] = useState(() => readLanguage())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onChange = () => setLanguage(readLanguage())
    window.addEventListener('languagechange', onChange)
    return () => window.removeEventListener('languagechange', onChange)
  }, [])

  return language
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

function readLanguage() {
  if (typeof navigator === 'undefined') return 'en'
  return navigator.language || 'en'
}

export default function useNavigatorLanguage() {
  const [language, setLanguage] = useState(() => readLanguage())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onChange = () => setLanguage(readLanguage())
    window.addEventListener('languagechange', onChange)
    return () => window.removeEventListener('languagechange', onChange)
  }, [])

  return language
}
```
