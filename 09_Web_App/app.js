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
  { id: "is_a", label: "属于" },
  { id: "used_for", label: "用于" },
  { id: "acts_via", label: "通过机制" },
  { id: "improves", label: "改善" },
  { id: "related_to", label: "相关" },
];

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
      ],
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

let state = loadState();
let history = [];
let currentView = "board";
let selectedConceptId = null;
let selectedPaperId = null;
let relationFilter = "all";
let paperFilter = "all";
let searchTerm = "";
let toastTimer = null;

const el = (id) => document.getElementById(id);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (error) {
    console.warn("Could not load saved state", error);
  }
  return clone(initialState);
}

function saveState(message) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (message) showToast(message);
}

function checkpoint() {
  history.push(clone(state));
  if (history.length > 30) history.shift();
  updateUndoState();
}

function undo() {
  if (!history.length) return;
  state = history.pop();
  saveState("已撤销");
  renderAll();
  updateUndoState();
}

function updateUndoState() {
  el("undoButton").disabled = history.length === 0;
  el("undoButton").style.opacity = history.length ? "1" : "0.35";
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

function renderBoard() {
  const board = el("categoryBoard");
  board.innerHTML = "";

  categories.forEach((category) => {
    const concepts = state.concepts.filter(
      (item) =>
        item.category === category.id &&
        matchesSearch(item.label, item.definition, item.zoteroTag)
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

    concepts.forEach((concept) => {
      const card = document.createElement("article");
      card.className = "concept-card";
      card.style.setProperty("--category-color", category.color);
      card.draggable = true;
      card.dataset.id = concept.id;
      card.innerHTML = `
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

function moveConcept(id, category) {
  const concept = conceptById(id);
  if (!concept || concept.category === category) return;
  checkpoint();
  concept.category = category;
  saveState(`已移入“${categoryById(category).label}”`);
  renderAll();
}

function openInspector(id) {
  const concept = conceptById(id);
  const isNew = !concept;
  selectedConceptId = id || null;
  el("inspectorTitle").textContent = isNew ? "新建概念" : concept.label;
  el("conceptId").value = concept?.id || "";
  el("conceptLabel").value = concept?.label || "";
  el("conceptCategory").value = concept?.category || "object";
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

function saveConcept(event) {
  event.preventDefault();
  const label = el("conceptLabel").value.trim();
  if (!label) return;
  checkpoint();

  const payload = {
    label,
    category: el("conceptCategory").value,
    zoteroTag: el("conceptTag").value.trim(),
    definition: el("conceptDefinition").value.trim(),
    relations: collectRelations(),
  };

  const existing = conceptById(el("conceptId").value);
  if (existing) {
    Object.assign(existing, payload);
  } else {
    const concept = { id: slugify(label), ...payload };
    state.concepts.push(concept);
    selectedConceptId = concept.id;
  }

  saveState(existing ? "概念已更新" : "新分支已创建");
  closeInspector();
  renderAll();
}

function deleteConcept() {
  const concept = conceptById(selectedConceptId);
  if (!concept) return;
  const linkedPapers = paperCountForConcept(concept.id);
  const message = linkedPapers
    ? `“${concept.label}”连接了 ${linkedPapers} 篇论文。删除后这些定位也会移除，确定继续吗？`
    : `确定删除“${concept.label}”吗？`;
  if (!window.confirm(message)) return;

  checkpoint();
  state.concepts = state.concepts.filter((item) => item.id !== concept.id);
  state.concepts.forEach((item) => {
    item.relations = item.relations.filter((relation) => relation.target !== concept.id);
  });
  state.papers.forEach((paper) => {
    paper.conceptIds = paper.conceptIds.filter((id) => id !== concept.id);
  });
  saveState("概念已删除");
  closeInspector();
  renderAll();
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
      <h3>${escapeHtml(paper.title)}</h3>
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

  detail.innerHTML = `
    <div class="paper-detail-header">
      <h3>${escapeHtml(paper.title)}</h3>
      <p>${escapeHtml([paper.authors, paper.year, paper.identifier].filter(Boolean).join(" · "))}</p>
    </div>
    <div class="paper-summary">${escapeHtml(paper.summary || "尚未填写一句话定位。")}</div>
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
    checkbox.addEventListener("change", () => {
      checkpoint();
      if (checkbox.checked) {
        paper.conceptIds = [...new Set([...paper.conceptIds, checkbox.value])];
      } else {
        paper.conceptIds = paper.conceptIds.filter((id) => id !== checkbox.value);
      }
      saveState("论文定位已更新");
      renderStats();
      renderPapers();
    });
  });
  el("quickNewConcept").addEventListener("click", () => openInspector());
  initializeIcons();
}

function addPaper(event) {
  event.preventDefault();
  if (event.submitter?.value === "cancel") return;
  const title = el("paperTitle").value.trim();
  if (!title) return;
  checkpoint();
  const paper = {
    id: slugify(title),
    title,
    authors: el("paperAuthors").value.trim(),
    year: el("paperYear").value.trim(),
    identifier: el("paperIdentifier").value.trim(),
    summary: el("paperSummary").value.trim(),
    conceptIds: [],
  };
  state.papers.unshift(paper);
  selectedPaperId = paper.id;
  saveState("论文已加入待定位区");
  el("paperDialog").close();
  el("paperForm").reset();
  switchView("papers");
  renderAll();
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

function importData(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!Array.isArray(imported.concepts) || !Array.isArray(imported.papers)) {
        throw new Error("Invalid structure");
      }
      checkpoint();
      state = imported;
      saveState("数据已导入");
      renderAll();
    } catch (error) {
      showToast("导入失败：JSON 结构不正确");
    }
  };
  reader.readAsText(file);
}

function resetData() {
  if (!window.confirm("恢复示例数据会覆盖当前浏览器中的修改，确定继续吗？")) return;
  checkpoint();
  state = clone(initialState);
  selectedConceptId = null;
  selectedPaperId = null;
  saveState("已恢复示例数据");
  renderAll();
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

  el("searchInput").addEventListener("input", (event) => {
    searchTerm = event.target.value.trim().toLowerCase();
    renderAll();
  });
  el("addConceptButton").addEventListener("click", () => openInspector());
  el("closeInspector").addEventListener("click", closeInspector);
  el("modalBackdrop").addEventListener("click", closeInspector);
  el("conceptForm").addEventListener("submit", saveConcept);
  el("addRelationButton").addEventListener("click", () => addRelationRow());
  el("deleteConceptButton").addEventListener("click", deleteConcept);
  el("undoButton").addEventListener("click", undo);
  el("exportButton").addEventListener("click", exportData);
  el("importButton").addEventListener("click", () => el("importFile").click());
  el("importFile").addEventListener("change", (event) => importData(event.target.files[0]));
  el("resetButton").addEventListener("click", resetData);
  el("addPaperButton").addEventListener("click", () => el("paperDialog").showModal());
  el("paperForm").addEventListener("submit", addPaper);
  window.addEventListener("resize", () => {
    if (currentView === "tree") renderTree();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeInspector();
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
      event.preventDefault();
      undo();
    }
  });
}

renderCategoryOptions();
bindEvents();
renderAll();
updateUndoState();
