import { SlideLayout } from '../../layouts/SlideLayout'
import { palette, fonts, fontSizes, platformColors } from '../../theme/tokens'

// Achievement Rate color logic:
// Green (≥50%) = on track / fully achieved
// Yellow (30-49%) = slightly behind but close
// Red (<30%) = significantly behind
function rateColor(rate?: string): string {
  if (!rate) return palette.textSecondary
  const num = parseFloat(rate)
  if (num >= 50) return '#2E8B57'     // green — on track
  if (num >= 30) return '#D4A017'     // yellow — slightly behind
  return '#CC4444'                     // red — significantly behind
}

interface KPIPlatform {
  platform: 'wechat' | 'red'
  followers: {
    y26Target: string; ytdTarget: string; achieved: string
    quarterlyRate: string; annuallyRate: string
  }
  engagements: {
    y26Target: string; ytdTarget: string; achieved: string
    quarterlyRate: string; annuallyRate: string
  }
}

interface DisplayPlatform {
  platform: 'weibo' | 'douyin'
  totalFollowers: string
  totalEngagements: string
}

interface TargetReviewProps {
  month: string
  kpiPlatforms: KPIPlatform[]
  displayPlatforms: DisplayPlatform[]
}

const platformLabels: Record<string, string> = {
  wechat: 'WeChat',
  red: 'RED',
  weibo: 'Weibo',
  douyin: 'Douyin',
}

function Cell({ children, bold, color, center }: {
  children: React.ReactNode; bold?: boolean; color?: string; center?: boolean
}) {
  return (
    <div style={{
      fontFamily: fonts.heading,
      fontSize: fontSizes.body,
      fontWeight: bold ? 700 : 400,
      color: color || palette.text,
      textAlign: center ? 'center' : 'right',
    }}>
      {children}
    </div>
  )
}

// Target Review — matches original PPT slide 4 structure exactly
// Section 1: WeChat + RED — full KPI table (2026 Target | YTD Target | Y26 Achieved | Achievement Rate Q/A)
// Section 2: Weibo + Douyin — side-by-side display only (no targets)
export function TargetReview({ month, kpiPlatforms, displayPlatforms }: TargetReviewProps) {
  return (
    <SlideLayout style={{ padding: '1.5rem 2.5rem', display: 'flex', flexDirection: 'column' }}>
      {/* Title — left-aligned, matching original */}
      <div style={{
        fontFamily: fonts.heading,
        fontSize: fontSizes.pageTitle,
        fontWeight: 700,
        color: palette.text,
        marginBottom: '1rem',
      }}>
        Social Media Performance – {month} Target Review
      </div>

      {/* Column headers for KPI table */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '120px 100px 100px 100px 60px 60px',
        gap: '0.75rem',
        alignItems: 'end',
        marginBottom: '0.4rem',
        paddingLeft: '0.25rem',
      }}>
        <div />
        <div style={hdrStyle}>2026 Target</div>
        <div style={hdrStyle}>YTD Target</div>
        <div style={hdrStyle}>Y26 Achieved</div>
        <div style={{ ...hdrStyle, textAlign: 'center', fontSize: fontSizes.caption }}>Quarterly</div>
        <div style={{ ...hdrStyle, textAlign: 'center', fontSize: fontSizes.caption }}>Annually</div>
      </div>

      {/* Thick divider */}
      <div style={{ width: '100%', height: 2, backgroundColor: palette.text, marginBottom: '0.25rem' }} />

      {/* Achievement Rate label spanning last 2 cols */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '120px 100px 100px 100px 120px',
        gap: '0.75rem',
        marginBottom: '0.5rem',
        paddingLeft: '0.25rem',
      }}>
        <div /><div /><div /><div />
        <div style={{
          fontFamily: fonts.heading,
          fontSize: fontSizes.overline,
          fontWeight: 700,
          color: palette.textSecondary,
          textAlign: 'center',
          letterSpacing: 0.5,
        }}>
          Achievement Rate
        </div>
      </div>

      {/* KPI Platforms — WeChat & RED with full data */}
      {kpiPlatforms.map((p) => {
        const color = platformColors[p.platform]
        return (
          <div key={p.platform} style={{ marginBottom: '0.25rem' }}>
            {/* Platform name */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: '0.35rem',
              marginTop: '0.5rem',
              paddingLeft: '0.25rem',
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: '50%',
                backgroundColor: color, flexShrink: 0,
              }} />
              <span style={{
                fontFamily: fonts.body,
                fontSize: fontSizes.bodySmall,
                fontWeight: 700,
                color,
              }}>
                {platformLabels[p.platform]}
              </span>
            </div>

            {/* Followers row */}
            <DataRow
              label="Targeted Followers"
              t2026={p.followers.y26Target}
              ytd={p.followers.ytdTarget}
              achieved={p.followers.achieved}
              qRate={p.followers.quarterlyRate}
              aRate={p.followers.annuallyRate}
            />

            {/* Engagements row */}
            <DataRow
              label="Targeted Engagements"
              t2026={p.engagements.y26Target}
              ytd={p.engagements.ytdTarget}
              achieved={p.engagements.achieved}
              qRate={p.engagements.quarterlyRate}
              aRate={p.engagements.annuallyRate}
            />

            {/* Thin divider after platform */}
            <div style={{
              width: '100%',
              height: 1,
              backgroundColor: palette.divider,
              marginTop: '0.5rem',
            }} />
          </div>
        )
      })}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Display Platforms — Weibo & Douyin side by side */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        borderTop: `2px solid ${palette.text}`,
        paddingTop: '0.75rem',
        paddingLeft: '0.25rem',
      }}>
        {displayPlatforms.map((p) => {
          const color = platformColors[p.platform]
          return (
            <div key={p.platform}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: '0.5rem',
              }}>
                <div style={{
                  width: 7, height: 7, borderRadius: '50%',
                  backgroundColor: color, flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: fonts.body,
                  fontSize: fontSizes.bodySmall,
                  fontWeight: 700,
                  color,
                }}>
                  {platformLabels[p.platform]}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
              }}>
                <div>
                  <div style={{
                    fontFamily: fonts.heading,
                    fontSize: fontSizes.metricMedium,
                    fontWeight: 700,
                    color: palette.text,
                  }}>
                    {p.totalFollowers}
                  </div>
                  <div style={{
                    fontFamily: fonts.body,
                    fontSize: fontSizes.overline,
                    color: palette.textSecondary,
                    marginTop: 2,
                  }}>
                    Total Followers
                  </div>
                </div>
                <div>
                  <div style={{
                    fontFamily: fonts.heading,
                    fontSize: fontSizes.metricMedium,
                    fontWeight: 700,
                    color: palette.text,
                  }}>
                    {p.totalEngagements}
                  </div>
                  <div style={{
                    fontFamily: fonts.body,
                    fontSize: fontSizes.overline,
                    color: palette.textSecondary,
                    marginTop: 2,
                  }}>
                    Total Engagements
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </SlideLayout>
  )
}

// Single data row for KPI table
function DataRow({ label, t2026, ytd, achieved, qRate, aRate }: {
  label: string; t2026: string; ytd: string; achieved: string
  qRate: string; aRate: string
}) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '120px 100px 100px 100px 60px 60px',
      gap: '0.75rem',
      padding: '3px 0.25rem',
      alignItems: 'baseline',
    }}>
      <div style={{
        fontFamily: fonts.body,
        fontSize: fontSizes.caption,
        color: palette.textSecondary,
      }}>
        {label}
      </div>
      <Cell>{t2026}</Cell>
      <Cell>{ytd}</Cell>
      <Cell bold>{achieved}</Cell>
      <Cell bold color={rateColor(qRate)} center>{qRate}</Cell>
      <Cell bold color={rateColor(aRate)} center>{aRate}</Cell>
    </div>
  )
}

const hdrStyle: React.CSSProperties = {
  fontFamily: fonts.heading,
  fontSize: fontSizes.colHeader,
  fontWeight: 700,
  color: palette.text,
  textAlign: 'center',
}
