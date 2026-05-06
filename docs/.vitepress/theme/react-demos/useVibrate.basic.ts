import React, { useMemo, useState } from 'react'
import useVibrate from '@dedalik/use-react/useVibrate'

type VibrateStatus = '-' | 'accepted' | 'ignored'

function VibrateDemo() {
  const vibrate = useVibrate()
  const [last, setLast] = useState<VibrateStatus>('-')
  const isSupported = useMemo(() => typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function', [])

  const run = (pattern: number | number[]) => {
    const ok = vibrate(pattern)
    setLast(ok ? 'accepted' : 'ignored')
  }

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Triggers Vibration API patterns on click. Test on a physical mobile device for real haptic feedback.',
    ),
    React.createElement(
      'p',
      { style: { margin: '0 0 10px', color: 'var(--vp-c-text-2)' } },
      `Support: ${isSupported ? 'available' : 'not available'} - Last call: ${last}`,
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'repeat(3, max-content)' } },
      React.createElement('button', { type: 'button', onClick: () => run(80) }, 'Short (80ms)'),
      React.createElement('button', { type: 'button', onClick: () => run([60, 40, 60, 40, 120]) }, 'Pattern'),
      React.createElement('button', { type: 'button', onClick: () => run(0) }, 'Stop'),
    ),
  )
}

export const sourceJsx = `import { useMemo, useState } from 'react'
import useVibrate from '@dedalik/use-react/useVibrate'

export default function VibrateDemo() {
  const vibrate = useVibrate()
  const [last, setLast] = useState('-')
  const isSupported = useMemo(() => typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function', [])

  const run = (pattern) => {
    const ok = vibrate(pattern)
    setLast(ok ? 'accepted' : 'ignored')
  }

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Triggers Vibration API patterns on click. Test on a physical mobile device for real haptic feedback.
      </p>
      <p style={{ margin: '0 0 10px', color: 'var(--vp-c-text-2)' }}>
        Support: {isSupported ? 'available' : 'not available'} - Last call: {last}
      </p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(3, max-content)' }}>
        <button type='button' onClick={() => run(80)}>
          Short (80ms)
        </button>
        <button type='button' onClick={() => run([60, 40, 60, 40, 120])}>
          Pattern
        </button>
        <button type='button' onClick={() => run(0)}>
          Stop
        </button>
      </div>
    </div>
  )
}`

export default VibrateDemo
