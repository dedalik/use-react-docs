import React, { useState } from 'react'
import useManualRefHistory from '@dedalik/use-react/useManualRefHistory'

function ManualRefHistoryDemo() {
  const [capacity, setCapacity] = useState(8)
  const { value, set, commit, undo, redo, clear, canUndo, canRedo, history, pointer } = useManualRefHistory('Draft', {
    capacity,
  })
  const clearAll = () => {
    set('')
    // Defer to next tick so `clear()` uses the updated value.
    window.setTimeout(() => clear(), 0)
  }

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'useManualRefHistory(initial, { capacity }) - edits update `value` but history updates only on commit(). clear() now empties input and collapses history.',
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
      React.createElement('button', { type: 'button', onClick: () => void commit() }, 'commit()'),
      React.createElement('button', { type: 'button', onClick: undo, disabled: !canUndo }, 'undo()'),
      React.createElement('button', { type: 'button', onClick: redo, disabled: !canRedo }, 'redo()'),
      React.createElement('button', { type: 'button', onClick: clearAll }, 'clear()'),
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
import useManualRefHistory from '@dedalik/use-react/useManualRefHistory'

export default function ManualRefHistoryDemo() {
  const [capacity, setCapacity] = useState(8)
  const { value, set, commit, undo, redo, clear, canUndo, canRedo, history, pointer } =
    useManualRefHistory('Draft', { capacity })
  const clearAll = () => {
    set('')
    setTimeout(() => clear(), 0)
  }
  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>commit() records; undo/redo; clear() now empties input and collapses history.</p>
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
        <button type='button' onClick={() => commit()}>commit()</button>
        <button type='button' onClick={undo} disabled={!canUndo}>undo()</button>
        <button type='button' onClick={redo} disabled={!canRedo}>redo()</button>
        <button type='button' onClick={clearAll}>clear()</button>
      </div>
      <p style={{ margin: 0, fontSize: '0.85rem' }}>pointer {pointer}</p>
      <p className='hook-demo-mono'>{JSON.stringify(history)}</p>
    </div>
  )
}`

export default ManualRefHistoryDemo
