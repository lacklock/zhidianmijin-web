# 首页数据

编辑 `homepage.json` 可替换首页的宣传统计、6 条校招公告和 4 条推荐岗位。当前招聘内容均为虚构占位，不代表对应企业的真实招聘信息。

- `statistics`：宣传条的名称、数字和单位。
- `announcements`：`id` 为唯一标识，`company` 为单位名称，`title` 为公告标题，`publishedAt` 为发布日期。
- `jobs`：`id` 为唯一标识，`title` 为岗位名称，`company` 为单位，`location` 为工作地点，`degree` 为学历要求，`majors` 为专业名称数组，`deadline` 为截止日期，`deadlineLabel` 说明日期性质。

日期使用 `YYYY-MM-DD`。岗位卡片和详情共用一条记录。请保持岗位数组非空，并保留唯一且稳定的 `id`。当前布局按 6 条公告、4 条岗位设计。修改后开发预览会自动更新；部署版本需重新构建。
