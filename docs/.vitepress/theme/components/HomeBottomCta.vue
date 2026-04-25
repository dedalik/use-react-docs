<script setup lang="ts">
import { ref } from 'vue'
import { withBase } from 'vitepress'

const INSTALL = 'npm i @dedalik/use-react'
const NPM_PKG = 'https://www.npmjs.com/package/@dedalik/use-react'
const GITHUB_REPO = 'https://github.com/dedalik/use-react'

const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | null = null

async function copyInstall() {
  try {
    await navigator.clipboard.writeText(INSTALL)
    copied.value = true
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copied.value = false
      copyTimer = null
    }, 2000)
  } catch {
    // ignore
  }
}
</script>

<template>
  <section class="home-cta" aria-labelledby="home-cta-title">
    <div class="home-cta__glow" aria-hidden="true" />
    <div class="home-cta__inner">
      <div class="home-cta__intro">
        <h2 id="home-cta-title" class="home-cta__title">Ready when you are</h2>
        <p class="home-cta__lead">
          Add the package, skim the guide, and pull in only the hooks you need - same APIs you saw in the live demos
          above.
        </p>
      </div>

      <div class="home-cta__grid">
        <article class="home-cta__card">
          <span class="home-cta__kicker">Install</span>
          <h3 class="home-cta__card-title">From npm</h3>
          <p class="home-cta__card-desc">Works with any React 17+ app. Tree-shaking friendly.</p>
          <div class="home-cta__cmd-row">
            <code class="home-cta__cmd" tabindex="0">{{ INSTALL }}</code>
            <button type="button" class="home-cta__copy" :aria-label="copied ? 'Copied' : 'Copy install command'" @click="copyInstall">
              {{ copied ? 'Copied' : 'Copy' }}
            </button>
          </div>
          <a class="home-cta__link" :href="NPM_PKG" rel="noopener noreferrer" target="_blank">Open package on npm →</a>
        </article>

        <article class="home-cta__card home-cta__card--accent">
          <span class="home-cta__kicker">Community</span>
          <h3 class="home-cta__card-title">Star on GitHub</h3>
          <p class="home-cta__card-desc">Issues, roadmap, and source for every hook - stars help others find the project.</p>
          <a class="home-cta__btn home-cta__btn--github" :href="GITHUB_REPO" rel="noopener noreferrer" target="_blank">
            <svg class="home-cta__gh-icon" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" focusable="false">
              <path
                fill="currentColor"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
            Star dedalik/use-react
          </a>
        </article>

        <article class="home-cta__card">
          <span class="home-cta__kicker">Learn</span>
          <h3 class="home-cta__card-title">Explore the API</h3>
          <p class="home-cta__card-desc">Every export with sizes, SSR notes, and runnable snippets.</p>
          <a class="home-cta__btn home-cta__btn--brand" :href="withBase('/functions/')">Browse all functions</a>
          <a class="home-cta__link" :href="withBase('/guide/get-started')">Get started guide →</a>
        </article>
      </div>

      <nav class="home-cta__meta" aria-label="Quick links">
        <a :href="GITHUB_REPO + '/issues'" rel="noopener noreferrer" target="_blank">Issues</a>
        <span class="home-cta__meta-dot" aria-hidden="true">·</span>
        <a :href="GITHUB_REPO + '/tags'" rel="noopener noreferrer" target="_blank">Releases</a>
        <span class="home-cta__meta-dot" aria-hidden="true">·</span>
        <a :href="GITHUB_REPO + '/blob/main/LICENSE'" rel="noopener noreferrer" target="_blank">License</a>
      </nav>
    </div>
  </section>
</template>

<style scoped>
.home-cta {
  position: relative;
  margin-top: 0.5rem;
  padding: 3.25rem 1.5rem 4.5rem;
  border-top: 1px solid color-mix(in srgb, var(--vp-c-divider) 85%, transparent);
  overflow: hidden;
}

.home-cta__glow {
  pointer-events: none;
  position: absolute;
  left: 50%;
  bottom: -40%;
  width: 120%;
  max-width: 900px;
  height: 70%;
  transform: translateX(-50%);
  background: radial-gradient(ellipse 70% 50% at 50% 100%, var(--vp-c-brand-soft) 0%, transparent 70%);
  opacity: 0.45;
}

.home-cta__inner {
  position: relative;
  z-index: 1;
  margin: 0 auto;
  max-width: 1160px;
}

.home-cta__intro {
  text-align: center;
  max-width: 40rem;
  margin: 0 auto 2.5rem;
}

.home-cta__title {
  margin: 0 0 0.65rem;
  font-size: clamp(1.5rem, 2.4vw, 1.95rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: var(--vp-c-text-1);
}

.home-cta__lead {
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

.home-cta__grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
}

@media (min-width: 860px) {
  .home-cta__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: stretch;
  }
}

.home-cta__card {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 1.35rem 1.4rem 1.45rem;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 78%, transparent);
  background: linear-gradient(
    155deg,
    color-mix(in srgb, var(--vp-c-bg-soft) 94%, var(--vp-c-brand-1)) 0%,
    color-mix(in srgb, var(--vp-c-bg-soft) 98%, transparent) 55%
  );
  box-shadow: 0 18px 40px -28px color-mix(in srgb, var(--vp-c-brand-1) 35%, transparent);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.home-cta__card:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 28%, var(--vp-c-divider));
  box-shadow: 0 22px 48px -26px color-mix(in srgb, var(--vp-c-brand-1) 42%, transparent);
  transform: translateY(-2px);
}

.home-cta__card--accent {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 32%, var(--vp-c-divider));
  background: linear-gradient(
    160deg,
    color-mix(in srgb, var(--vp-c-brand-soft) 55%, var(--vp-c-bg-soft)) 0%,
    color-mix(in srgb, var(--vp-c-bg-soft) 96%, transparent) 70%
  );
}

.home-cta__kicker {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
}

.home-cta__card-title {
  margin: 0 0 0.45rem;
  font-size: 1.12rem;
  font-weight: 750;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.home-cta__card-desc {
  margin: 0 0 1.1rem;
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.home-cta__cmd-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.home-cta__cmd {
  flex: 1 1 12rem;
  margin: 0;
  padding: 0.55rem 0.75rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  line-height: 1.45;
  color: var(--vp-c-text-1);
  background: color-mix(in srgb, var(--vp-c-bg) 88%, var(--vp-c-bg-alt));
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 80%, transparent);
  border-radius: 10px;
  overflow-x: auto;
}

.home-cta__copy {
  flex-shrink: 0;
  padding: 0.5rem 0.95rem;
  font-size: 0.78rem;
  font-weight: 650;
  letter-spacing: 0.03em;
  color: var(--vp-c-text-1);
  background: color-mix(in srgb, var(--vp-c-bg-soft) 90%, var(--vp-c-brand-1));
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 35%, var(--vp-c-divider));
  border-radius: 999px;
  cursor: pointer;
  transition:
    color 0.15s ease,
    background 0.15s ease,
    border-color 0.15s ease;
}

.home-cta__copy:hover {
  color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, var(--vp-c-bg-soft));
}

.home-cta__copy:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.home-cta__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: fit-content;
  max-width: 100%;
  padding: 0.62rem 1.15rem;
  font-size: 0.88rem;
  font-weight: 650;
  text-decoration: none;
  border-radius: 11px;
  transition:
    color 0.15s ease,
    background 0.15s ease,
    border-color 0.15s ease,
    transform 0.15s ease;
}

.home-cta__btn--github {
  color: var(--vp-c-text-1);
  background: color-mix(in srgb, var(--vp-c-bg) 92%, var(--vp-c-bg-alt));
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 85%, transparent);
}

.home-cta__btn--github:hover {
  color: var(--vp-c-brand-1);
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 35%, var(--vp-c-divider));
  transform: translateY(-1px);
}

.home-cta__btn--brand {
  color: var(--vp-c-bg);
  background: linear-gradient(135deg, var(--vp-c-brand-1) 0%, color-mix(in srgb, var(--vp-c-brand-1) 75%, var(--vp-c-brand-2, #646cff)) 100%);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 40%, transparent);
  box-shadow: 0 10px 28px -16px color-mix(in srgb, var(--vp-c-brand-1) 55%, transparent);
}

.home-cta__btn--brand:hover {
  filter: brightness(1.06);
  transform: translateY(-1px);
}

.home-cta__gh-icon {
  flex-shrink: 0;
  opacity: 0.92;
}

.home-cta__link {
  margin-top: auto;
  padding-top: 0.35rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.home-cta__link:hover {
  text-decoration: underline;
}

.home-cta__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.35rem 0.5rem;
  margin-top: 2.25rem;
  font-size: 0.84rem;
  font-weight: 500;
}

.home-cta__meta a {
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.home-cta__meta a:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

.home-cta__meta-dot {
  color: var(--vp-c-text-3);
  user-select: none;
}

.dark .home-cta__btn--brand {
  color: var(--vp-c-bg);
}
</style>
