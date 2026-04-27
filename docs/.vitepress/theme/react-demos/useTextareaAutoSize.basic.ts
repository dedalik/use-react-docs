import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useTextareaAutoSize from '@dedalik/use-react/useTextareaAutoSize'

function TextareaAutoSizeDemo() {
  const [resizeCount, setResizeCount] = useState(0)

  const handleResize = useCallback(() => {
    setResizeCount((count) => count + 1)
  }, [])

  const options = useMemo(
    () => ({
      onResize: handleResize,
    }),
    [handleResize],
  )

  const { textareaRef, input, setInput } = useTextareaAutoSize(options)

  const value = input ?? ''

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Type multiple lines: textarea height grows with content. You can also drag the bottom-right corner to resize manually.',
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar' },
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: () => setInput(value ? `${value}\nNew line` : 'New line'),
        },
        'Append line',
      ),
      React.createElement('button', { type: 'button', onClick: () => setInput('') }, 'Clear'),
    ),
    React.createElement('textarea', {
      ref: textareaRef,
      value,
      onChange: (e) => setInput(e.target.value),
      placeholder: 'Write your note...',
      style: {
        width: '100%',
        minHeight: 120,
        resize: 'vertical',
        overflow: 'hidden',
        boxSizing: 'border-box',
        padding: 10,
        borderRadius: 10,
        border: '1px solid var(--vp-c-divider)',
        backgroundColor: 'var(--vp-c-bg)',
        color: 'var(--vp-c-text-1)',
        caretColor: 'var(--vp-c-text-1)',
        font: 'inherit',
        lineHeight: 1.5,
      },
    }),
    React.createElement('p', { style: { margin: 0 } }, 'Characters: ', React.createElement('strong', null, String(value.length))),
    React.createElement('p', { style: { margin: 0 } }, 'Resize events: ', React.createElement('strong', null, String(resizeCount))),
  )
}

export const sourceJsx = `import { useCallback, useMemo, useState } from 'react'
import useTextareaAutoSize from '@dedalik/use-react/useTextareaAutoSize'

export default function TextareaAutoSizeDemo() {
  const [resizeCount, setResizeCount] = useState(0)

  const handleResize = useCallback(() => {
    setResizeCount((count) => count + 1)
  }, [])

  const options = useMemo(
    () => ({
      onResize: handleResize,
    }),
    [handleResize],
  )

  const { textareaRef, input, setInput } = useTextareaAutoSize(options)

  const value = input ?? ''

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Type multiple lines: textarea height grows with content. You can also drag to resize.
      </p>
      <div className='hook-demo-toolbar'>
        <button type='button' onClick={() => setInput(value ? value + '\\nNew line' : 'New line')}>
          Append line
        </button>
        <button type='button' onClick={() => setInput('')}>
          Clear
        </button>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Write your note...'
        style={{
          width: '100%',
          minHeight: 120,
          resize: 'vertical',
          overflow: 'hidden',
          boxSizing: 'border-box',
          padding: 10,
          borderRadius: 10,
          border: '1px solid var(--vp-c-divider)',
          backgroundColor: 'var(--vp-c-bg)',
          color: 'var(--vp-c-text-1)',
          caretColor: 'var(--vp-c-text-1)',
          font: 'inherit',
          lineHeight: 1.5,
        }}
      />

      <p style={{ margin: 0 }}>
        Characters: <strong>{value.length}</strong>
      </p>
      <p style={{ margin: 0 }}>
        Resize events: <strong>{resizeCount}</strong>
      </p>
    </div>
  )
}`

export default TextareaAutoSizeDemo
