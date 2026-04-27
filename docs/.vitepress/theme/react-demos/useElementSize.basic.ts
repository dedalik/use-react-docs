import React, { useRef, useState } from 'react'
import useElementSize from '@dedalik/use-react/useElementSize'

function ElementSizeDemo() {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const { width, height } = useElementSize(panelRef)
  const [padding, setPadding] = useState(16)
  const [baseWidth, setBaseWidth] = useState(320)
  const [baseHeight, setBaseHeight] = useState(180)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'ResizeObserver tracks the element box while width/height and padding controls change layout.',
    ),
    React.createElement(
      'p',
      { style: { margin: '0 0 8px' } },
      'Measured: ',
      React.createElement('strong', null, `${Math.round(width)} x ${Math.round(height)} px`),
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' } },
      React.createElement(
        'label',
        { className: 'hook-demo-field' },
        React.createElement('p', { className: 'hook-demo-label' }, `Width (${baseWidth}px)`),
        React.createElement('input', {
          type: 'range',
          min: 220,
          max: 520,
          step: 10,
          value: baseWidth,
          onChange: (event) => setBaseWidth(Number(event.target.value)),
        }),
      ),
      React.createElement(
        'label',
        { className: 'hook-demo-field' },
        React.createElement('p', { className: 'hook-demo-label' }, `Height (${baseHeight}px)`),
        React.createElement('input', {
          type: 'range',
          min: 120,
          max: 320,
          step: 10,
          value: baseHeight,
          onChange: (event) => setBaseHeight(Number(event.target.value)),
        }),
      ),
      React.createElement(
        'label',
        { className: 'hook-demo-field' },
        React.createElement('p', { className: 'hook-demo-label' }, `Padding (${padding}px)`),
        React.createElement('input', {
          type: 'range',
          min: 8,
          max: 40,
          step: 1,
          value: padding,
          onChange: (event) => setPadding(Number(event.target.value)),
        }),
      ),
    ),
    React.createElement(
      'div',
      {
        ref: panelRef,
        style: {
          marginTop: 10,
          width: baseWidth,
          height: baseHeight,
          padding,
          border: '1px solid var(--vp-c-divider)',
          borderRadius: 12,
          background: 'var(--vp-c-bg-soft)',
          boxSizing: 'border-box',
          lineHeight: 1.4,
          color: 'var(--vp-c-text-2)',
          transition: 'width 120ms ease, height 120ms ease, padding 120ms ease',
        },
      },
      'Target element observed by useElementSize.',
    ),
  )
}

export const sourceJsx = `import { useRef, useState } from 'react'
import useElementSize from '@dedalik/use-react/useElementSize'

export default function ElementSizeDemo() {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const { width, height } = useElementSize(panelRef)
  const [padding, setPadding] = useState(16)
  const [baseWidth, setBaseWidth] = useState(320)
  const [baseHeight, setBaseHeight] = useState(180)

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        ResizeObserver tracks the element box while width/height and padding controls change layout.
      </p>
      <p style={{ margin: '0 0 8px' }}>
        Measured: <strong>{Math.round(width)} x {Math.round(height)} px</strong>
      </p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        <label className='hook-demo-field'>
          <p className='hook-demo-label'>{'Width (' + baseWidth + 'px)'}</p>
          <input
            type='range'
            min={220}
            max={520}
            step={10}
            value={baseWidth}
            onChange={(event) => setBaseWidth(Number(event.target.value))}
          />
        </label>
        <label className='hook-demo-field'>
          <p className='hook-demo-label'>{'Height (' + baseHeight + 'px)'}</p>
          <input
            type='range'
            min={120}
            max={320}
            step={10}
            value={baseHeight}
            onChange={(event) => setBaseHeight(Number(event.target.value))}
          />
        </label>
        <label className='hook-demo-field'>
          <p className='hook-demo-label'>{'Padding (' + padding + 'px)'}</p>
          <input
            type='range'
            min={8}
            max={40}
            step={1}
            value={padding}
            onChange={(event) => setPadding(Number(event.target.value))}
          />
        </label>
      </div>

      <div
        ref={panelRef}
        style={{
          marginTop: 10,
          width: baseWidth,
          height: baseHeight,
          padding,
          border: '1px solid var(--vp-c-divider)',
          borderRadius: 12,
          background: 'var(--vp-c-bg-soft)',
          boxSizing: 'border-box',
          lineHeight: 1.4,
          color: 'var(--vp-c-text-2)',
          transition: 'width 120ms ease, height 120ms ease, padding 120ms ease',
        }}
      >
        Target element observed by useElementSize.
      </div>
    </div>
  )
}`

export default ElementSizeDemo
