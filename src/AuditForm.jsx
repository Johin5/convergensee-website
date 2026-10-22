'use client'

import { useActionState, useEffect, useRef } from 'react'
import useResponsive from './useResponsive'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'
import { submitAudit } from './lib/actions'

const G = '#34cc32'

// ─── Reality-check audit form + brief-delivery takeover ──────────────────────
// The name/email/company bar under the reality-check quiz (home + solutions —
// the section is duplicated across both pages, the form is shared). On submit
// the PARENT fades the whole quiz body out (AuditForm just reports success via
// onSuccess) and mounts <AuditTakeover /> in its place: the CHNC delivery
// rider rides through Mumbai with the brief strapped on the back — endlessly,
// between the Gateway of India and the pin-dropped ConvergenSEE HQ skyline —
// "WE HEARD YOU." Keyframes live in globals.css under the deliv- prefix.
// The quiz answers ride along as a hidden JSON field (`context`).

// Website URL is the highest-value field — it lets the audit start before the
// first call (31 Aug brief).
// Third entry: input attributes. Required matches submitAudit's checks so the
// browser catches empties before a server round trip. Website stays type=text
// (type=url would reject "acme.com" without a scheme) with the url keyboard.
const FIELDS = [
  ['Your name', 'name', { type: 'text', autoComplete: 'name', required: true }],
  ['Your email', 'email', { type: 'email', inputMode: 'email', autoComplete: 'email', autoCapitalize: 'off', spellCheck: false, required: true }],
  ['Phone', 'phone', { type: 'tel', inputMode: 'tel', autoComplete: 'tel' }],
  ['Company name', 'company', { type: 'text', autoComplete: 'organization', required: true }],
  ['Company website', 'website', { type: 'text', inputMode: 'url', autoComplete: 'url', autoCapitalize: 'off', spellCheck: false }],
]

// Scene art from the CHNC "Aap Powai aa rahe ho" creative (Figma: Charvak /
// A6 - Cards with copy), reprocessed as transparent white line art. The box
// label, speed dashes and ground were erased from the rider so the scene can
// own them: the dashes stop with the scooter and the brief tag is live text.
const SCENE = ['/delivery-rider.webp', '/delivery-rider-fill.webp', '/client-office.svg', '/convergensee-hq.svg']

// The wheels: the raster's tire marks are transparent holes, so each wheel
// gets a static white disc BEHIND the art to blank them, and freshly drawn
// crescent marks ON TOP that spin forever. Geometry is % of the 640×559 art:
// front wheel center (575,487) r56, back (205,498) r42.
const WHEELS = [
  { fill: { left: '25.5%', top: '81.6%', width: '13.1%' } },
  { fill: { left: '81.1%', top: '77.1%', width: '17.5%' } },
]
// Two crescent arcs matching the art's tire marks, reused for both wheels
// (the smaller box scales them down proportionally).
const WHEEL_MARKS = (
  <>
    <path d="M 23.49 8.55 A 25 25 0 0 1 -10.57 22.66" strokeWidth="8" />
    <path d="M -37.42 6.6 A 38 38 0 0 1 -24.43 -29.11" strokeWidth="7" />
  </>
)

// Timeline (seconds from mount): 0.05 "out for delivery…" · 0.1 buildings
// rise, ground draws · 0.2–1.4 rider scoots in and settles at CENTER, where
// it keeps riding — bob, wheel spin, speed dashes and drifting clouds loop
// forever (the brief is BEING delivered, never delivered) · 0.6 the client's
// company pin drops on their office (departure) · 1.5 ConvergenSEE HQ pin
// drops on the destination · 1.9 "WE HEARD YOU." slams · 2.25 the follow-up
// line fades up.
export function AuditTakeover({ name, company }) {
  // The quiz body this card replaces is far taller (on mobile the questions,
  // reaction clip and stacked fields run past 1500px), so the swap shrinks the
  // page and the browser's kept scroll offset strands the viewer below the
  // section. Pull the card back on screen before the first paint: a smooth
  // scroll here left phones staring at ~0.5s of empty navy (the card started
  // ~950px above the viewport), so jump instantly when the card is off screen
  // and only glide when part of it is already visible.
  const stageRef = useRef(null)
  useIsomorphicLayoutEffect(() => {
    const el = stageRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const vh = window.innerHeight
    if (r.top >= 0 && r.bottom <= vh) return
    const visible = r.bottom > 0 && r.top < vh
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: visible && !reduce ? 'smooth' : 'instant', block: 'center' })
  }, [])
  return (
    <div ref={stageRef} className="form-fade-up deliv-stage" role="status">
      <p className="form-success-text" style={{ animationDelay: '0.05s', fontFamily: "'Archivo', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: G, margin: 0 }}>
        Out for delivery…
      </p>
      <div className="deliv-scene" aria-hidden="true">
        {/* both buildings are potrace-vectorized from the user's line-art
            renders: the client's office (left, labeled with the company they
            typed) and the Powai landmark as ConvergenSEE HQ (right) */}
        <img className="deliv-sky deliv-sky-client" src="/client-office.svg" alt="" />
        <img className="deliv-sky deliv-sky-hq" src="/convergensee-hq.svg" alt="" />
        <div className="deliv-pin" style={{ left: '8%', right: 'auto', animationDelay: '0.6s' }}>
          <svg width="22" height="30" viewBox="0 0 24 33" fill="none">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 21 12 21s12-12 12-21C24 5.37 18.63 0 12 0z" fill={G} />
            <circle cx="12" cy="12" r="4.5" fill="#000718" />
          </svg>
          {/* the client's company, exactly as typed into the form */}
          {/* width/wrapping in globals.css: one line on desktop, two on phones */}
          <p className="deliv-pin-label-client" style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(12px, 1.3vw, 16px)', fontWeight: 700, letterSpacing: '0.05em', color: '#fff', margin: 0 }}>{company || 'Your office'}</p>
        </div>
        <svg className="deliv-cloud" style={{ top: '6%', width: 62 }} viewBox="0 0 60 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
          <path d="M 8 20 A 6 6 0 0 1 13 10 A 8 8 0 0 1 29 8 A 7 7 0 0 1 43 12 A 5 5 0 0 1 49 20 Z" />
        </svg>
        <svg className="deliv-cloud" style={{ top: '24%', width: 42, animationDuration: '7.5s', animationDelay: '3.4s' }} viewBox="0 0 60 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
          <path d="M 8 20 A 6 6 0 0 1 13 10 A 8 8 0 0 1 29 8 A 7 7 0 0 1 43 12 A 5 5 0 0 1 49 20 Z" />
        </svg>
        <div className="deliv-pin">
          <svg width="22" height="30" viewBox="0 0 24 33" fill="none">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 21 12 21s12-12 12-21C24 5.37 18.63 0 12 0z" fill={G} />
            <circle cx="12" cy="12" r="4.5" fill="#000718" />
          </svg>
          {/* brand casing is load-bearing — never uppercase this label */}
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(12px, 1.3vw, 16px)', fontWeight: 700, letterSpacing: '0.05em', color: '#fff', margin: 0 }}>ConvergenSEE HQ</p>
        </div>
        <span className="deliv-ground" />
        <div className="deliv-rider">
          <div className="deliv-rider-bob">
            {/* navy body fill (flood-filled silhouette of the art) so the
                rider is opaque — scenery no longer shows through him */}
            <img className="deliv-rider-sil" src="/delivery-rider-fill.webp" alt="" />
            {WHEELS.map((w, i) => (
              <span key={i} className="deliv-wheel-fill" style={w.fill} />
            ))}
            <img className="deliv-rider-img" src="/delivery-rider.webp" alt="" />
            {WHEELS.map((w, i) => (
              <svg key={i} className="deliv-wheel-marks" style={w.fill} viewBox="-56 -56 112 112" fill="none" stroke="#000718" strokeLinecap="round">
                {WHEEL_MARKS}
              </svg>
            ))}
            {/* font-size lives in the CSS class (10.5cqw of the rider) so the
                label scales exactly with the box face at any zoom/viewport */}
            <span className="deliv-brief-tag" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, letterSpacing: '0.05em', color: G }}>BRIEF</span>
          </div>
          <span className="deliv-dash" style={{ top: '48%', width: '30%' }} />
          <span className="deliv-dash" style={{ top: '62%', width: '22%', animationDelay: '0.35s' }} />
          <span className="deliv-dash" style={{ top: '76%', width: '26%', animationDelay: '0.5s' }} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
        <p className="deliv-slam" style={{ animationDelay: '1.9s', fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(26px, 3.6vw, 44px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1.05, color: '#fff', margin: 0 }}>
          We heard <span style={{ color: G }}>you</span>.
        </p>
        <p className="form-success-text" style={{ animationDelay: '2.25s', fontFamily: "'Archivo', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.8)', margin: '6px 0 0' }}>
          Now we'll come back with the solutions that create more business opportunities for your brand.
        </p>
      </div>
    </div>
  )
}

export default function AuditForm({ context, onSuccess, cta = 'Submit' }) {
  const { isSmall } = useResponsive()
  const [state, formAction, pending] = useActionState(submitAudit, null)
  // Warm the scene art so the rider never scoots in blank.
  useEffect(() => {
    SCENE.forEach(src => { fetch(src).catch(() => {}) })
  }, [])
  // Report success upward exactly once — the parent owns the fade-out of the
  // quiz body and the swap to <AuditTakeover />.
  const firedRef = useRef(false)
  useEffect(() => {
    if (state?.ok && !firedRef.current) {
      firedRef.current = true
      onSuccess?.({ name: state.name, company: state.company })
    }
  }, [state, onSuccess])

  return (
    <form
      action={formAction}
      style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', flexWrap: isSmall ? undefined : 'wrap', gap: 20, alignItems: isSmall ? 'stretch' : 'flex-end', width: '100%' }}
    >
      {FIELDS.map(([lbl, key, attrs]) => (
        <div key={key} style={{ flex: isSmall ? undefined : '1 1 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label htmlFor={`audit-${key}`} style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: '#fff' }}>{lbl}</label>
          {/* defaultValue re-fills the field after a failed submit (React 19
              resets the form once the action returns). 16px below desktop so iOS
              Safari doesn't zoom on focus. */}
          <input
            id={`audit-${key}`}
            name={key}
            {...attrs}
            defaultValue={state?.values?.[key] ?? ''}
            className="input-glow"
            placeholder="Enter here"
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', outline: 'none', height: 46, padding: '0 15px', fontFamily: "'Archivo', sans-serif", fontSize: isSmall ? 16 : 14, color: '#fff', width: '100%', boxSizing: 'border-box' }}
          />
        </div>
      ))}
      {context !== undefined && <input type="hidden" name="context" value={JSON.stringify(context)} />}
      <button
        type="submit"
        disabled={pending}
        className={`btn-outline${pending ? ' btn-sending' : ''}`}
        style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', fontFamily: "'Saira Condensed', sans-serif", fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', cursor: pending ? 'default' : 'pointer', backdropFilter: 'blur(10px)', width: isSmall ? '100%' : 'auto' }}
      >
        {pending ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <svg className="form-shake" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="4.4" stroke="currentColor" strokeWidth="1.6" />
              <path d="M9.4 9.4 L13.4 13.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Submitting…
          </span>
        ) : cta}
      </button>
      {state?.error && (
        <p className="form-fade-up" style={{ flexBasis: '100%', fontFamily: "'Archivo', sans-serif", fontSize: 14, color: '#ee2226', margin: 0 }}>{state.error}</p>
      )}
    </form>
  )
}
