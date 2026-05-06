import React, { useMemo, useState } from 'react'
import useStyleTag from '@dedalik/use-react/useStyleTag'

function StyleTagDemo() {
  const [variant, setVariant] = useState<'none' | 'indigo' | 'emerald'>('none')

  const css = useMemo(() => {
    if (variant === 'indigo') {
      return [
        '.style-tag-live-box {',
        '  outline: 3px solid #6366f1;',
        '  outline-offset: 4px;',
        '  border-radius: 10px;',
        '}',
      ].join('\n')
    }
    if (variant === 'emerald') {
      return [
        '.style-tag-live-box {',
        '  border: 2px dashed #10b981;',
        '  background: rgba(16, 185, 129, 0.12);',
        '  border-radius: 10px;',
        '}',
      ].join('\n')
    }
    return ''
  }, [variant])

  const { id, loaded, error } = useStyleTag(css)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Injects CSS into document.head and removes the style tag when CSS changes or is cleared.',
    ),
    React.createElement(
      'p',
      { style: { margin: '0 0 10px', color: 'var(--vp-c-text-2)' } },
      `Tag id: ${id ?? '-'} - loaded: ${loaded ? 'yes' : 'no'} - error: ${error ? 'yes' : 'no'}`,
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'repeat(3, max-content)' } },
      React.createElement('button', { type: 'button', onClick: () => setVariant('none') }, 'Clear CSS'),
      React.createElement('button', { type: 'button', onClick: () => setVariant('indigo') }, 'Apply indigo'),
      React.createElement('button', { type: 'button', onClick: () => setVariant('emerald') }, 'Apply emerald'),
    ),
    React.createElement(
      'div',
      { className: 'style-tag-live-box', style: { marginTop: 10, padding: 12, maxWidth: 420 } },
      'This preview box updates only through injected CSS from useStyleTag.',
    ),
  )
}

export const sourceJsx = `import { useMemo, useState } from 'react'
import useStyleTag from '@dedalik/use-react/useStyleTag'

export default function StyleTagDemo() {
  const [variant, setVariant] = useState('none')

  const css = useMemo(() => {
    if (variant === 'indigo') {
      return [
        '.style-tag-live-box {',
        '  outline: 3px solid #6366f1;',
        '  outline-offset: 4px;',
        '  border-radius: 10px;',
        '}',
      ].join('\\n')
    }
    if (variant === 'emerald') {
      return [
        '.style-tag-live-box {',
        '  border: 2px dashed #10b981;',
        '  background: rgba(16, 185, 129, 0.12);',
        '  border-radius: 10px;',
        '}',
      ].join('\\n')
    }
    return ''
  }, [variant])

  const { id, loaded, error } = useStyleTag(css)

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Injects CSS into document.head and removes the style tag when CSS changes or is cleared.
      </p>
      <p style={{ margin: '0 0 10px', color: 'var(--vp-c-text-2)' }}>
        Tag id: {id ?? '-'} - loaded: {loaded ? 'yes' : 'no'} - error: {error ? 'yes' : 'no'}
      </p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(3, max-content)' }}>
        <button type='button' onClick={() => setVariant('none')}>
          Clear CSS
        </button>
        <button type='button' onClick={() => setVariant('indigo')}>
          Apply indigo
        </button>
        <button type='button' onClick={() => setVariant('emerald')}>
          Apply emerald
        </button>
      </div>

      <div className='style-tag-live-box' style={{ marginTop: 10, padding: 12, maxWidth: 420 }}>
        This preview box updates only through injected CSS from useStyleTag.
      </div>
    </div>
  )
}`

export default StyleTagDemo
