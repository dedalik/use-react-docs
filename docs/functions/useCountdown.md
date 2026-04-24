---
title: Countdown to a deadline
sidebar_label: useCountdown
category: Time
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useCountdown'
description: >-
  useCountdown from @dedalik/use-react: remaining ms and clock fields until a
  target instant. TypeScript, tree-shakable import, SSR notes.
---

# useCountdown()

<PackageData fn="useCountdown" />

Last updated: 23/04/2026

## Overview

`useCountdown` tracks time until a **`target`** instant (`Date` or ms). It exposes **`remainingMs`**, **`isFinished`**, and floored **`days` / `hours` / `minutes` / `seconds`** for UI. An optional **`onComplete`** runs once when the countdown first reaches zero for that target.

### What it accepts

1. **`target`** — future `Date` or timestamp; `null` / `undefined` yields a finished state (`remainingMs` 0).
2. **`options`** (optional) — `{ interval?: number | null, onComplete?: () => void }`. Default **`interval`** is `1000` ms; `null` / `0` recomputes only when `target` changes.

### What it returns

`UseCountdownResult` — `{ remainingMs, isFinished, totalSeconds, days, hours, minutes, seconds }`.

## SSR

Initial render uses server time; the client may show a different remaining value after hydration when an interval is active.

## Usage

```tsx
import useCountdown from '@dedalik/use-react/useCountdown'

export default function SaleEnds({ end }: { end: Date }) {
  const { remainingMs, isFinished, hours, minutes, seconds } = useCountdown(end, {
    interval: 1000,
    onComplete: () => console.log('done'),
  })

  if (isFinished) return <p>Sale ended</p>
  return (
    <p>
      {hours}h {minutes}m {seconds}s ({remainingMs} ms)
    </p>
  )
}
```

## API Reference

### `useCountdown`

**Signature:** `useCountdown(target, options?): UseCountdownResult`

#### Parameters

1. **`target`** — deadline.
2. **`options`** — tick interval and optional completion callback.

#### Returns

Countdown snapshot object.

## Copy-paste hook

Source of truth: [`useCountdown.tsx` on GitHub](https://github.com/dedalik/use-react/blob/main/src/hooks/useCountdown.tsx).

## Type declarations

```ts
import type { UseCountdownOptions, UseCountdownResult } from '@dedalik/use-react/useCountdown'

declare function useCountdown(
  target: Date | number | null | undefined,
  options?: UseCountdownOptions,
): UseCountdownResult

export default useCountdown
```
