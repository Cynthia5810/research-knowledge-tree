# Zotero to Obsidian Workflow

## Zotero 负责什么

Zotero 只做文献仓库，不做复杂知识树。

推荐 collection：

```text
Membrane Knowledge Tree
├── 00_Reviews
├── 01_Original_Papers
├── 02_To_Position
└── 09_Excluded
```

## Obsidian 负责什么

Obsidian 负责文献定位和知识树。

- 综述：`01_Review_Maps/`
- 原始研究：`02_Paper_Position_Cards/`
- 层级树：`03_Knowledge_Tree/`
- 受控标签：`07_Ontology/`

## 你下一步怎么做

现在 Codex 已经可以通过 Zotero 本地 API 读取你的 Zotero Desktop library。

已验证能力：

- 读取 collection
- 搜索本地 Zotero 条目
- 导出 BibTeX
- 找到 PDF 附件
- 读取 Zotero 已索引全文

手动导出仍然可作为备用方案：

1. 在 Zotero 里先挑 2 篇综述和 5-8 篇原始研究论文。
2. 对 collection 右键导出。
3. 优先选择 `Better CSL JSON`；如果没有 Better BibTeX，就先导出 BibTeX 或 RIS。
4. 把导出文件保存到：

```text
D:\学术知识树\Membrane Knowledge Tree\00_Inbox\
```

5. 告诉我导出文件名，我来帮你生成初始 Review Map 和 Paper Position Card。

## 当前已同步测试文件

- `00_Inbox/zotero_PBLWP9ZL.bib`
- `00_Inbox/PBLWP9ZL_fulltext.txt`

对应 Zotero 条目：

- Zotero item key: `PBLWP9ZL`
- Attachment key: `697Q53IM`
- Title: `Mechanism of lithium ion selectivity through membranes: a brief review`

## 注意

不要用 Obsidian Graph View 判断这个系统是否成功。Graph View 天然是散点。成功标准是 `03_Knowledge_Tree/` 里能生成清晰层级树。
