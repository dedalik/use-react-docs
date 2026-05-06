import React from 'react'
import usePreferredContrast from '@dedalik/use-react/usePreferredContrast'

function PreferredContrastDemo() {
  const contrast = usePreferredContrast()

  const borderWidth = contrast === 'more' ? 2 : 1
  const fontWeight = contrast === 'less' ? 400 : 600
  const background = contrast === 'custom' ? '#fefce8' : '#f8fafc'

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Tracks prefers-contrast media queries and adapts visual weight for more/less/custom preferences.',
    ),
    React.createElement(
      'div',
      {
        style: {
          marginTop: 10,
          padding: 14,
          borderRadius: 10,
          border: `${borderWidth}px solid #334155`,
          fontWeight,
          background,
          color: '#0f172a',
        },
      },
      React.createElement('p', { style: { margin: '0 0 8px' } }, `Resolved contrast: ${contrast}`),
      React.createElement(
        'p',
        { style: { margin: 0, opacity: 0.85 } },
        'Change OS/browser contrast settings to see this value update.',
      ),
    ),
  )
}

export const sourceJsx = `import usePreferredContrast from '@dedalik/use-react/usePreferredContrast'

export default function PreferredContrastDemo() {
  const contrast = usePreferredContrast()

  const borderWidth = contrast === 'more' ? 2 : 1
  const fontWeight = contrast === 'less' ? 400 : 600
  const background = contrast === 'custom' ? '#fefce8' : '#f8fafc'

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Tracks prefers-contrast media queries and adapts visual weight for more/less/custom preferences.
      </p>

      <div
        style={{
          marginTop: 10,
          padding: 14,
          borderRadius: 10,
          border: borderWidth + 'px solid #334155',
          fontWeight,
          background,
          color: '#0f172a',
        }}
      >
        <p style={{ margin: '0 0 8px' }}>Resolved contrast: {contrast}</p>
        <p style={{ margin: 0, opacity: 0.85 }}>Change OS/browser contrast settings to see this value update.</p>
      </div>
    </div>
  )
}`

export default PreferredContrastDemo
