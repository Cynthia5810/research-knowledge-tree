---
type: review_map
title: "Membranes for Lithium Recovery From Conventional and Unconventional Sources"
year: 2026
citekey: Sreedhar2026MembranesLithiumRecovery
doi: "10.1021/acsestengg.5c00997"
journal: "ACS ES&T Engineering"
pages: "1402-1426"
status: extracted
confidence: medium
zotero_key: J64SNYST
analysis_basis: full_text
review_scope:
  domain: 膜
  application: 锂回收全流程
  material_scope: [polyamide, glass_ceramic, MOF, COF, crown_ether, biomimetic, 2D_materials, Mn_adsorbent]
  time_scope: "截至 2026（收稿 2025-11，发表 2026-04）"
tree_usage:
  use_as_navigation: true
  attach_to_tree_as_evidence: false
review_role:
  - process_map
  - classification_map
  - performance_benchmark_map
  - literature_finder
claim_records: []
crossref:
  reference_count: 180
openalex:
  indexed: false
---

# Membranes for Lithium Recovery From Conventional and Unconventional Sources

> 作者：Sreedhar, Lee, Appukuttan, Sitaraman, DesVeaux, Grim, Paul, Kumar*, Roy*（UT Austin + National Laboratory of the Rockies）
> CC-BY 4.0 开放获取。全文已读（Zotero J64SNYST）。

## 1. 综述覆盖范围

- 领域：膜技术在锂回收**全流程**中的应用（不只分离膜本身）
- 应用：从五种锂源回收锂，直至电池级 LiOH/Li2CO3 产品
- 锂源范围：盐湖卤水（>500 ppm Li）、地热卤水（100–400 ppm，250–300°C）、海水及 SWRO 浓盐水（0.1–0.2 ppm）、油田采出水（100–500 mg/L）、电池废料（Li 含量 5–6 wt%）
- 核心问题：传统蒸发法耗水巨大（最高 80 万升水/吨 Li2CO3）且周期长（10–24 个月）；DLE（吸附/离子交换/溶剂萃取）部分环节耗水反而更高；膜技术能否在各环节提供更低能耗水耗的替代方案
- 方法论特色：用公开技术报告做了膜集成工艺 vs 传统工艺的**能耗/水耗定量对比**（盐湖、地热、采出水三种源），并对文献膜性能做了**选择性-渗透性图谱**（Fig 12，数据在 SI Tables S14–S19）

## 2. 它给出的分类框架

### 按回收流程阶段分类（主轴，Table 3）

1. 预处理（UF 除硅/胶体；NF 除二价离子；目标 Fe、Al、Ca、硅垢）
2. 浓缩 / 单价离子分离（RO/HPRO 浓缩；ED、MCDI；Li/Na 分离）
3. 二价离子分离 = **Li/Mg 分离**（NF、ED，替代石灰沉镁）
4. 卤水管理（HPRO ≤400 bar、CFRO、LSRRO、OARO、MLD/ZLD）
5. 卤水增值/结晶（EDC 电渗析结晶、MDCr 膜蒸馏结晶、BPED）
6. LiOH 转化（BPED：双极膜电渗析）

### 按驱动力分类（Fig 11）

- 压力驱动：MF / UF / NF / RO（HPRO、CFRO、LSRRO）
- 电驱动：ED / SED / BPED / MCDI / EDC
- 热驱动：MD / MDCr（适合高盐、高温源如地热）

### 按膜材料分类（Fig 12 性能图谱的分类轴）

- 聚酰胺膜（正电荷 Donnan 排斥 / 尺寸筛分；**占据选择性-渗透性最优区间，最可规模化**）
- 玻璃陶瓷膜（LATP、LLTO；嵌入-脱嵌机制，Li/Na 选择性可达 ~16,000，规模化存疑）
- MOF 膜（ZIF-8、UiO-66-NH2、HKUST-1）/ COF 膜
- 冠醚类（12C4、14C4、15C5；配位识别）
- 仿生通道膜（人工离子通道）
- 2D 材料膜（氧化石墨烯、MXene；层间距筛分+静电）
- 吸附膜（Al/Mn/Ti 基；Mn 系选择性最高）

### 按机制分类

- Donnan 排斥（正电层斥二价阳离子；**高离子强度下削弱**，NF 与 ED 共同的根本限制）
- 尺寸筛分（窄孔径分布；2D 层间距）
- 配位化学识别（冠醚、MOF/COF 对 Li+ 的亲和）
- 嵌入-脱嵌（玻璃陶瓷 LATP/LLTO）

### 按竞争技术分类（DLE，Table 1 含 TRL 与公司）

- 吸附（TRL 9：Livent、Eramet、SunResin…）
- 离子交换（TRL 8：Lilac Solutions）
- 溶剂萃取（TRL 7：Solvay Cyanex 936P）
- 膜技术（TRL 4–5：DuPont FilmTec LiNE-XD、EnergyX LiTAS）；细分 NF TRL 6–7、ED TRL 5–6

## 3. 关键原始论文候选

| 原始论文 | 被综述放在哪一类 | 可能贡献的 claim | 为什么重要 | 是否需要精读 |
|---|---|---|---|---|
| Li et al. 2021 EES（Lai 组，ref 29） | 海水提锂 / 玻璃陶瓷膜 LLTO | 电泵膜过程单级 Li/Na ~16,000 | 单价分离的性能天花板基准 | 是 |
| Wang, He, He, Elimelech, Lin 2023 Nat. Water（ref 62） | 性能评估方法学 | NF 选择性指标体系；锂纯度 ηLi 归一化（含 MLR）；NF90 Li/Mg ~20 | 整个领域的性能度量基础，本综述 Fig 12 的方法来源 | 是 |
| Anvari et al.（ref 79） | 卤水管理 / HPRO | 400 bar 超高压 RO 处理 25 万 ppm 卤水可行性 | 取代蒸发塘的工程路线 | 中 |
| Vera et al. 2023 Nat Rev Earth Environ（ref 2） | 环境影响 | DLE 的水耗与环境代价定量 | 本综述水耗论证的核心依据 | 中 |
| Farahbakhsh et al. 2024 Desalination（ref 46） | DLE 总览 | 各 DLE 技术 TRL 评级 | Table 1 的 TRL 来源 | 否（与本篇互补） |
| PEI 类正电涂层改性 NF（refs 130–131） | Li/Mg 分离 / 正电聚酰胺 | 提高表面胺浓度→正电→Donnan 排斥 | **Wang2024 卡所在分支的直接上游**；待从 SI 拿具体文献 | 是 |
| MDCr 用于提锂（ref 84） | 地热卤水 / 膜蒸馏结晶 | MDCr 替代蒸发塘 | 热驱动路线代表 | 中 |
| Li, Mo, Qing, Shao, Tang 2019 JMS（ref 60） | 早期综述 | 水相锂源膜法回收框架 | 本领域上一代综述，可比对框架演化 | 否 |

## 4. 综述总结出的研究问题

- Li/Mg 分离：NF/ED 性能已接近需求，但「实验室→中试」的放大、表面涂层长期稳定性、ED 在高离子强度下的 Donnan 排斥维持是卡点
- Li/Na 分离：压力驱动聚酰胺膜选择性 <2–2.2，远不够；新化学（仿生、MOF/COF、冠醚、2D）都卡在规模化（分散不均、缺陷、通量低、复杂水质失效）
- 卤水管理被研究界**系统性忽视**，但占锂回收能耗水耗的大头；HPRO/CFRO/LSRRO 需针对锂卤水（比海水淡化浓盐水更苛刻）专门研究
- 高离子强度削弱 Donnan 排斥是 NF 与 ED 共同的机制级难题（refs 138–140）
- ED 研究多用 1:1 Li/Mg 二元液，与真实 MLR 卤水脱节（测试条件可比性问题）
- 硼是被忽视的单价杂质，影响电池级纯度
- DLE 化学残留（Mn/Al、有机溶剂、pH 改变）对回注卤水生态的影响几乎无研究

## 5. 综述提出的未来方向（§4 原文四条）

1. Li/Mg 分离最接近商业化：不需要昂贵新化学，常规 NF/ED 材料已接近目标性能；重点投中试放大与涂层耐久性
2. 单价（Li/Na）分离是变革性目标：需要仿生膜、MOF/COF、冠醚、2D 材料的快速筛选平台，成功则打开海水/采出水等全新锂源
3. 卤水管理 + MLD/ZLD 急需补课：含针对锂卤水的技术经济分析
4. 冷门环节（预处理、浓缩、结晶）值得布局：MD、BPED、MDCr 等利基技术在特定源上有独特价值

## 6. 对我的知识树的作用

- **结构性影响**：确认「锂回收流程」应为应用主干，Li-Mg分离 是其中第 3 环节（component_of）；流程上游对接五种锂源
- 新增分支提议（待用户确认）：见对话中的提议清单——流程环节 6 个、锂源 5 个、膜工艺 ~10 个、膜材料 ~7 类、机制 3 个（Donnan 排斥与现有「静电排斥」需要决定合并或分立）、DLE 竞争路线 3 个、性能指标 3 个
- 命名冲突待决：综述用「Donnan 排斥」，现有树用「静电排斥」——建议 Donnan排斥 `is_a` 静电排斥 或 `related_to`，由用户定
- 与现有节点的衔接：表面正电化 → 即综述 §3.3 的 positive-charge inducing strategies（refs 130–131），Wang2024 卡可挂为该策略的代表证据；2D 材料膜分支天然容纳「石墨烯/氧化石墨烯」（用户此前的检索用例）
- 需要补读的原始论文：见第 3 节表格，优先 ref 62（性能度量）与 ref 29（性能天花板）

## 7. 从综述中提取的 Claim 候选

综述中的 claim 先视为 `review_summary`，不能直接当成原始证据。

| claim | 所属树枝 | 综述依据 | 需要追踪的原始论文 |
|---|---|---|---|
| Li/Mg 分离是膜法锂回收中最接近商业化的环节，常规 NF/ED 材料正接近所需性能 | Li-Mg分离 | §4 建议1 | NF 中试案例（Northern Lithium 60 天试验 refs 143-144） |
| 正电选择层是提升 Mg2+ 排斥最易规模化的策略 | 表面正电化 | §2.1（ref 70）、§3.3 | ref 70 及 refs 130-131 |
| NF 与 ED 的 Li/Mg 分离均依赖 Donnan 排斥，且在高离子强度下被削弱 | 静电排斥/Donnan排斥 | §3.3（refs 138-140） | refs 138, 139, 140 |
| 聚酰胺膜占据 Li/Mg 选择性-渗透性平衡的最优区间，是短期商业化首选 | 膜材料/聚酰胺膜 | §3.3 Fig 12A/B | SI Tables S14-S19 数据点对应文献 |
| 压力驱动聚合物膜的 Li/Na 选择性目前 <2-2.2，不足以支撑海水提锂 | Li-Na分离 | §2.3 | 待 SI |
| 玻璃陶瓷膜（LLTO）单级 Li/Na 选择性可达 ~16,000，但规模化未解 | 玻璃陶瓷膜 | §2.3、§3.4（ref 29） | ref 29（Li et al. 2021 EES） |
| BPED 制 LiOH 的比能耗可从常规 6.83 降至约 4 kWh/kg（估算） | LiOH转化/BPED | §3.6（refs 169, 178） | refs 169, 178 |
| 部分 DLE（如选择性吸附）实际淡水用量可高于蒸发法（>7万升/吨 Li2CO3） | 锂回收/水耗 | §1.3（ref 38） | ref 38（Livent 报告） |

## 8. 一句话定位

这篇综述是：为「膜技术 × 锂回收全流程」提供 **流程阶段 × 驱动力 × 膜材料 × 机制** 的四轴分类框架和文献性能图谱（Fig 12），把 Li/Mg 分离定位为最接近商业化的环节、Li/Na 分离定位为打开非常规锂源的变革性目标，并首次给出膜集成工艺对三种卤水源的能耗/水耗定量对比。
