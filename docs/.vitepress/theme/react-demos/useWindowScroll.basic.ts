import React, { useMemo } from 'react'
import useWindowScroll from '@dedalik/use-react/useWindowScroll'

function WindowScrollDemo() {
  const { x, y } = useWindowScroll()

  const progress = useMemo(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return 0
    const maxY = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
    return Math.max(0, Math.min(1, y / maxY))
  }, [y])

  const scrollTo = (ratio: number) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    const maxY = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)
    window.scrollTo({ top: Math.round(maxY * ratio), behavior: 'smooth' })
  }

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Scroll the docs page to update values. Buttons below scroll to top, middle, or near bottom.',
    ),
    React.createElement(
      'p',
      { style: { margin: '0 0 8px' } },
      'scrollX / scrollY: ',
      React.createElement('strong', null, `${Math.round(x)} / ${Math.round(y)}`),
    ),
    React.createElement(
      'div',
      {
        style: {
          height: 10,
          borderRadius: 999,
          background: 'var(--vp-c-default-soft)',
          overflow: 'hidden',
        },
      },
      React.createElement('div', {
        style: {
          height: '100%',
          width: `${progress * 100}%`,
          background: 'var(--vp-c-brand-1)',
          transition: 'width 120ms ease',
        },
      }),
    ),
    React.createElement(
      'p',
      { style: { margin: '8px 0 10px', color: 'var(--vp-c-text-2)' } },
      `Page progress: ${Math.round(progress * 100)}%`,
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' } },
      React.createElement('button', { type: 'button', onClick: () => scrollTo(0) }, 'Top'),
      React.createElement('button', { type: 'button', onClick: () => scrollTo(0.5) }, 'Middle'),
      React.createElement('button', { type: 'button', onClick: () => scrollTo(0.95) }, 'Near bottom'),
    ),
  )
}

export const sourceJsx = `import { useMemo } from 'react'
import useWindowScroll from '@dedalik/use-react/useWindowScroll'

export default function WindowScrollDemo() {
  const { x, y } = useWindowScroll()

  const progress = useMemo(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return 0
    const maxY = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
    return Math.max(0, Math.min(1, y / maxY))
  }, [y])

  const scrollTo = (ratio: number) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    const maxY = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)
    window.scrollTo({ top: Math.round(maxY * ratio), behavior: 'smooth' })
  }

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Scroll the docs page to update values. Buttons below scroll to top, middle, or near bottom.
      </p>
      <p style={{ margin: '0 0 8px' }}>
        scrollX / scrollY: <strong>{Math.round(x)} / {Math.round(y)}</strong>
      </p>

      <div
        style={{
          height: 10,
          borderRadius: 999,
          background: 'var(--vp-c-default-soft)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: progress * 100 + '%',
            background: 'var(--vp-c-brand-1)',
          }}
        />
      </div>
      <p style={{ margin: '8px 0 10px', color: 'var(--vp-c-text-2)' }}>Page progress: {Math.round(progress * 100)}%</p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        <button type='button' onClick={() => scrollTo(0)}>
          Top
        </button>
        <button type='button' onClick={() => scrollTo(0.5)}>
          Middle
        </button>
        <button type='button' onClick={() => scrollTo(0.95)}>
          Near bottom
        </button>
      </div>
    </div>
  )
}`

export default WindowScrollDemo
