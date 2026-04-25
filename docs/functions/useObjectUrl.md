---
title: Blob to object URL with cleanup
sidebar_label: useObjectUrl
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useObjectUrl.tsx'
description: >-
  useObjectUrl from @dedalik/use-react: createObjectURL + revoke on change/unmount.
---

# useObjectUrl()

<PackageData fn="useObjectUrl" />

Last updated: 24/04/2026

## Overview

`useObjectUrl` **mirrors** a **`Blob`**, **`File`**, or **`MediaSource` into a **revocable\*\* **`blob:`** **URL** for use in **`<img src>`**, **`<a download>`**, **`<video src>`**, or **fetch**-**ish** **APIs** that **accept** **strings**. On **each** **effect** **run** it **revokes** the **previous** **URL** (if **any**), **creates** a **new** **one** with **`URL.createObjectURL`**, and **stores** it in **state**; when **`object`** is **`null` / `undefined`**, it **clears** to **`null`**. On **unmount** or when **`object`** **identity** **changes**, **`URL.revokeObjectURL`** **runs** to **free** **memory**-**important** for **large** **files** and **frequent** **re**-**picks** in **file** **inputs**. The **dependency** is **`[object]`** by **reference**-**mutating** a **Blob** **in** **place** will **not** **refresh** the **URL** **unless** you **swap** the **instance**.

### What it accepts

1. **`object`**: `Blob | MediaSource | null | undefined`

### What it returns

- **`string | null`** - **ready** for **`src={url ?? undefined}`** or **conditional** **render**

## Usage

**Pick** a **file**; **show** a **preview** with **`<img>`**; **clear** the **input** to **drop** the **object** and **URL**.

```tsx
import { useState } from 'react'
import useObjectUrl from '@dedalik/use-react/useObjectUrl'

function Example() {
  const [file, setFile] = useState<File | null>(null)
  const url = useObjectUrl(file)

  return (
    <div>
      <input
        type='file'
        accept='image/*'
        onChange={(e) => {
          const f = e.target.files?.[0] ?? null
          setFile(f)
        }}
      />
      {url ? <img src={url} alt='Preview' style={{ maxWidth: 200, display: 'block' }} /> : <p>No file</p>}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useObjectUrl`

**Signature:** `useObjectUrl(object: Blob | MediaSource | null | undefined): string | null`

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

/**
 * Creates and revokes an object URL for Blob/File-like input.
 */
export default function useObjectUrl(object: Blob | MediaSource | null | undefined): string | null {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!object) {
      setUrl(null)
      return
    }

    const nextUrl = URL.createObjectURL(object)
    setUrl(nextUrl)

    return () => {
      URL.revokeObjectURL(nextUrl)
    }
  }, [object])

  return url
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

/**
 * Creates and revokes an object URL for Blob/File-like input.
 */
export default function useObjectUrl(object) {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    if (!object) {
      setUrl(null)
      return
    }

    const nextUrl = URL.createObjectURL(object)
    setUrl(nextUrl)

    return () => {
      URL.revokeObjectURL(nextUrl)
    }
  }, [object])

  return url
}
```
