import React, { useRef } from 'react'
import useCssVar from '@dedalik/use-react/useCssVar'

function CssVarDemo() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [accent, setAccent] = useCssVar('--accent', cardRef)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Change the --accent CSS variable on the element and see text and border colors update instantly.',
    ),
    React.createElement(
      'div',
      {
        ref: cardRef,
        style: {
          ['--accent' as string]: '#6366f1',
          marginTop: 10,
          padding: 14,
          borderRadius: 10,
          border: '2px solid var(--accent)',
          color: 'var(--accent)',
          background: 'var(--vp-c-bg-soft)',
        },
      },
      React.createElement(
        'p',
        { style: { margin: '0 0 10px' } },
        'Current value ',
        React.createElement('code', null, '--accent'),
        `: ${accent || '(empty)'}`,
      ),
      React.createElement(
        'div',
        { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'repeat(4, max-content)' } },
        React.createElement('button', { type: 'button', onClick: () => setAccent('#6366f1') }, 'Indigo'),
        React.createElement('button', { type: 'button', onClick: () => setAccent('#059669') }, 'Green'),
        React.createElement('button', { type: 'button', onClick: () => setAccent('#b45309') }, 'Amber'),
        React.createElement('button', { type: 'button', onClick: () => setAccent('#dc2626') }, 'Red'),
      ),
    ),
  )
}

export const sourceJsx = `import { useRef } from 'react'
import useCssVar from '@dedalik/use-react/useCssVar'

export default function CssVarDemo() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [accent, setAccent] = useCssVar('--accent', cardRef)

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Change the --accent CSS variable on the element and see text and border colors update instantly.
      </p>

      <div
        ref={cardRef}
        style={{
          ['--accent' as string]: '#6366f1',
          marginTop: 10,
          padding: 14,
          borderRadius: 10,
          border: '2px solid var(--accent)',
          color: 'var(--accent)',
          background: 'var(--vp-c-bg-soft)',
        }}
      >
        <p style={{ margin: '0 0 10px' }}>
          Current value <code>--accent</code>: {accent || '(empty)'}
        </p>
        <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(4, max-content)' }}>
          <button type='button' onClick={() => setAccent('#6366f1')}>
            Indigo
          </button>
          <button type='button' onClick={() => setAccent('#059669')}>
            Green
          </button>
          <button type='button' onClick={() => setAccent('#b45309')}>
            Amber
          </button>
          <button type='button' onClick={() => setAccent('#dc2626')}>
            Red
          </button>
        </div>
      </div>
    </div>
  )
}`

export default CssVarDemo
