import { useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowRight, Megaphone, Building2, MapPin, GraduationCap, Sparkles, BookOpen, Clock3, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import data from '@/data/homepage.json'

type Job = typeof data.jobs[number]

function SectionHeading({ id, title, action }: { id: string; title: string; action: string }) {
  return <div className="flex items-center justify-between mb-5 gap-4 [&_h2]:text-[26px] [&_h2]:leading-[1.4] [&_h2]:font-semibold max-[850px]:[&_h2]:text-2xl"><h2 id={id}>{title}</h2><Button type="button" variant="link" className="px-0">{action}<ArrowRight data-icon="inline-end" /></Button></div>
}

export function Announcements() {
  return <section aria-labelledby="announcements-heading">
    <SectionHeading id="announcements-heading" title="校招公告" action="查看全部公告" />
    <div className="grid grid-cols-3 gap-4">{data.announcements.map((notice) => <article className="flex flex-col min-w-0 p-5 border border-border rounded-lg bg-card cursor-pointer transition-[border-color,box-shadow,background-color] duration-160 hover:border-primary hover:bg-muted hover:shadow-[0_6px_18px_-6px_rgb(10_37_64_/_14%)] [&_h3]:mt-3 [&_h3]:text-base [&_h3]:leading-[26px] [&_h3]:font-medium [&_h3]:min-h-13 [&_h3]:wrap-anywhere [&_time]:mt-5 [&_time]:text-muted-foreground [&_time]:text-xs [&_time]:tabular-nums max-[850px]:p-4" key={notice.id}>
      <div className="flex items-center gap-2 text-secondary-foreground font-medium [&_svg]:size-4.5 [&_svg]:text-interaction"><Megaphone aria-hidden="true" /><span>{notice.company}</span></div>
      <h3>{notice.title}</h3>
      <time dateTime={notice.publishedAt}>{notice.publishedAt}</time>
    </article>)}</div>
  </section>
}

function DetailRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return <div className="grid grid-cols-[110px_minmax(0,_1fr)] gap-3 py-4 border-b border-border text-sm leading-[24px] [&_dt]:flex [&_dt]:gap-1.5 [&_dt]:items-start [&_dt]:font-medium [&_dt_svg]:size-4 [&_dt_svg]:mt-1 [&_dd]:m-0 [&_dd]:text-secondary-foreground [&_dd]:text-right [&_dd]:wrap-anywhere max-[850px]:grid-cols-[1fr] max-[850px]:gap-1 max-[850px]:py-3 max-[850px]:[&_dd]:text-left max-[850px]:[&_dd]:pl-5.5"><dt>{icon}{label}</dt><dd>{children}</dd></div>
}

function JobDetails({ job }: { job: Job }) {
  return <aside id="job-details" className="border border-border rounded-lg overflow-hidden flex flex-col" aria-label="当前岗位条件" aria-live="polite">
    <div className="p-5 bg-secondary border-b border-border [&_h3]:flex [&_h3]:items-center [&_h3]:gap-2 [&_h3]:font-semibold [&_h3]:text-lg [&_h3_svg]:size-5.5 [&_h3_svg]:text-interaction [&_p]:text-secondary-foreground [&_p]:mt-2 [&_p]:text-sm [&_p]:leading-[24px] max-[850px]:p-4"><h3><Sparkles aria-hidden="true" />精准匹配</h3><p>每个岗位均附带可追溯的匹配逻辑，拒绝盲投。</p></div>
    <div className="flex-1 p-5 [&_dl]:m-0 max-[850px]:p-4">
      <h3 className="text-sm font-medium mb-1">{job.title}</h3>
      <dl>
        <DetailRow icon={<GraduationCap aria-hidden="true" />} label="学历要求">{job.degree}</DetailRow>
        <DetailRow icon={<BookOpen aria-hidden="true" />} label="专业要求">{job.majors.join('、')}</DetailRow>
        <DetailRow icon={<MapPin aria-hidden="true" />} label="工作地点">{job.location}</DetailRow>
        <DetailRow icon={<Clock3 aria-hidden="true" />} label={job.deadlineLabel}><time dateTime={job.deadline}>{job.deadline.replaceAll('-', '.')}</time></DetailRow>
      </dl>
    </div>
    <div className="px-5 pb-3 max-[850px]:px-4">
      <Button type="button" className="h-10 w-full">查看岗位完整条件<ArrowRight data-icon="inline-end" /></Button>
    </div>
  </aside>
}

export function RecommendedJobs() {
  const [selectedId, setSelectedId] = useState(data.jobs[0]?.id)
  const selectedJob = data.jobs.find((job) => job.id === selectedId) ?? data.jobs[0]
  return <section aria-labelledby="jobs-heading">
    <SectionHeading id="jobs-heading" title="为您精准匹配的岗位" action="查看全部岗位" />
    <div className="grid grid-cols-[minmax(0,_1.7fr)_minmax(0,_1fr)] gap-5 items-stretch max-[850px]:grid-cols-[minmax(0,_1.25fr)_minmax(0,_1fr)] max-[850px]:gap-4">
      <div className="flex flex-col gap-3" aria-label="推荐岗位">{data.jobs.map((job) => <button type="button" key={job.id} className="group relative w-full min-h-29 flex items-center gap-4 p-5 text-left border border-border rounded-lg bg-card transition-colors duration-160 hover:border-primary aria-pressed:border-primary aria-pressed:bg-[#edf6fd] aria-pressed:shadow-[inset_3px_0_0_var(--primary)] max-[850px]:p-4 max-[850px]:gap-3 max-[850px]:min-h-32.5" aria-pressed={selectedJob?.id === job.id} aria-controls="job-details" onClick={() => setSelectedId(job.id)}>
        <span className="flex items-center justify-center size-11 rounded-lg bg-secondary text-interaction shrink-0 group-aria-pressed:bg-[#dceefb] [&_svg]:size-6.25 [&_svg]:stroke-[1.65] max-[850px]:size-9"><Building2 aria-hidden="true" /></span>
        <span className="min-w-0 flex flex-col gap-1 pr-2.5"><span className="text-base font-semibold leading-[24px] wrap-anywhere">{job.title}</span><span className="text-muted-foreground leading-[22px]">{job.company}</span><span className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-secondary-foreground text-xs leading-[20px] [&_>_span]:inline-flex [&_>_span]:gap-1 [&_>_span]:items-center [&_svg]:size-3.5"><span><MapPin aria-hidden="true" />{job.location}</span><span><GraduationCap aria-hidden="true" />{job.degree}</span></span></span>
        {selectedJob?.id === job.id ? <span className="absolute right-3.5 top-3.5 flex text-interaction [&_svg]:size-4"><Check aria-hidden="true" /><span className="sr-only">已选中</span></span> : null}
      </button>)}</div>
      {selectedJob ? <JobDetails job={selectedJob} /> : null}
    </div>
  </section>
}
