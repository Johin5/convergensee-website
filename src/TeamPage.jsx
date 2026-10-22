'use client'

import Footer from './Footer'
import useResponsive from './useResponsive'
import { NAV_H } from './theme'
import { TEAM as MEMBERS } from './lib/teamRoster'
import TeamMemberCard from './TeamMemberCard'
import useWarmImages from './useWarmImages'
import ContactForm from './ContactForm'
import SectionLabel from './SectionLabel'
// Team Page — built from Figma node 1:2311 (Landing Page - Dark-Team)

const G      = '#34cc32'
const DARK   = '#000718'
const CARD   = '#0f1520'
const MUTED  = 'rgba(255,255,255,0.7)'
const DIM    = '#666a74'
const BORDER = 'rgba(255,255,255,0.1)'

// Cards withhold the pose shot until first hover; warming the cache behind the
// page makes that swap instant. Video members reveal the clip, not the pose,
// so their (much heavier) media stays hover-gated.
const POSES = MEMBERS.filter((m) => m.pose && !m.video).map((m) => m.pose)

export default function TeamPage() {
  const { isMobile, isSmall } = useResponsive()
  useWarmImages(POSES)

  return (
    <div style={{ background: DARK, minHeight: '100vh', paddingTop: isSmall ? NAV_H.small : NAV_H.desktop, color: '#fff', overflow: 'hidden' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: 'clamp(56px, 11vw, 170px) clamp(20px, 6vw, 100px) 0', display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center', textAlign: 'center' }}>
        {/* Wavy word bands parked in TeamHeroBands.jsx for reuse (1 Oct 2026) */}
        <h1 style={{
          fontFamily: "'Saira Condensed', sans-serif",
          fontSize: 'clamp(56px, 14vw, 150px)', fontWeight: 800, lineHeight: 1,
          textTransform: 'uppercase', letterSpacing: '-3px', margin: 0,
          whiteSpace: 'nowrap',
          position: 'relative', zIndex: 1,
        }}>
          <span style={{ color: '#fff' }}>MEET THE </span>
          <span style={{ color: G }}>TEAM</span>
        </h1>
        <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: '#fff', lineHeight: 1.5, maxWidth: 798, margin: 0, position: 'relative', zIndex: 1 }}>
          We are you, the dreamers who see what could be, the thinkers who question what is, the
          builders who refuse to settle. We're not your brand. We're your people, solving,
          creating, and growing right alongside you.
        </p>
      </section>

      {/* ── Team grid ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px)' }}>
        <div className="team-grid" style={{
          display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center',
          maxWidth: 1286, margin: '0 auto',
        }}>
          {MEMBERS.map(m => <TeamMemberCard key={m.name} member={m} />)}
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '0 clamp(20px, 6vw, 100px) clamp(56px, 8vw, 100px)', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
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
  )
}
