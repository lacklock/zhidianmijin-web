import type { ReactNode } from 'react'
import { Bell, UserRound, ChevronDown, MessagesSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import integratedLogo from '@/assets/Integrated_logo.webp'
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/ui/hover-card'

function HoverMenu({
  label,
  children,
  account = false,
}: {
  label: string
  children: ReactNode
  account?: boolean
}) {
  return (
    <HoverCard openDelay={100} closeDelay={150}>
      <HoverCardTrigger asChild>
        <Button
          type="button"
          variant={account ? 'outline' : 'ghost'}
          className="h-10 px-3.5 max-[850px]:px-2"
        >
          {account ? <UserRound data-icon="inline-start" /> : null}
          {label}
          <ChevronDown data-icon="inline-end" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        align={account ? 'end' : 'start'}
        className="w-40 p-1.5 rounded-lg shadow-[0_12px_28px_rgb(10_37_64_/_12%)]"
        sideOffset={8}
      >
        {children}
      </HoverCardContent>
    </HoverCard>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-100 min-w-170 h-18 border-b border-border bg-[rgb(255_255_255_/_96%)] backdrop-blur-[12px]">
      <div className="w-full max-w-[1080px] px-6 mx-auto max-[850px]:px-5 h-full flex items-center gap-8 [&_nav]:flex [&_nav]:items-center [&_nav]:gap-1 max-[850px]:gap-4 max-[850px]:[&_nav]:gap-0">
        <img
          src={integratedLogo}
          alt="职点迷津"
          className="h-9 w-auto max-[850px]:h-8"
        />
        <nav aria-label="主导航">
          <Button
            type="button"
            variant="ghost"
            className="h-10 px-3.5 aria-current:bg-accent aria-current:text-accent-foreground max-[850px]:px-2"
            aria-current="page"
          >
            首页
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-10 px-3.5 max-[850px]:px-2"
          >
            找岗位
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-10 px-3.5 max-[850px]:px-2"
          >
            备考中心
          </Button>
          <HoverMenu label="更多服务">
            {['课程', '招聘日历', '企业库'].map((label) => (
              <Button
                type="button"
                variant="ghost"
                className="h-10 w-full justify-start px-4"
                key={label}
              >
                {label}
              </Button>
            ))}
          </HoverMenu>
        </nav>
        <div className="flex items-center gap-3 ml-auto max-[850px]:gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-10"
            aria-label="通知"
          >
            <Bell />
          </Button>
          <HoverMenu label="我的空间" account>
            {['我的申请', '个人信息', '退出登录'].map((label) => (
              <Button
                type="button"
                variant="ghost"
                className="h-10 w-full justify-start px-4"
                key={label}
              >
                {label}
              </Button>
            ))}
          </HoverMenu>
        </div>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-secondary border-t border-border pt-9 pb-5">
      <div className="w-full max-w-270 px-6 mx-auto max-[850px]:px-5">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-8 [&_p]:mt-2 [&_p]:text-xs [&_p]:text-secondary-foreground max-[850px]:gap-5 max-[850px]:grid-cols-[1.8fr_.8fr_1fr_1fr]">
          <div>
            <img
              src={integratedLogo}
              alt="职点迷津"
              className="h-9 w-auto max-[850px]:h-8"
            />
            <p>帮你看清岗位、把握窗口、准备下一步。</p>
          </div>
          <div className="flex items-start gap-2 pt-1.5 [&_svg]:size-6">
            <MessagesSquare aria-hidden="true" />
            <span className="text-sm">小程序</span>
          </div>
          <div className="flex flex-col items-start [&_h2]:text-sm [&_h2]:font-medium [&_h2]:mb-2 [&_button]:text-muted-foreground [&_button]:text-xs [&_button]:py-0.5 [&_button:hover]:text-interaction">
            <h2>更多服务</h2>
            {['课程', '招聘日历', '企业库'].map((label) => (
              <button type="button" key={label}>
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-col items-start [&_h2]:text-sm [&_h2]:font-medium [&_h2]:mb-2 [&_button]:text-muted-foreground [&_button]:text-xs [&_button]:py-0.5 [&_button:hover]:text-interaction">
            <h2>协议与支持</h2>
            {['数据与隐私', '隐私政策', '用户协议'].map((label) => (
              <button type="button" key={label}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-8 border-t border-border pt-5 text-center text-xs text-muted-foreground [&_span]:ml-4">
          © 2026 职点迷津 · 北京职点迷津教育科技有限公司
          <span>京ICP备2023001348号-2</span>
        </p>
      </div>
    </footer>
  )
}
