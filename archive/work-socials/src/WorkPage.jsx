'use client'

// Work Page — "Our Work" portfolio grid
import { useState } from 'react'
import Image from 'next/image'
import LazyVideo from './LazyVideo'
import useResponsive from './useResponsive'
import Footer from './Footer'
import { NAV_H } from './theme'

const G      = '#34cc32'
const DARK   = '#000718'
const CARD   = '#0f1520'
const MUTED  = 'rgba(255,255,255,0.7)'
const DIM    = '#666a74'
const BORDER = 'rgba(255,255,255,0.1)'

// ─── Project data ─────────────────────────────────────────────────────────────
const CHNC_PROJECTS = [
  {
    name: 'Platform UI/UX', category: 'Design', year: '2025', client: 'CHNC',
    timeline: '4 months',
    img: '/figma/work/macbook2.png',
    headline: 'How CHNC unified eight services into a single command-centre dashboard, cutting operator onboarding time by 60%.',
    intro: 'The CHNC platform had grown organically across eight product verticals. Navigation was fragmented, data was siloed, and operators were spending more time switching contexts than executing strategy. We were tasked with designing a unified interface that felt as powerful as it looked.',
    challenge: 'A fractured product experience was slowing down operators and masking the platform\'s true capability.',
    challengeBody: 'With eight distinct modules built by separate teams, the platform lacked a shared design language. Onboarding new operators took weeks. Power users had to maintain mental maps across six different nav structures. The cost of context-switching was real and measurable.',
    imgs: [
      '/figma/work/macbook2.png',
      '/figma/home/img-asset11.png',
    ],
  },
  {
    name: 'Brand Identity', category: 'Branding', year: '2024', client: 'CHNC',
    timeline: '6 weeks',
    img: '/figma/home/img-asset11.png',
    headline: 'Building a brand identity that communicates convergence, ambition, and technological authority in a single mark.',
    intro: 'CHNC needed a visual identity that could carry weight across a B2B SaaS platform, enterprise pitch decks, and street-level marketing. The identity had to feel premium without feeling distant, authoritative without feeling cold.',
    challenge: 'No brand system existed. Every touchpoint was inconsistent, eroding trust with enterprise buyers.',
    challengeBody: 'Stakeholders across verticals were producing materials independently, resulting in five different logo treatments, three colour palettes, and no typographic consistency. The brand was invisible where it needed to be loudest.',
    imgs: [
      '/figma/home/img-asset11.png',
      '/figma/dashboard-chnc/img-rectangle50.jpg',
    ],
  },
  {
    name: 'Marketing Collateral', category: 'Campaign', year: '2024', client: 'CHNC',
    timeline: '3 months',
    img: '/figma/dashboard-chnc/img-rectangle50.jpg',
    headline: 'A modular collateral system that lets any team produce on-brand materials without a designer in the loop.',
    intro: 'Marketing velocity was being throttled by design bottlenecks. Every sales deck, one-pager, and event banner had to pass through a two-person design team. We built a template system that put production power in the hands of the people closest to the customer.',
    challenge: 'Sales cycles were stalling because custom collateral took too long to produce.',
    challengeBody: 'The design team was a single point of failure for every client-facing asset. A bespoke pitch deck took 4–6 business days. Event materials were routinely off-brand. The pipeline was suffering in silence.',
    imgs: [
      '/figma/dashboard-chnc/img-rectangle50.jpg',
      '/figma/dashboard-chnc/img-rectangle51.jpg',
    ],
  },
  {
    name: 'Motion & Video', category: 'Production', year: '2023', client: 'CHNC',
    timeline: '8 weeks',
    img: '/figma/dashboard-chnc/img-rectangle51.jpg',
    headline: 'A motion identity that turns data dashboards into cinematic proof of platform capability.',
    intro: 'Static screenshots couldn\'t communicate the dynamism of the CHNC platform. We developed a motion language (transitions, micro-animations, and a product film) that translated raw feature depth into felt experience.',
    challenge: 'Video content was ad hoc, inconsistent, and consistently underperforming on paid channels.',
    challengeBody: 'Three separate agencies had produced product videos over two years, each with different visual treatments. Click-through rates on paid social were below industry benchmarks. The platform\'s speed and intelligence were simply not coming through on screen.',
    imgs: [
      '/figma/dashboard-chnc/img-rectangle51.jpg',
      '/figma/work/macbook1.png',
    ],
  },
  {
    name: 'Web Design', category: 'Design', year: '2023', client: 'CHNC',
    timeline: '5 months',
    img: '/figma/work/macbook1.png',
    headline: 'Redesigning the CHNC marketing site to convert enterprise decision-makers in under three minutes.',
    intro: 'The existing site was functional but forgettable. In a category defined by complexity, buyers needed to feel confident and excited before they ever booked a demo. We rebuilt the site as a conversion engine disguised as a brand statement.',
    challenge: 'High traffic, low conversion. The site was generating awareness it couldn\'t close.',
    challengeBody: 'Session data showed users spending time on the platform overview pages but dropping before reaching the demo CTA. The value proposition wasn\'t landing. Enterprise buyers were leaving with questions the site never answered.',
    imgs: [
      '/figma/work/macbook1.png',
      '/figma/home/img-asset31.webp',
    ],
  },
  {
    name: 'KrateIT', category: 'Branding', year: '2022', client: 'KrateIT',
    timeline: '10 weeks',
    img: '/figma/home/img-asset31.webp',
    headline: 'A bold consumer brand for a logistics disruptor entering a market dominated by incumbents with thirty-year head starts.',
    intro: 'KrateIT was entering the last-mile logistics space with a tech-first model that none of the legacy players had. The brand needed to signal speed, reliability, and modernity, and it needed to do it loud enough to cut through category noise.',
    challenge: 'Breaking into a commoditised market where price is assumed to be the only differentiator.',
    challengeBody: 'Established players owned the trust narrative. Shippers defaulted to incumbents out of habit, not preference. KrateIT had a genuinely superior product but no brand equity to support the claim. They needed identity before they could drive adoption.',
    imgs: [
      '/figma/home/img-asset31.webp',
      '/figma/work/macbook2.png',
    ],
  },
]

// Brand photos from Figma (backgrounds)
const imgMahindraPhoto = '/figma/case-study/img-mahindra2.webp'
const imgAxisPhoto     = '/figma/case-study/img-mahindra3.webp'
const imgSBIPhoto      = '/figma/case-study/img-mahindra4.jpg'
const imgLACPhoto      = '/figma/case-study/img-mahindra5.webp'

const BRAND_PROJECTS = [
  {
    name: 'Content Creation', category: 'Mahindra & Mahindra', year: '2025', client: 'Mahindra & Mahindra', timeline: '12 months',
    img: '/thar-mountains.webp', logo: '/mahindra-m.webp', logoBg: 'transparent',
    desc: 'End-to-end content creation and social media management driving a 96% surge in website actions.',
    headline: 'How end-to-end content strategy drove a 96% surge in website actions across Mahindra\'s digital channels.',
    intro: 'Mahindra\'s digital presence spanned multiple product lines, regions, and audiences, yet the content strategy was reactive, siloed, and inconsistent. We embedded as a full-stack content partner: strategy, production, and distribution, running in parallel across their core verticals.',
    challenge: 'A legacy enterprise with fragmented content ownership and no unified digital voice.',
    challengeBody: 'Each product vertical operated its own social presence with no shared editorial calendar, no brand tone guidelines, and no performance benchmarking. Content was produced to fill calendars, not to move audiences. Engagement was declining quarter on quarter despite increasing post frequency.',
    imgs: ['/scorpio-n.webp', '/thar-roxx-delhi.webp'],
    sections: [
      { label: 'Mahindra & Mahindra', brand: 'Automobile', imgs: ['/thar-mountains.webp', '/scorpio-n.webp', '/thar-roxx-ahm.webp', '/thar-new-year.webp', '/thar-roxx-delhi.webp', '/xuv400.webp', '/ev.webp', '/pv-range.webp'] },
      { label: 'Food & Beverage Client', brand: 'F&B', imgs: ['/chocolate-cake.webp', '/coffee-story.webp', '/cover-02.webp', '/tiramisu.webp', '/tiramisu-2.webp', '/tres-leches.webp', '/hamper.webp'] },
      { label: 'Lifestyle & Retail', brand: 'Lifestyle', imgs: ['/creative-1.webp', '/creative-2.webp', '/creative-3.webp', '/creative-4.webp', '/creative-5.webp', '/creative-6.webp', '/creative-7.webp', '/creative-8.webp', '/creative-9.webp', '/creative-10.webp', '/creative-11.webp', '/creative-12.webp', '/creative-13.webp', '/creative-14.webp', '/creative-15.webp', '/creative-16.webp', '/creative-17.webp', '/creative-18.webp', '/creative-19.webp', '/creative-20.webp', '/dyk-20.webp', '/dyk-21.webp', '/artboard-1.webp', '/artboard-2.webp', '/artboard-7.webp', '/frame-1.png', '/untitled-7.webp', '/attendence.webp'] },
    ],
    reels: ['/people-tech.mp4', '/review-reel.mp4', '/thar-mountains.webp', '/tiramisu.webp', '/scorpio-n.webp', '/chocolate-cake.webp'],
  },
  {
    name: 'UI/UX', category: 'MG Motor', year: '2024', client: 'MG Motor India', timeline: '9 months',
    img: imgAxisPhoto, logo: '/MG-Logo.webp', logoBg: 'transparent',
    desc: 'Location page strategy and UI/UX overhaul across 2,000+ branches for seamless digital discovery.',
    headline: 'Rebuilding local digital discovery for 2,000+ MG Motor locations, turning search intent into showroom visits.',
    intro: 'MG Motor had expanded aggressively across India, but their digital infrastructure hadn\'t kept pace. Potential buyers searching for their nearest showroom were landing on outdated, unoptimised location pages, or not finding them at all. We redesigned the entire location-page experience from the ground up.',
    challenge: 'Thousands of location pages generating traffic but failing to convert local intent into footfall.',
    challengeBody: 'Location pages were templated with minimal localisation, poor structured data, and no CTAs calibrated to buyer journey stage. Search visibility for high-intent local queries was being ceded to competitors. The gap between digital discovery and physical visit was costing MG Motor measurable sales.',
    imgs: [imgAxisPhoto, imgSBIPhoto],
  },
  {
    name: 'Creative Production', category: 'Kotak Mutual Fund', year: '2024', client: 'Kotak Mutual Fund', timeline: '6 months',
    img: imgSBIPhoto, logo: '/kotak-mf.png', logoBg: 'transparent',
    desc: 'Integrated brand communications and campaign production across digital and offline channels.',
    headline: 'A unified brand communications system for one of India\'s most trusted mutual fund houses, built for scale.',
    intro: 'Kotak Mutual Fund was managing brand communications across digital, print, OOH, and broadcast simultaneously, with different agencies handling each. The result was a brand that felt fragmented despite its scale. We designed and produced an integrated campaign architecture that brought everything under a single visual and strategic framework.',
    challenge: 'Multi-agency complexity was diluting brand consistency at the exact moment audience trust was being built.',
    challengeBody: 'Investors interacting with Kotak MF across touchpoints were receiving subtly different brand signals: different tones, different visual hierarchies, different calls to action. In financial services, where trust is the primary conversion driver, inconsistency is expensive. The brand needed to feel like one entity, everywhere.',
    imgs: [imgSBIPhoto, imgLACPhoto],
  },
  {
    name: 'Influencer Marketing', category: 'Aptech', year: '2023', client: 'Aptech Limited', timeline: '8 months',
    img: imgLACPhoto, logo: '/Aptech-Logo.webp', logoBg: 'transparent',
    desc: 'Influencer-led creative production and performance campaigns across education verticals.',
    headline: 'Driving enrolment for Aptech\'s education verticals through influencer-led performance campaigns built for Gen Z.',
    intro: 'Aptech needed to reach a generation that doesn\'t respond to traditional education advertising. We designed and executed an influencer-led content and performance campaign strategy that met prospective students on the platforms they actually live on, with creative that felt native, not sponsored.',
    challenge: 'Legacy advertising formats were failing to reach or convert a digitally native student audience.',
    challengeBody: 'Aptech\'s media mix skewed heavily toward broadcast and OOH, formats with low measurability and poor resonance with 18–24 year olds. Digital spend was being deployed without a coherent influencer or content strategy. Cost per enrolment was rising while lead quality declined.',
    imgs: [imgLACPhoto, imgMahindraPhoto],
  },
]

const PLATFORM_SERVICES = [
  'InsightIT', 'LocateIT', 'CreateIT', 'AmplifyIT', 'SocialiseIT',
  'InfluenceIT', 'ScriptIT', 'AIgenIT', 'SearchIT', 'InvoiceIT',
]

const TABS = ['CHNC PLATFORM', 'BRAND WORK']

// ─── Platform tile ────────────────────────────────────────────────────────────
function PlatformTile({ name }) {
  const [hovered, setHovered] = useState(false)
  const split = name.replace(/(IT)$/, '|IT').split('|')
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? G : BORDER}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(24px, 4vw, 40px) 20px', cursor: 'default',
        transition: 'border-color 0.25s ease',
      }}
    >
      <p style={{
        fontFamily: "'Saira Condensed', sans-serif",
        fontWeight: 700, fontSize: 22,
        letterSpacing: '0.04em',
        color: hovered ? G : DIM,
        margin: 0, textAlign: 'center', lineHeight: 1,
        transition: 'color 0.25s ease',
      }}>
        {split[0]}<span style={{ color: G }}>{split[1]}</span>
      </p>
    </div>
  )
}

// ─── Brand tile ───────────────────────────────────────────────────────────────
function BrandTile({ project, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
      style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9', cursor: 'pointer', background: CARD }}
    >
      <Image src={project.img} alt={project.name} fill sizes="(max-width: 480px) 100vw, 50vw" style={{
        objectFit: 'cover',
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform 0.6s ease',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered ? 'rgba(0,7,24,0.82)' : 'rgba(0,7,24,0.45)',
        transition: 'background 0.4s ease',
      }} />
      <div style={{ position: 'absolute', top: 20, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ background: 'rgba(255,255,255,0.95)', padding: '5px 12px', fontFamily: "'Archivo', sans-serif", fontSize: 12, fontWeight: 600, color: '#000', letterSpacing: '0.5px' }}>{project.category}</div>
        <span style={{ fontFamily: "'Archivo', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>/{project.year}</span>
      </div>

      {/* Service name — centred, shrinks + fades out on hover */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered ? 0 : 1,
        transform: hovered ? 'scale(0.85)' : 'scale(1)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        pointerEvents: 'none',
        padding: '0 40px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'Saira Condensed', sans-serif",
          fontWeight: 800, fontSize: 'clamp(22px, 3vw, 42px)',
          textTransform: 'uppercase', lineHeight: 1.1,
          color: '#fff', letterSpacing: '-0.01em', margin: 0,
        }}>{project.name}</p>
      </div>

      {/* Bottom gradient mask */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
        background: 'linear-gradient(to top, rgba(0,7,24,0.9) 0%, transparent 100%)',
        pointerEvents: 'none',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }} />

      {/* Bottom — brand name slides up on hover */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '24px',
        transform: hovered ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.45s ease',
      }}>
        <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 28, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1, marginBottom: 10 }}>{project.name}.</p>
        <p style={{
          fontFamily: "'Archivo', sans-serif", fontSize: 14, color: MUTED, lineHeight: '20px',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s',
        }}>{project.desc}</p>
      </div>

      <div style={{ position: 'absolute', inset: 0, border: `2px solid ${G}`, opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }} />
    </div>
  )
}

// ─── Project tile ─────────────────────────────────────────────────────────────
function ProjectTile({ project, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
      style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9', cursor: 'pointer', background: CARD }}
    >
      <Image src={project.img} alt={project.name} fill sizes="(max-width: 480px) 100vw, 50vw" style={{
        objectFit: 'cover',
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform 0.6s ease',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)', opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease' }} />
      <div style={{ position: 'absolute', top: 20, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ background: 'rgba(255,255,255,0.95)', padding: '5px 12px', fontFamily: "'Archivo', sans-serif", fontSize: 12, fontWeight: 600, color: '#000', letterSpacing: '0.5px' }}>{project.category}</div>
        <span style={{ fontFamily: "'Archivo', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>/{project.year}</span>
      </div>
      <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
        <p style={{
          fontFamily: "'Saira Condensed', sans-serif", fontSize: 28, fontWeight: 700, color: '#fff',
          textTransform: 'uppercase', lineHeight: 1.1,
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'transform 0.35s ease',
        }}>{project.name}.</p>
      </div>
      <div style={{ position: 'absolute', inset: 0, border: `2px solid ${G}`, opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }} />
    </div>
  )
}

// ─── Case Study Modal ─────────────────────────────────────────────────────────
function CaseStudyModal({ project, onClose }) {
  const { isMobile, isSmall } = useResponsive()
  const navOffset = isSmall ? NAV_H.small : NAV_H.desktop
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: DARK, overflow: 'auto', fontFamily: "'Archivo', sans-serif", color: '#fff' }}>

      {/* Breadcrumb nav — sits just below the main nav */}
      <div style={{ marginTop: navOffset, position: 'sticky', top: navOffset, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px clamp(20px, 6vw, 60px)', background: 'rgba(0,7,24,0.95)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${BORDER}` }}>
        <div
          onClick={onClose}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontFamily: "'Archivo', sans-serif", fontSize: 14, color: MUTED }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = MUTED}
        >
          <span style={{ fontSize: 16 }}>‹</span>
          <span>Our Work</span>
          <span style={{ color: DIM }}>›</span>
          <span style={{ color: '#fff' }}>{project.name}</span>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: `1px solid ${BORDER}`, color: '#fff', width: isSmall ? 42 : 36, height: isSmall ? 42 : 36, flexShrink: 0, cursor: 'pointer', fontSize: isSmall ? 15 : 13, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s, color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = '#fff' }}>✕</button>
      </div>

      {/* Service header */}
      <div style={{ padding: 'clamp(40px, 6vw, 60px) clamp(20px, 6vw, 60px) clamp(32px, 5vw, 48px)', borderBottom: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-1px', fontSize: 'clamp(32px, 6vw, 56px)', lineHeight: 1, color: '#fff', margin: 0 }}>
          {project.name}
        </h1>
        <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 16, color: MUTED, lineHeight: '24px', margin: 0, maxWidth: 640 }}>
          {project.desc}
        </p>
        {project.sections && (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 }}>
            {project.sections.map((sec, i) => (
              <span key={i} style={{ border: `1px solid ${BORDER}`, padding: '5px 12px', fontFamily: "'Archivo', sans-serif", fontSize: 13, color: MUTED }}>
                {sec.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Full-bleed hero image */}
      <div style={{ background: CARD }}>
        <img loading="lazy" src={project.img} alt={project.name} style={{ width: '100%', display: 'block', maxHeight: 680, objectFit: 'cover' }} />
      </div>

      {/* Sectioned gallery or fallback 2-col grid */}
      {project.sections ? project.sections.map((sec, si) => (
        <div key={si} style={{ borderTop: `1px solid ${BORDER}` }}>
          <div style={{ padding: 'clamp(28px, 5vw, 40px) clamp(20px, 6vw, 60px) 20px', display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <h2 style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(22px, 4vw, 30px)', color: '#fff', textTransform: 'uppercase', margin: 0 }}>{sec.label}</h2>
            {sec.brand && <span style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: DIM, letterSpacing: '2px', textTransform: 'uppercase' }}>{sec.brand}</span>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 2, background: DARK }}>
            {sec.imgs.map((img, i) => (
              <div key={i} style={{ overflow: 'hidden', background: CARD }}>
                <img src={img} alt="" loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} />
              </div>
            ))}
          </div>
        </div>
      )) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 2, background: DARK }}>
            {project.imgs.map((img, i) => (
              <div key={i} style={{ overflow: 'hidden', background: CARD }}>
                <img src={img} alt="" loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
              </div>
            ))}
          </div>
          <div style={{ background: CARD, marginTop: 2 }}>
            <img src={project.imgs[0]} alt="" loading="lazy" decoding="async" style={{ width: '100%', display: 'block', maxHeight: 500, objectFit: 'cover', opacity: 0.85 }} />
          </div>
        </>
      )}

      {/* Reels & Shorts */}
      <div style={{ padding: 'clamp(32px, 5vw, 48px) clamp(20px, 6vw, 60px)', borderTop: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(22px, 4vw, 30px)', color: '#fff', textTransform: 'uppercase', margin: 0 }}>Reels & Shorts</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: isSmall ? 'wrap' : 'nowrap' }}>
          {(project.reels || [project.img, project.imgs[0], project.imgs[1] || project.img, project.img]).map((src, i) => {
            const isVideo = src.endsWith('.mp4')
            return (
              <div key={i} style={{ flex: isSmall ? '1 1 140px' : 1, minWidth: isSmall ? 120 : 0, aspectRatio: '9/16', overflow: 'hidden', background: CARD, position: 'relative', cursor: 'pointer' }}>
                {isVideo ? (
                  <LazyVideo src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <img src={src} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,7,24,0.3)' }} />
                {!isVideo && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', background: 'rgba(255,255,255,0.1)' }}>
                      <div style={{ width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '14px solid #fff', marginLeft: 3 }} />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

// ─── WorkPage ─────────────────────────────────────────────────────────────────
export default function WorkPage() {
  const { isMobile, isSmall } = useResponsive()
  const [tab, setTab] = useState('chnc')
  const [modal, setModal] = useState(null)

  const projects = tab === 'chnc' ? CHNC_PROJECTS : BRAND_PROJECTS

  return (
    <div style={{ background: DARK, minHeight: '100vh', paddingTop: isSmall ? NAV_H.small : NAV_H.desktop, color: '#fff' }}>

      {/* Hero */}
      <section style={{ padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px) 0', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center' }}>
            <h1 style={{
              fontFamily: "'Saira Condensed', sans-serif",
              fontSize: 'clamp(56px, 14vw, 150px)', fontWeight: 800, lineHeight: 1,
              textTransform: 'uppercase', letterSpacing: '-3px', margin: 0,
              whiteSpace: 'nowrap',
            }}>
              <span style={{ color: '#fff' }}>OUR </span>
              <span style={{ color: G }}>WORK</span>
            </h1>
            <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: '#fff', lineHeight: '24px', maxWidth: 798, margin: 0 }}>
              Discover the power of our secure and rewarding copy. Explore our range of copy and take control of your copy today. Discover the power of our secure and rewarding copy. Explore our range of copy and take control of your copy today. Discover us.
            </p>
          </div>

          {/* Tab pills */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          {TABS.map((t) => {
            const isActive = (t === 'CHNC PLATFORM' && tab === 'chnc') || (t === 'BRAND WORK' && tab === 'brand')
            return (
              <div key={t} className="pill-hover" onClick={() => setTab(t === 'CHNC PLATFORM' ? 'chnc' : 'brand')} style={{
                height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
                background: CARD,
                border: isActive ? `1px solid ${G}` : 'none',
                backdropFilter: 'blur(10px)',
                fontFamily: "'Saira Condensed', sans-serif",
                fontSize: 16, fontWeight: isActive ? 700 : 500,
                color: isActive ? G : DIM,
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}>{t}</div>
            )
          })}
          </div>
        </div>
      </section>

      {/* Project grid */}
      <div style={{ padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px) clamp(56px, 8vw, 100px)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div className="work-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 8 }}>
            {projects.map((p) => (
              tab === 'brand'
                ? <BrandTile key={p.name} project={p} onClick={setModal} />
                : <ProjectTile key={p.name} project={p} onClick={setModal} />
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {modal && <CaseStudyModal project={modal} onClose={() => setModal(null)} />}
    </div>
  )
}
