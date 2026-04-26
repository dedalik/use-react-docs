import React, { useState } from 'react'
import useDebouncedRefHistory from '@dedalik/use-react/useDebouncedRefHistory'

function DebouncedRefHistoryDemo() {
  const [delay, setDelay] = useState(500)
  const [capacity, setCapacity] = useState(10)
  const { value, set, undo, redo, clear, canUndo, canRedo, history, pointer } = useDebouncedRefHistory('Type here', {
    delay,
    capacity,
  })

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'useDebouncedRefHistory(initial, { delay, capacity }) - after you pause typing for `delay` ms, a snapshot is recorded. undo/redo restore into `value`; clear() collapses to the current pointer.',
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar' },
      React.createElement(
        'div',
        { className: 'hook-demo-field' },
        React.createElement('p', { className: 'hook-demo-label' }, `delay (${delay} ms)`),
        React.createElement('input', {
          type: 'range',
          min: 0,
          max: 2000,
          step: 50,
          value: delay,
          onChange: (e) => setDelay(Number(e.target.value)),
        }),
      ),
      React.createElement(
        'div',
        { className: 'hook-demo-field' },
        React.createElement('p', { className: 'hook-demo-label' }, `capacity (${capacity})`),
        React.createElement('input', {
          type: 'range',
          min: 1,
          max: 20,
          value: capacity,
          onChange: (e) => setCapacity(Number(e.target.value) || 1),
        }),
      ),
    ),
    React.createElement('input', { type: 'text', value, onChange: (e) => set(e.target.value) }),
    React.createElement(
      'div',
      { style: { display: 'flex', flexWrap: 'wrap', gap: '0.45rem' } },
      React.createElement('button', { type: 'button', onClick: undo, disabled: !canUndo }, 'undo()'),
      React.createElement('button', { type: 'button', onClick: redo, disabled: !canRedo }, 'redo()'),
      React.createElement('button', { type: 'button', onClick: () => void clear() }, 'clear()'),
    ),
    React.createElement(
      'p',
      { style: { margin: 0, fontSize: '0.85rem' } },
      'pointer: ',
      pointer,
      ' | snapshots: ',
      history.length,
    ),
    React.createElement('p', { className: 'hook-demo-mono' }, JSON.stringify(history, null, 0)),
  )
}

export const sourceJsx = `import { useState } from 'react'
import useDebouncedRefHistory from '@dedalik/use-react/useDebouncedRefHistory'

export default function DebouncedRefHistoryDemo() {
  const [delay, setDelay] = useState(500)
  const [capacity, setCapacity] = useState(10)
  const { value, set, undo, redo, clear, canUndo, canRedo, history, pointer } = useDebouncedRefHistory(
    'Type here',
    { delay, capacity },
  )
  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>Debounced snapshot recording + capacity cap.</p>
      <div className='hook-demo-toolbar'>
        <div className='hook-demo-field'>
          <p className='hook-demo-label'>{'delay (' + delay + ' ms)'}</p>
          <input
            type='range'
            min={0}
            max={2000}
            step={50}
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
          />
        </div>
        <div className='hook-demo-field'>
          <p className='hook-demo-label'>{'capacity (' + capacity + ')'}</p>
          <input
            type='range'
            min={1}
            max={20}
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value) || 1)}
          />
        </div>
      </div>
      <input value={value} onChange={(e) => set(e.target.value)} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
        <button type='button' onClick={undo} disabled={!canUndo}>undo()</button>
        <button type='button' onClick={redo} disabled={!canRedo}>redo()</button>
        <button type='button' onClick={() => clear()}>clear()</button>
      </div>
      <p className='hook-demo-mono'>{JSON.stringify(history)}</p>
    </div>
  )
}`

export default DebouncedRefHistoryDemo
