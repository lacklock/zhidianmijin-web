import { useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowRight, Megaphone, Building2, MapPin, GraduationCap, Sparkles, BookOpen, Clock3, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import data from '@/data/homepage.json'

type Job = typeof data.jobs[number]

function SectionHeading({ id, title, action }: { id: string; title: string; action: string }) {
  return <div className="section-heading"><h2 id={id}>{title}</h2><Button type="button" variant="link">{action}<ArrowRight data-icon="inline-end" /></Button></div>
}

export function Announcements() {
  return <section aria-labelledby="announcements-heading">
    <SectionHeading id="announcements-heading" title="校招公告" action="查看全部公告" />
    <div className="announcement-grid">{data.announcements.map((notice) => <article className="announcement-card" key={notice.id}>
      <div className="company-heading"><Megaphone aria-hidden="true" /><span>{notice.company}</span></div>
      <h3>{notice.title}</h3>
      <time dateTime={notice.publishedAt}>{notice.publishedAt}</time>
    </article>)}</div>
  </section>
}

function DetailRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return <div className="detail-row"><dt>{icon}{label}</dt><dd>{children}</dd></div>
}

function JobDetails({ job }: { job: Job }) {
  return <aside id="job-details" className="job-details" aria-label="当前岗位条件" aria-live="polite">
    <div className="detail-intro"><h3><Sparkles aria-hidden="true" />精准匹配</h3><p>每个岗位均附带可追溯的匹配逻辑，拒绝盲投。</p></div>
    <div className="detail-body">
      <h3 className="detail-job-title">{job.title}</h3>
      <dl>
        <DetailRow icon={<GraduationCap aria-hidden="true" />} label="学历要求">{job.degree}</DetailRow>
        <DetailRow icon={<BookOpen aria-hidden="true" />} label="专业要求">{job.majors.join('、')}</DetailRow>
        <DetailRow icon={<MapPin aria-hidden="true" />} label="工作地点">{job.location}</DetailRow>
        <DetailRow icon={<Clock3 aria-hidden="true" />} label={job.deadlineLabel}><time dateTime={job.deadline}>{job.deadline.replaceAll('-', '.')}</time></DetailRow>
      </dl>
      <Button type="button" className="detail-action">查看岗位完整条件<ArrowRight data-icon="inline-end" /></Button>
    </div>
  </aside>
}

export function RecommendedJobs() {
  const [selectedId, setSelectedId] = useState(data.jobs[0]?.id)
  const selectedJob = data.jobs.find((job) => job.id === selectedId) ?? data.jobs[0]
  return <section aria-labelledby="jobs-heading">
    <SectionHeading id="jobs-heading" title="为您精准匹配的岗位" action="查看全部岗位" />
    <div className="jobs-layout">
      <div className="job-list" aria-label="推荐岗位">{data.jobs.map((job) => <button type="button" key={job.id} className={cn('job-card', selectedJob?.id === job.id && 'is-selected')} aria-pressed={selectedJob?.id === job.id} aria-controls="job-details" onClick={() => setSelectedId(job.id)}>
        <span className="company-icon"><Building2 aria-hidden="true" /></span>
        <span className="job-summary"><span className="job-title">{job.title}</span><span className="job-company">{job.company}</span><span className="job-meta"><span><MapPin aria-hidden="true" />{job.location}</span><span><GraduationCap aria-hidden="true" />{job.degree}</span></span></span>
        {selectedJob?.id === job.id ? <span className="selected-mark"><Check aria-hidden="true" /><span className="sr-only">已选中</span></span> : null}
      </button>)}</div>
      {selectedJob ? <JobDetails job={selectedJob} /> : null}
    </div>
  </section>
}
