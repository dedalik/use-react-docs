import React, { useMemo, useState } from 'react'
import useElementVisibility from '@dedalik/use-react/useElementVisibility'

function ElementVisibilityDemo() {
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
  const [threshold, setThreshold] = useState(0.75)
  const [sentinelEl, setSentinelEl] = useState<HTMLDivElement | null>(null)

  const sentinelRef = useMemo(() => ({ current: sentinelEl }), [sentinelEl])

  const options = useMemo<IntersectionObserverInit>(
    () => ({
      root: rootElement ?? undefined,
      rootMargin: '0px',
      threshold,
    }),
    [rootElement, threshold],
  )

  const visible = useElementVisibility(sentinelRef, options)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Scroll inside the panel until the sentinel is visible. Threshold controls how much must intersect.',
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: '1fr auto' } },
      React.createElement(
        'label',
        { className: 'hook-demo-field' },
        React.createElement('p', { className: 'hook-demo-label' }, `threshold (${threshold.toFixed(2)})`),
        React.createElement('input', {
          type: 'range',
          min: 0,
          max: 1,
          step: 0.05,
          value: threshold,
          onChange: (event) => setThreshold(Number(event.target.value)),
        }),
      ),
      React.createElement(
        'p',
        { style: { margin: 0, alignSelf: 'end' } },
        'Visible: ',
        React.createElement('strong', null, visible ? 'yes' : 'no'),
      ),
    ),
    React.createElement(
      'div',
      {
        ref: setRootElement,
        style: {
          marginTop: 10,
          height: 230,
          overflow: 'auto',
          border: '1px solid var(--vp-c-divider)',
          borderRadius: 12,
          background: 'var(--vp-c-bg-soft)',
        },
      },
      React.createElement(
        'div',
        { style: { padding: 16, height: 900, boxSizing: 'border-box' } },
        React.createElement(
          'p',
          { style: { marginTop: 0, color: 'var(--vp-c-text-2)' } },
          'Scroll down to the sentinel block.',
        ),
        React.createElement('div', { style: { height: 520 } }),
        React.createElement(
          'div',
          {
            ref: setSentinelEl,
            style: {
              padding: 12,
              borderRadius: 12,
              border: '1px solid var(--vp-c-divider)',
              background: visible ? 'var(--vp-c-success-soft, #e8f7ef)' : 'var(--vp-c-bg)',
              transition: 'background-color 120ms ease',
            },
          },
          'Load more sentinel (demo)',
        ),
      ),
    ),
  )
}

export const sourceJsx = `import { useMemo, useState } from 'react'
import useElementVisibility from '@dedalik/use-react/useElementVisibility'

export default function ElementVisibilityDemo() {
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
  const [threshold, setThreshold] = useState(0.75)
  const [sentinelEl, setSentinelEl] = useState<HTMLDivElement | null>(null)

  const sentinelRef = useMemo(() => ({ current: sentinelEl }), [sentinelEl])

  const options = useMemo<IntersectionObserverInit>(
    () => ({
      root: rootElement ?? undefined,
      rootMargin: '0px',
      threshold,
    }),
    [rootElement, threshold],
  )

  const visible = useElementVisibility(sentinelRef, options)

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Scroll inside the panel until the sentinel is visible. Threshold controls how much must intersect.
      </p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: '1fr auto' }}>
        <label className='hook-demo-field'>
          <p className='hook-demo-label'>{'threshold (' + threshold.toFixed(2) + ')'}</p>
          <input
            type='range'
            min={0}
            max={1}
            step={0.05}
            value={threshold}
            onChange={(event) => setThreshold(Number(event.target.value))}
          />
        </label>
        <p style={{ margin: 0, alignSelf: 'end' }}>
          Visible: <strong>{visible ? 'yes' : 'no'}</strong>
        </p>
      </div>

      <div
        ref={setRootElement}
        style={{
          marginTop: 10,
          height: 230,
          overflow: 'auto',
          border: '1px solid var(--vp-c-divider)',
          borderRadius: 12,
          background: 'var(--vp-c-bg-soft)',
        }}
      >
        <div style={{ padding: 16, height: 900, boxSizing: 'border-box' }}>
          <p style={{ marginTop: 0, color: 'var(--vp-c-text-2)' }}>Scroll down to the sentinel block.</p>
          <div style={{ height: 520 }} />
          <div
            ref={setSentinelEl}
            style={{
              padding: 12,
              borderRadius: 12,
              border: '1px solid var(--vp-c-divider)',
              background: visible ? 'var(--vp-c-success-soft, #e8f7ef)' : 'var(--vp-c-bg)',
            }}
          >
            Load more sentinel (demo)
          </div>
        </div>
      </div>
    </div>
  )
}`

export default ElementVisibilityDemo
