import React, { useEffect, useRef, useState } from 'react'
import useWindowFocus from '@dedalik/use-react/useWindowFocus'

function WindowFocusDemo() {
  const focused = useWindowFocus()
  const [ticks, setTicks] = useState(0)
  const lastBlurAt = useRef<number | null>(null)

  useEffect(() => {
    if (!focused) {
      lastBlurAt.current = Date.now()
      return
    }

    const id = window.setInterval(() => setTicks((value) => value + 1), 1000)
    return () => window.clearInterval(id)
  }, [focused])

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Switch tab or window focus. The state updates via window focus/blur events.',
    ),
    React.createElement(
      'p',
      { style: { margin: '0 0 8px' } },
      'Status: ',
      React.createElement(
        'strong',
        {
          style: {
            color: focused ? 'var(--vp-c-brand-1)' : 'var(--vp-c-danger-1, #b42318)',
          },
        },
        focused ? 'Focused' : 'Blurred',
      ),
    ),
    React.createElement(
      'p',
      { style: { margin: '0 0 8px' } },
      'Background ticker (runs only while focused): ',
      React.createElement('strong', null, `${ticks}s`),
    ),
    !focused && lastBlurAt.current
      ? React.createElement(
          'p',
          { style: { margin: '0 0 8px', color: 'var(--vp-c-text-2)' } },
          'Blurred since: ',
          new Date(lastBlurAt.current).toLocaleTimeString(),
        )
      : null,
    React.createElement(
      'button',
      {
        type: 'button',
        onClick: () => {
          setTicks(0)
          lastBlurAt.current = null
        },
      },
      'Reset demo counters',
    ),
  )
}

export const sourceJsx = `import { useEffect, useRef, useState } from 'react'
import useWindowFocus from '@dedalik/use-react/useWindowFocus'

export default function WindowFocusDemo() {
  const focused = useWindowFocus()
  const [ticks, setTicks] = useState(0)
  const lastBlurAt = useRef<number | null>(null)

  useEffect(() => {
    if (!focused) {
      lastBlurAt.current = Date.now()
      return
    }

    const id = window.setInterval(() => setTicks((value) => value + 1), 1000)
    return () => window.clearInterval(id)
  }, [focused])

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Switch tab or window focus. The state updates via window focus/blur events.
      </p>
      <p style={{ margin: '0 0 8px' }}>
        Status:{' '}
        <strong style={{ color: focused ? 'var(--vp-c-brand-1)' : 'var(--vp-c-danger-1, #b42318)' }}>
          {focused ? 'Focused' : 'Blurred'}
        </strong>
      </p>
      <p style={{ margin: '0 0 8px' }}>
        Background ticker (runs only while focused): <strong>{ticks}s</strong>
      </p>
      {!focused && lastBlurAt.current ? (
        <p style={{ margin: '0 0 8px', color: 'var(--vp-c-text-2)' }}>
          Blurred since: {new Date(lastBlurAt.current).toLocaleTimeString()}
        </p>
      ) : null}
      <button
        type='button'
        onClick={() => {
          setTicks(0)
          lastBlurAt.current = null
        }}
      >
        Reset demo counters
      </button>
    </div>
  )
}`

export default WindowFocusDemo
