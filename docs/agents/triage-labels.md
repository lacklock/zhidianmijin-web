# 分流状态

本地任务以 `Status:` 行记录分流状态，使用以下默认映射。

| 技能中的角色 | 本地状态值 | 含义 |
| --- | --- | --- |
| needs-triage | needs-triage | 待维护者评估 |
| needs-info | needs-info | 等待报告者补充信息 |
| ready-for-agent | ready-for-agent | 需求完整，Agent 可独立执行 |
| ready-for-human | ready-for-human | 需要人工实现 |
| wontfix | wontfix | 不予处理 |

技能要求应用某个分流标签时，使用对应状态值更新任务文件。
Wayfinder 的领取和解决状态另见 `issue-tracker.md`。
