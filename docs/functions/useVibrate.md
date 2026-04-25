---
title: Trigger device vibration patterns
sidebar_label: useVibrate
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useVibrate.tsx'
description: >-
  useVibrate from @dedalik/use-react: vibration helper for supported devices.
---

# useVibrate()

<PackageData fn="useVibrate" />

Last updated: 24/04/2026

## Overview

`useVibrate` returns a **stable function** that forwards a **`VibratePattern`**-either a single milliseconds duration or an alternating **`[on, off, on, …]`** array-to **`navigator.vibrate`**, returning **`false`** when the API is missing, blocked, or throws (many desktop browsers report no motor). Because **`navigator.vibrate`** often requires a **user gesture**, call the returned helper from click handlers rather than `useEffect`; iOS Safari historically ignores patterns-treat success booleans as best-effort haptics for Android and compatible mobile WebViews.

### What it accepts

- None.

### What it returns

- **`(pattern: VibratePattern) => boolean`** - Vibrate helper; **`true`** if the browser accepted the pattern.

## Usage

Short buzz vs a pulse **array** from button clicks (no `JSON.stringify`).

```tsx
import { useState } from 'react'
import useVibrate from '@dedalik/use-react/useVibrate'

function Example() {
  const vibrate = useVibrate()
  const [last, setLast] = useState<'-' | 'accepted' | 'ignored'>('-')

  return (
    <div>
      <h3>Vibration</h3>
      <p>
        Last call: <strong>{last}</strong> (requires a physical device with vibration + user gesture).
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button
          type='button'
          onClick={() => {
            const ok = vibrate(80)
            setLast(ok ? 'accepted' : 'ignored')
          }}
        >
          Short (number)
        </button>
        <button
          type='button'
          onClick={() => {
            const ok = vibrate([60, 40, 60, 40, 120])
            setLast(ok ? 'accepted' : 'ignored')
          }}
        >
          Pattern (array)
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

### `useVibrate`

**Signature:** `useVibrate(): (pattern: VibratePattern) => boolean`

#### Parameters

None.

#### Returns

Function **`(pattern: VibratePattern) => boolean`**:

- **`pattern`** - Milliseconds (`number`) or sequence (`number[]`) per the Vibration API.
- Return value - Whether `navigator.vibrate` returned truthy.

## Copy-paste hook

### TypeScript

```tsx
import { useCallback } from 'react'

export type VibratePattern = number | number[]

/**
 * Returns a helper to trigger vibration when supported.
 */
export default function useVibrate(): (pattern: VibratePattern) => boolean {
  return useCallback((pattern: VibratePattern) => {
    if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return false

    try {
      return navigator.vibrate(pattern)
    } catch {
      return false
    }
  }, [])
}
```

### JavaScript

```js
import { useCallback } from 'react'

export default function useVibrate() {
  return useCallback((pattern) => {
    if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return false

    try {
      return navigator.vibrate(pattern)
    } catch {
      return false
    }
  }, [])
}
```
