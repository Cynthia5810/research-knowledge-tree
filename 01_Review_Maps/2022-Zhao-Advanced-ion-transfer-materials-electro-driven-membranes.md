---
type: review_map
title: "Advanced ion transfer materials in electro-driven membrane processes for sustainable ion-resource extraction and recovery"
year: 2022
citekey: Zhao2022AdvancedIonTransferElectroDriven
doi: "10.1016/j.pmatsci.2022.100958"
journal: "Progress in Materials Science"
zotero_key: EXW99QWM
analysis_basis: full_text
status: draft
confidence: medium
review_scope:
  domain: 膜
  application: 电驱动膜的离子资源提取回收
  material_scope: [IEM, 2D_materials, MOF, COF, MIM]
  time_scope: "截至 2022"
tree_usage:
  use_as_navigation: true
  attach_to_tree_as_evidence: false
review_role:
  - mechanism_map
  - material_classification_map
concepts: [电驱动膜工艺, 选择性, 配位识别]
crossref:
  reference_count: 0
---

# Advanced ion transfer materials in electro-driven membrane processes for sustainable ion-resource extraction and recovery

> 作者：Zhao, Mamrol, Tarpeh, Yang, Gao, Van der Bruggen。Progress in Materials Science 综述。全文已读（Zotero EXW99QWM）。
> 对本树价值：电驱动膜的离子选择机制全景，补强「电驱动膜工艺」分支与机制层。

## 1. 综述覆盖范围

- 领域：电驱动膜（ED/电场驱动）的离子转移材料
- 应用：可持续离子资源提取与回收（含锂）
- 核心：水合离子传输特性 + 四类选择机制 + 材料加工 + 选择性指标 + 应用

## 2. 它给出的分类框架

### 离子选择机制四分类（综述核心，§2.2-2.3）

- **孔径筛分**：膜孔径 δ 对比水合离子直径 Dhi 与水合自由能；2D 材料（GO/MoS2/MXene）、COF/MOF 可调层间距
- **静电排斥**（Donnan）：荷电层对同号离子排斥，价数越高越难穿过同号涂层；擅长一价/多价分离，难做同价分离
- **化学亲和**（chemical affinity）：目标离子与膜内活性基团成键，代表是分子印迹膜（MIM）
- **仿生离子泵**（bioinspired ion pump，新机制）：模仿生物离子通道，靠 pH/温度/光等环境刺激门控

### 选择性指标（§3.2）

- 提供电驱动膜选择性的统一度量框架

## 3. 关键原始论文候选

| 原始论文 | 机制类别 | claim | 是否精读 |
|---|---|---|---|
| GO/MXene 层间距调控（refs 89-97） | 孔径筛分 | 电驱动膜可做 <0.7nm 层间距（压力驱动做不到） | 中 |
| 分子印迹膜 MIM（refs 118-127） | 化学亲和 | 定制识别位点选择性提取目标离子 | 中 |
| 仿生离子泵（refs 136-141） | 仿生 | 环境刺激门控的智能离子泵 | 中 |

## 4. 综述总结出的研究问题

- 孔径筛分存在目标离子通量与选择性的 trade-off
- 静电排斥难以分离同价离子（Li/Na 仍难）
- MIM 的离子-基团结合亲和力低 + 共存离子竞争结合 → 分离效率受限
- 仿生离子泵的核心难点是选"智能"刺激响应材料

## 5. 综述提出的未来方向

- 开发可控亚纳米孔结构与高电导薄涂层
- 推进仿生离子泵的智能门控材料

## 6. 对我的知识树的作用

- **机制层补强/提议**：化学亲和（chemical affinity）作为机制——但与现有「配位识别」高度重叠，验收时决定合并或区分；仿生离子泵与「人工离子通道」重叠
- **材料层提议**：分子印迹膜（MIM）作为独立材料节点（化学亲和机制的代表）
- 现有「电渗析/选择性电渗析/电驱动膜工艺」分支得到机制层背景印证
- 提议详见 proposed_concepts.md

## 7. 从综述中提取的 Claim 候选

| claim | 所属树枝 | 依据 |
|---|---|---|
| 电驱动膜可实现 <0.7nm 层间距离子传输，优于压力驱动膜 | 电驱动膜工艺/尺寸筛分 | §2.2.1 |
| 静电排斥擅长一价/多价分离，难做同价（Li/Na）分离 | Donnan排斥 | §2.2.2 |

## 8. 一句话定位

这篇综述是：把电驱动膜的离子选择性归为**孔径筛分 / 静电排斥 / 化学亲和 / 仿生离子泵**四类机制，系统梳理对应的先进离子转移材料（2D/COF/MOF/MIM/离子泵），面向可持续离子资源（含锂）提取，补强本树电驱动膜分支与机制层。
