# Knowledge Tree Views

这里存放的是你真正要看的层级结构，不是 Obsidian 自带的散点 Graph View。

## 文件说明

- `membrane_tree.md`：人工维护的膜领域总树
- `lithium_magnesium_separation_tree.md`：锂镁分离膜方向树
- `generated_tree.md`：根据原始研究论文定位卡自动生成的树

## 生成命令

在 vault 根目录运行：

```bash
node 08_Scripts/generate_tree.js
```

## 为什么不用 Graph View

Obsidian Graph View 只知道笔记之间有没有链接，不知道上下级关系、主干和证据的区别。这个系统用 YAML 字段记录文献定位，再生成层级树。
