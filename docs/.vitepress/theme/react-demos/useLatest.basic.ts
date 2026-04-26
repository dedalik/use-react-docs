import React, { useEffect, useState } from 'react'
import useLatest from '@dedalik/use-react/useLatest'

function LatestDemo() {
  const [count, setCount] = useState(0)
  const [intervalMs, setIntervalMs] = useState(500)
  const latest = useLatest(count)
  const [fromClosure, setFromClosure] = useState(0)
  const [fromRef, setFromRef] = useState(0)

  // Deliberately omit `count` from deps: the interval keeps a stale `count` from
  // when the effect was last created; `latest.current` still tracks the live value.
  useEffect(() => {
    const id = window.setInterval(() => {
      setFromClosure(count)
      setFromRef(latest.current)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs, latest])

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      "useLatest(value) - a stable ref with .current always equal to the latest value. The effect does not list `count` in deps, so the callback's `count` is stale; `latest.current` is not.",
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar' },
      React.createElement(
        'div',
        { className: 'hook-demo-field', style: { gridColumn: '1 / -1' } },
        React.createElement('p', { className: 'hook-demo-label' }, `poll every ${intervalMs} ms`),
        React.createElement('input', {
          type: 'range',
          min: 200,
          max: 2000,
          step: 100,
          value: intervalMs,
          onChange: (e) => setIntervalMs(Number(e.target.value)),
        }),
      ),
    ),
    React.createElement(
      'div',
      { style: { display: 'flex', flexWrap: 'wrap', gap: '0.45rem' } },
      React.createElement('button', { type: 'button', onClick: () => setCount((c) => c - 1) }, 'count −1'),
      React.createElement('button', { type: 'button', onClick: () => setCount((c) => c + 1) }, 'count +1'),
    ),
    React.createElement(
      'p',
      { style: { margin: 0 } },
      'count (state): ',
      React.createElement('strong', null, String(count)),
    ),
    React.createElement(
      'p',
      { className: 'hook-demo-mono' },
      'Interval snapshot - stale `count` in closure: ' +
        String(fromClosure) +
        '  |  `latest.current`: ' +
        String(fromRef),
    ),
  )
}

export const sourceJsx = `import { useEffect, useState } from 'react'
import useLatest from '@dedalik/use-react/useLatest'

export default function LatestDemo() {
  const [count, setCount] = useState(0)
  const [intervalMs, setIntervalMs] = useState(500)
  const latest = useLatest(count)
  const [fromClosure, setFromClosure] = useState(0)
  const [fromRef, setFromRef] = useState(0)

  // Omit \`count\` from deps so the interval closure keeps a stale \`count\`.
  useEffect(() => {
    const id = setInterval(() => {
      setFromClosure(count)
      setFromRef(latest.current)
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs, latest])

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        The effect omits <code>count</code> from the dependency list so the callback sees a stale
        <code>count</code>, while <code>latest.current</code> always matches the latest render.
      </p>
      <div className='hook-demo-toolbar'>
        <div className='hook-demo-field' style={{ gridColumn: '1 / -1' }}>
          <p className='hook-demo-label'>{'poll every ' + intervalMs + ' ms'}</p>
          <input
            type='range'
            min={200}
            max={2000}
            step={100}
            value={intervalMs}
            onChange={(e) => setIntervalMs(Number(e.target.value))}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
        <button type='button' onClick={() => setCount((c) => c - 1)}>count −1</button>
        <button type='button' onClick={() => setCount((c) => c + 1)}>count +1</button>
      </div>
      <p style={{ margin: 0 }}>
        count (state): <strong>{count}</strong>
      </p>
      <p className='hook-demo-mono'>
        {\`captured: count = \${fromClosure}  |  latest.current = \${fromRef}\`}
      </p>
    </div>
  )
}`

export default LatestDemo
