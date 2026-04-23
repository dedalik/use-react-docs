---
title: Cancel stale async requests
sidebar_label: useAbortController
category: Async
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useAbortController"
---

# useAbortController()

<PackageData fn="useAbortController" />


Last updated: 23/04/2026, 15:56
## Overview

`useAbortController` helps you cancel stale async work when a component unmounts or when a new request should replace an old one.

For beginners, this hook is a safe default for fetch-heavy UIs: search, filters, tab switches, and any screen where users can trigger requests repeatedly.

### What it accepts

- No arguments.

### What it returns

- `controller`: current `AbortController` instance (or `null` when unavailable).
- `signal`: current `AbortSignal` you pass to `fetch` and other cancellable APIs.
- `renew()`: aborts previous controller and creates a fresh one.
- `abort()`: aborts current controller immediately.



`useAbortController` gives you an `AbortController` lifecycle for async operations. It helps cancel pending requests on unmount and avoid race conditions when starting a new request.

## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import useAbortController from "@dedalik/use-react/useAbortController";

function RemotePostExample() {
  const { renew } = useAbortController();

  const load = async () => {
    const controller = renew();
    if (!controller) return;

    await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      signal: controller.signal,
    });
  };

  return (
    <button type="button" onClick={() => void load()}>
      Load post (abort-safe)
    </button>
  );
}

export default function RemotePostDemo() {
  return <RemotePostExample />;
}
```

## API Reference

### `useAbortController`

**Signature:** `useAbortController(): UseAbortControllerReturn`

#### Parameters

None.

#### Returns

Object with:

- `controller`: current `AbortController` or `null` if unavailable.
- `signal`: `AbortSignal` to pass to `fetch` / `axios` / other cancellable APIs.
- `renew()`: aborts the previous controller, creates a new one, returns it.
- `abort()`: aborts the active controller and replaces it with a fresh instance.

## Copy-paste hook

```tsx
import { useCallback, useEffect, useMemo, useState } from 'react'

export interface UseAbortControllerReturn {
  controller: AbortController | null
  signal: AbortSignal | null
  renew: () => AbortController | null
  abort: () => void
}

const hasAbortController = typeof AbortController !== 'undefined'

function createController(): AbortController | null {
  return hasAbortController ? new AbortController() : null
}

/**
 * Provides an AbortController lifecycle that auto-aborts on unmount.
 */
export default function useAbortController(): UseAbortControllerReturn {
  const [controller, setController] = useState<AbortController | null>(() => createController())

  const renew = useCallback((): AbortController | null => {
    const nextController = createController()

    setController((currentController) => {
      currentController?.abort()
      return nextController
    })

    return nextController
  }, [])

  const abort = useCallback(() => {
    setController((currentController) => {
      currentController?.abort()
      return createController()
    })
  }, [])

  useEffect(() => {
    return () => {
      controller?.abort()
    }
  }, [controller])

  return useMemo(
    () => ({
      controller,
      signal: controller?.signal ?? null,
      renew,
      abort,
    }),
    [abort, controller, renew],
  )
}
```

### JavaScript version

```js
import { useCallback, useEffect, useMemo, useState } from "react";

const hasAbortController = typeof AbortController !== 'undefined';
function createController() {
  return hasAbortController ? new AbortController() : null;
}
/**
 * Provides an AbortController lifecycle that auto-aborts on unmount.
 */
export default function useAbortController() {
  const [controller, setController] = useState(() =>
    createController()
  );

  const renew = useCallback(() => {
    const nextController = createController();
    setController((currentController) => {
      currentController?.abort();
      return nextController;
    });
    return nextController;
  }, []);

  const abort = useCallback(() => {
    setController((currentController) => {
      currentController?.abort();
      return createController();
    });
  }, []);

  useEffect(() => {
    return () => {
      controller?.abort();
    };
  }, [controller]);

  return useMemo(
    () => ({
      controller,
      signal: controller?.signal ?? null,
      renew,
      abort,
    }),
    [abort, controller, renew]
  );
}
```
## Type declarations

```ts
export interface UseAbortControllerReturn {
  controller: AbortController | null;
  signal: AbortSignal | null;
  renew: () => AbortController | null;
  abort: () => void;
}

declare function useAbortController(): UseAbortControllerReturn;
export default useAbortController;
```
