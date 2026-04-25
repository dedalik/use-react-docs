---
title: Track pressed keyboard keys
sidebar_label: useMagicKeys
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useMagicKeys.tsx'
description: >-
  useMagicKeys from @dedalik/use-react: reactive map of active keys.
---

# useMagicKeys()

<PackageData fn="useMagicKeys" />

Last updated: 24/04/2026

## Overview

`useMagicKeys` keeps a **mutable map** of which keys are currently down: on **`keydown`** the matching **`event.key`** (lower‑cased) is set to **`true`**, on **`keyup`** to **`false`**, and **`window` `blur`** clears the whole map. Keys you never reported stay absent from the object, so a common pattern is **`Boolean(pressed['a'])`**. The hook does not normalize layout vs physical keys, repeat events, or compose sequences; it is a lightweight debug / chord helper. The return value is memoized when the map reference is stable.

### What it accepts

- None.

### What it returns

- **`MagicKeysState`**: `Record<string, boolean>`

## Usage

Display keys you care about (for example **`a` / `d`** for a simple on-screen “controls” readout).

```tsx
import useMagicKeys from '@dedalik/use-react/useMagicKeys'

function Example() {
  const keys = useMagicKeys()

  return (
    <p>
      A: {keys['a'] ? 'down' : 'up'} | D: {keys['d'] ? 'down' : 'up'} | Space: {keys[' '] ? 'down' : 'up'}
    </p>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useMagicKeys`

**Signature:** `useMagicKeys(): MagicKeysState`

#### Parameters

None.

#### Returns

A record mapping lower‑cased **`key`** values to **true** (held) or **false** (released), plus **`useMemo`**.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useMemo, useState } from 'react'

export type MagicKeysState = Record<string, boolean>

/**
 * Tracks currently pressed keyboard keys by event.key.
 */
export default function useMagicKeys(): MagicKeysState {
  const [pressed, setPressed] = useState<MagicKeysState>({})

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      setPressed((prev) => ({ ...prev, [key]: true }))
    }

    const onUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      setPressed((prev) => ({ ...prev, [key]: false }))
    }

    const onBlur = () => setPressed({})

    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return useMemo(() => pressed, [pressed])
}
```

### JavaScript

```js
import { useEffect, useMemo, useState } from 'react'

/**
 * Tracks currently pressed keyboard keys by event.key.
 */
export default function useMagicKeys() {
  const [pressed, setPressed] = useState({})

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onDown = (event) => {
      const key = event.key.toLowerCase()
      setPressed((prev) => ({ ...prev, [key]: true }))
    }

    const onUp = (event) => {
      const key = event.key.toLowerCase()
      setPressed((prev) => ({ ...prev, [key]: false }))
    }

    const onBlur = () => setPressed({})

    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return useMemo(() => pressed, [pressed])
}
```
