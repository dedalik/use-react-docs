import { createContentLoader } from "vitepress";

export default createContentLoader("functions/*.md", {
  excerpt: true,
  transform(raw) {
    const rawCopy = raw?.slice(1);
    const data =
      rawCopy?.length &&
      rawCopy
        .map(({ frontmatter }) => frontmatter)
        .sort((a, b) => b.date - a.date);

    return data;
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
