import React from 'react'
import usePreferredLanguages from '@dedalik/use-react/usePreferredLanguages'

function PreferredLanguagesDemo() {
  const languages = usePreferredLanguages()
  const primary = languages[0] ?? '-'

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Reads navigator.languages priority list and updates when browser language preferences change.',
    ),
    React.createElement(
      'p',
      { style: { margin: '10px 0 8px' } },
      React.createElement('strong', null, 'Primary:'),
      ` ${primary}`,
    ),
    languages.length === 0
      ? React.createElement('p', { style: { margin: 0, color: 'var(--vp-c-text-2)' } }, 'No entries.')
      : React.createElement(
          'ol',
          { style: { margin: 0, paddingLeft: 20 } },
          ...languages.map((tag) => React.createElement('li', { key: tag }, React.createElement('code', null, tag))),
        ),
  )
}

export const sourceJsx = `import usePreferredLanguages from '@dedalik/use-react/usePreferredLanguages'

export default function PreferredLanguagesDemo() {
  const languages = usePreferredLanguages()
  const primary = languages[0] ?? '-'

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Reads navigator.languages priority list and updates when browser language preferences change.
      </p>

      <p style={{ margin: '10px 0 8px' }}>
        <strong>Primary:</strong> {primary}
      </p>

      {languages.length === 0 ? (
        <p style={{ margin: 0, color: 'var(--vp-c-text-2)' }}>No entries.</p>
      ) : (
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          {languages.map((tag) => (
            <li key={tag}>
              <code>{tag}</code>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}`

export default PreferredLanguagesDemo
