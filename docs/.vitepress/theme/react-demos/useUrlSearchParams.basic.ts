import React from 'react'
import useUrlSearchParams from '@dedalik/use-react/useUrlSearchParams'

function UrlSearchParamsDemo() {
  const [params, setSearchParams] = useUrlSearchParams()
  const q = params.get('q') ?? ''
  const page = params.get('page') ?? '1'

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Sync UI with URL query params and update them via record or URLSearchParams instance.',
    ),
    React.createElement(
      'p',
      { style: { margin: '10px 0 8px' } },
      React.createElement('code', null, 'q'),
      `: ${q || '-'} | `,
      React.createElement('code', null, 'page'),
      `: ${page}`,
    ),
    React.createElement(
      'div',
      { style: { display: 'grid', gap: 8, maxWidth: 420 } },
      React.createElement('input', {
        type: 'search',
        placeholder: 'Search...',
        value: q,
        onChange: (event) =>
          setSearchParams({
            q: event.target.value,
            page: '1',
          }),
      }),
      React.createElement(
        'div',
        { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'max-content max-content' } },
        React.createElement(
          'button',
          {
            type: 'button',
            onClick: () => {
              const next = new URLSearchParams(params)
              const pageNum = Number.parseInt(page, 10)
              next.set('page', String(Number.isFinite(pageNum) ? pageNum + 1 : 2))
              setSearchParams(next)
            },
          },
          'Next page',
        ),
        React.createElement('button', { type: 'button', onClick: () => setSearchParams({}) }, 'Clear all'),
      ),
    ),
  )
}

export const sourceJsx = `import useUrlSearchParams from '@dedalik/use-react/useUrlSearchParams'

export default function UrlSearchParamsDemo() {
  const [params, setSearchParams] = useUrlSearchParams()
  const q = params.get('q') ?? ''
  const page = params.get('page') ?? '1'

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Sync UI with URL query params and update them via record or URLSearchParams instance.
      </p>

      <p style={{ margin: '10px 0 8px' }}>
        <code>q</code>: {q || '-'} | <code>page</code>: {page}
      </p>

      <div style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
        <input
          type='search'
          placeholder='Search...'
          value={q}
          onChange={(event) =>
            setSearchParams({
              q: event.target.value,
              page: '1',
            })
          }
        />

        <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'max-content max-content' }}>
          <button
            type='button'
            onClick={() => {
              const next = new URLSearchParams(params)
              const pageNum = Number.parseInt(page, 10)
              next.set('page', String(Number.isFinite(pageNum) ? pageNum + 1 : 2))
              setSearchParams(next)
            }}
          >
            Next page
          </button>
          <button type='button' onClick={() => setSearchParams({})}>
            Clear all
          </button>
        </div>
      </div>
    </div>
  )
}`

export default UrlSearchParamsDemo
