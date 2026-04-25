<script setup lang="ts">
import { totalHooks } from '../../data/hookCatalog'
</script>

<template>
  <div class="home-hero-stats" aria-label="Project highlights">
    <div class="home-hero-stats__bar">
      <div class="home-hero-stats__cell">
        <span class="home-hero-stats__value">{{ totalHooks }}</span>
        <span class="home-hero-stats__label">hooks</span>
      </div>
      <div class="home-hero-stats__sep" aria-hidden="true" />
      <div class="home-hero-stats__cell">
        <span class="home-hero-stats__value home-hero-stats__value--text">Tree-shakable</span>
        <span class="home-hero-stats__label">imports</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-hero-stats {
  margin: 1rem auto 2rem;
  max-width: 1152px;
  padding: 0 24px;
}

.home-hero-stats__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  max-width: 42rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
}

.home-hero-stats__cell {
  flex: 1 1 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;
  padding: 0.85rem 1.15rem;
  min-width: 0;
}

.home-hero-stats__sep {
  flex: 0 0 1px;
  width: 1px;
  margin: 0.65rem 0;
  align-self: stretch;
  background: var(--vp-c-divider);
}

@media (max-width: 520px) {
  .home-hero-stats__sep {
    flex: 1 1 100%;
    width: auto;
    height: 1px;
    margin: 0 0.85rem;
    align-self: stretch;
  }
}

.home-hero-stats__value {
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
}

.home-hero-stats__value--text {
  font-size: clamp(1rem, 1.65vw, 1.2rem);
  font-weight: 600;
  letter-spacing: -0.015em;
}

.home-hero-stats__label {
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: 0.01em;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .home-hero-stats {
    padding: 0 18px;
  }
}
</style>
