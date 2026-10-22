'use client'

// ─── Home page ────────────────────────────────────────────────────────────────
// Every section of the landing page, extracted from the old App.jsx (which also
// held the SPA router). Routing now lives in app/; this file is purely the
// home-page body.

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { motion, useTransform, useMotionValue, useSpring, animate, useInView } from 'framer-motion'
import useVisualScrollProgress from './useVisualScrollProgress'
import CHNCDock, { DOCK_MODULES } from './ui/dock'
import useResponsive from './useResponsive'
import { withPose } from './lib/teamRoster'
import TeamMemberCard from './TeamMemberCard'
import Footer from './Footer'
import ContactForm from './ContactForm'
import AuditForm, { AuditTakeover } from './AuditForm'
import CHNCPlaceholder from './CHNCPlaceholder'
import SectionLabel from './SectionLabel'

// The dashboard is a 2,000-line interactive mock with timers and observers —
// no SEO-relevant text, so it loads client-side only, behind the placeholder.
const CHNCDashboard = dynamic(() => import('./CHNCDashboard'), { ssr: false, loading: () => <CHNCPlaceholder /> })

// ─── Assets ──────────────────────────────────────────────────────────────────
// The "We are ConvergenSEE" logo art, split into layers so each person can
// animate in individually. Positions are % of the 1080×1350 master canvas,
// measured by pixel-matching each cutout against the delivered composite
// (Logo Art.png). Array order = z-order, back to front.
const logoArtPeople = [
  { src: '/figma/home/logo-art/neha.webp',     name: 'Neha',     left: 33.70, top: 11.85, width: 42.50 },
  { src: '/figma/home/logo-art/vishy.webp',    name: 'Vishy',    left: 24.81, top: 11.48, width: 27.04 },
  { src: '/figma/home/logo-art/archana.webp',  name: 'Archana',  left: 6.11,  top: 19.33, width: 31.76 },
  { src: '/figma/home/logo-art/krish.webp',    name: 'Krish',    left: 11.39, top: 33.56, width: 26.94 },
  { src: '/figma/home/logo-art/rakshita.webp', name: 'Rakshita', left: 48.89, top: 59.78, width: 28.80 },
  { src: '/figma/home/logo-art/akansha.webp',  name: 'Akansha',  left: 22.96, top: 46.89, width: 28.98 },
  { src: '/figma/home/logo-art/kiran.webp',    name: 'Kiran',    left: 68.89, top: 13.41, width: 22.31 },
  { src: '/figma/home/logo-art/bala.webp',     name: 'Bala',     left: 32.96, top: 58.15, width: 29.44 },
]
const funnel1  = '/figma/home/funnel1.png'
const testiPhoto = '/figma/home/img-image111.webp'
const boardImg = '/figma/home/board.webp'

// ─── Shared styles ────────────────────────────────────────────────────────────
const G = '#34cc32'
const DARK = '#000718'
const CARD = '#0f1520'
const MUTED = 'rgba(255,255,255,0.7)'
const DIM = '#666a74'
const BORDER = 'rgba(255,255,255,0.1)'

const BtnOutlineGreen = ({ children, style, className, ...props }) => (
  <button {...props} className={`btn-outline ${className || ''}`} style={{
    background: 'transparent', color: '#fff', border: '1px solid #fff',
    height: 46, padding: '0 20px',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    boxSizing: 'border-box',
    fontFamily: "'Saira Condensed', sans-serif",
    fontSize: 16, fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.02em', cursor: 'pointer', backdropFilter: 'blur(10px)',
    ...style,
  }}>{children}</button>
)

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      // 100vh isn't compensated by the laptop-scale body zoom — divide by --pz
      // so the hero still covers the full screen on 1025–1727px viewports.
      position: 'relative', height: 'calc(100vh / var(--pz, 1))', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', textAlign: 'center',
      background: DARK, padding: '0 20px',
    }}>
      {/* React 19 hoists this into <head>: fetch the poster at top priority so
          the hero backdrop paints immediately instead of after the video tag
          is discovered. */}
      <link rel="preload" as="image" href="/home-hero-poster.webp" fetchPriority="high" />

      {/* Background video — ConvergenSEE homepage showreel */}
      <video
        autoPlay muted loop playsInline preload="metadata"
        poster="/home-hero-poster.webp"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', opacity: 0.6,
        }}
      >
        <source src="/home-hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlays for text readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          linear-gradient(to bottom, ${DARK} 0%, rgba(0,7,24,0.2) 40%, rgba(0,7,24,0.2) 60%, ${DARK} 100%),
          linear-gradient(to right, ${DARK} 0%, transparent 30%, transparent 70%, ${DARK} 100%)
        `,
        zIndex: 1,
      }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{
            fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(56px, 14vw, 150px)', fontWeight: 800,
            textTransform: 'uppercase', letterSpacing: '-3px', lineHeight: 1,
            whiteSpace: 'nowrap', textShadow: '0 2px 24px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.6)',
          }}>
            <span style={{ color: '#fff' }}>We </span>
            <span style={{ color: G }}>ARE </span>
            <span style={{ color: '#fff' }}>You</span>
          </h1>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 18, color: '#fff', lineHeight: '24px', marginTop: 8, maxWidth: 640, textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>
            An extension of your team, your thinking, your brand. We amplify what you already do well, spot the opportunities you're too close to see, and help you grow into them.
          </p>
        </div>
        {/* A repeat click leaves the hash at #contact, so the browser skips the
            anchor scroll — scroll imperatively on every plain click instead. */}
        <Link href="#contact" onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
          e.preventDefault()
          document.getElementById('contact')?.scrollIntoView()
          history.replaceState(null, '', '#contact')
        }} className="btn-outline" style={{
          background: 'transparent', color: '#fff', border: '1px solid #fff',
          height: 46, padding: '0 20px',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          boxSizing: 'border-box',
          fontFamily: "'Saira Condensed', sans-serif",
          fontSize: 16, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.02em', cursor: 'pointer', backdropFilter: 'blur(10px)',
        }}>Take the CHNC</Link>
      </div>
    </section>
  )
}

// ─── Clients ──────────────────────────────────────────────────────────────────
const clientLogos = [
  { src: '/ll-logo.png', alt: 'Living Liquidz' },
  { src: '/MG-Logo.webp', alt: 'MG' },
  { src: '/mind-craft.png', alt: 'MindCraft' },
  { src: '/Aptech-Logo.webp', alt: 'Aptech' },
  { src: '/kotak-mf.png', alt: 'Kotak Mutual Fund' },
  { src: '/flickvid.png', alt: 'Flickvid' },
  { src: '/mahindra-m.webp', alt: 'Mahindra' },
]
const tickerLogos = [...clientLogos, ...clientLogos]

function Clients() {
  return (
    <section style={{ background: DARK, padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px) 0' }}>
      <div className="ticker-wrap" style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="ticker-track">
          {tickerLogos.map((logo, i) => (
            <div className="ticker-item" key={`${logo.src}-${i}`}>
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const { isSmall } = useResponsive()
  return (
    <section style={{ background: DARK, padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px) 0' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: isSmall ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, width: isSmall ? '100%' : 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SectionLabel>About</SectionLabel>
            <h2 style={{
              fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800,
              lineHeight: 1, color: '#fff',
            }}>
              WE ARE<br />
              Convergen<span style={{ color: G }}>SEE</span>
            </h2>
          </div>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: MUTED, lineHeight: 1.5, maxWidth: 531 }}>
            We are YOU, not you. The dreamers who see what could be, the thinkers who question what is, the builders who refuse to settle. We exist in the space between your vision and reality, turning digital problems into opportunities with technology that actually works. We're not your brand. We're your people, solving, creating, and growing right alongside you.
          </p>
        </div>
        <div style={{ width: isSmall ? '100%' : 562, maxWidth: 562, height: isSmall ? 'clamp(320px, 80vw, 564px)' : 564, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* One in-view trigger for the whole V: each cutout used to watch its
              own box, so they popped one by one as each crossed the line. */}
          <motion.div
            initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.25 }}
            style={{ position: 'relative', height: '100%', aspectRatio: '1080 / 1350' }}
          >
            {logoArtPeople.map((p, i) => (
              <motion.div
                key={p.name}
                variants={{
                  hidden: { opacity: 0, y: 26, scale: 0.7 },
                  shown: { opacity: 1, y: 0, scale: 1, transition: { delay: 0.15 + i * 0.09, type: 'spring', duration: 0.6, bounce: 0.35 } },
                }}
                style={{ position: 'absolute', left: `${p.left}%`, top: `${p.top}%`, width: `${p.width}%` }}
              >
                <img
                  src={p.src} alt={p.name} loading="lazy" className="logo-art-float"
                  style={{ width: '100%', height: 'auto', display: 'block', animationDuration: `${3 + (i % 4) * 0.55}s`, animationDelay: `${-i * 0.7}s` }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── CHNC ─────────────────────────────────────────────────────────────────────
const chncStats = [
  { num: '200+', label: 'Clients served across industries' },
  { num: '₹50Cr+', label: 'Revenue generated for clients' },
  { num: '8+', label: 'Years of market expertise' },
]

const platformFeatures = [
  { title: 'Location Presence Management', icon: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
    desc: "Manages your brand's presence across Google Search and Maps, listings, and local discovery platforms. Solves inconsistent information, low visibility, and lost walk-in opportunities." },
  { title: 'Performance Marketing', icon: <><path d="m3 11 18-5v12L3 14v-3Z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></>,
    desc: 'Plans and optimises paid campaigns across digital platforms to drive measurable growth. Solves wasted media spend, poor lead quality, and lack of performance accountability.' },
  { title: 'Social Media Management', icon: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></>,
    desc: "Runs your brand's ongoing social presence through structured content and engagement. Solves irregular posting, weak recall, and disconnected audience relationships." },
  { title: 'Content Creation and Adaptation', icon: <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />,
    desc: 'Produces consistent creative assets for ads, social, and digital, adapted across every platform and size. Solves content fatigue, production delays, and inconsistent brand communication.' },
  { title: 'AI Conversation & Automation', icon: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22l5.9-2Z" />,
    desc: 'Deploys AI voice and chat agents that interact, assist, and qualify customers instantly. Solves slow response times, manpower dependency, and missed customer enquiries.' },
  { title: 'SEO + AEO + GEO Optimisation', icon: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
    desc: "Improves your brand's visibility across search engines and generative discovery platforms. Solves low organic traffic, poor discoverability, and over-reliance on paid media." },
  { title: 'Influencer Marketing', icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    desc: 'Connects your brand with relevant creators to produce authentic, audience-led content. Solves credibility gaps, low engagement, and difficulty reaching new communities.' },
  { title: 'Creative Production & Script Development', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8L14 2Z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></>,
    desc: 'Develops structured storytelling and performance scripts for campaigns and videos. Solves weak messaging, low viewer retention, and unclear communication.' },
  { title: 'Invoice Management', icon: <><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></>,
    desc: 'Centralises marketing invoices, spends, and vendor billing into one organised system. Solves financial confusion, reconciliation delays, and lack of spend visibility.' },
  { title: 'Analytics', icon: <><path d="M3 3v18h18" /><path d="M7 15v3M12 10v8M17 6v12" /></>,
    desc: 'Transforms campaign and customer data into actionable business intelligence. Solves fragmented reporting, unclear performance understanding, and slow decision-making.' },
  { title: 'Message Personalisation', icon: <><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2Z" /><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" /></>,
    desc: 'Picks the right cohorts and sends personalised messages built for their moment, driving better experience and stronger retention. Turns generic outreach into conversations that actually land.' },
  { title: "Agency Bird's-Eye View", icon: <><path d="M2.06 12.35a1 1 0 0 1 0-.7C3.42 8.1 7.22 5 12 5s8.58 3.1 9.94 6.65a1 1 0 0 1 0 .7C20.58 15.9 16.78 19 12 19s-8.58-3.1-9.94-6.65Z" /><circle cx="12" cy="12" r="3" /></>,
    desc: 'Connects every agency you work with into one dashboard, so performance sits side by side instead of scattered across reports. Full visibility, without chasing five different partners for updates.' },
]

function CHNC() {
  const router = useRouter()
  const scrollRef = useRef()
  const { isSmall, isMobile, isTablet, width } = useResponsive()
  const cols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'

  // Centered layout: once the dashboard straightens, the info card (left) and
  // dashboard render as one group centered in the viewport. The flex parent
  // centers the dashboard container itself, so a rightward shift balances the
  // card hanging off its left — no viewport-width term needed, which also keeps
  // it correct under the laptop body zoom (innerWidth ≠ zoomed layout width).
  // Optical balance: the dashboard settles at scale 0.88 (center origin), so
  // its VISIBLE edge sits dashW×0.06 inside its layout box; the card's visible
  // edge is its text (28px padding inside a transparent box). Equalising
  // text-left vs dashboard-visible-right margins gives (cardW + inset)/2.
  // Viewport height in LAYOUT px (innerHeight alone lies under the laptop
  // --pz body zoom, same caveat as innerWidth above).
  const [vhLayout, setVhLayout] = useState(1000)
  useEffect(() => {
    let frame = null
    const measure = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const pz = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--pz')) || 1
        setVhLayout(Math.round(window.innerHeight / pz))
      })
    }
    window.addEventListener('resize', measure)
    measure()
    return () => { window.removeEventListener('resize', measure); if (frame) cancelAnimationFrame(frame) }
  }, [])

  // Height-aware cap: the whole ensemble (dashboard + dock) should fit one
  // viewport with the section title still in frame — the "90% browser zoom"
  // framing the client liked. ~420px budgets the nav/title above and the dock
  // below; tall monitors keep the 1060 width cap.
  const dashHMax = Math.max(480, vhLayout - 420)
  const dashW = Math.min(1060, width - 360, Math.round(dashHMax * 1440 / 930))   // leave ~360px for the left info card
  const dashH = Math.round(dashW * 930 / 1440) // rendered dashboard height (aspect 1440/930)
  const cardW = 360
  const centerShift = Math.round((cardW + dashW * 0.06) / 2)

  // Rect-based progress instead of framer's useScroll({ target }): the laptop
  // -scale zoom (globals.css) breaks useScroll's offsetTop-based measurement,
  // firing scroll animations late on 1025–1727px viewports.
  const tiltProgress = useVisualScrollProgress(scrollRef, ['start 0.85', 'start -0.15'])
  // Tilt is compressed into the first half of the scroll range so the
  // dashboard is fully straight (and the dock in) around the time the CHNC
  // heading above it is fully visible at the top of the viewport — it used
  // to straighten across the whole range and finish much later. (0.35 was
  // too quick — the straightening flew by before you could watch it.)
  const rotateXRaw    = useTransform(tiltProgress, [0, 0.5], [32, 0])
  const introScaleRaw = useTransform(tiltProgress, [0, 0.5], [0.45, 0.88])

  const imageScaleRaw = introScaleRaw

  const [done, setDone] = useState(false)
  const [tilesReady, setTilesReady] = useState(true)
  const [cardReady, setCardReady] = useState(false)
  const [activeModule, setActiveModule] = useState('InsightIT')
  // Mobile accordion: which service row is expanded (first open by default so
  // the rows read as expandable; -1 = all closed)
  const [openFeature, setOpenFeature] = useState(0)
  // Centered layout: text on the left, card + dashboard centered as a group
  const vTopAlign = true
  const vAccent   = true
  const vLink     = true
  const vBleed    = true
  const vRefined  = false
  const cardVisible = cardReady
  const lockedRotateX = useMotionValue(32)
  const lockedScale   = useMotionValue(0.45)
  const lockedDock    = useMotionValue(0)

  const MODULE_INFO = {
    InsightIT: { title: 'InsightIT', desc: "Gives your brand clarity on what's working and what to do next." },
    LocateIT: { title: 'LocateIT', desc: 'Helps your brand get discovered in the moments that matter.' },
    CreateIT: { title: 'CreateIT', desc: 'Gives your brand a steady flow of high-quality creatives at scale.' },
    AmplifyIT: { title: 'AmplifyIT', desc: 'Turns your marketing spend into real demand and better leads.' },
    SocialiseIT: { title: 'SocialiseIT', desc: 'Keeps your brand visible, familiar, and remembered every day.' },
    InfluenceIT: { title: 'InfluenceIT', desc: 'Builds trust and traction through creators your audience already follows.' },
    ScriptIT: { title: 'ScriptIT', desc: 'Gives your brand scripts that hold attention and drive response.' },
    AIgenIT: { title: 'AIgenIT', desc: 'Helps your brand move faster with human-like, multi-language conversations.' },
    SearchIT: { title: 'SearchIT', desc: 'Brings in high-intent customers who are ready to take action.' },
    InvoiceIT: { title: 'InvoiceIT', desc: "Keeps your brand's spends, billing, and tracking clean and organised." },
    AdaptIT: { title: 'AdaptIT', desc: "Reshapes your brand's content to fit every platform it lands on." },
    EngageIT: { title: 'EngageIT', desc: 'Gives your brand messaging that speaks to each customer personally.' },
    ConvergeIT: { title: 'ConvergeIT', desc: 'Connects every agency you work with into a single dashboard for a complete performance view.' },
  }

  useEffect(() => {
    const unsubTilt = tiltProgress.on('change', (v) => {
      if (v >= 0.05 && !tilesReady) setTilesReady(true)

      // ~60% through the compressed tilt range: lock and auto-complete the
      // rest, so the dashboard lands straight and the dock is in right as
      // the CHNC heading becomes fully visible at the top of the viewport.
      if (v >= 0.30 && !done) {
        lockedRotateX.set(rotateXRaw.get())
        lockedScale.set(imageScaleRaw.get())
        lockedDock.set(0)
        setDone(true)
        // Auto-complete the remaining tilt smoothly
        animate(lockedRotateX, 0, { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] })
        animate(lockedScale, 0.88, { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] })
        setTimeout(() => {
          animate(lockedDock, 1, { duration: 0.5, ease: 'easeOut' })
          setTimeout(() => setCardReady(true), 600)
        }, 500)
      }
    })
    return unsubTilt
  }, [tiltProgress, tilesReady, done, lockedRotateX, lockedScale, lockedDock, rotateXRaw, imageScaleRaw])

  const rotateX     = done ? lockedRotateX : rotateXRaw
  const imageScale  = done ? lockedScale   : imageScaleRaw
  const dockOpacity = done ? lockedDock    : 0

  // Funnel flow: service cards pour down + inward into the funnel neck as you
  // scroll, staggered row-by-row, and the CHNC logo reveals at the neck.
  const flowRef = useRef()
  // Start point is deliberately late ('start 0.25'): progress stays at 0 until the
  // grid's top has risen to a quarter down the viewport, i.e. the cards are on
  // screen and readable. Only then does scrolling begin to pour them into the funnel.
  const flowRaw = useVisualScrollProgress(flowRef, ['start 0.25', 'end 0.5'])
  // Spring-smooth the raw scroll so motion glides instead of tracking wheel ticks.
  const flow = useSpring(flowRaw, { stiffness: 45, damping: 22, mass: 0.8 })

  // Row 0 = top (travels furthest, leaves last), Row 2 = bottom (nearest the funnel, leaves first).
  // Each row holds still for the first stretch of the range so nothing drifts on the
  // very first wheel tick — the bottom row leads, the top row follows.
  const yTop = useTransform(flow, [0.30, 1],    [0, 320])
  const sTop = useTransform(flow, [0.30, 1],    [1, 0.35])
  const oTop = useTransform(flow, [0.60, 0.95], [1, 0])
  const yMid = useTransform(flow, [0.20, 0.92], [0, 220])
  const sMid = useTransform(flow, [0.20, 0.92], [1, 0.4])
  const oMid = useTransform(flow, [0.50, 0.86], [1, 0])
  const yBot = useTransform(flow, [0.10, 0.82], [0, 120])
  const sBot = useTransform(flow, [0.10, 0.82], [1, 0.45])
  const oBot = useTransform(flow, [0.40, 0.76], [1, 0])
  // Twelve cards fill a fourth row; it sits nearest the funnel so it shares the
  // bottom row's timing.
  const rowY = [yTop, yMid, yBot, yBot]
  const rowS = [sTop, sMid, sBot, sBot]
  const rowO = [oTop, oMid, oBot, oBot]

  // Columns converge toward the centre (the funnel neck).
  const xLeft  = useTransform(flow, [0.10, 1], [0, 360])
  const xMid   = useTransform(flow, [0.10, 1], [0, 0])
  const xRight = useTransform(flow, [0.10, 1], [0, -360])
  const colX = [xLeft, xMid, xRight]


  // CHNC reveal keyed to the funnel's own viewport position, not `flow`:
  // flow spans grid + funnel, so pausing with the funnel low on screen sat in
  // a dead zone — cards already poured away, wordmark not yet faded in — and
  // the funnel read as an empty pair of curves.
  const funnelRef = useRef()
  const chncRaw  = useVisualScrollProgress(funnelRef, ['start 0.95', 'start 0.5'])
  const chncProg = useSpring(chncRaw, { stiffness: 60, damping: 20, mass: 0.6 })
  const chncOpacity = useTransform(chncProg, [0.1, 0.8], [0, 1])
  const chncScale   = useTransform(chncProg, [0, 1],     [0.55, 1])

  return (
    <section style={{ paddingTop: 0, background: DARK }}>
      {/* Section title + CHNC heading above dashboard */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px) 0' }}>
        <SectionLabel>Meet CHNC</SectionLabel>
        <h2 style={{
          fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800,
          textTransform: 'uppercase', lineHeight: 1, textAlign: 'center',
        }}>
          What's inside <span style={{ color: G }}>CHNC?</span>
        </h2>
        <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: MUTED, lineHeight: 1.5, textAlign: 'center', maxWidth: 640, margin: 0 }}>
          Built to find the gaps, connect the dots, and turn every opportunity into something you can actually own.
        </p>
      </div>

      <div ref={flowRef}>
      {/* Feature grid (services) — cards flow into the funnel on scroll */}
      <div style={{ maxWidth: 1480, margin: 'clamp(36px, 4vw, 60px) auto 60px', padding: '0 clamp(16px, 3vw, 48px)', width: '100%', boxSizing: 'border-box' }}>
        {isMobile ? (
          /* Phones: 2-up tile grid (icon + name) instead of 12 stacked
             accordion rows. Tapping a tile opens its description in a
             full-width panel directly under that row, with a caret pointing
             back at the tile. */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Array.from({ length: Math.ceil(platformFeatures.length / 2) }, (_, r) => {
              const row = platformFeatures.slice(r * 2, r * 2 + 2)
              const openInRow = Math.floor(openFeature / 2) === r ? openFeature % 2 : -1
              const active = openInRow >= 0 ? row[openInRow] : null
              return (
              <div key={r}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {row.map((f, j) => {
                    const i = r * 2 + j
                    const open = openFeature === i
                    return (
                    <button
                      key={f.title}
                      onClick={() => setOpenFeature(open ? -1 : i)}
                      aria-expanded={open}
                      aria-controls={`chnc-feature-${r}`}
                      style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, minHeight: 112, padding: '14px 14px 14px', background: open ? 'rgba(52,204,50,0.07)' : DARK, border: `1px solid ${open ? 'rgba(52,204,50,0.55)' : BORDER}`, cursor: 'pointer', textAlign: 'left', transition: 'background 0.25s ease, border-color 0.25s ease' }}
                    >
                      <span style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(52,204,50,0.08)', border: '1px solid rgba(52,204,50,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                        </span>
                      </span>
                      <span style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, fontSize: 16, lineHeight: 1.1, color: '#fff', textTransform: 'uppercase' }}>{f.title}</span>
                    </button>
                    )
                  })}
                </div>
                {/* 0fr→1fr grid keeps the open/close animation in CSS with no height measuring */}
                <div id={`chnc-feature-${r}`} style={{ display: 'grid', gridTemplateRows: active ? '1fr' : '0fr', transition: 'grid-template-rows 0.35s ease' }}>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ position: 'relative', marginTop: 10, padding: '14px 16px', background: '#03111a' }}>
                      <span aria-hidden style={{ position: 'absolute', top: -6, left: openInRow === 1 ? '75%' : '25%', width: 10, height: 10, background: '#03111a', transform: 'translateX(-50%) rotate(45deg)', transition: 'left 0.3s ease' }} />
                      <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: MUTED, lineHeight: '21px', margin: 0 }}>{active?.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        ) : (
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 24, width: '100%' }}>
          {platformFeatures.map((f, i) => {
            const cardStyle = { background: DARK, border: `2px solid ${BORDER}`, padding: '24px 26px', minHeight: 104, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14, boxSizing: 'border-box' }
            const r = Math.floor(i / 3), c = i % 3
            const animStyle = isSmall ? cardStyle : { ...cardStyle, x: colX[c], y: rowY[r], scale: rowS[r], opacity: rowO[r], willChange: 'transform, opacity' }
            return (
            <motion.div key={f.title} className="feature-card" style={animStyle}>
              <div className="feature-head" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 18 }}>
                <span className="feature-icon" style={{ flexShrink: 0, width: 48, height: 48, borderRadius: 12, background: 'rgba(52,204,50,0.08)', border: '1px solid rgba(52,204,50,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                </span>
                <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(20px, 1.9vw, 26px)', lineHeight: 1.1, color: '#fff', textTransform: 'uppercase', margin: 0 }}>{f.title}</p>
              </div>
              <p className="feature-desc" style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: MUTED, lineHeight: '21px', margin: 0 }}>{f.desc}</p>
            </motion.div>
            )
          })}
        </div>
        )}
      </div>

      <div ref={funnelRef} style={{ position: 'relative', height: isSmall ? 240 : 430, maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px, 6vw, 100px) clamp(20px, 4vw, 48px)', boxSizing: 'border-box', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Both curves anchor at top 0 — the mirror transform keeps the same
            bounding box, so any offset here reads as misalignment. */}
        {/* Curve min-width 140 (was 180): on phones two 180px curves nearly met
            mid-screen and their tails dove into the CHNC wordmark. */}
        <img loading="lazy" src={funnel1} alt="" style={{ position: 'absolute', left: 'clamp(16px, 3vw, 48px)', top: 0, width: 'clamp(140px, 28vw, 423px)', height: 'auto', objectFit: 'contain', opacity: 0.8 }} />
        <img loading="lazy" src={funnel1} alt="" style={{ position: 'absolute', right: 'clamp(16px, 3vw, 48px)', top: 0, width: 'clamp(140px, 28vw, 423px)', height: 'auto', objectFit: 'contain', opacity: 0.8, transform: 'rotate(180deg) scaleY(-1)' }} />
        {/* isSmall passes literal 1s (not merely omitting the keys): the first
            render uses the SSR width (desktop), which binds the scroll-linked
            motion values — and framer keeps a bound value applied even after
            the key disappears from style, leaving the lockup stuck faded on
            phones. Explicit values override the stale binding. */}
        <motion.div style={{ position: 'relative', zIndex: 1, textAlign: 'center', opacity: isSmall ? 1 : chncOpacity, scale: isSmall ? 1 : chncScale }}>
          <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(52px, 7.5vw, 113px)', fontWeight: 800, color: G, letterSpacing: '-3.27px', lineHeight: 0.82 }}>CHNC</div>
          {/* Gap/size/tracking scale with the wordmark (7.5vw) so the lockup
              keeps the desktop proportions on small screens instead of the
              tagline drifting away from CHNC. */}
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(10px, 1.15vw, 14px)', color: DIM, letterSpacing: 'clamp(2px, 0.33vw, 4px)', textTransform: 'uppercase', marginTop: 'clamp(4px, 0.6vw, 8px)' }}>
            The Opportunity Creators
          </p>
        </motion.div>
      </div>
      </div>

      <div ref={scrollRef} style={{ position: 'relative' }}>
        {/* Stage height caps at the dashboard's rendered height + dock + pin
            runway: on tall screens the raw 100vh left a huge empty band
            between the dock and the next section. The floor guarantees room
            for dashboard + dock on short viewports, where a bare 100vh let
            the absolutely-positioned dock poke into the Impact section. */}
        <div style={{ height: isSmall ? 'auto' : `clamp(${dashH + 130}px, calc(100vh / var(--pz, 1)), ${dashH + 250}px)`, position: 'relative' }}>
          {/* Small screens: no 100vh scroll-pin (the shrunken dashboard left a
              huge blank gap) — normal flow, with bottom padding reserving room
              for the absolutely-positioned dock below the dashboard. */}
          <div style={{
            ...(isSmall
              ? { position: 'relative', paddingTop: 20, paddingBottom: 110 }
              : { position: 'relative', height: `min(calc(100vh / var(--pz, 1) - 220px), ${dashH + 20}px)`, paddingTop: '20px' }),
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'flex-start',
            overflow: 'visible',
          }}>
            <div style={{ position: 'relative', width: isSmall ? '92%' : dashW, maxWidth: isSmall ? '1060px' : undefined,
              transform: (!isSmall && cardVisible) ? `translateX(${centerShift}px)` : 'translateX(0)',
              transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              {/* Green glow bloom behind dashboard */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(52,204,50,0.32) 0%, rgba(52,204,50,0.12) 50%, transparent 78%)',
                filter: 'blur(40px)',
                borderRadius: 8,
                zIndex: 0,
                pointerEvents: 'none',
              }} />
              <div style={{ perspective: '1000px', position: 'relative', zIndex: 1 }}>
                {/* Green info card — inside perspective div so it shares dashboard height */}
                {(() => {
                  const info = MODULE_INFO[activeModule] || MODULE_INFO.InsightIT
                  return (
                    <div style={{
                      ...(isSmall
                        ? { position: 'relative', width: '100%', marginBottom: 24, paddingTop: 0, paddingBottom: 0, opacity: 1, transform: 'none' }
                        : {
                            position: 'absolute',
                            // Fixed-width card hanging off the dashboard's left edge;
                            // centerShift on the container balances it so the pair
                            // reads as one centered group.
                            ...(vBleed
                              ? { right: '100%', marginRight: 28, width: cardW }
                              : { left: '100%', marginLeft: 20, width: vRefined ? 320 : 300 }),
                            top: '6%',
                            ...(vTopAlign ? { bottom: 'auto' } : { bottom: '6%' }),
                            paddingTop: 40, paddingBottom: 40,
                            opacity: cardVisible ? 1 : 0,
                            transform: cardVisible ? 'translateX(0)' : 'translateX(-60px)',
                          }),
                      zIndex: 2,
                      background: 'transparent',
                      borderLeft: vRefined ? `2px solid ${G}` : 'none',
                      paddingLeft: vRefined ? 24 : 28, paddingRight: 28,
                      display: 'flex', flexDirection: 'column',
                      justifyContent: vTopAlign ? 'flex-start' : 'space-between',
                      gap: vTopAlign ? 28 : 0,
                      transition: 'opacity 0.5s ease 0.2s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                    }}>
                      <div>
                        {vAccent && (
                          <div style={{ marginBottom: 14 }}>
                            <SectionLabel>Module</SectionLabel>
                          </div>
                        )}
                        <p style={{
                          fontFamily: "'Saira Condensed', sans-serif", fontSize: 36, fontWeight: 700,
                          color: '#fff', lineHeight: 1.1, marginBottom: 16,
                        }}>{info.title}</p>
                        <p style={{
                          fontFamily: "'Archivo', sans-serif", fontSize: 15, color: MUTED,
                          lineHeight: '22px',
                        }}>{info.desc}</p>
                        {info.stats && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 28 }}>
                            {info.stats.map((s, si) => (
                              <div key={si}>
                                <p style={{
                                  fontFamily: "'Saira Condensed', sans-serif", fontSize: 64, fontWeight: 800,
                                  color: G, lineHeight: 1, marginBottom: 4,
                                }}>{s.num}</p>
                                <p style={{
                                  fontFamily: "'Archivo', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.6)',
                                  lineHeight: '18px',
                                }}>{s.label}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {vLink ? (
                        <button
                          onClick={() => router.push('/solutions')}
                          style={{
                            background: 'transparent', color: G, border: 'none', padding: 0,
                            fontFamily: "'Saira Condensed', sans-serif", fontSize: 15, fontWeight: 700,
                            textTransform: 'uppercase', letterSpacing: '0.02em', cursor: 'pointer',
                            alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8,
                            // Small screens: pad the text link up to a >=44px tap target
                            ...(isSmall ? { minHeight: 44 } : {}),
                          }}
                        >Learn more</button>
                      ) : (
                        <button
                          onClick={() => router.push('/solutions')}
                          style={{
                            background: G, color: DARK, border: 'none',
                            height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', fontFamily: "'Saira Condensed', sans-serif",
                            fontSize: 15, fontWeight: 700, textTransform: 'uppercase',
                            letterSpacing: '0.02em', cursor: 'pointer',
                            alignSelf: 'flex-start',
                          }}
                        >Explore Module</button>
                      )}
                    </div>
                  )
                })()}
                <motion.div
                  // Phones: swipe the dashboard sideways to step through modules
                  // (pan-y keeps normal vertical page scrolling).
                  onPanEnd={isSmall ? (_, info) => {
                    if (Math.abs(info.offset.x) < 50 || Math.abs(info.offset.x) < Math.abs(info.offset.y)) return
                    const i = DOCK_MODULES.indexOf(activeModule)
                    const dir = info.offset.x < 0 ? 1 : -1
                    setActiveModule(DOCK_MODULES[(i + dir + DOCK_MODULES.length) % DOCK_MODULES.length])
                  } : undefined}
                  style={{
                    ...(isSmall ? { touchAction: 'pan-y' } : {}),
                    width: '100%', aspectRatio: '1440/930',
                    boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 80px rgba(52,204,50,0.12)',
                    transformOrigin: 'center center', borderRadius: 8, overflow: 'hidden',
                    rotateX, scale: imageScale, willChange: 'transform',
                    // No backdrop fill: a light backing bleeds out of the rounded
                    // corners at fractional scales and reads as a white border.
                    background: 'transparent',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {/* Every module, InsightIT included, uses the standard
                      dashboard mock. The InsightIT feature shot is kept in
                      CHNCDashboard: pass bare={activeModule === 'InsightIT'}. */}
                  <CHNCDashboard tilesTrigger={tilesReady} activeModule={activeModule} onModuleChange={setActiveModule} />
                </motion.div>
              </div>
              <motion.div
                // Mirror the parent's centering shift with the same timing so the
                // dock stays viewport-centered the whole time (no slide of its own).
                animate={{ x: (!isSmall && cardVisible) ? -centerShift : 0 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  position: 'absolute', top: '100%', left: 0, right: 0,
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  marginTop: done ? 20 : 8, opacity: dockOpacity,
                }}
              >
                <CHNCDock triggerOpacity={dockOpacity} activeModule={activeModule} onSelect={setActiveModule} />
              </motion.div>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}

// ─── Impact ───────────────────────────────────────────────────────────────────
const impacts = [
  { num: '1.3M+', desc: 'Local business locations managed globally' },
  { num: '110K+', desc: 'Business locations managed in India alone' },
  { num: '300+',  desc: 'Global enterprise brands managed across industries' },
  { num: '50%',   desc: 'Cut in go-to-market time' },
]

// Slot-machine odometer: each digit is a vertical 0-9 strip that spins through
// two full loops before settling on its target. Cell height must match the
// parent's lineHeight so digits sit exactly one glyph tall.
const SLOT_CELL = 1.1 // em

function SlotDigit({ char, inView, delay }) {
  const cellStyle = { display: 'block', height: `${SLOT_CELL}em`, lineHeight: `${SLOT_CELL}em` }
  if (!/\d/.test(char)) {
    return <span style={{ display: 'inline-block', height: `${SLOT_CELL}em`, lineHeight: `${SLOT_CELL}em` }}>{char}</span>
  }
  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    .concat(Array.from({ length: +char + 1 }, (_, i) => i))
  // The hidden copy of the final digit sizes the column, so a narrow '1'
  // doesn't inherit the width of the '0'–'9' strip spinning behind it.
  return (
    <span style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', height: `${SLOT_CELL}em`, verticalAlign: 'top' }}>
      <span style={{ visibility: 'hidden', display: 'block', height: `${SLOT_CELL}em`, lineHeight: `${SLOT_CELL}em` }}>{char}</span>
      <motion.span
        style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'block', textAlign: 'center' }}
        initial={{ y: 0 }}
        animate={inView ? { y: `-${(rows.length - 1) * SLOT_CELL}em` } : { y: 0 }}
        transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {rows.map((n, i) => <span key={i} style={cellStyle}>{n}</span>)}
      </motion.span>
    </span>
  )
}

// `inView` comes from the Impact grid so every number rolls at the same moment
// (per-number triggers fired one by one as the stacked mobile cards scrolled in).
function RollingNumber({ value, style, inView }) {
  return (
    <p style={{ ...style, lineHeight: SLOT_CELL }} aria-label={value}>
      <span aria-hidden="true">
        {value.split('').map((ch, i) => (
          <SlotDigit key={i} char={ch} inView={inView} delay={i * 0.12} />
        ))}
      </span>
    </p>
  )
}

function Impact() {
  const { isMobile } = useResponsive()
  const gridRef = useRef(null)
  const inView = useInView(gridRef, { once: true, amount: 0.15 })
  return (
    <section style={{ background: DARK, padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px) 0' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <SectionLabel>Impact</SectionLabel>
          <h2 style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1, textAlign: 'center' }}>
            Impact we have <span style={{ color: G }}>built</span>
          </h2>
        </div>
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20, width: '100%' }}>
          {impacts.map((s) => (
            <div key={s.num} style={{ border: `2px solid ${BORDER}`, padding: 'clamp(20px, 4vw, 30px)' }}>
              <RollingNumber value={s.num} inView={inView} style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(40px, 5.3vw, 80px)', fontWeight: 800, color: G, lineHeight: 1.1 }} />
              <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 18, color: MUTED, lineHeight: '24px', marginTop: 10 }}>{s.desc}</p>
              {s.tag && <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 16, fontWeight: 600, color: G, textTransform: 'uppercase', marginTop: 10 }}>{s.tag}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Brand Audit (Reality Check) ─────────────────────────────────────────────
// Every option carries its own reaction clip (muted looping mp4 — the gif
// look at a fraction of the size); picking one swaps the clip on the right.
// Nothing is selected initially, so the neutral default clip shows — that one
// is an animated WebP, so the renderer branches on extension.
// The "Tell me what you want" clip (default.webp re-encoded to H.264, 596KB →
// 180KB). Not default.mp4 — that file is a DIFFERENT clip the Aug 20 client
// change list replaced.
const auditDefaultGif = '/figma/home/oh-gifs/tell-me-what-you-want.mp4'
// CHNC Audit question set (31 Aug brief) — one shared set, asked before any
// module is chosen. Reaction clips are reused across rows (no new assets).
const auditQs = [
  { q: 'What do you want to', qGreen: 'improve?', opts: ['VISIBILITY', 'LEAD VOLUME', 'LEAD QUALITY', 'RETENTION'],
    gifs: ['ooh-wee', 'o-face', 'oh-i-see', 'jimbo'] },
  { q: 'What is the main', qGreen: 'issue', qEnd: ' today?', opts: ['LOW LEADS', 'POOR QUALITY', 'INCONSISTENT RESULTS', 'NOT SURE'],
    gifs: ['giphy-3', 'i-see-wow', 'matrix-ok', 'oh-snap'] },
  { q: 'What is your current', qGreen: 'setup?', opts: ['TOO MANY VENDORS', 'SLOW IN-HOUSE', 'UNSTABLE RESULTS', 'STARTING FRESH'],
    gifs: ['giphy-4', 'stranger-things', 'tiffany', 'max-stranger'] },
  { q: 'How many', qGreen: 'locations', qEnd: ' do you have?', opts: ['1-5', '6-20', '20-100', '100+'],
    gifs: ['oh-i-see', 'i-see-wow', 'ooh-wee', 'jimbo'] },
  { q: 'What is your monthly digital', qGreen: 'spend?', opts: ['UNDER ₹1L', '₹1-5L', '₹5-10L', '₹10L+'],
    gifs: ['o-face', 'oh-snap', 'matrix-ok', 'giphy-3'] },
  { q: 'Who runs your', qGreen: 'marketing', qEnd: ' today?', opts: ['IN-HOUSE TEAM', 'AN AGENCY', 'BOTH', 'NOBODY YET'],
    gifs: ['stranger-things', 'tiffany', 'giphy-4', 'max-stranger'] },
  { q: 'When do you want to', qGreen: 'start?', opts: ['RIGHT AWAY', 'THIS QUARTER', 'NEXT QUARTER', 'JUST EXPLORING'],
    gifs: ['ooh-wee', 'matrix-ok', 'i-see-wow', 'oh-i-see'] },
]

function QuizPill({ label, isActive, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'transparent',
        border: `1px solid ${isActive ? G : hovered ? 'rgba(52,204,50,0.5)' : 'rgba(255,255,255,0.15)'}`,
        height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
        fontFamily: "'Saira Condensed', sans-serif",
        fontSize: 16,
        fontWeight: isActive || hovered ? 700 : 500,
        color: isActive || hovered ? G : '#fff',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: hovered && !isActive ? 'scale(1.02)' : 'scale(1)',
      }}
    >{label}</button>
  )
}

function BrandAudit() {
  const { isSmall } = useResponsive()
  const [selections, setSelections] = useState(auditQs.map(() => null))
  const [gif, setGif] = useState(auditDefaultGif)
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
  // Warm the browser cache for every reaction clip so the swap on click is
  // instant — without this the old clip lingers while the next one downloads.
  useEffect(() => {
    auditQs.flatMap(q => q.gifs).forEach(name => {
      fetch(`/figma/home/oh-gifs/${name}.mp4`).catch(() => {})
    })
  }, [])
  const handleSelect = (qi, oi) => {
    setSelections(prev => { const next = [...prev]; next[qi] = oi; return next })
    setGif(`/figma/home/oh-gifs/${auditQs[qi].gifs[oi]}.mp4`)
  }
  return (
    <section style={{ background: DARK, padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px) 0' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <SectionLabel>Take the CHNC</SectionLabel>
          <h2 style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1, textAlign: 'center' }}>
            Find your next <span style={{ color: G }}>opportunity</span>
          </h2>
        </div>
        {live ? (
          <AuditTakeover name={auditName} company={auditCompany} />
        ) : (
        <div className={auditName !== null ? 'audit-form-out' : undefined} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center', width: '100%', pointerEvents: auditName !== null ? 'none' : undefined }}>
        <div style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', gap: isSmall ? 40 : 'clamp(40px, 8vw, 229px)', alignItems: isSmall ? 'stretch' : 'flex-start', justifyContent: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, flexShrink: 0 }}>
            {auditQs.map((q, qi) => (
              <div key={qi} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 500, fontSize: 18, color: '#fff' }}>
                  {q.q} <span style={{ color: G }}>{q.qGreen}</span>{q.qEnd || ''}
                </p>
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => (
                    <QuizPill key={oi} label={opt} isActive={oi === selections[qi]} onClick={() => handleSelect(qi, oi)} />
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
            <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 24, textAlign: 'center' }}>
              Ready for a <span style={{ color: G }}>Reality</span> check?
            </p>
          </div>
        </div>
        <AuditForm
          cta="Take the CHNC"
          context={{ page: 'home', answers: auditQs.map((q, qi) => (selections[qi] == null ? null : q.opts[selections[qi]])) }}
          onSuccess={({ name, company }) => { setAuditName(name ?? ''); setAuditCompany(company ?? '') }}
        />
        </div>
        )}
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testiTabs = ['AUTOMOBILE', 'BANKING', 'FMCG', 'RETAIL', 'FSI', 'OTHER']
// Dummy reviews pending real client quotes — fictional companies only (no real
// client names beyond the pre-existing Mahindra attribution).
const testimonials = [
  {
    tab: 'AUTOMOBILE',
    quote: ['ConvergenSEE changed the trajectory and ', 'success', " of my business, and I'm a lifelong user at this point."],
    name: 'Alina Sharma', company: 'Mahindra', photo: testiPhoto,
    stats: [
      { num: '96%', label: 'Increase in traffic growth' },
      { num: '10x', label: 'Revenue increase' },
      { num: '96%', label: 'Increase in sales' },
    ],
  },
  {
    tab: 'BANKING',
    quote: ['One dashboard finally showed us where every rupee goes; our campaigns have never been this ', 'accountable', '.'],
    name: 'Rohan Mehta', company: 'Meridian Bank', photo: '/testi-rohan.webp',
    stats: [
      { num: '3.2x', label: 'Return on ad spend' },
      { num: '41%', label: 'Lower cost per lead' },
      { num: '58%', label: 'Growth in digital accounts' },
    ],
  },
  {
    tab: 'FMCG',
    quote: ['From creative production to shelf visibility, the CHNC gave our brand a ', 'rhythm', ' we could never keep manually.'],
    name: 'Priya Nair', company: 'Everleaf Naturals', photo: '/testi-priya.webp',
    stats: [
      { num: '84%', label: 'Increase in traffic growth' },
      { num: '2.5x', label: 'D2C revenue increase' },
      { num: '47%', label: 'Faster creative delivery' },
    ],
  },
  {
    tab: 'RETAIL',
    quote: ['Every store, every listing, every review: ', 'visible', ' and improving week on week.'],
    name: 'Kabir Malhotra', company: 'UrbanNest Stores', photo: null,
    stats: [
      { num: '120+', label: 'Locations managed' },
      { num: '68%', label: 'More store visits' },
      { num: '4.6★', label: 'Average store rating' },
    ],
  },
  {
    tab: 'FSI',
    quote: ['Compliance-safe creatives at startup speed: that combination simply did not ', 'exist', ' for us before.'],
    name: 'Ananya Iyer', company: 'Crestline Insurance', photo: null,
    stats: [
      { num: '52%', label: 'Lift in qualified leads' },
      { num: '3x', label: 'Faster campaign launches' },
      { num: '96%', label: 'On-brand approval rate' },
    ],
  },
  {
    tab: 'OTHER',
    quote: ['We stopped guessing. Every decision now starts with what the data ', 'actually', ' says.'],
    name: 'Devika Rao', company: 'Northlight Edutech', photo: null,
    stats: [
      { num: '2.8x', label: 'Enrolment enquiries' },
      { num: '37%', label: 'Lower acquisition cost' },
      { num: '5x', label: 'Organic reach growth' },
    ],
  },
]

function Testimonials() {
  const { isSmall } = useResponsive()
  const [idx, setIdx] = useState(0)
  const t = testimonials[idx]
  const step = (dir) => setIdx((idx + dir + testimonials.length) % testimonials.length)
  return (
    <section style={{ background: DARK, padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px) 0' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <SectionLabel>Opportunities</SectionLabel>
          <h2 style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1, textAlign: 'center' }}>
            Brands who took the <span style={{ color: G }}>CHNC</span>
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 'clamp(8px, 1.5vw, 20px)', flexWrap: 'wrap', justifyContent: 'center' }}>
          {testiTabs.map((tab) => {
            const active = tab === t.tab
            return (
              <button key={tab} onClick={() => setIdx(testimonials.findIndex(r => r.tab === tab))} style={{
                background: 'transparent', border: active ? `1px solid ${G}` : '1px solid rgba(255,255,255,0.15)',
                height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', fontFamily: "'Saira Condensed', sans-serif",
                fontSize: 16, fontWeight: active ? 700 : 500,
                color: active ? G : '#fff', textTransform: 'uppercase', cursor: 'pointer',
                transition: 'color 0.25s ease, border-color 0.25s ease',
              }}>{tab}</button>
            )
          })}
        </div>
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginBottom: 20 }}>
            <button onClick={() => step(-1)} aria-label="Previous testimonial" className="btn-outline testi-arrow" style={{ width: 44, height: 44, borderRadius: '50%', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={() => step(1)} aria-label="Next testimonial" className="btn-outline testi-arrow" style={{ width: 44, height: 44, borderRadius: '50%', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', width: '100%' }}>
            <motion.div key={`quote-${idx}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }} style={{
              flex: 1, background: DARK, border: `2px solid ${BORDER}`,
              borderRight: isSmall ? `2px solid ${BORDER}` : 'none',
              borderBottom: isSmall ? 'none' : `2px solid ${BORDER}`,
              padding: 'clamp(24px, 4vw, 50px)', display: 'flex', flexDirection: 'column',
              justifyContent: 'space-between', gap: 30, minHeight: isSmall ? 'auto' : 505,
            }}>
              <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(18px, 2.5vw, 24px)', color: '#fff', lineHeight: 1.3, maxWidth: 658 }}>
                "{t.quote[0]}<span style={{ color: G }}>{t.quote[1]}</span>{t.quote[2]}"
              </p>
              <div style={{ display: 'flex', gap: isSmall ? 16 : 'clamp(16px, 3vw, 50px)', flexWrap: isSmall ? 'wrap' : 'nowrap' }}>
                {t.stats.map((s) => (
                  <div key={s.label} style={{ flex: isSmall ? '1 1 40%' : '1 1 0', minWidth: 0 }}>
                    <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(40px, 6vw, 60px)', fontWeight: 800, color: G, lineHeight: 1.1 }}>{s.num}</p>
                    <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 18, color: MUTED, lineHeight: '24px', marginTop: 10 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div key={`photo-${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, ease: 'easeOut' }} style={{ width: isSmall ? '100%' : 494, height: isSmall ? 'clamp(320px, 80vw, 505px)' : 505, position: 'relative', border: `2px solid ${BORDER}`, borderLeft: isSmall ? `2px solid ${BORDER}` : 'none', overflow: 'hidden', flexShrink: 0, background: DARK }}>
              {t.photo ? (
                <img loading="lazy" src={t.photo} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span aria-hidden="true" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 200, lineHeight: 1, color: 'rgba(52,204,50,0.12)' }}>
                    {t.name.split(' ').map(w => w[0]).join('')}
                  </span>
                </div>
              )}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,7,24,0) 42%, #000718)' }} />
              <div style={{ position: 'absolute', bottom: 40, left: 38 }}>
                <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 24 }}>{t.name}</p>
                <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 500, fontSize: 16, color: MUTED, marginTop: 8 }}>{t.company}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Team ─────────────────────────────────────────────────────────────────────
// A slice of the real roster for the home-page strip — everyone here has a pose.
const teamMembers = withPose.slice(0, 12)

function Team() {
  return (
    <section style={{ background: DARK, padding: 'clamp(56px, 8vw, 100px) 0 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 'clamp(40px, 6vw, 80px)', padding: '0 clamp(20px, 6vw, 100px)' }}>
        <SectionLabel>Team</SectionLabel>
        <h2 style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1, textAlign: 'center' }}>
          Meet the <span style={{ color: G }}>opportunity creators!</span>
        </h2>
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', gap: 2, overflowX: 'auto', padding: '0 clamp(20px, 6vw, 100px)', scrollbarWidth: 'none' }}>
          {teamMembers.map(m => (
            <TeamMemberCard key={m.name} member={m} variant="strip" />
          ))}
        </div>
        {/* Edge fades track the viewport: 160px on desktop, but only ~40px on a
            phone — at a fixed 160 the two fades swallowed 320px of a 390px
            screen and dissolved the first card's photo and name into the dark. */}
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 'clamp(28px, 10vw, 160px)', background: 'linear-gradient(to right, #000718 60%, transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 'clamp(28px, 10vw, 160px)', background: 'linear-gradient(to left, #000718 60%, transparent)', pointerEvents: 'none' }} />
      </div>
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Link href="/team" className="btn-outline" style={{
          background: 'transparent', color: '#fff', border: '1px solid #fff',
          height: 46, padding: '0 20px',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          boxSizing: 'border-box',
          fontFamily: "'Saira Condensed', sans-serif",
          fontSize: 16, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.02em', cursor: 'pointer', backdropFilter: 'blur(10px)',
        }}>Meet them all</Link>
      </div>
    </section>
  )
}

// ─── Advisory Board ───────────────────────────────────────────────────────────
const boardMembers = [
  // TODO: real titles + bios pending from the client (bios below are placeholder)
  { name: 'Balaji Jagannathan', lowercaseName: true, title: 'CEO', bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', img: boardImg },
  { name: 'Prakash Satyapalan', title: 'Advisory Board Member', bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', img: '/figma/home/board-prakash.webp' },
  { name: 'Vikram Nair', title: 'Advisory Board Member', bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', img: '/figma/home/board-vikram.webp' },
]

function BoardCard({ member, active, onToggle }) {
  const [hovered, setHovered] = useState(false)
  const { isMobile, isSmall } = useResponsive()
  // On mobile the parent owns the open state so a tap on one card closes the
  // others; elsewhere hover drives the reveal.
  const shown = active ?? hovered
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Phones: a real tap (onClick) so starting a swipe along the scroll row
      // doesn't pop a card open; tablets keep the touch toggle.
      onClick={onToggle}
      onTouchStart={onToggle ? undefined : () => setHovered(h => !h)}
      style={{
        // Cells keep the desktop 400×561 proportion. Phones get a swipeable
        // row: each card ~75% of the viewport with the next one peeking in.
        flex: isMobile ? '0 0 75%' : 1,
        scrollSnapAlign: isMobile ? 'center' : undefined,
        position: 'relative', overflow: 'hidden',
        cursor: 'pointer', aspectRatio: '400 / 561',
        // White backing: Bala's portrait is a transparent cutout, so without
        // this the dark page shows through instead of a studio background.
        background: '#fff',
        // padding-box keeps the white backing from painting under the border,
        // which read as a permanent white outline on the dark page.
        backgroundClip: 'padding-box',
        border: `1px solid ${shown ? G : 'transparent'}`,
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Full image */}
      <img
        src={member.img} loading="lazy"
        alt={member.name}
        style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
          transform: shown ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.6s ease',
          display: 'block',
        }}
      />

      {/* Gradient overlay — always a subtle base, deepens on hover */}
      <div style={{
        position: 'absolute', inset: 0,
        background: shown
          ? 'rgba(0,7,24,0.88)'
          : 'linear-gradient(to top, rgba(0,7,24,0.6) 0%, rgba(0,7,24,0.0) 60%)',
        transition: 'background 0.4s ease',
      }} />

      {/* Green top border accent on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: G,
        transform: shown ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.4s ease',
      }} />

      {/* Text — slides up on hover */}
      <div style={{
        position: 'absolute', inset: 0,
        padding: isSmall ? '14px 12px' : '32px 28px',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        transform: shown ? 'translateY(0)' : 'translateY(24px)',
        opacity: shown ? 1 : 0,
        transition: 'transform 0.45s ease, opacity 0.4s ease',
      }}>
        {/* Bio scrolls if a long one still overflows the card. */}
        <p style={{
          fontFamily: "'Archivo', sans-serif", fontSize: isMobile ? 13 : isSmall ? 11 : 18, color: MUTED,
          lineHeight: isMobile ? 1.5 : isSmall ? 1.45 : '28px', marginBottom: isMobile ? 8 : isSmall ? 12 : 32,
          flex: 1, minHeight: 0, overflowY: 'auto', paddingTop: isSmall ? 8 : 32,
        }}>{member.bio}</p>
        <div>
          <p style={{
            fontFamily: "'Archivo', sans-serif", fontWeight: 700,
            fontSize: isSmall ? 'clamp(13px, 3.5vw, 20px)' : 36,
            lineHeight: isSmall ? 1.15 : '40px', color: '#fff', marginBottom: isSmall ? 4 : 10,
          }}>{member.name}</p>
          <p style={{
            fontFamily: "'Archivo', sans-serif", fontSize: isSmall ? 11 : 18, color: MUTED, letterSpacing: '1px',
          }}>{member.title}</p>
        </div>
      </div>

      {/* Name always visible at bottom (subtle, disappears on hover). Styled
          to match the Team strip cards (TeamMemberCard variant="strip"). */}
      <div style={{
        position: 'absolute', bottom: isMobile ? 16 : 24, left: isMobile ? 16 : 24, right: isMobile ? 16 : 24,
        opacity: shown ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}>
        <p style={{
          fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700,
          fontSize: isMobile ? 20 : isSmall ? 22 : 28, lineHeight: 1.1, letterSpacing: '0.02em',
          textTransform: member.lowercaseName ? 'lowercase' : 'uppercase', color: '#fff',
        }}>{member.name}</p>
      </div>
    </div>
  )
}

function AdvisoryBoard() {
  // The cards keep their 400×561 proportion (aspect-ratio in BoardCard): one
  // row on tablet/desktop, a horizontal scroll-snap row on phones. Hover
  // reveals the bio in-card on desktop/tablet; on mobile a tap does the same
  // (the parent owns the open state so only one card is open at a time).
  const { isMobile, isSmall } = useResponsive()
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <section id="advisory-board" style={{ background: DARK, padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <SectionLabel>Advisory Board</SectionLabel>
          <h2 style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1, textAlign: 'center' }}>
            People who built <span style={{ color: G }}>CHNC</span> with us
          </h2>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: MUTED, lineHeight: 1.5, textAlign: 'center', maxWidth: 798, margin: 0 }}>
            CHNC was shaped by people who've built and scaled brands in the real world. Our advisory board has helped ConvergenSEE stay clear on direction and stronger in thinking. Their guidance has influenced how we build systems, execute, and measure impact. Even today, they continue to shape how CHNC grows.
          </p>
        </div>
        <div style={{ width: '100%' }}>
          <div style={{
            display: 'flex', justifyContent: isMobile ? 'flex-start' : 'center', gap: isSmall ? 12 : 20,
            // Phones: bleed the row to the screen edges (cancelling the
            // section's side padding) so cards slide in from off-screen.
            ...(isMobile ? {
              overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none',
              margin: '0 calc(-1 * clamp(20px, 6vw, 100px))', padding: '0 clamp(20px, 6vw, 100px)',
              scrollPaddingInline: 'clamp(20px, 6vw, 100px)',
            } : {}),
          }}>
            {boardMembers.map((m, i) => (
              <BoardCard
                key={i} member={m}
                active={isMobile ? openIdx === i : undefined}
                onToggle={isMobile ? () => setOpenIdx(openIdx === i ? null : i) : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={{ background: DARK, padding: '0 clamp(20px, 6vw, 100px) clamp(56px, 8vw, 100px)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <SectionLabel>Connect with us</SectionLabel>
          <h2 style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1, textAlign: 'center' }}>
            We will <span style={{ color: G }}>shoot</span> you
          </h2>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}


// The landing page — every section that used to render when page === 'home'.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Clients />
      <About />
      <CHNC />
      <Impact />
      <BrandAudit />
      <Testimonials />
      <Team />
      <AdvisoryBoard />
      <Contact />
      <Footer />
    </>
  )
}
