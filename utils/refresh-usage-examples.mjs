import fs from "node:fs";
import path from "node:path";

const docsDir = path.resolve(process.cwd(), "docs/functions");

const intro =
  "Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.";

/** @type {Record<string, string>} */
const usageCode = {
  useAbortController: `import useAbortController from "@dedalik/use-react/useAbortController";

function RemotePostExample() {
  const { renew } = useAbortController();

  const load = async () => {
    const controller = renew();
    if (!controller) return;

    await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      signal: controller.signal,
    });
  };

  return (
    <button type="button" onClick={() => void load()}>
      Load post (abort-safe)
    </button>
  );
}

export default function RemotePostDemo() {
  return <RemotePostExample />;
}`,

  useAsync: `import useAsync from "@dedalik/use-react/useAsync";

function JsonUserExample() {
  const { data, loading, error, execute } = useAsync(async (id: number) => {
    const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`);
    if (!res.ok) throw new Error("Request failed");
    return res.json();
  });

  return (
    <div>
      <button type="button" onClick={() => void execute(1)} disabled={loading}>
        Load user 1
      </button>
      {error ? <p role="alert">Something went wrong</p> : null}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : null}
    </div>
  );
}

export default function JsonUserDemo() {
  return <JsonUserExample />;
}`,

  useClickOutside: `import { useRef, useState } from "react";
import useClickOutside from "@dedalik/use-react/useClickOutside";

function OutsideMenuExample() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useClickOutside(panelRef, () => setOpen(false));

  return (
    <div>
      <button type="button" onClick={() => setOpen((v) => !v)}>
        Toggle panel
      </button>
      {open ? (
        <div ref={panelRef} style={{ marginTop: 8, padding: 12, border: "1px solid #ccc" }}>
          Click outside to close
        </div>
      ) : null}
    </div>
  );
}

export default function OutsideMenuDemo() {
  return <OutsideMenuExample />;
}`,

  useCopyToClipboard: `import { useState } from "react";
import useCopyToClipboard from "@dedalik/use-react/useCopyToClipboard";

function ShareLinkExample() {
  const [text, setText] = useState("https://example.com");
  const [copied, copy] = useCopyToClipboard();

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button type="button" onClick={() => void copy(text)}>
        Copy
      </button>
      <p>Last copied: {copied || "(empty)"}</p>
    </div>
  );
}

export default function ShareLinkDemo() {
  return <ShareLinkExample />;
}`,

  useDebounce: `import { useState } from "react";
import useDebounce from "@dedalik/use-react/useDebounce";

function SearchBoxExample() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  return (
    <div>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Type quickly..."
      />
      <p>Debounced: {debouncedQuery}</p>
    </div>
  );
}

export default function SearchBoxDemo() {
  return <SearchBoxExample />;
}`,

  useDraggable: `import { useRef } from "react";
import useDraggable from "@dedalik/use-react/useDraggable";

function FloatingCardExample() {
  const ref = useRef<HTMLDivElement>(null);
  const { style } = useDraggable(ref, { initialValue: { x: 40, y: 40 } });

  return (
    <div ref={ref} style={{ ...style, position: "fixed", padding: 16, border: "1px solid #999" }}>
      Drag me
    </div>
  );
}

export default function FloatingCardDemo() {
  return <FloatingCardExample />;
}`,

  useEventCallback: `import { useState } from "react";
import useEventCallback from "@dedalik/use-react/useEventCallback";

function StableHandlerExample() {
  const [count, setCount] = useState(0);
  const bump = useEventCallback(() => setCount((c) => c + 1));

  return (
    <button type="button" onClick={bump}>
      Stable handler clicks: {count}
    </button>
  );
}

export default function StableHandlerDemo() {
  return <StableHandlerExample />;
}`,

  useEventListener: `import { useState } from "react";
import useEventListener from "@dedalik/use-react/useEventListener";

function KeyCounterExample() {
  const [count, setCount] = useState(0);

  useEventListener("keydown", () => {
    setCount((c) => c + 1);
  });

  return <p>Keydown count: {count} (press any key)</p>;
}

export default function KeyCounterDemo() {
  return <KeyCounterExample />;
}`,

  useFavicon: `import { useState } from "react";
import useFavicon from "@dedalik/use-react/useFavicon";

function FaviconSwitcherExample() {
  const [, setFavicon] = useFavicon({ newIcon: "/favicon.ico" });
  const [url, setUrl] = useState("/favicon.ico");

  return (
    <div>
      <input value={url} onChange={(e) => setUrl(e.target.value)} />
      <button type="button" onClick={() => setFavicon(url)}>
        Apply favicon URL
      </button>
    </div>
  );
}

export default function FaviconSwitcherDemo() {
  return <FaviconSwitcherExample />;
}`,

  useHash: `import useHash from "@dedalik/use-react/useHash";

function HashPanelExample() {
  const [hash, setHash] = useHash();

  return (
    <div>
      <p>Current hash: {hash || "(empty)"}</p>
      <button type="button" onClick={() => setHash("#section-a")}>
        Set #section-a
      </button>
    </div>
  );
}

export default function HashPanelDemo() {
  return <HashPanelExample />;
}`,

  useIdle: `import useIdle from "@dedalik/use-react/useIdle";

function IdleBannerExample() {
  const idle = useIdle(5000);

  return <p>{idle ? "Idle (5s)" : "Active"}</p>;
}

export default function IdleBannerDemo() {
  return <IdleBannerExample />;
}`,

  useIntersectionObserver: `import { useRef } from "react";
import useIntersectionObserver from "@dedalik/use-react/useIntersectionObserver";

function SentinelExample() {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, { threshold: 0.5 });

  return (
    <div style={{ height: "140vh" }}>
      <p>Scroll until the box is half visible.</p>
      <div ref={ref} style={{ height: 80, background: "#eee" }}>
        {entry?.isIntersecting ? "Visible" : "Not visible"}
      </div>
    </div>
  );
}

export default function SentinelDemo() {
  return <SentinelExample />;
}`,

  useInterval: `import { useState } from "react";
import useInterval from "@dedalik/use-react/useInterval";

function TickExample() {
  const [count, setCount] = useState(0);

  useInterval(() => setCount((c) => c + 1), 1000);

  return <p>Ticks: {count}</p>;
}

export default function TickDemo() {
  return <TickExample />;
}`,

  useLatest: `import { useState } from "react";
import useLatest from "@dedalik/use-react/useLatest";

function LatestMirrorExample() {
  const [value, setValue] = useState("hello");
  const latest = useLatest(value);

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <p>Ref tracks input: {String(latest.current === value)}</p>
    </div>
  );
}

export default function LatestMirrorDemo() {
  return <LatestMirrorExample />;
}`,

  useLocalStorage: `import { useState } from "react";
import useLocalStorage from "@dedalik/use-react/useLocalStorage";

function NotesFieldExample() {
  const [notes, setNotes, clearNotes] = useLocalStorage("usage-demo-notes", "");

  return (
    <div>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
      <button type="button" onClick={() => clearNotes()}>
        Clear storage
      </button>
      <p>Also in localStorage key: usage-demo-notes</p>
    </div>
  );
}

export default function NotesFieldDemo() {
  return <NotesFieldExample />;
}`,

  useLockBodyScroll: `import { useState } from "react";
import useLockBodyScroll from "@dedalik/use-react/useLockBodyScroll";

function ModalScrollLockExample() {
  const [open, setOpen] = useState(false);

  useLockBodyScroll(open);

  return (
    <div>
      <button type="button" onClick={() => setOpen((v) => !v)}>
        {open ? "Close overlay" : "Open overlay"}
      </button>
      {open ? (
        <div
          role="dialog"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <div style={{ background: "#fff", padding: 24 }}>Scroll is locked on the body</div>
        </div>
      ) : null}
    </div>
  );
}

export default function ModalScrollLockDemo() {
  return <ModalScrollLockExample />;
}`,

  useMediaQuery: `import useMediaQuery from "@dedalik/use-react/useMediaQuery";

function ColorSchemeExample() {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  return <p>Dark mode preference: {String(prefersDark)}</p>;
}

export default function ColorSchemeDemo() {
  return <ColorSchemeExample />;
}`,

  useMountedState: `import { useState } from "react";
import useMountedState from "@dedalik/use-react/useMountedState";

function MountedProbeExample() {
  const isMounted = useMountedState();
  const [label, setLabel] = useState("");

  return (
    <div>
      <button type="button" onClick={() => setLabel(isMounted() ? "mounted" : "unmounted")}>
        Check mounted ref
      </button>
      <p>{label}</p>
    </div>
  );
}

export default function MountedProbeDemo() {
  return <MountedProbeExample />;
}`,

  useMutationObserver: `import { useRef, useState } from "react";
import useMutationObserver from "@dedalik/use-react/useMutationObserver";

function AttrWatcherExample() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [log, setLog] = useState("");

  useMutationObserver(
    hostRef,
    (records) => {
      setLog(
        records
          .map((r) => r.type + (r.attributeName ? ":" + r.attributeName : ""))
          .join(", "),
      );
    },
    { attributes: true, childList: false, subtree: false },
  );

  return (
    <div>
      <div ref={hostRef} data-x="0">
        Target node
      </div>
      <button type="button" onClick={() => hostRef.current?.setAttribute("data-x", String(Date.now()))}>
        Change attribute
      </button>
      <p>Last mutations: {log || "(none yet)"}</p>
    </div>
  );
}

export default function AttrWatcherDemo() {
  return <AttrWatcherExample />;
}`,

  useOnMount: `import { useCallback, useState } from "react";
import useOnMount from "@dedalik/use-react/useOnMount";

function MountPingExample() {
  const [msg, setMsg] = useState("waiting...");
  const onMount = useCallback(() => setMsg("mounted"), []);

  useOnMount(onMount);

  return <p>{msg}</p>;
}

export default function MountPingDemo() {
  return <MountPingExample />;
}`,

  usePageVisibility: `import usePageVisibility from "@dedalik/use-react/usePageVisibility";

function TabVisibilityExample() {
  const visible = usePageVisibility();

  return <p>Document visible: {String(visible)}</p>;
}

export default function TabVisibilityDemo() {
  return <TabVisibilityExample />;
}`,

  usePrevious: `import { useState } from "react";
import usePrevious from "@dedalik/use-react/usePrevious";

function CounterHistoryExample() {
  const [count, setCount] = useState(0);
  const prev = usePrevious(count);

  return (
    <div>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Increment
      </button>
      <p>
        Now: {count}, before: {prev ?? "none"}
      </p>
    </div>
  );
}

export default function CounterHistoryDemo() {
  return <CounterHistoryExample />;
}`,

  useRafState: `import { useState } from "react";
import useRafState from "@dedalik/use-react/useRafState";

function SmoothCounterExample() {
  const [count, setCount] = useRafState(0);

  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        RAF increment
      </button>
    </div>
  );
}

export default function SmoothCounterDemo() {
  return <SmoothCounterExample />;
}`,

  useResizeObserver: `import { useRef } from "react";
import useResizeObserver from "@dedalik/use-react/useResizeObserver";

function MeasuredBoxExample() {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useResizeObserver(ref);

  return (
    <div ref={ref} style={{ resize: "both", overflow: "auto", border: "1px solid #ccc", padding: 8 }}>
      <p>
        {Math.round(width)} × {Math.round(height)} px
      </p>
    </div>
  );
}

export default function MeasuredBoxDemo() {
  return <MeasuredBoxExample />;
}`,

  useScript: `import useScript from "@dedalik/use-react/useScript";

function AnalyticsStubExample() {
  const status = useScript("https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.10/dayjs.min.js");

  return <p>Script status: {status}</p>;
}

export default function AnalyticsStubDemo() {
  return <AnalyticsStubExample />;
}`,

  useSessionStorage: `import { useState } from "react";
import useSessionStorage from "@dedalik/use-react/useSessionStorage";

function SessionDraftExample() {
  const [draft, setDraft, removeDraft] = useSessionStorage("usage-demo-draft", "");

  return (
    <div>
      <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={3} />
      <button type="button" onClick={() => removeDraft()}>
        Clear session draft
      </button>
    </div>
  );
}

export default function SessionDraftDemo() {
  return <SessionDraftExample />;
}`,

  useTextareaAutoSize: `import useTextareaAutoSize from "@dedalik/use-react/useTextareaAutoSize";

function AutoGrowNotesExample() {
  const { textareaRef, input, setInput } = useTextareaAutoSize();

  return (
    <textarea
      ref={textareaRef}
      value={input ?? ""}
      onChange={(e) => setInput(e.target.value)}
      rows={1}
      style={{ width: "100%", minHeight: 40 }}
      placeholder="Type multiple lines..."
    />
  );
}

export default function AutoGrowNotesDemo() {
  return <AutoGrowNotesExample />;
}`,

  useThrottle: `import { useState } from "react";
import useThrottle from "@dedalik/use-react/useThrottle";

function ThrottledSearchExample() {
  const [query, setQuery] = useState("");
  const throttled = useThrottle(query, 500);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <p>Throttled: {throttled}</p>
    </div>
  );
}

export default function ThrottledSearchDemo() {
  return <ThrottledSearchExample />;
}`,

  useTimeout: `import { useState } from "react";
import useTimeout from "@dedalik/use-react/useTimeout";

function ToastExample() {
  const [show, setShow] = useState(false);

  useTimeout(
    () => {
      setShow(false);
    },
    show ? 2000 : null,
  );

  return (
    <div>
      <button type="button" onClick={() => setShow(true)}>
        Show message 2s
      </button>
      {show ? <p>Auto-hides...</p> : null}
    </div>
  );
}

export default function ToastDemo() {
  return <ToastExample />;
}`,

  useTitle: `import { useState } from "react";
import useTitle from "@dedalik/use-react/useTitle";

function TitleToggleExample() {
  const [label, setLabel] = useState("My page");
  useTitle(label, true);

  return (
    <div>
      <input value={label} onChange={(e) => setLabel(e.target.value)} />
      <p>Tab title follows input (restored on unmount)</p>
    </div>
  );
}

export default function TitleToggleDemo() {
  return <TitleToggleExample />;
}`,

  useToggle: `import useToggle from "@dedalik/use-react/useToggle";

function PanelToggleExample() {
  const [open, toggle] = useToggle(false);

  return (
    <div>
      <button type="button" onClick={() => toggle()}>
        {open ? "Hide" : "Show"} panel
      </button>
      {open ? <div style={{ marginTop: 8 }}>Panel content</div> : null}
    </div>
  );
}

export default function PanelToggleDemo() {
  return <PanelToggleExample />;
}`,

  useWindowSize: `import useWindowSize from "@dedalik/use-react/useWindowSize";

function ViewportReadoutExample() {
  const { width, height } = useWindowSize();

  return (
    <p>
      {width} × {height}
    </p>
  );
}

export default function ViewportReadoutDemo() {
  return <ViewportReadoutExample />;
}`,
};

function buildUsageSection(code) {
  return `## Usage\n\n${intro}\n\n\`\`\`tsx\n${code.trim()}\n\`\`\`\n`;
}

function replaceUsage(md, hookName) {
  const code = usageCode[hookName];
  if (!code) {
    console.warn("No usage template for", hookName);
    return md;
  }
  const section = buildUsageSection(code);
  const pattern =
    /\r?\n## Usage\r?\n\r?\n[\s\S]*?(?=\r?\n## (?:API Reference|Copy-paste hook|CSS to hide scroll|Type declarations|Type Declarations)\b)/;
  if (!pattern.test(md)) {
    console.warn("Usage section not found for", hookName);
    return md;
  }
  return md.replace(pattern, `\n${section}`);
}

const files = fs.readdirSync(docsDir).filter((f) => /^use.*\.md$/.test(f));

for (const file of files) {
  const hookName = path.basename(file, ".md");
  const mdPath = path.join(docsDir, file);
  const md = fs.readFileSync(mdPath, "utf8");
  const next = replaceUsage(md, hookName);
  fs.writeFileSync(mdPath, `${next.trimEnd()}\n`, "utf8");
}

console.log(`Updated Usage sections in ${files.length} hook docs.`);
