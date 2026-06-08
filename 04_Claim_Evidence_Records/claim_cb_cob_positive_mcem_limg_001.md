---
type: claim_evidence_record
claim_id: claim_cb_cob_positive_mcem_limg_001
claim: "CB/COB competitive reaction can create a thin, defect-free and highly positively charged MCEM selective layer for efficient Li+/Mg2+ separation."
claim_type: method
source_paper: Wang2024HighlyPositivelyCharged
zotero_key: PSKCM53I
doi: "10.1016/j.seppur.2023.125428"
original_claim_source: true
tree_node:
  domain: 膜
  application: Li_Mg_separation
  material_class: polymer_membrane
  material_system: Fe3_bridged_PY_PEIM_on_CEM
  problem: selectivity_flux_tradeoff
  method_route: surface_charge_regulation
  mechanism: electrostatic_interaction
  performance: Li_Mg_permselectivity
evidence_type: experimental
evidence_sentence: "The optimized Fe3+-bridged PY/PEIM reached Li/Mg perm-selectivity of 45.57 with measurable Li+ flux."
evidence_location: "Abstract; Figures 5-8 need manual confirmation"
scite:
  checked: false
  openalex_cited_by_count: 40
  supporting_citations:
  contrasting_citations:
  mentioning_citations:
  consensus_status: emerging
representative_followups: []
need_attach_all_followups: false
confidence: medium
---

# Claim: CB/COB competitive reaction for Li/Mg-selective MCEM

## 论点

Fe3+ 参与的共价键/配位键竞争反应可以构建薄、低缺陷且高正电的 MCEM 选择层，从而提升 Li+/Mg2+ 分离性能。

## 原始来源

- Wang et al., 2024, `Separation and Purification Technology`
- Zotero key: `PSKCM53I`

## 证据

- 面积电阻从摘要记录看降低到 4.83 ohm cm2。
- Li/Mg perm-selectivity 达到 45.57。
- Li+ flux 为 4.61 x 10^-8 mol cm^-2 s^-1。
- 在三类模拟溶液中测试了分离性能和稳定性。

## 适用边界

- 当前证据主要来自模拟溶液，不等同于真实盐湖卤水。
- 该 claim 更偏方法和结构设计，不应被误写成普适传输机制。

## Scite / 后续引用语境

Scite 未使用。OpenAlex 当前显示约 40 次引用。下一步可用 Semantic Scholar / OpenAlex 抽后续引用标题和摘要，筛代表性支持/限制论文。

## 是否需要继续追文献

需要追，但不需要把所有引用都挂树。优先找：

- 后续真实卤水验证
- 后续长期稳定性验证
- 后续迁移到其他膜体系的论文
- 对 Fe3+ 稳定性或正电层机制提出限制的论文

