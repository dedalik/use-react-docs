---
title: Control media playback
sidebar_label: useMediaControls
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useMediaControls.tsx'
description: >-
  useMediaControls from @dedalik/use-react: reactive playback controls for HTML media elements.
---

# useMediaControls()

<PackageData fn="useMediaControls" />

<HookLiveDemo demo="useMediaControls/basic" title="useMediaControls interactive demo" />

## Overview

`useMediaControls` attaches to an `HTMLMediaElement` via a ref and mirrors its playback surface into React: it listens for `play`, `pause`, `timeupdate`, `durationchange`, and `volumechange`, so `playing`, `currentTime`, `duration`, `volume`, and `muted` stay aligned with the real element even if the user scrubs with native controls or another script mutates the tag. Imperative helpers call `play()`, `pause()`, clamp `seek` to non-negative times, and bound `setVolume` between 0 and 1 while updating both the DOM property and local state-handy for building custom transport bars without duplicating media event wiring.

### What it accepts

- **`target`** - `RefObject<HTMLMediaElement | null>` pointing at your `<audio>` or `<video>` node.

### What it returns

- **`playing`**, **`muted`**, **`volume`**, **`currentTime`**, **`duration`** - Snapshot fields synced from the element.
- **`play`**, **`pause`**, **`seek`**, **`setVolume`**, **`setMuted`** - Control helpers that mutate the media node and refresh state.

## Usage

Custom controls for a single `<audio>` element bound through a ref.

```tsx
import { useRef } from 'react'
import useMediaControls from '@dedalik/use-react/useMediaControls'

const SAMPLE_MP3 = 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3'

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function Example() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { playing, muted, volume, currentTime, duration, play, pause, seek, setVolume, setMuted } =
    useMediaControls(audioRef)

  return (
    <div>
      <h3>Audio</h3>
      <audio
        ref={audioRef}
        src={SAMPLE_MP3}
        preload='metadata'
        style={{ display: 'block', width: '100%', maxWidth: 420 }}
      />

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12, alignItems: 'center' }}>
        <button type='button' onClick={() => (playing ? pause() : void play())}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button type='button' onClick={() => setMuted(!muted)}>
          {muted ? 'Unmute' : 'Mute'}
        </button>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          Vol
          <input
            type='range'
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
        </label>
      </div>

      <p>
        {formatTime(currentTime)} / {formatTime(duration)}
      </p>
      <input
        type='range'
        min={0}
        max={duration > 0 ? duration : 0}
        step={0.1}
        value={duration > 0 ? Math.min(currentTime, duration) : 0}
        style={{ width: '100%', maxWidth: 420 }}
        onChange={(event) => seek(Number(event.target.value))}
      />
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useMediaControls`

**Signature:** `useMediaControls(target: RefObject<HTMLMediaElement | null>): UseMediaControlsReturn`

#### Parameters

- **`target`** (`RefObject<HTMLMediaElement | null>`) - Media element whose state and events are mirrored.

#### Returns

Object with:

- **`playing`** - `true` when the element is not paused (`boolean`).
- **`muted`** - Current `muted` flag (`boolean`).
- **`volume`** - Current volume in `[0, 1]` (`number`).
- **`currentTime`**, **`duration`** - Playback position and media length in seconds (`number`).
- **`play`** - Calls `media.play()`; returns whether playback started (`() => Promise<boolean>`).
- **`pause`** - Calls `media.pause()` (`() => void`).
- **`seek`** - Sets `currentTime` clamped to `≥ 0` (`(time: number) => void`).
- **`setVolume`** - Sets volume clamped to `[0, 1]` (`(value: number) => void`).
- **`setMuted`** - Sets `media.muted` (`(value: boolean) => void`).

## Copy-paste hook

### TypeScript

```tsx
import { RefObject, useCallback, useEffect, useMemo, useState } from 'react'

export interface UseMediaControlsReturn {
  playing: boolean
  muted: boolean
  volume: number
  currentTime: number
  duration: number
  play: () => Promise<boolean>
  pause: () => void
  seek: (time: number) => void
  setVolume: (value: number) => void
  setMuted: (value: boolean) => void
}

/**
 * Provides reactive controls for audio/video elements.
 */
export default function useMediaControls(target: RefObject<HTMLMediaElement | null>): UseMediaControlsReturn {
  const [playing, setPlaying] = useState(false)
  const [muted, setMutedState] = useState(false)
  const [volume, setVolumeState] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const media = target.current
    if (!media) return

    const sync = () => {
      setPlaying(!media.paused)
      setMutedState(media.muted)
      setVolumeState(media.volume)
      setCurrentTime(media.currentTime)
      setDuration(Number.isFinite(media.duration) ? media.duration : 0)
    }

    media.addEventListener('play', sync)
    media.addEventListener('pause', sync)
    media.addEventListener('timeupdate', sync)
    media.addEventListener('durationchange', sync)
    media.addEventListener('volumechange', sync)
    sync()

    return () => {
      media.removeEventListener('play', sync)
      media.removeEventListener('pause', sync)
      media.removeEventListener('timeupdate', sync)
      media.removeEventListener('durationchange', sync)
      media.removeEventListener('volumechange', sync)
    }
  }, [target])

  const play = useCallback(async () => {
    const media = target.current
    if (!media) return false

    try {
      await media.play()
      return true
    } catch {
      return false
    }
  }, [target])

  const pause = useCallback(() => {
    target.current?.pause()
  }, [target])

  const seek = useCallback(
    (time: number) => {
      const media = target.current
      if (!media) return
      media.currentTime = Math.max(0, time)
      setCurrentTime(media.currentTime)
    },
    [target],
  )

  const setVolume = useCallback(
    (value: number) => {
      const media = target.current
      if (!media) return
      const next = Math.max(0, Math.min(1, value))
      media.volume = next
      setVolumeState(next)
    },
    [target],
  )

  const setMuted = useCallback(
    (value: boolean) => {
      const media = target.current
      if (!media) return
      media.muted = value
      setMutedState(value)
    },
    [target],
  )

  return useMemo(
    () => ({
      playing,
      muted,
      volume,
      currentTime,
      duration,
      play,
      pause,
      seek,
      setVolume,
      setMuted,
    }),
    [currentTime, duration, muted, pause, play, playing, seek, setMuted, setVolume, volume],
  )
}
```

### JavaScript

```js
import { useCallback, useEffect, useMemo, useState } from 'react'

export default function useMediaControls(target) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMutedState] = useState(false)
  const [volume, setVolumeState] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const media = target.current
    if (!media) return

    const sync = () => {
      setPlaying(!media.paused)
      setMutedState(media.muted)
      setVolumeState(media.volume)
      setCurrentTime(media.currentTime)
      setDuration(Number.isFinite(media.duration) ? media.duration : 0)
    }

    media.addEventListener('play', sync)
    media.addEventListener('pause', sync)
    media.addEventListener('timeupdate', sync)
    media.addEventListener('durationchange', sync)
    media.addEventListener('volumechange', sync)
    sync()

    return () => {
      media.removeEventListener('play', sync)
      media.removeEventListener('pause', sync)
      media.removeEventListener('timeupdate', sync)
      media.removeEventListener('durationchange', sync)
      media.removeEventListener('volumechange', sync)
    }
  }, [target])

  const play = useCallback(async () => {
    const media = target.current
    if (!media) return false

    try {
      await media.play()
      return true
    } catch {
      return false
    }
  }, [target])

  const pause = useCallback(() => {
    target.current?.pause()
  }, [target])

  const seek = useCallback(
    (time) => {
      const media = target.current
      if (!media) return
      media.currentTime = Math.max(0, time)
      setCurrentTime(media.currentTime)
    },
    [target],
  )

  const setVolume = useCallback(
    (value) => {
      const media = target.current
      if (!media) return
      const next = Math.max(0, Math.min(1, value))
      media.volume = next
      setVolumeState(next)
    },
    [target],
  )

  const setMuted = useCallback(
    (value) => {
      const media = target.current
      if (!media) return
      media.muted = value
      setMutedState(value)
    },
    [target],
  )

  return useMemo(
    () => ({
      playing,
      muted,
      volume,
      currentTime,
      duration,
      play,
      pause,
      seek,
      setVolume,
      setMuted,
    }),
    [currentTime, duration, muted, pause, play, playing, seek, setMuted, setVolume, volume],
  )
}
```
