import fs from "fs";
import path from "path";
import matter from "gray-matter";

function formatText(fileName: string): string {
  return (
    fileName.charAt(0).toUpperCase() +
    fileName.slice(1).replace(".md", "").replaceAll("-", " ")
  );
}

const readFile = (filePath: string) => {
  const content = fs.readFileSync(filePath, "utf8");
  const metadata = matter(content);

  return metadata.data;
};

function getSidebarItems(
  dir: string[],
  currentRoot: string,
  root: string,
  options: any
): object[] {
  return dir
    .filter(
      (e) =>
        e.endsWith(".md") ||
        fs.statSync(path.resolve(currentRoot, e)).isDirectory()
    )
    .map((e) => {
      const childDir = path.resolve(currentRoot, e);
      const isDirectory = fs.statSync(childDir).isDirectory();

      if (isDirectory) {
        const items = getSidebarItems(
          fs.readdirSync(childDir),
          childDir,
          root,
          options
        );
        const fileName = path.basename(e);
        return items.length
          ? {
              text: formatText(fileName),
              collapsible: options.collapsible,
              collapsed: options.collapsed,
              items,
            }
          : null;
      } else if (e.endsWith(".md") && !e.startsWith("_")) {
        if (
          e === "index.md" &&
          childDir.replace(root, "").replace("index.md", "") === "/"
        ) {
          return null;
        }

        const metadata = readFile(`${childDir}`);

        return {
          text: e.replace(".md", ""),
          link: childDir.replace(root, "").replace("index.md", ""),
          name: e.replace(".md", ""),
          ...metadata,
        };
      }
      return null;
    })
    .filter(Boolean);
}

export function getSidebar(options: any) {
  const {
    contentRoot = "/",
    contentDirs = ["./"],
    collapsible = true,
    collapsed = true,
  } = options;

  const resolvedContentRoot = path.join(process.cwd(), contentRoot);
  const sidebars = getSidebarItems(
    contentDirs,
    resolvedContentRoot,
    resolvedContentRoot,
    {
      collapsible,
      collapsed,
    }
  );

  const jsonString = JSON.stringify(sidebars[0].items, null, 2);

  const filePath = path.join(__dirname, "sidebars.json");

  fs.writeFileSync(filePath, jsonString, "utf8");

  return sidebars[0].items || [];
}
