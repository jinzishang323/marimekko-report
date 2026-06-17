import { PrintBorderLayout } from '../../layouts/PrintBorderLayout'
import type { SectionKey } from '../section-divider/SectionDivider'

interface BlankContentPageProps {
  section: SectionKey
  /** Optional subtle label for the template */
  label?: string
}

// Blank content page with section-matched print border
// User fills in their own content in the white area
export function BlankContentPage({ section, label }: BlankContentPageProps) {
  return (
    <PrintBorderLayout section={section} borderWidth={28} padding={48}>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {label && (
          <div style={{
            fontFamily: "'MariSans', sans-serif",
            fontSize: '0.75rem',
            color: '#D0CCC4',
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}>
            {label}
          </div>
        )}
      </div>
    </PrintBorderLayout>
  )
}
