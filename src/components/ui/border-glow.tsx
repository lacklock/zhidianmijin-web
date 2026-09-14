import { type ComponentProps, type CSSProperties } from 'react'
import { cn } from 'cn'
import './border-glow.css'

type GlowStyle = CSSProperties & Record<`--${string}`, string | number>

type BorderGlowProps = ComponentProps<'div'> & {
  edgeSensitivity?: number
  glowColor?: string
  backgroundColor?: string
  borderRadius?: string
  glowRadius?: number
  glowIntensity?: number
  coneSpread?: number
  colors?: readonly [string, string, string]
  fillOpacity?: number
}

const brandColors = [
  'var(--primary)',
  'var(--search-glow-violet)',
  'var(--search-glow-cyan)',
] as const
const gradientPositions = [
  '80% 55%',
  '69% 34%',
  '8% 6%',
  '41% 38%',
  '86% 85%',
  '82% 18%',
  '51% 4%',
]
const gradientNames = ['one', 'two', 'three', 'four', 'five', 'six', 'seven']
const colorMap = [0, 1, 2, 0, 1, 2, 1] as const

/** React Bits BorderGlow，适配站点的浅色主题与设计令牌。 */
export function BorderGlow({
  children,
  className,
  style,
  edgeSensitivity = 30,
  glowColor = 'var(--search-glow-blue)',
  backgroundColor = 'var(--card)',
  borderRadius = 'var(--radius-lg)',
  glowRadius = 20,
  glowIntensity = 0.8,
  coneSpread = 25,
  colors = brandColors,
  fillOpacity = 0.08,
  onPointerMove,
  onPointerLeave,
  ...props
}: BorderGlowProps) {
  const glowStyle: GlowStyle = {
    '--card-bg': backgroundColor,
    '--edge-sensitivity': Math.min(Math.max(edgeSensitivity, 0), 79),
    '--border-radius': borderRadius,
    '--glow-padding': `${glowRadius}px`,
    '--cone-spread': coneSpread,
    '--fill-opacity': fillOpacity,
    '--gradient-base': `linear-gradient(${colors[0]} 0 100%)`,
  }

  for (const opacity of [100, 60, 50, 40, 30, 20, 10]) {
    const suffix = opacity === 100 ? '' : `-${opacity}`
    glowStyle[`--glow-color${suffix}`] =
      `color-mix(in srgb, ${glowColor} ${Math.min(Math.max(opacity * glowIntensity, 0), 100)}%, transparent)`
  }
  gradientNames.forEach((name, index) => {
    glowStyle[`--gradient-${name}`] =
      `radial-gradient(at ${gradientPositions[index]}, ${colors[colorMap[index]]} 0px, transparent 50%)`
  })

  return (
    <div
      {...props}
      className={cn('border-glow-card', className)}
      style={{ ...glowStyle, ...style }}
      onPointerMove={(event) => {
        if (event.pointerType !== 'touch') {
          const card = event.currentTarget
          const rect = card.getBoundingClientRect()
          const dx = event.clientX - rect.left - rect.width / 2
          const dy = event.clientY - rect.top - rect.height / 2
          const proximity = Math.min(
            Math.max(
              Math.abs(dx) / (rect.width / 2),
              Math.abs(dy) / (rect.height / 2),
            ),
            1,
          )
          const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90
          card.style.setProperty('--edge-proximity', `${proximity * 100}`)
          card.style.setProperty('--cursor-angle', `${angle}deg`)
        }
        onPointerMove?.(event)
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty('--edge-proximity', '0')
        onPointerLeave?.(event)
      }}
    >
      <span className="edge-light" aria-hidden="true" />
      <div className="border-glow-inner">{children}</div>
    </div>
  )
}
