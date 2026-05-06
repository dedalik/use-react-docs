import React from 'react'
import useWindowSize from '@dedalik/use-react/useWindowSize'

function WindowSizeDemo() {
  const { width, height } = useWindowSize()
  const orientation = width >= height ? 'landscape-ish' : 'portrait-ish'
  const aspect = height === 0 ? 0 : width / height

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Tracks window.innerWidth and window.innerHeight in real time as the viewport changes.',
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'repeat(3, max-content)' } },
      React.createElement('p', { style: { margin: 0 } }, `Width: ${width}px`),
      React.createElement('p', { style: { margin: 0 } }, `Height: ${height}px`),
      React.createElement('p', { style: { margin: 0 } }, `Aspect: ${aspect.toFixed(2)}`),
    ),
    React.createElement(
      'p',
      { style: { margin: '10px 0 0', color: 'var(--vp-c-text-2)' } },
      `Orientation hint: ${orientation}`,
    ),
  )
}

export const sourceJsx = `import useWindowSize from '@dedalik/use-react/useWindowSize'

export default function WindowSizeDemo() {
  const { width, height } = useWindowSize()
  const orientation = width >= height ? 'landscape-ish' : 'portrait-ish'
  const aspect = height === 0 ? 0 : width / height

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>Tracks window.innerWidth and window.innerHeight in real time as the viewport changes.</p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(3, max-content)' }}>
        <p style={{ margin: 0 }}>Width: {width}px</p>
        <p style={{ margin: 0 }}>Height: {height}px</p>
        <p style={{ margin: 0 }}>Aspect: {aspect.toFixed(2)}</p>
      </div>

      <p style={{ margin: '10px 0 0', color: 'var(--vp-c-text-2)' }}>Orientation hint: {orientation}</p>
    </div>
  )
}`

export default WindowSizeDemo
