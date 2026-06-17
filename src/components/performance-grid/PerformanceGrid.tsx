import { SlideLayout } from '../../layouts/SlideLayout'
import { palette, fonts, fontSizes, platformColors } from '../../theme/tokens'

interface PlatformKPI {
  platform: 'wechat' | 'red' | 'weibo' | 'douyin'
  totalFollowers: number
  followerNetIncrease: number
  viewership: number
  totalEngagements: number
  numberOfPosts: number
}

interface PerformanceGridProps {
  data: PlatformKPI[]
}

const platformLabels: Record<string, string> = {
  wechat: 'WeChat',
  red: 'RED',
  weibo: 'Weibo',
  douyin: 'Douyin',
}

function formatNum(n: number): string {
  return n.toLocaleString()
}

// Performance Overview — 3-column grid with image placeholders + metrics
// Matches original PPT slide 3 layout
export function PerformanceGrid({ data }: PerformanceGridProps) {
  // Only show first 3 platforms (WeChat, RED, Weibo) in the overview grid
  // Douyin is shown in Target Review only (as per original PPT)
  const gridData = data.filter(d => d.platform !== 'douyin')

  return (
    <SlideLayout style={{ padding: 0 }}>
      {/* Title — centered, matching original pos=(2.0,0.6) */}
      <div style={{
        fontFamily: fonts.heading,
        fontSize: fontSizes.pageTitle,
        fontWeight: 700,
        color: palette.text,
        textAlign: 'center',
        paddingTop: '1.5rem',
        paddingBottom: '1.25rem',
      }}>
        Social Media Performance Overview
      </div>

      {/* 3-column platform grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        padding: '0 2rem',
        height: 'calc(100% - 5rem)',
      }}>
        {gridData.map((item) => {
          const color = platformColors[item.platform]
          return (
            <div key={item.platform} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}>
              {/* Platform label + color dot */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 2,
              }}>
                <div style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  backgroundColor: color,
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: fonts.heading,
                  fontSize: fontSizes.body,
                  fontWeight: 700,
                  color: palette.text,
                }}>
                  {platformLabels[item.platform]}
                </span>
              </div>

              {/* Screenshot placeholder — represents the platform profile screenshots */}
              <div style={{
                flex: 1,
                backgroundColor: '#F5F3ED',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${palette.divider}`,
                minHeight: '200px',
              }}>
                <div style={{
                  fontFamily: fonts.heading,
                  fontSize: fontSizes.caption,
                  color: '#BBB',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}>
                  Screenshot
                </div>
                <div style={{
                  fontFamily: fonts.body,
                  fontSize: fontSizes.overline,
                  color: '#CCC',
                  marginTop: 4,
                }}>
                  {platformLabels[item.platform]} Profile
                </div>
              </div>

              {/* Key metrics strip below screenshot */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
              }}>
                <div>
                  <div style={{
                    fontFamily: fonts.heading,
                    fontSize: fontSizes.metricMedium,
                    fontWeight: 900,
                    color: palette.text,
                    lineHeight: 1.1,
                  }}>
                    {formatNum(item.totalFollowers)}
                  </div>
                  <div style={{
                    fontFamily: fonts.body,
                    fontSize: fontSizes.overline,
                    color: palette.textSecondary,
                    marginTop: 1,
                  }}>
                    Total Followers
                  </div>
                </div>
                <div>
                  <div style={{
                    fontFamily: fonts.heading,
                    fontSize: fontSizes.metricMedium,
                    fontWeight: 900,
                    color: palette.text,
                    lineHeight: 1.1,
                  }}>
                    {formatNum(item.totalEngagements)}
                  </div>
                  <div style={{
                    fontFamily: fonts.body,
                    fontSize: fontSizes.overline,
                    color: palette.textSecondary,
                    marginTop: 1,
                  }}>
                    Engagements
                  </div>
                </div>
              </div>

              {/* Secondary metrics */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: `1px solid ${palette.divider}`,
                paddingTop: '0.5rem',
              }}>
                {[
                  ['Net +', formatNum(item.followerNetIncrease)],
                  ['Views', formatNum(item.viewership)],
                  ['Posts', String(item.numberOfPosts)],
                ].map(([label, value]) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: fonts.heading,
                      fontSize: fontSizes.metricSmall,
                      fontWeight: 700,
                      color: palette.text,
                    }}>
                      {value}
                    </div>
                    <div style={{
                      fontFamily: fonts.body,
                      fontSize: fontSizes.overline,
                      color: palette.textSecondary,
                      marginTop: 1,
                    }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </SlideLayout>
  )
}
