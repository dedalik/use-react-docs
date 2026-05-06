import React, { useMemo, useState } from 'react'
import useHash from '@dedalik/use-react/useHash'

function HashDemo() {
  const [hash] = useHash()
  const [custom, setCustom] = useState('#settings')
  const [demoHash, setDemoHash] = useState(hash)

  React.useEffect(() => {
    setDemoHash(hash)
  }, [hash])

  const active = useMemo(() => {
    if (demoHash === '#profile') return 'profile'
    if (demoHash === '#security') return 'security'
    if (demoHash === '#settings') return 'settings'
    return 'home'
  }, [demoHash])

  const applyHash = (rawHash: string) => {
    const normalized = rawHash ? (rawHash.startsWith('#') ? rawHash : `#${rawHash}`) : ''
    setDemoHash(normalized)
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    url.hash = normalized ? normalized.slice(1) : ''
    // Use replaceState to avoid full docs-page hash navigation/remount flicker.
    window.history.replaceState(window.history.state, '', url.toString())
  }

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Change the hash with buttons or custom input. Back/forward navigation also updates the state.',
    ),
    React.createElement(
      'p',
      { style: { margin: '0 0 10px' } },
      'Current hash: ',
      React.createElement('strong', null, demoHash || '(empty)'),
      ' - active panel: ',
      React.createElement('strong', null, active),
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' } },
      React.createElement('button', { type: 'button', onClick: () => applyHash('') }, 'Clear'),
      React.createElement('button', { type: 'button', onClick: () => applyHash('#profile') }, '#profile'),
      React.createElement('button', { type: 'button', onClick: () => applyHash('#security') }, '#security'),
      React.createElement('button', { type: 'button', onClick: () => applyHash('#settings') }, '#settings'),
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { marginTop: 8, gridTemplateColumns: '1fr auto' } },
      React.createElement('input', {
        value: custom,
        onChange: (event) => setCustom(event.target.value),
        placeholder: '#custom-hash',
      }),
      React.createElement('button', { type: 'button', onClick: () => applyHash(custom) }, 'Go'),
    ),
    React.createElement(
      'div',
      {
        style: {
          marginTop: 12,
          padding: 12,
          border: '1px solid var(--vp-c-divider)',
          borderRadius: 12,
          background: 'var(--vp-c-bg-soft)',
        },
      },
      active === 'profile' ? React.createElement('p', { style: { margin: 0 } }, 'Profile panel') : null,
      active === 'security' ? React.createElement('p', { style: { margin: 0 } }, 'Security panel') : null,
      active === 'settings' ? React.createElement('p', { style: { margin: 0 } }, 'Settings panel') : null,
      active === 'home' ? React.createElement('p', { style: { margin: 0 } }, 'Home panel (no matching hash)') : null,
    ),
  )
}

export const sourceJsx = `import { useMemo, useState } from 'react'
import useHash from '@dedalik/use-react/useHash'

export default function HashDemo() {
  const [hash] = useHash()
  const [custom, setCustom] = useState('#settings')
  const [demoHash, setDemoHash] = useState(hash)

  React.useEffect(() => {
    setDemoHash(hash)
  }, [hash])

  const active = useMemo(() => {
    if (demoHash === '#profile') return 'profile'
    if (demoHash === '#security') return 'security'
    if (demoHash === '#settings') return 'settings'
    return 'home'
  }, [demoHash])

  const applyHash = (rawHash: string) => {
    const normalized = rawHash ? (rawHash.startsWith('#') ? rawHash : '#' + rawHash) : ''
    setDemoHash(normalized)
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    url.hash = normalized ? normalized.slice(1) : ''
    window.history.replaceState(window.history.state, '', url.toString())
  }

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Change the hash with buttons or custom input. Back/forward navigation also updates the state.
      </p>
      <p style={{ margin: '0 0 10px' }}>
        Current hash: <strong>{demoHash || '(empty)'}</strong> - active panel: <strong>{active}</strong>
      </p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        <button type='button' onClick={() => applyHash('')}>
          Clear
        </button>
        <button type='button' onClick={() => applyHash('#profile')}>
          #profile
        </button>
        <button type='button' onClick={() => applyHash('#security')}>
          #security
        </button>
        <button type='button' onClick={() => applyHash('#settings')}>
          #settings
        </button>
      </div>

      <div className='hook-demo-toolbar' style={{ marginTop: 8, gridTemplateColumns: '1fr auto' }}>
        <input value={custom} onChange={(event) => setCustom(event.target.value)} placeholder='#custom-hash' />
        <button type='button' onClick={() => applyHash(custom)}>
          Go
        </button>
      </div>

      <div
        style={{
          marginTop: 12,
          padding: 12,
          border: '1px solid var(--vp-c-divider)',
          borderRadius: 12,
          background: 'var(--vp-c-bg-soft)',
        }}
      >
        {active === 'profile' ? <p style={{ margin: 0 }}>Profile panel</p> : null}
        {active === 'security' ? <p style={{ margin: 0 }}>Security panel</p> : null}
        {active === 'settings' ? <p style={{ margin: 0 }}>Settings panel</p> : null}
        {active === 'home' ? <p style={{ margin: 0 }}>Home panel (no matching hash)</p> : null}
      </div>
    </div>
  )
}`

export default HashDemo
