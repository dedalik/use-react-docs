import React from 'react'
import useDark from '@dedalik/use-react/useDark'

function DarkDemo() {
  const [isDark, setDark, resetDark] = useDark({
    storageKey: 'docs:use-dark-demo',
    classNameDark: 'demo-dark',
    classNameLight: 'demo-light',
    element: typeof document !== 'undefined' ? document.documentElement : null,
  })

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Persist dark mode in localStorage and sync class names on the document element.',
    ),
    React.createElement(
      'div',
      {
        style: {
          marginTop: 10,
          padding: 14,
          borderRadius: 10,
          border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`,
          background: isDark ? '#0f172a' : '#f1f5f9',
          color: isDark ? '#e2e8f0' : '#0f172a',
        },
      },
      React.createElement('p', { style: { margin: '0 0 8px' } }, `Stored dark mode: ${isDark ? 'on' : 'off'}`),
      React.createElement(
        'p',
        { style: { margin: '0 0 10px', opacity: 0.85 } },
        'Use buttons to set explicit mode or reset back to system preference.',
      ),
      React.createElement(
        'div',
        { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'repeat(3, max-content)' } },
        React.createElement('button', { type: 'button', onClick: () => setDark(true) }, 'Dark'),
        React.createElement('button', { type: 'button', onClick: () => setDark(false) }, 'Light'),
        React.createElement('button', { type: 'button', onClick: resetDark }, 'Reset'),
      ),
    ),
  )
}

export const sourceJsx = `import useDark from '@dedalik/use-react/useDark'

export default function DarkDemo() {
  const [isDark, setDark, resetDark] = useDark({
    storageKey: 'docs:use-dark-demo',
    classNameDark: 'demo-dark',
    classNameLight: 'demo-light',
    element: typeof document !== 'undefined' ? document.documentElement : null,
  })

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>Persist dark mode in localStorage and sync class names on the document element.</p>

      <div
        style={{
          marginTop: 10,
          padding: 14,
          borderRadius: 10,
          border: \`1px solid \${isDark ? '#334155' : '#cbd5e1'}\`,
          background: isDark ? '#0f172a' : '#f1f5f9',
          color: isDark ? '#e2e8f0' : '#0f172a',
        }}
      >
        <p style={{ margin: '0 0 8px' }}>{'Stored dark mode: ' + (isDark ? 'on' : 'off')}</p>
        <p style={{ margin: '0 0 10px', opacity: 0.85 }}>
          Use buttons to set explicit mode or reset back to system preference.
        </p>

        <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(3, max-content)' }}>
          <button type='button' onClick={() => setDark(true)}>
            Dark
          </button>
          <button type='button' onClick={() => setDark(false)}>
            Light
          </button>
          <button type='button' onClick={resetDark}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}`

export default DarkDemo
