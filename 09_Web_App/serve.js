const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const webRoot = __dirname;
const vaultRoot = path.resolve(__dirname, "..");
const conceptDir = path.join(vaultRoot, "04_Concept_Nodes");
const paperDir = path.join(vaultRoot, "02_Paper_Position_Cards");
const port = Number(process.env.PORT || 4180);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};
const relationTypes = ["used_for", "acts_via", "improves", "related_to"];

function markdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md") && name !== "README.md")
    .sort();
}

function parseFrontmatter(text) {
  const match = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const result = {};
  for (const line of match[1].split(/\r?\n/)) {
    const found = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!found) continue;
    let value = found[2].trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((item) => unquote(item.trim()))
        .filter(Boolean);
    } else {
      value = unquote(value);
    }
    result[found[1]] = value;
  }
  return result;
}

function unquote(value) {
  return String(value || "").replace(/^["']|["']$/g, "");
}

function wikilinkTarget(value) {
  return String(value || "").match(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/)?.[1] || "";
}

function section(text, heading) {
  const expression = new RegExp(
    `^## ${escapeRegExp(heading)}\\s*\\r?\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`,
    "m"
  );
  return text.match(expression)?.[1].trim() || "";
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function firstContentLine(value) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line && line !== "-") || "";
}

function parseRelations(text) {
  const relationSection = section(text, "关系");
  const relations = [];
  let parentLabel = "";
  for (const match of relationSection.matchAll(
    /^-\s+(is_a|used_for|acts_via|improves|related_to):\s+\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/gm
  )) {
    if (match[1] === "is_a" && !parentLabel) parentLabel = match[2];
    else relations.push({ type: match[1], targetLabel: match[2] });
  }
  return { parentLabel, relations };
}

function readState() {
  const rawConcepts = markdownFiles(conceptDir)
    .map((name) => {
      const text = fs.readFileSync(path.join(conceptDir, name), "utf8");
      const meta = parseFrontmatter(text);
      if (meta.type !== "concept") return null;
      const parsed = parseRelations(text);
      return {
        id: path.basename(name, ".md"),
        fileName: name,
        label: meta.label || path.basename(name, ".md"),
        category: meta.category || "object",
        zoteroTag: meta.zotero_tag || "",
        definition: firstContentLine(section(text, "定义")),
        parentLabel: wikilinkTarget(meta.parent) || parsed.parentLabel,
        rawRelations: parsed.relations,
      };
    })
    .filter(Boolean);

  const idByLabel = new Map(rawConcepts.map((item) => [item.label, item.id]));
  const concepts = rawConcepts.map(({ parentLabel, rawRelations, ...concept }) => ({
    ...concept,
    parentId: idByLabel.get(parentLabel) || "",
    relations: rawRelations
      .map((relation) => ({
        type: relation.type,
        target: idByLabel.get(relation.targetLabel) || "",
      }))
      .filter((relation) => relation.target),
  }));

  const papers = markdownFiles(paperDir)
    .map((name) => {
      const text = fs.readFileSync(path.join(paperDir, name), "utf8");
      const meta = parseFrontmatter(text);
      if (meta.type !== "paper_position_card") return null;
      const conceptLabels = Array.isArray(meta.concepts) ? meta.concepts : [];
      return {
        id: path.basename(name, ".md"),
        fileName: name,
        title: meta.title || path.basename(name, ".md"),
        authors: meta.authors || "",
        year: String(meta.year || ""),
        identifier: meta.doi || meta.zotero_key || "",
        summary: firstContentLine(section(text, "13. 一句话定位")),
        conceptIds: conceptLabels.map((label) => idByLabel.get(label)).filter(Boolean),
      };
    })
    .filter(Boolean);

  const signature = [...markdownFiles(conceptDir), ...markdownFiles(paperDir)]
    .map((name) => {
      const dir = fs.existsSync(path.join(conceptDir, name)) ? conceptDir : paperDir;
      const stat = fs.statSync(path.join(dir, name));
      return `${name}:${stat.size}:${stat.mtimeMs}`;
    })
    .join("|");
  const version = crypto.createHash("sha1").update(signature).digest("hex").slice(0, 12);
  return { concepts, papers, version, source: "obsidian" };
}

function yamlValue(value) {
  return JSON.stringify(String(value || ""));
}

function updateFrontmatter(text, updates) {
  const match = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  const lines = match ? match[1].split(/\r?\n/) : [];
  for (const [key, value] of Object.entries(updates)) {
    const index = lines.findIndex((line) => line.startsWith(`${key}:`));
    const rendered = `${key}: ${value}`;
    if (index >= 0) lines[index] = rendered;
    else lines.push(rendered);
  }
  const frontmatter = `---\n${lines.join("\n")}\n---`;
  if (match) return text.replace(match[0], frontmatter);
  return `${frontmatter}\n\n${text}`;
}

function replaceSection(text, heading, content) {
  const block = `## ${heading}\n\n${content.trim()}\n\n`;
  const expression = new RegExp(
    `^## ${escapeRegExp(heading)}\\s*\\r?\\n[\\s\\S]*?(?=^## |(?![\\s\\S]))`,
    "m"
  );
  if (expression.test(text)) return text.replace(expression, block);
  return `${text.trimEnd()}\n\n${block}`;
}

function safeFileName(label) {
  return label.replace(/[<>:"/\\|?*\u0000-\u001F]/g, "-").trim().slice(0, 80) || "新概念";
}

function writeConcept(payload) {
  fs.mkdirSync(conceptDir, { recursive: true });
  const state = readState();
  const oldConcept = state.concepts.find(
    (item) => item.fileName === payload.fileName || item.id === payload.id
  );
  const existingPath = payload.fileName
    ? path.join(conceptDir, path.basename(payload.fileName))
    : null;
  let filePath =
    existingPath && fs.existsSync(existingPath)
      ? existingPath
      : path.join(conceptDir, `${safeFileName(payload.label)}.md`);
  const renamedPath =
    oldConcept && oldConcept.label !== payload.label
      ? path.join(conceptDir, `${safeFileName(payload.label)}.md`)
      : filePath;
  if (renamedPath !== filePath && fs.existsSync(renamedPath)) {
    throw new Error("同名概念文件已经存在");
  }
  let text = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : `---\ntype: concept\nstatus: active\n---\n\n# ${payload.label}\n`;
  const labelById = new Map(state.concepts.map((item) => [item.id, item.label]));
  const parentLabel = labelById.get(payload.parentId) || "";
  text = updateFrontmatter(text, {
    type: "concept",
    label: yamlValue(payload.label),
    category: payload.category || "object",
    parent: yamlValue(parentLabel ? `[[${parentLabel}]]` : ""),
    zotero_tag: yamlValue(payload.zoteroTag || ""),
  });
  text = replaceSection(text, "定义", payload.definition || "-");
  text = text.replace(/^# .+$/m, `# ${payload.label}`);
  const relationLines = [];
  if (parentLabel) relationLines.push(`- is_a: [[${parentLabel}]]`);
  for (const relation of payload.relations || []) {
    if (!relationTypes.includes(relation.type)) continue;
    const targetLabel = labelById.get(relation.target);
    if (targetLabel) relationLines.push(`- ${relation.type}: [[${targetLabel}]]`);
  }
  text = replaceSection(text, "关系", relationLines.join("\n") || "");
  fs.writeFileSync(filePath, `${text.trimEnd()}\n`, "utf8");

  if (oldConcept && oldConcept.label !== payload.label) {
    const oldLabel = oldConcept.label;
    const newLabel = payload.label;
    if (renamedPath !== filePath) {
      fs.renameSync(filePath, renamedPath);
      filePath = renamedPath;
    }
    for (const name of markdownFiles(conceptDir)) {
      const targetPath = path.join(conceptDir, name);
      if (targetPath === filePath) continue;
      const original = fs.readFileSync(targetPath, "utf8");
      const updated = original.replaceAll(`[[${oldLabel}]]`, `[[${newLabel}]]`);
      if (updated !== original) fs.writeFileSync(targetPath, updated, "utf8");
    }
    for (const name of markdownFiles(paperDir)) {
      const targetPath = path.join(paperDir, name);
      const original = fs.readFileSync(targetPath, "utf8");
      const meta = parseFrontmatter(original);
      const labels = Array.isArray(meta.concepts) ? meta.concepts : [];
      if (!labels.includes(oldLabel)) continue;
      const updatedLabels = labels.map((label) => (label === oldLabel ? newLabel : label));
      const updated = updateFrontmatter(original, {
        concepts: `[${updatedLabels.map((label) => yamlValue(label)).join(", ")}]`,
      });
      fs.writeFileSync(targetPath, updated, "utf8");
    }
  }
  return path.basename(filePath);
}

function updatePaperConcepts(id, conceptIds) {
  const filePath = path.join(paperDir, `${path.basename(id)}.md`);
  if (!fs.existsSync(filePath)) throw new Error("Paper not found");
  const state = readState();
  const labelById = new Map(state.concepts.map((item) => [item.id, item.label]));
  const labels = conceptIds.map((conceptId) => labelById.get(conceptId)).filter(Boolean);
  let text = fs.readFileSync(filePath, "utf8");
  text = updateFrontmatter(text, {
    concepts: `[${labels.map((label) => yamlValue(label)).join(", ")}]`,
  });
  fs.writeFileSync(filePath, `${text.trimEnd()}\n`, "utf8");
}

function createPaper(payload) {
  fs.mkdirSync(paperDir, { recursive: true });
  const base = `${payload.year || "undated"}-${safeFileName(payload.title)}`;
  let filePath = path.join(paperDir, `${base}.md`);
  if (fs.existsSync(filePath)) filePath = path.join(paperDir, `${base}-${Date.now()}.md`);
  const text = `---
type: paper_position_card
title: ${yamlValue(payload.title)}
authors: ${yamlValue(payload.authors || "")}
year: ${payload.year || ""}
doi: ${yamlValue(payload.identifier || "")}
status: inbox
concepts: []
---

# ${payload.title}

## 1. 文献定位

- 待定位

## 13. 一句话定位

${payload.summary || "-"}
`;
  fs.writeFileSync(filePath, text, "utf8");
}

function deleteConcept(id) {
  const state = readState();
  const concept = state.concepts.find((item) => item.id === id);
  if (!concept) throw new Error("Concept not found");
  for (const other of state.concepts) {
    if (other.id === id) continue;
    if (other.parentId === id || other.relations.some((relation) => relation.target === id)) {
      writeConcept({
        ...other,
        parentId: other.parentId === id ? "" : other.parentId,
        relations: other.relations.filter((relation) => relation.target !== id),
      });
    }
  }
  const filePath = path.resolve(conceptDir, concept.fileName);
  if (!filePath.startsWith(conceptDir)) throw new Error("Invalid path");
  fs.unlinkSync(filePath);
  for (const paper of state.papers) {
    if (paper.conceptIds.includes(id)) {
      updatePaperConcepts(paper.id, paper.conceptIds.filter((conceptId) => conceptId !== id));
    }
  }
}

function sendJson(response, status, value) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(value));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) reject(new Error("Request too large"));
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    request.on("error", reject);
  });
}

async function handleApi(request, response, pathname) {
  try {
    if (request.method === "GET" && pathname === "/api/state") {
      sendJson(response, 200, readState());
      return;
    }
    if (request.method === "PUT" && pathname === "/api/concepts") {
      const payload = await readJson(request);
      const fileName = writeConcept(payload);
      sendJson(response, 200, { ok: true, fileName, state: readState() });
      return;
    }
    if (request.method === "DELETE" && pathname.startsWith("/api/concepts/")) {
      deleteConcept(decodeURIComponent(pathname.slice("/api/concepts/".length)));
      sendJson(response, 200, { ok: true, state: readState() });
      return;
    }
    if (request.method === "PUT" && pathname.startsWith("/api/papers/")) {
      const id = decodeURIComponent(pathname.slice("/api/papers/".length));
      const payload = await readJson(request);
      updatePaperConcepts(id, payload.conceptIds || []);
      sendJson(response, 200, { ok: true, state: readState() });
      return;
    }
    if (request.method === "POST" && pathname === "/api/papers") {
      createPaper(await readJson(request));
      sendJson(response, 201, { ok: true, state: readState() });
      return;
    }
    sendJson(response, 404, { error: "API route not found" });
  } catch (error) {
    sendJson(response, 400, { error: error.message });
  }
}

http
  .createServer(async (request, response) => {
    const pathname = decodeURIComponent(request.url.split("?")[0]);
    if (pathname.startsWith("/api/")) {
      await handleApi(request, response, pathname);
      return;
    }
    const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    const filePath = path.resolve(webRoot, relativePath);
    if (!filePath.startsWith(webRoot) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }
    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    fs.createReadStream(filePath).pipe(response);
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`Research Knowledge Tree: http://127.0.0.1:${port}`);
    console.log(`Obsidian vault: ${vaultRoot}`);
  });
