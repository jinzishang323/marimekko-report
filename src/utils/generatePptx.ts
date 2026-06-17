/**
 * generatePptx.ts
 *
 * Strategy: reconstruct each slide using pptxgenjs primitives (images + text + shapes).
 * Fonts are specified by exact PostScript family name so PowerPoint uses the
 * locally-installed Mari Sans / Mari Slab fonts on the user's Mac.
 *
 * Slide canvas: 13.33" × 7.5" (16:9 WIDE layout)
 * 1 inch = 96 CSS-px on screen (at 1× zoom).
 * Screen slide = 1280 × 720 px → 13.33" × 7.5" (ratio preserved).
 * Conversion: px → inches = px / 96
 */
import PptxGenJS from 'pptxgenjs'

// ─── Helpers ────────────────────────────────────────────────────────────────

/** px → inch (slide coordinate space) */
const px = (n: number) => parseFloat((n / 96).toFixed(4))

// Slide dimensions
const W = 13.33  // inches
const H = 7.5    // inches

// ─── Theme ──────────────────────────────────────────────────────────────────
const FONTS = {
  heading: 'Mari Sans',
  body: 'Mari Slab',
} as const

const PALETTE = {
  bg: 'FFFFFF',
  text: '1A1A1A',
  textSecondary: '666666',
  accent1: '6B8E23',   // olive green
  accent2: 'E8A0B4',   // soft pink
  accent3: 'C49A4D',   // mustard
  divider: 'E0DDD5',
} as const

// Section accent colors (hex, no #)
const SECTION_ACCENTS: Record<string, string> = {
  summary:     'C49A4D',
  wechat:      '6B8E23',
  red:         'FF2442',
  weibo:       'FF8200',
  competitors: '5B7DB1',
}

// Print image URLs (relative to public root — pptxgenjs needs absolute or data URLs)
// We'll fetch these at runtime to convert to base64
const PRINT_SRCS: Record<string, string> = {
  floralPastel: '/prints/IG_feed_w_22_1_1.jpg',  // pink bg, blue/yellow flowers
  floralRose:   '/prints/IG_feed_w_22_1_2.jpg',  // pink/maroon floral
  colorBands:   '/prints/IG_feed_w_22_1_3.jpg',  // horizontal color bands
  gridSketch:   '/prints/IG_feed_w_22_1_4.jpg',  // hand-drawn grid
  paskblomma:   '/prints/IG_feed_w_22_1_5.jpg',  // Påskblomma on olive green
  darkFloral:   '/prints/IG_feed_w_22_1_6.jpg',  // dark background flowers
  lineFloral:   '/prints/IG_feed_w_22_1_7.jpg',  // line floral
}

const SECTION_PRINTS: Record<string, string> = {
  summary:     'colorBands',
  wechat:      'paskblomma',
  red:         'floralRose',
  weibo:       'gridSketch',
  competitors: 'floralPastel',
}

const WTC_LOGO_SRC = '/wtc-logo.png'

// ─── Image fetcher ───────────────────────────────────────────────────────────

async function toBase64(url: string): Promise<string> {
  const resp = await fetch(url)
  const blob = await resp.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

// ─── Canvas cropToFit helper ─────────────────────────────────────────────────
// Replicates CSS `object-fit: cover` / `background-size: cover` for a given
// source image and target dimensions. Returns a JPEG data URL at the target size.
async function cropCover(
  src: string,
  targetW: number,
  targetH: number,
  posX = 0.5,  // 0 = left, 0.5 = center, 1 = right
  posY = 0.5,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width  = targetW
      canvas.height = targetH
      const ctx = canvas.getContext('2d')!

      const scaleW = targetW / img.naturalWidth
      const scaleH = targetH / img.naturalHeight
      const scale  = Math.max(scaleW, scaleH)

      const drawW = img.naturalWidth  * scale
      const drawH = img.naturalHeight * scale
      const drawX = (targetW - drawW) * posX
      const drawY = (targetH - drawH) * posY

      ctx.drawImage(img, drawX, drawY, drawW, drawH)
      resolve(canvas.toDataURL('image/jpeg', 0.95))
    }
    img.onerror = reject
    img.src = src
  })
}

// ─── Slide builders ──────────────────────────────────────────────────────────

/**
 * SLIDE 1 — Cover
 * Left 48%: Påskblomma print (bg-position 70% center)
 * Right 52%: White text area with labels, title, bar, logo+prepared-by
 */
async function buildCover(
  pptx: PptxGenJS,
  month: string,
  year: string,
  images: Record<string, string>,
) {
  const slide = pptx.addSlide()
  slide.background = { color: PALETTE.bg }

  // Left print panel — 48% = 6.398"
  const leftW = W * 0.48
  const printImg = await cropCover(PRINT_SRCS.paskblomma, 1280 * 0.48, 720, 0.7, 0.5)
  slide.addImage({ data: printImg, x: 0, y: 0, w: leftW, h: H })

  // Right panel starts at leftW
  const rightX = leftW
  const rightW = W - leftW

  // Content area padding: left 3rem=48px, right 3.5rem=56px, bottom 4.5rem=72px
  const textX = rightX + px(48)
  const textW = rightW - px(48 + 56)

  // Build from bottom up (all Y values measured from top of slide)
  // Bottom baseline = H - px(72)
  const bottom = H - px(72)

  // Row 1 (bottom): Logo + "YEAR · Prepared by" — height ~22px
  const preparedRowH = px(22)
  const preparedY = bottom - preparedRowH

  // WTC Logo image (height 18px, vertically centered in row)
  const wtcImg = images['wtc-logo']
  if (wtcImg) {
    slide.addImage({
      data: wtcImg,
      x: textX,
      y: preparedY + px(2),
      w: px(54),
      h: px(18),
    })
  }

  // "YEAR · Prepared by Marimekko China"
  slide.addText(`${year} · Prepared by Marimekko China`, {
    x: textX + px(64),
    y: preparedY,
    w: textW - px(64),
    h: preparedRowH,
    fontFace: FONTS.heading,
    fontSize: 7,
    bold: false,
    color: PALETTE.textSecondary,
    charSpacing: 1,
    valign: 'middle',
  })

  // Gap above prepared row: 20px
  // Row 2: Accent bar — height 3px
  const barY = preparedY - px(20) - px(3)
  slide.addShape(pptx.ShapeType.rect, {
    x: textX,
    y: barY,
    w: px(40),
    h: px(3),
    fill: { color: PALETTE.accent1 },
    line: { color: PALETTE.accent1 },
  })

  // Gap above bar: 24px
  // Row 3: Big title — 2 lines ~42px each = ~88px
  const titleH = px(92)
  const titleY = barY - px(24) - titleH
  slide.addText(`${month.toUpperCase()}\nMONTHLY REPORT`, {
    x: textX,
    y: titleY,
    w: textW,
    h: titleH,
    fontFace: FONTS.heading,
    fontSize: 28,
    bold: true,
    color: PALETTE.text,
    lineSpacingMultiple: 1.05,
    valign: 'bottom',
  })

  // Gap above title: 8px
  // Row 4: "CN Social Media" label — height ~18px
  const labelH = px(18)
  const labelY = titleY - px(8) - labelH
  slide.addText('CN Social Media', {
    x: textX,
    y: labelY,
    w: textW,
    h: labelH,
    fontFace: FONTS.heading,
    fontSize: 8,
    bold: false,
    color: PALETTE.textSecondary,
    charSpacing: 3,
    valign: 'middle',
  })
}

/**
 * SLIDE — Section Divider
 * Left 72%: White area with ghosted number + part label + section name + accent bar
 * Right 28%: Print image
 */
async function buildSectionDivider(
  pptx: PptxGenJS,
  partNumber: number,
  sectionName: string,
  section: string,
) {
  const slide = pptx.addSlide()
  slide.background = { color: PALETTE.bg }

  const printKey = SECTION_PRINTS[section]
  const accent = SECTION_ACCENTS[section]

  // Right print panel — 28% width
  const printW = W * 0.28
  const printX = W - printW

  // Determine backgroundPosition for the crop
  const cropPosX = printKey === 'paskblomma' ? 0.3 : 0.5
  const printImg = await cropCover(PRINT_SRCS[printKey], 1280 * 0.28, 720, cropPosX, 0.5)
  slide.addImage({ data: printImg, x: printX, y: 0, w: printW, h: H })

  // Left content area — vertically centered
  // Ghost number: 8rem = 128px, absolute centered ~50% - 60% transform
  // Let's place it at ~y=200 (of 720 = 2.08" of 7.5")
  const ghostNum = String(partNumber).padStart(2, '0')
  slide.addText(ghostNum, {
    x: px(48),
    y: H * 0.5 - px(100),
    w: px(400),
    h: px(150),
    fontFace: FONTS.heading,
    fontSize: 96,
    bold: true,
    color: '1A1A1A',
    transparency: 96,  // ~4% opacity = 96% transparent
    valign: 'middle',
  })

  // "PART 01." bold title
  const partW = W * 0.7
  const partLabel = `PART ${ghostNum}.`
  const textY = H / 2 - px(80)

  slide.addText(partLabel, {
    x: px(64),
    y: textY,
    w: partW - px(64),
    h: px(45),
    fontFace: FONTS.heading,
    fontSize: 24,
    bold: true,
    color: PALETTE.text,
    charSpacing: 1,
    valign: 'bottom',
  })

  // Section name (light weight, accent color)
  slide.addText(sectionName, {
    x: px(64),
    y: textY + px(45) + px(4),
    w: partW - px(64),
    h: px(45),
    fontFace: FONTS.heading,
    fontSize: 24,
    bold: false,
    color: accent,
    valign: 'top',
  })

  // Accent bar (32×3px)
  slide.addShape(pptx.ShapeType.rect, {
    x: px(64),
    y: textY + px(45 + 4 + 45 + 20),
    w: px(32),
    h: px(3),
    fill: { color: accent },
    line: { color: accent },
  })
}

/**
 * SLIDE — Content page with print border frame
 * 4-sided print border strips (28px each side) + inner light gray line + white content area
 */
async function buildContentPage(
  pptx: PptxGenJS,
  section: string,
  label: string,
) {
  const slide = pptx.addSlide()
  slide.background = { color: PALETTE.bg }

  const printKey = SECTION_PRINTS[section]
  const bw = px(28)  // border width in inches

  // Top border strip
  const topImg = await cropCover(PRINT_SRCS[printKey], 1280, 28, 0.5, 0)
  slide.addImage({ data: topImg, x: 0, y: 0, w: W, h: bw })

  // Bottom border strip
  const botImg = await cropCover(PRINT_SRCS[printKey], 1280, 28, 0.5, 1)
  slide.addImage({ data: botImg, x: 0, y: H - bw, w: W, h: bw })

  // Left border strip
  const leftImg = await cropCover(PRINT_SRCS[printKey], 28, 664, 0, 0.5)
  slide.addImage({ data: leftImg, x: 0, y: bw, w: bw, h: H - bw * 2 })

  // Right border strip
  const rightImg = await cropCover(PRINT_SRCS[printKey], 28, 664, 1, 0.5)
  slide.addImage({ data: rightImg, x: W - bw, y: bw, w: bw, h: H - bw * 2 })

  // Inner accent line (light gray, 1px)
  slide.addShape(pptx.ShapeType.rect, {
    x: bw,
    y: bw,
    w: W - bw * 2,
    h: H - bw * 2,
    fill: { type: 'none' },
    line: { color: 'CCCCCC', width: 0.5, transparency: 60 },
  })

  // Center label text (placeholder)
  if (label) {
    slide.addText(label, {
      x: bw + px(48),
      y: H / 2 - px(15),
      w: W - bw * 2 - px(96),
      h: px(30),
      fontFace: FONTS.heading,
      fontSize: 8,
      bold: false,
      color: 'D0CCC4',
      charSpacing: 2,
      align: 'center',
      valign: 'middle',
    })
  }
}

/**
 * SLIDE — End slide
 * Full-bleed Påskblomma + white overlay (60%) + centered MARIMEKKO text
 */
async function buildEndSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide()
  slide.background = { color: PALETTE.bg }

  // Full-bleed print
  const printImg = await cropCover(PRINT_SRCS.paskblomma, 1280, 720, 0.5, 0.5)
  slide.addImage({ data: printImg, x: 0, y: 0, w: W, h: H })

  // White overlay rectangle (60% opacity = 40% transparency)
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: W, h: H,
    fill: { color: 'FFFFFF', transparency: 40 },
    line: { color: 'FFFFFF', transparency: 100 },
  })

  // "MARIMEKKO" centered
  slide.addText('MARIMEKKO', {
    x: 0,
    y: H / 2 - px(50),
    w: W,
    h: px(50),
    fontFace: FONTS.heading,
    fontSize: 24,
    bold: true,
    color: PALETTE.text,
    charSpacing: 2,
    align: 'center',
    valign: 'bottom',
  })

  // "China Social Media Report"
  slide.addText('China Social Media Report', {
    x: 0,
    y: H / 2 + px(8),
    w: W,
    h: px(28),
    fontFace: FONTS.heading,
    fontSize: 7,
    bold: false,
    color: PALETTE.textSecondary,
    charSpacing: 4,
    align: 'center',
    valign: 'top',
  })
}

// ─── Main export ─────────────────────────────────────────────────────────────

export async function generatePptx(
  month = 'MAY',
  year = '2026',
  onProgress?: (msg: string) => void,
): Promise<void> {
  const log = (msg: string) => { onProgress?.(msg); console.log(msg) }

  log('Loading assets...')

  // Pre-fetch WTC logo
  const images: Record<string, string> = {}
  try {
    images['wtc-logo'] = await toBase64(WTC_LOGO_SRC)
  } catch {
    console.warn('WTC logo not found, skipping')
  }

  const pptx = new PptxGenJS()
  pptx.defineLayout({ name: 'WIDE', width: W, height: H })
  pptx.layout = 'WIDE'

  // ── Slide 1: Cover
  log('Building Cover...')
  await buildCover(pptx, month, year, images)

  // ── Slides 2–3: Summary
  log('Building Summary section...')
  await buildSectionDivider(pptx, 1, 'Social Media Summary', 'summary')
  await buildContentPage(pptx, 'summary', 'Summary Content')

  // ── Slides 4–5: WeChat
  log('Building WeChat section...')
  await buildSectionDivider(pptx, 2, 'WeChat Performance', 'wechat')
  await buildContentPage(pptx, 'wechat', 'WeChat Content')

  // ── Slides 6–7: RED
  log('Building RED section...')
  await buildSectionDivider(pptx, 3, 'RED Performance', 'red')
  await buildContentPage(pptx, 'red', 'RED Content')

  // ── Slides 8–9: Weibo
  log('Building Weibo section...')
  await buildSectionDivider(pptx, 4, 'Weibo Performance', 'weibo')
  await buildContentPage(pptx, 'weibo', 'Weibo Content')

  // ── Slides 10–11: Competitors
  log('Building Competitors section...')
  await buildSectionDivider(pptx, 5, 'Competitor Analysis', 'competitors')
  await buildContentPage(pptx, 'competitors', 'Competitor Content')

  // ── Slide 12: End
  log('Building End slide...')
  await buildEndSlide(pptx)

  log('Generating file...')
  const filename = `Marimekko_Social_Report_${month}_${year}.pptx`
  await pptx.writeFile({ fileName: filename })
  log('Done!')
}
