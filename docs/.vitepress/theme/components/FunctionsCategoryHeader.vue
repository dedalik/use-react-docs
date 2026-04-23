<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import { getCategoryFromPath } from '../composables/hookCategories'

const currentCategory = ref<string | null>(null)
const route = useRoute()

const categoryDescriptions: Record<string, string> = {
  State: 'Hooks for state transitions, value history, and controlled update frequency.',
  Elements: 'Hooks for working with DOM elements, interaction zones, and element-driven behavior.',
  Browser: 'Hooks for browser APIs, viewport behavior, and page-level UI state.',
  Sensors: 'Hooks powered by observer APIs and user activity signals from the environment.',
  Network: 'Hooks for async flows, cancellation, and data request lifecycle handling.',
  Animation: 'Hooks focused on animation-frame aligned state updates and smooth rendering.',
  Component: 'Hooks for component lifecycle orchestration and mount/unmount safety.',
  Watch: 'Hooks for listening to events and reacting to external changes over time.',
  Reactivity: 'Hooks for stable callbacks and predictable reactive function behavior.',
  Array: 'Hooks for array-oriented helpers and collection-focused state patterns.',
  Time: 'Hooks for timers, intervals, and time-driven UI logic.',
  Utilities: 'General-purpose utility hooks for storage and reusable cross-cutting behavior.',
}

function syncCategoryFromHash() {
  if (typeof window === 'undefined') return
  const fromPath = getCategoryFromPath(route.path)
  if (fromPath) {
    currentCategory.value = fromPath
    return
  }
  const hash = window.location.hash || ''
  if (!hash) {
    currentCategory.value = null
    return
  }

  const params = new URLSearchParams(hash.replace(/^#/, ''))
  const category = params.get('category')
  currentCategory.value = category && categoryDescriptions[category] ? category : null
}

onMounted(() => {
  syncCategoryFromHash()
  window.addEventListener('hashchange', syncCategoryFromHash)
})
watch(() => route.path, syncCategoryFromHash)

onUnmounted(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('hashchange', syncCategoryFromHash)
})

const title = computed(() => currentCategory.value || 'Functions')
const description = computed(
  () =>
    (currentCategory.value && categoryDescriptions[currentCategory.value]) ||
    'Explore hooks by category from the left sidebar and jump into implementation details quickly.',
)
</script>

<template>
  <header class="functions-category-header">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </header>
</template>

<style scoped>
.functions-category-header {
  margin-bottom: 1rem;
}

.functions-category-header h1 {
  margin: 0;
}

.functions-category-header p {
  margin-top: 0.45rem;
  color: var(--vp-c-text-2);
}
</style>
