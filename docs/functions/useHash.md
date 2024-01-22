---
title: The useHash Hook Documentation Page
sidebar_label: useHash
category: Browser
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useHash"
---

# useHash()

<PackageData fn="useHash" />

## Overview

`useHash` is a specialized React hook that enables the tracking and manipulation of the browser's URL hash. It provides a simple and effective way to interact with the hash portion of the URL, commonly used in single-page applications for navigation and state management.

## Demo

soon

## Features

- **URL Hash Tracking**: Automatically tracks changes in the browser's URL hash.
- **Event-Driven Updates**: Responds to `hashchange` events to ensure the hash value is always up-to-date.
- **Simple API**: Offers an easy-to-use interface for getting and setting the URL hash.

## Usage

```jsx
import React from "react";
import { useHash } from "@dedalik/use-react";

const DemoComponent = () => {
  // Use the useHash hook to access the current hash and a function to update it
  const [hash, setHash] = useHash();

  // Example function to change the hash when an event is triggered
  const handleUpdateHash = () => {
    setHash("#newHashValue");
  };

  return (
    <div>
      <p>Current Hash: {hash}</p>
      <button onClick={handleUpdateHash}>Change Hash</button>
    </div>
  );
};

export default DemoComponent;
```

## API Reference

### `useHash`

Hook syntax: `const [hash, setHash] = useHash()`

#### Returns

1. `hash` (`string`):

   - Description: Represents the current URL hash.
   - Behavior: Updates automatically when the browser's URL hash changes.
   - Usage: Use it to read the current state of the browser's hash.

2. `setHash` (`(newHash: string) => void`):
   - Description: A function to update the browser's URL hash.
   - Behavior: Invoking this function changes the current URL hash and triggers a `hashchange` event.
   - Usage: Call this function with a new hash string to programmatically change the URL

```typescript
declare const useHash: () => [string, (newHash: string) => void];
export default useHash;
```
