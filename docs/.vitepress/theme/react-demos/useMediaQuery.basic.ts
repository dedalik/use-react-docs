import React, { useEffect, useState } from 'react'
import useMediaQuery from '@dedalik/use-react/useMediaQuery'

const readDocsDark = (prefersDark: boolean) => {
  if (typeof document === 'undefined') return false
  const stored = typeof localStorage === 'undefined' ? null : localStorage.getItem('vitepress-theme-appearance')
  if (stored === 'dark') return true
  if (stored === 'light') return false

  const attrDark =
    document.documentElement.classList.contains('dark') || document.documentElement.dataset.theme === 'dark'
  if (stored === 'auto') return prefersDark
  return attrDark
}

function MediaQueryDemo() {
  const isNarrow = useMediaQuery('(max-width: 900px)')
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const canHover = useMediaQuery('(hover: hover)')
  const [siteDark, setSiteDark] = useState(() => readDocsDark(prefersDark))

  useEffect(() => {
    if (typeof document === 'undefined') return
    const refresh = () => setSiteDark(readDocsDark(prefersDark))

    refresh()
    const observer = new MutationObserver(refresh)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })
    window.addEventListener('storage', refresh)

    return () => {
      observer.disconnect()
      window.removeEventListener('storage', refresh)
    }
  }, [prefersDark])

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'System media queries can differ from the docs site theme toggle. This demo shows both values separately.',
    ),
    React.createElement(
      'div',
      { style: { display: 'grid', gap: 8, marginTop: 10 } },
      React.createElement(
        'p',
        { style: { margin: 0 } },
        React.createElement('strong', null, '(max-width: 900px):'),
        ` ${isNarrow ? 'true' : 'false'}`,
      ),
      React.createElement(
        'p',
        { style: { margin: 0 } },
        React.createElement('strong', null, 'Docs site dark theme:'),
        ` ${siteDark ? 'on' : 'off'}`,
      ),
      React.createElement(
        'p',
        { style: { margin: 0 } },
        React.createElement('strong', null, '(hover: hover):'),
        ` ${canHover ? 'yes' : 'no'}`,
      ),
    ),
  )
}

export const sourceJsx = `import { useEffect, useState } from 'react'
import useMediaQuery from '@dedalik/use-react/useMediaQuery'

const readDocsDark = (prefersDark) => {
  if (typeof document === 'undefined') return false
  const stored = typeof localStorage === 'undefined' ? null : localStorage.getItem('vitepress-theme-appearance')
  if (stored === 'dark') return true
  if (stored === 'light') return false

  const attrDark = document.documentElement.classList.contains('dark') || document.documentElement.dataset.theme === 'dark'
  if (stored === 'auto') return prefersDark
  return attrDark
}

export default function MediaQueryDemo() {
  const isNarrow = useMediaQuery('(max-width: 900px)')
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const canHover = useMediaQuery('(hover: hover)')
  const [siteDark, setSiteDark] = useState(() => readDocsDark(prefersDark))

  useEffect(() => {
    if (typeof document === 'undefined') return
    const refresh = () => setSiteDark(readDocsDark(prefersDark))

    refresh()
    const observer = new MutationObserver(refresh)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })
    window.addEventListener('storage', refresh)

    return () => {
      observer.disconnect()
      window.removeEventListener('storage', refresh)
    }
  }, [prefersDark])

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        System media queries can differ from the docs site theme toggle. This demo shows both values separately.
      </p>

      <div style={{ display: 'grid', gap: 8, marginTop: 10 }}>
        <p style={{ margin: 0 }}>
          <strong>(max-width: 900px):</strong> {String(isNarrow)}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Docs site dark theme:</strong> {siteDark ? 'on' : 'off'}
        </p>
        <p style={{ margin: 0 }}>
          <strong>(hover: hover):</strong> {canHover ? 'yes' : 'no'}
        </p>
      </div>
    </div>
  )
}`

export default MediaQueryDemo
