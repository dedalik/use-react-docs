import React from 'react'
import useBreakpoints from '@dedalik/use-react/useBreakpoints'

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

function BreakpointsDemo() {
  const { width, current, active, greaterOrEqual, flags } = useBreakpoints(BREAKPOINTS)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Resize the window to see the current breakpoint, active list, and flags for each threshold.',
    ),
    React.createElement('p', { style: { margin: '10px 0 6px' } }, `Width: ${width}px - current: ${current ?? '-'}`),
    React.createElement(
      'p',
      { style: { margin: '0 0 6px', color: 'var(--vp-c-text-2)' } },
      `Active: ${active.length ? active.join(' -> ') : 'none'}`,
    ),
    React.createElement(
      'p',
      { style: { margin: '0 0 10px', color: 'var(--vp-c-text-2)' } },
      `greaterOrEqual("md"): ${greaterOrEqual('md') ? 'true' : 'false'}`,
    ),
    React.createElement(
      'div',
      { style: { display: 'grid', gap: 6 } },
      ...Object.keys(BREAKPOINTS).map((key) =>
        React.createElement(
          'p',
          { key, style: { margin: 0 } },
          `${key} (${BREAKPOINTS[key as keyof typeof BREAKPOINTS]}px): ${flags[key as keyof typeof BREAKPOINTS] ? 'on' : 'off'}`,
        ),
      ),
    ),
  )
}

export const sourceJsx = `import useBreakpoints from '@dedalik/use-react/useBreakpoints'

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

export default function BreakpointsDemo() {
  const { width, current, active, greaterOrEqual, flags } = useBreakpoints(BREAKPOINTS)

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Resize the window to see the current breakpoint, active list, and flags for each threshold.
      </p>

      <p style={{ margin: '10px 0 6px' }}>{'Width: ' + width + 'px - current: ' + (current ?? '-')}</p>
      <p style={{ margin: '0 0 6px', color: 'var(--vp-c-text-2)' }}>{'Active: ' + (active.length ? active.join(' -> ') : 'none')}</p>
      <p style={{ margin: '0 0 10px', color: 'var(--vp-c-text-2)' }}>
        {'greaterOrEqual("md"): ' + (greaterOrEqual('md') ? 'true' : 'false')}
      </p>

      <div style={{ display: 'grid', gap: 6 }}>
        {Object.keys(BREAKPOINTS).map((key) => (
          <p key={key} style={{ margin: 0 }}>
            {key} ({BREAKPOINTS[key as keyof typeof BREAKPOINTS]}px):{' '}
            {flags[key as keyof typeof BREAKPOINTS] ? 'on' : 'off'}
          </p>
        ))}
      </div>
    </div>
  )
}`

export default BreakpointsDemo
