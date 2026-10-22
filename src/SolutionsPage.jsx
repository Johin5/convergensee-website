'use client'

// Solutions Page — built from Figma node 1:1559 (Landing Page - Dark-Solution)
import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import useResponsive from './useResponsive'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'
import CHNCPlaceholder from './CHNCPlaceholder'
import SectionLabel from './SectionLabel'
import AuditForm, { AuditTakeover } from './AuditForm'

import Footer from './Footer'

const CHNCDashboard = dynamic(() => import('./CHNCDashboard'), { ssr: false, loading: () => <CHNCPlaceholder /> })

const G     = '#34cc32'
const DARK  = '#000718'
const CARD  = '#0f1520'
const MUTED = 'rgba(255,255,255,0.7)'
const DIM   = '#666a74'
const BORDER = 'rgba(255,255,255,0.1)'

// ─── Figma assets ─────────────────────────────────────────────────────────────

// ─── Shared atoms ─────────────────────────────────────────────────────────────
const BtnOutline = ({ children, style, active, onClick, ...p }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <button {...p}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'transparent',
        color: (active || hovered) ? G : '#fff',
        border: `1px solid ${active ? G : hovered ? 'rgba(52,204,50,0.5)' : 'rgba(255,255,255,0.15)'}`,
        height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', fontFamily: "'Saira Condensed', sans-serif",
        fontSize: 16, fontWeight: (active || hovered) ? 700 : 500,
        textTransform: 'uppercase', letterSpacing: '0.02em',
        cursor: 'pointer', backdropFilter: 'blur(10px)',
        transition: 'all 0.2s ease',
        transform: hovered && !active ? 'scale(1.02)' : 'scale(1)',
        ...style,
      }}>{children}</button>
  )
}
const Pill = ({ label, active, onClick }) => (
  <div className={`pill-hover chnc-module${active ? ' is-active' : ''}`} onClick={onClick} style={{
    height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', backdropFilter: 'blur(10px)',
    background: CARD, cursor: 'pointer',
    border: active ? `1px solid ${G}` : 'none',
    fontFamily: "'Saira Condensed', sans-serif",
    fontSize: 16, fontWeight: active ? 700 : 500,
    color: active ? G : DIM,
    transition: 'all 0.2s ease',
  }}>{label}</div>
)

// ─── Sections ─────────────────────────────────────────────────────────────────
// Survives client-side route changes (module scope), resets on a full reload.
let heroIntroSeen = false

function Hero() {
  // Intro sequence: CHNC starts at hero scale over the headline's spot, then
  // glides up and shrinks into a small green eyebrow label while the headline
  // wipes in beneath it (same clip-path reveal as the About hero). The
  // eyebrow holds for a beat, then fades away at ~4s leaving the headline
  // alone. It sits in a fixed-height slot so the headline never moves.
  // Plays once per page load: marked seen once the headline has wiped in
  // (~2s), so coming back via in-site navigation renders the settled
  // headline with no animation. The flag is module state, not storage, so a
  // reload starts fresh and replays the intro.
  const [morphed, setMorphed] = useState(false)
  const [faded, setFaded] = useState(false)
  const [skipped, setSkipped] = useState(false)
  useIsomorphicLayoutEffect(() => {
    if (heroIntroSeen) {
      setSkipped(true); setMorphed(true); setFaded(true)
      return
    }
    const t1 = setTimeout(() => setMorphed(true), 600)
    const t2 = setTimeout(() => { heroIntroSeen = true }, 2000)
    const t3 = setTimeout(() => setFaded(true), 4000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <section style={{
      // 100vh isn't compensated by the laptop-scale body zoom — divide by --pz
      // so the hero still covers the full screen on 1025–1727px viewports.
      position: 'relative', height: 'calc(100vh / var(--pz, 1))', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', textAlign: 'center',
      background: DARK, padding: '0 clamp(20px, 6vw, 100px)',
    }}>
      {/* Background video slot — CHNC showreel, same markup as the home hero:
          <video autoPlay muted loop playsInline preload="metadata" poster="/chnc-hero-poster.webp"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}>
            <source src="/chnc-hero.mp4" type="video/mp4" />
          </video> */}

      {/* Dark overlays for text readability over the video */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          linear-gradient(to bottom, ${DARK} 0%, rgba(0,7,24,0.2) 40%, rgba(0,7,24,0.2) 60%, ${DARK} 100%),
          linear-gradient(to right, ${DARK} 0%, transparent 30%, transparent 70%, ${DARK} 100%)
        `,
        zIndex: 1,
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Fixed-height slot the wordmark shrinks into — the slot, not the
            animating text, is what the headline's position is laid out
            against, so nothing below shifts mid-animation. */}
        <div style={{
          height: 'clamp(24px, 2.6vw, 36px)', marginBottom: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'visible',
        }}>
          {/* stays the tight-tracked CHNC wordmark at every size — only the
              font-size and position animate */}
          <p className="chnc-hero-eyebrow" style={{
            fontFamily: "'Archivo', sans-serif", fontWeight: 800, lineHeight: 1,
            color: G, margin: 0, whiteSpace: 'nowrap', letterSpacing: '-0.022em',
            fontSize: morphed ? 'clamp(24px, 2.6vw, 36px)' : 'clamp(56px, 10vw, 150px)',
            transform: morphed ? 'none' : 'translateY(clamp(90px, 12vw, 175px))',
            opacity: faded ? 0 : 1,
            transition: skipped ? 'none' : 'font-size 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease',
            textShadow: '0 2px 24px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.6)',
          }}>CHNC</p>
        </div>

        {/* the headline CHNC introduces — same 150px cap as the other hero
            h1s; 10vw (not 14vw) so the long first line fits at laptop widths.
            Wipes in left→right like the About hero's word reveal. */}
        <h1 className="chnc-hero-title" style={{
          fontFamily: "'Saira Condensed', sans-serif",
          fontSize: 'clamp(56px, 10vw, 150px)', fontWeight: 800, lineHeight: 1,
          textTransform: 'uppercase', margin: 0, letterSpacing: '-3px',
          clipPath: morphed ? 'inset(-5% -2% -5% -2%)' : 'inset(-5% 102% -5% -2%)',
          transition: skipped ? 'none' : 'clip-path 0.9s cubic-bezier(0.77, 0, 0.175, 1) 0.5s',
          textShadow: '0 2px 24px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.6)',
        }}>
          <span style={{ display: 'block' }}>
            <span style={{ color: '#fff' }}>ENTERPRISE </span>
            <span style={{ color: G }}>MARKETING</span>
          </span>
          <span style={{ display: 'block', color: G }}>PLATFORM</span>
        </h1>
      </div>
    </section>
  )
}

// Module pills — first thing after the full-screen hero; they drive which
// module the sections below show.
function ModulePills({ active, onSelect }) {
  const services = ['InsightIT','LocateIT','CreateIT','AmplifyIT','SocialiseIT','InfluenceIT','ScriptIT','AIgenIT','SearchIT','InvoiceIT','AdaptIT','EngageIT','ConvergeIT']
  return (
    <section className="chnc-modules" style={{
      padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px) 0',
      display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap',
    }}>
      {services.map((l) => (
        <Pill key={l} label={l} active={l === active} onClick={() => onSelect(l)} />
      ))}
    </section>
  )
}

const MODULE_STEPS = {
  LocateIT: [
    { bold: 'Audit', rest: ' listings to find duplicates, wrong entries, and fake listings' },
    { bold: 'Centralise', rest: ' all store info in one dashboard' },
    { bold: 'Standardise', rest: ' every listing for accuracy and visibility' },
    { bold: 'Optimise', rest: ' listings and pages using local SEO best practices' },
    { stat: true, text: '10 stores or 10,000: one dashboard' },
  ],
  SearchIT: [
    { bold: 'Analyse', rest: ' your content to find SEO and GEO gaps' },
    { bold: 'Audit', rest: ' UI/UX to improve user experience and engagement' },
    { bold: 'Check', rest: ' your tech stack for crawlability and performance' },
    { bold: 'Give', rest: ' a clear improvement roadmap' },
    { bold: 'Track', rest: ' results continuously and adapt strategy' },
  ],
  AIgenIT: [
    { bold: 'Enable', rest: ' human-like conversations in multiple languages' },
    { bold: 'Adapt', rest: ' responses to your brand, industry, and cultural context' },
    { bold: 'Handle', rest: ' multiple users in real time' },
    { bold: 'Build', rest: ' intent-led dialogues' },
    { bold: 'Integrate', rest: ' with CRM, APIs, and dashboards for insights' },
  ],
  CreateIT: [
    { bold: 'Brief', rest: ' the campaign: name, platform, region, objective' },
    { bold: 'Generate', rest: ' visuals with multiple AI engines in seconds' },
    { bold: 'Approve', rest: ' visuals and AI copy in one click' },
    { bold: 'Adapt', rest: ' one creative to every format and language' },
    { bold: 'Publish', rest: ' everywhere and track performance' },
    { stat: true, text: '60% reduction in content creation time' },
  ],
  ScriptIT: [
    { bold: 'Generate', rest: ' scripts and storyboards using AI' },
    { bold: 'Add', rest: ' shot-by-shot breakdowns with brand nuance' },
    { bold: 'Reuse', rest: ' proven formats via a script library' },
    { bold: 'Use', rest: ' smart camera/audio suggestions for better output' },
    { bold: 'Deliver', rest: ' shoot-ready scripts for faster production' },
  ],
  InfluenceIT: [
    { bold: 'Discover', rest: ' and analyse creators using AI' },
    { bold: 'Score', rest: ' creator–brand fit and align goals' },
    { bold: 'Auto-generate', rest: ' scripts and storyboards' },
    { bold: 'Convert', rest: ' scripts into reels with AI production' },
    { bold: 'Track', rest: ' ROI live through CHNC dashboards' },
  ],
  SocialiseIT: [
    { bold: 'Pick', rest: ' every location page: one selection' },
    { bold: 'Compose', rest: ' once: approved creative, caption, live preview' },
    { bold: 'Schedule', rest: ' one post to every page, same moment' },
    { bold: 'Measure', rest: ' Facebook + Instagram in one dashboard' },
    { stat: true, text: 'One post → every page. Zero rogue posts' },
  ],
  AmplifyIT: [
    { bold: 'Plan', rest: ' campaigns across paid and organic media' },
    { bold: 'Gather', rest: ' inputs and requirements across teams' },
    { bold: 'Create', rest: ' variations and adapt designs quickly' },
    { bold: 'Publish', rest: ' across channels and measure performance' },
    { bold: 'Optimise', rest: ' continuously to improve engagement and outcomes' },
  ],
  InvoiceIT: [
    { bold: 'Capture', rest: ' all digital marketing spends in one place' },
    { bold: 'Automate', rest: ' invoicing and reconciliation' },
    { bold: 'Match', rest: ' payments to deliverables clearly' },
    { bold: 'Maintain', rest: ' compliance-ready financial records' },
    { bold: 'Link', rest: ' spends directly to marketing ROI' },
  ],
  InsightIT: [
    { bold: 'Consolidate', rest: ' every module into one global view: budget, spend, regions' },
    { bold: 'Measure', rest: ' local presence: visibility, accuracy, reviews by region' },
    { bold: 'Track', rest: ' social and paid: reach, CPL, and leads, platform by platform' },
    { bold: 'Reveal', rest: ' what happens on your pages: sessions, conversions, peak hours' },
    { bold: 'Export', rest: ' everything: all locations, any period, one click' },
  ],
  AdaptIT: [
    { bold: 'Analyse', rest: ' each market or region for language, culture, and platform norms' },
    { bold: 'Adapt', rest: ' messaging, visuals, and offers to fit local context' },
    { bold: 'Localise', rest: ' pricing, formats, and compliance requirements automatically' },
    { bold: 'Roll out', rest: ' region-specific versions across all active channels' },
  ],
  EngageIT: [
    { bold: 'Track', rest: ' customer touchpoints across every channel in real time' },
    { bold: 'Trigger', rest: ' personalised follow-ups based on behaviour and intent' },
    { bold: 'Automate', rest: ' replies, nudges, and re-engagement sequences' },
    { bold: 'Segment', rest: ' audiences by engagement level and lifecycle stage' },
    { bold: 'Measure', rest: ' retention, repeat actions, and engagement lift over time' },
  ],
  // authored — the client doc has no ConvergeIT steps; drafted pending sign-off
  ConvergeIT: [
    { bold: 'Connect', rest: ' every agency you work with into one CHNC dashboard' },
    { bold: 'Standardise', rest: " reporting so every partner's numbers read the same way" },
    { bold: 'Compare', rest: ' spend, leads, and ROI side by side across agencies' },
    { bold: 'Spot', rest: ' overlaps, gaps, and underperformance early' },
    { bold: 'Reallocate', rest: " budgets to what's actually working" },
  ],
}
const DEFAULT_STEPS = [
  { bold: 'Plan', rest: ' your strategy and set clear objectives' },
  { bold: 'Execute', rest: ' with precision using our platform tools' },
  { bold: 'Analyse', rest: ' results with real-time data and insights' },
  { bold: 'Optimise', rest: ' continuously for maximum performance' },
  { stat: true, text: 'Measurable results from day one' },
]

// Per-module IMPACT line (client doc: "IMPACT for each to show at the bottom
// of the dashboard image") — the caption under the How-we-do-IT dashboard.
const MODULE_IMPACT = {
  InsightIT: 'One dashboard, every metric, every channel, no more stitching reports together.',
  LocateIT: "See every location's performance, reviews, and ranking live, in one dashboard.",
  CreateIT: 'Track every asset in production: status, approvals and delays without chasing anyone.',
  AmplifyIT: "Track exactly where every rupee is going and what it's returning, in real time.",
  SocialiseIT: 'See engagement across every platform in one view, instead of switching between apps.',
  InfluenceIT: 'See real ROI per creator, not just views and likes, in one dashboard.',
  ScriptIT: "Create and track which scripts perform, which don't, and why, all in one place.",
  AIgenIT: 'See every conversation, every language, every response time, all from one screen.',
  SearchIT: 'Track your search visibility and ranking gaps as they happen.',
  InvoiceIT: 'See every spend, every invoice, every campaign cost, fully reconciled and audit-ready.',
  AdaptIT: 'See every platform version of an asset, and how each one is performing.',
  EngageIT: "Track every cohort's response and retention, without digging through separate tools.",
  ConvergeIT: "See every agency's performance side by side, without chasing five different partners for updates.",
}

// For modules with a dashboard reel: how many rail boxes are visible during each
// reel frame (index = frame reported by CHNCDashboard). Keeps the rail locked to
// the reel's own timeline — including its loop restarts. Modules absent here
// have static dashboard content and use the fixed fallback cadence instead.
const REEL_FRAME_STEPS = {
  // Overview  LPM  Social  Perf  LPG  Export  Close
  InsightIT: [1, 2, 3, 3, 4, 5, 5],
  // idle  Brief  Generate  Approve  Adapt  Publish  Close
  CreateIT: [0, 1, 2, 3, 4, 5, 6],
  // idle  Create  Audit  Manage  Verify  GoLive  Optimise  Perform  Close
  LocateIT: [0, 0, 1, 2, 3, 3, 4, 4, 5, 5],
  // idle  Brief  Align  Script  Breakdown  Preview  Approve  Close
  ScriptIT: [0, 1, 1, 2, 3, 4, 5, 5, 5],
  // idle  Build  Ground  Test  Capture  Close
  AIgenIT: [0, 1, 2, 4, 5, 5],
  // idle  Pick  Compose  Schedule  Measure  Close
  SocialiseIT: [0, 1, 2, 3, 4, 5],
  // idle  Platform  Objective  AdSet  Ad  Manage  Insight  Close
  AmplifyIT: [0, 1, 2, 2, 3, 4, 5, 5],
}

// Small screens (≤1024px) and reduced-motion users get the CHNC page without
// the dashboard reels: static module views and the full workflow list. null
// until mounted, so the reel never mounts for a frame before we know.
const STATIC_QUERY = '(max-width: 1024px), (prefers-reduced-motion: reduce)'
function useStaticChnc() {
  const [isStatic, setIsStatic] = useState(null)
  useEffect(() => {
    const mq = window.matchMedia(STATIC_QUERY)
    const update = () => setIsStatic(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isStatic
}

// Static counterpart of WorkflowStack: every step visible, no reveal.
function WorkflowList({ steps }) {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {s.stat ? (
            <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, fontSize: 24, color: G, lineHeight: '28px', margin: '8px 0 0', textAlign: 'center' }}>
              {s.text}
            </p>
          ) : (
            <div style={{ width: '100%', boxSizing: 'border-box', minHeight: 68, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14, border: `1px solid ${G}` }}>
              <div style={{ width: 6, height: 6, flexShrink: 0, background: G }} />
              <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: MUTED, lineHeight: '20px', margin: 0 }}>
                <strong style={{ color: '#fff' }}>{s.bold}</strong>{s.rest}
              </p>
            </div>
          )}
          {i < steps.length - 1 && !s.stat && !steps[i + 1].stat && (
            <div style={{ width: 1.5, height: 28, background: G }} />
          )}
        </div>
      ))}
    </div>
  )
}

function WorkflowStack({ steps, count }) {
  const { isSmall } = useResponsive()
  const CARD_H = 68, GAP = 28, SLOT = CARD_H + GAP, PEEK = 18, MAX_VIS = 4

  const stackedN = Math.max(0, count - MAX_VIS)

  // In the small-screen column layout, `flex: 1` resolves to a 0-height flex
  // basis and collapses the stack — give it a fixed height + full width there.
  return (
    <div style={isSmall
      ? { width: '100%', flexShrink: 0, height: 540, position: 'relative', overflow: 'hidden' }
      : { flex: 1, height: 540, position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes growW { from { width: 0 } to { width: 50% } }
        @keyframes growH { from { height: 0 } to { height: 100% } }
        @keyframes growConn { from { height: 0 } to { height: ${GAP}px } }
        @keyframes revealConn { from { clip-path: inset(0 0 100% 0) } to { clip-path: inset(0 0 0% 0) } }
      `}</style>

      {steps.map((s, i) => {
        const visible = i < count
        const stacked = i < stackedN

        let top, scale, opacity
        if (!visible) {
          // Hidden — sit at natural position, invisible
          top = i * SLOT
          scale = 0.93
          opacity = 0
        } else if (stacked) {
          // Stacked at top — transparent, only last stacked card shows text
          top = i * PEEK
          scale = 0.88 + i * 0.02
          opacity = 0.15 + i * 0.06
        } else {
          // Visible in main area
          const stackH = stackedN > 0 ? (stackedN - 1) * PEEK + CARD_H + 16 : 0
          const visIdx = i - stackedN
          top = stackH + visIdx * SLOT
          scale = 1
          opacity = 1
        }

        const isStat = !!s.stat

        return (
          <div key={i} style={{
            position: 'absolute', left: 0, right: 0,
            top, height: CARD_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            opacity,
            zIndex: i,
            transition: 'top 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease',
          }}>
            {/* Card body */}
            <div style={{
              background: 'transparent',
              height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
              display: 'flex', alignItems: 'center', justifyContent: isStat ? 'center' : 'flex-start', gap: 14,
              height: '100%', boxSizing: 'border-box',
              transition: 'background 0.4s ease',
            }}>
              {isStat ? (
                <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, fontSize: isSmall ? 24 : 32, color: G, lineHeight: isSmall ? '28px' : '36px', margin: 0, textAlign: 'center' }}>
                  {s.text}
                </p>
              ) : (
                <>
                  <div style={{ width: 6, height: 6, flexShrink: 0, background: G, opacity: stacked && i < stackedN - 1 ? 0 : 1, transition: 'opacity 0.3s ease' }} />
                  <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: '20px', margin: 0, opacity: stacked && i < stackedN - 1 ? 0 : 1, transition: 'opacity 0.3s ease' }}>
                    <strong style={{ color: '#fff' }}>{s.bold}</strong>{s.rest}
                  </p>
                </>
              )}
            </div>

            {/* Border draw — only for non-stat cards */}
            {visible && !isStat && (
              <div key={`border-${i}`} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                {/* Full border — visible when NOT an older stacked card, delayed fade to match stacking transition */}
                <div style={{ opacity: stacked && i < stackedN - 1 ? 0 : 1, transition: 'opacity 0.4s ease 0.6s' }}>
                  <div style={{ position: 'absolute', top: 0, right: '50%', height: 1, background: G, width: 0, animation: 'growW 0.2s ease forwards 0s' }} />
                  <div style={{ position: 'absolute', top: 0, left: '50%', height: 1, background: G, width: 0, animation: 'growW 0.2s ease forwards 0s' }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, width: 1, background: G, height: 0, animation: 'growH 0.25s ease forwards 0.2s' }} />
                  <div style={{ position: 'absolute', top: 0, right: 0, width: 1, background: G, height: 0, animation: 'growH 0.25s ease forwards 0.2s' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, height: 1, background: G, width: 0, animation: 'growW 0.2s ease forwards 0.45s' }} />
                  <div style={{ position: 'absolute', bottom: 0, right: 0, height: 1, background: G, width: 0, animation: 'growW 0.2s ease forwards 0.45s' }} />
                </div>
                {/* Stacked indicator — top line + short side stubs, only when older stacked */}
                {stacked && i < stackedN - 1 && (
                  <div style={{ opacity: 1 }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: G }} />
                    <div style={{ position: 'absolute', top: 0, left: 0, width: 1, height: PEEK, background: G }} />
                    <div style={{ position: 'absolute', top: 0, right: 0, width: 1, height: PEEK, background: G }} />
                  </div>
                )}
              </div>
            )}

            {/* Connector line — drawn only once the NEXT card starts revealing */}
            {i + 1 < count && !stacked && i < steps.length - 1 && !steps[i].stat && (
              <div key={`conn-${i}`} style={{
                position: 'absolute', top: CARD_H, left: '50%',
                transform: 'translateX(-50%)',
                width: 1.5, height: GAP,
                background: G,
                clipPath: 'inset(0 0 100% 0)',
                animation: `revealConn 0.3s ease forwards`,
                pointerEvents: 'none',
              }} />
            )}
          </div>
        )
      })}

    </div>
  )
}

function HowWeDoIt({ activeModule }) {
  const { isSmall } = useResponsive()
  const dashRef = useRef(null)
  const steps = MODULE_STEPS[activeModule] || DEFAULT_STEPS
  const [stepCount, setStepCount] = useState(0)
  const [inView, setInView] = useState(false)
  const isStatic = useStaticChnc()

  // Only start animation when dashboard is visible on screen
  useEffect(() => {
    if (!dashRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.5 }
    )
    observer.observe(dashRef.current)
    return () => observer.disconnect()
  }, [])

  // Reel-driven modules: the dashboard reel reports its frame and the rail
  // follows it. When one frame reveals several boxes, stagger them 600ms apart;
  // a target lower than the current count means the reel looped — snap back.
  const railTarget = useRef(0)
  const railStagger = useRef(null)
  const frameMap = REEL_FRAME_STEPS[activeModule]
  const handleFrame = useCallback(frame => {
    const map = REEL_FRAME_STEPS[activeModule]
    if (!map) return
    const target = map[Math.min(frame, map.length - 1)]
    railTarget.current = target
    clearInterval(railStagger.current)
    setStepCount(c => (target < c ? target : c < target ? c + 1 : c))
    railStagger.current = setInterval(() => {
      setStepCount(c => (c < railTarget.current ? c + 1 : c))
    }, 600)
  }, [activeModule])
  useEffect(() => () => clearInterval(railStagger.current), [])

  // Static modules (no reel) fall back to a fixed reveal cadence once in view
  useEffect(() => {
    if (frameMap && !isStatic) return
    clearInterval(railStagger.current)
    railTarget.current = 0
    setStepCount(0)
    if (!inView || isStatic !== false) return
    // Per-step reveal durations (ms); falls back to 3000 past the end
    const durations = [3000, 4000, 3500, 3000, 4000, 3000, 3500, 2000]
    let c = 0
    let timer
    const advance = () => {
      c++
      if (c > steps.length) return
      setStepCount(c)
      timer = setTimeout(advance, durations[c] || 3000)
    }
    timer = setTimeout(advance, durations[0] || 3000)
    return () => clearTimeout(timer)
  }, [steps, inView, frameMap, isStatic])

  return (
    <section style={{ padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px) 0', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
      {/* 31 Aug brief: the generic "How we do IT?" heading is replaced by the
          active solution's own name — "IT" keeps the brand green. */}
      <h2 style={{
        fontFamily: "'Saira Condensed', sans-serif",
        fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800, lineHeight: 1,
        textTransform: 'none', textAlign: 'center', margin: 0,
      }}>
        <span style={{ color: '#fff' }}>{activeModule.replace(/IT$/, '')}</span>
        <span style={{ color: G }}>IT</span>
      </h2>

      <div style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', gap: 50, alignItems: 'center', width: '100%', maxWidth: 1240 }}>
        {/* CHNC Dashboard */}
        <div ref={dashRef} style={{ width: isSmall ? '100%' : 836, maxWidth: 836, height: isStatic ? undefined : isSmall ? 'clamp(300px, 60vw, 540px)' : 540, aspectRatio: isStatic ? '1440 / 930' : undefined, flexShrink: 0, borderRadius: 8, overflow: 'hidden', boxShadow: '0 0 0 1px rgba(52,204,50,0.2), 0 20px 60px rgba(0,0,0,0.6)' }}>
          {isStatic === null
            ? <CHNCPlaceholder />
            : <CHNCDashboard tilesTrigger={true} activeModule={activeModule} onModuleChange={() => {}} stepCount={stepCount} showWorkflow={!isStatic} staticMode={isStatic} onFrame={handleFrame} />}
        </div>

        {/* Workflow node canvas — Android recents stacking; a plain list when static */}
        {isStatic ? <WorkflowList steps={steps} /> : <WorkflowStack steps={steps} count={stepCount} />}
      </div>

      <p key={activeModule} style={{
        fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: '#fff',
        lineHeight: '24px', textAlign: 'center', maxWidth: 804,
      }}>
        {MODULE_IMPACT[activeModule] || 'What happens after you choose a module, step by step.'}
      </p>
    </section>
  )
}

// What each module needs from the brand to get started — shown for whichever
// module pill is active.
const FROM_BRAND = {
  LocateIT: [
    'Store/location database (addresses, contacts, branches)',
    'Access to Google Business Profiles / listing platforms',
    'Brand guidelines for listings & information standardisation',
  ],
  SearchIT: [
    'Website analytics access',
    'Keyword priorities & business focus areas',
    'Competitor benchmarks or market context',
  ],
  AIgenIT: [
    'Product/service FAQs & knowledge base',
    'CRM/CMS access for lead or conversation sync',
    'Language & geography priorities',
  ],
  CreateIT: [
    'Brand briefs, objectives & guidelines',
    'Approved design references & tone of voice',
    'Content formats, channels & publishing needs',
  ],
  ScriptIT: [
    'Campaign brief & communication objectives',
    'Brand tone, messaging & guardrails',
    'Target platforms, audience & distribution intent',
  ],
  InfluenceIT: [
    'Campaign goals & budgets',
    'Influencer categories / audience niches',
    'Brand messaging framework',
  ],
  SocialiseIT: [
    'Brand voice & communication guidelines',
    'Content calendar priorities / campaign goals',
    'Access to social handles & ad accounts',
  ],
  AmplifyIT: [
    'Campaign objectives & media budgets',
    'Audience targeting inputs',
    'Past campaign performance data (if available)',
  ],
  InvoiceIT: [
    'Campaign spends & invoices',
    'Budget allocations & approvals',
    'Compliance / tax requirements',
  ],
  InsightIT: [
    'Access to campaign & performance data sources',
    'Inputs from marketing / finance / digital teams',
    'Business objectives & KPIs to track',
  ],
  AdaptIT: [
    'Target markets/regions and priority order',
    'Existing localised assets (if any) for reference',
    'Compliance, pricing, or regulatory constraints per market',
  ],
  EngageIT: [
    'Customer database and existing engagement history',
    'Lifecycle stages and segmentation criteria',
    'Access to CRM or marketing automation tools',
  ],
  // authored — the client doc has no ConvergeIT inputs; drafted pending sign-off
  ConvergeIT: [
    'List of agencies/partners and their scope of work',
    "Access to each agency's reporting (dashboards or exports)",
    'Budget splits, KPIs & review cadence per agency',
  ],
}

function AllOfThisWithJust({ activeModule }) {
  const items = FROM_BRAND[activeModule] || FROM_BRAND.CreateIT
  const { isMobile } = useResponsive()

  return (
    <section style={{ padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px) 0', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{
          fontFamily: "'Saira Condensed', sans-serif",
          fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800, lineHeight: 1,
          textTransform: 'uppercase', color: '#fff', margin: 0,
        }}>All of this with just...</h2>
        <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: MUTED, lineHeight: 1.5, marginTop: 16 }}>
          Everything {activeModule || 'CHNC'} needs from your brand to get moving.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 20, width: '100%', maxWidth: 1240 }}>
        {items.map((text, i) => (
          <div key={i} className="card-hover" style={{
            flex: 1, background: 'transparent', border: `2px solid ${BORDER}`,
            padding: 'clamp(20px, 4vw, 30px)',
          }}>
            <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: MUTED, lineHeight: '24px', margin: 0 }}>{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// Per-module "READY TO…?" forms from the client content doc (Website -
// ConvergenSEE.docx, Aug 20). The section follows the active module pill.
// Every option press swaps the reaction clip on the right — clips are shared
// across modules: row = question index, column = option index. The neutral
// default is an animated WebP, so the renderer branches on extension.
// The "Tell me what you want" clip (default.webp re-encoded to H.264, 596KB →
// 180KB). Not default.mp4 — that file is a DIFFERENT clip the Aug 20 client
// change list replaced.
const quizDefaultGif = '/figma/home/oh-gifs/tell-me-what-you-want.mp4'
const QUIZ_GIF_ROWS = [
  ['ooh-wee', 'o-face', 'oh-i-see', 'jimbo'],
  ['giphy-3', 'i-see-wow', 'matrix-ok', 'oh-snap'],
  ['giphy-4', 'stranger-things', 'tiffany', 'max-stranger'],
  ['oh-i-see', 'i-see-wow', 'ooh-wee', 'jimbo'],
]
// CHNC Audit question sets (31 Aug brief): four questions per module — scale,
// symptom, setup and access. Every option is a data point, not a call to
// action; the CTA is the Submit button.
const MODULE_QUIZ = {
  LocateIT: {
    title: 'Ready to get', green: 'discovered?',
    qs: [
      { q: 'How many locations do you manage?', opts: ['1-5', '6-20', '20-100', '100+'] },
      { q: 'What breaks most often?', opts: ['Wrong details', 'Duplicate listings', 'Unanswered reviews', 'Not appearing'] },
      { q: 'Who updates your listings today?', opts: ['Each branch', 'Central team', 'An agency', 'Nobody'] },
      { q: 'Do you have Google Business access?', opts: ['Yes, all', 'Some', 'Not sure'] },
    ],
  },
  AmplifyIT: {
    title: 'Ready to turn spend into', green: 'demand?',
    qs: [
      { q: 'What is your monthly media spend?', opts: ['Under ₹1L', '₹1-5L', '₹5-10L', '₹10L+'] },
      { q: 'What is the problem?', opts: ['Rising cost/lead', "Leads don't convert", 'Channel unclear', 'Not scaling'] },
      { q: 'Where is the spend going?', opts: ['Meta', 'Google', 'Both', 'Both plus others'] },
      { q: 'Can you share campaign data?', opts: ['Yes', 'Partly', 'Need approval'] },
    ],
  },
  SocialiseIT: {
    title: 'Ready to stay', green: 'remembered?',
    qs: [
      { q: 'How many handles do you run?', opts: ['1-3', '4-10', '10-50', '50+'] },
      { q: 'How often do you post?', opts: ['Daily', 'Few times weekly', 'Occasionally', 'Rarely'] },
      { q: 'What is not working?', opts: ['Flat reach', 'Low engagement', 'Inconsistent posting', 'Off-brand content'] },
      { q: 'Who makes the content?', opts: ['In-house', 'Freelancers', 'An agency', 'A mix'] },
    ],
  },
  CreateIT: {
    title: 'Ready to create', green: 'content?',
    qs: [
      { q: 'How many creatives do you need monthly?', opts: ['Under 10', '10-50', '50-200', '200+'] },
      { q: 'Brief to live, how long?', opts: ['Same day', '2-3 days', 'About a week', 'Longer'] },
      { q: 'Where does it stall?', opts: ['Unclear briefs', 'Endless feedback', 'Slow approvals', 'Size adapts'] },
      { q: 'How many versions per asset?', opts: ['1-3', '4-8', '9+', 'It varies'] },
    ],
  },
  AIgenIT: {
    title: 'Ready to move at', green: 'AI speed?',
    qs: [
      { q: 'How many enquiries per month?', opts: ['Under 500', '500-5,000', '5,000-25,000', '25,000+'] },
      { q: 'What is your first response time?', opts: ['Within minutes', 'Few hours', 'Next day', 'It varies'] },
      { q: 'Who answers them today?', opts: ['Call centre', 'Sales team', 'Basic chatbot', 'Nobody'] },
      { q: 'Which languages do you need?', opts: ['English only', 'English, Hindi', '3-5 languages', '5+ languages'] },
    ],
  },
  SearchIT: {
    title: 'Ready to be', green: 'found first?',
    qs: [
      { q: 'What is your monthly organic traffic?', opts: ['Under 5,000', '5,000-50,000', '50,000-5 lakh', 'Not tracked'] },
      { q: 'What is happening to it?', opts: ['Falling', 'Flat', 'Growing slowly', 'Never checked'] },
      { q: 'Does AI search mention you?', opts: ['Yes', 'No', "Haven't checked", "Didn't know"] },
      { q: 'Who owns SEO today?', opts: ['In-house', 'An agency', 'Nobody', 'Web developer'] },
    ],
  },
  InfluenceIT: {
    title: 'Ready to build', green: 'real trust?',
    qs: [
      { q: 'What is your annual influencer budget?', opts: ['Under ₹1L', '₹1-5L', '₹5-10L', '₹10L+'] },
      { q: 'What went wrong last time?', opts: ['Wrong fit', 'Weak performance', 'Cost unjustified', 'Never tried'] },
      { q: 'How do you pick creators?', opts: ['Agency list', 'We reach out', 'A platform', 'Not started'] },
      { q: 'What do you measure?', opts: ['Views, likes', 'Link clicks', 'Actual sales', 'Nothing formal'] },
    ],
  },
  ScriptIT: {
    title: 'Ready for scripts that', green: 'work?',
    qs: [
      { q: 'How many videos per month?', opts: ['1-3', '4-10', '10-30', '30+'] },
      { q: 'Where does it break?', opts: ['Slow drafts', 'Too many rewrites', 'Shoot-day changes', 'Early drop-offs'] },
      { q: 'Who writes them now?', opts: ['In-house team', 'Production house', 'An agency', 'It varies'] },
      { q: 'Which formats do you need?', opts: ['Brand films', 'Reels, shorts', 'Ad scripts', 'All formats'] },
    ],
  },
  InvoiceIT: {
    title: 'Ready for', green: 'cleaner billing?',
    qs: [
      { q: 'How many vendors do you pay monthly?', opts: ['1-5', '6-20', '20-50', '50+'] },
      { q: 'What is the pain?', opts: ['Slow reconciliation', 'Spend vs deliverables', 'Lost approvals', 'Audit chaos'] },
      { q: 'How is spend tracked today?', opts: ['Spreadsheets', 'Our ERP', 'Finance separately', 'Scattered'] },
      { q: 'Invoice to payment takes?', opts: ['Under 30 days', '30-60 days', '60-90 days', '90+ days'] },
    ],
  },
  InsightIT: {
    title: 'Ready for', green: 'real clarity?',
    qs: [
      { q: 'How many dashboards do you check weekly?', opts: ['1-2', '3-5', '6+', 'Agency reports only'] },
      { q: 'What can you not answer today?', opts: ['Revenue by channel', 'ROI by region', 'What to stop', 'All above'] },
      { q: 'Monthly report takes how long?', opts: ['Few hours', 'Couple days', 'A week', 'Stopped asking'] },
      { q: 'Where does the data live?', opts: ['Platform dashboards', 'A BI tool', 'Excel', 'With agencies'] },
    ],
  },
  AdaptIT: {
    title: 'Ready to fit', green: 'every platform?',
    qs: [
      { q: 'How many markets do you run?', opts: ['1-3', '4-10', '10-25', '25+'] },
      { q: 'What breaks?', opts: ['Cropped assets', 'Weak translation', 'Local compliance', 'Off-brand versions'] },
      { q: 'Who adapts content today?', opts: ['Central team', 'Local teams', 'An agency', 'Nobody'] },
      { q: 'How many languages?', opts: ['English only', '2-3', '4-8', '8+'] },
    ],
  },
  EngageIT: {
    title: 'Ready to get', green: 'personal?',
    qs: [
      { q: 'How big is your customer database?', opts: ['Under 10,000', '10,000-1 lakh', '1-10 lakh', '10 lakh+'] },
      { q: 'What are you fixing?', opts: ['Low repeat', 'Customers go quiet', 'Rising unsubscribes', 'Retention unknown'] },
      { q: 'What do you send today?', opts: ['Same to everyone', 'Basic segments', 'Behaviour triggers', 'Nothing regular'] },
      { q: 'What is your CRM stack?', opts: ['Salesforce', 'HubSpot', 'CleverTap, WebEngage', 'None yet'] },
    ],
  },
  ConvergeIT: {
    title: 'Ready for one view of', green: 'everything?',
    qs: [
      { q: 'How many agencies do you work with?', opts: ['1-2', '3-5', '6-10', '10+'] },
      { q: 'Time to get total spend?', opts: ['Same day', 'Few days', 'A week+', 'We estimate'] },
      { q: 'How do you compare them?', opts: ['Shared format', 'Their own formats', 'Manually in Excel', "We don't"] },
      { q: 'What brought you here?', opts: ['Renewal coming', "Numbers don't add", 'New leadership', 'Consolidating vendors'] },
    ],
  },
}

function ReadyToCreate({ activeModule }) {
  const { isSmall } = useResponsive()
  const quiz = MODULE_QUIZ[activeModule] || MODULE_QUIZ.CreateIT
  const [selections, setSelections] = useState(() => quiz.qs.map(() => null))
  const [gif, setGif] = useState(quizDefaultGif)
  // Submission takeover: auditName != null fades the whole quiz body out, then
  // `live` swaps it for the brief-delivery scene (see AuditForm.jsx).
  const [auditName, setAuditName] = useState(null)
  const [auditCompany, setAuditCompany] = useState('')
  const [live, setLive] = useState(false)
  useEffect(() => {
    if (auditName === null) return
    const t = setTimeout(() => setLive(true), 500)
    return () => clearTimeout(t)
  }, [auditName])

  // Switching modules brings a fresh form: clear picks, back to the neutral clip,
  // and drop any delivery takeover so the new module's heading never sits over
  // the previous module's "We heard you" card. A form that already reported
  // success (mid fade-out) is remounted via formKey so it can submit again.
  const submittedRef = useRef(false)
  const [formKey, setFormKey] = useState(0)
  useEffect(() => {
    setSelections((MODULE_QUIZ[activeModule] || MODULE_QUIZ.CreateIT).qs.map(() => null))
    setGif(quizDefaultGif)
    setAuditName(null)
    setAuditCompany('')
    setLive(false)
    if (submittedRef.current) {
      submittedRef.current = false
      setFormKey(k => k + 1)
    }
  }, [activeModule])

  // Warm the browser cache for every reaction clip so the swap on click is instant.
  useEffect(() => {
    QUIZ_GIF_ROWS.flat().forEach(name => {
      fetch(`/figma/home/oh-gifs/${name}.mp4`).catch(() => {})
    })
  }, [])

  const handleSelect = (qi, oi) => {
    setSelections(prev => {
      const next = [...prev]
      next[qi] = oi
      return next
    })
    const row = QUIZ_GIF_ROWS[qi % QUIZ_GIF_ROWS.length]
    setGif(`/figma/home/oh-gifs/${row[oi % row.length]}.mp4`)
  }

  return (
    <section style={{ padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px)', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <SectionLabel>Got a growth question?</SectionLabel>
        <h2 key={activeModule} style={{
          fontFamily: "'Saira Condensed', sans-serif",
          fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800, lineHeight: 1,
          textTransform: 'uppercase', textAlign: 'center', margin: 0,
        }}>
          <span style={{ color: '#fff' }}>{quiz.title} </span>
          <span style={{ color: G }}>{quiz.green}</span>
        </h2>
      </div>

      {live ? (
        <div style={{ maxWidth: 1240, width: '100%' }}>
          <AuditTakeover name={auditName} company={auditCompany} />
        </div>
      ) : (
      <div className={auditName !== null ? 'audit-form-out' : undefined} style={{ maxWidth: 1240, width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center', pointerEvents: auditName !== null ? 'none' : undefined }}>
        <div style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', gap: isSmall ? 40 : 'clamp(40px, 8vw, 229px)', alignItems: isSmall ? 'stretch' : 'flex-start', justifyContent: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, flexShrink: 0, minWidth: 0 }}>
            {quiz.qs.map((q, qi) => (
              <div key={qi} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 500, fontSize: 18, color: '#fff', margin: 0 }}>
                  {q.q}
                </p>
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => (
                    <BtnOutline key={oi} active={oi === selections[qi]} onClick={() => handleSelect(qi, oi)}>{opt}</BtnOutline>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center', width: isSmall ? '100%' : 410, maxWidth: 410, flexShrink: 0, alignSelf: isSmall ? 'center' : 'auto' }}>
            <div style={{ width: '100%', height: isSmall ? 'clamp(280px, 70vw, 410px)' : 410, boxShadow: '0 4px 65px rgba(43,179,42,0.1)', overflow: 'hidden' }}>
              {gif.endsWith('.webp') ? (
                <img key={gif} src={gif} alt="Reality check reaction" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <video key={gif} src={gif} autoPlay muted loop playsInline aria-label="Reality check reaction" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </div>
            <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 24, textAlign: 'center', margin: 0 }}>
              Ready for a <span style={{ color: G }}>Reality</span> check?
            </p>
          </div>
        </div>
        <AuditForm
          key={formKey}
          context={{ page: 'solutions', module: activeModule, answers: quiz.qs.map((q, qi) => (selections[qi] == null ? null : q.opts[selections[qi]])) }}
          onSuccess={({ name, company }) => { submittedRef.current = true; setAuditName(name ?? ''); setAuditCompany(company ?? '') }}
        />
      </div>
      )}
    </section>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function SolutionsPage() {
  const [activePill, setActivePill] = useState('CreateIT')
  const activeModule = activePill

  return (
    <div style={{ background: DARK, minHeight: '100vh', color: '#fff' }}>
      <Hero />
      <ModulePills active={activePill} onSelect={setActivePill} />
      <HowWeDoIt activeModule={activeModule} />
      <AllOfThisWithJust activeModule={activeModule} />
      <ReadyToCreate activeModule={activeModule} />
      <Footer />
    </div>
  )
}
