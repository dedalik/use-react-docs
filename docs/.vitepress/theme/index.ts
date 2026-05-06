import DefaultTheme from 'vitepress/theme'
import { h, nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import PackageData from './components/PackageData.vue'
import HomeHookShowcase from './components/HomeHookShowcase.vue'
import HomeBottomCta from './components/HomeBottomCta.vue'
import HomeHeroStats from './components/HomeHeroStats.vue'
import HookLiveDemo from './components/HookLiveDemo.vue'

import './styles/tailwind.css'
import './styles/styles.css'
import './styles/vars.css'
import './styles/main.css'
import './styles/utils.css'
import './styles/overrides.css'

const CODE_LANG_RE = /\blanguage-(ts|tsx|js|jsx)\b/
const MAX_CODE_HEIGHT = 400

function enhanceCollapsibleCodeBlocks() {
  if (typeof document === 'undefined') return

  const blocks = document.querySelectorAll<HTMLElement>(".vp-doc div[class*='language-']")
  blocks.forEach((block) => {
    if (!CODE_LANG_RE.test(block.className) || block.dataset.codeEnhanced === '1') return

    const pre = block.querySelector<HTMLElement>('pre')
    if (!pre) return

    block.dataset.codeEnhanced = '1'
    if (pre.scrollHeight <= MAX_CODE_HEIGHT) return

    block.classList.add('code-collapsible', 'is-collapsed')

    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'code-collapse-toggle'
    button.textContent = 'Show code'
    button.addEventListener('click', () => {
      const expanded = block.classList.toggle('is-expanded')
      block.classList.toggle('is-collapsed', !expanded)
      button.textContent = expanded ? 'Hide code' : 'Show code'
    })

    block.appendChild(button)
  })
}

function lockCoreFunctionsSidebarGroup() {
  if (typeof document === 'undefined') return

  const labels = document.querySelectorAll<HTMLElement>('.VPSidebarItem .text')
  labels.forEach((label) => {
    if (label.textContent?.trim() !== 'Core Functions') return

    const group = label.closest<HTMLElement>('.VPSidebarItem')
    if (!group) return
    group.classList.add('core-functions-locked')

    const button = group.querySelector<HTMLElement>(':scope > .item > .button')
    if (!button || button.dataset.coreLocked === '1') return

    button.dataset.coreLocked = '1'
    button.addEventListener(
      'click',
      (event) => {
        event.preventDefault()
        event.stopPropagation()
      },
      true,
    )
  })
}

function decorateActiveSidebarLink() {
  if (typeof document === 'undefined') return

  document.querySelectorAll('.VPSidebar .sidebar-active-arrow').forEach((node) => node.remove())
  document
    .querySelectorAll('.VPSidebar .sidebar-active-text')
    .forEach((node) => node.classList.remove('sidebar-active-text'))
  const textNode =
    document.querySelector<HTMLElement>('.VPSidebar a[aria-current="page"] .text') ??
    document.querySelector<HTMLElement>('.VPSidebar .VPLink.active .text, .VPSidebar a.active .text') ??
    document.querySelector<HTMLElement>('.VPSidebar .VPSidebarItem.is-active > .item .text') ??
    document.querySelector<HTMLElement>('.VPSidebar .VPSidebarItem.has-active > .item .text')
  if (!textNode) return

  textNode.classList.add('sidebar-active-text')
  const arrow = document.createElement('span')
  arrow.className = 'sidebar-active-arrow'
  arrow.textContent = '▸'
  textNode.prepend(arrow)
}

function findScrollableParent(el: HTMLElement): HTMLElement | null {
  let parent: HTMLElement | null = el.parentElement
  while (parent) {
    const style = window.getComputedStyle(parent)
    const canScrollY = /(auto|scroll)/.test(style.overflowY)
    if (canScrollY && parent.scrollHeight > parent.clientHeight) {
      return parent
    }
    parent = parent.parentElement
  }
  return null
}

function scrollSidebarToActiveItem() {
  if (typeof document === 'undefined') return
  if (typeof window === 'undefined') return

  const activeLink =
    document.querySelector<HTMLElement>('.VPSidebar a[aria-current="page"]') ??
    document.querySelector<HTMLElement>('.VPSidebar .VPLink.active, .VPSidebar a.active')

  const activeTarget =
    activeLink ??
    document.querySelector<HTMLElement>('.VPSidebar .VPSidebarItem.is-active .item') ??
    document.querySelector<HTMLElement>('.VPSidebar .VPSidebarItem.has-active .item')

  if (!activeTarget) return false

  const sidebarScroller = findScrollableParent(activeTarget)
  if (!sidebarScroller) {
    activeTarget.scrollIntoView({ block: 'center', inline: 'nearest' })
    return Boolean(activeLink)
  }

  const scrollerRect = sidebarScroller.getBoundingClientRect()
  const targetRect = activeTarget.getBoundingClientRect()
  const deltaTop = targetRect.top - scrollerRect.top
  const centeredTop = sidebarScroller.scrollTop + deltaTop - sidebarScroller.clientHeight / 2 + targetRect.height / 2
  const maxTop = Math.max(0, sidebarScroller.scrollHeight - sidebarScroller.clientHeight)
  const clampedTop = Math.max(0, Math.min(centeredTop, maxTop))

  sidebarScroller.scrollTo({ top: clampedTop, behavior: 'auto' })
  return Boolean(activeLink)
}

function ensureSidebarActiveVisible(attempt = 0) {
  const done = scrollSidebarToActiveItem()
  if (done || attempt >= 8) return
  window.setTimeout(() => ensureSidebarActiveVisible(attempt + 1), 120)
}

let didInitialSidebarAutoScroll = false

export default {
  ...DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout!, null, {
      'home-hero-after': () => h(HomeHeroStats),
    }),
  setup() {
    const route = useRoute()

    const refreshBlocks = async (options?: { scrollSidebarToActive?: boolean }) => {
      await nextTick()
      requestAnimationFrame(() => {
        enhanceCollapsibleCodeBlocks()
        lockCoreFunctionsSidebarGroup()
        decorateActiveSidebarLink()
        if (options?.scrollSidebarToActive) {
          ensureSidebarActiveVisible()
        }
      })
    }

    onMounted(() => {
      const shouldScroll = !didInitialSidebarAutoScroll
      didInitialSidebarAutoScroll = true
      refreshBlocks({ scrollSidebarToActive: shouldScroll })
    })
    watch(
      () => route.path,
      () => refreshBlocks(),
    )
  },
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    const { app } = ctx
    app.component('PackageData', PackageData)
    app.component('HomeHookShowcase', HomeHookShowcase)
    app.component('HomeBottomCta', HomeBottomCta)
    app.component('HookLiveDemo', HookLiveDemo)
  },
}
