# Paper Position Cards

这里放原始研究论文。综述不要放在这里，综述放到 `01_Review_Maps/`。

## 最小必填字段

一篇论文刚进入系统时，只需要先填这些：

```yaml
type: paper_position_card
title: ""
year:
citekey: ""
is_review: false
paper_role:
  - evidence
tree_position:
  domain: 膜
  function_class: 锂镁分离膜
  application: 锂镁分离
  material_class: ""
  material_system: ""
  method_route: ""
  mechanism: ""
  problem: ""
```

填完后运行：

```bash
node 08_Scripts/generate_tree.js
```

脚本会生成：

- `03_Knowledge_Tree/generated_tree.md`
- `05_Tables/paper_position_index.csv`

