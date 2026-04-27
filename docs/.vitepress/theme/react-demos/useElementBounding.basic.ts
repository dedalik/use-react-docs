import React, { useRef, useState } from 'react'
import useElementBounding from '@dedalik/use-react/useElementBounding'

function ElementBoundingDemo() {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const rect = useElementBounding(cardRef)
  const [padding, setPadding] = useState(16)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Scroll inside the panel and tweak padding: DOMRect values update in viewport coordinates.',
    ),
    React.createElement(
      'p',
      { style: { margin: '0 0 6px' } },
      'x/y: ',
      React.createElement('strong', null, `${Math.round(rect.x)}, ${Math.round(rect.y)}`),
      ' - size: ',
      React.createElement('strong', null, `${Math.round(rect.width)} x ${Math.round(rect.height)} px`),
    ),
    React.createElement(
      'p',
      { style: { margin: '0 0 8px' } },
      'LTRB: ',
      React.createElement(
        'strong',
        null,
        `${Math.round(rect.left)} / ${Math.round(rect.top)} / ${Math.round(rect.right)} / ${Math.round(rect.bottom)}`,
      ),
    ),
    React.createElement(
      'label',
      { className: 'hook-demo-field', style: { maxWidth: 360 } },
      React.createElement('p', { className: 'hook-demo-label' }, `Card padding (${padding}px)`),
      React.createElement('input', {
        type: 'range',
        min: 8,
        max: 40,
        step: 1,
        value: padding,
        onChange: (event) => setPadding(Number(event.target.value)),
      }),
    ),
    React.createElement(
      'div',
      {
        ref: scrollRef,
        style: {
          marginTop: 10,
          height: 220,
          overflow: 'auto',
          border: '1px solid var(--vp-c-divider)',
          borderRadius: 12,
          background: 'var(--vp-c-bg-soft)',
        },
      },
      React.createElement(
        'div',
        { style: { height: 700, padding: 16, boxSizing: 'border-box' } },
        React.createElement('div', { style: { height: 130, color: 'var(--vp-c-text-2)' } }, 'Scroll down inside this panel.'),
        React.createElement(
          'div',
          {
            ref: cardRef,
            style: {
              width: 280,
              padding,
              borderRadius: 12,
              border: '1px solid var(--vp-c-divider)',
              background: 'var(--vp-c-bg)',
              boxShadow: 'var(--vp-shadow-1)',
              lineHeight: 1.4,
            },
          },
          'Target card observed by useElementBounding.',
        ),
      ),
    ),
  )
}

export const sourceJsx = `import { useRef, useState } from 'react'
import useElementBounding from '@dedalik/use-react/useElementBounding'

export default function ElementBoundingDemo() {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const rect = useElementBounding(cardRef)
  const [padding, setPadding] = useState(16)

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Scroll inside the panel and tweak padding: DOMRect values update in viewport coordinates.
      </p>
      <p style={{ margin: '0 0 6px' }}>
        x/y: <strong>{Math.round(rect.x)}, {Math.round(rect.y)}</strong> - size:{' '}
        <strong>{Math.round(rect.width)} x {Math.round(rect.height)} px</strong>
      </p>
      <p style={{ margin: '0 0 8px' }}>
        LTRB:{' '}
        <strong>
          {Math.round(rect.left)} / {Math.round(rect.top)} / {Math.round(rect.right)} / {Math.round(rect.bottom)}
        </strong>
      </p>

      <label className='hook-demo-field' style={{ maxWidth: 360 }}>
        <p className='hook-demo-label'>{'Card padding (' + padding + 'px)'}</p>
        <input
          type='range'
          min={8}
          max={40}
          step={1}
          value={padding}
          onChange={(event) => setPadding(Number(event.target.value))}
        />
      </label>

      <div
        ref={scrollRef}
        style={{
          marginTop: 10,
          height: 220,
          overflow: 'auto',
          border: '1px solid var(--vp-c-divider)',
          borderRadius: 12,
          background: 'var(--vp-c-bg-soft)',
        }}
      >
        <div style={{ height: 700, padding: 16, boxSizing: 'border-box' }}>
          <div style={{ height: 130, color: 'var(--vp-c-text-2)' }}>Scroll down inside this panel.</div>
          <div
            ref={cardRef}
            style={{
              width: 280,
              padding,
              borderRadius: 12,
              border: '1px solid var(--vp-c-divider)',
              background: 'var(--vp-c-bg)',
              boxShadow: 'var(--vp-shadow-1)',
              lineHeight: 1.4,
            }}
          >
            Target card observed by useElementBounding.
          </div>
        </div>
      </div>
    </div>
  )
}`

export default ElementBoundingDemo
