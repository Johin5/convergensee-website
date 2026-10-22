'use client'

// ─── 404 page ─────────────────────────────────────────────────────────────────
// Designed like every other page: full-viewport hero (SectionLabel, giant Saira
// headline, Archivo sub-copy, btn-green / btn-outline CTAs) with the site
// Footer below. The reaction game runs as a full-screen veil over the whole
// site: dark "wait for green" → the entire viewport flips brand green → your
// time in ms → CHNC cuts go-to-market time by 50%. Space / tap drives it,
// Escape closes it. Best time persists in localStorage.

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Footer from './Footer'
import SectionLabel from './SectionLabel'

const G = '#34cc32'
const DARK = '#000718'
const MUTED = 'rgba(255,255,255,0.7)'
const SAIRA = "'Saira Condensed', sans-serif"
const ARCHIVO = "'Archivo', sans-serif"

const AVG_MS = 273 // median human visual reaction time
const GAUGE_MIN = 120
const GAUGE_MAX = 450

function quipFor(ms) {
  if (ms < 200) return 'SCARY QUICK.'
  if (ms < 260) return 'SHARP.'
  if (ms < 320) return 'NOT BAD.'
  return 'THE MARKET ALREADY MOVED.'
}

export default function NotFound404() {
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState('waiting') // waiting | go | early | result
  const [ms, setMs] = useState(0)
  const [best, setBest] = useState(0)
  const timerRef = useRef(null)
  const goTimeRef = useRef(0)
  const stateRef = useRef({ open: false, phase: 'waiting' })
  stateRef.current = { open, phase }

  useEffect(() => {
    try { setBest(Math.max(0, parseInt(localStorage.getItem('csee-reaction-best'), 10) || 0)) } catch {}
  }, [])

  function arm() {
    clearTimeout(timerRef.current)
    setPhase('waiting')
    timerRef.current = setTimeout(() => {
      // Fallback stamp, overwritten by the rAF that runs just before the green
      // frame paints. This matches humanbenchmark's methodology (clock starts
      // as green heads to the screen, stops in the input handler) so scores
      // here are comparable to theirs. Stamping earlier bills React's render
      // to the player; stamping a frame later (double rAF) flatters them.
      goTimeRef.current = performance.now()
      setPhase('go')
      requestAnimationFrame(() => {
        if (stateRef.current.phase === 'go') goTimeRef.current = performance.now()
      })
    }, 1500 + Math.random() * 2500)
  }

  function openVeil() {
    // Drop focus from the launcher button — a focused button would swallow the
    // space presses that drive the game (space "clicks" a focused button).
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur()
    setOpen(true)
    arm()
  }

  function closeVeil() {
    clearTimeout(timerRef.current)
    setOpen(false)
  }

  function hit(e) {
    const { phase: p } = stateRef.current
    if (p === 'waiting') {
      clearTimeout(timerRef.current)
      setPhase('early')
      return
    }
    if (p === 'go') {
      const t = Math.max(0, Math.round(performance.now() - goTimeRef.current))
      setMs(t)
      setBest((b) => {
        const nb = b === 0 ? t : Math.min(b, t)
        try { localStorage.setItem('csee-reaction-best', String(nb)) } catch {}
        return nb
      })
      setPhase('result')
      return
    }
    arm() // early | result → rerun
  }

  useEffect(() => {
    function onKey(e) {
      if (e.code === 'Escape' && stateRef.current.open) { closeVeil(); return }
      if (e.code !== 'Space') return
      if (e.target && e.target.closest && e.target.closest('a, button, input, textarea, select')) return
      e.preventDefault()
      if (e.repeat) return
      if (stateRef.current.open) hit(e)
      else openVeil()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      clearTimeout(timerRef.current)
    }
  }, [])

  // The veil covers the viewport — freeze the page behind it.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  const isGo = phase === 'go'
  const isEarly = phase === 'early'
  const veilBg = isEarly ? 'rgba(43,13,18,0.98)' : 'rgba(0,7,24,0.97)'
  const gaugePos = Math.min(1, Math.max(0, (ms - GAUGE_MIN) / (GAUGE_MAX - GAUGE_MIN)))
  const avgPos = (AVG_MS - GAUGE_MIN) / (GAUGE_MAX - GAUGE_MIN)

  return (
    <>
      {/* Keyboard hints vs touch copy: both are rendered and CSS picks one, so
          server and client markup always match (no UA sniffing at render). */}
      <style>{`
        .rx-touch { display: none; }
        @media (hover: none) and (pointer: coarse) {
          .rx-kbd { display: none !important; }
          .rx-touch { display: inline; }
        }
      `}</style>
      <section style={{
        // 100vh isn't compensated by the laptop-scale body zoom — divide by --pz
        // so the section still covers the full screen on 1025–1727px viewports.
        minHeight: 'calc(100vh / var(--pz, 1))', background: DARK, color: '#fff',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 28, padding: '104px 20px 64px', textAlign: 'center',
      }}>
        <SectionLabel>Error 404 - page not found</SectionLabel>
        <h1 style={{
          fontFamily: SAIRA, fontSize: 'clamp(56px, 14vw, 150px)', fontWeight: 800,
          textTransform: 'uppercase', letterSpacing: '-3px', lineHeight: 1, margin: 0,
        }}>
          <span style={{ color: '#fff' }}>4</span>
          <span style={{ color: G }}>0</span>
          <span style={{ color: '#fff' }}>4</span>
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <p style={{ fontFamily: ARCHIVO, fontSize: 18, lineHeight: '26px', color: MUTED, margin: 0, maxWidth: 560 }}>
            This page doesn't exist, but your reflexes do.
          </p>
          <p style={{ fontFamily: ARCHIVO, fontSize: 17, fontWeight: 700, lineHeight: 1.5, color: '#fff', margin: 0, maxWidth: 540 }}>
            When the screen flips green, hit space, or tap, as fast as you can.{' '}
            <span style={{ fontWeight: 400, color: MUTED }}>The average human takes {AVG_MS} ms.</span>
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={openVeil} className="btn-green" style={{
            background: G, color: DARK, border: 'none', height: 46, padding: '0 24px',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: SAIRA, fontSize: 16, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.02em', cursor: 'pointer',
          }}>
            Test your reaction
          </button>
          <Link href="/" className="btn-outline" style={{
            background: 'transparent', color: '#fff', border: '1px solid #fff',
            height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center',
            justifyContent: 'center', fontFamily: SAIRA, fontSize: 16, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.02em',
          }}>
            Back to home
          </Link>
        </div>
        <span className={best > 0 ? undefined : 'rx-kbd'} style={{ fontFamily: ARCHIVO, fontSize: 12, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)' }}>
          {best > 0 && `YOUR BEST: ${best} MS`}
          <span className="rx-kbd">{best > 0 ? ' - OR PRESS SPACE' : 'OR JUST PRESS SPACE'}</span>
        </span>
      </section>

      <Footer />

      {open && (
        <div
          onPointerDown={(e) => {
            if (e.target && e.target.closest && e.target.closest('a, button')) return
            hit(e)
          }}
          role="button"
          tabIndex={0}
          aria-label="Reaction test. Press space or tap the moment the screen turns green. Escape closes."
          style={{
            position: 'fixed', inset: 0, zIndex: 1000, background: veilBg,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 18, padding: '0 24px', textAlign: 'center', cursor: 'pointer',
            userSelect: 'none', touchAction: 'manipulation', outline: 'none',
            animation: isEarly ? 'reaction-shake 0.25s ease-in-out 1' : 'none',
          }}
        >
          {/* Pre-mounted green layer: the flip is a compositor-only opacity
              swap, so the screen turns green the same instant the clock
              starts — even on the very first round, before any paint warmup. */}
          <span aria-hidden="true" style={{
            position: 'absolute', inset: 0, zIndex: -1, background: G, opacity: isGo ? 1 : 0,
            willChange: 'opacity', pointerEvents: 'none',
          }} />
          {/* A real close control for touch (Escape is keyboard-only). Stopping
              pointerdown keeps the veil from treating the tap as a hit and
              re-arming the game. The padding gives a 44px+ target while the
              label sits where the old 'ESC TO CLOSE' hint did. */}
          <button
            type="button"
            aria-label="Close"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); closeVeil() }}
            style={{
              position: 'absolute', top: 4, right: 8, minWidth: 44, minHeight: 44,
              padding: '14px 16px', background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: ARCHIVO, fontSize: 11, lineHeight: 1,
              letterSpacing: '0.14em', color: isGo ? 'rgba(0,7,24,0.55)' : 'rgba(255,255,255,0.4)',
            }}
          >
            <span className="rx-kbd">ESC TO CLOSE</span>
            <span className="rx-touch" style={{ fontSize: 13, fontWeight: 700, color: isGo ? 'rgba(0,7,24,0.7)' : 'rgba(255,255,255,0.75)' }}>CLOSE &#x2715;</span>
          </button>
          {best > 0 && !isGo && (
            <span style={{
              position: 'absolute', top: 20, left: 24, fontFamily: SAIRA, fontSize: 13,
              fontWeight: 600, letterSpacing: '0.14em', color: G,
            }}>
              BEST {best} MS
            </span>
          )}

          {phase === 'waiting' && (
            <>
              <h2 style={{
                fontFamily: SAIRA, fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '-1px', color: '#fff', margin: 0,
                lineHeight: 1, display: 'flex', alignItems: 'baseline', gap: 6,
              }}>
                Wait for green
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{ color: G, animation: `reaction-dot 1.2s ${i * 0.2}s infinite` }}>.</span>
                ))}
              </h2>
              <p style={{ fontFamily: ARCHIVO, fontSize: 15, fontWeight: 700, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                <span className="rx-kbd">Hit anywhere, or space, the moment it flips.</span>
                <span className="rx-touch">Tap anywhere the moment it flips.</span>
              </p>
            </>
          )}

          {isGo && (
            <>
              {[0, 0.3].map((d) => (
                <span key={d} style={{
                  position: 'absolute', top: '50%', left: '50%', width: 'min(46vw, 440px)',
                  height: 'min(46vw, 440px)', border: '3px solid rgba(0,7,24,0.25)',
                  borderRadius: '50%', pointerEvents: 'none',
                  animation: `reaction-ring 0.9s ease-out ${d}s infinite`,
                  animationFillMode: 'backwards',
                }} />
              ))}
              <h2 style={{
                fontFamily: SAIRA, fontSize: 'clamp(96px, 20vw, 240px)', fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '-4px', color: DARK, margin: 0,
                lineHeight: 1, animation: 'reaction-go-in 0.12s ease-out 1',
              }}>
                GO!
              </h2>
            </>
          )}

          {isEarly && (
            <>
              <h2 style={{
                fontFamily: SAIRA, fontSize: 'clamp(56px, 10vw, 110px)', fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '-2px', color: '#fff', margin: 0, lineHeight: 1,
              }}>
                Too soon.
              </h2>
              <p style={{ fontFamily: ARCHIVO, fontSize: 16, lineHeight: 1.5, color: MUTED, margin: 0 }}>
                Timing is everything in marketing.
              </p>
              <span style={{
                fontFamily: SAIRA, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.85)', animation: 'reaction-pulse 1.7s ease-in-out infinite',
              }}>
                <span className="rx-kbd">SPACE / TAP TO RETRY</span>
                <span className="rx-touch">TAP TO RETRY</span>
              </span>
            </>
          )}

          {phase === 'result' && (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, lineHeight: 1, animation: 'reaction-pop 0.3s ease-out 1' }}>
                <span style={{ fontFamily: SAIRA, fontSize: 'clamp(88px, 16vw, 170px)', fontWeight: 800, color: '#fff', letterSpacing: '-4px' }}>{ms}</span>
                <span style={{ fontFamily: SAIRA, fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 700, color: G }}>MS</span>
              </div>
              <span style={{ fontFamily: SAIRA, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#fff' }}>
                {quipFor(ms)}
              </span>

              <div style={{ width: 'min(440px, 82vw)', margin: '6px 0 2px' }}>
                <div style={{ position: 'relative', height: 6, background: 'rgba(255,255,255,0.12)' }}>
                  <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0,
                    width: `${gaugePos * 100}%`, background: `linear-gradient(90deg, ${G}, rgba(52,204,50,0.35))`,
                  }} />
                  <span style={{
                    position: 'absolute', left: `${avgPos * 100}%`, top: -4, bottom: -4,
                    width: 1.5, background: 'rgba(255,255,255,0.55)',
                  }} />
                  <span style={{
                    position: 'absolute', left: `${gaugePos * 100}%`, top: -5, bottom: -5,
                    width: 3, marginLeft: -1.5, background: '#fff', boxShadow: '0 0 8px rgba(255,255,255,0.8)',
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ fontFamily: SAIRA, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)' }}>FAST</span>
                  <span style={{ fontFamily: SAIRA, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>
                    HUMAN AVG {AVG_MS}
                  </span>
                  <span style={{ fontFamily: SAIRA, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)' }}>SLOW</span>
                </div>
              </div>

              <p style={{
                fontFamily: ARCHIVO, fontSize: 16, lineHeight: 1.55, color: MUTED,
                margin: '4px 0 0', maxWidth: 480,
              }}>
                {ms < 320 ? (
                  <>
                    Now imagine your brand moving that fast:{' '}
                    <strong style={{ color: '#fff' }}>CHNC cuts go-to-market time by <span style={{ color: G }}>50%</span>.</strong>
                  </>
                ) : (
                  <>
                    Rough day for those reflexes. We can't fix those, but{' '}
                    <strong style={{ color: '#fff' }}>CHNC cuts your brand's go-to-market time by <span style={{ color: G }}>50%</span>.</strong>
                  </>
                )}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link href="/solutions" className="btn-green" style={{
                  background: G, color: DARK, height: 46, padding: '0 24px',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: SAIRA, fontSize: 16, fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.02em', textDecoration: 'none',
                }}>
                  See CHNC
                </Link>
                <button onClick={(e) => { e.currentTarget.blur(); arm() }} className="btn-outline" style={{
                  background: 'transparent', color: '#fff', border: '1px solid #fff',
                  height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center',
                  justifyContent: 'center', fontFamily: SAIRA, fontSize: 16, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.02em', cursor: 'pointer',
                }}>
                  Go again
                </button>
              </div>
              <span className="rx-kbd" style={{ fontFamily: ARCHIVO, fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>
                SPACE RERUNS · ESC CLOSES
              </span>
            </>
          )}
        </div>
      )}
    </>
  )
}
