import React, { useId, useState } from 'react'
import useToggle from '@dedalik/use-react/useToggle'

function ToggleCore({ initial }: { initial: boolean }) {
  const [on, toggle, set] = useToggle(initial)
  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'div',
      { style: { display: 'grid', gap: '0.5rem' } },
      React.createElement(
        'p',
        { className: 'hook-live-demo__status' },
        'API: [value, toggle, set] - value is the boolean, toggle inverts, set sets explicitly.',
      ),
      React.createElement(
        'p',
        { style: { margin: 0, fontSize: '0.9rem' } },
        `value: `,
        React.createElement('strong', null, String(on)),
      ),
      React.createElement(
        'div',
        { style: { display: 'flex', flexWrap: 'wrap', gap: '0.45rem' } },
        React.createElement('button', { type: 'button', onClick: toggle }, 'toggle()'),
        React.createElement('button', { type: 'button', onClick: () => set(true) }, 'set(true)'),
        React.createElement('button', { type: 'button', onClick: () => set(false) }, 'set(false)'),
      ),
    ),
    on
      ? React.createElement(
          'div',
          {
            style: {
              border: '1px solid var(--vp-c-divider)',
              borderRadius: '8px',
              padding: '0.75rem',
              background: 'var(--vp-c-bg-soft)',
            },
          },
          'Content visible while value is true.',
        )
      : null,
  )
}

function ToggleDemo() {
  const rid = useId().replace(/:/g, '')
  const idStart = `${rid}-start-true`
  const [startTrue, setStartTrue] = useState(false)
  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar' },
      React.createElement(
        'div',
        { className: 'hook-demo-field' },
        React.createElement('p', { className: 'hook-demo-label' }, 'useToggle(initial)'),
        React.createElement(
          'label',
          { className: 'hook-demo-check', htmlFor: idStart },
          React.createElement('input', {
            id: idStart,
            type: 'checkbox',
            checked: startTrue,
            onChange: (e) => setStartTrue(e.target.checked),
          }),
          React.createElement('span', null, 'Start as true (remounts hook)'),
        ),
      ),
    ),
    React.createElement(ToggleCore, { key: String(startTrue), initial: startTrue }),
  )
}

export const sourceJsx = `import { useId, useState } from 'react'
import useToggle from '@dedalik/use-react/useToggle'

function ToggleCore({ initial }) {
  const [on, toggle, set] = useToggle(initial)
  return (
    <div className='hook-demo-surface'>
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        <p className='hook-live-demo__status'>
          API: [value, toggle, set] - value is the boolean, toggle inverts, set sets explicitly.
        </p>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          value: <strong>{String(on)}</strong>
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
          <button type='button' onClick={toggle}>toggle()</button>
          <button type='button' onClick={() => set(true)}>set(true)</button>
          <button type='button' onClick={() => set(false)}>set(false)</button>
        </div>
      </div>
      {on ? (
        <div
          style={{
            border: '1px solid var(--vp-c-divider)',
            borderRadius: '8px',
            padding: '0.75rem',
            background: 'var(--vp-c-bg-soft)',
          }}
        >
          Content visible while value is true.
        </div>
      ) : null}
    </div>
  )
}

export default function ToggleDemo() {
  const rid = useId().replace(/:/g, '')
  const idStart = rid + '-start-true'
  const [startTrue, setStartTrue] = useState(false)
  return (
    <div className='hook-demo-surface'>
      <div className='hook-demo-toolbar'>
        <div className='hook-demo-field'>
          <p className='hook-demo-label'>useToggle(initial)</p>
          <label className='hook-demo-check' htmlFor={idStart}>
            <input
              id={idStart}
              type='checkbox'
              checked={startTrue}
              onChange={(e) => setStartTrue(e.target.checked)}
            />
            <span>Start as true (remounts hook)</span>
          </label>
        </div>
      </div>
      <ToggleCore key={String(startTrue)} initial={startTrue} />
    </div>
  )
}`

export default ToggleDemo
