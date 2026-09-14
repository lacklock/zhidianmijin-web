import { SiteHeader, SiteFooter } from '@/components/home/site-chrome'
import { SearchPanel } from '@/components/home/search-panel'
import { Announcements, RecommendedJobs } from '@/components/home/opportunities'
import SiteLogo from '@/assets/zhidian-icon.png'

export default function App() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section
          className="bg-[radial-gradient(ellipse_at_50%_0%,var(--primary-wash)_0%,#f7f8fc_43%,#fff_78%)]"
          aria-labelledby="hero-title"
        >
          <div className="page-shell">
            <div className="pt-16 pb-16 text-center max-[850px]:pt-10">
              <h1
                id="hero-title"
                className="flex items-center justify-center gap-4 text-[clamp(28px,3.4vw,40px)] leading-[1.4] font-normal max-[850px]:gap-3 max-[850px]:text-[28px]"
              >
                <img src={SiteLogo} alt="职点迷津" className="w-20 h-auto" />
                <span>聚焦央国企，精准锁定好机遇</span>
              </h1>
              <p className="mt-2 text-base text-secondary-foreground max-[850px]:text-sm">
                依托官方公告与海量真实数据，快速定位值得投递的优质岗位
              </p>
            </div>
            <SearchPanel />
          </div>
        </section>
        <div className="page-shell flex flex-col gap-12 pt-12 pb-14">
          <Announcements />
          <RecommendedJobs />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
