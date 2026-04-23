---
title: useMountedState Hook
sidebar_label: useMountedState
category: Lifecycle
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useMountedState"
---

# useMountedState()

<PackageData fn="useMountedState" />

## Usage

```tsx
const isMounted = useMountedState();
if (!isMounted()) return;
```

## Copy-paste hook

```tsx
import { useCallback, useEffect, useRef } from "react";

export default function useMountedState(): () => boolean {
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
