import React, { useEffect, useState } from 'react'
import usePageVisibility from '@dedalik/use-react/usePageVisibility'

function PageVisibilityDemo() {
  const isVisible = usePageVisibility()
  const [ticks, setTicks] = useState(0)
  const [hasFocus, setHasFocus] = useState(typeof document !== 'undefined' ? document.hasFocus() : true)

  useEffect(() => {
    if (!isVisible) return
    const id = window.setInterval(() => {
      setTicks((value) => value + 1)
    }, 1000)
    return () => window.clearInterval(id)
  }, [isVisible])

  useEffect(() => {
    const onFocus = () => setHasFocus(true)
    const onBlur = () => setHasFocus(false)
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Shows document visibility (tab hidden vs visible). On multi-monitor setups, a visible tab can stay "visible" even without focus.',
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'max-content max-content max-content' } },
      React.createElement('p', { style: { margin: 0 } }, `Visible: ${isVisible ? 'yes' : 'no'}`),
      React.createElement('p', { style: { margin: 0 } }, `Window focused: ${hasFocus ? 'yes' : 'no'}`),
      React.createElement('p', { style: { margin: 0 } }, `Active seconds: ${ticks}`),
    ),
    React.createElement(
      'p',
      { style: { margin: '10px 0 0', color: 'var(--vp-c-text-2)' } },
      isVisible
        ? 'To pause timer, hide/minimize this tab. Just moving to another monitor may keep it visible.'
        : 'Tab hidden - timer paused until you return.',
    ),
  )
}

export const sourceJsx = `import { useEffect, useState } from 'react'
import usePageVisibility from '@dedalik/use-react/usePageVisibility'

export default function PageVisibilityDemo() {
  const isVisible = usePageVisibility()
  const [ticks, setTicks] = useState(0)
  const [hasFocus, setHasFocus] = useState(typeof document !== 'undefined' ? document.hasFocus() : true)

  useEffect(() => {
    if (!isVisible) return
    const id = window.setInterval(() => {
      setTicks((value) => value + 1)
    }, 1000)
    return () => window.clearInterval(id)
  }, [isVisible])

  useEffect(() => {
    const onFocus = () => setHasFocus(true)
    const onBlur = () => setHasFocus(false)
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Shows document visibility (tab hidden vs visible). On multi-monitor setups, a visible tab can stay "visible"
        even without focus.
      </p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'max-content max-content max-content' }}>
        <p style={{ margin: 0 }}>Visible: {isVisible ? 'yes' : 'no'}</p>
        <p style={{ margin: 0 }}>Window focused: {hasFocus ? 'yes' : 'no'}</p>
        <p style={{ margin: 0 }}>Active seconds: {ticks}</p>
      </div>

      <p style={{ margin: '10px 0 0', color: 'var(--vp-c-text-2)' }}>
        {isVisible
          ? 'To pause timer, hide/minimize this tab. Just moving to another monitor may keep it visible.'
          : 'Tab hidden - timer paused until you return.'}
      </p>
    </div>
  )
}`

export default PageVisibilityDemo
