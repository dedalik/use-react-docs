---
title: Copy text to the clipboard
sidebar_label: useCopyToClipboard
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useCopyToClipboard'
description: >-
  useCopyToClipboard from @dedalik/use-react: Copy text to the clipboard.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useCopyToClipboard()

<PackageData fn="useCopyToClipboard" />


Last updated: 23/04/2026, 15:56
## Overview

`useCopyToClipboard` gives you a copy action and remembers the last copied value.

It is handy for share links, token copying, and developer tooling UIs where users frequently copy values.

### What it accepts

- No arguments.

### What it returns

- `[copiedText, copy]` where `copy(text)` returns `Promise<boolean>`.


## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useState } from "react";
import useCopyToClipboard from "@dedalik/use-react/useCopyToClipboard";

function ShareLinkExample() {
  const [text, setText] = useState("https://example.com");
  const [copied, copy] = useCopyToClipboard();

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button type="button" onClick={() => void copy(text)}>
        Copy
      </button>
      <p>Last copied: {copied || "(empty)"}</p>
    </div>
  );
}

export default function ShareLinkDemo() {
  return <ShareLinkExample />;
}
```

## API Reference

### `useCopyToClipboard`

**Signature:** `useCopyToClipboard(): [string, CopyFn]`

#### Parameters

None.

#### Returns

Tuple:

1. **`copiedText`** - Last string successfully passed to `copy`, or empty string.
2. **`copy`** - `(value: string) => Promise<boolean>`. Returns `false` if the Clipboard API is unavailable or write fails.

## Copy-paste hook

```tsx
import { useCallback, useState } from 'react'

type CopyFn = (value: string) => Promise<boolean>

export default function useCopyToClipboard(): [string, CopyFn] {
  const [copiedText, setCopiedText] = useState('')

  const copy: CopyFn = useCallback(async (value) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
      return false
    }

    try {
      await navigator.clipboard.writeText(value)
      setCopiedText(value)
      return true
    } catch {
      return false
    }
  }, [])

  return [copiedText, copy]
}
```

### JavaScript version

```js
import { useCallback, useState } from "react";

export default function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState('');

  const copy = useCallback(async (value) => {
    if (
      typeof navigator === 'undefined' ||
      !navigator.clipboard?.writeText
    ) {
      return false;
    }
    try {
      await navigator.clipboard.writeText(value);
      setCopiedText(value);
      return true;
    } catch {
      return false;
    }
  }, []);

  return [copiedText, copy];
}
```
