<script setup lang="ts">
import { withBase } from 'vitepress'
import { hookCategoriesCatalog, totalHooks } from '../../data/hookCatalog'
</script>

<template>
  <div class="home-showcase" aria-labelledby="home-showcase-title">
    <div class="home-showcase__glow" aria-hidden="true" />

    <div class="home-showcase__hero-badges" aria-label="Project highlights">
      <div class="home-showcase__hero-badge home-showcase__hero-badge--primary">
        <span class="home-showcase__hero-value">{{ totalHooks }}</span>
        <span class="home-showcase__hero-label">hooks</span>
      </div>
      <div class="home-showcase__hero-badge">
        <span class="home-showcase__hero-value home-showcase__hero-value--small">Tree-shakable</span>
        <span class="home-showcase__hero-label">imports</span>
      </div>
    </div>

    <div class="home-showcase__inner">
      <p class="home-showcase__eyebrow">
        <span class="home-showcase__pulse" aria-hidden="true" />
        <span>{{ totalHooks }} hooks</span>
        <span class="home-showcase__eyebrow-sep">·</span>
        <span>Tree-shakable imports</span>
      </p>

      <h2 id="home-showcase-title" class="home-showcase__title">Browse by category</h2>
      <p class="home-showcase__lead">
        Each hook is documented with types, copy-paste examples, and SSR notes where it matters. Jump into a category
        overview or open a hook directly.
      </p>

      <div class="home-showcase__grid">
        <article
          v-for="(cat, index) in hookCategoriesCatalog"
          :key="cat.id"
          class="home-card"
          :style="{ '--stagger': String(index) }"
        >
          <div class="home-card__head">
            <h3 class="home-card__title">
              <a class="home-card__title-link" :href="withBase(cat.overviewLink)">{{ cat.title }}</a>
            </h3>
            <span class="home-card__count" :data-empty="cat.hooks.length === 0">
              <template v-if="cat.hooks.length === 0">Soon</template>
              <template v-else> {{ cat.hooks.length }} hook{{ cat.hooks.length === 1 ? '' : 's' }} </template>
            </span>
          </div>
          <p class="home-card__desc">{{ cat.description }}</p>
          <ul v-if="cat.hooks.length" class="home-card__hooks" :aria-label="`${cat.title} hooks`">
            <li v-for="h in cat.hooks" :key="h.name">
              <a class="home-chip" :href="withBase(h.link)">
                <code>{{ h.name }}</code>
              </a>
            </li>
          </ul>
          <p v-else class="home-card__empty">More hooks landing here - watch the changelog.</p>
          <a class="home-card__cta" :href="withBase(cat.overviewLink)">Category overview →</a>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-showcase {
  position: relative;
  margin: 0 auto;
  max-width: 1160px;
  padding: 3rem 1.5rem 4rem;
  overflow: hidden;
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

.home-showcase__hero-badges {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.home-showcase__hero-badge {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  min-width: 170px;
  padding: 0.75rem 1rem;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 72%, transparent);
  background: linear-gradient(
    140deg,
    color-mix(in srgb, var(--vp-c-bg-soft) 92%, var(--vp-c-brand-1)) 0%,
    color-mix(in srgb, var(--vp-c-bg-soft) 96%, var(--vp-c-brand-soft)) 100%
  );
  box-shadow: 0 14px 30px -24px color-mix(in srgb, var(--vp-c-brand-1) 48%, transparent);
}

.home-showcase__hero-badge--primary {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 35%, var(--vp-c-divider));
}

.home-showcase__hero-value {
  display: block;
  font-size: clamp(1.35rem, 2.2vw, 1.8rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
}

.home-showcase__hero-value--small {
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  letter-spacing: -0.01em;
}

.home-showcase__hero-label {
  margin-top: 0.2rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.home-showcase__eyebrow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--vp-c-brand-1);
  margin: 0 0 1rem;
}

.home-showcase__eyebrow-sep {
  color: var(--vp-c-text-3);
  font-weight: 400;
}

.home-showcase__pulse {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--vp-c-brand-1) 45%, transparent);
  animation: home-pulse 2.4s ease-out infinite;
}

@keyframes home-pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--vp-c-brand-1) 45%, transparent);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px transparent;
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 transparent;
  }
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

.home-showcase__lead {
  max-width: 52rem;
  margin: 0 0 2.25rem;
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

.home-showcase__grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .home-showcase__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1100px) {
  .home-showcase__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.home-card {
  --stagger: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.35rem 1.35rem 1.15rem;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 80%, transparent);
  background: linear-gradient(
    155deg,
    color-mix(in srgb, var(--vp-c-bg-soft) 92%, var(--vp-c-brand-1)) 0%,
    var(--vp-c-bg-soft) 48%,
    var(--vp-c-bg-alt) 100%
  );
  box-shadow: 0 18px 40px -28px color-mix(in srgb, var(--vp-c-brand-1) 35%, transparent);
  opacity: 0;
  transform: translate3d(0, 14px, 0);
  animation: home-card-in 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(0.06s + (var(--stagger) * 0.045s));
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s ease,
    box-shadow 0.35s ease;
}

.home-card:hover {
  transform: translate3d(0, -4px, 0);
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 35%, var(--vp-c-divider));
  box-shadow: 0 22px 48px -22px color-mix(in srgb, var(--vp-c-brand-1) 42%, transparent);
}

@keyframes home-card-in {
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.home-card__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
}

.home-card__title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.home-card__title-link {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s ease;
}

.home-card__title-link:hover {
  color: var(--vp-c-brand-1);
}

.home-card__count {
  flex-shrink: 0;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
  color: var(--vp-c-brand-1);
}

.home-card__count[data-empty='true'] {
  background: color-mix(in srgb, var(--vp-c-text-3) 22%, transparent);
  color: var(--vp-c-text-2);
}

.home-card__desc {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  flex: 1;
}

.home-card__hooks {
  list-style: none;
  margin: 0.15rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.home-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.28rem 0.55rem;
  border-radius: 10px;
  font-size: 0.78rem;
  text-decoration: none;
  color: var(--vp-c-text-code);
  background: color-mix(in srgb, var(--vp-c-bg-alt) 88%, var(--vp-c-brand-1));
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 70%, transparent);
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.home-chip:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 45%, var(--vp-c-divider));
  transform: translateY(-1px);
}

.home-chip code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
}

.home-card__empty {
  margin: 0.15rem 0 0;
  font-size: 0.85rem;
  font-style: italic;
  color: var(--vp-c-text-3);
}

.home-card__cta {
  margin-top: 0.15rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  align-self: flex-start;
}

.home-card__cta:hover {
  text-decoration: underline;
}

@media (prefers-reduced-motion: reduce) {
  .home-showcase__glow,
  .home-showcase__pulse,
  .home-card {
    animation: none !important;
  }

  .home-showcase__glow {
    opacity: 0.4;
  }

  .home-card {
    opacity: 1;
    transform: none;
  }

  .home-card:hover {
    transform: none;
  }
}
</style>
