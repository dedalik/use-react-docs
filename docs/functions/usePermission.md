---
title: Track browser permission state
sidebar_label: usePermission
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/usePermission.tsx'
description: >-
  usePermission from @dedalik/use-react: tracks PermissionStatus for a named feature.
---

# usePermission()

<PackageData fn="usePermission" />

Last updated: 24/04/2026

## Overview

`usePermission` calls **`navigator.permissions.query({ name })`** (with the descriptor cast browsers expect), seeds React state from **`PermissionStatus.state`**, and listens for the **`change`** event so **`granted` / `denied` / `prompt`** updates when the user flips a toggle in site settings or OS privacy panels. If **`permissions.query`** is missing or throws for that **`name`**, the hook settles on **`'unsupported'`**-distinct from **`denied`**-so UI can hide prompts instead of looking broken. The **`name`** argument must match a **`PermissionName`** your target browsers implement (coverage varies widely beyond **`geolocation`** and **`notifications`**).

### What it accepts

- **`name`** - `PermissionName` passed to `navigator.permissions.query`.

### What it returns

- **`PermissionStateValue`** - `PermissionState | 'unsupported'`.

## Usage

Track **geolocation** (widely implemented); show state as text (no `JSON.stringify`).

```tsx
import usePermission from '@dedalik/use-react/usePermission'

function Example() {
  const geolocation = usePermission('geolocation')

  return (
    <div>
      <h3>Geolocation permission</h3>
      <p>
        State: <strong>{geolocation}</strong>
      </p>
      <p style={{ marginBottom: 0, opacity: 0.85 }}>
        Change location access in the browser lock icon / site settings to see updates.
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `usePermission`

**Signature:** `usePermission(name: PermissionName): PermissionStateValue`

#### Parameters

- **`name`** (`PermissionName`) - Permission descriptor name for `navigator.permissions.query`.

#### Returns

**`PermissionStateValue`** - `'granted' | 'denied' | 'prompt'` from `PermissionStatus`, or `'unsupported'`.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export type PermissionStateValue = PermissionState | 'unsupported'

/**
 * Tracks browser permission state for a named permission.
 */
export default function usePermission(name: PermissionName): PermissionStateValue {
  const [state, setState] = useState<PermissionStateValue>('unsupported')

  useEffect(() => {
    let status: PermissionStatus | null = null
    let active = true

    const onChange = () => {
      if (active && status) setState(status.state)
    }

    const run = async () => {
      if (!navigator.permissions?.query) return

      try {
        status = await navigator.permissions.query({ name } as PermissionDescriptor)
        if (!active || !status) return

        setState(status.state)
        status.addEventListener('change', onChange)
      } catch {
        setState('unsupported')
      }
    }

    void run()

    return () => {
      active = false
      if (status) status.removeEventListener('change', onChange)
    }
  }, [name])

  return state
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

export default function usePermission(name) {
  const [state, setState] = useState('unsupported')

  useEffect(() => {
    let status = null
    let active = true

    const onChange = () => {
      if (active && status) setState(status.state)
    }

    const run = async () => {
      if (!navigator.permissions?.query) return

      try {
        status = await navigator.permissions.query({ name })
        if (!active || !status) return

        setState(status.state)
        status.addEventListener('change', onChange)
      } catch {
        setState('unsupported')
      }
    }

    void run()

    return () => {
      active = false
      if (status) status.removeEventListener('change', onChange)
    }
  }, [name])

  return state
}
```
