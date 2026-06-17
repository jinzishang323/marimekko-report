import { SlideLayout } from '../../layouts/SlideLayout'
import { palette, fonts } from '../../theme/tokens'
import { prints } from '../../theme/prints'

// End slide — full-bleed Påskblomma with centered logo text
export function EndSlide() {
  return (
    <SlideLayout style={{
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: `url(${prints.paskblomma.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {/* Semi-transparent overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(255,255,255,0.6)',
      }} />

      {/* Center content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: fonts.heading,
          fontSize: '2rem',
          fontWeight: 900,
          color: palette.text,
          letterSpacing: 2,
        }}>
          MARIMEKKO
        </div>
        <div style={{
          fontFamily: fonts.heading,
          fontSize: '0.75rem',
          fontWeight: 300,
          color: palette.textSecondary,
          letterSpacing: 4,
          marginTop: 8,
          textTransform: 'uppercase',
        }}>
          China Social Media Report
        </div>
      </div>
    </SlideLayout>
  )
}
