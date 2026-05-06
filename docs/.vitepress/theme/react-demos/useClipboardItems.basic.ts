import React from 'react'
import useClipboardItems from '@dedalik/use-react/useClipboardItems'

function ClipboardItemsDemo() {
  const { isSupported, items, error, read } = useClipboardItems()

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Reads rich clipboard entries via navigator.clipboard.read and lists item MIME types.',
    ),
    !isSupported
      ? React.createElement(
          'p',
          { style: { margin: '10px 0 0', color: 'var(--vp-c-text-2)' } },
          'navigator.clipboard.read is not available in this browser/context.',
        )
      : React.createElement(
          React.Fragment,
          null,
          error
            ? React.createElement('p', { style: { margin: '0 0 10px', color: 'var(--vp-c-danger-1, #b42318)' } }, error)
            : null,
          React.createElement(
            'div',
            { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'max-content 1fr' } },
            React.createElement('button', { type: 'button', onClick: () => void read() }, 'Read clipboard'),
            React.createElement(
              'p',
              { style: { margin: 0, alignSelf: 'center', color: 'var(--vp-c-text-2)' } },
              `Items: ${items.length}`,
            ),
          ),
          items.length === 0
            ? React.createElement(
                'p',
                { style: { margin: '10px 0 0', color: 'var(--vp-c-text-2)' } },
                'No items yet. Copy an image/rich content and then click Read clipboard.',
              )
            : React.createElement(
                'ul',
                { style: { margin: '10px 0 0', paddingInlineStart: 18 } },
                items.map((item, index) =>
                  React.createElement(
                    'li',
                    { key: `${index}-${item.types.join('|')}` },
                    `Item ${index + 1}: ${item.types.join(', ') || '(no types)'}`,
                  ),
                ),
              ),
        ),
  )
}

export const sourceJsx = `import useClipboardItems from '@dedalik/use-react/useClipboardItems'

export default function ClipboardItemsDemo() {
  const { isSupported, items, error, read } = useClipboardItems()

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Reads rich clipboard entries via navigator.clipboard.read and lists item MIME types.
      </p>

      {!isSupported ? (
        <p style={{ margin: '10px 0 0', color: 'var(--vp-c-text-2)' }}>
          navigator.clipboard.read is not available in this browser/context.
        </p>
      ) : (
        <>
          {error ? <p style={{ margin: '0 0 10px', color: 'var(--vp-c-danger-1, #b42318)' }}>{error}</p> : null}

          <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'max-content 1fr' }}>
            <button type='button' onClick={() => void read()}>
              Read clipboard
            </button>
            <p style={{ margin: 0, alignSelf: 'center', color: 'var(--vp-c-text-2)' }}>Items: {items.length}</p>
          </div>

          {items.length === 0 ? (
            <p style={{ margin: '10px 0 0', color: 'var(--vp-c-text-2)' }}>
              No items yet. Copy an image/rich content and then click Read clipboard.
            </p>
          ) : (
            <ul style={{ margin: '10px 0 0', paddingInlineStart: 18 }}>
              {items.map((item, index) => (
                <li key={\`\${index}-\${item.types.join('|')}\`}>Item {index + 1}: {item.types.join(', ') || '(no types)'}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}`

export default ClipboardItemsDemo
