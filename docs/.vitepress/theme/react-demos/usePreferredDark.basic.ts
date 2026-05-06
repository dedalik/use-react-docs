import React from 'react'
import usePreferredDark from '@dedalik/use-react/usePreferredDark'

function PreferredDarkDemo() {
  const prefersDark = usePreferredDark()

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'What to do: change Light/Dark mode in your OS (or browser devtools). This hook returns a boolean from system preference.',
    ),
    React.createElement(
      'div',
      {
        'data-theme': prefersDark ? 'dark' : 'light',
        style: {
          marginTop: 10,
          padding: 14,
          borderRadius: 10,
          border: `1px solid ${prefersDark ? '#334155' : '#cbd5e1'}`,
          background: prefersDark ? '#0f172a' : '#f1f5f9',
          color: prefersDark ? '#e2e8f0' : '#0f172a',
        },
      },
      React.createElement(
        'p',
        { style: { margin: '0 0 6px', fontSize: 12, opacity: 0.8, textTransform: 'uppercase' } },
        'Detected boolean',
      ),
      React.createElement(
        'p',
        { style: { margin: '0 0 10px', fontSize: 20, fontWeight: 700 } },
        prefersDark ? 'true' : 'false',
      ),
      React.createElement(
        'div',
        { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'repeat(2, max-content)', gap: 8 } },
        React.createElement(
          'span',
          {
            style: {
              padding: '4px 8px',
              borderRadius: 999,
              border: `1px solid ${prefersDark ? '#e2e8f0' : '#334155'}`,
              opacity: prefersDark ? 1 : 0.7,
              fontWeight: prefersDark ? 700 : 500,
            },
          },
          'true (dark preferred)',
        ),
        React.createElement(
          'span',
          {
            style: {
              padding: '4px 8px',
              borderRadius: 999,
              border: `1px solid ${prefersDark ? '#334155' : '#0f172a'}`,
              opacity: prefersDark ? 0.7 : 1,
              fontWeight: prefersDark ? 500 : 700,
            },
          },
          'false (light/no-preference)',
        ),
      ),
    ),
  )
}

export const sourceJsx = `import usePreferredDark from '@dedalik/use-react/usePreferredDark'

export default function PreferredDarkDemo() {
  const prefersDark = usePreferredDark()

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        What to do: change Light/Dark mode in your OS (or browser devtools). This hook returns a boolean from system preference.
      </p>

      <div
        data-theme={prefersDark ? 'dark' : 'light'}
        style={{
          marginTop: 10,
          padding: 14,
          borderRadius: 10,
          border: \`1px solid \${prefersDark ? '#334155' : '#cbd5e1'}\`,
          background: prefersDark ? '#0f172a' : '#f1f5f9',
          color: prefersDark ? '#e2e8f0' : '#0f172a',
        }}
      >
        <p style={{ margin: '0 0 6px', fontSize: 12, opacity: 0.8, textTransform: 'uppercase' }}>Detected boolean</p>
        <p style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700 }}>{prefersDark ? 'true' : 'false'}</p>
        <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(2, max-content)', gap: 8 }}>
          <span
            style={{
              padding: '4px 8px',
              borderRadius: 999,
              border: \`1px solid \${prefersDark ? '#e2e8f0' : '#334155'}\`,
              opacity: prefersDark ? 1 : 0.7,
              fontWeight: prefersDark ? 700 : 500,
            }}
          >
            true (dark preferred)
          </span>
          <span
            style={{
              padding: '4px 8px',
              borderRadius: 999,
              border: \`1px solid \${prefersDark ? '#334155' : '#0f172a'}\`,
              opacity: prefersDark ? 0.7 : 1,
              fontWeight: prefersDark ? 500 : 700,
            }}
          >
            false (light/no-preference)
          </span>
        </div>
      </div>
    </div>
  )
}`

export default PreferredDarkDemo
