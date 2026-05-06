import React, { useMemo, useState } from 'react'
import useCssSupports from '@dedalik/use-react/useCssSupports'

const PRESETS = [
  { label: 'Grid layout', property: 'display', value: 'grid' },
  { label: 'Backdrop blur', property: 'backdrop-filter', value: 'blur(8px)' },
  { label: 'Container queries', property: 'container-type', value: 'inline-size' },
  { label: 'Text wrap balance', property: 'text-wrap', value: 'balance' },
] as const

function CssSupportsDemo() {
  const [property, setProperty] = useState(PRESETS[0].property)
  const [value, setValue] = useState(PRESETS[0].value)

  const pairSupported = useCssSupports(property, value)
  const condition = useMemo(() => `(${property}: ${value})`, [property, value])
  const conditionSupported = useCssSupports(condition)

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'Pick a ready-made example or enter your own values to check CSS support.',
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' } },
      ...PRESETS.map((preset) =>
        React.createElement(
          'button',
          {
            key: preset.label,
            type: 'button',
            onClick: () => {
              setProperty(preset.property)
              setValue(preset.value)
            },
          },
          preset.label,
        ),
      ),
    ),
    React.createElement(
      'div',
      { className: 'hook-demo-toolbar', style: { gridTemplateColumns: '1fr 1fr' } },
      React.createElement('input', {
        value: property,
        onChange: (event) => setProperty(event.target.value),
        placeholder: 'property (e.g. display)',
      }),
      React.createElement('input', {
        value: value,
        onChange: (event) => setValue(event.target.value),
        placeholder: 'value (e.g. grid)',
      }),
    ),
    React.createElement(
      'div',
      { style: { display: 'grid', gap: 8, marginTop: 10 } },
      React.createElement(
        'p',
        { style: { margin: 0 } },
        React.createElement('code', null, `${property}: ${value}`),
        ` - ${pairSupported ? 'supported' : 'not supported'}`,
      ),
      React.createElement(
        'p',
        { style: { margin: 0 } },
        React.createElement('code', null, condition),
        ` - ${conditionSupported ? 'supported' : 'not supported'}`,
      ),
    ),
  )
}

export const sourceJsx = `import { useMemo, useState } from 'react'
import useCssSupports from '@dedalik/use-react/useCssSupports'

const PRESETS = [
  { label: 'Grid layout', property: 'display', value: 'grid' },
  { label: 'Backdrop blur', property: 'backdrop-filter', value: 'blur(8px)' },
  { label: 'Container queries', property: 'container-type', value: 'inline-size' },
  { label: 'Text wrap balance', property: 'text-wrap', value: 'balance' },
]

export default function CssSupportsDemo() {
  const [property, setProperty] = useState(PRESETS[0].property)
  const [value, setValue] = useState(PRESETS[0].value)

  const pairSupported = useCssSupports(property, value)
  const condition = useMemo(() => \`(\${property}: \${value})\`, [property, value])
  const conditionSupported = useCssSupports(condition)

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        Pick a ready-made example or enter your own values to check CSS support.
      </p>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            type='button'
            onClick={() => {
              setProperty(preset.property)
              setValue(preset.value)
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className='hook-demo-toolbar' style={{ gridTemplateColumns: '1fr 1fr' }}>
        <input
          value={property}
          onChange={(event) => setProperty(event.target.value)}
          placeholder='property (e.g. display)'
        />
        <input value={value} onChange={(event) => setValue(event.target.value)} placeholder='value (e.g. grid)' />
      </div>

      <div style={{ display: 'grid', gap: 8, marginTop: 10 }}>
        <p style={{ margin: 0 }}>
          <code>{property + ': ' + value}</code> - {pairSupported ? 'supported' : 'not supported'}
        </p>
        <p style={{ margin: 0 }}>
          <code>{condition}</code> - {conditionSupported ? 'supported' : 'not supported'}
        </p>
      </div>
    </div>
  )
}`

export default CssSupportsDemo
