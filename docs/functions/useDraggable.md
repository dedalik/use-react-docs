---
title: Make an element draggable
sidebar_label: useDraggable
category: Elements
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useDraggable"
---

# useDraggable()

<PackageData fn="useDraggable" />


Last updated: 23/04/2026, 15:56
## Overview

`useDraggable` enables drag behavior for an element and tracks its position.

Use it for floating widgets, draggable cards, and custom canvas-like interactions where pointer movement needs explicit control.

### What it accepts

- `targetRef`: element ref to make draggable.
- `options` (optional): drag behavior options.

### What it returns

- Hook metadata such as current position, drag state, and style helpers.



The `useDraggable` hook is designed for React applications, providing a simple and efficient way to make elements draggable. It enables the tracking and updating of an element's position on the screen, offering a seamless user experience for drag-and-drop functionalities.

## Features

- **Draggable Elements**: Easily make any element draggable within your React application.
- **Customizable Dragging Options**: Offers a range of options like exact element dragging, event prevention, and propagation control.
- **Position Tracking**: Automatically tracks the position of the draggable element.
- **Event Handling**: Offers callbacks for drag start, move, and end events.
- **Axis Control**: Allows restricting the movement of the draggable element to a specific axis.
- **Boundary Management**: Provides the ability to set boundaries within which the element can be dragged.

## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useRef } from "react";
import useDraggable from "@dedalik/use-react/useDraggable";

function FloatingCardExample() {
  const ref = useRef<HTMLDivElement>(null);
  const { style } = useDraggable(ref, { initialValue: { x: 40, y: 40 } });

  return (
    <div ref={ref} style={{ ...style, position: "fixed", padding: 16, border: "1px solid #999" }}>
      Drag me
    </div>
  );
}

export default function FloatingCardDemo() {
  return <FloatingCardExample />;
}
```

## API Reference

### `useDraggable`

**Signature:** `useDraggable(targetRef, options?)`

#### Parameters

1. **`targetRef`** - `RefObject` to the element that should move while dragging.
2. **`options`** (optional) - `UseDraggableOptions` for drag behavior (axis, bounds, handlers, pointer types, etc.).

#### Options (common fields)

- `exact`, `preventDefault`, `stopPropagation`, `capture` - event handling flags.
- `draggingElement`, `containerElement`, `handle` - elements for events and bounds.
- `pointerTypes` - which pointer kinds trigger dragging.
- `initialValue` - starting `x` / `y` position.
- `onStart`, `onMove`, `onEnd` - lifecycle callbacks.
- `axis` - restrict movement to `"x"` or `"y"` when needed.

#### Returns

- `position` - current drag position.
- `isDragging` - whether a drag is active.
- `style` - inline styles to apply to the draggable element.
