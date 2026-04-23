<script setup lang="ts">
import { computed } from "vue"
import { withBase } from "vitepress"
import ssrSupport from "../../../ssr-support.json"
import { hookCategoriesCatalog } from "../../data/hookCatalog"

type SsrMap = Record<string, boolean>

const ssrMap = ssrSupport as SsrMap

const flatHooks = computed(() => hookCategoriesCatalog.flatMap((c) => c.hooks))

const ssrSafe = computed(() =>
  flatHooks.value
    .filter((h) => ssrMap[h.name] === true)
    .sort((a, b) => a.name.localeCompare(b.name)),
)

const clientOnly = computed(() =>
  flatHooks.value
    .filter((h) => ssrMap[h.name] === false)
    .sort((a, b) => a.name.localeCompare(b.name)),
)

const unknown = computed(() =>
  flatHooks.value.filter((h) => typeof ssrMap[h.name] !== "boolean").sort((a, b) => a.name.localeCompare(b.name)),
)
</script>

<template>
  <section class="home-ssr" aria-labelledby="home-ssr-title">
    <div class="home-ssr__inner">
      <h2 id="home-ssr-title" class="home-ssr__title">SSR snapshot</h2>
      <p class="home-ssr__lead">
        Quick view of documented SSR compatibility (
        <code class="home-ssr__code">docs/ssr-support.json</code>
        ). For patterns and guards, see
        <a :href="`${withBase('/guide/configurations')}#ssr-safety`">SSR safety</a>
        in Configurations.
      </p>

      <div class="home-ssr__grid">
        <div class="home-ssr__col">
          <h3 class="home-ssr__col-title home-ssr__col-title--ok">SSR-safe</h3>
          <ul class="home-ssr__list">
            <li v-for="h in ssrSafe" :key="h.name">
              <a class="home-ssr__link" :href="withBase(h.link)">
                <code>{{ h.name }}</code>
              </a>
            </li>
          </ul>
        </div>
        <div class="home-ssr__col">
          <h3 class="home-ssr__col-title home-ssr__col-title--warn">Client-first</h3>
          <p class="home-ssr__hint">Expect browser APIs; guard or lazy-load on the server.</p>
          <ul class="home-ssr__list">
            <li v-for="h in clientOnly" :key="h.name">
              <a class="home-ssr__link" :href="withBase(h.link)">
                <code>{{ h.name }}</code>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p v-if="unknown.length" class="home-ssr__missing">
        Missing SSR entries:
        <span v-for="h in unknown" :key="h.name" class="home-ssr__missing-item">
          <code>{{ h.name }}</code>
        </span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.home-ssr {
  margin: 0 auto;
  max-width: 1160px;
  padding: 0 1.5rem 3.5rem;
}

.home-ssr__inner {
  padding: 1.75rem 1.5rem 1.5rem;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 80%, transparent);
  background: var(--vp-c-bg-soft);
}

.home-ssr__title {
  margin: 0 0 0.5rem;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.home-ssr__lead {
  margin: 0 0 1.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.home-ssr__code {
  font-size: 0.82em;
}

.home-ssr__grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .home-ssr__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.home-ssr__col-title {
  margin: 0 0 0.65rem;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.home-ssr__col-title--ok {
  color: var(--vp-c-brand-1);
}

.home-ssr__col-title--warn {
  color: #b45309;
}

.dark .home-ssr__col-title--warn {
  color: #fbbf24;
}

.home-ssr__hint {
  margin: -0.35rem 0 0.65rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
}

.home-ssr__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.home-ssr__link {
  font-size: 0.85rem;
  text-decoration: none;
  color: var(--vp-c-brand-1);
}

.home-ssr__link code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.82rem;
}

.home-ssr__link:hover {
  text-decoration: underline;
}

.home-ssr__missing {
  margin: 1.25rem 0 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.home-ssr__missing-item {
  margin-right: 0.5rem;
}
</style>
