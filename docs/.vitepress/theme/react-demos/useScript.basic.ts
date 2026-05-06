import React, { useMemo, useState } from 'react'
import useScript from '@dedalik/use-react/useScript'

const LODASH_CDN = 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js'

function ScriptDemo() {
  const [enabled, setEnabled] = useState(false)
  const [numbers] = useState([9, 4, 1, 7, 3])
  const status = useScript(enabled ? LODASH_CDN : undefined)

  const lodashReady = useMemo(() => {
    if (!enabled || status !== 'ready' || typeof window === 'undefined') return false
    return '_' in window
  }, [enabled, status])

  const transformed = useMemo(() => {
    if (!lodashReady || typeof window === 'undefined' || !('_' in window)) return 'Load script to run _.orderBy(...)'
    const lodash = (window as typeof window & { _: { orderBy: (arr: number[]) => number[] } })._
    return lodash.orderBy(numbers).join(', ')
  }, [lodashReady, numbers])

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'What to do: click "Load Lodash from CDN" and watch status + a real lodash result appear below.',
    ),
    React.createElement(
      'p',
      { style: { margin: '0 0 10px', color: 'var(--vp-c-text-2)' } },
      `Status: ${enabled ? status : 'idle'}`,
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'max-content max-content' } },
      React.createElement(
        'button',
        { type: 'button', onClick: () => setEnabled((value) => !value) },
        enabled ? 'Unload URL' : 'Load Lodash from CDN',
      ),
      React.createElement(
        'p',
        { style: { margin: 0, alignSelf: 'center', color: 'var(--vp-c-text-2)' } },
        `window._ available: ${lodashReady ? 'yes' : 'no'}`,
      ),
    ),
    React.createElement(
      'div',
      { style: { marginTop: 10, padding: 10, border: '1px solid var(--vp-c-divider)', borderRadius: 8 } },
      React.createElement('p', { style: { margin: '0 0 6px' } }, `Input: [${numbers.join(', ')}]`),
      React.createElement(
        'p',
        { style: { margin: 0, color: 'var(--vp-c-text-2)' } },
        `_.orderBy(input): ${transformed}`,
      ),
    ),
  )
}

export const sourceJsx = `import { useMemo, useState } from 'react'
import useScript from '@dedalik/use-react/useScript'

const LODASH_CDN = 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js'

export default function ScriptDemo() {
  const [enabled, setEnabled] = useState(false)
  const [numbers] = useState([9, 4, 1, 7, 3])
  const status = useScript(enabled ? LODASH_CDN : undefined)

  const lodashReady = useMemo(() => {
    if (!enabled || status !== 'ready' || typeof window === 'undefined') return false
    return '_' in window
  }, [enabled, status])

  const transformed = useMemo(() => {
    if (!lodashReady || typeof window === 'undefined' || !('_' in window)) return 'Load script to run _.orderBy(...)'
    const lodash = (window as typeof window & { _: { orderBy: (arr: number[]) => number[] } })._
    return lodash.orderBy(numbers).join(', ')
  }, [lodashReady, numbers])

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        What to do: click "Load Lodash from CDN" and watch status + a real lodash result appear below.
      </p>
      <p style={{ margin: '0 0 10px', color: 'var(--vp-c-text-2)' }}>Status: {enabled ? status : 'idle'}</p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'max-content max-content' }}>
        <button type='button' onClick={() => setEnabled((value) => !value)}>
          {enabled ? 'Unload URL' : 'Load Lodash from CDN'}
        </button>
        <p style={{ margin: 0, alignSelf: 'center', color: 'var(--vp-c-text-2)' }}>
          window._ available: {lodashReady ? 'yes' : 'no'}
        </p>
      </div>
      <div style={{ marginTop: 10, padding: 10, border: '1px solid var(--vp-c-divider)', borderRadius: 8 }}>
        <p style={{ margin: '0 0 6px' }}>Input: [{numbers.join(', ')}]</p>
        <p style={{ margin: 0, color: 'var(--vp-c-text-2)' }}>_.orderBy(input): {transformed}</p>
      </div>
    </div>
  )
}`

export default ScriptDemo
