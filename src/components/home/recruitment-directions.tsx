import {
  Building2,
  GraduationCap,
  ShieldCheck,
  Landmark,
  Ellipsis,
} from 'lucide-react'

const directions = [
  {
    label: '央国企岗位',
    value: 'state-owned',
    icon: Building2,
    params: { organizationTypes: '央国企' },
  },
  {
    label: '校园招聘',
    value: 'campus',
    icon: GraduationCap,
    params: { recruitmentType: '校园招聘' },
  },
  {
    label: '军队文职',
    value: 'military-civilian',
    icon: ShieldCheck,
    params: {},
  },
  { label: '公务员', value: 'civil-service', icon: Landmark, params: {} },
] as const

export type RecruitmentDirection = (typeof directions)[number]['value']

// 实心版本保留窗格、帽檐和盾牌勾线，避免直接填充线框后细节消失。
function FilledDirectionIcon({
  direction,
}: {
  direction: RecruitmentDirection | 'more'
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="absolute inset-0 size-7 opacity-0 transition-opacity duration-160 group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      {direction === 'state-owned' && (
        <>
          <path d="M4 2a1 1 0 0 0-1 1v18H2v1h20v-1h-1V9a1 1 0 0 0-1-1h-5V3a1 1 0 0 0-1-1H4Z" />
          <path
            d="M6 6h2m2 0h2M6 10h2m2 0h2M6 14h2m2 0h2m5-2h2m-2 4h2M8 21v-3h3v3"
            fill="none"
            stroke="var(--primary-wash)"
            strokeWidth="1.6"
          />
        </>
      )}
      {direction === 'campus' && (
        <>
          <path d="m12 2 11 6-11 6L1 8l11-6Zm-7 11 7 3.8 7-3.8v5c-4 3-10 3-14 0v-5Z" />
          <path
            d="M22 9v7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </>
      )}
      {direction === 'military-civilian' && (
        <>
          <path d="M12 2c3 2 6 3 9 3v7c0 5-5 8-9 10-4-2-9-5-9-10V5c3 0 6-1 9-3Z" />
          <path
            d="m8 12 3 3 5-6"
            fill="none"
            stroke="var(--primary-wash)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {direction === 'civil-service' && (
        <>
          <path d="m12 2 11 6v2H1V8l11-6ZM4 11h3v8H4v-8Zm6.5 0h3v8h-3v-8Zm6.5 0h3v8h-3v-8ZM2 20h20v2H2v-2Z" />
        </>
      )}
      {direction === 'more' && (
        <>
          <circle cx="4" cy="12" r="2.5" />
          <circle cx="12" cy="12" r="2.5" />
          <circle cx="20" cy="12" r="2.5" />
        </>
      )}
    </svg>
  )
}

export function RecruitmentDirections() {
  const links = [
    ...directions.map(({ label, value, icon, params }) => ({
      label,
      value,
      icon,
      href: `/jobs?${new URLSearchParams({ direction: value, ...params })}`,
    })),
    {
      label: '更多方向',
      value: 'more' as const,
      icon: Ellipsis,
      href: '/jobs',
    },
  ]

  return (
    <nav
      aria-label="招聘方向"
      className="mt-8 mb-1 grid grid-cols-5 gap-3 max-[850px]:gap-2"
    >
      {links.map(({ label, value, icon: Icon, href }) => (
        <a
          key={value}
          href={href}
          className="group flex h-20 items-center gap-3 rounded-md border border-border bg-card px-5 py-3 text-base font-medium text-foreground transition-colors duration-160 hover:border-primary hover:bg-primary-wash hover:text-primary focus-visible:border-primary focus-visible:bg-primary-wash focus-visible:text-primary max-[850px]:flex-col max-[850px]:justify-center max-[850px]:gap-2 max-[850px]:px-2 max-[850px]:py-2 max-[850px]:text-sm"
        >
          <span className="relative size-7 shrink-0 text-primary">
            <Icon
              aria-hidden="true"
              className="size-7 stroke-[1.7] transition-opacity duration-160 group-hover:opacity-0 group-focus-visible:opacity-0"
            />
            <FilledDirectionIcon direction={value} />
          </span>
          <span className="whitespace-nowrap">{label}</span>
        </a>
      ))}
    </nav>
  )
}
