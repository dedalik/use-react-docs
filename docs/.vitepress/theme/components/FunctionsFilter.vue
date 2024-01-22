<script setup lang="ts">
import type { Ref } from "vue";
import { computed, toRef } from "vue";
import Fuse from "fuse.js";
import { useEventListener, useUrlSearchParams } from "@vueuse/core";
import { data as posts } from "./../index.data";

const categoryNames = ["Browser", "Elements", "State"];

const coreCategories = categoryNames.filter((i) => !i.startsWith("@"));
const sortMethods = ["category", "title"];

useEventListener("click", (e) => {
  if (e.target.tagName === "A") window.dispatchEvent(new Event("hashchange"));
});

const query = useUrlSearchParams("hash-params", { removeFalsyValues: true });
const search = toRef(query, "search") as Ref<string | null>;
const category = toRef(query, "category") as Ref<string | null>;
const sortMethod = toRef(query, "sort") as Ref<
  "category" | "title" | "updated" | null
>;

const showCategory = computed(
  () => !search.value && (!sortMethod.value || sortMethod.value === "category")
);

const items = computed(() => {
  let fn = posts.filter((i) => !i.internal);
  if (!category.value) return fn;
  return fn.filter((item) => item.category === category.value);
});

const fuse = computed(
  () => new Fuse(items.value, { keys: ["title", "sidebar_label"] })
);
const result = computed(() => {
  if (search.value) {
    return fuse.value.search(search.value).map((i) => i.item);
  } else {
    return items.value;
  }
});

const hasFilters = computed(() =>
  Boolean(search.value || category.value || sortMethod.value === "title")
);

function resetFilters() {
  sortMethod.value = null;
  category.value = null;
  search.value = null;
}

function toggleCategory(cate: string) {
  category.value = category.value === cate ? null : cate;
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

    <template v-for="(fn, idx) of result" :key="fn.name">
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
