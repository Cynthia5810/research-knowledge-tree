const fs = require("fs");
const path = require("path");
const http = require("http");

const VAULT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(VAULT, "99_Outputs");
const TABLE_DIR = path.join(VAULT, "05_Tables");
const BASE = "http://127.0.0.1:23119";

const SEARCH_QUERIES = [
  "Mg Li separation membrane",
  "lithium membrane",
  "ion selective membrane",
  "nanofiltration lithium magnesium",
  "Donnan lithium membrane",
  "hydration ion membrane",
];

function requestJson(pathname) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      `${BASE}${pathname}`,
      { headers: { "Zotero-API-Version": "3" }, timeout: 15000 },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            reject(new Error(`${res.statusCode}: ${body.slice(0, 200)}`));
            return;
          }
          try {
            resolve({ data: JSON.parse(body), headers: res.headers });
          } catch (error) {
            reject(error);
          }
        });
      }
    );
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", reject);
    req.end();
  });
}

function cleanText(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function csvEscape(value) {
  const s = cleanText(value);
  if (/[",\r\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function itemRow(item) {
  const data = item.data || {};
  const creators = (data.creators || [])
    .map((c) => [c.firstName, c.lastName].filter(Boolean).join(" ") || c.name)
    .filter(Boolean)
    .slice(0, 4)
    .join("; ");
  return {
    key: item.key,
    itemType: data.itemType || item.itemType || "",
    title: cleanText(data.title || item.title || ""),
    year: data.date ? String(data.date).match(/\d{4}/)?.[0] || "" : "",
    creators,
  };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(TABLE_DIR, { recursive: true });

  const collectionsResp = await requestJson("/api/users/0/collections?limit=100");
  const collections = collectionsResp.data;
  const summaries = [];

  for (const collection of collections) {
    const key = collection.key;
    const name = collection.data?.name || "";
    const parent = collection.data?.parentCollection || "";
    try {
      const resp = await requestJson(
        `/api/users/0/collections/${key}/items/top?limit=3&sort=dateModified&direction=desc`
      );
      summaries.push({
        key,
        name,
        parent,
        total: resp.headers["total-results"] || "0",
        sample: resp.data.map((item) => cleanText(item.data?.title)).filter(Boolean).join(" || "),
      });
    } catch (error) {
      summaries.push({ key, name, parent, total: "ERROR", sample: error.message });
    }
  }

  const candidateMap = new Map();
  for (const query of SEARCH_QUERIES) {
    const encoded = encodeURIComponent(query);
    const resp = await requestJson(`/api/users/0/items?q=${encoded}&limit=12`);
    for (const item of resp.data) {
      const row = itemRow(item);
      if (!row.title || row.itemType === "attachment" || row.itemType === "note") continue;
      if (!candidateMap.has(row.key)) candidateMap.set(row.key, { ...row, matched_queries: [] });
      candidateMap.get(row.key).matched_queries.push(query);
    }
  }

  const summaryCsv = [
    "key,name,parent,total,sample",
    ...summaries.map((r) => [r.key, r.name, r.parent, r.total, r.sample].map(csvEscape).join(",")),
  ].join("\n");
  fs.writeFileSync(path.join(TABLE_DIR, "zotero_collection_summary.csv"), `\uFEFF${summaryCsv}\n`, "utf8");

  const candidates = [...candidateMap.values()].sort((a, b) => (b.year || "").localeCompare(a.year || ""));
  const candidateCsv = [
    "key,itemType,year,title,creators,matched_queries",
    ...candidates.map((r) =>
      [r.key, r.itemType, r.year, r.title, r.creators, r.matched_queries.join("; ")].map(csvEscape).join(",")
    ),
  ].join("\n");
  fs.writeFileSync(path.join(TABLE_DIR, "zotero_candidate_papers.csv"), `\uFEFF${candidateCsv}\n`, "utf8");

  const md = [
    "# Zotero Import Assessment",
    "",
    "这个文件由 `08_Scripts/zotero_triage.js` 生成，用于把 Zotero 中的新导入文献先筛成候选列表，再进入 Review Map / Paper Position Card。",
    "",
    "## Collection 概览",
    "",
    "| Collection | 条目数 | 示例 |",
    "|---|---:|---|",
    ...summaries
      .filter((r) => r.total !== "0")
      .map((r) => `| ${r.name} | ${r.total} | ${r.sample || ""} |`),
    "",
    "## 第一批候选论文",
    "",
    "| Key | Year | Type | Title | 匹配来源 |",
    "|---|---:|---|---|---|",
    ...candidates
      .slice(0, 40)
      .map((r) => `| ${r.key} | ${r.year} | ${r.itemType} | ${r.title} | ${r.matched_queries.join("; ")} |`),
    "",
    "## 建议",
    "",
    "- Zotero 原 tags 很杂，先不要直接变成 Obsidian ontology。",
    "- 第一轮只处理候选论文中的综述和核心原始论文。",
    "- 综述进入 `01_Review_Maps/`，原始论文进入 `02_Paper_Position_Cards/`。",
    "- 对真正能复用的结论，额外生成 `04_Claim_Evidence_Records/`。",
  ].join("\n");
  fs.writeFileSync(path.join(OUT_DIR, "zotero_import_assessment.md"), `${md}\n`, "utf8");

  console.log(`Collections: ${summaries.length}`);
  console.log(`Candidates: ${candidates.length}`);
  console.log(`Wrote ${path.join(OUT_DIR, "zotero_import_assessment.md")}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

