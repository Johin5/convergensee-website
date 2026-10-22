'use client'

import { useActionState } from 'react'
import useResponsive from './useResponsive'
import { submitContact } from './lib/actions'

const G = '#34cc32'

// The success animation's shot trajectory — shared by the tracer line and the
// envelope's <animateMotion> so they always stay in sync. Starts at the
// pistol's muzzle (84, 78) and ends where the envelope lands (298, 30).
const SHOT_PATH = 'M 84 78 C 138 60, 225 42, 298 30'

// ─── Contact form — single source of truth ────────────────────────────────────
// The same five-field form used to be copy-pasted into seven files; every page
// renders <ContactForm /> now. Markup matches the original pixel for pixel.
export default function ContactForm() {
  const { isMobile, isSmall } = useResponsive()
  const [state, formAction, pending] = useActionState(submitContact, null)
  // 16px below desktop so iOS Safari doesn't zoom the page on focus.
  const inputFont = isSmall ? 16 : 14

  if (state?.ok) {
    return (
      <div className="form-fade-up" role="status" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, width: '100%', maxWidth: 1240, minHeight: isMobile ? 280 : 420 }}>
        <svg viewBox="0 0 340 156" fill="none" aria-hidden="true" style={{ width: '100%', maxWidth: isMobile ? 360 : 560, height: 'auto' }}>
          <defs>
            <linearGradient id="csee-trace-grad" gradientUnits="userSpaceOnUse" x1="84" y1="78" x2="298" y2="30">
              <stop offset="0" stopColor={G} stopOpacity="0" />
              <stop offset="0.6" stopColor={G} stopOpacity="0.4" />
              <stop offset="1" stopColor={G} />
            </linearGradient>
            {/* vertical gradient over the pistol: lighter slide, darker grip */}
            <linearGradient id="csee-gun-grad" gradientUnits="userSpaceOnUse" x1="0" y1="64" x2="0" y2="464">
              <stop offset="0" stopColor="#48e546" />
              <stop offset="0.45" stopColor={G} />
              <stop offset="1" stopColor="#22962a" />
            </linearGradient>
          </defs>

          {/* tracer line behind the shot */}
          <path className="form-shot-trace" d={SHOT_PATH} pathLength="100" stroke="url(#csee-trace-grad)" strokeWidth="2" strokeLinecap="round" />

          {/* the pistol — from the user's pistol-svgrepo-com.svg, recolored and
              flipped to fire rightward. Outer g pins the muzzle at (84, 78);
              the recoil class sits outside the scale so its px offsets stay real. */}
          <g transform="translate(84 78) rotate(-18)">
            <g className="form-gun-fire">
              <g transform="scale(0.15)">
                <g transform="translate(0 -128) scale(-1 1)" fill="url(#csee-gun-grad)">
                  <path d="M496,224c8.836,0,16-7.164,16-16v-80c0-8.836-7.164-16-16-16c-17.648,0-32-14.352-32-32c0-8.836-7.164-16-16-16H80 c0-8.836-7.164-16-16-16s-16,7.164-16,16H16C7.164,64,0,71.164,0,80v96c0,8.836,7.164,16,16,16v48c0,8.836,7.164,16,16,16h144 c0,52.938,43.063,96,96,96h49.043l15.145,98.438C337.391,458.234,344.102,464,352,464h144c4.672,0,9.102-2.031,12.141-5.578 c3.039-3.547,4.383-8.234,3.672-12.859l-31.781-206.578C480.555,230.633,487.516,224,496,224z M272,320c-35.289,0-64-28.711-64-64 h72c0,8.82-7.18,16-16,16c-8.836,0-16,7.164-16,16s7.164,16,16,16c20.581,0,38.029-13.084,44.84-31.318L316.12,320H272z M480,194.742c-18.625,6.602-32,24.398-32,45.258c0,0.813,0.063,1.625,0.188,2.43L477.352,432H365.727l-29.914-194.43 C334.609,229.766,327.898,224,320,224H48v-32h432V194.742z M480,160H32V96h402.023c5.805,22.461,23.516,40.172,45.977,45.977V160z" />
                  <path d="m392,408h48c4.68,0 9.125-2.047 12.164-5.609 3.039-3.555 4.367-8.266 3.641-12.883l-24-152c-1.227-7.781-7.93-13.508-15.805-13.508h-48c-4.68,0-9.125,2.047-12.164,5.609-3.039,3.555-4.367,8.266-3.641,12.883l24,152c1.227,7.781 7.93,13.508 15.805,13.508zm10.328-152l18.945,120h-15.602l-18.945-120h15.602z" />
                </g>
              </g>
            </g>
          </g>

          {/* muzzle flash + smoke, anchored at the barrel tip */}
          <g transform="translate(84 78) rotate(-18)">
            <g className="form-muzzle-flash">
              <path d="M 0 -9 L 3 -2.5 L 17 0 L 3 2.5 L 0 9 L -2 2.5 L -7 0 L -2 -2.5 Z" fill={G} />
              <circle r="2.5" fill="#eaffe9" />
            </g>
            <circle className="form-smoke" cx="1" cy="-2" r="4" fill="rgba(220,255,220,0.35)" />
            <circle className="form-smoke form-smoke-2" cx="5" cy="2" r="3" fill="rgba(220,255,220,0.3)" />
            <circle className="form-smoke form-smoke-3" cx="-1" cy="1" r="5" fill="rgba(220,255,220,0.25)" />
          </g>

          {/* the envelope in flight — rotate="auto" banks it along the path
              tangent, so it leaves at the barrel's angle and levels out */}
          <g>
            <animateMotion dur="0.48s" begin="0.46s" rotate="auto" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.15 0.7 0.3 1" path={SHOT_PATH} />
            <g className="form-shell">
              <rect x="-14" y="-10" width="28" height="20" rx="2" stroke={G} strokeWidth="2" fill="rgba(52,204,50,0.15)" />
              <path d="M -14 -7 L 0 4 L 14 -7" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>

          {/* impact ring + landed envelope with delivered check */}
          <circle className="form-land-ring" cx="298" cy="30" r="18" stroke={G} strokeWidth="2" />
          <g className="form-mail-pop">
            <rect x="281" y="17" width="34" height="25" rx="3" stroke={G} strokeWidth="2" fill="rgba(52, 204, 50, 0.1)" />
            <path d="M283 20.5 L298 32 L313 20.5" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          {/* delivered tick pops a beat after the envelope settles */}
          <g className="form-check-pop">
            <circle cx="314" cy="42" r="8" fill={G} />
            <path d="M310 42 L313 45 L318 39" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
        <p className="form-success-text" style={{ animationDelay: '1.28s', fontFamily: "'Saira Condensed', sans-serif", fontSize: isMobile ? 24 : 28, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#fff', margin: 0 }}>
          Message fired
        </p>
        <p className="form-success-text" style={{ animationDelay: '1.42s', fontFamily: "'Archivo', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.75)', margin: 0, textAlign: 'center' }}>
          Direct hit: it&rsquo;s in our inbox. We&rsquo;ll get back to you soon.
        </p>
      </div>
    )
  }

  // Third entry: input attributes. Required matches submitContact's checks so
  // the browser catches empties before a server round trip.
  const FIELDS = [
    [['Your name', 'name', { type: 'text', autoComplete: 'name', required: true }], ['Contact number', 'phone', { type: 'tel', inputMode: 'tel', autoComplete: 'tel' }]],
    [['Company name', 'company', { type: 'text', autoComplete: 'organization' }], ['Designation', 'designation', { type: 'text', autoComplete: 'organization-title' }]],
    [['Your email', 'email', { type: 'email', inputMode: 'email', autoComplete: 'email', autoCapitalize: 'off', spellCheck: false, required: true }], null],
  ]
  // A failed submit echoes the typed values back; React 19 resets the form
  // after the action, so the fields re-fill from defaultValue.
  const values = state?.values || {}

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 1240, alignItems: 'center' }}>
      {FIELDS.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 20, width: '100%' }}>
          {row.map((field, fi) => field ? (
            <div key={fi} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <label htmlFor={`contact-${field[1]}`} style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: '#fff' }}>{field[0]}</label>
              <input
                id={`contact-${field[1]}`}
                name={field[1]}
                {...field[2]}
                defaultValue={values[field[1]] ?? ''}
                className="input-glow"
                placeholder="Enter here"
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', outline: 'none', height: 46, padding: '0 15px', fontFamily: "'Archivo', sans-serif", fontSize: inputFont, color: '#fff', width: '100%', boxSizing: 'border-box' }}
              />
            </div>
          ) : (isMobile ? null : <div key={fi} style={{ flex: 1 }} />))}
        </div>
      ))}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <label htmlFor="contact-requirements" style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: '#fff' }}>Requirements</label>
        <textarea
          id="contact-requirements"
          name="requirements"
          className="input-glow"
          rows={6}
          defaultValue={values.requirements ?? ''}
          placeholder="Enter here"
          style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', outline: 'none', padding: '13px 15px', fontFamily: "'Archivo', sans-serif", fontSize: inputFont, color: '#fff', resize: 'vertical', width: '100%', boxSizing: 'border-box' }}
        />
      </div>

      {state?.error && (
        <p className="form-fade-up" style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: '#ee2226', margin: 0 }}>{state.error}</p>
      )}
      <button
        className={`btn-outline${pending ? ' btn-sending' : ''}`}
        type="submit"
        disabled={pending}
        style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', fontFamily: "'Saira Condensed', sans-serif", fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', cursor: pending ? 'default' : 'pointer', width: isMobile ? '100%' : 'auto' }}
      >
        {pending ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <svg className="form-shake" width="16" height="13" viewBox="0 0 16 13" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="14" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M1.5 2.5 L8 7.5 L14.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Sending…
          </span>
        ) : 'Send Message'}
      </button>
    </form>
  )
}
