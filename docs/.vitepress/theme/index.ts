import DefaultTheme from "vitepress/theme";
// import Test from "./components/Note.vue";
import PackageData from "./components/PackageData.vue";

import "./styles/tailwind.css";
import "./styles/styles.css";
import "./styles/vars.css";
import "./styles/main.css";
import "./styles/utils.css";
import "./styles/overrides.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.component("PackageData", PackageData);
  },
};
