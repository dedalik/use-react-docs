---
title: Speech-to-text recognition state
sidebar_label: useSpeechRecognition
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useSpeechRecognition.tsx'
description: >-
  useSpeechRecognition from @dedalik/use-react: transcript, listening, and error state.
---

# useSpeechRecognition()

<PackageData fn="useSpeechRecognition" />

Last updated: 24/04/2026

## Overview

`useSpeechRecognition` resolves **`window.SpeechRecognition` / `webkitSpeechRecognition`**, lazily creates one recognition object with **`continuous: true`** and **`interimResults: true`**, and merges **`onresult`** chunks into a single **`transcript`**. The **`lang`** string (default **`en-US`**) is applied when the instance is first created. **`start()`** begins listening and clears the last **`error`**; **`stop()`** calls the engine’s stop; **`reset()`** clears **`transcript`** and **`error`**. **`listening`** is set **`true`** on start and when the engine ends it goes **`false`** in **`onend`**. Browsers may require HTTPS and a microphone permission. If no constructor is available, **`isSupported`** is **`false`**.

### What it accepts

- Optional **`lang`** (default **`'en-US'`**) - BCP-47 code for the recognition model.

### What it returns

- **`isSupported`**: `boolean`
- **`listening`**: `boolean`
- **`transcript`**: `string`
- **`error`**: `string | null` (error codes from the engine, e.g. `not-allowed`)
- **`start`**, **`stop`**, **`reset`**: `() => void`

## Usage

Set **`lang`** (here **`en-GB`**) to match the speaker; wire Start / Stop / Clear.

```tsx
import useSpeechRecognition from '@dedalik/use-react/useSpeechRecognition'

function Example() {
  const { isSupported, listening, transcript, error, start, stop, reset } = useSpeechRecognition('en-GB')

  if (!isSupported) {
    return <p>Web Speech API recognition is not available in this browser.</p>
  }

  return (
    <div>
      <p>
        <button type='button' onClick={start} disabled={listening}>
          Start
        </button>{' '}
        <button type='button' onClick={stop} disabled={!listening}>
          Stop
        </button>{' '}
        <button type='button' onClick={reset}>
          Clear
        </button>
      </p>
      {error && <p role='alert'>Error: {error}</p>}
      <p>
        {listening ? 'Listening…' : 'Idle'}. {transcript ? <span>Heard: {transcript}</span> : 'No text yet.'}
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useSpeechRecognition`

**Signature:** `useSpeechRecognition(lang = 'en-US'): UseSpeechRecognitionReturn`

#### Parameters

1. **`lang`** (optional) - Default **`en-US`**

#### Returns

Object with **`isSupported`**, **`listening`**, **`transcript`**, **`error`**, **`start`**, **`stop`**, **`reset`**

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useMemo, useRef, useState } from 'react'

interface SpeechRecognitionLike extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
}

export interface UseSpeechRecognitionReturn {
  isSupported: boolean
  listening: boolean
  transcript: string
  error: string | null
  start: () => void
  stop: () => void
  reset: () => void
}

/**
 * Speech recognition wrapper with transcript state.
 */
export default function useSpeechRecognition(lang = 'en-US'): UseSpeechRecognitionReturn {
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [listening, setListening] = useState(false)

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)

  const RecognitionCtor = useMemo(() => {
    if (typeof window === 'undefined') return null
    return (
      (
        window as Window & {
          SpeechRecognition?: new () => SpeechRecognitionLike
          webkitSpeechRecognition?: new () => SpeechRecognitionLike
        }
      ).SpeechRecognition ||
      (window as Window & { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition ||
      null
    )
  }, [])

  const isSupported = Boolean(RecognitionCtor)

  const ensureInstance = useCallback(() => {
    if (!RecognitionCtor) return null
    if (recognitionRef.current) return recognitionRef.current

    const instance = new RecognitionCtor()
    instance.lang = lang
    instance.continuous = true
    instance.interimResults = true

    instance.onresult = (event) => {
      const parts: string[] = []
      for (let i = 0; i < event.results.length; i += 1) {
        const alt = event.results[i]
        if (alt && alt[0]) parts.push(alt[0].transcript)
      }
      setTranscript(parts.join(' ').trim())
    }

    instance.onerror = (event) => {
      setError(event.error)
    }

    instance.onend = () => setListening(false)

    recognitionRef.current = instance
    return instance
  }, [RecognitionCtor, lang])

  const start = useCallback(() => {
    const instance = ensureInstance()
    if (!instance) return
    setError(null)
    instance.start()
    setListening(true)
  }, [ensureInstance])

  const stop = useCallback(() => {
    recognitionRef.current?.stop()
    setListening(false)
  }, [])

  const reset = useCallback(() => {
    setTranscript('')
    setError(null)
  }, [])

  return { isSupported, listening, transcript, error, start, stop, reset }
}
```

### JavaScript

```js
import { useCallback, useMemo, useRef, useState } from 'react'

/**
 * Speech recognition wrapper with transcript state.
 */
export default function useSpeechRecognition(lang = 'en-US') {
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState(null)
  const [listening, setListening] = useState(false)

  const recognitionRef = useRef(null)

  const RecognitionCtor = useMemo(() => {
    if (typeof window === 'undefined') return null
    return window.SpeechRecognition || window.webkitSpeechRecognition || null
  }, [])

  const isSupported = Boolean(RecognitionCtor)

  const ensureInstance = useCallback(() => {
    if (!RecognitionCtor) return null
    if (recognitionRef.current) return recognitionRef.current

    const instance = new RecognitionCtor()
    instance.lang = lang
    instance.continuous = true
    instance.interimResults = true

    instance.onresult = (event) => {
      const parts = []
      for (let i = 0; i < event.results.length; i += 1) {
        const alt = event.results[i]
        if (alt && alt[0]) parts.push(alt[0].transcript)
      }
      setTranscript(parts.join(' ').trim())
    }

    instance.onerror = (event) => {
      setError(event.error)
    }

    instance.onend = () => setListening(false)

    recognitionRef.current = instance
    return instance
  }, [RecognitionCtor, lang])

  const start = useCallback(() => {
    const instance = ensureInstance()
    if (!instance) return
    setError(null)
    instance.start()
    setListening(true)
  }, [ensureInstance])

  const stop = useCallback(() => {
    recognitionRef.current?.stop()
    setListening(false)
  }, [])

  const reset = useCallback(() => {
    setTranscript('')
    setError(null)
  }, [])

  return { isSupported, listening, transcript, error, start, stop, reset }
}
```
