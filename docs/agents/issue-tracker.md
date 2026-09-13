# 任务跟踪：本地 Markdown

任务和需求文档保存在本仓库的 `.scratch/` 下。

## 文件约定

- 每个功能一个目录：`.scratch/<feature-slug>/`。
- 需求文档：`.scratch/<feature-slug>/PRD.md`。
- 实现任务：`.scratch/<feature-slug>/issues/<NN>-<slug>.md`，从 `01` 编号。
- 分流状态写在任务文件顶部附近的 `Status:` 行，取值见 `triage-labels.md`。
- 评论和讨论历史追加在文件底部的 `## Comments` 下。
- 外部 PR 不作为分流入口。

## 技能操作

“发布到任务跟踪器”表示在上述约定路径创建 Markdown 文件，必要时创建目录。
“获取相关任务”表示读取指定路径的文件；只有编号时，在相关功能目录内查找，若有歧义则询问用户。

## Wayfinder 操作

- 工作地图：`.scratch/<effort>/map.md`，包含 Notes、Decisions-so-far 和 Fog。
- 子任务：`.scratch/<effort>/issues/NN-<slug>.md`，从 `01` 编号，正文记录待解决的问题。
- `Type:` 记录类型：`research`、`prototype`、`grilling` 或 `task`。
- Wayfinder 使用独立的执行状态：领取时写入 `Status: claimed`，解决后写入 `Status: resolved`。
- 依赖写在顶部附近的 `Blocked by: NN, NN` 行；全部依赖均为 `resolved` 时解除阻塞。
- 下一任务从未解决、未领取且无阻塞的文件中按编号选择。
- 开始工作前先保存领取状态。
- 解决后将答案追加到 `## Answer`，更新状态，并将摘要与链接写入地图的 Decisions-so-far。
