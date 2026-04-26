<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { homeStateDemos } from '../../data/homeStateDemos'

/** Open card ids - several demos can stay open at once. */
const expandedDemos = ref<string[]>([])

/** All State cards show full preview (overrides per-card list for display). */
const showAllDemos = ref(true)

const anyDemosOpen = computed(() => showAllDemos.value || expandedDemos.value.length > 0)

function isCardExpanded(demo: string) {
  return showAllDemos.value || expandedDemos.value.includes(demo)
}

function toggleShowAllDemos() {
  if (anyDemosOpen.value) {
    showAllDemos.value = false
    expandedDemos.value = []
  } else {
    showAllDemos.value = true
  }
}

function onDemoItemClick(demo: string, ev: MouseEvent) {
  const el = ev.target as HTMLElement | null
  if (!el) return

  if (el.closest('.hook-live-demo__title-link')) return

  const open = isCardExpanded(demo)

  if (open) {
    if (!el.closest('.hook-live-demo__header')) return
    if (showAllDemos.value) {
      showAllDemos.value = false
      expandedDemos.value = homeStateDemos.map((i) => i.demo).filter((d) => d !== demo)
    } else {
      expandedDemos.value = expandedDemos.value.filter((d) => d !== demo)
    }
    return
  }

  if (!expandedDemos.value.includes(demo)) {
    expandedDemos.value = [...expandedDemos.value, demo]
  }
}

function onDemoItemKeydown(demo: string, ev: KeyboardEvent) {
  if (ev.key !== 'Enter' && ev.key !== ' ') return
  if (ev.target !== ev.currentTarget) return
  ev.preventDefault()
  const open = isCardExpanded(demo)
  if (open) {
    if (showAllDemos.value) {
      showAllDemos.value = false
      expandedDemos.value = homeStateDemos.map((i) => i.demo).filter((d) => d !== demo)
    } else {
      expandedDemos.value = expandedDemos.value.filter((d) => d !== demo)
    }
  } else if (!expandedDemos.value.includes(demo)) {
    expandedDemos.value = [...expandedDemos.value, demo]
  }
}
</script>

<template>
  <div id="live-demos" class="home-showcase" aria-labelledby="home-showcase-title" tabindex="-1">
    <div class="home-showcase__glow-clip" aria-hidden="true">
      <div class="home-showcase__glow" />
    </div>

    <div class="home-showcase__inner">
      <h2 id="home-showcase-title" class="home-showcase__title">Live component examples</h2>
      <p class="home-showcase__intro">
        These are real in-page previews: each card links to the hook’s full reference. More categories will land here
        next.
      </p>

      <section class="home-showcase__section" aria-labelledby="home-showcase-state-title">
        <div class="home-showcase__section-head">
          <h3 id="home-showcase-state-title" class="home-showcase__section-title">State</h3>
          <div class="home-showcase__toggle-sticky">
            <button
              type="button"
              class="home-showcase__toggle"
              :aria-expanded="anyDemosOpen"
              aria-controls="home-state-demos-panel"
              @click="toggleShowAllDemos"
            >
              <span class="home-showcase__toggle-icon" aria-hidden="true">
                <svg
                  v-if="anyDemosOpen"
                  class="home-showcase__toggle-svg"
                  viewBox="0 0 12 12"
                  width="12"
                  height="12"
                  focusable="false"
                >
                  <path
                    d="M2.5 4.5L6 7.5L9.5 4.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  v-else
                  class="home-showcase__toggle-svg"
                  viewBox="0 0 12 12"
                  width="12"
                  height="12"
                  focusable="false"
                >
                  <path
                    d="M4.5 2.5L7.5 6L4.5 9.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span class="home-showcase__toggle-label"> {{ anyDemosOpen ? 'Hide' : 'Show' }} all demos </span>
            </button>
          </div>
        </div>
        <p class="home-showcase__section-lead">
          Toggles, counters, debounce, storage, ref history, and related helpers - click a card to open its live
          preview. Browse
          <a class="home-showcase__state-link" :href="withBase('/functions/state')">State in the function list →</a>
        </p>

        <div id="home-state-demos-panel" class="home-state-demos" role="list">
          <article
            v-for="(item, index) in homeStateDemos"
            :key="item.demo"
            class="home-state-demos__item"
            :class="{ 'home-state-demos__item--expanded': isCardExpanded(item.demo) }"
            :style="{ '--stagger': String(index) }"
            role="listitem"
            tabindex="0"
            :aria-expanded="isCardExpanded(item.demo)"
            @click="onDemoItemClick(item.demo, $event)"
            @keydown="onDemoItemKeydown(item.demo, $event)"
          >
            <HookLiveDemo
              :demo="item.demo"
              :title="item.title"
              :title-href="withBase(`/functions/${item.demo.split('/')[0]}`)"
            />
          </article>
        </div>
      </section>

      <!-- e.g. <section class="home-showcase__section" …> + homeBrowserDemos when ready -->
    </div>
  </div>
</template>

<style scoped>
.home-showcase {
  position: relative;
  margin: 0 auto;
  max-width: 1160px;
  padding: 3rem 1.5rem 4rem;
  scroll-margin-top: calc(var(--vp-nav-height, 64px) + 0.75rem);
}

/* Clip glow so transform/inset never widen the page (horizontal scrollbar). Sticky stays on .inner. */
.home-showcase__glow-clip {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.home-showcase__glow {
  pointer-events: none;
  position: absolute;
  inset: -40% -20% auto;
  height: 70%;
  background: radial-gradient(ellipse 80% 55% at 50% 0%, var(--vp-c-brand-soft) 0%, transparent 65%);
  opacity: 0.55;
  animation: home-glow-drift 14s ease-in-out infinite alternate;
}

@keyframes home-glow-drift {
  from {
    transform: translate3d(-4%, 0, 0) scale(1);
    opacity: 0.45;
  }
  to {
    transform: translate3d(4%, 2%, 0) scale(1.05);
    opacity: 0.65;
  }
}

.home-showcase__inner {
  position: relative;
  z-index: 1;
}

.home-showcase__title {
  font-size: clamp(1.65rem, 2.5vw, 2.1rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0 0 0.65rem;
  background: linear-gradient(120deg, var(--vp-c-text-1) 0%, var(--vp-c-brand-1) 120%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.dark .home-showcase__title {
  background: linear-gradient(120deg, var(--vp-c-text-1) 0%, color-mix(in srgb, var(--vp-c-brand-1) 85%, white) 130%);
  -webkit-background-clip: text;
  background-clip: text;
}

.home-showcase__intro {
  max-width: 52rem;
  margin: 0 0 2.25rem;
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

.home-showcase__section {
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
}

.home-showcase__section-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin-bottom: 0.5rem;
}

.home-showcase__toggle-sticky {
  position: sticky;
  top: calc(var(--vp-nav-height, 64px) + 0.5rem);
  z-index: 30;
  align-self: flex-start;
  margin-left: auto;
}

.home-showcase__section-title {
  margin: 0;
  font-size: clamp(1.2rem, 1.6vw, 1.4rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--vp-c-text-1);
}

.home-showcase__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.45rem 1rem 0.45rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.25;
  color: var(--vp-c-text-1);
  background: color-mix(in srgb, var(--vp-c-bg-soft) 88%, var(--vp-c-bg-alt));
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 78%, transparent);
  border-radius: 999px;
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.home-showcase__toggle-label {
  line-height: 1.2;
  padding: 0.02em 0 0;
}

.home-showcase__toggle:hover {
  color: var(--vp-c-brand-1);
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 40%, var(--vp-c-divider));
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, var(--vp-c-bg-soft));
}

.home-showcase__toggle:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.home-showcase__toggle-icon {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 0.9rem;
  height: 0.9rem;
  margin: 0;
  color: currentColor;
  opacity: 0.9;
}

.home-showcase__toggle-svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.home-showcase__section-lead {
  max-width: 52rem;
  margin: 0 0 1.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.home-showcase__state-link {
  display: inline;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  margin-left: 0.25rem;
  white-space: nowrap;
}

.home-showcase__state-link:hover {
  text-decoration: underline;
}

/* Two demos per row from tablet up; one column on narrow viewports. */
.home-state-demos {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 900px) {
  .home-state-demos {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.home-state-demos__item {
  --stagger: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
  opacity: 0;
  transform: translate3d(0, 10px, 0);
  animation: home-state-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(0.04s + (var(--stagger) * 0.02s));
  border-radius: 16px;
  outline-offset: 2px;
}

.home-state-demos__item:not(.home-state-demos__item--expanded) {
  cursor: pointer;
}

.home-state-demos__item:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
}

.home-state-demos__item :deep(.hook-live-demo) {
  margin: 0;
}

/* Collapsed: header only; expanded card shows preview + source as usual. */
.home-state-demos__item:not(.home-state-demos__item--expanded) :deep(.hook-live-demo__preview),
.home-state-demos__item:not(.home-state-demos__item--expanded) :deep(.hook-live-demo__source) {
  display: none !important;
}

.home-state-demos__item:not(.home-state-demos__item--expanded) :deep(.hook-live-demo__header) {
  border-bottom: none;
}

@keyframes home-state-in {
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-showcase__glow,
  .home-state-demos__item {
    animation: none !important;
  }

  .home-showcase__glow {
    opacity: 0.4;
  }

  .home-state-demos__item {
    opacity: 1;
    transform: none;
  }
}
</style>
