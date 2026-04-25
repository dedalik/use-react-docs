---
title: Capture display media stream
sidebar_label: useDisplayMedia
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useDisplayMedia.tsx'
description: >-
  useDisplayMedia from @dedalik/use-react: start and stop screen-share media streams.
---

# useDisplayMedia()

<PackageData fn="useDisplayMedia" />

Last updated: 24/04/2026

## Overview

`useDisplayMedia` wraps the Screen Capture API **`navigator.mediaDevices.getDisplayMedia`**: **`start(options?)`** asks the user to pick a screen, window, or tab and, on success, stores the resulting **`MediaStream`**; **`stop()`** ends all tracks and clears the stream. The hook tracks **`loading`**, the last **`error`**, and **`supported`** (whether the API exists). On unmount, a cleanup effect calls **`stop`** so you do not leave a live capture running after the component is gone. Options follow the same shape as the browser (for example default \*\*`{ video: true, audio: false }`).

### What it accepts

- None.

### What it returns

- **`stream`**: `MediaStream | null`
- **`error`**: `Error | null`
- **`loading`**: `boolean`
- **`supported`**: `boolean`
- **`start`**: `(options?: DisplayMediaStreamOptions) => Promise<MediaStream | null>`
- **`stop`**: `() => void`

## Usage

Pipe the stream into a `<video>` element. Pass **`start`** options to show audio capture when supported (user consent still required).

```tsx
import { useRef, useEffect } from 'react'
import useDisplayMedia from '@dedalik/use-react/useDisplayMedia'

function Example() {
  const { stream, error, loading, supported, start, stop } = useDisplayMedia()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.srcObject = stream
    if (stream) {
      void el.play().catch(() => {})
    }
  }, [stream])

  return (
    <div>
      {!supported && <p>getDisplayMedia is not available in this context.</p>}
      {supported && (
        <p>
          <button
            type='button'
            disabled={loading}
            onClick={() =>
              void start({
                video: true,
                audio: true,
              })
            }
          >
            {loading ? 'Starting…' : 'Share screen'}
          </button>{' '}
          <button type='button' onClick={stop} disabled={!stream && !loading}>
            Stop
          </button>
        </p>
      )}
      {error && (
        <p role='alert'>
          <strong>Error:</strong> {error.message}
        </p>
      )}
      <video ref={videoRef} autoPlay muted playsInline style={{ maxWidth: '100%', border: '1px solid #ccc' }} />
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useDisplayMedia`

**Signature:** `useDisplayMedia(): UseDisplayMediaState`

#### Parameters

None.

#### Returns

Object with:

- `stream` - `MediaStream | null`.
- `error` - `Error | null`.
- `loading` - In-flight `getDisplayMedia` call.
- `supported` - `navigator.mediaDevices.getDisplayMedia` is available.
- `start` - Starts capture; optional **`DisplayMediaStreamOptions`**.
- `stop` - Stops all tracks and clears `stream`.

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useState } from 'react'

export interface UseDisplayMediaState {
  stream: MediaStream | null
  error: Error | null
  loading: boolean
  supported: boolean
  start: (options?: DisplayMediaStreamOptions) => Promise<MediaStream | null>
  stop: () => void
}

/**
 * Manages `getDisplayMedia` screen sharing stream lifecycle.
 */
export default function useDisplayMedia(): UseDisplayMediaState {
  const supported = typeof navigator !== 'undefined' && Boolean(navigator.mediaDevices?.getDisplayMedia)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const stop = useCallback(() => {
    setStream((current) => {
      current?.getTracks().forEach((track) => track.stop())
      return null
    })
  }, [])

  const start = useCallback(
    async (options: DisplayMediaStreamOptions = { video: true, audio: false }) => {
      if (!supported) return null

      setLoading(true)
      setError(null)

      try {
        const media = await navigator.mediaDevices.getDisplayMedia(options)
        setStream(media)
        return media
      } catch (err) {
        setError(err as Error)
        return null
      } finally {
        setLoading(false)
      }
    },
    [supported],
  )

  useEffect(() => stop, [stop])

  return { stream, error, loading, supported, start, stop }
}
```

### JavaScript

```js
import { useCallback, useEffect, useState } from 'react'

/**
 * Manages `getDisplayMedia` screen sharing stream lifecycle.
 */
export default function useDisplayMedia() {
  const supported = typeof navigator !== 'undefined' && Boolean(navigator.mediaDevices?.getDisplayMedia)
  const [stream, setStream] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const stop = useCallback(() => {
    setStream((current) => {
      current?.getTracks().forEach((track) => track.stop())
      return null
    })
  }, [])

  const start = useCallback(
    async (options = { video: true, audio: false }) => {
      if (!supported) return null

      setLoading(true)
      setError(null)

      try {
        const media = await navigator.mediaDevices.getDisplayMedia(options)
        setStream(media)
        return media
      } catch (err) {
        setError(err)
        return null
      } finally {
        setLoading(false)
      }
    },
    [supported],
  )

  useEffect(() => stop, [stop])

  return { stream, error, loading, supported, start, stop }
}
```
