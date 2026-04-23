<script setup lang="ts">
import { computed } from "vue";
import { useData, useRoute } from "vitepress";

const route = useRoute();
const { frontmatter } = useData();

const isHomePage = computed(() => Boolean(frontmatter.value?.layout === "home"));
const isDocsPage = computed(() => route.path !== "/" && !isHomePage.value);
</script>

<template>
  <div v-if="isDocsPage" class="import-guide">
    <h2>Import options (for bundle optimization)</h2>
    <p>
      You can use either named imports or direct per-hook imports. For the smallest bundle and predictable tree-shaking,
      prefer direct imports when you only need one hook.
    </p>

    <h3>Recommended: direct import (single hook)</h3>
    <pre><code>import useDebounce from "@dedalik/use-react/useDebounce";
import useMediaQuery from "@dedalik/use-react/useMediaQuery";</code></pre>

    <h3>Also supported: named import (multiple hooks)</h3>
    <pre><code>import { useDebounce, useMediaQuery } from "@dedalik/use-react";</code></pre>

    <h3>When to choose which</h3>
    <ul>
      <li><strong>Single hook:</strong> use direct import.</li>
      <li><strong>Several hooks:</strong> named import is convenient and still tree-shake friendly in modern bundlers.</li>
      <li><strong>Legacy/unknown bundler setup:</strong> direct import is the safest optimization path.</li>
    </ul>
  </div>
</template>

<style scoped>
.import-guide {
  margin: 1rem 0 2rem;
  padding: 1rem 1rem 0.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.import-guide h2 {
  margin-top: 0;
}

.import-guide pre {
  margin: 0.75rem 0 1rem;
}
</style>
