'use client'

import { useRef, useEffect, useState } from 'react'
import {
  motion,
  useAnimation,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import useResponsive from '../useResponsive'

const items = [
  'InsightIT', 'LocateIT', 'CreateIT', 'AmplifyIT', 'SocialiseIT',
  'InfluenceIT', 'ScriptIT', 'AIgenIT', 'SearchIT', 'InvoiceIT',
  'AdaptIT', 'EngageIT', 'ConvergeIT',
]

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function DockItem({ label, mouseX, isActive, onSelect, isSmall }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  // Mouse proximity → scale up width
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })
  const widthSync = useTransform(distance, [-160, 0, 160], [76, 96, 76])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 160, damping: 14 })

  const heightSync = useTransform(distance, [-160, 0, 160], [36, 44, 36])
  const height = useSpring(heightSync, { mass: 0.1, stiffness: 160, damping: 14 })

  return (
    <motion.button
      ref={ref}
      data-dock-item={label}
      variants={itemVariants}
      onClick={() => onSelect(label)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Small screens: no cursor-proximity magnification — fixed size with a
        // >=44px tap target. Desktop keeps the spring-driven width/height.
        width: isSmall ? 76 : width,
        height: isSmall ? 44 : height,
        padding: 0,
        background: isActive ? 'rgba(52,204,50,0.15)' : hovered ? 'rgba(52,204,50,0.1)' : 'rgba(255,255,255,0.03)',
        border: isActive ? '1px solid rgba(52,204,50,0.8)' : hovered ? '1px solid rgba(52,204,50,0.5)' : '1px solid rgba(255,255,255,0.07)',
        borderRadius: 0,
        cursor: 'pointer',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxShadow: isActive ? '0 0 20px rgba(52,204,50,0.3)' : hovered ? '0 0 16px rgba(52,204,50,0.2)' : 'none',
        transition: 'background 0.2s ease, border 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <span style={{
        fontFamily: 'Saira Condensed, sans-serif',
        fontWeight: isActive ? 600 : 400,
        fontSize: 13,
        letterSpacing: 0.5,
        color: isActive || hovered ? '#34cc32' : 'rgba(255,255,255,0.75)',
        transition: 'color 0.2s ease',
        userSelect: 'none',
      }}>
        {label}
      </span>
    </motion.button>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

export const DOCK_MODULES = items

export default function CHNCDock({ triggerOpacity, activeModule, onSelect }) {
  const controls = useAnimation()
  const [triggered, setTriggered] = useState(false)
  // The pulse rings end at opacity 0 but scale 1.14, so left mounted they
  // stick out past the viewport on phones and widen the page. Unmount them
  // once the (outer, later) ring has finished its last repeat.
  const [pulseDone, setPulseDone] = useState(false)
  const mouseX = useMotionValue(Infinity)
  const { isSmall } = useResponsive()
  const railRef = useRef(null)

  // Small screens: keep the active module centred in the scrolling rail, so
  // stepping with the arrows (or swiping the dashboard) never leaves the
  // highlighted chip off-screen.
  useEffect(() => {
    const rail = railRef.current
    if (!isSmall || !rail) return
    const el = rail.querySelector(`[data-dock-item="${activeModule}"]`)
    if (!el) return
    const left = el.offsetLeft - (rail.clientWidth - el.offsetWidth) / 2
    rail.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
  }, [activeModule, isSmall])

  const step = (dir) => {
    const i = items.indexOf(activeModule)
    onSelect(items[(i + dir + items.length) % items.length])
  }
  // Same circular outline arrows as the homepage testimonials
  const arrowBtn = (dir) => (
    <button
      onClick={() => step(dir)}
      aria-label={dir < 0 ? 'Previous module' : 'Next module'}
      className="btn-outline testi-arrow"
      style={{ flexShrink: 0, width: 44, height: 44, borderRadius: '50%', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d={dir < 0 ? 'M10 3L5 8l5 5' : 'M6 3l5 5-5 5'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
  )

  useEffect(() => {
    if (!triggerOpacity) return
    const unsub = triggerOpacity.on('change', (v) => {
      if (v > 0.3 && !triggered) {
        setTriggered(true)
        controls.start('visible')
      } else if (v < 0.05 && triggered) {
        setTriggered(false)
        setPulseDone(false)
        controls.start('hidden')
      }
    })
    return unsub
  }, [triggerOpacity, triggered, controls])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, width: '100%' }}>
      {isSmall && arrowBtn(-1)}
      <div style={{ position: 'relative', ...(isSmall ? { flex: 1, maxWidth: '100%', minWidth: 0, overflowX: 'clip' } : {}) }}>

        {/* Pulse glow on appear */}
        {triggered && !pulseDone && <>
          <motion.div
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 1.4, delay: 0.4, ease: 'easeOut', repeat: 2, repeatDelay: 0.6 }}
            style={{ position: 'absolute', inset: -1, pointerEvents: 'none', border: '1px solid rgba(52,204,50,0.6)', zIndex: 0 }}
          />
          <motion.div
            initial={{ opacity: 0.3, scale: 1 }}
            animate={{ opacity: 0, scale: 1.14 }}
            transition={{ duration: 1.4, delay: 0.6, ease: 'easeOut', repeat: 2, repeatDelay: 0.6 }}
            onAnimationComplete={() => setPulseDone(true)}
            style={{ position: 'absolute', inset: -1, pointerEvents: 'none', border: '1px solid rgba(52,204,50,0.3)', zIndex: 0 }}
          />
        </>}

        <motion.div
          ref={railRef}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          style={{
            position: 'relative', zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: isSmall ? 10 : 14,
            background: 'rgba(10,16,28,0.85)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: isSmall ? '8px 10px' : '6px 10px',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            // Small screens: 13 modules can't fit across the viewport, so the
            // dock rail scrolls sideways instead of bleeding off both edges.
            ...(isSmall ? {
              maxWidth: '100%',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              overscrollBehaviorX: 'contain',
              // Faded edges signal there are more modules either side
              maskImage: 'linear-gradient(90deg, transparent 0, #000 24px, #000 calc(100% - 24px), transparent 100%)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 24px, #000 calc(100% - 24px), transparent 100%)',
            } : {}),
          }}
        >
          {items.map((label) => (
            <DockItem key={label} label={label} mouseX={mouseX} isActive={activeModule === label} onSelect={onSelect} isSmall={isSmall} />
          ))}
        </motion.div>
      </div>
      {isSmall && arrowBtn(1)}
    </div>
  )
}
