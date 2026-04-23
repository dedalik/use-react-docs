---
title: useScript Hook
sidebar_label: useScript
category: Browser
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useScript"
---

# useScript()

<PackageData fn="useScript" />

## Usage

```tsx
const status = useScript("https://example.com/sdk.js");
```

## Copy-paste hook

```tsx
import { useEffect, useState } from "react";

type ScriptStatus = "idle" | "loading" | "ready" | "error";

export default function useScript(src?: string): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>(() => {
    if (!src) return "idle";
    if (typeof document === "undefined") return "loading";
    return document.querySelector(`script[src="${src}"]`) ? "ready" : "loading";
  });

  useEffect(() => {
    if (!src || typeof document === "undefined") return;
    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;
    let created = false;

    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      created = true;
      document.body.appendChild(script);
    }

    const onLoad = () => setStatus("ready");
    const onError = () => setStatus("error");
    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
    setStatus("loading");

    return () => {
      script?.removeEventListener("load", onLoad);
      script?.removeEventListener("error", onError);
      if (created) script?.remove();
    };
  }, [src]);

  return status;
}
```
