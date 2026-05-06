import React, { useState } from 'react'
import useShare from '@dedalik/use-react/useShare'

type ShareStatus = 'idle' | 'shared' | 'cancelled' | 'unsupported'

function ShareDemo() {
  const { isSupported, share } = useShare()
  const [status, setStatus] = useState<ShareStatus>('idle')

  const pageUrl = typeof window !== 'undefined' ? window.location.href : 'https://example.com'

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Uses the native Web Share sheet when available and reports the result as a simple status.',
    ),
    !isSupported
      ? React.createElement(
          'p',
          { style: { margin: '10px 0 0', color: 'var(--vp-c-text-2)' } },
          'Native share is not available in this browser/context.',
        )
      : React.createElement(
          React.Fragment,
          null,
          React.createElement(
            'div',
            { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'max-content 1fr' } },
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: async () => {
                  const ok = await share({
                    title: 'use-react docs',
                    text: 'Sharing from useShare() demo.',
                    url: pageUrl,
                  })
                  setStatus(ok ? 'shared' : 'cancelled')
                },
              },
              'Share this page',
            ),
            React.createElement(
              'p',
              { style: { margin: 0, alignSelf: 'center', color: 'var(--vp-c-text-2)' } },
              `Last action: ${status}`,
            ),
          ),
        ),
  )
}

export const sourceJsx = `import { useState } from 'react'
import useShare from '@dedalik/use-react/useShare'

export default function ShareDemo() {
  const { isSupported, share } = useShare()
  const [status, setStatus] = useState('idle')
  const pageUrl = typeof window !== 'undefined' ? window.location.href : 'https://example.com'

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Uses the native Web Share sheet when available and reports the result as a simple status.
      </p>

      {!isSupported ? (
        <p style={{ margin: '10px 0 0', color: 'var(--vp-c-text-2)' }}>Native share is not available in this browser/context.</p>
      ) : (
        <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'max-content 1fr' }}>
          <button
            type='button'
            onClick={async () => {
              const ok = await share({
                title: 'use-react docs',
                text: 'Sharing from useShare() demo.',
                url: pageUrl,
              })
              setStatus(ok ? 'shared' : 'cancelled')
            }}
          >
            Share this page
          </button>
          <p style={{ margin: 0, alignSelf: 'center', color: 'var(--vp-c-text-2)' }}>Last action: {status}</p>
        </div>
      )}
    </div>
  )
}`

export default ShareDemo
