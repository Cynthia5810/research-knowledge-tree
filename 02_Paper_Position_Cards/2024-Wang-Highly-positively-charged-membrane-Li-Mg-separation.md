---
type: paper_position_card
title: "Highly positively-charged membrane enabled by a competitive reaction for efficient Li+/Mg2+ separation"
year: 2024
citekey: Wang2024HighlyPositivelyCharged
zotero_key: PSKCM53I
doi: "10.1016/j.seppur.2023.125428"
journal: "Separation and Purification Technology"
status: draft_positioned
confidence: medium

is_review: false
paper_role:
  - method_improvement
  - original_claim_source
  - representative_followup
reading_status: first_pass
analysis_depth: deep_positioning

concepts: [离子选择膜, Li-Mg分离, 表面正电化, 静电排斥, Li-Mg选择性]

tree_position:
  domain: 膜
  function_class: ion_selective_membrane
  application: Li_Mg_separation
  material_class: polymer_membrane
  material_system: Fe3_bridged_PY_PEIM_on_CEM
  method_route: surface_charge_regulation
  mechanism: electrostatic_interaction
  problem: selectivity_flux_tradeoff

addresses_problem:
  - poor_Li_Mg_selectivity
  - high_membrane_area_resistance
  - selectivity_flux_tradeoff
uses_strategy:
  - CB_COB_competitive_reaction
  - positively_charged_selective_layer
  - thin_defect_free_selective_layer
supports_mechanism:
  - electrostatic_interaction
  - divalent_cation_rejection
  - transport_resistance_reduction
improves_performance:
  - Li_Mg_permselectivity
  - Li_flux
  - membrane_area_resistance
  - operational_stability
creates_problem:
  - real_brine_validation_needed
  - mechanism_needs_direct_transport_evidence
evidence_for:
  - positive_charge_promotes_Li_Mg_separation
  - CB_COB_competition_thins_selective_layer
related_papers:
  extends:
    - mussel_inspired_TA_PEI_positive_membranes
  improves: []
  challenges: []
  complements:
    - PBLWP9ZL

claim_records:
  - claim_cb_cob_positive_mcem_limg_001
scite:
  checked: false
  total_citations: 40
  supporting_citations:
  contrasting_citations:
  mentioning_citations:
  consensus_status: emerging
---

# Highly positively-charged membrane enabled by a competitive reaction for efficient Li+/Mg2+ separation

## 1. 文献定位

- 所属分支：膜 -> 离子选择膜 -> 锂镁分离膜 -> 聚合物/离子交换膜 -> 表面电荷调控
- 研究对象：用于 Li+/Mg2+ 分离的一价阳离子交换膜 MCEM
- 文献角色：原始研究；方法改进型；可作为“正电选择层调控 Li/Mg 分离”的代表性证据
- 应挂载位置：不要挂在综述节点下，应该挂在“Li/Mg 选择性不足 -> 表面电荷调控 -> 正电选择层”分支下

## 2. 前置问题

- 高 Mg/Li 质量比盐湖卤水中，Li+ 和 Mg2+ 尺寸差异小，分离困难。
- 传统或新兴 MCEM 往往面临高选择性与低通量/高膜面积电阻的权衡。
- 聚多酚/PEI 等表面改性路线容易形成较厚选择层，从而增加传质阻力。

## 3. 论文整体分析

### 3.1 研究问题

作者试图解决的是：如何构建一个既有高正电荷、又足够薄且低缺陷的选择层，使 MCEM 同时获得较高 Li+ 通量和较高 Li+/Mg2+ 选择性。

### 3.2 核心假设

如果用 Fe3+ 引入配位键，与 PY/PEI 的共价反应形成竞争关系，就能减少部分 Michael 加成和 Schiff 碱反应位点，避免选择层过厚；同时未反应的胺基和 Fe3+ 提供正电性，从而增强对 Mg2+ 的排斥。

### 3.3 方法路线

- 基底：commercial cation exchange membrane。
- 表面层：pyrogallol/polyethyleneimine，进一步引入 Fe3+ 桥接。
- 关键设计：covalent bond / coordination bond competitive reaction。
- 表征：FTIR、XPS、SEM、zeta potential 等。
- 性能测试：selective electrodialysis stack；不同 Mg/Li 比和盐度的模拟溶液。

### 3.4 关键结果

| 证据 | 位置 | 支撑的结论 | 可信度 |
|---|---|---|---|
| 选择层厚度降低、面积电阻降低 | Abstract / Results | CB/COB 竞争反应降低传输阻力 | medium |
| perm-selectivity Li/Mg = 45.57 | Abstract | 正电选择层提升 Li/Mg 分离 | medium |
| Li+ flux = 4.61 x 10^-8 mol cm^-2 s^-1 | Abstract | 选择性提升未完全牺牲通量 | medium |
| 不同 Mg/Li 比和盐度模拟溶液测试 | Results / Figs. 6-8 | 具备一定工况适应性和稳定性 | medium |

### 3.5 核心结论

这篇论文真正证明的是：通过 Fe3+ 参与的 CB/COB 竞争反应，可以构建薄、低缺陷、高正电的选择层，从而在 Li+/Mg2+ 分离中同时改善选择性、通量和膜面积电阻。

它更偏向“方法/材料结构创新”，不是单独提出一个全新的离子传输机制。机制解释主要落在正电层对二价 Mg2+ 的更强排斥，以及较薄层带来的低传输阻力。

### 3.6 局限性

- 主要是模拟卤水体系，真实盐湖卤水复杂离子环境仍需验证。
- 对 Li+/Mg2+ 分离机制的直接原位证据不足。
- Fe3+ 配位结构在长期复杂工况下的稳定性仍需进一步追踪。

## 4. 使用策略

- 用 Fe3+ 诱导 coordination bond，与 PY/PEI 的 covalent reaction 形成竞争。
- 通过竞争反应避免选择层过厚。
- 保留更多正电位点，提高 Mg2+ 排斥。

## 5. 机制解释

主要机制是表面正电荷调控和静电排斥。该膜通过正电选择层强化对二价 Mg2+ 的排斥，同时薄选择层降低 Li+ 传输阻力。

## 6. 性能变化

| 指标 | 对比对象 | 变化 | 证据位置 |
|---|---|---|---|
| membrane area resistance | pristine/未优化膜 | 降至 4.83 ohm cm2 | Abstract |
| Li/Mg perm-selectivity | 优化 Fe3+-bridged PY/PEIM | 45.57 | Abstract |
| Li+ flux | 优化 Fe3+-bridged PY/PEIM | 4.61 x 10^-8 mol cm^-2 s^-1 | Abstract |
| operational stability | 三类模拟溶液 | 表现出较好稳定性 | Results |

## 7. 可复用 Claim / Evidence Records

- `claim_cb_cob_positive_mcem_limg_001`

## 8. Scite / 引用语境

- OpenAlex 当前引用数：40
- 当前判断：emerging，已经有后续引用，但还不是可以完全跳过后续代表性验证的成熟共识。
- 下一步：用 Semantic Scholar / OpenAlex 抽后续引用标题，筛 3-5 篇代表性支持或限制论文。

## 9. 新问题

- Fe3+ 桥接选择层在真实盐湖卤水中的长期稳定性。
- 正电荷密度、选择层厚度、Li+ 通量之间的最优平衡。
- 该竞争反应策略能否迁移到其他聚合物或无机/混合基质膜。

## 10. 和其他文献的关系

- 补充 `PBLWP9ZL` 综述中的机制分类：这篇是“正电选择层/电荷调控”的原始研究证据。
- 与 crown ether、COF、MOF 等识别/孔道路线并列，属于表面电荷调控路线。

## 11. 证据句

- 证据来自 Zotero 索引全文和摘要，后续需要回看 Figure 5-8 以确认具体性能对比。

## 12. 是否需要重读

- 是否需要重读：需要局部重读。
- 只需回看的部分：Figures 3-8、性能对比图、模拟溶液稳定性部分。
- 不需要重读的原因：文献定位和核心 claim 已较清楚。

## 13. 一句话定位

这篇论文是：在 Li+/Mg2+ 离子选择膜分支中，通过 Fe3+ 诱导的 CB/COB 竞争反应构建薄而高正电的选择层，缓解了选择性/通量/电阻之间的权衡，但仍需真实卤水和长期稳定性验证。
