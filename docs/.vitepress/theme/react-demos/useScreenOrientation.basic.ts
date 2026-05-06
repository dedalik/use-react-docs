import React, { useMemo, useState } from 'react'
import useScreenOrientation from '@dedalik/use-react/useScreenOrientation'

const PRESETS = [
  { label: 'Portrait (0deg)', type: 'portrait-primary', angle: 0 },
  { label: 'Portrait upside-down', type: 'portrait-secondary', angle: 180 },
  { label: 'Landscape right', type: 'landscape-primary', angle: 90 },
  { label: 'Landscape left', type: 'landscape-secondary', angle: 270 },
] as const

function ScreenOrientationDemo() {
  const { angle, type } = useScreenOrientation()
  const [preview, setPreview] = useState<{ type: string; angle: number } | null>(null)

  const resolved = preview ?? { type, angle }
  const isLandscape = resolved.type.includes('landscape')
  const modeLabel = preview ? 'Simulated preview' : 'Live device value'
  const boxStyle = useMemo(
    () => ({
      width: isLandscape ? 148 : 94,
      height: isLandscape ? 94 : 148,
      transition: 'all 180ms ease',
      borderRadius: 10,
      border: '1px solid var(--vp-c-divider)',
      background: 'var(--vp-c-bg-soft)',
      display: 'grid',
      placeItems: 'center',
      fontWeight: 600,
      color: 'var(--vp-c-text-2)',
      transform: `rotate(${resolved.angle % 180 === 0 ? 0 : 0}deg)`,
    }),
    [isLandscape, resolved.angle],
  )

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Use buttons to simulate common orientations. Keep "Live device value" for real screen orientation updates.',
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'repeat(2, max-content)', gap: 8 } },
      ...PRESETS.map((preset) =>
        React.createElement(
          'button',
          {
            key: preset.label,
            type: 'button',
            onClick: () => setPreview({ type: preset.type, angle: preset.angle }),
          },
          preset.label,
        ),
      ),
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: () => setPreview(null),
        },
        'Live device value',
      ),
    ),
    React.createElement(
      'p',
      { style: { margin: '10px 0 8px' } },
      `${modeLabel}: ${resolved.type} | ${resolved.angle}deg`,
    ),
    React.createElement(
      'p',
      { style: { margin: '0 0 10px', color: 'var(--vp-c-text-2)' } },
      `Suggested layout: ${isLandscape ? 'wide canvas' : 'tall canvas'}`,
    ),
    React.createElement('div', { style: boxStyle }, isLandscape ? 'Landscape' : 'Portrait'),
  )
}

export const sourceJsx = `import { useMemo, useState } from 'react'
import useScreenOrientation from '@dedalik/use-react/useScreenOrientation'

const PRESETS = [
  { label: 'Portrait (0deg)', type: 'portrait-primary', angle: 0 },
  { label: 'Portrait upside-down', type: 'portrait-secondary', angle: 180 },
  { label: 'Landscape right', type: 'landscape-primary', angle: 90 },
  { label: 'Landscape left', type: 'landscape-secondary', angle: 270 },
]

export default function ScreenOrientationDemo() {
  const { angle, type } = useScreenOrientation()
  const [preview, setPreview] = useState<{ type: string; angle: number } | null>(null)

  const resolved = preview ?? { type, angle }
  const isLandscape = resolved.type.includes('landscape')
  const modeLabel = preview ? 'Simulated preview' : 'Live device value'
  const boxStyle = useMemo(
    () => ({
      width: isLandscape ? 148 : 94,
      height: isLandscape ? 94 : 148,
      transition: 'all 180ms ease',
      borderRadius: 10,
      border: '1px solid var(--vp-c-divider)',
      background: 'var(--vp-c-bg-soft)',
      display: 'grid',
      placeItems: 'center',
      fontWeight: 600,
      color: 'var(--vp-c-text-2)',
      transform: \`rotate(\${resolved.angle % 180 === 0 ? 0 : 0}deg)\`,
    }),
    [isLandscape, resolved.angle]
  )

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Use buttons to simulate common orientations. Keep "Live device value" for real screen orientation updates.
      </p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(2, max-content)', gap: 8 }}>
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            type='button'
            onClick={() => setPreview({ type: preset.type, angle: preset.angle })}
          >
            {preset.label}
          </button>
        ))}
        <button type='button' onClick={() => setPreview(null)}>
          Live device value
        </button>
      </div>

      <p style={{ margin: '10px 0 8px' }}>
        {modeLabel}: {resolved.type} | {resolved.angle}deg
      </p>
      <p style={{ margin: '0 0 10px', color: 'var(--vp-c-text-2)' }}>
        {'Suggested layout: ' + (isLandscape ? 'wide canvas' : 'tall canvas')}
      </p>
      <div style={boxStyle}>{isLandscape ? 'Landscape' : 'Portrait'}</div>
    </div>
  )
}`

export default ScreenOrientationDemo
