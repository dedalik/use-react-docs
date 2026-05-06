import React, { useState } from 'react'
import usePermission from '@dedalik/use-react/usePermission'

type PermissionNameKey = 'geolocation' | 'notifications'

function PermissionDemo() {
  const [permissionName, setPermissionName] = useState<PermissionNameKey>('geolocation')
  const state = usePermission(permissionName)
  const [lastCheck, setLastCheck] = useState('idle')

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Queries Permissions API and tracks state changes (granted/denied/prompt/unsupported).',
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'max-content max-content max-content 1fr' } },
      React.createElement('button', { type: 'button', onClick: () => setPermissionName('geolocation') }, 'Geolocation'),
      React.createElement(
        'button',
        { type: 'button', onClick: () => setPermissionName('notifications') },
        'Notifications',
      ),
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: async () => {
            if (permissionName === 'geolocation') {
              if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
                setLastCheck('geolocation unsupported')
                return
              }
              navigator.geolocation.getCurrentPosition(
                () => setLastCheck('geolocation request: success'),
                (error) => setLastCheck(`geolocation request: ${error.message}`),
                { timeout: 8000 },
              )
              return
            }

            if (typeof Notification === 'undefined') {
              setLastCheck('notifications unsupported')
              return
            }
            const result = await Notification.requestPermission()
            setLastCheck(`notification request: ${result}`)
          },
        },
        permissionName === 'geolocation' ? 'Request geolocation' : 'Request notification',
      ),
      React.createElement(
        'p',
        { style: { margin: 0, alignSelf: 'center', color: 'var(--vp-c-text-2)' } },
        `name: ${permissionName} - state: ${state}`,
      ),
    ),
    React.createElement(
      'p',
      { style: { margin: '10px 0 0', color: 'var(--vp-c-text-2)' } },
      `Last request: ${lastCheck}`,
    ),
    React.createElement(
      'p',
      { style: { margin: '6px 0 0', color: 'var(--vp-c-text-2)' } },
      'If state is "prompt", click request button to trigger the browser permission dialog.',
    ),
  )
}

export const sourceJsx = `import { useState } from 'react'
import usePermission from '@dedalik/use-react/usePermission'

export default function PermissionDemo() {
  const [permissionName, setPermissionName] = useState('geolocation')
  const state = usePermission(permissionName)
  const [lastCheck, setLastCheck] = useState('idle')

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Queries Permissions API and tracks state changes (granted/denied/prompt/unsupported).
      </p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'max-content max-content max-content 1fr' }}>
        <button type='button' onClick={() => setPermissionName('geolocation')}>
          Geolocation
        </button>
        <button type='button' onClick={() => setPermissionName('notifications')}>
          Notifications
        </button>
        <button
          type='button'
          onClick={async () => {
            if (permissionName === 'geolocation') {
              if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
                setLastCheck('geolocation unsupported')
                return
              }
              navigator.geolocation.getCurrentPosition(
                () => setLastCheck('geolocation request: success'),
                (error) => setLastCheck(\`geolocation request: \${error.message}\`),
                { timeout: 8000 }
              )
              return
            }

            if (typeof Notification === 'undefined') {
              setLastCheck('notifications unsupported')
              return
            }
            const result = await Notification.requestPermission()
            setLastCheck(\`notification request: \${result}\`)
          }}
        >
          {permissionName === 'geolocation' ? 'Request geolocation' : 'Request notification'}
        </button>
        <p style={{ margin: 0, alignSelf: 'center', color: 'var(--vp-c-text-2)' }}>
          name: {permissionName} - state: {state}
        </p>
      </div>

      <p style={{ margin: '10px 0 0', color: 'var(--vp-c-text-2)' }}>
        Last request: {lastCheck}
      </p>
      <p style={{ margin: '6px 0 0', color: 'var(--vp-c-text-2)' }}>
        If state is "prompt", click request button to trigger the browser permission dialog.
      </p>
    </div>
  )
}`

export default PermissionDemo
