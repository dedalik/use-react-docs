import DefaultTheme from "vitepress/theme";
import { nextTick, onMounted, watch } from "vue";
import { useRoute } from "vitepress";
// import Test from "./components/Note.vue";
import PackageData from "./components/PackageData.vue";

import "./styles/tailwind.css";
import "./styles/styles.css";
import "./styles/vars.css";
import "./styles/main.css";
import "./styles/utils.css";
import "./styles/overrides.css";

const CODE_LANG_RE = /\blanguage-(ts|tsx|js|jsx)\b/;
const MAX_CODE_HEIGHT = 400;

function enhanceCollapsibleCodeBlocks() {
  if (typeof document === "undefined") return;

  const blocks = document.querySelectorAll<HTMLElement>(".vp-doc div[class*='language-']");
  blocks.forEach((block) => {
    if (!CODE_LANG_RE.test(block.className) || block.dataset.codeEnhanced === "1") return;

    const pre = block.querySelector<HTMLElement>("pre");
    if (!pre) return;

    block.dataset.codeEnhanced = "1";
    if (pre.scrollHeight <= MAX_CODE_HEIGHT) return;

    block.classList.add("code-collapsible", "is-collapsed");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-collapse-toggle";
    button.textContent = "Show code";
    button.addEventListener("click", () => {
      const expanded = block.classList.toggle("is-expanded");
      block.classList.toggle("is-collapsed", !expanded);
      button.textContent = expanded ? "Hide code" : "Show code";
    });

    block.appendChild(button);
  });
}

export default {
  ...DefaultTheme,
  setup() {
    const route = useRoute();

    const refreshBlocks = async () => {
      await nextTick();
      requestAnimationFrame(() => enhanceCollapsibleCodeBlocks());
    };

    onMounted(refreshBlocks);
    watch(() => route.path, refreshBlocks);
  },
  enhanceApp({ app }) {
    // register your custom global components
    app.component("PackageData", PackageData);
  },
};
