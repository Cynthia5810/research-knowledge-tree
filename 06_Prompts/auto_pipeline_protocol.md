# 自动推进协议：Ion separation 批量解读

> 由定时任务每 20 分钟触发一次。窗口：2026-06-10 23:20 起，至 2026-06-11 09:40；10:00 触发验收。
> 用户施凤艳将于 2026-06-11 10:00 验收。她有用量限制——**每个 tick 必须精简**。

## 硬性原则

1. 每个 tick 最多产出 **1 张完整草稿卡**，或最多 3 条快速分流（triaged）。输出保持简短，不写长篇对话。
2. **禁止新建或修改概念节点**（`04_Concept_Nodes/`）——用户未确认。新概念提议追加写入 `00_Inbox/proposed_concepts.md`（含：建议 label、category、父节点、关系、来源 citekey、一句话理由）。
3. 卡片 `concepts` 字段只能引用**已存在**的概念 label（见 `04_Concept_Nodes/` 文件名）。
4. 不使用 WebSearch/WebFetch；只允许 Zotero 本地 API 与（必要时）Crossref/OpenAlex/Semantic Scholar 的单次 DOI 查询。
5. Zotero 连接**必须用 `curl.exe`**（PowerShell Invoke-RestMethod 会被 Zotero 拒绝）。Zotero 未运行 → 本 tick 直接结束，队列不动。
6. 每个 tick 结束：`npm run lint:ontology` 必须 0 错误 → `git add -A` → commit（信息含处理的 KEY 与标题缩写，附 Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>）→ `git push origin main`。
7. 任何步骤失败：把失败原因追加到 `00_Inbox/auto_pipeline_log.md`，队列条目改回 pending，结束本 tick。不重试、不深究。

## 每个 tick 的流程

1. 检查当前时间：若在 2026-06-11 09:50 之后，执行下方「验收流程」而不是常规流程。
2. 读 `00_Inbox/ion_separation_queue.md`，取**第一条 status=pending**（文件已按 P1→P2→P3 排序）。先把该行改为 in_progress 并保存（防重复）。
3. 取数据（vault 根目录 `D:\学术知识树\Membrane Knowledge Tree`）：
   - 元数据：`curl.exe -s -H "Zotero-API-Version: 3" "http://127.0.0.1:23119/api/users/0/items/{KEY}?format=json"`
   - 附件列表：`.../items/{KEY}/children?format=json`，找 itemType=attachment 且 contentType=application/pdf 的 key
   - 全文：`.../items/{PDF_KEY}/fulltext`（JSON 的 content 字段）。没有全文则用摘要，卡片标 `analysis_basis: abstract_only`
4. 判断类型并产出：
   - **明显离题**（纯电池电化学/储能、与离子分离及锂回收无关、webpage、重复条目）→ 队列状态 triaged + 行尾追加一句话理由，不建卡。
   - **综述** → `01_Review_Maps/{年份}-{第一作者}-{短标题}.md`，参照 `06_Prompts/review_map_template.md` 和已有的 Sreedhar2026 卡。frontmatter 必含 type: review_map、zotero_key、doi、status: draft、concepts: [挂 1-3 个最贴切的现有概念]。
   - **原始研究** → `02_Paper_Position_Cards/{年份}-{第一作者}-{短标题}.md`，参照 Wang2024 卡的结构（13 节可精简为：文献定位/研究问题/方法路线/关键结果/机制/局限/一句话定位）。frontmatter 必含 type: paper_position_card、status: draft_pending_review、zotero_key、doi、concepts: [现有概念 label]、analysis_basis。
   - 若与库内论文有明显承接/改进/互补关系，写入 related_papers（用 zotero_key 引用）。
5. 队列状态改 done，执行原则 6 的收尾。
6. 若队列已无 pending：进入**增强模式**——每 tick 为一篇已 done 的论文补 1 条 claim 记录（`04_Claim_Evidence_Records/`，参照现有 claim 卡格式），全部补完则本 tick 直接结束。

## 验收流程（2026-06-11 ~10:00 的 tick 执行一次）

1. 生成 `99_Outputs/ion_separation_batch_report.md`：done/triaged/pending 统计、新建卡片清单（按综述/原始分组）、proposed_concepts.md 的提议汇总表、失败日志摘要、等待用户确认的事项清单。
2. commit + push。
3. 用 CronList 列出全部定时任务，CronDelete 删除本协议相关的所有任务（名称含 ion-sep）。
4. 简短汇报后结束。
