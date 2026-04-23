---
title: Load external scripts with status
sidebar_label: useScript
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useScript'
description: >-
  useScript from @dedalik/use-react: Load external scripts with status.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useScript()

<PackageData fn="useScript" />


Last updated: 23/04/2026, 15:56
## Overview

`useScript` loads external scripts and reports their loading status.

Useful for integrating third-party SDKs in a controlled way while handling loading and error states in React UI.

### What it accepts

- `src` (optional): script URL to load.

### What it returns

- Status string: `idle`, `loading`, `ready`, or `error`.


## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import useScript from "@dedalik/use-react/useScript";

function AnalyticsStubExample() {
  const status = useScript("https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.10/dayjs.min.js");

  return <p>Script status: {status}</p>;
}

export default function AnalyticsStubDemo() {
  return <AnalyticsStubExample />;
}
```

## API Reference

### `useScript`

**Signature:** `useScript(src?: string): ScriptStatus`

#### Parameters

1. **`src`** - Script URL. Omit or pass `undefined` for idle state without loading.

#### Returns

Status string: `idle` | `loading` | `ready` | `error`.

## Copy-paste hook

```tsx
import { useEffect, useState } from 'react'

type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error'

export default function useScript(src?: string): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>(() => {
    if (!src) return 'idle'
    if (typeof document === 'undefined') return 'loading'
    const existingScript = document.querySelector(`script[src="${src}"]`)
    return existingScript ? 'ready' : 'loading'
  })

  useEffect(() => {
    if (!src || typeof document === 'undefined') return

    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null
    let created = false

    if (!script) {
      script = document.createElement('script')
      script.src = src
      script.async = true
      created = true
      document.body.appendChild(script)
    }

    const onLoad = () => setStatus('ready')
    const onError = () => setStatus('error')

    script.addEventListener('load', onLoad)
    script.addEventListener('error', onError)
    setStatus('loading')

    return () => {
      script?.removeEventListener('load', onLoad)
      script?.removeEventListener('error', onError)

      if (created) {
        script?.remove()
      }
    }
  }, [src])

  return status
}
```

### JavaScript version

```js
import { useEffect, useState } from "react";

export default function useScript(src) {
  const [status, setStatus] = useState(() => {
    if (!src) return 'idle';

    if (typeof document === 'undefined') return 'loading';

    const existingScript = document.querySelector(
      `script[src="${src}"]`
    );
    return existingScript ? 'ready' : 'loading';
  });

  useEffect(() => {
    if (!src || typeof document === 'undefined') return;

    let script = document.querySelector(`script[src="${src}"]`);

    let created = false;

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      created = true;
      document.body.appendChild(script);
    }

    const onLoad = () => setStatus('ready');

    const onError = () => setStatus('error');
    script.addEventListener('load', onLoad);
    script.addEventListener('error', onError);
    setStatus('loading');
    return () => {
      script?.removeEventListener('load', onLoad);
      script?.removeEventListener('error', onError);

      if (created) {
        script?.remove();
      }
    };
  }, [src]);

  return status;
}
```
