---
title: Encode value as Base64
sidebar_label: useBase64
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useBase64.tsx'
description: >-
  useBase64 from @dedalik/use-react: UTF-8 Base64, optional JSON stringification, memoized.
---

# useBase64()

<PackageData fn="useBase64" />

Last updated: 24/04/2026

## Overview

`useBase64` **memoizes** a **Base64**-**encoded** **string** from **`[value, json]`**. If **`options.json`** is **false** (the **default**), the **source** is **`String(value ?? '')`**. If **`json`** is **true**, the **source** is a **JSON** string of **`value`**, which lets you **round**-**trip** small **object** **payloads** through **ASCII**-**only** **transports**-but **circular** **values** and **`JSON` rules** apply, and a **failing** **`JSON.stringify`** yields **`''`** in the **catch** **branch**. In the **browser** it **prefers** `btoa(encodeURIComponent(…))` for **UTF-8**; in **Node** a **`Buffer`** **fallback** is used. **Invalid** or **unavailable** encoders result in **`''`** (errors are **swallowed** in the **hook**).

### What it accepts

1. **`value`**: `unknown` - any **serializable** **or** stringifiable **value**
2. **`options`**: `{ json?: boolean }` - default **`json: false`**

### What it returns

- **Base64** `string` (or **`''`** on error)

## Usage

Plain **text** encoding, then **object** encoding with **`{ json: true }`** (no `JSON.stringify` in **your** **component** code).

```tsx
import { useState } from 'react'
import useBase64 from '@dedalik/use-react/useBase64'

function Example() {
  const [text, setText] = useState('Hello, world')
  const plainB64 = useBase64(text, { json: false })
  const objB64 = useBase64({ a: 1, b: 'x' }, { json: true })

  return (
    <div>
      <label>
        Text
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <p>String as Base64 (length {plainB64.length})</p>
      <p>Object as JSON→Base64 (length {objB64.length})</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useBase64`

**Signature:** `useBase64(value: unknown, options?: UseBase64Options): string`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

export interface UseBase64Options {
  json?: boolean
}

function encodeUtf8(input: string): string {
  if (typeof globalThis.btoa === 'function') {
    return globalThis.btoa(unescape(encodeURIComponent(input)))
  }

  if (typeof Buffer !== 'undefined') {
    return Buffer.from(input, 'utf-8').toString('base64')
  }

  throw new Error('No base64 encoder available')
}

/**
 * Encodes input into Base64 with optional JSON serialization.
 */
export default function useBase64(value: unknown, options: UseBase64Options = {}): string {
  const { json = false } = options

  return useMemo(() => {
    try {
      const source = json ? JSON.stringify(value) : String(value ?? '')
      return encodeUtf8(source)
    } catch {
      return ''
    }
  }, [value, json])
}
```

### JavaScript

```js
import { useMemo } from 'react'

function encodeUtf8(input) {
  if (typeof globalThis.btoa === 'function') {
    return globalThis.btoa(unescape(encodeURIComponent(input)))
  }

  if (typeof Buffer !== 'undefined') {
    return Buffer.from(input, 'utf-8').toString('base64')
  }

  throw new Error('No base64 encoder available')
}

/**
 * Encodes input into Base64 with optional JSON serialization.
 */
export default function useBase64(value, options = {}) {
  const { json = false } = options

  return useMemo(() => {
    try {
      const source = json ? JSON.stringify(value) : String(value ?? '')
      return encodeUtf8(source)
    } catch {
      return ''
    }
  }, [value, json])
}
```
