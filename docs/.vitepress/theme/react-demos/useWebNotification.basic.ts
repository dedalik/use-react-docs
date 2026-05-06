import React, { useState } from 'react'
import useWebNotification from '@dedalik/use-react/useWebNotification'

function WebNotificationDemo() {
  const { isSupported, permission, requestPermission, show } = useWebNotification()
  const [lastAction, setLastAction] = useState<'idle' | 'requested' | 'shown' | 'blocked'>('idle')
  const [delivery, setDelivery] = useState<'idle' | 'system-shown' | 'error' | 'closed' | 'clicked'>('idle')
  const [pendingDelay, setPendingDelay] = useState(false)

  const sendNotification = () => {
    if (permission !== 'granted') {
      setLastAction('blocked')
      setDelivery('error')
      return
    }
    const notification = show('Hello from use-react', {
      body: 'This is a demo notification from useWebNotification.',
      tag: 'use-web-notification-demo',
    })
    if (!notification) {
      setLastAction('blocked')
      setDelivery('error')
      return
    }

    setLastAction('shown')
    setDelivery('idle')
    notification.onshow = () => setDelivery('system-shown')
    notification.onerror = () => setDelivery('error')
    notification.onclose = () => setDelivery('closed')
    notification.onclick = () => setDelivery('clicked')
  }

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Requests notification permission and sends a browser notification when permission is granted.',
    ),
    !isSupported
      ? React.createElement(
          'p',
          { style: { margin: '10px 0 0', color: 'var(--vp-c-text-2)' } },
          'Notification API is not available in this environment.',
        )
      : React.createElement(
          React.Fragment,
          null,
          React.createElement(
            'p',
            { style: { margin: '0 0 10px', color: 'var(--vp-c-text-2)' } },
            `Permission: ${permission} - Last action: ${lastAction} - Delivery: ${delivery}`,
          ),
          React.createElement(
            'div',
            { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'max-content max-content max-content' } },
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: async () => {
                  const result = await requestPermission()
                  setLastAction(result === 'granted' ? 'requested' : 'blocked')
                },
              },
              'Request permission',
            ),
            React.createElement(
              'button',
              {
                type: 'button',
                disabled: permission !== 'granted',
                onClick: sendNotification,
              },
              'Show notification',
            ),
            React.createElement(
              'button',
              {
                type: 'button',
                disabled: permission !== 'granted' || pendingDelay,
                onClick: () => {
                  setPendingDelay(true)
                  window.setTimeout(() => {
                    sendNotification()
                    setPendingDelay(false)
                  }, 3000)
                },
              },
              pendingDelay ? 'Scheduled...' : 'Show in 3s',
            ),
          ),
          React.createElement(
            'p',
            { style: { margin: '8px 0 0', color: 'var(--vp-c-text-2)', fontSize: 12 } },
            'If Delivery does not become "system-shown", check OS notification settings, Focus mode, and browser site permissions.',
          ),
          React.createElement(
            'p',
            { style: { margin: '6px 0 0', color: 'var(--vp-c-text-2)', fontSize: 12 } },
            'How to reproduce visibly: 1) Grant permission, 2) click "Show in 3s", 3) immediately switch to another app/tab, 4) wait 3 seconds.',
          ),
        ),
  )
}

export const sourceJsx = `import { useState } from 'react'
import useWebNotification from '@dedalik/use-react/useWebNotification'

export default function WebNotificationDemo() {
  const { isSupported, permission, requestPermission, show } = useWebNotification()
  const [lastAction, setLastAction] = useState('idle')
  const [delivery, setDelivery] = useState('idle')
  const [pendingDelay, setPendingDelay] = useState(false)

  const sendNotification = () => {
    if (permission !== 'granted') {
      setLastAction('blocked')
      setDelivery('error')
      return
    }
    const notification = show('Hello from use-react', {
      body: 'This is a demo notification from useWebNotification.',
      tag: 'use-web-notification-demo',
    })
    if (!notification) {
      setLastAction('blocked')
      setDelivery('error')
      return
    }

    setLastAction('shown')
    setDelivery('idle')
    notification.onshow = () => setDelivery('system-shown')
    notification.onerror = () => setDelivery('error')
    notification.onclose = () => setDelivery('closed')
    notification.onclick = () => setDelivery('clicked')
  }

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Requests notification permission and sends a browser notification when permission is granted.
      </p>

      {!isSupported ? (
        <p style={{ margin: '10px 0 0', color: 'var(--vp-c-text-2)' }}>Notification API is not available in this environment.</p>
      ) : (
        <>
          <p style={{ margin: '0 0 10px', color: 'var(--vp-c-text-2)' }}>
            Permission: {permission} - Last action: {lastAction} - Delivery: {delivery}
          </p>
          <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'max-content max-content max-content' }}>
            <button
              type='button'
              onClick={async () => {
                const result = await requestPermission()
                setLastAction(result === 'granted' ? 'requested' : 'blocked')
              }}
            >
              Request permission
            </button>
            <button
              type='button'
              disabled={permission !== 'granted'}
              onClick={sendNotification}
            >
              Show notification
            </button>
            <button
              type='button'
              disabled={permission !== 'granted' || pendingDelay}
              onClick={() => {
                setPendingDelay(true)
                window.setTimeout(() => {
                  sendNotification()
                  setPendingDelay(false)
                }, 3000)
              }}
            >
              {pendingDelay ? 'Scheduled...' : 'Show in 3s'}
            </button>
          </div>
          <p style={{ margin: '8px 0 0', color: 'var(--vp-c-text-2)', fontSize: 12 }}>
            If Delivery does not become "system-shown", check OS notification settings, Focus mode, and browser site
            permissions.
          </p>
          <p style={{ margin: '6px 0 0', color: 'var(--vp-c-text-2)', fontSize: 12 }}>
            How to reproduce visibly: 1) Grant permission, 2) click "Show in 3s", 3) immediately switch to another
            app/tab, 4) wait 3 seconds.
          </p>
        </>
      )}
    </div>
  )
}`

export default WebNotificationDemo
