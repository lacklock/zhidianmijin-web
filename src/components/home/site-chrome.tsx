import type { ReactNode } from 'react'
import { Bell, UserRound, ChevronDown, MessagesSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'

function HoverMenu({ label, children, account = false }: { label: string; children: ReactNode; account?: boolean }) {
  return <HoverCard openDelay={100} closeDelay={150}>
    <HoverCardTrigger asChild>
      <Button type="button" variant={account ? 'outline' : 'ghost'}>
        {account ? <UserRound data-icon="inline-start" /> : null}{label}<ChevronDown data-icon="inline-end" />
      </Button>
    </HoverCardTrigger>
    <HoverCardContent align={account ? 'end' : 'start'} className="nav-menu" sideOffset={8}>{children}</HoverCardContent>
  </HoverCard>
}

export function SiteHeader() {
  return <header className="site-header">
    <div className="page-container header-inner">
      <span className="brand">职点迷津<span className="brand-dot">.</span></span>
      <nav aria-label="主导航">
        <Button type="button" variant="ghost" aria-current="page">首页</Button>
        <Button type="button" variant="ghost">找岗位</Button>
        <Button type="button" variant="ghost">备考中心</Button>
        <HoverMenu label="更多服务">{['课程', '招聘日历', '企业库'].map((label) => <Button type="button" variant="ghost" key={label}>{label}</Button>)}</HoverMenu>
      </nav>
      <div className="account-actions">
        <Button type="button" variant="ghost" size="icon" aria-label="通知"><Bell /></Button>
        <HoverMenu label="我的空间" account>{['我的申请', '个人信息', '退出登录'].map((label) => <Button type="button" variant="ghost" key={label}>{label}</Button>)}</HoverMenu>
      </div>
    </div>
  </header>
}

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="page-container">
      <div className="footer-grid">
        <div><span className="brand">职点迷津<span className="brand-dot">.</span></span><p>帮你看清岗位、把握窗口、准备下一步。</p></div>
        <div className="mini-program"><MessagesSquare aria-hidden="true" /><span>小程序</span></div>
        <div className="footer-links"><h2>更多服务</h2>{['课程', '招聘日历', '企业库'].map((label) => <button type="button" key={label}>{label}</button>)}</div>
        <div className="footer-links"><h2>协议与支持</h2>{['数据与隐私', '隐私政策', '用户协议'].map((label) => <button type="button" key={label}>{label}</button>)}</div>
      </div>
      <p className="copyright">© 2026 职点迷津 · 北京职点迷津教育科技有限公司<span>京ICP备2023001348号-2</span></p>
    </div>
  </footer>
}
