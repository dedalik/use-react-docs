import React, { useMemo, useState } from 'react'
import useFavicon from '@dedalik/use-react/useFavicon'

const CIRCLE_GREEN =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="%2322c55e"/></svg>'
const CIRCLE_RED =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="%23ef4444"/></svg>'
const CIRCLE_BLUE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="%233b82f6"/></svg>'

function FaviconDemo() {
  const [favicon, setFavicon] = useFavicon({ newIcon: CIRCLE_BLUE, rel: 'icon', baseUrl: '' })
  const [custom, setCustom] = useState(CIRCLE_BLUE)

  const label = useMemo(() => {
    if (favicon === CIRCLE_GREEN) return 'green'
    if (favicon === CIRCLE_RED) return 'red'
    if (favicon === CIRCLE_BLUE) return 'blue'
    return 'custom'
  }, [favicon])

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Click presets to swap favicon in the current tab. Demo uses data URLs so it works without static files.',
    ),
    React.createElement(
      'p',
      { style: { margin: '0 0 10px' } },
      'Current icon: ',
      React.createElement('strong', null, label),
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' } },
      React.createElement('button', { type: 'button', onClick: () => setFavicon(CIRCLE_BLUE) }, 'Blue'),
      React.createElement('button', { type: 'button', onClick: () => setFavicon(CIRCLE_GREEN) }, 'Green'),
      React.createElement('button', { type: 'button', onClick: () => setFavicon(CIRCLE_RED) }, 'Red'),
      React.createElement('button', { type: 'button', onClick: () => setFavicon('') }, 'Clear'),
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { marginTop: 8, gridTemplateColumns: '1fr auto' } },
      React.createElement('input', {
        value: custom,
        onChange: (event) => setCustom(event.target.value),
        placeholder: 'Custom favicon URL or data:image...',
      }),
      React.createElement('button', { type: 'button', onClick: () => setFavicon(custom) }, 'Apply custom'),
    ),
  )
}

export const sourceJsx = `import { useMemo, useState } from 'react'
import useFavicon from '@dedalik/use-react/useFavicon'

const CIRCLE_GREEN =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="%2322c55e"/></svg>'
const CIRCLE_RED =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="%23ef4444"/></svg>'
const CIRCLE_BLUE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="%233b82f6"/></svg>'

export default function FaviconDemo() {
  const [favicon, setFavicon] = useFavicon({ newIcon: CIRCLE_BLUE, rel: 'icon', baseUrl: '' })
  const [custom, setCustom] = useState(CIRCLE_BLUE)

  const label = useMemo(() => {
    if (favicon === CIRCLE_GREEN) return 'green'
    if (favicon === CIRCLE_RED) return 'red'
    if (favicon === CIRCLE_BLUE) return 'blue'
    return 'custom'
  }, [favicon])

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Click presets to swap favicon in the current tab. Demo uses data URLs so it works without static files.
      </p>
      <p style={{ margin: '0 0 10px' }}>
        Current icon: <strong>{label}</strong>
      </p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        <button type='button' onClick={() => setFavicon(CIRCLE_BLUE)}>
          Blue
        </button>
        <button type='button' onClick={() => setFavicon(CIRCLE_GREEN)}>
          Green
        </button>
        <button type='button' onClick={() => setFavicon(CIRCLE_RED)}>
          Red
        </button>
        <button type='button' onClick={() => setFavicon('')}>
          Clear
        </button>
      </div>

      <div className='hook-demo-toolbar' style={{ marginTop: 8, gridTemplateColumns: '1fr auto' }}>
        <input
          value={custom}
          onChange={(event) => setCustom(event.target.value)}
          placeholder='Custom favicon URL or data:image...'
        />
        <button type='button' onClick={() => setFavicon(custom)}>
          Apply custom
        </button>
      </div>
    </div>
  )
}`

export default FaviconDemo
