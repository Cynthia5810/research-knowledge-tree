# Claim Evidence Records

这里存放可复用的论点和证据记录。后续知识树主要挂 claim，而不是把所有论文都堆上去。

## 为什么需要这一层

如果某个原始论文提出一个机制，后面 800 篇论文只是支持或沿用这个结论，我们不需要把 800 篇都挂在树上。更好的做法是：

```text
机制节点
├── 原始 claim 来源论文
├── 关键实验/模拟证据
├── Scite 共识状态
├── 代表性支持论文
└── 代表性反驳论文
```

## 单条记录模板

```yaml
---
type: claim_evidence_record
claim_id:
claim:
claim_type:
source_paper:
original_claim_source: false
tree_node:
  domain: 膜
  application:
  material_class:
  material_system:
  problem:
  method_route:
  mechanism:
  performance:
evidence_type:
evidence_sentence:
evidence_location:
scite:
  checked: false
  supporting_citations:
  contrasting_citations:
  mentioning_citations:
  consensus_status: unknown
representative_followups: []
need_attach_all_followups: false
confidence: low
---

# Claim

## 论点

## 原始来源

## 证据

## 适用边界

## Scite / 后续引用语境

## 是否需要继续追文献
```

