import React from 'react'
import useMemory from '@dedalik/use-react/useMemory'

function formatMb(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function MemoryDemo() {
  const { isSupported, memory } = useMemory(500)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Reads performance.memory every 500ms (Chromium only) and shows used/total/limit heap values.',
    ),
    !isSupported
      ? React.createElement(
          'p',
          { style: { marginTop: 10, color: 'var(--vp-c-text-2)' } },
          'performance.memory is not exposed in this browser.',
        )
      : !memory
        ? React.createElement(
            'p',
            { style: { marginTop: 10, color: 'var(--vp-c-text-2)' } },
            'Waiting for first sample...',
          )
        : React.createElement(
            'div',
            { style: { display: 'grid', gap: 8, marginTop: 10 } },
            React.createElement(
              'p',
              { style: { margin: 0 } },
              React.createElement('strong', null, 'Used JS heap:'),
              ` ${formatMb(memory.usedJSHeapSize)}`,
            ),
            React.createElement(
              'p',
              { style: { margin: 0 } },
              React.createElement('strong', null, 'Total JS heap:'),
              ` ${formatMb(memory.totalJSHeapSize)}`,
            ),
            React.createElement(
              'p',
              { style: { margin: 0 } },
              React.createElement('strong', null, 'Heap size limit:'),
              ` ${formatMb(memory.jsHeapSizeLimit)}`,
            ),
          ),
  )
}

export const sourceJsx = `import useMemory from '@dedalik/use-react/useMemory'

function formatMb(bytes: number) {
  return \`\${(bytes / (1024 * 1024)).toFixed(2)} MB\`
}

export default function MemoryDemo() {
  const { isSupported, memory } = useMemory(500)

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Reads performance.memory every 500ms (Chromium only) and shows used/total/limit heap values.
      </p>

      {!isSupported ? (
        <p style={{ marginTop: 10, color: 'var(--vp-c-text-2)' }}>performance.memory is not exposed in this browser.</p>
      ) : !memory ? (
        <p style={{ marginTop: 10, color: 'var(--vp-c-text-2)' }}>Waiting for first sample...</p>
      ) : (
        <div style={{ display: 'grid', gap: 8, marginTop: 10 }}>
          <p style={{ margin: 0 }}>
            <strong>Used JS heap:</strong> {formatMb(memory.usedJSHeapSize)}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Total JS heap:</strong> {formatMb(memory.totalJSHeapSize)}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Heap size limit:</strong> {formatMb(memory.jsHeapSizeLimit)}
          </p>
        </div>
      )}
    </div>
  )
}`

export default MemoryDemo
