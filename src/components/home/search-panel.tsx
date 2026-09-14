import { useId, useRef, useState, type ReactNode } from 'react'
import { cn } from 'cn'
import { Search, ChevronDown, X, RotateCcw } from 'lucide-react'
import {
  RecruitmentDirections,
  type RecruitmentDirection,
} from './recruitment-directions'
import { PlatformStatistics } from '@/components/platform-statistics'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'

export type JobSearchParams = {
  keyword: string
  city: string
  education: string[]
  major: string
  organizationTypes: string[]
  recruitmentType: string
  direction?: RecruitmentDirection
}

type Filters = Omit<JobSearchParams, 'keyword' | 'direction'>
type FilterKey = keyof Filters

const defaultFilters: Filters = {
  city: '',
  education: [],
  major: '',
  organizationTypes: [],
  recruitmentType: '',
}

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

const filterDefinitions = [
  {
    key: 'city',
    label: '地区',
    defaultLabel: '全国',
    options: hotCities,
    multiple: false,
  },
  {
    key: 'education',
    label: '学历',
    defaultLabel: '不限',
    options: ['大专', '本科', '硕士', '博士'],
    multiple: true,
  },
  {
    key: 'major',
    label: '专业',
    defaultLabel: '不限专业',
    options: hotMajors,
    multiple: false,
  },
  {
    key: 'organizationTypes',
    label: '单位性质',
    defaultLabel: '不限',
    options: [
      '央国企',
      '民营企业',
      '外资企业',
      '合资企业',
      '事业单位',
      '机关单位',
      '社会组织',
      '其他',
    ],
    multiple: true,
  },
  {
    key: 'recruitmentType',
    label: '招聘类型',
    defaultLabel: '不限类型',
    options: ['校园招聘', '社会招聘', '实习岗位', '兼职岗位', '其他'],
    multiple: false,
  },
] as const

function Reveal({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div
      inert={!open}
      aria-hidden={!open}
      className={cn(
        'grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none',
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
      )}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  )
}

function TagRow({
  label,
  items,
  selected,
  onSelect,
}: {
  label: string
  items: string[]
  selected: string
  onSelect: (value: string) => void
}) {
  return (
    <div className="flex min-h-9 flex-wrap items-center gap-x-0.5">
      <span className="mr-2 whitespace-nowrap text-xs text-muted-foreground">
        {label}
      </span>
      {items.map((item) => (
        <button
          type="button"
          key={item}
          aria-pressed={selected === item}
          onClick={() => onSelect(item)}
          className={cn(
            'rounded-full px-2.5 py-0.5 whitespace-nowrap transition-colors duration-160 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
            selected === item
              ? 'bg-primary-wash font-medium text-primary'
              : 'text-secondary-foreground',
          )}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export function SearchPanel({
  onSearch,
  expanded,
}: {
  onSearch?: (params: JobSearchParams) => void
  /** 固定展开状态；不传时根据交互自动展开。 */
  expanded?: boolean
}) {
  const inputId = useId()
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const selectedConditions = filterDefinitions.flatMap(({ key, label }) => {
    const value = filters[key]
    const values = Array.isArray(value) ? value : value ? [value] : []
    return values.map((item) => ({ key, label, value: item }))
  })
  const hasFilters = selectedConditions.length > 0
  const active =
    expanded ?? (hovered || focused || openFilter !== null || hasFilters)

  function selectFilter(key: FilterKey, value: string) {
    setFilters((current) => {
      const previous = current[key]
      const next = Array.isArray(previous)
        ? value === ''
          ? []
          : previous.includes(value)
            ? previous.filter((item) => item !== value)
            : [...previous, value]
        : value
      return { ...current, [key]: next }
    })
  }

  function removeCondition(key: FilterKey, value: string) {
    // 将焦点移到稳定控件，避免被移除的标签留下失效焦点。
    inputRef.current?.focus({ preventScroll: true })
    setFilters((current) => ({
      ...current,
      [key]: Array.isArray(current[key])
        ? current[key].filter((item) => item !== value)
        : '',
    }))
  }

  function submitSearch() {
    const params: JobSearchParams = {
      keyword: query.trim(),
      ...filters,
      education: [...filters.education],
      organizationTypes: [...filters.organizationTypes],
    }
    // 普通搜索由调用方接入 jobs 路由。
    onSearch?.(params)
  }

  return (
    <>
      <section aria-label="岗位搜索与招聘方向">
        <div
          aria-label="岗位搜索"
          data-state={active ? 'active' : 'idle'}
          onPointerEnter={(event) => {
            if (event.pointerType === 'mouse') setHovered(true)
          }}
          onPointerLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            setFocused(event.currentTarget.contains(event.relatedTarget))
          }}
          className="rounded-lg border border-border bg-card shadow-overlay"
        >
          <div className="p-6 max-[850px]:p-5">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                submitSearch()
              }}
            >
              <div className="flex min-h-16 items-center gap-3 rounded-sm border border-input bg-background p-[7px_8px_7px_18px] focus-within:outline-2 focus-within:outline-ring focus-within:outline-offset-0.75">
                <Search
                  aria-hidden="true"
                  className="size-6 shrink-0 stroke-[1.7] text-primary"
                />
                <Input
                  ref={inputRef}
                  id={inputId}
                  aria-label="搜索岗位或单位"
                  placeholder="例如：算法工程师、国家电网..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="h-11 min-w-0 flex-1 rounded-none border-0 px-0 text-base shadow-none focus-visible:border-0 focus-visible:ring-0 md:text-base"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-11.5 px-7 max-sm:px-3"
                >
                  找岗位
                </Button>
              </div>
            </form>
            <div className="mt-3 mb-4 flex flex-col">
              <Reveal open={active}>
                <TagRow
                  label="热门城市"
                  items={hotCities}
                  selected={filters.city}
                  onSelect={(value) => selectFilter('city', value)}
                />
              </Reveal>
              <TagRow
                label="热门专业"
                items={hotMajors}
                selected={filters.major}
                onSelect={(value) => selectFilter('major', value)}
              />
            </div>
            <Reveal open={hasFilters}>
              <div
                className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4"
                aria-label="已选筛选条件"
              >
                <span className="text-xs text-muted-foreground">已选条件</span>
                {selectedConditions.map(({ key, label, value }) => (
                  <Button
                    key={`${key}-${value}`}
                    type="button"
                    variant="secondary"
                    size="sm"
                    aria-label={`移除${label}：${value}`}
                    onClick={() => removeCondition(key, value)}
                  >
                    {value}
                    <X data-icon="inline-end" aria-hidden="true" />
                  </Button>
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-auto"
                  onClick={() => {
                    inputRef.current?.focus({ preventScroll: true })
                    setFilters(defaultFilters)
                  }}
                >
                  <RotateCcw data-icon="inline-start" aria-hidden="true" />
                  清空筛选
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal open={active}>
            <div
              aria-label="筛选条件"
              className="grid grid-cols-5 rounded-b-lg border-t border-border bg-secondary px-3 py-2 max-[850px]:grid-cols-3 max-[850px]:gap-y-2 max-sm:grid-cols-2"
            >
              {filterDefinitions.map(
                ({ key, label, defaultLabel, options, multiple }) => {
                  const value = filters[key]
                  const selected = Array.isArray(value)
                    ? value
                    : value
                      ? [value]
                      : []
                  const summary = selected.length
                    ? selected.join('、')
                    : defaultLabel
                  return (
                    <DropdownMenu
                      key={key}
                      modal={false}
                      open={openFilter === key}
                      onOpenChange={(open) =>
                        setOpenFilter((current) =>
                          open ? key : current === key ? null : current,
                        )
                      }
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          type="button"
                          title={`${label}：${summary}`}
                          aria-label={`${label}：${summary}`}
                          className={cn(
                            'relative h-auto min-h-14 w-full min-w-0 justify-between gap-3 rounded-sm px-5 py-2 text-left hover:bg-accent aria-expanded:bg-accent focus-visible:-outline-offset-2',
                            "after:absolute after:inset-y-2 after:-right-px after:w-px after:bg-border after:content-[''] last:after:hidden",
                            'min-[850px]:nth-[5n]:after:hidden',
                            'sm:max-[850px]:nth-[3n]:after:hidden',
                            'max-sm:nth-[2n]:after:hidden',
                          )}
                        >
                          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                            <span className="text-xs font-normal text-muted-foreground">
                              {label}
                            </span>
                            <span
                              className={cn(
                                'truncate text-base font-medium',
                                selected.length
                                  ? 'text-primary'
                                  : 'text-foreground',
                              )}
                            >
                              {summary}
                            </span>
                          </span>
                          <ChevronDown
                            aria-hidden="true"
                            className="mt-5 size-4 text-secondary-foreground transition-transform group-aria-expanded/button:rotate-180"
                          />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        aria-label={label}
                        align="start"
                        collisionPadding={16}
                        className="max-h-80 min-w-44"
                      >
                        <DropdownMenuGroup>
                          {multiple ? (
                            <>
                              <DropdownMenuCheckboxItem
                                checked={selected.length === 0}
                                onSelect={(event) => event.preventDefault()}
                                onCheckedChange={() => selectFilter(key, '')}
                                className="min-h-9"
                              >
                                {defaultLabel}
                              </DropdownMenuCheckboxItem>
                              {options.map((option) => (
                                <DropdownMenuCheckboxItem
                                  key={option}
                                  checked={selected.includes(option)}
                                  onSelect={(event) => event.preventDefault()}
                                  onCheckedChange={() =>
                                    selectFilter(key, option)
                                  }
                                  className="min-h-9"
                                >
                                  {option}
                                </DropdownMenuCheckboxItem>
                              ))}
                            </>
                          ) : (
                            <DropdownMenuRadioGroup
                              value={selected[0] ?? ''}
                              onValueChange={(next) => selectFilter(key, next)}
                            >
                              <DropdownMenuRadioItem
                                value=""
                                className="min-h-9"
                              >
                                {defaultLabel}
                              </DropdownMenuRadioItem>
                              {options.map((option) => (
                                <DropdownMenuRadioItem
                                  key={option}
                                  value={option}
                                  className="min-h-9"
                                >
                                  {option}
                                </DropdownMenuRadioItem>
                              ))}
                            </DropdownMenuRadioGroup>
                          )}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )
                },
              )}
            </div>
          </Reveal>
        </div>
        <RecruitmentDirections />
      </section>
      <PlatformStatistics />
    </>
  )
}
