'use client'

// ─── Application form ────────────────────────────────────────────────────────
// Shared by the careers page ("Join the chaos!") and every job page ("Future
// opportunities start here") — same fields, same upload, different framing.
// Submitting plays the match scene below: a phone on which the ConvergenSEE
// card gets swiped right, Tinder-style, then "It's a match!".
import { useEffect, useRef, useState } from 'react'
import useResponsive from './useResponsive'
import { BtnGreen, BtnOutline, InputField, G, DARK, MUTED, DIM, BORDER } from './careersAtoms'

const logoC = '/figma/home/logo-c.svg'
const logoText = '/figma/home/logo-text.svg'

function Heart({ size = 14, color = G }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true" style={{ display: 'block' }}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

// Floating hearts on the match screen — left offset, size and start time only;
// the drift itself is the shared match-float keyframe.
const HEARTS = [
  { left: '16%', size: 13, delay: '2.15s' },
  { left: '30%', size: 10, delay: '2.45s' },
  { left: '50%', size: 15, delay: '2.25s' },
  { left: '66%', size: 11, delay: '2.6s' },
  { left: '81%', size: 14, delay: '2.35s' },
]

// The success scene. Timeline lives in globals.css (match-* keyframes):
// 0.0 scene fades up · 0.5 thumb presses the card · 0.75 swipe right ·
// 0.82 LIKE stamp slams · 1.6 match screen fades in · 1.7 avatars fly in ·
// 2.05 heart pop · 2.2 "It's a match!" pops · 2.15–2.6 hearts float ·
// 2.6/2.75 text lines under the phone.
function MatchScene({ name, isMobile }) {
  // The scene is shorter than the form it replaces, so on a phone it would
  // play above the viewport: bring it to the middle of the screen on mount.
  const ref = useRef(null)
  useEffect(() => {
    ref.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [])
  const initials = name.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'YOU'
  const avatar = {
    width: 74, height: 74, borderRadius: '50%', background: '#0f1520',
    display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
  }
  const actionCircle = {
    width: 44, height: 44, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.18)',
    background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', boxSizing: 'border-box',
  }
  return (
    <div ref={ref} className="form-fade-up" role="status" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
      marginTop: 'clamp(40px, 6vw, 60px)',
    }}>
      {/* ── The phone ── */}
      <div style={{
        position: 'relative', width: 'clamp(250px, 72vw, 300px)', aspectRatio: '9 / 17.5',
        borderRadius: 44, border: '3px solid rgba(255,255,255,0.16)', background: '#0a0f1a',
        padding: 10, boxSizing: 'border-box', boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
      }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 32, background: DARK, overflow: 'hidden' }}>

          {/* App chrome — nope/like buttons, behind the card */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 14, zIndex: 1, display: 'flex', justifyContent: 'center', gap: 20 }}>
            <div style={actionCircle}>
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 4L14 14M14 4L4 14" stroke="#ff5b64" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div style={actionCircle}><Heart size={18} /></div>
          </div>

          {/* The ConvergenSEE card — swipes itself right */}
          <div className="match-card" style={{
            position: 'absolute', top: 44, left: 14, right: 14, bottom: 74, zIndex: 2,
            borderRadius: 18, border: `1px solid ${BORDER}`,
            background: 'linear-gradient(180deg, #121a2a 0%, #0a1120 100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 14, padding: 20, boxSizing: 'border-box',
          }}>
            <img src={logoC} alt="" style={{ width: 62, height: 55 }} />
            <img src={logoText} alt="ConvergenSEE" style={{ width: 152, height: 19 }} />
            <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: MUTED, margin: 0, textAlign: 'center' }}>
              Full-service marketing &middot; Mumbai
            </p>
            <div className="match-stamp" style={{
              position: 'absolute', top: 16, left: 14, padding: '2px 10px',
              border: `4px solid ${G}`, borderRadius: 6, color: G,
              fontFamily: "'Saira Condensed', sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: '0.06em',
            }}>LIKE</div>
          </div>

          {/* Match screen — revealed once the card flies off */}
          <div className="match-reveal" style={{
            position: 'absolute', inset: 0, zIndex: 3,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 14, padding: 20, boxSizing: 'border-box', textAlign: 'center',
            background: `radial-gradient(circle at 50% 40%, rgba(52,204,50,0.16) 0%, rgba(52,204,50,0) 62%), ${DARK}`,
          }}>
            {HEARTS.map((h, i) => (
              <span key={i} className="match-float" aria-hidden="true" style={{ position: 'absolute', left: h.left, top: '58%', animationDelay: h.delay }}>
                <Heart size={h.size} color={i % 2 ? 'rgba(255,255,255,0.8)' : G} />
              </span>
            ))}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div className="match-ava-l" style={{ ...avatar, border: `3px solid ${G}`, zIndex: 1 }}>
                <img src={logoC} alt="ConvergenSEE" style={{ width: 32, height: 29 }} />
              </div>
              <div className="match-ava-r" style={{ ...avatar, border: '3px solid #fff', marginLeft: -14 }}>
                <span style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 24, fontWeight: 800, color: '#fff' }}>{initials}</span>
              </div>
              <div className="match-heart-pop" style={{
                position: 'absolute', left: '50%', bottom: -12, marginLeft: -17,
                width: 34, height: 34, borderRadius: '50%', background: G,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(52,204,50,0.45)',
              }}>
                <Heart size={16} color="#fff" />
              </div>
            </div>
            <h3 className="match-title-pop" style={{
              fontFamily: "'Saira Condensed', sans-serif", fontSize: 30, fontWeight: 800,
              textTransform: 'uppercase', lineHeight: 1, color: '#fff', margin: '12px 0 0',
            }}>
              It&rsquo;s a <span style={{ color: G }}>match!</span>
            </h3>
            <p className="form-success-text" style={{ animationDelay: '2.4s', fontFamily: "'Archivo', sans-serif", fontSize: 12, color: MUTED, margin: 0 }}>
              You and ConvergenSEE liked each other
            </p>
          </div>

          {/* The thumb doing the swiping */}
          <div className="match-thumb" aria-hidden="true" style={{
            position: 'absolute', left: '50%', bottom: '32%', zIndex: 4,
            width: 34, height: 34, borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)', border: '2px solid rgba(255,255,255,0.5)', boxSizing: 'border-box',
          }} />

          {/* Notch */}
          <div style={{ position: 'absolute', top: 10, left: '50%', marginLeft: -42, width: 84, height: 20, borderRadius: 10, background: '#0a0f1a', zIndex: 5 }} />
        </div>
      </div>

      <p className="form-success-text" style={{
        animationDelay: '2.6s', marginTop: 10,
        fontFamily: "'Saira Condensed', sans-serif", fontSize: isMobile ? 24 : 28, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.04em', color: '#fff', margin: '10px 0 0',
      }}>
        You&rsquo;re our type
      </p>
      <p className="form-success-text" style={{ animationDelay: '2.75s', fontFamily: "'Archivo', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.75)', margin: 0, textAlign: 'center', maxWidth: 480 }}>
        Application received: we just swiped right on your CV. The team will be in touch soon.
      </p>
    </div>
  )
}

export default function JoinSection({ heading, sub, position, headingSize }) {
  const { isMobile } = useResponsive()
  // The CV row stays hidden until a file is picked; the bar then fills to show
  // the file is attached (nothing uploads until the form is sent).
  const fileInput = useRef(null)
  const [fileName, setFileName] = useState('')
  const [progress, setProgress] = useState(0)
  const browse = () => fileInput.current?.click()
  const onFile = e => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setProgress(0)
    requestAnimationFrame(() => requestAnimationFrame(() => setProgress(100)))
  }
  const clearFile = () => {
    setFileName('')
    setProgress(0)
    if (fileInput.current) fileInput.current.value = ''
  }
  const [name, setName] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <section id="join-the-chaos" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px)',
    }}>
      <h2 style={{
        fontFamily: "'Saira Condensed', sans-serif", fontSize: headingSize || 'clamp(40px, 8vw, 80px)', fontWeight: 800,
        textTransform: 'uppercase', lineHeight: 1, margin: 0, textAlign: 'center',
      }}>
        {heading || (<>
          <span style={{ color: '#fff' }}>JOIN THE </span>
          <span style={{ color: G }}>Chaos!</span>
        </>)}
      </h2>
      {sub && !sent && (
        <p style={{
          fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: '#fff',
          lineHeight: '24px', margin: '30px 0 0', textAlign: 'center',
        }}>{sub}</p>
      )}

      {sent ? <MatchScene name={name} isMobile={isMobile} /> : (<>

      {/* Form fields */}
      <div style={{ maxWidth: 1240, width: '100%', marginTop: 'clamp(40px, 6vw, 60px)' }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 20, marginBottom: 20 }}>
          <InputField label="Your name" name="name" autoComplete="name" value={name} onChange={e => setName(e.target.value)} />
          <InputField label="Contact number" name="tel" type="tel" inputMode="tel" autoComplete="tel" />
        </div>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 20 }}>
          <InputField label="Your email" name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="off" spellCheck={false} />
          <InputField label="Position" name="position" autoComplete="off" defaultValue={position} />
        </div>
      </div>

      {/* File upload area */}
      <div style={{
        width: '100%', maxWidth: 882, border: `1px dashed ${BORDER}`,
        padding: 'clamp(20px, 4vw, 30px)', marginTop: 40, boxSizing: 'border-box',
      }}>
        <p style={{
          fontFamily: "'Saira Condensed', sans-serif", fontSize: 24, fontWeight: 700,
          color: '#fff', textTransform: 'uppercase', margin: 0,
        }}>UPLOAD FILES</p>
        <p style={{
          fontFamily: "'Archivo', sans-serif", fontSize: 14, color: MUTED,
          margin: '8px 0 0',
        }}>Select and upload the files of your choice</p>

        {/* Drop zone */}
        <div style={{
          border: `2px dashed ${BORDER}`, padding: '40px 20px',
          textAlign: 'center', marginTop: 20,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
        }}>
          {/* Upload icon */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 28V12m0 0l-6 6m6-6l6 6" stroke={DIM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 28v2a4 4 0 004 4h16a4 4 0 004-4v-2" stroke={DIM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p style={{
            fontFamily: "'Archivo', sans-serif", fontSize: 14, color: MUTED, margin: 0,
          }}>
            Upload your CV:{' '}
            <span onClick={browse} style={{ color: G, cursor: 'pointer', textDecoration: 'underline' }}>Browse</span>
          </p>
          <p style={{
            fontFamily: "'Archivo', sans-serif", fontSize: 12, color: DIM, margin: 0,
          }}>Max file size: 25MB &middot; PDF, DOC, DOCX</p>
        </div>

        {/* Browse button */}
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
          <BtnOutline type="button" onClick={browse}>BROWSE</BtnOutline>
          <input
            ref={fileInput} type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={onFile} aria-label="Upload your CV" style={{ display: 'none' }}
          />
        </div>

        {/* Chosen file */}
        {fileName && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          marginTop: 24, padding: '14px 16px',
          background: DARK, border: `1px solid ${BORDER}`,
        }}>
          {/* File icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke={DIM} strokeWidth="1.5" fill="none"/>
            <path d="M14 2v6h6" stroke={DIM} strokeWidth="1.5" fill="none"/>
          </svg>
          <div style={{ flex: 1 }}>
            <p style={{
              fontFamily: "'Archivo', sans-serif", fontSize: 14, color: '#fff',
              margin: 0,
            }}>{fileName}</p>
            {/* Progress bar */}
            <div style={{
              width: '100%', height: 4, background: 'rgba(255,255,255,0.1)',
              borderRadius: 2, marginTop: 6,
            }}>
              <div style={{
                width: `${progress}%`, height: '100%', background: G,
                borderRadius: 2, transition: 'width 0.3s ease',
              }} />
            </div>
          </div>
          {/* Trash icon */}
          <button type="button" onClick={clearFile} aria-label="Remove file" style={{
            background: 'none', border: 0, padding: 10, margin: -10, cursor: 'pointer', flexShrink: 0, display: 'flex',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 5h14M8 5V3h4v2m-7 0v10a2 2 0 002 2h6a2 2 0 002-2V5" stroke={DIM} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </button>
        </div>
        )}
      </div>

      {/* Send message */}
      <div style={{ marginTop: 40, width: isMobile ? '100%' : 'auto', maxWidth: 882 }}>
        <BtnGreen onClick={() => setSent(true)} style={{ height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', fontSize: 16, width: isMobile ? '100%' : 'auto' }}>SEND MESSAGE</BtnGreen>
      </div>

      </>)}
    </section>
  )
}
