'use client'

// Mahindra Case Study Page — built from Figma node 1:2843 (Landing Page - Dark-cASE STUDY-mahindra)

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useResponsive from './useResponsive'
import SectionLabel from './SectionLabel'

import Footer from './Footer'
import ContactForm from './ContactForm'
import { PATH_FOR } from './lib/routes'
const G      = '#34cc32'
const DARK   = '#000718'
const CARD   = '#0f1520'
const MUTED  = 'rgba(255,255,255,0.7)'
const DIM    = '#666a74'
const BORDER = 'rgba(255,255,255,0.1)'

// ─── Assets ───────────────────────────────────────────────────────────────────
const imgMahindraHero  = '/figma/case-study-mahindra/img-mahindra1.webp'
const imgConvergenC    = '/figma/case-study-mahindra/img-c2-d.svg'

// ─── Other case studies — same set as the Case Studies grid, minus the auto brand ───
const OTHER_CASES = [
  {
    photo: '/unicorn-poster.webp',
    name:  'Unicorn',
    type:  'Performance marketing',
    stat:  { val: '96%', label: 'Surge in website actions' },
  },
  {
    photo: '/sbi-poster.webp',
    name:  'SBI',
    type:  'Content creation',
    stat:  { val: '10x', label: 'Revenue increase' },
  },
  {
    photo: '/love-and-cheesecake-poster.jpg',
    name:  'Love & Cheesecake',
    type:  'Location pages',
    stat:  { val: '96%', label: 'Increase in sales' },
  },
]

// Tile that reads the same as a card on the Case Studies grid: photo, type pill,
// brand name always on, headline stat revealed on hover. No brand logos.
function OtherCaseTile({ c, href }) {
  const [hovered, setHovered] = useState(false)
  const Wrapper = href ? Link : 'div'
  return (
    <Wrapper
      {...(href ? { href } : {})}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', display: 'block', overflow: 'hidden', aspectRatio: '16/10', cursor: href ? 'pointer' : 'default', background: '#1a2235', color: 'inherit', textDecoration: 'none' }}
    >
      <Image src={c.photo} alt={c.name} fill sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw" style={{
        objectFit: 'cover',
        transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.6s ease',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: hovered ? 'rgba(0,7,24,0.85)' : 'rgba(0,7,24,0.45)', transition: 'background 0.4s ease' }} />

      {/* Type tag */}
      <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 3 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', height: 30, padding: '0 14px',
          border: `2px solid ${BORDER}`, fontFamily: "'Saira Condensed', sans-serif",
          fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#fff',
        }}>{c.type}</span>
      </div>

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 160,
        background: 'linear-gradient(to top, rgba(0,7,24,0.95) 0%, transparent 100%)',
        pointerEvents: 'none', opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease',
      }} />

      {/* Name always on, stat slides up on hover */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, zIndex: 2 }}>
        <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 22, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1, margin: 0, marginBottom: hovered ? 12 : 0, transition: 'margin-bottom 0.35s ease' }}>{c.name}</p>
        <div style={{ maxHeight: hovered ? 120 : 0, overflow: 'hidden', opacity: hovered ? 1 : 0, transition: 'max-height 0.45s ease, opacity 0.35s ease' }}>
          <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 44, fontWeight: 800, color: G, lineHeight: 1, margin: 0 }}>{c.stat.val}</p>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: MUTED, lineHeight: '16px', margin: '6px 0 0' }}>{c.stat.label}</p>
        </div>
      </div>

      {/* Green border on hover */}
      <div style={{ position: 'absolute', inset: 0, border: `2px solid ${G}`, opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }} />
    </Wrapper>
  )
}

export default function MahindraPage() {
  const { isMobile, isSmall } = useResponsive()
  const router = useRouter()
  return (
    <div style={{ background: DARK, minHeight: '100vh', color: '#fff' }}>

      {/* ── Hero — runs under the fixed nav, same as the home page video ────── */}
      <section style={{ position: 'relative', width: '100%', height: isSmall ? 'calc(clamp(360px, 78vw, 480px) + 106px)' : 'calc(clamp(480px, 42vw, 560px) + 106px)', overflow: 'hidden' }}>
        <Image src={imgMahindraHero} alt="India's largest auto brand" fill priority sizes="100vw" style={{ objectFit: 'cover', display: 'block' }} />
        {/* Veil — dark at the top so the nav has something to sit on, dark at the
            foot so the image blends into the page; keeps the lockup legible. */}
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${DARK} 0%, rgba(0,7,24,0.55) 22%, rgba(0,7,24,0.55) 55%, rgba(0,7,24,0.85) 100%)` }} />
        {/* Soft scrim behind the lockup — keeps the white mark and headline
            legible over the light panels of the car without a visible box. */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 46% 42% at 50% 52%, rgba(0,7,24,0.82) 0%, rgba(0,7,24,0.6) 40%, rgba(0,7,24,0) 78%)' }} />
        {/* Overlay content: lockup + description — offset for the nav. The brand
            is anonymised (no client logos anywhere), so the ConvergenSEE mark
            pairs with the study name set in type, same as CaseStudyDetailPage. */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center', justifyContent: 'center', padding: '106px clamp(20px, 6vw, 100px) 0', boxSizing: 'border-box', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 25, justifyContent: 'center', flexWrap: 'wrap' }}>
            <img loading="lazy" src={imgConvergenC} alt="ConvergenSEE" style={{ width: 60, height: 53.5, objectFit: 'contain', flexShrink: 0, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.55))' }} />
            <span style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 60.4, color: '#34cc32', letterSpacing: '-1.511px', lineHeight: 1, flexShrink: 0 }}>x</span>
            <span style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1, color: '#fff', textTransform: 'uppercase', textShadow: '0 2px 6px rgba(0,0,0,0.55)' }}>
              India's largest auto brand
            </span>
          </div>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 18, color: '#fff', lineHeight: '24px', maxWidth: 566, textAlign: 'center', margin: 0 }}>
            Helping one of India's largest automobile brands win locally through hyperlocal presence:
            dealer-specific advertising across 585+ locations.
          </p>
        </div>
      </section>

      {/* ── Main content wrapper ────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <section style={{ padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px) 0', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>

          {/* Top stats row */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 20, alignItems: 'stretch', width: '100%', justifyContent: 'center' }}>
            {[
              { val: '125%',    label: 'Increase in customer engagement' },
              { val: '7.5L+',   label: 'Leads generated at an average cost of ₹55 per lead' },
              { val: '12,000+', label: 'Vehicles sold' },
            ].map((s, i) => (
              <div key={i} style={{ border: `2px solid ${BORDER}`, width: isMobile ? '100%' : 300, maxWidth: 300, padding: 'clamp(20px, 4vw, 30px)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(48px, 8vw, 80px)', lineHeight: 1.1, color: G, margin: 0, textTransform: 'uppercase' }}>{s.val}</p>
                <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: MUTED, lineHeight: '24px', margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── The Challenge ─────────────────────────────────────────────────── */}
        <section style={{ padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px) 0', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
          <h2 style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(40px, 8vw, 80px)', lineHeight: 1, color: '#fff', textTransform: 'uppercase', margin: 0 }}>
            The Challenge
          </h2>
          <div style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', gap: 20, alignItems: 'stretch', width: '100%', justifyContent: 'center' }}>
            {[
              { num: '1.', text: 'With 585+ dealer locations across the country, the brand ran largely on one national voice in its advertising.' },
              { num: '2.', text: "There was an opportunity to bring each dealership's advertising closer to its own local audience." },
              { num: '3.', text: 'Local relevance had to work at scale: creative, targeting, and handles for every single dealership.' },
            ].map((item, i) => (
              <div key={i} style={{ border: `2px solid ${BORDER}`, padding: 'clamp(20px, 4vw, 30px)', width: isSmall ? '100%' : 400, maxWidth: isSmall ? 'none' : 400, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(36px, 6vw, 50px)', lineHeight: 1, color: G, margin: 0, textTransform: 'uppercase' }}>{item.num}</p>
                <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: MUTED, lineHeight: '24px', margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Solution ──────────────────────────────────────────────────────── */}
        <section style={{ padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px) 0', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
          <h2 style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(40px, 8vw, 80px)', lineHeight: 1, color: '#fff', textTransform: 'uppercase', margin: 0 }}>
            Solution
          </h2>
          <div style={{ width: isSmall ? '100%' : 786, maxWidth: 786, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              "ConvergenSEE built and ran hyperlocal, dealer-specific advertising, matching creative and targeting to each dealership's ideal local audience, at scale, across 585+ locations.",
              'Produced 3,000+ hyperlocal creatives every month tailored to local context instead of one national campaign, and built 2,500+ localised, dealer-specific ads targeting the ideal audience around each dealership.',
              'Managed 200+ dealer handles across Facebook & Instagram and 1,000+ brand & dealer touchpoints, running the program continuously over 30 months (Jun 2020 – Dec 2022).',
            ].map((text, i) => (
              <p key={i} style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: '#fff', lineHeight: 1.6, margin: 0 }}>
                <span aria-hidden="true" style={{ display: 'inline-block', width: '0.55em', height: '0.55em', borderRadius: '50%', background: G, marginRight: '0.5em', verticalAlign: '0.08em' }} />{text}
              </p>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', gap: 20, alignItems: 'stretch', width: '100%', justifyContent: 'center' }}>
            {[
              { val: '75%',    label: 'Increase in website visits, with 65% more phone calls and 40% more direction requests', tag: 'HYPERLOCAL PRESENCE' },
              { val: '3,000+', label: 'Hyperlocal creatives produced every month, tailored to local context', tag: 'CREATIVE AT SCALE' },
            ].map((s, i) => (
              <div key={i} style={{ border: `2px solid ${BORDER}`, padding: 'clamp(20px, 4vw, 30px)', width: isSmall ? '100%' : 610, maxWidth: isSmall ? 'none' : 610, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(48px, 8vw, 80px)', lineHeight: 1.1, color: G, margin: 0, textTransform: 'uppercase' }}>{s.val}</p>
                <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: MUTED, lineHeight: '24px', margin: 0 }}>{s.label}</p>
                <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, fontSize: 16, color: G, textTransform: 'uppercase', margin: 0 }}>{s.tag}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery removed per the 31 Aug brief (Auto case study). */}

        {/* ── Other brands ──────────────────────────────────────────────────── */}
        <section style={{ padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px)', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
          <h2 style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(40px, 8vw, 80px)', lineHeight: 1, color: '#fff', textTransform: 'uppercase', textAlign: 'center', margin: 0 }}>
            Check out the awesomeeeeee stuff we've done for{' '}
            <span style={{ color: G }}>other brands</span>
          </h2>

          {/* Other case studies — tiles instead of a logo wall, so each one is a
              way into the work rather than just a badge. */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center', width: '100%', maxWidth: 1240 }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isSmall ? '1fr 1fr' : '1fr 1fr 1fr', gap: 8, width: '100%' }}>
              {OTHER_CASES.map((c, i) => (
                <OtherCaseTile
                  key={i}
                  c={c}
                  href={PATH_FOR['case-studies']}
                />
              ))}
            </div>

            <button
              className="btn-outline"
              onClick={() => router.push(PATH_FOR['case-studies'])}
              style={{
                background: 'transparent', border: `1px solid ${G}`,
                height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
                fontFamily: "'Saira Condensed', sans-serif", fontSize: 16, fontWeight: 700, color: G,
                textTransform: 'uppercase', letterSpacing: '0.02em', cursor: 'pointer', backdropFilter: 'blur(10px)',
              }}
            >
              View all case studies
            </button>
          </div>
        </section>

        {/* ── Contact: "We will shoot you" ────────────────────────────────────── */}
        <section style={{ padding: '0 clamp(20px, 6vw, 100px) clamp(56px, 8vw, 100px)', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <SectionLabel>Connect with us</SectionLabel>
            <h2 style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800, lineHeight: 1, textTransform: 'uppercase', textAlign: 'center', margin: 0 }}>
              <span style={{ color: '#fff' }}>We will </span>
              <span style={{ color: G }}>shoot </span>
              <span style={{ color: '#fff' }}>you</span>
            </h2>
          </div>

          <ContactForm />
        </section>

        <Footer />
      </div>
    </div>
  )
}
