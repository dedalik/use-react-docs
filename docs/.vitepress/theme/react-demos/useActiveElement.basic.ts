import React from 'react'
import useActiveElement from '@dedalik/use-react/useActiveElement'

function describeElement(el: Element | null): string {
  if (!el || !(el instanceof HTMLElement)) return 'none'
  const id = el.id ? `#${el.id}` : ''
  const name = 'name' in el && typeof (el as HTMLInputElement).name === 'string' ? (el as HTMLInputElement).name : ''
  return `${el.tagName.toLowerCase()}${id}${name ? `[name=${name}]` : ''}`
}

function ActiveElementDemo() {
  const active = useActiveElement()

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Move focus with mouse, Tab, or programmatic focus to see document.activeElement update in real time.',
    ),
    React.createElement(
      'p',
      { style: { margin: '0 0 10px' } },
      'Active element: ',
      React.createElement('strong', null, describeElement(active)),
    ),
    React.createElement(
      'div',
      { style: { display: 'grid', gap: 8, maxWidth: 460 } },
      React.createElement(
        'label',
        { htmlFor: 'ae-email', style: { display: 'grid', gap: 4 } },
        React.createElement('span', null, 'Email'),
        React.createElement('input', {
          id: 'ae-email',
          name: 'email',
          type: 'email',
          placeholder: 'you@example.com',
        }),
      ),
      React.createElement(
        'label',
        { htmlFor: 'ae-notes', style: { display: 'grid', gap: 4 } },
        React.createElement('span', null, 'Notes'),
        React.createElement('textarea', {
          id: 'ae-notes',
          name: 'notes',
          rows: 3,
          placeholder: 'Type here...',
        }),
      ),
      React.createElement(
        'div',
        { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' } },
        React.createElement(
          'button',
          {
            type: 'button',
            onClick: () => {
              const el = document.getElementById('ae-email') as HTMLInputElement | null
              el?.focus()
            },
          },
          'Focus email',
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            onClick: () => {
              const el = document.getElementById('ae-notes') as HTMLTextAreaElement | null
              el?.focus()
            },
          },
          'Focus notes',
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            onClick: () => {
              const activeEl = document.activeElement as HTMLElement | null
              activeEl?.blur()
            },
          },
          'Blur active',
        ),
      ),
    ),
  )
}

export const sourceJsx = `import useActiveElement from '@dedalik/use-react/useActiveElement'

function describeElement(el: Element | null): string {
  if (!el || !(el instanceof HTMLElement)) return 'none'
  const id = el.id ? '#' + el.id : ''
  const name = 'name' in el && typeof (el as HTMLInputElement).name === 'string' ? (el as HTMLInputElement).name : ''
  return el.tagName.toLowerCase() + id + (name ? '[name=' + name + ']' : '')
}

export default function ActiveElementDemo() {
  const active = useActiveElement()

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Move focus with mouse, Tab, or programmatic focus to see document.activeElement update in real time.
      </p>
      <p style={{ margin: '0 0 10px' }}>
        Active element: <strong>{describeElement(active)}</strong>
      </p>

      <div style={{ display: 'grid', gap: 8, maxWidth: 460 }}>
        <label htmlFor='ae-email' style={{ display: 'grid', gap: 4 }}>
          <span>Email</span>
          <input id='ae-email' name='email' type='email' placeholder='you@example.com' />
        </label>
        <label htmlFor='ae-notes' style={{ display: 'grid', gap: 4 }}>
          <span>Notes</span>
          <textarea id='ae-notes' name='notes' rows={3} placeholder='Type here...' />
        </label>

        <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
          <button
            type='button'
            onClick={() => {
              const el = document.getElementById('ae-email') as HTMLInputElement | null
              el?.focus()
            }}
          >
            Focus email
          </button>
          <button
            type='button'
            onClick={() => {
              const el = document.getElementById('ae-notes') as HTMLTextAreaElement | null
              el?.focus()
            }}
          >
            Focus notes
          </button>
          <button
            type='button'
            onClick={() => {
              const activeEl = document.activeElement as HTMLElement | null
              activeEl?.blur()
            }}
          >
            Blur active
          </button>
        </div>

      </div>
    </div>
  )
}`

export default ActiveElementDemo
