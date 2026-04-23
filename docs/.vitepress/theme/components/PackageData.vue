<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../index.data'
import exportSizes from '../../../export-size.json'
import ssrSupport from '../../../ssr-support.json'
import { getCategoryPath, normalizeHookCategory } from '../composables/hookCategories'

const props = defineProps<{ fn: string }>()

const info = computed(() => {
  const raw = posts.find((item) => item.sidebar_label === props.fn)!
  return {
    ...raw,
    category: normalizeHookCategory(raw.sidebar_label, raw.category),
  }
})
const link = computed(() => getCategoryPath(info.value!.category!))

const { size, gzipped } = exportSizes[props.fn as keyof typeof exportSizes] || {}

const supportsSsr = computed(() => Boolean(ssrSupport[props.fn as keyof typeof ssrSupport]))
</script>

<template>
  <div class="grid grid-cols-[100px_auto] gap-2 text-sm mt-4 mb-8 items-start">
    <div opacity="50">Category</div>
    <div>
      <a :href="link">{{ info.category }}</a>
    </div>

    <div opacity="50">Export Size</div>
    <div>{{ size }}</div>

    <template v-if="gzipped">
      <div opacity="50">Gzipped</div>
      <div>{{ gzipped }}</div>
    </template>

    <div opacity="50">SSR</div>
    <div>
      <span :class="['ssr-badge', supportsSsr ? 'ssr-badge--ok' : 'ssr-badge--no']">
        {{ supportsSsr ? 'SSR support' : 'Not support' }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.ssr-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
}

.ssr-badge--ok {
  background: #dcfce7;
  color: #166534;
}

.ssr-badge--no {
  background: #fee2e2;
  color: #991b1b;
}
</style>
