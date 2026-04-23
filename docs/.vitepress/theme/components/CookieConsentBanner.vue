<script setup lang="ts">
import { onMounted, ref } from "vue"
import { loadGoogleAnalytics, readStoredConsent, writeStoredConsent } from "../analytics"

/** Shown only after mount when no prior choice exists (avoids SSR mismatch and flash for returning users). */
const open = ref(false)

onMounted(() => {
  const stored = readStoredConsent()
  if (stored === "granted") {
    loadGoogleAnalytics()
    return
  }
  if (stored === "denied") return
  open.value = true
})

function accept() {
  writeStoredConsent("granted")
  loadGoogleAnalytics()
  open.value = false
}

function decline() {
  writeStoredConsent("denied")
  open.value = false
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="cookie-consent"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <p id="cookie-consent-title" class="cookie-consent__title">Cookies and analytics</p>
      <p id="cookie-consent-desc" class="cookie-consent__text">
        We use Google Analytics to understand how the documentation is used. It only runs if you accept.
        Declining stores your choice in this browser and does not load analytics scripts.
      </p>
      <div class="cookie-consent__actions">
        <button type="button" class="cookie-consent__btn cookie-consent__btn--primary" @click="accept">
          OK
        </button>
        <button type="button" class="cookie-consent__btn cookie-consent__btn--ghost" @click="decline">
          Cancel
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.cookie-consent {
  position: fixed;
  z-index: 10050;
  right: 16px;
  bottom: 16px;
  left: 16px;
  max-width: 380px;
  margin-left: auto;
  padding: 16px 18px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.18);
  font-size: 13px;
  line-height: 1.45;
}

html.dark .cookie-consent {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
}

.cookie-consent__title {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.cookie-consent__text {
  margin: 0 0 14px;
  color: var(--vp-c-text-2);
}

.cookie-consent__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
}

.cookie-consent__btn {
  cursor: pointer;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid transparent;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.cookie-consent__btn:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.cookie-consent__btn--primary {
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  border-color: var(--vp-button-brand-border);
}

.cookie-consent__btn--primary:hover {
  background: var(--vp-button-brand-hover-bg);
  border-color: var(--vp-button-brand-hover-border);
}

.cookie-consent__btn--ghost {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}

.cookie-consent__btn--ghost:hover {
  background: var(--vp-c-bg-mute);
}
</style>
