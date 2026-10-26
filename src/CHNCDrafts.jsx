'use client'

// ─── CHNC section drafts ──────────────────────────────────────────────────────
// Teaser directions for the home page "What's inside CHNC?" section, rendered
// in place of the original when the URL carries ?chnc=e|f|g|h. None of them
// lists the modules (the CHNC page does that); each one only makes you want to
// open it. Earlier A–D drafts are saved in redesign-options/chnc-drafts-abcd-*.patch.

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, useTransform } from 'framer-motion'
import { PATH_FOR } from './lib/routes'
import useResponsive from './useResponsive'
import useVisualScrollProgress from './useVisualScrollProgress'
import SectionLabel from './SectionLabel'
import CHNCPlaceholder from './CHNCPlaceholder'

const CHNCDashboard = dynamic(() => import('./CHNCDashboard'), { ssr: false, loading: () => <CHNCPlaceholder /> })

const G = '#34cc32'
const DARK = '#000718'
const MUTED = 'rgba(255,255,255,0.7)'
const DIM = '#666a74'
const BORDER = 'rgba(255,255,255,0.1)'
const SAIRA = "'Saira Condensed', sans-serif"
const ARCHIVO = "'Archivo', sans-serif"

const LEDE = 'Built to find the gaps, connect the dots, and turn every opportunity into something you can actually own.'

const SECTION = { background: DARK, padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px) 0' }

function Head({ align = 'center' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : 'flex-start', gap: 10, textAlign: align }}>
      <SectionLabel>Meet CHNC</SectionLabel>
      <h2 style={{ fontFamily: SAIRA, fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1 }}>
        What's inside <span style={{ color: G }}>CHNC?</span>
      </h2>
      <p style={{ fontFamily: ARCHIVO, fontSize: 'clamp(15px, 2vw, 18px)', color: MUTED, lineHeight: 1.5, maxWidth: 640, margin: 0 }}>{LEDE}</p>
    </div>
  )
}

// Sharp green primary, the one box in a draft that isn't the dashboard frame.
function Cta({ children = 'Take the CHNC', style }) {
  return (
    <Link href={PATH_FOR.solutions} className="btn-green" style={{
      background: G, color: DARK, height: 50, padding: '0 26px',
      display: 'inline-flex', alignItems: 'center', gap: 10, boxSizing: 'border-box',
      fontFamily: SAIRA, fontSize: 17, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em',
      ...style,
    }}>
      {children}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="square" /></svg>
    </Link>
  )
}

function Dash({ module, live = false }) {
  return (
    <div style={{ width: '100%', aspectRatio: '1440 / 930', overflow: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
      <CHNCDashboard tilesTrigger={true} activeModule={module} onModuleChange={() => {}} showWorkflow={live} />
    </div>
  )
}

// ─── E · Peek ────────────────────────────────────────────────────────────────
// The invitation first (heading, line, button); below it the dashboard rises
// out of the floor, tilted back and swallowed by the dark before you see all
// of it. It straightens a little as you scroll in.
function ChncPeek() {
  const { isSmall } = useResponsive()
  const ref = useRef(null)
  const p = useVisualScrollProgress(ref, ['start 0.95', 'start 0.25'])
  const rotateX = useTransform(p, [0, 1], [34, 10])
  const scale = useTransform(p, [0, 1], [0.86, 1])
  return (
    <section style={{ ...SECTION, overflow: 'hidden' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        <Head />
        <Cta />
        <div ref={ref} style={{
          width: '100%', marginTop: 'clamp(16px, 3vw, 48px)', perspective: '1400px',
          height: isSmall ? 'auto' : 'clamp(340px, 38vw, 560px)', overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 40%, transparent 100%)', maskImage: 'linear-gradient(to bottom, #000 40%, transparent 100%)',
        }}>
          <motion.div style={{ rotateX: isSmall ? 0 : rotateX, scale: isSmall ? 1 : scale, transformOrigin: 'center top', border: `1px solid ${BORDER}`, boxShadow: '0 0 120px rgba(52,204,50,0.16)' }}>
            <Dash module="AmplifyIT" live={!isSmall} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── F · Opportunity found ───────────────────────────────────────────────────
// No dashboard: one alert, the kind CHNC raises, with the details withheld.
// Three of them take turns at the front of a small stack; the answer is
// always one click away. Alert copy is placeholder (fictional Horizon Motors).
const ALERTS = [
  { where: 'Horizon Motors · Pune', title: 'Your listings are being found, but not called.' },
  { where: 'Horizon Motors · Festive Drive', title: 'Two ad sets are paying for the same audience.' },
  { where: 'Horizon Motors · Chennai', title: "Your best creative hasn't run in Tamil yet." },
]
const ALERT_MS = 4500

function ChncAlert() {
  const { isSmall } = useResponsive()
  const [front, setFront] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setFront(v => (v + 1) % ALERTS.length), ALERT_MS)
    return () => clearInterval(t)
  }, [])
  return (
    <section style={SECTION}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: isSmall ? '1fr' : 'minmax(0, 1fr) minmax(0, 1fr)', gap: 'clamp(48px, 6vw, 96px)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 36 }}>
          <Head align="left" />
          <Cta />
        </div>
        <div style={{ position: 'relative', height: isSmall ? 300 : 360 }}>
          {ALERTS.map((a, j) => {
            const depth = (j - front + ALERTS.length) % ALERTS.length // 0 = front
            return (
              <div key={a.title} aria-hidden={depth !== 0} style={{
                position: 'absolute', left: 0, right: 0, top: 0,
                transform: `translateY(${depth * 26}px) scale(${1 - depth * 0.05})`, transformOrigin: 'center top',
                opacity: depth === 0 ? 1 : depth === 1 ? 0.55 : 0.25, zIndex: 3 - depth,
                filter: depth === 0 ? 'none' : 'blur(2px)',
                transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.7s ease, filter 0.7s ease',
                background: '#fff', color: DARK, padding: 'clamp(22px, 2.4vw, 32px)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.5)', borderTop: `3px solid ${G}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: SAIRA, fontSize: 14, fontWeight: 700, color: '#1f9a1d', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    <span className={depth === 0 ? 'chnc-alert-dot' : undefined} style={{ width: 8, height: 8, borderRadius: '50%', background: G }} />
                    Opportunity found
                  </span>
                  <span style={{ fontFamily: ARCHIVO, fontSize: 13, color: '#6b7080' }}>{a.where}</span>
                </div>
                <p style={{ fontFamily: SAIRA, fontSize: 'clamp(24px, 2.4vw, 34px)', fontWeight: 700, lineHeight: 1.1, margin: '18px 0 22px', textTransform: 'uppercase' }}>{a.title}</p>
                {/* The details, withheld: blurred stand-in lines, not real text. */}
                <div aria-hidden="true" style={{ display: 'flex', flexDirection: 'column', gap: 10, filter: 'blur(5px)' }}>
                  {[92, 78, 60].map(w => <span key={w} style={{ height: 12, width: `${w}%`, background: '#c9ccd3' }} />)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 26, paddingTop: 18, borderTop: '1px solid #e6e8ec' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: ARCHIVO, fontSize: 13, color: '#6b7080' }}>
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true"><rect x="1" y="6" width="10" height="7" stroke="currentColor" strokeWidth="1.5" /><path d="M3.5 6V4a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.5" /></svg>
                    The fix is inside CHNC
                  </span>
                  <span style={{ fontFamily: SAIRA, fontSize: 15, fontWeight: 700, textTransform: 'uppercase', color: DARK }}>See it →</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── G · Edge bleed ──────────────────────────────────────────────────────────
// Words on the left; on the right a corner of the dashboard, too big for the
// page, running off the right edge and into the dark below. You get a slice.
function ChncBleed() {
  const { isSmall } = useResponsive()
  return (
    <section style={{ ...SECTION, overflow: 'hidden' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: isSmall ? '1fr' : 'minmax(0, 0.8fr) minmax(0, 1.2fr)', gap: 'clamp(40px, 5vw, 80px)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 36, position: 'relative', zIndex: 1 }}>
          <Head align="left" />
          <Cta />
        </div>
        {/* The fade sits on the dashboard itself: a mask clips to its own box,
            so on this column it would also cut the bleed off at the right. */}
        <div style={{ position: 'relative', height: isSmall ? 300 : 600 }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: isSmall ? 760 : 1180, border: `1px solid ${BORDER}`,
            WebkitMaskImage: 'linear-gradient(to bottom, #000 42%, transparent 78%)', maskImage: 'linear-gradient(to bottom, #000 42%, transparent 78%)',
          }}>
            <Dash module="InsightIT" live={!isSmall} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── H · Poster ──────────────────────────────────────────────────────────────
// Type only. The question, split so CHNC carries the whole section in the
// green wordmark, with the tagline from the old funnel lockup under it.
function ChncPoster() {
  return (
    <section style={{ ...SECTION, overflow: 'hidden' }}>
      <div style={{ position: 'relative', maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: '18%', left: '50%', width: '70%', height: '55%', transform: 'translateX(-50%)', background: 'radial-gradient(ellipse at center, rgba(52,204,50,0.22) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <SectionLabel>Meet CHNC</SectionLabel>
        <h2 style={{ position: 'relative', margin: '18px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontFamily: SAIRA, fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1, color: '#fff' }}>What's inside</span>
          <span className="chnc-poster-mark" style={{ fontFamily: ARCHIVO, fontSize: 'clamp(120px, 24vw, 400px)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.85, marginTop: '0.04em' }}>
            CHNC<span style={{ color: '#fff', WebkitTextFillColor: '#fff' }}>?</span>
          </span>
        </h2>
        <p style={{ position: 'relative', fontFamily: ARCHIVO, fontSize: 'clamp(10px, 1.15vw, 15px)', color: DIM, letterSpacing: 'clamp(3px, 0.5vw, 7px)', textTransform: 'uppercase', marginTop: 'clamp(10px, 1.4vw, 20px)' }}>The Opportunity Creators</p>
        <p style={{ position: 'relative', fontFamily: ARCHIVO, fontSize: 'clamp(15px, 2vw, 18px)', color: MUTED, lineHeight: 1.5, maxWidth: 560, margin: 'clamp(28px, 3vw, 44px) 0 32px' }}>{LEDE}</p>
        <Cta />
      </div>
    </section>
  )
}

// ─── Switcher ────────────────────────────────────────────────────────────────
export const DRAFTS = [
  { key: null, label: 'Original' },
  { key: 'e', label: 'E · Peek' },
  { key: 'f', label: 'F · Opportunity found' },
  { key: 'g', label: 'G · Edge bleed' },
  { key: 'h', label: 'H · Poster' },
]

export function useChncDraft() {
  const [v, setV] = useState(null)
  useEffect(() => {
    const read = () => setV(new URLSearchParams(location.search).get('chnc'))
    read()
    window.addEventListener('chnc-draft', read)
    return () => window.removeEventListener('chnc-draft', read)
  }, [])
  return v
}

export function DraftSwitcher() {
  const v = useChncDraft()
  const pick = (key) => {
    const url = new URL(location.href)
    key ? url.searchParams.set('chnc', key) : url.searchParams.delete('chnc')
    history.replaceState(null, '', url)
    window.dispatchEvent(new Event('chnc-draft'))
    document.getElementById('chnc-section')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div style={{ position: 'fixed', left: 16, bottom: 16, zIndex: 1000, display: 'flex', gap: 0, border: `1px solid ${BORDER}`, background: 'rgba(0,7,24,0.92)', backdropFilter: 'blur(10px)' }}>
      <span style={{ fontFamily: SAIRA, fontSize: 13, color: DIM, padding: '10px 12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>CHNC draft</span>
      {DRAFTS.map(d => {
        const on = (d.key ?? null) === (v ?? null)
        return (
          <button key={d.label} onClick={() => pick(d.key)} style={{ background: on ? G : 'transparent', color: on ? DARK : '#fff', border: 'none', borderLeft: `1px solid ${BORDER}`, padding: '10px 14px', fontFamily: SAIRA, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{d.label}</button>
        )
      })}
    </div>
  )
}

export default function ChncDraft({ variant }) {
  if (variant === 'e') return <ChncPeek />
  if (variant === 'f') return <ChncAlert />
  if (variant === 'g') return <ChncBleed />
  if (variant === 'h') return <ChncPoster />
  return null
}
