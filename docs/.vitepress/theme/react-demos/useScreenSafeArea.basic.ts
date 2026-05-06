import React from 'react'
import useScreenSafeArea from '@dedalik/use-react/useScreenSafeArea'

function ScreenSafeAreaDemo() {
  const { top, right, bottom, left } = useScreenSafeArea()

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Reads safe-area insets from root computed styles and updates on resize/orientation changes.',
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'repeat(4, max-content)' } },
      React.createElement('p', { style: { margin: 0 } }, `Top: ${top}px`),
      React.createElement('p', { style: { margin: 0 } }, `Right: ${right}px`),
      React.createElement('p', { style: { margin: 0 } }, `Bottom: ${bottom}px`),
      React.createElement('p', { style: { margin: 0 } }, `Left: ${left}px`),
    ),
    React.createElement(
      'div',
      {
        style: {
          marginTop: 10,
          borderRadius: 10,
          background: 'var(--vp-c-bg-soft)',
          border: '1px solid var(--vp-c-divider)',
          paddingTop: `calc(8px + ${top}px)`,
          paddingRight: `calc(10px + ${right}px)`,
          paddingBottom: `calc(8px + ${bottom}px)`,
          paddingLeft: `calc(10px + ${left}px)`,
          color: 'var(--vp-c-text-2)',
        },
      },
      'Preview panel applies current safe-area values as extra padding.',
    ),
  )
}

export const sourceJsx = `import useScreenSafeArea from '@dedalik/use-react/useScreenSafeArea'

export default function ScreenSafeAreaDemo() {
  const { top, right, bottom, left } = useScreenSafeArea()

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Reads safe-area insets from root computed styles and updates on resize/orientation changes.
      </p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(4, max-content)' }}>
        <p style={{ margin: 0 }}>Top: {top}px</p>
        <p style={{ margin: 0 }}>Right: {right}px</p>
        <p style={{ margin: 0 }}>Bottom: {bottom}px</p>
        <p style={{ margin: 0 }}>Left: {left}px</p>
      </div>

      <div
        style={{
          marginTop: 10,
          borderRadius: 10,
          background: 'var(--vp-c-bg-soft)',
          border: '1px solid var(--vp-c-divider)',
          paddingTop: \`calc(8px + \${top}px)\`,
          paddingRight: \`calc(10px + \${right}px)\`,
          paddingBottom: \`calc(8px + \${bottom}px)\`,
          paddingLeft: \`calc(10px + \${left}px)\`,
          color: 'var(--vp-c-text-2)',
        }}
      >
        Preview panel applies current safe-area values as extra padding.
      </div>
    </div>
  )
}`

export default ScreenSafeAreaDemo
