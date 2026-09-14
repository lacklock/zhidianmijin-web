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
      <section className="p-6 border border-border rounded-lg bg-white shadow-[0_12px_32px_-12px_rgb(50_80_110/18%),0_2px_8px_rgb(50_80_110/3%)] max-[850px]:p-5" aria-label="岗位搜索">
        <div className="flex items-center gap-3 min-h-16 p-[7px_8px_7px_18px] border border-border rounded-sm bg-background [&_>_svg]:size-6 [&_>_svg]:text-interaction [&_>_svg]:stroke-[1.7] **:data-[slot=input]:h-11 **:data-[slot=input]:flex-1 **:data-[slot=input]:min-w-0 **:data-[slot=input]:border-0 **:data-[slot=input]:rounded-0 **:data-[slot=input]:shadow-none **:data-[slot=input]:bg-transparent **:data-[slot=input]:text-base **:data-[slot=input]:px-0 **:data-[slot=input]:focus-visible:outline-none **:data-[slot=input]:focus-visible:shadow-none focus-within:outline-2 focus-within:outline-ring focus-within:outline-offset-0.75">
          <Search aria-hidden="true" />
          <Input id="job-search" aria-label="搜索岗位或单位" placeholder="例如：算法工程师、国家电网..." value={query} onChange={(event) => setQuery(event.target.value)} />
          <Button type="button" size="lg" className="h-11.5 px-7">找岗位</Button>
        </div>
        <div className="flex flex-col gap-0 mt-3 mb-4 [&_>_div]:flex [&_>_div]:flex-wrap [&_>_div]:items-center [&_>_div]:gap-x-5 gap-y-0 [&_>_div]:min-h-9 [&_>_div_>_*]:whitespace-nowrap [&_button]:p-[4px_0] [&_button]:text-secondary-foreground [&_button:hover]:text-interaction">
          <div><span className="text-muted-foreground text-sm">热门城市</span>{['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '南京', '西安', '重庆', '天津', '苏州', '青岛', '郑州', '长沙', '合肥'].map((city) => <button type="button" key={city}>{city}</button>)}</div>
          <div><span className="text-muted-foreground text-sm">热门专业</span>{['计算机类', '电子信息类', '电气类', '机械类', '自动化类', '金融学类', '会计学', '法学类', '土木类', '材料类', '通信工程', '能源动力类'].map((major) => <button type="button" key={major}>{major}</button>)}</div>
        </div>
        <div className="grid grid-cols-5 gap-3 max-[850px]:gap-2">
          {directions.map(({ label, icon: Icon }) => <Button variant="outline" type="button" className="h-13 px-2" key={label}><Icon data-icon="inline-start" />{label}</Button>)}
        </div>
      </section>
      <PlatformStatistics />
    </>
  )
}
