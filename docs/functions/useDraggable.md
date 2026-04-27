---
title: Make an element draggable
sidebar_label: useDraggable
category: Elements
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useDraggable.tsx'
description: >-
  useDraggable from @dedalik/use-react: Make an element draggable. TypeScript,
  tree-shakable import, examples, SSR notes.
---

# useDraggable()

<PackageData fn="useDraggable" />
<HookLiveDemo demo="useDraggable/basic" title="Live demo: useDraggable" />

## Overview

`useDraggable` wires Pointer Events on a draggable surface (by default the `targetRef` element) and updates a `{ x, y }` translation you can apply via `style.transform` (`translate3d`). During a drag it tracks the active pointer id, uses pointer capture when available, and clamps movement using optional `axis`, numeric `bounds`, and/or a `containerElement` so the dragged box stays fully inside a parent panel-plus optional `handle`/`draggingElement` splits when the grip is not the same node as the moving visuals.

### What it accepts

- `targetRef: RefObject<HTMLElement | null>` - Element whose `transform` translation is driven by the hook.
- `options: UseDraggableOptions = {}` - Optional drag tuning (`handle`, `draggingElement`, `containerElement`, `bounds`, `axis`, pointer filtering, event flags, lifecycle callbacks).

### What it returns

- `position`: Current `{ x, y }` translation in pixels. Type `DraggablePosition`.
- `isDragging`: `true` while a pointer drag is active. Type `boolean`.
- `style`: Ready-to-apply inline style with `transform: translate3d(...)`. Type `{ transform: string }`.

## Usage

Real-world example: drag a “floating” card inside a panel using a dedicated drag handle, with container clamping and live `onMove` feedback.

```tsx
import { useRef, useState } from 'react'
import useDraggable from '@dedalik/use-react/useDraggable'

function Example() {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const handleRef = useRef<HTMLDivElement | null>(null)
  const [lastMove, setLastMove] = useState<{ x: number; y: number } | null>(null)

  const { position, isDragging, style } = useDraggable(cardRef, {
    handle: handleRef,
    containerElement: panelRef,
    initialValue: { x: 16, y: 16 },
    preventDefault: true,
    onMove: (p) => setLastMove(p),
  })

  return (
    <div>
      <h3>Draggable note</h3>
      <p>
        Position: {Math.round(position.x)}px, {Math.round(position.y)}px - {isDragging ? 'dragging' : 'idle'}
      </p>
      <p>Last move: {lastMove ? `${Math.round(lastMove.x)}, ${Math.round(lastMove.y)}` : '-'}</p>

      <div
        ref={panelRef}
        style={{
          position: 'relative',
          height: 260,
          border: '1px solid #ddd',
          borderRadius: 12,
          background: '#fafafa',
          overflow: 'hidden',
        }}
      >
        <div
          ref={cardRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 220,
            borderRadius: 12,
            border: '1px solid #ccc',
            background: 'white',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            ...style,
          }}
        >
          <div
            ref={handleRef}
            style={{
              cursor: 'grab',
              userSelect: 'none',
              padding: '10px 12px',
              borderBottom: '1px solid #eee',
              fontWeight: 600,
            }}
          >
            Drag handle
          </div>
          <div style={{ padding: 12, lineHeight: 1.4 }}>
            Drag using the handle. The card stays inside the dashed panel thanks to <code>containerElement</code>.
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useDraggable`

**Signature:** `useDraggable(targetRef: RefObject<HTMLElement | null>, options: UseDraggableOptions = {}): UseDraggableReturn`

#### Parameters

1. **`targetRef`** (`RefObject<HTMLElement | null>`) - The element whose `translate3d` position is updated (often the moving card).
2. **`options`** (optional `UseDraggableOptions`) - `handle` starts drags from a child grip; `draggingElement` can differ from `targetRef` when measuring size; `containerElement` clamps inside a parent; `bounds` clamps numeric ranges; `axis` locks movement; `pointerTypes` filters input; `preventDefault`/`stopPropagation`/`capture` tune event behavior; `onStart`/`onMove`/`onEnd` observe motion. Default: `{}`.

#### Returns

Object with:

- `position` - Current `{ x, y }` translation in pixels. (`DraggablePosition`).
- `isDragging` - `true` while a pointer drag is active. (`boolean`).
- `style` - Ready-to-apply inline style with `transform: translate3d(...)`. (`{ transform: string }`).

## Copy-paste hook

### TypeScript

```tsx
import { type RefObject, useEffect, useMemo, useRef, useState } from 'react'

export type DraggablePointerType = 'mouse' | 'pen' | 'touch'

export interface DraggablePosition {
  x: number
  y: number
}

export interface DraggableBounds {
  minX?: number
  maxX?: number
  minY?: number
  maxY?: number
}

export interface UseDraggableOptions {
  initialValue?: DraggablePosition
  axis?: 'x' | 'y'
  bounds?: DraggableBounds
  handle?: RefObject<HTMLElement | null>
  containerElement?: HTMLElement | RefObject<HTMLElement | null>
  draggingElement?: RefObject<HTMLElement | null>
  pointerTypes?: DraggablePointerType[]
  exact?: boolean
  preventDefault?: boolean
  stopPropagation?: boolean
  capture?: boolean
  onStart?: (position: DraggablePosition) => void
  onMove?: (position: DraggablePosition) => void
  onEnd?: (position: DraggablePosition) => void
}

export interface UseDraggableReturn {
  position: DraggablePosition
  isDragging: boolean
  style: { transform: string }
}

const defaultPointerTypes: DraggablePointerType[] = ['mouse', 'pen', 'touch']

function acceptsPointerType(pointerType: string, allowed: DraggablePointerType[] | undefined): boolean {
  const list = allowed ?? defaultPointerTypes
  return list.includes(pointerType as DraggablePointerType)
}

function resolveContainer(container: HTMLElement | RefObject<HTMLElement | null> | undefined): HTMLElement | null {
  if (!container) return null
  return 'current' in container ? container.current : container
}

function clampWithBounds(x: number, y: number, bounds: DraggableBounds | undefined): DraggablePosition {
  if (!bounds) return { x, y }
  return {
    x: Math.min(bounds.maxX ?? Infinity, Math.max(bounds.minX ?? -Infinity, x)),
    y: Math.min(bounds.maxY ?? Infinity, Math.max(bounds.minY ?? -Infinity, y)),
  }
}

function applyAxis(next: DraggablePosition, start: DraggablePosition, axis: 'x' | 'y' | undefined): DraggablePosition {
  if (axis === 'x') return { x: next.x, y: start.y }
  if (axis === 'y') return { x: start.x, y: next.y }
  return next
}

function clampToContainer(
  tx: number,
  ty: number,
  layoutOrigin: DraggablePosition,
  width: number,
  height: number,
  container: HTMLElement,
): DraggablePosition {
  const cr = container.getBoundingClientRect()
  const minTx = cr.left - layoutOrigin.x
  const maxTx = cr.right - layoutOrigin.x - width
  const minTy = cr.top - layoutOrigin.y
  const maxTy = cr.bottom - layoutOrigin.y - height
  return {
    x: Math.min(Math.max(tx, minTx), maxTx),
    y: Math.min(Math.max(ty, minTy), maxTy),
  }
}

export default function useDraggable(
  targetRef: RefObject<HTMLElement | null>,
  options: UseDraggableOptions = {},
): UseDraggableReturn {
  const { initialValue = { x: 0, y: 0 }, capture, handle, draggingElement } = options

  const [position, setPosition] = useState<DraggablePosition>(initialValue)
  const [isDragging, setIsDragging] = useState(false)

  const positionRef = useRef(position)
  positionRef.current = position

  const optionsRef = useRef(options)
  optionsRef.current = options

  const dragStateRef = useRef<{
    pointerId: number
    startClient: DraggablePosition
    startPos: DraggablePosition
    layoutOrigin: DraggablePosition
    width: number
    height: number
    captureTarget: HTMLElement
  } | null>(null)

  const style = useMemo(
    () => ({ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }),
    [position.x, position.y],
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const getListenEl = () => optionsRef.current.handle?.current ?? targetRef.current
    const getDragEl = () => optionsRef.current.draggingElement?.current ?? targetRef.current

    const onPointerDown = (event: PointerEvent) => {
      const listen = getListenEl()
      const dragging = getDragEl()
      if (!listen || !dragging) return

      const o = optionsRef.current
      if (!acceptsPointerType(event.pointerType, o.pointerTypes)) return
      if (o.exact && event.pointerType === 'mouse' && event.button !== 0) return

      if (o.preventDefault) event.preventDefault()
      if (o.stopPropagation) event.stopPropagation()

      const rect = dragging.getBoundingClientRect()
      const pos = positionRef.current
      dragStateRef.current = {
        pointerId: event.pointerId,
        startClient: { x: event.clientX, y: event.clientY },
        startPos: { ...pos },
        layoutOrigin: { x: rect.left - pos.x, y: rect.top - pos.y },
        width: rect.width,
        height: rect.height,
        captureTarget: listen,
      }

      setIsDragging(true)
      o.onStart?.(pos)

      listen.setPointerCapture?.(event.pointerId)
    }

    const onPointerMove = (event: PointerEvent) => {
      const st = dragStateRef.current
      if (!st || event.pointerId !== st.pointerId) return

      const o = optionsRef.current
      if (o.preventDefault) event.preventDefault()

      const nx = st.startPos.x + (event.clientX - st.startClient.x)
      const ny = st.startPos.y + (event.clientY - st.startClient.y)
      let next = applyAxis({ x: nx, y: ny }, st.startPos, o.axis)

      const cont = resolveContainer(o.containerElement)
      if (cont) {
        next = clampToContainer(next.x, next.y, st.layoutOrigin, st.width, st.height, cont)
      }

      next = clampWithBounds(next.x, next.y, o.bounds)
      setPosition(next)
      o.onMove?.(next)
    }

    const finishDrag = (event: PointerEvent) => {
      const st = dragStateRef.current
      if (!st || event.pointerId !== st.pointerId) return

      const o = optionsRef.current
      if (o.preventDefault) event.preventDefault()

      dragStateRef.current = null
      setIsDragging(false)

      try {
        st.captureTarget.releasePointerCapture(event.pointerId)
      } catch {
        /* pointer may already be released */
      }

      o.onEnd?.(positionRef.current)
    }

    const el = getListenEl()
    if (!el) return

    el.addEventListener('pointerdown', onPointerDown, { capture: !!capture })

    window.addEventListener('pointermove', onPointerMove, { capture: true })
    window.addEventListener('pointerup', finishDrag, { capture: true })
    window.addEventListener('pointercancel', finishDrag, { capture: true })

    return () => {
      el.removeEventListener('pointerdown', onPointerDown, { capture: !!capture })
      window.removeEventListener('pointermove', onPointerMove, { capture: true })
      window.removeEventListener('pointerup', finishDrag, { capture: true })
      window.removeEventListener('pointercancel', finishDrag, { capture: true })
    }
  }, [targetRef, handle, draggingElement, capture])

  return { position, isDragging, style }
}
```

### JavaScript

```js
import { useEffect, useMemo, useRef, useState } from 'react'

const defaultPointerTypes = ['mouse', 'pen', 'touch']

function acceptsPointerType(pointerType, allowed) {
  const list = allowed ?? defaultPointerTypes
  return list.includes(pointerType)
}

function resolveContainer(container) {
  if (!container) return null
  return 'current' in container ? container.current : container
}

function clampWithBounds(x, y, bounds) {
  if (!bounds) return { x, y }
  return {
    x: Math.min(bounds.maxX ?? Infinity, Math.max(bounds.minX ?? -Infinity, x)),
    y: Math.min(bounds.maxY ?? Infinity, Math.max(bounds.minY ?? -Infinity, y)),
  }
}

function applyAxis(next, start, axis) {
  if (axis === 'x') return { x: next.x, y: start.y }
  if (axis === 'y') return { x: start.x, y: next.y }
  return next
}

function clampToContainer(tx, ty, layoutOrigin, width, height, container) {
  const cr = container.getBoundingClientRect()
  const minTx = cr.left - layoutOrigin.x
  const maxTx = cr.right - layoutOrigin.x - width
  const minTy = cr.top - layoutOrigin.y
  const maxTy = cr.bottom - layoutOrigin.y - height
  return {
    x: Math.min(Math.max(tx, minTx), maxTx),
    y: Math.min(Math.max(ty, minTy), maxTy),
  }
}

export default function useDraggable(targetRef, options = {}) {
  const { initialValue = { x: 0, y: 0 }, capture, handle, draggingElement } = options

  const [position, setPosition] = useState(initialValue)
  const [isDragging, setIsDragging] = useState(false)

  const positionRef = useRef(position)
  positionRef.current = position

  const optionsRef = useRef(options)
  optionsRef.current = options

  const dragStateRef = useRef(null)

  const style = useMemo(
    () => ({ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }),
    [position.x, position.y],
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const getListenEl = () => optionsRef.current.handle?.current ?? targetRef.current
    const getDragEl = () => optionsRef.current.draggingElement?.current ?? targetRef.current

    const onPointerDown = (event) => {
      const listen = getListenEl()
      const dragging = getDragEl()
      if (!listen || !dragging) return

      const o = optionsRef.current
      if (!acceptsPointerType(event.pointerType, o.pointerTypes)) return
      if (o.exact && event.pointerType === 'mouse' && event.button !== 0) return

      if (o.preventDefault) event.preventDefault()
      if (o.stopPropagation) event.stopPropagation()

      const rect = dragging.getBoundingClientRect()
      const pos = positionRef.current
      dragStateRef.current = {
        pointerId: event.pointerId,
        startClient: { x: event.clientX, y: event.clientY },
        startPos: { ...pos },
        layoutOrigin: { x: rect.left - pos.x, y: rect.top - pos.y },
        width: rect.width,
        height: rect.height,
        captureTarget: listen,
      }

      setIsDragging(true)
      o.onStart?.(pos)

      listen.setPointerCapture?.(event.pointerId)
    }

    const onPointerMove = (event) => {
      const st = dragStateRef.current
      if (!st || event.pointerId !== st.pointerId) return

      const o = optionsRef.current
      if (o.preventDefault) event.preventDefault()

      const nx = st.startPos.x + (event.clientX - st.startClient.x)
      const ny = st.startPos.y + (event.clientY - st.startClient.y)
      let next = applyAxis({ x: nx, y: ny }, st.startPos, o.axis)

      const cont = resolveContainer(o.containerElement)
      if (cont) {
        next = clampToContainer(next.x, next.y, st.layoutOrigin, st.width, st.height, cont)
      }

      next = clampWithBounds(next.x, next.y, o.bounds)
      setPosition(next)
      o.onMove?.(next)
    }

    const finishDrag = (event) => {
      const st = dragStateRef.current
      if (!st || event.pointerId !== st.pointerId) return

      const o = optionsRef.current
      if (o.preventDefault) event.preventDefault()

      dragStateRef.current = null
      setIsDragging(false)

      try {
        st.captureTarget.releasePointerCapture(event.pointerId)
      } catch {
        /* pointer may already be released */
      }

      o.onEnd?.(positionRef.current)
    }

    const el = getListenEl()
    if (!el) return

    el.addEventListener('pointerdown', onPointerDown, { capture: !!capture })

    window.addEventListener('pointermove', onPointerMove, { capture: true })
    window.addEventListener('pointerup', finishDrag, { capture: true })
    window.addEventListener('pointercancel', finishDrag, { capture: true })

    return () => {
      el.removeEventListener('pointerdown', onPointerDown, { capture: !!capture })
      window.removeEventListener('pointermove', onPointerMove, { capture: true })
      window.removeEventListener('pointerup', finishDrag, { capture: true })
      window.removeEventListener('pointercancel', finishDrag, { capture: true })
    }
  }, [targetRef, handle, draggingElement, capture])

  return { position, isDragging, style }
}
```
