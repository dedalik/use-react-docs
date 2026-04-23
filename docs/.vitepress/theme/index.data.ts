import { createContentLoader } from "vitepress";

export default createContentLoader("functions/*.md", {
  excerpt: true,
  transform(raw) {
    if (!raw?.length) return [];

    return raw
      .map(({ frontmatter }) => frontmatter)
      .filter((item) => typeof item?.sidebar_label === "string" && item.sidebar_label.startsWith("use"))
      .sort((a, b) => {
        const aDate = Number(a?.date || 0);
        const bDate = Number(b?.date || 0);
        return bDate - aDate;
      });
  },
});

function truncateText(text, length) {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  }
  return text;
}

function formatDate(raw) {
  const date = new Date(raw);
  date.setUTCHours(12);
  return {
    time: +date,
    string: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}

function getImagePath(url) {
  const filename = url.split("/").slice(-1)[0].split(".")[0];
  return filename + ".png";
}
