---
type: review_map
title: "Microporous framework membranes for precise molecule/ion separations"
year: 2021
citekey: Dou2021MicroporousFrameworkMembranes
doi: "10.1039/D0CS00552E"
journal: "Chemical Society Reviews"
zotero_key: GS8W9BKA
analysis_basis: full_text
status: draft
confidence: medium
review_scope:
  domain: 膜
  application: 微孔框架膜的精密分子/离子分离
  material_scope: [zeolite, MOF, COF, POC, CMS]
  time_scope: "截至 2021"
tree_usage:
  use_as_navigation: true
  attach_to_tree_as_evidence: false
review_role:
  - material_classification_map
  - mechanism_map
concepts: [MOF膜, COF膜, 尺寸筛分]
crossref:
  reference_count: 0
---

# Microporous framework membranes for precise molecule/ion separations

> 作者：Dou, Xu, ..., Jiang, Chen（Chem Soc Rev）。综述。全文已读（Zotero GS8W9BKA）。
> 对本树价值：微孔框架膜（沸石/MOF/COF/POC）的材料分类与分离机制全景；引入「沸石膜」并补强 MOF/COF 膜分支。

## 1. 综述覆盖范围

- 领域：微孔框架膜的精密分子/离子分离
- 核心：用有序微孔超越聚合物膜的 permeability-selectivity 上界

## 2. 它给出的分类框架

### 微孔框架膜按材料分类（§2）

- **无机微孔框架膜**：沸石膜（zeolite）、碳分子筛膜（CMS）
- **杂化微孔框架膜**：MOF 膜
- **有机微孔框架膜**：COF 膜、POC（多孔有机笼）膜、CTF（共价三嗪框架）膜

### 微孔结构控制（§3）

- 微孔结构关键点 / 控制策略 / **晶界缺陷及其控制**（缺陷封堵是规模化核心难题）

### 分离机制三分类（§4，与溶液-扩散框架一致）

- **扩散选择性分离**：分子筛分、Knudsen 扩散、表面扩散、毛细凝聚；新机制有形状筛分、分子截面尺寸筛分、构象筛分
- **吸附选择性分离**：靠优先吸附（热力学控制）
- **吸附-扩散协同**：两者常相互竞争，协同调控是高难度设计目标

## 3. 关键原始论文候选

| 原始论文 | 类别 | claim | 是否精读 |
|---|---|---|---|
| 形状/构象筛分 MOF（refs 229,323） | 扩散选择性 | 刚性 MOF 三角孔实现构象选择（C3H8） | 否（气体分离） |
| CMS 膜（Koros，ref 58） | 吸附-扩散协同 | 热解微孔的吸附+扩散协同 CO2/CH4 | 否 |
| 晶界缺陷封堵策略（§3.3） | 结构控制 | WS2/GO/异丙醇封堵晶界缺陷 | 中（规模化共性问题） |

## 4. 综述总结出的研究问题

- 有效孔径总大于晶体学孔径（缺陷+多级微孔），偏差可达 0.5 Å
- 晶界缺陷是微孔框架膜规模化的核心障碍
- 吸附选择性与扩散选择性相互制约，协同调控难

## 5. 综述提出的未来方向

- 精密微孔结构与晶界缺陷的可控制备
- 吸附-扩散协同机制的精细设计

## 6. 对我的知识树的作用

- **材料层提议**：新增「沸石膜」「碳分子筛膜」「POC膜（多孔有机笼）」节点（is_a 膜材料，acts_via 尺寸筛分）——见 proposed_concepts.md
- **机制印证**：扩散选择性/吸附选择性 与本树已有的「扩散选择性/分配选择性」一致，巩固该框架；晶界缺陷是材料层共性约束
- 深挖现有 MOF膜/COF膜 节点

## 7. 从综述中提取的 Claim 候选

| claim | 所属树枝 | 依据 |
|---|---|---|
| 微孔框架膜的有效孔径因缺陷+多级微孔总大于理论值（偏差可达 0.5Å），晶界缺陷是规模化核心障碍 | 膜材料/尺寸筛分 | §3.3, §4.1 |

## 8. 一句话定位

这篇综述是：系统梳理微孔框架膜（沸石/MOF/COF/POC/CMS）的材料分类、微孔与晶界结构控制、以及扩散/吸附/协同三类分离机制，为本树引入「沸石膜」等材料节点并巩固吸附-扩散选择性机制框架。
