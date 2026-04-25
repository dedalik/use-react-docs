import React, { useState } from 'react'
import useDebounce from '@dedalik/use-react/useDebounce'

function DebounceDemo() {
  const [query, setQuery] = useState('')
  const [delay, setDelay] = useState(400)
  const debounced = useDebounce(query, delay)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'useDebounce(value, delay) - updates the returned value only after `delay` ms without changes (leading edge not emitted). Default delay: 500.',
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar' },
      React.createElement(
        'div',
        { className: 'hook-demo-field', style: { gridColumn: '1 / -1' } },
        React.createElement('p', { className: 'hook-demo-label' }, `delay (${delay} ms)`),
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
      type: 'search',
      value: query,
      placeholder: 'Type quickly - live updates at once, debounced value lags…',
      onChange: (e) => setQuery(e.target.value),
    }),
    React.createElement('p', { style: { margin: 0 } }, 'Live: ', React.createElement('strong', null, query || '-')),
    React.createElement(
      'p',
      { style: { margin: 0 } },
      'Debounced: ',
      React.createElement('strong', null, debounced || '-'),
    ),
  )
}

export const sourceJsx = `import { useState } from 'react'
import useDebounce from '@dedalik/use-react/useDebounce'

export default function DebounceDemo() {
  const [query, setQuery] = useState('')
  const [delay, setDelay] = useState(400)
  const debounced = useDebounce(query, delay)

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        useDebounce(value, delay) - the returned value updates only after the delay with no further
        changes. Default delay: 500.
      </p>
      <div className='hook-demo-toolbar'>
        <div className='hook-demo-field' style={{ gridColumn: '1 / -1' }}>
          <p className='hook-demo-label'>{'delay (' + delay + ' ms)'}</p>
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
        type='search'
        value={query}
        placeholder='Type quickly…'
        onChange={(e) => setQuery(e.target.value)}
      />
      <p style={{ margin: 0 }}>
        Live: <strong>{query || '-'}</strong>
      </p>
      <p style={{ margin: 0 }}>
        Debounced: <strong>{debounced || '-'}</strong>
      </p>
    </div>
  )
}`

export default DebounceDemo
