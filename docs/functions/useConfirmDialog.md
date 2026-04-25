---
title: Promise-based confirm dialog state
sidebar_label: useConfirmDialog
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useConfirmDialog.tsx'
description: >-
  useConfirmDialog from @dedalik/use-react: reveal→Promise, confirm/cancel, optional payload.
---

# useConfirmDialog()

<PackageData fn="useConfirmDialog" />

Last updated: 24/04/2026

## Overview

`useConfirmDialog` is a **small** **state** **machine** for **modals** that **resolve** a **boolean** like **`window.confirm`**, but **asynchronously**: **`reveal(optionalPayload)`** sets **`isOpen`**, **stores** **`payload`**, and **returns** a **Promise** that **settles** to **`true`** on **`confirm()`** or **`false`** on **`cancel()`** (a **second** **`reveal`** before **settle** can **orphan** the **previous** **Promise**-keep **one** **flow** at a **time** in **UI**). The **resolver** lives in a **ref** so **confirm** / **cancel** stay **stable**. **Generics** **`T`** for **`payload`** let you pass **row** **ids** or **labels** into the **modal** **body** without **separate** **context**. There is **no** **portal** or **A11y** **shell**-**render** your **own** **dialog** when **isOpen** is **true**.

### What it accepts

- **None**; optional type **parameter** **`useConfirmDialog<Payload>()`**

### What it returns

- **`{ isOpen, payload, reveal, confirm, cancel }`**

## Usage

**Delete** **row** with **typed** **payload**; **await** **`reveal`**, then **branch** on **boolean**; **wire** **Confirm** / **Cancel** to **`confirm` / `cancel`**.

```tsx
import { useState } from 'react'
import useConfirmDialog from '@dedalik/use-react/useConfirmDialog'

type Row = { id: string; title: string }

function Example() {
  const { isOpen, payload, reveal, confirm, cancel } = useConfirmDialog<Row>()
  const [log, setLog] = useState('')

  const tryDelete = async (row: Row) => {
    const ok = await reveal(row)
    setLog(ok ? `Deleted “${row.title}”` : 'Cancelled')
  }

  return (
    <div>
      <button type="button" onClick={() => void tryDelete({ id: '1', title: 'Draft' })}>
        Delete row…
      </button>
      <p>{log}</p>
      {isOpen && payload && (
        <div role="dialog" aria-modal="true">
          <p>Delete “{payload.title}”?</p>
          <button type="button" onClick={confirm}>
            Confirm
          </button>
          <button type="button" onClick={cancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useConfirmDialog`

**Signature:** `useConfirmDialog<T = unknown>(): UseConfirmDialogReturn<T>`

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useRef, useState } from 'react'

export interface UseConfirmDialogReturn<T = unknown> {
  isOpen: boolean
  payload: T | null
  reveal: (payload?: T) => Promise<boolean>
  confirm: () => void
  cancel: () => void
}

/**
 * Promise-based confirm dialog state manager.
 */
export default function useConfirmDialog<T = unknown>(): UseConfirmDialogReturn<T> {
  const [isOpen, setIsOpen] = useState(false)
  const [payload, setPayload] = useState<T | null>(null)
  const resolverRef = useRef<((value: boolean) => void) | null>(null)

  const closeWith = useCallback((value: boolean) => {
    setIsOpen(false)
    setPayload(null)
    if (resolverRef.current) {
      resolverRef.current(value)
      resolverRef.current = null
    }
  }, [])

  const reveal = useCallback((nextPayload?: T) => {
    setPayload(nextPayload ?? null)
    setIsOpen(true)
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve
    })
  }, [])

  const confirm = useCallback(() => {
    closeWith(true)
  }, [closeWith])

  const cancel = useCallback(() => {
    closeWith(false)
  }, [closeWith])

  return { isOpen, payload, reveal, confirm, cancel }
}
```

### JavaScript

```js
import { useCallback, useRef, useState } from 'react'

/**
 * Promise-based confirm dialog state manager.
 */
export default function useConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [payload, setPayload] = useState(null)
  const resolverRef = useRef(null)

  const closeWith = useCallback((value) => {
    setIsOpen(false)
    setPayload(null)
    if (resolverRef.current) {
      resolverRef.current(value)
      resolverRef.current = null
    }
  }, [])

  const reveal = useCallback((nextPayload) => {
    setPayload(nextPayload ?? null)
    setIsOpen(true)
    return new Promise((resolve) => {
      resolverRef.current = resolve
    })
  }, [])

  const confirm = useCallback(() => {
    closeWith(true)
  }, [closeWith])

  const cancel = useCallback(() => {
    closeWith(false)
  }, [closeWith])

  return { isOpen, payload, reveal, confirm, cancel }
}
```
