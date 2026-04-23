---
title: Update the page favicon dynamically
sidebar_label: useFavicon
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useFavicon'
description: >-
  useFavicon from @dedalik/use-react: Update the page favicon dynamically.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useFavicon()

<PackageData fn="useFavicon" />

Last updated: 23/04/2026, 15:56

## Overview

`useFavicon` updates the page favicon dynamically at runtime.

It is useful for branding changes, status indicators, or context-driven visual cues in tabs (for example, alerts).

### What it accepts

- `options` (optional): initial icon, base URL, relation type, and target document.

### What it returns

- `[favicon, setFavicon]` tuple for reading and updating current favicon value.

`useFavicon` is a custom React hook that provides an easy and efficient way to dynamically change the favicon of a webpage. A favicon, short for "favorite icon", is a small image displayed in the browser tab next to the page title. This hook allows developers to programmatically update the favicon based on different states or actions within a React application.

## Features

- **Dynamic Favicon Update:** Easily change the favicon at runtime without the need to reload the page.
- **Customizable Options:** Supports customization including the icon URL, base URL, and relationship attribute (`rel`).
- **Document Injection:** Dynamically inserts a `<link>` element into the document head if it does not already exist, ensuring compatibility with all web pages.
- **Efficient Rendering:** Uses React's `useState` and `useCallback` for optimized rendering and re-rendering only when necessary.

## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useState } from 'react'
import useFavicon from '@dedalik/use-react/useFavicon'

function FaviconSwitcherExample() {
  const [, setFavicon] = useFavicon({ newIcon: '/favicon.ico' })
  const [url, setUrl] = useState('/favicon.ico')

  return (
    <div>
      <input value={url} onChange={(e) => setUrl(e.target.value)} />
      <button type='button' onClick={() => setFavicon(url)}>
        Apply favicon URL
      </button>
    </div>
  )
}

export default function FaviconSwitcherDemo() {
  return <FaviconSwitcherExample />
}
```

## API Reference

### `useFavicon`

**Signature:** `useFavicon(options?): [string, React.Dispatch<React.SetStateAction<string>>]`

#### Parameters

Optional **`options`** object:

- `newIcon` - Initial favicon path or URL.
- `baseUrl` - Prefix applied before `newIcon`.
- `rel` - Link `rel` (default `icon`).
- `doc` - Target `Document` (tests / non-default documents).

#### Returns

Tuple `[favicon, setFavicon]` - current favicon string and setter to update it (and the DOM link).

## Copy-paste hook

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

### JavaScript version

```js
import { useState, useEffect, useCallback } from 'react'

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

## Type Declarations

- `UseFaviconOptions`: An object type for passing options to the hook. Contains `newIcon`, `baseUrl`, `rel`, and `doc`.

- `UseFaviconReturnType`: A tuple return type from the hook. It consists of the current favicon string and a dispatch function to update the favicon.

The `useFavicon` hook simplifies the process of changing the favicon dynamically, making it a handy tool for React developers looking to enhance the UI/UX of their web applications.

```typescript
import React from 'react'
export interface UseFaviconOptions {
  newIcon?: string
  baseUrl?: string
  rel?: string
  doc?: Document
}
export type UseFaviconReturnType = [string, React.Dispatch<React.SetStateAction<string>>]
declare const useFavicon: ({ newIcon, baseUrl, rel, doc }?: UseFaviconOptions) => UseFaviconReturnType
export default useFavicon
export type UseFaviconType = ReturnType<typeof useFavicon>
```
