import { useState } from 'react'
import {
  Building2,
  GraduationCap,
  ShieldCheck,
  Landmark,
  Ellipsis,
  Search,
} from 'lucide-react'
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

const hotCities = [
  '北京',
  '上海',
  '广州',
  '深圳',
  '杭州',
  '成都',
  '武汉',
  '南京',
  '西安',
  '重庆',
  '天津',
  '苏州',
  '青岛',
  '郑州',
  '长沙',
  '合肥',
]
const hotMajors = [
  '计算机类',
  '电子信息类',
  '电气类',
  '机械类',
  '自动化类',
  '金融学类',
  '会计学',
  '法学类',
  '土木类',
  '材料类',
  '通信工程',
  '能源动力类',
]

function TagRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex min-h-9 flex-wrap items-center gap-x-5">
      <span className="whitespace-nowrap text-[12px] text-muted-foreground">
        {label}
      </span>
      {items.map((item) => (
        <button
          type="button"
          key={item}
          className="whitespace-nowrap p-[4px_0] text-secondary-foreground hover:text-interaction"
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export function SearchPanel() {
  const [query, setQuery] = useState('')
  return (
    <>
      <section
        className="p-6 border border-border rounded-lg bg-white shadow-[0_12px_32px_-12px_rgb(50_80_110/18%),0_2px_8px_rgb(50_80_110/3%)] max-[850px]:p-5"
        aria-label="岗位搜索"
      >
        <div className="flex items-center gap-3 min-h-16 p-[7px_8px_7px_18px] border border-border rounded-sm bg-background focus-within:outline-2 focus-within:outline-ring focus-within:outline-offset-0.75">
          <Search
            aria-hidden="true"
            className="size-6 stroke-[1.7] text-interaction"
          />
          <Input
            id="job-search"
            aria-label="搜索岗位或单位"
            placeholder="例如：算法工程师、国家电网..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 flex-1 rounded-0 border-0 px-0 text-base shadow-none md:text-base focus-visible:border-0 focus-visible:ring-0"
          />
          <Button type="button" size="lg" className="h-11.5 px-7">
            找岗位
          </Button>
        </div>
        <div className="mt-3 mb-4 flex flex-col">
          <TagRow label="热门城市" items={hotCities} />
          <TagRow label="热门专业" items={hotMajors} />
        </div>
        <div className="grid grid-cols-5 gap-3 max-[850px]:gap-2">
          {directions.map(({ label, icon: Icon }) => (
            <Button
              variant="outline"
              type="button"
              className="h-13 px-2"
              key={label}
            >
              <Icon data-icon="inline-start" />
              {label}
            </Button>
          ))}
        </div>
      </section>
      <PlatformStatistics />
    </>
  )
}
