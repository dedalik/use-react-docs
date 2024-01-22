---
title: The useOnMount Hook Documentation Page
sidebar_label: useOnMount
category: State
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useOnMount"
---

# useOnMount()

<PackageData fn="useOnMount" />

## Overview

`useOnMount` is a custom React hook designed to execute a callback function when a component mounts. This hook provides a clear and concise way to handle side-effects or initialize states when the component first renders, similar to the `componentDidMount` lifecycle method in class components.

## Features

- **Simplicity and Clarity:** Allows for a more readable and straightforward approach to executing code on component mount.
- **Reusable Logic:** Encapsulates component mount logic in a reusable hook, promoting cleaner code and reducing repetition across components.
- **Type Safety:** Ensures that the passed argument is a function, providing additional safety in TypeScript projects.

## Usage

To use the `useOnMount` hook, simply import it into your component and pass a function that you want to be executed upon the component's initial render.

```jsx
import useOnMount from "./useOnMount";

const DemoComponent = () => {
  useOnMount(() => {
    console.log("Component has mounted");
    // Initialize or fetch data here
  });

  return <div>{/* Component JSX */}</div>;
};

export default DemoComponent;
```

## API Reference

- `useOnMount(fn: Fn): void`
  - `fn`: A function that you want to be executed when the component mounts.

## Type Declarations

- `Fn`: Type alias for a function with no arguments and no return value. This is the type of the `fn` argument expected by `useOnMount`.

The `useOnMount` hook is particularly useful in scenarios where certain actions, such as API calls, state initializations, or DOM manipulations, are required when the component first renders. It provides a clean and declarative way to handle such operations in functional components.
