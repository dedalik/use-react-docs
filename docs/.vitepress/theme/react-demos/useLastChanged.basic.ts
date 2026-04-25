import React, { useState } from 'react'
import useLastChanged from '@dedalik/use-react/useLastChanged'

function LastChangedDemo() {
  const [mode, setMode] = useState<'string' | 'object'>('string')
  const [str, setStr] = useState('alpha')
  const [obj, setObj] = useState({ id: 1 })
  const value = mode === 'string' ? str : obj
  const lastChanged = useLastChanged(value)
  const timeStr = new Date(lastChanged).toLocaleTimeString()

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'useLastChanged(value) - updates a timestamp when `value` is not `Object.is` to the previous one. Same object reference (no re-render with new value) will not update.',
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar' },
      React.createElement(
        'div',
        { className: 'hook-demo-field' },
        React.createElement('p', { className: 'hook-demo-label' }, 'value kind'),
        React.createElement(
          'div',
          { className: 'hook-demo-segment', role: 'group', 'aria-label': 'Value kind' },
          React.createElement(
            'button',
            {
              type: 'button',
              className: mode === 'string' ? 'is-active' : undefined,
              'aria-pressed': mode === 'string',
              onClick: () => setMode('string'),
            },
            'string (primitive)',
          ),
          React.createElement(
            'button',
            {
              type: 'button',
              className: mode === 'object' ? 'is-active' : undefined,
              'aria-pressed': mode === 'object',
              onClick: () => setMode('object'),
            },
            'object (new identity on bump)',
          ),
        ),
      ),
    ),
    mode === 'string'
      ? React.createElement('input', { type: 'text', value: str, onChange: (e) => setStr(e.target.value) })
      : React.createElement(
          'div',
          { style: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' } },
          React.createElement(
            'button',
            { type: 'button', onClick: () => setObj((o) => ({ id: o.id + 1 })) },
            'new object (id+1)',
          ),
          React.createElement('code', { style: { padding: '0.35rem 0.5rem' } }, JSON.stringify(obj)),
        ),
    React.createElement(
      'p',
      { style: { margin: 0 } },
      'Last change at: ',
      React.createElement('strong', null, timeStr),
      ' (',
      String(lastChanged),
      ' ms)',
    ),
  )
}

export const sourceJsx = `import { useState } from 'react'
import useLastChanged from '@dedalik/use-react/useLastChanged'

export default function LastChangedDemo() {
  const [mode, setMode] = useState('string')
  const [str, setStr] = useState('alpha')
  const [obj, setObj] = useState({ id: 1 })
  const value = mode === 'string' ? str : obj
  const lastChanged = useLastChanged(value)
  const timeStr = new Date(lastChanged).toLocaleTimeString()

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        useLastChanged(value) - timestamp updates when the value is not Object.is to the previous one.
      </p>
      <div className='hook-demo-toolbar'>
        <div className='hook-demo-field'>
          <p className='hook-demo-label'>value kind</p>
          <div className='hook-demo-segment' role='group' aria-label='Value kind'>
            <button
              type='button'
              className={mode === 'string' ? 'is-active' : undefined}
              aria-pressed={mode === 'string'}
              onClick={() => setMode('string')}
            >
              string (primitive)
            </button>
            <button
              type='button'
              className={mode === 'object' ? 'is-active' : undefined}
              aria-pressed={mode === 'object'}
              onClick={() => setMode('object')}
            >
              object (new identity on bump)
            </button>
          </div>
        </div>
      </div>
      {mode === 'string' ? (
        <input type='text' value={str} onChange={(e) => setStr(e.target.value)} />
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button type='button' onClick={() => setObj((o) => ({ id: o.id + 1 }))}>
            new object (id+1)
          </button>
          <code style={{ padding: '0.35rem 0.5rem' }}>{JSON.stringify(obj)}</code>
        </div>
      )}
      <p style={{ margin: 0 }}>
        Last change at: <strong>{timeStr}</strong> ({String(lastChanged)} ms)
      </p>
    </div>
  )
}`

export default LastChangedDemo
