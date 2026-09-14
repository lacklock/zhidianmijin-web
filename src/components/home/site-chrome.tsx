import type { ReactNode } from 'react'
import { Bell, UserRound, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import integratedLogo from '@/assets/Integrated_logo.webp'
import miniprogramCode from '@/assets/miniprogram.jpg'
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
        className="w-40 p-1.5 rounded-lg shadow-[0_12px_28px_rgb(10_37_64/12%)]"
        sideOffset={8}
      >
        {children}
      </HoverCardContent>
    </HoverCard>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-100 min-w-170 h-18 border-b border-border bg-[rgb(255_255_255/96%)] backdrop-blur-[12px]">
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
    <footer className="bg-secondary border-t border-border pt-6 pb-4">
      <div className="w-full max-w-270 px-6 mx-auto max-[850px]:px-5">
        <div className="grid grid-cols-[3fr_1fr_1fr] gap-8 [&_p]:mt-2 [&_p]:text-xs [&_p]:text-secondary-foreground max-[850px]:gap-5 max-[850px]:grid-cols-[2.6fr_1fr_1fr]">
          <div className="flex items-center gap-10 max-[850px]:gap-5">
            <div>
              <img
                src={integratedLogo}
                alt="职点迷津"
                className="h-9 w-auto max-[850px]:h-8"
              />
              <p>帮你看清岗位、把握窗口、准备下一步。</p>
            </div>
            <HoverCard openDelay={100} closeDelay={150}>
              <HoverCardTrigger asChild>
                <button
                  type="button"
                  aria-label="查看小程序二维码"
                  className="flex shrink-0 items-center gap-1 rounded-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  {/* Remix Icon: mini-program-line */}
                  <svg
                    className="size-8 text-muted-foreground"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12.001 22C6.47813 22 2.00098 17.5228 2.00098 12C2.00098 6.47715 6.47813 2 12.001 2C17.5238 2 22.001 6.47715 22.001 12C22.001 17.5228 17.5238 22 12.001 22ZM12.001 20C16.4193 20 20.001 16.4183 20.001 12C20.001 7.58172 16.4193 4 12.001 4C7.5827 4 4.00098 7.58172 4.00098 12C4.00098 16.4183 7.5827 20 12.001 20ZM13.001 14C13.001 15.9332 11.434 17.5002 9.50098 17.5002C7.56798 17.5002 6.00098 15.9332 6.00098 14.0002C6.00098 12.6262 6.80048 11.3965 8.02405 10.8265C8.52467 10.5932 9.11958 10.81 9.35282 11.3106C9.58607 11.8112 9.36932 12.4061 8.86871 12.6393C8.34353 12.884 8.00098 13.4109 8.00098 14.0002C8.00098 14.8287 8.67255 15.5002 9.50098 15.5002C10.3294 15.5002 11.001 14.8287 11.001 14.0002V10C11.001 8.067 12.568 6.5 14.501 6.5C16.434 6.5 18.001 8.067 18.001 10C18.001 11.3741 17.2015 12.6037 15.9779 13.1738C15.4773 13.407 14.8824 13.1903 14.6491 12.6897C14.4159 12.189 14.6326 11.5941 15.1332 11.3609C15.6584 11.1162 16.001 10.5894 16.001 10C16.001 9.17157 15.3294 8.5 14.501 8.5C13.6725 8.5 13.001 9.17157 13.001 10V14Z" />
                  </svg>
                  <span className="text-sm">小程序</span>
                </button>
              </HoverCardTrigger>
              <HoverCardContent
                side="top"
                align="center"
                sideOffset={12}
                className="w-auto p-3"
              >
                <img
                  src={miniprogramCode}
                  alt="职点迷津微信小程序二维码，请使用微信扫码"
                  width={258}
                  height={258}
                  className="size-50 max-w-full object-contain"
                />
              </HoverCardContent>
            </HoverCard>
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
