import React, { useState } from 'react'
import useEventCallback from '@dedalik/use-react/useEventCallback'
function EventCallbackDemo() {
  const [step, setStep] = useState(1)
  const [count, setCount] = useState(0)
  const increment = useEventCallback(() => setCount((c) => c + step))

  return React.createElement(
    'div',
    { style: { display: 'grid', gap: '0.75rem' } },
    React.createElement('input', {
      type: 'number',
      value: step,
      min: 1,
      onChange: (e) => setStep(Number(e.target.value || 1)),
    }),
    React.createElement('button', { type: 'button', onClick: increment }, `Increment by ${step}`),
    React.createElement('p', { style: { margin: 0 } }, `Count: ${count}`),
  )
}

export const sourceJsx = `import { useState } from 'react'
import useEventCallback from '@dedalik/use-react/useEventCallback'
export default function EventCallbackDemo() {
  const [step, setStep] = useState(1)
  const [count, setCount] = useState(0)
  const increment = useEventCallback(() => setCount((c) => c + step))

  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <input
        type='number'
        value={step}
        min={1}
        onChange={(e) => setStep(Number(e.target.value || 1))}
      />
      <button type='button' onClick={increment}>Increment by {step}</button>
      <p style={{ margin: 0 }}>Count: {count}</p>
    </div>
  )
}`

export default EventCallbackDemo
