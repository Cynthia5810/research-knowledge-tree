const fs = require("fs");
const path = require("path");

const VAULT = path.resolve(__dirname, "..");
const CONCEPT_DIR = path.join(VAULT, "04_Concept_Nodes");
const PAPER_DIR = path.join(VAULT, "02_Paper_Position_Cards");

const CATEGORIES = ["object", "material", "method", "mechanism", "performance", "application"];
const RELATION_TYPES = [
  "is_a",
  "component_of",
  "made_of",
  "has_property",
  "prepared_by",
  "used_for",
  "acts_via",
  "improves",
  "related_to",
];

function frontmatter(text) {
  const match = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const found = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (found) data[found[1]] = found[2].trim().replace(/^["']|["']$/g, "");
  }
  return data;
}

function section(text, heading) {
  const expression = new RegExp(
    `^## ${heading}\\s*\\r?\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`,
    "m"
  );
  return text.match(expression)?.[1].trim() || "";
}

function wikilink(value) {
  return String(value || "").match(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/)?.[1] || "";
}

const errors = [];
const warnings = [];
const concepts = new Map();

const files = fs
  .readdirSync(CONCEPT_DIR)
  .filter((name) => name.endsWith(".md") && name !== "README.md");

for (const name of files) {
  const text = fs.readFileSync(path.join(CONCEPT_DIR, name), "utf8");
  const meta = frontmatter(text);
  if (!meta) {
    errors.push(`${name}: 缺少 frontmatter`);
    continue;
  }
  if (meta.type !== "concept") continue;
  const label = meta.label || path.basename(name, ".md");
  if (concepts.has(label)) {
    errors.push(`${name}: label "${label}" 与 ${concepts.get(label).file} 重复`);
    continue;
  }
  if (!CATEGORIES.includes(meta.category)) {
    errors.push(`${name}: 非法 category "${meta.category}"`);
  }
  const relationSection = section(text, "关系");
  const relations = [];
  for (const line of relationSection.split(/\r?\n/)) {
    const found = line.match(/^-\s+([\w-]+):\s+(.*)$/);
    if (!found) continue;
    const type = found[1];
    const target = wikilink(found[2]);
    if (!RELATION_TYPES.includes(type)) {
      errors.push(`${name}: 未知关系类型 "${type}"`);
      continue;
    }
    if (!target) {
      errors.push(`${name}: 关系 "${type}" 缺少 [[目标]]`);
      continue;
    }
    relations.push({ type, target });
  }
  const definition = section(text, "定义");
  concepts.set(label, {
    file: name,
    category: meta.category,
    parent: wikilink(meta.parent),
    relations,
    definition,
  });
}

for (const [label, concept] of concepts) {
  if (!concept.definition || concept.definition === "-") {
    warnings.push(`${concept.file}: 定义为空`);
  }
  if (concept.parent && !concepts.has(concept.parent)) {
    errors.push(`${concept.file}: parent "[[${concept.parent}]]" 不存在`);
  }
  const isaTargets = concept.relations.filter((r) => r.type === "is_a").map((r) => r.target);
  if (concept.parent && isaTargets.length && !isaTargets.includes(concept.parent)) {
    warnings.push(`${concept.file}: frontmatter parent 与 is_a 行不一致`);
  }
  if (!concept.parent && isaTargets.length) {
    warnings.push(`${concept.file}: 有 is_a 行但 frontmatter parent 为空`);
  }
  for (const relation of concept.relations) {
    if (!concepts.has(relation.target)) {
      errors.push(`${concept.file}: 关系目标 "[[${relation.target}]]" 不存在`);
    }
    if (relation.target === label) {
      errors.push(`${concept.file}: 关系指向自身`);
    }
  }
}

for (const [label, concept] of concepts) {
  const seen = new Set([label]);
  let current = concept.parent;
  while (current) {
    if (seen.has(current)) {
      errors.push(`${concept.file}: 父级链存在循环（经过 "${current}"）`);
      break;
    }
    seen.add(current);
    current = concepts.get(current)?.parent || "";
  }
}

const incoming = new Set();
for (const concept of concepts.values()) {
  if (concept.parent) incoming.add(concept.parent);
  for (const relation of concept.relations) incoming.add(relation.target);
}
const paperLabels = new Set();
if (fs.existsSync(PAPER_DIR)) {
  for (const name of fs.readdirSync(PAPER_DIR)) {
    if (!name.endsWith(".md") || name === "README.md") continue;
    const meta = frontmatter(fs.readFileSync(path.join(PAPER_DIR, name), "utf8")) || {};
    const match = String(meta.concepts || "").match(/[^[\],]+/g) || [];
    for (const item of match) paperLabels.add(item.trim().replace(/^["']|["']$/g, ""));
  }
}
for (const [label, concept] of concepts) {
  const connected =
    concept.parent || concept.relations.length || incoming.has(label) || paperLabels.has(label);
  if (!connected) warnings.push(`${concept.file}: 孤立节点（无父级、无关系、无入边、无文献）`);
}

console.log(`概念节点: ${concepts.size}`);
for (const item of errors) console.error(`ERROR  ${item}`);
for (const item of warnings) console.warn(`WARN   ${item}`);
console.log(`错误 ${errors.length} · 警告 ${warnings.length}`);
if (errors.length) process.exit(1);
