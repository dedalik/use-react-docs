---
title: Human-readable relative time
sidebar_label: useTimeAgo
category: Time
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useTimeAgo.tsx'
description: >-
  useTimeAgo from @dedalik/use-react: RelativeTimeFormat label with auto bucket choice.
---

# useTimeAgo()

<PackageData fn="useTimeAgo" />

Last updated: 24/04/2026

## Overview

`useTimeAgo` takes a **target** instant and strings it with **`Intl.RelativeTimeFormat`**, automatically picking **second / minute / hour / day / week / month / year** by magnitude (custom thresholds in the source, e.g. &lt; **45 s** in seconds, then minutes, hours, **days &lt; ~6**, then weeks, months, years). It keeps a **`now`** in state, **refreshed** on **`updateInterval`** (default **60_000** ms) so labels move forward in time; **`0` or `null`** for **`updateInterval`** **disables** ticking (still re-syncs when **`target`** changes). **`null`/`undefined`/invalid** target returns **`''`**. **`locale`** and **`relativeOptions`** are forwarded. **Future** and **past** are both supported. See also [`useTimeAgoIntl`](./useTimeAgoIntl) (identical **implementation** export).

### What it accepts

1. **`target`**: `Date | number | null | undefined`
2. Optional **`options`**: `{ locale?; updateInterval?; relativeOptions? }` - `updateInterval` default **60000** ms; `0` / `null` = no **live** tick

### What it returns

- **`string`**

## Usage

“Last save” **2 minutes ago**, **`en-US`**, re-tick every **10 s** in the demo (short for docs).

```tsx
import { useState } from 'react'
import useTimeAgo from '@dedalik/use-react/useTimeAgo'

function Example() {
  const [saved, setSaved] = useState(() => new Date(Date.now() - 2 * 60 * 1000))
  const label = useTimeAgo(saved, {
    locale: 'en-US',
    updateInterval: 10_000,
  })

  return (
    <div>
      <p>Last save: {label || '-'}</p>
      <button type="button" onClick={() => setSaved(new Date())}>
        Save now
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useTimeAgo`

**Signature:** `useTimeAgo(target: Date | number | null | undefined, options?: UseTimeAgoOptions): string`

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useMemo, useState } from 'react'

export interface UseTimeAgoOptions {
  locale?: string
  updateInterval?: number | null
  relativeOptions?: Intl.RelativeTimeFormatOptions
}

function formatRelativeTime(
  target: Date,
  now: Date,
  locale: string | undefined,
  relativeOptions: Intl.RelativeTimeFormatOptions | undefined,
): string {
  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: 'auto',
    ...relativeOptions,
  })

  const diffSec = (now.getTime() - target.getTime()) / 1000
  const absSec = Math.abs(diffSec)
  if (absSec < 45) {
    return rtf.format(-Math.round(diffSec), 'second')
  }

  const diffMin = diffSec / 60
  const absMin = Math.abs(diffMin)
  if (absMin < 45) {
    return rtf.format(-Math.round(diffMin), 'minute')
  }

  const diffHr = diffMin / 60
  const absHr = Math.abs(diffHr)
  if (absHr < 22) {
    return rtf.format(-Math.round(diffHr), 'hour')
  }

  const diffDay = diffHr / 24
  const absDay = Math.abs(diffDay)
  if (absDay < 6) {
    return rtf.format(-Math.round(diffDay), 'day')
  }

  const diffWeek = diffDay / 7
  const absWeek = Math.abs(diffWeek)
  if (absWeek < 4.5) {
    return rtf.format(-Math.round(diffWeek), 'week')
  }

  const diffMonth = diffDay / 30
  const absMonth = Math.abs(diffMonth)
  if (absMonth < 11) {
    return rtf.format(-Math.round(diffMonth), 'month')
  }

  const diffYear = diffDay / 365
  return rtf.format(-Math.round(diffYear), 'year')
}

function stableRelativeKey(options: Intl.RelativeTimeFormatOptions | undefined): string {
  if (!options || Object.keys(options).length === 0) return ''
  return JSON.stringify(options, Object.keys(options).sort())
}

/**
 * Human-readable relative time (`Intl.RelativeTimeFormat`) for a past or future instant.
 */
export default function useTimeAgo(
  target: Date | number | null | undefined,
  options?: UseTimeAgoOptions,
): string {
  const { locale, updateInterval = 60_000, relativeOptions } = options ?? {}
  const relativeKey = stableRelativeKey(relativeOptions)

  const [now, setNow] = useState(() => new Date())

  const targetTime =
    target == null
      ? null
      : typeof target === 'number'
        ? target
        : Number.isNaN(target.getTime())
          ? null
          : target.getTime()

  useEffect(() => {
    setNow(new Date())
  }, [targetTime])

  useEffect(() => {
    if (updateInterval == null || updateInterval <= 0) {
      return
    }

    const id = window.setInterval(() => {
      setNow(new Date())
    }, updateInterval)

    return () => window.clearInterval(id)
  }, [updateInterval])

  return useMemo(() => {
    if (targetTime == null) return ''
    const t = new Date(targetTime)
    return formatRelativeTime(t, now, locale, relativeOptions)
  }, [targetTime, now, locale, relativeKey]) // eslint-disable-line react-hooks/exhaustive-deps -- relativeKey mirrors relativeOptions
}
```

### JavaScript

```js
import { useEffect, useMemo, useState } from 'react'

function formatRelativeTime(target, now, locale, relativeOptions) {
  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: 'auto',
    ...relativeOptions,
  })

  const diffSec = (now.getTime() - target.getTime()) / 1000
  const absSec = Math.abs(diffSec)
  if (absSec < 45) {
    return rtf.format(-Math.round(diffSec), 'second')
  }

  const diffMin = diffSec / 60
  const absMin = Math.abs(diffMin)
  if (absMin < 45) {
    return rtf.format(-Math.round(diffMin), 'minute')
  }

  const diffHr = diffMin / 60
  const absHr = Math.abs(diffHr)
  if (absHr < 22) {
    return rtf.format(-Math.round(diffHr), 'hour')
  }

  const diffDay = diffHr / 24
  const absDay = Math.abs(diffDay)
  if (absDay < 6) {
    return rtf.format(-Math.round(diffDay), 'day')
  }

  const diffWeek = diffDay / 7
  const absWeek = Math.abs(diffWeek)
  if (absWeek < 4.5) {
    return rtf.format(-Math.round(diffWeek), 'week')
  }

  const diffMonth = diffDay / 30
  const absMonth = Math.abs(diffMonth)
  if (absMonth < 11) {
    return rtf.format(-Math.round(diffMonth), 'month')
  }

  const diffYear = diffDay / 365
  return rtf.format(-Math.round(diffYear), 'year')
}

function stableRelativeKey(options) {
  if (!options || Object.keys(options).length === 0) return ''
  return JSON.stringify(options, Object.keys(options).sort())
}

/**
 * Human-readable relative time (`Intl.RelativeTimeFormat`) for a past or future instant.
 */
export default function useTimeAgo(target, options) {
  const { locale, updateInterval = 60_000, relativeOptions } = options ?? {}
  const relativeKey = stableRelativeKey(relativeOptions)

  const [now, setNow] = useState(() => new Date())

  const targetTime =
    target == null
      ? null
      : typeof target === 'number'
        ? target
        : Number.isNaN(target.getTime())
          ? null
          : target.getTime()

  useEffect(() => {
    setNow(new Date())
  }, [targetTime])

  useEffect(() => {
    if (updateInterval == null || updateInterval <= 0) {
      return
    }

    const id = window.setInterval(() => {
      setNow(new Date())
    }, updateInterval)

    return () => window.clearInterval(id)
  }, [updateInterval])

  return useMemo(() => {
    if (targetTime == null) return ''
    const t = new Date(targetTime)
    return formatRelativeTime(t, now, locale, relativeOptions)
  }, [targetTime, now, locale, relativeKey]) // eslint-disable-line react-hooks/exhaustive-deps -- relativeKey mirrors relativeOptions
}
```
