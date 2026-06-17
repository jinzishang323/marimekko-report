import type { ReactNode, CSSProperties } from 'react'
import { fonts, palette } from '../theme/tokens'

interface SlideLayoutProps {
  children: ReactNode
  style?: CSSProperties
  className?: string
}

// 16:9 slide container — 1280×720
export function SlideLayout({ children, style, className = '' }: SlideLayoutProps) {
  return (
    <div
      className={`slide-layout ${className}`}
      style={{
        width: '1280px',
        height: '720px',
        fontFamily: fonts.body,
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        backgroundColor: palette.bg,
        color: palette.text,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
