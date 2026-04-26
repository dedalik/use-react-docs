import React, { useState } from 'react'
import useRefHistory from '@dedalik/use-react/useRefHistory'

function RefHistoryDemo() {
  const [capacity, setCapacity] = useState(6)
  const { value, set, undo, redo, clear, canUndo, canRedo, pointer, history } = useRefHistory('Draft', { capacity })
  const clearAll = () => {
    set('')
    // Let state apply first, then collapse history to the empty snapshot.
    window.setTimeout(() => clear(), 0)
  }

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'useRefHistory(initial, { capacity }) - every set() appends a snapshot; capacity trims the oldest entries. undo / redo move the pointer; clear() empties input and collapses history.',
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar' },
      React.createElement(
        'div',
        { className: 'hook-demo-field', style: { gridColumn: '1 / -1' } },
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
      React.createElement('button', { type: 'button', onClick: clearAll }, 'clear()'),
    ),
    React.createElement(
      'p',
      { style: { margin: 0, fontSize: '0.85rem' } },
      'pointer: ',
      pointer,
      ' | length: ',
      history.length,
      ' | canUndo: ',
      String(canUndo),
      ' | canRedo: ',
      String(canRedo),
    ),
    React.createElement('p', { className: 'hook-demo-mono' }, JSON.stringify(history, null, 0)),
  )
}

export const sourceJsx = `import { useState } from 'react'
import useRefHistory from '@dedalik/use-react/useRefHistory'

export default function RefHistoryDemo() {
  const [capacity, setCapacity] = useState(6)
  const { value, set, undo, redo, clear, canUndo, canRedo, pointer, history } = useRefHistory(
    'Draft',
    { capacity },
  )
  const clearAll = () => {
    set('')
    setTimeout(() => clear(), 0)
  }

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        useRefHistory(initial, { capacity }) - snapshots on each set; clear() empties input and collapses history.
      </p>
      <div className='hook-demo-toolbar'>
        <div className='hook-demo-field' style={{ gridColumn: '1 / -1' }}>
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
        <button type='button' onClick={undo} disabled={!canUndo}>
          undo()
        </button>
        <button type='button' onClick={redo} disabled={!canRedo}>
          redo()
        </button>
        <button type='button' onClick={clearAll}>clear()</button>
      </div>
      <p style={{ margin: 0, fontSize: '0.85rem' }}>pointer {pointer}</p>
      <p className='hook-demo-mono'>{JSON.stringify(history)}</p>
    </div>
  )
}`

export default RefHistoryDemo
