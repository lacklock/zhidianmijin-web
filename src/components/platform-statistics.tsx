import { BriefcaseBusiness, TrendingUp, UsersRound } from 'lucide-react'

const statistics = [
  { label: '可筛职位', value: '40万+', unit: '条', icon: BriefcaseBusiness },
  { label: '今日新增', value: '2000+', unit: '条', icon: TrendingUp },
  { label: '成功服务', value: '50000+', unit: '人', icon: UsersRound },
]

export function PlatformStatistics() {
  return (
    <div className="statistics" aria-label="平台服务数据">
      {statistics.map(({ label, value, unit, icon: Icon }) => (
        <div key={label}>
          <Icon aria-hidden="true" />
          <span>{label} <strong>{value}</strong><span className="stat-unit">{unit}</span></span>
        </div>
      ))}
    </div>
  )
}
