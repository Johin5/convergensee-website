'use client'

// Case Studies Page — built from Figma node 1:1855 (Landing Page - Dark-cASE STUDY)
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useResponsive from './useResponsive'
import SectionLabel from './SectionLabel'

import Footer from './Footer'
import ContactForm from './ContactForm'
import LazyVideo from './LazyVideo'
import { PATH_FOR } from './lib/routes'
const G     = '#34cc32'
const DARK  = '#000718'
const CARD  = '#0f1520'
const MUTED = 'rgba(255,255,255,0.7)'
const DIM   = '#666a74'
const BORDER = 'rgba(255,255,255,0.1)'

// ─── Figma assets ─────────────────────────────────────────────────────────────
const imgMahindraPhoto   = '/figma/case-study/img-mahindra2.webp'
const imgUnicornPhoto    = '/unicorn-poster.webp'
const imgSBIPhoto        = '/figma/case-study/img-mahindra3.webp'
const imgLACPhoto        = '/figma/case-study/img-mahindra5.webp'

// ─── Case study data ──────────────────────────────────────────────────────────
// No brand logos anywhere — client can't use them. The auto brand stays
// anonymised ("India's largest auto brand"), keeping the video card.
const CASES = [
  {
    photo: imgMahindraPhoto,
    video: '/mahindra.mp4',
    poster: '/mahindra-poster.webp',
    name: "India's largest auto brand",
    type: 'Hyperlocal presence',
    stats: [{ val: '125%', label: 'Increase in customer engagement' }, { val: '7.5L+', label: 'Leads at an average of ₹55 per lead' }, { val: '12,000+', label: 'Vehicles sold' }],
    href: PATH_FOR['mahindra'],
  },
  {
    photo: imgUnicornPhoto,
    video: '/unicorn.mp4',
    poster: '/unicorn-poster.webp',
    name: 'Unicorn',
    type: 'Performance marketing',
    stats: [{ val: '96%', label: 'Surge in website actions' }, { val: '10x', label: 'Revenue increase' }, { val: '96%', label: 'Increase in sales' }],
  },
  {
    photo: imgSBIPhoto,
    video: '/sbi.mp4',
    poster: '/sbi-poster.webp',
    name: 'SBI',
    type: 'Content creation',
    stats: [{ val: '96%', label: 'Surge in website actions' }, { val: '10x', label: 'Revenue increase' }, { val: '96%', label: 'Increase in sales' }],
  },
  {
    photo: imgLACPhoto,
    video: '/love-and-cheesecake.mp4',
    poster: '/love-and-cheesecake-poster.jpg',
    name: 'Love & Cheesecake',
    type: 'Location pages',
    stats: [{ val: '96%', label: 'Surge in website actions' }, { val: '10x', label: 'Revenue increase' }, { val: '96%', label: 'Increase in sales' }],
  },
  // ── From the website copy doc (Website - ConvergenSEE.pdf) — anonymised ──
  {
    photo: '/artboard-1.png',
    video: '/life-insurance.mp4',
    poster: '/life-insurance-poster.webp',
    name: 'Leading life insurance brand',
    type: 'Content at scale',
    stats: [{ val: '42%', label: 'Faster creative delivery timelines' }, { val: '~50%', label: 'Reduction in time-to-market' }, { val: '2x', label: 'Designer productivity: 2 to 4 creatives a day' }],
    href: PATH_FOR['life-insurance'],
  },
  {
    photo: '/figma/case-study/img-mahindra4.jpg',
    name: 'Emerging small finance bank',
    type: 'Performance marketing',
    stats: [{ val: '5,500+', label: 'Conversions in a 90-day pilot' }, { val: '₹192', label: 'Cost per conversion' }, { val: '7 Cr+', label: 'Impressions across Meta & Google' }],
    href: PATH_FOR['small-finance-bank'],
  },
]

const INDUSTRIES = ['ALL', 'AUTO', 'FMCG', 'RETAIL', 'FSI', 'OTHERS']

// ─── Components ───────────────────────────────────────────────────────────────
function CaseCard({ c, href }) {
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef(null)
  // Freeze the clip on the frame under the cursor while the stats are showing
  const setHover = (on) => {
    setHovered(on)
    const v = videoRef.current
    if (!v) return
    if (on) v.pause()
    else v.play().catch(() => {})
  }
  // Touch screens have no hover, so there the card is static: stats always
  // shown under the image, no hover state at all.
  const [touch, setTouch] = useState(false)
  useEffect(() => {
    setTouch(window.matchMedia('(hover: none)').matches)
  }, [])
  const Wrapper = href ? Link : 'div'
  return (
    <Wrapper
      {...(href ? { href } : {})}
      onMouseEnter={touch ? undefined : () => setHover(true)}
      onMouseLeave={touch ? undefined : () => setHover(false)}
      style={{ position: 'relative', display: 'block', overflow: 'hidden', cursor: href ? 'pointer' : 'default', background: touch ? 'transparent' : '#1a2235', color: 'inherit', textDecoration: 'none' }}
    >
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
        {c.video ? (
          <LazyVideo
            videoRef={videoRef}
            src={c.video}
            poster={c.poster}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.6s ease',
            }}
          />
        ) : (
          <Image src={c.photo} alt={c.name} fill sizes="(max-width: 480px) 100vw, 50vw" style={{
            objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.6s ease',
          }} />
        )}
        {/* Dark overlay — on touch the stats sit below the image, so it only dims lightly */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered && !touch ? 'rgba(0,7,24,0.85)' : 'rgba(0,7,24,0.45)',
          transition: 'background 0.4s ease',
        }} />

        {/* Top — type tag, boxed like the industry pills */}
        <div style={{ position: 'absolute', top: touch ? 14 : 20, right: touch ? 14 : 20, zIndex: 3 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', height: 30, padding: '0 14px',
            background: 'transparent',
            border: `2px solid ${BORDER}`,
            fontFamily: "'Saira Condensed', sans-serif",
            fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
            color: '#fff',
          }}>{c.type}</span>
        </div>

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 180,
          background: 'linear-gradient(to top, rgba(0,7,24,0.95) 0%, transparent 100%)',
          pointerEvents: 'none',
          opacity: hovered || touch ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }} />

        {/* Bottom — brand name always visible, stats slide up on hover */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, padding: touch ? 20 : 24, zIndex: 2,
        }}>
          <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: touch ? 24 : 28, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1, marginBottom: hovered && !touch ? 14 : 0 }}>{c.name}</p>
          {!touch && (
            <div style={{
              display: 'flex', gap: 20,
              maxHeight: hovered ? 200 : 0, overflow: 'hidden',
              opacity: hovered ? 1 : 0,
              transition: 'max-height 0.45s ease, opacity 0.35s ease',
            }}>
              {c.stats.map((s, i) => (
                <div key={i}>
                  <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 52, fontWeight: 800, color: G, lineHeight: 1, margin: 0 }}>{s.val}</p>
                  <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: MUTED, lineHeight: '16px', marginTop: 6 }}>{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Touch — stats always shown under the image */}
      {touch && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
          padding: '16px 0 8px',
        }}>
          {c.stats.map((s, i) => (
            <div key={i} style={{ minWidth: 0 }}>
              <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 30, fontWeight: 800, color: G, lineHeight: 1, margin: 0, whiteSpace: 'nowrap' }}>{s.val}</p>
              <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 11, color: MUTED, lineHeight: '15px', marginTop: 6 }}>{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Green border on hover / focus */}
      <div style={{ position: 'absolute', inset: 0, border: `2px solid ${G}`, opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: 'none', zIndex: 4 }} />
    </Wrapper>
  )
}

export default function CaseStudiesPage() {
  const { isMobile } = useResponsive()
  return (
    <div style={{ background: DARK, minHeight: '100vh', color: '#fff' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{
        // 100vh isn't compensated by the laptop-scale body zoom — divide by --pz
        // so the hero still covers the full screen on 1025–1727px viewports.
        position: 'relative', height: 'calc(100vh / var(--pz, 1))', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', textAlign: 'center',
        background: DARK, padding: '0 clamp(20px, 6vw, 100px)',
      }}>
        {/* Background video slot — case-studies showreel, same markup as the home hero:
            <video autoPlay muted loop playsInline preload="metadata" poster="/case-studies-hero-poster.webp"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}>
              <source src="/case-studies-hero.mp4" type="video/mp4" />
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

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center', textAlign: 'center' }}>
          <h1 style={{
            fontFamily: "'Saira Condensed', sans-serif",
            fontSize: 'clamp(56px, 14vw, 150px)', fontWeight: 800, lineHeight: 1,
            textTransform: 'uppercase', letterSpacing: '-3px', margin: 0,
            maxWidth: 1100, textShadow: '0 2px 24px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.6)',
          }}>
            <span style={{ color: '#fff' }}>WORK WE </span>
            <span style={{ color: G }}>LOVE </span>
            <span style={{ color: '#fff' }}>TO TALK ABOUT.</span>
          </h1>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: '#fff', lineHeight: 1.5, maxWidth: 798, margin: 0, textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>
            Real brands. Real challenges. Real impact. A look at the moments where our thinking
            met execution and delivered something worth sharing!
          </p>
        </div>
      </section>

      {/* ── Case study grid ────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center' }}>
          {/* Industry filter pills */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            {INDUSTRIES.map((ind) => (
              <div key={ind} className="pill-hover" style={{
                height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
                background: 'transparent',
                border: `1px solid ${ind === 'ALL' ? G : BORDER}`,
                backdropFilter: 'blur(10px)',
                fontFamily: "'Saira Condensed', sans-serif",
                fontSize: 16, fontWeight: ind === 'ALL' ? 700 : 500,
                color: ind === 'ALL' ? G : DIM,
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}>{ind}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 8, width: '100%' }}>
            {CASES.map((c, i) => (
              <CaseCard key={i} c={c} href={c.href} />
            ))}
          </div>

          {/* Load more */}
          <button className="btn-outline" style={{
            marginTop: 10,
            background: 'transparent', border: '1px solid #fff',
            height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', fontFamily: "'Saira Condensed', sans-serif",
            fontSize: 16, fontWeight: 700, color: '#fff',
            textTransform: 'uppercase', letterSpacing: '0.02em', cursor: 'pointer',
            backdropFilter: 'blur(10px)',
          }}>LOAD MORE</button>
        </div>
      </section>

      {/* ── Contact: "We will shoot you" ───────────────────────────────────── */}
      <section style={{ padding: '0 clamp(20px, 6vw, 100px) clamp(56px, 8vw, 100px)', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <SectionLabel>Connect with us</SectionLabel>
          <h2 style={{
            fontFamily: "'Saira Condensed', sans-serif",
            fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800, lineHeight: 1,
            textTransform: 'uppercase', textAlign: 'center', margin: 0,
          }}>
            <span style={{ color: '#fff' }}>We will </span>
            <span style={{ color: G }}>shoot </span>
            <span style={{ color: '#fff' }}>you</span>
          </h2>
        </div>

        <ContactForm />
      </section>

      <Footer />
    </div>
  )
}
