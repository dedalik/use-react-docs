---
title: Store the latest value in a ref
sidebar_label: useLatest
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useLatest'
description: >-
  useLatest from @dedalik/use-react: Store the latest value in a ref.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useLatest()

<PackageData fn="useLatest" />


Last updated: 23/04/2026, 15:56
## Overview

`useLatest` stores the most recent value inside a ref.

It is often used together with listeners and async handlers to read fresh values without re-subscribing effects.

### What it accepts

- `value`: any value that should be kept up to date.

### What it returns

- A ref object with `.current` always equal to the latest value.


## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useState } from "react";
import useLatest from "@dedalik/use-react/useLatest";

function LatestMirrorExample() {
  const [value, setValue] = useState("hello");
  const latest = useLatest(value);

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <p>Ref tracks input: {String(latest.current === value)}</p>
    </div>
  );
}

export default function LatestMirrorDemo() {
  return <LatestMirrorExample />;
}
```

## API Reference

### `useLatest`

**Signature:** `useLatest<T>(value: T): React.MutableRefObject<T>`

#### Parameters

1. **`value`** - Any value to keep in `.current` on every render.

#### Returns

A ref whose `.current` always equals the latest `value`.

## Copy-paste hook

```tsx
import { useRef } from 'react'

export default function useLatest<T>(value: T) {
  const valueRef = useRef<T>(value)
  valueRef.current = value
  return valueRef
}
```

### JavaScript version

```js
import { useRef } from "react";

export default function useLatest(value) {
  const valueRef = useRef(value);
  valueRef.current = value;

  return valueRef;
}
```
