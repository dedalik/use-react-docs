---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "useReact"
  text: "Collection of React Hooks"
  tagline: Typed, tree-shakable utilities with copy-paste examples, SSR callouts, and tests behind every export.

  actions:
    - theme: brand
      text: Explore functions
      link: /functions/
    - theme: alt
      text: Get started
      link: /guide/get-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/dedalik/use-react

features:
  - icon: ⚡
    title: Ship faster with batteries included
    details: Debouncing, observers, storage bridges, and browser helpers - ready to drop into production components.
  - icon: 🧩
    title: Import only what you use
    details: Per-hook entry points keep bundles lean while the barrel export stays available for quick experiments.
  - icon: 🧪
    title: Reliability by default
    details: Jest coverage across the suite so upgrades and refactors stay boring - in the best way.
  - icon: 🚀
    title: Built for modern React
    details: Aimed at React 17 and 18 peers - hooks respect typical client constraints and play nicely with Strict Mode lifecycles.
  - icon: 📚
    title: Curated, growing catalog
    details: Over thirty focused hooks across state, DOM, browser APIs, observers, and async flows - each with its own reference page.
  - icon: 🌿
    title: Fully tree-shakable
    details: ESM and CJS builds expose per-hook modules so bundlers can drop code paths you never import.
  - icon: 🦾
    title: TypeScript-first
    details: Source and published declarations stay in sync, so editors can autocomplete arguments and return shapes confidently.
  - icon: 🛠
    title: Flexible wiring
    details: Pass refs as targets, opt into capture or propagation controls, and tune options like bounds or handles where the API exposes them.
  - icon: 🔋
    title: SSR-aware guidance
    details: When a hook touches window or document, the docs call out compatibility and patterns instead of leaving you to guess.
  - icon: ✨
    title: Runnable examples
    details: Every function page ships copy-paste snippets you can lift into a route, sandbox, or test without extra scaffolding.
---

<HomeHookShowcase />

<HomeSsrSnapshot />
