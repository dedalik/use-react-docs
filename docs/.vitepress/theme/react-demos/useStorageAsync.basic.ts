import React, { useMemo, useRef, useState } from 'react'
import useStorageAsync from '@dedalik/use-react/useStorageAsync'

function createLatentMemoryStorage(latencyRef: { current: number }) {
  const data = new Map<string, string>()
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
  return {
    getItem: async (key: string) => {
      await sleep(latencyRef.current)
      return data.get(key) ?? null
    },
    setItem: async (key: string, value: string) => {
      await sleep(latencyRef.current)
      data.set(key, value)
    },
    removeItem: async (key: string) => {
      await sleep(latencyRef.current)
      data.delete(key)
    },
    /** Sync delete so the next mount’s getItem sees `null` and matches `initial` (avoids hello → '' flash after set('') + remount). */
    clearKeySync(key: string) {
      data.delete(key)
    },
  }
}

function StorageAsyncInner({
  storageKey,
  initial,
  storage,
}: {
  storageKey: string
  initial: string
  storage: ReturnType<typeof createLatentMemoryStorage>
}) {
  const [value, loading, set] = useStorageAsync(storage, storageKey, initial, {
    serializer: JSON.stringify,
    parser: JSON.parse,
  })
  const safeValue = typeof value === 'string' ? value : value == null ? '' : String(value)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'useStorageAsync(storage, key, initial, { serializer, parser }) - async load mirrors localStorage: first paint uses `initial`, then stored value arrives. Apply / remount clears the in-memory key first so load matches `initial` (no flash).',
    ),
    React.createElement(
      'p',
      { style: { margin: 0 } },
      'loading: ',
      React.createElement('strong', null, String(loading)),
    ),
    React.createElement('p', { style: { margin: 0 } }, 'value: ', React.createElement('code', null, safeValue)),
    React.createElement('input', {
      type: 'text',
      value: safeValue,
      disabled: loading,
      onChange: (e) => void set(e.target.value),
    }),
    React.createElement(
      'div',
      { style: { display: 'flex', flexWrap: 'wrap', gap: '0.45rem' } },
      React.createElement(
        'button',
        { type: 'button', disabled: loading, onClick: () => void set('') },
        "set('') - clear value",
      ),
    ),
  )
}

function StorageAsyncDemo() {
  const [key, setKey] = useState('demo-item')
  const [initial, setInitial] = useState('hello')
  const [latency, setLatency] = useState(500)
  const latencyRef = useRef(latency)
  latencyRef.current = latency
  const storage = useMemo(() => createLatentMemoryStorage(latencyRef), [])
  const [k, setK] = useState(0)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar-stack' },
      React.createElement(
        'div',
        { className: 'hook-demo-toolbar', style: { gridTemplateColumns: '1fr' } },
        React.createElement(
          'div',
          { className: 'hook-demo-field' },
          React.createElement('p', { className: 'hook-demo-label' }, `I/O delay (ms) · ${latency}`),
          React.createElement('input', {
            type: 'range',
            min: 0,
            max: 3000,
            step: 50,
            value: latency,
            onChange: (e) => setLatency(Number(e.target.value) || 0),
          }),
        ),
        React.createElement(
          'div',
          { className: 'hook-demo-field' },
          React.createElement('p', { className: 'hook-demo-label' }, 'key'),
          React.createElement('input', { type: 'text', value: key, onChange: (e) => setKey(e.target.value) }),
        ),
        React.createElement(
          'div',
          { className: 'hook-demo-field' },
          React.createElement('p', { className: 'hook-demo-label' }, 'initial (remount)'),
          React.createElement('input', { type: 'text', value: initial, onChange: (e) => setInitial(e.target.value) }),
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            className: 'hook-demo-primary-action',
            style: { marginTop: '0.15rem' },
            onClick: () => {
              storage.clearKeySync(key)
              setK((c) => c + 1)
            },
          },
          'Apply / remount',
        ),
      ),
    ),
    React.createElement(StorageAsyncInner, { key: k, storageKey: key, initial, storage }),
  )
}

export const sourceJsx = `import { useMemo, useRef, useState } from 'react'
import useStorageAsync from '@dedalik/use-react/useStorageAsync'

function createLatentMemoryStorage(latencyRef) {
  const data = new Map()
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
  return {
    getItem: async (key) => {
      await sleep(latencyRef.current)
      return data.get(key) ?? null
    },
    setItem: async (key, value) => {
      await sleep(latencyRef.current)
      data.set(key, value)
    },
    removeItem: async (key) => {
      await sleep(latencyRef.current)
      data.delete(key)
    },
    clearKeySync(key) {
      data.delete(key)
    },
  }
}

function StorageAsyncInner({ storageKey, initial, storage }) {
  const [value, loading, set] = useStorageAsync(storage, storageKey, initial, {
    serializer: JSON.stringify,
    parser: JSON.parse,
  })
  const safeValue = typeof value === 'string' ? value : value == null ? '' : String(value)

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>Apply / remount clears the in-memory key so the next load matches \`initial\`.</p>
      <p>loading: <strong>{String(loading)}</strong></p>
      <p>value: <code>{safeValue}</code></p>
      <input value={safeValue} disabled={loading} onChange={(e) => void set(e.target.value)} />
      <button type='button' disabled={loading} onClick={() => void set('')}>set('') - clear value</button>
    </div>
  )
}

export default function StorageAsyncDemo() {
  const [key, setKey] = useState('demo-item')
  const [initial, setInitial] = useState('hello')
  const [latency, setLatency] = useState(500)
  const latencyRef = useRef(latency)
  latencyRef.current = latency
  const storage = useMemo(() => createLatentMemoryStorage(latencyRef), [])
  const [k, setK] = useState(0)

  return (
    <div className='hook-demo-surface'>
      <div className='hook-demo-toolbar-stack'>
        <div className='hook-demo-toolbar' style={{ gridTemplateColumns: '1fr' }}>
          <div className='hook-demo-field'>
            <p className='hook-demo-label'>{'I/O delay (ms) · ' + latency}</p>
            <input
              type='range'
              min={0}
              max={3000}
              step={50}
              value={latency}
              onChange={(e) => setLatency(Number(e.target.value) || 0)}
            />
          </div>
          <div className='hook-demo-field'>
            <p className='hook-demo-label'>key</p>
            <input value={key} onChange={(e) => setKey(e.target.value)} />
          </div>
          <div className='hook-demo-field'>
            <p className='hook-demo-label'>initial (remount)</p>
            <input value={initial} onChange={(e) => setInitial(e.target.value)} />
          </div>
          <button
            type='button'
            className='hook-demo-primary-action'
            style={{ marginTop: '0.15rem' }}
            onClick={() => {
              storage.clearKeySync(key)
              setK((c) => c + 1)
            }}
          >
            Apply / remount
          </button>
        </div>
      </div>
      <StorageAsyncInner key={k} storageKey={key} initial={initial} storage={storage} />
    </div>
  )
}`

export default StorageAsyncDemo
