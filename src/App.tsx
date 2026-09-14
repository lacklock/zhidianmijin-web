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
          className="bg-[radial-gradient(ellipse_at_50%_0%,#eaf4fd_0%,#f8fbfe_43%,#fff_78%)]"
          aria-labelledby="hero-title"
        >
          <div className="w-full max-w-270 px-6 mx-auto max-[850px]:px-5">
            <div className="pt-14 pb-8 text-center max-[850px]:pt-10">
              <h1
                id="hero-title"
                className="flex items-center justify-center gap-4 text-[clamp(28px,3.4vw,40px)] leading-[1.4] font-normal max-[850px]:gap-3 max-[850px]:text-[28px]"
              >
                <img src={SiteLogo} alt="职点迷津" className="w-20 h-auto" />
                <span>
                  聚焦央国企，
                  <strong className="font-bold">精准锁定好机遇</strong>
                </span>
              </h1>
              <p className="mt-4 text-base text-secondary-foreground max-[850px]:text-sm">
                依托官方公告与海量真实数据，快速定位值得投递的优质岗位。
              </p>
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
