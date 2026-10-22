'use client'

// About Page — built from Figma node 1:841 (Landing Page - Dark-About)
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LazyVideo from './LazyVideo'
import useResponsive from './useResponsive'
import SectionLabel from './SectionLabel'
import { PATH_FOR } from './lib/routes'

import Footer from './Footer'
const G    = '#34cc32'
const DARK = '#000718'
const CARD = '#0f1520'
const MUTED = 'rgba(255,255,255,0.7)'
const DIM  = '#666a74'

// ─── Asset URLs (from Figma MCP) ─────────────────────────────────────────────
const imgTeam        = '/figma/about/img221.webp'
const imgBala        = '/figma/about/img-image6.png'
const imgValCard1    = '/figma/about/img-component134.jpg'
const imgValWalk     = '/walk-the-talk.mp4'
const imgValFoolish  = '/be-foolish.mp4'

// ─── Value card ───────────────────────────────────────────────────────────────
function ValueCard({ line1, line1Green, line2, line2Green, bg, desc }) {
  const { isSmall } = useResponsive()
  return (
    <div className="card-hover" style={{
      position: 'relative', width: isSmall ? '100%' : 610, maxWidth: isSmall ? 'none' : 610, height: isSmall ? 'clamp(200px, 50vw, 300px)' : 300,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', flexShrink: 0,
    }}>
      {/* base */}
      <div style={{ position: 'absolute', inset: 0, background: CARD }} />
      {/* texture bg — an .mp4 plays as a muted loop, anything else is a still */}
      {bg.endsWith('.mp4') ? (
        <LazyVideo src={bg} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
      ) : (
        <Image src={bg} alt="" fill sizes="(max-width: 1024px) 100vw, 610px" style={{ objectFit: 'cover', pointerEvents: 'none' }} />
      )}
      {/* dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,7,24,0.7)' }} />
      {/* text */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{
          fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 600,
          lineHeight: 1.05, textTransform: 'uppercase',
        }}>
          <span style={{ color: line1Green ? G : '#fff', fontWeight: line1Green ? 700 : 600 }}>{line1}</span>
        </div>
        {line2 && (
          <div style={{
            fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: line2Green ? 700 : 600,
            lineHeight: 1.05, textTransform: 'uppercase',
            color: line2Green ? G : '#fff',
          }}>
            {line2}
          </div>
        )}
        {desc && (
          <p style={{
            fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(14px, 1.6vw, 16px)', color: MUTED,
            lineHeight: 1.5, maxWidth: 460, margin: '14px auto 0', padding: '0 20px',
          }}>{desc}</p>
        )}
      </div>
    </div>
  )
}

// ─── About Page ───────────────────────────────────────────────────────────────
const WORDS = ['Think', 'Believe', 'Create']

export default function AboutPage() {
  const { isMobile, isSmall } = useResponsive()
  const [wordIdx, setWordIdx] = useState(1) // start on "Believe"
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setWordIdx(i => (i + 1) % WORDS.length)
        setVisible(true)
      }, 400)
    }, 1700)
    return () => clearInterval(interval)
  }, [])


  // Bala polaroid collage. Desktop: right of the letter. Small screens: between
  // the heading and the letter body (it used to trail after the sign-off).
  const balaCollage = (
    <div style={{ width: isSmall ? '100%' : 732, maxWidth: isSmall ? 'none' : 732, height: isSmall ? 'clamp(320px, 70vw, 702px)' : 800, overflow: 'hidden', flexShrink: 0, position: 'relative', alignSelf: isSmall ? undefined : 'center', marginRight: isSmall ? 0 : 48 }}>
      <Image src="/bala-polaroid.webp" alt="Letter from Bala" fill sizes="(max-width: 1024px) 100vw, 732px" style={{
        objectFit: 'contain', objectPosition: isSmall ? 'center' : 'right center', pointerEvents: 'none',
        // The polaroids fill only the middle of the frame (dark margin is baked
        // into the image), so phones zoom in to drop the dead space.
        transform: isSmall ? 'scale(1.45)' : undefined,
      }} />
    </div>
  )
  return (
    <div style={{ background: DARK, minHeight: '100vh', color: '#fff' }}>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section style={{
        // 100vh isn't compensated by the laptop-scale body zoom — divide by --pz
        // so the hero still covers the full screen on 1025–1727px viewports.
        position: 'relative', height: 'calc(100vh / var(--pz, 1))', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', textAlign: 'center',
        background: DARK, padding: '0 20px',
      }}>
        {/* React 19 hoists this into <head>: fetch the poster at top priority
            so the hero backdrop paints immediately. */}
        <link rel="preload" as="image" href="/about-hero-poster.jpg" fetchPriority="high" />

        {/* Background video — ConvergenSEE about showreel */}
        <video
          autoPlay muted loop playsInline preload="metadata"
          poster="/about-hero-poster.jpg"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0.6,
          }}
        >
          <source src="/about-hero.mp4" type="video/mp4" />
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

        {/* Hero text */}
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <h1 style={{
              fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(56px, 14vw, 150px)', fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: '-3px', lineHeight: 1, margin: 0,
              whiteSpace: 'nowrap', textShadow: '0 2px 24px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.6)',
            }}>
              <span style={{ color: '#fff' }}>WE </span>
              {/* Every word sits in the same grid cell (the others clipped away), so
                  the slot is always as wide as the widest word and 'WE' / 'IT'
                  never shift. The clip overhangs the glyph box by 30px so the
                  h1's blurred text-shadow isn't cut into a dark rectangle. */}
              <span style={{ display: 'inline-grid', justifyItems: 'center', verticalAlign: 'top' }}>
                {WORDS.map((w, i) => (
                  <span key={w} aria-hidden={i === wordIdx ? undefined : 'true'} style={{
                    gridArea: '1 / 1',
                    color: G,
                    // Off-duty words stay fully clipped, so the incoming one
                    // animates its reveal from the same hidden state.
                    clipPath: visible && i === wordIdx ? 'inset(-30px -30px -30px -30px)' : 'inset(-30px 100% -30px 0)',
                    transition: visible
                      ? 'clip-path 0.5s cubic-bezier(0.77, 0, 0.175, 1)'
                      : 'clip-path 0.3s cubic-bezier(0.77, 0, 0.175, 1)',
                  }}>{w}</span>
                ))}
              </span>
              <span style={{ color: '#fff' }}> IT</span>
            </h1>
            <p style={{
              fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(18px, 2.5vw, 24px)',
              fontWeight: 400, color: '#fff', lineHeight: '30px', margin: 0,
              textShadow: '0 1px 12px rgba(0,0,0,0.8)',
            }}>
              We are <span style={{ color: G, fontWeight: 700 }}>ConvergenSEE</span>
            </p>
          </div>
          <p style={{
            fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: '#fff',
            lineHeight: '24px', maxWidth: 798, textShadow: '0 1px 12px rgba(0,0,0,0.8)',
          }}>
            A team of thinkers, doers, and opportunity creators who genuinely care about the brands
            we work with. We're a Martech brand that believes technology should solve real problems.
            We research relentlessly, think deeply, and build with love because that's the only way
            we know how to work. From strategy to execution, we're right there with you: your
            people, your partners, making things happen together!
          </p>
        </div>
      </section>

      {/* ── Letter from Bala ────────────────────────────────────────────────── */}
      <section id="letter-from-bala" style={{ background: DARK, paddingLeft: isSmall ? 0 : 'clamp(20px, 6vw, 100px)' }}>
        <div style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', alignItems: 'stretch', justifyContent: 'space-between' }}>
          {/* Left: text */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 30,
            justifyContent: 'center', paddingTop: 'clamp(56px, 8vw, 100px)', paddingBottom: 'clamp(56px, 8vw, 100px)',
            paddingLeft: isSmall ? 'clamp(20px, 6vw, 100px)' : 0,
            paddingRight: isSmall ? 'clamp(20px, 6vw, 100px)' : 60,
            flex: isSmall ? undefined : 1, maxWidth: isSmall ? '100%' : 800,
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{
                fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800,
                lineHeight: 1, textTransform: 'uppercase',
              }}>
                <div style={{ color: '#fff' }}>Letter from</div>
                {/* stays lowercase: the parent uppercases, "bala" must not */}
                <div style={{ color: G, textTransform: 'none' }}>bala</div>
              </div>
            </div>
            {isSmall && balaCollage}
            <div style={{
              fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)',
              color: MUTED, lineHeight: '24px',
              display: 'flex', flexDirection: 'column', gap: 18,
            }}>
              <p>Dear reader,</p>
              <p>
                When we started ConvergenSEE, we set out to solve a problem we saw across the
                industry: marketing had become fragmented. Brands were working across multiple
                tools, platforms, and vendors, yet still unable to answer the one question that
                matters most: is this creating real business opportunity? Creativity,
                technology, and insight were operating in isolation, and that disconnect was
                costing brands time, money, and opportunity.
              </p>
              <p>
                ConvergenSEE was built to change that. As a MarTech platform, we bring creativity,
                technology, and intelligence together into a single system, one designed to
                help brands move faster and make decisions with confidence.
              </p>
              <p>
                We believe marketing alone does not create growth; growth comes from understanding
                an audience deeply and executing with precision. That belief is the foundation this
                brand is built on, and it is what every person here works toward: not
                marketing outputs, but real, measurable opportunity for the brands, and the
                businesses, we serve.
              </p>
              <p style={{ marginTop: 6 }}>Warm regards,</p>
              <div>
                <span style={{
                  fontFamily: "'Caveat', cursive", fontSize: 46, lineHeight: 1, color: G,
                  display: 'inline-block', transform: 'rotate(-3.5deg)',
                }}>bala</span>
                {/* textTransform none: "ConvergenSEE" casing is load-bearing */}
                <div style={{
                  fontFamily: "'Archivo', sans-serif", fontSize: isSmall ? 12 : 11, letterSpacing: '0.14em',
                  textTransform: 'none', color: 'rgba(255,255,255,0.5)', marginTop: 6,
                }}>FOUNDER, ConvergenSEE</div>
              </div>
            </div>
          </div>

          {/* Right: Bala polaroid gif — right-aligned, vertically centered to the
              letter. Small screens render it inside the text column instead. */}
          {!isSmall && balaCollage}
        </div>
      </section>

      {/* ── Core Values ─────────────────────────────────────────────────────── */}
      <section style={{ background: DARK, padding: '0 clamp(20px, 6vw, 100px) clamp(56px, 8vw, 100px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>

          {/* Heading */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
            <SectionLabel>Values</SectionLabel>
            <h2 style={{
              fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800,
              textTransform: 'uppercase', lineHeight: 1, textAlign: 'center', margin: 0,
              whiteSpace: 'nowrap',
            }}>
              <span style={{ color: '#fff' }}>OUR </span>
              <span style={{ color: G }}>CORE </span>
              <span style={{ color: '#fff' }}>VALUES</span>
            </h2>
          </div>

          {/* 2×2 grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 1240, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', gap: 20, width: '100%' }}>
              <ValueCard
                line1="Walk"
                line1Green
                line2="the talk"
                line2Green={false}
                bg={imgValWalk}
                desc="We don't just talk growth, we build it. Every promise we make to a brand is one we hold ourselves to first."
              />
              <ValueCard
                line1="Stay hungry,"
                line1Green={false}
                line2="stay foolish"
                line2Green
                bg={imgValFoolish}
                desc="Comfortable is where good work goes to die. We keep learning like we're starting out and keep backing the ideas that don't look safe."
              />
            </div>
            <div style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', gap: 20, width: '100%' }}>
              <ValueCard
                line1="OWN"
                line1Green
                line2=" IT"
                line2Green={false}
                bg={imgValCard1}
                desc="No passing the buck, no waiting to be told. If it's on our plate, we see it through, start to finish."
              />
              <ValueCard
                line1="Insanely great"
                line1Green={false}
                line2="customer experience"
                line2Green
                bg={imgValCard1}
                desc="We'd rather do fewer things and have them be great than many things and have them be fine."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Join the Chaos ───────────────────────────────────────────────────── */}
      <section style={{ background: DARK, padding: '0 clamp(20px, 6vw, 100px) clamp(56px, 8vw, 100px)', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h2 style={{
            fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800,
            textTransform: 'uppercase', lineHeight: 1, margin: 0,
            whiteSpace: 'nowrap',
          }}>
            <span style={{ color: '#fff' }}>JOIN THE </span>
            <span style={{ color: G }}>Crazies!</span>
          </h2>
          <Link href={PATH_FOR.careers} className="btn-outline" style={{
            background: 'transparent', color: '#fff', border: '1px solid #fff',
            height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', fontFamily: "'Saira Condensed', sans-serif",
            fontSize: 16, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.02em', cursor: 'pointer',
          }}>TAKE THE CHNC</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
