#!/usr/bin/env python3
"""
Sync hook markdown with TypeScript sources: concrete What it returns + API Reference.

- Default: rebuilds stub pages (no ## Copy-paste hook) from front matter + hook source;
  patches pages that still contain vague API placeholders.
- Full regen of every hook page: pass --all (keeps each file's YAML front matter only).

Run from use-react-docs: python3 scripts/sync-hook-docs-from-source.py [--all]
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
SRC = REPO.parent / "use-react" / "src" / "hooks"
DOCS = REPO / "docs" / "functions"

PLACEHOLDER_RETURNS = "- Returns value described by the hook API below."
PLACEHOLDER_PARAMS = "See function signature and source below."
PLACEHOLDER_API_RETURNS = "See return type/signature and source implementation below."


def split_top_level(s: str, sep: str = ",") -> list[str]:
    parts: list[str] = []
    cur: list[str] = []
    depth = 0
    for ch in s:
        if ch in "(<[{":
            depth += 1
        elif ch in ")>]}]":
            depth = max(0, depth - 1)
        if ch == sep and depth == 0:
            p = "".join(cur).strip()
            if p:
                parts.append(p)
            cur = []
        else:
            cur.append(ch)
    p = "".join(cur).strip()
    if p:
        parts.append(p)
    return parts


def extract_balanced(src: str, open_idx: int) -> str | None:
    if open_idx < 0 or open_idx >= len(src) or src[open_idx] != "{":
        return None
    d = 0
    for j in range(open_idx, len(src)):
        if src[j] == "{":
            d += 1
        elif src[j] == "}":
            d -= 1
            if d == 0:
                return src[open_idx : j + 1]
    return None


def extract_hook_paren_block(src: str, name: str) -> str | None:
    for pat in (
        rf"export\s+default\s+function\s+{re.escape(name)}\b",
        rf"export\s+function\s+{re.escape(name)}\b",
        rf"const\s+{re.escape(name)}\s*=",
    ):
        m = re.search(pat, src)
        if m:
            sub = src[m.start() :]
            op = sub.find("(")
            if op != -1:
                return sub[op:]
    return None


def parse_params_and_return(src: str, name: str) -> tuple[str, str]:
    block = extract_hook_paren_block(src, name)
    if not block:
        return "", ""
    d = 1
    i = 1
    p0 = 1
    while i < len(block) and d > 0:
        if block[i] == "(":
            d += 1
        elif block[i] == ")":
            d -= 1
        i += 1
    params = block[p0 : i - 1].strip()
    rest = block[i:].lstrip()
    ret = ""
    if rest.startswith(":"):
        rest = rest[1:].lstrip()
        if rest.startswith("{"):
            br = extract_balanced(rest, 0)
            if br:
                ret = br.strip()
        elif rest.startswith("["):
            depth = 0
            for j in range(len(rest)):
                if rest[j] == "[":
                    depth += 1
                elif rest[j] == "]":
                    depth -= 1
                    if depth == 0:
                        ret = rest[: j + 1].strip()
                        break
        else:
            m = re.match(r"([^\n{]+)", rest)
            if m:
                ret = m.group(1).strip()
    return params, ret


def interface_extends_parent(src: str, iface: str) -> str | None:
    m = re.search(
        rf"(?:export\s+)?interface\s+{re.escape(iface)}\b(?:<[^>]+>)?\s+extends\s+([A-Za-z0-9_]+)",
        src,
    )
    return m.group(1) if m else None


def interface_open_brace_index(src: str, iface: str) -> int | None:
    m = re.search(rf"(?:export\s+)?interface\s+{re.escape(iface)}\b(?:<[^>]+>)?[\s\S]*?\{{", src)
    return m.end() - 1 if m else None


def parse_interface_body_fields(inner: str) -> list[tuple[str, str]]:
    out: list[tuple[str, str]] = []
    for ln in inner.splitlines():
        ln = ln.strip().rstrip(";")
        if not ln or ln.startswith(("//", "*", "/*")):
            continue
        fm = re.match(r"([A-Za-z0-9_]+\??)\s*:\s*(.+)", ln)
        if fm:
            typ = re.sub(r"\s+", " ", fm.group(2).strip())
            out.append((fm.group(1), typ))
    return out


def merged_interface_fields(src: str, iface: str, stack: list[str] | None = None) -> list[tuple[str, str]]:
    if stack is None:
        stack = []
    if iface in stack:
        return []
    stack = stack + [iface]
    fields: list[tuple[str, str]] = []
    seen: set[str] = set()
    parent = interface_extends_parent(src, iface)
    if parent:
        for k, t in merged_interface_fields(src, parent, stack):
            fields.append((k, t))
            seen.add(k.rstrip("?"))
    oi = interface_open_brace_index(src, iface)
    if oi is not None:
        body = extract_balanced(src, oi)
        if body:
            inner = body[1:-1]
            for k, t in parse_interface_body_fields(inner):
                if k.rstrip("?") in seen:
                    continue
                fields.append((k, t))
                seen.add(k.rstrip("?"))
    return fields


def format_return_for_signature(ret: str) -> str:
    """Readable one-line return type for **Signature** (commas between object members)."""
    r = ret.strip()
    if r.startswith("{") and r.endswith("}"):
        flds = parse_inline_object_fields(r)
        if flds:
            inner = ", ".join(
                f"{k}: {re.sub(r'\\s+', ' ', t)}" for k, t in flds
            )
            return "{ " + inner + " }"
    return re.sub(r"\s+", " ", r) if r else ""


def parse_inline_object_fields(body: str) -> list[tuple[str, str]]:
    body = body.strip()
    if not (body.startswith("{") and body.endswith("}")):
        return []
    inner = body[1:-1].strip()
    raw = [p.strip() for p in re.split(r"\s*\n\s*", inner) if p.strip()]
    if len(raw) == 1 and raw[0].count(":") > 1:
        raw = split_top_level(raw[0], ",")
    out: list[tuple[str, str]] = []
    for p in raw:
        fm = re.match(r"([A-Za-z0-9_]+\??)\s*:\s*(.+)", p.strip())
        if fm:
            typ = re.sub(r"\s+", " ", fm.group(2).strip())
            out.append((fm.group(1), typ))
    return out


def parse_type_alias_tuple(src: str, name: str) -> list[str] | None:
    m = re.search(rf"export\s+type\s+{re.escape(name)}\b(?:<[^>]+>)?\s*=\s*(\[[^\]]+\])", src, re.S)
    if not m:
        return None
    inner = m.group(1).strip()[1:-1]
    return split_top_level(inner, ",")


def return_shape(src: str, return_sig: str) -> tuple[str, list[tuple[str, str]] | None, list[str] | None, str]:
    raw = return_sig.strip()
    if not raw:
        return "primitive", None, None, ""
    if raw.startswith("{") and raw.endswith("}"):
        return "object", parse_inline_object_fields(raw), None, ""
    if raw.startswith("[") and raw.endswith("]"):
        return "tuple", None, split_top_level(raw[1:-1], ","), ""
    rs = re.sub(r"\s+", " ", raw)
    base = rs.split("<", 1)[0].strip()
    if base == "void":
        return "void", None, None, ""
    tup = parse_type_alias_tuple(src, base)
    if tup:
        return "tuple", None, tup, ""
    fld = merged_interface_fields(src, base)
    if fld:
        return "object", fld, None, ""
    return "primitive", None, None, rs


def field_blurb(key: str, typ: str) -> str:
    k = key.rstrip("?")
    low = k.lower()
    t = typ.lower()
    if low in ("loading", "isloading"):
        return "Whether async work is in progress."
    if low == "error":
        return "Last failure, or cleared when idle."
    if low in ("data", "state"):
        return "Latest resolved value (shape depends on generics / producer)."
    if low == "execute":
        return "Runs async work again and updates state."
    if low == "abort":
        return "Aborts the in-flight request when supported."
    if "ref" in low and "refobject" in t:
        return "Ref to attach to a DOM node."
    if low.startswith("set"):
        return f"Updates `{low[3:] or 'value'}` directly."
    if "=>" in typ or "promise" in t:
        return "Callable helper returned by the hook."
    if "boolean" in t:
        return "Boolean flag for UI / guards."
    if "number" in t:
        return "Numeric measurement or counter."
    if "string" in t:
        return "String state or label."
    return "See signature type."


def format_signature(name: str, params: str, ret: str) -> str:
    ps = re.sub(r"\s+", " ", params.strip()).rstrip(",") if params else ""
    rs = format_return_for_signature(ret) if ret.strip() else ""
    if rs:
        return f"`{name}({ps}): {rs}`"
    return f"`{name}({ps})`"


def build_what_returns_lines(kind: str, fields, tuple_elts, prim: str) -> list[str]:
    if kind == "void":
        return ["- Nothing (`void`). Side effects only."]
    if kind == "object" and fields:
        return [f"- `{k}`: {field_blurb(k, t)} Type `{t}`." for k, t in fields]
    if kind == "tuple" and tuple_elts:
        return [f"- Position **{i}**: `{re.sub(r'\\s+', ' ', e.strip())}`." for i, e in enumerate(tuple_elts, start=1)]
    if prim:
        return [f"- Returns `{prim}`."]
    return ["- See hook source for return shape."]


def build_api_returns(kind: str, fields, tuple_elts, prim: str) -> str:
    if kind == "void":
        return "Nothing (`void`). The hook registers listeners or effects only."
    if kind == "object" and fields:
        bullets = "\n".join(f"- `{k}` - {field_blurb(k, t)} (`{t}`)." for k, t in fields)
        return f"Object with:\n\n{bullets}"
    if kind == "tuple" and tuple_elts:
        lines = "\n".join(f"{i}. `{re.sub(r'\\s+', ' ', e.strip())}`" for i, e in enumerate(tuple_elts, start=1))
        return f"Tuple:\n\n{lines}"
    if prim:
        return f"Returns `{prim}`."
    return "See hook source for return shape."


def split_param_default(raw: str) -> tuple[str, str | None]:
    """Split `name: Type = default` at top-level ` = ` only (not `=>`)."""
    d = 0
    for i in range(len(raw) - 2):
        ch = raw[i]
        if ch in "(<[{":
            d += 1
        elif ch in ")>]}]":
            d = max(0, d - 1)
        if d == 0 and raw[i : i + 3] == " = ":
            return raw[:i].strip(), raw[i + 3 :].strip()
    return raw.strip(), None


def param_line(idx: int, raw: str) -> str:
    lhs, default = split_param_default(raw)
    sp = lhs.strip().startswith("...")
    nm = re.match(r"\.{3}\s*([A-Za-z0-9_]+)", lhs.strip()) if sp else re.match(r"([A-Za-z0-9_]+\??)\s*:", lhs.strip())
    if not nm:
        return f"{idx}. **Parameter** - `{lhs.strip()}`."
    pname = nm.group(1)
    typ = lhs.split(":", 1)[1].strip() if ":" in lhs else "unknown"
    desc = "Rest parameters." if sp else ("Async producer." if pname.lower() == "producer" else "See type in signature.")
    ex = f" Default: `{default}`." if default else ""
    opt = "optional " if ("?" in pname or default) else ""
    return f"{idx}. **`{pname}`** ({opt}`{typ}`) - {desc}{ex}"


def build_params_text(params: str) -> str:
    if not params.strip():
        return "None."
    return "\n".join(param_line(i + 1, p) for i, p in enumerate(split_top_level(params)))


def first_jsdoc_line(src: str) -> str | None:
    m = re.search(r"/\*\*\s*\n([\s\S]*?)\n\s*\*/", src)
    if not m:
        return None
    for ln in m.group(1).splitlines():
        s = re.sub(r"^\s*\*\s?", "", ln).strip()
        if s and not s.startswith("@"):
            return s.rstrip(".").strip()
    return None


def extract_frontmatter(text: str) -> str:
    m = re.match(r"^---\n[\s\S]*?\n---\n", text)
    return m.group(0) if m else "---\n---\n"


def usage_section(hook: str) -> str:
    imp = f"import {hook} from '@dedalik/use-react/{hook}'"
    return f"""## Usage

Copy-paste ready sample: import the hook and call it inside a component.

```tsx
{imp}

function Example() {{
  const result = {hook}()

  return (
    <div>
      <h3>{hook} state</h3>
      <pre>{{JSON.stringify(result, null, 2)}}</pre>
    </div>
  )
}}

export default function Demo() {{
  return <Example />
}}
```"""


def build_accepts_lines(params: str) -> str:
    if not params.strip():
        return "- No arguments."
    lines = []
    for p in split_top_level(params):
        lines.append("- `" + p.strip().replace("\n", " ") + "`.")
    return "\n".join(lines)


def build_full_page(fm: str, hook: str, src: str) -> str:
    params, ret_sig = parse_params_and_return(src, hook)
    kind, fields, tuple_elts, prim = return_shape(src, ret_sig)
    what = build_what_returns_lines(kind, fields, tuple_elts, prim)
    api_ret = build_api_returns(kind, fields, tuple_elts, prim)
    sig = format_signature(hook, params, ret_sig)
    params_txt = build_params_text(params)
    jd = first_jsdoc_line(src) or f"a React hook (`{hook}`)"
    if jd and jd[0].isalpha() and jd[0].isupper():
        jd = jd[0].lower() + jd[1:]
    if not jd.endswith("."):
        jd += "."
    return (
        fm
        + f"# {hook}()\n\n<PackageData fn=\"{hook}\" />\n\nLast updated: 24/04/2026\n\n## Overview\n\n`{hook}` - {jd}\n\n"
        + "### What it accepts\n\n"
        + build_accepts_lines(params)
        + "\n\n### What it returns\n\n"
        + "\n".join(what)
        + "\n\n"
        + usage_section(hook)
        + "\n\n## API Reference\n\n### `"
        + hook
        + "`\n\n**Signature:** "
        + sig
        + "\n\n#### Parameters\n\n"
        + params_txt
        + "\n\n#### Returns\n\n"
        + api_ret
        + "\n\n## Copy-paste hook\n\n```tsx\n"
        + src.rstrip()
        + "\n```\n"
    )


def patch_placeholders(text: str, hook: str, src: str) -> str:
    params, ret_sig = parse_params_and_return(src, hook)
    kind, fields, tuple_elts, prim = return_shape(src, ret_sig)
    what = build_what_returns_lines(kind, fields, tuple_elts, prim)
    api_ret = build_api_returns(kind, fields, tuple_elts, prim)
    sig = format_signature(hook, params, ret_sig)
    params_txt = build_params_text(params)
    new_api = f"""## API Reference

### `{hook}`

**Signature:** {sig}

#### Parameters

{params_txt}

#### Returns

{api_ret}"""
    if "## Copy-paste hook" in text and "## API Reference" in text:
        head, tail = text.split("## Copy-paste hook", 1)
        i_api = head.find("## API Reference")
        if i_api != -1:
            head = head[:i_api].rstrip() + "\n\n" + new_api.strip() + "\n\n"
        text = head + "## Copy-paste hook" + tail
    if any(
        x in text
        for x in (
            PLACEHOLDER_RETURNS,
            PLACEHOLDER_PARAMS,
            PLACEHOLDER_API_RETURNS,
        )
    ):
        m2 = re.search(r"(### What it returns\n\n)([\s\S]*?)(\n## Usage)", text)
        if m2:
            text = text[: m2.start(2)] + "\n".join(what) + text[m2.start(3) :]
    return text


def main() -> None:
    force_all = "--all" in sys.argv
    rebuilt = patched = 0
    for ts in sorted(SRC.glob("*.tsx")):
        hook = ts.stem
        md = DOCS / f"{hook}.md"
        if not md.exists():
            continue
        src = ts.read_text()
        text = md.read_text()
        stub = "## Copy-paste hook" not in text
        needs = any(
            x in text
            for x in (
                PLACEHOLDER_RETURNS,
                PLACEHOLDER_PARAMS,
                PLACEHOLDER_API_RETURNS,
            )
        )
        if stub or force_all:
            md.write_text(build_full_page(extract_frontmatter(text), hook, src))
            rebuilt += 1
        elif needs:
            md.write_text(patch_placeholders(text, hook, src))
            patched += 1
    mode = " (full regen)" if force_all else ""
    print(f"Rebuilt {rebuilt} docs, patched {patched} docs with placeholders{mode}")


if __name__ == "__main__":
    main()
