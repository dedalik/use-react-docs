import React from 'react'
import useSSRWidth from '@dedalik/use-react/useSSRWidth'

function SSRWidthDemo() {
  const width = useSSRWidth(375)
  const isWide = width >= 768

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Provides an SSR fallback width and first client width snapshot for layout decisions.',
    ),
    React.createElement('p', { style: { margin: '10px 0 6px' } }, `Resolved width: ${width}px`),
    React.createElement(
      'p',
      { style: { margin: 0, color: 'var(--vp-c-text-2)' } },
      `Layout hint: ${isWide ? 'two-column' : 'single-column'} (threshold 768px)`,
    ),
  )
}

export const sourceJsx = `import useSSRWidth from '@dedalik/use-react/useSSRWidth'

export default function SSRWidthDemo() {
  const width = useSSRWidth(375)
  const isWide = width >= 768

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Provides an SSR fallback width and first client width snapshot for layout decisions.
      </p>

      <p style={{ margin: '10px 0 6px' }}>{'Resolved width: ' + width + 'px'}</p>
      <p style={{ margin: 0, color: 'var(--vp-c-text-2)' }}>
        {'Layout hint: ' + (isWide ? 'two-column' : 'single-column') + ' (threshold 768px)'}
      </p>
    </div>
  )
}`

export default SSRWidthDemo
