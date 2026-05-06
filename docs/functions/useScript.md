---
title: Load external scripts with status
sidebar_label: useScript
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useScript.tsx'
description: >-
  useScript from @dedalik/use-react: Load external scripts with status.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useScript()

<PackageData fn="useScript" />

<HookLiveDemo demo="useScript/basic" />

## Overview

`useScript` manages a **`<script async src="…">`** lifecycle keyed by **`src`**: when **`src`** is set it reuses an existing tag with the same URL if one is already in the document (status jumps to **`ready`**), otherwise inserts a new node into **`document.body`**, listens for **`load`** / **`error`**, and reports **`idle` → `loading` → `ready` | `error`**. On cleanup it detaches listeners and **removes only scripts it created**, so shared CDN libraries loaded elsewhere are not deleted; omitting **`src`** yields **`idle`**. Use the status to gate code that assumes globals such as **`window._`** after loading Lodash from a CDN.

### What it accepts

- **`src`** (optional) - Absolute or root-relative script URL. Omit or **`undefined`** to stay idle.

### What it returns

- **`ScriptStatus`** - **`'idle' | 'loading' | 'ready' | 'error'`**.

## Usage

Load a tiny public script and show status; toggle **`src`** to demonstrate the parameter (no `JSON.stringify`).

```tsx
import { useState } from 'react'
import useScript from '@dedalik/use-react/useScript'

const LODASH_CDN = 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js'

function Example() {
  const [enabled, setEnabled] = useState(false)
  const status = useScript(enabled ? LODASH_CDN : undefined)
  const displayStatus = enabled ? status : 'idle'
  const lodashReady = enabled && status === 'ready' && typeof window !== 'undefined' && '_' in window

  return (
    <div>
      <h3>External script</h3>
      <p>
        Status: <strong>{displayStatus}</strong>
        {enabled ? null : <span style={{ opacity: 0.75 }}> (no src - hook stays idle)</span>}
      </p>
      <button type='button' onClick={() => setEnabled((value) => !value)}>
        {enabled ? 'Unload URL' : 'Load Lodash from CDN'}
      </button>
      <p style={{ marginTop: 12 }}>
        Global <code>_</code> available: <strong>{lodashReady ? 'yes' : 'no'}</strong>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useScript`

**Signature:** `useScript(src?: string): ScriptStatus`

#### Parameters

- **`src`** (`string`, optional) - Script URL to inject or match.

#### Returns

**`ScriptStatus`** - `'idle' | 'loading' | 'ready' | 'error'`.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error'

export default function useScript(src?: string): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>(() => {
    if (!src) return 'idle'
    if (typeof document === 'undefined') return 'loading'
    const existingScript = document.querySelector(`script[src="${src}"]`)
    return existingScript ? 'ready' : 'loading'
  })

  useEffect(() => {
    if (!src || typeof document === 'undefined') return

    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null
    let created = false

    if (!script) {
      script = document.createElement('script')
      script.src = src
      script.async = true
      created = true
      document.body.appendChild(script)
    }

    const onLoad = () => setStatus('ready')
    const onError = () => setStatus('error')

    script.addEventListener('load', onLoad)
    script.addEventListener('error', onError)
    setStatus('loading')

    return () => {
      script?.removeEventListener('load', onLoad)
      script?.removeEventListener('error', onError)

      if (created) {
        script?.remove()
      }
    }
  }, [src])

  return status
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

export default function useScript(src) {
  const [status, setStatus] = useState(() => {
    if (!src) return 'idle'
    if (typeof document === 'undefined') return 'loading'
    const existingScript = document.querySelector(`script[src="${src}"]`)
    return existingScript ? 'ready' : 'loading'
  })

  useEffect(() => {
    if (!src || typeof document === 'undefined') return

    let script = document.querySelector(`script[src="${src}"]`)
    let created = false

    if (!script) {
      script = document.createElement('script')
      script.src = src
      script.async = true
      created = true
      document.body.appendChild(script)
    }

    const onLoad = () => setStatus('ready')
    const onError = () => setStatus('error')

    script.addEventListener('load', onLoad)
    script.addEventListener('error', onError)
    setStatus('loading')

    return () => {
      script?.removeEventListener('load', onLoad)
      script?.removeEventListener('error', onError)

      if (created) {
        script?.remove()
      }
    }
  }, [src])

  return status
}
```
