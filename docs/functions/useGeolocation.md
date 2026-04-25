---
title: Track browser geolocation
sidebar_label: useGeolocation
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useGeolocation.tsx'
description: >-
  useGeolocation from @dedalik/use-react: watch latitude/longitude updates and errors.
---

# useGeolocation()

<PackageData fn="useGeolocation" />

Last updated: 24/04/2026

## Overview

`useGeolocation` starts **`navigator.geolocation.watchPosition`** in an effect and keeps the latest **`latitude`**, **`longitude`**, and **`accuracy`** in state. The browser may prompt for location permission; until a fix is received, **`loading`** is **`true`**. If **`geolocation`** is missing, **`loading`** flips to **`false`** and coordinates stay **`null`**. Errors (permission denied, timeout, position unavailable) surface on **`error`**; successful updates clear **`error`**. The implementation uses fixed watch options: **`{ enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }`**. The watch is cleared on unmount.

### What it accepts

- None.

### What it returns

- **`loading`**: `boolean`
- **`latitude`**: `number | null`
- **`longitude`**: `number | null`
- **`accuracy`**: `number | null` (meters, when the browser provides it)
- **`error`**: `GeolocationPositionError | null`

## Usage

Show position or a user-readable error. Link coordinates to a maps URL for quick testing.

```tsx
import useGeolocation from '@dedalik/use-react/useGeolocation'

function mapsLink(lat: number, lon: number) {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=12/${lat}/${lon}`
}

function Example() {
  const { loading, latitude, longitude, accuracy, error } = useGeolocation()

  if (loading) {
    return <p>Requesting location…</p>
  }

  if (error) {
    return (
      <p role='alert'>
        <strong>Geolocation error (code {error.code}):</strong> {error.message}
      </p>
    )
  }

  if (latitude == null || longitude == null) {
    return <p>Geolocation is not available in this context.</p>
  }

  return (
    <div>
      <p>
        <strong>Latitude:</strong> {latitude.toFixed(6)}
        <br />
        <strong>Longitude:</strong> {longitude.toFixed(6)}
        {accuracy != null && (
          <>
            <br />
            <strong>Accuracy:</strong> ±{Math.round(accuracy)} m
          </>
        )}
      </p>
      <p>
        <a href={mapsLink(latitude, longitude)} rel='noreferrer' target='_blank'>
          Open on map
        </a>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useGeolocation`

**Signature:** `useGeolocation(): UseGeolocationState`

#### Parameters

None.

#### Returns

Object with:

- `loading` - True until first callback or a definite failure to start.
- `latitude` / `longitude` / `accuracy` - From `position.coords` when a fix is received.
- `error` - `GeolocationPositionError` on failure, else `null` after success.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export interface UseGeolocationState {
  loading: boolean
  latitude: number | null
  longitude: number | null
  accuracy: number | null
  error: GeolocationPositionError | null
}

const initialState: UseGeolocationState = {
  loading: true,
  latitude: null,
  longitude: null,
  accuracy: null,
  error: null,
}

/**
 * Tracks user location via browser geolocation API.
 */
export default function useGeolocation(): UseGeolocationState {
  const [state, setState] = useState<UseGeolocationState>(initialState)

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setState({ ...initialState, loading: false })
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setState({
          loading: false,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          error: null,
        })
      },
      (error) => {
        setState((prev) => ({ ...prev, loading: false, error }))
      },
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 },
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return state
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

const initialState = {
  loading: true,
  latitude: null,
  longitude: null,
  accuracy: null,
  error: null,
}

/**
 * Tracks user location via browser geolocation API.
 */
export default function useGeolocation() {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setState({ ...initialState, loading: false })
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setState({
          loading: false,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          error: null,
        })
      },
      (error) => {
        setState((prev) => ({ ...prev, loading: false, error }))
      },
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 },
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return state
}
```
