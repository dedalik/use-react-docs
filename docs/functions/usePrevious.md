---
title: usePrevious Hook for Tracking Previous Value
sidebar_label: usePrevious
category: State
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/usePrevious"
---

# usePrevious()

<PackageData fn="usePrevious" />

## Overview

`usePrevious` returns the previous render value for a given input. It is helpful when you need to compare the current and previous values without creating re-render loops.

## Usage

```tsx
import { useEffect, useState } from "react";
import { usePrevious } from "@dedalik/use-react";

const CounterDiff = () => {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  useEffect(() => {
    if (previousCount !== undefined) {
      console.log("Diff:", count - previousCount);
    }
  }, [count, previousCount]);

  return <button onClick={() => setCount((value) => value + 1)}>{count}</button>;
};
```

## Copy-paste hook

```tsx
import { useEffect, useRef } from "react";

export default function usePrevious<T>(value: T): T | undefined {
  const previousRef = useRef<T>();

  useEffect(() => {
    previousRef.current = value;
  }, [value]);

  return previousRef.current;
}
```

## Type declarations

```ts
declare function usePrevious<T>(value: T): T | undefined;
export default usePrevious;
```
