# Two Paper Trial Analysis

本次测试分析两篇文献：

1. `PBLWP9ZL` - Mechanism of lithium ion selectivity through membranes: a brief review
2. `PSKCM53I` - Highly positively-charged membrane enabled by a competitive reaction for efficient Li+/Mg2+ separation

## 结果判断

### PBLWP9ZL

类型：综述。

放置方式：放在 `01_Review_Maps/`，不作为树上证据主干。

作用：

- 提供锂离子选择性膜的机制地图。
- 把离子通过膜的过程拆成进入、通道内扩散、返回溶液三个阶段。
- 提示关键机制：hydration energy、channel size、functional groups、ion-channel wall interaction。
- 用于寻找原始论文，而不是替代原始论文。

生成 claim：

- `claim_three_stage_lithium_ion_selectivity_001`

### PSKCM53I

类型：原始研究。

放置方式：放入 `02_Paper_Position_Cards/`，挂到树上：

```text
膜
└── 离子选择膜
    └── Li/Mg separation
        └── polymer membrane
            └── surface charge regulation
                └── electrostatic interaction
                    └── Wang2024HighlyPositivelyCharged
```

作用：

- 提供一个正电选择层调控 Li/Mg 分离的原始研究证据。
- 解决的问题是高选择性、高通量、低膜面积电阻之间的权衡。
- 方法是 Fe3+ 参与的 CB/COB competitive reaction。
- 仍需真实卤水和长期稳定性验证。

生成 claim：

- `claim_cb_cob_positive_mcem_limg_001`

## 对流程的启发

这两篇验证了我们的分层是必要的：

- 综述适合产生 Review Map 和 claim 候选。
- 原始研究适合产生 Paper Position Card 和 evidence-backed claim。
- 真正挂树的不是论文标题，而是 claim + 代表性证据。
- 后续引用不需要全部挂树，只需记录共识状态和代表性后续论文。

## 下一步建议

下一批优先处理：

- `76TLDHV2`：Li/Mg 分离膜综述，适合补 Review Map。
- `9C8IEQMW`：ion-exchange membranes to ion-selective membranes，适合补机制/原则地图。
- `LHU4TG8Q`：dual-skin layer NF membrane，适合做原始研究卡。
- `ETCZMBIV`：crown ether membrane，适合做 host-guest recognition 路线。
- `F2YS2ZWP`：COF membranes / charge effect，适合做 COF 和 charge effect 路线。

