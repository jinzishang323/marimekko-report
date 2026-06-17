import type { ReactNode, CSSProperties } from 'react'
import { fonts, palette } from '../theme/tokens'
import { prints } from '../theme/prints'
import { sectionPrints, type SectionKey } from '../components/section-divider/SectionDivider'

interface PrintBorderLayoutProps {
  children: ReactNode
  section: SectionKey
  style?: CSSProperties
  /** Border strip width in px (default 28) */
  borderWidth?: number
  /** Inner padding in px (default 40) */
  padding?: number
}

// Content page layout with print border frame
// The print matches the section divider's print for visual cohesion
export function PrintBorderLayout({
  children,
  section,
  style,
  borderWidth = 28,
  padding = 40,
}: PrintBorderLayoutProps) {
  const { printKey } = sectionPrints[section]
  const print = prints[printKey]

  return (
    <div style={{
      width: '1280px',
      height: '720px',
      fontFamily: fonts.body,
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box',
      backgroundColor: palette.bg,
      color: palette.text,
      ...style,
    }}>
      {/* Print border — top */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: borderWidth,
        backgroundImage: `url(${print.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }} />

      {/* Print border — bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: borderWidth,
        backgroundImage: `url(${print.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
      }} />

      {/* Print border — left */}
      <div style={{
        position: 'absolute',
        top: borderWidth, bottom: borderWidth, left: 0,
        width: borderWidth,
        backgroundImage: `url(${print.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'left center',
      }} />

      {/* Print border — right */}
      <div style={{
        position: 'absolute',
        top: borderWidth, bottom: borderWidth, right: 0,
        width: borderWidth,
        backgroundImage: `url(${print.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
      }} />

      {/* Inner accent line — fixed light gray, not tied to print accent */}
      <div style={{
        position: 'absolute',
        top: borderWidth,
        left: borderWidth,
        right: borderWidth,
        bottom: borderWidth,
        border: `1px solid #CCCCCC44`,
        pointerEvents: 'none',
      }} />

      {/* Content area */}
      <div style={{
        position: 'absolute',
        top: borderWidth,
        left: borderWidth,
        right: borderWidth,
        bottom: borderWidth,
        padding,
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}>
        {children}
      </div>
    </div>
  )
}
