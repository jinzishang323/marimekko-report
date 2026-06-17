import { SlideLayout } from '../../layouts/SlideLayout'
import { palette, fonts, fontSizes } from '../../theme/tokens'
import { prints } from '../../theme/prints'

export function CoverSlide({ month, year }: { month: string; year: string }) {
  return (
    <SlideLayout style={{ padding: 0, display: 'flex' }}>
      {/* Left: Full-bleed Påskblomma print — 48% width, shifted right to show full flower */}
      <div style={{
        width: '48%',
        height: '100%',
        backgroundImage: `url(${prints.paskblomma.src})`,
        backgroundSize: 'cover',
        backgroundPosition: '70% center',
      }} />

      {/* Right: White text area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 3.5rem 4.5rem 3rem',
        position: 'relative',
      }}>
        {/* Small decorative print motif top-right */}
        <div style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          width: 32,
          height: 32,
          backgroundImage: `url(${prints.paskblomma.src})`,
          backgroundSize: '60px 60px',
          backgroundPosition: 'center',
          opacity: 0.2,
          borderRadius: 2,
        }} />

        <div style={{
          fontFamily: fonts.heading,
          fontSize: fontSizes.label,
          fontWeight: 300,
          letterSpacing: 3,
          color: palette.textSecondary,
          textTransform: 'uppercase',
          marginBottom: 8,
        }}>
          CN Social Media
        </div>

        <div style={{
          fontFamily: fonts.heading,
          fontSize: fontSizes.coverTitle,
          fontWeight: 900,
          color: palette.text,
          lineHeight: 1.05,
          letterSpacing: -0.5,
        }}>
          {month.toUpperCase()}<br />
          MONTHLY REPORT
        </div>

        <div style={{
          width: 40,
          height: 3,
          backgroundColor: palette.accent1,
          marginTop: 24,
          marginBottom: 20,
        }} />

        {/* Prepared by row: WTC logo + text */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <img
            src="/wtc-logo.png"
            alt="WalktheChat"
            style={{ height: 18, objectFit: 'contain', opacity: 0.7 }}
          />
          <div style={{
            fontFamily: fonts.heading,
            fontSize: fontSizes.label,
            fontWeight: 300,
            color: palette.textSecondary,
            letterSpacing: 1,
          }}>
            {year} · Prepared by Marimekko China
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}
