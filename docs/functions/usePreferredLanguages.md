---
title: Track preferred browser languages
sidebar_label: usePreferredLanguages
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/usePreferredLanguages.tsx'
description: >-
  usePreferredLanguages from @dedalik/use-react: reactive browser language priority list.
---

# usePreferredLanguages()

<PackageData fn="usePreferredLanguages" />

Last updated: 24/04/2026

## Overview

`usePreferredLanguages` snapshots **`navigator.languages`** (falling back to **`navigator.language`**) into React state so you can pick i18n catalogs, format dates, or show a locale menu in priority order; on the client it listens for the window **`languagechange`** event and re-reads the list when the user reorders languages in browser settings or OS locale changes propagate. On the server it returns **`['en']`** as a harmless placeholder because `navigator` is undefined-replace with your own SSR locale if you need something else.

### What it accepts

- None.

### What it returns

- **`string[]`** - Preferred languages, highest priority first (BCP 47 tags such as `en-US`).

## Usage

Show the ordered list and pick a primary label for the first entry (no `JSON.stringify`).

```tsx
import usePreferredLanguages from '@dedalik/use-react/usePreferredLanguages'

function Example() {
  const languages = usePreferredLanguages()
  const primary = languages[0] ?? '-'

  return (
    <div>
      <h3>Languages</h3>
      <p>
        Primary: <strong>{primary}</strong>
      </p>
      {languages.length ? (
        <ol>
          {languages.map((tag) => (
            <li key={tag}>
              <code>{tag}</code>
            </li>
          ))}
        </ol>
      ) : (
        <p>No entries.</p>
      )}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `usePreferredLanguages`

**Signature:** `usePreferredLanguages(): string[]`

#### Parameters

None.

#### Returns

**`string[]`** - Copy of `navigator.languages` when available, else `[navigator.language]`, else `['en']` on the server.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

function readLanguages(): string[] {
  if (typeof navigator === 'undefined') return ['en']
  if (Array.isArray(navigator.languages) && navigator.languages.length > 0) return [...navigator.languages]
  return [navigator.language || 'en']
}

/**
 * Returns preferred browser languages and reacts to languagechange.
 */
export default function usePreferredLanguages(): string[] {
  const [languages, setLanguages] = useState<string[]>(() => readLanguages())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onChange = () => setLanguages(readLanguages())
    window.addEventListener('languagechange', onChange)
    return () => window.removeEventListener('languagechange', onChange)
  }, [])

  return languages
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

function readLanguages() {
  if (typeof navigator === 'undefined') return ['en']
  if (Array.isArray(navigator.languages) && navigator.languages.length > 0) return [...navigator.languages]
  return [navigator.language || 'en']
}

export default function usePreferredLanguages() {
  const [languages, setLanguages] = useState(() => readLanguages())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onChange = () => setLanguages(readLanguages())
    window.addEventListener('languagechange', onChange)
    return () => window.removeEventListener('languagechange', onChange)
  }, [])

  return languages
}
```
