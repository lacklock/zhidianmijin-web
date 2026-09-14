import { useState } from 'react'
import { Building2, GraduationCap, ShieldCheck, Landmark, Ellipsis, Search } from 'lucide-react'
import { PlatformStatistics } from '@/components/platform-statistics'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const directions = [
  { label: '央国企岗位', icon: Building2 },
  { label: '校园招聘', icon: GraduationCap },
  { label: '军队文职', icon: ShieldCheck },
  { label: '公务员', icon: Landmark },
  { label: '更多方向', icon: Ellipsis },
]

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
          <div><span className="condition-label">热门城市</span>{['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '南京', '西安', '重庆', '天津', '苏州', '青岛', '郑州', '长沙', '合肥'].map((city) => <button type="button" key={city}>{city}</button>)}</div>
          <div><span className="condition-label">热门专业</span>{['计算机类', '电子信息类', '电气类', '机械类', '自动化类', '金融学类', '会计学', '法学类', '土木类', '材料类', '通信工程', '能源动力类'].map((major) => <button type="button" key={major}>{major}</button>)}</div>
        </div>
        <div className="direction-grid">
          {directions.map(({ label, icon: Icon }) => <Button variant="outline" type="button" key={label}><Icon data-icon="inline-start" />{label}</Button>)}
        </div>
      </section>
      <PlatformStatistics />
    </>
  )
}
