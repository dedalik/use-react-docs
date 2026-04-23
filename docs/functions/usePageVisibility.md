---
title: Track page visibility changes
sidebar_label: usePageVisibility
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/usePageVisibility'
description: >-
  usePageVisibility from @dedalik/use-react: Track page visibility changes.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# usePageVisibility()

<PackageData fn="usePageVisibility" />


Last updated: 23/04/2026, 15:56
## Overview

`usePageVisibility` tracks whether the current page is visible to the user.

Useful for pausing background work, controlling auto-refresh, and reducing unnecessary processing when tab is hidden.

### What it accepts

- No arguments.

### What it returns

- `boolean` visibility state (`true` when page is visible).


## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import usePageVisibility from "@dedalik/use-react/usePageVisibility";

function TabVisibilityExample() {
  const visible = usePageVisibility();

  return <p>Document visible: {String(visible)}</p>;
}

export default function TabVisibilityDemo() {
  return <TabVisibilityExample />;
}
```

## API Reference

### `usePageVisibility`

**Signature:** `usePageVisibility(): boolean`

#### Parameters

None.

#### Returns

`true` when the document is visible, `false` when the tab is hidden.

## Copy-paste hook

```tsx
import { useEffect, useState } from 'react'

const getVisibility = (): boolean => {
  if (typeof document === 'undefined') return true
  return !document.hidden
}

export default function usePageVisibility(): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(() => getVisibility())

  useEffect(() => {
    if (typeof document === 'undefined') return

    const onVisibilityChange = () => {
      setIsVisible(getVisibility())
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  return isVisible
}
```

### JavaScript version

```js
import { useEffect, useState } from "react";

const getVisibility = () => {
  if (typeof document === 'undefined') return true;

  return !document.hidden;
};

export default function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(() => getVisibility());

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const onVisibilityChange = () => {
      setIsVisible(getVisibility());
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () =>
      document.removeEventListener(
        'visibilitychange',
        onVisibilityChange
      );
  }, []);

  return isVisible;
}
```
