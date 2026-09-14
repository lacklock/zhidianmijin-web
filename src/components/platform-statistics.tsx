import { BriefcaseBusiness, TrendingUp, UsersRound } from 'lucide-react'

const statistics = [
  { label: '可筛职位', value: '40万+', unit: '条', icon: BriefcaseBusiness },
  { label: '今日新增', value: '2000+', unit: '条', icon: TrendingUp },
  { label: '成功服务', value: '50000+', unit: '人', icon: UsersRound },
]

export function PlatformStatistics() {
  return (
    <div
      className="flex items-center justify-center gap-10 py-4 [&_>_div]:flex [&_>_div]:gap-2.5 [&_>_div]:items-center [&_>_div]:text-secondary-foreground [&_svg]:size-5 [&_svg]:text-support [&_strong]:text-lg [&_strong]:text-foreground [&_strong]:font-bold [&_strong]:tabular-nums max-[850px]:gap-6 max-[850px]:[&_>_div]:gap-1.5 max-[850px]:[&_>_div]:text-xs max-[850px]:[&_strong]:text-base"
      aria-label="平台服务数据"
    >
      {statistics.map(({ label, value, unit, icon: Icon }) => (
        <div key={label}>
          <Icon aria-hidden="true" />
          <span>
            {label} <strong>{value}</strong>
            <span className="ml-0.75">{unit}</span>
          </span>
        </div>
      ))}
    </div>
  )
}
