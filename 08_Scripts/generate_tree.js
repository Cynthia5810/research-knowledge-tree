const fs = require("fs");
const path = require("path");

const VAULT = path.resolve(__dirname, "..");
const PAPER_DIR = path.join(VAULT, "02_Paper_Position_Cards");
const OUT_TREE = path.join(VAULT, "03_Knowledge_Tree", "generated_tree.md");
const OUT_TABLE = path.join(VAULT, "05_Tables", "paper_position_index.csv");

function parseFrontmatter(text) {
  if (!text.startsWith("---")) return {};
  const match = text.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};

  const root = {};
  const stack = [{ indent: -1, obj: root }];

  for (const raw of match[1].split(/\r?\n/)) {
    if (!raw.trim() || raw.trim().startsWith("#")) continue;
    const indent = raw.length - raw.trimStart().length;
    const line = raw.trim();
    const idx = line.indexOf(":");
    if (idx === -1) continue;

    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    while (stack.length && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }
    const parent = stack[stack.length - 1].obj;

    if (value === "") {
      const node = {};
      parent[key] = node;
      stack.push({ indent, obj: node });
    } else if (value.startsWith("[") && value.endsWith("]")) {
      parent[key] = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      parent[key] = value.replace(/^["']|["']$/g, "");
    }
  }

  return root;
}

function csvEscape(value) {
  const s = String(value ?? "");
  if (/[",\r\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function readCards() {
  if (!fs.existsSync(PAPER_DIR)) return [];
  return fs
    .readdirSync(PAPER_DIR)
    .filter((name) => name.endsWith(".md"))
    .sort()
    .map((name) => {
      const file = path.join(PAPER_DIR, name);
      const meta = parseFrontmatter(fs.readFileSync(file, "utf8"));
      if (meta.type !== "paper_position_card") return null;
      const pos = meta.tree_position || {};
      return {
        file: name,
        title: meta.title || "",
        year: meta.year || "",
        citekey: meta.citekey || path.basename(name, ".md"),
        paper_role: Array.isArray(meta.paper_role) ? meta.paper_role.join(", ") : meta.paper_role || "",
        domain: pos.domain || "",
        function_class: pos.function_class || "",
        application: pos.application || "",
        material_class: pos.material_class || "",
        material_system: pos.material_system || "",
        method_route: pos.method_route || "",
        mechanism: pos.mechanism || "",
        problem: pos.problem || "",
      };
    })
    .filter(Boolean);
}

function addNested(tree, keys, card) {
  let node = tree;
  for (const raw of keys) {
    const key = raw || "未定位";
    node[key] ||= {};
    node = node[key];
  }
  node._papers ||= [];
  node._papers.push(card);
}

function writeTree(cards) {
  const tree = {};
  for (const card of cards) {
    addNested(
      tree,
      [
        card.domain,
        card.function_class,
        card.application,
        card.material_class,
        card.material_system,
        card.problem,
        card.mechanism,
        card.method_route,
      ],
      card
    );
  }

  const lines = [
    "# Generated Membrane Knowledge Tree",
    "",
    "这个文件由 `08_Scripts/generate_tree.js` 生成。它根据 `02_Paper_Position_Cards/` 中的 `tree_position` 字段组织层级树。",
    "",
  ];

  function walk(node, depth = 0) {
    for (const key of Object.keys(node).filter((k) => k !== "_papers").sort()) {
      lines.push(`${"  ".repeat(depth)}- ${key}`);
      walk(node[key], depth + 1);
    }
    for (const paper of node._papers || []) {
      const label = paper.citekey || paper.title || paper.file;
      lines.push(`${"  ".repeat(depth)}- 文献证据：[[${paper.file}|${label}]]`);
    }
  }

  walk(tree);
  fs.writeFileSync(OUT_TREE, `${lines.join("\n")}\n`, "utf8");
}

function writeTable(cards) {
  const headers = [
    "file",
    "title",
    "year",
    "citekey",
    "paper_role",
    "domain",
    "function_class",
    "application",
    "material_class",
    "material_system",
    "method_route",
    "mechanism",
    "problem",
  ];
  const rows = [headers.join(",")];
  for (const card of cards) {
    rows.push(headers.map((h) => csvEscape(card[h])).join(","));
  }
  fs.writeFileSync(OUT_TABLE, `\uFEFF${rows.join("\n")}\n`, "utf8");
}

const cards = readCards();
writeTree(cards);
writeTable(cards);
console.log(`Generated ${OUT_TREE}`);
console.log(`Generated ${OUT_TABLE}`);
console.log(`Paper position cards: ${cards.length}`);

