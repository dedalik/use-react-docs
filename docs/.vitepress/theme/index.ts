import DefaultTheme from 'vitepress/theme'
import { h, nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import CookieConsentBanner from './components/CookieConsentBanner.vue'
import { applyConsentFromStorage } from './analytics'
// import Test from "./components/Note.vue";
import PackageData from './components/PackageData.vue'
import HomeHookShowcase from './components/HomeHookShowcase.vue'

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

export default {
  ...DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout!, null, {
      'layout-bottom': () => h(CookieConsentBanner),
    }),
  setup() {
    const route = useRoute()

    const refreshBlocks = async () => {
      await nextTick()
      requestAnimationFrame(() => {
        enhanceCollapsibleCodeBlocks()
        lockCoreFunctionsSidebarGroup()
      })
    }

    onMounted(refreshBlocks)
    watch(() => route.path, refreshBlocks)
  },
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    const { app } = ctx
    app.component('PackageData', PackageData)
    app.component('HomeHookShowcase', HomeHookShowcase)
    // VitePress passes a minimal router (no vue-router isReady); defer to microtask after app boot.
    if (typeof window !== 'undefined') {
      queueMicrotask(() => applyConsentFromStorage())
    }
  },
}
