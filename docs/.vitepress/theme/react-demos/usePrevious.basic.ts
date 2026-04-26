import React, { useState } from 'react'
import usePrevious from '@dedalik/use-react/usePrevious'

function PreviousDemo() {
  const [mode, setMode] = useState<'number' | 'text'>('number')
  const [count, setCount] = useState(0)
  const [text, setText] = useState('v1')
  const current = mode === 'number' ? count : text
  const previous = usePrevious(current)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'usePrevious(value) - returns the value from the previous render (first render: undefined). The hook only tracks the last value, not an arbitrary history.',
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar' },
      React.createElement(
        'div',
        { className: 'hook-demo-field' },
        React.createElement('p', { className: 'hook-demo-label' }, 'tracked value'),
        React.createElement(
          'div',
          { className: 'hook-demo-segment', role: 'group', 'aria-label': 'Tracked value type' },
          React.createElement(
            'button',
            {
              type: 'button',
              className: mode === 'number' ? 'is-active' : undefined,
              'aria-pressed': mode === 'number',
              onClick: () => setMode('number'),
            },
            'number (steppers)',
          ),
          React.createElement(
            'button',
            {
              type: 'button',
              className: mode === 'text' ? 'is-active' : undefined,
              'aria-pressed': mode === 'text',
              onClick: () => setMode('text'),
            },
            'string (input)',
          ),
        ),
      ),
    ),
    mode === 'number'
      ? React.createElement(
          'div',
          { style: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' } },
          React.createElement('button', { type: 'button', onClick: () => setCount((c) => c - 1) }, '−1'),
          React.createElement('button', { type: 'button', onClick: () => setCount((c) => c + 1) }, '+1'),
        )
      : React.createElement('input', {
          type: 'text',
          value: text,
          onChange: (e) => setText(e.target.value),
        }),
    React.createElement(
      'div',
      { style: { display: 'grid', gap: '0.35rem' } },
      React.createElement(
        'p',
        { style: { margin: 0 } },
        'Current: ',
        React.createElement('code', null, String(current)),
      ),
      React.createElement(
        'p',
        { style: { margin: 0 } },
        'Previous: ',
        React.createElement('code', null, previous === undefined ? 'undefined' : String(previous)),
      ),
    ),
  )
}

export const sourceJsx = `import { useState } from 'react'
import usePrevious from '@dedalik/use-react/usePrevious'

export default function PreviousDemo() {
  const [mode, setMode] = useState('number')
  const [count, setCount] = useState(0)
  const [text, setText] = useState('v1')
  const current = mode === 'number' ? count : text
  const previous = usePrevious(current)

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        usePrevious(value) - value from the previous render (first render: undefined).
      </p>
      <div className='hook-demo-toolbar'>
        <div className='hook-demo-field'>
          <p className='hook-demo-label'>tracked value</p>
          <div className='hook-demo-segment' role='group' aria-label='Tracked value type'>
            <button
              type='button'
              className={mode === 'number' ? 'is-active' : undefined}
              aria-pressed={mode === 'number'}
              onClick={() => setMode('number')}
            >
              number (steppers)
            </button>
            <button
              type='button'
              className={mode === 'text' ? 'is-active' : undefined}
              aria-pressed={mode === 'text'}
              onClick={() => setMode('text')}
            >
              string (input)
            </button>
          </div>
        </div>
      </div>
      {mode === 'number' ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button type='button' onClick={() => setCount((c) => c - 1)}>−1</button>
          <button type='button' onClick={() => setCount((c) => c + 1)}>+1</button>
        </div>
      ) : (
        <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
      )}
      <p style={{ margin: 0 }}>
        Current: <code>{String(current)}</code>
      </p>
      <p style={{ margin: 0 }}>
        Previous: <code>{previous === undefined ? 'undefined' : String(previous)}</code>
      </p>
    </div>
  )
}`

export default PreviousDemo
