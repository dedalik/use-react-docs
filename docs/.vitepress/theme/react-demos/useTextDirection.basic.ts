import React from 'react'
import useTextDirection from '@dedalik/use-react/useTextDirection'

function TextDirectionDemo() {
  const direction = useTextDirection()

  return React.createElement(
    'div',
    { className: 'hook-demo-surface', dir: direction },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Observes document dir attribute and updates between LTR and RTL in real time.',
    ),
    React.createElement('p', { style: { margin: '10px 0 8px' } }, `Current direction: ${direction.toUpperCase()}`),
    React.createElement(
      'p',
      {
        style: {
          margin: '0 0 10px',
          textAlign: direction === 'rtl' ? 'end' : 'start',
          color: 'var(--vp-c-text-2)',
        },
      },
      'Sample text aligns to the logical start edge.',
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'repeat(2, max-content)' } },
      React.createElement(
        'button',
        { type: 'button', onClick: () => (document.documentElement.dir = 'ltr') },
        'Set LTR',
      ),
      React.createElement(
        'button',
        { type: 'button', onClick: () => (document.documentElement.dir = 'rtl') },
        'Set RTL',
      ),
    ),
  )
}

export const sourceJsx = `import useTextDirection from '@dedalik/use-react/useTextDirection'

export default function TextDirectionDemo() {
  const direction = useTextDirection()

  return (
    <div className='hook-demo-surface' dir={direction}>
      <p className='hook-demo-hint'>Observes document dir attribute and updates between LTR and RTL in real time.</p>

      <p style={{ margin: '10px 0 8px' }}>{'Current direction: ' + direction.toUpperCase()}</p>
      <p
        style={{
          margin: '0 0 10px',
          textAlign: direction === 'rtl' ? 'end' : 'start',
          color: 'var(--vp-c-text-2)',
        }}
      >
        Sample text aligns to the logical start edge.
      </p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(2, max-content)' }}>
        <button type='button' onClick={() => (document.documentElement.dir = 'ltr')}>
          Set LTR
        </button>
        <button type='button' onClick={() => (document.documentElement.dir = 'rtl')}>
          Set RTL
        </button>
      </div>
    </div>
  )
}`

export default TextDirectionDemo
