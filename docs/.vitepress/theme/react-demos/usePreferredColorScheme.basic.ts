import React from 'react'
import usePreferredColorScheme from '@dedalik/use-react/usePreferredColorScheme'

function PreferredColorSchemeDemo() {
  const scheme = usePreferredColorScheme()

  const palette =
    scheme === 'dark'
      ? { bg: '#0f172a', fg: '#e2e8f0', border: '#334155' }
      : scheme === 'light'
        ? { bg: '#f8fafc', fg: '#0f172a', border: '#cbd5e1' }
        : { bg: '#f1f5f9', fg: '#1e293b', border: '#94a3b8' }

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'What to do: change Light/Dark mode in your OS (or browser devtools). This hook reads system preference, not the docs theme toggle.',
    ),
    React.createElement(
      'div',
      {
        style: {
          marginTop: 10,
          padding: 14,
          borderRadius: 10,
          border: `1px solid ${palette.border}`,
          background: palette.bg,
          color: palette.fg,
        },
      },
      React.createElement(
        'p',
        { style: { margin: '0 0 6px', fontSize: 12, opacity: 0.8, textTransform: 'uppercase' } },
        'Detected scheme',
      ),
      React.createElement('p', { style: { margin: '0 0 10px', fontSize: 20, fontWeight: 700 } }, scheme),
      React.createElement(
        'div',
        { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'repeat(3, max-content)', gap: 8 } },
        ...(['light', 'dark', 'no-preference'] as const).map((item) =>
          React.createElement(
            'span',
            {
              key: item,
              style: {
                padding: '4px 8px',
                borderRadius: 999,
                border: `1px solid ${scheme === item ? palette.fg : palette.border}`,
                opacity: scheme === item ? 1 : 0.7,
                fontWeight: scheme === item ? 700 : 500,
              },
            },
            item,
          ),
        ),
      ),
    ),
  )
}

export const sourceJsx = `import usePreferredColorScheme from '@dedalik/use-react/usePreferredColorScheme'

export default function PreferredColorSchemeDemo() {
  const scheme = usePreferredColorScheme()

  const palette =
    scheme === 'dark'
      ? { bg: '#0f172a', fg: '#e2e8f0', border: '#334155' }
      : scheme === 'light'
        ? { bg: '#f8fafc', fg: '#0f172a', border: '#cbd5e1' }
        : { bg: '#f1f5f9', fg: '#1e293b', border: '#94a3b8' }

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        What to do: change Light/Dark mode in your OS (or browser devtools). This hook reads system preference, not the docs theme toggle.
      </p>

      <div
        style={{
          marginTop: 10,
          padding: 14,
          borderRadius: 10,
          border: \`1px solid \${palette.border}\`,
          background: palette.bg,
          color: palette.fg,
        }}
      >
        <p style={{ margin: '0 0 6px', fontSize: 12, opacity: 0.8, textTransform: 'uppercase' }}>Detected scheme</p>
        <p style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700 }}>{scheme}</p>
        <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(3, max-content)', gap: 8 }}>
          {(['light', 'dark', 'no-preference'] as const).map((item) => (
            <span
              key={item}
              style={{
                padding: '4px 8px',
                borderRadius: 999,
                border: \`1px solid \${scheme === item ? palette.fg : palette.border}\`,
                opacity: scheme === item ? 1 : 0.7,
                fontWeight: scheme === item ? 700 : 500,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}`

export default PreferredColorSchemeDemo
