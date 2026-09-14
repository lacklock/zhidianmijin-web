import { useState } from 'react'
import { Building2, GraduationCap, ShieldCheck, Landmark, Ellipsis, Search, BriefcaseBusiness, TrendingUp, UsersRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import data from '@/data/homepage.json'

const directions = [
  { label: '央国企岗位', icon: Building2 },
  { label: '校园招聘', icon: GraduationCap },
  { label: '军队文职', icon: ShieldCheck },
  { label: '公务员', icon: Landmark },
  { label: '更多方向', icon: Ellipsis },
]
const statisticIcons = [BriefcaseBusiness, TrendingUp, UsersRound]

export function SearchPanel() {
  const [query, setQuery] = useState('')
  return (
    <>
      <section className="search-panel" aria-label="岗位搜索">
        <div className="search-field">
          <Search aria-hidden="true" />
          <Input id="job-search" aria-label="搜索岗位或单位" placeholder="例如：算法工程师、国家电网..." value={query} onChange={(event) => setQuery(event.target.value)} />
          <Button type="button" size="lg">找岗位</Button>
        </div>
        <div className="popular-conditions">
          <div><span className="condition-label">热门城市</span>{['北京', '上海', '广州'].map((city) => <button type="button" key={city}>{city}</button>)}</div>
          <div><span className="condition-label">热门专业</span>{['计算机类', '电子信息类', '金融学类'].map((major) => <button type="button" key={major}>{major}</button>)}</div>
        </div>
        <div className="direction-grid">
          {directions.map(({ label, icon: Icon }) => <Button variant="outline" type="button" key={label}><Icon data-icon="inline-start" />{label}</Button>)}
        </div>
      </section>
      <div className="statistics" aria-label="平台服务数据">
        {data.statistics.map((stat, index) => {
          const Icon = statisticIcons[index] ?? BriefcaseBusiness
          return <div key={stat.label}><Icon aria-hidden="true" /><span>{stat.label} <strong>{stat.value}</strong><span className="stat-unit">{stat.unit}</span></span></div>
        })}
      </div>
    </>
  )
}
