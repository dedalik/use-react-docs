import React, { useCallback, useState } from 'react'
import useAsyncState from '@dedalik/use-react/useAsyncState'

type InnerProps = {
  delay: number
  fail: boolean
  immediate: boolean
  resetOnExecute: boolean
  initialState: string
}

function AsyncStateInner({ delay, fail, immediate, resetOnExecute, initialState }: InnerProps) {
  const producer = useCallback(async () => {
    await new Promise((r) => setTimeout(r, delay))
    if (fail) {
      throw new Error('Simulated request failure')
    }
    return `OK · ${new Date().toLocaleTimeString()}`
  }, [delay, fail])

  const { state, loading, error, execute } = useAsyncState(producer, {
    immediate,
    resetOnExecute,
    initialState: initialState || undefined,
  })

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'useAsyncState(producer, { immediate, resetOnExecute, initialState }) - execute() runs the producer; loading / error / state are managed.',
    ),
    React.createElement(
      'div',
      { style: { display: 'grid', gap: '0.45rem' } },
      React.createElement(
        'p',
        { style: { margin: 0, fontSize: '0.875rem' } },
        'state: ',
        React.createElement('code', null, state === undefined ? 'undefined' : String(state)),
      ),
      React.createElement('p', { style: { margin: 0, fontSize: '0.875rem' } }, 'loading: ', String(loading)),
      React.createElement(
        'p',
        { style: { margin: 0, fontSize: '0.875rem' } },
        'error: ',
        error == null
          ? React.createElement('span', null, 'null')
          : React.createElement(
              'code',
              { className: 'hook-live-demo__status--error' },
              String((error as Error).message || error),
            ),
      ),
    ),
    React.createElement(
      'div',
      { style: { display: 'flex', flexWrap: 'wrap', gap: '0.45rem' } },
      React.createElement('button', { type: 'button', onClick: () => void execute() }, 'execute()'),
    ),
  )
}

function AsyncStateDemo() {
  const [delay, setDelay] = useState(450)
  const [fail, setFail] = useState(false)
  const [immediate, setImmediate] = useState(false)
  const [resetOnExecute, setResetOnExecute] = useState(false)
  const [initialState, setInitialState] = useState('(initial)')
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
          React.createElement('p', { className: 'hook-demo-label' }, `delay (${delay} ms)`),
          React.createElement('input', {
            type: 'range',
            min: 0,
            max: 5000,
            step: 50,
            value: delay,
            onChange: (e) => setDelay(Number(e.target.value) || 0),
          }),
        ),
        React.createElement(
          'div',
          { className: 'hook-demo-field' },
          React.createElement('p', { className: 'hook-demo-label' }, 'initial state (seed)'),
          React.createElement('input', {
            type: 'text',
            value: initialState,
            onChange: (e) => setInitialState(e.target.value),
          }),
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            className: 'hook-demo-primary-action',
            style: { marginTop: '0.15rem' },
            onClick: () => setK((c) => c + 1),
          },
          'Remount (apply settings)',
        ),
      ),
      React.createElement(
        'div',
        { className: 'hook-demo-toolbar' },
        React.createElement(
          'div',
          { className: 'hook-demo-field' },
          React.createElement('p', { className: 'hook-demo-label' }, 'options'),
          React.createElement(
            'div',
            { className: 'hook-demo-segment', role: 'group', 'aria-label': 'Async state options' },
            React.createElement(
              'button',
              {
                type: 'button',
                className: immediate ? 'is-active' : undefined,
                'aria-pressed': immediate,
                onClick: () => setImmediate((v) => !v),
              },
              'immediate',
            ),
            React.createElement(
              'button',
              {
                type: 'button',
                className: resetOnExecute ? 'is-active' : undefined,
                'aria-pressed': resetOnExecute,
                onClick: () => setResetOnExecute((v) => !v),
              },
              'resetOnExecute',
            ),
            React.createElement(
              'button',
              {
                type: 'button',
                className: fail ? 'is-active' : undefined,
                'aria-pressed': fail,
                onClick: () => setFail((v) => !v),
              },
              'force error',
            ),
          ),
        ),
      ),
    ),
    React.createElement(AsyncStateInner, {
      key: k,
      delay,
      fail,
      immediate,
      resetOnExecute,
      initialState,
    }),
  )
}

export const sourceJsx = `import { useCallback, useState } from 'react'
import useAsyncState from '@dedalik/use-react/useAsyncState'

function AsyncStateInner({ delay, fail, immediate, resetOnExecute, initialState }) {
  const producer = useCallback(async () => {
    await new Promise((r) => setTimeout(r, delay))
    if (fail) throw new Error('Simulated request failure')
    return \`OK · \${new Date().toLocaleTimeString()}\`
  }, [delay, fail])

  const { state, loading, error, execute } = useAsyncState(producer, {
    immediate,
    resetOnExecute,
    initialState: initialState || undefined,
  })

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>execute() starts producer and updates loading/error/state.</p>
      <p style={{ margin: 0 }}>state: <code>{String(state)}</code></p>
      <p style={{ margin: 0 }}>loading: {String(loading)}</p>
      <p style={{ margin: 0 }}>
        error:{' '}
        {error == null
          ? 'null'
          : <code className='hook-live-demo__status--error'>{String(error?.message ?? error)}</code>}
      </p>
      <button type='button' onClick={() => void execute()}>execute()</button>
    </div>
  )
}

export default function AsyncStateDemo() {
  const [delay, setDelay] = useState(450)
  const [fail, setFail] = useState(false)
  const [immediate, setImmediate] = useState(false)
  const [resetOnExecute, setResetOnExecute] = useState(false)
  const [initialState, setInitialState] = useState('(initial)')
  const [k, setK] = useState(0)

  return (
    <div className='hook-demo-surface'>
      <div className='hook-demo-toolbar-stack'>
        <div className='hook-demo-toolbar' style={{ gridTemplateColumns: '1fr' }}>
          <div className='hook-demo-field'>
            <p className='hook-demo-label'>{'delay (' + delay + ' ms)'}</p>
            <input
              type='range'
              min={0}
              max={5000}
              step={50}
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value) || 0)}
            />
          </div>
          <div className='hook-demo-field'>
            <p className='hook-demo-label'>initial state (seed)</p>
            <input value={initialState} onChange={(e) => setInitialState(e.target.value)} />
          </div>
          <button
            type='button'
            className='hook-demo-primary-action'
            style={{ marginTop: '0.15rem' }}
            onClick={() => setK((c) => c + 1)}
          >
            Remount (apply settings)
          </button>
        </div>

        <div className='hook-demo-toolbar'>
          <div className='hook-demo-field'>
            <p className='hook-demo-label'>options</p>
            <div className='hook-demo-segment' role='group' aria-label='Async state options'>
              <button
                type='button'
                className={immediate ? 'is-active' : undefined}
                aria-pressed={immediate}
                onClick={() => setImmediate((v) => !v)}
              >
                immediate
              </button>
              <button
                type='button'
                className={resetOnExecute ? 'is-active' : undefined}
                aria-pressed={resetOnExecute}
                onClick={() => setResetOnExecute((v) => !v)}
              >
                resetOnExecute
              </button>
              <button
                type='button'
                className={fail ? 'is-active' : undefined}
                aria-pressed={fail}
                onClick={() => setFail((v) => !v)}
              >
                force error
              </button>
            </div>
          </div>
        </div>
      </div>
      <AsyncStateInner
        key={k}
        delay={delay}
        fail={fail}
        immediate={immediate}
        resetOnExecute={resetOnExecute}
        initialState={initialState}
      />
    </div>
  )
}`

export default AsyncStateDemo
