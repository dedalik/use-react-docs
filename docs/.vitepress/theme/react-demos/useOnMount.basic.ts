import React, { useCallback, useState } from 'react'
import useOnMount from '@dedalik/use-react/useOnMount'
function OnMountDemo() {
  const [count, setCount] = useState(0)
  useOnMount(
    useCallback(() => {
      setCount((c) => c + 1)
    }, []),
  )

  return React.createElement(
    'div',
    { style: { display: 'grid', gap: '0.75rem' } },
    React.createElement('p', { style: { margin: 0 } }, `Mount callback runs: ${count}`),
  )
}

export const sourceJsx = `import { useState, useCallback } from 'react'
import useOnMount from '@dedalik/use-react/useOnMount'
export default function OnMountDemo() {
  const [count, setCount] = useState(0)
  useOnMount(
    useCallback(() => {
      setCount((c) => c + 1)
    }, []),
  )

  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <p style={{ margin: 0 }}>Mount callback runs: {count}</p>
    </div>
  )
}`

export default OnMountDemo
