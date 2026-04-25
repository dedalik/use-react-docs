---
title: Battery status from getBattery
sidebar_label: useBattery
category: Device
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useBattery.tsx'
description: >-
  useBattery from @dedalik/use-react: level, charging, times, isSupported, event-driven.
---

# useBattery()

<PackageData fn="useBattery" />

Last updated: 24/04/2026

## Overview

`useBattery` **reflects** the [Battery Status API](https://developer.mozilla.org/docs/Web/API/Battery_Status_API) when **`navigator.getBattery`** **exists**-it **resolves** the **promise**, **copies** **fields** from the **`BatteryManager`**, and **listens** for **`chargingchange`**, **`chargingtimechange`**, **`dischargingtimechange`**, and **`levelchange`**. If **isSupported** is **false** (no **`getBattery`**-**common** on **iOS Safari** and **older** **browsers**), **returned** **values** are **inert** **placeholders** (`level: 1`, **not** **charging**). The **effect** **removes** **listeners** on **unmount**. **Times** are **in** **seconds** as **defined** by the **spec** (`Infinity` is **valid**).

### What it accepts

- **None** (no parameters)

### What it returns

- **`{ isSupported, charging, chargingTime, dischargingTime, level }`**

## Usage

**Show** **level** as **percent** when **supported**; otherwise a **short** **notice**.

```tsx
import useBattery from '@dedalik/use-react/useBattery'

function Example() {
  const { isSupported, level, charging } = useBattery()
  const pct = Math.round(level * 100)

  return (
    <p>
      {isSupported
        ? `Battery: ${pct}%${charging ? ' (charging)' : ''}`
        : 'Battery status API is not available in this browser.'}
    </p>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useBattery`

**Signature:** `useBattery(): UseBatteryReturn`

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

interface BatteryManagerLike extends EventTarget {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
  addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void
  removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void
}

export interface UseBatteryReturn {
  isSupported: boolean
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
}

/**
 * Reads battery status from navigator.getBattery when available.
 */
export default function useBattery(): UseBatteryReturn {
  const batteryNavigator =
    typeof navigator !== 'undefined'
      ? (navigator as Navigator & { getBattery?: () => Promise<BatteryManagerLike> })
      : undefined

  const isSupported = !!batteryNavigator?.getBattery
  const [state, setState] = useState<UseBatteryReturn>({
    isSupported,
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
    level: 1,
  })

  useEffect(() => {
    if (!isSupported || !batteryNavigator?.getBattery) return

    let battery: BatteryManagerLike | null = null

    const update = () => {
      if (!battery) return
      setState({
        isSupported: true,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
        level: battery.level,
      })
    }

    batteryNavigator.getBattery().then((resolvedBattery) => {
      battery = resolvedBattery
      update()
      battery.addEventListener('chargingchange', update)
      battery.addEventListener('chargingtimechange', update)
      battery.addEventListener('dischargingtimechange', update)
      battery.addEventListener('levelchange', update)
    })

    return () => {
      if (!battery) return
      battery.removeEventListener('chargingchange', update)
      battery.removeEventListener('chargingtimechange', update)
      battery.removeEventListener('dischargingtimechange', update)
      battery.removeEventListener('levelchange', update)
    }
  }, [batteryNavigator, isSupported])

  return state
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

/**
 * Reads battery status from navigator.getBattery when available.
 */
export default function useBattery() {
  const batteryNavigator =
    typeof navigator !== 'undefined' ? navigator : undefined

  const isSupported = typeof batteryNavigator?.getBattery === 'function'
  const [state, setState] = useState({
    isSupported,
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
    level: 1,
  })

  useEffect(() => {
    if (!isSupported || !batteryNavigator?.getBattery) return

    let battery = null

    const update = () => {
      if (!battery) return
      setState({
        isSupported: true,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
        level: battery.level,
      })
    }

    batteryNavigator.getBattery().then((resolvedBattery) => {
      battery = resolvedBattery
      update()
      battery.addEventListener('chargingchange', update)
      battery.addEventListener('chargingtimechange', update)
      battery.addEventListener('dischargingtimechange', update)
      battery.addEventListener('levelchange', update)
    })

    return () => {
      if (!battery) return
      battery.removeEventListener('chargingchange', update)
      battery.removeEventListener('chargingtimechange', update)
      battery.removeEventListener('dischargingtimechange', update)
      battery.removeEventListener('levelchange', update)
    }
  }, [batteryNavigator, isSupported])

  return state
}
```
