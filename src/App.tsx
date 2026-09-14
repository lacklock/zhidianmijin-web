import { SiteHeader, SiteFooter } from '@/components/home/site-chrome'
import { SearchPanel } from '@/components/home/search-panel'
import { Announcements, RecommendedJobs } from '@/components/home/opportunities'
import { UserSearch } from 'lucide-react'
import './App.css'

export default function App() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="page-container">
            <div className="hero-heading">
              <h1 id="hero-title"><UserSearch aria-hidden="true" /><span>聚焦央国企，<strong>精准锁定好机遇</strong></span></h1>
              <p>依托官方公告与海量真实数据，快速定位值得投递的优质岗位。</p>
            </div>
            <SearchPanel />
          </div>
        </section>
        <div className="page-container opportunity-sections">
          <Announcements />
          <RecommendedJobs />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
