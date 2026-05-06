import React, { useState } from 'react'
import useCopyToClipboard from '@dedalik/use-react/useCopyToClipboard'

function CopyToClipboardDemo() {
  const [draft, setDraft] = useState('Hello from use-react')
  const [copiedText, copy] = useCopyToClipboard()
  const [lastOk, setLastOk] = useState<boolean | null>(null)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Writes text to navigator.clipboard and keeps the last successful copied value in hook state.',
    ),
    React.createElement('textarea', {
      rows: 3,
      style: { width: '100%', marginTop: 6, fontFamily: 'var(--vp-font-family-mono)' },
      value: draft,
      onChange: (event) => setDraft(event.target.value),
    }),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { marginTop: 10, gridTemplateColumns: 'max-content max-content' } },
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: async () => {
            const ok = await copy(draft)
            setLastOk(ok)
          },
        },
        'Copy to clipboard',
      ),
      React.createElement(
        'p',
        { style: { margin: 0, alignSelf: 'center', color: 'var(--vp-c-text-2)' } },
        `Last call: ${lastOk === null ? '-' : lastOk ? 'success' : 'failed'}`,
      ),
    ),
    React.createElement(
      'p',
      { style: { margin: '10px 0 0', color: 'var(--vp-c-text-2)' } },
      `Hook state: ${copiedText || '-'}`,
    ),
  )
}

export const sourceJsx = `import { useState } from 'react'
import useCopyToClipboard from '@dedalik/use-react/useCopyToClipboard'

export default function CopyToClipboardDemo() {
  const [draft, setDraft] = useState('Hello from use-react')
  const [copiedText, copy] = useCopyToClipboard()
  const [lastOk, setLastOk] = useState(null)

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Writes text to navigator.clipboard and keeps the last successful copied value in hook state.
      </p>

      <textarea
        rows={3}
        style={{ width: '100%', marginTop: 6, fontFamily: 'var(--vp-font-family-mono)' }}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />

      <div className='hook-demo-toolbar' style={{ marginTop: 10, gridTemplateColumns: 'max-content max-content' }}>
        <button
          type='button'
          onClick={async () => {
            const ok = await copy(draft)
            setLastOk(ok)
          }}
        >
          Copy to clipboard
        </button>
        <p style={{ margin: 0, alignSelf: 'center', color: 'var(--vp-c-text-2)' }}>
          Last call: {lastOk === null ? '-' : lastOk ? 'success' : 'failed'}
        </p>
      </div>

      <p style={{ margin: '10px 0 0', color: 'var(--vp-c-text-2)' }}>Hook state: {copiedText || '-'}</p>
    </div>
  )
}`

export default CopyToClipboardDemo
