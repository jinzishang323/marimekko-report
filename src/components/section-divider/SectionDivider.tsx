import { SlideLayout } from '../../layouts/SlideLayout'
import { palette, fonts, fontSizes } from '../../theme/tokens'
import { prints, type PrintKey } from '../../theme/prints'

interface SectionDividerProps {
  partNumber: number
  sectionName: string
}

// Print mapping for each section — shared with content page borders
export const sectionPrints: Record<string, { printKey: PrintKey; accent: string }> = {
  summary:     { printKey: 'colorBands', accent: palette.accent3 },
  wechat:      { printKey: 'paskblomma', accent: palette.accent1 },
  red:         { printKey: 'floralRose', accent: '#FF2442' },
  weibo:       { printKey: 'gridSketch', accent: '#FF8200' },
  competitors: { printKey: 'floralPastel', accent: '#5B7DB1' },
}

export type SectionKey = keyof typeof sectionPrints

export function SectionDivider({
  partNumber,
  sectionName,
  section,
}: SectionDividerProps & { section: SectionKey }) {
  const { printKey, accent } = sectionPrints[section]
  const print = prints[printKey]

  return (
    <SlideLayout style={{ padding: 0, display: 'flex' }}>
      {/* Left content area — 70% */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '4rem',
        position: 'relative',
      }}>
        {/* Ghosted large number */}
        <div style={{
          fontFamily: fonts.heading,
          fontSize: '8rem',
          fontWeight: 900,
          color: palette.text,
          opacity: 0.04,
          lineHeight: 1,
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-60%)',
          left: '3rem',
        }}>
          {String(partNumber).padStart(2, '0')}
        </div>

        <div style={{
          fontFamily: fonts.heading,
          fontSize: fontSizes.sectionTitle,
          fontWeight: 700,
          color: palette.text,
          letterSpacing: 1,
          position: 'relative',
        }}>
          PART {String(partNumber).padStart(2, '0')}.
        </div>

        <div style={{
          fontFamily: fonts.heading,
          fontSize: fontSizes.sectionTitle,
          fontWeight: 300,
          color: accent,
          marginTop: 4,
          position: 'relative',
        }}>
          {sectionName}
        </div>

        {/* Small accent bar */}
        <div style={{
          width: 32,
          height: 3,
          backgroundColor: accent,
          marginTop: 20,
          position: 'relative',
        }} />
      </div>

      {/* Right print accent — 28% */}
      <div style={{
        width: '28%',
        height: '100%',
        backgroundImage: `url(${print.src})`,
        backgroundSize: 'cover',
        backgroundPosition: printKey === 'paskblomma' ? '30% center' : 'center',
      }} />
    </SlideLayout>
  )
}
