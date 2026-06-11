# 概念提议区（等用户确认后才写入 04_Concept_Nodes/）

> 自动流水线把每篇文献产生的新概念提议累积在此。用户验收时逐条裁决：写入 / 改名 / 合并 / 丢弃。
> 格式: 建议label | category | 父节点 | 关系 | 来源citekey | 一句话理由

## 待裁决
## 待裁决（来自 Garcia2023 / NKAHT7ZA）

- 化学沉淀法 | method | （无父，与 直接锂提取DLE/膜工艺 平行） | used_for 锂回收 | Garcia2023 | 碳酸盐/磷酸盐/铝酸盐沉淀提锂，工业现行的非膜回收路线。
- 透锂长石 | object | 固相锂矿 | （is_a 固相锂矿） | Garcia2023 | 第三种商业锂矿石 petalite，与锂辉石/锂云母并列。


## 已写入（用户已确认）

- 2026-06-11: DuChanois2021 的 10 个提议全部写入（介电排斥、PIM微孔聚合物膜、液晶膜、石墨烯膜、氧化石墨烯膜、六方氮化硼膜、CNT-porin膜、冠醚通道膜、分配选择性、扩散选择性）。

## 待裁决（来自 Sun2023 / SAH5KFYJ）

- 界面聚合 | method | （无父，或 is_a 制膜方法） | 制膜方法，被 聚酰胺膜/COF膜 共用 | Sun2023 | 互不相溶两相界面快速聚合形成选择层，是跨膜种的核心制备方法；多篇综述反复出现，值得设为共享节点。

## 待裁决（来自 Fan2022 / 9C8IEQMW）

- 电荷选择性 | performance | 选择性 | is_a 选择性；acts_via Donnan排斥 | Fan2022 | 区分正/负离子，IEM 的基本选择功能。
- 价态选择性 | performance | 选择性 | is_a 选择性；Li-Mg选择性 应改挂其下 | Fan2022 | 区分同号不同价（一价/二价），是 Li-Mg 选择性的上位概念。
- 特异离子选择性 | performance | 选择性 | is_a 选择性；Li-Na选择性 应改挂其下 | Fan2022 | 区分同价离子，靠配位化学，是 Li-Na 选择性的上位概念。
- [合并裁决] 吸附选择性 ≈ 分配选择性，迁移选择性 ≈ 扩散选择性 | performance | — | — | Fan2022/DuChanois2021 | 两篇综述用不同术语描述同一二元分解。建议保留「分配选择性/扩散选择性」一套，吸附/迁移作为 aliases 写入，不另建节点。

## 待裁决（来自 Zhao2022 / EXW99QWM）

- 分子印迹膜 | material | 膜材料 | acts_via 配位识别（或新机制 化学亲和） | Zhao2022 | MIM：用定制识别位点+高结合亲和基团选择性提取目标离子。
- [合并裁决] 化学亲和（chemical affinity） ≈ 配位识别 | mechanism | — | — | Zhao2022 | 两者都指离子与膜活性基团成键的选择机制。建议合并到「配位识别」，化学亲和作 alias。
- [合并裁决] 仿生离子泵（bioinspired ion pump） ≈ 人工离子通道 | mechanism/material | — | — | Zhao2022 | 与现有「人工离子通道」机制/「仿生通道膜」材料重叠，建议归并，不另建。

## 待裁决（来自 Gamaethiralalage2021 / UVAXYCGR）

- 电容去离子CDI | method | 电驱动膜工艺（或与之并列） | 膜电容去离子 应改挂其下（is_a 电容去离子CDI） | Gamaethiralalage2021 | CDI 是 MCDI 的母过程；电极电吸附脱盐，可膜可无膜。
- 嵌入材料电极 | material | （或归 method） | acts_via 嵌入-脱嵌 | Gamaethiralalage2021 | PBA/λ-MnO2/TiS2 等晶格嵌入电极，CDI 选择性的核心材料；λ-MnO2 选 Li r≈12。

## 待裁决（来自 Wang2021 / 28WR6ED6）

- [关联已有提议] 界面聚合（已在 Sun2023 提议）应设为父节点，现有「反相界面聚合」改挂其下（is_a 界面聚合） | method | Wang2021 | 本综述系统印证 IP 是核心制备方法，反相 IP 是其变体。

## 待裁决（来自 Shen2021 / DGUZA4RB）

- [分析框架/暂缓] 通道架构维度：纳米孔 / 一维纳米管 / 二维纳米通道 | — | Shen2021 | 是膜材料的正交分类维度（与材质分类交叉）。建议暂不入树，作为材料节点的可选标签维度，验收时定。

## 待裁决（来自 Dou2021 / GS8W9BKA）

- 沸石膜 | material | 膜材料 | acts_via 尺寸筛分 | Dou2021 | 无机微孔框架膜，结晶硅铝酸盐有序微孔，气体/离子分离经典材料。
- 碳分子筛膜 | material | 膜材料 | acts_via 尺寸筛分 | Dou2021 | 聚合物热解得到的微孔碳膜，吸附-扩散协同选择。
- POC膜（多孔有机笼） | material | 膜材料 | acts_via 尺寸筛分 | Dou2021 | 离散有机笼分子构筑的微孔膜。

## 待裁决（来自 Wang2021 / VLEUQUQT）

- 混合基质膜MMM | material | 膜材料 | 多孔/非多孔填料分散于聚合物基质 | Wang2021 | 把 MOF/沸石等填料嵌入聚合物基质，兼顾加工性与选择性。
- MXene膜 | material | 2D材料膜 | acts_via 尺寸筛分 | Wang2021 | 2D材料膜细分；MXene 层间距可调做阳离子筛分。
- 液膜 | material | 膜材料 | acts_via 配位识别 | Wang2021 | 含载体的液膜，靠可逆络合促进传输（facilitated transport）；DuChanois2021 也提及（稳定性差）。

## 待裁决（来自 Zhang2020 / 76TLDHV2）

- 固态电解质膜 | material | 膜材料 | acts_via 嵌入-脱嵌；used_for Li-Mg分离 | Zhang2020 | LISICON/LATP 类固态锂离子导体膜，电解法选择性提锂；与现有「玻璃陶瓷膜」可能重叠，验收时辨析。