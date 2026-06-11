---
type: review_map
title: "Membrane Materials for Selective Ion Separations at the Water–Energy Nexus"
year: 2021
citekey: DuChanois2021MembraneMaterialsSelectiveIon
doi: "10.1002/adma.202101312"
journal: "Advanced Materials"
zotero_key: JZWAA347
analysis_basis: full_text
status: draft
confidence: medium
review_scope:
  domain: 膜
  application: 选择性离子分离（水-能源关联）
  material_scope: [polymer_TFC, IEM, MOF, COF, liquid_crystal, graphene, hBN, biomimetic_channel]
  time_scope: "截至 2021"
tree_usage:
  use_as_navigation: true
  attach_to_tree_as_evidence: false
review_role:
  - mechanism_map
  - material_classification_map
  - design_principle_map
concepts: [离子选择膜, 选择性, 尺寸筛分, 配位识别]
crossref:
  reference_count: 156
---

# Membrane Materials for Selective Ion Separations at the Water–Energy Nexus

> 作者：DuChanois, Porter, Violet, Verduzco, Elimelech（Yale + Rice，NSF NEWT 中心）。Advanced Materials 综述。全文已读（Zotero JZWAA347）。

## 1. 综述覆盖范围

- 领域：面向**离子-离子高精度分离**的膜材料（区别于水/盐分离）
- 应用横跨水-能源关联：纳滤、电渗析、PEM 燃料电池、液流电池、反向电渗析——锂提取只是其中一个被点名的潜在应用
- 核心问题：传统聚合物膜（TFC、IEM）受多尺度非均质性限制，难以达到生物离子通道的选择性；分子级精确设计的新材料能否突破
- 与本树的关系：这是一篇**机制+材料设计原理**综述，深度补强 Sreedhar2026 里只列了名字的几类前沿膜材料（MOF/COF/2D/仿生通道）

## 2. 它给出的分类框架

### 按选择性机制分类（核心贡献，§2.1 + 溶液-扩散理论）

- **位阻/尺寸筛分**（steric）：孔径接近水合/裸离子尺寸
- **Donnan 排斥**（charge）：膜固定电荷对同号 co-ion 的排斥
- **介电效应**（dielectric）：膜相低介电常数造成离子去溶剂化能垒
- 三者叠加 → TFC 膜对二价离子排斥强于一价
- 传输遵循**溶液-扩散模型**：渗透选择性 = 分配选择性 × 扩散选择性；分配选择性源于"去水合能 vs 与膜结合能"之差

### 按膜材料分类（综述主体五类）

1. 聚合物膜：TFC（聚酰胺，界面聚合）、IEM（CEM/AEM，固定电荷）；存在电导率-选择性 trade-off 上界
2. 微孔聚合物 PIM（本征微孔聚合物，刚性扭曲骨架）
3. MOF 膜（金属节点+有机配体，孔 0.3-10nm，UiO-66 报道 K/Mg≈800）
4. COF 膜（共价有机框架，孔 0.5-5nm）
5. 液晶介晶相（自组装 0.5-2nm 孔）
6. 2D 材料：石墨烯（纳孔/类冠醚孔）、六方氮化硼 hBN（质子选择）、氧化石墨烯层状膜
7. 离散仿生通道：CNT porin、冠醚通道、foldamer、超分子自组装肽管

### 按设计范式分类（§3.3 关键论点）

- 传统聚合物：**自上而下**、多尺度非均质、孔径与官能团位置不可控 → 选择性受限
- 新材料（晶态多孔/2D/仿生）：**分子级模块化**、孔径与化学同步可调 → 可模仿生物通道的"尺寸+配位"协同机制

## 3. 关键原始论文候选

| 原始论文 | 类别 | 可能贡献的 claim | 是否需要精读 |
|---|---|---|---|
| Epsztein, DuChanois, Ritt, Noy, Elimelech 2020 Nat. Nanotechnol.（ref 10） | 机制综述 | 离子选择性传输的设计原则 | 是 |
| Lu et al. 2020 Nat. Mater.（ref 83） | MOF | UiO-66 羧基孔窗 K/Mg≈800，附自由能计算 | 是 |
| Liang et al. 2020 Nat. Commun.（ref 66，SARIP） | 聚酰胺改性 | 表面活性剂自组装调控界面聚合→等孔，SO4/Cl>4000 | 是 |
| Geise, Hickner, Logan 2013（ref 14） | IEM 理论 | 电导率-选择性 trade-off 上界 | 中 |
| Tan et al. 2020 Nat. Mater.（ref 24，PIM） | 微孔聚合物 | PIM 用于水相离子分离与液流电池 | 中 |
| Kamcev, Paul, Freeman 2015-2016（refs 34,35） | IEM 理论 | Donnan + Manning 凝聚理论修正 co-ion 吸附预测 | 中 |

## 4. 综述总结出的研究问题

- 聚合物膜的多尺度非均质性是选择性天花板的根因，半世纪来 TFC 与全氟磺酸膜仍主导市场
- 分配选择性与扩散选择性不一定正相关：强配位可能"锁死"传输位点反而降通量（§3.2 膦酸 vs 磺酸例）
- 所有前沿材料（MOF/COF/2D/仿生）共同卡在**无缺陷规模化**——实验室都难做到无缺陷膜，大面积更难
- 仿生通道目前只在脂双层/囊泡中表征，嵌入嵌段共聚物可能变性

## 5. 综述提出的未来方向（§7 Outlook）

- 离子选择膜需要：孔径"小于水合离子、大于裸离子"以促进尺寸去水合 + 精确放置的配位位点（模仿 K+ 通道的 size+coordination 协同）
- 用结构-性质-性能关系 + 原子模拟（自由能剖面）指导孔设计
- 自下而上制备 + 选择性封堵缺陷是规模化关键
- 用所需 permselectivity 反向筛选可行应用（点名锂提取），再做技术经济评估

## 6. 对我的知识树的作用

- **机制层补强**：现有树的机制只有 Donnan排斥/尺寸筛分/配位识别/嵌入-脱嵌；本综述提示应补 **介电排斥（dielectric exclusion）** 这一独立机制，以及"分配选择性 vs 扩散选择性"的二分框架
- **材料层补强**：现有「2D材料膜」可细分石墨烯/氧化石墨烯/六方氮化硼；可新增「PIM 微孔聚合物膜」「液晶膜」；现有「仿生通道膜」可细分 CNT porin / 冠醚通道 / foldamer / 超分子肽管（呼应上次仿生膜分类讨论）
- **性能层补强**：电导率-选择性 trade-off、permselectivity 上界是重要的性能-性能权衡概念
- 提议详见 00_Inbox/proposed_concepts.md（待用户确认）
- 命名校验：本综述明确把 biomimetic channel 当"设计范式"，印证「仿生通道膜 acts_via 人工离子通道」的处理正确

## 7. 从综述中提取的 Claim 候选

| claim | 所属树枝 | 综述依据 | 需追踪原始论文 |
|---|---|---|---|
| 聚合物膜存在电导率-选择性 trade-off 上界，限制其离子-离子选择性 | 离子交换膜/性能 | §2.3, Fig 2a, ref 14 | ref 14 Geise 2013 |
| 生物离子通道靠尺寸+配位协同机制达到极高选择性（K+ 通道 K/Na≈10^4） | 配位识别/人工离子通道 | §3.3, refs 80,81 | refs 80,81 |
| MOF（UiO-66 羧基孔窗）可达 K/Mg≈800，机制为孔窗降低 K+ 迁移能垒 | MOF膜 | §4.1, ref 83 | ref 83 Lu 2020 |
| 所有分子级精确材料共同的规模化障碍是无缺陷大面积制备 | 膜材料 | §7 Outlook | — |

## 8. 一句话定位

这篇综述是：从**离子传输机制（位阻/Donnan/介电 + 溶液-扩散理论）**出发，论证传统聚合物膜的选择性受多尺度非均质性限制，系统梳理 MOF/COF/液晶/2D材料/仿生通道五类分子级精确设计材料的潜力与共同的无缺陷规模化瓶颈，为高精度离子分离（含锂提取）提供材料设计原理地图。
