'use client'

// Job detail page — "the role as a story". Opens the way case studies and
// blog posts do: a full-width photo under the site's dark veils with the
// role overlaid (tags, title, meta, apply). Below: the brief as a split
// reading block, the home page's team strip scoped to the hiring team,
// numbered hiring steps, then the shared application form.
import Link from 'next/link'
import useResponsive from './useResponsive'
import Footer from './Footer'
import JoinSection from './JoinSection'
import TeamMemberCard from './TeamMemberCard'
import { TEAM_GROUPS } from './lib/careersTeams'
import { TEAM } from './lib/teamRoster'
import { G, DARK, MUTED, BORDER } from './careersAtoms'
import SectionLabel from './SectionLabel'

// PLACEHOLDER COPY — drafted to brand voice, not approved. Swap freely.
const HIRING_STEPS = [
  { num: '01', title: 'Apply', desc: 'Send your CV and your work. That’s it, no cover-letter theatre.' },
  { num: '02', title: 'Intro chat', desc: '30 minutes with the team lead about what you’ve made and what you want to make.' },
  { num: '03', title: 'Craft task', desc: 'A short exercise close to the real work, never free work we ship.' },
  { num: '04', title: 'Offer', desc: 'We move fast. If it’s a yes, you’ll hear within the week.' },
]

// Tag pill — same object as the tags on the blog and case-study tiles.
function Tag({ label }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      height: 30, padding: '0 14px',
      background: 'transparent',
      border: `2px solid rgba(255,255,255,0.25)`,
      fontFamily: "'Saira Condensed', sans-serif",
      fontSize: 13, fontWeight: 600, letterSpacing: '0.04em',
      textTransform: 'uppercase', color: '#fff',
    }}>{label}</span>
  )
}

// The design bullets each open with a green dot rather than a list marker.
function Bullet({ children }) {
  return (
    <li style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <span aria-hidden="true" style={{
        width: 8, height: 8, background: G, borderRadius: '50%',
        flexShrink: 0, marginTop: 11,
      }} />
      <span style={{
        fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)',
        lineHeight: '30px', color: '#fff',
      }}>{children}</span>
    </li>
  )
}

// A brief column — heading over a short green rule, then the green-dot list.
function Brief({ title, items }) {
  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <h2 style={{
          fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(24px, 3vw, 30px)',
          fontWeight: 800, textTransform: 'uppercase', color: '#fff', margin: 0, lineHeight: 1.1,
        }}>{title}</h2>
        <div style={{ width: 44, height: 3, background: G, marginTop: 10 }} />
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map(item => <Bullet key={item}>{item}</Bullet>)}
      </ul>
    </div>
  )
}

export default function JobPage({ job }) {
  const { isSmall, isMobile } = useResponsive()

  // The hiring team's blurb and faces, resolved from the same data the
  // careers and team pages use. Missing lookups degrade to not rendering.
  const group = TEAM_GROUPS.find(g => g.name === job.team)
  const members = (group?.members || [])
    .map(name => TEAM.find(p => p.name === name))
    .filter(Boolean)

  // Last word of the role goes green, the way every site heading carries
  // one green word — MOTION GRAPHICS <green>DESIGNER</green>.
  const words = job.title.split(' ')
  const head = words.slice(0, -1).join(' ')
  const tail = words[words.length - 1]

  return (
    <div style={{ background: DARK, minHeight: '100vh', color: '#fff' }}>

      {/* ── Hero — the case-study opening: photo under veils, role overlaid ─── */}
      <section style={{
        position: 'relative', width: '100%',
        height: isSmall ? 'calc(clamp(400px, 88vw, 520px) + 106px)' : 'calc(clamp(480px, 42vw, 600px) + 106px)',
        overflow: 'hidden',
      }}>
        {job.image && (job.image.endsWith('.mp4') ? (
          <video
            src={job.image} poster={job.imagePoster}
            autoPlay muted loop playsInline
            aria-label={job.imageAlt || `${job.title} at ConvergenSEE`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <img
            src={job.image} alt={job.imageAlt || `${job.title} at ConvergenSEE`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ))}
        {/* Veils — dark at the top for the nav, dark at the foot to blend into
            the page; radial pocket keeps the headline legible. Same treatment
            as the blog-read and case-study heroes. */}
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${DARK} 0%, rgba(0,7,24,0.55) 22%, rgba(0,7,24,0.55) 55%, rgba(0,7,24,0.88) 100%)` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 56% 46% at 50% 55%, rgba(0,7,24,0.82) 0%, rgba(0,7,24,0.6) 40%, rgba(0,7,24,0) 78%)' }} />

        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          gap: 20, alignItems: 'center', justifyContent: 'center',
          padding: '106px clamp(20px, 6vw, 100px) 0', boxSizing: 'border-box', textAlign: 'center',
        }}>
          <Link
            href="/careers" className="btn-outline"
            style={{
              background: 'rgba(0,7,24,0.4)', border: `1px solid ${G}`, color: G,
              height: 36, padding: '0 16px', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              boxSizing: 'border-box', textDecoration: 'none', backdropFilter: 'blur(10px)',
              fontFamily: "'Saira Condensed', sans-serif", fontSize: 13, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.02em',
            }}
          >&larr; All openings</Link>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Tag label={`${job.team} team`} />
            <Tag label="Mumbai" />
            <Tag label={job.employmentType || 'Full-Time'} />
            {job.experience && <Tag label={`${job.experience} experience`} />}
          </div>

          <h1 style={{
            fontFamily: "'Saira Condensed', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(36px, 6vw, 72px)',
            letterSpacing: '-1px',
            lineHeight: 1,
            textTransform: 'uppercase',
            color: '#fff',
            maxWidth: 1000,
            margin: 0,
          }}>
            {head && <span style={{ color: '#fff' }}>{head} </span>}
            <span style={{ color: G }}>{tail}</span>
          </h1>

          <a
            href="#apply" className="btn-outline"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: isMobile ? '100%' : 'fit-content', height: 46, padding: '0 20px',
              background: 'rgba(0,7,24,0.4)', color: '#fff', border: '1px solid #fff', boxSizing: 'border-box',
              fontFamily: "'Saira Condensed', sans-serif", fontSize: 16, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.02em', textDecoration: 'none',
              backdropFilter: 'blur(10px)',
            }}
          >Apply now</a>
        </div>
      </section>

      {/* ── The brief — responsibilities / requirements, split reading block ── */}
      <section style={{ padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px)' }}>
        <div className="job-brief" style={{
          maxWidth: 1240, margin: '0 auto',
          display: 'flex', flexDirection: isSmall ? 'column' : 'row',
          gap: 'clamp(32px, 4vw, 60px)', alignItems: 'stretch',
        }}>
          <Brief title="Responsibilities" items={job.responsibilities} />
          <div className="job-brief-rule" style={{
            alignSelf: 'stretch', flexShrink: 0,
            width: isSmall ? '100%' : 1, height: isSmall ? 1 : 'auto',
            background: BORDER,
          }} />
          <Brief title="Requirements" items={job.requirements} />
        </div>
      </section>

      {/* ── Team — the home page's strip, scoped to the hiring team ─────────── */}
      {group && members.length > 0 && (
        <section style={{ background: DARK, padding: '0 0 clamp(56px, 8vw, 100px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 'clamp(24px, 4vw, 40px)', padding: '0 clamp(20px, 6vw, 100px)' }}>
            <SectionLabel>Team</SectionLabel>
            <h2 style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1, textAlign: 'center', margin: 0 }}>
              Meet the <span style={{ color: G }}>{group.name}</span> team
            </h2>
            <p style={{
              fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)',
              color: MUTED, lineHeight: 1.5, margin: '10px 0 0', maxWidth: 640, textAlign: 'center',
            }}>{group.blurb}</p>
          </div>
          <div style={{ position: 'relative' }}>
            {/* Touch widths snap each swipe to a card start, offset by the side
                gutter, so a name never comes to rest half under the edge fade. */}
            <div style={{
              display: 'flex', gap: 2, overflowX: 'auto', padding: '0 clamp(20px, 6vw, 100px)', scrollbarWidth: 'none',
              ...(isSmall && { scrollSnapType: 'x mandatory', scrollPaddingInline: 'clamp(20px, 6vw, 100px)' }),
            }}>
              {members.map(m => (
                <div key={m.name} style={{ flex: '0 0 auto', scrollSnapAlign: 'start' }}>
                  <TeamMemberCard member={m} variant="strip" />
                </div>
              ))}
            </div>
            {/* Edge fades track the viewport (like the home Team strip) so a
                phone keeps the first card and its name readable. */}
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 'clamp(28px, 10vw, 160px)', background: 'linear-gradient(to right, #000718 60%, transparent)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 'clamp(28px, 10vw, 160px)', background: 'linear-gradient(to left, #000718 60%, transparent)', pointerEvents: 'none' }} />
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/team" className="btn-outline" style={{
              background: 'transparent', color: '#fff', border: '1px solid #fff',
              height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              boxSizing: 'border-box', textDecoration: 'none',
              fontFamily: "'Saira Condensed', sans-serif", fontSize: 16, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.02em', backdropFilter: 'blur(10px)',
            }}>Meet them all</Link>
          </div>
        </section>
      )}

      {/* ── How we hire — numbered step cards ───────────────────────────────── */}
      <section style={{ background: DARK, padding: '0 clamp(20px, 6vw, 100px)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <SectionLabel>Process</SectionLabel>
            <h2 style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1, textAlign: 'center', margin: 0 }}>
              How we <span style={{ color: G }}>hire</span>
            </h2>
          </div>
          <div className="job-steps" style={{
            display: 'grid', width: '100%',
            gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : isSmall ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))',
            gap: 20,
          }}>
            {HIRING_STEPS.map((s) => (
              <div key={s.num} style={{
                border: `2px solid ${BORDER}`, padding: 'clamp(20px, 4vw, 30px)',
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(32px, 3.4vw, 44px)', fontWeight: 800, color: G, lineHeight: 1, margin: 0 }}>{s.num}</p>
                <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(18px, 2.2vw, 22px)', fontWeight: 700, textTransform: 'uppercase', color: '#fff', lineHeight: 1.1, margin: 0 }}>{s.title}</p>
                <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: MUTED, lineHeight: '21px', margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Apply ───────────────────────────────────────────────────────────── */}
      <div id="apply">
        <JoinSection
          headingSize="clamp(32px, 4.6vw, 60px)"
          position={job.title}
          sub="Just drop in your CVs below!"
          heading={<>
            <span style={{ color: '#fff' }}>FUTURE </span>
            <span style={{ color: G }}>OPPORTUNITIES</span>
            <span style={{ color: '#fff' }}> START HERE</span>
          </>}
        />
      </div>

      <Footer />
    </div>
  )
}
