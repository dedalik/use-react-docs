---
title: Text-to-speech playback controls
sidebar_label: useSpeechSynthesis
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useSpeechSynthesis.tsx'
description: >-
  useSpeechSynthesis from @dedalik/use-react: speak/cancel API with speaking state.
---

# useSpeechSynthesis()

<PackageData fn="useSpeechSynthesis" />

Last updated: 24/04/2026

## Overview

`useSpeechSynthesis` wraps the **`window.speechSynthesis`** and **`SpeechSynthesisUtterance`** APIs: the hook options set default **`lang`**, **`pitch`**, **`rate`**, and **`volume`**, and every **`speak(text)`** applies those to a new utterance, updates **`speaking`** on start/end/error, and returns **`true`** on success. **`cancel()`** flushes the synthesis queue. The effect subscribes to **`voiceschanged`** only to nudge the **`speaking` flag; actual playback state is driven by callback handlers on the utterance. It is a thin convenience layer-**`isSupported`** is **`false`** if either global is missing. Empty or whitespace text does not start playback (returns **`false`\*\*.

### What it accepts

- Optional **`options`**: `{ lang?: string; pitch?: number; rate?: number; volume?: number }` - defaults **`en-US`**, **`1`** for pitch/rate/volume.

### What it returns

- **`isSupported`**: `boolean`
- **`speaking`**: `boolean`
- **`speak`**: `(text: string) => boolean`
- **`cancel`**: `() => void`

## Usage

Set voice characteristics in options, then read a string aloud.

```tsx
import { useState } from 'react'
import useSpeechSynthesis from '@dedalik/use-react/useSpeechSynthesis'

function Example() {
  const { isSupported, speaking, speak, cancel } = useSpeechSynthesis({
    lang: 'en-US',
    rate: 0.9,
    pitch: 1,
    volume: 0.8,
  })
  const [text, setText] = useState('Hello from the browser')

  if (!isSupported) {
    return <p>Speech synthesis is not available in this context.</p>
  }

  return (
    <div>
      <label>
        Phrase: <input value={text} onChange={(e) => setText(e.target.value)} size={40} />
      </label>
      <p>
        <button type='button' onClick={() => speak(text)} disabled={!text.trim() || speaking}>
          {speaking ? 'Speaking…' : 'Speak'}
        </button>{' '}
        <button type='button' onClick={cancel} disabled={!speaking}>
          Stop
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

### `useSpeechSynthesis`

**Signature:** `useSpeechSynthesis(options: UseSpeechSynthesisOptions = {}): UseSpeechSynthesisReturn`

#### Parameters

1. **`options`**
   - **`lang`**, **`pitch`**, **`rate`**, **`volume`**

#### Returns

**`isSupported`**, **`speaking`**, **`speak`**, **`cancel`**

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useState } from 'react'

export interface UseSpeechSynthesisOptions {
  lang?: string
  pitch?: number
  rate?: number
  volume?: number
}

export interface UseSpeechSynthesisReturn {
  isSupported: boolean
  speaking: boolean
  speak: (text: string) => boolean
  cancel: () => void
}

/**
 * Speech synthesis wrapper with speaking state.
 */
export default function useSpeechSynthesis(options: UseSpeechSynthesisOptions = {}): UseSpeechSynthesisReturn {
  const { lang = 'en-US', pitch = 1, rate = 1, volume = 1 } = options
  const [speaking, setSpeaking] = useState(false)

  const isSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window

  useEffect(() => {
    if (!isSupported) return

    const update = () => setSpeaking(window.speechSynthesis.speaking)
    window.speechSynthesis.addEventListener('voiceschanged', update)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', update)
  }, [isSupported])

  const speak = useCallback(
    (text: string): boolean => {
      if (!isSupported || !text.trim()) return false

      try {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = lang
        utterance.pitch = pitch
        utterance.rate = rate
        utterance.volume = volume
        utterance.onstart = () => setSpeaking(true)
        utterance.onend = () => setSpeaking(false)
        utterance.onerror = () => setSpeaking(false)

        window.speechSynthesis.speak(utterance)
        return true
      } catch {
        return false
      }
    },
    [isSupported, lang, pitch, rate, volume],
  )

  const cancel = useCallback(() => {
    if (!isSupported) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [isSupported])

  return { isSupported, speaking, speak, cancel }
}
```

### JavaScript

```js
import { useCallback, useEffect, useState } from 'react'

/**
 * Speech synthesis wrapper with speaking state.
 */
export default function useSpeechSynthesis(options = {}) {
  const { lang = 'en-US', pitch = 1, rate = 1, volume = 1 } = options
  const [speaking, setSpeaking] = useState(false)

  const isSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window

  useEffect(() => {
    if (!isSupported) return

    const update = () => setSpeaking(window.speechSynthesis.speaking)
    window.speechSynthesis.addEventListener('voiceschanged', update)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', update)
  }, [isSupported])

  const speak = useCallback(
    (text) => {
      if (!isSupported || !text.trim()) return false

      try {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = lang
        utterance.pitch = pitch
        utterance.rate = rate
        utterance.volume = volume
        utterance.onstart = () => setSpeaking(true)
        utterance.onend = () => setSpeaking(false)
        utterance.onerror = () => setSpeaking(false)

        window.speechSynthesis.speak(utterance)
        return true
      } catch {
        return false
      }
    },
    [isSupported, lang, pitch, rate, volume],
  )

  const cancel = useCallback(() => {
    if (!isSupported) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [isSupported])

  return { isSupported, speaking, speak, cancel }
}
```
