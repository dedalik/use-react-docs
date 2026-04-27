import React, { useRef, useState } from 'react'
import useParentElement from '@dedalik/use-react/useParentElement'

function ParentElementDemo() {
  const childRef = useRef<HTMLSpanElement | null>(null)
  const parentEl = useParentElement(childRef)
  const [highlight, setHighlight] = useState(false)

  const parentStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 10px',
    borderRadius: 999,
    border: highlight ? '2px solid var(--vp-c-brand-1)' : '1px solid var(--vp-c-divider)',
    background: highlight ? 'var(--vp-c-brand-soft)' : 'var(--vp-c-bg-soft)',
    transition: 'all 120ms ease',
  } satisfies React.CSSProperties

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'The hook returns child.parentElement. Toggle highlight to style the wrapper and inspect parent metadata.',
    ),
    React.createElement(
      'div',
      { style: parentStyle },
      React.createElement('span', { ref: childRef, style: { fontWeight: 600 } }, 'react'),
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: () => setHighlight((value) => !value),
        },
        'Toggle parent highlight',
      ),
    ),
    React.createElement(
      'div',
      { style: { marginTop: 10, display: 'grid', gap: 4 } },
      React.createElement(
        'p',
        { style: { margin: 0 } },
        'parent tagName: ',
        React.createElement('strong', null, parentEl?.tagName.toLowerCase() ?? 'null'),
      ),
      React.createElement(
        'p',
        { style: { margin: 0 } },
        'parent class: ',
        React.createElement('strong', null, parentEl?.className || '(empty)'),
      ),
      React.createElement(
        'p',
        { style: { margin: 0 } },
        'same node instance: ',
        React.createElement('strong', null, parentEl === childRef.current?.parentElement ? 'yes' : 'no'),
      ),
    ),
  )
}

export const sourceJsx = `import { useRef, useState } from 'react'
import useParentElement from '@dedalik/use-react/useParentElement'

export default function ParentElementDemo() {
  const childRef = useRef<HTMLSpanElement | null>(null)
  const parentEl = useParentElement(childRef)
  const [highlight, setHighlight] = useState(false)

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        The hook returns child.parentElement. Toggle highlight to style the wrapper and inspect metadata.
      </p>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 10px',
          borderRadius: 999,
          border: highlight ? '2px solid var(--vp-c-brand-1)' : '1px solid var(--vp-c-divider)',
          background: highlight ? 'var(--vp-c-brand-soft)' : 'var(--vp-c-bg-soft)',
        }}
      >
        <span ref={childRef} style={{ fontWeight: 600 }}>
          react
        </span>
        <button type='button' onClick={() => setHighlight((value) => !value)}>
          Toggle parent highlight
        </button>
      </div>

      <div style={{ marginTop: 10, display: 'grid', gap: 4 }}>
        <p style={{ margin: 0 }}>
          parent tagName: <strong>{parentEl?.tagName.toLowerCase() ?? 'null'}</strong>
        </p>
        <p style={{ margin: 0 }}>
          parent class: <strong>{parentEl?.className || '(empty)'}</strong>
        </p>
        <p style={{ margin: 0 }}>
          same node instance: <strong>{parentEl === childRef.current?.parentElement ? 'yes' : 'no'}</strong>
        </p>
      </div>
    </div>
  )
}`

export default ParentElementDemo
