---
title: useMediaQuery Hook for Responsive Logic
sidebar_label: useMediaQuery
category: Browser
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useMediaQuery"
---

# useMediaQuery()

<PackageData fn="useMediaQuery" />

## Overview

`useMediaQuery` listens to a media query and returns whether it currently matches. It is useful for responsive logic in components, not only responsive CSS styles.

## Usage

```tsx
import { useMediaQuery } from "@dedalik/use-react";

const ResponsiveHeader = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return <h1>{isDesktop ? "Desktop layout" : "Mobile layout"}</h1>;
};
```

## Copy-paste hook

```tsx
import { useEffect, useState } from "react";

export interface UseMediaQueryOptions {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
  targetWindow?: Window;
}

const isBrowser = typeof window !== "undefined";

export default function useMediaQuery(
  query: string,
  options: UseMediaQueryOptions = {}
): boolean {
  const {
    defaultValue = false,
    initializeWithValue = true,
    targetWindow = isBrowser ? window : undefined,
  } = options;

  const getMatches = (): boolean => {
    if (!targetWindow || typeof targetWindow.matchMedia !== "function") {
      return defaultValue;
    }

    return targetWindow.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(() =>
    initializeWithValue ? getMatches() : defaultValue
  );

  useEffect(() => {
    if (!targetWindow || typeof targetWindow.matchMedia !== "function") {
      return;
    }

    const mediaQueryList = targetWindow.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", listener);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query, targetWindow]);

  return matches;
}
```

## Type declarations

```ts
declare function useMediaQuery(
  query: string,
  options?: {
    defaultValue?: boolean;
    initializeWithValue?: boolean;
    targetWindow?: Window;
  }
): boolean;

export default useMediaQuery;
```
