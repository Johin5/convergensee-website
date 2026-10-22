'use client'

// Device preview harness (served at /preview, see app/preview/page.jsx).
// Renders any site page in a same-origin iframe at real device viewport sizes,
// so useResponsive breakpoints, the mobile nav CSS and the laptop-scale zoom in
// globals.css all behave exactly as they would on the physical device.

import { useEffect, useRef, useState } from 'react'

const GREEN = '#34cc32'
const DARK = '#000718'
const PANEL = '#050d22'
const LINE = 'rgba(255,255,255,0.14)'

const PRESETS = [
  { group: 'Phones', items: [
    { name: 'iPhone SE', w: 375, h: 667 },
    { name: 'iPhone 15 / 16', w: 393, h: 852 },
    { name: 'iPhone 16 Pro Max', w: 440, h: 956 },
    { name: 'Pixel 9', w: 412, h: 915 },
  ] },
  { group: 'Tablets', items: [
    { name: 'iPad mini', w: 744, h: 1133 },
    { name: 'iPad Air 11"', w: 820, h: 1180 },
    { name: 'iPad Pro 12.9"', w: 1024, h: 1366 },
  ] },
  { group: 'MacBooks & laptops', items: [
    { name: 'Small laptop', w: 1280, h: 800 },
    { name: 'MacBook Air 13"', w: 1470, h: 956 },
    { name: 'MB Air 15" / Pro 14"', w: 1512, h: 982 },
    { name: 'MacBook Pro 16"', w: 1728, h: 1117 },
  ] },
  { group: 'Desktops', items: [
    { name: 'Full HD', w: 1920, h: 1080 },
    { name: 'QHD 27"', w: 2560, h: 1440 },
  ] },
]

const PAGES = [
  ['Home', '/'], ['Solutions', '/solutions'], ['About', '/about'],
  ['Case Studies', '/case-studies'], ['Careers', '/careers'],
  ['Team', '/team'], ['Blogs', '/blogs'],
]

// Mirrors the "Laptop scale" media queries in globals.css.
function siteZoom(w) {
  if (w <= 1024) return null
  if (w <= 1219) return 0.72
  if (w <= 1359) return 0.76
  if (w <= 1449) return 0.81
  if (w <= 1529) return 0.85
  if (w <= 1649) return 0.91
  if (w <= 1727) return 0.96
  return 1
}

function modeLabel(w) {
  if (w <= 480) return 'Mobile layout (≤480px)'
  if (w <= 1024) return 'Tablet layout (481–1024px)'
  const z = siteZoom(w)
  if (z < 1) return `Desktop layout, laptop scale ×${z} (renders like 1728px)`
  return 'Desktop layout, full scale (1728px+ reference)'
}

export default function DevicePreview() {
  const [device, setDevice] = useState(PRESETS[2].items[1]) // MacBook Air 13"
  const [rotated, setRotated] = useState(false)
  const [path, setPath] = useState('/')
  const [fit, setFit] = useState(true)
  const [reloadKey, setReloadKey] = useState(0)
  const [stage, setStage] = useState({ w: 1200, h: 800 })
  const stageRef = useRef(null)

  const w = rotated ? device.h : device.w
  const h = rotated ? device.w : device.h

  // The preview chrome itself must not be zoomed by the laptop-scale CSS —
  // the iframe box has to measure in true CSS px for the fit math.
  useEffect(() => {
    const prevZoom = document.body.style.zoom
    const prevOverflow = document.body.style.overflow
    document.body.style.zoom = '1'
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.zoom = prevZoom
      document.body.style.overflow = prevOverflow
    }
  }, [])

  useEffect(() => {
    const measure = () => {
      const el = stageRef.current
      if (el) setStage({ w: el.clientWidth, h: el.clientHeight })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const PAD = 56 // room for the caption under the frame
  const scale = fit ? Math.min((stage.w - 48) / w, (stage.h - PAD - 32) / h, 1) : 1

  const pickDevice = (d) => { setDevice(d); setRotated(false) }
  const setCustom = (nw, nh) => {
    setDevice({ name: 'Custom', w: nw || 1, h: nh || 1 })
    setRotated(false)
  }

  const chip = (active) => ({
    padding: '7px 10px', fontSize: 12.5, letterSpacing: 0.2, cursor: 'pointer',
    border: `1px solid ${active ? GREEN : LINE}`, borderRadius: 6,
    color: active ? GREEN : 'rgba(255,255,255,0.82)',
    background: active ? 'rgba(52,204,50,0.08)' : 'transparent',
    textAlign: 'left', width: '100%', display: 'flex', justifyContent: 'space-between', gap: 8,
  })

  const label = { fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 1.2, textTransform: 'uppercase', color: GREEN, margin: '18px 0 8px' }
  const input = { width: 74, padding: '6px 8px', fontSize: 13, color: '#fff', background: 'transparent', border: `1px solid ${LINE}`, borderRadius: 6, outline: 'none' }
  const btn = { padding: '7px 12px', fontSize: 12.5, cursor: 'pointer', border: `1px solid ${LINE}`, borderRadius: 6, color: '#fff', background: 'transparent' }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 400, display: 'flex', background: DARK, color: '#fff', fontFamily: "'Archivo', sans-serif" }}>

      {/* ── Sidebar ── */}
      <aside style={{ width: 264, flexShrink: 0, borderRight: `1px solid ${LINE}`, background: PANEL, padding: '18px 16px 28px', overflowY: 'auto' }}>
        <div style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: 0.5 }}>
          DEVICE <span style={{ color: GREEN }}>PREVIEW</span>
        </div>
        <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>internal tool · unlisted &amp; noindexed</div>

        <div style={label}>Page</div>
        <select
          value={PAGES.some(([, p]) => p === path) ? path : ''}
          onChange={(e) => { if (e.target.value) { setPath(e.target.value); setReloadKey(k => k + 1) } }}
          style={{ width: '100%', padding: '8px 8px', fontSize: 13, color: '#fff', background: PANEL, border: `1px solid ${LINE}`, borderRadius: 6, outline: 'none' }}
        >
          {!PAGES.some(([, p]) => p === path) && <option value="">{path}</option>}
          {PAGES.map(([name, p]) => <option key={p} value={p}>{name}</option>)}
        </select>

        {PRESETS.map(({ group, items }) => (
          <div key={group}>
            <div style={label}>{group}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {items.map((d) => {
                const active = device.name === d.name
                return (
                  <button key={d.name} className="pill-hover" style={chip(active)} onClick={() => pickDevice(d)}>
                    <span>{d.name}</span>
                    <span style={{ color: 'rgba(255,255,255,0.45)', fontVariantNumeric: 'tabular-nums' }}>{d.w}×{d.h}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        <div style={label}>Custom</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="number" value={w} min={280} max={4000} style={input}
            onChange={(e) => setCustom(Number(e.target.value), h)} />
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>×</span>
          <input type="number" value={h} min={280} max={4000} style={input}
            onChange={(e) => setCustom(w, Number(e.target.value))} />
        </div>

        <div style={label}>Controls</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <button className="pill-hover" style={btn} onClick={() => setRotated(r => !r)}>⟳ Rotate</button>
          <button className="pill-hover" style={btn} onClick={() => setReloadKey(k => k + 1)}>↻ Reload</button>
          <button className="pill-hover" style={{ ...btn, ...(fit ? { borderColor: GREEN, color: GREEN } : {}) }} onClick={() => setFit(f => !f)}>
            {fit ? `Fit ${Math.round(scale * 100)}%` : 'Fit off (100%)'}
          </button>
          <a href={path} target="_blank" rel="noreferrer" className="pill-hover" style={{ ...btn, display: 'inline-block' }}>Open tab ↗</a>
        </div>
      </aside>

      {/* ── Stage ── */}
      <main ref={stageRef} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'auto', padding: 16 }}>
        <div style={{ width: w * scale, height: h * scale, flexShrink: 0, position: 'relative' }}>
          <div style={{
            width: w, height: h, transform: `scale(${scale})`, transformOrigin: 'top left',
            border: `1px solid rgba(255,255,255,0.22)`, borderRadius: w <= 500 ? 24 : 10,
            overflow: 'hidden', background: DARK, boxShadow: '0 24px 80px rgba(0,0,0,0.55)',
          }}>
            <iframe
              key={`${path}-${reloadKey}`}
              src={path}
              title="Device preview"
              style={{ width: w, height: h, border: 'none', display: 'block', background: DARK }}
              onLoad={(e) => {
                try {
                  const p = e.target.contentWindow.location.pathname
                  if (p && p !== path) setPath(p)
                } catch { /* same-origin only; ignore */ }
              }}
            />
          </div>
        </div>
        <div style={{ marginTop: 14, fontSize: 13, color: 'rgba(255,255,255,0.65)', textAlign: 'center', flexShrink: 0 }}>
          <span style={{ color: '#fff', fontWeight: 600 }}>{device.name}{rotated ? ' · rotated' : ''}</span>
          <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.3)' }}>|</span>
          {w} × {h}px
          <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.3)' }}>|</span>
          <span style={{ color: GREEN }}>{modeLabel(w)}</span>
        </div>
      </main>
    </div>
  )
}
