import React, { useRef } from 'react'
import useFullscreen from '@dedalik/use-react/useFullscreen'

function FullscreenDemo() {
  const panelRef = useRef<HTMLDivElement>(null)
  const { isSupported, isFullscreen, enter } = useFullscreen(panelRef)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    !isSupported
      ? React.createElement(
          'p',
          { className: 'hook-demo-hint' },
          'Fullscreen API is not available in this environment.',
        )
      : React.createElement(
          React.Fragment,
          null,
          React.createElement(
            'p',
            { className: 'hook-demo-hint' },
            'Target only this card - use Enter, or press Escape to leave fullscreen.',
          ),
          React.createElement(
            'div',
            {
              ref: panelRef,
              style: {
                padding: 14,
                border: '1px solid var(--vp-c-divider, #d0d7de)',
                borderRadius: 10,
                background: isFullscreen ? 'var(--vp-c-bg-soft, #111827)' : 'var(--vp-c-bg-alt, #f8fafc)',
                color: 'var(--vp-c-text-1)',
              },
            },
            React.createElement(
              'p',
              { style: { margin: 0, fontWeight: 600 } },
              isFullscreen ? 'Mode: fullscreen' : 'Mode: inline',
            ),
            React.createElement(
              'p',
              { style: { margin: '8px 0 0', color: 'var(--vp-c-text-2)' } },
              'This element is passed as hook target.',
            ),
          ),
          React.createElement(
            'div',
            { className: 'hook-demo-toolbar', style: { marginTop: 10, gridTemplateColumns: 'max-content' } },
            React.createElement('button', { type: 'button', onClick: () => void enter() }, 'Enter'),
          ),
        ),
  )
}

export const sourceJsx = `import { useRef } from 'react'
import useFullscreen from '@dedalik/use-react/useFullscreen'

export default function FullscreenDemo() {
  const panelRef = useRef<HTMLDivElement>(null)
  const { isSupported, isFullscreen, enter } = useFullscreen(panelRef)

  if (!isSupported) {
    return <p className='hook-demo-hint'>Fullscreen API is not available in this environment.</p>
  }

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Target only this card - use Enter, or press Escape to leave fullscreen.
      </p>

      <div
        ref={panelRef}
        style={{
          padding: 14,
          border: '1px solid var(--vp-c-divider, #d0d7de)',
          borderRadius: 10,
          background: isFullscreen ? 'var(--vp-c-bg-soft, #111827)' : 'var(--vp-c-bg-alt, #f8fafc)',
          color: 'var(--vp-c-text-1)',
        }}
      >
        <p style={{ margin: 0, fontWeight: 600 }}>{isFullscreen ? 'Mode: fullscreen' : 'Mode: inline'}</p>
        <p style={{ margin: '8px 0 0', color: 'var(--vp-c-text-2)' }}>This element is passed as hook target.</p>
      </div>

      <div className='hook-demo-toolbar' style={{ marginTop: 10, gridTemplateColumns: 'max-content' }}>
        <button type='button' onClick={() => void enter()}>
          Enter
        </button>
      </div>
    </div>
  )
}`

export default FullscreenDemo
