---
title: The useTextareaAutoSize Hook Documentation Page
sidebar_label: useTextareaAutoSize
category: Browser
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useTextareaAutoSize"
---

# useTextareaAutoSize()

<PackageData fn="useTextareaAutoSize" />

Automatically adjust the height of a textarea based on its content.

## Demo

`soon`

## Usage

```tsx title="TextareaAutoSize.tsx"
import React, { useState, ChangeEvent } from "react";
import { useTextareaAutoSize } from "@dedalik/use-react";

const TextareaAutoSize: React.FC = () => {
  const [text, setText] = useState("");
  const { textarea, setInput } = useTextareaAutoSize({ input: text });

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setText(newValue);
    setInput(newValue);
  };

  return (
    <textarea
      ref={textarea}
      value={text}
      onChange={handleChange}
      style={{ resize: "none" }}
    />
  );
};

export default TextareaAutoSize;
```

## CSS to hide scroll

```css
/* Hide scrollbar for Chrome, Safari and Opera */
textarea::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
textarea {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
```

## Type declarations

```typescript
interface UseTextareaAutosizeOptions {
  /** Textarea element to autosize. */
  element?: HTMLTextAreaElement | undefined;
  /** Textarea content. */
  input?: string | undefined;
  /** Function called when the textarea size changes. */
  onResize?: () => void;
  /** Specify style target to apply the height based on textarea content. If not provided it will use textarea itself.  */
  styleTarget?: HTMLElement;
}
export declare function useTextareaAutoSize(
  options?: UseTextareaAutosizeOptions
): {
  textarea: import("react").MutableRefObject<HTMLTextAreaElement | null>;
  input: string | undefined;
  setInput: import("react").Dispatch<
    import("react").SetStateAction<string | undefined>
  >;
  triggerResize: () => void;
};
export type UseTextareaAutosizeReturn = ReturnType<typeof useTextareaAutoSize>;
```
