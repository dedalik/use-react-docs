---
title: Browser notification helper
sidebar_label: useWebNotification
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWebNotification.tsx'
description: >-
  useWebNotification from @dedalik/use-react: request permission and show notifications.
---

# useWebNotification()

<PackageData fn="useWebNotification" />

Last updated: 24/04/2026

## Overview

`useWebNotification` surfaces **`Notification` API** ergonomics: **`isSupported`** guards environments without constructors, **`permission`** mirrors **`Notification.permission`** (or **`'unsupported'`**), **`requestPermission()`** wraps **`Notification.requestPermission()`**, and **`show(title, options)`** instantiates **`new Notification`** when permission is **`granted`**, returning the instance or **`null`** on failure. Permission is read on each render (not stored in hook state), so after **`await requestPermission()`** trigger a local **`setState`** in your component to re-render and refresh the label; **`show`** must run in a secure context and typically after a user gesture-browsers may block unsolicited prompts.

### What it accepts

- None.

### What it returns

- **`isSupported`**, **`permission`**, **`requestPermission`**, **`show`** - See API Reference.

## Usage

Request access, then fire a notification with **title** and **options** (`body`, `tag`, etc.); bump state after permission so the UI updates (no `JSON.stringify`).

```tsx
import { useState } from 'react'
import useWebNotification from '@dedalik/use-react/useWebNotification'

function Example() {
  const { isSupported, permission, requestPermission, show } = useWebNotification()
  const [, setTick] = useState(0)

  return (
    <div>
      <h3>Notifications</h3>

      {!isSupported ? (
        <p>Notifications are not supported in this environment.</p>
      ) : (
        <>
          <p>
            Permission: <strong>{permission}</strong>
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              type='button'
              onClick={async () => {
                await requestPermission()
                setTick((value) => value + 1)
              }}
            >
              Request permission
            </button>
            <button
              type='button'
              onClick={() => {
                const notification = show('Hello from use-react', {
                  body: 'This is the notification body.',
                  tag: 'use-web-notification-demo',
                })
                if (!notification) {
                  window.alert('Could not show notification (check permission).')
                }
              }}
            >
              Show notification
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useWebNotification`

**Signature:** `useWebNotification(): UseWebNotificationReturn`

#### Parameters

None.

#### Returns

Object with:

- **`isSupported`** - `'Notification' in window` (`boolean`).
- **`permission`** - `Notification.permission` or `'unsupported'`.
- **`requestPermission`** - Async permission prompt (`() => Promise<NotificationPermission | 'unsupported'>`).
- **`show`** - `(title: string, options?: NotificationOptions) => Notification | null`.

## Copy-paste hook

### TypeScript

```tsx
import { useCallback } from 'react'

export interface UseWebNotificationReturn {
  isSupported: boolean
  permission: NotificationPermission | 'unsupported'
  requestPermission: () => Promise<NotificationPermission | 'unsupported'>
  show: (title: string, options?: NotificationOptions) => Notification | null
}

/**
 * Browser Notification API wrapper.
 */
export default function useWebNotification(): UseWebNotificationReturn {
  const isSupported = typeof window !== 'undefined' && 'Notification' in window
  const permission: NotificationPermission | 'unsupported' = isSupported ? Notification.permission : 'unsupported'

  const requestPermission = useCallback(async (): Promise<NotificationPermission | 'unsupported'> => {
    if (!isSupported) return 'unsupported'
    return Notification.requestPermission()
  }, [isSupported])

  const show = useCallback(
    (title: string, options?: NotificationOptions): Notification | null => {
      if (!isSupported || Notification.permission !== 'granted') return null

      try {
        return new Notification(title, options)
      } catch {
        return null
      }
    },
    [isSupported],
  )

  return { isSupported, permission, requestPermission, show }
}
```

### JavaScript

```js
import { useCallback } from 'react'

export default function useWebNotification() {
  const isSupported = typeof window !== 'undefined' && 'Notification' in window
  const permission = isSupported ? Notification.permission : 'unsupported'

  const requestPermission = useCallback(async () => {
    if (!isSupported) return 'unsupported'
    return Notification.requestPermission()
  }, [isSupported])

  const show = useCallback(
    (title, options) => {
      if (!isSupported || Notification.permission !== 'granted') return null

      try {
        return new Notification(title, options)
      } catch {
        return null
      }
    },
    [isSupported],
  )

  return { isSupported, permission, requestPermission, show }
}
```
