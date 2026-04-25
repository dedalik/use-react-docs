---
title: Clamped step index between min and max
sidebar_label: useStepper
category: Array
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useStepper.tsx'
description: >-
  useStepper from @dedalik/use-react: numeric step in [min, max] with next/prev.
---

# useStepper()

<PackageData fn="useStepper" />

Last updated: 24/04/2026

## Overview

`useStepper` holds an integer **current** in **[`min`, `max`]** (inclusive on both ends). **`max` < `min`** is corrected by using **`safeMax = Math.max(min, max)`**. **`next` / `prev`** move by one and **clamp**; **`goTo(n)`** clamps; **`reset`** returns to the **initial** value, also **clamped** to the final range. **`isFirst` / `isLast`** are **true** when **current** is on the min/max edges. The hook does not render UI-it is a small FSM for **multi-step** forms or wizards. Changing **`min` / `max` / `initial`** in props after mount **does not** re-seed `useState` (only the initial `safeInitial` at first mount), unless you add a key in the parent.

### What it accepts

1. **`max`**: `number` - upper bound
2. Optional **`initial`**: `number` (default **0**)
3. Optional **`min`**: `number` (default **0**)

### What it returns

- **`UseStepperReturn`**: `current`, `isFirst`, `isLast`, `next`, `prev`, `goTo`, `reset`

## Usage

Four steps (0…3) with **Next/Prev** and a **“Review” (goTo 3))** action.

```tsx
import { useState } from 'react'
import useStepper from '@dedalik/use-react/useStepper'

const STEPS = ['Account', 'Plan', 'Payment', 'Done']

function Example() {
  const step = useStepper(STEPS.length - 1, 0, 0)
  const [dirty, setDirty] = useState(true)

  return (
    <div>
      <p>
        Step {step.current + 1} / {STEPS.length}
      </p>
      <h3>{STEPS[step.current]}</h3>
      <p>
        <label>
          <input type='checkbox' checked={dirty} onChange={(e) => setDirty(e.target.checked)} /> Form dirty
        </label>
      </p>
      <p>
        <button type='button' onClick={step.prev} disabled={step.isFirst}>
          Back
        </button>{' '}
        <button type='button' onClick={step.next} disabled={step.isLast || !dirty}>
          Next
        </button>
      </p>
      <p>
        <button type='button' onClick={() => step.goTo(3)} disabled={step.isLast}>
          Skip to end
        </button>{' '}
        <button type='button' onClick={step.reset}>
          Start over
        </button>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useStepper`

**Signature:** `useStepper(max: number, initial?: number, min?: number): UseStepperReturn`

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useState } from 'react'

export interface UseStepperReturn {
  current: number
  isFirst: boolean
  isLast: boolean
  next: () => void
  prev: () => void
  goTo: (value: number) => void
  reset: () => void
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export default function useStepper(max: number, initial = 0, min = 0): UseStepperReturn {
  const safeMax = Math.max(min, max)
  const safeInitial = clamp(initial, min, safeMax)
  const [current, setCurrent] = useState(safeInitial)

  const next = useCallback(() => setCurrent((c) => clamp(c + 1, min, safeMax)), [min, safeMax])
  const prev = useCallback(() => setCurrent((c) => clamp(c - 1, min, safeMax)), [min, safeMax])
  const goTo = useCallback((value: number) => setCurrent(clamp(value, min, safeMax)), [min, safeMax])
  const reset = useCallback(() => setCurrent(safeInitial), [safeInitial])

  return {
    current,
    isFirst: current <= min,
    isLast: current >= safeMax,
    next,
    prev,
    goTo,
    reset,
  }
}
```

### JavaScript

```js
import { useCallback, useState } from 'react'

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export default function useStepper(max, initial = 0, min = 0) {
  const safeMax = Math.max(min, max)
  const safeInitial = clamp(initial, min, safeMax)
  const [current, setCurrent] = useState(safeInitial)

  const next = useCallback(() => setCurrent((c) => clamp(c + 1, min, safeMax)), [min, safeMax])
  const prev = useCallback(() => setCurrent((c) => clamp(c - 1, min, safeMax)), [min, safeMax])
  const goTo = useCallback((value) => setCurrent(clamp(value, min, safeMax)), [min, safeMax])
  const reset = useCallback(() => setCurrent(safeInitial), [safeInitial])

  return {
    current,
    isFirst: current <= min,
    isLast: current >= safeMax,
    next,
    prev,
    goTo,
    reset,
  }
}
```
