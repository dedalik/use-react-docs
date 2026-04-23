---
title: Set and restore document title
sidebar_label: useTitle
category: Browser
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useTitle"
---

# useTitle()

<PackageData fn="useTitle" />


Last updated: 23/04/2026, 15:56
## Overview

`useTitle` updates `document.title` from your component.

Useful for route-like screens and contextual tab labels. Optional restore behavior helps revert title on unmount.

### What it accepts

- `title`: new page title.
- `restoreOnUnmount` (optional): restore previous title when component unmounts.

### What it returns

- This hook returns nothing.


## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useState } from "react";
import useTitle from "@dedalik/use-react/useTitle";

function TitleToggleExample() {
  const [label, setLabel] = useState("My page");
  useTitle(label, true);

  return (
    <div>
      <input value={label} onChange={(e) => setLabel(e.target.value)} />
      <p>Tab title follows input (restored on unmount)</p>
    </div>
  );
}

export default function TitleToggleDemo() {
  return <TitleToggleExample />;
}
```

## API Reference

### `useTitle`

**Signature:** `useTitle(title: string, restoreOnUnmount?: boolean): void`

#### Parameters

1. **`title`** - Next `document.title`.
2. **`restoreOnUnmount`** - When `true`, restores the previous title on unmount.

#### Returns

Nothing (`void`).

## Copy-paste hook

```tsx
import { useEffect } from 'react'

export default function useTitle(title: string, restoreOnUnmount = false) {
  useEffect(() => {
    if (typeof document === 'undefined') return

    const previousTitle = document.title
    document.title = title

    if (!restoreOnUnmount) return

    return () => {
      document.title = previousTitle
    }
  }, [restoreOnUnmount, title])
}
```

### JavaScript version

```js
import { useEffect } from "react";

export default function useTitle(title, restoreOnUnmount = false) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const previousTitle = document.title;
    document.title = title;

    if (!restoreOnUnmount) return;
    return () => {
      document.title = previousTitle;
    };
  }, [restoreOnUnmount, title]);
}
```
