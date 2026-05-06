import React, { useState } from 'react'
import useTitle from '@dedalik/use-react/useTitle'

function TitleDemo() {
  const [topic, setTopic] = useState('Dashboard')
  const [restore, setRestore] = useState(true)
  const title = `use-react - ${topic}`

  useTitle(title, restore)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Writes document.title from React state and can restore the previous title on unmount.',
    ),
    React.createElement('p', { style: { margin: '0 0 10px', color: 'var(--vp-c-text-2)' } }, `Current title: ${title}`),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'repeat(3, max-content)' } },
      React.createElement('button', { type: 'button', onClick: () => setTopic('Dashboard') }, 'Dashboard'),
      React.createElement('button', { type: 'button', onClick: () => setTopic('Settings') }, 'Settings'),
      React.createElement(
        'button',
        { type: 'button', onClick: () => setRestore((value) => !value) },
        `Restore on unmount: ${restore ? 'on' : 'off'}`,
      ),
    ),
  )
}

export const sourceJsx = `import { useState } from 'react'
import useTitle from '@dedalik/use-react/useTitle'

export default function TitleDemo() {
  const [topic, setTopic] = useState('Dashboard')
  const [restore, setRestore] = useState(true)
  const title = \`use-react - \${topic}\`

  useTitle(title, restore)

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Writes document.title from React state and can restore the previous title on unmount.
      </p>
      <p style={{ margin: '0 0 10px', color: 'var(--vp-c-text-2)' }}>Current title: {title}</p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(3, max-content)' }}>
        <button type='button' onClick={() => setTopic('Dashboard')}>
          Dashboard
        </button>
        <button type='button' onClick={() => setTopic('Settings')}>
          Settings
        </button>
        <button type='button' onClick={() => setRestore((value) => !value)}>
          Restore on unmount: {restore ? 'on' : 'off'}
        </button>
      </div>
    </div>
  )
}`

export default TitleDemo
