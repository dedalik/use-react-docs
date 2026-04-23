---
title: Read and update URL hash state
sidebar_label: useHash
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useHash'
description: >-
  useHash from @dedalik/use-react: Read and update URL hash state. TypeScript,
  tree-shakable import, examples, SSR notes.
---

# useHash()

<PackageData fn="useHash" />


Last updated: 23/04/2026, 15:56
## Overview

`useHash` reads and writes `window.location.hash` reactively.

It helps beginners build lightweight URL-based state (tabs, anchor-driven navigation, filters) without a router dependency.

### What it accepts

- No arguments.

### What it returns

- `[hash, setHash]` tuple for current hash value and a setter function.

`useHash` is a specialized React hook that enables the tracking and manipulation of the browser's URL hash. It provides a simple and effective way to interact with the hash portion of the URL, commonly used in single-page applications for navigation and state management.

## Features

- **URL Hash Tracking**: Automatically tracks changes in the browser's URL hash.
- **Event-Driven Updates**: Responds to `hashchange` events to ensure the hash value is always up-to-date.
- **Simple API**: Offers an easy-to-use interface for getting and setting the URL hash.

## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import useHash from "@dedalik/use-react/useHash";

function HashPanelExample() {
  const [hash, setHash] = useHash();

  return (
    <div>
      <p>Current hash: {hash || "(empty)"}</p>
      <button type="button" onClick={() => setHash("#section-a")}>
        Set #section-a
      </button>
    </div>
  );
}

export default function HashPanelDemo() {
  return <HashPanelExample />;
}
```

## API Reference

### `useHash`

**Signature:** `useHash(): [string, (newHash: string) => void]`

#### Parameters

None.

#### Returns

Tuple:

1. **`hash`** - Current `window.location.hash` string; updates on `hashchange`.
2. **`setHash`** - Setter that updates the hash when it differs from the current value.

## Copy-paste hook

```tsx
import { useCallback, useEffect, useState } from 'react'
import { on, off } from '../utils/helpers'

/**
 * Custom React hook for reading and updating the URL hash (window.location.hash).
 *
 * @returns A hook containing the current hash and a function to set the hash.
 */
const useHash = (): [string, (newHash: string) => void] => {
  // State to store the current hash value.
  const [hash, setLocalHash] = useState<string>(() => window.location.hash)

  /**
   * Callback function to update the hash state based on the current window location hash.
   * This function is memoized with useCallback to avoid unnecessary re-creations.
   */
  const onHashChange = useCallback(() => {
    setLocalHash(window.location.hash)
  }, [])

  /**
   * useEffect hook to set up and clean up the hashchange event listener.
   * Adds an event listener when the component mounts and removes it when the component unmounts.
   */
  useEffect(() => {
    // Registers the onHashChange event listener for 'hashchange' events.
    on(window, 'hashchange', onHashChange)

    // Cleanup function to remove the event listener.
    return () => off(window, 'hashchange', onHashChange)
  }, [onHashChange])

  /**
   * Function to update the URL hash.
   * It checks if the new hash is different from the current one before updating to prevent unnecessary changes.
   *
   * @param {string} newHash - The new hash to be set in the URL.
   */
  const setHash = useCallback(
    (newHash: string) => {
      if (newHash !== hash) {
        window.location.hash = newHash
      }
    },
    [hash],
  )

  // Return the current hash and the function to update it.
  return [hash, setHash]
}

export default useHash
```

### JavaScript version

```js
import { useCallback, useEffect, useState } from "react";
import { on, off } from "../utils/helpers";

/**
 * Custom React hook for reading and updating the URL hash (window.location.hash).
 *
 * @returns A hook containing the current hash and a function to set the hash.
 */
const useHash = () => {
  // State to store the current hash value.
  const [hash, setLocalHash] = useState(() => window.location.hash);
  /**
   * Callback function to update the hash state based on the current window location hash.
   * This function is memoized with useCallback to avoid unnecessary re-creations.
   */
  const onHashChange = useCallback(() => {
    setLocalHash(window.location.hash);
  }, []);
  /**
   * useEffect hook to set up and clean up the hashchange event listener.
   * Adds an event listener when the component mounts and removes it when the component unmounts.
   */
  useEffect(() => {
    // Registers the onHashChange event listener for 'hashchange' events.
    on(window, 'hashchange', onHashChange);
    // Cleanup function to remove the event listener.
    return () => off(window, 'hashchange', onHashChange);
  }, [onHashChange]);
  /**
   * Function to update the URL hash.
   * It checks if the new hash is different from the current one before updating to prevent unnecessary changes.
   *
   * @param {string} newHash - The new hash to be set in the URL.
   */
  const setHash = useCallback(
    (newHash) => {
      if (newHash !== hash) {
        window.location.hash = newHash;
      }
    },
    [hash]
  );
  // Return the current hash and the function to update it.
  return [hash, setHash];
};

export default useHash;
```
## Type declarations

```typescript
declare const useHash: () => [string, (newHash: string) => void];
export default useHash;
```
