import React from 'react'
import usePreferredReducedTransparency from '@dedalik/use-react/usePreferredReducedTransparency'

function PreferredReducedTransparencyDemo() {
  const reduceTransparency = usePreferredReducedTransparency()

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Switches from a translucent glass panel to a solid surface when reduced transparency is preferred.',
    ),
    React.createElement(
      'div',
      {
        style: {
          marginTop: 10,
          padding: 16,
          borderRadius: 12,
          background: reduceTransparency ? '#f1f5f9' : 'rgba(255, 255, 255, 0.55)',
          backdropFilter: reduceTransparency ? undefined : 'blur(12px)',
          border: reduceTransparency ? '1px solid #cbd5e1' : '1px solid rgba(148, 163, 184, 0.5)',
          color: '#0f172a',
        },
      },
      React.createElement(
        'p',
        { style: { margin: 0 } },
        `prefers-reduced-transparency: reduce -> ${reduceTransparency ? 'true' : 'false'}`,
      ),
    ),
  )
}

export const sourceJsx = `import usePreferredReducedTransparency from '@dedalik/use-react/usePreferredReducedTransparency'

export default function PreferredReducedTransparencyDemo() {
  const reduceTransparency = usePreferredReducedTransparency()

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Switches from a translucent glass panel to a solid surface when reduced transparency is preferred.
      </p>

      <div
        style={{
          marginTop: 10,
          padding: 16,
          borderRadius: 12,
          background: reduceTransparency ? '#f1f5f9' : 'rgba(255, 255, 255, 0.55)',
          backdropFilter: reduceTransparency ? undefined : 'blur(12px)',
          border: reduceTransparency ? '1px solid #cbd5e1' : '1px solid rgba(148, 163, 184, 0.5)',
          color: '#0f172a',
        }}
      >
        <p style={{ margin: 0 }}>
          {'prefers-reduced-transparency: reduce -> ' + (reduceTransparency ? 'true' : 'false')}
        </p>
      </div>
    </div>
  )
}`

export default PreferredReducedTransparencyDemo
