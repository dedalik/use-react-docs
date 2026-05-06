import React, { useEffect, useMemo, useState } from 'react'
import useBroadcastChannel from '@dedalik/use-react/useBroadcastChannel'

type DemoMessage = {
  from: string
  text: string
  at: number
}

function BroadcastChannelDemo() {
  const { isSupported, data, post, close } = useBroadcastChannel<DemoMessage>('demo:chat')
  const [draft, setDraft] = useState('hello')
  const [status, setStatus] = useState('open')
  const [sentCount, setSentCount] = useState(0)
  const [lastSent, setLastSent] = useState<DemoMessage | null>(null)
  const [tabId] = useState(() => Math.random().toString(36).slice(2, 7))

  useEffect(() => {
    if (data) setStatus(`received from ${data.from}`)
  }, [data])

  const last = useMemo(() => {
    if (!data) return 'No messages yet'
    const time = new Date(data.at).toLocaleTimeString()
    return `${data.text} (from ${data.from} at ${time})`
  }, [data])

  const send = () => {
    const text = draft.trim()
    if (!text) return
    const message = { from: tabId, text, at: Date.now() }
    post(message)
    setLastSent(message)
    setSentCount((value) => value + 1)
    setStatus('message sent')
  }

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Open this same page in two tabs. Send text in one tab and the other tab will receive it instantly.',
    ),
    !isSupported
      ? React.createElement(
          'p',
          { style: { margin: 0, color: 'var(--vp-c-danger-1, #b42318)' } },
          'BroadcastChannel is not supported in this environment.',
        )
      : React.createElement(
          React.Fragment,
          null,
          React.createElement(
            'p',
            { style: { margin: '0 0 8px' } },
            'This tab id: ',
            React.createElement('strong', null, tabId),
          ),
          React.createElement(
            'div',
            { className: 'hook-demo-toolbar', style: { gridTemplateColumns: '1fr auto auto' } },
            React.createElement('input', {
              value: draft,
              onChange: (event) => setDraft(event.target.value),
              placeholder: 'Message to broadcast',
            }),
            React.createElement('button', { type: 'button', onClick: send }, 'Send'),
            React.createElement('button', { type: 'button', onClick: close }, 'Close'),
          ),
          React.createElement(
            'p',
            { style: { margin: '8px 0 0', color: 'var(--vp-c-text-2)' } },
            'Channel status: ',
            React.createElement('strong', null, status),
          ),
          React.createElement(
            'p',
            { style: { margin: '4px 0 0', color: 'var(--vp-c-text-2)' } },
            `Messages sent from this tab: ${sentCount}`,
          ),
          React.createElement(
            'p',
            { style: { margin: '8px 0 0' } },
            'Last received message (from another tab): ',
            React.createElement('strong', null, last),
          ),
          React.createElement(
            'p',
            { style: { margin: '4px 0 0', color: 'var(--vp-c-text-2)' } },
            'Last sent message (this tab): ',
            React.createElement('strong', null, lastSent ? `${lastSent.text}` : '-'),
          ),
        ),
  )
}

export const sourceJsx = `import { useMemo, useState } from 'react'
import useBroadcastChannel from '@dedalik/use-react/useBroadcastChannel'

type DemoMessage = {
  from: string
  text: string
  at: number
}

export default function BroadcastChannelDemo() {
  const { isSupported, data, post, close } = useBroadcastChannel<DemoMessage>('demo:chat')
  const [draft, setDraft] = useState('hello')
  const [status, setStatus] = useState('open')
  const [sentCount, setSentCount] = useState(0)
  const [lastSent, setLastSent] = useState<DemoMessage | null>(null)
  const [tabId] = useState(() => Math.random().toString(36).slice(2, 7))

  const last = useMemo(() => {
    if (!data) return 'No messages yet'
    const time = new Date(data.at).toLocaleTimeString()
    return \`\${data.text} (from \${data.from} at \${time})\`
  }, [data])

  React.useEffect(() => {
    if (data) setStatus(\`received from \${data.from}\`)
  }, [data])

  const send = () => {
    const text = draft.trim()
    if (!text) return
    const message = { from: tabId, text, at: Date.now() }
    post(message)
    setLastSent(message)
    setSentCount((value) => value + 1)
    setStatus('message sent')
  }

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Open this same page in two tabs. Send text in one tab and the other tab will receive it instantly.
      </p>
      {!isSupported ? (
        <p style={{ margin: 0, color: 'var(--vp-c-danger-1, #b42318)' }}>
          BroadcastChannel is not supported in this environment.
        </p>
      ) : (
        <>
          <p style={{ margin: '0 0 8px' }}>
            This tab id: <strong>{tabId}</strong>
          </p>
          <div className='hook-demo-toolbar' style={{ gridTemplateColumns: '1fr auto auto' }}>
            <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder='Message to broadcast' />
            <button type='button' onClick={send}>
              Send
            </button>
            <button type='button' onClick={close}>
              Close
            </button>
          </div>
          <p style={{ margin: '8px 0 0', color: 'var(--vp-c-text-2)' }}>
            Channel status: <strong>{status}</strong>
          </p>
          <p style={{ margin: '4px 0 0', color: 'var(--vp-c-text-2)' }}>Messages sent from this tab: {sentCount}</p>
          <p style={{ margin: '8px 0 0' }}>
            Last received message (from another tab): <strong>{last}</strong>
          </p>
          <p style={{ margin: '4px 0 0', color: 'var(--vp-c-text-2)' }}>
            Last sent message (this tab): <strong>{lastSent ? lastSent.text : '-'}</strong>
          </p>
        </>
      )}
    </div>
  )
}`

export default BroadcastChannelDemo
