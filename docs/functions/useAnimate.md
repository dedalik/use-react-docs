---
title: Run element animations with controls
sidebar_label: useAnimate
category: Animation
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useAnimate.tsx'
description: >-
  useAnimate from @dedalik/use-react: Web Animations API wrapper with play/cancel.
---

# useAnimate()

<PackageData fn="useAnimate" />

Last updated: 24/04/2026

## Overview

`useAnimate` targets a **React ref** to a **DOM** node and uses the **Web Animations API** (**`element.animate(keyframes, options)`**). Each **`play`** cancels the previous `Animation` on the same ref, then starts a new one, sets **`running`** to **true** until **`onfinish`** or **`oncancel`**. It returns **null** if the node is missing or **`animate`** is not a function. **`isSupported`** is a coarse check for **`HTMLElement`/`Element` global**; feature gaps on older engines still get handled by the **`play`** return value. It does not manage `prefers-reduced-motion`-add that in your app if you need a11y. Pass **WAAPI**-style **keyframes** and **timing** options: **`duration`**, **`easing`**, **`iterations`**, **fill** modes, etc.

### What it accepts

- **`target`**: `RefObject<HTMLElement | null>`

### What it returns

- **`isSupported`**: `boolean`
- **`running`**: `boolean`
- **`play`**: `(keyframes, options?) => Animation | null`
- **`cancel`**: `() => void` - cancels the current `Animation` and clears **`running`**

## Usage

Bounce a box: **`play`** with opacity + transform keyframes, **600 ms**, easing.

```tsx
import { useRef } from 'react'
import useAnimate from '@dedalik/use-react/useAnimate'

function Example() {
  const box = useRef<HTMLDivElement>(null)
  const { isSupported, running, play, cancel } = useAnimate(box)

  if (!isSupported) {
    return <p>Web Animations are not available in this environment.</p>
  }

  return (
    <div>
      <div ref={box} style={{ width: 64, height: 64, background: '#3b82f6', borderRadius: 8 }} />
      <p>
        <button
          type='button'
          onClick={() =>
            play([{ transform: 'translateY(0)' }, { transform: 'translateY(-20px)' }, { transform: 'translateY(0)' }], {
              duration: 600,
              iterations: 1,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            })
          }
        >
          Bounce
        </button>{' '}
        <button type='button' onClick={cancel} disabled={!running}>
          Cancel
        </button>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useAnimate`

**Signature:** `useAnimate(target: RefObject<HTMLElement | null>): UseAnimateReturn`

#### Parameters

1. **`target`** - Element to animate; must be mounted when calling **`play`**

#### Returns

**`isSupported`**, **`running`**, **`play`**, **`cancel`**

> **Not** React 18’s concurrent `useTransition`. For enter/exit **stage** state, see the library’s [`useTransition`](./useTransition) hook (different name collision).

## Copy-paste hook

### TypeScript

```tsx
import { RefObject, useCallback, useRef, useState } from 'react'

export interface UseAnimateReturn {
  isSupported: boolean
  running: boolean
  play: (keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: KeyframeAnimationOptions) => Animation | null
  cancel: () => void
}

/**
 * Small wrapper around Web Animations API for an element ref.
 */
export default function useAnimate(target: RefObject<HTMLElement | null>): UseAnimateReturn {
  const animationRef = useRef<Animation | null>(null)
  const [running, setRunning] = useState(false)

  const isSupported = typeof HTMLElement !== 'undefined' && typeof Element !== 'undefined'

  const cancel = useCallback(() => {
    animationRef.current?.cancel()
    animationRef.current = null
    setRunning(false)
  }, [])

  const play = useCallback(
    (keyframes: Keyframe[] | PropertyIndexedKeyframes, options: KeyframeAnimationOptions = {}): Animation | null => {
      const node = target.current
      if (!node || typeof node.animate !== 'function') return null

      cancel()
      const animation = node.animate(keyframes, options)
      animationRef.current = animation
      setRunning(true)
      animation.onfinish = () => setRunning(false)
      animation.oncancel = () => setRunning(false)
      return animation
    },
    [cancel, target],
  )

  return { isSupported, running, play, cancel }
}
```

### JavaScript

```js
import { useCallback, useRef, useState } from 'react'

/**
 * Small wrapper around Web Animations API for an element ref.
 */
export default function useAnimate(target) {
  const animationRef = useRef(null)
  const [running, setRunning] = useState(false)

  const isSupported = typeof HTMLElement !== 'undefined' && typeof Element !== 'undefined'

  const cancel = useCallback(() => {
    animationRef.current?.cancel()
    animationRef.current = null
    setRunning(false)
  }, [])

  const play = useCallback(
    (keyframes, options = {}) => {
      const node = target.current
      if (!node || typeof node.animate !== 'function') return null

      cancel()
      const animation = node.animate(keyframes, options)
      animationRef.current = animation
      setRunning(true)
      animation.onfinish = () => setRunning(false)
      animation.oncancel = () => setRunning(false)
      return animation
    },
    [cancel, target],
  )

  return { isSupported, running, play, cancel }
}
```
