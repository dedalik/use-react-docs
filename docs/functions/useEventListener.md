---
title: useEventListener Hook
sidebar_label: useEventListener
category: Browser
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useEventListener"
---

# useEventListener()

<PackageData fn="useEventListener" />

## Usage

```tsx
useEventListener("resize", () => {
  console.log(window.innerWidth);
});
```

## Copy-paste hook

```tsx
import { RefObject, useEffect, useRef } from "react";

type Target = Window | Document | HTMLElement | MediaQueryList | null;

export default function useEventListener<KW extends keyof WindowEventMap>(
  eventName: KW,
  listener: (event: WindowEventMap[KW]) => void,
  target?: Target | RefObject<Target>
) {
  const savedListener = useRef(listener);

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  useEffect(() => {
    const targetValue =
      target && "current" in target ? target.current : target || (typeof window !== "undefined" ? window : null);

    if (!targetValue?.addEventListener) return;
    const eventListener = (event: Event) => savedListener.current(event as WindowEventMap[KW]);
    targetValue.addEventListener(eventName, eventListener as EventListener);
    return () => targetValue.removeEventListener(eventName, eventListener as EventListener);
  }, [eventName, target]);
}
```
