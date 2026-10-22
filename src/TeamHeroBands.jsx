'use client'

import { useEffect, useState } from 'react'
import useResponsive from './useResponsive'
import WavyBand from './WavyBand'

// The two wavy word bands ("snakes") that used to frame the /team hero.
// Removed from the page on 1 Oct 2026 but kept here, placement and all, so
// they can be dropped back in: render <TeamHeroBands /> as the first child of
// a `position: relative` hero section whose content sits at zIndex 1. The
// page wrapper needs `overflow: hidden` (the bands run off-screen).
export default function TeamHeroBands() {
  const { isSmall } = useResponsive()

  // How much of the left band's tail is visible depends on viewport height
  // (its curl anchors to the viewport bottom). Letters are live animations —
  // laying them only on the visible stretch keeps both bands within the
  // browser's compositing budget, so the drift stays off the main thread.
  const [tailUnits, setTailUnits] = useState(3450)
  useEffect(() => {
    const pz = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--pz')) || 1
    const cssH = window.innerHeight / pz
    setTailUnits(Math.round(1700 + Math.max(0, cssH - 1100)))
  }, [])

  return (
    <>
      {/* Wavy word band snaking in from the top-right (Figma 3373:1752) */}
      <div aria-hidden style={{
        position: 'absolute', top: '-46vw', left: '36vw', width: '72vw',
        transform: 'rotate(-15deg)', pointerEvents: 'none', zIndex: 0,
      }}>
        <WavyBand words={['MISFITS', 'CRAZIES', 'CREATORS']} range={[0, 1550]} />
      </div>
      {/* Second band: curl at the viewport's bottom-left, rising out the top.
          On laptops the body is zoomed, so the real viewport bottom is
          100vh / --pz; small screens keep it up in the hero instead. */}
      <div aria-hidden style={{
        position: 'absolute',
        top: isSmall ? '-19.5vw' : 'calc(100vh / var(--pz, 1) - 78vw)',
        left: '-38.4vw', width: '72vw',
        transform: 'rotate(-115deg)', pointerEvents: 'none', zIndex: 0,
      }}>
        <WavyBand words={['CRAZIES', 'CREATORS', 'MISFITS']} speed={30} range={[0, tailUnits]} />
      </div>
    </>
  )
}
