# Zotero and Codex

Codex 的 Zotero 插件可以通过 Zotero Desktop Local API 完成：

- 检查 Zotero 连接状态
- 列出 collections 和 tags
- 搜索本地文献库
- 导出 BibTeX
- 查看附件
- 读取 Zotero 已索引全文
- 经确认后导入 BibTeX/RIS

插件脚本位于 Codex 本地插件缓存中，缓存版本目录可能变化，因此不要在项目脚本中硬编码个人绝对路径。

## 推荐用法

在 Codex 对话中直接使用：

```text
@Zotero 搜索我的文献库中关于 Li/Mg separation membrane 的论文
```

或：

```text
@Zotero 读取 Zotero key 为 XXXXXXXX 的条目和全文索引
```

## 项目内自动初筛

本仓库提供独立的 Node.js 脚本，直接访问 Zotero Local API：

```bash
npm run triage:zotero
```

它不依赖 Codex 插件缓存路径，但需要 Zotero Desktop 已启动并启用 Local API。

## 隐私提示

Zotero 全文、附件路径、BibTeX 导出和个人 collection 清单默认不提交到 Git。
