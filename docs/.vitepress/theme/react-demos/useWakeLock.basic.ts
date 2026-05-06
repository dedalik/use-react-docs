import React, { useState } from 'react'
import useWakeLock from '@dedalik/use-react/useWakeLock'

function WakeLockDemo() {
  const { isSupported, isActive, request, release } = useWakeLock()
  const [lastAction, setLastAction] = useState<'idle' | 'requested' | 'denied' | 'released'>('idle')
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string>('never')

  const markUpdate = () => setLastUpdatedAt(new Date().toLocaleTimeString())

  const onRequest = async () => {
    const ok = await request()
    setLastAction(ok ? 'requested' : 'denied')
    markUpdate()
  }

  const onRelease = async () => {
    await release()
    setLastAction('released')
    markUpdate()
  }

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'What to expect: there is no visual browser popup. Use the status below to confirm lock acquired/released.',
    ),
    !isSupported
      ? React.createElement(
          'p',
          { style: { margin: '10px 0 0', color: 'var(--vp-c-text-2)' } },
          'Wake Lock API is not available in this browser/context.',
        )
      : React.createElement(
          React.Fragment,
          null,
          React.createElement(
            'div',
            {
              style: {
                margin: '0 0 10px',
                display: 'inline-block',
                padding: '6px 10px',
                borderRadius: 999,
                border: '1px solid var(--vp-c-divider)',
                background: isActive ? 'rgba(5, 150, 105, 0.15)' : 'var(--vp-c-bg-soft)',
                color: isActive ? '#047857' : 'var(--vp-c-text-2)',
                fontWeight: 700,
              },
            },
            isActive ? 'Wake lock ON' : 'Wake lock OFF',
          ),
          React.createElement(
            'p',
            { style: { margin: '0 0 10px', color: 'var(--vp-c-text-2)' } },
            `Last action: ${lastAction} - Updated: ${lastUpdatedAt}`,
          ),
          React.createElement(
            'div',
            { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'max-content max-content' } },
            React.createElement('button', { type: 'button', onClick: () => void onRequest() }, 'Request lock'),
            React.createElement('button', { type: 'button', onClick: () => void onRelease() }, 'Release'),
          ),
        ),
  )
}

export const sourceJsx = `import { useState } from 'react'
import useWakeLock from '@dedalik/use-react/useWakeLock'

export default function WakeLockDemo() {
  const { isSupported, isActive, request, release } = useWakeLock()
  const [lastAction, setLastAction] = useState('idle')
  const [lastUpdatedAt, setLastUpdatedAt] = useState('never')

  const markUpdate = () => setLastUpdatedAt(new Date().toLocaleTimeString())

  const onRequest = async () => {
    const ok = await request()
    setLastAction(ok ? 'requested' : 'denied')
    markUpdate()
  }

  const onRelease = async () => {
    await release()
    setLastAction('released')
    markUpdate()
  }

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        What to expect: there is no visual browser popup. Use the status below to confirm lock acquired/released.
      </p>

      {!isSupported ? (
        <p style={{ margin: '10px 0 0', color: 'var(--vp-c-text-2)' }}>Wake Lock API is not available in this browser/context.</p>
      ) : (
        <>
          <div
            style={{
              margin: '0 0 10px',
              display: 'inline-block',
              padding: '6px 10px',
              borderRadius: 999,
              border: '1px solid var(--vp-c-divider)',
              background: isActive ? 'rgba(5, 150, 105, 0.15)' : 'var(--vp-c-bg-soft)',
              color: isActive ? '#047857' : 'var(--vp-c-text-2)',
              fontWeight: 700,
            }}
          >
            {isActive ? 'Wake lock ON' : 'Wake lock OFF'}
          </div>
          <p style={{ margin: '0 0 10px', color: 'var(--vp-c-text-2)' }}>
            Last action: {lastAction} - Updated: {lastUpdatedAt}
          </p>
          <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'max-content max-content' }}>
            <button type='button' onClick={() => void onRequest()}>
              Request lock
            </button>
            <button type='button' onClick={() => void onRelease()}>
              Release
            </button>
          </div>
        </>
      )}
    </div>
  )
}`

export default WakeLockDemo
