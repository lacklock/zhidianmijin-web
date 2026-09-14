import { SiteHeader, SiteFooter } from '@/components/home/site-chrome'
import { SearchPanel } from '@/components/home/search-panel'
import { Announcements, RecommendedJobs } from '@/components/home/opportunities'
import { UserSearch } from 'lucide-react'

export default function App() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section
          className="bg-[radial-gradient(ellipse_at_50%_0%,_#eaf4fd_0%,_#f8fbfe_43%,_#fff_78%)]"
          aria-labelledby="hero-title"
        >
          <div className="w-full max-w-[1080px] px-6 mx-auto max-[850px]:px-5">
            <div className="pt-14 pb-8 text-center [&_h1]:flex [&_h1]:items-center [&_h1]:justify-center [&_h1]:gap-4 [&_h1]:text-[clamp(28px,_3.4vw,_40px)] [&_h1]:leading-[1.4] [&_h1]:font-normal [&_h1_>_svg]:size-11 [&_h1_>_svg]:text-interaction [&_h1_>_svg]:stroke-[1.6] [&_strong]:font-bold [&_p]:mt-4 [&_p]:text-secondary-foreground [&_p]:text-base max-[850px]:pt-10 max-[850px]:[&_h1]:text-[28px] max-[850px]:[&_h1]:gap-3 max-[850px]:[&_h1_>_svg]:size-9 max-[850px]:[&_p]:text-sm">
              <h1 id="hero-title">
                <UserSearch aria-hidden="true" />
                <span>
                  聚焦央国企，<strong>精准锁定好机遇</strong>
                </span>
              </h1>
              <p>依托官方公告与海量真实数据，快速定位值得投递的优质岗位。</p>
            </div>
            <SearchPanel />
          </div>
        </section>
        <div className="w-full max-w-[1080px] px-6 mx-auto max-[850px]:px-5 flex flex-col gap-12 pt-12 pb-14">
          <Announcements />
          <RecommendedJobs />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
