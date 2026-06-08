# Research Knowledge Tree

这个 vault 是 Research Knowledge Tree 方法论的个人工作区。当前使用膜科学作为案例，目标不是生成 Obsidian 自带的散点图，而是维护一套可阅读、可更新、可追溯证据的科研知识结构。

## 核心原则

文献不是知识树的主干。知识树的主干是研究对象、材料体系、问题、机制、方法和性能；文献是挂在树枝上的证据、转折点或导航地图。

## 两类文献

### 综述论文

综述放在 `01_Review_Maps/`。它不直接挂在树上，主要用来：

- 建立分类框架
- 发现关键原始论文
- 提取领域共识和争议
- 提出未来方向
- 帮助我们给树枝命名

### 原始研究论文

原始研究论文放在 `02_Paper_Position_Cards/`。它需要判断：

- 挂在哪个知识树分支
- 解决了什么问题
- 使用了什么策略
- 支持了什么机制
- 提升了什么性能
- 留下了什么新问题
- 和其他论文是什么关系

## 主要入口

- `03_Knowledge_Tree/membrane_tree.md`：主知识树
- `03_Knowledge_Tree/lithium_magnesium_separation_tree.md`：锂镁分离方向树
- `03_Knowledge_Tree/generated_tree.md`：脚本生成的层级树
- `04_Claim_Evidence_Records/`：可复用论点和证据记录
- `06_Prompts/review_map_template.md`：综述地图模板
- `06_Prompts/paper_position_card_template.md`：原始论文定位卡模板
- `07_Ontology/membrane_tree_ontology_v2.md`：受控分类和标签

## 推荐工作流

1. 在 Zotero 中保存论文和 PDF。
2. 综述论文用 `Review Map` 模板整理到 `01_Review_Maps/`。
3. 原始论文用 `Paper Position Card` 模板整理到 `02_Paper_Position_Cards/`。
4. 从论文中提取可复用 claim，必要时放入 `04_Claim_Evidence_Records/`。
5. 手动填写或让我帮助填写 `tree_position`、`paper_role` 和 `claim_records`。
6. 运行 `08_Scripts/generate_tree.js`，生成层级树和文献定位表。

## Zotero 同步

导入新 Zotero library 后，先运行：

```bash
node 08_Scripts/zotero_triage.js
```

它会生成：

- `99_Outputs/zotero_import_assessment.md`
- `05_Tables/zotero_collection_summary.csv`
- `05_Tables/zotero_candidate_papers.csv`
