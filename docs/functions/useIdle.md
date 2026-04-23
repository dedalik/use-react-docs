---
title: useIdle Hook
sidebar_label: useIdle
category: Browser
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useIdle"
---

# useIdle()

<PackageData fn="useIdle" />

## Usage

```tsx
const isIdle = useIdle(60_000);
```

## Copy-paste hook

```tsx
import { useEffect, useRef, useState } from "react";

const events: Array<keyof WindowEventMap> = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];

export default function useIdle(timeout = 60_000) {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reset = () => {
      setIsIdle(false);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setIsIdle(true), timeout);
    };

    reset();
    events.forEach((eventName) => window.addEventListener(eventName, reset, { passive: true }));
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      events.forEach((eventName) => window.removeEventListener(eventName, reset));
    };
  }, [timeout]);

  return isIdle;
}
```
