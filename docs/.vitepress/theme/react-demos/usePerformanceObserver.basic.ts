import React, { useMemo, useState } from 'react'
import usePerformanceObserver from '@dedalik/use-react/usePerformanceObserver'

function PerformanceObserverDemo() {
  const [busy, setBusy] = useState(false)
  const observerOptions = useMemo(
    () => ({
      entryTypes: ['navigation', 'resource', 'measure'],
      buffered: true,
    }),
    [],
  )

  const { isSupported, entries } = usePerformanceObserver(observerOptions)
  const recent = entries.slice(-8).reverse()
  const counts = useMemo(
    () =>
      entries.reduce<Record<string, number>>((acc, entry) => {
        acc[entry.entryType] = (acc[entry.entryType] ?? 0) + 1
        return acc
      }, {}),
    [entries],
  )

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Click buttons to generate entries: fetch adds "resource", timed task adds "measure".',
    ),
    !isSupported
      ? React.createElement(
          'p',
          { style: { margin: '10px 0 0', color: 'var(--vp-c-text-2)' } },
          'PerformanceObserver is not available in this browser.',
        )
      : React.createElement(
          React.Fragment,
          null,
          React.createElement(
            'div',
            { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'max-content max-content' } },
            React.createElement(
              'button',
              {
                type: 'button',
                disabled: busy,
                onClick: async () => {
                  setBusy(true)
                  try {
                    await fetch(window.location.href, { cache: 'no-store' })
                  } finally {
                    setBusy(false)
                  }
                },
              },
              busy ? 'Loading...' : 'Generate resource entry',
            ),
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: () => {
                  const markStart = `demo-start-${Date.now()}`
                  const markEnd = `demo-end-${Date.now()}`
                  const measureName = `demo-task-${Date.now()}`
                  performance.mark(markStart)
                  let total = 0
                  for (let i = 0; i < 50000; i += 1) total += Math.sqrt(i)
                  performance.mark(markEnd)
                  performance.measure(measureName, markStart, markEnd)
                  void total
                },
              },
              'Generate measure entry',
            ),
          ),
          React.createElement(
            'p',
            { style: { margin: '10px 0 6px', color: 'var(--vp-c-text-2)' } },
            `Total entries: ${entries.length} - showing ${recent.length} latest`,
          ),
          React.createElement(
            'p',
            { style: { margin: '0 0 10px', color: 'var(--vp-c-text-2)' } },
            `navigation: ${counts.navigation ?? 0} | resource: ${counts.resource ?? 0} | measure: ${counts.measure ?? 0}`,
          ),
          React.createElement(
            'ul',
            { style: { margin: 0, paddingInlineStart: 18 } },
            recent.map((entry, index) =>
              React.createElement(
                'li',
                { key: `${entry.entryType}-${entry.name}-${index}` },
                `${entry.entryType} - ${entry.name || '-'} - ${Math.round(entry.startTime)}ms`,
              ),
            ),
          ),
        ),
  )
}

export const sourceJsx = `import { useMemo, useState } from 'react'
import usePerformanceObserver from '@dedalik/use-react/usePerformanceObserver'

export default function PerformanceObserverDemo() {
  const [busy, setBusy] = useState(false)
  const observerOptions = useMemo(
    () => ({
      entryTypes: ['navigation', 'resource', 'measure'],
      buffered: true,
    }),
    [],
  )

  const { isSupported, entries } = usePerformanceObserver(observerOptions)
  const recent = entries.slice(-8).reverse()
  const counts = useMemo(
    () =>
      entries.reduce((acc, entry) => {
        acc[entry.entryType] = (acc[entry.entryType] ?? 0) + 1
        return acc
      }, {}),
    [entries]
  )

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>Click buttons to generate entries: fetch adds "resource", timed task adds "measure".</p>

      {!isSupported ? (
        <p style={{ margin: '10px 0 0', color: 'var(--vp-c-text-2)' }}>PerformanceObserver is not available in this browser.</p>
      ) : (
        <>
          <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'max-content max-content' }}>
            <button
              type='button'
              disabled={busy}
              onClick={async () => {
                setBusy(true)
                try {
                  await fetch(window.location.href, { cache: 'no-store' })
                } finally {
                  setBusy(false)
                }
              }}
            >
              {busy ? 'Loading...' : 'Generate resource entry'}
            </button>
            <button
              type='button'
              onClick={() => {
                const markStart = \`demo-start-\${Date.now()}\`
                const markEnd = \`demo-end-\${Date.now()}\`
                const measureName = \`demo-task-\${Date.now()}\`
                performance.mark(markStart)
                let total = 0
                for (let i = 0; i < 50000; i += 1) total += Math.sqrt(i)
                performance.mark(markEnd)
                performance.measure(measureName, markStart, markEnd)
                void total
              }}
            >
              Generate measure entry
            </button>
          </div>
          <p style={{ margin: '10px 0 6px', color: 'var(--vp-c-text-2)' }}>
            Total entries: {entries.length} - showing {recent.length} latest
          </p>
          <p style={{ margin: '0 0 10px', color: 'var(--vp-c-text-2)' }}>
            navigation: {counts.navigation ?? 0} | resource: {counts.resource ?? 0} | measure: {counts.measure ?? 0}
          </p>
          <ul style={{ margin: 0, paddingInlineStart: 18 }}>
            {recent.map((entry, index) => (
              <li key={\`\${entry.entryType}-\${entry.name}-\${index}\`}>
                {entry.entryType} - {entry.name || '-'} - {Math.round(entry.startTime)}ms
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}`

export default PerformanceObserverDemo
