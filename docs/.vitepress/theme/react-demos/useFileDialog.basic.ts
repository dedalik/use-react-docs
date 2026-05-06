import React from 'react'
import useFileDialog from '@dedalik/use-react/useFileDialog'

function FileDialogDemo() {
  const { files, open, reset } = useFileDialog({
    accept: 'image/png,image/jpeg,image/webp',
    multiple: true,
  })

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Open the native file chooser, pick one or more images, and inspect selected file metadata.',
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'auto auto 1fr' } },
      React.createElement('button', { type: 'button', onClick: open }, 'Choose files'),
      React.createElement('button', { type: 'button', onClick: reset }, 'Clear'),
      React.createElement(
        'p',
        { style: { margin: 0, alignSelf: 'center', color: 'var(--vp-c-text-2)' } },
        `Selected: ${files.length}`,
      ),
    ),
    files.length === 0
      ? React.createElement('p', { style: { marginTop: 10, color: 'var(--vp-c-text-2)' } }, 'No files selected.')
      : React.createElement(
          'ul',
          { style: { marginTop: 10, paddingLeft: 18 } },
          ...files.map((file) =>
            React.createElement(
              'li',
              { key: `${file.name}-${file.size}` },
              React.createElement('strong', null, file.name),
              ` - ${(file.size / 1024).toFixed(1)} KB`,
            ),
          ),
        ),
  )
}

export const sourceJsx = `import useFileDialog from '@dedalik/use-react/useFileDialog'

export default function FileDialogDemo() {
  const { files, open, reset } = useFileDialog({
    accept: 'image/png,image/jpeg,image/webp',
    multiple: true,
  })

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Open the native file chooser, pick one or more images, and inspect selected file metadata.
      </p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'auto auto 1fr' }}>
        <button type='button' onClick={open}>
          Choose files
        </button>
        <button type='button' onClick={reset}>
          Clear
        </button>
        <p style={{ margin: 0, alignSelf: 'center', color: 'var(--vp-c-text-2)' }}>{'Selected: ' + files.length}</p>
      </div>

      {files.length === 0 ? (
        <p style={{ marginTop: 10, color: 'var(--vp-c-text-2)' }}>No files selected.</p>
      ) : (
        <ul style={{ marginTop: 10, paddingLeft: 18 }}>
          {files.map((file) => (
            <li key={file.name + '-' + file.size}>
              <strong>{file.name}</strong> - {(file.size / 1024).toFixed(1)} KB
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}`

export default FileDialogDemo
