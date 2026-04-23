---
title: useToggle Hook
sidebar_label: useToggle
category: State
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useToggle"
---

# useToggle()

<PackageData fn="useToggle" />

## Usage

```tsx
const [open, toggleOpen, setOpen] = useToggle(false);
```

## Copy-paste hook

```tsx
import { useCallback, useState } from "react";

export default function useToggle(initialValue = false) {
  const [value, setValue] = useState<boolean>(initialValue);
  const toggle = useCallback(() => setValue((currentValue) => !currentValue), []);
  const set = useCallback((nextValue: boolean) => setValue(nextValue), []);
  return [value, toggle, set] as const;
}
```
