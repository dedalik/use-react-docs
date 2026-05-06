import React from 'react'
import usePreferredReducedMotion from '@dedalik/use-react/usePreferredReducedMotion'

function PreferredReducedMotionDemo() {
  const reduceMotion = usePreferredReducedMotion()

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'What to do: turn on/off "Reduce motion" in OS accessibility settings (or devtools emulation).',
    ),
    React.createElement(
      'p',
      { style: { margin: '10px 0 6px', fontSize: 12, opacity: 0.8, textTransform: 'uppercase' } },
      'Detected boolean',
    ),
    React.createElement(
      'p',
      { style: { margin: '0 0 10px', fontSize: 20, fontWeight: 700 } },
      reduceMotion ? 'true' : 'false',
    ),
    React.createElement(
      'div',
      {
        className: 'hook-demo-toolbar',
        style: { gridTemplateColumns: 'repeat(2, max-content)', gap: 8, marginBottom: 10 },
      },
      React.createElement(
        'span',
        {
          style: {
            padding: '4px 8px',
            borderRadius: 999,
            border: `1px solid ${reduceMotion ? '#334155' : '#cbd5e1'}`,
            opacity: reduceMotion ? 1 : 0.7,
            fontWeight: reduceMotion ? 700 : 500,
          },
        },
        'true (reduce motion)',
      ),
      React.createElement(
        'span',
        {
          style: {
            padding: '4px 8px',
            borderRadius: 999,
            border: `1px solid ${reduceMotion ? '#cbd5e1' : '#334155'}`,
            opacity: reduceMotion ? 0.7 : 1,
            fontWeight: reduceMotion ? 500 : 700,
          },
        },
        'false (full motion)',
      ),
    ),
    React.createElement(
      'span',
      {
        style: {
          display: 'inline-block',
          padding: '6px 12px',
          borderRadius: 999,
          background: '#e0e7ff',
          color: '#1e1b4b',
          animation: reduceMotion ? undefined : 'pulse-soft 1.6s ease-in-out infinite',
        },
      },
      reduceMotion ? 'Animation paused' : 'Animation running',
    ),
    React.createElement(
      'style',
      null,
      `@keyframes pulse-soft {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.04); opacity: 0.85; }
      }`,
    ),
  )
}

export const sourceJsx = `import usePreferredReducedMotion from '@dedalik/use-react/usePreferredReducedMotion'

export default function PreferredReducedMotionDemo() {
  const reduceMotion = usePreferredReducedMotion()

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        What to do: turn on/off "Reduce motion" in OS accessibility settings (or devtools emulation).
      </p>

      <p style={{ margin: '10px 0 6px', fontSize: 12, opacity: 0.8, textTransform: 'uppercase' }}>Detected boolean</p>
      <p style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700 }}>{reduceMotion ? 'true' : 'false'}</p>
      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(2, max-content)', gap: 8, marginBottom: 10 }}>
        <span
          style={{
            padding: '4px 8px',
            borderRadius: 999,
            border: \`1px solid \${reduceMotion ? '#334155' : '#cbd5e1'}\`,
            opacity: reduceMotion ? 1 : 0.7,
            fontWeight: reduceMotion ? 700 : 500,
          }}
        >
          true (reduce motion)
        </span>
        <span
          style={{
            padding: '4px 8px',
            borderRadius: 999,
            border: \`1px solid \${reduceMotion ? '#cbd5e1' : '#334155'}\`,
            opacity: reduceMotion ? 0.7 : 1,
            fontWeight: reduceMotion ? 500 : 700,
          }}
        >
          false (full motion)
        </span>
      </div>

      <span
        style={{
          display: 'inline-block',
          padding: '6px 12px',
          borderRadius: 999,
          background: '#e0e7ff',
          color: '#1e1b4b',
          animation: reduceMotion ? undefined : 'pulse-soft 1.6s ease-in-out infinite',
        }}
      >
        {reduceMotion ? 'Animation paused' : 'Animation running'}
      </span>

      <style>{\`@keyframes pulse-soft {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.04); opacity: 0.85; }
      }\`}</style>
    </div>
  )
}`

export default PreferredReducedMotionDemo
