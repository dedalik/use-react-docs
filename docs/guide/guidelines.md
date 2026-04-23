---
title: Guidelines
---

# Guidelines

These guidelines define the quality bar for hooks and documentation in this project.
Use them when adding new hooks, refactoring APIs, or reviewing pull requests.

## Hook design principles

- Keep hooks independent and low-coupled.
- Avoid hidden side effects.
- Support SSR-safe execution when browser globals are absent.
- Favor clear APIs over over-engineered options.

## API shape recommendations

- Prefer tuple returns for compact state-like hooks.
- Prefer object returns for richer hooks with multiple actions.
- Avoid overloaded behavior unless it is necessary for ergonomics.
- Keep defaults explicit and documented.

## Documentation principles

- Every hook page should include:
  - overview,
  - usage snippet,
  - copy-paste implementation,
  - type declarations.

Examples should represent realistic app usage, not only minimal syntax.

## Naming

Use readable names that communicate intent (`useMediaQuery`, `useLockBodyScroll`, `useAbortController`).

## Testing expectations

- Add tests for core behavior and cleanup logic.
- Validate SSR-safe branches when browser APIs are optional.
- Test state transitions and async cancellation for network/timer hooks.
