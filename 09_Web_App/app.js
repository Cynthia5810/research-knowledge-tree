const STORAGE_KEY = "research-knowledge-tree-v1";

const categories = [
  { id: "object", label: "研究对象", icon: "scan-search", color: "#315a72" },
  { id: "material", label: "材料", icon: "layers-3", color: "#66517b" },
  { id: "method", label: "方法", icon: "wrench", color: "#a94832" },
  { id: "mechanism", label: "机制", icon: "workflow", color: "#8a651d" },
  { id: "performance", label: "性能", icon: "gauge", color: "#165c45" },
  { id: "application", label: "应用", icon: "target", color: "#446c65" },
];

const relationTypes = [
  { id: "component_of", label: "是…的组件", short: "组成" },
  { id: "made_of", label: "材质是", short: "材质" },
  { id: "has_property", label: "具有性质", short: "性质" },
  { id: "prepared_by", label: "制备方法是", short: "制备" },
  { id: "used_for", label: "用于", short: "应用" },
  { id: "acts_via", label: "通过机制", short: "机制" },
  { id: "improves", label: "改善", short: "性能" },
  { id: "related_to", label: "相关", short: "相关" },
];

const facetMeta = {
  is_a: { forward: "上级类别", reverse: "子类" },
  component_of: { forward: "所属系统 / 工艺", reverse: "组成部分" },
  made_of: { forward: "材质", reverse: "用它制成" },
  has_property: { forward: "性质", reverse: "拥有此性质" },
  prepared_by: { forward: "制备方法", reverse: "可用于制备" },
  used_for: { forward: "应用场景", reverse: "实现途径" },
  acts_via: { forward: "作用机制", reverse: "依赖此机制" },
  improves: { forward: "改善", reverse: "被它改善" },
  related_to: { forward: "相关概念", reverse: "相关概念" },
};

const facetOrder = [
  { type: "is_a", direction: "forward" },
  { type: "is_a", direction: "reverse" },
  { type: "component_of", direction: "reverse" },
  { type: "component_of", direction: "forward" },
  { type: "made_of", direction: "forward" },
  { type: "made_of", direction: "reverse" },
  { type: "has_property", direction: "forward" },
  { type: "has_property", direction: "reverse" },
  { type: "prepared_by", direction: "forward" },
  { type: "prepared_by", direction: "reverse" },
  { type: "used_for", direction: "forward" },
  { type: "used_for", direction: "reverse" },
  { type: "acts_via", direction: "forward" },
  { type: "acts_via", direction: "reverse" },
  { type: "improves", direction: "forward" },
  { type: "improves", direction: "reverse" },
  { type: "related_to", direction: "forward" },
  { type: "related_to", direction: "reverse" },
];

const paperLinkLabels = {
  extends: "承接 / 扩展",
  improves: "改进",
  challenges: "质疑",
  complements: "互补",
};

const initialState = {
  concepts: [
    {
      id: "membrane",
      label: "膜",
      category: "object",
      zoteroTag: "对象/膜",
      definition: "用于界面调控、传递或分离过程的薄层材料或结构。",
      relations: [],
    },
    {
      id: "ion-selective-membrane",
      label: "离子选择膜",
      category: "material",
      zoteroTag: "材料/离子选择膜",
      definition: "对不同离子表现出差异化传输能力的膜。",
      relations: [
        { type: "is_a", target: "membrane" },
        { type: "used_for", target: "li-mg-separation" },
        { type: "component_of", target: "electrodialysis" },
        { type: "prepared_by", target: "positive-surface" },
        { type: "has_property", target: "li-mg-selectivity" },
      ],
    },
    {
      id: "electrodialysis",
      label: "电渗析",
      category: "method",
      zoteroTag: "方法/电渗析",
      definition: "在电场驱动下，利用离子交换膜对离子的选择透过实现分离的过程。",
      relations: [{ type: "used_for", target: "li-mg-separation" }],
    },
    {
      id: "positive-surface",
      label: "表面正电化",
      category: "method",
      zoteroTag: "方法/表面正电化",
      definition: "通过材料设计或表面改性提高膜表面或选择层的正电性。",
      relations: [
        { type: "acts_via", target: "electrostatic-repulsion" },
        { type: "improves", target: "li-mg-selectivity" },
      ],
    },
    {
      id: "electrostatic-repulsion",
      label: "静电排斥",
      category: "mechanism",
      zoteroTag: "机制/静电排斥",
      definition: "带电界面对同号离子产生的排斥作用。",
      relations: [{ type: "improves", target: "li-mg-selectivity" }],
    },
    {
      id: "li-mg-selectivity",
      label: "Li/Mg 选择性",
      category: "performance",
      zoteroTag: "性能/Li-Mg选择性",
      definition: "体系区分锂离子与镁离子传输或分离行为的能力。",
      relations: [],
    },
    {
      id: "li-mg-separation",
      label: "Li/Mg 分离",
      category: "application",
      zoteroTag: "应用/Li-Mg分离",
      definition: "从含镁体系中实现锂离子的选择性分离与富集。",
      relations: [],
    },
  ],
  papers: [
    {
      id: "wang-2024",
      title: "Highly positively-charged membrane enabled by a competitive reaction for efficient Li+/Mg2+ separation",
      authors: "Wang et al.",
      year: "2024",
      identifier: "10.1016/j.seppur.2023.125428",
      summary: "通过 Fe3+ 参与的竞争反应构建薄而高正电的选择层，缓解选择性、通量与电阻之间的权衡。",
      conceptIds: [
        "ion-selective-membrane",
        "positive-surface",
        "electrostatic-repulsion",
        "li-mg-selectivity",
        "li-mg-separation",
      ],
    },
    {
      id: "new-paper-placeholder",
      title: "新导入论文：等待分析与定位",
      authors: "",
      year: "",
      identifier: "",
      summary: "模拟从 Zotero 新进入系统、尚未确定分类位置的论文。",
      conceptIds: [],
    },
  ],
};

let state = clone(initialState);
let stateVersion = "";
let currentView = "board";
let selectedConceptId = null;
let selectedPaperId = null;
let focusId = null;
let focusTrail = [];
let relationFilter = "all";
let paperFilter = "all";
let searchTerm = "";
let toastTimer = null;

const el = (id) => document.getElementById(id);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "同步失败");
  return result;
}

function setSyncState(status, text) {
  el("syncState").className = `sync-state ${status}`;
  el("syncText").textContent = text;
}

async function loadFromObsidian({ quiet = false } = {}) {
  try {
    if (!quiet) setSyncState("", "正在读取 Obsidian");
    const next = await api("/api/state");
    const selectionExists = next.concepts.some((item) => item.id === selectedConceptId);
    state = { concepts: next.concepts, papers: next.papers };
    stateVersion = next.version;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (!selectionExists) selectedConceptId = null;
    if (!next.papers.some((item) => item.id === selectedPaperId)) selectedPaperId = null;
    if (!next.concepts.some((item) => item.id === focusId)) focusId = null;
    focusTrail = focusTrail.filter((id) => next.concepts.some((item) => item.id === id));
    renderAll();
    setSyncState("synced", "已与 Obsidian 同步");
  } catch (error) {
    setSyncState("error", "Obsidian 同步失败");
    if (!quiet) showToast(error.message);
  }
}

async function applyServerState(result, message) {
  if (result.state) {
    state = { concepts: result.state.concepts, papers: result.state.papers };
    stateVersion = result.state.version;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
  renderAll();
  setSyncState("synced", "已写入 Obsidian");
  if (message) showToast(message);
}

function slugify(value) {
  const base = value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
  return `${base || "node"}-${Date.now().toString(36)}`;
}

function categoryById(id) {
  return categories.find((item) => item.id === id) || categories[0];
}

function relationLabel(id) {
  if (id === "is_a") return "属于";
  return relationTypes.find((item) => item.id === id)?.label || id;
}

function conceptById(id) {
  return state.concepts.find((item) => item.id === id);
}

function initializeIcons() {
  document.querySelectorAll("[data-icon]").forEach((placeholder) => {
    const icon = window.rktIcons?.[placeholder.dataset.icon];
    if (!icon) return;
    const svg = createSvgElement(icon);
    svg.classList.add("lucide", `lucide-${placeholder.dataset.icon}`);
    svg.setAttribute("aria-hidden", "true");
    placeholder.replaceWith(svg);
  });
}

function createSvgElement([tag, attributes, children = []]) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attributes || {}).forEach(([key, value]) => {
    node.setAttribute(key, key === "stroke-width" ? "1.8" : value);
  });
  children.forEach((child) => node.appendChild(createSvgElement(child)));
  return node;
}

function renderAll() {
  renderStats();
  renderBoard();
  renderRootList();
  renderTree();
  renderFocus();
  renderPapers();
  initializeIcons();
}

function renderStats() {
  const relationCount = state.concepts.reduce((sum, item) => sum + item.relations.length, 0);
  const unplaced = state.papers.filter((paper) => paper.conceptIds.length === 0).length;
  el("stats").textContent =
    `${state.concepts.length} 个概念 · ${relationCount} 条关系 · ${unplaced} 篇待定位`;
}

function matchesSearch(...values) {
  if (!searchTerm) return true;
  return values.some((value) => String(value || "").toLowerCase().includes(searchTerm));
}

function conceptPath(concept) {
  const labels = [];
  const visited = new Set();
  let current = concept;
  while (current?.parentId && !visited.has(current.parentId)) {
    visited.add(current.parentId);
    current = conceptById(current.parentId);
    if (current) labels.unshift(current.label);
  }
  return labels;
}

function orderedCategoryConcepts(categoryId) {
  const categoryConcepts = state.concepts.filter((item) => item.category === categoryId);
  const ids = new Set(categoryConcepts.map((item) => item.id));
  const children = new Map();
  categoryConcepts.forEach((item) => {
    const parent = ids.has(item.parentId) ? item.parentId : "";
    if (!children.has(parent)) children.set(parent, []);
    children.get(parent).push(item);
  });
  children.forEach((items) => items.sort((a, b) => a.label.localeCompare(b.label, "zh-CN")));
  const ordered = [];
  const walk = (parentId, depth) => {
    for (const item of children.get(parentId) || []) {
      ordered.push({ concept: item, depth });
      walk(item.id, depth + 1);
    }
  };
  walk("", 0);
  return ordered;
}

function renderBoard() {
  const board = el("categoryBoard");
  board.innerHTML = "";

  categories.forEach((category) => {
    const concepts = orderedCategoryConcepts(category.id).filter(({ concept }) =>
      matchesSearch(concept.label, concept.definition, concept.zoteroTag, ...conceptPath(concept))
    );
    const column = document.createElement("section");
    column.className = "category-column";
    column.style.setProperty("--category-color", category.color);
    column.dataset.category = category.id;
    column.innerHTML = `
      <div class="column-header">
        <div class="column-title">
          <span data-icon="${category.icon}"></span>
          ${category.label}
        </div>
        <span class="column-count">${concepts.length}</span>
      </div>
      <div class="concept-list"></div>
    `;

    const list = column.querySelector(".concept-list");
    if (!concepts.length) {
      list.innerHTML = `<div class="empty-column">拖入概念或新建分支</div>`;
    }

    concepts.forEach(({ concept, depth }) => {
      const card = document.createElement("article");
      card.className = "concept-card";
      card.style.setProperty("--category-color", category.color);
      card.draggable = true;
      card.dataset.id = concept.id;
      card.dataset.depth = String(Math.min(depth, 4));
      const pathLabels = conceptPath(concept);
      card.innerHTML = `
        ${pathLabels.length ? `<div class="concept-path">${escapeHtml(pathLabels.join(" / "))}</div>` : ""}
        <h3>${escapeHtml(concept.label)}</h3>
        <p>${escapeHtml(concept.definition || "尚未填写定义")}</p>
        <div class="concept-meta">
          <span>${concept.relations.length} 条关系</span>
          <span>${paperCountForConcept(concept.id)} 篇论文</span>
        </div>
      `;
      card.addEventListener("click", () => openInspector(concept.id));
      card.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", concept.id);
        card.classList.add("dragging");
      });
      card.addEventListener("dragend", () => card.classList.remove("dragging"));
      list.appendChild(card);
    });

    column.addEventListener("dragover", (event) => {
      event.preventDefault();
      column.classList.add("drag-over");
    });
    column.addEventListener("dragleave", () => column.classList.remove("drag-over"));
    column.addEventListener("drop", (event) => {
      event.preventDefault();
      column.classList.remove("drag-over");
      const id = event.dataTransfer.getData("text/plain");
      moveConcept(id, category.id);
    });
    board.appendChild(column);
  });
}

function paperCountForConcept(id) {
  return state.papers.filter((paper) => paper.conceptIds.includes(id)).length;
}

async function persistConcept(concept, message) {
  setSyncState("", "正在写入 Obsidian");
  const result = await api("/api/concepts", {
    method: "PUT",
    body: JSON.stringify(concept),
  });
  await applyServerState(result, message);
}

async function moveConcept(id, category) {
  const concept = conceptById(id);
  if (!concept || concept.category === category) return;
  try {
    await persistConcept({ ...concept, category }, `已移入“${categoryById(category).label}”`);
  } catch (error) {
    setSyncState("error", "写入失败");
    showToast(error.message);
  }
}

function openInspector(id) {
  const concept = conceptById(id);
  const isNew = !concept;
  selectedConceptId = id || null;
  el("inspectorTitle").textContent = isNew ? "新建概念" : concept.label;
  el("conceptId").value = concept?.id || "";
  el("conceptLabel").value = concept?.label || "";
  el("conceptCategory").value = concept?.category || "object";
  renderParentOptions(concept?.parentId || "", id);
  el("conceptTag").value = concept?.zoteroTag || "";
  el("conceptDefinition").value = concept?.definition || "";
  el("deleteConceptButton").hidden = isNew;
  renderRelationEditor(concept?.relations || []);
  el("inspector").classList.add("open");
  el("inspector").setAttribute("aria-hidden", "false");
  el("modalBackdrop").hidden = false;
  setTimeout(() => el("conceptLabel").focus(), 80);
}

function closeInspector() {
  el("inspector").classList.remove("open");
  el("inspector").setAttribute("aria-hidden", "true");
  el("modalBackdrop").hidden = true;
}

function renderCategoryOptions() {
  el("conceptCategory").innerHTML = categories
    .map((item) => `<option value="${item.id}">${item.label}</option>`)
    .join("");
}

function renderParentOptions(selected = "", currentId = "") {
  const descendants = new Set();
  const collect = (id) => {
    state.concepts
      .filter((item) => item.parentId === id)
      .forEach((item) => {
        descendants.add(item.id);
        collect(item.id);
      });
  };
  if (currentId) collect(currentId);
  el("conceptParent").innerHTML = [
    `<option value="">无上级概念</option>`,
    ...state.concepts
      .filter((item) => item.id !== currentId && !descendants.has(item.id))
      .sort((a, b) => a.label.localeCompare(b.label, "zh-CN"))
      .map(
        (item) =>
          `<option value="${item.id}" ${item.id === selected ? "selected" : ""}>${escapeHtml(
            [...conceptPath(item), item.label].join(" / ")
          )}</option>`
      ),
  ].join("");
}

function renderRelationEditor(relations) {
  const editor = el("relationEditor");
  editor.innerHTML = "";
  relations.forEach((relation) => addRelationRow(relation.type, relation.target));
  if (!relations.length) {
    editor.innerHTML = `<p class="empty-column">还没有逻辑关系</p>`;
  }
}

function addRelationRow(type = "is_a", target = "") {
  const editor = el("relationEditor");
  editor.querySelector(".empty-column")?.remove();
  const row = document.createElement("div");
  row.className = "relation-row";
  row.innerHTML = `
    <select class="relation-type">
      ${relationTypes
        .map((item) => `<option value="${item.id}" ${item.id === type ? "selected" : ""}>${item.label}</option>`)
        .join("")}
    </select>
    <select class="relation-target">
      <option value="">选择目标概念</option>
      ${state.concepts
        .filter((item) => item.id !== selectedConceptId)
        .map((item) => `<option value="${item.id}" ${item.id === target ? "selected" : ""}>${escapeHtml(item.label)}</option>`)
        .join("")}
    </select>
    <button type="button" class="icon-button" aria-label="删除关系">
      <span data-icon="x"></span>
    </button>
  `;
  row.querySelector("button").addEventListener("click", () => {
    row.remove();
    if (!editor.children.length) {
      editor.innerHTML = `<p class="empty-column">还没有逻辑关系</p>`;
    }
  });
  editor.appendChild(row);
  initializeIcons();
}

function collectRelations() {
  return [...document.querySelectorAll(".relation-row")]
    .map((row) => ({
      type: row.querySelector(".relation-type").value,
      target: row.querySelector(".relation-target").value,
    }))
    .filter((item) => item.target);
}

async function saveConcept(event) {
  event.preventDefault();
  const label = el("conceptLabel").value.trim();
  if (!label) return;

  const payload = {
    id: el("conceptId").value || undefined,
    fileName: conceptById(el("conceptId").value)?.fileName || "",
    label,
    category: el("conceptCategory").value,
    parentId: el("conceptParent").value,
    zoteroTag: el("conceptTag").value.trim(),
    definition: el("conceptDefinition").value.trim(),
    relations: collectRelations(),
  };

  const existing = conceptById(el("conceptId").value);
  try {
    const result = await api("/api/concepts", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    const saved = result.state.concepts.find(
      (item) => item.fileName === result.fileName || item.label === label
    );
    selectedConceptId = saved?.id || null;
    await applyServerState(result, existing ? "概念已写回 Obsidian" : "新分支已写入 Obsidian");
    closeInspector();
  } catch (error) {
    setSyncState("error", "写入失败");
    showToast(error.message);
  }
}

async function deleteConcept() {
  const concept = conceptById(selectedConceptId);
  if (!concept) return;
  const linkedPapers = paperCountForConcept(concept.id);
  const message = linkedPapers
    ? `“${concept.label}”连接了 ${linkedPapers} 篇论文。删除后这些定位也会移除，确定继续吗？`
    : `确定删除“${concept.label}”吗？`;
  if (!window.confirm(message)) return;

  try {
    setSyncState("", "正在更新 Obsidian");
    const result = await api(`/api/concepts/${encodeURIComponent(concept.id)}`, {
      method: "DELETE",
    });
    selectedConceptId = null;
    await applyServerState(result, "概念笔记已删除");
    closeInspector();
  } catch (error) {
    setSyncState("error", "删除失败");
    showToast(error.message);
  }
}

function renderRootList() {
  const list = el("rootList");
  const visible = state.concepts.filter((concept) =>
    matchesSearch(concept.label, concept.definition, concept.zoteroTag)
  );
  if (!selectedConceptId && visible.length) selectedConceptId = visible[0].id;
  list.innerHTML = "";
  visible.forEach((concept) => {
    const category = categoryById(concept.category);
    const button = document.createElement("button");
    button.className = `root-item ${selectedConceptId === concept.id ? "active" : ""}`;
    button.style.setProperty("--category-color", category.color);
    button.innerHTML = `
      <span class="root-dot"></span>
      <span>${escapeHtml(concept.label)}</span>
    `;
    button.addEventListener("click", () => {
      selectedConceptId = concept.id;
      renderRootList();
      renderTree();
    });
    list.appendChild(button);
  });
}

function connectedGraph(rootId) {
  const nodeIds = new Set([rootId]);
  const links = [];
  state.concepts.forEach((concept) => {
    if (
      concept.parentId &&
      (relationFilter === "all" || relationFilter === "is_a") &&
      (concept.id === rootId || concept.parentId === rootId)
    ) {
      nodeIds.add(concept.id);
      nodeIds.add(concept.parentId);
      links.push({ source: concept.id, target: concept.parentId, type: "is_a" });
    }
    concept.relations.forEach((relation) => {
      if (relationFilter !== "all" && relation.type !== relationFilter) return;
      if (concept.id === rootId || relation.target === rootId) {
        nodeIds.add(concept.id);
        nodeIds.add(relation.target);
        links.push({ source: concept.id, target: relation.target, type: relation.type });
      }
    });
  });
  return {
    nodes: [...nodeIds].map(conceptById).filter(Boolean),
    links,
  };
}

function renderTree() {
  const svg = el("treeSvg");
  svg.innerHTML = "";
  const root = conceptById(selectedConceptId);
  if (!root) {
    el("treeEmpty").style.display = "grid";
    return;
  }
  el("treeEmpty").style.display = "none";

  const graph = connectedGraph(root.id);
  const width = Math.max(860, el("treeCanvas").clientWidth);
  const height = 620;
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  const rootX = width / 2;
  const rootY = height / 2;
  const radiusX = Math.min(300, width * 0.32);
  const radiusY = 220;

  const positions = new Map();
  positions.set(root.id, { x: rootX, y: rootY });
  const satellites = graph.nodes.filter((item) => item.id !== root.id);
  satellites.forEach((node, index) => {
    const angle = (Math.PI * 2 * index) / Math.max(satellites.length, 1) - Math.PI / 2;
    positions.set(node.id, {
      x: rootX + Math.cos(angle) * radiusX,
      y: rootY + Math.sin(angle) * radiusY,
    });
  });

  const ns = "http://www.w3.org/2000/svg";
  graph.links.forEach((link) => {
    const source = positions.get(link.source);
    const target = positions.get(link.target);
    if (!source || !target) return;
    const path = document.createElementNS(ns, "path");
    path.setAttribute("class", "tree-link");
    path.setAttribute("d", `M ${source.x} ${source.y} L ${target.x} ${target.y}`);
    svg.appendChild(path);

    const label = document.createElementNS(ns, "text");
    label.setAttribute("class", "tree-link-label");
    label.setAttribute("x", (source.x + target.x) / 2);
    label.setAttribute("y", (source.y + target.y) / 2 - 7);
    label.setAttribute("text-anchor", "middle");
    label.textContent = relationLabel(link.type);
    svg.appendChild(label);
  });

  graph.nodes.forEach((node) => {
    const position = positions.get(node.id);
    const category = categoryById(node.category);
    const group = document.createElementNS(ns, "g");
    group.setAttribute("class", `tree-node ${node.id === root.id ? "root" : ""}`);
    group.setAttribute("transform", `translate(${position.x - 78}, ${position.y - 25})`);
    group.setAttribute("tabindex", "0");
    group.setAttribute("role", "button");
    group.setAttribute("aria-label", `编辑 ${node.label}`);

    const rect = document.createElementNS(ns, "rect");
    rect.setAttribute("width", "156");
    rect.setAttribute("height", "50");
    rect.setAttribute("fill", node.id === root.id ? category.color : "#fffefa");
    rect.setAttribute("stroke", category.color);
    const text = document.createElementNS(ns, "text");
    text.setAttribute("x", "78");
    text.setAttribute("y", "30");
    text.setAttribute("text-anchor", "middle");
    text.textContent = truncate(node.label, 18);
    group.append(rect, text);
    group.addEventListener("click", () => openInspector(node.id));
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter") openInspector(node.id);
    });
    svg.appendChild(group);
  });
}

function focusOn(id, { resetTrail = false } = {}) {
  if (!conceptById(id)) return;
  if (resetTrail) {
    focusTrail = [];
  } else if (focusId && focusId !== id) {
    focusTrail.push(focusId);
    if (focusTrail.length > 12) focusTrail.shift();
  }
  focusId = id;
  renderFocus();
  initializeIcons();
}

function incomingRelations(id) {
  const incoming = [];
  state.concepts.forEach((concept) => {
    concept.relations.forEach((relation) => {
      if (relation.target === id) incoming.push({ type: relation.type, sourceId: concept.id });
    });
  });
  return incoming;
}

function facetGroups(concept) {
  const groups = [];
  const incoming = incomingRelations(concept.id);
  for (const { type, direction } of facetOrder) {
    let ids = [];
    if (type === "is_a") {
      ids =
        direction === "forward"
          ? concept.parentId
            ? [concept.parentId]
            : []
          : state.concepts.filter((item) => item.parentId === concept.id).map((item) => item.id);
    } else if (direction === "forward") {
      ids = concept.relations.filter((item) => item.type === type).map((item) => item.target);
    } else {
      ids = incoming.filter((item) => item.type === type).map((item) => item.sourceId);
    }
    if (type === "related_to" && direction === "reverse") {
      const forwardSet = new Set(
        concept.relations.filter((item) => item.type === "related_to").map((item) => item.target)
      );
      ids = ids.filter((id) => !forwardSet.has(id));
    }
    const nodes = [...new Set(ids)].map(conceptById).filter(Boolean);
    if (nodes.length) groups.push({ label: facetMeta[type][direction], type, direction, nodes });
  }
  return groups;
}

function svgTextWidth(value) {
  return [...String(value)].reduce(
    (width, ch) => width + (ch.charCodeAt(0) > 255 ? 13 : 7.2),
    0
  );
}

function renderFocusTree(root, groups) {
  const svg = el("focusTreeSvg");
  if (!svg) return;
  const ns = "http://www.w3.org/2000/svg";
  svg.innerHTML = "";

  const rowH = 46;
  const boxH = 34;
  const laneGap = 14;
  const pad = 18;
  const rootCategory = categoryById(root.category);

  const rootW = svgTextWidth(root.label) + 30;
  const rootX = 14;
  const facetX = rootX + rootW + 64;
  const maxFacetW =
    Math.max(...groups.map((group) => svgTextWidth(`${group.label} ${group.nodes.length}`))) + 24;
  const leafX = facetX + maxFacetW + 64;

  let cursor = pad;
  const lanes = groups.map((group) => {
    const lane = { group, top: cursor, height: group.nodes.length * rowH };
    cursor += lane.height + laneGap;
    return lane;
  });
  const totalH = Math.max(cursor - laneGap + pad, 170);

  const leafWidths = groups.flatMap((group) =>
    group.nodes.map((node) => {
      const count = paperCountForConcept(node.id);
      return svgTextWidth(node.label + (count ? ` ${count}篇` : "")) + 32;
    })
  );
  const width = leafX + Math.max(...leafWidths, 90) + pad;
  svg.setAttribute("viewBox", `0 0 ${width} ${totalH}`);
  svg.style.height = `${totalH}px`;
  svg.style.minWidth = `${width}px`;

  const link = (x1, y1, x2, y2) => {
    const path = document.createElementNS(ns, "path");
    path.setAttribute("class", "focus-link");
    const mid = (x1 + x2) / 2;
    path.setAttribute("d", `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`);
    svg.appendChild(path);
  };

  const rootY = totalH / 2;

  lanes.forEach((lane) => {
    const facetY = lane.top + lane.height / 2;
    link(rootX + rootW, rootY, facetX, facetY);
    lane.group.nodes.forEach((node, index) => {
      const leafY = lane.top + index * rowH + rowH / 2;
      link(facetX + maxFacetW, facetY, leafX, leafY);
    });
  });

  lanes.forEach((lane) => {
    const facetY = lane.top + lane.height / 2;
    const group = document.createElementNS(ns, "g");
    group.setAttribute("class", "focus-facet");
    const rect = document.createElementNS(ns, "rect");
    rect.setAttribute("x", facetX);
    rect.setAttribute("y", facetY - 13);
    rect.setAttribute("width", maxFacetW);
    rect.setAttribute("height", 26);
    rect.setAttribute("rx", 13);
    const text = document.createElementNS(ns, "text");
    text.setAttribute("x", facetX + maxFacetW / 2);
    text.setAttribute("y", facetY + 4);
    text.setAttribute("text-anchor", "middle");
    text.textContent = `${lane.group.label} ${lane.group.nodes.length}`;
    group.append(rect, text);
    svg.appendChild(group);
  });

  lanes.forEach((lane) => {
    lane.group.nodes.forEach((node, index) => {
      const leafY = lane.top + index * rowH + rowH / 2;
      const category = categoryById(node.category);
      const count = paperCountForConcept(node.id);
      const countText = count ? `${count}篇` : "";
      const w = svgTextWidth(node.label + (countText ? ` ${countText}` : "")) + 32;
      const group = document.createElementNS(ns, "g");
      group.setAttribute("class", "focus-leaf");
      group.setAttribute("tabindex", "0");
      group.setAttribute("role", "button");
      group.setAttribute("aria-label", `聚焦 ${node.label}`);
      const rect = document.createElementNS(ns, "rect");
      rect.setAttribute("x", leafX);
      rect.setAttribute("y", leafY - boxH / 2);
      rect.setAttribute("width", w);
      rect.setAttribute("height", boxH);
      rect.setAttribute("rx", 5);
      rect.setAttribute("stroke", category.color);
      const text = document.createElementNS(ns, "text");
      text.setAttribute("x", leafX + 14);
      text.setAttribute("y", leafY + 4.5);
      text.textContent = node.label;
      group.append(rect, text);
      if (countText) {
        const countNode = document.createElementNS(ns, "text");
        countNode.setAttribute("class", "focus-leaf-count");
        countNode.setAttribute("x", leafX + 14 + svgTextWidth(node.label) + 8);
        countNode.setAttribute("y", leafY + 4.5);
        countNode.textContent = countText;
        group.appendChild(countNode);
      }
      const open = () => focusOn(node.id);
      group.addEventListener("click", open);
      group.addEventListener("keydown", (event) => {
        if (event.key === "Enter") open();
      });
      svg.appendChild(group);
    });
  });

  const rootGroup = document.createElementNS(ns, "g");
  rootGroup.setAttribute("class", "focus-root");
  rootGroup.setAttribute("tabindex", "0");
  rootGroup.setAttribute("role", "button");
  rootGroup.setAttribute("aria-label", `编辑 ${root.label}`);
  const rootRect = document.createElementNS(ns, "rect");
  rootRect.setAttribute("x", rootX);
  rootRect.setAttribute("y", rootY - 19);
  rootRect.setAttribute("width", rootW);
  rootRect.setAttribute("height", 38);
  rootRect.setAttribute("rx", 6);
  rootRect.setAttribute("fill", rootCategory.color);
  const rootText = document.createElementNS(ns, "text");
  rootText.setAttribute("x", rootX + rootW / 2);
  rootText.setAttribute("y", rootY + 5);
  rootText.setAttribute("text-anchor", "middle");
  rootText.textContent = root.label;
  rootGroup.append(rootRect, rootText);
  rootGroup.addEventListener("click", () => openInspector(root.id));
  svg.appendChild(rootGroup);
}

function renderFocusList() {
  const list = el("focusList");
  list.innerHTML = "";
  const visible = state.concepts
    .filter((concept) => matchesSearch(concept.label, concept.definition, concept.zoteroTag))
    .sort((a, b) => a.label.localeCompare(b.label, "zh-CN"));
  visible.forEach((concept) => {
    const category = categoryById(concept.category);
    const button = document.createElement("button");
    button.className = `root-item ${focusId === concept.id ? "active" : ""}`;
    button.style.setProperty("--category-color", category.color);
    button.innerHTML = `
      <span class="root-dot"></span>
      <span>${escapeHtml(concept.label)}</span>
    `;
    button.addEventListener("click", () => focusOn(concept.id, { resetTrail: true }));
    list.appendChild(button);
  });
}

function renderFocus() {
  renderFocusList();
  const canvas = el("focusCanvas");
  if (!focusId && state.concepts.length) focusId = state.concepts[0].id;
  const concept = conceptById(focusId);
  if (!concept) {
    canvas.innerHTML = `
      <div class="empty-state focus-empty">
        <span data-icon="scan-search"></span>
        <p>左侧选择一个概念作为焦点</p>
      </div>
    `;
    return;
  }

  const category = categoryById(concept.category);
  const groups = facetGroups(concept);
  const papers = state.papers
    .filter((paper) => paper.conceptIds.includes(concept.id))
    .sort((a, b) => (a.year || "9999").localeCompare(b.year || "9999"));

  const crumbs = focusTrail
    .map(conceptById)
    .filter(Boolean)
    .map(
      (item, index) =>
        `<button class="crumb" data-index="${index}">${escapeHtml(item.label)}</button><span class="crumb-sep">/</span>`
    )
    .join("");

  canvas.innerHTML = `
    <nav class="focus-breadcrumbs" aria-label="追溯路径">
      ${crumbs}
      <span class="crumb-current">${escapeHtml(concept.label)}</span>
    </nav>
    <article class="focus-card" style="--category-color:${category.color}">
      <div class="focus-card-heading">
        <div>
          <span class="focus-category" style="color:${category.color}">${category.label}</span>
          <h3>${escapeHtml(concept.label)}</h3>
        </div>
        <button class="text-button" id="focusEditButton">
          <span data-icon="wrench"></span>
          编辑
        </button>
      </div>
      <p class="focus-definition">${escapeHtml(concept.definition || "尚未填写定义")}</p>
    </article>
    <div class="focus-tree-wrap">
      ${
        groups.length
          ? `<svg id="focusTreeSvg" aria-label="焦点树状图"></svg>`
          : `<p class="empty-column">这个概念还没有任何关系，点击“编辑”开始连接。</p>`
      }
    </div>
    ${
      concept.sourceReviewId
        ? (() => {
            const review = state.papers.find((item) => item.id === concept.sourceReviewId);
            return review
              ? `
                <section class="focus-source">
                  <span class="review-badge">来源综述</span>
                  <button class="paper-link" data-paper="${review.id}">${escapeHtml(review.title)}</button>
                </section>
              `
              : "";
          })()
        : ""
    }
    <section class="focus-papers">
      <h4>挂载文献 · 按年份 <span class="facet-count">${papers.length}</span></h4>
      ${
        papers.length
          ? papers
              .map(
                (paper) => `
                  <button class="focus-paper-item" data-paper="${paper.id}">
                    <span class="focus-paper-year">${escapeHtml(paper.year || "—")}</span>
                    <span class="focus-paper-body">
                      <span class="focus-paper-title">${escapeHtml(paper.title)}</span>
                      <span class="focus-paper-meta">${escapeHtml(paper.authors || "")}</span>
                    </span>
                  </button>
                `
              )
              .join("")
          : `<p class="empty-column">还没有文献挂载到这个概念。</p>`
      }
    </section>
  `;

  renderFocusTree(concept, groups);

  canvas.querySelectorAll(".crumb").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      const id = focusTrail[index];
      focusTrail = focusTrail.slice(0, index);
      focusId = id;
      renderFocus();
      initializeIcons();
    });
  });
  canvas.querySelectorAll(".focus-paper-item, .focus-source .paper-link").forEach((button) => {
    button.addEventListener("click", () => {
      selectedPaperId = button.dataset.paper;
      switchView("papers");
      renderPapers();
    });
  });
  canvas.querySelector("#focusEditButton")?.addEventListener("click", () => openInspector(concept.id));
}

function renderPapers() {
  const list = el("paperList");
  const papers = state.papers.filter((paper) => {
    const placementMatches =
      paperFilter === "all" ||
      (paperFilter === "placed" && paper.conceptIds.length) ||
      (paperFilter === "unplaced" && !paper.conceptIds.length);
    return placementMatches && matchesSearch(paper.title, paper.authors, paper.summary);
  });
  list.innerHTML = "";

  papers.forEach((paper) => {
    const item = document.createElement("article");
    item.className = `paper-item ${selectedPaperId === paper.id ? "active" : ""}`;
    item.innerHTML = `
      <h3>${paper.kind === "review" ? `<span class="review-badge">综述</span>` : ""}${escapeHtml(paper.title)}</h3>
      <div class="paper-item-meta">
        <span>${escapeHtml([paper.authors, paper.year].filter(Boolean).join(" · ") || "信息待补充")}</span>
        <span class="placement-status ${paper.conceptIds.length ? "placed" : ""}">
          ${paper.conceptIds.length ? `${paper.conceptIds.length} 个定位` : "待定位"}
        </span>
      </div>
    `;
    item.addEventListener("click", () => {
      selectedPaperId = paper.id;
      renderPapers();
    });
    list.appendChild(item);
  });

  const paper = state.papers.find((item) => item.id === selectedPaperId);
  renderPaperDetail(paper);
}

function renderPaperDetail(paper) {
  const detail = el("paperDetail");
  if (!paper) {
    detail.innerHTML = `
      <div class="empty-state">
        <span data-icon="mouse-pointer-2"></span>
        <p>选择一篇论文开始定位</p>
      </div>
    `;
    initializeIcons();
    return;
  }

  const relatedRows = (paper.relatedPapers || [])
    .map((link) => {
      const target = state.papers.find((item) => item.id === link.paperId);
      const label = target ? target.title : link.ref;
      return `
        <li>
          <span class="paper-link-type">${paperLinkLabels[link.type] || link.type}</span>
          ${
            target
              ? `<button class="paper-link" data-paper="${target.id}">${escapeHtml(label)}</button>`
              : `<span class="paper-link-plain">${escapeHtml(label)}（库外）</span>`
          }
        </li>
      `;
    })
    .join("");

  detail.innerHTML = `
    <div class="paper-detail-header">
      <h3>${paper.kind === "review" ? `<span class="review-badge">综述</span>` : ""}${escapeHtml(paper.title)}</h3>
      <p>${escapeHtml([paper.authors, paper.year, paper.identifier].filter(Boolean).join(" · "))}</p>
    </div>
    <div class="paper-summary">${escapeHtml(paper.summary || "尚未填写一句话定位。")}</div>
    ${
      relatedRows
        ? `
          <div class="paper-links">
            <h4>与其他文献的关系</h4>
            <ul>${relatedRows}</ul>
          </div>
        `
        : ""
    }
    <div class="placement-heading">
      <h4>选择概念位置</h4>
      <button class="text-button" id="quickNewConcept">
        <span data-icon="git-branch-plus"></span>
        没有合适位置，新建分支
      </button>
    </div>
    <div class="concept-checkbox-grid">
      ${state.concepts
        .map((concept) => {
          const category = categoryById(concept.category);
          return `
            <label class="concept-checkbox">
              <input type="checkbox" value="${concept.id}" ${paper.conceptIds.includes(concept.id) ? "checked" : ""}>
              <span>
                <strong>${escapeHtml(concept.label)}</strong><br>
                <small style="color:${category.color}">${category.label}</small>
              </span>
            </label>
          `;
        })
        .join("")}
    </div>
  `;

  detail.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", async () => {
      const conceptIds = [...paper.conceptIds];
      if (checkbox.checked) {
        conceptIds.push(checkbox.value);
      } else {
        const index = conceptIds.indexOf(checkbox.value);
        if (index >= 0) conceptIds.splice(index, 1);
      }
      try {
        setSyncState("", "正在写入论文定位");
        const result = await api(`/api/papers/${encodeURIComponent(paper.id)}`, {
          method: "PUT",
          body: JSON.stringify({ conceptIds: [...new Set(conceptIds)] }),
        });
        await applyServerState(result, "论文定位已写回 Obsidian");
      } catch (error) {
        setSyncState("error", "论文定位写入失败");
        showToast(error.message);
        renderPapers();
      }
    });
  });
  el("quickNewConcept").addEventListener("click", () => openInspector());
  detail.querySelectorAll(".paper-link").forEach((button) => {
    button.addEventListener("click", () => {
      selectedPaperId = button.dataset.paper;
      renderPapers();
    });
  });
  initializeIcons();
}

async function addPaper(event) {
  event.preventDefault();
  if (event.submitter?.value === "cancel") return;
  const title = el("paperTitle").value.trim();
  if (!title) return;
  const paper = {
    title,
    authors: el("paperAuthors").value.trim(),
    year: el("paperYear").value.trim(),
    identifier: el("paperIdentifier").value.trim(),
    summary: el("paperSummary").value.trim(),
    conceptIds: [],
  };
  try {
    setSyncState("", "正在创建论文笔记");
    const result = await api("/api/papers", {
      method: "POST",
      body: JSON.stringify(paper),
    });
    await applyServerState(result, "论文定位卡已写入 Obsidian");
    selectedPaperId =
      result.state.papers.find((item) => item.title === title)?.id ||
      result.state.papers[0]?.id ||
      null;
    el("paperDialog").close();
    el("paperForm").reset();
    switchView("papers");
    renderAll();
  } catch (error) {
    setSyncState("error", "论文创建失败");
    showToast(error.message);
  }
}

function switchView(view) {
  currentView = view;
  document.querySelectorAll(".view-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  document.querySelectorAll(".view").forEach((section) => {
    section.classList.toggle("active", section.id === `${view}View`);
  });
  if (view === "tree") setTimeout(renderTree, 0);
  if (view === "focus") {
    setTimeout(() => {
      renderFocus();
      initializeIcons();
    }, 0);
  }
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `research-knowledge-tree-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("JSON 已导出");
}

function showToast(message) {
  const toast = el("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function truncate(value, max) {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

function renderRelationFilter() {
  el("relationFilter").innerHTML = [
    `<button class="active" data-relation="all">全部</button>`,
    `<button data-relation="is_a">层级</button>`,
    ...relationTypes.map(
      (item) => `<button data-relation="${item.id}">${item.short}</button>`
    ),
  ].join("");
}

function bindEvents() {
  document.querySelectorAll(".view-tab").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });
  document.querySelectorAll("#relationFilter button").forEach((button) => {
    button.addEventListener("click", () => {
      relationFilter = button.dataset.relation;
      document.querySelectorAll("#relationFilter button").forEach((item) => {
        item.classList.toggle("active", item === button);
      });
      renderTree();
    });
  });
  document.querySelectorAll(".paper-filter button").forEach((button) => {
    button.addEventListener("click", () => {
      paperFilter = button.dataset.paperFilter;
      document.querySelectorAll(".paper-filter button").forEach((item) => {
        item.classList.toggle("active", item === button);
      });
      renderPapers();
    });
  });

  const syncSearch = (value, source) => {
    searchTerm = value.trim().toLowerCase();
    if (source !== "top") el("searchInput").value = value;
    if (source !== "board") el("boardSearchInput").value = value;
    renderAll();
  };
  el("searchInput").addEventListener("input", (event) => syncSearch(event.target.value, "top"));
  el("boardSearchInput").addEventListener("input", (event) => syncSearch(event.target.value, "board"));
  el("addConceptButton").addEventListener("click", () => openInspector());
  el("closeInspector").addEventListener("click", closeInspector);
  el("modalBackdrop").addEventListener("click", closeInspector);
  el("conceptForm").addEventListener("submit", saveConcept);
  el("addRelationButton").addEventListener("click", () => addRelationRow());
  el("deleteConceptButton").addEventListener("click", deleteConcept);
  el("exportButton").addEventListener("click", exportData);
  el("refreshButton").addEventListener("click", () => loadFromObsidian());
  el("addPaperButton").addEventListener("click", () => el("paperDialog").showModal());
  el("paperForm").addEventListener("submit", addPaper);
  window.addEventListener("resize", () => {
    if (currentView === "tree") renderTree();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeInspector();
  });
}

renderCategoryOptions();
renderRelationFilter();
bindEvents();
renderAll();
loadFromObsidian();
setInterval(async () => {
  try {
    const next = await api("/api/state");
    if (next.version === stateVersion) return;
    if (el("inspector").classList.contains("open") || el("paperDialog").open) {
      setSyncState("", "Obsidian 有新修改，关闭编辑器后刷新");
      return;
    }
    state = { concepts: next.concepts, papers: next.papers };
    stateVersion = next.version;
    renderAll();
    setSyncState("synced", "已读取 Obsidian 新修改");
  } catch {
    setSyncState("error", "Obsidian 同步中断");
  }
}, 2000);
