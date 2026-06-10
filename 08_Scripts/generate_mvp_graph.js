const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const VAULT = path.resolve(__dirname, "..");
const CONCEPT_DIR = path.join(VAULT, "04_Concept_Nodes");
const PAPER_DIR = path.join(VAULT, "02_Paper_Position_Cards");
const OUT_MD = path.join(VAULT, "03_Knowledge_Tree", "mvp_knowledge_graph.md");
const OUT_CANVAS = path.join(VAULT, "03_Knowledge_Tree", "mvp_knowledge_graph.canvas");

function frontmatter(text) {
  const match = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const found = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!found) continue;
    let value = found[2].trim().replace(/^["']|["']$/g, "");
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    }
    data[found[1]] = value;
  }
  return data;
}

function readMarkdown(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md") && name !== "README.md")
    .sort()
    .map((name) => ({
      name,
      text: fs.readFileSync(path.join(dir, name), "utf8"),
    }));
}

function slug(value) {
  return crypto.createHash("sha1").update(value).digest("hex").slice(0, 16);
}

function readConcepts() {
  return readMarkdown(CONCEPT_DIR)
    .map((entry) => {
      const meta = frontmatter(entry.text);
      if (meta.type !== "concept") return null;
      const label = meta.label || path.basename(entry.name, ".md");
      const relations = [];
      for (const match of entry.text.matchAll(
        /^-\s+(is_a|component_of|made_of|has_property|prepared_by|used_for|acts_via|improves|related_to):\s+\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/gm
      )) {
        relations.push({ type: match[1], target: match[2] });
      }
      return {
        id: `concept-${slug(label)}`,
        label,
        category: meta.category || "concept",
        file: `04_Concept_Nodes/${entry.name}`,
        relations,
      };
    })
    .filter(Boolean);
}

function readPapers() {
  return readMarkdown(PAPER_DIR)
    .map((entry) => {
      const meta = frontmatter(entry.text);
      if (meta.type !== "paper_position_card") return null;
      return {
        id: `paper-${slug(meta.citekey || entry.name)}`,
        label: meta.citekey || meta.title || path.basename(entry.name, ".md"),
        file: `02_Paper_Position_Cards/${entry.name}`,
        concepts: Array.isArray(meta.concepts) ? meta.concepts : [],
      };
    })
    .filter(Boolean);
}

function writeMarkdown(concepts, papers) {
  const lines = [
    "# MVP Knowledge Graph",
    "",
    "概念节点来自 `04_Concept_Nodes/`，论文连接来自定位卡的 `concepts` 字段。",
    "",
    "```mermaid",
    "flowchart LR",
  ];

  for (const concept of concepts) {
    lines.push(`  ${concept.id}["${concept.label}"]`);
  }
  for (const paper of papers) {
    lines.push(`  ${paper.id}[["${paper.label}"]]`);
  }
  for (const concept of concepts) {
    for (const relation of concept.relations) {
      const target = concepts.find((item) => item.label === relation.target);
      if (target) {
        lines.push(`  ${concept.id} -->|"${relation.type}"| ${target.id}`);
      }
    }
  }
  for (const paper of papers) {
    for (const label of paper.concepts) {
      const target = concepts.find((item) => item.label === label);
      if (target) lines.push(`  ${paper.id} -.->|"tagged"| ${target.id}`);
    }
  }
  lines.push("```", "");
  fs.writeFileSync(OUT_MD, lines.join("\n"), "utf8");
}

function writeCanvas(concepts, papers) {
  const categoryColor = {
    object: "1",
    material: "2",
    method: "3",
    mechanism: "4",
    performance: "5",
    application: "6",
  };
  const nodes = [];
  const edges = [];
  const all = [...concepts, ...papers];
  const columns = 3;

  all.forEach((item, index) => {
    const isPaper = item.id.startsWith("paper-");
    nodes.push({
      id: item.id,
      type: "file",
      file: item.file,
      x: (index % columns) * 360,
      y: Math.floor(index / columns) * 220,
      width: 300,
      height: isPaper ? 160 : 180,
      color: isPaper ? "6" : categoryColor[item.category] || "1",
    });
  });

  for (const concept of concepts) {
    for (const relation of concept.relations) {
      const target = concepts.find((item) => item.label === relation.target);
      if (!target) continue;
      edges.push({
        id: `edge-${slug(`${concept.id}-${relation.type}-${target.id}`)}`,
        fromNode: concept.id,
        fromSide: "right",
        toNode: target.id,
        toSide: "left",
        label: relation.type,
      });
    }
  }
  for (const paper of papers) {
    for (const label of paper.concepts) {
      const target = concepts.find((item) => item.label === label);
      if (!target) continue;
      edges.push({
        id: `edge-${slug(`${paper.id}-tagged-${target.id}`)}`,
        fromNode: paper.id,
        fromSide: "right",
        toNode: target.id,
        toSide: "left",
        label: "tagged",
      });
    }
  }

  fs.writeFileSync(OUT_CANVAS, `${JSON.stringify({ nodes, edges }, null, 2)}\n`, "utf8");
}

const concepts = readConcepts();
const papers = readPapers();
writeMarkdown(concepts, papers);
writeCanvas(concepts, papers);
console.log(`Generated ${OUT_MD}`);
console.log(`Generated ${OUT_CANVAS}`);
console.log(`Concepts: ${concepts.length}; papers: ${papers.length}`);
