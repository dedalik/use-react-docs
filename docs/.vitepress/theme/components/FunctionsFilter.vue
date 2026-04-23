<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vitepress";
import Fuse from "fuse.js";
import { data as posts } from "./../index.data";
import { getCategoryFromPath, getCategoryPath, normalizeHookCategory } from "../composables/hookCategories";

const categoryOrder = [
  "State",
  "Elements",
  "Browser",
  "Sensors",
  "Network",
  "Animation",
  "Component",
  "Watch",
  "Reactivity",
  "Array",
  "Time",
  "Utilities",
];

const normalizedPosts = computed(() =>
  posts
    .map((item) => ({
      ...item,
      category: normalizeHookCategory(item.sidebar_label, item.category),
    }))
    .filter((item) => Boolean(item.sidebar_label)),
);

const coreCategories = computed(() => {
  const existingCategories = Array.from(
    new Set(
      normalizedPosts.value
        .map((item) => item.category)
        .filter(Boolean),
    ),
  ) as string[];

  const ordered = categoryOrder.filter((categoryName) =>
    existingCategories.includes(categoryName),
  );

  const unknown = existingCategories.filter(
    (categoryName) => !categoryOrder.includes(categoryName),
  );

  return [...ordered, ...unknown];
});
const sortMethods = ["category", "title"];
const route = useRoute();
const search = ref("");
const sortMethod = ref<"category" | "title" | "updated" | null>(null);
const category = computed(() => getCategoryFromPath(route.path));

const showCategory = computed(
  () => !search.value && (!sortMethod.value || sortMethod.value === "category")
);

const items = computed(() => {
  let fn = normalizedPosts.value.filter((i) => !i.internal);
  if (!category.value) return fn;
  return fn.filter((item) => item.category === category.value);
});

const fuse = computed(
  () => new Fuse(items.value, { keys: ["title", "sidebar_label"] })
);
const result = computed(() => {
  const sorted = [...items.value].sort((a, b) => {
    const categoryCompare = String(a.category || "").localeCompare(String(b.category || ""));
    if (categoryCompare !== 0) return categoryCompare;
    return String(a.sidebar_label || "").localeCompare(String(b.sidebar_label || ""));
  });

  if (search.value) {
    return fuse.value.search(search.value).map((i) => i.item);
  } else {
    return sorted;
  }
});

const hasFilters = computed(() =>
  Boolean(search.value || category.value || sortMethod.value)
);

function resetFilters() {
  sortMethod.value = null;
  search.value = "";
  if (category.value && typeof window !== "undefined") {
    window.location.href = "/functions/";
  }
}

function toggleCategory(cate: string) {
  if (typeof window === "undefined") return;
  if (category.value === cate) {
    window.location.href = "/functions/";
    return;
  }
  window.location.href = getCategoryPath(cate);
}

function toggleSort(method: string) {
  sortMethod.value = method as any;
}
function styledName(name: string) {
  if (name.startsWith("use"))
    return `<span opacity="70">use</span>${name.slice(3)}`;
  if (name.startsWith("try"))
    return `<span opacity="70">try</span>${name.slice(3)}`;
  if (name.startsWith("on"))
    return `<span opacity="70">on</span>${name.slice(2)}`;
  return name;
}

function getLink(name: string) {
  return `/functions/${name}`;
}
</script>

<template>
  <div class="grid grid-cols-[80px_auto] gap-y-2 mt-10">
    <div opacity="80" text="sm">Core</div>
    <div flex="~ wrap" gap="2" m="b-2">
      <button
        v-for="cate of coreCategories"
        :key="cate"
        class="select-button"
        :class="{ active: category === cate }"
        @click="toggleCategory(cate)"
      >
        {{ cate }}
      </button>
    </div>

    <!-- <div opacity="80" text="sm">Add-ons</div>
    <div flex="~ wrap" gap="2" m="b-2">
      <button
        v-for="cate of addonCategories"
        :key="cate"
        class="select-button"
        :class="{ active: category === cate }"
        @click="toggleCategory(cate)"
      >
        {{ cate.slice(1) }}
      </button>
    </div> -->

    <div opacity="80" text="sm">Sort by</div>
    <div flex="~ wrap" gap="2" m="b-2">
      <button v-if="search" class="select-button active">Search</button>
      <button
        v-for="method of sortMethods"
        :key="method"
        class="select-button capitalize"
        :class="{
          active: method === (sortMethod || 'category'),
          disabled: search,
        }"
        @click="toggleSort(method)"
      >
        {{ method }}
      </button>
    </div>
    <!-- <div opacity="80" text="sm">Filters</div>
    <div flex="~ gap-4">
      <label class="checkbox">
        <input v-model="hasComponent" type="checkbox" />
        <span>Has Component</span>
      </label>
      <label class="checkbox">
        <input v-model="hasDirective" type="checkbox" />
        <span>Has Directive</span>
      </label>
    </div> -->
  </div>
  <div h="1px" bg="$vp-c-divider" m="t-4" />
  <div flex="~" class="children:my-auto" p="2">
    <i i-carbon-search m="r-2" opacity="50" />
    <input
      v-model="search"
      class="w-full"
      type="text"
      role="search"
      placeholder="Search..."
    />
  </div>
  <div h="1px" bg="$vp-c-divider" m="b-4" />
  <div flex="~ col gap-3" class="relative" p="t-5">
    <div
      v-if="hasFilters"
      class="transition mb-2 opacity-60 absolute -top-3 right-0 z-10"
    >
      <button
        class="select-button flex gap-1 items-center !px-2 !py-1"
        @click="resetFilters()"
      >
        <i i-carbon-filter-remove />
        Clear Filters
      </button>
    </div>

    <template v-for="(fn, idx) of result" :key="fn.sidebar_label">
      <h3
        v-if="showCategory && fn.category !== result[idx - 1]?.category"
        opacity="60"
        class="!text-16px !tracking-wide !m-0"
        p="y-2"
      >
        {{ fn.category }}
      </h3>
      <div
        text="sm"
        flex="~ gap1"
        items-center
        :class="fn.deprecated ? 'op80 saturate-0' : ''"
      >
        <a
          :href="getLink(fn.sidebar_label)"
          my-auto
          :class="fn.deprecated ? 'line-through !decoration-solid' : ''"
        >
          <code v-html="styledName(fn.sidebar_label)" />
        </a>
        <i v-if="fn.external" i-carbon-launch class="opacity-50 text-0.7rem" />
        <span op50>-</span>
        <span class="whitespace-wrap" v-html="fn.title" />
      </div>
    </template>

    <div v-if="!result.length" text-center pt-6>
      <div m2 op50>No result matched</div>
      <button
        class="select-button flex-inline gap-1 items-center !px-2 !py-1"
        @click="resetFilters()"
      >
        <i i-carbon-filter-remove />
        Clear Filters
      </button>
    </div>
  </div>
</template>
