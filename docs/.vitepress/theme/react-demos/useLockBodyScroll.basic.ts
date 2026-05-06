import React, { useState } from 'react'
import useLockBodyScroll from '@dedalik/use-react/useLockBodyScroll'

function LockBodyScrollDemo() {
  const [open, setOpen] = useState(false)
  useLockBodyScroll(open)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'This hook locks page scroll (document.body), not local container scroll.',
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'max-content max-content' } },
      React.createElement('button', { type: 'button', onClick: () => setOpen(true), disabled: open }, 'Open overlay'),
      React.createElement(
        'p',
        { style: { margin: 0, alignSelf: 'center', color: 'var(--vp-c-text-2)' } },
        `Locked: ${open ? 'yes' : 'no'}`,
      ),
    ),
    React.createElement(
      'p',
      { style: { margin: '10px 0 0', color: 'var(--vp-c-text-2)' } },
      'How to test: click "Open overlay", then try to scroll the whole docs page with mouse wheel/trackpad.',
    ),
    React.createElement(
      'p',
      { style: { margin: '6px 0 0', color: 'var(--vp-c-text-2)' } },
      `document.body overflow: ${typeof document !== 'undefined' ? document.body.style.overflow || '(empty)' : '(ssr)'}`,
    ),
    open
      ? React.createElement(
          'div',
          {
            style: {
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 40,
            },
            role: 'dialog',
            'aria-modal': 'true',
          },
          React.createElement(
            'div',
            {
              style: {
                background: 'var(--vp-c-bg)',
                borderRadius: 10,
                padding: 16,
                border: '1px solid var(--vp-c-divider)',
                maxWidth: 360,
              },
            },
            React.createElement(
              'p',
              { style: { margin: '0 0 10px' } },
              'Try scrolling the page now - background scrolling should be locked until you close this overlay.',
            ),
            React.createElement('button', { type: 'button', onClick: () => setOpen(false) }, 'Close overlay'),
          ),
        )
      : null,
  )
}

export const sourceJsx = `import { useState } from 'react'
import useLockBodyScroll from '@dedalik/use-react/useLockBodyScroll'

export default function LockBodyScrollDemo() {
  const [open, setOpen] = useState(false)
  useLockBodyScroll(open)

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>This hook locks page scroll (document.body), not local container scroll.</p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'max-content max-content' }}>
        <button type='button' onClick={() => setOpen(true)} disabled={open}>
          Open overlay
        </button>
        <p style={{ margin: 0, alignSelf: 'center', color: 'var(--vp-c-text-2)' }}>Locked: {open ? 'yes' : 'no'}</p>
      </div>

      <p style={{ margin: '10px 0 0', color: 'var(--vp-c-text-2)' }}>
        How to test: click "Open overlay", then try to scroll the whole docs page with mouse wheel/trackpad.
      </p>
      <p style={{ margin: '6px 0 0', color: 'var(--vp-c-text-2)' }}>
        document.body overflow: {typeof document !== 'undefined' ? document.body.style.overflow || '(empty)' : '(ssr)'}
      </p>

      {open ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 40,
          }}
          role='dialog'
          aria-modal='true'
        >
          <div
            style={{
              background: 'var(--vp-c-bg)',
              borderRadius: 10,
              padding: 16,
              border: '1px solid var(--vp-c-divider)',
              maxWidth: 360,
            }}
          >
            <p style={{ margin: '0 0 10px' }}>
              Try scrolling the page now - background scrolling should be locked until you close this overlay.
            </p>
            <button type='button' onClick={() => setOpen(false)}>
              Close overlay
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}`

export default LockBodyScrollDemo
