<script setup lang="ts">
import { computed } from "vue";
import sidebars from "../../../../utils/sidebars.json";
import exportSizes from "../../../export-size.json";

const props = defineProps<{ fn: string }>();

const functions = sidebars[0].items;

const info = computed(() => functions.find((i) => i.name === props.fn)!);
const link = computed(
  () => `/functions/#category=${encodeURIComponent(info.value!.category!)}`
);

const { size, gzipped } =
  exportSizes[info.value!.name as keyof typeof exportSizes] || {};
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
  </div>
</template>
