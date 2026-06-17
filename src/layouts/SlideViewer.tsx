import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react'
import { generatePptx } from '../utils/generatePptx'

interface SlideViewerProps {
  slides: { label: string; content: ReactNode }[]
}

const SLIDE_W = 1280
const SLIDE_H = 720

export function SlideViewer({ slides }: SlideViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showNav, setShowNav] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [pptxStatus, setPptxStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [pptxMsg, setPptxMsg] = useState('')
  const viewerRef = useRef<HTMLDivElement>(null)
  const total = slides.length

  const goTo = useCallback((idx: number) => {
    setCurrentSlide(Math.max(0, Math.min(idx, total - 1)))
  }, [total])

  const goNext = useCallback(() => goTo(currentSlide + 1), [currentSlide, goTo])
  const goPrev = useCallback(() => goTo(currentSlide - 1), [currentSlide, goTo])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev() }
      if (e.key === 'Home') { e.preventDefault(); goTo(0) }
      if (e.key === 'End') { e.preventDefault(); goTo(total - 1) }
      if (e.key === 'n') setShowNav(v => !v)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev, goTo, total])

  // Auto-fit zoom — recalculate on resize and sidebar toggle
  useEffect(() => {
    const updateZoom = () => {
      const sidebarW = showNav ? 216 : 0   // 200px sidebar + 16px padding
      const controlsH = 60                  // bottom controls area
      const pad = 48                        // padding around slide
      const availW = window.innerWidth - sidebarW - pad
      const availH = window.innerHeight - controlsH - pad
      const scaleW = availW / SLIDE_W
      const scaleH = availH / SLIDE_H
      setZoom(Math.min(scaleW, scaleH, 1))
    }
    updateZoom()
    window.addEventListener('resize', updateZoom)
    return () => window.removeEventListener('resize', updateZoom)
  }, [showNav])

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: '#1a1a1a', color: '#e0e0e0', fontFamily: "'MariSans', sans-serif" }}>
      {/* Thumbnail sidebar */}
      {showNav && (
        <div style={{ width: 200, overflowY: 'auto', padding: '8px', flexShrink: 0, borderRight: '1px solid #333' }}>
          <div style={{ fontSize: 11, color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Slides</div>
          {slides.map((slide, i) => (
            <div
              key={i}
              onClick={() => goTo(i)}
              style={{
                padding: '6px 8px',
                marginBottom: 2,
                fontSize: 11,
                borderRadius: 4,
                cursor: 'pointer',
                backgroundColor: i === currentSlide ? '#5D2943' : 'transparent',
                color: i === currentSlide ? '#fff' : '#aaa',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {i + 1}. {slide.label}
            </div>
          ))}
        </div>
      )}

      {/* Main slide area */}
      <div ref={viewerRef} style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Visible scaled slide */}
        <div style={{
          width: SLIDE_W * zoom,
          height: SLIDE_H * zoom,
          overflow: 'hidden',
        }}>
          <div style={{
            width: SLIDE_W,
            height: SLIDE_H,
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          }}>
            {slides[currentSlide]?.content}
          </div>
        </div>

        {/* Bottom controls */}
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={goPrev} disabled={currentSlide === 0} style={btnStyle}>◀</button>
          <span style={{ fontSize: 13, color: '#888', minWidth: 80, textAlign: 'center' }}>
            {currentSlide + 1} / {total}
          </span>
          <button onClick={goNext} disabled={currentSlide === total - 1} style={btnStyle}>▶</button>
          <button onClick={() => setShowNav(v => !v)} style={btnStyle} title="Toggle sidebar (N)">
            ☰
          </button>
          <button
            onClick={async () => {
              if (pptxStatus === 'loading') return
              setPptxStatus('loading')
              setPptxMsg('Loading images...')
              try {
                await generatePptx('MAY', '2026', (msg) => setPptxMsg(msg))
                setPptxStatus('done')
                setPptxMsg('Downloaded!')
                setTimeout(() => { setPptxStatus('idle'); setPptxMsg('') }, 3000)
              } catch (e) {
                setPptxStatus('error')
                setPptxMsg('Error: ' + String(e))
              }
            }}
            disabled={pptxStatus === 'loading'}
            style={{
              ...btnStyle,
              background: pptxStatus === 'loading' ? '#444' : pptxStatus === 'done' ? '#2a5a2a' : pptxStatus === 'error' ? '#5a2a2a' : '#5D2943',
              color: '#fff',
              padding: '4px 14px',
              fontWeight: 600,
              minWidth: 140,
            }}
            title="Generate & download editable PPTX"
          >
            {pptxStatus === 'loading' ? '⏳ ' + pptxMsg : pptxStatus === 'done' ? '✓ Downloaded!' : pptxStatus === 'error' ? '✗ Error' : '⬇ Download PPTX'}
          </button>
        </div>
      </div>
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  background: '#333',
  border: '1px solid #555',
  color: '#ddd',
  padding: '4px 10px',
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: 13,
}
