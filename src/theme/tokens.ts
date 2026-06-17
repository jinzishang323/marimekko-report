// Marimekko Design Tokens — Revised to match original PPT

export const fonts = {
  heading: "'MariSans', sans-serif",
  body: "'MariSlab', serif",
} as const

// Font sizes — PPT 13.33"×7.5" → slide 1280×720px, 1pt PPT ≈ 1.33px
export const fontSizes = {
  // Headings (PPT: 28pt title = 37px)
  coverTitle: '2.5rem',     // ~40px — cover title
  sectionTitle: '2.25rem',  // ~36px — PART XX. on dividers
  pageTitle: '2.3rem',      // ~37px — slide titles (PPT 28pt)
  cardTitle: '1.125rem',    // ~18px — sub-headings
  // Column headers (PPT: 16pt = 21px)
  colHeader: '1.3rem',      // ~21px — table column headers
  // Body (PPT: 12-14pt = 16-19px)
  body: '0.9375rem',        // ~15px — body text (PPT 12pt)
  bodyLarge: '1.125rem',    // ~18px — emphasis body (PPT 14pt)
  bodySmall: '0.8125rem',   // ~13px — small body
  // Data
  metricLarge: '2rem',      // ~32px — big numbers
  metricMedium: '1.375rem', // ~22px — medium numbers
  metricSmall: '1rem',      // ~16px — small metrics
  // Micro (PPT: 9-11pt = 12-15px)
  caption: '0.75rem',       // ~12px — captions
  label: '0.6875rem',       // ~11px — small caps labels
  overline: '0.625rem',     // ~10px — overline text
} as const

export const spacing = {
  slidePadding: '2.5rem',
  sectionGap: '1.5rem',
  cardGap: '1.25rem',
  cardPadding: '1.25rem',
  elementGap: '0.75rem',
} as const

// Platform brand colors (from logo base colors)
export const platformColors = {
  wechat: '#07C160',   // WeChat green
  red: '#FF2442',      // Xiaohongshu red
  weibo: '#FF8200',    // Weibo orange
  douyin: '#161823',   // Douyin dark (logo base)
} as const

// Direction B palette (Iconic Botanical — olive green, pink, mustard)
export const palette = {
  name: 'Iconic Botanical',
  bg: '#FFFFFF',
  bgAlt: '#F8F6F0',       // warm off-white
  accent1: '#6B8E23',      // olive green
  accent2: '#E8A0B4',      // soft pink
  accent3: '#C49A4D',      // mustard
  text: '#1A1A1A',
  textSecondary: '#666666',
  divider: '#E0DDD5',
  highlight: '#6B8E23',
} as const
