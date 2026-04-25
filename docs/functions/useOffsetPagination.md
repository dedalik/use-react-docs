---
title: Page, size, and offset for lists
sidebar_label: useOffsetPagination
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useOffsetPagination.tsx'
description: >-
  useOffsetPagination from @dedalik/use-react: page, pageSize, total, next/prev, offset.
---

# useOffsetPagination()

<PackageData fn="useOffsetPagination" />

Last updated: 24/04/2026

## Overview

`useOffsetPagination` **keeps** **client**-**side** **offset** **pagination** **state**: **`page`** and **`pageSize`** are **clamped** so **page** **∈** **[1, pageCount]**, with **`pageCount = ceil(total / pageSize)`** and **at** **least** **one** **page** when **`total`** is **0**. It **derives** **`offset = (page - 1) * pageSize`**, **booleans** **`isFirstPage` / `isLastPage`**, and **navigators** **`next`**, **`prev`**, **`setPage`**, **`setPageSize`**. The **initial** **`page`**, **`pageSize`**, and **render**-**time** **`total`** come from **options**; **`total`** is **not** **stored** in **hook** **state**-it is **read** from **options** on every **call** (pass the **latest** **row** **count**). **Changing** **`pageSize`** does **not** **fetch** **data**; it only **re**-**clamps** the **current** **page**.

### What it accepts

1. **`options`**: `total?`, `page?`, `pageSize?` - defaults **`total: 0`**, **`page: 1`**, **`pageSize: 10`**

### What it returns

- **See** `UseOffsetPaginationReturn` in **source** - **page**, **size**, **offset**, **nav** **helpers**

## Usage

**47** **rows**, **10** per **page**; **Next** / **Prev** and **“Page N of M”** using **returned** **flags**.

```tsx
import useOffsetPagination from '@dedalik/use-react/useOffsetPagination'

function Example() {
  const total = 47
  const { page, pageCount, offset, isFirstPage, isLastPage, next, prev, pageSize } = useOffsetPagination({
    total,
    page: 1,
    pageSize: 10,
  })

  return (
    <div>
      <p>
        Page {page} of {pageCount} - offset {offset} (size {pageSize})
      </p>
      <button type="button" disabled={isFirstPage} onClick={prev}>
        Previous
      </button>
      <button type="button" disabled={isLastPage} onClick={next}>
        Next
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useOffsetPagination`

**Signature:** `useOffsetPagination(options?: UseOffsetPaginationOptions): UseOffsetPaginationReturn`

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useMemo, useState } from 'react'

export interface UseOffsetPaginationOptions {
  total?: number
  page?: number
  pageSize?: number
}

export interface UseOffsetPaginationReturn {
  page: number
  pageSize: number
  total: number
  pageCount: number
  isFirstPage: boolean
  isLastPage: boolean
  offset: number
  next: () => void
  prev: () => void
  setPage: (page: number) => void
  setPageSize: (size: number) => void
}

function clampPage(page: number, pageCount: number): number {
  return Math.min(Math.max(1, page), Math.max(pageCount, 1))
}

/**
 * Keeps classic offset pagination state and helpers.
 */
export default function useOffsetPagination(options: UseOffsetPaginationOptions = {}): UseOffsetPaginationReturn {
  const { total = 0, page = 1, pageSize = 10 } = options
  const [currentPage, setCurrentPage] = useState(page)
  const [currentPageSize, setCurrentPageSize] = useState(pageSize)

  const pageCount = useMemo(
    () => Math.max(1, Math.ceil(total / Math.max(1, currentPageSize))),
    [total, currentPageSize],
  )
  const safePage = clampPage(currentPage, pageCount)
  const offset = (safePage - 1) * currentPageSize

  const setPage = useCallback(
    (nextPage: number) => {
      setCurrentPage(clampPage(nextPage, pageCount))
    },
    [pageCount],
  )

  const setPageSize = useCallback((size: number) => {
    setCurrentPageSize(Math.max(1, Math.floor(size)))
  }, [])

  const next = useCallback(() => {
    setCurrentPage((p) => clampPage(p + 1, pageCount))
  }, [pageCount])

  const prev = useCallback(() => {
    setCurrentPage((p) => clampPage(p - 1, pageCount))
  }, [pageCount])

  return {
    page: safePage,
    pageSize: currentPageSize,
    total,
    pageCount,
    isFirstPage: safePage <= 1,
    isLastPage: safePage >= pageCount,
    offset,
    next,
    prev,
    setPage,
    setPageSize,
  }
}
```

### JavaScript

```js
import { useCallback, useMemo, useState } from 'react'

function clampPage(page, pageCount) {
  return Math.min(Math.max(1, page), Math.max(pageCount, 1))
}

/**
 * Keeps classic offset pagination state and helpers.
 */
export default function useOffsetPagination(options = {}) {
  const { total = 0, page = 1, pageSize = 10 } = options
  const [currentPage, setCurrentPage] = useState(page)
  const [currentPageSize, setCurrentPageSize] = useState(pageSize)

  const pageCount = useMemo(
    () => Math.max(1, Math.ceil(total / Math.max(1, currentPageSize))),
    [total, currentPageSize],
  )
  const safePage = clampPage(currentPage, pageCount)
  const offset = (safePage - 1) * currentPageSize

  const setPage = useCallback(
    (nextPage) => {
      setCurrentPage(clampPage(nextPage, pageCount))
    },
    [pageCount],
  )

  const setPageSize = useCallback((size) => {
    setCurrentPageSize(Math.max(1, Math.floor(size)))
  }, [])

  const next = useCallback(() => {
    setCurrentPage((p) => clampPage(p + 1, pageCount))
  }, [pageCount])

  const prev = useCallback(() => {
    setCurrentPage((p) => clampPage(p - 1, pageCount))
  }, [pageCount])

  return {
    page: safePage,
    pageSize: currentPageSize,
    total,
    pageCount,
    isFirstPage: safePage <= 1,
    isLastPage: safePage >= pageCount,
    offset,
    next,
    prev,
    setPage,
    setPageSize,
  }
}
```
