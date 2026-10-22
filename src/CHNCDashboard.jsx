'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

// ─── Figma Assets (sidebar: node 64:4011) ────────────────────────────────────
const sbEllipse206  = '/figma/sidebar-chnc/ellipse-206.svg' // meatballs dots
const sbMahindra    = '/figma/sidebar-chnc/vector.svg' // mahindra logo
const sbChevron     = '/figma/sidebar-chnc/vector-9.svg' // chevron arrow
const sbEllipse4    = '/figma/sidebar-chnc/ellipse-4.svg' // pin body
const sbEllipse5    = '/figma/sidebar-chnc/ellipse-5.svg' // pin dot
const sbVec204      = '/figma/sidebar-chnc/vector-204.svg' // pen body
const sbEllipse73   = '/figma/sidebar-chnc/ellipse-73.svg' // pen dot
const sbVec205      = '/figma/sidebar-chnc/vector-205.svg' // pen line
const sbEllipse65   = '/figma/sidebar-chnc/ellipse-65.svg' // question circle
const sbEllipse93   = '/figma/sidebar-chnc/ellipse-93.svg' // question dot
const sbVec123      = '/figma/sidebar-chnc/vector-123.svg' // question mark
const sbVec57       = '/figma/sidebar-chnc/vector-57.svg' // book body
const sbVec55       = '/figma/sidebar-chnc/vector-55.svg' // book check
const sbVec10       = '/figma/sidebar-chnc/vector-10.svg' // play arrow
const sbEllipse47   = '/figma/sidebar-chnc/ellipse-47.svg' // video circle
const sbVec619      = '/figma/sidebar-chnc/vector-619.svg' // film strip
const sbRect4243    = '/figma/sidebar-chnc/rectangle-4243.svg' // file rect
const sbVec3        = '/figma/sidebar-chnc/vector-3.svg' // message body
const sbEllipse66   = '/figma/sidebar-chnc/ellipse-66.svg' // search circle
const sbVec109      = '/figma/sidebar-chnc/vector-109.svg' // search line
const sbVec58       = '/figma/sidebar-chnc/vector-58.svg' // notebook spiral
const sbVec59       = '/figma/sidebar-chnc/vector-59.svg' // notebook lines
const sbVec60       = '/figma/sidebar-chnc/vector-60.svg' // order lines
const sbVec70       = '/figma/sidebar-chnc/vector-70.svg' // money lines
const sbEllipse118  = '/figma/sidebar-chnc/ellipse-118.svg' // money circle
const sbC2D         = '/figma/sidebar-chnc/c-2d.svg' // ConvergenSEE C logo

// ─── Figma Assets (main panel: node 53:2908) ─────────────────────────────────
const imgVector          = '/figma/dashboard-chnc/img-search-vector.svg'
const imgCustomer11      = '/figma/dashboard-chnc/img-customer11.webp'
const imgAvatar06        = '/figma/dashboard-chnc/img-avatar06.webp'
const imgMemoji          = '/figma/dashboard-chnc/img-memoji.png'
const imgSubtract        = '/figma/dashboard-chnc/img-menu-subtract.svg'
const imgEllipse103      = '/figma/dashboard-chnc/img-ellipse103.svg'
const imgEllipse165      = '/figma/dashboard-chnc/img-ellipse165.svg'
const imgEllipse108      = '/figma/dashboard-chnc/img-ellipse108.svg'
const imgVector907       = '/figma/dashboard-chnc/img-vector907.svg'
const imgSubtract1       = '/figma/dashboard-chnc/img-bell-subtract.svg'
const imgEllipse45       = '/figma/dashboard-chnc/img-ellipse45.svg'
const imgEllipse65       = '/figma/dashboard-chnc/img-ellipse65-header.svg'
const imgEllipse93       = '/figma/dashboard-chnc/img-ellipse93-header.svg'
const imgVector123       = '/figma/dashboard-chnc/img-vector123-header.svg'
const imgSubtract2       = '/figma/dashboard-chnc/img-setting-subtract.svg'
const imgVector2         = '/figma/dashboard-chnc/img-vector9-expand.svg'
const imgGroupDuotoneFill= '/figma/dashboard-chnc/img-group-duotone-fill.svg'
const imgArrow           = '/figma/dashboard-chnc/img-arrow.svg'
const imgSubtract3       = '/figma/dashboard-chnc/img-subtract-pin.svg'
const imgVector10        = '/figma/dashboard-chnc/img-vector9-list.svg'
const imgVector204       = '/figma/dashboard-chnc/img-vector204-campaign.svg'
const imgEllipse73       = '/figma/dashboard-chnc/img-ellipse73-campaign.svg'
const imgVector205       = '/figma/dashboard-chnc/img-vector205-campaign.svg'

// ─── Sub-components ───────────────────────────────────────────────────────────

function SearchBar() {
  return (
    <div style={{ background: '#fff', border: '1px solid #dee0e7', display: 'flex', gap: 8, alignItems: 'center', padding: '12px 15px', width: 307, flexShrink: 0 }}>
      <div style={{ position: 'relative', width: 16, height: 16, flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: '12.5%' }}>
          <img loading="lazy" alt="" style={{ display: 'block', width: '100%', height: '100%' }} src={imgVector} />
        </div>
      </div>
      <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 400, color: '#9fa3ac', fontSize: 14, lineHeight: '14px', whiteSpace: 'nowrap' }}>
        Search
      </p>
    </div>
  )
}


function PenIcon() {
  return (
    <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: '66.67% 16.67% 16.67% 16.67%', border: '0.833px solid #000718', borderRadius: 23 }} />
      <div style={{ position: 'absolute', inset: '8.33% 16.67% 33.33% 16.67%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-6.06% -1.95% -4.29% -1.95%', display: 'block', width: '100%', height: '100%' }} src={imgVector204} />
      </div>
      <div style={{ position: 'absolute', inset: '33.33% 37.5% 41.67% 37.5%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={imgEllipse73} />
      </div>
      <div style={{ position: 'absolute', bottom: '62.5%', left: '50%', right: '50%', top: '8.33%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={imgVector205} />
      </div>
    </div>
  )
}

function PinIcon() {
  return (
    <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: '16.67% 20.83% 17.16% 20.83%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-3.78% -4.29%', display: 'block', width: '100%', height: '100%' }} src={imgSubtract3} />
      </div>
    </div>
  )
}

function Contributors() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingRight: 8 }}>
      <div style={{ background: '#b5e4ca', border: '1.429px solid #fefefe', marginRight: -8, overflow: 'hidden', borderRadius: 30, flexShrink: 0, width: 20, height: 20, position: 'relative' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-33.33% -48.44% -63.62% -48.44%', width: '100%', height: '100%', objectFit: 'cover' }} src={imgCustomer11} />
      </div>
      <div style={{ border: '1.469px solid #fefefe', marginRight: -8, position: 'relative', borderRadius: 62.632, flexShrink: 0, width: 24, height: 24, overflow: 'hidden' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', height: '435.83%', left: '-116.5%', maxWidth: 'none', top: '-81.79%', width: '290.59%' }} src={imgAvatar06} />
      </div>
    </div>
  )
}

function CampaignCard({ controls, custom }) {
  return (
    <motion.div custom={custom} variants={{
      hidden: { opacity: 0, y: 16 },
      visible: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.4 + i * 0.12, duration: 0.45, ease: 'easeOut' } }),
    }} initial="hidden" animate={controls}
      style={{ background: '#fff', border: '1px solid #dee0e7', display: 'flex', flexDirection: 'column', gap: 15, height: 296, alignItems: 'flex-start', padding: 18, position: 'relative', flexShrink: 0, width: 353 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', width: '100%' }}>
        <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, height: 20, lineHeight: '18px', color: '#000718', fontSize: 18, textTransform: 'uppercase', width: 159 }}>
          Recent campaign
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', justifyContent: 'center', padding: 18, width: '100%' }}>
        <div style={{ overflow: 'hidden', position: 'relative', flexShrink: 0, width: 40, height: 40 }}>
          <div style={{ position: 'absolute', background: 'rgba(124,50,204,0.3)', display: 'flex', alignItems: 'center', left: 0, padding: 10, width: 40, height: 40, top: 0 }}>
            <PenIcon />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', justifyContent: 'center', lineHeight: '18px', textAlign: 'center', whiteSpace: 'nowrap' }}>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 400, color: '#000718', fontSize: 14 }}>Mahindra XUV700 Awareness</p>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 300, color: '#666a74', fontSize: 12 }}>Created 30/07/2024</p>
        </div>
        <div style={{ background: '#eafdee', display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'center', padding: '5px 10px' }}>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 500, lineHeight: '16px', color: '#147129', fontSize: 11, textAlign: 'center', whiteSpace: 'nowrap' }}>Active</p>
        </div>
        <Contributors />
        <div style={{ background: '#fff', border: '1px solid #dee0e7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px 15px' }}>
          <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, lineHeight: '24px', color: '#000718', fontSize: 14, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>See details</p>
        </div>
      </div>
    </motion.div>
  )
}

function LocationCard({ controls, custom }) {
  return (
    <motion.div custom={custom} variants={{
      hidden: { opacity: 0, y: 16 },
      visible: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.4 + i * 0.12, duration: 0.45, ease: 'easeOut' } }),
    }} initial="hidden" animate={controls}
      style={{ background: '#fff', border: '1px solid #dee0e7', display: 'flex', flexDirection: 'column', gap: 15, height: 296, alignItems: 'flex-start', padding: 18, position: 'relative', flexShrink: 0, width: 353 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', width: '100%' }}>
        <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, height: 20, lineHeight: '18px', color: '#000718', fontSize: 18, textTransform: 'uppercase', width: 159 }}>
          Recent location
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', justifyContent: 'center', padding: 18, width: '100%' }}>
        <div style={{ overflow: 'hidden', position: 'relative', flexShrink: 0, width: 40, height: 40 }}>
          <div style={{ position: 'absolute', background: '#e3ebfe', display: 'flex', alignItems: 'center', left: 0, padding: 10, width: 40, height: 40, top: 0 }}>
            <PinIcon />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', justifyContent: 'center', lineHeight: '18px', textAlign: 'center', whiteSpace: 'nowrap' }}>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 400, color: '#000718', fontSize: 14 }}>Powai Hiranandani</p>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 300, color: '#666a74', fontSize: 12 }}>Created 30/07/2024</p>
        </div>
        <div style={{ background: '#eafdee', display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'center', padding: '5px 10px' }}>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 500, lineHeight: '16px', color: '#147129', fontSize: 11, textAlign: 'center', whiteSpace: 'nowrap' }}>Active</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', paddingRight: 8 }}>
          <div style={{ background: '#b5e4ca', border: '1.429px solid #fefefe', marginRight: -8, overflow: 'hidden', borderRadius: 30, flexShrink: 0, width: 20, height: 20, position: 'relative' }}>
            <img loading="lazy" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} src={imgCustomer11} />
          </div>
          <div style={{ border: '1.469px solid #fefefe', position: 'relative', borderRadius: 62.632, flexShrink: 0, width: 24, height: 24, overflow: 'hidden' }}>
            <img loading="lazy" alt="" style={{ position: 'absolute', height: '435.83%', left: '-116.5%', maxWidth: 'none', top: '-81.79%', width: '290.59%' }} src={imgAvatar06} />
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #dee0e7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px 15px' }}>
          <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, lineHeight: '24px', color: '#000718', fontSize: 14, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>See details</p>
        </div>
      </div>
    </motion.div>
  )
}

function ListItemRow({ isPen, label, sub }) {
  return (
    <div style={{ borderBottom: '0.5px solid #dee0e7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <div style={{ display: 'flex', gap: 15, alignItems: 'center', padding: '15px 0', width: 254 }}>
        <div style={{ overflow: 'hidden', position: 'relative', flexShrink: 0, width: 40, height: 40 }}>
          <div style={{ position: 'absolute', background: isPen ? 'rgba(124,50,204,0.3)' : '#e3ebfe', display: 'flex', alignItems: 'center', left: 0, padding: 10, width: 40, height: 40, top: 0 }}>
            {isPen ? <PenIcon /> : <PinIcon />}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', lineHeight: '18px', whiteSpace: 'nowrap' }}>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 400, color: '#000718', fontSize: 14 }}>
            {label || (isPen ? 'Mahindra XUV700 Awareness' : 'Powai Hiranandani')}
          </p>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 300, color: '#666a74', fontSize: 12 }}>{sub || 'Created 30/07/2024'}</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '23px 18px', width: 89 }}>
        <div style={{ background: '#eafdee', display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'center', padding: '5px 10px' }}>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 500, lineHeight: '16px', color: '#147129', fontSize: 11, textAlign: 'center', whiteSpace: 'nowrap' }}>Active</p>
        </div>
      </div>
    </div>
  )
}

// ─── Sidebar icon helpers ─────────────────────────────────────────────────────
function SbChevron() {
  return (
    <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
      <div style={{ position: 'absolute', bottom: '37.5%', display: 'flex', alignItems: 'center', justifyContent: 'center', left: '25%', right: '25%', top: '37.5%' }}>
        <div style={{ transform: 'rotate(-90deg) scaleY(-1)', width: 6, height: 12 }}>
          <img loading="lazy" alt="" style={{ display: 'block', width: '100%', height: '100%' }} src={sbChevron} />
        </div>
      </div>
    </div>
  )
}
function IconPin() {
  return (
    <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: '18.75% 18.75% 10.42% 18.75%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-3.53% -4% -2.72% -4%', display: 'block', width: '100%', height: '100%' }} src={sbEllipse4} />
      </div>
      <div style={{ position: 'absolute', inset: '33.33%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={sbEllipse5} />
      </div>
    </div>
  )
}
function IconPen() {
  return (
    <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: '66.67% 16.67% 16.67% 16.67%', border: '0.833px solid #666a74', borderRadius: 23 }} />
      <div style={{ position: 'absolute', inset: '8.33% 16.67% 33.33% 16.67%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-6.06% -1.59% -4.29% -1.59%', display: 'block', width: '100%', height: '100%' }} src={sbVec204} />
      </div>
      <div style={{ position: 'absolute', inset: '33.33% 37.5% 41.67% 37.5%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={sbEllipse73} />
      </div>
      <div style={{ position: 'absolute', bottom: '62.5%', left: '50%', right: '50%', top: '8.33%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', inset: '0 -0.5px', display: 'block', width: '100%', height: '100%' }} src={sbVec205} />
      </div>
    </div>
  )
}
function IconQuestion() {
  return (
    <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: '12.5%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={sbEllipse65} />
      </div>
      <div style={{ position: 'absolute', inset: '72.92% 47.92% 22.92% 47.92%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={sbEllipse93} />
      </div>
      <div style={{ position: 'absolute', inset: '29.17% 37.5% 33.33% 37.5%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-6.67% -10% 0 -10%', display: 'block', width: '100%', height: '100%' }} src={sbVec123} />
      </div>
    </div>
  )
}
function IconBook() {
  return (
    <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: '12.5% 16.67%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-3.33% -3.75%', display: 'block', width: '100%', height: '100%' }} src={sbVec57} />
      </div>
      <div style={{ position: 'absolute', bottom: '50%', left: '37.5%', right: '37.5%', top: '33.33%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-15% -10% -2.57% -10%', display: 'block', width: '100%', height: '100%' }} src={sbVec55} />
      </div>
    </div>
  )
}
function IconVideo() {
  return (
    <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
      <div style={{ position: 'absolute', bottom: '29.17%', display: 'flex', alignItems: 'center', justifyContent: 'center', left: '33.33%', right: '25%', top: '29.17%' }}>
        <div style={{ transform: 'rotate(180deg) scaleY(-1)', width: 8.333, height: 8.333 }}>
          <img loading="lazy" alt="" style={{ display: 'block', width: '100%', height: '100%' }} src={sbVec10} />
        </div>
      </div>
      <div style={{ position: 'absolute', inset: '12.5%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-3.33%', display: 'block', width: '100%', height: '100%' }} src={sbEllipse47} />
      </div>
    </div>
  )
}
function IconAI() {
  return (
    <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
      <div style={{ position: 'absolute', bottom: '25%', left: '39.58%', right: '35.42%', top: '50%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', inset: '2.32% 14.72% 2.32% -10%', display: 'block', width: '100%', height: '100%' }} src={sbVec619} />
      </div>
      <div style={{ position: 'absolute', inset: '14.58% 22.92%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-3.53% -4.62%', display: 'block', width: '100%', height: '100%' }} src={sbRect4243} />
      </div>
    </div>
  )
}
function IconMessage() {
  return (
    <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
      <div style={{ position: 'absolute', bottom: '25%', left: '16.67%', right: '16.67%', top: '25%', border: '0.833px solid #666a74', borderRadius: 2 }} />
      <div style={{ position: 'absolute', inset: '37.5% 16.67% 45.83% 16.67%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-13.42% -1.68% -7.92% -1.68%', display: 'block', width: '100%', height: '100%' }} src={sbVec3} />
      </div>
    </div>
  )
}
function IconSearch() {
  return (
    <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: '20.83% 29.17% 29.17% 20.83%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-5%', display: 'block', width: '100%', height: '100%' }} src={sbEllipse66} />
      </div>
      <div style={{ position: 'absolute', inset: '70.83% 16.67% 16.67% 70.83%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-20%', display: 'block', width: '100%', height: '100%' }} src={sbVec109} />
      </div>
    </div>
  )
}
function IconNotebook() {
  return (
    <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
      <div style={{ position: 'absolute', bottom: '12.5%', left: '25%', right: '20.83%', top: '16.67%', border: '0.833px solid #666a74', borderRadius: 2 }} />
      <div style={{ position: 'absolute', inset: '33.33% 37.5% 58.33% 62.5%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-0.5px -30%', display: 'block', width: '100%', height: '100%' }} src={sbVec58} />
      </div>
      {['37.5% 66.67% 62.5% 16.67%','54.17% 66.67% 45.83% 16.67%','70.83% 66.67% 29.17% 16.67%'].map((inset, i) => (
        <div key={i} style={{ position: 'absolute', inset }}>
          <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-0.5px -15%', display: 'block', width: '100%', height: '100%' }} src={sbVec59} />
        </div>
      ))}
    </div>
  )
}
function IconOrder() {
  return (
    <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: '16.67% 20.83% 12.5% 20.83%', border: '0.833px solid #666a74', borderRadius: 2 }} />
      {['37.5% 37.5% 62.5% 37.5%','54.17% 37.5% 45.83% 37.5%'].map((inset, i) => (
        <div key={i} style={{ position: 'absolute', inset }}>
          <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-0.5px -10%', display: 'block', width: '100%', height: '100%' }} src={sbVec60} />
        </div>
      ))}
      <div style={{ position: 'absolute', inset: '70.83% 45.83% 29.17% 37.5%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-0.5px -15%', display: 'block', width: '100%', height: '100%' }} src={sbVec59} />
      </div>
    </div>
  )
}
function IconMoney() {
  return (
    <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
      <div style={{ position: 'absolute', bottom: '25%', left: '12.5%', right: '12.5%', top: '25%', border: '0.833px solid #666a74', borderRadius: 2 }} />
      {['37.5% 66.67% 62.5% 20.83%','62.5% 20.83% 37.5% 66.67%'].map((inset, i) => (
        <div key={i} style={{ position: 'absolute', inset }}>
          <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-0.5px -20%', display: 'block', width: '100%', height: '100%' }} src={sbVec70} />
        </div>
      ))}
      <div style={{ position: 'absolute', inset: '41.67%' }}>
        <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-15%', display: 'block', width: '100%', height: '100%' }} src={sbEllipse118} />
      </div>
    </div>
  )
}

function IconGlobe() {
  return (
    <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: '12.5%', border: '0.833px solid #666a74', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', left: '12.5%', right: '12.5%', top: '50%', borderTop: '0.833px solid #666a74' }} />
      <div style={{ position: 'absolute', left: '35%', right: '35%', top: '12.5%', bottom: '12.5%', border: '0.833px solid #666a74', borderRadius: '50%' }} />
    </div>
  )
}
function IconPulseRing() {
  return (
    <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: '12.5%', border: '0.833px solid #666a74', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', inset: '31%', border: '0.833px solid #666a74', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', inset: '45%', background: '#666a74', borderRadius: '50%' }} />
    </div>
  )
}
function IconPanels() {
  return (
    <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
      <div style={{ position: 'absolute', left: '10%', top: '22%', bottom: '22%', width: '18%', border: '0.833px solid #666a74', borderRadius: 1 }} />
      <div style={{ position: 'absolute', left: '41%', top: '12.5%', bottom: '12.5%', width: '18%', border: '0.833px solid #666a74', borderRadius: 1 }} />
      <div style={{ position: 'absolute', right: '10%', top: '22%', bottom: '22%', width: '18%', border: '0.833px solid #666a74', borderRadius: 1 }} />
    </div>
  )
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const sbMenuItems = [
  { id: 'LocateIT',    label: 'LocateIT',    Icon: IconPin },
  { id: 'CreateIT',    label: 'CreateIT',    Icon: IconPen },
  { id: 'AmplifyIT',   label: 'AmplifyIT',   Icon: IconQuestion },
  { id: 'SocialiseIT', label: 'SocialiseIT', Icon: IconMessage },
  { id: 'InfluenceIT', label: 'InfluenceIT', Icon: IconBook },
  { id: 'ScriptIT',    label: 'ScriptIT',    Icon: IconVideo },
  { id: 'AIgenIT',     label: 'AIgenIT',     Icon: IconAI },
  { id: 'SearchIT',    label: 'SearchIT',    Icon: IconSearch },
  { id: 'InvoiceIT',   label: 'InvoiceIT',   Icon: IconOrder },
  { id: 'AdaptIT',     label: 'AdaptIT',     Icon: IconGlobe },
  { id: 'EngageIT',    label: 'EngageIT',    Icon: IconPulseRing },
  { id: 'ConvergeIT',  label: 'ConvergeIT',  Icon: IconPanels },
]

function Sidebar({ active, org, insightSub }) {
  return (
    <div style={{
      position: 'absolute', left: 0, top: 0, bottom: 0, width: 256,
      background: '#000718', borderRight: '1px solid #dee0e7',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'Archivo', sans-serif",
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 33px', flexShrink: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5.486, alignItems: 'center' }}>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, lineHeight: 1, color: '#34cc32', fontSize: 47.887, letterSpacing: -1.3879, whiteSpace: 'nowrap' }}>CHNC</p>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 600, lineHeight: '5.951px', color: '#666a74', fontSize: 5.951, textAlign: 'center', letterSpacing: 1.8105, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>The Opportunity Creators</p>
        </div>
      </div>

      {/* Org + menus */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: 5, padding: '10px 18px', flexShrink: 0 }}>
        {/* Org switch */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 15 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', width: 164 }}>
            <div style={{ background: '#fff', overflow: 'hidden', position: 'relative', width: 30, height: 30, flexShrink: 0 }}>
              {org
                ? <p style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 0.5, color: '#000718' }}>{org.initials}</p>
                : <img loading="lazy" alt="Mahindra" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', height: 11.507, width: 25, display: 'block' }} src={sbMahindra} />}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center', whiteSpace: 'nowrap', minWidth: 0, flex: '1 0 0' }}>
              <p style={{ fontWeight: 600, lineHeight: '15px', fontSize: 14, color: '#fff' }}>{org ? org.name : <>Mahindra &amp; Mah..</>}</p>
              <p style={{ fontWeight: 400, color: '#666a74', fontSize: 10 }}>{org ? org.sub : 'Automobile Ind'}</p>
            </div>
          </div>
          {/* Meatballs */}
          <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
            {[['45.83%','45.83%','45.83%','45.83%'],['45.83%','70.83%','45.83%','20.83%'],['45.83%','20.83%','45.83%','70.83%']].map((p, i) => (
              <div key={i} style={{ position: 'absolute', top: p[0], right: p[1], bottom: p[2], left: p[3] }}>
                <div style={{ position: 'absolute', inset: '-50%' }}>
                  <img loading="lazy" alt="" style={{ display: 'block', width: '100%', height: '100%' }} src={sbEllipse206} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* InsightIT */}
        <div style={{ background: active === 'InsightIT' ? '#34cc32' : 'transparent', display: 'flex', height: 40, alignItems: 'center', justifyContent: 'space-between', padding: '12px 15px', flexShrink: 0, borderRadius: active === 'InsightIT' ? 0 : 10 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
              {[['16.67%','58.33%','58.33%','16.67%'],['58.33%','58.33%','16.67%','16.67%'],['58.33%','16.67%','16.67%','58.33%'],['16.67%','16.67%','58.33%','58.33%']].map((inset, i) => (
                <div key={i} style={{ position: 'absolute', top: inset[0], right: inset[1], bottom: inset[2], left: inset[3], border: `0.833px solid ${active === 'InsightIT' ? '#000718' : '#666a74'}`, borderRadius: 1 }} />
              ))}
            </div>
            <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, lineHeight: '24px', color: active === 'InsightIT' ? '#000718' : '#666a74', fontSize: 14, whiteSpace: 'nowrap' }}>InsightIT</p>
          </div>
        </div>

        {/* Global InsightIT sub-item (shown while the InsightIT reel plays) */}
        {insightSub && active === 'InsightIT' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 15px 6px 45px', flexShrink: 0 }}>
            <div style={{ width: 5, height: 5, borderRadius: 3, background: '#34cc32', flexShrink: 0 }} />
            <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, fontSize: 12.5, color: '#34cc32', whiteSpace: 'nowrap' }}>Global InsightIT</p>
          </div>
        )}

        {/* Other menu items */}
        {sbMenuItems.map(({ id, label, Icon }) => {
          const isActive = active === id
          return (
            <div key={id} style={{ background: isActive ? '#34cc32' : 'transparent', display: 'flex', height: 40, alignItems: 'center', justifyContent: 'space-between', padding: '12px 15px', borderRadius: isActive ? 0 : 10, flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Icon />
                <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: isActive ? 600 : 500, lineHeight: '24px', color: isActive ? '#000718' : '#666a74', fontSize: 14, whiteSpace: 'nowrap' }}>{label}</p>
              </div>
              {!isActive && <SbChevron />}
            </div>
          )
        })}
      </div>

      {/* Ad / upgrade section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', justifyContent: 'center', padding: '20px 20px', flexShrink: 0 }}>
        <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 300, lineHeight: '16px', color: 'rgba(255,255,255,0.7)', fontSize: 12, textAlign: 'center', letterSpacing: -0.36, width: 216 }}>
          Let&apos;s create campaign for your brand!
        </p>
        <div style={{ border: '1px solid #fff', display: 'flex', height: 40, alignItems: 'center', justifyContent: 'center', padding: '10px 20px', width: 216 }}>
          <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, lineHeight: '24px', color: '#fff', fontSize: 14, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Upgrade now</p>
        </div>
      </div>

      {/* ConvergenSEE footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '20px 33px', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
            <div style={{ height: 17.368, overflow: 'hidden', position: 'relative', width: 19.48, flexShrink: 0 }}>
              <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={sbC2D} />
            </div>
            <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 14.999, color: '#fff', whiteSpace: 'nowrap' }}>
              <span style={{ fontWeight: 600 }}>Convergen</span>
              <span style={{ fontWeight: 800, color: '#34cc32' }}>SEE</span>
            </p>
          </div>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 400, lineHeight: '24px', color: '#fff', fontSize: 12, whiteSpace: 'nowrap' }}>©2025</p>
        </div>
      </div>
    </div>
  )
}

// ─── Header ──────────────────────────────────────────────────────────────────
function Header() {
  return (
    <div style={{
      position: 'absolute', right: 0, top: 0, width: 1183, height: 70,
      background: '#fff', borderBottom: '1px solid #dee0e7',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 28px',
    }}>
      {/* Left: hamburger + search */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', width: 388 }}>
        <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
          <div style={{ position: 'absolute', inset: '26.67% 18.33%' }}>
            <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={imgSubtract} />
          </div>
          <div style={{ position: 'absolute', inset: '16.67% 16.67% 66.67% 66.67%' }}>
            <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={imgEllipse103} />
          </div>
        </div>
        <SearchBar />
      </div>

      {/* Right: icons + user */}
      <div style={{ display: 'flex', gap: 15, alignItems: 'center', justifyContent: 'flex-end', width: 449 }}>
        {/* 4 icon groups */}
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          {/* Light mode */}
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 40, height: 40, flexShrink: 0 }}>
              <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={imgEllipse165} />
              <div style={{ position: 'absolute', left: 10, top: 10, width: 20, height: 20 }}>
                <div style={{ position: 'absolute', inset: '33.33%' }}>
                  <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={imgEllipse108} />
                </div>
              </div>
            </div>
            <div style={{ height: 22.5, width: 1, position: 'relative', flexShrink: 0 }}>
              <img loading="lazy" alt="" style={{ position: 'absolute', inset: '0 -0.5px', display: 'block', width: '100%', height: '100%' }} src={imgVector907} />
            </div>
          </div>
          {/* Bell */}
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 40, height: 40, flexShrink: 0 }}>
              <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={imgEllipse165} />
              <div style={{ position: 'absolute', left: 10, top: 10, width: 20, height: 20 }}>
                <div style={{ position: 'absolute', inset: '14.17% 13.21% 22.5% 13.21%' }}>
                  <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={imgSubtract1} />
                </div>
                <div style={{ position: 'absolute', inset: '20.83% 20.83% 62.5% 62.5%' }}>
                  <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={imgEllipse45} />
                </div>
              </div>
            </div>
            <div style={{ height: 22.5, width: 1, position: 'relative', flexShrink: 0 }}>
              <img loading="lazy" alt="" style={{ position: 'absolute', inset: '0 -0.5px', display: 'block', width: '100%', height: '100%' }} src={imgVector907} />
            </div>
          </div>
          {/* Question */}
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 40, height: 40, flexShrink: 0 }}>
              <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={imgEllipse165} />
              <div style={{ position: 'absolute', left: 10, top: 10, width: 20, height: 20 }}>
                <div style={{ position: 'absolute', inset: '12.5%' }}>
                  <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={imgEllipse65} />
                </div>
                <div style={{ position: 'absolute', inset: '72.92% 47.92% 22.92% 47.92%' }}>
                  <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={imgEllipse93} />
                </div>
                <div style={{ position: 'absolute', inset: '29.17% 37.5% 33.33% 37.5%' }}>
                  <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={imgVector123} />
                </div>
              </div>
            </div>
            <div style={{ height: 22.5, width: 1, position: 'relative', flexShrink: 0 }}>
              <img loading="lazy" alt="" style={{ position: 'absolute', inset: '0 -0.5px', display: 'block', width: '100%', height: '100%' }} src={imgVector907} />
            </div>
          </div>
          {/* Settings */}
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 40, height: 40, flexShrink: 0 }}>
              <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={imgEllipse165} />
              <div style={{ position: 'absolute', left: 10, top: 10, width: 20, height: 20 }}>
                <div style={{ position: 'absolute', inset: '8.33%' }}>
                  <img loading="lazy" alt="" style={{ position: 'absolute', inset: '-3%', display: 'block', width: '100%', height: '100%' }} src={imgSubtract2} />
                </div>
              </div>
            </div>
            <div style={{ height: 22.5, width: 1, position: 'relative', flexShrink: 0 }}>
              <img loading="lazy" alt="" style={{ position: 'absolute', inset: '0 -0.5px', display: 'block', width: '100%', height: '100%' }} src={imgVector907} />
            </div>
          </div>
        </div>

        {/* User */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
          <div style={{ background: '#c5ecfd', overflow: 'hidden', borderRadius: 499.5, flexShrink: 0, width: 30, height: 30, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ margin: 0, fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 0.3, color: '#000718' }}>AS</p>
          </div>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
              <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 400, color: '#000718', fontSize: 14, textAlign: 'center', whiteSpace: 'nowrap', lineHeight: 'normal' }}>A. Sharma</p>
              <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 300, color: '#666a74', fontSize: 10, textAlign: 'center', whiteSpace: 'nowrap', lineHeight: 'normal' }}>a.sharma@convergensee.ai</p>
            </div>
            <div style={{ position: 'relative', borderRadius: 15, width: 20, height: 20, flexShrink: 0 }}>
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', height: 3, width: 12 }}>
                <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={imgVector2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Module definitions ───────────────────────────────────────────────────────
const MODULES = {
  InsightIT: {
    title: 'InsightIT',
    tiles: [
      { label: 'Google Reviews', value: '45',   growth: '+21.01%' },
      { label: 'Avg Rating',     value: '4.7',  growth: '+5.3%' },
      { label: 'Responded',      value: '38',   growth: '+31.2%' },
      { label: 'Sentiment Score',value: '87%',  growth: '+4.1%' },
    ],
  },
  LocateIT: {
    title: 'LocateIT',
    tiles: [
      { label: 'Total Listings',    value: '24',   growth: '+8.5%' },
      { label: 'Verified Listings', value: '18',   growth: '+12.3%' },
      { label: 'Profile Views',     value: '2.4K', growth: '+18.7%' },
      { label: 'Search Impress.',   value: '18K',  growth: '+24.1%' },
    ],
  },
  AmplifyIT: {
    title: 'AmplifyIT',
    tiles: [
      { label: 'Ad Spend',    value: '₹2.1L', growth: '+14.2%' },
      { label: 'ROAS',        value: '4.8x',  growth: '+22.7%' },
      { label: 'Impressions', value: '1.2M',  growth: '+38.5%' },
      { label: 'Conversions', value: '3,840', growth: '+19.3%' },
    ],
  },
  CreateIT: {
    title: 'CreateIT',
    tiles: [
      { label: 'Creatives',   value: '124',  growth: '+18.0%' },
      { label: 'Published',   value: '98',   growth: '+21.4%' },
      { label: 'In Review',   value: '14',   growth: '-5.2%' },
      { label: 'Avg CTR',     value: '3.2%', growth: '+9.7%' },
    ],
  },
  SocialiseIT: {
    title: 'SocialiseIT',
    tiles: [
      { label: 'Followers',   value: '84K',  growth: '+11.6%' },
      { label: 'Posts',       value: '312',  growth: '+8.3%' },
      { label: 'Total Reach', value: '2.9M', growth: '+27.4%' },
      { label: 'Eng. Rate',   value: '5.4%', growth: '+3.2%' },
    ],
  },
  InfluenceIT: {
    title: 'InfluenceIT',
    tiles: [
      { label: 'Influencers',  value: '48',   growth: '+16.0%' },
      { label: 'Total Reach',  value: '7.2M', growth: '+34.1%' },
      { label: 'Avg Eng.',     value: '6.1%', growth: '+8.5%' },
      { label: 'Campaigns',    value: '12',   growth: '+20.0%' },
    ],
  },
  ScriptIT: {
    title: 'ScriptIT',
    tiles: [
      { label: 'Scripts',      value: '67',   growth: '+14.3%' },
      { label: 'In Production',value: '8',    growth: '-10.0%' },
      { label: 'Completed',    value: '54',   growth: '+28.6%' },
      { label: 'Avg Days',     value: '4.2',  growth: '-18.2%' },
    ],
  },
  AIgenIT: {
    title: 'AIgenIT',
    tiles: [
      { label: 'Generated',    value: '2,140', growth: '+44.2%' },
      { label: 'Quality Score',value: '91%',   growth: '+6.8%' },
      { label: 'Time Saved',   value: '186h',  growth: '+52.1%' },
      { label: 'Tokens Used',  value: '4.7M',  growth: '+39.0%' },
    ],
  },
  SearchIT: {
    title: 'SearchIT',
    tiles: [
      { label: 'Keywords',     value: '892',  growth: '+7.3%' },
      { label: 'Avg Position', value: '4.1',  growth: '-18.4%' },
      { label: 'Organic Traffic',value:'38K', growth: '+29.7%' },
      { label: 'Backlinks',    value: '1,204',growth: '+12.1%' },
    ],
  },
  InvoiceIT: {
    title: 'InvoiceIT',
    tiles: [
      { label: 'Total Invoices',value: '84',   growth: '+6.3%' },
      { label: 'Paid',          value: '71',   growth: '+9.8%' },
      { label: 'Overdue',       value: '6',    growth: '-25.0%' },
      { label: 'This Month',    value: '₹8.4L',growth: '+17.2%' },
    ],
  },
  AdaptIT: {
    title: 'AdaptIT',
    tiles: [
      { label: 'Markets Live',     value: '12',   growth: '+20.0%' },
      { label: 'Languages',        value: '9',    growth: '+28.6%' },
      { label: 'Localised Assets', value: '248',  growth: '+31.4%' },
      { label: 'Compliance Pass',  value: '98%',  growth: '+2.1%' },
    ],
  },
  EngageIT: {
    title: 'EngageIT',
    tiles: [
      { label: 'Active Journeys',  value: '16',    growth: '+23.1%' },
      { label: 'Messages Sent',    value: '42K',   growth: '+18.4%' },
      { label: 'Re-engaged',       value: '3,120', growth: '+26.7%' },
      { label: 'Retention Lift',   value: '14%',   growth: '+9.2%' },
    ],
  },
  ConvergeIT: {
    title: 'ConvergeIT',
    tiles: [
      { label: 'Agencies Linked',  value: '7',      growth: '+16.7%' },
      { label: 'Active Campaigns', value: '38',     growth: '+11.8%' },
      { label: 'Combined Spend',   value: '₹18.6L', growth: '+9.4%' },
      { label: 'Blended ROAS',     value: '4.1x',   growth: '+13.2%' },
    ],
  },
}

// ─── Chart primitives ─────────────────────────────────────────────────────────
function StatTiles({ tiles, controls, tileVariants }) {
  return (
    <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
      {tiles.map((tile, i) => (
        <motion.div key={i} custom={i} variants={tileVariants} initial="hidden" animate={controls}
          style={{ background: 'rgba(52,204,50,0.1)', border: '1px solid #dee0e7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 18, flexShrink: 0, width: 257 }}>
          <div style={{ display: 'flex', flexDirection: 'column', fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, gap: 15, alignItems: 'flex-start', color: '#000718' }}>
            <p style={{ lineHeight: '18px', fontSize: 14, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{tile.label}</p>
            <div style={{ display: 'flex', flexDirection: 'column', height: 50, justifyContent: 'flex-end', fontSize: 36, letterSpacing: -1 }}>
              <p style={{ lineHeight: '46px' }}>{tile.value}</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', height: 83, alignItems: 'flex-end', justifyContent: 'space-between', width: 74 }}>
            <div style={{ position: 'relative', width: 30, height: 30, flexShrink: 0 }}>
              <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={imgGroupDuotoneFill} />
            </div>
            <div style={{ border: `1px solid ${tile.growth.startsWith('-') ? '#cc3232' : '#34cc32'}`, display: 'flex', gap: 5, alignItems: 'center', padding: 3 }}>
              <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 500, lineHeight: '16px', color: tile.growth.startsWith('-') ? '#cc3232' : '#34cc32', fontSize: 12, whiteSpace: 'nowrap' }}>{tile.growth}</p>
              {!tile.growth.startsWith('-') && (
                <div style={{ height: 7.09, position: 'relative', width: 10.279, flexShrink: 0 }}>
                  <img loading="lazy" alt="" style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} src={imgArrow} />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function VertBars({ data, height = 140 }) {
  const max = Math.max(...data.map(d => d.v))
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 10, color: '#666a74', whiteSpace: 'nowrap' }}>{d.v}{d.unit||''}</p>
          <div style={{ width: '100%', background: i % 2 === 0 ? '#34cc32' : 'rgba(52,204,50,0.35)', height: Math.round((d.v / max) * (height - 30)) }} />
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 10, color: '#666a74', whiteSpace: 'nowrap', textAlign: 'center' }}>{d.l}</p>
        </div>
      ))}
    </div>
  )
}

function HorizRow({ label, value, max, unit = '' }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: '#000718' }}>{label}</p>
        <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, fontWeight: 600, color: '#34cc32' }}>{value}{unit}</p>
      </div>
      <div style={{ background: '#dee0e7', height: 6, width: '100%' }}>
        <div style={{ background: '#34cc32', height: '100%', width: `${pct}%` }} />
      </div>
    </div>
  )
}

function FunnelViz({ stages }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {stages.map((s, i) => {
        const w = 100 - i * (60 / stages.length)
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ background: i === 0 ? '#34cc32' : `rgba(52,204,50,${0.75 - i * 0.15})`, height: 28, width: `${w}%`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, fontSize: 12, color: '#000718', whiteSpace: 'nowrap' }}>{s.l}</p>
              </div>
            </div>
            <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: '#666a74', width: 40, textAlign: 'right', flexShrink: 0 }}>{s.v}</p>
          </div>
        )
      })}
    </div>
  )
}

function PipelineFlow({ stages }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {stages.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <div style={{ flex: 1, background: i === 0 ? '#34cc32' : i % 2 === 0 ? 'rgba(52,204,50,0.4)' : 'rgba(52,204,50,0.2)', border: '1px solid rgba(52,204,50,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px 4px', gap: 4 }}>
            <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, fontSize: 13, color: '#000718', textAlign: 'center', lineHeight: '14px' }}>{s.l}</p>
            <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 11, color: '#666a74' }}>{s.v}</p>
          </div>
          {i < stages.length - 1 && (
            <div style={{ width: 16, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 0, height: 0, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '8px solid rgba(52,204,50,0.6)' }} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function ChartCard({ title, children, controls, custom, w = 353, h = 296 }) {
  return (
    <motion.div custom={custom} variants={{ hidden: { opacity: 0, y: 16 }, visible: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.4 + i * 0.12, duration: 0.45, ease: 'easeOut' } }) }}
      initial="hidden" animate={controls}
      style={{ background: '#fff', border: '1px solid #dee0e7', display: 'flex', flexDirection: 'column', gap: 18, height: h, alignItems: 'flex-start', padding: 18, flexShrink: 0, width: w }}>
      <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, lineHeight: '18px', color: '#000718', fontSize: 18, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{title}</p>
      <div style={{ width: '100%', flex: 1 }}>{children}</div>
    </motion.div>
  )
}

function CTACard({ headline, sub, cta, controls, custom }) {
  return (
    <motion.div custom={custom} variants={{ hidden: { opacity: 0, y: 16 }, visible: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.4 + i * 0.12, duration: 0.45, ease: 'easeOut' } }) }}
      initial="hidden" animate={controls}
      style={{ background: '#34cc32', display: 'flex', flexDirection: 'column', height: 296, alignItems: 'flex-start', justifyContent: 'space-between', padding: 18, flexShrink: 0, width: 353 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, lineHeight: '32px', color: '#000718', fontSize: 24, textTransform: 'uppercase' }}>{headline}</p>
        <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 500, lineHeight: '16px', fontSize: 12, color: 'rgba(0,7,24,0.6)' }}>{sub}</p>
      </div>
      <div style={{ background: '#fff', border: '1px solid #dee0e7', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 15px' }}>
        <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, lineHeight: '24px', color: '#000718', fontSize: 14, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{cta}</p>
      </div>
    </motion.div>
  )
}

// ─── Shared sub-views ─────────────────────────────────────────────────────────
function SeeAllChevron() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, lineHeight: '18px', color: '#666a74', fontSize: 14, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>See All</p>
      <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
        <div style={{ position: 'absolute', bottom: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', left: '37.5%', right: '37.5%', top: '25%' }}>
          <img loading="lazy" alt="" style={{ width: 5, height: 10, display: 'block' }} src={imgVector10} />
        </div>
      </div>
    </div>
  )
}

function ListCard({ title, rows }) {
  return (
    <div style={{ height: 382, overflow: 'hidden', flexShrink: 0, width: 545, position: 'relative' }}>
      <div style={{ background: '#fff', border: '1px solid #dee0e7', display: 'flex', flexDirection: 'column', gap: 15, alignItems: 'flex-start', padding: 18, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', width: '100%' }}>
          <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, height: 20, lineHeight: '18px', color: '#101010', fontSize: 18, textTransform: 'uppercase', width: 200 }}>{title}</p>
          <SeeAllChevron />
        </div>
        <div style={{ width: '100%' }}>
          {rows.map((row, i) => <ListItemRow key={i} isPen={row.isPen} label={row.label} sub={row.sub} />)}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)', backdropFilter: 'blur(5px)', background: '#fff', height: 116, opacity: 0.7, width: 531 }} />
    </div>
  )
}

// ─── InsightIT content ────────────────────────────────────────────────────────
function InsightContent({ controls, tileVariants }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'flex-start', width: 1119 }}>
      <StatTiles tiles={MODULES.InsightIT.tiles} controls={controls} tileVariants={tileVariants} />
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <CTACard headline="Let's create campaign for your amazing brand!" sub="Track reviews, sentiment & ratings across all locations." cta="Go for it" controls={controls} custom={0} />
        <CampaignCard controls={controls} custom={1} />
        <LocationCard controls={controls} custom={2} />
      </div>
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <ListCard title="Recent Campaign" rows={[0,1,2,3,4,5,6].map(() => ({ isPen: true, label: 'Mahindra XUV700 Awareness', sub: 'Created 30/07/2024' }))} />
        <ListCard title="Recent Locations" rows={[0,1,2,3,4,5,6].map(() => ({ isPen: false, label: 'Powai Hiranandani', sub: 'Created 30/07/2024' }))} />
      </div>
    </div>
  )
}
// ─── InsightIT feature shot (saved, unused: render with bare) ─────────────────
// A static FEATURE shot framed by the real CHNC chrome: the product Sidebar and
// Header render around it (see the `bare` branch), and inside the content area
// sits one big legible InsightIT analytics card plus floating satellite cards
// (visibility KPI, review, brand health, report toast) and a fixed AI cursor +
// chip — a SaaS marketing still, not a video. The only motion is the one-time
// entry draw-in and a barely-there idle float. All data is fictional.
// Laid out for the 1183×860 content area right of the sidebar.
const FEAT_G = '#34cc32'
const FEAT_REACH = [3.9, 4.1, 4.4, 4.3, 4.6, 4.9, 5.1, 5.4, 5.6, 5.9, 6.1, 6.42]
const FEAT_MONTHS = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
const FEAT_VARIANTS = {
  hidden: { opacity: 0, y: 18 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.1, duration: 0.5, ease: 'easeOut' } }),
}

function FeatBurst({ size = 19, color = FEAT_G }) {
  const c = size / 2, r = size / 2 - 1
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4
        return <line key={i} x1={c + Math.cos(a) * 3.2} y1={c + Math.sin(a) * 3.2} x2={c + Math.cos(a) * r} y2={c + Math.sin(a) * r} stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      })}
    </svg>
  )
}

// Card shell. Entry is framer-motion (controls); the idle bob runs on an inner
// wrapper so the two transforms never fight.
function FeatCard({ custom, controls, style, pad = 22, float = 0, children }) {
  return (
    <motion.div custom={custom} variants={FEAT_VARIANTS} initial="hidden" animate={controls}
      style={{ position: 'absolute', background: '#fff', border: '1px solid #e3e6ec', borderRadius: 12, boxShadow: '0 18px 50px rgba(0,7,24,0.10)', ...style }}>
      <div style={{ width: '100%', height: '100%', boxSizing: 'border-box', padding: pad, display: 'flex', flexDirection: 'column', animation: float ? `featFloat ${float}s ease-in-out infinite alternate` : 'none' }}>
        {children}
      </div>
    </motion.div>
  )
}

function InsightFeatureContent({ controls }) {
  const [armed, setArmed] = useState(false)
  useEffect(() => {
    const arm = setTimeout(() => setArmed(true), 400)
    return () => clearTimeout(arm)
  }, [])

  // Smooth reach curve, 720×330 viewBox (rendered at 628px wide)
  const pts = FEAT_REACH.map((v, i) => [12 + i * (696 / 11), 278 - ((v - 3.6) / 3.0) * 252])
  let line = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 1; i < pts.length; i++) {
    const mx = ((pts[i - 1][0] + pts[i][0]) / 2).toFixed(1)
    line += ` C ${mx} ${pts[i - 1][1].toFixed(1)}, ${mx} ${pts[i][1].toFixed(1)}, ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}`
  }
  const area = `${line} L ${pts[11][0].toFixed(1)} 292 L ${pts[0][0].toFixed(1)} 292 Z`

  const eyebrow = { margin: 0, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: 2, textTransform: 'uppercase', color: FEAT_G }
  const kicker = { margin: 0, fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 0.6, textTransform: 'uppercase', color: '#9fa3ac' }

  return (
    <div style={{ position: 'relative', width: 1183, height: 860, fontFamily: "'Archivo', sans-serif" }}>
      <style>{`
        @keyframes featFloat { from { transform: translateY(0); } to { transform: translateY(-8px); } }
        @keyframes featPulse { 0% { box-shadow: 0 0 0 0 rgba(52,204,50,0.5); } 100% { box-shadow: 0 0 0 12px rgba(52,204,50,0); } }
        @keyframes featDot { 0% { transform: scale(0); } 70% { transform: scale(1.3); } 100% { transform: scale(1); } }
      `}</style>

      {/* Soft brand glow behind the composition */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 40% 45%, rgba(52,204,50,0.07) 0%, transparent 70%)' }} />

      {/* Main feature card — the reach chart */}
      <FeatCard custom={0} controls={controls} style={{ left: 36, top: 48, width: 700, height: 590 }} pad={34}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <p style={eyebrow}>Global InsightIT</p>
            <p style={{ margin: '6px 0 0', fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, fontSize: 32, color: '#000718', lineHeight: 1.1 }}>Total Reach - All Locations</p>
          </div>
          {/* Kept clear of the Visibility satellite overlapping this corner */}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 800, color: '#1b5e20', paddingTop: 8, marginRight: 80 }}>
            <span style={{ width: 8, height: 8, borderRadius: 4, background: FEAT_G, animation: 'featPulse 1.6s ease-out infinite' }} />LIVE
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, margin: '16px 0 8px' }}>
          <p style={{ margin: 0, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 60, color: '#000718', lineHeight: 1 }}>6.42 Cr</p>
          <span style={{ fontSize: 14, fontWeight: 800, background: '#e8fde8', color: '#1b5e20', padding: '5px 12px', borderRadius: 999 }}>↑ 12.8% vs July</span>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
          <svg width="628" height="288" viewBox="0 0 720 330" style={{ display: 'block' }}>
            <defs>
              <linearGradient id="featFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={FEAT_G} stopOpacity="0.22" />
                <stop offset="100%" stopColor={FEAT_G} stopOpacity="0" />
              </linearGradient>
            </defs>
            {[60, 130, 200, 270].map((y) => <line key={y} x1="12" y1={y} x2="708" y2={y} stroke="#eef0f4" strokeWidth="1" />)}
            <path d={area} fill="url(#featFill)" style={{ opacity: armed ? 1 : 0, transition: 'opacity 0.8s ease 0.9s' }} />
            <path d={line} fill="none" stroke={FEAT_G} strokeWidth="3.5" strokeLinecap="round" pathLength="1"
              style={{ strokeDasharray: 1, strokeDashoffset: armed ? 0 : 1, transition: 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1) 0.3s' }} />
            {pts.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i === 11 ? 6 : 3.5} fill={i === 11 ? FEAT_G : '#fff'} stroke={FEAT_G} strokeWidth="2"
                style={{ opacity: armed ? 1 : 0, transition: `opacity 0.3s ease ${400 + i * 130}ms`, transformOrigin: `${x}px ${y}px`, animation: armed && i === 11 ? 'featDot 0.5s ease 2s both' : 'none' }} />
            ))}
            {FEAT_MONTHS.map((m, i) => (i % 2 === 0 || i === 11) && (
              <text key={m} x={pts[i][0]} y={318} textAnchor="middle" fontSize="14" fontFamily="'Archivo', sans-serif" fontWeight="600" fill={i === 11 ? '#000718' : '#9fa3ac'}>{m}</text>
            ))}
          </svg>
        </div>
      </FeatCard>

      {/* Collaborator bubble on the main card's corner */}
      <motion.div custom={4} variants={FEAT_VARIANTS} initial="hidden" animate={controls}
        style={{ position: 'absolute', left: 6, top: 18, width: 62, height: 62, borderRadius: 31, background: FEAT_G, border: '4px solid #fff', boxShadow: '0 10px 30px rgba(0,7,24,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, fontSize: 24, color: '#000718', zIndex: 4 }}>AS</motion.div>

      {/* Satellite — visibility KPI */}
      <FeatCard custom={1} controls={controls} style={{ left: 692, top: 80, width: 320, height: 112, zIndex: 3 }} float={3.4}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          <div>
            <p style={kicker}>Visibility</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
              <p style={{ margin: '4px 0 0', fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 38, color: '#000718', lineHeight: 1 }}>84.1%</p>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#1b5e20' }}>+4.2% ↑</span>
            </div>
          </div>
          <svg width="84" height="36" viewBox="0 0 84 36" style={{ flexShrink: 0 }}>
            <polyline points="2,28 15,21 28,24 41,14 54,18 67,9 82,13" fill="none" stroke={FEAT_G} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength="1"
              style={{ strokeDasharray: 1, strokeDashoffset: armed ? 0 : 1, transition: 'stroke-dashoffset 1.2s ease-out 0.8s' }} />
          </svg>
        </div>
      </FeatCard>

      {/* Satellite — live review sentiment */}
      <FeatCard custom={2} controls={controls} style={{ left: 714, top: 234, width: 388, height: 192, zIndex: 3 }} float={4.2}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} style={{ fontSize: 20, lineHeight: 1, color: FEAT_G }}>★</span>
              ))}
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#9fa3ac', background: '#f2f3f7', padding: '4px 10px', borderRadius: 999 }}>via Google</span>
          </div>
          <p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#000718', lineHeight: 1.45 }}>“Quick service and a spotless showroom experience.”</p>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#9fa3ac' }}>Powai, Mumbai · just now</p>
        </div>
      </FeatCard>

      {/* Satellite — brand health */}
      <FeatCard custom={3} controls={controls} style={{ left: 692, top: 468, width: 330, height: 152, zIndex: 3 }} float={3.8}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, height: '100%' }}>
          <InsRing on={armed} value={78} size={92} />
          <div>
            <p style={kicker}>Brand Health</p>
            <p style={{ margin: '5px 0 7px', fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 26, color: '#000718', lineHeight: 1 }}>+42 NPS</p>
            <span style={{ fontSize: 11, fontWeight: 800, background: '#e8fde8', color: '#1b5e20', padding: '3px 10px', borderRadius: 999 }}>POSITIVE</span>
          </div>
        </div>
      </FeatCard>

      {/* Report toast — static part of the composition */}
      <motion.div custom={5} variants={FEAT_VARIANTS} initial="hidden" animate={controls}
        style={{ position: 'absolute', left: 724, top: 660, width: 372, background: '#fff', border: '1px solid #e3e6ec', borderRadius: 12, boxShadow: '0 18px 50px rgba(0,7,24,0.14)', padding: 18, display: 'flex', alignItems: 'center', gap: 14, zIndex: 3 }}>
        <div style={{ width: 40, height: 40, borderRadius: 9, background: '#e8fde8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#1b5e20', flexShrink: 0 }}>✓</div>
        <div style={{ minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#000718', whiteSpace: 'nowrap' }}>Global Insights - Aug 2026</p>
          <p style={{ margin: '2px 0 0', fontSize: 12.5, fontWeight: 600, color: '#9fa3ac', whiteSpace: 'nowrap' }}>PDF · exported to your inbox</p>
        </div>
      </motion.div>

      {/* Fixed AI cursor + chip, baked into the still like the reference */}
      <motion.div custom={6} variants={FEAT_VARIANTS} initial="hidden" animate={controls}
        style={{ position: 'absolute', left: 700, top: 652, zIndex: 5, pointerEvents: 'none' }}>
        <svg width="27" height="27" viewBox="0 0 24 24" style={{ display: 'block', filter: 'drop-shadow(0 2px 4px rgba(0,7,24,0.3))' }}>
          <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.85a.5.5 0 0 0-.85.36Z" fill="#111318" stroke="#fff" strokeWidth="1.3" />
        </svg>
        <div style={{ position: 'absolute', right: 6, top: 30, display: 'flex', alignItems: 'center', gap: 9, background: '#fff', borderRadius: 999, padding: '10px 19px 10px 14px', boxShadow: '0 10px 34px rgba(0,7,24,0.2)', whiteSpace: 'nowrap' }}>
          <FeatBurst />
          <span style={{ fontWeight: 700, fontSize: 15.5, color: '#000718' }}>Compiling your August report</span>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Global InsightIT reel helpers ────────────────────────────────────────────
function InsSpark({ on, color }) {
  return (
    <svg width="58" height="24" viewBox="0 0 58 24" style={{ flexShrink: 0 }}>
      <polyline points="1,19 10,14 19,16 28,9 37,12 46,6 57,9" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength="1"
        style={{ strokeDasharray: 1, strokeDashoffset: on ? 0 : 1, transition: 'stroke-dashoffset 0.9s ease-out 0.15s' }} />
    </svg>
  )
}

function InsKpi({ label, value, chip, color, on }) {
  return (
    <div style={{ flex: 1, background: '#fff', border: '1px solid #dee0e7', borderTop: `3px solid ${color}`, borderRadius: 6, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, opacity: on ? 1 : 0, transform: on ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.45s ease' }}>
      <div style={{ minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 8.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase', letterSpacing: 0.5, whiteSpace: 'nowrap' }}>{label}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <p style={{ margin: 0, fontSize: 21, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', whiteSpace: 'nowrap' }}>{value}</p>
          <span style={{ fontSize: 8.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: chip.startsWith('-') ? '#cc3232' : '#1b5e20', whiteSpace: 'nowrap' }}>{chip.startsWith('-') ? chip : `${chip} ↑`}</span>
        </div>
      </div>
      <InsSpark on={on} color={color} />
    </div>
  )
}

function InsVerdict({ region, verdict, metric, tone, on }) {
  const tones = {
    good: ['#e8fde8', '#1b5e20', '#34cc32'],
    bad: ['#fdecec', '#b71c1c', '#cc3232'],
    info: ['#e8f1fd', '#1450a3', '#3b82f6'],
    warn: ['#fff3e0', '#e65100', '#f59e0b'],
  }
  const [bg, fg, bd] = tones[tone] || tones.good
  return (
    <div style={{ flex: 1, background: '#fff', border: '1px solid #dee0e7', borderLeft: `4px solid ${bd}`, borderRadius: 6, padding: '7px 12px', minWidth: 0, opacity: on ? 1 : 0, transform: on ? 'scale(1)' : 'scale(0.9)', transition: 'all 0.4s cubic-bezier(0.34,1.4,0.64,1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
        <p style={{ margin: 0, fontSize: 14, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', whiteSpace: 'nowrap' }}>{region}</p>
        <span style={{ fontSize: 7.5, fontFamily: "'Archivo', sans-serif", fontWeight: 800, background: bg, color: fg, padding: '2px 7px', borderRadius: 9, whiteSpace: 'nowrap', letterSpacing: 0.3 }}>{verdict}</span>
      </div>
      {metric && <p style={{ margin: '2px 0 0', fontSize: 9.5, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#666a74', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{metric}</p>}
    </div>
  )
}

function InsRing({ on, value = 78, size = 88 }) {
  const r = size / 2 - 7, c = 2 * Math.PI * r, ctr = size / 2
  return (
    <svg width={size} height={size}>
      <circle cx={ctr} cy={ctr} r={r} stroke="#e6e8ee" strokeWidth={size >= 80 ? 8 : 6} fill="none" />
      <circle cx={ctr} cy={ctr} r={r} stroke="#34cc32" strokeWidth={size >= 80 ? 8 : 6} fill="none" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={on ? c * (1 - value / 100) : c}
        transform={`rotate(-90 ${ctr} ${ctr})`} style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.25,0.1,0.25,1)' }} />
      <text x={ctr} y={ctr + (size >= 80 ? 1 : 4)} textAnchor="middle" fontSize={size >= 80 ? 18 : 13} fontWeight="800" fontFamily="'Saira Condensed', sans-serif" fill="#000718">{value}</text>
      {size >= 80 && <text x={ctr} y={ctr + 13} textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="Archivo" fill="#9fa3ac">/ 100</text>}
    </svg>
  )
}

function InsGauge({ on, value = 42 }) {
  const deg = -90 + ((value + 100) / 200) * 180
  const frac = (value + 100) / 200
  return (
    <svg width="150" height="93" viewBox="0 0 150 93">
      <path d="M 15 80 A 60 60 0 0 1 135 80" fill="none" stroke="#e6e8ee" strokeWidth="11" strokeLinecap="round" />
      <path d="M 15 80 A 60 60 0 0 1 135 80" fill="none" stroke="#34cc32" strokeWidth="11" strokeLinecap="round" pathLength="1"
        style={{ strokeDasharray: 1, strokeDashoffset: on ? 1 - frac : 1, transition: 'stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)' }} />
      <g style={{ transform: `rotate(${on ? deg : -90}deg)`, transformOrigin: '75px 80px', transition: 'transform 1s cubic-bezier(0.22,1,0.36,1)' }}>
        <line x1="75" y1="80" x2="75" y2="32" stroke="#000718" strokeWidth="3" strokeLinecap="round" />
      </g>
      <circle cx="75" cy="80" r="5" fill="#000718" />
    </svg>
  )
}

// Rough India silhouette as a twinkle-in dot scatter (x%, y%)
const INS_DOTS = [
  [38, 4], [34, 9], [42, 10], [30, 15], [37, 15], [45, 16], [26, 21], [33, 21], [41, 22], [49, 22],
  [57, 24], [65, 25], [74, 24], [82, 22], [88, 26], [20, 28], [28, 28], [36, 29], [44, 30], [52, 31],
  [62, 31], [71, 32], [15, 36], [24, 36], [33, 37], [42, 38], [51, 39], [60, 40], [20, 44], [30, 45],
  [40, 46], [50, 47], [27, 53], [36, 54], [46, 55], [33, 62], [42, 63], [38, 71], [45, 72], [41, 80], [44, 88],
]
function InsDotMap({ on, h = 140, w = 210 }) {
  return (
    <div style={{ position: 'relative', width: w, height: h, margin: '2px auto 0' }}>
      {on && INS_DOTS.map(([x, y], i) => (
        <span key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: 6, height: 6, borderRadius: 3, background: i % 3 === 0 ? 'rgba(52,204,50,0.4)' : '#34cc32', animation: 'insPop 0.5s ease both', animationDelay: `${i * 30}ms` }} />
      ))}
    </div>
  )
}

function InsBars({ data, on, h = 140, color = '#34cc32', stagger = 60, gap = 8 }) {
  const max = Math.max(...data.map(d => d.v))
  const hasLabels = data.some(d => d.l)
  const hasVals = data.some(d => d.t)
  const barArea = h - (hasLabels ? 13 : 0) - (hasVals ? 13 : 0)
  return (
    <div style={{ display: 'flex', gap, alignItems: 'flex-end', height: h, width: '100%' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, minWidth: 0 }}>
          {hasVals && <p style={{ margin: 0, fontSize: 7.5, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#9fa3ac', whiteSpace: 'nowrap', opacity: on ? 1 : 0, transition: `opacity 0.4s ease ${i * stagger + 350}ms` }}>{d.t}</p>}
          <div style={{ width: '100%', height: barArea, display: 'flex', alignItems: 'flex-end' }}>
            <div style={{ width: '100%', height: Math.max(3, Math.round((d.v / max) * barArea)), background: d.c || color, borderRadius: '2px 2px 0 0', transform: on ? 'scaleY(1)' : 'scaleY(0)', transformOrigin: 'bottom', transition: `transform 0.6s cubic-bezier(0.25,0.1,0.25,1) ${i * stagger}ms` }} />
          </div>
          {hasLabels && <p style={{ margin: 0, fontSize: 7.5, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#9fa3ac', whiteSpace: 'nowrap' }}>{d.l}</p>}
        </div>
      ))}
    </div>
  )
}

function InsLine({ on, h = 96 }) {
  return (
    <svg width="100%" height={h} viewBox="0 0 300 96" preserveAspectRatio="none">
      <polyline points="2,78 30,66 60,72 90,52 120,58 150,40 180,46 210,30 240,36 270,20 298,26" fill="none" stroke="#34cc32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1"
        style={{ strokeDasharray: 1, strokeDashoffset: on ? 0 : 1, transition: 'stroke-dashoffset 1.1s ease-out' }} />
    </svg>
  )
}

function InsArea({ on, h = 90 }) {
  return (
    <svg width="100%" height={h} viewBox="0 0 300 90" preserveAspectRatio="none"
      style={{ clipPath: on ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)', transition: 'clip-path 1s ease-out' }}>
      <path d="M0,80 C30,74 45,70 70,64 C95,58 110,60 130,50 C150,40 165,26 190,20 C215,14 230,24 250,34 C270,44 285,60 300,66 L300,90 L0,90 Z" fill="rgba(52,204,50,0.25)" stroke="#34cc32" strokeWidth="2" />
    </svg>
  )
}

// ─── Global InsightIT animated walkthrough (analytics reel) ───────────────────
// 7-frame product reel: OVERVIEW → LPM → SOCIAL → PERFORMANCE → LPG → EXPORT → CLOSE.
// Fictionalized per the reel rules: Horizon Motors / A. Sharma / swapped figures only.
function InsightWorkflowContent({ controls, tileVariants, stepCount = 0, onFrame, onCursor }) {
  const G = '#34cc32'
  const SA = "'Saira Condensed', sans-serif", AR = "'Archivo', sans-serif"

  // SPEED < 1 slows the whole reel uniformly (frame durations, reveals, cursor).
  const SPEED = 0.7
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setElapsed(e => e + 60 * SPEED), 60)
    return () => clearInterval(id)
  }, [])

  // Frame (virtual ms — real time = ÷ SPEED): 0 Overview(6.5s) 1 LPM(6s) 2 Social(6s) 3 Performance(6s) 4 LPG(6s) 5 Export(4.5s) 6 Close(3s)
  const timeline = [0, 6500, 12500, 18500, 24500, 30500, 35000]
  const totalDuration = 38000
  const looped = elapsed % totalDuration

  let frame = 0, t = 0
  for (let i = timeline.length - 1; i >= 0; i--) {
    if (looped >= timeline[i]) { frame = i; t = looped - timeline[i]; break }
  }

  useEffect(() => { if (onFrame) onFrame(frame) }, [frame, onFrame])

  const ease = x => 1 - Math.pow(1 - x, 3)
  const cnt = (tt, at, dur, target) => tt <= at ? 0 : tt >= at + dur ? target : target * ease((tt - at) / dur)
  const inr = n => {
    n = Math.max(0, Math.round(n))
    const s = String(n)
    if (s.length <= 3) return s
    const l3 = s.slice(-3)
    let r = s.slice(0, -3)
    const p = []
    while (r.length > 2) { p.unshift(r.slice(-2)); r = r.slice(0, -2) }
    if (r) p.unshift(r)
    return p.join(',') + ',' + l3
  }

  // Tab strip — the sliding underline is the transition device between frames.
  // Visual language mirrors the real InsightIT dashboard (chnc-final): dark underline, uppercase tabs.
  const TABS = [['OVERVIEW', 54], ['LPM', 30], ['SOCIAL MEDIA', 74], ['PERFORMANCE MARKETING', 120], ['LPG', 30]]
  const TAB_GAP = 26
  const activeTab = [0, 1, 2, 3, 4, 0, 0][frame]
  const tabOffsets = []
  let tacc = 0
  for (const [, w] of TABS) { tabOffsets.push(tacc); tacc += w + TAB_GAP }

  // Cursor rides the data as it reveals, then glides to the next tab and clicks
  // as the underline slides. Sub-tab cuts (Instagram / Meta) get their own clicks.
  const cursorScript = {
    0: { path: [[0, 250, 135], [1000, 620, 135], [2100, 400, 250], [3400, 260, 350], [4300, 720, 390], [5400, 99, 62]], clicks: [4700, 5950] },
    1: { path: [[0, 140, 130], [1000, 430, 130], [2000, 720, 210], [2900, 160, 330], [3800, 430, 380], [4700, 177, 62]], clicks: [5400] },
    2: { path: [[0, 300, 170], [1000, 700, 170], [1900, 500, 330], [2350, 220, 96], [3400, 260, 210], [4200, 550, 340], [5100, 300, 62]], clicks: [3000, 5750] },
    3: { path: [[0, 150, 165], [900, 480, 185], [1900, 260, 340], [2750, 135, 96], [3700, 950, 420], [5100, 401, 62]], clicks: [3400, 5750] },
    4: { path: [[0, 200, 140], [1000, 650, 140], [1900, 400, 215], [2800, 200, 350], [3800, 620, 350], [4700, 31, 62]], clicks: [5400] },
    5: { path: [[0, 31, 62], [300, 1075, 18]], clicks: [900] },
  }
  const seg = cursorScript[frame]
  let cx = 430, cy = 200
  if (seg) for (const [ts, x, y] of seg.path) { if (t >= ts) { cx = x; cy = y } }
  const cursorClick = seg ? seg.clicks.find(c => t >= c && t < c + 500) : undefined

  // Camera-follow (same rig as CreateIT): zoom in while the data reveals, pull back
  // outside these windows so tab transitions and the export beat read full-frame.
  // Overview is a full-frame hero beat (greeting + control strip must stay visible — no zoom).
  // Social/Paid zoom around their sub-tab cut.
  const ZOOM = { 1: [[300, 4300]], 2: [[300, 2600], [3300, 4700]], 3: [[300, 3100], [3700, 4900]], 4: [[300, 4300]] }
  const camOn = !!(ZOOM[frame] && ZOOM[frame].some(([a, b]) => t >= a && t < b))
  useEffect(() => {
    if (!onCursor) return
    onCursor(camOn ? { x: cx, y: cy } : null)
    return () => onCursor(null)
  }, [camOn, cx, cy, onCursor])

  const overlays = [
    { main: 'Every module reports here.', sub: 'Budget, spend, regions - one global view.' },
    { main: 'Local presence, at a glance.', sub: 'Visibility. Accuracy. Reviews. Region by region.' },
    { main: 'Every page, every platform.', sub: 'Facebook + Instagram - measured together.' },
    { main: 'Every rupee of paid media.', sub: 'Meta and Google - CPL and leads by region.' },
    { main: 'And what happens on your pages.', sub: 'Sessions, conversions, peak hours - by region.' },
    { main: 'One filter. One export. Everything.', sub: 'All locations, any period - one click.' },
    { main: 'Every module. Every metric. One InsightIT.', sub: 'The observability layer of CHNC.' },
  ]
  const overlay = overlays[frame]

  const exportPress = frame === 5 && t > 900 && t < 1260

  const cardS = { background: '#fff', border: '1px solid #dee0e7', borderRadius: 6 }
  const cardT = { margin: 0, fontSize: 10, fontFamily: SA, fontWeight: 700, color: '#000718', textTransform: 'uppercase', letterSpacing: 0.5 }
  const tiny = { margin: 0, fontSize: 8.5, fontFamily: AR, color: '#9fa3ac', fontWeight: 600 }
  const thS = { margin: 0, fontSize: 8.5, fontFamily: AR, fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase', letterSpacing: 0.4, padding: '5px 14px' }
  const pillBase = { fontSize: 8.5, fontFamily: AR, fontWeight: 800, padding: '3px 8px', borderRadius: 10, whiteSpace: 'nowrap' }
  const btnG = { background: G, color: '#000718', fontSize: 10, fontFamily: SA, fontWeight: 700, textTransform: 'uppercase', padding: '6px 14px', borderRadius: 0, letterSpacing: 0.5, whiteSpace: 'nowrap' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 1119, position: 'relative' }}>
      <style>{`
        @keyframes insFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes insPop { 0% { transform: scale(0.6); opacity: 0; } 60% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes insToast { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes insBandUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes insClick { 0% { transform: scale(0.25); opacity: 0.9; } 100% { transform: scale(1.3); opacity: 0; } }
        @keyframes insPulse { 0% { box-shadow: 0 0 0 0 rgba(52,204,50,0.55); } 100% { box-shadow: 0 0 0 14px rgba(52,204,50,0); } }
        @keyframes insTile { from { opacity: 0; transform: scale(1.16); } to { opacity: 1; transform: scale(1); } }
        @keyframes insPull { from { opacity: 0.3; transform: scale(1.1); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      {/* Persistent header — greeting + control strip (the visual constant) */}
      {frame <= 5 && (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '2px 4px 0' }}>
          <div>
            <p style={{ margin: '0 0 1px', fontSize: 8.5, fontFamily: AR, fontWeight: 300, color: '#666a74' }}>Home › Analytics</p>
            <p style={{ margin: 0, fontSize: 17, fontFamily: SA, fontWeight: 700, color: '#000718', letterSpacing: 0.3 }}>HELLO, A. SHARMA</p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {['All business assets ▾', 'All ad accounts ▾'].map(f => (
              <span key={f} style={{ fontSize: 9, fontFamily: AR, fontWeight: 600, color: '#666a74', border: '1px solid #dee0e7', padding: '5px 9px', background: '#fff', whiteSpace: 'nowrap' }}>{f}</span>
            ))}
            {['All Locations', 'Lifetime'].map(c => (
              <span key={c} style={{ fontSize: 10, fontFamily: SA, fontWeight: 700, color: '#000718', border: '1px solid #dee0e7', padding: '5px 10px', background: '#fff', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: 0.5 }}>{c}</span>
            ))}
            <div style={{ ...btnG, transform: exportPress ? 'scale(0.9)' : 'scale(1)', transition: 'transform 0.18s ease', animation: frame === 5 && t > 900 && t < 1700 ? 'insPulse 0.7s ease-out' : 'none' }}>+ EXPORT ALL</div>
          </div>
        </div>
      )}

      {/* Report chip (Frame 5) */}
      {frame === 5 && t > 1400 && (
        <div style={{ position: 'absolute', right: 4, top: 40, zIndex: 150, background: '#fff', border: `1px solid ${G}`, borderLeft: `4px solid ${G}`, boxShadow: '0 8px 24px rgba(0,0,0,0.16)', padding: '7px 12px', borderRadius: 4, animation: 'insToast 0.45s cubic-bezier(0.25,0.1,0.25,1)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13 }}>📄</span>
          <div>
            <p style={{ margin: 0, fontSize: 10, fontFamily: AR, fontWeight: 700, color: '#000718' }}>ConvergenSEE - Global Insights</p>
            <p style={{ margin: '1px 0 0', fontSize: 8.5, fontFamily: AR, color: '#1b5e20' }}>Aug 2026 · PDF ✓</p>
          </div>
        </div>
      )}

      {/* Tab strip with sliding underline */}
      {frame <= 5 && (
        <div style={{ position: 'relative', display: 'flex', gap: TAB_GAP, padding: '10px 4px 0', borderBottom: '1px solid #e6e8ee', marginTop: 4 }}>
          {TABS.map(([lab, w], i) => (
            <div key={lab} style={{ width: w, display: 'flex', justifyContent: 'center', paddingBottom: 7 }}>
              <p style={{ margin: 0, fontSize: 12.5, fontFamily: SA, fontWeight: 600, textTransform: 'uppercase', whiteSpace: 'nowrap', color: i === activeTab ? '#000718' : '#9fa3ac', transition: 'color 0.35s ease' }}>{lab}</p>
            </div>
          ))}
          <div style={{ position: 'absolute', bottom: -1, height: 2, background: '#000718', left: 4 + tabOffsets[activeTab], width: TABS[activeTab][1], transition: 'left 0.45s cubic-bezier(0.25,0.1,0.25,1), width 0.45s cubic-bezier(0.25,0.1,0.25,1)' }} />
        </div>
      )}

      {/* Cursor — moved via transform (compositor), not left/top (layout) */}
      {frame <= 5 && (
        <div style={{
          position: 'absolute', left: 0, top: 0, transform: `translate(${cx}px, ${cy}px)`, zIndex: 200,
          transition: 'transform 0.65s cubic-bezier(0.25,0.1,0.25,1)', willChange: 'transform',
          pointerEvents: 'none',
        }}>
          {cursorClick !== undefined && (
            <span key={cursorClick} style={{ position: 'absolute', left: -15, top: -15, width: 30, height: 30, borderRadius: '50%', border: `2.5px solid ${G}`, animation: 'insClick 0.5s ease-out forwards' }} />
          )}
          <svg width="16" height="22" viewBox="0 0 14 19" fill="none">
            <path d="M0 0V18L4.5 13.5L8 19L10 18L6.5 12.5H13L0 0Z" fill="#000" stroke="#fff" strokeWidth="1" />
          </svg>
        </div>
      )}

      {/* Content area */}
      <div style={{ height: 470, padding: '10px 4px 0', position: 'relative', overflow: 'hidden' }}>

        {/* FRAME 0 — GLOBAL OVERVIEW: hero money tiles → TOTAL AMOUNT SPENT bars → BEST PERFORMING REGION table */}
        {frame === 0 && (() => {
          // Monthly spend sums to the ₹96.42L "Budget spent" hero tile.
          const months = [['Sep', 5.8], ['Oct', 6.9], ['Nov', 7.4], ['Dec', 8.8], ['Jan', 6.4], ['Feb', 7.1], ['Mar', 8.2], ['Apr', 7.6], ['May', 8.1], ['Jun', 9.0], ['Jul', 9.9], ['Aug', 11.2]]
          const rows = [
            ['Maharashtra', '55,538', '32,180', '19,847', '6,172', '31.1%'],
            ['Gujarat', '24,917', '14,236', '8,914', '2,304', '25.8%'],
            ['Delhi', '19,258', '11,032', '6,741', '1,652', '24.5%'],
            ['Karnataka', '16,842', '9,517', '5,890', '1,342', '22.8%'],
            ['Tamil Nadu', '12,406', '7,148', '4,322', '918', '21.2%'],
          ]
          return (
            <div key="f0" style={{ animation: 'insFadeUp 0.5s ease', display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
              <div style={{ display: 'flex', gap: 10 }}>
                {[['BUDGET ALLOCATED', cnt(t, 300, 1200, 120).toFixed(2), '#1b5e20', '#e8fde8', G, 300], ['BUDGET SPENT', cnt(t, 550, 1200, 96.42).toFixed(2), '#b71c1c', '#fdecec', '#cc3232', 550]].map(([lab, v, col, bg, bd, at]) => (
                  <div key={lab} style={{ flex: 1, background: bg, border: `1px solid ${bd}`, borderRadius: 6, padding: '9px 14px', opacity: t > at ? 1 : 0, transform: t > at ? 'scale(1)' : 'scale(0.94)', transition: 'all 0.45s ease' }}>
                    <p style={{ ...tiny, fontSize: 8, textTransform: 'uppercase', letterSpacing: 0.4 }}>{lab}</p>
                    <p style={{ margin: '1px 0 0', fontSize: 22, fontFamily: SA, fontWeight: 700, color: col, whiteSpace: 'nowrap' }}>₹{v} lacs</p>
                  </div>
                ))}
              </div>
              <div style={{ ...cardS, padding: '10px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <p style={cardT}>TOTAL AMOUNT SPENT</p>
                  <span style={{ ...tiny, fontSize: 8 }}>TOTAL AMOUNT · <span style={{ color: '#000718', fontWeight: 800 }}>MAXIMUM ▾</span></span>
                </div>
                <div style={{ marginTop: 6 }}>
                  <InsBars on={t > 1400} h={128} stagger={90} data={months.map(([l, v]) => ({ l, v, t: '₹' + v.toFixed(1) + 'L' }))} />
                </div>
              </div>
              <div style={{ ...cardS, flex: 1, padding: '8px 0 2px', overflow: 'hidden', minHeight: 0 }}>
                <p style={{ ...cardT, padding: '0 14px 5px' }}>BEST PERFORMING REGION</p>
                <div style={{ display: 'flex', background: '#fafbfc', borderTop: '1px solid #f2f2f2', borderBottom: '1px solid #f2f2f2' }}>
                  {['REGION', 'LEADS', 'CALLS', 'ENQUIRY', 'BOOKING', 'E2B %'].map((hd, i) => (
                    <p key={hd} style={{ ...thS, flex: i === 0 ? 1.6 : 1, textAlign: i === 0 ? 'left' : 'right', padding: '4px 14px' }}>{hd}</p>
                  ))}
                </div>
                {rows.map((r, i) => {
                  const show = t > 3300 + i * 240
                  return (
                    <div key={r[0]} style={{ display: 'flex', alignItems: 'center', padding: '4.5px 0', borderBottom: i < 4 ? '1px solid #f6f6f8' : 'none', opacity: show ? 1 : 0, transform: show ? 'translateX(0)' : 'translateX(-12px)', transition: 'all 0.45s ease' }}>
                      <p style={{ margin: 0, flex: 1.6, padding: '0 14px', fontSize: 9.5, fontFamily: AR, fontWeight: 700, color: '#000718', whiteSpace: 'nowrap' }}>{i + 1}. {r[0]}</p>
                      {[1, 2, 3, 4, 5].map(j => (
                        <p key={j} style={{ margin: 0, flex: 1, padding: '0 14px', fontSize: 9.5, fontFamily: AR, fontWeight: j === 5 ? 800 : 600, color: j === 5 ? '#1b5e20' : '#555', textAlign: 'right', whiteSpace: 'nowrap' }}>{r[j]}</p>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })()}

        {/* FRAME 1 — LOCAL (LPM) */}
        {frame === 1 && (() => {
          const kpis = [
            ['LOCATIONS', inr(cnt(t, 200, 1200, 42318)), '+1.2%', G, 200],
            ['VISIBILITY', cnt(t, 400, 1200, 84.1).toFixed(1) + '%', '+4.2%', '#3b82f6', 400],
            ['ACCURACY', cnt(t, 600, 1200, 92.4).toFixed(1) + '%', '+2.1%', '#8b5cf6', 600],
            ['REVIEWS', cnt(t, 800, 1200, 4.6).toFixed(1) + '★', '+0.2', '#f59e0b', 800],
          ]
          const verdicts = [
            ['Southwest', 'BEST PERFORMING REGION', 'Follower Growth +21.01%', 'good', 1400],
            ['Northeast', 'UNDERPERFORMING', 'Engagement 21.6% ↓', 'bad', 1800],
            ['West', 'FASTEST GROWING', '+9.3% / month', 'info', 2200],
          ]
          return (
            <div key="f1" style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
              <div style={{ display: 'flex', gap: 10 }}>
                {kpis.map(([lab, val, chip, col, at]) => <InsKpi key={lab} label={lab} value={val} chip={chip} color={col} on={t > at} />)}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {verdicts.map(([rg, vd, met, tone, at]) => <InsVerdict key={rg} region={rg} verdict={vd} metric={met} tone={tone} on={t > at} />)}
              </div>
              <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>
                <div style={{ ...cardS, width: 316, padding: '10px 14px', display: 'flex', gap: 14 }}>
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <p style={cardT}>OVERALL HYGIENE</p>
                    <div style={{ marginTop: 6 }}><InsRing on={t > 2600} value={78} /></div>
                    <p style={{ ...tiny, fontSize: 8, marginTop: 2, letterSpacing: 0.5 }}>VAC SCORE · <span style={{ color: '#1b5e20', fontWeight: 800 }}>GOOD</span></p>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8, minWidth: 0 }}>
                    {[['Business name', 98], ['Address', 94], ['Website', 88], ['Phone', 91]].map(([lab, v], i) => (
                      <div key={lab}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                          <span style={{ ...tiny, fontSize: 8.5 }}>{lab}</span>
                          <span style={{ ...tiny, fontSize: 8.5, color: '#1b5e20', fontWeight: 800 }}>{v}%</span>
                        </div>
                        <div style={{ background: '#eceef2', height: 4, borderRadius: 2 }}>
                          <div style={{ background: G, height: '100%', borderRadius: 2, width: `${v}%`, transform: t > 2800 + i * 140 ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.6s ease-out' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ ...cardS, width: 260, padding: '10px 14px', textAlign: 'center' }}>
                  <p style={cardT}>REVIEW NET PROMOTER SCORE</p>
                  <div style={{ marginTop: 8 }}><InsGauge on={t > 3000} value={42} /></div>
                  <p style={{ margin: '2px 0 0', fontSize: 13, fontFamily: SA, fontWeight: 700, color: '#1b5e20' }}>+42 · POSITIVE</p>
                </div>
                <div style={{ ...cardS, flex: 1, padding: '10px 14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <p style={cardT}>REVIEWS BY LOCATION</p>
                    <span style={{ ...tiny, fontSize: 8 }}>Last 30 days</span>
                  </div>
                  <InsDotMap on={t > 3200} h={150} w={220} />
                </div>
              </div>
            </div>
          )
        })()}

        {/* FRAME 2 — SOCIAL (Overview → Instagram cut) */}
        {frame === 2 && (() => {
          const ig = t > 3200
          const tb = t - 3200
          const regions = [
            ['Maharashtra', 'BEST PERFORMING', 'Impressions 5,58,30,392', 'good', 400],
            ['Bihar', 'UNDERPERFORMING', 'Engagement 1.2% ↓', 'bad', 700],
            ['Karnataka', 'MOST ENGAGING', 'CTR 4.8%', 'info', 1000],
            ['Assam', 'LOWEST REACH', 'Impressions 8,12,440', 'warn', 1300],
          ]
          const reach = [['MH', 55.8, '5.58Cr'], ['GJ', 31.4, '3.14Cr'], ['DL', 26.9, '2.69Cr'], ['KA', 24.2, '2.42Cr'], ['TN', 19.8, '1.98Cr'], ['WB', 14.6, '1.46Cr'], ['RJ', 12.1, '1.21Cr'], ['UP', 9.4, '94L']]
          const igStats = [
            ['LIKES', inr(cnt(tb, 150, 900, 48973)), '+8.4%'],
            ['COMMENTS', inr(cnt(tb, 300, 900, 3750)), '+5.1%'],
            ['SHARES', inr(cnt(tb, 450, 900, 1279)), '+12.6%'],
            ['REACH', inr(cnt(tb, 600, 900, 642180)), '+11.4%'],
          ]
          return (
            <div key="f2" style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', borderBottom: '1px solid #eceef2', paddingBottom: 6 }}>
                <span style={{ fontSize: 9.5, fontFamily: AR, fontWeight: 700, color: '#000718' }}>Social media ›</span>
                {['Overview', 'Facebook', 'Instagram'].map(st => {
                  const on = ig ? st === 'Instagram' : st === 'Overview'
                  return <span key={st} style={{ fontSize: 9.5, fontFamily: AR, fontWeight: on ? 700 : 500, color: on ? '#000718' : '#9fa3ac', transition: 'all 0.3s ease' }}>{st}</span>
                })}
              </div>
              {!ig ? (
                <>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {regions.map(([rg, vd, met, tone, at]) => <InsVerdict key={rg} region={rg} verdict={vd} metric={met} tone={tone} on={t > at} />)}
                  </div>
                  <div style={{ ...cardS, flex: 1, padding: '10px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <p style={cardT}>REACH BY REGION</p>
                      <span style={{ ...tiny, fontSize: 8 }}>Impressions by state · <span style={{ color: '#1b5e20', fontWeight: 800 }}>Maharashtra 5,58,30,392</span></span>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <InsBars on={t > 900} h={168} stagger={110} data={reach.map(([l, v, tx]) => ({ l, v, t: tx }))} />
                    </div>
                  </div>
                </>
              ) : (
                <div key="ig" style={{ animation: 'insFadeUp 0.4s ease', display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minHeight: 0 }}>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {igStats.map(([lab, val, chip]) => (
                      <div key={lab} style={{ flex: 1, ...cardS, padding: '9px 12px' }}>
                        <p style={{ ...tiny, textTransform: 'uppercase', letterSpacing: 0.5 }}>{lab}</p>
                        <p style={{ margin: '1px 0 2px', fontSize: 20, fontFamily: SA, fontWeight: 700, color: '#000718' }}>{val}</p>
                        <span style={{ fontSize: 8.5, fontFamily: AR, fontWeight: 700, color: '#1b5e20' }}>{chip} ↑</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ ...cardS, flex: 1, padding: '10px 14px', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <p style={cardT}>ENGAGEMENT OVERTIME</p>
                      <span style={{ ...tiny, fontSize: 8 }}>Likes + comments + shares · <span style={{ color: '#1b5e20', fontWeight: 800 }}>Last 12 weeks</span></span>
                    </div>
                    <div style={{ flex: 1, minHeight: 0, marginTop: 8 }}><InsLine on={tb > 700} h="100%" /></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                      {['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'].map(w => <span key={w} style={{ ...tiny, fontSize: 7 }}>{w}</span>)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })()}

        {/* FRAME 3 — PAID (Performance Marketing) */}
        {frame === 3 && (() => {
          const meta = t > 3600
          const cpl = [['DEL', 612], ['MUM', 548], ['BLR', 495], ['PUN', 448], ['AMD', 396], ['JPR', 342], ['IND', 298]]
          const leads = [['Maharashtra', 55538, 1800], ['Gujarat', 24917, 2050], ['Delhi', 19258, 2300], ['Karnataka', 16842, 2550], ['Tamil Nadu', 12406, 2800]]
          return (
            <div key="f3" style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%', position: 'relative' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', borderBottom: '1px solid #eceef2', paddingBottom: 6 }}>
                <span style={{ fontSize: 9.5, fontFamily: AR, fontWeight: 700, color: '#000718' }}>Performance marketing ›</span>
                {['Overview', 'Meta', 'Google'].map(st => {
                  const on = meta ? st === 'Meta' : st === 'Overview'
                  return <span key={st} style={{ fontSize: 9.5, fontFamily: AR, fontWeight: on ? 700 : 500, color: on ? '#000718' : '#9fa3ac', transition: 'all 0.3s ease' }}>{st}</span>
                })}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {[['BUDGET ALLOCATED', '₹120.00 lacs', '#1b5e20', '#e8fde8', G, 250], ['BUDGET SPENT', '₹96.42 lacs', '#b71c1c', '#fdecec', '#cc3232', 500]].map(([lab, v, col, bg, bd, at]) => (
                  <div key={lab} style={{ width: 190, background: bg, border: `1px solid ${bd}`, borderRadius: 6, padding: '8px 12px', opacity: t > at ? 1 : 0, transform: t > at ? 'scale(1)' : 'scale(0.92)', transition: 'all 0.4s ease' }}>
                    <p style={{ ...tiny, fontSize: 8, textTransform: 'uppercase', letterSpacing: 0.4 }}>{lab}</p>
                    <p style={{ margin: '1px 0 0', fontSize: 17, fontFamily: SA, fontWeight: 700, color: col }}>{v}</p>
                  </div>
                ))}
                <div style={{ ...cardS, flex: 1, padding: '6px 0 2px' }}>
                  <p style={{ ...cardT, padding: '0 12px 3px' }}>BEST PERFORMING REGION</p>
                  {[['Maharashtra', '55,538 leads', 'CPL ₹389'], ['Gujarat', '24,917 leads', 'CPL ₹412'], ['Delhi', '19,258 leads', 'CPL ₹451']].map(([rg, ld, cp], i) => {
                    const show = t > 800 + i * 250
                    return (
                      <div key={rg} style={{ display: 'flex', justifyContent: 'space-between', padding: '2.5px 12px', opacity: show ? 1 : 0, transform: show ? 'translateX(0)' : 'translateX(-10px)', transition: 'all 0.4s ease' }}>
                        <p style={{ margin: 0, fontSize: 10, fontFamily: AR, fontWeight: 700, color: '#000718', width: 120 }}>{i + 1}. {rg}</p>
                        <p style={{ margin: 0, fontSize: 10, fontFamily: AR, fontWeight: 600, color: '#555' }}>{ld}</p>
                        <p style={{ margin: 0, fontSize: 10, fontFamily: AR, fontWeight: 700, color: '#7c3aed' }}>{cp}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>
                <div style={{ ...cardS, flex: 1.15, padding: '10px 14px' }}>
                  <p style={cardT}>CPL BY REGION <span style={{ fontSize: 8, color: '#9fa3ac', fontFamily: AR, fontWeight: 600, textTransform: 'none' }}>(highest → lowest)</span></p>
                  <div style={{ marginTop: 6 }}>
                    <InsBars on={t > 1300} h={190} color="#8b5cf6" data={cpl.map(([l, v]) => ({ l, v, t: '₹' + v }))} />
                  </div>
                </div>
                <div style={{ ...cardS, flex: 1, padding: '8px 0' }}>
                  <p style={{ ...cardT, padding: '0 14px 4px' }}>TOP REGION BY LEADS</p>
                  {leads.map(([rg, v, at], i) => {
                    const show = t > at
                    return (
                      <div key={rg} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 14px', opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.4s ease' }}>
                        <span style={{ width: 16, height: 16, borderRadius: 8, background: i === 0 ? G : '#eceef2', color: i === 0 ? '#fff' : '#666', fontSize: 8, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: AR, flexShrink: 0 }}>{i + 1}</span>
                        <p style={{ margin: 0, flex: 1, fontSize: 10.5, fontFamily: AR, fontWeight: 700, color: '#000718', whiteSpace: 'nowrap' }}>{rg}</p>
                        <div style={{ width: 130, background: '#eceef2', height: 5, borderRadius: 3 }}>
                          <div style={{ height: '100%', borderRadius: 3, background: G, width: `${Math.round((v / 55538) * 100)}%`, transform: show ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.6s ease-out' }} />
                        </div>
                        <p style={{ margin: 0, width: 52, textAlign: 'right', fontSize: 10.5, fontFamily: AR, fontWeight: 700, color: '#1b5e20' }}>{inr(v)}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              {meta && (
                <div style={{ position: 'absolute', right: 0, bottom: 0, width: 300, background: '#fff', border: `1px solid ${G}`, borderRadius: 6, boxShadow: '0 12px 30px rgba(0,0,0,0.18)', padding: '10px 14px', animation: 'insToast 0.4s ease', zIndex: 60 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={cardT}>META - SNAPSHOT</p>
                    <span style={{ ...pillBase, background: '#e8fde8', color: '#1b5e20' }}>LIVE</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    {[['IMPRESSIONS', '1,86,42,310'], ['LEADS', '4,312'], ['CPL', '₹432']].map(([lab, v]) => (
                      <div key={lab} style={{ flex: 1 }}>
                        <p style={{ ...tiny, fontSize: 7 }}>{lab}</p>
                        <p style={{ margin: 0, fontSize: 12, fontFamily: SA, fontWeight: 700, color: '#000718', whiteSpace: 'nowrap' }}>{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })()}

        {/* FRAME 4 — WEB (LPG) */}
        {frame === 4 && (() => {
          const kpis = [
            ['USERS', cnt(t, 200, 1200, 1.54).toFixed(2) + 'M', '+21.01%', G, 200],
            ['SESSIONS', cnt(t, 400, 1200, 2.1).toFixed(1) + 'M', '+14.2%', '#3b82f6', 400],
            ['CONVERSIONS', cnt(t, 600, 1200, 18.4).toFixed(1) + 'K', '+9.8%', '#8b5cf6', 600],
            ['AVG DURATION', cnt(t, 800, 1200, 3.8).toFixed(1) + ' min', '+6.4%', '#f59e0b', 800],
          ]
          const zones = [
            ['South', 'TOP REGION BY TRAFFIC', '9,84,210 sessions', 'good', 1200],
            ['West', 'LOWEST TRAFFIC', '2,10,884 sessions', 'bad', 1450],
            ['East', 'MOST CONVERSIONS', '6,412 conversions', 'info', 1700],
            ['North', 'HIGH TRAFFIC · LOW CONV.', 'CVR 0.4%', 'warn', 1950],
          ]
          const strip = [['ENGAGEMENT RATE', 64.2, '%'], ['SCROLL RATE', 71.8, '%'], ['PAGES PER SESSION', 4.2, ''], ['CTR', 2.9, '%'], ['BOUNCE RATE', 38.4, '%']]
          const sessions = [['S', 84], ['SW', 71], ['W', 38], ['N', 64], ['NE', 29], ['E', 57], ['C', 46]]
          return (
            <div key="f4" style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
              <div style={{ display: 'flex', gap: 10 }}>
                {kpis.map(([lab, val, chip, col, at]) => <InsKpi key={lab} label={lab} value={val} chip={chip} color={col} on={t > at} />)}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {zones.map(([rg, vd, met, tone, at]) => <InsVerdict key={rg} region={rg} verdict={vd} metric={met} tone={tone} on={t > at} />)}
              </div>
              <div style={{ ...cardS, display: 'flex', alignItems: 'stretch', padding: '6px 0' }}>
                {strip.map(([lab, v, u], i) => (
                  <div key={lab} style={{ flex: 1, textAlign: 'center', borderRight: i < 4 ? '1px solid #f0f1f4' : 'none', padding: '2px 6px' }}>
                    <p style={{ ...tiny, fontSize: 7.5, textTransform: 'uppercase', letterSpacing: 0.4 }}>{lab}</p>
                    <p style={{ margin: '1px 0 0', fontSize: 15, fontFamily: SA, fontWeight: 700, color: '#000718' }}>{cnt(t, 2400 + i * 120, 800, v).toFixed(1)}{u}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>
                <div style={{ ...cardS, flex: 1.25, padding: '8px 12px' }}>
                  <p style={cardT}>TRAFFIC BY ZONES</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1 }}><InsDotMap on={t > 2900} h={118} w={150} /></div>
                    <div style={{ width: 118, display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                      {[['South', 92], ['North', 74], ['East', 58], ['West', 31]].map(([z, v], i) => (
                        <div key={z}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                            <span style={{ ...tiny, fontSize: 8 }}>{z}</span>
                            <span style={{ ...tiny, fontSize: 8, color: '#1b5e20', fontWeight: 800 }}>{v}%</span>
                          </div>
                          <div style={{ background: '#eceef2', height: 4, borderRadius: 2 }}>
                            <div style={{ background: G, height: '100%', borderRadius: 2, width: `${v}%`, transform: t > 3100 + i * 120 ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.55s ease-out' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ ...cardS, flex: 1, padding: '8px 12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <p style={cardT}>SESSIONS BY REGION</p>
                    <span style={{ ...tiny, fontSize: 7.5 }}>1 WEEK · SESSIONS</span>
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <InsBars on={t > 3300} h={118} stagger={70} data={sessions.map(([l, v]) => ({ l, v, t: '' }))} />
                  </div>
                </div>
                <div style={{ ...cardS, flex: 1, padding: '8px 12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <p style={cardT}>PEAK VISIT TIME</p>
                    <span style={{ ...tiny, fontSize: 7.5, color: '#1b5e20', fontWeight: 800 }}>REGION FOCUS · SOUTHWEST ▾</span>
                  </div>
                  <div style={{ marginTop: 6 }}><InsArea on={t > 3500} h={96} /></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    <span style={{ ...tiny, fontSize: 8 }}>Avg time 3m 24s</span>
                    <span style={{ ...tiny, fontSize: 8 }}>Peak 7–9 PM</span>
                    <span style={{ ...tiny, fontSize: 8 }}>Bounce 42.3%</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })()}

        {/* FRAME 5 — EXPORT (hero beat #2 — the pull-back): press → toast → report card */}
        {frame === 5 && t > 1700 && (
          <div key="f5" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 780, background: '#fff', border: '1px solid #dee0e7', borderRadius: 10, boxShadow: '0 24px 60px rgba(0,7,24,0.14)', padding: 14, animation: 'insPull 0.7s cubic-bezier(0.25,0.1,0.25,1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 10, borderBottom: '1px solid #f0f1f4' }}>
                {['#ff5f57', '#febc2e', '#28c840'].map(c => <span key={c} style={{ width: 8, height: 8, borderRadius: 4, background: c }} />)}
                <p style={{ margin: '0 0 0 6px', fontSize: 10.5, fontFamily: AR, fontWeight: 700, color: '#000718' }}>Global InsightIT - one dashboard</p>
                <span style={{ ...tiny, fontSize: 8.5, marginLeft: 'auto' }}>ALL LOCATIONS · Lifetime</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 10 }}>
                {[
                  ['OVERVIEW', 0, <InsBars key="b" on h={54} gap={4} stagger={0} data={[4.2, 5.1, 4.8, 6.2, 5.6, 6.8, 7.4].map(v => ({ l: '', v, t: '' }))} />],
                  ['LPM', 1, <div key="r" style={{ display: 'flex', justifyContent: 'center' }}><InsRing on value={78} size={56} /></div>],
                  ['SOCIAL MEDIA', 2, <InsLine key="l" on h={54} />],
                  ['PERFORMANCE MARKETING', 3, <InsBars key="p" on h={54} gap={4} stagger={0} color="#8b5cf6" data={[612, 548, 495, 448, 396, 342].map(v => ({ l: '', v, t: '' }))} />],
                  ['LPG', 4, <InsArea key="a" on h={54} />],
                ].map(([lab, i, viz]) => (
                  <div key={lab} style={{ border: '1px solid #e6e8ee', borderRadius: 6, padding: '8px 10px', background: '#fdfdfe', animation: 'insTile 0.5s cubic-bezier(0.25,0.1,0.25,1) both', animationDelay: `${i * 70}ms` }}>
                    <p style={{ ...tiny, fontSize: 7.5, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 5, fontWeight: 800 }}>{lab}</p>
                    {viz}
                  </div>
                ))}
                <div style={{ border: `1px solid ${G}`, background: '#e8fde8', borderRadius: 6, padding: '8px 10px', animation: 'insTile 0.5s cubic-bezier(0.25,0.1,0.25,1) both', animationDelay: '350ms', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
                  <p style={{ margin: 0, fontSize: 12, fontFamily: SA, fontWeight: 800, color: '#1b5e20', textTransform: 'uppercase', letterSpacing: 0.5 }}>5 modules · 1 report</p>
                  <p style={{ ...tiny, fontSize: 8, color: '#1b5e20' }}>Aug 2026 · All locations · PDF</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FRAME 6 — CLOSE */}
        {frame === 6 && (
          <div key="f6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', animation: 'insFadeUp 0.7s ease' }}>
            <p style={{ fontFamily: SA, fontWeight: 800, fontSize: 30, color: '#000718', textTransform: 'uppercase', margin: '0 0 4px', lineHeight: 1.08 }}>
              Every module. Every metric. <span style={{ color: G }}>One InsightIT.</span>
            </p>
            <p style={{ fontFamily: AR, fontSize: 12.5, color: G, fontWeight: 600, margin: '8px 0 16px' }}>The observability layer of CHNC.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{ fontFamily: SA, fontWeight: 900, fontSize: 26, color: G, letterSpacing: 1 }}>InsightIT</span>
              <span style={{ width: 1, height: 20, background: '#dee0e7' }} />
              <span style={{ fontFamily: AR, fontSize: 11, color: '#9fa3ac' }}>CHNC ▸ ConvergenSEE</span>
            </div>
            <p style={{ fontFamily: AR, fontSize: 9, color: '#9fa3ac', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 1 }}>InsightIT inside every one</p>
            <div style={{ display: 'flex', gap: 16 }}>
              {['LocateIT', 'SocialiseIT', 'AmplifyIT', 'CreateIT', 'ScriptIT', 'AIgenIT'].map((m, i) => (
                <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 5, animation: 'insPop 0.45s ease both', animationDelay: `${200 + i * 110}ms` }}>
                  <span style={{ width: 6, height: 6, borderRadius: 3, background: G }} />
                  <span style={{ fontFamily: SA, fontWeight: 600, fontSize: 12, color: '#666a74' }}>{m}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lower-third overlay band */}
      {overlay && (
        <div key={`band-${frame}`} style={{
          background: 'rgba(0,7,24,0.95)', borderTop: `2px solid ${G}`, padding: '11px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          animation: 'insBandUp 0.5s ease',
        }}>
          <p style={{ margin: 0, fontSize: 13, fontFamily: AR, fontWeight: 700, color: '#fff' }}>{overlay.main}</p>
          <p style={{ margin: 0, fontSize: 10, fontFamily: AR, color: G, fontWeight: 500 }}>{overlay.sub}</p>
        </div>
      )}
    </div>
  )
}

// ─── LocateIT content (GBP Listings) ─────────────────────────────────────────
function LocateContent({ controls, tileVariants }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'flex-start', width: 1119 }}>
      <StatTiles tiles={MODULES.LocateIT.tiles} controls={controls} tileVariants={tileVariants} />
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <CTACard headline="Manage your GBP listings for maximum local visibility!" sub="Verify, optimise and track all your Google Business Profile locations in one place." cta="Add Listing" controls={controls} custom={0} />
        <ChartCard title="Listing Health" controls={controls} custom={1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <HorizRow label="Verified" value={18} max={24} />
            <HorizRow label="Complete Profile" value={21} max={24} />
            <HorizRow label="With Photos" value={16} max={24} />
            <HorizRow label="Responding to Reviews" value={14} max={24} />
          </div>
        </ChartCard>
        <ChartCard title="Monthly Views" controls={controls} custom={2}>
          <VertBars data={[{l:'Oct',v:1.8},{l:'Nov',v:2.1},{l:'Dec',v:1.9},{l:'Jan',v:2.4},{l:'Feb',v:2.2},{l:'Mar',v:2.8}]} height={200} />
        </ChartCard>
      </div>
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <ListCard title="GBP Listings" rows={[
          { isPen: false, label: 'Mahindra XUV700 Showroom', sub: 'Powai, Mumbai' },
          { isPen: false, label: 'Mahindra Bandra West', sub: 'Bandra, Mumbai' },
          { isPen: false, label: 'Mahindra Andheri East', sub: 'Andheri, Mumbai' },
          { isPen: false, label: 'Mahindra Thane', sub: 'Thane, Mumbai' },
          { isPen: false, label: 'Mahindra Navi Mumbai', sub: 'Vashi, Navi Mumbai' },
        ]} />
        <ListCard title="Pending Verification" rows={[
          { isPen: false, label: 'Mahindra Pune Camp', sub: 'Camp, Pune' },
          { isPen: false, label: 'Mahindra Wakad', sub: 'Wakad, Pune' },
          { isPen: false, label: 'Mahindra Nashik Road', sub: 'Nashik Road, Nashik' },
          { isPen: false, label: 'Mahindra Aurangabad', sub: 'MIDC, Aurangabad' },
          { isPen: false, label: 'Mahindra Nagpur', sub: 'Sitabuldi, Nagpur' },
        ]} />
      </div>
    </div>
  )
}

// ─── AmplifyIT content (Performance Marketing) ───────────────────────────────
function AmplifyContent({ controls, tileVariants }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'flex-start', width: 1119 }}>
      <StatTiles tiles={MODULES.AmplifyIT.tiles} controls={controls} tileVariants={tileVariants} />
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <CTACard headline="Launch your next performance campaign!" sub="Meta & Google ads optimised for maximum ROAS across all placements." cta="New Campaign" controls={controls} custom={0} />
        <ChartCard title="Spend Split" controls={controls} custom={1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <HorizRow label="Meta Ads" value={1.2} max={2.1} unit="L" />
            <HorizRow label="Google Search" value={0.6} max={2.1} unit="L" />
            <HorizRow label="Google Display" value={0.3} max={2.1} unit="L" />
          </div>
        </ChartCard>
        <ChartCard title="Campaign ROAS" controls={controls} custom={2}>
          <VertBars data={[{l:'XUV700',v:5.2},{l:'Thar',v:4.8},{l:'Scorpio',v:4.1},{l:'BE6',v:6.3},{l:'XEV9e',v:5.7}]} height={200} />
        </ChartCard>
      </div>
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <ListCard title="Active Campaigns" rows={[
          { isPen: true, label: 'XUV700 Brand Awareness – Meta', sub: 'Budget: ₹45K · ROAS: 5.2x' },
          { isPen: true, label: 'Thar Search – Google', sub: 'Budget: ₹28K · ROAS: 4.8x' },
          { isPen: true, label: 'Scorpio Retargeting – Meta', sub: 'Budget: ₹18K · ROAS: 4.1x' },
          { isPen: true, label: 'BE6 Launch – Google & Meta', sub: 'Budget: ₹62K · ROAS: 6.3x' },
          { isPen: true, label: 'XEV9e Awareness – YouTube', sub: 'Budget: ₹34K · ROAS: 5.7x' },
        ]} />
        <ListCard title="Top Performing Ads" rows={[
          { isPen: true, label: 'XUV700 Video – Reel Format', sub: 'CTR: 4.8% · CPC: ₹12' },
          { isPen: true, label: 'BE6 Image Carousel', sub: 'CTR: 3.9% · CPC: ₹9' },
          { isPen: true, label: 'Thar Search Ad #3', sub: 'CTR: 6.2% · CPC: ₹7' },
          { isPen: true, label: 'Scorpio Dynamic Product', sub: 'CTR: 2.9% · CPC: ₹14' },
          { isPen: true, label: 'XEV9e Brand Keyword', sub: 'CTR: 8.1% · CPC: ₹5' },
        ]} />
      </div>
    </div>
  )
}

// ─── CreateIT standard content (stat tiles, no workflow animation) ─────────────
function CreateStandardContent({ controls, tileVariants }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'flex-start', width: 1119 }}>
      <StatTiles tiles={MODULES.CreateIT.tiles} controls={controls} tileVariants={tileVariants} />
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <CTACard headline="Design & publish creatives at scale!" sub="Plan content for paid & organic campaigns with brand-approved templates." cta="Create Now" controls={controls} custom={0} />
        <ChartCard title="Creative Output" controls={controls} custom={1}>
          <VertBars data={[{l:'Oct',v:18},{l:'Nov',v:24},{l:'Dec',v:21},{l:'Jan',v:32},{l:'Feb',v:28},{l:'Mar',v:35}]} height={200} />
        </ChartCard>
        <ChartCard title="Approval Rate" controls={controls} custom={2}>
          <VertBars data={[{l:'Oct',v:82},{l:'Nov',v:88},{l:'Dec',v:85},{l:'Jan',v:91},{l:'Feb',v:94},{l:'Mar',v:96}]} height={200} />
        </ChartCard>
      </div>
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <ListCard title="Recent Creatives" rows={[
          { isPen: true, label: 'Thar Mountain Day Campaign', sub: 'Created 28/02/2025' },
          { isPen: true, label: 'Scorpio N Launch Carousel', sub: 'Created 25/02/2025' },
          { isPen: true, label: 'XUV400 EV Awareness', sub: 'Created 20/02/2025' },
          { isPen: true, label: 'BE6 Social Media Kit', sub: 'Created 18/02/2025' },
          { isPen: true, label: 'Thar Roxx Delhi Event', sub: 'Created 15/02/2025' },
        ]} />
        <ListCard title="Pending Approvals" rows={[
          { isPen: true, label: 'XEV9e Teaser Reel', sub: 'Sent for review' },
          { isPen: true, label: 'Tiramisu Recipe Carousel', sub: 'Awaiting feedback' },
          { isPen: true, label: 'Coffee Story Static', sub: 'In design' },
          { isPen: true, label: 'Tres Leches Campaign', sub: 'Copy review' },
          { isPen: true, label: 'Lifestyle Brand Shoot', sub: 'Draft' },
        ]} />
      </div>
    </div>
  )
}

// ─── CreateIT content (Creative Production) ───────────────────────────────────
function CreateContent({ controls, tileVariants, stepCount = 0, onFrame, onCursor }) {
  const G = '#34cc32'

  // Self-contained timer: total elapsed ms since mount.
  // SPEED < 1 slows the whole reel uniformly (frame durations, reveals, cursor).
  const SPEED = 1
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setElapsed(e => e + 60 * SPEED), 60)
    return () => clearInterval(id)
  }, [])

  // One frame per product beat: Brief. Generate. Approve. Adapt. Publish.
  // Frame: 0=idle  1=Brief(5s)  2=Generate(7s)  3=Approve(6s)  4=Adapt(6.3s)  5=Publish(7s)  6=close
  const timeline = [0, 800, 5800, 12800, 18800, 25100, 32100]
  const totalDuration = 33800

  // Loop the animation
  const looped = elapsed % totalDuration

  // Determine which frame we're in and how far through it
  let frame = 0
  let t = 0
  for (let i = timeline.length - 1; i >= 0; i--) {
    if (looped >= timeline[i]) { frame = i; t = looped - timeline[i]; break }
  }

  useEffect(() => { if (onFrame) onFrame(frame) }, [frame, onFrame])

  const copyText = 'Celebrating the spirit of freedom! 🇮🇳 Happy Independence Day to every Indian heart.'
  const copyAlts = [copyText, 'From struggle to strength. India shines brighter every year. #IndependenceDay', 'Jai Hind! 🇮🇳 Honoring the heroes who made our freedom possible.']
  // Actual creatives: fictional Horizon Motors Independence Day ads (public/horizon-creative-1..6.webp)
  const tile = i => `url(/horizon-creative-${i + 1}.webp) center/cover no-repeat`

  // Cursor — rides each action. Per frame: path = [switchTime, x, y] waypoints timed so the
  // 0.65s glide lands ON the element as its action fires; clicks pulse a ring at the tip.
  const cursorScript = {
    1: { path: [[0, 230, 127], [900, 230, 200], [1900, 230, 273], [2900, 230, 346]], clicks: [] },
    2: { path: [[0, 230, 121], [900, 48, 163], [1700, 136, 163], [2700, 520, 240], [4600, 260, 290], [6000, 850, 290]], clicks: [1600, 2400] },
    3: { path: [[0, 440, 165], [1600, 830, 138], [3200, 620, 320]], clicks: [900, 2500] },
    4: { path: [[0, 89, 155], [1000, 230, 155], [2000, 422, 155], [3000, 228, 275], [4050, 309, 275]], clicks: [3650, 4700] },
    5: { path: [[0, 144, 200], [1500, 700, 110], [2300, 700, 155], [3100, 700, 200], [3900, 700, 245], [5000, 700, 320]], clicks: [] },
  }
  const seg = cursorScript[frame]
  let cx = 400, cy = 260
  if (seg) for (const [ts, x, y] of seg.path) { if (t >= ts) { cx = x; cy = y } }
  const cursorClick = seg ? seg.clicks.find(c => t >= c && t < c + 500) : undefined

  // Camera-follow experiment: report the cursor (local coords) upward so the whole
  // dashboard zooms in and pans with it; null = pull back to the full view.
  // Pulls back while the AI visuals generate (frame 2) and for "Campaign Live!" (frame 5).
  const camOff = frame < 1 || frame > 5 || (frame === 2 && t > 2500) || (frame === 5 && t > 4800)
  useEffect(() => {
    if (!onCursor) return
    onCursor(camOff ? null : { x: cx, y: cy })
    return () => onCursor(null)
  }, [camOff, cx, cy, onCursor])

  const overlays = [
    null,
    { main: 'Tell it what you need.', sub: 'Campaign name. Platform. That\'s it.' },
    { main: 'AI generates your visuals.', sub: 'Multiple options. Multiple AI engines. Seconds.' },
    { main: 'Pick your visual. Pick your words.', sub: 'AI writes the copy too. Approval in one click.' },
    { main: 'One creative. Every format. Every language.', sub: 'Adapt it once. Use it everywhere.' },
    { main: 'Brief. Generate. Approve. Adapt. Publish.', sub: 'All in one place. All in minutes.' },
  ]
  const overlay = overlays[frame]
  const progressLabels = ['BRIEF', 'GENERATE', 'APPROVE', 'ADAPT', 'PUBLISH']
  const step = frame - 1 // active label index; -1 = idle, 5 = closing (all done)

  // Shared bits — plain helpers called inline (never inner components: the 60ms tick would remount them)
  const heading = txt => (
    <h3 style={{ margin: '0 0 18px', fontSize: 16, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', textTransform: 'uppercase' }}>{txt}</h3>
  )
  const field = (label, value, show, done) => (
    <div style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(12px)', transition: 'all 0.7s ease' }}>
      <label style={{ fontSize: 11, color: '#9fa3ac', fontFamily: "'Archivo', sans-serif", fontWeight: 600, display: 'block', marginBottom: 5 }}>{label}</label>
      <div style={{ border: `1.5px solid ${done ? G : '#dee0e7'}`, padding: '9px 14px', fontSize: 13, fontFamily: "'Archivo', sans-serif", color: '#333', transition: 'border-color 0.6s ease', borderRadius: 2 }}>
        {show ? value : ''}
        {show && !done && <span style={{ animation: 'blink 0.8s ease infinite', color: G, marginLeft: 1 }}>|</span>}
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 1119, position: 'relative', height: '100%' }}>
      <style>{`
        @keyframes shimmer { 0% { background-position: -200px 0; } 100% { background-position: 200px 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes crClick { 0% { transform: scale(0.25); opacity: 0.9; } 100% { transform: scale(1.3); opacity: 0; } }
      `}</style>

      {/* Preload the creatives during the idle frame so grid tiles don't pop in */}
      <div style={{ display: 'none' }}>
        {[1, 2, 3, 4, 5, 6].map(i => <img key={i} src={`/horizon-creative-${i}.webp`} alt="" />)}
        {['square', 'story', 'banner'].flatMap(f => ['en', 'hi', 'ta'].map(l => `${f}-${l}`)).map(n => <img key={n} src={`/horizon-adapt-${n}.webp`} alt="" />)}
      </div>

      {/* Progress bar */}
      <div style={{ display: 'flex', gap: 0, padding: '14px 24px 0' }}>
        {progressLabels.map((l, i) => (
          <div key={l} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <div style={{ height: 3, width: '100%', background: i <= step ? G : '#dee0e7', borderRadius: 2, transition: 'background 0.6s ease', opacity: i === step && step < 5 ? 0.5 : 1 }} />
            <span style={{ fontSize: 8, fontFamily: "'Archivo', sans-serif", color: i <= step ? G : '#9fa3ac', fontWeight: i < step ? 700 : 400, transition: 'all 0.3s ease' }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Black cursor — moved via transform (compositor), not left/top (layout) */}
      {frame > 0 && frame <= 5 && (
        <div style={{
          position: 'absolute', left: 0, top: 0, transform: `translate(${cx}px, ${cy}px)`, zIndex: 200,
          transition: 'transform 0.65s cubic-bezier(0.25,0.1,0.25,1)', willChange: 'transform',
          pointerEvents: 'none',
        }}>
          {cursorClick !== undefined && (
            <span key={cursorClick} style={{ position: 'absolute', left: -15, top: -15, width: 30, height: 30, borderRadius: '50%', border: `2.5px solid ${G}`, animation: 'crClick 0.5s ease-out forwards' }} />
          )}
          <svg width="16" height="22" viewBox="0 0 14 19" fill="none">
            <path d="M0 0V18L4.5 13.5L8 19L10 18L6.5 12.5H13L0 0Z" fill="#000" stroke="#fff" strokeWidth="1"/>
          </svg>
        </div>
      )}

      {/* Content area */}
      <div style={{ flex: 1, padding: '18px 24px', overflow: 'hidden' }}>

        {/* FRAME 1 — Brief (5s) */}
        {frame === 1 && (
          <div key="f1" style={{ animation: 'fadeUp 0.7s ease' }}>
            {heading('Brief - Create Campaign')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                ['Campaign Name', 'Independence Day Post'],
                ['Platform', 'Instagram'],
                ['Region', 'India - All States'],
                ['Objective', 'Brand Awareness'],
              ].map(([l, v], i) => (
                <div key={l}>{field(l, v, t > i * 900, t > i * 900 + 600)}</div>
              ))}
            </div>
          </div>
        )}

        {/* FRAME 2 — Generate visuals (7s) */}
        {frame === 2 && (
          <div key="f2" style={{ animation: 'fadeUp 0.7s ease' }}>
            {heading('Generate - AI Visuals')}
            <div style={{ marginBottom: 16 }}>
              {field('Brief', 'Festive post for independence day', true, t > 1200)}
            </div>
            <div style={{ display: 'flex', gap: 20, marginBottom: 18 }}>
              {['GPT', 'Gemini 2.0'].map((p, i) => {
                const checked = t > 1600 + i * 800
                return (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 7, opacity: checked ? 1 : 0.3, transition: 'opacity 0.5s ease' }}>
                    <div style={{ width: 15, height: 15, borderRadius: 3, border: `2px solid ${checked ? G : '#ccc'}`, background: checked ? G : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s ease', transform: checked ? 'scale(1)' : 'scale(0.8)' }}>
                      {checked && <span style={{ color: '#fff', fontSize: 9, fontWeight: 800 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 12, fontFamily: "'Archivo', sans-serif", color: '#333' }}>{p}</span>
                  </div>
                )
              })}
            </div>
            {t > 2700 && t < 4400 && (
              <div style={{ background: '#f5f6f8', borderRadius: 8, padding: 18, textAlign: 'center', border: '1px solid #dee0e7', animation: 'fadeUp 0.5s ease' }}>
                <p style={{ fontSize: 12, fontFamily: "'Archivo', sans-serif", color: '#333', margin: '0 0 10px', fontWeight: 600 }}>Generating with Dual AI (GPT + Gemini 2.0)</p>
                <div style={{ height: 6, background: '#e0e0e0', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: G, width: `${Math.min(((t - 2700) / 1700) * 100, 100)}%`, borderRadius: 3, transition: 'width 0.1s linear' }} />
                </div>
              </div>
            )}
            {t > 4400 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
                {[0,1,2,3,4,5].map(i => (
                  <div key={i} style={{
                    aspectRatio: '1/1', background: tile(i), borderRadius: 4,
                    opacity: t > 4400 + i * 250 ? 1 : 0, transform: t > 4400 + i * 250 ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
                    transition: 'all 0.6s ease', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    {t > 4400 + i * 250 && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', backgroundSize: '200px 100%', animation: 'shimmer 2s ease infinite' }} />}
                    <span style={{ position: 'absolute', left: 6, bottom: 6, fontSize: 8, fontWeight: 600, color: '#333', background: 'rgba(255,255,255,0.85)', padding: '2px 7px', borderRadius: 3, fontFamily: "'Archivo', sans-serif" }}>{i < 3 ? 'Gemini' : 'GPT'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* FRAME 3 — Approve visual + copy (6s) */}
        {frame === 3 && (
          <div key="f3" style={{ animation: 'fadeUp 0.7s ease' }}>
            {heading('Approve - Visual & Copy')}
            <div style={{ display: 'flex', gap: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, width: 500, alignContent: 'start' }}>
                {[0,1,2,3,4,5].map(i => (
                  <div key={i} style={{
                    aspectRatio: '1/1', background: tile(i), borderRadius: 4,
                    border: i === 2 && t > 900 ? `3px solid ${G}` : '3px solid transparent',
                    position: 'relative', transition: 'border 0.5s ease',
                  }}>
                    {i === 2 && t > 900 && (
                      <div style={{ position: 'absolute', top: 5, right: 5, width: 18, height: 18, borderRadius: 9, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeUp 0.4s ease' }}>
                        <span style={{ color: '#fff', fontSize: 10, fontWeight: 800 }}>✓</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 11, color: '#9fa3ac', fontFamily: "'Archivo', sans-serif", fontWeight: 600 }}>AI Copy - pick one</label>
                {copyAlts.map((v, i) => (
                  <div key={i} style={{
                    padding: '10px 14px', background: i === 0 && t > 2500 ? '#e8fde8' : '#f5f6f8',
                    border: i === 0 && t > 2500 ? `2px solid ${G}` : '1px solid #dee0e7',
                    fontSize: 11, fontFamily: "'Archivo', sans-serif", color: '#333', lineHeight: '16px', borderRadius: 4,
                    opacity: t > 1300 + i * 350 ? 1 : 0, transform: t > 1300 + i * 350 ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'all 0.6s ease',
                  }}>{v}</div>
                ))}
                {t > 3400 && t < 4700 && (
                  <div style={{ background: '#fff8e1', border: '1px solid #ffd54f', borderRadius: 6, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, animation: 'fadeUp 0.5s ease' }}>
                    <span style={{ fontSize: 14 }}>⏳</span>
                    <span style={{ fontSize: 12, fontFamily: "'Archivo', sans-serif", color: '#f57f17', fontWeight: 600 }}>Waiting for Approval...</span>
                  </div>
                )}
                {t > 4700 && (
                  <div style={{ background: '#e8fde8', border: `2px solid ${G}`, borderRadius: 6, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, animation: 'fadeUp 0.5s ease' }}>
                    <span style={{ fontSize: 14 }}>✅</span>
                    <span style={{ fontSize: 12, fontFamily: "'Archivo', sans-serif", color: '#1b5e20', fontWeight: 700 }}>Approved by Stakeholder</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* FRAME 4 — Adapt (6.3s): real per-format adapts; square + banner swap language live */}
        {frame === 4 && (() => {
          const li = t > 4700 ? 2 : t > 3650 ? 1 : 0
          const lang = ['en', 'hi', 'ta'][li]
          return (
            <div key="f4" style={{ animation: 'fadeUp 0.7s ease' }}>
              {heading('Adapt - Resize & Localize')}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 40, marginBottom: 22 }}>
                {[
                  { l: 'Square 1:1', w: 130, h: 130, src: `/horizon-adapt-square-${lang}.webp`, base: '/horizon-adapt-square-en.webp' },
                  { l: 'Story 9:16', w: 73, h: 130, src: `/horizon-adapt-story-${lang}.webp`, base: '/horizon-adapt-story-en.webp' },
                  { l: 'Banner 16:9', w: 231, h: 130, src: `/horizon-adapt-banner-${lang}.webp`, base: '/horizon-adapt-banner-en.webp' },
                ].map((f, i) => (
                  <div key={f.l} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    opacity: t > i * 900 ? 1 : 0, transform: t > i * 900 ? 'scale(1)' : 'scale(0.88)',
                    transition: 'all 0.7s ease',
                  }}>
                    <div style={{ width: f.w, height: f.h, background: `url(${f.base}) center/cover no-repeat`, borderRadius: 4, border: `2px solid ${G}`, position: 'relative', overflow: 'hidden' }}>
                      <img key={f.src} src={f.src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', animation: 'fadeUp 0.45s ease' }} />
                    </div>
                    <span style={{ fontSize: 11, fontFamily: "'Archivo', sans-serif", color: '#666' }}>{f.l}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: t > 2600 ? 1 : 0, transition: 'opacity 0.6s ease' }}>
                <label style={{ fontSize: 12, color: '#9fa3ac', fontFamily: "'Archivo', sans-serif", fontWeight: 600 }}>Language:</label>
                {['English', 'हिन्दी', 'தமிழ்'].map((l, i) => (
                  <div key={l} style={{ padding: '5px 14px', background: i === li ? G : '#f0f0f0', fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: i === li ? '#000' : '#666', borderRadius: 3, transition: 'all 0.3s ease' }}>{l}</div>
                ))}
              </div>
            </div>
          )
        })()}

        {/* FRAME 5 — Publish (7s): final creative + schedule */}
        {frame === 5 && (
          <div key="f5" style={{ animation: 'fadeUp 0.7s ease' }}>
            {heading('Publish & Schedule')}
            <div style={{ display: 'flex', gap: 28 }}>
              <div style={{
                width: 240, background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.18)', alignSelf: 'flex-start',
                opacity: t > 300 ? 1 : 0, transform: t > 300 ? 'scale(1)' : 'scale(0.92)', transition: 'all 0.8s ease',
              }}>
                <div style={{ height: 150, background: 'url(/horizon-adapt-banner-en.webp) center/cover no-repeat' }} />
                <div style={{ padding: 12 }}>
                  <p style={{ fontSize: 10, color: '#333', fontFamily: "'Archivo', sans-serif", lineHeight: '15px', margin: 0 }}>{copyText}</p>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                {['Meta - Reel · Scheduled 10:00 AM', 'Instagram - Carousel · Ready', 'Google Display - Static · Ready', 'YouTube - Video · In Review'].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 14px', borderBottom: '1px solid #f0f0f0',
                    opacity: t > 1300 + i * 700 ? 1 : 0.15, transition: 'opacity 0.6s ease',
                  }}>
                    <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 13, color: '#333', margin: 0 }}>{item}</p>
                    {t > 1300 + i * 700 + 550 && (
                      <div style={{ width: 20, height: 20, background: G, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeUp 0.4s ease' }}>
                        <svg width="10" height="10" viewBox="0 0 8 8"><path d="M1.5 4L3 5.5L6.5 2" stroke="#000" strokeWidth="1.2" fill="none"/></svg>
                      </div>
                    )}
                  </div>
                ))}
                {t > 5000 && (
                  <div style={{ textAlign: 'center', marginTop: 24, animation: 'fadeUp 0.7s ease' }}>
                    <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: G, textTransform: 'uppercase', margin: '0 0 6px' }}>Campaign Live!</p>
                    <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: '#666', margin: 0 }}>Brief. Generate. Approve. Adapt. Publish.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* FRAME 0 / 6 — idle & close */}
        {(frame === 0 || frame === 6) && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
            <div style={{ animation: 'fadeUp 0.5s ease' }}>
              <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: G, textTransform: 'uppercase', margin: '0 0 6px' }}>CreateIT</p>
              <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: '#666', margin: 0 }}>Brief. Generate. Approve. Adapt. Publish.</p>
            </div>
          </div>
        )}
      </div>

      {/* Step indicator — dark strip at bottom */}
      {overlay && (
        <div style={{
          background: 'rgba(0,7,24,0.92)', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          opacity: t > 200 ? 1 : 0, transition: 'opacity 0.5s ease',
        }}>
          <p style={{ margin: 0, fontSize: 12, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#fff' }}>{overlay.main}</p>
          <p style={{ margin: 0, fontSize: 10, fontFamily: "'Archivo', sans-serif", color: G, fontWeight: 500 }}>{overlay.sub}</p>
        </div>
      )}
    </div>
  )
}

// ─── LocateIT animated walkthrough (Local Presence at scale) ──────────────────
// 7-frame product video: AUDIT → MANAGE → STANDARDISE → OPTIMISE → PERFORM → COMPETE → CLOSE
// Anonymized per brief: client = ConvergenSEE, competitors A/B/C, fictional reviewers.
function formatIN(n) {
  const s = Math.round(n).toString()
  const lastThree = s.length > 3 ? s.slice(-3) : s
  const other = s.length > 3 ? s.slice(0, -3) : ''
  if (!other) return lastThree
  return other.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree
}
const easeOut = p => 1 - Math.pow(1 - Math.max(0, Math.min(1, p)), 2)

function LocateWorkflowContent({ controls, tileVariants, stepCount = 0, onFrame, onCursor }) {
  const G = '#34cc32'
  const cardBg = 'linear-gradient(135deg, #cfe9d6, #b7dccf)'

  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setElapsed(e => e + 60), 60)
    return () => clearInterval(id)
  }, [])

  // Frame: 0 idle 1 Create 2 Audit 3 Manage(hero) 4 Verify 5 GoLive(hero) 6 Optimise 7 Perform 8 Close
  const timeline = [0, 500, 4500, 8500, 13500, 17500, 23000, 28000, 32500, 36000]
  const totalDuration = 36000
  const looped = elapsed % totalDuration

  let frame = 0, t = 0
  for (let i = timeline.length - 1; i >= 0; i--) {
    if (looped >= timeline[i]) { frame = i; t = looped - timeline[i]; break }
  }

  useEffect(() => { if (onFrame) onFrame(frame) }, [frame, onFrame])

  // Cursor — rides each action. Per frame: path = [switchTime, x, y] waypoints timed so the
  // 0.65s glide lands ON the element as its action fires; clicks pulse a ring at the tip.
  const cursorScript = {
    1: { path: [[0, 250, 133], [550, 60, 189], [1300, 142, 246], [1700, 400, 246], [2100, 613, 340], [2900, 1050, 76]], clicks: [1250, 3600] },
    2: { path: [[0, 500, 146], [600, 700, 292], [1700, 1040, 292], [2450, 1050, 384]], clicks: [2400, 3150] },
    3: { path: [[0, 570, 110], [900, 450, 156], [1400, 1040, 300], [2300, 1030, 237], [3500, 700, 300]], clicks: [850, 2950] },
    4: { path: [[0, 155, 107], [300, 1030, 173], [1300, 1030, 231], [2200, 1030, 303]], clicks: [] },
    5: { path: [[0, 130, 92], [500, 342, 204], [1150, 887, 220], [2600, 887, 300]], clicks: [1800] },
    6: { path: [[0, 320, 130], [300, 320, 237], [700, 1000, 75], [1300, 300, 286], [1700, 350, 318], [2200, 1040, 286]], clicks: [] },
    7: { path: [[0, 330, 215], [800, 330, 313], [1500, 875, 143], [2100, 875, 205]], clicks: [] },
  }
  const seg = cursorScript[frame]
  let cx = 400, cy = 240
  if (seg) for (const [ts, x, y] of seg.path) { if (t >= ts) { cx = x; cy = y } }
  const cursorClick = seg ? seg.clicks.find(c => t >= c && t < c + 500) : undefined

  // Camera (variable-depth rig in CHNCDashboard): windows of [start, end, zoom,
  // fx?, fy?] — fx/fy frame a fixed point instead of the cursor. ONE depth per
  // beat; gaps between windows pull back full-frame (frame transitions, the
  // photo fan-out reveal, the go-live stamp landing, the close). Tight on the
  // create form, default on the audit/verify tables, medium on the go-live
  // phone and review card, wide on the analytics charts.
  const CAM = {
    1: [[400, 2500, 1.85]],
    2: [[400, 3300, 1.65]],
    3: [[2400, 4500, 1.5]],
    4: [[500, 3300, 1.65]],
    5: [[2200, 4600, 1.55]],
    6: [[400, 1900, 1.5, 500, 210], [1900, 4300, 1.3, 560, 300]],
    7: [[500, 3600, 1.3]],
  }
  const camWin = CAM[frame] && CAM[frame].find(([a, b]) => t >= a && t < b)
  const camZ = camWin ? camWin[2] : 0
  const camX = camWin ? (camWin[3] ?? cx) : 0
  const camY = camWin ? (camWin[4] ?? cy) : 0
  useEffect(() => {
    if (!onCursor) return
    onCursor(camZ ? { x: camX, y: camY, z: camZ } : null)
    return () => onCursor(null)
  }, [camZ, camX, camY, onCursor])

  const overlays = [
    null,
    { main: 'Step 1. Create every listing.', sub: 'Details, hours, map pin - one form.' },
    { main: 'Step 2. Audit at scale.', sub: '42,318 checked. Strays caught & fixed.' },
    { main: 'Step 3. Update once. Publish everywhere.', sub: 'One upload → 312 locations.' },
    { main: 'Step 4. Verify every location.', sub: 'Submitted → Verified. Tracked live.' },
    { main: 'Step 5. Live on Google.', sub: 'Every branch - found, everywhere.' },
    { main: 'Step 6. It tells you what to fix.', sub: 'High-impact actions - ranked, then done.' },
    { main: 'Step 7. Watch it pay off.', sub: '84L+ impressions. 87% on mobile.' },
    { main: '10 stores or 10,000. One dashboard.', sub: 'Manage your Local Presence at scale.' },
  ]
  const overlay = overlays[frame]
  const progressLabels = ['CREATE', 'AUDIT', 'MANAGE', 'VERIFY', 'GO LIVE', 'OPTIMISE', 'PERFORM']
  const crumbs = [
    '', 'LocateIT ▸ Location Setup', 'LocateIT ▸ Locations Setup ▸ Stray List',
    'LocateIT ▸ Manage Locations ▸ Photos', 'InsightIT ▸ Local Reports ▸ Listing Verification',
    'LocateIT ▸ Location Setup ▸ Go Live', 'InsightIT ▸ Optima ▸ Review Feed',
    'InsightIT ▸ Local Analytics ▸ GBP', 'LocateIT',
  ]

  const th = { fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase', letterSpacing: 0.4, padding: '7px 12px', textAlign: 'left' }
  const td = { fontSize: 11, fontFamily: "'Archivo', sans-serif", color: '#333', padding: '7px 12px' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 1119, position: 'relative', height: '100%' }}>
      <style>{`
        @keyframes locFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes locBlink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes locSweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(2600%); } }
        @keyframes locPop { 0% { transform: scale(0.6); opacity: 0; } 60% { transform: scale(1.12); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes locStamp { 0% { transform: scale(2.2) rotate(-18deg); opacity: 0; } 55% { transform: scale(0.92) rotate(-8deg); opacity: 1; } 100% { transform: scale(1) rotate(-8deg); opacity: 1; } }
        @keyframes locBloom { from { transform: scale(0.2); opacity: 0; } to { transform: scale(1); opacity: 0.85; } }
        @keyframes locDrop { 0% { transform: translate(-50%,-140%) scale(0.5); opacity: 0; } 70% { transform: translate(-50%,-92%) scale(1.12); } 100% { transform: translate(-50%,-100%) scale(1); opacity: 1; } }
        @keyframes locRipple { 0% { transform: translate(-50%,-50%) scale(0.2); opacity: 0.55; } 100% { transform: translate(-50%,-50%) scale(1); opacity: 0; } }
        @keyframes locDraw { from { stroke-dashoffset: 600; } to { stroke-dashoffset: 0; } }
        @keyframes locBandUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes locClick { 0% { transform: scale(0.25); opacity: 0.9; } 100% { transform: scale(1.3); opacity: 0; } }
      `}</style>

      {/* Progress bar */}
      <div style={{ display: 'flex', gap: 0, padding: '14px 24px 0' }}>
        {progressLabels.map((l, i) => {
          const done = (frame - 1) > i || frame === 8
          const cur = (frame - 1) === i && frame !== 8
          return (
            <div key={l} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ height: 3, width: '100%', background: (done || cur) ? G : '#dee0e7', borderRadius: 2, transition: 'background 0.6s ease', opacity: cur ? 0.5 : 1 }} />
              <span style={{ fontSize: 8, fontFamily: "'Archivo', sans-serif", color: (done || cur) ? G : '#9fa3ac', fontWeight: done ? 700 : 400, transition: 'all 0.3s ease' }}>{l}</span>
            </div>
          )
        })}
      </div>

      {/* Cursor */}
      {frame > 0 && frame <= 7 && (
        <div style={{
          position: 'absolute', left: 0, top: 0, transform: `translate(${cx}px, ${cy}px)`, zIndex: 200,
          transition: 'transform 0.65s cubic-bezier(0.25,0.1,0.25,1)', willChange: 'transform',
          pointerEvents: 'none',
        }}>
          {cursorClick !== undefined && (
            <span key={cursorClick} style={{ position: 'absolute', left: -15, top: -15, width: 30, height: 30, borderRadius: '50%', border: `2.5px solid ${G}`, animation: 'locClick 0.5s ease-out forwards' }} />
          )}
          <svg width="16" height="22" viewBox="0 0 14 19" fill="none">
            <path d="M0 0V18L4.5 13.5L8 19L10 18L6.5 12.5H13L0 0Z" fill="#000" stroke="#fff" strokeWidth="1" />
          </svg>
        </div>
      )}

      {/* Content area */}
      <div style={{ flex: 1, padding: '12px 24px', overflow: 'hidden', position: 'relative' }}>

        {frame > 0 && frame < 8 && (
          <p style={{ margin: '0 0 8px', fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac', fontWeight: 600 }}>
            {crumbs[frame].split('▸').map((c, i, a) => (
              <span key={i} style={{ color: i === a.length - 1 ? G : '#9fa3ac' }}>{c}{i < a.length - 1 ? ' ▸ ' : ''}</span>
            ))}
          </p>
        )}

        {/* FRAME 1 — CREATE: Create / Edit Listing */}
        {frame === 1 && (() => {
          const name = 'ConvergenSEE - Powai, Mumbai'.slice(0, Math.max(0, Math.floor(t / 40)))
          const hours = [['Mon', '9:00 AM – 9:00 PM'], ['Tue', '9:00 AM – 9:00 PM'], ['Wed', '9:00 AM – 9:00 PM'], ['Thu', '9:00 AM – 9:00 PM'], ['Fri', '9:00 AM – 9:00 PM'], ['Sat', '10:00 AM – 8:00 PM'], ['Sun', 'Closed']]
          return (
            <div key="l1" style={{ animation: 'locFadeUp 0.6s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', textTransform: 'uppercase' }}>Create / Edit Listing</h3>
                <div style={{ background: G, color: '#000', fontSize: 10, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, textTransform: 'uppercase', padding: '6px 16px', borderRadius: 0, letterSpacing: 0.5 }}>Save</div>
              </div>
              <div style={{ display: 'flex', gap: 18 }}>
                {/* Left: fields */}
                <div style={{ flex: 1.1, display: 'flex', flexDirection: 'column', gap: 11 }}>
                  <div>
                    <label style={{ fontSize: 10, color: '#9fa3ac', fontFamily: "'Archivo', sans-serif", fontWeight: 600, display: 'block', marginBottom: 4 }}>Business Name</label>
                    <div style={{ border: `1.5px solid ${t > 1120 ? G : '#dee0e7'}`, padding: '8px 12px', fontSize: 12, fontFamily: "'Archivo', sans-serif", color: '#333', borderRadius: 2, transition: 'border-color 0.5s ease' }}>{name}{t < 1120 && <span style={{ animation: 'locBlink 0.8s infinite', color: G }}>|</span>}</div>
                  </div>
                  <div>
                    <label style={{ fontSize: 10, color: '#9fa3ac', fontFamily: "'Archivo', sans-serif", fontWeight: 600, display: 'block', marginBottom: 4 }}>Category</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {t > 1200 && <span style={{ background: '#e8fde8', border: `1px solid ${G}`, color: '#1b5e20', fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: 700, padding: '5px 12px', borderRadius: 14, animation: 'locPop 0.5s ease' }}>Retail</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{ flex: 1, opacity: t > 1500 ? 1 : 0, transition: 'opacity 0.5s ease' }}>
                      <label style={{ fontSize: 10, color: '#9fa3ac', fontFamily: "'Archivo', sans-serif", fontWeight: 600, display: 'block', marginBottom: 4 }}>Phone</label>
                      <div style={{ border: '1.5px solid #dee0e7', padding: '8px 12px', fontSize: 12, fontFamily: "'Archivo', sans-serif", color: '#333', borderRadius: 2 }}>+91 90913 99139</div>
                    </div>
                    <div style={{ flex: 1.3, opacity: t > 1900 ? 1 : 0, transition: 'opacity 0.5s ease' }}>
                      <label style={{ fontSize: 10, color: '#9fa3ac', fontFamily: "'Archivo', sans-serif", fontWeight: 600, display: 'block', marginBottom: 4 }}>Website</label>
                      <div style={{ border: '1.5px solid #dee0e7', padding: '8px 12px', fontSize: 12, fontFamily: "'Archivo', sans-serif", color: '#333', borderRadius: 2 }}>convergensee.ai</div>
                    </div>
                  </div>
                </div>
                {/* Right: hours block */}
                <div style={{ flex: 1, opacity: t > 800 ? 1 : 0, transform: t > 800 ? 'translateX(0)' : 'translateX(12px)', transition: 'all 0.6s ease' }}>
                  <label style={{ fontSize: 10, color: '#9fa3ac', fontFamily: "'Archivo', sans-serif", fontWeight: 600, display: 'block', marginBottom: 4 }}>Operational Hours</label>
                  <div style={{ border: '1.5px solid #dee0e7', borderRadius: 4, overflow: 'hidden' }}>
                    {hours.map(([d, h], i) => (
                      <div key={d} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 12px', borderBottom: i < 6 ? '1px solid #f0f0f0' : 'none', background: i % 2 ? '#fafbfc' : '#fff' }}>
                        <span style={{ fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#555' }}>{d}</span>
                        <span style={{ fontSize: 10, fontFamily: "'Archivo', sans-serif", color: h === 'Closed' ? '#c62828' : '#333' }}>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Map pane */}
              <div style={{ marginTop: 12, position: 'relative', height: 150, borderRadius: 6, overflow: 'hidden', border: '1px solid #dee0e7', background: '#eef2f5', backgroundImage: 'linear-gradient(#e2e8ec 1px, transparent 1px), linear-gradient(90deg, #e2e8ec 1px, transparent 1px)', backgroundSize: '26px 26px', opacity: t > 1400 ? 1 : 0, transform: t > 1400 ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.6s ease' }}>
                <div style={{ position: 'absolute', left: '3%', top: '46%', right: '30%', height: 6, background: '#d7dee3', borderRadius: 3, transform: 'rotate(-4deg)' }} />
                <div style={{ position: 'absolute', left: '40%', top: '10%', width: 7, bottom: '10%', background: '#d7dee3', borderRadius: 3, transform: 'rotate(6deg)' }} />
                {t > 1800 && (
                  <div style={{ position: 'absolute', left: '55%', top: '52%', animation: 'locDrop 0.6s ease forwards' }}>
                    <svg width="22" height="28" viewBox="0 0 16 20"><path d="M8 0C3.6 0 0 3.6 0 8c0 5.5 8 12 8 12s8-6.5 8-12c0-4.4-3.6-8-8-8z" fill="#e53935" /><circle cx="8" cy="8" r="3" fill="#fff" /></svg>
                  </div>
                )}
                <span style={{ position: 'absolute', left: 10, bottom: 8, fontSize: 9, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Powai, Mumbai</span>
              </div>
            </div>
          )
        })()}

        {/* FRAME 2 — AUDIT */}
        {frame === 2 && (() => {
          const rows = [
            ['ConvergenSEE - Powai', '9, Central Ave, Powai', 'ok'],
            ['ConvergenSEE - Bandra', 'Linking Rd, Bandra West', 'ok'],
            ['ConvergenSEE - Andheri', 'Chakala, Andheri East', 'ok'],
            ['ConvergenSEE - Central Ave', 'Plot 24, Central Avenue, Powai, Mumbai', 'stray'],
            ['ConvergenSEE - Thane', 'Ghodbunder Rd, Thane', 'ok'],
            ['ConvergenSEE - Vashi', 'Sector 17, Vashi', 'ok'],
          ]
          const fixed = t > 2400
          return (
            <div key="l2" style={{ animation: 'locFadeUp 0.6s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', textTransform: 'uppercase' }}>Locations Setup</h3>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: 22, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, color: G, lineHeight: 1 }}>{(easeOut(t / 2400) * 92.4).toFixed(1)}%</p>
                  <p style={{ margin: 0, fontSize: 8, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac', fontWeight: 600 }}>ACCURACY</p>
                </div>
              </div>
              {/* stepper */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                {['Active Locations', 'Run Classification', 'Stray List'].map((s, i) => {
                  const done = i < 2 || fixed
                  const active = i === 2 && !fixed
                  return (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 7, flex: i < 2 ? 1 : 'none' }}>
                      <div style={{ width: 16, height: 16, borderRadius: 8, background: done ? G : '#fff', border: `2px solid ${(done || active) ? G : '#dee0e7'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {done ? <span style={{ color: '#fff', fontSize: 8, fontWeight: 800 }}>✓</span> : <span style={{ color: active ? G : '#bbb', fontSize: 8, fontWeight: 800 }}>{i + 1}</span>}
                      </div>
                      <span style={{ fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: (done || active) ? '#000718' : '#9fa3ac', whiteSpace: 'nowrap' }}>{s}</span>
                      {i < 2 && <div style={{ flex: 1, height: 2, background: G }} />}
                    </div>
                  )
                })}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f5f6f8', border: '1px solid #dee0e7', borderRadius: 4, padding: '5px 10px' }}>
                  <span style={{ fontSize: 11 }}>📄</span><span style={{ fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#333' }}>locations_batch.xlsx</span>
                </div>
                <span style={{ fontSize: 10, fontFamily: "'Archivo', sans-serif", color: G, fontWeight: 600 }}>All Process Completed ✓</span>
                <div style={{ background: '#e8fde8', border: `1px solid ${G}`, borderRadius: 4, padding: '4px 10px', fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#1b5e20' }}>Primary: 6</div>
                <div style={{ background: fixed ? '#e8fde8' : '#fff3e0', border: `1px solid ${fixed ? G : '#ffb74d'}`, borderRadius: 4, padding: '4px 10px', fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: fixed ? '#1b5e20' : '#e65100', transition: 'all 0.4s ease' }}>Stray: {fixed ? 0 : 1}</div>
              </div>
              {/* stray table */}
              <div style={{ border: '1px solid #dee0e7', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ display: 'flex', background: '#fafbfc', borderBottom: '1px solid #eee' }}>
                  <div style={{ ...th, flex: 1.2 }}>Branch</div><div style={{ ...th, flex: 1.6 }}>Excel Address</div><div style={{ ...th, flex: 1.8 }}>Google Audit Address</div><div style={{ ...th, width: 90 }}>Status</div>
                </div>
                {rows.map(([b, addr], i) => {
                  const isStray = rows[i][2] === 'stray'
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', borderBottom: i < 5 ? '1px solid #f2f2f2' : 'none', background: isStray && !fixed ? '#fdecea' : isStray && fixed ? '#e8fde8' : '#fff', transition: 'background 0.5s ease' }}>
                      <div style={{ ...td, flex: 1.2, fontWeight: 600 }}>{b}</div>
                      <div style={{ ...td, flex: 1.6 }}>{isStray ? 'Plot 24, Central Avenue, Powai, Mumbai' : addr}</div>
                      <div style={{ ...td, flex: 1.8 }}>{isStray ? '24, Central Ave, Hiranandani Gardens, Powai 400076' : addr}</div>
                      <div style={{ ...td, width: 90 }}>
                        {isStray
                          ? (fixed ? <span style={{ color: '#1b5e20', fontWeight: 800, fontSize: 10 }}>Synced ✓</span> : <span style={{ background: '#ffe0b2', color: '#e65100', fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 10 }}>STRAY</span>)
                          : <span style={{ color: '#1b5e20', fontWeight: 700, fontSize: 10 }}>Matched ✓</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <div style={{ background: t > 2600 ? G : '#f0f0f0', color: t > 2600 ? '#000' : '#bbb', fontSize: 10, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, textTransform: 'uppercase', padding: '6px 18px', borderRadius: 0, letterSpacing: 0.5, transition: 'all 0.4s ease' }}>Finish</div>
              </div>
            </div>
          )
        })()}

        {/* FRAME 3 — MANAGE (hero #1): photo fan-out + bulk update */}
        {frame === 3 && (
          <div key="l3" style={{ animation: 'locFadeUp 0.6s ease' }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', textTransform: 'uppercase' }}>Manage Locations - Photos</h3>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end' }}>
                {['GBP', 'PHOTOS', 'DETAILS'].map(tab => (
                  <span key={tab} style={{ fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: tab === 'PHOTOS' ? G : '#9fa3ac', borderBottom: tab === 'PHOTOS' ? `2px solid ${G}` : '2px solid transparent', paddingBottom: 3 }}>{tab}</span>
                ))}
              </div>
            </div>
            {/* Fan-out canvas */}
            <div style={{ position: 'relative', height: 128, marginBottom: 8 }}>
              <div style={{ position: 'absolute', inset: 0, border: `1.5px dashed ${t > 700 ? G : '#dee0e7'}`, borderRadius: 8, transition: 'border-color 0.5s ease' }} />
              {Array.from({ length: 12 }).map((_, i) => {
                const col = i % 4, row = Math.floor(i / 4)
                const fan = t > 1000
                const appear = t > 1000 + i * 80
                return (
                  <div key={i} style={{
                    position: 'absolute',
                    left: fan ? 60 + col * 250 : 430, top: fan ? 12 + row * 38 : 8,
                    width: 232, height: 30, borderRadius: 5, background: cardBg, boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    display: 'flex', alignItems: 'center', paddingLeft: 10,
                    opacity: fan ? (appear ? 1 : 0) : (i === 0 ? 1 : 0),
                    transition: 'all 0.7s cubic-bezier(0.25,0.1,0.25,1)', transitionDelay: fan ? `${i * 50}ms` : '0ms', zIndex: 12 - i,
                  }}>
                    <span style={{ fontSize: 8, fontFamily: "'Archivo', sans-serif", color: 'rgba(0,0,0,0.3)' }}>Location {i + 1}</span>
                  </div>
                )
              })}
            </div>
            {/* 312 locations row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #dee0e7', borderRadius: 6, padding: '8px 14px', marginBottom: 8, opacity: t > 2200 ? 1 : 0, transform: t > 2200 ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.6s ease' }}>
              <span style={{ fontSize: 12, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#333' }}>Storefront_Hero.jpg</span>
              <span style={{ fontSize: 11, fontFamily: "'Archivo', sans-serif", color: '#666' }}>312 locations</span>
              <span style={{ fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 800, padding: '3px 10px', borderRadius: 10, background: t > 3000 ? '#e8fde8' : '#fff8e1', color: t > 3000 ? '#1b5e20' : '#f57f17', transition: 'all 0.4s ease' }}>{t > 3000 ? 'Published ✓' : 'In Queue'}</span>
            </div>
            {/* Business details bulk sweep table */}
            <div style={{ position: 'relative', border: '1px solid #dee0e7', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ display: 'flex', background: '#fafbfc', borderBottom: '1px solid #eee' }}>
                <div style={{ ...th, flex: 1.4 }}>Business Details - Bulk Update</div><div style={{ ...th, flex: 1 }}>Field</div><div style={{ ...th, width: 90 }}>Status</div>
              </div>
              {['Powai', 'Bandra', 'Andheri', 'Thane', 'Vashi', 'Kurla', 'Dadar', 'Chembur'].map((b, i) => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', borderBottom: i < 7 ? '1px solid #f2f2f2' : 'none' }}>
                  <div style={{ ...td, flex: 1.4, fontWeight: 600, padding: '5px 12px' }}>ConvergenSEE - {b}</div>
                  <div style={{ ...td, flex: 1, padding: '5px 12px' }}>Hours · Phone · URL</div>
                  <div style={{ ...td, width: 90, padding: '5px 12px' }}><span style={{ color: t > 1400 + i * 120 ? '#1b5e20' : '#9fa3ac', fontWeight: 700, fontSize: 10, transition: 'color 0.3s ease' }}>{t > 1400 + i * 120 ? 'Updated ✓' : 'Queued'}</span></div>
                </div>
              ))}
              {t > 1400 && <div style={{ position: 'absolute', top: 0, left: 0, width: 80, height: '100%', background: 'linear-gradient(90deg, transparent, rgba(52,204,50,0.28), transparent)', animation: 'locSweep 1.8s ease-in-out infinite' }} />}
            </div>
          </div>
        )}

        {/* FRAME 4 — VERIFY */}
        {frame === 4 && (() => {
          const rows = [
            ['ConvergenSEE - Powai', 'Powai, Mumbai'],
            ['ConvergenSEE - Bandra', 'Bandra West, Mumbai'],
            ['ConvergenSEE - Andheri', 'Andheri East, Mumbai'],
            ['ConvergenSEE - Thane', 'Ghodbunder, Thane'],
            ['ConvergenSEE - Vashi', 'Vashi, Navi Mumbai'],
            ['ConvergenSEE - Kurla', 'Kurla West, Mumbai'],
          ]
          return (
            <div key="l4" style={{ animation: 'locFadeUp 0.6s ease' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 16, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', textTransform: 'uppercase' }}>Listing Verification</h3>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                {['GOOGLE', 'INDIA', 'MAHARASHTRA', 'MUMBAI'].map((f, i) => (
                  <div key={f} style={{ flex: 1, textAlign: 'center', background: i === 0 ? '#e8fde8' : '#f5f6f8', border: `1px solid ${i === 0 ? G : '#dee0e7'}`, color: i === 0 ? '#1b5e20' : '#666', fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 700, padding: '7px 4px', borderRadius: 4 }}>{f}</div>
                ))}
              </div>
              <div style={{ border: '1px solid #dee0e7', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ display: 'flex', background: '#fafbfc', borderBottom: '1px solid #eee' }}>
                  <div style={{ ...th, width: 34 }}></div><div style={{ ...th, flex: 1.4 }}>Branch</div><div style={{ ...th, flex: 1.2 }}>Location</div><div style={{ ...th, width: 130 }}>Status</div>
                </div>
                {rows.map(([b, loc], i) => {
                  const stamp = 700 + i * 430
                  const state = t >= stamp ? 2 : t >= stamp - 350 ? 1 : 0
                  const label = state === 2 ? 'Verified ✓' : state === 1 ? 'In Progress' : 'Submitted'
                  const col = state === 2 ? '#1b5e20' : state === 1 ? '#e65100' : '#9fa3ac'
                  const bg = state === 2 ? '#e8fde8' : state === 1 ? '#fff3e0' : '#f5f6f8'
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', borderBottom: i < 5 ? '1px solid #f2f2f2' : 'none' }}>
                      <div style={{ width: 34, display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: 15, height: 15, borderRadius: 3, border: `2px solid ${state === 2 ? G : '#ccc'}`, background: state === 2 ? G : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}>{state === 2 && <span style={{ color: '#fff', fontSize: 8, fontWeight: 800 }}>✓</span>}</div>
                      </div>
                      <div style={{ ...td, flex: 1.4, fontWeight: 600 }}>{b}</div>
                      <div style={{ ...td, flex: 1.2 }}>{loc}</div>
                      <div style={{ ...td, width: 130 }}><span style={{ background: bg, color: col, fontSize: 9, fontWeight: 800, padding: '3px 9px', borderRadius: 10, animation: state === 2 ? 'locPop 0.4s ease' : 'none' }}>{label}</span></div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })()}

        {/* FRAME 5 — GO LIVE (hero #2) */}
        {frame === 5 && (() => {
          const live = t > 1800
          return (
            <div key="l5" style={{ animation: 'locFadeUp 0.6s ease', display: 'flex', gap: 18 }}>
              {/* Left: tiles + ripple map */}
              <div style={{ flex: 1.3, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[['Claimed', formatIN(easeOut(t / 2000) * 42318)], ['Pushed to GBP', formatIN(easeOut(t / 2200) * 42318)], ['Audited all', '92.4%']].map(([l, v]) => (
                    <div key={l} style={{ flex: 1, background: '#f5f6f8', border: '1px solid #dee0e7', borderRadius: 6, padding: '10px 12px' }}>
                      <p style={{ margin: 0, fontSize: 18, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, color: '#000718', lineHeight: 1 }}>{v}</p>
                      <p style={{ margin: '4px 0 0', fontSize: 8, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac', fontWeight: 600, textTransform: 'uppercase' }}>{l}</p>
                    </div>
                  ))}
                </div>
                <div style={{ position: 'relative', flex: 1, minHeight: 150, borderRadius: 6, overflow: 'hidden', border: '1px solid #dee0e7', background: '#eef2f5', backgroundImage: 'linear-gradient(#e2e8ec 1px, transparent 1px), linear-gradient(90deg, #e2e8ec 1px, transparent 1px)', backgroundSize: '26px 26px' }}>
                  {[[50, 50], [30, 34], [70, 40], [40, 68], [64, 66], [22, 56], [80, 58]].map(([x, y], i) => (
                    <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, animation: `locDrop 0.5s ease forwards ${300 + i * 130}ms`, opacity: 0 }}>
                      <svg width="15" height="19" viewBox="0 0 16 20"><path d="M8 0C3.6 0 0 3.6 0 8c0 5.5 8 12 8 12s8-6.5 8-12c0-4.4-3.6-8-8-8z" fill={G} /><circle cx="8" cy="8" r="3" fill="#fff" /></svg>
                    </div>
                  ))}
                  {live && [0, 1, 2].map(i => (
                    <div key={i} style={{ position: 'absolute', left: '50%', top: '50%', width: 160, height: 160, borderRadius: '50%', border: `2px solid ${G}`, animation: `locRipple 1.8s ease-out infinite ${i * 500}ms` }} />
                  ))}
                </div>
              </div>
              {/* Right: phone knowledge panel */}
              <div style={{ flex: 0.85, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', opacity: t > 400 ? 1 : 0, transform: t > 400 ? 'translateX(0)' : 'translateX(40px)', transition: 'all 0.7s cubic-bezier(0.25,0.1,0.25,1)' }}>
                <div style={{ width: 214, background: '#1a1a2e', borderRadius: 26, padding: 8, boxShadow: '0 10px 30px rgba(0,0,0,0.25)', position: 'relative' }}>
                  <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden' }}>
                    <div style={{ height: 74, background: cardBg }} />
                    <div style={{ padding: '10px 12px' }}>
                      <p style={{ margin: 0, fontSize: 12, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#222' }}>ConvergenSEE - Powai, Mumbai</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, margin: '4px 0 8px' }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#222' }}>4.6</span>
                        <span style={{ color: '#f5a623', fontSize: 10 }}>★★★★<span style={{ color: '#ddd' }}>★</span></span>
                        <span style={{ fontSize: 9, color: '#666' }}>· 512 reviews</span>
                      </div>
                      <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                        {[0, 1, 2].map(i => <div key={i} style={{ flex: 1, height: 26, borderRadius: 3, background: cardBg }} />)}
                      </div>
                      <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                        {['Directions', 'Reviews'].map(x => <div key={x} style={{ flex: 1, textAlign: 'center', border: `1px solid ${G}`, color: '#1b5e20', fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, padding: '4px 0', borderRadius: 12 }}>{x}</div>)}
                      </div>
                      <p style={{ margin: '0 0 2px', fontSize: 9, fontFamily: "'Archivo', sans-serif", color: '#555' }}>Central Avenue, Powai, Mumbai 400076</p>
                      <p style={{ margin: 0, fontSize: 9, fontFamily: "'Archivo', sans-serif", color: '#1b5e20', fontWeight: 700 }}>Open now · 9 AM – 9 PM</p>
                    </div>
                  </div>
                  {live && (
                    <div style={{ position: 'absolute', top: '46%', left: '50%', transform: 'translate(-50%,-50%) rotate(-8deg)', background: G, color: '#03210a', fontSize: 13, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, padding: '7px 16px', borderRadius: 4, boxShadow: '0 6px 18px rgba(0,0,0,0.3)', whiteSpace: 'nowrap', animation: 'locStamp 0.6s cubic-bezier(0.25,0.1,0.25,1) forwards' }}>Live on Google ✓</div>
                  )}
                </div>
              </div>
            </div>
          )
        })()}

        {/* FRAME 6 — OPTIMISE */}
        {frame === 6 && (
          <div key="l6" style={{ animation: 'locFadeUp 0.6s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', textTransform: 'uppercase' }}>Optima - Recommendations</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 9, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac', fontWeight: 600 }}>{t > 1200 ? '63%' : '60%'}</span>
                <div style={{ width: 80, height: 5, background: '#e0e0e0', borderRadius: 3, overflow: 'hidden' }}><div style={{ height: '100%', background: G, width: t > 1200 ? '63%' : '60%', transition: 'width 0.8s ease', borderRadius: 3 }} /></div>
              </div>
            </div>
            {[['HIGH', '#c62828', '#fdecea', '7 locations have no new reviews in 30 days', '48% of consumers only trust reviews from the past 2 weeks'],
              ['MED', '#e65100', '#fff3e0', '4 listings missing category tags', 'Complete categories rank 2x more often in Map Pack'],
              ['LOW', '#1b5e20', '#e8fde8', 'Add 12 more photos to Andheri branch', 'Listings with 10+ photos get 42% more direction requests']].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #dee0e7', borderRadius: 6, padding: '9px 14px', marginBottom: 8, opacity: t > 200 + i * 250 ? 1 : 0, transform: t > 200 + i * 250 ? 'translateX(0)' : 'translateX(-14px)', transition: 'all 0.5s ease' }}>
                <span style={{ background: r[2], color: r[1], fontSize: 9, fontWeight: 800, padding: '3px 9px', borderRadius: 10, minWidth: 34, textAlign: 'center' }}>{r[0]}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 12, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#333' }}>{r[3]}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>{r[4]}</p>
                </div>
              </div>
            ))}
            {/* review response */}
            <div style={{ border: '1px solid #dee0e7', borderRadius: 6, padding: 11, marginTop: 2, opacity: t > 1600 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 22, height: 22, borderRadius: 11, background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: '#4453c9' }}>RS</div>
                <span style={{ fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#333' }}>Riya S.</span>
                <span style={{ color: '#f5a623', fontSize: 11 }}>★★<span style={{ color: '#ddd' }}>☆</span></span>
                <span style={{ marginLeft: 'auto', fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 800, padding: '2px 8px', borderRadius: 10, background: t > 2800 ? '#e8fde8' : '#f0f0f0', color: t > 2800 ? '#1b5e20' : '#9fa3ac', transition: 'all 0.4s ease' }}>{t > 2800 ? 'Positive' : 'Neutral'}</span>
              </div>
              {t > 1800 && (
                <div style={{ background: '#f5f6f8', borderRadius: 4, padding: '7px 10px', fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#333', lineHeight: '15px' }}>
                  {'Thank you for the feedback, Riya! Our Powai team will make it right on your next visit.'.slice(0, Math.max(0, Math.floor((t - 1800) / 16)))}
                  {t < 3400 && <span style={{ animation: 'locBlink 0.8s infinite', color: G }}>|</span>}
                </div>
              )}
            </div>
          </div>
        )}

        {/* FRAME 7 — PERFORM */}
        {frame === 7 && (
          <div key="l7" style={{ animation: 'locFadeUp 0.6s ease' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 16, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', textTransform: 'uppercase' }}>Local Analytics - Google Business Profile</h3>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1.5, border: '1px solid #dee0e7', borderRadius: 6, padding: 14 }}>
                <p style={{ margin: '0 0 8px', fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase' }}>Customer Actions</p>
                <svg viewBox="0 0 300 150" style={{ width: '100%', height: 168 }}>
                  {[['M0 120 C50 110 90 86 150 80 S250 46 300 28', G], ['M0 134 C60 128 100 112 160 106 S255 84 300 70', '#7bc3ff'], ['M0 142 C60 140 110 132 170 128 S260 116 300 108', '#ffb74d']].map(([d, c], i) => (
                    <path key={i} d={d} fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" style={{ strokeDasharray: 600, strokeDashoffset: 600, animation: `locDraw 1.4s ease forwards ${i * 200}ms` }} />
                  ))}
                </svg>
                <p style={{ margin: '6px 0 0', fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#666' }}>Total actions: <strong style={{ color: '#333' }}>{formatIN(easeOut(t / 2400) * 1908224)}</strong></p>
              </div>
              <div style={{ flex: 1, border: '1px solid #dee0e7', borderRadius: 6, padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ margin: '0 0 4px', fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase' }}>Total Impressions</p>
                <p style={{ margin: '0 0 14px', fontSize: 28, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, color: '#000718', lineHeight: 1 }}>{formatIN(easeOut(t / 2200) * 8431520)}</p>
                {t > 2200 && (
                  <div style={{ animation: 'locFadeUp 0.6s ease', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 15 }}>💻</span>
                      <div style={{ flex: 1, height: 9, background: '#eef0f3', borderRadius: 4, overflow: 'hidden' }}><div style={{ width: '13%', height: '100%', background: '#7bc3ff', borderRadius: 4 }} /></div>
                      <span style={{ fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>13%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 15 }}>📱</span>
                      <div style={{ flex: 1, height: 9, background: '#eef0f3', borderRadius: 4, overflow: 'hidden' }}><div style={{ width: '87%', height: '100%', background: G, borderRadius: 4 }} /></div>
                      <span style={{ fontSize: 13, fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: G }}>87%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* FRAME 8 — CLOSE */}
        {frame === 8 && (
          <div key="l8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', animation: 'locFadeUp 0.7s ease' }}>
            <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 32, color: '#000718', textTransform: 'uppercase', margin: '0 0 6px', lineHeight: 1.05 }}>
              10 stores or <span style={{ color: G }}>10,000</span>.<br />One dashboard.
            </p>
            <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 13, color: '#666', margin: '10px 0 18px' }}>Manage your Local Presence at scale.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: G, letterSpacing: 1 }}>LocateIT</span>
              <span style={{ width: 1, height: 22, background: '#dee0e7' }} />
              <span style={{ fontFamily: "'Archivo', sans-serif", fontSize: 11, color: '#9fa3ac' }}>CHNC ▸ ConvergenSEE</span>
            </div>
          </div>
        )}

        {/* FRAME 0 — idle */}
        {frame === 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
            <div style={{ animation: 'locFadeUp 0.5s ease' }}>
              <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: G, textTransform: 'uppercase', margin: '0 0 6px' }}>LocateIT</p>
              <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: '#666', margin: 0 }}>Local Presence Management at scale</p>
            </div>
          </div>
        )}
      </div>

      {/* Lower-third overlay band — full width, sharp corners, 2px green top rule */}
      {overlay && (
        <div key={`band-${frame}`} style={{
          background: 'rgba(0,7,24,0.95)', borderTop: `2px solid ${G}`, padding: '11px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          animation: 'locBandUp 0.5s ease',
        }}>
          <p style={{ margin: 0, fontSize: 13, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#fff' }}>{overlay.main}</p>
          <p style={{ margin: 0, fontSize: 10, fontFamily: "'Archivo', sans-serif", color: G, fontWeight: 500 }}>{overlay.sub}</p>
        </div>
      )}
    </div>
  )
}

// ─── SocialiseIT content ──────────────────────────────────────────────────────
function SocialiseContent({ controls, tileVariants }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'flex-start', width: 1119 }}>
      <StatTiles tiles={MODULES.SocialiseIT.tiles} controls={controls} tileVariants={tileVariants} />
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <CTACard headline="Grow your brand across every social platform!" sub="Schedule, publish and track posts across Instagram, Facebook, Twitter & LinkedIn." cta="New Post" controls={controls} custom={0} />
        <ChartCard title="Platform Reach" controls={controls} custom={1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <HorizRow label="Instagram" value={1.4} max={2.9} unit="M" />
            <HorizRow label="Facebook" value={0.9} max={2.9} unit="M" />
            <HorizRow label="LinkedIn" value={0.4} max={2.9} unit="M" />
            <HorizRow label="Twitter / X" value={0.2} max={2.9} unit="M" />
          </div>
        </ChartCard>
        <ChartCard title="7-Day Engagement" controls={controls} custom={2}>
          <VertBars data={[{l:'Mon',v:4.2},{l:'Tue',v:5.8},{l:'Wed',v:6.1},{l:'Thu',v:4.9},{l:'Fri',v:7.2},{l:'Sat',v:8.4},{l:'Sun',v:6.7}]} height={200} />
        </ChartCard>
      </div>
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <ListCard title="Scheduled Posts" rows={[
          { isPen: true, label: 'XUV700 Weekend Reel', sub: 'Instagram · 20 Mar 10:00' },
          { isPen: true, label: 'Mahindra Origins Story', sub: 'Facebook · 21 Mar 12:00' },
          { isPen: true, label: 'Thar Adventure Poll', sub: 'Twitter · 21 Mar 15:00' },
          { isPen: true, label: 'BE6 Launch Countdown', sub: 'LinkedIn · 22 Mar 09:00' },
          { isPen: true, label: 'XEV9e Sustainability Post', sub: 'Instagram · 23 Mar 11:00' },
        ]} />
        <ListCard title="Top Posts This Month" rows={[
          { isPen: true, label: 'XUV700 Thrill Reel', sub: '2.1M reach · 8.4% eng.' },
          { isPen: true, label: 'BE6 Feature Reveal', sub: '1.8M reach · 7.2% eng.' },
          { isPen: true, label: 'Mahindra 75 Years Post', sub: '1.4M reach · 9.1% eng.' },
          { isPen: true, label: 'Thar Off-Road Video', sub: '980K reach · 6.8% eng.' },
          { isPen: true, label: 'Scorpio-N Launch Live', sub: '3.2M reach · 11.4% eng.' },
        ]} />
      </div>
    </div>
  )
}

// ─── InfluenceIT content ──────────────────────────────────────────────────────
function InfluenceContent({ controls, tileVariants }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'flex-start', width: 1119 }}>
      <StatTiles tiles={MODULES.InfluenceIT.tiles} controls={controls} tileVariants={tileVariants} />
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <CTACard headline="Amplify reach through authentic influencer partnerships!" sub="Discover, brief and manage influencers from micro to mega tier." cta="Find Influencers" controls={controls} custom={0} />
        <ChartCard title="Tier Breakdown" controls={controls} custom={1} h={296}>
          <FunnelViz stages={[{l:'Mega (1M+)',v:'3'},{l:'Macro (100K+)',v:'9'},{l:'Micro (10K+)',v:'24'},{l:'Nano (<10K)',v:'12'}]} />
        </ChartCard>
        <ChartCard title="Campaign Performance" controls={controls} custom={2}>
          <VertBars data={[{l:'XUV700',v:6.1},{l:'Thar',v:5.4},{l:'BE6',v:7.8},{l:'Scorpio',v:4.9},{l:'XEV9e',v:6.6}]} height={200} />
        </ChartCard>
      </div>
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <ListCard title="Active Influencers" rows={[
          { isPen: true, label: '@RoadsideGypsy · Travel', sub: '2.1M followers · 6.4% eng.' },
          { isPen: true, label: '@MotoVlogs India · Auto', sub: '890K followers · 8.2% eng.' },
          { isPen: true, label: '@AdventureWithSam · Outdoors', sub: '340K followers · 7.1% eng.' },
          { isPen: true, label: '@CityDrivesMumbai · Lifestyle', sub: '125K followers · 5.9% eng.' },
          { isPen: true, label: '@TechAndWheels · Tech', sub: '78K followers · 9.3% eng.' },
        ]} />
        <ListCard title="Pending Briefs" rows={[
          { isPen: true, label: 'BE6 Review Brief', sub: 'Sent to 4 influencers' },
          { isPen: true, label: 'XEV9e EV Experience', sub: 'Sent to 6 influencers' },
          { isPen: true, label: 'Thar Night Drive', sub: 'Awaiting 2 responses' },
          { isPen: true, label: 'Scorpio-N Promo', sub: 'Draft – not sent' },
        ]} />
      </div>
    </div>
  )
}

// ─── ScriptIT animated walkthrough (Brief → Shoot-ready) ──────────────────────
// 7-frame product reel: BRIEF → ALIGN → SCRIPT → BREAKDOWN → PREVIEW → APPROVE → CLOSE
// Fully fictionalized: Horizon Motors campaign, generic initials for staff.
function StoryArt({ hue = 150, style }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 5, background: `linear-gradient(135deg, hsl(${hue}, 36%, 80%), hsl(${hue + 30}, 30%, 56%))`, ...style }}>
      <svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <path d="M0 40 h22 v-14 h14 v20 h18 v-26 h16 v22 h20 v-12 h18 v18 h24 v-9 h28" fill="none" stroke="rgba(0,7,24,0.3)" strokeWidth="2" />
        {[[30, 20], [62, 12], [98, 24], [130, 26], [148, 18]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.6" fill="rgba(255,255,255,0.85)" />
        ))}
        <path d="M0 80 L160 72" stroke="rgba(0,7,24,0.22)" strokeWidth="2" />
        <path d="M48 68 q6 -11 19 -11 h21 q10 0 17 8 l9 2 q4 1 4 5 v4 h-70 z" fill="rgba(0,7,24,0.42)" />
        <circle cx="62" cy="80" r="5" fill="rgba(0,7,24,0.55)" />
        <circle cx="104" cy="80" r="5" fill="rgba(0,7,24,0.55)" />
        <circle cx="118" cy="70" r="2.2" fill="rgba(255,244,180,0.95)" />
      </svg>
    </div>
  )
}

function ScriptWorkflowContent({ controls, tileVariants, stepCount = 0, onFrame, onCursor }) {
  const G = '#34cc32'

  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setElapsed(e => e + 60), 60)
    return () => clearInterval(id)
  }, [])

  // Frame: 0 idle 1 Brief 2 Align 3 Script 4 Breakdown(hero) 5 Preview(hero) 6 Approve 7 Close
  const timeline = [0, 500, 4500, 8500, 13500, 18500, 23500, 27500, 31000]
  const totalDuration = 31000
  const looped = elapsed % totalDuration

  let frame = 0, t = 0
  for (let i = timeline.length - 1; i >= 0; i--) {
    if (looped >= timeline[i]) { frame = i; t = looped - timeline[i]; break }
  }

  useEffect(() => { if (onFrame) onFrame(frame) }, [frame, onFrame])

  // Cursor — rides each action. Per frame: path = [switchTime, x, y] waypoints timed so the
  // 0.65s glide lands ON the element as its action fires; clicks pulse a ring at the tip.
  const cursorScript = {
    1: { path: [[0, 250, 139], [650, 250, 220], [1050, 742, 134], [1750, 725, 189], [2600, 1054, 350]], clicks: [1700, 2400, 3300] },
    2: { path: [[0, 1020, 85], [850, 985, 161], [1850, 985, 211], [2550, 985, 261]], clicks: [700] },
    3: { path: [[0, 756, 140], [400, 970, 215], [900, 690, 280], [1700, 780, 335], [2600, 868, 386], [3300, 324, 146], [3900, 324, 250]], clicks: [1600, 3250] },
    4: { path: [[0, 520, 125], [700, 765, 155], [1800, 527, 247], [2700, 765, 350], [3400, 765, 414]], clicks: [650] },
    5: { path: [[0, 1035, 86], [700, 225, 191], [1400, 225, 268], [2200, 225, 345], [2900, 225, 191]], clicks: [660, 3560] },
    6: { path: [[0, 1040, 157], [500, 1040, 206], [950, 1040, 255], [1400, 1040, 304], [1750, 498, 110], [2750, 1054, 254]], clicks: [2450, 3450] },
  }
  const seg = cursorScript[frame]
  let cx = 400, cy = 240
  if (seg) for (const [ts, x, y] of seg.path) { if (t >= ts) { cx = x; cy = y } }
  const cursorClick = seg ? seg.clicks.find(c => t >= c && t < c + 500) : undefined

  // Camera (variable-depth rig in CHNCDashboard): windows of [start, end, zoom,
  // fx?, fy?] — fx/fy frame a fixed point instead of the cursor. ONE depth per
  // beat; gaps between windows pull back full-frame (frame transitions, the
  // script cards landing, the drawer slide, the final-uploads tab cut, the
  // close). Tight on the brief form and generate panel, default on the Q&A /
  // preview / approval tables, medium fixed on the breakdown drawer tour.
  const CAM = {
    1: [[400, 3000, 1.85]],
    2: [[500, 3400, 1.3, 560, 235]],
    3: [[400, 2900, 1.85]],
    4: [[1600, 4400, 1.5, 790, 280]],
    5: [[800, 4300, 1.65]],
    6: [[400, 2100, 1.3, 560, 235]],
  }
  const camWin = CAM[frame] && CAM[frame].find(([a, b]) => t >= a && t < b)
  const camZ = camWin ? camWin[2] : 0
  const camX = camWin ? (camWin[3] ?? cx) : 0
  const camY = camWin ? (camWin[4] ?? cy) : 0
  useEffect(() => {
    if (!onCursor) return
    onCursor(camZ ? { x: camX, y: camY, z: camZ } : null)
    return () => onCursor(null)
  }, [camZ, camX, camY, onCursor])

  const overlays = [
    null,
    { main: 'Step 1. Brief the shot.', sub: 'Idea, platform, deadline - one form.' },
    { main: 'Step 2. Align before anyone shoots.', sub: 'Questions asked. Answers locked.' },
    { main: 'Step 3. Scripts, written by dual AI.', sub: 'Two engines. Multiple drafts. Pick one.' },
    { main: 'Step 4. Scene-by-scene shooting directions.', sub: 'Your creators know exactly what to shoot.' },
    { main: 'Step 5. AI previews every shot.', sub: 'See the film before the shoot.' },
    { main: 'Step 6. Approve. Stitch. Deliver.', sub: 'Every stage signed off - nothing off-brand.' },
    { main: 'Brief in. Shoot-ready out.', sub: 'Scripts, storyboards, shot lists & AI previews - one flow.' },
  ]
  const overlay = overlays[frame]

  const crumbs = [
    '', 'ScriptIT ▸ Create ▸ Create New Shot', 'ScriptIT ▸ Create ▸ Requirements',
    'ScriptIT ▸ Create ▸ Generate Script', 'ScriptIT ▸ Create ▸ Shot Breakdown',
    'ScriptIT ▸ Create ▸ Video Generation', 'ScriptIT ▸ Approve ▸ Campaign', 'ScriptIT',
  ]
  const crumb = frame === 6 && t > 2400 ? 'ScriptIT ▸ Create ▸ Final Uploads' : crumbs[frame]

  const stepLabels = ['SHOT DETAILS', 'REQUIREMENTS', 'SCRIPT', 'BREAKDOWN', 'VIDEO', 'UPLOAD']
  const ringPct = frame === 0 ? 0 : frame >= 7 ? 100 : Math.min((frame - 1) * 20 + (frame === 6 && t > 2400 ? 20 : 0), 100)
  const RING_R = 13, RING_C = 2 * Math.PI * RING_R

  const h3s = { margin: 0, fontSize: 16, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', textTransform: 'uppercase' }
  const btnG = { background: G, color: '#000718', fontSize: 10, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, textTransform: 'uppercase', padding: '6px 14px', borderRadius: 0, letterSpacing: 0.5, whiteSpace: 'nowrap' }
  const btnO = { background: '#fff', color: '#000718', border: '1px solid #dee0e7', fontSize: 10, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, textTransform: 'uppercase', padding: '5px 13px', borderRadius: 0, letterSpacing: 0.5, whiteSpace: 'nowrap' }
  const pillBase = { fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 800, padding: '3px 9px', borderRadius: 10, whiteSpace: 'nowrap' }
  const lbl = { fontSize: 10, color: '#9fa3ac', fontFamily: "'Archivo', sans-serif", fontWeight: 600, display: 'block', marginBottom: 4 }
  const th = { fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase', letterSpacing: 0.4, padding: '7px 12px', textAlign: 'left' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 1119, position: 'relative', height: '100%' }}>
      <style>{`
        @keyframes scrFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scrBlink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes scrPop { 0% { transform: scale(0.6); opacity: 0; } 60% { transform: scale(1.12); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes scrToast { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scrWipe { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0 0 0% 0); } }
        @keyframes scrLand { 0% { opacity: 0; transform: translateY(16px) scale(0.96); } 70% { transform: translateY(-2px) scale(1.01); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes scrPulse { 0% { box-shadow: 0 0 0 0 rgba(52,204,50,0.55); } 100% { box-shadow: 0 0 0 14px rgba(52,204,50,0); } }
        @keyframes scrPlayPulse { 0% { transform: scale(0.6); opacity: 0; } 45% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes scrDrawer { from { transform: translateX(105%); } to { transform: translateX(0); } }
        @keyframes scrBandUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scrClick { 0% { transform: scale(0.25); opacity: 0.9; } 100% { transform: scale(1.3); opacity: 0; } }
      `}</style>

      {/* Wizard stepper + ring + Save & Exit */}
      {frame >= 1 && frame <= 6 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 6 }}>
            {stepLabels.map((s, i) => {
              const done = i < frame - 1 || (frame === 6 && t > 2400)
              const cur = i === frame - 1 && !done
              return (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5, flex: i < 5 ? 1 : 'none', minWidth: 0 }}>
                  <div style={{ width: 17, height: 17, borderRadius: 9, background: done ? G : '#fff', border: `2px solid ${done || cur ? G : '#dee0e7'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.4s ease' }}>
                    {done ? <span style={{ color: '#fff', fontSize: 8, fontWeight: 800 }}>✓</span> : <span style={{ color: cur ? G : '#bbb', fontSize: 8, fontWeight: 800 }}>{i + 1}</span>}
                  </div>
                  <span style={{ fontSize: 8, fontFamily: "'Archivo', sans-serif", fontWeight: 700, letterSpacing: 0.3, color: done || cur ? '#000718' : '#9fa3ac', whiteSpace: 'nowrap' }}>{s}</span>
                  {i < 5 && <div style={{ flex: 1, height: 2, background: done ? G : '#e6e8ee', transition: 'background 0.5s ease', minWidth: 8 }} />}
                </div>
              )
            })}
          </div>
          <span style={{ fontSize: 8, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac', whiteSpace: 'nowrap' }}>Last saved just now</span>
          <svg width="34" height="34" style={{ flexShrink: 0 }}>
            <circle cx="17" cy="17" r={RING_R} stroke="#e6e8ee" strokeWidth="3.5" fill="none" />
            <circle cx="17" cy="17" r={RING_R} stroke={G} strokeWidth="3.5" fill="none" strokeLinecap="round"
              strokeDasharray={RING_C} strokeDashoffset={RING_C * (1 - ringPct / 100)}
              transform="rotate(-90 17 17)" style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(0.25,0.1,0.25,1)' }} />
            <text x="17" y="20.5" textAnchor="middle" fontSize="8.5" fontWeight="800" fontFamily="Archivo" fill="#000718">{ringPct}</text>
          </svg>
          <div style={btnG}>Save &amp; Exit</div>
        </div>
      )}

      {/* Cursor */}
      {frame > 0 && frame <= 6 && (
        <div style={{
          position: 'absolute', left: 0, top: 0, transform: `translate(${cx}px, ${cy}px)`, zIndex: 200,
          transition: 'transform 0.65s cubic-bezier(0.25,0.1,0.25,1)', willChange: 'transform',
          pointerEvents: 'none',
        }}>
          {cursorClick !== undefined && (
            <span key={cursorClick} style={{ position: 'absolute', left: -15, top: -15, width: 30, height: 30, borderRadius: '50%', border: `2.5px solid ${G}`, animation: 'scrClick 0.5s ease-out forwards' }} />
          )}
          <svg width="16" height="22" viewBox="0 0 14 19" fill="none">
            <path d="M0 0V18L4.5 13.5L8 19L10 18L6.5 12.5H13L0 0Z" fill="#000" stroke="#fff" strokeWidth="1" />
          </svg>
        </div>
      )}

      {/* Success toast (Frame 2) */}
      {frame === 2 && t > 1600 && (
        <div style={{ position: 'absolute', right: 18, bottom: 52, zIndex: 150, background: '#fff', border: `1px solid ${G}`, borderLeft: `4px solid ${G}`, boxShadow: '0 8px 24px rgba(0,0,0,0.18)', padding: '8px 14px', borderRadius: 4, animation: 'scrToast 0.45s cubic-bezier(0.25,0.1,0.25,1)', opacity: t > 3400 ? 0 : 1, transition: 'opacity 0.4s ease' }}>
          <p style={{ margin: 0, fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#1b5e20' }}>Success!</p>
          <p style={{ margin: '2px 0 0', fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#555' }}>Question saved successfully.</p>
        </div>
      )}

      {/* Content area */}
      <div style={{ flex: 1, padding: '10px 24px', overflow: 'hidden', position: 'relative' }}>

        {frame > 0 && frame < 7 && (
          <p style={{ margin: '0 0 8px', fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac', fontWeight: 600 }}>
            {crumb.split('▸').map((c, i, a) => (
              <span key={i} style={{ color: i === a.length - 1 ? G : '#9fa3ac' }}>{c}{i < a.length - 1 ? ' ▸ ' : ''}</span>
            ))}
          </p>
        )}

        {/* FRAME 1 — BRIEF: Shot Details form fills itself */}
        {frame === 1 && (() => {
          const title = 'Horizon Motors - Festive Drive Reel'.slice(0, Math.max(0, Math.floor(t / 35)))
          const titleDone = t > 1250
          const idea = '30s festive reel: family homecoming, city lights, the new SUV'.slice(0, Math.max(0, Math.floor((t - 1100) / 20)))
          const ideaDone = t > 2350
          const chip = (on, label, at) => (
            <span key={label} style={{
              ...pillBase, fontSize: 10, padding: '5px 12px', borderRadius: 14,
              background: on && t > at ? '#e8fde8' : '#f5f6f8',
              border: `1px solid ${on && t > at ? G : '#dee0e7'}`,
              color: on && t > at ? '#1b5e20' : '#666',
              fontWeight: on && t > at ? 800 : 600,
              animation: on && t > at ? 'scrPop 0.45s ease' : 'none',
            }}>{label}</span>
          )
          const pressed = t > 3300 && t < 3700
          return (
            <div key="s1" style={{ animation: 'scrFadeUp 0.6s ease' }}>
              <h3 style={{ ...h3s, marginBottom: 12 }}>Create New Shot - Shot Details</h3>
              <div style={{ display: 'flex', gap: 18 }}>
                <div style={{ flex: 1.25, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <label style={lbl}>Shot Project Title</label>
                    <div style={{ border: `1.5px solid ${titleDone ? G : '#dee0e7'}`, padding: '9px 12px', fontSize: 12.5, fontFamily: "'Archivo', sans-serif", color: '#333', borderRadius: 2, transition: 'border-color 0.5s ease', minHeight: 17 }}>
                      {title}{!titleDone && <span style={{ animation: 'scrBlink 0.8s infinite', color: G }}>|</span>}
                    </div>
                  </div>
                  <div>
                    <label style={lbl}>Describe Your Idea</label>
                    <div style={{ border: `1.5px solid ${ideaDone ? G : '#dee0e7'}`, padding: '9px 12px', fontSize: 11.5, fontFamily: "'Archivo', sans-serif", color: '#333', borderRadius: 2, minHeight: 50, lineHeight: '17px', transition: 'border-color 0.5s ease' }}>
                      {idea}{t > 1100 && !ideaDone && <span style={{ animation: 'scrBlink 0.8s infinite', color: G }}>|</span>}
                    </div>
                  </div>
                  <div style={{ opacity: t > 2600 ? 1 : 0, transform: t > 2600 ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.5s ease' }}>
                    <label style={lbl}>Schedule</label>
                    <div style={{ border: `1.5px solid ${G}`, padding: '9px 12px', fontSize: 12, fontFamily: "'Archivo', sans-serif", color: '#333', borderRadius: 2 }}>01 Oct 2025 → 14 Oct 2025</div>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <label style={lbl}>Platform</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {chip(false, 'Google', 0)}{chip(true, 'Instagram', 1700)}{chip(false, 'LinkedIn', 0)}
                    </div>
                  </div>
                  <div>
                    <label style={lbl}>Media</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {chip(false, 'Image', 0)}{chip(true, 'Video', 2000)}
                    </div>
                  </div>
                  <div>
                    <label style={lbl}>Region</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {chip(true, 'PAN India', 2300)}{chip(false, 'By State', 0)}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                <span style={{ fontSize: 9, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Draft auto-saved</span>
                <div style={{ ...btnG, padding: '7px 26px', background: t > 2900 ? G : '#f0f0f0', color: t > 2900 ? '#000718' : '#bbb', transform: pressed ? 'scale(0.93)' : 'scale(1)', transition: 'all 0.2s ease' }}>Next</div>
              </div>
            </div>
          )
        })()}

        {/* FRAME 2 — ALIGN: Requirements Q&A */}
        {frame === 2 && (() => {
          const rows = [
            ['When is this campaign?', 'A. Sharma', 'AS', 1400, 'Diwali week - 18–23 Oct, PAN India'],
            ['Which SUV variant do we feature?', 'R. V.', 'RV', 2400, 'Top trim - city + highway shots'],
            ['Any brand lines to include?', 'A. Sharma', 'AS', 3100, '“Lights on. Horizon on.”'],
          ]
          return (
            <div key="s2" style={{ animation: 'scrFadeUp 0.6s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={h3s}>Requirements - Shot Questions &amp; Answers</h3>
                <div style={btnG}>Assign Questions</div>
              </div>
              <div style={{ border: '1px solid #dee0e7', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ display: 'flex', background: '#fafbfc', borderBottom: '1px solid #eee' }}>
                  <div style={{ ...th, flex: 1.6 }}>Question</div><div style={{ ...th, width: 130 }}>Assigned To</div><div style={{ ...th, width: 150 }}>Status</div>
                </div>
                {rows.map(([q, who, ini, at, ans], i) => {
                  const answered = t >= at
                  const show = t > 300 + i * 300
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', borderBottom: i < 2 ? '1px solid #f2f2f2' : 'none', opacity: show ? 1 : 0, transform: show ? 'translateX(0)' : 'translateX(-14px)', transition: 'all 0.5s ease', padding: '9px 0' }}>
                      <div style={{ flex: 1.6, padding: '0 12px' }}>
                        <p style={{ margin: 0, fontSize: 12, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#333' }}>{q}</p>
                        {answered && <p style={{ margin: '3px 0 0', fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#1b5e20', animation: 'scrFadeUp 0.4s ease' }}>{ans}</p>}
                      </div>
                      <div style={{ width: 130, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 20, height: 20, borderRadius: 10, background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 800, color: '#4453c9', flexShrink: 0 }}>{ini}</div>
                        <span style={{ fontSize: 10.5, fontFamily: "'Archivo', sans-serif", color: '#555', whiteSpace: 'nowrap' }}>{who}</span>
                      </div>
                      <div style={{ width: 150, padding: '0 12px' }}>
                        {answered
                          ? <span style={{ ...pillBase, background: '#e8fde8', color: '#1b5e20', animation: 'scrPop 0.4s ease' }}>Answered ✓</span>
                          : <span style={{ ...pillBase, background: '#f5f6f8', color: '#9fa3ac' }}>Waiting for answer</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })()}

        {/* FRAME 3 — SCRIPT: dual-AI script generation */}
        {frame === 3 && (() => {
          const prompt = 'A festive homecoming that ends at the new Horizon SUV.'.slice(0, Math.max(0, Math.floor((t - 2000) / 18)))
          const promptDone = t > 3000
          const pressed = t > 3100 && t < 3400
          const dets = [['Genre', 'Festive', 200], ['Duration', '30 secs', 500], ['Language', 'English + Hindi', 800], ['No. of Scripts', '2', 1100], ['Location', 'Showroom', 1500], ['Time of Day', 'Evening', 1700]]
          const provs = [['OpenAI', 1300], ['Gemini 3 Pro', 1600], ['Perplexity Sonar', null]]
          const cards = [['The Homecoming Drive', 'Script via OpenAI', 3600], ['Lights On', 'Script via Gemini 3 Pro', 4100]]
          return (
            <div key="s3" style={{ animation: 'scrFadeUp 0.6s ease', display: 'flex', gap: 16 }}>
              <div style={{ flex: 1.35, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <h3 style={h3s}>Generate Script</h3>
                {t <= 3600 && (
                  <div style={{ flex: 1, minHeight: 200, border: '1.5px dashed #dee0e7', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ margin: 0, fontSize: 12, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Waiting for magic ✦</p>
                  </div>
                )}
                {cards.map(([cTitle, via, at]) => t > at && (
                  <div key={cTitle} style={{ border: '1px solid #dee0e7', borderRadius: 6, padding: '11px 14px', animation: 'scrLand 0.55s cubic-bezier(0.25,0.1,0.25,1)', boxShadow: '0 4px 14px rgba(0,0,0,0.07)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                      <p style={{ margin: 0, fontSize: 13, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#000718' }}>{cTitle}</p>
                      <span style={{ ...pillBase, background: '#e8fde8', color: '#1b5e20' }}>Completed</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 9.5, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>{via} · ENGLISH | 30 SECS | INTERIOR | EVENING</p>
                    <div style={{ display: 'flex', gap: 8, marginTop: 9 }}>
                      <div style={btnO}>Preview</div>
                      <div style={btnG}>Send for Approval</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, border: '1px solid #dee0e7', borderRadius: 6, padding: 12 }}>
                <p style={{ margin: '0 0 8px', fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase', letterSpacing: 0.4 }}>Enter Details</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                  {dets.map(([l, v, at]) => (
                    <div key={l} style={{ opacity: t > at ? 1 : 0, transform: t > at ? 'translateY(0)' : 'translateY(6px)', transition: 'all 0.4s ease' }}>
                      <label style={{ ...lbl, marginBottom: 3, fontSize: 9 }}>{l}</label>
                      <div style={{ border: `1.5px solid ${t > at + 250 ? G : '#dee0e7'}`, padding: '5px 9px', fontSize: 10.5, fontFamily: "'Archivo', sans-serif", color: '#333', borderRadius: 2, transition: 'border-color 0.4s ease', whiteSpace: 'nowrap', overflow: 'hidden' }}>{v}</div>
                    </div>
                  ))}
                </div>
                <label style={{ ...lbl, marginBottom: 5, fontSize: 9 }}>AI Providers</label>
                <div style={{ display: 'flex', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                  {provs.map(([p, at]) => {
                    const checked = at !== null && t > at
                    return (
                      <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 5, opacity: checked ? 1 : 0.45, transition: 'opacity 0.4s ease' }}>
                        <div style={{ width: 13, height: 13, borderRadius: 3, border: `2px solid ${checked ? G : '#ccc'}`, background: checked ? G : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.35s ease' }}>
                          {checked && <span style={{ color: '#fff', fontSize: 8, fontWeight: 800 }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#333', whiteSpace: 'nowrap' }}>{p}</span>
                      </div>
                    )
                  })}
                </div>
                <label style={{ ...lbl, marginBottom: 3, fontSize: 9 }}>Script Prompt</label>
                <div style={{ border: `1.5px solid ${promptDone ? G : '#dee0e7'}`, padding: '7px 10px', fontSize: 10.5, fontFamily: "'Archivo', sans-serif", color: '#333', borderRadius: 2, minHeight: 28, lineHeight: '15px', transition: 'border-color 0.4s ease', marginBottom: 12 }}>
                  {prompt}{t > 2000 && !promptDone && <span style={{ animation: 'scrBlink 0.8s infinite', color: G }}>|</span>}
                </div>
                <div style={{ ...btnG, textAlign: 'center', padding: '8px 0', transform: pressed ? 'scale(0.96)' : 'scale(1)', transition: 'transform 0.15s ease', animation: t > 3100 && t < 3900 ? 'scrPulse 0.7s ease-out' : 'none' }}>Generate</div>
              </div>
            </div>
          )
        })()}

        {/* FRAME 4 — BREAKDOWN (hero #1): screenplay + storyboard + shot table drawer */}
        {frame === 4 && (
          <div key="s4" style={{ animation: 'scrFadeUp 0.6s ease', position: 'relative', height: 430, overflow: 'hidden' }}>
            <h3 style={{ ...h3s, marginBottom: 12 }}>Shot Breakdown</h3>
            <div style={{ width: '52%', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ border: '1px solid #dee0e7', borderRadius: 6, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <p style={{ flex: 1, margin: 0, fontSize: 11.5, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#333' }}>The Homecoming Drive - Shot Breakdown</p>
                <span style={{ ...pillBase, background: '#e8fde8', color: '#1b5e20' }}>Approved</span>
                <span style={{ fontSize: 10, fontFamily: "'Archivo', sans-serif", color: G, fontWeight: 700, whiteSpace: 'nowrap' }}>View breakdown →</span>
              </div>
              <div style={{ border: '1px solid #dee0e7', borderRadius: 6, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, opacity: 0.55 }}>
                <p style={{ flex: 1, margin: 0, fontSize: 11.5, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#333' }}>Lights On - Shot Breakdown</p>
                <span style={{ ...pillBase, background: '#fff3e0', color: '#e65100' }}>Requested</span>
              </div>
            </div>
            {t > 600 && (
              <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 660, background: '#fff', borderLeft: `2px solid ${G}`, boxShadow: '-16px 0 40px rgba(0,0,0,0.14)', borderRadius: '6px 0 0 6px', padding: '13px 18px', animation: 'scrDrawer 0.7s cubic-bezier(0.25,0.1,0.25,1)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
                  <p style={{ margin: 0, fontSize: 13, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, textTransform: 'uppercase', color: '#000718' }}>The Homecoming Drive - Breakdown</p>
                  <span style={{ ...pillBase, background: '#e8fde8', color: '#1b5e20' }}>Approved</span>
                </div>
                {t > 1300 && (
                  <div style={{ animation: 'scrWipe 0.7s ease forwards', background: '#fafbfc', border: '1px solid #eee', borderRadius: 4, padding: '9px 14px', fontFamily: "'Courier New', monospace", marginBottom: 9 }}>
                    <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#000718' }}>INT. HORIZON SHOWROOM - EVENING</p>
                    <p style={{ margin: '5px 0 0', fontSize: 10, color: '#444', lineHeight: '14px' }}>City lights bloom beyond the glass. A family crosses the floor toward the new SUV.</p>
                    <p style={{ margin: '5px 0 0', fontSize: 10, color: '#444', textAlign: 'center', fontWeight: 700 }}>MEERA</p>
                    <p style={{ margin: '1px 0 0', fontSize: 10, color: '#444', textAlign: 'center' }}>“This Diwali… we drive home.”</p>
                  </div>
                )}
                {t > 2200 && (
                  <div style={{ display: 'flex', gap: 10, marginBottom: 9, animation: 'scrPop 0.5s ease', alignItems: 'center' }}>
                    <StoryArt hue={150} style={{ width: 148, height: 80, flexShrink: 0 }} />
                    <div>
                      <p style={{ margin: '0 0 3px', fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase', letterSpacing: 0.4 }}>Storyboard - Frame 01</p>
                      <p style={{ margin: 0, fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#555', lineHeight: '14px' }}>Family enters frame left; SUV reveal far right, lights up on the beat.</p>
                    </div>
                  </div>
                )}
                {t > 2900 && (
                  <div style={{ border: '1px solid #dee0e7', borderRadius: 6, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', background: '#fafbfc', borderBottom: '1px solid #eee' }}>
                      <div style={{ ...th, width: 42, padding: '6px 10px' }}>Shot</div><div style={{ ...th, width: 92, padding: '6px 10px' }}>Type</div><div style={{ ...th, flex: 1.5, padding: '6px 10px' }}>Camera</div><div style={{ ...th, flex: 1, padding: '6px 10px' }}>Notes</div>
                    </div>
                    {[
                      ['01', 'Medium Wide', 'Tracking lateral move - smartphone: gimbal or stable handheld walk', 'Cover the full action in one 8–12s pass.'],
                      ['02', 'Close-Up', 'Static on tripod - focus on hands & diya', 'Hold 3s. Cut on the smile.'],
                      ['03', 'Tracking', 'Slow push-in to the SUV reveal', 'Headlights on at the final beat.'],
                    ].map((r, i) => {
                      const show = t > 3100 + i * 320
                      return (
                        <div key={i} style={{ display: 'flex', borderBottom: i < 2 ? '1px solid #f2f2f2' : 'none', opacity: show ? 1 : 0, transform: show ? 'translateX(0)' : 'translateX(-12px)', transition: 'all 0.45s ease' }}>
                          <div style={{ width: 42, padding: '6px 10px', fontSize: 10.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#000718' }}>{r[0]}</div>
                          <div style={{ width: 92, padding: '6px 10px', fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#333' }}>{r[1]}</div>
                          <div style={{ flex: 1.5, padding: '6px 10px', fontSize: 9.5, fontFamily: "'Archivo', sans-serif", color: '#555', lineHeight: '13px' }}>{r[2]}</div>
                          <div style={{ flex: 1, padding: '6px 10px', fontSize: 9.5, fontFamily: "'Archivo', sans-serif", color: '#555', lineHeight: '13px' }}>{r[3]}</div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* FRAME 5 — PREVIEW (hero #2): AI previews per shot */}
        {frame === 5 && (() => {
          const shots = [
            ['Shot 1', 'Wide', 150, 700],
            ['Shot 2', 'Close-Up', 195, 1600],
            ['Shot 3', 'Tracking', 225, 2500],
          ]
          return (
            <div key="s5" style={{ animation: 'scrFadeUp 0.6s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h3 style={h3s}>Video Generation - Scene 1</h3>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ ...pillBase, background: '#f5f6f8', border: '1px solid #dee0e7', color: '#555', fontWeight: 700 }}>16:9</span>
                  <div style={btnG}>Generate Videos</div>
                </div>
              </div>
              <p style={{ margin: '0 0 8px', fontSize: 10, fontFamily: "'Courier New', monospace", fontWeight: 700, color: '#555' }}>INT. HORIZON SHOWROOM - EVENING</p>
              <div style={{ border: '1px solid #dee0e7', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ display: 'flex', background: '#fafbfc', borderBottom: '1px solid #eee', alignItems: 'center' }}>
                  <div style={{ ...th, width: 120 }}>Shot</div><div style={{ ...th, width: 162 }}>Preview</div><div style={{ ...th, width: 150 }}>Status</div><div style={{ ...th, flex: 1 }}></div>
                </div>
                {shots.map(([label, type, hue, at], i) => {
                  const ready = t > at + 350
                  return (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', borderBottom: i < 2 ? '1px solid #f2f2f2' : 'none', padding: '7px 0' }}>
                      <div style={{ width: 120, padding: '0 12px' }}>
                        <p style={{ margin: 0, fontSize: 12, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#000718' }}>{label}</p>
                        <p style={{ margin: '2px 0 0', fontSize: 9.5, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>{type}</p>
                      </div>
                      <div style={{ width: 162, padding: '0 12px' }}>
                        <div style={{ position: 'relative', width: 138, height: 62 }}>
                          {t > at
                            ? (
                              <>
                                <StoryArt hue={hue} style={{ position: 'absolute', inset: 0, animation: 'scrPop 0.5s ease' }} />
                                {i === 0 && t > 3400 && (
                                  <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 26, height: 26, borderRadius: 13, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.25)', animation: 'scrPlayPulse 0.9s ease' }}>
                                    <svg width="9" height="10" viewBox="0 0 9 10"><path d="M0 0 L9 5 L0 10 Z" fill="#000718" /></svg>
                                  </div>
                                )}
                              </>
                            )
                            : (
                              <div style={{ position: 'absolute', inset: 0, borderRadius: 5, border: '1.5px dashed #dee0e7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: 8, fontFamily: "'Archivo', sans-serif", color: '#bbb' }}>Queued</span>
                              </div>
                            )}
                        </div>
                      </div>
                      <div style={{ width: 150, padding: '0 12px' }}>
                        {ready
                          ? <span style={{ ...pillBase, background: '#e8fde8', color: '#1b5e20', animation: 'scrPop 0.4s ease' }}>Completed</span>
                          : <span style={{ ...pillBase, background: '#f5f6f8', color: '#9fa3ac' }}>Ready to generate</span>}
                      </div>
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', padding: '0 12px' }}>
                        {ready && <div style={{ ...btnG, animation: 'scrFadeUp 0.4s ease' }}>Send for Approval</div>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })()}

        {/* FRAME 6 — APPROVE & DELIVER */}
        {frame === 6 && (() => {
          const tabs = ['SCRIPTS', 'REQUIREMENTS', 'SHOTS BREAKDOWN', 'GENERATED VIDEOS', 'FINAL UPLOADS']
          const cut = t > 2400
          const activeTab = cut ? 'FINAL UPLOADS' : 'SCRIPTS'
          const arts = [
            ['The Homecoming Drive - Script', 'ENGLISH | 30 SECS | INTERIOR | EVENING', 400],
            ['Shot Q&A - 3 answered', 'Requirements locked before the shoot', 850],
            ['Scene 1 - Shot Breakdown', '3 shots · storyboard attached', 1300],
            ['Shot Previews ×3', 'AI previews · 16:9', 1750],
          ]
          return (
            <div key="s6" style={{ animation: 'scrFadeUp 0.6s ease' }}>
              <h3 style={{ ...h3s, marginBottom: 10 }}>Approve - Festive Drive Campaign</h3>
              <div style={{ display: 'flex', gap: 16, borderBottom: '1px solid #dee0e7', marginBottom: 10 }}>
                {tabs.map(tab => (
                  <span key={tab} style={{ fontSize: 9.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: tab === activeTab ? G : '#9fa3ac', borderBottom: tab === activeTab ? `2px solid ${G}` : '2px solid transparent', paddingBottom: 6, whiteSpace: 'nowrap', transition: 'all 0.3s ease' }}>{tab}</span>
                ))}
              </div>
              {!cut ? (
                <div style={{ border: '1px solid #dee0e7', borderRadius: 6, overflow: 'hidden' }}>
                  {arts.map(([label, sub, at], i) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', borderBottom: i < 3 ? '1px solid #f2f2f2' : 'none' }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: 12, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#333' }}>{label}</p>
                        <p style={{ margin: '2px 0 0', fontSize: 9.5, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>{sub}</p>
                      </div>
                      {t > at
                        ? <span style={{ ...pillBase, background: '#e8fde8', color: '#1b5e20', animation: 'scrPop 0.4s ease' }}>Approved</span>
                        : <span style={{ ...pillBase, background: '#fff3e0', color: '#e65100' }}>Requested</span>}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ animation: 'scrFadeUp 0.5s ease' }}>
                  <div style={{ border: '1px solid #dee0e7', borderRadius: 6, padding: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
                    <StoryArt hue={260} style={{ width: 120, height: 64, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: 13, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#000718' }}>Festive Drive - Final</p>
                      <p style={{ margin: '3px 0 0', fontSize: 9.5, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Stitched from 3 approved shots · 30 secs · 16:9</p>
                    </div>
                    <span style={{ ...pillBase, background: '#e8fde8', color: '#1b5e20', animation: 'scrPop 0.45s ease' }}>Generated</span>
                    <div style={btnO}>Preview</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
                    <div style={{ ...btnG, padding: '7px 26px', background: t > 3000 ? G : '#f0f0f0', color: t > 3000 ? '#000718' : '#bbb', transform: t > 3400 && t < 3800 ? 'scale(0.93)' : 'scale(1)', transition: 'all 0.2s ease' }}>Finish</div>
                  </div>
                </div>
              )}
            </div>
          )
        })()}

        {/* FRAME 7 — CLOSE */}
        {frame === 7 && (
          <div key="s7" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', animation: 'scrFadeUp 0.7s ease' }}>
            <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 32, color: '#000718', textTransform: 'uppercase', margin: '0 0 6px', lineHeight: 1.05 }}>
              Brief in. <span style={{ color: G }}>Shoot-ready</span> out.
            </p>
            <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 13, color: '#666', margin: '10px 0 18px' }}>Scripts, storyboards, shot lists &amp; AI previews - one flow.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: G, letterSpacing: 1 }}>ScriptIT</span>
              <span style={{ width: 1, height: 22, background: '#dee0e7' }} />
              <span style={{ fontFamily: "'Archivo', sans-serif", fontSize: 11, color: '#9fa3ac' }}>CHNC ▸ ConvergenSEE</span>
            </div>
          </div>
        )}

        {/* FRAME 0 — idle */}
        {frame === 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
            <div style={{ animation: 'scrFadeUp 0.5s ease' }}>
              <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: G, textTransform: 'uppercase', margin: '0 0 6px' }}>ScriptIT</p>
              <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: '#666', margin: 0 }}>Brief to shoot-ready video - one flow</p>
            </div>
          </div>
        )}
      </div>

      {/* Lower-third overlay band */}
      {overlay && (
        <div key={`band-${frame}`} style={{
          background: 'rgba(0,7,24,0.95)', borderTop: `2px solid ${G}`, padding: '11px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          animation: 'scrBandUp 0.5s ease',
        }}>
          <p style={{ margin: 0, fontSize: 13, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#fff' }}>{overlay.main}</p>
          <p style={{ margin: 0, fontSize: 10, fontFamily: "'Archivo', sans-serif", color: G, fontWeight: 500 }}>{overlay.sub}</p>
        </div>
      )}
    </div>
  )
}

// ─── ScriptIT content ─────────────────────────────────────────────────────────
function ScriptContent({ controls, tileVariants }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'flex-start', width: 1119 }}>
      <StatTiles tiles={MODULES.ScriptIT.tiles} controls={controls} tileVariants={tileVariants} />
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <CTACard headline="Write compelling scripts for every format & platform!" sub="Video scripts, ad copy and voiceovers - briefed, drafted and approved in one place." cta="New Script" controls={controls} custom={0} />
        <ChartCard title="Production Pipeline" controls={controls} custom={1} h={296}>
          <PipelineFlow stages={[{l:'Brief',v:'12'},{l:'Drafting',v:'8'},{l:'Review',v:'6'},{l:'Approved',v:'41'},{l:'Complete',v:'54'}]} />
        </ChartCard>
        <ChartCard title="Script Types" controls={controls} custom={2}>
          <VertBars data={[{l:'Ad',v:28},{l:'Video',v:19},{l:'VO',v:12},{l:'Social',v:8}]} height={200} />
        </ChartCard>
      </div>
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <ListCard title="Recent Scripts" rows={[
          { isPen: true, label: 'XUV700 – 30s TVC Script', sub: 'Approved · 15/03/2025' },
          { isPen: true, label: 'BE6 Launch Voiceover', sub: 'In Review · 14/03/2025' },
          { isPen: true, label: 'Thar Off-Road Reel VO', sub: 'Approved · 12/03/2025' },
          { isPen: true, label: 'Scorpio Social Ad Script', sub: 'Drafting · 11/03/2025' },
          { isPen: true, label: 'XEV9e EV Story Script', sub: 'Brief Received · 10/03/2025' },
        ]} />
        <ListCard title="In Review" rows={[
          { isPen: true, label: 'BE6 Launch Voiceover', sub: 'Reviewer: Priya S.' },
          { isPen: true, label: 'XUV700 Digital Pre-Roll', sub: 'Reviewer: Rahul M.' },
          { isPen: true, label: 'Bolero Neo Radio Ad', sub: 'Reviewer: Anita K.' },
          { isPen: true, label: 'Thar YouTube Bumper', sub: 'Reviewer: Dev P.' },
        ]} />
      </div>
    </div>
  )
}

// ─── AIgenIT animated walkthrough (AI voice agents) ───────────────────────────
// 5-frame product video: BUILD → GROUND → TEST LIVE → CAPTURE → CLOSE
// Anonymized per brief: agent = Asha (ConvergenSEE), fictional masked leads.
function AIGenWorkflowContent({ controls, tileVariants, stepCount = 0, onFrame, onCursor }) {
  const G = '#34cc32'

  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setElapsed(e => e + 60), 60)
    return () => clearInterval(id)
  }, [])

  // Frame: 0 idle  1 Build(6s)  2 Ground(7s)  3 Test(8s hero)  4 Capture(7s)  5 Close(4s)
  const timeline = [0, 500, 6500, 13500, 21500, 28500]
  const totalDuration = 32500
  const looped = elapsed % totalDuration

  let frame = 0, t = 0
  for (let i = timeline.length - 1; i >= 0; i--) {
    if (looped >= timeline[i]) { frame = i; t = looped - timeline[i]; break }
  }

  useEffect(() => { if (onFrame) onFrame(frame) }, [frame, onFrame])

  // Cursor — rides each action. Per frame: path = [switchTime, x, y] waypoints timed so the
  // 0.65s glide lands ON the element as its action fires; clicks pulse a ring at the tip.
  const cursorScript = {
    1: { path: [[0, 260, 135], [900, 260, 197], [2100, 300, 275], [4100, 876, 193]], clicks: [4800] },
    2: { path: [[0, 275, 152], [1000, 275, 236], [1750, 60, 294], [2500, 711, 119], [3200, 610, 157], [3900, 884, 179], [4500, 703, 227], [5250, 1050, 258]], clicks: [700, 1700, 2450, 3850, 5200, 5950] },
    3: { path: [[0, 1025, 155], [1000, 937, 291], [2300, 920, 100], [4000, 1010, 160], [5200, 920, 215], [6500, 940, 452]], clicks: [700, 1700] },
    4: { path: [[0, 930, 76], [700, 343, 131], [1400, 260, 290], [2400, 700, 238], [3400, 700, 304], [4600, 700, 380]], clicks: [660] },
  }
  const seg = cursorScript[frame]
  let cx = 400, cy = 240
  if (seg) for (const [ts, x, y] of seg.path) { if (t >= ts) { cx = x; cy = y } }
  const cursorClick = seg ? seg.clicks.find(c => t >= c && t < c + 500) : undefined

  // Camera (variable-depth rig in CHNCDashboard): windows of [start, end, zoom,
  // fx?, fy?] — fx/fy frame a fixed point instead of the cursor. ONE depth per
  // beat — depth changes only between windows, never inside one; the rig's
  // deadband lets the cursor roam a held shot. Tight on the build/ground forms,
  // hero frame 3 stays full-frame through the menu + drawer slide-in reveal and
  // then holds a fixed medium shot on the live-voice drawer; the InsightIT tour
  // opens medium on the KPI count-up and widens for chart + leads. Gaps =
  // full-frame pull-backs (frame transitions, drawer reveal, idle/close).
  const CAM = {
    1: [[400, 5700, 1.85]],
    2: [[400, 6400, 1.85]],
    3: [[3400, 7300, 1.5, 940, 270]],
    4: [[400, 2100, 1.55], [2100, 6300, 1.3]],
  }
  const camWin = CAM[frame] && CAM[frame].find(([a, b]) => t >= a && t < b)
  const camZ = camWin ? camWin[2] : 0
  const camX = camWin ? (camWin[3] ?? cx) : 0
  const camY = camWin ? (camWin[4] ?? cy) : 0
  useEffect(() => {
    if (!onCursor) return
    onCursor(camZ ? { x: camX, y: camY, z: camZ } : null)
    return () => onCursor(null)
  }, [camZ, camX, camY, onCursor])

  const overlays = [
    null,
    { main: 'Step 1. Build your voice agent.', sub: 'Name it. Brief it. Brand it.' },
    { main: 'Step 2. Ground it in your knowledge.', sub: 'Your docs in. Guesswork out.' },
    { main: 'Step 3. Talk to it - right now.', sub: 'Live voice test, before it ever takes a call.' },
    { main: 'Step 4. Every call becomes a lead.', sub: 'Name, phone, email - delivered instantly.' },
    { main: 'Every call answered. Every lead captured.', sub: 'AI voice agents - inbound, outbound, and on your website.' },
  ]
  const overlay = overlays[frame]
  const progressLabels = ['BUILD', 'GROUND', 'TEST', 'CAPTURE']
  const crumbs = [
    '', 'AIgenIT ▸ Create', 'AIgenIT ▸ Create ▸ Knowledge & Voice',
    'AIgenIT ▸ Manage', 'AIgenIT ▸ InsightIT ▸ Leads', 'AIgenIT',
  ]

  const AGENT_NAME = 'Asha - ConvergenSEE Assistant'
  const AGENT_DESC = 'Inbound concierge for calls & website'
  const INSTR = 'Always start with “Thank you for calling ConvergenSEE. This is Asha. How may I help you today?”'

  const fieldLabel = { fontSize: 10, color: '#9fa3ac', fontFamily: "'Archivo', sans-serif", fontWeight: 600, display: 'block', marginBottom: 4 }
  const fieldBox = ok => ({ border: `1.5px solid ${ok ? G : '#dee0e7'}`, padding: '8px 12px', fontSize: 12, fontFamily: "'Archivo', sans-serif", color: '#333', borderRadius: 2, transition: 'border-color 0.5s ease' })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 1119, position: 'relative', height: '100%' }}>
      <style>{`
        @keyframes agFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes agBlink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes agPop { 0% { transform: scale(0.6); opacity: 0; } 60% { transform: scale(1.12); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes agDrop { 0% { transform: translateY(-26px) scale(0.7); opacity: 0; } 70% { transform: translateY(3px) scale(1.05); opacity: 1; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
        @keyframes agPress { 0% { transform: scale(1); } 40% { transform: scale(0.93); } 100% { transform: scale(1); } }
        @keyframes agPulseOnce { 0% { box-shadow: 0 0 0 0 rgba(52,204,50,0.5); } 100% { box-shadow: 0 0 0 12px rgba(52,204,50,0); } }
        @keyframes agSlideIn { from { transform: translateX(105%); } to { transform: translateX(0); } }
        @keyframes agWave { 0%,100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
        @keyframes agGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes agBandUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes agClick { 0% { transform: scale(0.25); opacity: 0.9; } 100% { transform: scale(1.3); opacity: 0; } }
      `}</style>

      {/* Progress bar */}
      <div style={{ display: 'flex', gap: 0, padding: '14px 24px 0' }}>
        {progressLabels.map((l, i) => {
          const done = (frame - 1) > i || frame === 5
          const cur = (frame - 1) === i && frame !== 5
          return (
            <div key={l} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ height: 3, width: '100%', background: (done || cur) ? G : '#dee0e7', borderRadius: 2, transition: 'background 0.6s ease', opacity: cur ? 0.5 : 1 }} />
              <span style={{ fontSize: 8, fontFamily: "'Archivo', sans-serif", color: (done || cur) ? G : '#9fa3ac', fontWeight: done ? 700 : 400, transition: 'all 0.3s ease' }}>{l}</span>
            </div>
          )
        })}
      </div>

      {/* Cursor */}
      {frame > 0 && frame <= 4 && (
        <div style={{
          position: 'absolute', left: 0, top: 0, transform: `translate(${cx}px, ${cy}px)`, zIndex: 300,
          transition: 'transform 0.65s cubic-bezier(0.25,0.1,0.25,1)', willChange: 'transform',
          pointerEvents: 'none',
        }}>
          {cursorClick !== undefined && (
            <span key={cursorClick} style={{ position: 'absolute', left: -15, top: -15, width: 30, height: 30, borderRadius: '50%', border: `2.5px solid ${G}`, animation: 'agClick 0.5s ease-out forwards' }} />
          )}
          <svg width="16" height="22" viewBox="0 0 14 19" fill="none">
            <path d="M0 0V18L4.5 13.5L8 19L10 18L6.5 12.5H13L0 0Z" fill="#000" stroke="#fff" strokeWidth="1" />
          </svg>
        </div>
      )}

      {/* Content area */}
      <div style={{ flex: 1, minHeight: 480, padding: '12px 24px', overflow: 'hidden', position: 'relative' }}>

        {frame > 0 && frame < 5 && (
          <p style={{ margin: '0 0 8px', fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac', fontWeight: 600 }}>
            {crumbs[frame].split('▸').map((c, i, a) => (
              <span key={i} style={{ color: i === a.length - 1 ? G : '#9fa3ac' }}>{c}{i < a.length - 1 ? ' ▸ ' : ''}</span>
            ))}
          </p>
        )}

        {/* FRAME 1 — BUILD: Create AI Agent */}
        {frame === 1 && (() => {
          const name = AGENT_NAME.slice(0, Math.max(0, Math.floor(t / 40)))
          const nameDone = t > AGENT_NAME.length * 40
          const desc = t > 1400 ? AGENT_DESC.slice(0, Math.max(0, Math.floor((t - 1400) / 22))) : ''
          const descDone = t > 1400 + AGENT_DESC.length * 22
          const instr = t > 2600 ? INSTR.slice(0, Math.max(0, Math.floor((t - 2600) / 20))) : ''
          const instrDone = t > 2600 + INSTR.length * 20
          return (
            <div key="a1" style={{ animation: 'agFadeUp 0.6s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', textTransform: 'uppercase' }}>Create AI Agent</h3>
                <div style={{ background: G, color: '#000', fontSize: 10, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, textTransform: 'uppercase', padding: '6px 16px', borderRadius: 0, letterSpacing: 0.5 }}>Create New</div>
              </div>
              <div style={{ display: 'flex', gap: 20 }}>
                {/* Left: identity fields */}
                <div style={{ flex: 1.4, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <label style={fieldLabel}>AI Agent Name</label>
                    <div style={fieldBox(nameDone)}>{name}{!nameDone && <span style={{ animation: 'agBlink 0.8s infinite', color: G }}>|</span>}</div>
                  </div>
                  <div style={{ opacity: t > 1400 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                    <label style={fieldLabel}>Description</label>
                    <div style={fieldBox(descDone)}>{desc}{t > 1400 && !descDone && <span style={{ animation: 'agBlink 0.8s infinite', color: G }}>|</span>}</div>
                  </div>
                  <div style={{ opacity: t > 2600 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                    <label style={fieldLabel}>Instructions</label>
                    <div style={{ ...fieldBox(instrDone), minHeight: 60, lineHeight: '18px' }}>{instr}{t > 2600 && !instrDone && <span style={{ animation: 'agBlink 0.8s infinite', color: G }}>|</span>}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, opacity: instrDone ? 1 : 0, transition: 'opacity 0.5s ease' }}>
                    <span style={{ background: '#f5f6f8', border: '1px solid #dee0e7', color: '#666', fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 600, padding: '4px 10px', borderRadius: 12 }}>Conversation starter set</span>
                    <span style={{ background: '#f5f6f8', border: '1px solid #dee0e7', color: '#666', fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 600, padding: '4px 10px', borderRadius: 12 }}>Allowed domains: convergensee.ai</span>
                  </div>
                </div>
                {/* Right: logo upload zone */}
                <div style={{ flex: 1 }}>
                  <label style={fieldLabel}>Logo</label>
                  <div style={{ border: `1.5px dashed ${t > 4800 ? G : '#c9cdd4'}`, borderRadius: 6, height: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'border-color 0.5s ease', background: t > 4800 ? 'rgba(52,204,50,0.04)' : '#fafbfc' }}>
                    {t > 4800 ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, animation: 'agDrop 0.6s ease' }}>
                        <div style={{ width: 34, height: 34, borderRadius: 8, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 18, color: '#000718' }}>A</div>
                        <div>
                          <p style={{ margin: 0, fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>asha-logo.svg</p>
                          <p style={{ margin: 0, fontSize: 9, fontFamily: "'Archivo', sans-serif", color: G, fontWeight: 700 }}>✓ Uploaded</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 16V4M12 4L7 9M12 4l5 5" stroke="#9fa3ac" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2" stroke="#9fa3ac" strokeWidth="1.6" strokeLinecap="round" /></svg>
                        <p style={{ margin: 0, fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Drop your logo here</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })()}

        {/* FRAME 2 — GROUND: Knowledge base + voice settings */}
        {frame === 2 && (() => {
          const caps = ['Use Voice Chat', 'Speech to Text', 'Text to Speech', 'Ask Mobile Number']
          const temp = Math.round(easeOut((t - 2600) / 800) * 30)
          return (
            <div key="a2" style={{ animation: 'agFadeUp 0.6s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', textTransform: 'uppercase' }}>Knowledge & Voice</h3>
              </div>
              <div style={{ display: 'flex', gap: 20 }}>
                {/* Left: knowledge base + model + gender */}
                <div style={{ flex: 1.1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <label style={fieldLabel}>Knowledge Base</label>
                    <div style={{ border: `1.5px dashed ${t > 400 ? G : '#c9cdd4'}`, borderRadius: 6, height: 78, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.5s ease', background: t > 400 ? 'rgba(52,204,50,0.04)' : '#fafbfc' }}>
                      {t > 400 ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, animation: 'agDrop 0.6s ease' }}>
                          <div style={{ width: 30, height: 36, borderRadius: 4, background: '#fff', border: '1px solid #dee0e7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: '#c62828' }}>PDF</div>
                          <div>
                            <p style={{ margin: 0, fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>convergensee-knowledge.pdf</p>
                            <p style={{ margin: 0, fontSize: 9, fontFamily: "'Archivo', sans-serif", color: G, fontWeight: 700 }}>✓ Indexed - 34 pages</p>
                          </div>
                        </div>
                      ) : (
                        <p style={{ margin: 0, fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Drop PDF / docx to ground your agent</p>
                      )}
                    </div>
                  </div>
                  <div style={{ opacity: t > 1400 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                    <label style={fieldLabel}>Realtime Voice Model</label>
                    <div style={{ ...fieldBox(t > 1600), display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{t > 1600 ? 'Realtime v2 - Multilingual' : 'Select model'}</span>
                      <span style={{ color: '#9fa3ac', fontSize: 9 }}>▾</span>
                    </div>
                  </div>
                  <div style={{ opacity: t > 2000 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                    <label style={fieldLabel}>Voice Gender</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {['Female', 'Male'].map((g, i) => {
                        const sel = i === 0 && t > 2200
                        return <span key={g} style={{ background: sel ? '#e8fde8' : '#f5f6f8', border: `1px solid ${sel ? G : '#dee0e7'}`, color: sel ? '#1b5e20' : '#666', fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: sel ? 700 : 500, padding: '5px 14px', borderRadius: 14, transition: 'all 0.4s ease', animation: sel ? 'agPop 0.45s ease' : 'none' }}>{g}{sel ? ' ✓' : ''}</span>
                      })}
                    </div>
                  </div>
                </div>
                {/* Right: temperature + capabilities + notifications + save */}
                <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ opacity: t > 2600 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <label style={{ ...fieldLabel, marginBottom: 0 }}>Temperature</label>
                      <span style={{ fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: G }}>{Math.max(0, temp)}%</span>
                    </div>
                    <div style={{ height: 6, background: '#eef0f3', borderRadius: 3, position: 'relative' }}>
                      <div style={{ height: '100%', width: `${Math.max(0, temp) / 30 * 30}%`, background: G, borderRadius: 3 }} />
                      <div style={{ position: 'absolute', top: '50%', left: `${Math.max(0, temp) / 30 * 30}%`, transform: 'translate(-50%,-50%)', width: 14, height: 14, borderRadius: 7, background: '#fff', border: `2.5px solid ${G}`, boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                    </div>
                  </div>
                  <div>
                    <label style={fieldLabel}>Capabilities</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {caps.map((c, i) => {
                        const checked = t > 3600 + i * 220
                        return (
                          <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 7, opacity: checked ? 1 : 0.35, transition: 'opacity 0.4s ease' }}>
                            <div style={{ width: 14, height: 14, borderRadius: 3, border: `2px solid ${checked ? G : '#c9cdd4'}`, background: checked ? G : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: checked ? 'agPop 0.4s ease' : 'none', flexShrink: 0 }}>
                              {checked && <span style={{ color: '#fff', fontSize: 8, fontWeight: 800 }}>✓</span>}
                            </div>
                            <span style={{ fontSize: 11, fontFamily: "'Archivo', sans-serif", color: '#333' }}>{c}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div style={{ opacity: t > 4800 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                    <label style={fieldLabel}>Leads Notification Sent To</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {['Email', 'SMS', 'WhatsApp'].map((n, i) => {
                        const sel = i === 2 && t > 5100
                        return <span key={n} style={{ background: sel ? '#e8fde8' : '#f5f6f8', border: `1px solid ${sel ? G : '#dee0e7'}`, color: sel ? '#1b5e20' : '#666', fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: sel ? 700 : 500, padding: '5px 14px', borderRadius: 14, transition: 'all 0.4s ease', animation: sel ? 'agPop 0.45s ease' : 'none' }}>{n}{sel ? ' ✓' : ''}</span>
                      })}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10, marginTop: 2 }}>
                    {t > 6200 && <span style={{ fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: G, animation: 'agFadeUp 0.4s ease' }}>✓ Agent saved</span>}
                    <div style={{ background: G, color: '#000', fontSize: 11, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, textTransform: 'uppercase', padding: '8px 26px', borderRadius: 0, letterSpacing: 0.5, animation: t > 5800 ? 'agPress 0.45s ease, agPulseOnce 0.7s ease 0.2s' : 'none' }}>Save</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })()}

        {/* FRAME 3 — TEST LIVE: Manage + voice drawer (hero) */}
        {frame === 3 && (() => {
          const menuItems = ['Code', 'Edit', 'Image Tagging', 'Deactivate', "Let's Play", "Let's Play (Real Time)", "Let's Play All"]
          const menuOpen = t > 900 && t < 2100
          const drawerOpen = t > 2300
          const bubbles = [
            { who: 'agent', text: 'Thank you for calling ConvergenSEE. This is Asha. How may I help you today?', at: 3000, ts: '00:02' },
            { who: 'user', text: 'I’d like to book a consultation.', at: 4600, ts: '00:07' },
            { who: 'agent', text: 'Of course! Weekday or weekend, and what’s the best number to reach you on?', at: 5800, ts: '00:11' },
          ]
          return (
            <div key="a3" style={{ animation: 'agFadeUp 0.6s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', textTransform: 'uppercase' }}>Manage AI Agents</h3>
              </div>
              {/* Agent table */}
              <div style={{ border: '1px solid #dee0e7', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ display: 'flex', background: '#f5f6f8', padding: '8px 14px' }}>
                  {[['Agent', 2.2], ['Model', 1], ['Status', 0.9], ['Rating', 0.9], ['Actions', 0.6]].map(([h, f]) => (
                    <span key={h} style={{ flex: f, fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase', letterSpacing: 0.4 }}>{h}</span>
                  ))}
                </div>
                {[
                  { name: AGENT_NAME, sub: AGENT_DESC, model: 'OpenAI', status: 'Active', rating: '4.8', hot: true },
                  { name: 'Kiran - Outbound Follow-ups', sub: 'Callback & reminder agent', model: 'Gemini', status: 'Draft', rating: '—', hot: false },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 14px', borderTop: '1px solid #f0f0f0', background: r.hot && t > 600 ? 'rgba(52,204,50,0.05)' : '#fff', transition: 'background 0.5s ease' }}>
                    <div style={{ flex: 2.2, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 26, height: 26, borderRadius: 13, background: r.hot ? G : '#eef0f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 12, color: r.hot ? '#000718' : '#9fa3ac', flexShrink: 0 }}>{r.name[0]}</div>
                      <div>
                        <p style={{ margin: 0, fontSize: 12, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>{r.name}</p>
                        <p style={{ margin: 0, fontSize: 9, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>{r.sub}</p>
                      </div>
                    </div>
                    <span style={{ flex: 1, fontSize: 11, fontFamily: "'Archivo', sans-serif", color: '#666' }}>{r.model}</span>
                    <div style={{ flex: 0.9 }}>
                      <span style={{ background: r.status === 'Active' ? '#e8fde8' : '#f5f6f8', border: `1px solid ${r.status === 'Active' ? G : '#dee0e7'}`, color: r.status === 'Active' ? '#1b5e20' : '#9fa3ac', fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, padding: '3px 10px', borderRadius: 10 }}>{r.status}</span>
                    </div>
                    <span style={{ flex: 0.9, fontSize: 11, fontFamily: "'Archivo', sans-serif", color: '#f2a33c', fontWeight: 700 }}>{r.rating !== '—' ? '★ ' + r.rating : '—'}</span>
                    <span style={{ flex: 0.6, fontSize: 14, color: '#666', fontWeight: 700, letterSpacing: 1 }}>⋯</span>
                  </div>
                ))}
              </div>

              {/* Actions menu */}
              {menuOpen && (
                <div style={{ position: 'absolute', right: 90, top: 105, width: 185, background: '#fff', border: '1px solid #dee0e7', borderRadius: 6, boxShadow: '0 10px 30px rgba(0,0,0,0.14)', zIndex: 150, overflow: 'hidden', animation: 'agFadeUp 0.3s ease' }}>
                  {menuItems.map((m, i) => {
                    const hl = m === "Let's Play (Real Time)" && t > 1600
                    return (
                      <div key={m} style={{ padding: '7px 14px', fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: hl ? 700 : 400, color: hl ? '#000718' : '#333', background: hl ? G : '#fff', borderTop: i ? '1px solid #f5f6f8' : 'none', transition: 'background 0.3s ease' }}>{m}</div>
                    )
                  })}
                </div>
              )}

              {/* Dim + AI AGENT VOICE drawer */}
              {drawerOpen && (
                <>
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,7,24,0.14)', zIndex: 180, animation: 'agFadeUp 0.5s ease' }} />
                  <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 330, background: '#fff', borderLeft: '1px solid #dee0e7', boxShadow: '-14px 0 40px rgba(0,7,24,0.18)', zIndex: 200, display: 'flex', flexDirection: 'column', animation: 'agSlideIn 0.55s cubic-bezier(0.25,0.1,0.25,1)' }}>
                    <div style={{ background: '#000718', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: 0.8 }}>AI Agent Voice</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: G }}>
                        <span style={{ width: 7, height: 7, borderRadius: 4, background: G, animation: 'agBlink 1.2s ease infinite' }} />LIVE
                      </span>
                    </div>
                    <div style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
                      {bubbles.map((b, i) => t > b.at && (
                        <div key={i} style={{ alignSelf: b.who === 'agent' ? 'flex-start' : 'flex-end', maxWidth: '86%', animation: 'agFadeUp 0.5s ease' }}>
                          <div style={{ background: b.who === 'agent' ? '#f5f6f8' : '#e8fde8', border: `1px solid ${b.who === 'agent' ? '#dee0e7' : G}`, borderRadius: b.who === 'agent' ? '10px 10px 10px 2px' : '10px 10px 2px 10px', padding: '8px 11px', fontSize: 10.5, fontFamily: "'Archivo', sans-serif", color: '#333', lineHeight: '15px' }}>{b.text}</div>
                          <p style={{ margin: '3px 2px 0', fontSize: 8, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac', textAlign: b.who === 'agent' ? 'left' : 'right' }}>{b.who === 'agent' ? 'Asha · ' + b.ts : 'Caller · ' + b.ts}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ borderTop: '1px solid #dee0e7', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f5f6f8', border: '1px solid #dee0e7', borderRadius: 16, padding: '7px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 2.5, height: 14 }}>
                          {[0, 1, 2, 3, 4].map(i => (
                            <span key={i} style={{ width: 3, height: 14, borderRadius: 2, background: G, transformOrigin: 'center', animation: `agWave 0.9s ease ${i * 0.12}s infinite` }} />
                          ))}
                        </div>
                        <span style={{ fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#666' }}><span style={{ fontWeight: 700, color: '#333' }}>voice</span> Listening…</span>
                      </div>
                      <div style={{ alignSelf: 'center', border: '1.5px solid #e05252', color: '#e05252', fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 700, padding: '5px 18px', borderRadius: 14 }}>Stop session</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        })()}

        {/* FRAME 4 — CAPTURE: InsightIT dashboard + Leads */}
        {frame === 4 && (() => {
          const tiles = [
            { label: '# of Conversations', v: 1284 },
            { label: '# of Leads', v: 342 },
            { label: 'Phone Shared', v: 236 },
            { label: 'Email Shared', v: 118 },
          ]
          const bars = [34, 48, 41, 62, 55, 74, 68, 88, 79, 96, 90, 108]
          const leads = [
            ['Riya S.', '98104 21xx7', 'riya.s@example.com', '2:14 PM'],
            ['Arjun M.', '99230 84xx2', 'arjun.m@example.com', '1:47 PM'],
            ['Meera K.', '98671 05xx9', 'meera.k@example.com', '12:32 PM'],
            ['Dev P.', '91760 43xx5', 'dev.p@example.com', '11:58 AM'],
          ]
          return (
            <div key="a4" style={{ animation: 'agFadeUp 0.6s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', textTransform: 'uppercase' }}>InsightIT - Voice Agent</h3>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ border: '1px solid #dee0e7', background: '#fff', color: '#666', fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 600, padding: '5px 12px', borderRadius: 14 }}>Agent: Asha ▾</span>
                  <span style={{ border: '1px solid #dee0e7', background: '#fff', color: '#666', fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 600, padding: '5px 12px', borderRadius: 14 }}>01 Jul – 17 Aug ▾</span>
                </div>
              </div>
              {/* KPI tiles */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                {tiles.map((tile, i) => (
                  <div key={tile.label} style={{ flex: 1, border: '1px solid #dee0e7', borderRadius: 6, padding: '10px 14px', background: '#fff' }}>
                    <p style={{ margin: '0 0 3px', fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase', letterSpacing: 0.3 }}>{tile.label}</p>
                    <p style={{ margin: 0, fontSize: 24, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, color: i === 1 ? G : '#000718', lineHeight: 1 }}>{formatIN(easeOut((t - i * 150) / 1700) * tile.v)}</p>
                  </div>
                ))}
                <div style={{ flex: 1, border: '1px solid #dee0e7', borderRadius: 6, padding: '10px 14px', background: '#fff' }}>
                  <p style={{ margin: '0 0 3px', fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase', letterSpacing: 0.3 }}>My Feedback</p>
                  <p style={{ margin: 0, fontSize: 24, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, color: '#f2a33c', lineHeight: 1 }}>{(easeOut(t / 1700) * 4.8).toFixed(1)}<span style={{ fontSize: 15 }}> ★</span></p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {/* Conversations bar chart */}
                <div style={{ flex: 1, border: '1px solid #dee0e7', borderRadius: 6, padding: 14, background: '#fff' }}>
                  <p style={{ margin: '0 0 10px', fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase' }}>Conversations by Date</p>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 130 }}>
                    {bars.map((h, i) => t > 1200 && (
                      <div key={i} style={{ flex: 1, height: h, background: i === bars.length - 1 ? G : 'rgba(52,204,50,0.35)', borderRadius: '3px 3px 0 0', transformOrigin: 'bottom', animation: `agGrow 0.7s ease forwards ${i * 80}ms`, transform: 'scaleY(0)' }} />
                    ))}
                  </div>
                </div>
                {/* Leads table */}
                <div style={{ flex: 1.25, border: '1px solid #dee0e7', borderRadius: 6, padding: 14, background: '#fff', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: 16, borderBottom: '1px solid #eef0f3', marginBottom: 8 }}>
                    {['Conversation', 'Leads'].map((tab, i) => (
                      <span key={tab} style={{ fontSize: 10, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: i === 1 ? '#000718' : '#9fa3ac', paddingBottom: 6, borderBottom: i === 1 ? `2px solid ${G}` : '2px solid transparent' }}>{tab}</span>
                    ))}
                  </div>
                  {leads.map((l, i) => t > 2600 + i * 320 && (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '6px 2px', borderBottom: '1px solid #f5f6f8', animation: 'agFadeUp 0.5s ease' }}>
                      <div style={{ width: 20, height: 20, borderRadius: 10, background: '#eef0f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: '#666', marginRight: 8, flexShrink: 0 }}>{l[0][0]}</div>
                      <span style={{ flex: 1, fontSize: 10.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>{l[0]}</span>
                      <span style={{ flex: 1.1, fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#666' }}>{l[1]}</span>
                      <span style={{ flex: 1.5, fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#666' }}>{l[2]}</span>
                      <span style={{ fontSize: 9, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>{l[3]}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 'auto', paddingTop: 10 }}>
                    <span style={{ fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase' }}>Notified via</span>
                    {['Email', 'SMS', 'WhatsApp'].map(n => (
                      <span key={n} style={{ background: '#e8fde8', border: `1px solid ${G}`, color: '#1b5e20', fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, padding: '3px 10px', borderRadius: 10, animation: t > 5200 ? 'agPulseOnce 0.7s ease' : 'none' }}>{n} ✓</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })()}

        {/* FRAME 5 — CLOSE */}
        {frame === 5 && (
          <div key="a5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 450, textAlign: 'center', animation: 'agFadeUp 0.7s ease' }}>
            <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 32, color: '#000718', textTransform: 'uppercase', margin: '0 0 6px', lineHeight: 1.05 }}>
              Every call <span style={{ color: G }}>answered</span>.<br />Every lead <span style={{ color: G }}>captured</span>.
            </p>
            <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 13, color: '#666', margin: '10px 0 18px' }}>AI voice agents - inbound, outbound, and on your website.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: G, letterSpacing: 1 }}>AIgenIT</span>
              <span style={{ width: 1, height: 22, background: '#dee0e7' }} />
              <span style={{ fontFamily: "'Archivo', sans-serif", fontSize: 11, color: '#9fa3ac' }}>CHNC ▸ ConvergenSEE</span>
            </div>
          </div>
        )}

        {/* FRAME 0 — idle */}
        {frame === 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 450, textAlign: 'center' }}>
            <div style={{ animation: 'agFadeUp 0.5s ease' }}>
              <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: G, textTransform: 'uppercase', margin: '0 0 6px' }}>AIgenIT</p>
              <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: '#666', margin: 0 }}>AI voice agents for calls & websites</p>
            </div>
          </div>
        )}
      </div>

      {/* Lower-third overlay band — full width, sharp corners, 2px green top rule */}
      {overlay && (
        <div key={`band-${frame}`} style={{
          background: 'rgba(0,7,24,0.95)', borderTop: `2px solid ${G}`, padding: '11px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          animation: 'agBandUp 0.5s ease',
        }}>
          <p style={{ margin: 0, fontSize: 13, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#fff' }}>{overlay.main}</p>
          <p style={{ margin: 0, fontSize: 10, fontFamily: "'Archivo', sans-serif", color: G, fontWeight: 500 }}>{overlay.sub}</p>
        </div>
      )}
    </div>
  )
}

// ─── SocialiseIT animated walkthrough (One brand, every page) ─────────────────
// 6-frame product reel: PICK PAGES → COMPOSE → SCHEDULE & PUBLISH → MEASURE → CLOSE
// Fictionalized per brief: ConvergenSEE pages + Horizon Motors placeholder creative only.
function SocialiseWorkflowContent({ controls, tileVariants, stepCount = 0, onFrame, onCursor }) {
  const G = '#34cc32'

  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setElapsed(e => e + 60), 60)
    return () => clearInterval(id)
  }, [])

  // Frame: 0 idle  1 Pick pages(6.5s)  2 Compose(9s)  3 Schedule & publish(8.5s hero)  4 Measure(8s)  5 Close(4s)
  const timeline = [0, 500, 7000, 16000, 24500, 32500]
  const totalDuration = 36500
  const looped = elapsed % totalDuration

  let frame = 0, t = 0
  for (let i = timeline.length - 1; i >= 0; i--) {
    if (looped >= timeline[i]) { frame = i; t = looped - timeline[i]; break }
  }

  useEffect(() => { if (onFrame) onFrame(frame) }, [frame, onFrame])

  const PAGES = ['Powai', 'Bandra', 'Andheri', 'Thane']
  const CAPTION = 'Every road, lit. Festive offers at your nearest ConvergenSEE showroom ✨ #FestiveDrive'

  // Cursor — rides each action; waypoints timed so the 0.65s glide lands ON the
  // element as its action fires; clicks pulse a ring at the tip.
  const cursorScript = {
    1: { path: [[0, 200, 110], [500, 105, 165], [1400, 90, 238], [2100, 260, 238], [2700, 430, 238], [3200, 120, 270], [4000, 320, 305], [5000, 596, 350]], clicks: [800, 2150, 2550, 2950, 3450, 5600] },
    2: { path: [[0, 130, 110], [500, 100, 150], [1200, 210, 215], [2300, 210, 300], [5300, 860, 220]], clicks: [600, 1750, 2850] },
    3: { path: [[0, 90, 118], [900, 340, 160], [1800, 1020, 122], [3000, 1050, 430]], clicks: [700, 1500, 2600] },
    4: { path: [[0, 330, 68], [800, 150, 130], [2000, 260, 250], [3400, 640, 250], [4700, 980, 250], [6000, 420, 400]], clicks: [500] },
  }
  const seg = cursorScript[frame]
  let cx = 400, cy = 240
  if (seg) for (const [ts, x, y] of seg.path) { if (t >= ts) { cx = x; cy = y } }
  const cursorClick = seg ? seg.clicks.find(c => t >= c && t < c + 500) : undefined

  // Camera (variable-depth rig in CHNCDashboard): windows of [start, end, zoom,
  // fx?, fy?] — fx/fy frame a fixed point (the card grid) instead of the
  // cursor. ONE depth per beat — depth changes only between beats, never inside
  // one (in-beat zoom pumping read as shaky); the rig's deadband handles the
  // cursor roaming within a held shot. Tight on the wizard beats, wide on the
  // fan-out grid and the analytics tour; gaps pull back full-frame (frame
  // transitions, the 4-card reveal, close).
  const CAM = {
    1: [[500, 6200, 1.8]],
    2: [[300, 5100, 1.8], [5300, 8300, 1.5]],
    3: [[300, 3100, 1.85], [4700, 7900, 1.3, 560, 325]],
    4: [[300, 1900, 1.55], [1900, 7400, 1.3]],
  }
  const camWin = CAM[frame] && CAM[frame].find(([a, b]) => t >= a && t < b)
  const camZ = camWin ? camWin[2] : 0
  const camX = camWin ? (camWin[3] ?? cx) : 0
  const camY = camWin ? (camWin[4] ?? cy) : 0
  useEffect(() => {
    if (!onCursor) return
    onCursor(camZ ? { x: camX, y: camY, z: camZ } : null)
    return () => onCursor(null)
  }, [camZ, camX, camY, onCursor])

  const overlays = [
    null,
    { main: 'Step 1. Pick every page - at once.', sub: 'All your locations. One selection.' },
    { main: 'Step 2. Compose once, on-brand.', sub: 'Approved creative. Approved caption. Live preview.' },
    { main: 'Step 3. Schedule to every page.', sub: 'One click → 4 pages, same moment, same brand.' },
    { main: 'Step 4. Every page, one dashboard.', sub: 'Facebook + Instagram - measured together.' },
    { main: 'One brand. Every page. Zero rogue posts.', sub: "Central control of every location's Facebook & Instagram." },
  ]
  const overlay = overlays[frame]
  const progressLabels = ['PICK PAGES', 'COMPOSE', 'SCHEDULE', 'MEASURE']
  const crumbs = [
    '', 'SocialiseIT ▸ Content ▸ Create Post', 'SocialiseIT ▸ Content ▸ Create Post',
    'SocialiseIT ▸ Content ▸ Create Post', 'SocialiseIT ▸ InsightIT ▸ Instagram', 'SocialiseIT',
  ]

  const fieldLabel = { fontSize: 10, color: '#9fa3ac', fontFamily: "'Archivo', sans-serif", fontWeight: 600, display: 'block', marginBottom: 4 }

  // Wizard stepper ring: 20% on step 1, 75% on step 2, completes to 100% at publish
  const ringPct =
    frame === 1 ? Math.round(easeOut(t / 800) * 20)
    : frame === 2 ? Math.round(20 + easeOut(t / 900) * 55)
    : frame === 3 ? (t < 2600 ? 75 : Math.round(75 + easeOut((t - 2600) / 900) * 25))
    : 0

  const igGlyph = (s, c) => (
    <svg width={s} height={s} viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
      <rect x="1.2" y="1.2" width="13.6" height="13.6" rx="4" fill="none" stroke={c} strokeWidth="1.5" />
      <circle cx="8" cy="8" r="3.1" fill="none" stroke={c} strokeWidth="1.5" />
      <circle cx="12" cy="4" r="1" fill={c} />
    </svg>
  )

  // Stylized placeholder creative — fictional Horizon Motors, never real art
  const horizonArt = h => (
    <div style={{ position: 'relative', width: '100%', height: h, background: 'linear-gradient(160deg, #0b1230 0%, #000718 55%, #04210a 100%)', overflow: 'hidden' }}>
      {[[12, 18, 5], [30, 8, 3], [55, 14, 4], [78, 10, 3], [90, 22, 5], [68, 26, 3], [20, 30, 3]].map(([x, y, r], i) => (
        <span key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: r * 2, height: r * 2, borderRadius: '50%', background: i % 2 ? 'rgba(52,204,50,0.55)' : 'rgba(255,214,90,0.5)', filter: 'blur(1px)' }} />
      ))}
      <div style={{ position: 'absolute', left: '-10%', right: '-10%', bottom: '-30%', height: '65%', background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.14))' }} />
      <div style={{ position: 'absolute', left: '50%', bottom: 0, width: 3, height: '34%', background: G, transform: 'translateX(-50%)', opacity: 0.75 }} />
      <svg viewBox="0 0 120 40" style={{ position: 'absolute', left: '50%', bottom: '14%', width: '44%', transform: 'translateX(-50%)' }}>
        <path d="M10 32 Q14 20 30 18 L44 10 Q60 4 78 10 L92 18 Q108 20 112 30 L112 34 L10 34 Z" fill="#0d1520" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        <circle cx="34" cy="34" r="5" fill="#0d1520" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
        <circle cx="88" cy="34" r="5" fill="#0d1520" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
        <circle cx="103" cy="24" r="2.4" fill="#ffd65a" opacity="0.95" />
        <circle cx="19" cy="24" r="2.4" fill="#ffd65a" opacity="0.95" />
      </svg>
      <p style={{ position: 'absolute', top: '9%', left: 0, right: 0, margin: 0, textAlign: 'center', fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, letterSpacing: 2.5, color: '#fff', fontSize: Math.max(10, h * 0.085) }}>HORIZON MOTORS</p>
      <p style={{ position: 'absolute', top: '26%', left: 0, right: 0, margin: 0, textAlign: 'center', fontFamily: "'Archivo', sans-serif", fontWeight: 600, letterSpacing: 1.4, color: G, fontSize: Math.max(6, h * 0.05), textTransform: 'uppercase' }}>Festive Drive Offers</p>
    </div>
  )

  // Wizard chrome — % ring + 2-step stepper + SAVE & EXIT
  const wizChrome = step => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ position: 'relative', width: 40, height: 40, flexShrink: 0 }}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="16.5" fill="none" stroke="#eef0f3" strokeWidth="4" />
            <circle cx="20" cy="20" r="16.5" fill="none" stroke={G} strokeWidth="4" pathLength="100"
              strokeDasharray={`${ringPct} ${100 - ringPct}`} strokeDashoffset="25" strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.3s linear' }} />
          </svg>
          <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: '#000718' }}>{ringPct}%</span>
        </div>
        {[['1', 'SELECT PLATFORM'], ['2', 'CREATE POST']].map(([n, l], i) => {
          const activeStep = i + 1 === step
          const done = i + 1 < step
          return (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              {i === 1 && <span style={{ width: 26, height: 1.5, background: step === 2 ? G : '#dee0e7' }} />}
              <span style={{ width: 18, height: 18, borderRadius: 9, background: done ? G : activeStep ? '#000718' : '#eef0f3', color: done || activeStep ? '#fff' : '#9fa3ac', fontSize: 9, fontWeight: 800, fontFamily: "'Archivo', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{done ? '✓' : n}</span>
              <span style={{ fontSize: 10, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, letterSpacing: 0.6, color: activeStep ? '#000718' : done ? G : '#9fa3ac' }}>{l}</span>
            </div>
          )
        })}
      </div>
      <div style={{ background: G, color: '#000', fontSize: 10, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, textTransform: 'uppercase', padding: '6px 14px', borderRadius: 0, letterSpacing: 0.5 }}>Save &amp; Exit</div>
    </div>
  )

  // Per-page mini post card for the frame-3 fan-out
  const postCard = (page, stamped) => (
    <div style={{ border: '1px solid #dee0e7', borderRadius: 6, background: '#fff', overflow: 'hidden', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 9px' }}>
        <span style={{ width: 18, height: 18, borderRadius: 9, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: '#000718', flexShrink: 0 }}>C</span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{ margin: 0, fontSize: 8.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333', whiteSpace: 'nowrap' }}>convergensee.{page.toLowerCase()}</p>
          <p style={{ margin: 0, fontSize: 7, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>{page}, Mumbai</p>
        </div>
        {igGlyph(9, '#c13584')}
      </div>
      {horizonArt(96)}
      <p style={{ margin: 0, padding: '5px 9px 2px', fontSize: 7.5, fontFamily: "'Archivo', sans-serif", color: '#333', lineHeight: '11px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}><b>convergensee.{page.toLowerCase()}</b> {CAPTION}</p>
      <p style={{ margin: 0, padding: '0 9px 7px', fontSize: 7, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>18/08/2026 · 15:55</p>
      {stamped && (
        <span style={{ position: 'absolute', top: 8, right: 8, background: G, color: '#000718', fontSize: 8, fontFamily: "'Archivo', sans-serif", fontWeight: 800, padding: '3px 9px', borderRadius: 9, animation: 'socStamp 0.5s ease both', textTransform: 'uppercase', letterSpacing: 0.4 }}>Scheduled ✓</span>
      )}
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 1119, position: 'relative', height: '100%' }}>
      <style>{`
        @keyframes socFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes socBlink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes socPop { 0% { transform: scale(0.6); opacity: 0; } 60% { transform: scale(1.12); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes socDrop { 0% { transform: translateY(-26px) scale(0.7); opacity: 0; } 70% { transform: translateY(3px) scale(1.05); opacity: 1; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
        @keyframes socPress { 0% { transform: scale(1); } 40% { transform: scale(0.93); } 100% { transform: scale(1); } }
        @keyframes socPulseOnce { 0% { box-shadow: 0 0 0 0 rgba(52,204,50,0.5); } 100% { box-shadow: 0 0 0 12px rgba(52,204,50,0); } }
        @keyframes socGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes socLand { 0% { opacity: 0; transform: translateX(-30px) translateY(10px) scale(0.92); } 70% { transform: translateX(2px) translateY(-2px) scale(1.01); } 100% { opacity: 1; transform: translateX(0) translateY(0) scale(1); } }
        @keyframes socStamp { 0% { transform: scale(2.2) rotate(-14deg); opacity: 0; } 55% { transform: scale(0.92) rotate(-4deg); opacity: 1; } 100% { transform: scale(1) rotate(-4deg); opacity: 1; } }
        @keyframes socDraw { from { stroke-dashoffset: 600; } to { stroke-dashoffset: 0; } }
        @keyframes socSpark { from { stroke-dashoffset: 120; } to { stroke-dashoffset: 0; } }
        @keyframes socBandUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes socClick { 0% { transform: scale(0.25); opacity: 0.9; } 100% { transform: scale(1.3); opacity: 0; } }
      `}</style>

      {/* Progress bar */}
      <div style={{ display: 'flex', gap: 0, padding: '14px 24px 0' }}>
        {progressLabels.map((l, i) => {
          const done = (frame - 1) > i || frame === 5
          const cur = (frame - 1) === i && frame !== 5
          return (
            <div key={l} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ height: 3, width: '100%', background: (done || cur) ? G : '#dee0e7', borderRadius: 2, transition: 'background 0.6s ease', opacity: cur ? 0.5 : 1 }} />
              <span style={{ fontSize: 8, fontFamily: "'Archivo', sans-serif", color: (done || cur) ? G : '#9fa3ac', fontWeight: done ? 700 : 400, transition: 'all 0.3s ease' }}>{l}</span>
            </div>
          )
        })}
      </div>

      {/* Cursor */}
      {frame > 0 && frame <= 4 && (
        <div style={{
          position: 'absolute', left: 0, top: 0, transform: `translate(${cx}px, ${cy}px)`, zIndex: 300,
          transition: 'transform 0.65s cubic-bezier(0.25,0.1,0.25,1)', willChange: 'transform',
          pointerEvents: 'none',
        }}>
          {cursorClick !== undefined && (
            <span key={cursorClick} style={{ position: 'absolute', left: -15, top: -15, width: 30, height: 30, borderRadius: '50%', border: `2.5px solid ${G}`, animation: 'socClick 0.5s ease-out forwards' }} />
          )}
          <svg width="16" height="22" viewBox="0 0 14 19" fill="none">
            <path d="M0 0V18L4.5 13.5L8 19L10 18L6.5 12.5H13L0 0Z" fill="#000" stroke="#fff" strokeWidth="1" />
          </svg>
        </div>
      )}

      {/* Content area */}
      <div style={{ flex: 1, minHeight: 480, padding: '12px 24px', overflow: 'hidden', position: 'relative' }}>

        {frame > 0 && frame < 5 && (
          <p style={{ margin: '0 0 8px', fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac', fontWeight: 600 }}>
            {crumbs[frame].split('▸').map((c, i, a) => (
              <span key={i} style={{ color: i === a.length - 1 ? G : '#9fa3ac' }}>{c}{i < a.length - 1 ? ' ▸ ' : ''}</span>
            ))}
          </p>
        )}

        {/* FRAME 1 — PICK PAGES: step 1 SELECT PLATFORM */}
        {frame === 1 && (() => {
          const tileTicked = t > 800
          const chipAt = [2100, 2500, 2900, 3400]
          const helperHot = t > 4300
          const nextPressed = t > 5600
          return (
            <div key="s1" style={{ animation: 'socFadeUp 0.6s ease' }}>
              {wizChrome(1)}
              <div style={{ display: 'flex', gap: 24 }}>
                <div style={{ flex: 1.45, minWidth: 0 }}>
                  <h3 style={{ margin: '0 0 10px', fontSize: 16, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', textTransform: 'uppercase' }}>Create Post</h3>
                  <label style={fieldLabel}>Content type</label>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                    {[['Create Post', true], ['Create Reel', false], ['Create Story', false]].map(([l, avail]) => {
                      const sel = avail && tileTicked
                      return (
                        <div key={l} style={{ flex: 1, border: `1.5px solid ${sel ? G : '#dee0e7'}`, borderRadius: 6, padding: '13px 10px', background: sel ? 'rgba(52,204,50,0.06)' : '#fff', opacity: avail ? 1 : 0.55, position: 'relative', transition: 'all 0.4s ease' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 16, height: 16, borderRadius: 8, border: `2px solid ${sel ? G : '#c9cdd4'}`, background: sel ? G : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: sel ? 'socPop 0.4s ease' : 'none', flexShrink: 0 }}>
                              {sel && <span style={{ color: '#fff', fontSize: 9, fontWeight: 800 }}>✓</span>}
                            </div>
                            <span style={{ fontSize: 12, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333', whiteSpace: 'nowrap' }}>{l}</span>
                          </div>
                          {!avail && <span style={{ position: 'absolute', top: -7, right: 8, background: '#f2a33c', color: '#fff', fontSize: 7, fontFamily: "'Archivo', sans-serif", fontWeight: 800, padding: '2px 7px', borderRadius: 8, textTransform: 'uppercase', letterSpacing: 0.4 }}>Coming soon</span>}
                        </div>
                      )
                    })}
                  </div>
                  <label style={fieldLabel}>Business assets</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12, minHeight: 60 }}>
                    {PAGES.map((p, i) => t > chipAt[i] && (
                      <span key={p} style={{ background: '#e8fde8', border: `1px solid ${G}`, color: '#1b5e20', fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: 700, padding: '6px 13px', borderRadius: 15, animation: 'socPop 0.45s ease', alignSelf: 'flex-start' }}>ConvergenSEE - {p} ✓</span>
                    ))}
                    {t <= chipAt[0] && <span style={{ border: '1.5px dashed #c9cdd4', color: '#9fa3ac', fontSize: 11, fontFamily: "'Archivo', sans-serif", padding: '6px 13px', borderRadius: 15, alignSelf: 'flex-start' }}>Select pages…</span>}
                  </div>
                  <p style={{ margin: '0 0 18px', fontSize: 10.5, fontFamily: "'Archivo', sans-serif", lineHeight: '16px', color: helperHot ? '#1b5e20' : '#9fa3ac', background: helperHot ? 'rgba(52,204,50,0.12)' : 'transparent', borderLeft: helperHot ? `3px solid ${G}` : '3px solid transparent', padding: '5px 8px', transition: 'all 0.5s ease', fontWeight: helperHot ? 600 : 400 }}>
                    The post is published to all selected pages (and their linked Instagram accounts). The first selection drives the preview.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ background: G, color: '#000', fontSize: 11, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, textTransform: 'uppercase', padding: '8px 30px', borderRadius: 0, letterSpacing: 0.5, animation: nextPressed ? 'socPress 0.45s ease, socPulseOnce 0.7s ease 0.2s' : 'none' }}>Next</div>
                  </div>
                </div>
                {/* Preview panel — skeleton until compose */}
                <div style={{ flex: 1, border: '1px solid #dee0e7', borderRadius: 6, background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', borderBottom: '1px solid #eef0f3' }}>
                    <span style={{ fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase', letterSpacing: 0.5 }}>Instagram feed preview</span>
                    <span style={{ background: '#fdf3e0', border: '1px solid #f2a33c', color: '#a86a10', fontSize: 8.5, fontFamily: "'Archivo', sans-serif", fontWeight: 800, padding: '2.5px 9px', borderRadius: 9, textTransform: 'uppercase', letterSpacing: 0.4 }}>Unpublished</span>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, padding: 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 26, height: 26, borderRadius: 13, background: '#eef0f3', flexShrink: 0 }} />
                      <span style={{ width: 110, height: 8, borderRadius: 4, background: '#eef0f3' }} />
                    </div>
                    <div style={{ width: '100%', height: 180, borderRadius: 4, background: '#f5f6f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#c9cdd4' }}>{t > chipAt[0] ? 'Preview follows your first selection' : 'Select a page to preview'}</span>
                    </div>
                    <span style={{ width: '85%', height: 7, borderRadius: 4, background: '#eef0f3' }} />
                    <span style={{ width: '60%', height: 7, borderRadius: 4, background: '#eef0f3' }} />
                  </div>
                  <div style={{ borderTop: '1px solid #eef0f3', padding: '7px 14px', fontSize: 8.5, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Last saved · just now</div>
                </div>
              </div>
            </div>
          )
        })()}

        {/* FRAME 2 — COMPOSE: step 2 CREATE POST, live IG preview builds */}
        {frame === 2 && (() => {
          const acctAt = [400, 650, 900, 1150]
          const mediaIn = t > 1800
          const typed = t > 2800 ? CAPTION.slice(0, Math.max(0, Math.floor((t - 2800) / 24))) : ''
          const captionDone = t > 2800 + CAPTION.length * 24
          const postToDone = t > 1400
          const mediaDone = t > 2400
          const sec = (label, done) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
              <div style={{ width: 13, height: 13, borderRadius: 7, border: `2px solid ${done ? G : '#c9cdd4'}`, background: done ? G : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: done ? 'socPop 0.4s ease' : 'none', flexShrink: 0 }}>
                {done && <span style={{ color: '#fff', fontSize: 7, fontWeight: 800 }}>✓</span>}
              </div>
              <span style={{ fontSize: 10, color: '#9fa3ac', fontFamily: "'Archivo', sans-serif", fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>{label}</span>
            </div>
          )
          return (
            <div key="s2" style={{ animation: 'socFadeUp 0.6s ease' }}>
              {wizChrome(2)}
              <div style={{ display: 'flex', gap: 24 }}>
                <div style={{ flex: 1.45, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    {sec('Post to - Instagram accounts', postToDone)}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, border: `1.5px solid ${postToDone ? G : '#dee0e7'}`, borderRadius: 4, padding: '7px 9px', transition: 'border-color 0.5s ease', minHeight: 32 }}>
                      {PAGES.map((p, i) => t > acctAt[i] && (
                        <span key={p} style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#f5f6f8', border: '1px solid #dee0e7', color: '#333', fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 600, padding: '3px 9px', borderRadius: 11, animation: 'socPop 0.4s ease' }}>{igGlyph(9, '#c13584')}@convergensee.{p.toLowerCase()}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    {sec('Media', mediaDone)}
                    <div style={{ border: `1.5px dashed ${mediaIn ? G : '#c9cdd4'}`, borderRadius: 6, minHeight: 54, display: 'flex', alignItems: 'center', justifyContent: mediaIn ? 'flex-start' : 'center', padding: '7px 12px', background: mediaIn ? 'rgba(52,204,50,0.04)' : '#fafbfc', transition: 'all 0.5s ease' }}>
                      {mediaIn ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, animation: 'socDrop 0.6s ease' }}>
                          <div style={{ width: 46, height: 38, borderRadius: 3, overflow: 'hidden', flexShrink: 0 }}>{horizonArt(38)}</div>
                          <div>
                            <p style={{ margin: 0, fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>festive-drive-post.png</p>
                            <p style={{ margin: 0, fontSize: 9, fontFamily: "'Archivo', sans-serif", color: G, fontWeight: 700 }}>✓ 1080 × 1350 · ready</p>
                          </div>
                        </div>
                      ) : (
                        <p style={{ margin: 0, fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Add photo or video</p>
                      )}
                    </div>
                  </div>
                  <div>
                    {sec('Caption', captionDone)}
                    <div style={{ border: `1.5px solid ${captionDone ? G : '#dee0e7'}`, borderRadius: 4, padding: '8px 11px', minHeight: 56, fontSize: 11.5, fontFamily: "'Archivo', sans-serif", color: '#333', lineHeight: '17px', transition: 'border-color 0.5s ease' }}>
                      {typed}{t > 2800 && !captionDone && <span style={{ animation: 'socBlink 0.8s infinite', color: G }}>|</span>}
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 5, alignItems: 'center' }}>
                      {['#', '☺', '📍', '@'].map(ic => (
                        <span key={ic} style={{ fontSize: 10, color: '#9fa3ac', fontFamily: "'Archivo', sans-serif", fontWeight: 700 }}>{ic}</span>
                      ))}
                      <span style={{ marginLeft: 'auto', fontSize: 9, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Customise per platform · off</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ background: G, color: '#000', fontSize: 11, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, textTransform: 'uppercase', padding: '8px 26px', borderRadius: 0, letterSpacing: 0.5 }}>Publish</div>
                  </div>
                </div>
                {/* Live IG feed preview — builds header → image → caption */}
                <div style={{ flex: 1, border: '1px solid #dee0e7', borderRadius: 6, background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', borderBottom: '1px solid #eef0f3' }}>
                    <span style={{ fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase', letterSpacing: 0.5 }}>Instagram feed preview</span>
                    <span style={{ background: '#fdf3e0', border: '1px solid #f2a33c', color: '#a86a10', fontSize: 8.5, fontFamily: "'Archivo', sans-serif", fontWeight: 800, padding: '2.5px 9px', borderRadius: 9, textTransform: 'uppercase', letterSpacing: 0.4 }}>Unpublished</span>
                  </div>
                  <div style={{ flex: 1, padding: 14 }}>
                    {t > 600 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, animation: 'socFadeUp 0.45s ease' }}>
                        <span style={{ width: 26, height: 26, borderRadius: 13, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: '#000718', flexShrink: 0 }}>C</span>
                        <div>
                          <p style={{ margin: 0, fontSize: 10.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>convergensee.powai</p>
                          <p style={{ margin: 0, fontSize: 8, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Powai, Mumbai</p>
                        </div>
                        <span style={{ marginLeft: 'auto', color: '#9fa3ac', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>⋯</span>
                      </div>
                    )}
                    {t > 1800
                      ? <div style={{ animation: 'socFadeUp 0.5s ease', borderRadius: 4, overflow: 'hidden' }}>{horizonArt(178)}</div>
                      : <div style={{ width: '100%', height: 178, borderRadius: 4, background: '#f5f6f8' }} />}
                    <div style={{ display: 'flex', gap: 12, padding: '8px 2px 4px', color: '#333', fontSize: 13 }}>
                      <span>♡</span><span>💬</span><span>➤</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#333', lineHeight: '15px' }}>
                      <b>convergensee.powai</b> {typed}
                    </p>
                  </div>
                  <div style={{ borderTop: '1px solid #eef0f3', padding: '7px 14px', fontSize: 8.5, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Last saved · just now</div>
                </div>
              </div>
            </div>
          )
        })()}

        {/* FRAME 3 — SCHEDULE & PUBLISH: hero one→many fan-out */}
        {frame === 3 && (() => {
          const togOn = t > 700
          const rowIn = t > 1500
          const pubPressed = t > 2600
          const fanned = t > 3200
          const cardAt = [3200, 3550, 3900, 4250]
          const stampAt = [4900, 5250, 5600, 5950]
          return (
            <div key="s3" style={{ animation: 'socFadeUp 0.6s ease' }}>
              {wizChrome(2)}
              <div style={{ border: '1px solid #dee0e7', borderRadius: 6, background: '#fff', padding: '10px 14px', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>Scheduling</span>
                  <div style={{ width: 34, height: 18, borderRadius: 9, background: togOn ? G : '#dee0e7', position: 'relative', transition: 'background 0.35s ease', flexShrink: 0 }}>
                    <span style={{ position: 'absolute', top: 2, left: togOn ? 18 : 2, width: 14, height: 14, borderRadius: 7, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.25)', transition: 'left 0.35s cubic-bezier(0.25,0.1,0.25,1)' }} />
                  </div>
                  <span style={{ fontSize: 9.5, fontFamily: "'Archivo', sans-serif", color: togOn ? G : '#9fa3ac', fontWeight: 700, transition: 'color 0.3s ease' }}>{togOn ? 'On - publish at a set time' : 'Off'}</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
                    {pubPressed && <span style={{ fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: G, animation: 'socFadeUp 0.4s ease' }}>✓ Scheduled to 4 pages</span>}
                    <div style={{ background: G, color: '#000', fontSize: 11, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, textTransform: 'uppercase', padding: '8px 26px', borderRadius: 0, letterSpacing: 0.5, animation: pubPressed ? 'socPress 0.45s ease, socPulseOnce 0.7s ease 0.2s' : 'none' }}>Publish</div>
                  </div>
                </div>
                {rowIn && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, paddingTop: 10, borderTop: '1px solid #eef0f3', animation: 'socFadeUp 0.45s ease' }}>
                    {igGlyph(13, '#c13584')}
                    <span style={{ fontSize: 10.5, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#333' }}>Instagram - all 4 accounts</span>
                    <span style={{ border: `1.5px solid ${G}`, borderRadius: 0, padding: '4px 10px', fontSize: 10.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>18/08/2026</span>
                    <span style={{ border: `1.5px solid ${G}`, borderRadius: 0, padding: '4px 10px', fontSize: 10.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>15:55</span>
                    <span style={{ fontSize: 9, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Same moment, every page</span>
                  </div>
                )}
              </div>
              {/* One card → four, each stamping Scheduled ✓ */}
              <div style={{ minHeight: 250 }}>
                {!fanned ? (
                  <div style={{ width: 265, margin: '0 auto' }}>{postCard('Powai', false)}</div>
                ) : (
                  <div style={{ display: 'flex', gap: 14 }}>
                    {PAGES.map((p, i) => t > cardAt[i] && (
                      <div key={p} style={{ flex: 1, animation: 'socLand 0.55s cubic-bezier(0.25,0.1,0.25,1) both' }}>
                        {postCard(p, t > stampAt[i])}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })()}

        {/* FRAME 4 — MEASURE: InsightIT · Social Media ▸ Instagram */}
        {frame === 4 && (() => {
          const tiles = [
            { label: 'Likes', v: 48973, spark: '0,16 8,13 16,14 24,10 32,11 40,7 48,8 58,3' },
            { label: 'Comments', v: 3750, spark: '0,15 8,12 16,13 24,10 32,8 40,9 48,5 58,4' },
            { label: 'Shares', v: 1279, spark: '0,16 8,14 16,11 24,12 32,9 40,7 48,7 58,3' },
            { label: 'Reach', v: 642180, spark: '0,15 8,13 16,10 24,11 32,7 40,5 48,4 58,1' },
          ]
          const ciBars = [['Video', 78], ['Images', 96], ['Carousels', 64], ['Text', 30]]
          const mapDots = [[12, 30], [18, 42], [26, 58], [30, 26], [38, 40], [44, 62], [50, 30], [55, 48], [62, 26], [66, 58], [72, 38], [78, 52], [84, 30], [88, 60], [46, 76], [24, 72], [68, 74], [58, 70]]
          const cardTitle = { margin: '0 0 8px', fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase', letterSpacing: 0.4 }
          return (
            <div key="s4" style={{ animation: 'socFadeUp 0.6s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
                <h3 style={{ margin: 0, fontSize: 15, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', textTransform: 'uppercase' }}>InsightIT - Social Media</h3>
                <div style={{ display: 'flex', gap: 14 }}>
                  {['FACEBOOK', 'INSTAGRAM'].map((tab, i) => {
                    const on = i === 1 && t > 500
                    return <span key={tab} style={{ fontSize: 10, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, letterSpacing: 0.6, color: on ? '#000718' : '#9fa3ac', paddingBottom: 3, borderBottom: on ? `2px solid ${G}` : '2px solid transparent', transition: 'all 0.4s ease' }}>{tab}</span>
                  })}
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
                  {['ALL LOCATIONS ▾', 'Lifetime ▾'].map(f => (
                    <span key={f} style={{ border: '1px solid #dee0e7', background: '#fff', color: '#666', fontSize: 9.5, fontFamily: "'Archivo', sans-serif", fontWeight: 600, padding: '5px 12px', borderRadius: 0 }}>{f}</span>
                  ))}
                  <div style={{ background: G, color: '#000', fontSize: 10, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, textTransform: 'uppercase', padding: '6px 14px', borderRadius: 0, letterSpacing: 0.5 }}>Export All</div>
                </div>
              </div>
              {/* KPI tiles roll up, sparklines draw */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                {tiles.map((tile, i) => (
                  <div key={tile.label} style={{ flex: 1, border: '1px solid #dee0e7', borderRadius: 6, padding: '9px 13px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ margin: '0 0 3px', fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase', letterSpacing: 0.3 }}>{tile.label}</p>
                      <p style={{ margin: 0, fontSize: 22, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, color: i === 3 ? G : '#000718', lineHeight: 1 }}>{formatIN(easeOut((t - 400 - i * 150) / 1700) * tile.v)}</p>
                    </div>
                    <svg width="58" height="18" viewBox="0 0 58 18" style={{ flexShrink: 0 }}>
                      <polyline points={tile.spark} fill="none" stroke={G} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                        strokeDasharray="120" style={{ animation: t > 600 ? `socSpark 1.4s ease-out both ${i * 180}ms` : 'none', strokeDashoffset: 120 }} />
                    </svg>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                {/* Engagement overtime — line traces left → right */}
                <div style={{ flex: 1.6, border: '1px solid #dee0e7', borderRadius: 6, padding: 12, background: '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={cardTitle}>Engagement Overtime</p>
                    <div style={{ display: 'flex', gap: 10 }}>
                      {[['Likes', G], ['Comments', '#9fa3ac']].map(([l, c]) => (
                        <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 8, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}><span style={{ width: 7, height: 7, borderRadius: 4, background: c }} />{l}</span>
                      ))}
                    </div>
                  </div>
                  <svg width="100%" height="100" viewBox="0 0 430 100" preserveAspectRatio="none">
                    {[25, 50, 75].map(y => <line key={y} x1="0" y1={y} x2="430" y2={y} stroke="#eef0f3" strokeWidth="1" />)}
                    <path d="M0 82 C40 76, 60 70, 95 72 C135 74, 155 56, 195 52 C235 48, 255 60, 295 44 C335 28, 365 34, 430 16" fill="none" stroke={G} strokeWidth="2.2" strokeLinecap="round"
                      strokeDasharray="600" style={{ animation: t > 800 ? 'socDraw 1.8s ease-out both' : 'none', strokeDashoffset: 600 }} />
                    <path d="M0 90 C50 88, 80 84, 120 84 C170 84, 200 76, 250 74 C300 72, 350 66, 430 58" fill="none" stroke="#c9cdd4" strokeWidth="1.6" strokeLinecap="round"
                      strokeDasharray="600" style={{ animation: t > 1100 ? 'socDraw 1.8s ease-out both' : 'none', strokeDashoffset: 600 }} />
                  </svg>
                </div>
                {/* Content insight — bars grow bottom-up */}
                <div style={{ flex: 1, border: '1px solid #dee0e7', borderRadius: 6, padding: 12, background: '#fff' }}>
                  <p style={cardTitle}>Content Insight</p>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 78, padding: '0 6px' }}>
                    {ciBars.map(([l, h], i) => (
                      <div key={l} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                        {t > 1400 && <div style={{ width: '100%', height: `${h}%`, background: i === 1 ? G : 'rgba(52,204,50,0.35)', borderRadius: '3px 3px 0 0', transformOrigin: 'bottom', animation: `socGrow 0.7s ease both ${i * 120}ms` }} />}
                        <span style={{ fontSize: 7.5, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* User reach — world dots twinkle in */}
                <div style={{ flex: 1.1, border: '1px solid #dee0e7', borderRadius: 6, padding: 12, background: '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={cardTitle}>User Reach</p>
                    <span style={{ fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: G }}>Countries: 12</span>
                  </div>
                  <div style={{ position: 'relative', height: 78, background: '#fafbfc', borderRadius: 4, overflow: 'hidden' }}>
                    {mapDots.map(([x, y], i) => t > 1800 && (
                      <span key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: i % 3 ? 5 : 7, height: i % 3 ? 5 : 7, borderRadius: '50%', background: i % 3 ? 'rgba(52,204,50,0.4)' : G, animation: `socPop 0.5s ease both ${i * 110}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
              {/* Recent post performance — the festive post, metrics ticking */}
              <div style={{ border: '1px solid #dee0e7', borderRadius: 6, padding: '10px 14px', background: '#fff', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 52, height: 44, borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>{horizonArt(44)}</div>
                <div style={{ minWidth: 0, flex: 1.6 }}>
                  <p style={{ margin: '0 0 2px', fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase', letterSpacing: 0.4 }}>Recent Post Performance</p>
                  <p style={{ margin: 0, fontSize: 10.5, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Every road, lit. Festive offers at your nearest ConvergenSEE showroom ✨</p>
                  <p style={{ margin: 0, fontSize: 8.5, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>All pages (4) · Instagram · 18/08/2026</p>
                </div>
                {[['Engagement', (easeOut((t - 2600) / 1200) * 8.4).toFixed(1) + '%'], ['Likes', formatIN(easeOut((t - 2750) / 1200) * 12480)], ['Reach', formatIN(easeOut((t - 2900) / 1200) * 186420)]].map(([l, v]) => (
                  <div key={l} style={{ textAlign: 'right' }}>
                    <p style={{ margin: '0 0 2px', fontSize: 8, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase', letterSpacing: 0.3 }}>{l}</p>
                    <p style={{ margin: 0, fontSize: 16, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, color: '#000718', lineHeight: 1 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        })()}

        {/* FRAME 5 — CLOSE */}
        {frame === 5 && (
          <div key="s5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 450, textAlign: 'center', animation: 'socFadeUp 0.7s ease' }}>
            <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 32, color: '#000718', textTransform: 'uppercase', margin: '0 0 6px', lineHeight: 1.05 }}>
              One brand. Every page.<br /><span style={{ color: G }}>Zero rogue posts.</span>
            </p>
            <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 13, color: '#666', margin: '10px 0 14px' }}>Central control of every location&apos;s Facebook &amp; Instagram.</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              {PAGES.map((p, i) => (
                <span key={p} style={{ background: '#e8fde8', border: `1px solid ${G}`, color: '#1b5e20', fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 700, padding: '4px 12px', borderRadius: 12, animation: `socPop 0.45s ease both ${i * 150}ms` }}>{p} · Scheduled ✓</span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: G, letterSpacing: 1 }}>SocialiseIT</span>
              <span style={{ width: 1, height: 22, background: '#dee0e7' }} />
              <span style={{ fontFamily: "'Archivo', sans-serif", fontSize: 11, color: '#9fa3ac' }}>CHNC ▸ ConvergenSEE</span>
            </div>
          </div>
        )}

        {/* FRAME 0 — idle */}
        {frame === 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 450, textAlign: 'center' }}>
            <div style={{ animation: 'socFadeUp 0.5s ease' }}>
              <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: G, textTransform: 'uppercase', margin: '0 0 6px' }}>SocialiseIT</p>
              <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: '#666', margin: 0 }}>Every location&apos;s Facebook &amp; Instagram - one command center</p>
            </div>
          </div>
        )}
      </div>

      {/* Lower-third overlay band — full width, sharp corners, 2px green top rule */}
      {overlay && (
        <div key={`band-${frame}`} style={{
          background: 'rgba(0,7,24,0.95)', borderTop: `2px solid ${G}`, padding: '11px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          animation: 'socBandUp 0.5s ease',
        }}>
          <p style={{ margin: 0, fontSize: 13, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#fff' }}>{overlay.main}</p>
          <p style={{ margin: 0, fontSize: 10, fontFamily: "'Archivo', sans-serif", color: G, fontWeight: 500 }}>{overlay.sub}</p>
        </div>
      )}
    </div>
  )
}

// ─── AIgenIT content ──────────────────────────────────────────────────────────
function AIGenContent({ controls, tileVariants }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'flex-start', width: 1119 }}>
      <StatTiles tiles={MODULES.AIgenIT.tiles} controls={controls} tileVariants={tileVariants} />
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <CTACard headline="Generate on-brand AI content at scale!" sub="Copy, captions, scripts and product descriptions - all AI-drafted, human-approved." cta="Generate" controls={controls} custom={0} />
        <ChartCard title="Generation by Type" controls={controls} custom={1}>
          <VertBars data={[{l:'Captions',v:820},{l:'Copy',v:540},{l:'Scripts',v:380},{l:'Product',v:400}]} height={200} />
        </ChartCard>
        <ChartCard title="Quality Score Trend" controls={controls} custom={2}>
          <VertBars data={[{l:'Oct',v:84},{l:'Nov',v:86},{l:'Dec',v:88},{l:'Jan',v:90},{l:'Feb',v:89},{l:'Mar',v:91}]} height={200} />
        </ChartCard>
      </div>
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <ListCard title="Recent Generations" rows={[
          { isPen: true, label: 'XUV700 Instagram Captions ×10', sub: 'Quality: 93% · 18/03/2025' },
          { isPen: true, label: 'BE6 Product Description', sub: 'Quality: 91% · 17/03/2025' },
          { isPen: true, label: 'Thar Social Copy ×5', sub: 'Quality: 89% · 16/03/2025' },
          { isPen: true, label: 'Scorpio Ad Headline Set', sub: 'Quality: 94% · 15/03/2025' },
          { isPen: true, label: 'XEV9e Email Newsletter', sub: 'Quality: 88% · 14/03/2025' },
        ]} />
        <ListCard title="Pending Approval" rows={[
          { isPen: true, label: 'BE6 Website Copy', sub: 'Generated 18/03/2025' },
          { isPen: true, label: 'XUV700 Search Ad Copy', sub: 'Generated 17/03/2025' },
          { isPen: true, label: 'Thar YouTube Description', sub: 'Generated 16/03/2025' },
          { isPen: true, label: 'Bolero Email Subject Lines', sub: 'Generated 15/03/2025' },
        ]} />
      </div>
    </div>
  )
}

// ─── AmplifyIT workflow reel ──────────────────────────────────────────────────
function AmplifyWorkflowContent({ controls, tileVariants, stepCount = 0, onFrame, onCursor }) {
  const G = '#34cc32'

  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setElapsed(e => e + 60), 60)
    return () => clearInterval(id)
  }, [])

  // Frame: 0 idle  1 Platform(6.5s)  2 Objective(5s)  3 AdSet+map(7s hero)  4 Ad(7.5s)  5 Manage(6.5s)  6 Insight(7s hero)  7 Close(4s)
  const timeline = [0, 500, 7000, 12000, 19000, 26500, 33000, 40000]
  const totalDuration = 44000
  const looped = elapsed % totalDuration

  let frame = 0, t = 0
  for (let i = timeline.length - 1; i >= 0; i--) {
    if (looped >= timeline[i]) { frame = i; t = looped - timeline[i]; break }
  }

  useEffect(() => { if (onFrame) onFrame(frame) }, [frame, onFrame])

  // Cursor — waypoints timed so the 0.65s glide lands ON each element as its action fires.
  const cursorScript = {
    1: { path: [[0, 340, 112], [600, 322, 148], [1400, 170, 208], [1900, 250, 258], [4400, 220, 362], [5500, 1005, 448]], clicks: [700, 1500, 5700] },
    2: { path: [[0, 300, 130], [800, 290, 215], [2000, 170, 277], [2800, 310, 327], [3900, 1005, 448]], clicks: [1500, 3300, 4400] },
    3: { path: [[0, 200, 140], [900, 500, 142], [1600, 140, 190], [2900, 988, 238], [4600, 430, 190], [5700, 692, 190], [6200, 1005, 448]], clicks: [2100, 3700, 5300, 6100, 6600] },
    4: { path: [[0, 200, 134], [1100, 300, 182], [1700, 44, 230], [1950, 1046, 126], [2900, 262, 292], [4300, 252, 348], [5100, 212, 394], [5800, 800, 410], [6600, 1012, 448]], clicks: [1850, 2600, 5300, 7000] },
    5: { path: [[0, 500, 160], [800, 46, 200], [1350, 46, 252], [1700, 46, 304], [2050, 46, 356], [2400, 46, 408], [3200, 700, 200], [4800, 950, 200]], clicks: [1400, 1750, 2100, 2450, 2800] },
    6: { path: [[0, 500, 132], [1000, 162, 158], [2200, 200, 224], [3000, 300, 352], [4600, 832, 352], [5800, 1008, 92]], clicks: [5950] },
  }
  const seg = cursorScript[frame]
  let cx = 400, cy = 240
  if (seg) for (const [ts, x, y] of seg.path) { if (t >= ts) { cx = x; cy = y } }
  const cursorClick = seg ? seg.clicks.find(c => t >= c && t < c + 500) : undefined

  // Camera (variable-depth rig in CHNCDashboard): windows of [start, end, zoom,
  // fx?, fy?] — fx/fy frame a fixed point instead of the cursor. ONE depth per
  // beat — depth changes only between windows; the rig's deadband lets the
  // cursor roam a held shot. Tight on the picker/form wizards (1, 2, 4), wide
  // fixed on the ad-set form before the map hero goes full-frame (pin + radius
  // stay uncropped), 1.65 on the manage table after the Published toast plays
  // full-frame, and the InsightIT KPI hero counts up full-frame before a wide
  // chart tour. Gaps = full-frame pull-backs (transitions, reveals, idle/close).
  const CAM = {
    1: [[400, 5400, 1.85]],
    2: [[400, 3800, 1.8]],
    3: [[400, 2200, 1.3, 560, 170]],
    4: [[400, 5300, 1.85], [5300, 7200, 1.5, 860, 300]],
    5: [[2600, 6000, 1.65]],
    6: [[2600, 6400, 1.3, 560, 280]],
  }
  const camWin = CAM[frame] && CAM[frame].find(([a, b]) => t >= a && t < b)
  const camZ = camWin ? camWin[2] : 0
  const camX = camWin ? (camWin[3] ?? cx) : 0
  const camY = camWin ? (camWin[4] ?? cy) : 0
  useEffect(() => {
    if (!onCursor) return
    onCursor(camZ ? { x: camX, y: camY, z: camZ } : null)
    return () => onCursor(null)
  }, [camZ, camX, camY, onCursor])

  const overlays = [
    null,
    { main: 'Step 1. Brief it. Pick Meta or Google.', sub: 'One brief. Every ad platform.' },
    { main: 'Step 2. Set the objective.', sub: 'Traffic, leads or sales - recommended settings applied.' },
    { main: 'Step 3. Target exactly who you want.', sub: 'Location, age, interests - pinned on a map.' },
    { main: 'Step 4. Build the ad, preview everywhere.', sub: 'One creative - every Meta placement.' },
    { main: 'Step 5. Launch. Then manage it live.', sub: 'Toggle, budget, bid - Meta and Google, one table.' },
    { main: 'Step 6. Every rupee, measured.', sub: 'Spend, CPL, CTR - Meta and Google side by side.' },
    { main: 'Every rupee, every platform, one dashboard.', sub: 'Performance marketing - planned, launched, managed, measured.' },
  ]
  const overlay = overlays[frame]
  const progressLabels = ['PLATFORM', 'CAMPAIGN', 'AD SET', 'AD', 'MANAGE', 'MEASURE']
  const crumbs = [
    '',
    'AmplifyIT ▸ Campaign Setup ▸ Select Platform',
    'AmplifyIT ▸ Campaign Setup ▸ Create Campaign',
    'AmplifyIT ▸ Campaign Setup ▸ Setup Ad Set',
    'AmplifyIT ▸ Campaign Setup ▸ Setup Ad',
    'AmplifyIT ▸ Campaign Manage ▸ Meta Campaigns',
    'AmplifyIT ▸ InsightIT ▸ Performance Marketing',
    '',
  ]

  const CAMP_NAME = 'Horizon Motors - Festive Drive · Mumbai'
  const CAMP_DESC = 'Festive-season push for Horizon SUV test drives across Mumbai.'
  const PRIMARY = 'Festive offers on the Horizon SUV range - book your test drive.'
  const HEADLINE = 'Every road, lit.'

  const fieldLabel = { fontSize: 10, color: '#9fa3ac', fontFamily: "'Archivo', sans-serif", fontWeight: 600, display: 'block', marginBottom: 4 }
  const fieldBox = ok => ({ border: `1.5px solid ${ok ? G : '#dee0e7'}`, padding: '8px 12px', fontSize: 12, fontFamily: "'Archivo', sans-serif", color: '#333', borderRadius: 2, transition: 'border-color 0.5s ease' })

  // Sub-views as plain functions called inline — inner components would remount on
  // every 60ms tick and kill CSS transitions.
  const ring = pct => {
    const C = 2 * Math.PI * 9
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" fill="none" stroke="#eef0f3" strokeWidth="3" />
          <circle cx="12" cy="12" r="9" fill="none" stroke={G} strokeWidth="3" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} transform="rotate(-90 12 12)" style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
        </svg>
        <span style={{ fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: pct > 0 ? G : '#9fa3ac', transition: 'color 0.4s ease' }}>{pct}%</span>
      </div>
    )
  }
  const toggle = on => (
    <div style={{ width: 30, height: 16, borderRadius: 9, background: on ? G : '#c9cdd4', position: 'relative', transition: 'background 0.35s ease', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 2, left: on ? 16 : 2, width: 12, height: 12, borderRadius: 6, background: '#fff', transition: 'left 0.35s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.25)' }} />
    </div>
  )
  const wizHead = (step, title, pct) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
      <div>
        <p style={{ margin: '0 0 2px', fontSize: 8, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', letterSpacing: 1, textTransform: 'uppercase' }}>Campaign · Step {step} of 4</p>
        <h3 style={{ margin: 0, fontSize: 16, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', textTransform: 'uppercase' }}>{title}</h3>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {ring(pct)}
        <div style={{ border: `1.5px solid ${G}`, background: '#e8fde8', color: '#1b5e20', fontSize: 10, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, padding: '6px 14px', borderRadius: 0 }}>Save &amp; Exit</div>
      </div>
    </div>
  )
  const wizFoot = (pressed, label = 'Next') => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
      <span style={{ fontSize: 9, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Last saved · just now</span>
      <div style={{ background: G, color: '#000', fontSize: 11, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, textTransform: 'uppercase', padding: '8px 30px', borderRadius: 0, letterSpacing: 0.5, animation: pressed ? 'amPress 0.45s ease, amPulseOnce 0.7s ease 0.2s' : 'none' }}>{label}</div>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 1119, position: 'relative', height: '100%' }}>
      <style>{`
        @keyframes amFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes amBlink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes amPop { 0% { transform: scale(0.6); opacity: 0; } 60% { transform: scale(1.12); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes amDrop { 0% { transform: translateY(-26px) scale(0.7); opacity: 0; } 70% { transform: translateY(3px) scale(1.05); opacity: 1; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
        @keyframes amPress { 0% { transform: scale(1); } 40% { transform: scale(0.93); } 100% { transform: scale(1); } }
        @keyframes amPulseOnce { 0% { box-shadow: 0 0 0 0 rgba(52,204,50,0.5); } 100% { box-shadow: 0 0 0 12px rgba(52,204,50,0); } }
        @keyframes amSlideIn { from { transform: translateX(105%); } to { transform: translateX(0); } }
        @keyframes amGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes amBloom { 0% { transform: scale(0.05); opacity: 0; } 60% { opacity: 0.85; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes amDash { to { stroke-dashoffset: 0; } }
        @keyframes amBandUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes amClick { 0% { transform: scale(0.25); opacity: 0.9; } 100% { transform: scale(1.3); opacity: 0; } }
      `}</style>

      {/* Progress bar */}
      <div style={{ display: 'flex', gap: 0, padding: '14px 24px 0' }}>
        {progressLabels.map((l, i) => {
          const done = (frame - 1) > i || frame === 7
          const cur = (frame - 1) === i && frame !== 7
          return (
            <div key={l} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ height: 3, width: '100%', background: (done || cur) ? G : '#dee0e7', borderRadius: 2, transition: 'background 0.6s ease', opacity: cur ? 0.5 : 1 }} />
              <span style={{ fontSize: 8, fontFamily: "'Archivo', sans-serif", color: (done || cur) ? G : '#9fa3ac', fontWeight: done ? 700 : 400, transition: 'all 0.3s ease' }}>{l}</span>
            </div>
          )
        })}
      </div>

      {/* Cursor */}
      {frame > 0 && frame <= 6 && (
        <div style={{
          position: 'absolute', left: 0, top: 0, transform: `translate(${cx}px, ${cy}px)`, zIndex: 300,
          transition: 'transform 0.65s cubic-bezier(0.25,0.1,0.25,1)', willChange: 'transform',
          pointerEvents: 'none',
        }}>
          {cursorClick !== undefined && (
            <span key={cursorClick} style={{ position: 'absolute', left: -15, top: -15, width: 30, height: 30, borderRadius: '50%', border: `2.5px solid ${G}`, animation: 'amClick 0.5s ease-out forwards' }} />
          )}
          <svg width="16" height="22" viewBox="0 0 14 19" fill="none">
            <path d="M0 0V18L4.5 13.5L8 19L10 18L6.5 12.5H13L0 0Z" fill="#000" stroke="#fff" strokeWidth="1" />
          </svg>
        </div>
      )}

      {/* Content area */}
      <div style={{ flex: 1, minHeight: 480, padding: '12px 24px', overflow: 'hidden', position: 'relative' }}>

        {frame > 0 && frame < 7 && (
          <p style={{ margin: '0 0 8px', fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac', fontWeight: 600 }}>
            {crumbs[frame].split('▸').map((c, i, a) => (
              <span key={i} style={{ color: i === a.length - 1 ? G : '#9fa3ac' }}>{c}{i < a.length - 1 ? ' ▸ ' : ''}</span>
            ))}
          </p>
        )}

        {/* FRAME 1 — SELECT PLATFORM */}
        {frame === 1 && (() => {
          const name = t > 2000 ? CAMP_NAME.slice(0, Math.max(0, Math.floor((t - 2000) / 30))) : ''
          const nameDone = t > 2000 + CAMP_NAME.length * 30
          const desc = t > 3300 ? CAMP_DESC.slice(0, Math.max(0, Math.floor((t - 3300) / 18))) : ''
          const descDone = t > 3300 + CAMP_DESC.length * 18
          return (
            <div key="am1" style={{ animation: 'amFadeUp 0.6s ease' }}>
              {wizHead(1, 'Select Platform', 0)}
              <div style={{ display: 'flex', gap: 24 }}>
                {/* Left: platform + brief */}
                <div style={{ flex: 1.15, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {[{ n: 'Google', c: '#4285f4', d: 'Search · Display · YouTube', sel: false }, { n: 'Meta', c: '#0866ff', d: 'Facebook · Instagram', sel: t > 700 }].map(p => (
                      <div key={p.n} style={{ flex: 1, border: `1.5px solid ${p.sel ? G : '#dee0e7'}`, borderRadius: 6, padding: '11px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: p.sel ? 'rgba(52,204,50,0.05)' : '#fff', transition: 'all 0.5s ease' }}>
                        <div>
                          <p style={{ margin: 0, fontSize: 15, fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: p.c }}>{p.n}</p>
                          <p style={{ margin: 0, fontSize: 8.5, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>{p.d}</p>
                        </div>
                        {p.sel && <div style={{ width: 18, height: 18, borderRadius: 9, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 800, animation: 'amPop 0.45s ease' }}>✓</div>}
                      </div>
                    ))}
                  </div>
                  <div style={{ opacity: t > 1300 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                    <label style={fieldLabel}>Ad Account</label>
                    <div style={{ ...fieldBox(t > 1500), display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{t > 1500 ? 'CS-META-01 - Horizon Motors' : 'Select ad account'}</span>
                      <span style={{ color: '#9fa3ac', fontSize: 9 }}>▾</span>
                    </div>
                  </div>
                  <div style={{ opacity: t > 1900 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                    <label style={fieldLabel}>Campaign Name</label>
                    <div style={fieldBox(nameDone)}>{name}{t > 2000 && !nameDone && <span style={{ animation: 'amBlink 0.8s infinite', color: G }}>|</span>}</div>
                  </div>
                  <div style={{ opacity: t > 3200 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                    <label style={fieldLabel}>Description</label>
                    <div style={{ ...fieldBox(descDone), minHeight: 34, lineHeight: '16px', fontSize: 11 }}>{desc}{t > 3300 && !descDone && <span style={{ animation: 'amBlink 0.8s infinite', color: G }}>|</span>}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{ flex: 1, opacity: t > 4600 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                      <label style={fieldLabel}>Region</label>
                      <div style={fieldBox(t > 4700)}>{t > 4700 ? 'Mumbai' : ''}</div>
                    </div>
                    <div style={{ flex: 1.3, opacity: t > 4600 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                      <label style={fieldLabel}>Schedule</label>
                      <div style={fieldBox(t > 4900)}>{t > 4900 ? '20/08 – 27/08/2026' : ''}</div>
                    </div>
                  </div>
                  {t > 5100 && (
                    <p style={{ margin: 0, fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333', animation: 'amFadeUp 0.5s ease' }}>
                      Budget - <span style={{ color: G }}>₹2,000/day</span> · Est. reach 4.2L – 6.8L
                    </p>
                  )}
                </div>
                {/* Right: creative preview */}
                <div style={{ flex: 1, opacity: t > 2600 ? 1 : 0, transform: t > 2600 ? 'translateX(0)' : 'translateX(24px)', transition: 'all 0.6s cubic-bezier(0.22,1,0.36,1)' }}>
                  <label style={fieldLabel}>Creative Preview</label>
                  <div style={{ border: '1px solid #dee0e7', borderRadius: 6, overflow: 'hidden', position: 'relative', background: '#fff' }}>
                    <StoryArt hue={30} style={{ height: 176, borderRadius: 0 }} />
                    <span style={{ position: 'absolute', top: 8, right: 8, background: '#fff4e0', border: '1px solid #f2a33c', color: '#a05c00', fontSize: 8, fontFamily: "'Archivo', sans-serif", fontWeight: 800, letterSpacing: 0.5, padding: '3px 8px', borderRadius: 3 }}>UNPUBLISHED</span>
                    <div style={{ padding: '8px 10px' }}>
                      <p style={{ margin: 0, fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>Horizon Motors - Festive Drive</p>
                      <p style={{ margin: 0, fontSize: 9, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>1 creative · Single image · 1080×1080</p>
                    </div>
                  </div>
                </div>
              </div>
              {wizFoot(t > 5700)}
            </div>
          )
        })()}

        {/* FRAME 2 — CREATE CAMPAIGN (objective) */}
        {frame === 2 && (() => {
          const objectives = ['Awareness', 'Traffic', 'Engagement', 'Leads', 'App promotion', 'Sales']
          return (
            <div key="am2" style={{ animation: 'amFadeUp 0.6s ease' }}>
              {wizHead(2, 'Create Campaign', 5)}
              <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <div style={{ flex: 1.4 }}>
                  <label style={fieldLabel}>Campaign Name</label>
                  <div style={fieldBox(true)}>{CAMP_NAME}</div>
                </div>
                <div style={{ flex: 1, opacity: t > 400 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                  <label style={fieldLabel}>Special Ad Categories</label>
                  <div style={{ ...fieldBox(false), color: '#9fa3ac' }}>0 categories declared</div>
                </div>
              </div>
              <label style={fieldLabel}>Campaign Objective</label>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                {objectives.map((o, i) => {
                  const sel = i === 1 && t > 1500
                  return (
                    <div key={o} style={{ flex: 1, border: `1.5px solid ${sel ? G : '#dee0e7'}`, borderRadius: 6, padding: '10px 6px 9px', textAlign: 'center', background: sel ? 'rgba(52,204,50,0.06)' : '#fff', transition: 'all 0.45s ease', opacity: t > 400 + i * 100 ? 1 : 0.25 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 6, border: `2px solid ${sel ? G : '#c9cdd4'}`, background: sel ? G : '#fff', margin: '0 auto 5px', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: sel ? 'amPop 0.45s ease' : 'none' }}>
                        {sel && <span style={{ color: '#fff', fontSize: 7, fontWeight: 800 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: sel ? 700 : 500, color: sel ? '#1b5e20' : '#555' }}>{o}</span>
                    </div>
                  )
                })}
              </div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-end' }}>
                <div style={{ width: 290, opacity: t > 2400 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                  <label style={fieldLabel}>Buying Type</label>
                  <div style={{ ...fieldBox(t > 2600), display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{t > 2600 ? 'Auction' : 'Select'}</span>
                    <span style={{ color: '#9fa3ac', fontSize: 9 }}>▾</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 9, opacity: t > 3000 ? 1 : 0.4, transition: 'opacity 0.4s ease' }}>
                  {toggle(t > 3300)}
                  <span style={{ fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#333' }}>Advantage campaign budget</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 9, opacity: 0.55 }}>
                  {toggle(false)}
                  <span style={{ fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: 600, color: '#333' }}>A/B test</span>
                </div>
              </div>
              {t > 3900 && (
                <p style={{ margin: 0, fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: G, animation: 'amFadeUp 0.5s ease' }}>✓ You have all of our recommended settings applied.</p>
              )}
              {wizFoot(t > 4400)}
            </div>
          )
        })()}

        {/* FRAME 3 — SETUP AD SET (hero: map + pin + radius) */}
        {frame === 3 && (() => {
          const ageTo = Math.round(34 + easeOut((t - 5300) / 900) * 31)
          const ageW = 30 + easeOut((t - 5300) / 900) * 54
          return (
            <div key="am3" style={{ animation: 'amFadeUp 0.6s ease' }}>
              {wizHead(3, 'Setup Ad Set', 79)}
              <div style={{ display: 'flex', gap: 10, marginBottom: 9 }}>
                {[['Conversion Location', 'Website', 400], ['Performance Goal', 'Link Clicks', 800], ['Budget', 'Daily · ₹2,000', 1200], ['Schedule', '20/08 – 27/08', 1500]].map(([l, v, at]) => (
                  <div key={l} style={{ flex: 1, opacity: t > at ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                    <label style={fieldLabel}>{l}</label>
                    <div style={{ ...fieldBox(t > at + 150), fontSize: 11, padding: '7px 10px' }}>{t > at + 150 ? v : ''}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 9 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ ...fieldLabel, marginBottom: 0 }}>Audience</span>
                  {['India', 'Mumbai'].map((c, i) => {
                    const sel = t > 2000 + i * 250
                    return <span key={c} style={{ background: sel ? '#e8fde8' : '#f5f6f8', border: `1px solid ${sel ? G : '#dee0e7'}`, color: sel ? '#1b5e20' : '#666', fontSize: 10.5, fontFamily: "'Archivo', sans-serif", fontWeight: sel ? 700 : 500, padding: '4px 12px', borderRadius: 13, transition: 'all 0.4s ease', animation: sel ? 'amPop 0.45s ease' : 'none' }}>{c}{sel ? ' ✓' : ''}</span>
                  })}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: t > 5200 ? 1 : 0.35, transition: 'opacity 0.4s ease' }}>
                  <span style={{ ...fieldLabel, marginBottom: 0 }}>Age</span>
                  <div style={{ width: 130, height: 5, background: '#eef0f3', borderRadius: 3, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '8%', width: `${ageW}%`, height: '100%', background: G, borderRadius: 3 }} />
                    <div style={{ position: 'absolute', top: '50%', left: '8%', transform: 'translate(-50%,-50%)', width: 11, height: 11, borderRadius: 6, background: '#fff', border: `2px solid ${G}`, boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                    <div style={{ position: 'absolute', top: '50%', left: `${8 + ageW}%`, transform: 'translate(-50%,-50%)', width: 11, height: 11, borderRadius: 6, background: '#fff', border: `2px solid ${G}`, boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                  </div>
                  <span style={{ fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>18 – {t > 5300 ? ageTo : 34}</span>
                </div>
                <div style={{ opacity: t > 6000 ? 1 : 0.35, transition: 'opacity 0.4s ease', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ ...fieldLabel, marginBottom: 0 }}>Placements</span>
                  <span style={{ background: t > 6100 ? '#e8fde8' : '#f5f6f8', border: `1px solid ${t > 6100 ? G : '#dee0e7'}`, color: t > 6100 ? '#1b5e20' : '#666', fontSize: 10.5, fontFamily: "'Archivo', sans-serif", fontWeight: t > 6100 ? 700 : 500, padding: '4px 12px', borderRadius: 13, transition: 'all 0.4s ease', animation: t > 6100 ? 'amPop 0.45s ease' : 'none' }}>Advantage{t > 6100 ? ' ✓' : ''}</span>
                </div>
              </div>
              {/* Map pane — hero beat */}
              <div style={{ position: 'relative', height: 208, borderRadius: 6, overflow: 'hidden', border: '1px solid #dee0e7', background: '#eef2f5', backgroundImage: 'linear-gradient(#e2e8ec 1px, transparent 1px), linear-gradient(90deg, #e2e8ec 1px, transparent 1px)', backgroundSize: '26px 26px', opacity: t > 2600 ? 1 : 0, transform: t > 2600 ? 'translateY(0)' : 'translateY(18px)', transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '11%', background: '#dbe7f0' }} />
                <div style={{ position: 'absolute', left: '13%', top: '44%', right: '26%', height: 7, background: '#d7dee3', borderRadius: 3, transform: 'rotate(-3deg)' }} />
                <div style={{ position: 'absolute', left: '38%', top: '6%', width: 8, bottom: '8%', background: '#d7dee3', borderRadius: 3, transform: 'rotate(5deg)' }} />
                <div style={{ position: 'absolute', left: '60%', top: '24%', right: '4%', height: 6, background: '#dde3e8', borderRadius: 3, transform: 'rotate(7deg)' }} />
                {t > 4200 && (
                  <div style={{ position: 'absolute', left: 'calc(55% - 78px)', top: 'calc(46% - 78px)', width: 156, height: 156, borderRadius: '50%', border: `2px solid ${G}`, background: 'rgba(52,204,50,0.13)', animation: 'amBloom 0.9s cubic-bezier(0.22,1,0.36,1) forwards' }} />
                )}
                {t > 3800 && (
                  <div style={{ position: 'absolute', left: 'calc(55% - 11px)', top: 'calc(46% - 26px)', animation: 'amDrop 0.6s ease forwards' }}>
                    <svg width="22" height="28" viewBox="0 0 16 20"><path d="M8 0C3.6 0 0 3.6 0 8c0 5.5 8 12 8 12s8-6.5 8-12c0-4.4-3.6-8-8-8z" fill="#e53935" /><circle cx="8" cy="8" r="3" fill="#fff" /></svg>
                  </div>
                )}
                {t > 4900 && (
                  <span style={{ position: 'absolute', left: '59%', top: '60%', background: '#000718', color: '#fff', fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, padding: '3px 9px', borderRadius: 3, animation: 'amFadeUp 0.5s ease' }}>Mumbai · 15 km radius</span>
                )}
                <div style={{ position: 'absolute', right: 10, top: 10, background: t > 3700 ? G : '#000718', color: t > 3700 ? '#000718' : '#fff', fontSize: 10, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, padding: '6px 14px', borderRadius: 0, transition: 'all 0.3s ease', animation: t > 3700 ? 'amPress 0.45s ease' : 'none' }}>Drop Pin</div>
                <span style={{ position: 'absolute', left: 12, bottom: 8, fontSize: 9, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Mumbai, Maharashtra</span>
              </div>
              {wizFoot(t > 6600)}
            </div>
          )
        })()}

        {/* FRAME 4 — SETUP AD */}
        {frame === 4 && (() => {
          const pri = t > 2400 ? PRIMARY.slice(0, Math.max(0, Math.floor((t - 2400) / 22))) : ''
          const priDone = t > 2400 + PRIMARY.length * 22
          const hl = t > 4000 ? HEADLINE.slice(0, Math.max(0, Math.floor((t - 4000) / 35))) : ''
          const hlDone = t > 4000 + HEADLINE.length * 35
          const tabIdx = t > 6800 ? 3 : t > 6200 ? 2 : t > 5600 ? 1 : 0
          const tabs = ['FACEBOOK', 'INSTAGRAM', 'MESSENGER', 'AUDIENCE NETWORK']
          return (
            <div key="am4" style={{ animation: 'amFadeUp 0.6s ease' }}>
              {wizHead(4, 'Setup Ad', t > 7000 ? 100 : 92)}
              <div style={{ display: 'flex', gap: 22 }}>
                {/* Left: ad build */}
                <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{ flex: 1.1, opacity: t > 400 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                      <label style={fieldLabel}>Facebook Page</label>
                      <div style={{ ...fieldBox(t > 500), fontSize: 11, padding: '7px 10px' }}>{t > 500 ? 'ConvergenSEE - Powai' : ''}</div>
                    </div>
                    <div style={{ flex: 1, opacity: t > 800 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                      <label style={fieldLabel}>Instagram Account</label>
                      <div style={{ ...fieldBox(t > 900), fontSize: 11, padding: '7px 10px' }}>{t > 900 ? '@convergensee.powai' : ''}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{ flex: 1, opacity: t > 1300 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                      <label style={fieldLabel}>Ad Type</label>
                      <div style={{ ...fieldBox(t > 1400), fontSize: 11, padding: '7px 10px' }}>{t > 1400 ? 'Create ad' : ''}</div>
                    </div>
                    <div style={{ flex: 1.1, opacity: t > 1300 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                      <label style={fieldLabel}>Format</label>
                      <div style={{ ...fieldBox(t > 1500), fontSize: 11, padding: '7px 10px' }}>{t > 1500 ? 'Single Image/Video' : ''}</div>
                    </div>
                  </div>
                  <div>
                    <label style={fieldLabel}>Media Placement</label>
                    {[{ l: 'Feeds, In-stream ads for videos and reels', s: '11 placements', on: t > 1900 }, { l: 'Stories and Reels', s: '7 placements', on: false }].map(r => (
                      <div key={r.l} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                        <div style={{ width: 12, height: 12, borderRadius: 6, border: `2px solid ${r.on ? G : '#c9cdd4'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'border-color 0.4s ease' }}>
                          {r.on && <div style={{ width: 6, height: 6, borderRadius: 3, background: G, animation: 'amPop 0.4s ease' }} />}
                        </div>
                        <span style={{ fontSize: 10.5, fontFamily: "'Archivo', sans-serif", fontWeight: r.on ? 700 : 400, color: r.on ? '#333' : '#777' }}>{r.l}</span>
                        <span style={{ fontSize: 8.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: r.on ? G : '#9fa3ac' }}>{r.s}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ opacity: t > 2300 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                    <label style={fieldLabel}>Primary Text</label>
                    <div style={{ ...fieldBox(priDone), minHeight: 32, lineHeight: '16px', fontSize: 11 }}>{pri}{t > 2400 && !priDone && <span style={{ animation: 'amBlink 0.8s infinite', color: G }}>|</span>}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{ flex: 1, opacity: t > 3900 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                      <label style={fieldLabel}>Headline</label>
                      <div style={{ ...fieldBox(hlDone), fontSize: 11, padding: '7px 10px' }}>{hl}{t > 4000 && !hlDone && <span style={{ animation: 'amBlink 0.8s infinite', color: G }}>|</span>}</div>
                    </div>
                    <div style={{ flex: 0.8, opacity: t > 4700 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                      <label style={fieldLabel}>Call To Action</label>
                      <div style={{ ...fieldBox(t > 4800), fontSize: 11, padding: '7px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{t > 4800 ? 'Book Now' : ''}</span>
                        <span style={{ color: '#9fa3ac', fontSize: 9 }}>▾</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ opacity: t > 4900 ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                    <label style={fieldLabel}>Website URL</label>
                    <div style={{ ...fieldBox(t > 5000), fontSize: 11, padding: '7px 10px' }}>{t > 5000 ? 'horizonmotors.in/festive-drive' : ''}</div>
                  </div>
                  {t > 5300 && (
                    <span style={{ alignSelf: 'flex-start', background: '#e8fde8', border: `1px solid ${G}`, color: '#1b5e20', fontSize: 9.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, padding: '4px 12px', borderRadius: 12, animation: 'amPop 0.45s ease' }}>Advantage+ creative - Enhancements (8/9) ✓</span>
                  )}
                </div>
                {/* Right: ad preview */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ ...fieldLabel, marginBottom: 0 }}>Ad Preview</label>
                    {toggle(t > 2600)}
                  </div>
                  {t > 2900 ? (
                    <div style={{ border: '1px solid #dee0e7', borderRadius: 6, overflow: 'hidden', animation: 'amFadeUp 0.5s ease', background: '#fff' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px' }}>
                        <div style={{ width: 24, height: 24, borderRadius: 12, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 12, color: '#000718', flexShrink: 0 }}>C</div>
                        <div>
                          <p style={{ margin: 0, fontSize: 10.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>ConvergenSEE - Powai</p>
                          <p style={{ margin: 0, fontSize: 8, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Sponsored · {tabs[tabIdx].charAt(0) + tabs[tabIdx].slice(1).toLowerCase()}</p>
                        </div>
                      </div>
                      <StoryArt hue={30} style={{ height: 150, borderRadius: 0 }} />
                      <div style={{ padding: '8px 10px' }}>
                        <p style={{ margin: '0 0 6px', fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#333', lineHeight: '14px', minHeight: 28 }}>{pri}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <p style={{ margin: 0, fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: '#000718' }}>{hlDone ? HEADLINE : hl}</p>
                            <p style={{ margin: 0, fontSize: 8.5, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>horizonmotors.in</p>
                          </div>
                          <div style={{ border: `1.5px solid ${G}`, color: '#1b5e20', background: '#e8fde8', fontSize: 9.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, padding: '5px 12px', borderRadius: 4, opacity: t > 4800 ? 1 : 0.4, transition: 'opacity 0.4s ease' }}>Book Now</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ border: '1.5px dashed #c9cdd4', borderRadius: 6, height: 252, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <p style={{ margin: 0, fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Turn on preview to render your ad</p>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                    {tabs.map((p, i) => {
                      const on = t > 2900 && i === tabIdx
                      return <span key={p} style={{ flex: 1, textAlign: 'center', fontSize: 7.5, fontFamily: "'Archivo', sans-serif", fontWeight: on ? 800 : 600, color: on ? '#000718' : '#9fa3ac', background: on ? G : '#f5f6f8', border: `1px solid ${on ? G : '#dee0e7'}`, padding: '4px 2px', borderRadius: 3, transition: 'all 0.3s ease', letterSpacing: 0.3, whiteSpace: 'nowrap', overflow: 'hidden' }}>{p}</span>
                    })}
                  </div>
                </div>
              </div>
              {wizFoot(t > 7000, 'Publish')}
            </div>
          )
        })()}

        {/* FRAME 5 — LAUNCH & MANAGE */}
        {frame === 5 && (() => {
          const rows = [
            { n: 'Festive Drive · Mumbai', end: 'Ends 27/08/2026', bud: '₹2,000', res: 1204, reach: 6218440, cost: 0.85, spent: 1287555, hero: true },
            { n: 'Horizon SUV Launch · Pune', end: 'Ends 05/09/2026', bud: '₹1,500', res: 842, reach: 4120118, cost: 1.12, spent: 943208 },
            { n: 'Test Drive Week · Thane', end: 'Ends 31/08/2026', bud: '₹1,200', res: 617, reach: 2864902, cost: 1.28, spent: 789760 },
            { n: 'Monsoon Service Camp', end: 'Ends 12/09/2026', bud: '₹1,000', res: 388, reach: 1945331, cost: 1.44, spent: 558913 },
            { n: 'EV Teaser · Navi Mumbai', end: 'Ends 20/09/2026', bud: '₹800', res: 296, reach: 1408269, cost: 1.61, spent: 476530 },
          ]
          const prog = easeOut((t - 1900) / 2200)
          return (
            <div key="am5" style={{ animation: 'amFadeUp 0.6s ease' }}>
              {t < 3000 && (
                <div style={{ position: 'absolute', right: 24, top: 30, zIndex: 60, display: 'flex', alignItems: 'center', gap: 8, background: '#000718', border: `1.5px solid ${G}`, borderRadius: 4, padding: '8px 14px', animation: 'amSlideIn 0.5s cubic-bezier(0.22,1,0.36,1)', opacity: t > 2400 ? 0 : 1, transition: 'opacity 0.5s ease' }}>
                  <span style={{ width: 16, height: 16, borderRadius: 8, background: G, color: '#000718', fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
                  <span style={{ fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#fff' }}>Published - Festive Drive · Mumbai is live</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', textTransform: 'uppercase' }}>Manage Campaigns</h3>
                <span style={{ border: '1px solid #dee0e7', background: '#fff', color: '#666', fontSize: 10, fontFamily: "'Archivo', sans-serif", fontWeight: 600, padding: '5px 12px', borderRadius: 14 }}>Horizon Motors · CS-META-01 ▾</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  {['META CAMPAIGNS', 'GOOGLE CAMPAIGNS'].map((tab, i) => (
                    <span key={tab} style={{ fontSize: 10.5, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, letterSpacing: 0.5, color: i === 0 ? '#000718' : '#9fa3ac', paddingBottom: 5, borderBottom: i === 0 ? `2px solid ${G}` : '2px solid transparent' }}>{tab}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['Advance filters', 'A/B test', 'Charts', 'Export', 'Sort by'].map(c => (
                    <span key={c} style={{ border: '1px solid #dee0e7', background: '#fff', color: '#666', fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4, padding: '5px 12px', borderRadius: 0 }}>{c}</span>
                  ))}
                </div>
              </div>
              <div style={{ border: '1px solid #dee0e7', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ display: 'flex', background: '#f5f6f8', padding: '7px 12px', alignItems: 'center' }}>
                  {[['', 0.5], ['Campaign', 2.2], ['Delivery', 1.05], ['Bid strategy', 1.0], ['Budget', 0.8], ['Results', 1.1], ['Reach', 1.05], ['Cost/result', 0.9], ['Amount spent', 1.05]].map(([h, f], i) => (
                    <span key={i} style={{ flex: f, fontSize: 8.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase', letterSpacing: 0.4 }}>{h}</span>
                  ))}
                </div>
                {rows.map((r, i) => {
                  const on = t > 1400 + i * 350
                  return (
                    <div key={r.n} style={{ display: 'flex', alignItems: 'center', padding: '7px 12px', borderTop: '1px solid #f0f0f0', background: r.hero && on ? 'rgba(52,204,50,0.05)' : '#fff', transition: 'background 0.5s ease' }}>
                      <div style={{ flex: 0.5 }}>{toggle(on)}</div>
                      <div style={{ flex: 2.2 }}>
                        <p style={{ margin: 0, fontSize: 11, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>{r.n}</p>
                        <p style={{ margin: 0, fontSize: 8.5, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>{r.end}</p>
                      </div>
                      <div style={{ flex: 1.05 }}>
                        <span style={{ background: on ? '#e8fde8' : '#f5f6f8', border: `1px solid ${on ? G : '#dee0e7'}`, color: on ? '#1b5e20' : '#9fa3ac', fontSize: 8.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, padding: '3px 8px', borderRadius: 10, transition: 'all 0.4s ease', whiteSpace: 'nowrap' }}>{on ? 'Active' : 'Campaign paused'}</span>
                      </div>
                      <span style={{ flex: 1.0, fontSize: 10, fontFamily: "'Archivo', sans-serif", color: '#666' }}>Highest volume</span>
                      <div style={{ flex: 0.8 }}>
                        <p style={{ margin: 0, fontSize: 10.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>{r.bud}</p>
                        <p style={{ margin: 0, fontSize: 8, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Daily</p>
                      </div>
                      {r.hero ? (
                        <>
                          <div style={{ flex: 1.1 }}>
                            <p style={{ margin: 0, fontSize: 10.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>{on ? formatIN(prog * r.res) : '—'}</p>
                            <p style={{ margin: 0, fontSize: 8, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Link clicks</p>
                          </div>
                          <span style={{ flex: 1.05, fontSize: 10.5, fontFamily: "'Archivo', sans-serif", color: '#666' }}>{on ? formatIN(prog * r.reach) : '—'}</span>
                          <span style={{ flex: 0.9, fontSize: 10.5, fontFamily: "'Archivo', sans-serif", color: '#666' }}>{on ? '₹' + (prog * r.cost).toFixed(2) : '—'}</span>
                          <span style={{ flex: 1.05, fontSize: 10.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>{on ? '₹' + formatIN(prog * r.spent) : '—'}</span>
                        </>
                      ) : (
                        <>
                          <div style={{ flex: 1.1 }}>
                            {on ? (
                              <div style={{ animation: 'amFadeUp 0.5s ease' }}>
                                <p style={{ margin: 0, fontSize: 10.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>{formatIN(r.res)}</p>
                                <p style={{ margin: 0, fontSize: 8, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Link clicks</p>
                              </div>
                            ) : <p style={{ margin: 0, fontSize: 10.5, color: '#9fa3ac' }}>—</p>}
                          </div>
                          <span style={{ flex: 1.05, fontSize: 10.5, fontFamily: "'Archivo', sans-serif", color: '#666' }}>{on ? formatIN(r.reach) : '—'}</span>
                          <span style={{ flex: 0.9, fontSize: 10.5, fontFamily: "'Archivo', sans-serif", color: '#666' }}>{on ? '₹' + r.cost.toFixed(2) : '—'}</span>
                          <span style={{ flex: 1.05, fontSize: 10.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#333' }}>{on ? '₹' + formatIN(r.spent) : '—'}</span>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })()}

        {/* FRAME 6 — MEASURE: InsightIT performance marketing (hero) */}
        {frame === 6 && (() => {
          const kpis = [
            { l: 'Impressions', v: 18642310, d: '▲ 14.2%', pts: '0,19 14,15 28,17 42,12 56,13 70,9 84,10 100,5' },
            { l: 'Leads', v: 4312, d: '▲ 9.6%', pts: '0,18 14,16 28,13 42,14 56,10 70,11 84,7 100,4' },
            { l: 'CPL', v: 432, pre: '₹', d: '▼ 6.8%', pts: '0,6 14,9 28,8 42,12 56,11 70,14 84,13 100,17' },
            { l: 'Reach', v: 6218440, d: '▲ 11.3%', pts: '0,19 14,17 28,14 42,15 56,11 70,8 84,9 100,5' },
          ]
          const bars = [32, 44, 38, 56, 50, 68, 60, 80, 72, 92, 84, 104, 96, 118]
          const sProg = easeOut((t - 1600) / 1400)
          return (
            <div key="am6" style={{ animation: 'amFadeUp 0.6s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <h3 style={{ margin: 0, fontSize: 16, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, color: '#000718', textTransform: 'uppercase' }}>Performance Marketing</h3>
                  {['META', 'GOOGLE'].map((tab, i) => (
                    <span key={tab} style={{ fontSize: 10.5, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, letterSpacing: 0.5, color: i === 0 ? '#000718' : '#9fa3ac', paddingBottom: 3, borderBottom: i === 0 ? `2px solid ${G}` : '2px solid transparent' }}>{tab}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['All locations ▾', 'Lifetime ▾'].map(c => (
                    <span key={c} style={{ border: '1px solid #dee0e7', background: '#fff', color: '#666', fontSize: 9.5, fontFamily: "'Archivo', sans-serif", fontWeight: 600, padding: '5px 12px', borderRadius: 0 }}>{c}</span>
                  ))}
                  <span style={{ background: G, color: '#000718', fontSize: 9.5, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, padding: '5px 14px', borderRadius: 0 }}>Export All</span>
                </div>
              </div>
              {/* KPI cards */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                {kpis.map((k, i) => (
                  <div key={k.l} style={{ flex: 1, border: '1px solid #dee0e7', borderRadius: 6, padding: '9px 12px', background: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                      <p style={{ margin: 0, fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase', letterSpacing: 0.3 }}>{k.l}</p>
                      <span style={{ background: '#e8fde8', border: `1px solid ${G}`, color: '#1b5e20', fontSize: 7.5, fontFamily: "'Archivo', sans-serif", fontWeight: 800, padding: '2px 6px', borderRadius: 8 }}>{k.d}</span>
                    </div>
                    <p style={{ margin: '0 0 4px', fontSize: 21, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, color: i === 1 ? G : '#000718', lineHeight: 1 }}>{k.pre || ''}{formatIN(easeOut((t - 200 - i * 150) / 1800) * k.v)}</p>
                    <svg width="100%" height="20" viewBox="0 0 100 22" preserveAspectRatio="none">
                      <polyline points={k.pts} fill="none" stroke={G} strokeWidth="1.8" pathLength="100" strokeDasharray="100" strokeDashoffset="100" style={{ animation: t > 400 + i * 150 ? 'amDash 1.2s ease forwards' : 'none' }} />
                    </svg>
                  </div>
                ))}
              </div>
              {/* Clicks / CTR / CPC strip */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 10, opacity: t > 1600 ? 1 : 0.3, transition: 'opacity 0.5s ease' }}>
                {[['Clicks', formatIN(sProg * 214860), '▲ 12.4%'], ['CTR', (sProg * 1.15).toFixed(2) + '%', '▲ 0.21'], ['CPC', '₹' + (sProg * 3.47).toFixed(2), '▼ 8.1%']].map(([l, v, d]) => (
                  <div key={l} style={{ flex: 1, border: '1px solid #dee0e7', borderRadius: 6, padding: '7px 12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 9, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase', letterSpacing: 0.3 }}>{l}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16, fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, color: '#000718' }}>{v}</span>
                      <span style={{ background: '#e8fde8', border: `1px solid ${G}`, color: '#1b5e20', fontSize: 7.5, fontFamily: "'Archivo', sans-serif", fontWeight: 800, padding: '2px 6px', borderRadius: 8 }}>{d}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Charts */}
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ flex: 1.35, border: '1px solid #dee0e7', borderRadius: 6, padding: 12, background: '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <p style={{ margin: 0, fontSize: 9.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase' }}>Amount Spent</p>
                    <span style={{ fontSize: 8.5, fontFamily: "'Archivo', sans-serif", color: '#9fa3ac' }}>Daily · Maximum ▾</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 128 }}>
                    {bars.map((h, i) => t > 2400 && (
                      <div key={i} style={{ flex: 1, height: h, background: i === bars.length - 1 ? G : 'rgba(52,204,50,0.35)', borderRadius: '3px 3px 0 0', transformOrigin: 'bottom', animation: `amGrow 0.7s ease forwards ${i * 90}ms`, transform: 'scaleY(0)' }} />
                    ))}
                  </div>
                </div>
                <div style={{ flex: 1, border: '1px solid #dee0e7', borderRadius: 6, padding: 12, background: '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <p style={{ margin: 0, fontSize: 9.5, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#9fa3ac', textTransform: 'uppercase' }}>Impressions &amp; Clicks</p>
                    <div style={{ display: 'flex', gap: 10 }}>
                      {[['Impressions', G], ['Clicks', '#000718']].map(([l, c]) => (
                        <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 8, fontFamily: "'Archivo', sans-serif", color: '#666' }}>
                          <span style={{ width: 7, height: 7, borderRadius: 4, background: c }} />{l}
                        </span>
                      ))}
                    </div>
                  </div>
                  <svg width="100%" height="128" viewBox="0 0 420 128" preserveAspectRatio="none">
                    <path d="M0 104 C 40 92, 70 96, 105 80 C 140 64, 175 70, 210 58 C 245 46, 280 50, 315 38 C 350 28, 385 30, 420 20" fill="none" stroke={G} strokeWidth="2.2" pathLength="100" strokeDasharray="100" strokeDashoffset="100" style={{ animation: t > 3400 ? 'amDash 1.6s ease forwards' : 'none' }} />
                    <path d="M0 116 C 45 112, 80 108, 120 102 C 160 96, 200 90, 240 84 C 280 78, 330 72, 380 66 C 395 64, 410 62, 420 60" fill="none" stroke="#000718" strokeWidth="1.8" opacity="0.55" pathLength="100" strokeDasharray="100" strokeDashoffset="100" style={{ animation: t > 3700 ? 'amDash 1.9s ease forwards' : 'none' }} />
                  </svg>
                </div>
              </div>
            </div>
          )
        })()}

        {/* FRAME 7 — CLOSE */}
        {frame === 7 && (
          <div key="am7" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 450, textAlign: 'center', animation: 'amFadeUp 0.7s ease' }}>
            <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 32, color: '#000718', textTransform: 'uppercase', margin: '0 0 6px', lineHeight: 1.05 }}>
              Every <span style={{ color: G }}>rupee</span>, every <span style={{ color: G }}>platform</span>,<br />one dashboard.
            </p>
            <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 13, color: '#666', margin: '10px 0 18px' }}>Performance marketing - planned, launched, managed, measured.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: G, letterSpacing: 1 }}>AmplifyIT</span>
              <span style={{ width: 1, height: 22, background: '#dee0e7' }} />
              <span style={{ fontFamily: "'Archivo', sans-serif", fontSize: 11, color: '#9fa3ac' }}>CHNC ▸ ConvergenSEE</span>
            </div>
          </div>
        )}

        {/* FRAME 0 — idle */}
        {frame === 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 450, textAlign: 'center' }}>
            <div style={{ animation: 'amFadeUp 0.5s ease' }}>
              <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: G, textTransform: 'uppercase', margin: '0 0 6px' }}>AmplifyIT</p>
              <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: '#666', margin: 0 }}>Performance marketing across Meta &amp; Google</p>
            </div>
          </div>
        )}
      </div>

      {/* Lower-third overlay band */}
      {overlay && (
        <div key={`band-${frame}`} style={{
          background: 'rgba(0,7,24,0.95)', borderTop: `2px solid ${G}`, padding: '11px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          animation: 'amBandUp 0.5s ease',
        }}>
          <p style={{ margin: 0, fontSize: 13, fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: '#fff' }}>{overlay.main}</p>
          <p style={{ margin: 0, fontSize: 10, fontFamily: "'Archivo', sans-serif", color: G, fontWeight: 500 }}>{overlay.sub}</p>
        </div>
      )}
    </div>
  )
}

// ─── SearchIT content ─────────────────────────────────────────────────────────
function SearchContent({ controls, tileVariants }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'flex-start', width: 1119 }}>
      <StatTiles tiles={MODULES.SearchIT.tiles} controls={controls} tileVariants={tileVariants} />
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <CTACard headline="Dominate search with data-driven SEO!" sub="Track rankings, identify opportunities and grow organic traffic across all models." cta="Keyword Research" controls={controls} custom={0} />
        <ChartCard title="Position Funnel" controls={controls} custom={1} h={296}>
          <FunnelViz stages={[{l:'Position 1–3',v:'124'},{l:'Position 4–10',v:'298'},{l:'Position 11–20',v:'341'},{l:'Position 21+',v:'129'}]} />
        </ChartCard>
        <ChartCard title="Traffic by Channel" controls={controls} custom={2}>
          <VertBars data={[{l:'Organic',v:38},{l:'Direct',v:21},{l:'Referral',v:12},{l:'Social',v:8},{l:'Email',v:4}]} height={200} />
        </ChartCard>
      </div>
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <ListCard title="Tracked Keywords" rows={[
          { isPen: false, label: 'mahindra xuv700 price', sub: 'Position: 2 · Volume: 18K' },
          { isPen: false, label: 'best suv india 2025', sub: 'Position: 5 · Volume: 22K' },
          { isPen: false, label: 'mahindra thar off road', sub: 'Position: 3 · Volume: 14K' },
          { isPen: false, label: 'electric suv india', sub: 'Position: 8 · Volume: 31K' },
          { isPen: false, label: 'mahindra be6 features', sub: 'Position: 1 · Volume: 9K' },
        ]} />
        <ListCard title="Backlink Sources" rows={[
          { isPen: false, label: 'autocarindia.com', sub: 'DA: 72 · 38 links' },
          { isPen: false, label: 'cardekho.com', sub: 'DA: 68 · 52 links' },
          { isPen: false, label: 'team-bhp.com', sub: 'DA: 61 · 91 links' },
          { isPen: false, label: 'zigwheels.com', sub: 'DA: 65 · 29 links' },
          { isPen: false, label: 'motorbeam.com', sub: 'DA: 54 · 18 links' },
        ]} />
      </div>
    </div>
  )
}

// ─── InvoiceIT content ────────────────────────────────────────────────────────
function InvoiceContent({ controls, tileVariants }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'flex-start', width: 1119 }}>
      <StatTiles tiles={MODULES.InvoiceIT.tiles} controls={controls} tileVariants={tileVariants} />
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <CTACard headline="Track, send and reconcile invoices effortlessly!" sub="Manage all agency billing and client invoices in one streamlined workflow." cta="New Invoice" controls={controls} custom={0} />
        <ChartCard title="Payment Status" controls={controls} custom={1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <HorizRow label="Paid" value={71} max={84} />
            <HorizRow label="Due in 30 days" value={7} max={84} />
            <HorizRow label="Overdue" value={6} max={84} />
          </div>
        </ChartCard>
        <ChartCard title="Revenue by Client" controls={controls} custom={2}>
          <VertBars data={[{l:'Mah.',v:3.4},{l:'Hero',v:1.8},{l:'TATA',v:2.1},{l:'TVS',v:0.9},{l:'Other',v:0.2}]} height={200} />
        </ChartCard>
      </div>
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <ListCard title="Recent Invoices" rows={[
          { isPen: false, label: 'INV-2025-084 · Mahindra', sub: '₹1.2L · Paid 15/03/2025' },
          { isPen: false, label: 'INV-2025-083 · Hero MotoCorp', sub: '₹68K · Paid 14/03/2025' },
          { isPen: false, label: 'INV-2025-082 · TATA Motors', sub: '₹94K · Paid 12/03/2025' },
          { isPen: false, label: 'INV-2025-081 · TVS Motor', sub: '₹42K · Paid 10/03/2025' },
          { isPen: false, label: 'INV-2025-080 · Mahindra', sub: '₹1.1L · Paid 08/03/2025' },
        ]} />
        <ListCard title="Overdue Invoices" rows={[
          { isPen: false, label: 'INV-2025-078 · Mahindra', sub: '₹38K · Overdue 14 days' },
          { isPen: false, label: 'INV-2025-076 · Hero MotoCorp', sub: '₹22K · Overdue 21 days' },
          { isPen: false, label: 'INV-2025-073 · Hyundai', sub: '₹55K · Overdue 30 days' },
          { isPen: false, label: 'INV-2025-071 · Kia India', sub: '₹18K · Overdue 45 days' },
        ]} />
      </div>
    </div>
  )
}

// ─── AdaptIT content ──────────────────────────────────────────────────────────
function AdaptContent({ controls, tileVariants }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'flex-start', width: 1119 }}>
      <StatTiles tiles={MODULES.AdaptIT.tiles} controls={controls} tileVariants={tileVariants} />
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <CTACard headline="Adapt every campaign to every market!" sub="Localise messaging, visuals, pricing and compliance for each region automatically." cta="New Market" controls={controls} custom={0} />
        <ChartCard title="Localisation Coverage" controls={controls} custom={1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <HorizRow label="North" value={92} max={100} unit="%" />
            <HorizRow label="West" value={88} max={100} unit="%" />
            <HorizRow label="South" value={84} max={100} unit="%" />
            <HorizRow label="East" value={71} max={100} unit="%" />
          </div>
        </ChartCard>
        <ChartCard title="Assets by Language" controls={controls} custom={2}>
          <VertBars data={[{l:'HI',v:64},{l:'EN',v:58},{l:'TA',v:38},{l:'TE',v:32},{l:'MR',v:28},{l:'BN',v:28}]} height={200} />
        </ChartCard>
      </div>
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <ListCard title="Active Market Rollouts" rows={[
          { isPen: false, label: 'Festive Drive · North', sub: 'Hindi · 42 assets live' },
          { isPen: false, label: 'Monsoon Care · South', sub: 'Tamil + Telugu · 31 assets' },
          { isPen: false, label: 'City Lights · West', sub: 'Marathi · 26 assets' },
          { isPen: false, label: 'Harvest Fest · East', sub: 'Bengali · 19 assets' },
          { isPen: false, label: 'Year-End Sale · PAN India', sub: '9 languages · 87 assets' },
        ]} />
        <ListCard title="Compliance & Pricing" rows={[
          { isPen: false, label: 'Regional pricing synced', sub: '12 markets · updated 16/03/2025' },
          { isPen: false, label: 'Ad disclaimers updated', sub: '9 languages · legal approved' },
          { isPen: false, label: 'Festival calendar mapped', sub: '28 events · next: Gudi Padwa' },
          { isPen: false, label: 'Format & currency checks', sub: '0 issues across active markets' },
        ]} />
      </div>
    </div>
  )
}

// ─── EngageIT content ─────────────────────────────────────────────────────────
function EngageContent({ controls, tileVariants }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'flex-start', width: 1119 }}>
      <StatTiles tiles={MODULES.EngageIT.tiles} controls={controls} tileVariants={tileVariants} />
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <CTACard headline="Keep every customer in the conversation!" sub="Track touchpoints, trigger follow-ups and grow retention across every channel." cta="New Journey" controls={controls} custom={0} />
        <ChartCard title="Journey Funnel" controls={controls} custom={1} h={296}>
          <FunnelViz stages={[{l:'Reached',v:'38K'},{l:'Engaged',v:'12.4K'},{l:'Responded',v:'5.2K'},{l:'Converted',v:'1.9K'}]} />
        </ChartCard>
        <ChartCard title="Engagement by Channel" controls={controls} custom={2}>
          <VertBars data={[{l:'WhatsApp',v:46},{l:'Email',v:28},{l:'SMS',v:14},{l:'Push',v:9},{l:'Web',v:6}]} height={200} />
        </ChartCard>
      </div>
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <ListCard title="Active Journeys" rows={[
          { isPen: false, label: 'Test-drive follow-up', sub: 'WhatsApp · 1,240 in journey' },
          { isPen: false, label: 'Service reminder', sub: 'SMS + Email · 3,480 in journey' },
          { isPen: false, label: 'Abandoned enquiry nudge', sub: 'Email · 860 in journey' },
          { isPen: false, label: 'Loyalty win-back', sub: 'WhatsApp · 620 in journey' },
          { isPen: false, label: 'Delivery feedback', sub: 'WhatsApp · 410 in journey' },
        ]} />
        <ListCard title="Recent Automations" rows={[
          { isPen: false, label: 'Re-engagement burst', sub: '2,140 sent · 31% open · 18/03/2025' },
          { isPen: false, label: 'Birthday offers', sub: '380 sent · 42% open · 17/03/2025' },
          { isPen: false, label: 'Segment refresh', sub: '6 segments rebuilt · 16/03/2025' },
          { isPen: false, label: 'Churn-risk alerts', sub: '92 flagged · routed to CRM' },
        ]} />
      </div>
    </div>
  )
}

// ─── ConvergeIT content ───────────────────────────────────────────────────────
function ConvergeContent({ controls, tileVariants }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'flex-start', width: 1119 }}>
      <StatTiles tiles={MODULES.ConvergeIT.tiles} controls={controls} tileVariants={tileVariants} />
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <CTACard headline="Every agency, one view!" sub="See performance side by side across every partner, no more chasing updates." cta="Add Agency" controls={controls} custom={0} />
        <ChartCard title="Spend Share by Agency" controls={controls} custom={1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <HorizRow label="Aurora Media" value={34} max={100} unit="%" />
            <HorizRow label="PixelForge" value={26} max={100} unit="%" />
            <HorizRow label="BlueOrbit" value={22} max={100} unit="%" />
            <HorizRow label="Kite Digital" value={18} max={100} unit="%" />
          </div>
        </ChartCard>
        <ChartCard title="Leads by Agency" controls={controls} custom={2}>
          <VertBars data={[{l:'AUR',v:52},{l:'PXF',v:41},{l:'BLO',v:33},{l:'KITE',v:24},{l:'IN-H',v:18}]} height={200} />
        </ChartCard>
      </div>
      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', overflow: 'hidden' }}>
        <ListCard title="Agency Scorecard" rows={[
          { isPen: false, label: 'Aurora Media · Paid Social', sub: 'ROAS 4.8x · spend ₹6.2L' },
          { isPen: false, label: 'PixelForge · Search', sub: 'ROAS 4.2x · spend ₹4.8L' },
          { isPen: false, label: 'BlueOrbit · Programmatic', sub: 'ROAS 3.6x · spend ₹4.1L' },
          { isPen: false, label: 'Kite Digital · Influencer', sub: 'ROAS 3.1x · spend ₹3.5L' },
          { isPen: false, label: 'In-house · CRM & Email', sub: 'ROAS 5.0x · spend ₹1.9L' },
        ]} />
        <ListCard title="Latest Syncs" rows={[
          { isPen: false, label: 'Weekly reports merged', sub: '7 agencies · 18/03/2025' },
          { isPen: false, label: 'Budget reallocation approved', sub: '₹2.4L moved to top performer' },
          { isPen: false, label: 'Audience overlap flagged', sub: 'Aurora ↔ PixelForge · 12% shared' },
          { isPen: false, label: 'QBR deck auto-compiled', sub: 'All partners · ready to share' },
        ]} />
      </div>
    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function CHNCDashboard({ tilesTrigger, activeModule = 'InsightIT', onModuleChange, stepCount = 0, showWorkflow = false, onFrame, bare = false, staticMode = false }) {
  const containerRef = useRef()
  const [scale, setScale] = useState(1)
  const controls = useAnimation()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / 1440)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // staticMode (small screens / reduced motion): tiles land in their final
  // state instead of staggering in.
  useEffect(() => {
    if (tilesTrigger) staticMode ? controls.set('visible') : controls.start('visible')
  }, [tilesTrigger, controls, staticMode])

  useEffect(() => {
    controls.stop()
    if (staticMode) { controls.set('visible'); return }
    controls.set('hidden')
    setTimeout(() => controls.start('visible'), 50)
  }, [activeModule, staticMode])

  const tileVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' } }),
  }

  const mod = MODULES[activeModule] || MODULES.InsightIT

  // Camera rig — reels report a framing target via onCursor ({x, y, z?} in
  // reel-local coords; null = pull back to the full view). z sets the shot
  // depth per beat (tight ~1.85 on fields/chips, wide ~1.3 on card grids and
  // charts; default 1.65 keeps CreateIT/InsightIT unchanged). Two nested
  // compositor-driven CSS transitions (outer pan, inner zoom) keep the glide
  // smooth no matter what the 60ms reel re-renders do to the main thread — a
  // JS/rAF camera visibly drops frames whenever React work blocks it.
  // Glide time scales with pan distance, the zoom outlasts the pan a touch on
  // push-ins, pull-backs release quicker, and a retarget that lands mid-glide
  // gets a fast-start ease so the redirect keeps its apparent momentum.
  const [camCursor, setCamCursor] = useState(null)
  const cam = useRef({ tx: 0, ty: 0, s: 1, panDur: 0.9, zoomDur: 1, panEase: 'cubic-bezier(0.33, 0, 0.15, 1)', zoomEase: 'cubic-bezier(0.33, 0, 0.15, 1)', settleAt: 0 })
  const camOn = camCursor && ['CreateIT', 'InsightIT', 'SocialiseIT', 'LocateIT', 'ScriptIT', 'AIgenIT', 'AmplifyIT'].includes(activeModule) && showWorkflow
  // reel local coords → 1440×930 canvas coords (content area offset), clamped to edges
  const camZ = camOn ? (camCursor.z || 1.65) : 1
  const camTx = camOn ? Math.max(1440 - 1440 * camZ, Math.min(0, 720 - camZ * (289 + camCursor.x + 8))) : 0
  const camTy = camOn ? Math.max(930 - 930 * camZ, Math.min(0, 465 - camZ * (250 + camCursor.y + 11))) : 0
  {
    // Durations/easings must land in the SAME commit as the new transform
    // targets, so they're derived during render (ref-guarded: unchanged
    // targets — including StrictMode re-renders — are a no-op). A deadband
    // drops same-zoom retargets that would shift the view < 170px: the cursor
    // roams inside the held shot and the camera only moves for real relocations
    // — chasing every waypoint is what read as shaky.
    const c = cam.current
    const dist = Math.hypot(camTx - c.tx, camTy - c.ty)
    const zoomSame = Math.abs(camZ - c.s) < 0.01
    if ((camTx !== c.tx || camTy !== c.ty || !zoomSame) && !(zoomSame && dist < 170)) {
      const now = performance.now()
      if (camZ < c.s - 0.01) {
        // pull-back: stately release; the pan lands before the zoom so the
        // shrinking frame can never expose past the canvas edge
        c.panDur = 1.4; c.zoomDur = 1.65
        c.panEase = c.zoomEase = 'cubic-bezier(0.3, 0.1, 0.25, 1)'
      } else {
        // unhurried: ~1.3s nearby, ~2.2s cross-canvas; zoom settles after the pan
        c.panDur = Math.round(Math.min(2.2, 1.15 + dist / 900) * 100) / 100
        c.zoomDur = camZ > c.s + 0.01 ? Math.round(c.panDur * 115) / 100 : c.panDur
        c.panEase = now < c.settleAt ? 'cubic-bezier(0.25, 0.35, 0.2, 1)' : 'cubic-bezier(0.35, 0, 0.12, 1)'
        c.zoomEase = 'cubic-bezier(0.35, 0, 0.12, 1)'
      }
      c.settleAt = now + Math.max(c.panDur, c.zoomDur) * 1000
      c.tx = camTx; c.ty = camTy; c.s = camZ
    }
  }

  return (
    <div ref={containerRef} className={staticMode ? 'chnc-static' : undefined} style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', background: 'transparent', borderRadius: 8 }}>
      <div style={{ width: 1440, height: 930, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'relative', background: '#f9f9fd', overflow: 'hidden' }}>
       <div style={{ width: 1440, height: 930, position: 'relative', transform: `translate(${cam.current.tx}px, ${cam.current.ty}px)`, transformOrigin: '0 0', transition: `transform ${cam.current.panDur}s ${cam.current.panEase}`, willChange: 'transform' }}>
       <div style={{ width: 1440, height: 930, position: 'relative', transform: `scale(${cam.current.s})`, transformOrigin: '0 0', transition: `transform ${cam.current.zoomDur}s ${cam.current.zoomEase}`, willChange: 'transform' }}>

        {/* bare: feature-shot mode for the home hero — the real CHNC sidebar
            and topbar frame the module's feature composition, without the
            in-page chrome (page header/tabs). InsightIT only for now. */}
        {bare ? <>
          <Sidebar active="InsightIT" org={{ initials: 'HM', name: 'Horizon Motors', sub: 'Automobile Ind' }} />
          <Header />
          <div style={{ position: 'absolute', left: 257, top: 70, width: 1183, height: 860 }}>
            <InsightFeatureContent controls={controls} />
          </div>
        </> : <>
        <Sidebar active={activeModule} insightSub={activeModule === 'InsightIT' && showWorkflow} org={
          ['ScriptIT', 'AmplifyIT', 'InsightIT', 'LocateIT', 'CreateIT', 'AIgenIT'].includes(activeModule) && showWorkflow ? { initials: 'HM', name: 'Horizon Motors', sub: 'Automobile Ind' }
          : activeModule === 'SocialiseIT' && showWorkflow ? { initials: 'C', name: 'ConvergenSEE', sub: 'Automobile Ind' }
          : undefined} />
        <Header />

        {/* Main content */}
        <div style={{ position: 'absolute', left: 257, top: 70, width: 1183, padding: '30px 32px 36px', display: 'flex', flexDirection: 'column', gap: 30 }}>

          {/* Page header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: 1120 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, height: 50, justifyContent: 'center' }}>
                <p style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 300, color: '#101010', fontSize: 12, lineHeight: '20px' }}>Home</p>
                <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, lineHeight: '38px', color: '#000718', fontSize: 24, whiteSpace: 'nowrap' }}>{mod.title}</p>
              </div>
              <div style={{ background: '#34cc32', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 15px' }}>
                <div style={{ display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                    {[[1.1, 1.1], [12.1, 1.1], [1.1, 12.1], [12.1, 12.1]].map(([x, y], i) => (
                      <rect key={i} x={x} y={y} width="6.8" height="6.8" rx="0.7" stroke="#000718" strokeWidth="1.4" />
                    ))}
                  </svg>
                  <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, lineHeight: '20px', color: '#000718', fontSize: 14, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Configure</p>
                </div>
              </div>
            </div>

            {/* Tab bar */}
            <div style={{ position: 'relative', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ position: 'absolute', background: '#dee0e7', height: 1, left: -32, top: 39, width: 1183 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', justifyContent: 'center', width: 91.667 }}>
                <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, lineHeight: '18px', color: '#000718', fontSize: 14, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Overview</p>
                <div style={{ background: '#000718', height: 2, width: '100%' }} />
              </div>
              {['Analytics', 'Reports'].map(tab => (
                <div key={tab} style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', justifyContent: 'center', width: 91.667 }}>
                  <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, lineHeight: '18px', color: '#666a74', fontSize: 14, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{tab}</p>
                  <div style={{ height: 2, width: '100%' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Module content */}
          <div style={{ position: 'relative', width: 1121 }}>
            {activeModule === 'LocateIT' && showWorkflow && <LocateWorkflowContent controls={controls} tileVariants={tileVariants} stepCount={stepCount} onFrame={onFrame} onCursor={setCamCursor} />}
            {activeModule === 'LocateIT' && !showWorkflow && <LocateContent controls={controls} tileVariants={tileVariants} />}
            {activeModule === 'AmplifyIT' && showWorkflow && <AmplifyWorkflowContent controls={controls} tileVariants={tileVariants} stepCount={stepCount} onFrame={onFrame} onCursor={setCamCursor} />}
            {activeModule === 'AmplifyIT' && !showWorkflow && <AmplifyContent controls={controls} tileVariants={tileVariants} />}
            {activeModule === 'CreateIT' && showWorkflow && <CreateContent controls={controls} tileVariants={tileVariants} stepCount={stepCount} onFrame={onFrame} onCursor={setCamCursor} />}
            {activeModule === 'CreateIT' && !showWorkflow && <CreateStandardContent controls={controls} tileVariants={tileVariants} />}
            {activeModule === 'SocialiseIT' && showWorkflow && <SocialiseWorkflowContent controls={controls} tileVariants={tileVariants} stepCount={stepCount} onFrame={onFrame} onCursor={setCamCursor} />}
            {activeModule === 'SocialiseIT' && !showWorkflow && <SocialiseContent controls={controls} tileVariants={tileVariants} />}
            {activeModule === 'InfluenceIT' && <InfluenceContent controls={controls} tileVariants={tileVariants} />}
            {activeModule === 'ScriptIT' && showWorkflow && <ScriptWorkflowContent controls={controls} tileVariants={tileVariants} stepCount={stepCount} onFrame={onFrame} onCursor={setCamCursor} />}
            {activeModule === 'ScriptIT' && !showWorkflow && <ScriptContent controls={controls} tileVariants={tileVariants} />}
            {activeModule === 'AIgenIT' && showWorkflow && <AIGenWorkflowContent controls={controls} tileVariants={tileVariants} stepCount={stepCount} onFrame={onFrame} onCursor={setCamCursor} />}
            {activeModule === 'AIgenIT' && !showWorkflow && <AIGenContent controls={controls} tileVariants={tileVariants} />}
            {activeModule === 'SearchIT'    && <SearchContent    controls={controls} tileVariants={tileVariants} />}
            {activeModule === 'InvoiceIT'   && <InvoiceContent   controls={controls} tileVariants={tileVariants} />}
            {activeModule === 'AdaptIT'     && <AdaptContent     controls={controls} tileVariants={tileVariants} />}
            {activeModule === 'EngageIT'    && <EngageContent    controls={controls} tileVariants={tileVariants} />}
            {activeModule === 'ConvergeIT'  && <ConvergeContent  controls={controls} tileVariants={tileVariants} />}
            {activeModule === 'InsightIT' && showWorkflow && <InsightWorkflowContent controls={controls} tileVariants={tileVariants} stepCount={stepCount} onFrame={onFrame} onCursor={setCamCursor} />}
            {((activeModule === 'InsightIT' && !showWorkflow) || !['InsightIT','LocateIT','AmplifyIT','CreateIT','SocialiseIT','InfluenceIT','ScriptIT','AIgenIT','SearchIT','InvoiceIT','AdaptIT','EngageIT','ConvergeIT'].includes(activeModule)) &&
              <InsightContent controls={controls} tileVariants={tileVariants} />}
          </div>
        </div>
        </>}

       </div>
       </div>
      </div>
    </div>
  )
}
