---
title: Update the page favicon dynamically
sidebar_label: useFavicon
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useFavicon.tsx'
description: >-
  useFavicon from @dedalik/use-react: Update the page favicon dynamically.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useFavicon()

<PackageData fn="useFavicon" />
<HookLiveDemo demo="useFavicon/basic" title="Live demo: useFavicon" />

## Overview

`useFavicon` keeps the current favicon path in React state and, on every change, finds or creates a `<link rel="…">` in the document head, sets its `href` to `baseUrl` + filename, and sets `type` from the file extension so the browser swaps the tab icon without a full reload. You can point at static assets under a CDN path (`baseUrl`), match an existing link via `rel` (for example `icon` vs `shortcut icon`), or pass a custom `doc` when updating a non-default document (tests, embedded HTML). The hook returns a tuple `[favicon, setFavicon]` like `useState`, so you can seed an initial icon from `newIcon` and drive updates from UI or side effects.

### What it accepts

- Optional **`newIcon`** - Initial filename or path fragment (joined with `baseUrl`). Default `''`.
- Optional **`baseUrl`** - Prefix for the final `href` (for example `/icons/` or a CDN origin). Default `''`.
- Optional **`rel`** - `rel` selector / attribute for the link node (`querySelector('link[rel*="…"]')`). Default `'icon'`.
- Optional **`doc`** - Target `Document` (default `document`).

### What it returns

- A tuple **`[favicon, setFavicon]`**: current icon string and a state setter that triggers a head `<link>` update on the next commit.

## Usage

Example: default vs “busy” favicon under a shared asset prefix, with an explicit `rel` and `document` (all options visible).

```tsx
import useFavicon from '@dedalik/use-react/useFavicon'

function Example() {
  const [favicon, setFavicon] = useFavicon({
    newIcon: 'favicon.ico',
    baseUrl: '/brand/icons/',
    rel: 'icon',
    doc: document,
  })

  return (
    <div>
      <h3>Tab icon</h3>
      <p>
        Current file: <strong>{favicon || '-'}</strong>
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button type='button' onClick={() => setFavicon('favicon.ico')}>
          Default
        </button>
        <button type='button' onClick={() => setFavicon('favicon-busy.png')}>
          Busy
        </button>
      </div>
      <p style={{ marginTop: 12, opacity: 0.75 }}>
        The tab icon updates without a full reload; in devtools → Elements → head, the matching link href becomes{' '}
        <code>/brand/icons/</code> plus the filename.
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useFavicon`

**Signature:** `useFavicon(options?: UseFaviconOptions): UseFaviconReturnType`

#### Parameters

Optional object **`UseFaviconOptions`**:

- **`newIcon`** (`string`, optional) - Initial icon filename or suffix; combined with `baseUrl` for `href`. Default `''`.
- **`baseUrl`** (`string`, optional) - Prefix prepended to `newIcon`. Default `''`.
- **`rel`** (`string`, optional) - Used to find/create the `<link>` (`link[rel*="…"]`). Default `'icon'`.
- **`doc`** (`Document`, optional) - Document whose `<head>` is updated. Default `document`.

#### Returns

Tuple **`[favicon, setFavicon]`** (`UseFaviconReturnType`):

- **`favicon`** - Current icon string in state.
- **`setFavicon`** - React state setter; updates state and re-runs the effect that applies the icon.

## Copy-paste hook

### TypeScript

```tsx
import React, { useState, useEffect, useCallback } from 'react'

export interface UseFaviconOptions {
  newIcon?: string
  baseUrl?: string
  rel?: string
  doc?: Document
}

export type UseFaviconReturnType = [string, React.Dispatch<React.SetStateAction<string>>]

const useFavicon = ({
  newIcon = '',
  baseUrl = '',
  rel = 'icon',
  doc = document,
}: UseFaviconOptions = {}): UseFaviconReturnType => {
  const [favicon, setFavicon] = useState<string>(newIcon)

  const applyIcon = useCallback(
    (icon: string) => {
      let linkElement = doc.head.querySelector(`link[rel*="${rel}"]`) as HTMLLinkElement

      if (!linkElement) {
        linkElement = doc.createElement('link')
        linkElement.rel = rel
        doc.head.appendChild(linkElement)
      }

      const iconUrl = `${baseUrl}${icon}`
      if (linkElement.href !== iconUrl) {
        linkElement.href = iconUrl
        linkElement.type = `image/${icon.split('.').pop()}`
      }
    },
    [baseUrl, rel, doc],
  )

  useEffect(() => {
    if (typeof favicon === 'string') {
      applyIcon(favicon)
    }
  }, [favicon, applyIcon])

  return [favicon, setFavicon]
}

export default useFavicon

export type UseFaviconType = ReturnType<typeof useFavicon>
```

### JavaScript

```js
import React, { useState, useEffect, useCallback } from 'react'

const useFavicon = ({ newIcon = '', baseUrl = '', rel = 'icon', doc = document } = {}) => {
  const [favicon, setFavicon] = useState(newIcon)

  const applyIcon = useCallback(
    (icon) => {
      let linkElement = doc.head.querySelector(`link[rel*="${rel}"]`)

      if (!linkElement) {
        linkElement = doc.createElement('link')
        linkElement.rel = rel
        doc.head.appendChild(linkElement)
      }

      const iconUrl = `${baseUrl}${icon}`
      if (linkElement.href !== iconUrl) {
        linkElement.href = iconUrl
        linkElement.type = `image/${icon.split('.').pop()}`
      }
    },
    [baseUrl, rel, doc],
  )

  useEffect(() => {
    if (typeof favicon === 'string') {
      applyIcon(favicon)
    }
  }, [favicon, applyIcon])

  return [favicon, setFavicon]
}

export default useFavicon
```
