import React, { useRef, useState } from 'react'
import useParentElement from '@dedalik/use-react/useParentElement'

function ParentElementDemo() {
  const childRef = useRef<HTMLSpanElement | null>(null)
  const parentEl = useParentElement(childRef)
  const [outlineParent, setOutlineParent] = useState(false)
  const [focusChild, setFocusChild] = useState(false)

  const parentId = parentEl ? `#${parentEl.id || '(no-id)'}` : 'null'
  const parentTag = parentEl?.tagName.toLowerCase() ?? 'null'
  const childTag = childRef.current?.tagName.toLowerCase() ?? 'span'
  const sameNode = parentEl === childRef.current?.parentElement

  return React.createElement(
    'div',
    { className: 'hook-demo-surface' },
    React.createElement(
      'p',
      { className: 'hook-demo-hint' },
      'This demo marks both nodes clearly: outer card is parent, badge is child. useParentElement returns the outer card element.',
    ),
    React.createElement(
      'div',
      {
        id: 'parent-card',
        style: {
          border: outlineParent ? '2px solid var(--vp-c-brand-1)' : '1px solid var(--vp-c-divider)',
          background: outlineParent ? 'var(--vp-c-brand-soft)' : 'var(--vp-c-bg-soft)',
          borderRadius: 12,
          padding: 12,
          transition: 'all 120ms ease',
        },
      },
      React.createElement('p', { style: { margin: '0 0 8px', fontWeight: 600 } }, 'Parent element'),
      React.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' } },
        React.createElement(
          'span',
          {
            ref: childRef,
            tabIndex: 0,
            onFocus: () => setFocusChild(true),
            onBlur: () => setFocusChild(false),
            style: {
              fontWeight: 700,
              borderRadius: 999,
              padding: '6px 10px',
              border: focusChild ? '2px solid var(--vp-c-brand-1)' : '1px solid var(--vp-c-divider)',
              background: 'var(--vp-c-bg)',
              outline: 'none',
            },
          },
          'Child element',
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            onClick: () => childRef.current?.focus(),
          },
          'Focus child',
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            onClick: () => setOutlineParent((value) => !value),
          },
          outlineParent ? 'Hide parent outline' : 'Outline parent',
        ),
      ),
    ),
    React.createElement(
      'div',
      { style: { marginTop: 10, display: 'grid', gap: 4 } },
      React.createElement(
        'p',
        { style: { margin: 0 } },
        'Hook return (parent): ',
        React.createElement('strong', null, `${parentTag} ${parentId}`),
      ),
      React.createElement(
        'p',
        { style: { margin: 0 } },
        'Child ref points to: ',
        React.createElement('strong', null, childTag),
      ),
      React.createElement(
        'p',
        {
          style: {
            margin: 0,
            color: sameNode ? 'var(--vp-c-brand-1)' : 'var(--vp-c-danger-1, #b42318)',
            fontWeight: 600,
          },
        },
        sameNode ? 'Relationship check: parent element resolved correctly' : 'Relationship check: mismatch',
      ),
    ),
  )
}

export const sourceJsx = `import { useRef, useState } from 'react'
import useParentElement from '@dedalik/use-react/useParentElement'

export default function ParentElementDemo() {
  const childRef = useRef<HTMLSpanElement | null>(null)
  const parentEl = useParentElement(childRef)
  const [outlineParent, setOutlineParent] = useState(false)
  const [focusChild, setFocusChild] = useState(false)

  const parentId = parentEl ? '#' + (parentEl.id || '(no-id)') : 'null'
  const parentTag = parentEl?.tagName.toLowerCase() ?? 'null'
  const childTag = childRef.current?.tagName.toLowerCase() ?? 'span'
  const sameNode = parentEl === childRef.current?.parentElement

  return (
    <div className='hook-demo-surface'>
      <p className='hook-demo-hint'>
        This demo marks both nodes clearly: outer card is parent, badge is child.
      </p>

      <div
        id='parent-card'
        style={{
          border: outlineParent ? '2px solid var(--vp-c-brand-1)' : '1px solid var(--vp-c-divider)',
          background: outlineParent ? 'var(--vp-c-brand-soft)' : 'var(--vp-c-bg-soft)',
          borderRadius: 12,
          padding: 12,
        }}
      >
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Parent element</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span
            ref={childRef}
            tabIndex={0}
            onFocus={() => setFocusChild(true)}
            onBlur={() => setFocusChild(false)}
            style={{
              fontWeight: 700,
              borderRadius: 999,
              padding: '6px 10px',
              border: focusChild ? '2px solid var(--vp-c-brand-1)' : '1px solid var(--vp-c-divider)',
              background: 'var(--vp-c-bg)',
              outline: 'none',
            }}
          >
            Child element
          </span>
          <button type='button' onClick={() => childRef.current?.focus()}>
            Focus child
          </button>
          <button type='button' onClick={() => setOutlineParent((value) => !value)}>
            {outlineParent ? 'Hide parent outline' : 'Outline parent'}
          </button>
        </div>
      </div>

      <div style={{ marginTop: 10, display: 'grid', gap: 4 }}>
        <p style={{ margin: 0 }}>
          Hook return (parent): <strong>{parentTag + ' ' + parentId}</strong>
        </p>
        <p style={{ margin: 0 }}>
          Child ref points to: <strong>{childTag}</strong>
        </p>
        <p
          style={{
            margin: 0,
            color: sameNode ? 'var(--vp-c-brand-1)' : 'var(--vp-c-danger-1, #b42318)',
            fontWeight: 600,
          }}
        >
          {sameNode ? 'Relationship check: parent element resolved correctly' : 'Relationship check: mismatch'}
        </p>
      </div>
    </div>
  )
}`

export default ParentElementDemo
