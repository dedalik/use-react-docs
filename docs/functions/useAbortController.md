---
title: useAbortController Hook for Request Cancellation
sidebar_label: useAbortController
category: Async
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useAbortController"
---

# useAbortController()

<PackageData fn="useAbortController" />

## Overview

`useAbortController` gives you an `AbortController` lifecycle for async operations. It helps cancel pending requests on unmount and avoid race conditions when starting a new request.

## Usage

```tsx
import { useAbortController } from "@dedalik/use-react";

const UserLoader = () => {
  const { signal, renew } = useAbortController();

  const loadUser = async () => {
    const controller = renew();
    if (!controller) return;

    await fetch("/api/user", { signal: controller.signal });
  };

  return <button onClick={loadUser}>Load user</button>;
};
```

## Copy-paste hook

```tsx
import { useCallback, useEffect, useMemo, useState } from "react";

export interface UseAbortControllerReturn {
  controller: AbortController | null;
  signal: AbortSignal | null;
  renew: () => AbortController | null;
  abort: () => void;
}

const hasAbortController = typeof AbortController !== "undefined";

function createController(): AbortController | null {
  return hasAbortController ? new AbortController() : null;
}

export default function useAbortController(): UseAbortControllerReturn {
  const [controller, setController] = useState<AbortController | null>(() => createController());

  const renew = useCallback((): AbortController | null => {
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
