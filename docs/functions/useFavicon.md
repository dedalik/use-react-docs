---
title: useFavicon Hook for Changing the Favicon Image
sidebar_label: useFavicon
category: Browser
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useFavicon"
---

# useFavicon()

<PackageData fn="useFavicon" />

## Overview

`useFavicon` is a custom React hook that provides an easy and efficient way to dynamically change the favicon of a webpage. A favicon, short for "favorite icon", is a small image displayed in the browser tab next to the page title. This hook allows developers to programmatically update the favicon based on different states or actions within a React application.

## Features

- **Dynamic Favicon Update:** Easily change the favicon at runtime without the need to reload the page.
- **Customizable Options:** Supports customization including the icon URL, base URL, and relationship attribute (`rel`).
- **Document Injection:** Dynamically inserts a `<link>` element into the document head if it does not already exist, ensuring compatibility with all web pages.
- **Efficient Rendering:** Uses React's `useState` and `useCallback` for optimized rendering and re-rendering only when necessary.

## Usage

To use the `useFavicon` hook, import it into your React component and call it with the desired options.

```jsx
import useFavicon from "@dedalik/use-react";

const DemoComponent = () => {
  const [, setFavicon] = useFavicon({ newIcon: "path/to/favicon.ico" });

  // Example: Update favicon on some action or state change
  const changeFavicon = () => {
    setFavicon("path/to/new/favicon.ico");
  };

  return (
    // Your component JSX
    <button onClick={changeFavicon}>Change Favicon</button>
  );
};

export default DemoComponent;
```

## API Reference

- `useFavicon(options: UseFaviconOptions): UseFaviconReturnType`
  - `options`: Object containing the following properties:
    - `newIcon` (optional): URL or path of the new favicon.
    - `baseUrl` (optional): Base URL to prepend to the icon path.
    - `rel` (optional): Relationship attribute, default is `'icon'`.
    - `doc` (optional): Document object, default is `document`. Useful for server-side rendering or tests.

## Type Declarations

- `UseFaviconOptions`: An object type for passing options to the hook. Contains `newIcon`, `baseUrl`, `rel`, and `doc`.

- `UseFaviconReturnType`: A tuple return type from the hook. It consists of the current favicon string and a dispatch function to update the favicon.

The `useFavicon` hook simplifies the process of changing the favicon dynamically, making it a handy tool for React developers looking to enhance the UI/UX of their web applications.

```typescript
import React from "react";
export interface UseFaviconOptions {
  newIcon?: string;
  baseUrl?: string;
  rel?: string;
  doc?: Document;
}
export type UseFaviconReturnType = [
  string,
  React.Dispatch<React.SetStateAction<string>>
];
declare const useFavicon: ({
  newIcon,
  baseUrl,
  rel,
  doc,
}?: UseFaviconOptions) => UseFaviconReturnType;
export default useFavicon;
export type UseFaviconType = ReturnType<typeof useFavicon>;
```
