import React, { useEffect, useState } from 'react'
import useFileSystemAccess from '@dedalik/use-react/useFileSystemAccess'

function FileSystemAccessDemo() {
  const { isSupported, fileName, content, error, open, saveAs } = useFileSystemAccess()
  const [draft, setDraft] = useState('')

  useEffect(() => {
    if (content !== null) setDraft(content)
  }, [content])

  const onSave = async () => {
    const suggested = (fileName?.replace(/\.[^.]+$/, '') ?? 'notes') + '-copy.txt'
    await saveAs(suggested, draft)
  }

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    !isSupported
      ? React.createElement(
          'p',
          { className: 'hook-demo-hint' },
          'This API is available in Chromium-based browsers with File System Access support.',
        )
      : React.createElement(
          React.Fragment,
          null,
          React.createElement(
            'p',
            { className: 'hook-demo-hint' },
            'Open a text file, edit it, then use Save as to write a new file from the current draft.',
          ),
          error
            ? React.createElement('p', { style: { margin: '0 0 10px', color: 'var(--vp-c-danger-1, #b42318)' } }, error)
            : null,
          React.createElement(
            'div',
            { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'auto auto 1fr' } },
            React.createElement('button', { type: 'button', onClick: () => void open() }, 'Open'),
            React.createElement('button', { type: 'button', onClick: () => void onSave() }, 'Save as'),
            React.createElement(
              'p',
              { style: { margin: 0, alignSelf: 'center', color: 'var(--vp-c-text-2)' } },
              `Active file: ${fileName ?? '-'}`,
            ),
          ),
          React.createElement('textarea', {
            rows: 8,
            style: { width: '100%', marginTop: 10, fontFamily: 'var(--vp-font-family-mono)' },
            value: draft,
            onChange: (event) => setDraft(event.target.value),
            placeholder: 'Open a text file or type notes here, then save.',
          }),
        ),
  )
}

export const sourceJsx = `import { useEffect, useState } from 'react'
import useFileSystemAccess from '@dedalik/use-react/useFileSystemAccess'

export default function FileSystemAccessDemo() {
  const { isSupported, fileName, content, error, open, saveAs } = useFileSystemAccess()
  const [draft, setDraft] = useState('')

  useEffect(() => {
    if (content !== null) setDraft(content)
  }, [content])

  const onSave = async () => {
    const suggested = (fileName?.replace(/\\.[^.]+$/, '') ?? 'notes') + '-copy.txt'
    await saveAs(suggested, draft)
  }

  return (
    <div className='hook-demo-surface'>
      {!isSupported ? (
        <p className='hook-demo-hint'>
          This API is available in Chromium-based browsers with File System Access support.
        </p>
      ) : (
        <>
          <p className='hook-demo-hint'>
            Open a text file, edit it, then use Save as to write a new file from the current draft.
          </p>
          {error ? <p style={{ margin: '0 0 10px', color: 'var(--vp-c-danger-1, #b42318)' }}>{error}</p> : null}

          <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'auto auto 1fr' }}>
            <button type='button' onClick={() => void open()}>
              Open
            </button>
            <button type='button' onClick={() => void onSave()}>
              Save as
            </button>
            <p style={{ margin: 0, alignSelf: 'center', color: 'var(--vp-c-text-2)' }}>Active file: {fileName ?? '-'}</p>
          </div>

          <textarea
            rows={8}
            style={{ width: '100%', marginTop: 10, fontFamily: 'var(--vp-font-family-mono)' }}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder='Open a text file or type notes here, then save.'
          />
        </>
      )}
    </div>
  )
}`

export default FileSystemAccessDemo
