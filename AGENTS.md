这是一个静态演示性质的 web 项目。
技术栈：Typescript、React、vite、tailwind、shadcn。图标优先使用 lucide。
Web 组件优先使用成熟的 shadcn 组件。
包管理使用 pnpm。

## 要求

除非我主动要求，否则生成代码时不要生成测试用例。

这个项目的 Agent 文件统一使用 AGENTS.md，如果需要修改，修改这个文件，不要修改 CLAUDE.md。

## Agent skills

### Issue tracker

任务以本地 Markdown 保存在 `.scratch/<feature>/`，不使用外部 PR 作为分流入口。详见 `docs/agents/issue-tracker.md`。

### Triage labels

使用五个默认分流状态，记录在任务文件的 `Status:` 行。详见 `docs/agents/triage-labels.md`。

### Domain docs

采用单上下文（single-context）：根目录 `CONTEXT.md` 和 `docs/adr/`。详见 `docs/agents/domain.md`。
