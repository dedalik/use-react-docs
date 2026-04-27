import React, { useRef } from 'react'
import useDraggable from '@dedalik/use-react/useDraggable'

function DraggableDemo() {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const handleRef = useRef<HTMLDivElement | null>(null)

  const { position, isDragging, style } = useDraggable(cardRef, {
    handle: handleRef,
    containerElement: panelRef,
    initialValue: { x: 12, y: 12 },
    preventDefault: true,
  })

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Drag the card by its header. Movement is clamped inside the dashed container.',
    ),
    React.createElement(
      'p',
      { style: { margin: '0 0 8px' } },
      'Position: ',
      React.createElement('strong', null, `${Math.round(position.x)} x, ${Math.round(position.y)} y`),
      ' - ',
      isDragging ? 'dragging' : 'idle',
    ),
    React.createElement(
      'div',
      {
        ref: panelRef,
        style: {
          position: 'relative',
          height: 220,
          border: '1px dashed var(--vp-c-divider)',
          borderRadius: 12,
          background: 'var(--vp-c-bg-soft)',
          overflow: 'hidden',
        },
      },
      React.createElement(
        'div',
        {
          ref: cardRef,
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: 220,
            borderRadius: 12,
            border: '1px solid var(--vp-c-divider)',
            background: 'var(--vp-c-bg)',
            boxShadow: 'var(--vp-shadow-2)',
            ...style,
          },
        },
        React.createElement(
          'div',
          {
            ref: handleRef,
            style: {
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              padding: '10px 12px',
              borderBottom: '1px solid var(--vp-c-divider)',
              fontWeight: 600,
            },
          },
          'Drag handle',
        ),
        React.createElement(
          'div',
          { style: { padding: 12, lineHeight: 1.4, color: 'var(--vp-c-text-2)' } },
          'Pointer events are attached to the handle, while translation is applied to the whole card.',
        ),
      ),
    ),
  )
}

export const sourceJsx = `import { useRef } from 'react'
import useDraggable from '@dedalik/use-react/useDraggable'

export default function DraggableDemo() {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const handleRef = useRef<HTMLDivElement | null>(null)

  const { position, isDragging, style } = useDraggable(cardRef, {
    handle: handleRef,
    containerElement: panelRef,
    initialValue: { x: 12, y: 12 },
    preventDefault: true,
  })

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>Drag the card by its header. Movement is clamped inside the container.</p>
      <p style={{ margin: '0 0 8px' }}>
        Position: <strong>{Math.round(position.x)} x, {Math.round(position.y)} y</strong> -{' '}
        {isDragging ? 'dragging' : 'idle'}
      </p>

      <div
        ref={panelRef}
        style={{
          position: 'relative',
          height: 220,
          border: '1px dashed var(--vp-c-divider)',
          borderRadius: 12,
          background: 'var(--vp-c-bg-soft)',
          overflow: 'hidden',
        }}
      >
        <div
          ref={cardRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 220,
            borderRadius: 12,
            border: '1px solid var(--vp-c-divider)',
            background: 'var(--vp-c-bg)',
            boxShadow: 'var(--vp-shadow-2)',
            ...style,
          }}
        >
          <div
            ref={handleRef}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              padding: '10px 12px',
              borderBottom: '1px solid var(--vp-c-divider)',
              fontWeight: 600,
            }}
          >
            Drag handle
          </div>
          <div style={{ padding: 12, lineHeight: 1.4, color: 'var(--vp-c-text-2)' }}>
            Pointer events are attached to the handle, while translation is applied to the whole card.
          </div>
        </div>
      </div>
    </div>
  )
}`

export default DraggableDemo
