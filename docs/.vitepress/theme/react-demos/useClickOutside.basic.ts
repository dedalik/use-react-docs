import React, { useRef, useState } from 'react'
import useClickOutside from '@dedalik/use-react/useClickOutside'

function ClickOutsideDemo() {
  const [open, setOpen] = useState(false)
  const [outsideCount, setOutsideCount] = useState(0)
  const [lastEvent, setLastEvent] = useState<'mousedown' | 'touchstart' | '-'>('-')
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useClickOutside([toggleRef, panelRef], (event) => {
    setOpen(false)
    setOutsideCount((count) => count + 1)
    setLastEvent(event.type === 'touchstart' ? 'touchstart' : 'mousedown')
  })

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Open the panel, then click anywhere outside the button/panel area to trigger the outside handler.',
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar' },
      React.createElement(
        'button',
        {
          ref: toggleRef,
          type: 'button',
          onClick: () => setOpen((value) => !value),
        },
        open ? 'Close panel' : 'Open panel',
      ),
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: () => {
            setOutsideCount(0)
            setLastEvent('-')
          },
        },
        'Reset stats',
      ),
    ),
    open
      ? React.createElement(
          'div',
          {
            ref: panelRef,
            style: {
              marginTop: 8,
              padding: 12,
              border: '1px solid var(--vp-c-divider)',
              borderRadius: 10,
              background: 'var(--vp-c-bg-soft)',
            },
          },
          React.createElement('p', { style: { margin: 0 } }, 'Panel is open. Click outside to close it.'),
          React.createElement(
            'p',
            { style: { margin: '8px 0 0' } },
            'Both refs (button + panel) are treated as inside zone.',
          ),
        )
      : React.createElement(
          'div',
          {
            style: {
              marginTop: 8,
              padding: 12,
              border: '1px dashed var(--vp-c-divider)',
              borderRadius: 10,
              color: 'var(--vp-c-text-2)',
            },
          },
          'Panel is closed.',
        ),
    React.createElement('p', { style: { margin: '10px 0 0' } }, 'Outside triggers: ', React.createElement('strong', null, String(outsideCount))),
    React.createElement('p', { style: { margin: 0 } }, 'Last event: ', React.createElement('strong', null, lastEvent)),
  )
}

export const sourceJsx = `import { useRef, useState } from 'react'
import useClickOutside from '@dedalik/use-react/useClickOutside'

export default function ClickOutsideDemo() {
  const [open, setOpen] = useState(false)
  const [outsideCount, setOutsideCount] = useState(0)
  const [lastEvent, setLastEvent] = useState<'mousedown' | 'touchstart' | '-'>('-')
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useClickOutside([toggleRef, panelRef], (event) => {
    setOpen(false)
    setOutsideCount((count) => count + 1)
    setLastEvent(event.type === 'touchstart' ? 'touchstart' : 'mousedown')
  })

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>Open the panel, then click anywhere outside to trigger the handler.</p>

      <div className='hook-demo-toolbar'>
        <button ref={toggleRef} type='button' onClick={() => setOpen((value) => !value)}>
          {open ? 'Close panel' : 'Open panel'}
        </button>
        <button
          type='button'
          onClick={() => {
            setOutsideCount(0)
            setLastEvent('-')
          }}
        >
          Reset stats
        </button>
      </div>

      {open ? (
        <div
          ref={panelRef}
          style={{
            marginTop: 8,
            padding: 12,
            border: '1px solid var(--vp-c-divider)',
            borderRadius: 10,
            background: 'var(--vp-c-bg-soft)',
          }}
        >
          <p style={{ margin: 0 }}>Panel is open. Click outside to close it.</p>
          <p style={{ margin: '8px 0 0' }}>Both refs (button + panel) are treated as inside zone.</p>
        </div>
      ) : (
        <div
          style={{
            marginTop: 8,
            padding: 12,
            border: '1px dashed var(--vp-c-divider)',
            borderRadius: 10,
            color: 'var(--vp-c-text-2)',
          }}
        >
          Panel is closed.
        </div>
      )}

      <p style={{ margin: '10px 0 0' }}>
        Outside triggers: <strong>{outsideCount}</strong>
      </p>
      <p style={{ margin: 0 }}>
        Last event: <strong>{lastEvent}</strong>
      </p>
    </div>
  )
}`

export default ClickOutsideDemo
