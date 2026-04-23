---
title: Check if component is mounted
sidebar_label: useMountedState
category: Lifecycle
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useMountedState"
---

# useMountedState()

<PackageData fn="useMountedState" />


Last updated: 23/04/2026, 15:56
## Overview

`useMountedState` returns a function that tells whether component is still mounted.

This is useful for guarding async callbacks to avoid updates after unmount in complex request flows.

### What it accepts

- No arguments.

### What it returns

- Function `() => boolean` that reports mounted status.


## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useState } from "react";
import useMountedState from "@dedalik/use-react/useMountedState";

function MountedProbeExample() {
  const isMounted = useMountedState();
  const [label, setLabel] = useState("");

  return (
    <div>
      <button type="button" onClick={() => setLabel(isMounted() ? "mounted" : "unmounted")}>
        Check mounted ref
      </button>
      <p>{label}</p>
    </div>
  );
}

export default function MountedProbeDemo() {
  return <MountedProbeExample />;
}
```

## API Reference

### `useMountedState`

**Signature:** `useMountedState(): () => boolean`

#### Parameters

None.

#### Returns

A function `isMounted()` that returns whether the component is still mounted (useful after `await`).

## Copy-paste hook

```tsx
import { useCallback, useEffect, useRef } from 'react'

export default function useMountedState(): () => boolean {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return useCallback(() => mountedRef.current, [])
}
```

### JavaScript version

```js
import { useCallback, useEffect, useRef } from "react";

export default function useMountedState() {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(() => mountedRef.current, []);
}
```
