import { PrintBorderLayout } from '../../layouts/PrintBorderLayout'
import { palette, fonts, fontSizes, platformColors } from '../../theme/tokens'

interface NoteItem {
  date: string
  title: string
  likes: number
  comments: number
  collects: number
  shares: number
}

interface REDOverviewProps {
  month: string
  followers: number
  netGrowth: number
  totalViews: number
  totalEngagements: number
  posts: number
  topNotes: NoteItem[]
}

function fmt(n: number): string {
  return n.toLocaleString()
}

// RED Overview — content page with floralRose print border
export function REDOverview({
  month, followers, netGrowth, totalViews, totalEngagements, posts, topNotes,
}: REDOverviewProps) {
  return (
    <PrintBorderLayout section="red" borderWidth={28} padding={36}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: '1.25rem',
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            backgroundColor: platformColors.red,
          }} />
          <h1 style={{
            fontFamily: fonts.heading,
            fontSize: fontSizes.pageTitle,
            fontWeight: 700,
            color: palette.text,
            margin: 0,
          }}>
            RED Overview
          </h1>
          <span style={{
            fontFamily: fonts.heading,
            fontSize: fontSizes.bodySmall,
            color: palette.textSecondary,
            marginLeft: 'auto',
          }}>
            {month} 2026
          </span>
        </div>

        {/* KPI strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '1rem',
          paddingBottom: '1rem',
          borderBottom: `2px solid ${palette.text}`,
          marginBottom: '1.25rem',
        }}>
          {[
            { label: 'Total Followers', value: fmt(followers), bold: true },
            { label: 'Net Growth', value: `+${fmt(netGrowth)}`, color: palette.accent1 },
            { label: 'Total Views', value: fmt(totalViews) },
            { label: 'Engagements', value: fmt(totalEngagements) },
            { label: 'Notes', value: String(posts) },
          ].map((kpi) => (
            <div key={kpi.label}>
              <div style={{
                fontFamily: fonts.heading,
                fontSize: fontSizes.metricMedium,
                fontWeight: kpi.bold ? 900 : 700,
                color: kpi.color || palette.text,
              }}>
                {kpi.value}
              </div>
              <div style={{
                fontFamily: fonts.body,
                fontSize: fontSizes.caption,
                color: palette.textSecondary,
                marginTop: 2,
              }}>
                {kpi.label}
              </div>
            </div>
          ))}
        </div>

        {/* Top Notes table */}
        <div style={{
          fontFamily: fonts.heading,
          fontSize: fontSizes.body,
          fontWeight: 700,
          color: palette.text,
          marginBottom: '0.5rem',
        }}>
          Top Performing Notes
        </div>

        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '70px 1fr 70px 70px 70px 70px',
          gap: '0.75rem',
          paddingBottom: '0.4rem',
          borderBottom: `1px solid ${palette.text}`,
          marginBottom: '0.25rem',
        }}>
          {['Date', 'Title', 'Likes', 'Comments', 'Collects', 'Shares'].map((h) => (
            <div key={h} style={{
              fontFamily: fonts.heading,
              fontSize: fontSizes.caption,
              fontWeight: 700,
              color: palette.textSecondary,
              textAlign: h === 'Title' || h === 'Date' ? 'left' : 'right',
            }}>
              {h}
            </div>
          ))}
        </div>

        {/* Table rows */}
        {topNotes.map((note, i: number) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '70px 1fr 70px 70px 70px 70px',
            gap: '0.75rem',
            padding: '0.4rem 0',
            borderBottom: `1px solid ${palette.divider}`,
          }}>
            <div style={{
              fontFamily: fonts.body,
              fontSize: fontSizes.caption,
              color: palette.textSecondary,
            }}>
              {note.date}
            </div>
            <div style={{
              fontFamily: fonts.body,
              fontSize: fontSizes.bodySmall,
              color: palette.text,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {note.title}
            </div>
            <div style={cellStyle}>{fmt(note.likes)}</div>
            <div style={cellStyle}>{fmt(note.comments)}</div>
            <div style={cellStyle}>{fmt(note.collects)}</div>
            <div style={cellStyle}>{fmt(note.shares)}</div>
          </div>
        ))}
      </div>
    </PrintBorderLayout>
  )
}

const cellStyle: React.CSSProperties = {
  fontFamily: fonts.heading,
  fontSize: fontSizes.caption,
  color: palette.text,
  textAlign: 'right',
}
