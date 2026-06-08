# Membrane Knowledge Tree

一个面向膜科学与离子分离研究的个人科研知识组织项目。

它不把论文简单堆成 Obsidian 散点图，而是把科研内容拆成：

- 领域框架
- 文献定位
- 论点与证据
- 多视角知识树
- Zotero 到 Obsidian 的半自动工作流

## 核心思想

文献不是知识树的主干。

真正需要组织的是研究对象、问题、方法、机制、性能、应用和它们之间的关系。论文主要承担三种角色：

1. 综述作为树下的地图和文献入口。
2. 原始研究作为树上的代表性证据。
3. Claim/Evidence Record 保存可复用的科研论点、证据和适用边界。

例如：

```text
Li/Mg 分离
└── 聚合物离子选择膜
    └── 表面电荷调控
        └── 静电排斥
            ├── Claim：高正电选择层增强 Mg2+ 排斥
            └── 代表性证据：Wang et al. 2024
```

## 为什么不是一棵单线树

同一篇论文可能同时属于：

- 应用视角：Li/Mg 分离
- 材料视角：聚合物膜
- 方法视角：表面电荷调控
- 机制视角：静电相互作用
- 性能视角：选择性、通量、面积电阻
- 问题视角：选择性/通量权衡

因此，本项目以“预设领域框架 + 多视角挂载 + Claim 证据层”为目标，而不是强迫所有知识进入唯一父节点。

## 项目结构

```text
Membrane Knowledge Tree/
├── 00_Inbox/                    # Zotero 临时导入，不提交全文
├── 01_Review_Maps/              # 综述地图
├── 02_Paper_Position_Cards/     # 原始论文定位与整体分析
├── 03_Knowledge_Tree/           # 人工与自动生成的知识树视图
├── 04_Claim_Evidence_Records/   # 可复用论点与证据
├── 05_Tables/                   # 自动生成的索引表
├── 06_Prompts/                  # 卡片模板
├── 07_Ontology/                 # 受控术语和分类
├── 08_Scripts/                  # Zotero 初筛与知识树生成脚本
└── 99_Outputs/                  # 分析报告
```

## 三类核心记录

### Review Map

综述不直接充当树上证据，主要用于：

- 建立分类框架
- 发现关键原始论文
- 提取共识、争议和未来方向
- 生成待验证的 Claim 候选

模板：[`06_Prompts/review_map_template.md`](06_Prompts/review_map_template.md)

### Paper Position Card

原始论文卡不仅提取关键词，还保留：

- 研究问题与核心假设
- 方法路线
- 关键结果和证据位置
- 作者真正证明了什么
- 局限和性能权衡
- 文献在知识框架中的主定位与多轴定位
- 是否需要重读

模板：[`06_Prompts/paper_position_card_template.md`](06_Prompts/paper_position_card_template.md)

### Claim Evidence Record

Claim 是知识树真正复用的基本单位：

```yaml
claim: "..."
source_paper: "..."
original_claim_source: true
evidence_type: experimental
consensus_status: emerging
need_attach_all_followups: false
```

如果某条结论被数百篇论文引用，不需要把它们全部挂到树上。记录原始来源、引用共识、代表性支持论文和代表性反驳论文即可。

## Zotero 工作流

项目支持通过 Zotero Desktop Local API 读取本地文献库。

前提：

1. 启动 Zotero Desktop。
2. 在 Zotero 设置中允许本机应用通信。
3. Local API 位于 `http://127.0.0.1:23119`。

对 Zotero 新导入文献做初筛：

```bash
node 08_Scripts/zotero_triage.js
```

它会生成：

- `05_Tables/zotero_collection_summary.csv`
- `05_Tables/zotero_candidate_papers.csv`
- `99_Outputs/zotero_import_assessment.md`

这些文件可能包含个人文献库信息，默认不提交到 Git。

## 生成知识树

定位卡完成后运行：

```bash
node 08_Scripts/generate_tree.js
```

输出：

- `03_Knowledge_Tree/generated_tree.md`
- `05_Tables/paper_position_index.csv`

## 当前示例

仓库包含两篇试分析：

- Zhang et al. 2024：综述地图，用于建立锂离子选择性机制框架。
- Wang et al. 2024：原始研究定位卡，用于展示表面电荷调控路线。

对应文件：

- [`01_Review_Maps/2024-Zhang-Lithium-ion-selectivity-through-membranes.md`](01_Review_Maps/2024-Zhang-Lithium-ion-selectivity-through-membranes.md)
- [`02_Paper_Position_Cards/2024-Wang-Highly-positively-charged-membrane-Li-Mg-separation.md`](02_Paper_Position_Cards/2024-Wang-Highly-positively-charged-membrane-Li-Mg-separation.md)
- [`99_Outputs/two_paper_trial_analysis.md`](99_Outputs/two_paper_trial_analysis.md)

## 数据与版权

本仓库不提交：

- 论文 PDF 或全文转录
- Zotero 私人文献库导出
- 本地附件路径
- Obsidian 插件二进制和工作区状态
- API 密钥或账户信息

请只提交你有权公开的笔记、结构化分析和少量必要引文。

## 后续方向

- 为领域概念、综述叙事、研究对象和 Claim 证据生成独立视图
- 使用 OpenAlex、Semantic Scholar、OpenCitations 构建免费引用共识层
- 自动识别综述、原始研究和重复条目
- 从 Zotero 全文索引生成定位卡草稿
- 增加性能权衡和适用边界表达

