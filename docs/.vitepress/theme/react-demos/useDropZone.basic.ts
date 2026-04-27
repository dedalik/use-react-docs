import React, { useRef, useState } from 'react'
import useDropZone from '@dedalik/use-react/useDropZone'

function DropZoneDemo() {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const [log, setLog] = useState<string[]>([])

  const { isOverDropZone, files } = useDropZone(targetRef, {
    onDrop: (dropped) => {
      const line = `Dropped ${dropped.length} file(s): ${dropped.map((f) => f.name).join(', ') || '(none)'}`
      setLog((prev) => [line, ...prev].slice(0, 5))
    },
  })

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Drag files from your desktop and drop them into the zone. Hover and drop state are reactive.',
    ),
    React.createElement(
      'div',
      {
        ref: targetRef,
        style: {
          border: `2px dashed ${isOverDropZone ? 'var(--vp-c-brand-1)' : 'var(--vp-c-divider)'}`,
          borderRadius: 12,
          padding: 16,
          minHeight: 150,
          background: isOverDropZone ? 'var(--vp-c-brand-soft)' : 'var(--vp-c-bg-soft)',
          transition: 'all 120ms ease',
        },
      },
      React.createElement('p', { style: { marginTop: 0 } }, 'Drop files here'),
      files.length
        ? React.createElement(
            'ul',
            { style: { margin: 0, paddingLeft: 18 } },
            ...files.map((file) =>
              React.createElement(
                'li',
                { key: `${file.name}-${file.size}` },
                React.createElement('strong', null, file.name),
                ` (${file.type || 'unknown type'}) - ${file.size} bytes`,
              ),
            ),
          )
        : React.createElement('p', { style: { margin: 0, color: 'var(--vp-c-text-2)' } }, 'No files dropped yet.'),
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { marginTop: 10, gridTemplateColumns: '1fr auto' } },
      React.createElement(
        'p',
        { style: { margin: 0, alignSelf: 'center' } },
        'isOverDropZone: ',
        React.createElement('strong', null, isOverDropZone ? 'true' : 'false'),
      ),
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: () => setLog([]),
        },
        'Clear log',
      ),
    ),
    log.length
      ? React.createElement(
          'div',
          { style: { marginTop: 8 } },
          React.createElement('p', { style: { margin: '0 0 6px', fontWeight: 600 } }, 'Recent drops'),
          React.createElement(
            'ol',
            { style: { margin: 0, paddingLeft: 18 } },
            ...log.map((line, idx) => React.createElement('li', { key: `${line}-${idx}` }, line)),
          ),
        )
      : null,
  )
}

export const sourceJsx = `import { useRef, useState } from 'react'
import useDropZone from '@dedalik/use-react/useDropZone'

export default function DropZoneDemo() {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const [log, setLog] = useState<string[]>([])

  const { isOverDropZone, files } = useDropZone(targetRef, {
    onDrop: (dropped) => {
      const line = 'Dropped ' + dropped.length + ' file(s): ' + (dropped.map((f) => f.name).join(', ') || '(none)')
      setLog((prev) => [line, ...prev].slice(0, 5))
    },
  })

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Drag files from your desktop and drop them into the zone. Hover and drop state are reactive.
      </p>

      <div
        ref={targetRef}
        style={{
          border: '2px dashed ' + (isOverDropZone ? 'var(--vp-c-brand-1)' : 'var(--vp-c-divider)'),
          borderRadius: 12,
          padding: 16,
          minHeight: 150,
          background: isOverDropZone ? 'var(--vp-c-brand-soft)' : 'var(--vp-c-bg-soft)',
        }}
      >
        <p style={{ marginTop: 0 }}>Drop files here</p>
        {files.length ? (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {files.map((file) => (
              <li key={file.name + '-' + file.size}>
                <strong>{file.name}</strong> ({file.type || 'unknown type'}) - {file.size} bytes
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: 0, color: 'var(--vp-c-text-2)' }}>No files dropped yet.</p>
        )}
      </div>

      <div className='hook-demo-toolbar' style={{ marginTop: 10, gridTemplateColumns: '1fr auto' }}>
        <p style={{ margin: 0, alignSelf: 'center' }}>
          isOverDropZone: <strong>{isOverDropZone ? 'true' : 'false'}</strong>
        </p>
        <button type='button' onClick={() => setLog([])}>
          Clear log
        </button>
      </div>

      {log.length ? (
        <div style={{ marginTop: 8 }}>
          <p style={{ margin: '0 0 6px', fontWeight: 600 }}>Recent drops</p>
          <ol style={{ margin: 0, paddingLeft: 18 }}>
            {log.map((line, idx) => (
              <li key={line + '-' + idx}>{line}</li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  )
}`

export default DropZoneDemo
