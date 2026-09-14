import { useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from 'cn'
import {
  ArrowRight,
  Megaphone,
  Building2,
  MapPin,
  GraduationCap,
  Sparkles,
  BookOpen,
  Clock3,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import data from '@/data/homepage.json'

type Job = (typeof data.jobs)[number]

function SectionHeading({
  id,
  title,
  action,
}: {
  id: string
  title: string
  action: string
}) {
  return (
    <div className="flex items-center justify-between mb-5 gap-4">
      <h2
        id={id}
        className="text-[26px] leading-[1.4] font-semibold max-[850px]:text-2xl"
      >
        {title}
      </h2>
      <Button type="button" variant="link" className="px-0">
        {action}
        <ArrowRight data-icon="inline-end" />
      </Button>
    </div>
  )
}

export function Announcements() {
  return (
    <section aria-labelledby="announcements-heading">
      <SectionHeading
        id="announcements-heading"
        title="校招公告"
        action="查看全部公告"
      />
      <div className="grid grid-cols-3 gap-4">
        {data.announcements.map((notice) => (
          <article
            className="flex flex-col min-w-0 p-5 border border-border rounded-md bg-card cursor-pointer transition-[border-color,background-color] duration-160 hover:border-primary hover:bg-primary-wash max-[850px]:p-4"
            key={notice.id}
          >
            <div className="flex items-center gap-2 text-secondary-foreground font-medium">
              <Megaphone aria-hidden="true" className="size-4.5 text-primary" />
              <span>{notice.company}</span>
            </div>
            <h3 className="mt-3 text-base leading-6.5 font-medium min-h-13 wrap-anywhere">
              {notice.title}
            </h3>
            <time
              className="mt-5 text-muted-foreground text-xs tabular-nums"
              dateTime={notice.publishedAt}
            >
              {notice.publishedAt}
            </time>
          </article>
        ))}
      </div>
    </section>
  )
}

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon
  label: string
  children: ReactNode
}) {
  return (
    <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-3 py-4 border-b border-border text-sm leading-6 max-[850px]:grid-cols-1 max-[850px]:gap-1 max-[850px]:py-3">
      <dt className="flex gap-1.5 items-center font-medium">
        <Icon aria-hidden="true" className="size-4.5 text-support" />
        <span className="text-xs">{label}</span>
      </dt>
      <dd className="m-0 text-secondary-foreground text-right wrap-anywhere max-[850px]:text-left max-[850px]:pl-5.5">
        {children}
      </dd>
    </div>
  )
}

function JobDetails({ job }: { job: Job }) {
  return (
    <aside
      id="job-details"
      className="border border-border rounded-md overflow-hidden flex flex-col"
      aria-label="当前岗位条件"
      aria-live="polite"
    >
      <div className="p-5 bg-secondary border-b border-border max-[850px]:p-4">
        <h3 className="flex items-center gap-2 font-semibold text-lg">
          <Sparkles aria-hidden="true" className="size-5.5 text-primary" />
          精准匹配
        </h3>
        <p className="text-secondary-foreground mt-2 text-xs leading-6">
          每个岗位均附带可追溯的匹配逻辑，拒绝盲投。
        </p>
      </div>
      <div className="flex-1 p-5 max-[850px]:p-4">
        <h3 className="text-base font-medium mb-2">{job.title}</h3>
        <dl className="m-0">
          <DetailRow icon={GraduationCap} label="学历要求">
            {job.degree}
          </DetailRow>
          <DetailRow icon={BookOpen} label="专业要求">
            {job.majors.join('、')}
          </DetailRow>
          <DetailRow icon={MapPin} label="工作地点">
            {job.location}
          </DetailRow>
          <DetailRow icon={Clock3} label={job.deadlineLabel}>
            <time dateTime={job.deadline}>
              {job.deadline.replaceAll('-', '.')}
            </time>
          </DetailRow>
        </dl>
      </div>
      <div className="px-5 pb-3 max-[850px]:px-4">
        <Button type="button" className="h-10 w-full">
          查看岗位完整条件
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </aside>
  )
}

export function RecommendedJobs() {
  const [selectedId, setSelectedId] = useState(data.jobs[0]?.id)
  const [hoveredId, setHoveredId] = useState<Job['id'] | undefined>()
  const previewedId = hoveredId ?? selectedId
  const previewedJob =
    data.jobs.find((job) => job.id === previewedId) ?? data.jobs[0]
  return (
    <section aria-labelledby="jobs-heading">
      <SectionHeading
        id="jobs-heading"
        title="为您精准匹配的岗位"
        action="查看全部岗位"
      />
      <div className="grid grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] gap-5 items-stretch max-[850px]:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] max-[850px]:gap-4">
        <div
          className="flex flex-col gap-3"
          aria-label="推荐岗位"
          onMouseLeave={() => setHoveredId(undefined)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setHoveredId(undefined)
            }
          }}
        >
          {data.jobs.map((job) => {
            const isPreviewed = previewedJob?.id === job.id
            return (
              <button
                type="button"
                key={job.id}
                className="group relative z-0 w-full min-h-29 flex items-center gap-4 p-5 text-left border border-border rounded-md bg-card transition-[border-color,background-color,box-shadow] duration-200 ease-out hover:z-10 hover:border-primary hover:bg-primary-wash hover:shadow-overlay aria-pressed:border-primary aria-pressed:bg-primary-wash max-[850px]:p-4 max-[850px]:gap-3 max-[850px]:min-h-32.5"
                aria-pressed={isPreviewed}
                aria-controls="job-details"
                onClick={() => setSelectedId(job.id)}
                onMouseEnter={() => setHoveredId(job.id)}
                onFocus={() => setHoveredId(job.id)}
              >
                <span className="flex items-center justify-center size-11 rounded-md bg-secondary text-primary shrink-0 transition-colors duration-200 ease-out group-hover:bg-primary-wash-strong group-aria-pressed:bg-primary-wash-strong max-[850px]:size-9">
                  <Building2
                    aria-hidden="true"
                    className="size-6.25 stroke-[1.65]"
                  />
                </span>
                <span className="min-w-0 flex-1 flex flex-col gap-1">
                  <span className="text-base font-semibold leading-6 wrap-anywhere">
                    {job.title}
                  </span>
                  <span className="text-muted-foreground leading-5.5">
                    {job.company}
                  </span>
                  <span className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-secondary-foreground text-xs leading-5">
                    <span className="inline-flex gap-1 items-center">
                      <MapPin aria-hidden="true" className="size-3.5" />
                      {job.location}
                    </span>
                    <span className="inline-flex gap-1 items-center">
                      <GraduationCap aria-hidden="true" className="size-3.5" />
                      {job.degree}
                    </span>
                  </span>
                </span>
                <span
                  className={cn(
                    'flex items-center text-primary shrink-0 transition-[opacity,transform] duration-200 ease-out',
                    isPreviewed
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-1 pointer-events-none',
                  )}
                  aria-hidden={!isPreviewed}
                >
                  <ArrowRight aria-hidden="true" className="size-4" />
                  {isPreviewed ? (
                    <span className="sr-only">当前查看</span>
                  ) : null}
                </span>
              </button>
            )
          })}
        </div>
        {previewedJob ? <JobDetails job={previewedJob} /> : null}
      </div>
    </section>
  )
}
