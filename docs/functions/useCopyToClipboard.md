---
title: useCopyToClipboard Hook
sidebar_label: useCopyToClipboard
category: Browser
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useCopyToClipboard"
---

# useCopyToClipboard()

<PackageData fn="useCopyToClipboard" />

## Usage

```tsx
const [copiedText, copy] = useCopyToClipboard();
await copy("Hello");
```

## Copy-paste hook

```tsx
import { useCallback, useState } from "react";

type CopyFn = (value: string) => Promise<boolean>;

export default function useCopyToClipboard(): [string, CopyFn] {
  const [copiedText, setCopiedText] = useState("");

  const copy: CopyFn = useCallback(async (value) => {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) return false;
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
