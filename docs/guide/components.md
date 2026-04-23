---
title: Components
description: >-
  Vue components embedded in the useReact VitePress docs: function filters and
  interactive listings.
---

# Components

This project is hook-first. You can build reusable UI components by composing hooks.

A practical rule: keep components focused on rendering and interaction flow, and push reusable logic into hooks.
This makes feature code easier to test, easier to reuse, and simpler to migrate across projects.

## Example composition

```tsx
import { useState } from 'react'
import useDebounce from '@dedalik/use-react/useDebounce'
import useAsync from '@dedalik/use-react/useAsync'

export default function SearchCard() {
  const [query, setQuery] = useState('')
  const debounced = useDebounce(query, 300)
  const { data, loading, execute } = useAsync(async (q: string) => fetch(`/api?q=${q}`).then((r) => r.json()))

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={() => execute(debounced)}>Search</button>
      {loading ? 'Loading...' : JSON.stringify(data)}
    </div>
  )
}
```

## Composition checklist

- Start with one hook per concern (input timing, fetching, browser behavior).
- Keep each hook invocation close to the state it influences.
- Avoid deeply nested custom abstractions until patterns repeat in 2-3 features.
