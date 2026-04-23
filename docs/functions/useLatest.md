---
title: useLatest Hook
sidebar_label: useLatest
category: State
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useLatest"
---

# useLatest()

<PackageData fn="useLatest" />

## Usage

```tsx
const latestValueRef = useLatest(value);
```

## Copy-paste hook

```tsx
import { useRef } from "react";

export default function useLatest<T>(value: T) {
  const valueRef = useRef<T>(value);
  valueRef.current = value;
  return valueRef;
}
```
