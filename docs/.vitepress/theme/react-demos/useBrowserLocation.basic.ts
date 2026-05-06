import React, { useMemo, useState } from 'react'
import useBrowserLocation from '@dedalik/use-react/useBrowserLocation'

type DemoLocation = {
  href: string
  pathname: string
  search: string
  hash: string
}

function readLocation(): DemoLocation {
  if (typeof window === 'undefined') return { href: '', pathname: '', search: '', hash: '' }
  return {
    href: window.location.href,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  }
}

function BrowserLocationDemo() {
  const loc = useBrowserLocation()
  const [demoLoc, setDemoLoc] = useState<DemoLocation>(loc)
  const [counter, setCounter] = useState(1)

  React.useEffect(() => {
    setDemoLoc(loc)
  }, [loc])

  const pretty = useMemo(() => {
    const q = demoLoc.search ? ` ${demoLoc.search}` : ''
    const h = demoLoc.hash ? ` ${demoLoc.hash}` : ''
    return `${demoLoc.pathname}${q}${h}`.trim()
  }, [demoLoc.hash, demoLoc.pathname, demoLoc.search])

  const applyUrl = (updater: (url: URL) => void) => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    updater(url)
    // Same pattern as useHash demo: update URL without triggering docs remount.
    window.history.replaceState(window.history.state, '', url.toString())
    setDemoLoc(readLocation())
  }

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Tracks href/path/search/hash. Demo mutations use replaceState to avoid docs remount flicker.',
    ),
    React.createElement(
      'p',
      { style: { margin: '0 0 8px', color: 'var(--vp-c-text-2)' } },
      `href: ${demoLoc.href || '-'}`,
    ),
    React.createElement(
      'p',
      { style: { margin: '0 0 10px', color: 'var(--vp-c-text-2)' } },
      `path + query + hash: ${pretty || '-'}`,
    ),
    React.createElement(
      'div',
      {
        className: 'hook-demo-toolbar',
        style: { gridTemplateColumns: 'max-content max-content max-content max-content' },
      },
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: () => applyUrl((url) => void url.searchParams.set('demoLoc', String(counter))),
        },
        'Set query',
      ),
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: () =>
            applyUrl((url) => {
              url.hash = `demo-${counter}`
            }),
        },
        'Set hash',
      ),
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: () =>
            applyUrl((url) => {
              url.searchParams.delete('demoLoc')
              url.hash = ''
            }),
        },
        'Clear',
      ),
      React.createElement(
        'button',
        { type: 'button', onClick: () => setCounter((value) => value + 1) },
        `Bump (${counter})`,
      ),
    ),
    React.createElement(
      'p',
      { style: { margin: '10px 0 0', color: 'var(--vp-c-text-2)' } },
      'Back/forward or manual URL edits still update from the hook listeners.',
    ),
  )
}

export const sourceJsx = `import { useMemo, useState } from 'react'
import useBrowserLocation from '@dedalik/use-react/useBrowserLocation'

type DemoLocation = {
  href: string
  pathname: string
  search: string
  hash: string
}

function readLocation(): DemoLocation {
  if (typeof window === 'undefined') return { href: '', pathname: '', search: '', hash: '' }
  return {
    href: window.location.href,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  }
}

export default function BrowserLocationDemo() {
  const loc = useBrowserLocation()
  const [demoLoc, setDemoLoc] = useState<DemoLocation>(loc)
  const [counter, setCounter] = useState(1)

  React.useEffect(() => {
    setDemoLoc(loc)
  }, [loc])

  const pretty = useMemo(() => {
    const q = demoLoc.search ? \` \${demoLoc.search}\` : ''
    const h = demoLoc.hash ? \` \${demoLoc.hash}\` : ''
    return \`\${demoLoc.pathname}\${q}\${h}\`.trim()
  }, [demoLoc.hash, demoLoc.pathname, demoLoc.search])

  const applyUrl = (updater: (url: URL) => void) => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    updater(url)
    window.history.replaceState(window.history.state, '', url.toString())
    setDemoLoc(readLocation())
  }

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>Tracks href/path/search/hash. Demo mutations use replaceState to avoid docs remount flicker.</p>
      <p style={{ margin: '0 0 8px', color: 'var(--vp-c-text-2)' }}>href: {demoLoc.href || '-'}</p>
      <p style={{ margin: '0 0 10px', color: 'var(--vp-c-text-2)' }}>path + query + hash: {pretty || '-'}</p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'max-content max-content max-content max-content' }}>
        <button
          type='button'
          onClick={() => applyUrl((url) => void url.searchParams.set('demoLoc', String(counter)))}
        >
          Set query
        </button>
        <button
          type='button'
          onClick={() =>
            applyUrl((url) => {
              url.hash = \`demo-\${counter}\`
            })
          }
        >
          Set hash
        </button>
        <button
          type='button'
          onClick={() =>
            applyUrl((url) => {
              url.searchParams.delete('demoLoc')
              url.hash = ''
            })
          }
        >
          Clear
        </button>
        <button type='button' onClick={() => setCounter((value) => value + 1)}>
          {'Bump (' + counter + ')'}
        </button>
      </div>

      <p style={{ margin: '10px 0 0', color: 'var(--vp-c-text-2)' }}>
        Back/forward or manual URL edits still update from the hook listeners.
      </p>
    </div>
  )
}`

export default BrowserLocationDemo
