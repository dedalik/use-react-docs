import React, { useEffect, useState } from 'react'
import useStorage from '@dedalik/use-react/useStorage'

const PREFIX = 'ur-docs.state-demo.'
/** Old default slot (pre–two-step Apply demo). Cleared on mount; do not use the same suffix as the current default `key` or we wipe the live row. */
const LEGACY_DEFAULT_FULL_KEY = `${PREFIX}prefs`
/** Default `key` suffix is not `prefs` so it is distinct from `LEGACY_DEFAULT_FULL_KEY`. */
const DEFAULT_KEY_SUFFIX = 'demo'

function StorageInner({
  storageKey,
  useSession,
  initial,
}: {
  storageKey: string
  useSession: boolean
  initial: string
}) {
  const storage = useSession ? window.sessionStorage : window.localStorage
  const fullKey = PREFIX + storageKey
  const [value, set] = useStorage(fullKey, initial, { storage })
  const safeValue = typeof value === 'string' ? value : value == null ? '' : String(value)
  /* do not use getItem() here: persist runs in useStorage’s effect, so a render with value already
   * updated would still read the previous `getItem` with no re-render. Show the default serializer
   * output, same as the hook. */
  const rawLine = JSON.stringify(value) as string

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'useStorage(key, initial, { serializer, parser, storage }) - default JSON.stringify / JSON.parse; storage defaults to localStorage. set(\'\') stores an empty string (key stays).',
    ),
    React.createElement(
      'div',
      { style: { display: 'grid', gap: '0.45rem' } },
      React.createElement('p', { style: { margin: 0 } }, 'Hook value: ', React.createElement('code', null, safeValue)),
      React.createElement(
        'p',
        { style: { margin: 0, fontSize: '0.8rem' } },
        'Storage key: ',
        React.createElement('code', null, fullKey),
      ),
      React.createElement('p', { style: { margin: 0, fontSize: '0.8rem' } }, 'Serialized (default JSON — same as written to storage):'),
      React.createElement('p', { className: 'hook-demo-mono' }, rawLine),
    ),
    React.createElement('input', { type: 'text', value: safeValue, onChange: (e) => set(e.target.value) }),
    React.createElement(
      'div',
      { style: { display: 'flex', flexWrap: 'wrap', gap: '0.45rem' } },
      React.createElement('button', { type: 'button', onClick: () => set('') }, "set('') - clear value"),
    ),
  )
}

type Applied = { useSession: boolean; key: string; initial: string }

function StorageDemo() {
  const [useSession, setUseSession] = useState(false)
  const [key, setKey] = useState(DEFAULT_KEY_SUFFIX)
  const [initial, setInitial] = useState('hello')
  const [applied, setApplied] = useState<Applied>({
    useSession: false,
    key: DEFAULT_KEY_SUFFIX,
    initial: 'hello',
  })
  const [k, setK] = useState(0)
  /** Do not mount `useStorage` until the user applies once — avoids writing on first page load. */
  const [liveStarted, setLiveStarted] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.removeItem(LEGACY_DEFAULT_FULL_KEY)
    } catch {
      /* ignore */
    }
    try {
      window.sessionStorage.removeItem(LEGACY_DEFAULT_FULL_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  const apply = () => {
    /* see sourceJsx copy: clear slot before remount so `initial` wins over stale storage */
    if (typeof window !== 'undefined') {
      const st = useSession ? window.sessionStorage : window.localStorage
      const full = PREFIX + key
      try {
        st.removeItem(full)
      } catch {
        /* ignore */
      }
    }
    setApplied({ useSession, key, initial })
    setK((c) => c + 1)
    setLiveStarted(true)
  }

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar-stack' },
      React.createElement(
        'div',
        { className: 'hook-demo-toolbar hook-demo-toolbar--even-3' },
        React.createElement(
          'div',
          { className: 'hook-demo-field' },
          React.createElement('p', { className: 'hook-demo-label' }, 'storage'),
          React.createElement(
            'div',
            { className: 'hook-demo-segment', role: 'group', 'aria-label': 'Storage backend' },
            React.createElement(
              'button',
              {
                type: 'button',
                className: useSession ? undefined : 'is-active',
                'aria-pressed': !useSession,
                onClick: () => setUseSession(false),
              },
              'localStorage',
            ),
            React.createElement(
              'button',
              {
                type: 'button',
                className: useSession ? 'is-active' : undefined,
                'aria-pressed': useSession,
                onClick: () => setUseSession(true),
              },
              'sessionStorage',
            ),
          ),
        ),
        React.createElement(
          'div',
          { className: 'hook-demo-field' },
          React.createElement('p', { className: 'hook-demo-label' }, 'key suffix'),
          React.createElement('input', { type: 'text', value: key, onChange: (e) => setKey(e.target.value) }),
        ),
        React.createElement(
          'div',
          { className: 'hook-demo-field' },
          React.createElement('p', { className: 'hook-demo-label' }, 'initial (on remount)'),
          React.createElement('input', { type: 'text', value: initial, onChange: (e) => setInitial(e.target.value) }),
        ),
      ),
      React.createElement(
        'button',
        {
          type: 'button',
          className: 'hook-demo-primary-action',
          onClick: apply,
        },
        'Apply / remount',
      ),
      React.createElement(
        'p',
        { className: 'hook-demo-hint', style: { margin: 0, fontSize: '0.78rem' } },
        'Each “Apply / remount” clears the current storage key, then remounts so the Initial (on remount) value is used. Nothing is written until the first Apply.',
      ),
    ),
    liveStarted
      ? React.createElement(StorageInner, {
          key: k,
          storageKey: applied.key,
          useSession: applied.useSession,
          initial: applied.initial,
        })
      : React.createElement(
          'p',
          {
            className: 'hook-demo-hint',
            style: { margin: '0.75rem 0 0', fontSize: '0.9rem' },
          },
          'Click “Apply / remount” to start the live demo and allow reads/writes under the chosen key.',
        ),
  )
}

export const sourceJsx = `import { useEffect, useState } from 'react'
import useStorage from '@dedalik/use-react/useStorage'

const PREFIX = 'ur-docs.state-demo.'
const LEGACY_DEFAULT_FULL_KEY = 'ur-docs.state-demo.prefs'
const DEFAULT_KEY_SUFFIX = 'demo'

function StorageInner({ storageKey, useSession, initial }) {
  const storage = useSession ? sessionStorage : localStorage
  const fullKey = PREFIX + storageKey
  const [value, set] = useStorage(fullKey, initial, { storage })
  const safeValue = typeof value === 'string' ? value : value == null ? '' : String(value)
  const rawLine = JSON.stringify(value)
  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>useStorage(key, initial, {'{'} storage {'}'}) - JSON.stringify / JSON.parse; set('') keeps the key with an empty string.</p>
      <p style={{ margin: 0 }}>Value: <code>{safeValue}</code></p>
      <p style={{ margin: 0, fontSize: '0.8rem' }}>Serialized (default JSON — same as written to storage):</p>
      <p className='hook-demo-mono'>{rawLine}</p>
      <input value={safeValue} onChange={(e) => set(e.target.value)} />
      <button type='button' onClick={() => set('')}>set('') - clear value</button>
    </div>
  )
}

export default function StorageDemo() {
  const [useSession, setUseSession] = useState(false)
  const [key, setKey] = useState(DEFAULT_KEY_SUFFIX)
  const [initial, setInitial] = useState('hello')
  const [applied, setApplied] = useState({ useSession: false, key: DEFAULT_KEY_SUFFIX, initial: 'hello' })
  const [k, setK] = useState(0)
  const [liveStarted, setLiveStarted] = useState(false)

  useEffect(() => {
    try { localStorage.removeItem(LEGACY_DEFAULT_FULL_KEY) } catch { /* ignore */ }
    try { sessionStorage.removeItem(LEGACY_DEFAULT_FULL_KEY) } catch { /* ignore */ }
  }, [])

  const apply = () => {
    try {
      const st = useSession ? sessionStorage : localStorage
      st.removeItem(PREFIX + key)
    } catch { /* ignore */ }
    setApplied({ useSession, key, initial })
    setK((c) => c + 1)
    setLiveStarted(true)
  }
  return (
    <div className='hook-demo-surface'>
      <div className='hook-demo-toolbar-stack'>
        <div className='hook-demo-toolbar hook-demo-toolbar--even-3'>
          <div className='hook-demo-field'>
            <p className='hook-demo-label'>storage</p>
            <div className='hook-demo-segment' role='group' aria-label='Storage backend'>
              <button
                type='button'
                className={useSession ? undefined : 'is-active'}
                aria-pressed={!useSession}
                onClick={() => setUseSession(false)}
              >
                localStorage
              </button>
              <button
                type='button'
                className={useSession ? 'is-active' : undefined}
                aria-pressed={useSession}
                onClick={() => setUseSession(true)}
              >
                sessionStorage
              </button>
            </div>
          </div>
          <div className='hook-demo-field'>
            <p className='hook-demo-label'>key</p>
            <input value={key} onChange={(e) => setKey(e.target.value)} />
          </div>
          <div className='hook-demo-field'>
            <p className='hook-demo-label'>initial (remount)</p>
            <input value={initial} onChange={(e) => setInitial(e.target.value)} />
          </div>
        </div>
        <button type='button' className='hook-demo-primary-action' onClick={apply}>
          Apply / remount
        </button>
        <p className='hook-demo-hint' style={{ margin: 0, fontSize: '0.78rem' }}>
          Each &quot;Apply / remount&quot; clears the current key, then remounts so Initial (on remount) wins. Nothing is written until the first Apply.
        </p>
      </div>
      {liveStarted ? (
        <StorageInner key={k} storageKey={applied.key} useSession={applied.useSession} initial={applied.initial} />
      ) : (
        <p className='hook-demo-hint' style={{ margin: '0.75rem 0 0', fontSize: '0.9rem' }}>
          Click &quot;Apply / remount&quot; to start the live demo and allow reads/writes under the chosen key.
        </p>
      )}
    </div>
  )
}`

export default StorageDemo
