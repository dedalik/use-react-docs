import React, { useRef } from 'react'
import useMediaControls from '@dedalik/use-react/useMediaControls'

const SAMPLE_MP3 = 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3'

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function MediaControlsDemo() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { playing, muted, volume, currentTime, duration, play, pause, seek, setVolume, setMuted } =
    useMediaControls(audioRef)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Use custom transport controls: play/pause, mute, volume, and seek synced with the media element.',
    ),
    React.createElement('audio', {
      ref: audioRef,
      src: SAMPLE_MP3,
      preload: 'metadata',
      style: { display: 'block', width: '100%', marginTop: 8 },
    }),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { marginTop: 10, gridTemplateColumns: 'max-content max-content 1fr' } },
      React.createElement(
        'button',
        { type: 'button', onClick: () => (playing ? pause() : void play()) },
        playing ? 'Pause' : 'Play',
      ),
      React.createElement('button', { type: 'button', onClick: () => setMuted(!muted) }, muted ? 'Unmute' : 'Mute'),
      React.createElement('input', {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.05,
        value: volume,
        onChange: (event) => setVolume(Number(event.target.value)),
      }),
    ),
    React.createElement(
      'p',
      { style: { margin: '10px 0 6px', color: 'var(--vp-c-text-2)' } },
      `${formatTime(currentTime)} / ${formatTime(duration)}`,
    ),
    React.createElement('input', {
      type: 'range',
      min: 0,
      max: duration > 0 ? duration : 0,
      step: 0.1,
      value: duration > 0 ? Math.min(currentTime, duration) : 0,
      style: { width: '100%' },
      onChange: (event) => seek(Number(event.target.value)),
    }),
  )
}

export const sourceJsx = `import { useRef } from 'react'
import useMediaControls from '@dedalik/use-react/useMediaControls'

const SAMPLE_MP3 = 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3'

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return \`\${m}:\${String(s).padStart(2, '0')}\`
}

export default function MediaControlsDemo() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { playing, muted, volume, currentTime, duration, play, pause, seek, setVolume, setMuted } = useMediaControls(audioRef)

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Use custom transport controls: play/pause, mute, volume, and seek synced with the media element.
      </p>

      <audio ref={audioRef} src={SAMPLE_MP3} preload='metadata' style={{ display: 'block', width: '100%', marginTop: 8 }} />

      <div className='hook-demo-toolbar' style={{ marginTop: 10, gridTemplateColumns: 'max-content max-content 1fr' }}>
        <button type='button' onClick={() => (playing ? pause() : void play())}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button type='button' onClick={() => setMuted(!muted)}>
          {muted ? 'Unmute' : 'Mute'}
        </button>
        <input
          type='range'
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
        />
      </div>

      <p style={{ margin: '10px 0 6px', color: 'var(--vp-c-text-2)' }}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </p>
      <input
        type='range'
        min={0}
        max={duration > 0 ? duration : 0}
        step={0.1}
        value={duration > 0 ? Math.min(currentTime, duration) : 0}
        style={{ width: '100%' }}
        onChange={(event) => seek(Number(event.target.value))}
      />
    </div>
  )
}`

export default MediaControlsDemo
