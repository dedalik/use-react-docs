---
title: Manage getUserMedia stream lifecycle
sidebar_label: useUserMedia
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useUserMedia.tsx'
description: >-
  useUserMedia from @dedalik/use-react: start/stop media stream with loading and errors.
---

# useUserMedia()

<PackageData fn="useUserMedia" />

Last updated: 24/04/2026

## Overview

`useUserMedia` wraps **`navigator.mediaDevices.getUserMedia(constraints)`**: the **`start`** function requests access using the **same `constraints` object** passed to the hook (default **`{ audio: true, video: true }`**), and on success stores the **`MediaStream`**; **`stop()`** (and unmount) stops all tracks. **`supported`** is whether **`getUserMedia` exists, **`loading`** is true for the in-flight `start`, and **`error`** captures Promise rejections (e.g. permission denied). The **`start`** callback is stable across constraint identity: changing **`constraints` reference** re-creates the internal `start` so new captures use the new shape when you need them. Use **`<video ref>` + `srcObject`\*\* to preview the camera in the example below.

### What it accepts

- Optional **`constraints`**: `MediaStreamConstraints` (default `{ audio: true, video: true }`)

### What it returns

- **`stream`**: `MediaStream | null`
- **`error`**: `Error | null`
- **`loading`**: `boolean`
- **`supported`**: `boolean`
- **`start`**: `() => Promise<MediaStream | null>`
- **`stop`**: `() => void`

## Usage

Constrain to **video only** (e.g. selfie preview), wire **`start` / `stop`**, and attach the stream to **`<video>`**.

```tsx
import { useEffect, useRef } from 'react'
import useUserMedia from '@dedalik/use-react/useUserMedia'

function Example() {
  const { stream, error, loading, supported, start, stop } = useUserMedia({
    video: { width: 640, height: 480, facingMode: 'user' },
    audio: false,
  })
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.srcObject = stream
    if (stream) {
      void el.play().catch(() => {})
    }
  }, [stream])

  if (!supported) {
    return <p>getUserMedia is not available in this context.</p>
  }

  return (
    <div>
      <p>
        <button type='button' onClick={() => void start()} disabled={loading || !!stream}>
          {loading ? 'Opening…' : 'Start camera'}
        </button>{' '}
        <button type='button' onClick={stop} disabled={!stream && !loading}>
          Stop
        </button>
      </p>
      {error && (
        <p role='alert'>
          <strong>Error:</strong> {error.message}
        </p>
      )}
      <video ref={videoRef} autoPlay playsInline muted style={{ maxWidth: 320, border: '1px solid #999' }} />
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useUserMedia`

**Signature:** `useUserMedia(constraints: MediaStreamConstraints = { audio: true, video: true }): UseUserMediaState`

#### Parameters

1. **`constraints`** - Forwarded to **`getUserMedia`**.

#### Returns

**`stream`**, **`error`**, **`loading`**, **`supported`**, **`start`**, **`stop`**

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useState } from 'react'

export interface UseUserMediaState {
  stream: MediaStream | null
  error: Error | null
  loading: boolean
  supported: boolean
  start: () => Promise<MediaStream | null>
  stop: () => void
}

/**
 * Manages `getUserMedia` stream lifecycle.
 */
export default function useUserMedia(
  constraints: MediaStreamConstraints = { audio: true, video: true },
): UseUserMediaState {
  const supported = typeof navigator !== 'undefined' && Boolean(navigator.mediaDevices?.getUserMedia)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const stop = useCallback(() => {
    setStream((current) => {
      current?.getTracks().forEach((track) => track.stop())
      return null
    })
  }, [])

  const start = useCallback(async () => {
    if (!supported) return null

    setLoading(true)
    setError(null)

    try {
      const media = await navigator.mediaDevices.getUserMedia(constraints)
      setStream(media)
      return media
    } catch (err) {
      setError(err as Error)
      return null
    } finally {
      setLoading(false)
    }
  }, [constraints, supported])

  useEffect(() => stop, [stop])

  return { stream, error, loading, supported, start, stop }
}
```

### JavaScript

```js
import { useCallback, useEffect, useState } from 'react'

/**
 * Manages `getUserMedia` stream lifecycle.
 */
export default function useUserMedia(constraints = { audio: true, video: true }) {
  const supported = typeof navigator !== 'undefined' && Boolean(navigator.mediaDevices?.getUserMedia)
  const [stream, setStream] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const stop = useCallback(() => {
    setStream((current) => {
      current?.getTracks().forEach((track) => track.stop())
      return null
    })
  }, [])

  const start = useCallback(async () => {
    if (!supported) return null

    setLoading(true)
    setError(null)

    try {
      const media = await navigator.mediaDevices.getUserMedia(constraints)
      setStream(media)
      return media
    } catch (err) {
      setError(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [constraints, supported])

  useEffect(() => stop, [stop])

  return { stream, error, loading, supported, start, stop }
}
```
