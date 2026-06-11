---
type: review_map
title: "Continuous Covalent Organic Frameworks Membranes: From Preparation Strategies to Applications"
year: 2023
citekey: Sun2023ContinuousCOFMembranes
doi: "10.1002/smll.202303757"
journal: "Small"
zotero_key: SAH5KFYJ
analysis_basis: full_text
status: draft
confidence: medium
review_scope:
  domain: 膜
  application: COF 膜（气体/水/离子/电池多场景）
  material_scope: [COF]
  time_scope: "截至 2023"
tree_usage:
  use_as_navigation: true
  attach_to_tree_as_evidence: false
review_role:
  - material_deepdive_map
  - preparation_strategy_map
concepts: [COF膜, Li-Mg分离, Li-Na分离]
crossref:
  reference_count: 0
---

# Continuous Covalent Organic Frameworks Membranes: From Preparation Strategies to Applications

> 作者：Sun, Di, Liu, Gao, Yan, He（大连理工）。Small 综述。全文已读（Zotero SAH5KFYJ）。
> 对本树价值：深挖现有「COF膜」节点——制备策略 + 离子分离性能数据，补强材料层。

## 1. 综述覆盖范围

- 领域：连续 COF 膜（区别于 COF 混合基质膜 MMM）
- 应用横跨气体分离、水处理、离子传输、能源电池；与本树相关的是 §4.4 离子传输/阳离子分离
- 核心问题：COF 有序孔道+可调孔径+丰富官能团，能否突破聚合物膜的选择性-渗透性 trade-off

## 2. 它给出的分类框架

### 按连接键类型分类（§2.1）

- 不稳定型：硼氧六环、硼酸酯（遇水不稳）
- 稳定型：亚胺、腙、三嗪、β-酮烯胺（酸碱稳定）

### 按制备策略分类（§3，综述主轴）

- COF 纳米片 LBL 层层堆叠
- 原位生长（in-situ growth）
- 界面聚合（IP）
- 溶剂浇铸（solvent casting）
- 支撑型 COF 复合膜 vs 自支撑 COF 膜

### 按离子分离机制分类（§4.4）

- 尺寸筛分（亚纳米孔，<1nm 对一价/二价区分）
- 配位/氢键识别（孔内酸性基团 -SO3H/-PO3H2/-CO2H 调控）
- pH 门控（亚胺质子化/酚解离切换孔道电荷）

## 3. 关键原始论文候选

| 原始论文 | 类别 | claim | 是否精读 |
|---|---|---|---|
| Xu et al.（ref 138，TpBDMe2/AAO） | COF 阳离子分离 | 1.4nm 孔 + 氢键位点，Li/Mg=217、K/Mg=765、Na/Mg=680 | 是（Li/Mg 高选择性证据） |
| Jiang et al.（ref 140，TpPa-PO3H2/SO3H/CO2H） | COF 单价分离 | 磷酸孔道 K/Li 实测 4.2-4.7、理论 13.7 | 是（单价/单价分离稀缺证据） |
| Lai et al.（ref 141-142，pH 门控/cysteine 开关） | COF 智能门控 | pH 调控孔道电荷，Na/K 选择性 1.7→2.9 | 中 |

## 4. 综述总结出的研究问题

- COF 膜孔径常 >1nm，需做到亚纳米（≈0.6nm）才能特异性筛离子
- 单价/单价（K/Li、Na/K）分离仍是最难任务（水合尺寸差小、电荷同）
- MMM 中 COF 颗粒易团聚，连续膜（自支撑/复合）是方向

## 5. 综述提出的未来方向

- 发展亚纳米孔 COF 膜用于特定离子分离
- 仿生 pH/离子门控的智能 COF 纳流体通道

## 6. 对我的知识树的作用

- **深挖 COF膜**：现有「COF膜」节点 acts_via 配位识别，本综述补充其也靠尺寸筛分与 pH 门控；Li/Mg=217 是可挂的性能证据
- 制备策略提议：界面聚合（IP）是跨膜种共用的制备方法（聚酰胺膜、COF膜都用）——提议见 proposed_concepts.md
- 暂不为 LBL/原位生长/溶剂浇铸单独建节点（过细，待用户定树深度）

## 7. 从综述中提取的 Claim 候选

| claim | 所属树枝 | 依据 |
|---|---|---|
| 亚纳米孔 COF 膜可达 Li/Mg≈217，机制为二价阳离子与孔道更强氢键受阻 | COF膜/Li-Mg分离 | §4.4.3 ref 138 |
| COF 膜可实现单价/单价分离（K/Li 4.2-4.7），磷酸孔道优于磺酸/羧酸 | COF膜/Li-Na分离 | §4.4.3 ref 140 |

## 8. 一句话定位

这篇综述是：系统梳理连续 COF 膜的连接键类型、四类制备策略（LBL/原位生长/界面聚合/溶剂浇铸）与多场景应用，在离子分离上给出 COF 膜的 Li/Mg（217）与单价/单价（K/Li 4.2-4.7）选择性证据，深挖本树「COF膜」材料分支。
