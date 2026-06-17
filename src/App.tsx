import { SlideViewer } from './layouts/SlideViewer'
import { CoverSlide } from './components/cover/CoverSlide'
import { SectionDivider } from './components/section-divider/SectionDivider'
import { BlankContentPage } from './components/content/BlankContentPage'
import { EndSlide } from './components/end-slide/EndSlide'

const slides = [
  // Cover
  { label: 'Cover', content: <CoverSlide month="May" year="2026" /> },

  // PART 01 — Summary (colorBands)
  { label: 'Divider · Summary', content: <SectionDivider partNumber={1} sectionName="Social Media Summary" section="summary" /> },
  { label: 'Content · Summary', content: <BlankContentPage section="summary" label="Summary Content" /> },

  // PART 02 — WeChat (paskblomma)
  { label: 'Divider · WeChat', content: <SectionDivider partNumber={2} sectionName="WeChat Performance" section="wechat" /> },
  { label: 'Content · WeChat', content: <BlankContentPage section="wechat" label="WeChat Content" /> },

  // PART 03 — RED (floralRose)
  { label: 'Divider · RED', content: <SectionDivider partNumber={3} sectionName="RED Performance" section="red" /> },
  { label: 'Content · RED', content: <BlankContentPage section="red" label="RED Content" /> },

  // PART 04 — Weibo (gridSketch)
  { label: 'Divider · Weibo', content: <SectionDivider partNumber={4} sectionName="Weibo Performance" section="weibo" /> },
  { label: 'Content · Weibo', content: <BlankContentPage section="weibo" label="Weibo Content" /> },

  // PART 05 — Competitors (lineFloral)
  { label: 'Divider · Competitors', content: <SectionDivider partNumber={5} sectionName="Competitor Analysis" section="competitors" /> },
  { label: 'Content · Competitors', content: <BlankContentPage section="competitors" label="Competitor Content" /> },

  // End
  { label: 'End', content: <EndSlide /> },
]

export default function App() {
  return <SlideViewer slides={slides} />
}
