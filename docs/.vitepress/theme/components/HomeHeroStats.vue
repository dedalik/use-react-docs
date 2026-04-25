<script setup lang="ts">
import { totalHooks } from '../../data/hookCatalog'
</script>

<template>
  <div class="home-hero-stats" aria-label="Project highlights">
    <div class="home-hero-stats__badge home-hero-stats__badge--primary">
      <span class="home-hero-stats__value">{{ totalHooks }}</span>
      <span class="home-hero-stats__label">hooks</span>
    </div>
    <div class="home-hero-stats__badge">
      <span class="home-hero-stats__value home-hero-stats__value--small">Tree-shakable</span>
      <span class="home-hero-stats__label">imports</span>
    </div>
  </div>
</template>

<style scoped>
.home-hero-stats {
  margin: 1rem auto 2rem;
  max-width: 1152px;
  padding: 0 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.home-hero-stats__badge {
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

.home-hero-stats__badge--primary {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 35%, var(--vp-c-divider));
}

.home-hero-stats__value {
  display: block;
  font-size: clamp(1.35rem, 2.2vw, 1.8rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
}

.home-hero-stats__value--small {
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  letter-spacing: -0.01em;
}

.home-hero-stats__label {
  margin-top: 0.2rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .home-hero-stats {
    padding: 0 18px;
  }
}
</style>
