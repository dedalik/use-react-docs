---
title: useDraggable React draggable elements
sidebar_label: useDraggable
category: Elements
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useDraggable"
---

# useDraggable()

<PackageData fn="useDraggable" />

## Overview

The `useDraggable` hook is designed for React applications, providing a simple and efficient way to make elements draggable. It enables the tracking and updating of an element's position on the screen, offering a seamless user experience for drag-and-drop functionalities.

## Features

- **Draggable Elements**: Easily make any element draggable within your React application.
- **Customizable Dragging Options**: Offers a range of options like exact element dragging, event prevention, and propagation control.
- **Position Tracking**: Automatically tracks the position of the draggable element.
- **Event Handling**: Offers callbacks for drag start, move, and end events.
- **Axis Control**: Allows restricting the movement of the draggable element to a specific axis.
- **Boundary Management**: Provides the ability to set boundaries within which the element can be dragged.

## Usage

To use the `useDraggable` hook, first import it into your component. Then, assign it to a ref of the element you want to make draggable. You can also pass in various options to customize its behavior.

```tsx
import React, { useRef } from "react";
import { useDraggable } from "path-to-useDraggable-hook";

const DemoComponent = () => {
  const draggableRef = useRef<HTMLDivElement>(null);
  const { style } = useDraggable(draggableRef, {
    initialValue: { x: 40, y: 40 },
    // Other options...
  });

  return (
    <div ref={draggableRef} style={{ ...style, position: "fixed" }}>
      Drag me around!
    </div>
  );
};

export default DemoComponent;
```

## API Reference

### `useDraggable(targetRef, options)`

- `targetRef`: A `RefObject` pointing to the element you want to make draggable.
- `options`: An optional `UseDraggableOptions` object to customize the behavior of the hook.

#### Options

- `exact`: Boolean, specifies if dragging should only start when clicking directly on the element.
- `preventDefault`: Boolean, if `true`, prevents the default action of the event.
- `stopPropagation`: Boolean, if `true`, stops the propagation of the event.
- `capture`: Boolean, determines if events are dispatched in the capturing phase.
- `draggingElement`: The element to attach `pointermove` and `pointerup` events to.
- `containerElement`: Element for calculating bounds.
- `handle`: Element that triggers the drag event.
- `pointerTypes`: Array of `PointerType`, specifies pointer types to listen to.
- `initialValue`: `Position`, the initial position of the element.
- `onStart`, `onMove`, `onEnd`: Callback functions for drag start, move, and end events.
- `axis`: Specifies the axis along which the element can be dragged.

#### Return Value

- `position`: The current position of the draggable element.
- `isDragging`: A boolean indicating whether the element is currently being dragged.
- `style`: An object containing the inline styles for the draggable element.
