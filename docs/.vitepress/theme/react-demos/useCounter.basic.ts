import React, { useRef, useState } from 'react'
import useCounter from '@dedalik/use-react/useCounter'

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function CounterCore({ initial, min, max }: { initial: number; min: number; max: number }) {
  const { count, inc, dec, set, reset } = useCounter(initial, { min, max })
  const [target, setTarget] = useState(String(initial))
  const stepRef = useRef<HTMLInputElement>(null)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'useCounter(initial, { min, max }) - every update is clamped by min/max. Configure all numeric options with draggable sliders above, then remount to apply.',
    ),
    React.createElement(
      'p',
      { style: { margin: 0, fontSize: '0.9rem' } },
      'count: ',
      React.createElement('strong', null, String(count)),
    ),
    React.createElement(
      'div',
      { style: { display: 'flex', flexWrap: 'wrap', gap: '0.45rem', alignItems: 'center' } },
      React.createElement('button', { type: 'button', onClick: () => dec(1) }, 'dec(1)'),
      React.createElement('button', { type: 'button', onClick: () => inc(1) }, 'inc(1)'),
      React.createElement(
        'label',
        { className: 'hook-demo-row' },
        'Step ',
        React.createElement('input', {
          ref: stepRef,
          type: 'number',
          min: 1,
          defaultValue: 3,
        }),
        React.createElement(
          'button',
          {
            type: 'button',
            onClick: () => {
              const s = stepRef.current ? Math.max(1, Number(stepRef.current.value) || 1) : 1
              dec(s)
            },
          },
          'dec(step)',
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            onClick: () => {
              const s = stepRef.current ? Math.max(1, Number(stepRef.current.value) || 1) : 1
              inc(s)
            },
          },
          'inc(step)',
        ),
      ),
    ),
    React.createElement(
      'div',
      { style: { display: 'flex', flexWrap: 'wrap', gap: '0.45rem', alignItems: 'center' } },
      React.createElement('input', {
        type: 'number',
        value: target,
        onChange: (e) => setTarget(e.target.value),
        'aria-label': 'set to value',
      }),
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: () => {
            const n = Number(target)
            if (Number.isFinite(n)) set(n)
          },
        },
        'set(value)',
      ),
      React.createElement('button', { type: 'button', onClick: () => void reset() }, 'reset()'),
    ),
  )
}

function CounterDemo() {
  const [initial, setInitial] = useState(5)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(20)
  const [k, setK] = useState(0)

  const initialSafe = Math.min(Math.max(initial, min), max)

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
          React.createElement('p', { className: 'hook-demo-label' }, 'initial'),
          React.createElement('p', { style: { margin: 0, fontSize: '0.85rem' } }, String(initialSafe)),
          React.createElement('input', {
            type: 'range',
            min,
            max,
            value: initialSafe,
            onChange: (e) => setInitial(clamp(Number(e.target.value), min, max)),
          }),
        ),
        React.createElement(
          'div',
          { className: 'hook-demo-field' },
          React.createElement('p', { className: 'hook-demo-label' }, 'min'),
          React.createElement('p', { style: { margin: 0, fontSize: '0.85rem' } }, String(min)),
          React.createElement('input', {
            type: 'range',
            min: -20,
            max: max - 1,
            value: Math.min(min, max - 1),
            onChange: (e) => {
              const nextMin = Math.min(Number(e.target.value), max - 1)
              setMin(nextMin)
              setInitial((prev) => clamp(prev, nextMin, max))
            },
          }),
        ),
        React.createElement(
          'div',
          { className: 'hook-demo-field' },
          React.createElement('p', { className: 'hook-demo-label' }, 'max'),
          React.createElement('p', { style: { margin: 0, fontSize: '0.85rem' } }, String(max)),
          React.createElement('input', {
            type: 'range',
            min: min + 1,
            max: 60,
            value: Math.max(max, min + 1),
            onChange: (e) => {
              const nextMax = Math.max(Number(e.target.value), min + 1)
              setMax(nextMax)
              setInitial((prev) => clamp(prev, min, nextMax))
            },
          }),
        ),
      ),
      React.createElement(
        'button',
        {
          type: 'button',
          className: 'hook-demo-primary-action',
          onClick: () => setK((c) => c + 1),
        },
        'Apply & remount',
      ),
    ),
    React.createElement(CounterCore, { key: k, initial: initialSafe, min, max }),
  )
}

export const sourceJsx = `import { useRef, useState } from 'react'
import useCounter from '@dedalik/use-react/useCounter'

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n))
}

function CounterCore({ initial, min, max }) {
  const { count, inc, dec, set, reset } = useCounter(initial, { min, max })
  const [target, setTarget] = useState(String(count))
  const stepRef = useRef(null)

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        useCounter(initial, { min, max }) - clamped numeric updates. Sliders above let you tweak
        bounds and initial quickly.
      </p>
      <p style={{ margin: 0, fontSize: '0.9rem' }}>
        count: <strong>{count}</strong>
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', alignItems: 'center' }}>
        <button type='button' onClick={() => dec(1)}>dec(1)</button>
        <button type='button' onClick={() => inc(1)}>inc(1)</button>
        <label>
          Step <input ref={stepRef} type='number' min={1} defaultValue={3} />
        </label>
        <button type='button' onClick={() => dec(Math.max(1, Number(stepRef.current?.value) || 1))}>
          dec(step)
        </button>
        <button type='button' onClick={() => inc(Math.max(1, Number(stepRef.current?.value) || 1))}>
          inc(step)
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', alignItems: 'center' }}>
        <input
          type='number'
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <button
          type='button'
          onClick={() => {
            const n = Number(target)
            if (Number.isFinite(n)) set(n)
          }}
        >
          set(value)
        </button>
        <button type='button' onClick={() => reset()}>reset()</button>
      </div>
    </div>
  )
}

export default function CounterDemo() {
  const [initial, setInitial] = useState(5)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(20)
  const [k, setK] = useState(0)
  const initialSafe = Math.min(Math.max(initial, min), max)
  return (
    <div className='hook-demo-surface'>
      <div className='hook-demo-toolbar-stack'>
        <div className='hook-demo-toolbar hook-demo-toolbar--even-3'>
          <div className='hook-demo-field'>
            <p className='hook-demo-label'>initial</p>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>{initialSafe}</p>
            <input
              type='range'
              min={min}
              max={max}
              value={initialSafe}
              onChange={(e) => setInitial(clamp(Number(e.target.value), min, max))}
            />
          </div>
          <div className='hook-demo-field'>
            <p className='hook-demo-label'>min</p>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>{min}</p>
            <input
              type='range'
              min={-20}
              max={max - 1}
              value={Math.min(min, max - 1)}
              onChange={(e) => {
                const nextMin = Math.min(Number(e.target.value), max - 1)
                setMin(nextMin)
                setInitial((prev) => clamp(prev, nextMin, max))
              }}
            />
          </div>
          <div className='hook-demo-field'>
            <p className='hook-demo-label'>max</p>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>{max}</p>
            <input
              type='range'
              min={min + 1}
              max={60}
              value={Math.max(max, min + 1)}
              onChange={(e) => {
                const nextMax = Math.max(Number(e.target.value), min + 1)
                setMax(nextMax)
                setInitial((prev) => clamp(prev, min, nextMax))
              }}
            />
          </div>
        </div>
        <button type='button' className='hook-demo-primary-action' onClick={() => setK((c) => c + 1)}>
          Apply & remount
        </button>
      </div>
      <CounterCore key={k} initial={initialSafe} min={min} max={max} />
    </div>
  )
}`

export default CounterDemo
