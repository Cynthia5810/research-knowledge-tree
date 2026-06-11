---
type: review_map
title: "Recent advances in ion selectivity with capacitive deionization"
year: 2021
citekey: Gamaethiralalage2021IonSelectivityCDI
doi: "10.1039/D0EE03145C"
journal: "Energy & Environmental Science"
zotero_key: UVAXYCGR
analysis_basis: full_text
status: draft
confidence: medium
review_scope:
  domain: 膜
  application: 电容去离子（CDI）的离子选择性
  material_scope: [intercalation_electrode, PBA, MnO2, IEM]
  time_scope: "截至 2021"
tree_usage:
  use_as_navigation: true
  attach_to_tree_as_evidence: false
review_role:
  - mechanism_map
  - adjacent_technology_map
concepts: [膜电容去离子, 选择性, 嵌入-脱嵌]
crossref:
  reference_count: 0
---

# Recent advances in ion selectivity with capacitive deionization

> 作者：Gamaethiralalage, Singh, Sahin, Yoon, Elimelech, Suss, Liang, Biesheuvel, Zornitta, Smet。Energy & Environ. Sci. 综述。全文已读（Zotero UVAXYCGR）。
> 对本树价值：电容去离子（CDI）的选择性机制全景，关联「膜电容去离子」节点；含 λ-MnO2 对 Li 的选择嵌入证据。

## 1. 综述覆盖范围

- 领域：电容去离子 CDI（含膜电容去离子 MCDI）的离子选择性
- 核心：靠电极 + 膜两条路线实现选择性电吸附，面向脱盐与离子资源回收（含锂）

## 2. 它给出的分类框架

### 电极选择性（§2，综述主体）

- 阳离子选择 / 阴离子选择电极
- **嵌入材料电极**（intercalation）：普鲁士蓝及类似物（PBA：NiHCF/CuHCF）、NaMnO2、**λ-MnO2**、TiS2 等——靠晶格嵌入按尺寸/水合能选择
- 氧化还原活性修饰电极、法拉第反应电极

### 膜选择性（§3）

- 一价选择 CEM：CIMS（高交联体相筛分）、CSO（正电涂层电荷排斥）
- 商用 CMX 因负电外层反而偏好二价

### 理论模型（§4）

- CDI 选择性的建模框架综述

## 3. 关键原始论文候选

| 原始论文 | 类别 | claim | 是否精读 |
|---|---|---|---|
| Kim et al.（λ-MnO2/AC，ref 92） | 嵌入电极 | λ-MnO2 从含 Na/K/Ca/Mg 卤水选择提 Li，r≈12 | 是（Li 选择性证据） |
| Singh et al.（NiHCF，ref 103） | 嵌入电极 | Na 对 Ca/Mg 选择性 r≈20-25 | 中 |
| Choi et al.（CIMS 膜，ref 121） | 一价选择膜 | CIMS 实现 Na/Ca 一价选择 R≈1.8 | 中 |

## 4. 综述总结出的研究问题

- 嵌入电势相近的离子（Na vs Ca/Mg）仍能高选择，竞争吸附机制需厘清
- 层状嵌入材料缺少明确"过滤器"区分离子，需结构改造引入选择性
- CDI 选择性定义不统一，跨研究难比较

## 5. 综述提出的未来方向

- 通过层间距/堆叠调控（如 MXene）引导层状电极的离子偏好
- 统一选择性度量

## 6. 对我的知识树的作用

- **关联 MCDI**：现有「膜电容去离子」节点的母过程是 CDI——提议新增「电容去离子CDI」作为 method 父节点
- **嵌入材料证据**：λ-MnO2 选 Li（r≈12）是「嵌入-脱嵌」机制 + 锂回收的可挂证据；现有「吸附膜」(Al/Mn/Ti 基)与之呼应
- 提议见 proposed_concepts.md

## 7. 从综述中提取的 Claim 候选

| claim | 所属树枝 | 依据 |
|---|---|---|
| λ-MnO2 嵌入电极可从多离子卤水选择提 Li（r≈12），靠 Li 最小离子尺寸适配四面体位点 | 嵌入-脱嵌/锂回收 | §2.3 ref 92 |
| 一价选择 CEM 两机制：CIMS 体相筛分 vs CSO 正电涂层电荷排斥 | 离子交换膜 | §3.1 |

## 8. 一句话定位

这篇综述是：系统梳理电容去离子（CDI/MCDI）实现离子选择性的电极路线（嵌入材料 PBA/λ-MnO2/TiS2 等）与膜路线（一价选择 CEM），含 λ-MnO2 选择提锂（r≈12）证据，关联本树「膜电容去离子」与「嵌入-脱嵌」分支。
