import React from 'react'
import useColorMode from '@dedalik/use-react/useColorMode'

function ColorModeDemo() {
  const { mode, isDark, setMode, toggle } = useColorMode({
    storageKey: 'docs:color-mode-demo',
    attribute: 'class',
    element: typeof document !== 'undefined' ? document.documentElement : null,
  })

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Persists light/dark/auto mode and synchronizes resolved theme class on the document element.',
    ),
    React.createElement(
      'div',
      {
        style: {
          marginTop: 10,
          padding: 14,
          borderRadius: 10,
          border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`,
          background: isDark ? '#0f172a' : '#f8fafc',
          color: isDark ? '#e2e8f0' : '#0f172a',
        },
      },
      React.createElement('p', { style: { margin: '0 0 8px' } }, `Mode: ${mode}`),
      React.createElement(
        'p',
        { style: { margin: '0 0 10px', opacity: 0.85 } },
        `Resolved dark: ${isDark ? 'yes' : 'no'}`,
      ),
      React.createElement(
        'div',
        { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'repeat(4, max-content)' } },
        React.createElement('button', { type: 'button', onClick: () => setMode('light') }, 'Light'),
        React.createElement('button', { type: 'button', onClick: () => setMode('dark') }, 'Dark'),
        React.createElement('button', { type: 'button', onClick: () => setMode('auto') }, 'Auto'),
        React.createElement('button', { type: 'button', onClick: toggle }, 'Toggle'),
      ),
    ),
  )
}

export const sourceJsx = `import useColorMode from '@dedalik/use-react/useColorMode'

export default function ColorModeDemo() {
  const { mode, isDark, setMode, toggle } = useColorMode({
    storageKey: 'docs:color-mode-demo',
    attribute: 'class',
    element: typeof document !== 'undefined' ? document.documentElement : null,
  })

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Persists light/dark/auto mode and synchronizes resolved theme class on the document element.
      </p>

      <div
        style={{
          marginTop: 10,
          padding: 14,
          borderRadius: 10,
          border: \`1px solid \${isDark ? '#334155' : '#cbd5e1'}\`,
          background: isDark ? '#0f172a' : '#f8fafc',
          color: isDark ? '#e2e8f0' : '#0f172a',
        }}
      >
        <p style={{ margin: '0 0 8px' }}>{'Mode: ' + mode}</p>
        <p style={{ margin: '0 0 10px', opacity: 0.85 }}>{'Resolved dark: ' + (isDark ? 'yes' : 'no')}</p>

        <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(4, max-content)' }}>
          <button type='button' onClick={() => setMode('light')}>
            Light
          </button>
          <button type='button' onClick={() => setMode('dark')}>
            Dark
          </button>
          <button type='button' onClick={() => setMode('auto')}>
            Auto
          </button>
          <button type='button' onClick={toggle}>
            Toggle
          </button>
        </div>
      </div>
    </div>
  )
}`

export default ColorModeDemo
