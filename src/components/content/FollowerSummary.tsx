import { PrintBorderLayout } from '../../layouts/PrintBorderLayout'
import { palette, fonts, fontSizes, platformColors } from '../../theme/tokens'

interface FollowerRow {
  platform: 'wechat' | 'red' | 'weibo' | 'douyin'
  label: string
  totalFollowers: number
  netIncrease: number
  viewership: number
  engagements: number
  posts: number
}

interface FollowerSummaryProps {
  month: string
  data: FollowerRow[]
}

const platformLabels: Record<string, string> = {
  wechat: 'WeChat',
  red: 'RED',
  weibo: 'Weibo',
  douyin: 'Douyin',
}

function fmt(n: number): string {
  return n.toLocaleString()
}

// Follower Summary — editorial data layout with print border
export function FollowerSummary({ month, data }: FollowerSummaryProps) {
  // Grand totals
  const totalAll = data.reduce((s, d) => s + d.totalFollowers, 0)
  const netAll = data.reduce((s, d) => s + d.netIncrease, 0)

  return (
    <PrintBorderLayout section="summary" borderWidth={28} padding={36}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Title row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '1.25rem',
        }}>
          <h1 style={{
            fontFamily: fonts.heading,
            fontSize: fontSizes.pageTitle,
            fontWeight: 700,
            color: palette.text,
            margin: 0,
          }}>
            Follower Summary
          </h1>
          <span style={{
            fontFamily: fonts.heading,
            fontSize: fontSizes.bodySmall,
            color: palette.textSecondary,
            letterSpacing: 0.5,
          }}>
            {month} 2026
          </span>
        </div>

        {/* Grand totals strip */}
        <div style={{
          display: 'flex',
          gap: '3rem',
          paddingBottom: '1rem',
          borderBottom: `2px solid ${palette.text}`,
          marginBottom: '1rem',
        }}>
          <div>
            <div style={{
              fontFamily: fonts.heading,
              fontSize: fontSizes.metricLarge,
              fontWeight: 900,
              color: palette.text,
            }}>
              {fmt(totalAll)}
            </div>
            <div style={{
              fontFamily: fonts.body,
              fontSize: fontSizes.caption,
              color: palette.textSecondary,
              marginTop: 2,
            }}>
              Total Followers
            </div>
          </div>
          <div>
            <div style={{
              fontFamily: fonts.heading,
              fontSize: fontSizes.metricLarge,
              fontWeight: 900,
              color: palette.accent1,
            }}>
              +{fmt(netAll)}
            </div>
            <div style={{
              fontFamily: fonts.body,
              fontSize: fontSizes.caption,
              color: palette.textSecondary,
              marginTop: 2,
            }}>
              Net Growth
            </div>
          </div>
        </div>

        {/* Platform rows */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {data.map((row, idx) => {
            const color = platformColors[row.platform]
            return (
              <div key={row.platform} style={{
                display: 'grid',
                gridTemplateColumns: '110px 1fr 1fr 1fr 1fr',
                gap: '1.5rem',
                padding: '0.75rem 0',
                borderBottom: idx < data.length - 1 ? `1px solid ${palette.divider}` : 'none',
                alignItems: 'baseline',
              }}>
                {/* Platform */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}>
                  <div style={{
                    width: 7, height: 7, borderRadius: '50%',
                    backgroundColor: color, flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: fonts.body,
                    fontSize: fontSizes.body,
                    fontWeight: 700,
                    color,
                  }}>
                    {platformLabels[row.platform]}
                  </span>
                </div>

                {/* Followers */}
                <div>
                  <div style={{
                    fontFamily: fonts.heading,
                    fontSize: fontSizes.metricMedium,
                    fontWeight: 700,
                    color: palette.text,
                  }}>
                    {fmt(row.totalFollowers)}
                  </div>
                  <div style={metricLabelStyle}>Total Followers</div>
                </div>

                {/* Net growth */}
                <div>
                  <div style={{
                    fontFamily: fonts.heading,
                    fontSize: fontSizes.metricMedium,
                    fontWeight: 700,
                    color: palette.accent1,
                  }}>
                    +{fmt(row.netIncrease)}
                  </div>
                  <div style={metricLabelStyle}>Net Growth</div>
                </div>

                {/* Viewership */}
                <div>
                  <div style={{
                    fontFamily: fonts.heading,
                    fontSize: fontSizes.metricMedium,
                    fontWeight: 700,
                    color: palette.text,
                  }}>
                    {fmt(row.viewership)}
                  </div>
                  <div style={metricLabelStyle}>Viewership</div>
                </div>

                {/* Engagements */}
                <div>
                  <div style={{
                    fontFamily: fonts.heading,
                    fontSize: fontSizes.metricMedium,
                    fontWeight: 700,
                    color: palette.text,
                  }}>
                    {fmt(row.engagements)}
                  </div>
                  <div style={metricLabelStyle}>Engagements</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </PrintBorderLayout>
  )
}

const metricLabelStyle: React.CSSProperties = {
  fontFamily: fonts.body,
  fontSize: fontSizes.caption,
  color: palette.textSecondary,
  marginTop: 2,
}
