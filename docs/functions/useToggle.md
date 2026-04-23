---
title: Toggle boolean state
sidebar_label: useToggle
category: State
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useToggle"
---

# useToggle()

<PackageData fn="useToggle" />


Last updated: 23/04/2026, 15:56
## Overview

`useToggle` manages a boolean value with convenient toggle and setter actions.

It is one of the simplest and most practical hooks for UI states like open/closed, enabled/disabled, and visible/hidden.

### What it accepts

- `initialValue` (optional): starting boolean state.

### What it returns

- `[value, toggle, set]` tuple.


## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import useToggle from "@dedalik/use-react/useToggle";

function PanelToggleExample() {
  const [open, toggle] = useToggle(false);

  return (
    <div>
      <button type="button" onClick={() => toggle()}>
        {open ? "Hide" : "Show"} panel
      </button>
      {open ? <div style={{ marginTop: 8 }}>Panel content</div> : null}
    </div>
  );
}

export default function PanelToggleDemo() {
  return <PanelToggleExample />;
}
```

## API Reference

### `useToggle`

**Signature:** `useToggle(initialValue?: boolean): UseToggleReturn`

#### Parameters

1. **`initialValue`** - Starting boolean (default `false`).

#### Returns

Tuple `[value, toggle, set]` - current flag, flip function, and explicit setter.

## Copy-paste hook

```tsx
import { useCallback, useState } from 'react'

export type UseToggleReturn = [boolean, () => void, (nextValue: boolean) => void]

export default function useToggle(initialValue = false): UseToggleReturn {
  const [value, setValue] = useState<boolean>(initialValue)

  const toggle = useCallback(() => {
    setValue((currentValue) => !currentValue)
  }, [])

  const set = useCallback((nextValue: boolean) => {
    setValue(nextValue)
  }, [])

  return [value, toggle, set]
}
```

### JavaScript version

```js
import { useCallback, useState } from "react";

export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((currentValue) => !currentValue);
  }, []);

  const set = useCallback((nextValue) => {
    setValue(nextValue);
  }, []);

  return [value, toggle, set];
}
```
