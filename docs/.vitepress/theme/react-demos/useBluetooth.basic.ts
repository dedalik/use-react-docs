import React, { useState } from 'react'
import useBluetooth from '@dedalik/use-react/useBluetooth'

function BluetoothDemo() {
  const { isSupported, deviceName, error, requestDevice } = useBluetooth()
  const [hideStaleError, setHideStaleError] = useState(false)
  const visibleError =
    !hideStaleError && error && !/not found|user gesture|no device selected/i.test(error) ? error : null

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    !isSupported
      ? React.createElement(
          'p',
          { className: 'hook-demo-hint' },
          'Web Bluetooth is not available in this browser or context (HTTPS is required).',
        )
      : React.createElement(
          React.Fragment,
          null,
          React.createElement(
            'p',
            { className: 'hook-demo-hint' },
            'Open the native Bluetooth chooser and keep the latest selected device name in state.',
          ),
          visibleError
            ? React.createElement(
                'p',
                { style: { margin: '0 0 10px', color: 'var(--vp-c-danger-1, #b42318)' } },
                visibleError,
              )
            : null,
          React.createElement(
            'div',
            { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'max-content 1fr' } },
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: () => {
                  setHideStaleError(true)
                  void requestDevice({
                    acceptAllDevices: true,
                    optionalServices: ['battery_service'],
                  }).finally(() => {
                    setHideStaleError(false)
                  })
                },
              },
              'Choose device',
            ),
            React.createElement(
              'p',
              { style: { margin: 0, alignSelf: 'center', color: 'var(--vp-c-text-2)' } },
              `Selected: ${deviceName ?? '-'}`,
            ),
          ),
        ),
  )
}

export const sourceJsx = `import { useState } from 'react'
import useBluetooth from '@dedalik/use-react/useBluetooth'

export default function BluetoothDemo() {
  const { isSupported, deviceName, error, requestDevice } = useBluetooth()
  const [hideStaleError, setHideStaleError] = useState(false)
  const visibleError =
    !hideStaleError && error && !/not found|user gesture|no device selected/i.test(error) ? error : null

  if (!isSupported) {
    return (
      <p className='hook-demo-hint'>Web Bluetooth is not available in this browser or context (HTTPS is required).</p>
    )
  }

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>Open the native Bluetooth chooser and keep the latest selected device name in state.</p>
      {visibleError ? <p style={{ margin: '0 0 10px', color: 'var(--vp-c-danger-1, #b42318)' }}>{visibleError}</p> : null}

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'max-content 1fr' }}>
        <button
          type='button'
          onClick={() => {
            setHideStaleError(true)
            void requestDevice({
              acceptAllDevices: true,
              optionalServices: ['battery_service'],
            }).finally(() => {
              setHideStaleError(false)
            })
          }}
        >
          Choose device
        </button>

        <p style={{ margin: 0, alignSelf: 'center', color: 'var(--vp-c-text-2)' }}>Selected: {deviceName ?? '-'}</p>
      </div>
    </div>
  )
}`

export default BluetoothDemo
