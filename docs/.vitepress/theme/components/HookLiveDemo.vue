<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { createRoot, type Root } from 'react-dom/client'
import React from 'react'
import { getHighlighter } from 'shikiji'
import { isDark } from '../composables/dark'
import { defaultHookLiveDemoFallback, hookDemoSubtitles } from '../../data/hookDemoSubtitles'

interface DemoModule {
  default: React.ComponentType
  sourceJsx: string
}

const demoModuleCache: Partial<Record<string, DemoModule>> = {}

const props = defineProps<{
  demo: string
  title?: string
  /** When set (e.g. on the home showcase), the title is a link to the hook’s doc page. */
  titleHref?: string
}>()

const initialCachedModule = demoModuleCache[props.demo]

const mountEl = ref<HTMLElement | null>(null)
const sourceJsx = ref(initialCachedModule?.sourceJsx ?? '')
const error = ref('')
const loading = ref(!initialCachedModule)
const demoComponent = shallowRef<React.ComponentType | null>(initialCachedModule?.default ?? null)

const highlightedHtml = ref('')
const highlightLoading = ref(false)
const copied = ref(false)
let copyResetTimer: ReturnType<typeof setTimeout> | null = null

let root: Root | null = null

const hookName = computed(() => props.demo.split('/')[0] ?? 'hook')
const displayTitle = computed(() => props.title ?? `Live demo: ${hookName.value}`)
const subtitle = computed(() => hookDemoSubtitles[props.demo] ?? defaultHookLiveDemoFallback)

const activeSource = computed(() => sourceJsx.value)
/** `details` is closed by default - avoid Shiki on first paint. */
const sourceOpen = ref(false)

const demoLoaders: Record<string, () => Promise<DemoModule>> = {
  'useActiveElement/basic': () => import('../react-demos/useActiveElement.basic'),
  'useAsyncState/basic': () => import('../react-demos/useAsyncState.basic'),
  'useCounter/basic': () => import('../react-demos/useCounter.basic'),
  'useClickOutside/basic': () => import('../react-demos/useClickOutside.basic'),
  'useDraggable/basic': () => import('../react-demos/useDraggable.basic'),
  'useElementBounding/basic': () => import('../react-demos/useElementBounding.basic'),
  'useElementSize/basic': () => import('../react-demos/useElementSize.basic'),
  'useElementVisibility/basic': () => import('../react-demos/useElementVisibility.basic'),
  'useParentElement/basic': () => import('../react-demos/useParentElement.basic'),
  'useTextareaAutoSize/basic': () => import('../react-demos/useTextareaAutoSize.basic'),
  'useWindowFocus/basic': () => import('../react-demos/useWindowFocus.basic'),
  'useWindowScroll/basic': () => import('../react-demos/useWindowScroll.basic'),
  'useDebouncedRefHistory/basic': () => import('../react-demos/useDebouncedRefHistory.basic'),
  'useDropZone/basic': () => import('../react-demos/useDropZone.basic'),
  'useBroadcastChannel/basic': () => import('../react-demos/useBroadcastChannel.basic'),
  'useBrowserLocation/basic': () => import('../react-demos/useBrowserLocation.basic'),
  'useFileDialog/basic': () => import('../react-demos/useFileDialog.basic'),
  'useFileSystemAccess/basic': () => import('../react-demos/useFileSystemAccess.basic'),
  'useBluetooth/basic': () => import('../react-demos/useBluetooth.basic'),
  'useFullscreen/basic': () => import('../react-demos/useFullscreen.basic'),
  'useMediaControls/basic': () => import('../react-demos/useMediaControls.basic'),
  'useMemory/basic': () => import('../react-demos/useMemory.basic'),
  'useMediaQuery/basic': () => import('../react-demos/useMediaQuery.basic'),
  'useCssSupports/basic': () => import('../react-demos/useCssSupports.basic'),
  'useCssVar/basic': () => import('../react-demos/useCssVar.basic'),
  'useBreakpoints/basic': () => import('../react-demos/useBreakpoints.basic'),
  'usePreferredColorScheme/basic': () => import('../react-demos/usePreferredColorScheme.basic'),
  'usePreferredDark/basic': () => import('../react-demos/usePreferredDark.basic'),
  'useDark/basic': () => import('../react-demos/useDark.basic'),
  'usePreferredLanguages/basic': () => import('../react-demos/usePreferredLanguages.basic'),
  'usePreferredReducedMotion/basic': () => import('../react-demos/usePreferredReducedMotion.basic'),
  'usePreferredContrast/basic': () => import('../react-demos/usePreferredContrast.basic'),
  'usePreferredReducedTransparency/basic': () => import('../react-demos/usePreferredReducedTransparency.basic'),
  'useColorMode/basic': () => import('../react-demos/useColorMode.basic'),
  'useUrlSearchParams/basic': () => import('../react-demos/useUrlSearchParams.basic'),
  'useSSRWidth/basic': () => import('../react-demos/useSSRWidth.basic'),
  'useScreenOrientation/basic': () => import('../react-demos/useScreenOrientation.basic'),
  'useShare/basic': () => import('../react-demos/useShare.basic'),
  'useVibrate/basic': () => import('../react-demos/useVibrate.basic'),
  'useWakeLock/basic': () => import('../react-demos/useWakeLock.basic'),
  'useStyleTag/basic': () => import('../react-demos/useStyleTag.basic'),
  'useWebNotification/basic': () => import('../react-demos/useWebNotification.basic'),
  'useScreenSafeArea/basic': () => import('../react-demos/useScreenSafeArea.basic'),
  'useWindowSize/basic': () => import('../react-demos/useWindowSize.basic'),
  'useTitle/basic': () => import('../react-demos/useTitle.basic'),
  'useLockBodyScroll/basic': () => import('../react-demos/useLockBodyScroll.basic'),
  'useScript/basic': () => import('../react-demos/useScript.basic'),
  'usePageVisibility/basic': () => import('../react-demos/usePageVisibility.basic'),
  'useCopyToClipboard/basic': () => import('../react-demos/useCopyToClipboard.basic'),
  'useClipboardItems/basic': () => import('../react-demos/useClipboardItems.basic'),
  'usePermission/basic': () => import('../react-demos/usePermission.basic'),
  'usePerformanceObserver/basic': () => import('../react-demos/usePerformanceObserver.basic'),
  'useTextDirection/basic': () => import('../react-demos/useTextDirection.basic'),
  'useFavicon/basic': () => import('../react-demos/useFavicon.basic'),
  'useHash/basic': () => import('../react-demos/useHash.basic'),
  'useToggle/basic': () => import('../react-demos/useToggle.basic'),
  'useDebounce/basic': () => import('../react-demos/useDebounce.basic'),
  'useEventCallback/basic': () => import('../react-demos/useEventCallback.basic'),
  'useLastChanged/basic': () => import('../react-demos/useLastChanged.basic'),
  'useLatest/basic': () => import('../react-demos/useLatest.basic'),
  'useManualRefHistory/basic': () => import('../react-demos/useManualRefHistory.basic'),
  'useOnMount/basic': () => import('../react-demos/useOnMount.basic'),
  'usePrevious/basic': () => import('../react-demos/usePrevious.basic'),
  'useRefHistory/basic': () => import('../react-demos/useRefHistory.basic'),
  'useStorage/basic': () => import('../react-demos/useStorage.basic'),
  'useStorageAsync/basic': () => import('../react-demos/useStorageAsync.basic'),
  'useThrottle/basic': () => import('../react-demos/useThrottle.basic'),
  'useThrottledRefHistory/basic': () => import('../react-demos/useThrottledRefHistory.basic'),
}

// shikiji v0.10: `getSingletonHighlighter()` ignores options on first init - themes/langs
// never load, `codeToHtml` throws, and the UI falls back to unstyled plain text.
let highlighterPromise: ReturnType<typeof getHighlighter> | null = null

function getHighlighterCached() {
  if (!highlighterPromise) {
    highlighterPromise = getHighlighter({
      themes: ['light-plus', 'dark-plus'],
      langs: ['jsx'],
    })
  }
  return highlighterPromise
}

async function refreshHighlight() {
  if (!sourceOpen.value) {
    return
  }
  if (!activeSource.value) {
    highlightedHtml.value = ''
    return
  }
  highlightLoading.value = true
  try {
    const hi = await getHighlighterCached()
    highlightedHtml.value = hi.codeToHtml(activeSource.value, {
      lang: 'jsx',
      theme: isDark.value ? 'dark-plus' : 'light-plus',
    })
  } catch {
    highlightedHtml.value = ''
  } finally {
    highlightLoading.value = false
  }
}

function onSourceToggle(e: Event) {
  const el = e.target as HTMLDetailsElement | null
  sourceOpen.value = Boolean(el?.open)
  if (el?.open) void refreshHighlight()
}

function scheduleIdle(fn: () => void) {
  if (typeof window === 'undefined') {
    fn()
    return
  }
  const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }
  if (typeof w.requestIdleCallback === 'function') {
    w.requestIdleCallback(fn, { timeout: 1200 })
  } else {
    setTimeout(fn, 0)
  }
}

function prefetchHighlighterIdle() {
  if (typeof window === 'undefined') return
  scheduleIdle(() => {
    void getHighlighterCached()
  })
}

async function copySource() {
  if (!activeSource.value) return
  try {
    await navigator.clipboard.writeText(activeSource.value)
    copied.value = true
    if (copyResetTimer) clearTimeout(copyResetTimer)
    copyResetTimer = setTimeout(() => {
      copied.value = false
      copyResetTimer = null
    }, 2000)
  } catch {
    // ignore
  }
}

function cleanupRoot() {
  if (root) {
    root.unmount()
    root = null
  }
}

function renderDemo() {
  if (!mountEl.value || !demoComponent.value) return
  cleanupRoot()
  root = createRoot(mountEl.value)
  root.render(React.createElement(demoComponent.value))
}

async function loadDemo() {
  const load = demoLoaders[props.demo]
  if (!load) {
    loading.value = false
    error.value = `Demo "${props.demo}" is not registered yet.`
    sourceJsx.value = ''
    demoComponent.value = null
    highlightedHtml.value = ''
    cleanupRoot()
    return
  }

  const cached = demoModuleCache[props.demo]
  if (cached) {
    error.value = ''
    sourceJsx.value = cached.sourceJsx
    demoComponent.value = cached.default
    highlightedHtml.value = ''
    loading.value = false
    renderDemo()
    return
  }

  loading.value = true
  error.value = ''
  sourceJsx.value = ''
  demoComponent.value = null
  highlightedHtml.value = ''
  cleanupRoot()

  try {
    const mod = await load()
    demoModuleCache[props.demo] = mod
    demoComponent.value = mod.default
    sourceJsx.value = mod.sourceJsx
    loading.value = false
    renderDemo()
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown demo load error'
    error.value = `Failed to load demo: ${message}`
    loading.value = false
  }
}

watch([sourceJsx, isDark, sourceOpen], () => void refreshHighlight())

onMounted(() => {
  if (demoComponent.value) {
    renderDemo()
  }
  // Defer demo chunk + first React render so route transitions stay smooth.
  scheduleIdle(() => void loadDemo())
  prefetchHighlighterIdle()
})
watch(
  () => props.demo,
  () => {
    // New hook page: show loading, defer work again to avoid jank.
    scheduleIdle(() => void loadDemo())
  },
)
onBeforeUnmount(() => {
  cleanupRoot()
  if (copyResetTimer) clearTimeout(copyResetTimer)
})
</script>

<template>
  <section class="hook-live-demo" :aria-label="displayTitle">
    <header class="hook-live-demo__header">
      <div class="hook-live-demo__header-row">
        <h3 class="hook-live-demo__title">
          <a v-if="titleHref" class="hook-live-demo__title-link" :href="titleHref" @click.stop>{{ displayTitle }}</a>
          <template v-else>{{ displayTitle }}</template>
        </h3>
        <span class="hook-live-demo__pill" aria-hidden="true">Demo</span>
      </div>
      <p class="hook-live-demo__subtitle">{{ subtitle }}</p>
    </header>

    <div class="hook-live-demo__preview">
      <p v-if="loading" class="hook-live-demo__status">Loading demo...</p>
      <p v-else-if="error" class="hook-live-demo__status hook-live-demo__status--error">{{ error }}</p>
      <div v-show="!loading && !error" ref="mountEl" class="hook-live-demo__mount" />
    </div>

    <details class="hook-live-demo__source" @toggle="onSourceToggle">
      <summary class="hook-live-demo__summary">
        <span class="hook-live-demo__summary-label">Demo source</span>
        <span class="hook-live-demo__summary-hint">JSX</span>
      </summary>

      <div class="hook-live-demo__code-panel">
        <div class="hook-live-demo__code-toolbar">
          <span class="hook-live-demo__summary-hint">JSX</span>
          <button type="button" class="hook-live-demo__copy" :disabled="!activeSource" @click.stop.prevent="copySource">
            {{ copied ? 'Copied' : 'Copy' }}
          </button>
        </div>

        <div class="hook-live-demo__code-body vp-doc">
          <p v-if="highlightLoading" class="hook-live-demo__code-placeholder">Preparing syntax highlight...</p>
          <div v-else-if="highlightedHtml" class="hook-live-demo__shiki" v-html="highlightedHtml" />
          <pre v-else class="hook-live-demo__code-fallback"><code class="language-jsx">{{ activeSource }}</code></pre>
        </div>
      </div>
    </details>
  </section>
</template>
