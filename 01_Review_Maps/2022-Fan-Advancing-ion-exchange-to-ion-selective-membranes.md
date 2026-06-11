---
type: review_map
title: "Advancing ion-exchange membranes to ion-selective membranes: principles, status, and opportunities"
year: 2022
citekey: Fan2022AdvancingIEMtoISM
doi: "10.1007/s11783-023-1625-0"
journal: "Frontiers of Environmental Science & Engineering"
zotero_key: 9C8IEQMW
analysis_basis: full_text
status: draft
confidence: medium
review_scope:
  domain: 膜
  application: 离子交换膜的离子/离子选择性
  material_scope: [IEM, CEM, AEM]
  time_scope: "截至 2022"
tree_usage:
  use_as_navigation: true
  attach_to_tree_as_evidence: false
review_role:
  - mechanism_map
  - selectivity_taxonomy_map
concepts: [离子交换膜, 选择性, Donnan排斥]
crossref:
  reference_count: 0
---

# Advancing ion-exchange membranes to ion-selective membranes: principles, status, and opportunities

> 作者：Fan, Huang, Yip（Columbia，Yip 组）。Front. Environ. Sci. Eng. 综述。全文已读（Zotero 9C8IEQMW）。
> 对本树价值：IEM 选择性的机制级框架，把「选择性」拆成三层，并给出吸附 vs 迁移的二元分解（与 DuChanois 的分配/扩散选择性呼应）。

## 1. 综述覆盖范围

- 领域：离子交换膜（IEM/CEM/AEM）从"离子交换"升级到"离子选择"
- 核心问题：IEM 如何区分离子/离子（电荷、价态、特异），各自机制与 permeability-selectivity 权衡

## 2. 它给出的分类框架

### 离子/离子选择性的三层分类（综述主轴）

- **电荷选择性**（charge selectivity）：区分正/负离子，靠固定电荷的 Donnan 排斥（CEM/AEM 的基本功能）
- **价态选择性**（valence selectivity）：区分同号不同价（如 **Li+/Mg2+**），靠吸附（高价更易吸附）与迁移（高价 um 随 z² 指数衰减）两种相反效应叠加
- **特异离子选择性**（specific ion selectivity）：区分同价（如 Li+/Na+），靠配位化学

### 传输的二元分解（贯穿全文）

- **吸附选择性**（sorption selectivity）：离子分配进膜的选择性
- **迁移选择性**（migration selectivity）：离子在膜内电迁移速率的选择性
- 注：这组概念与 DuChanois2021 的「分配选择性/扩散选择性」高度重合，需在验收时决定是否合并

### 单价选择性 IEM 的两条改性路线（§3.2）

- 反号表面层 / LBL 聚电解质：靠更强排斥高价 co-ion
- 致密涂层：靠位阻（高价水合半径更大）
- 两条都以牺牲一价电导率为代价（permeability-selectivity 权衡）

## 3. 关键原始论文候选

| 原始论文 | 类别 | claim | 是否精读 |
|---|---|---|---|
| Fan, Yip 2019（多处引用） | IEM 理论 | co-ion/counter-ion 比 ~ 固定电荷密度^-2；溶胀自限 permselectivity | 中 |
| Fan et al. 2022（迁移率理论） | IEM 理论 | um ∝ exp(-Az²)，高价离子迁移受电场摩擦severe抑制 | 是 |
| Sata et al. 2002（综述引用） | 单价选择改性 | 反号层/致密层两路线，Ca/Na 选择性数据 | 中 |

## 4. 综述总结出的研究问题

- 提高固定电荷密度可增强 Donnan 排斥，但导致溶胀反而稀释电荷——自限效应
- 高盐浓度下 Donnan 排斥被削弱（cs 接近固定电荷密度时 permselectivity 骤降）——呼应 Sreedhar 的高离子强度难题
- 价态选择性中吸附与迁移效应相反，需精细调控固定电荷密度与介电环境
- 几乎所有选择性提升都以电导率/通量下降为代价

## 5. 综述提出的未来方向

- 调控膜固定电荷密度 + 局域介电以放大价态迁移选择性
- 引入配位基团做特异离子识别（但强配位会降低被识别离子的迁移率）

## 6. 对我的知识树的作用

- **选择性分类层补强**：提议在「选择性」下新增中间层——电荷选择性/价态选择性/特异离子选择性（按区分对象分），Li-Mg选择性 is_a 价态选择性、Li-Na选择性 is_a 特异离子选择性
- **疑似重复待裁决**：吸附选择性≈分配选择性、迁移选择性≈扩散选择性（DuChanois 来源）——验收时决定合并或保留双套术语
- 机制印证：Donnan排斥 的高离子强度削弱在本综述有定量推导，可作为 claim 的原始理论来源

## 7. 从综述中提取的 Claim 候选

| claim | 所属树枝 | 依据 |
|---|---|---|
| 价态选择性中，高价离子吸附更强但电迁移率随 z² 指数衰减，两效应相反 | 价态选择性/Li-Mg分离 | §3.2, Fan2022 |
| 单价选择性改性（反号层/致密层）都以牺牲一价电导率为代价 | 离子交换膜/选择性 | §3.2 |
| 提高固定电荷密度增强 Donnan 排斥，但溶胀产生自限效应 | Donnan排斥 | §3.1, Fan&Yip2019 |

## 8. 一句话定位

这篇综述是：把离子交换膜的选择性系统拆解为**电荷/价态/特异**三层，并用吸附-迁移二元机制定量解释各层（含 Li/Mg 价态分离、Li/Na 特异分离），揭示选择性提升普遍受 permeability-selectivity 权衡约束，为本树「选择性」分支提供机制级分类骨架。
