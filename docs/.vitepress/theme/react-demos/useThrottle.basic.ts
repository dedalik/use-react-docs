import React, { useState } from 'react'
import useThrottle from '@dedalik/use-react/useThrottle'

function ThrottleDemo() {
  const [query, setQuery] = useState('')
  const [delay, setDelay] = useState(400)
  const throttled = useThrottle(query, delay)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'useThrottle(value, delay) - coalesces updates to at most one per `delay` ms (trailing update scheduled if value changed inside the window). Default delay: 500.',
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar' },
      React.createElement(
        'div',
        { className: 'hook-demo-field', style: { gridColumn: '1 / -1' } },
        React.createElement('p', { className: 'hook-demo-label' }, `throttle window (${delay} ms)`),
        React.createElement('input', {
          type: 'range',
          min: 0,
          max: 2000,
          step: 50,
          value: delay,
          onChange: (e) => setDelay(Number(e.target.value)),
        }),
      ),
    ),
    React.createElement('input', {
      type: 'text',
      value: query,
      placeholder: 'Type quickly - throttled value follows with rate limit…',
      onChange: (e) => setQuery(e.target.value),
    }),
    React.createElement('p', { style: { margin: 0 } }, 'Live: ', React.createElement('strong', null, query || '-')),
    React.createElement(
      'p',
      { style: { margin: 0 } },
      'Throttled: ',
      React.createElement('strong', null, throttled || '-'),
    ),
  )
}

export const sourceJsx = `import { useState } from 'react'
import useThrottle from '@dedalik/use-react/useThrottle'

export default function ThrottleDemo() {
  const [query, setQuery] = useState('')
  const [delay, setDelay] = useState(400)
  const throttled = useThrottle(query, delay)

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        useThrottle(value, delay) - at most one update per delay window. Default delay: 500.
      </p>
      <div className='hook-demo-toolbar'>
        <div className='hook-demo-field' style={{ gridColumn: '1 / -1' }}>
          <p className='hook-demo-label'>{'throttle window (' + delay + ' ms)'}</p>
          <input
            type='range'
            min={0}
            max={2000}
            step={50}
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
          />
        </div>
      </div>
      <input
        type='text'
        value={query}
        placeholder='Type quickly…'
        onChange={(e) => setQuery(e.target.value)}
      />
      <p style={{ margin: 0 }}>
        Live: <strong>{query || '-'}</strong>
      </p>
      <p style={{ margin: 0 }}>
        Throttled: <strong>{throttled || '-'}</strong>
      </p>
    </div>
  )
}`

export default ThrottleDemo
