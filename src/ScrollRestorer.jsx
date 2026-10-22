'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

// Back/forward (swipe) scroll restoration. The browser's native restore fires
// while the previous page is still remounting — before LazyVideo placeholders
// and the one-frame useResponsive relayout settle — so it clamps to the top of
// the still-short document, and html{scroll-behavior:smooth} then animates the
// miss from the hero. We restore manually instead: remember each path's offset
// and, on popstate, re-apply it instantly every frame until the layout is tall
// enough to hold it (or the user scrolls themselves).
//
// Offsets are captured at interaction time — on every scroll (keyed by the
// live location, which Next has already updated by the time its own
// scroll-to-top event lands) and again on click/popstate — never in a React
// effect, where Next's post-commit scroll reset races the save and records 0.

const KEY = 'scroll:'

const save = (path) => {
  try { sessionStorage.setItem(KEY + path, String(Math.round(window.scrollY))) } catch {}
}

const saved = (path) => Number(sessionStorage.getItem(KEY + path)) || 0

function restore(y) {
  const html = document.documentElement
  const prevBehavior = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'
  let tries = 0
  let cancelled = false
  // Only clearly vertical input counts as the user taking over — the wheel
  // tail of the horizontal back-swipe gesture must not cancel the restore.
  const onWheel = (e) => {
    if (Math.abs(e.deltaY) > 4 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) cancelled = true
  }
  const onTouch = () => { cancelled = true }
  window.addEventListener('wheel', onWheel, { passive: true })
  window.addEventListener('touchmove', onTouch, { passive: true })
  const step = () => {
    if (!cancelled && Math.abs(window.scrollY - y) > 1 && tries < 40) {
      window.scrollTo(0, y)
      tries++
      requestAnimationFrame(step)
    } else {
      html.style.scrollBehavior = prevBehavior
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchmove', onTouch)
    }
  }
  step()
}

// Hash landings (/#contact from another page). Next scrolls to the anchor on
// the first client render, which still uses useResponsive's 1440px default;
// the phone relayout a frame later reflows the page (often 1000px+ taller)
// and leaves the target well below the fold. Re-apply the anchor scroll every
// frame for a short settle window (relayout, fonts, lazy media), stopping the
// moment the user scrolls themselves. scrollIntoView honours the targets'
// scroll-margin-top (globals.css), so the fixed nav stays clear.
function settleHash() {
  let id = ''
  try { id = decodeURIComponent(window.location.hash.slice(1)) } catch { return }
  if (!id) return
  const html = document.documentElement
  const prevBehavior = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'
  let frames = 0
  let cancelled = false
  const cancel = () => { cancelled = true }
  const onWheel = (e) => { if (Math.abs(e.deltaY) > 4) cancelled = true }
  window.addEventListener('wheel', onWheel, { passive: true })
  window.addEventListener('touchstart', cancel, { passive: true })
  window.addEventListener('keydown', cancel)
  const step = () => {
    const el = document.getElementById(id)
    if (cancelled || frames >= 120) {
      html.style.scrollBehavior = prevBehavior
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', cancel)
      window.removeEventListener('keydown', cancel)
      return
    }
    if (el) {
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
      if (Math.abs(el.getBoundingClientRect().top - margin) > 2) el.scrollIntoView({ block: 'start' })
    }
    frames++
    requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function ScrollRestorer() {
  const pathname = usePathname()
  // Advanced only by the pathname effect, so during popstate it still names
  // the page being left.
  const pathRef = useRef(pathname)
  const popped = useRef(false)
  // Reload / back-forward full loads restore a saved offset instead of the hash.
  const skipHash = useRef(false)

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    const onScroll = () => save(window.location.pathname)
    // Capture-phase click: runs before Next starts the navigation, so the
    // offset recorded is exactly where the user clicked.
    const onClick = () => save(pathRef.current)
    const onPop = () => { save(pathRef.current); popped.current = true }
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('click', onClick, true)
    window.addEventListener('popstate', onPop)
    // Full page loads that should land where the user left off (reload, or a
    // swipe back into the site that missed the bfcache). The inline script in
    // the layout has been pinning the offset since before first paint — stop
    // it first (it resets html.style.scrollBehavior) so restore() starts from
    // a clean slate and takes over the tail end of the job.
    const nav = performance.getEntriesByType('navigation')[0]
    if (nav && (nav.type === 'reload' || nav.type === 'back_forward')) {
      window.__earlyRestore?.stop()
      skipHash.current = true
      restore(saved(window.location.pathname))
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  useEffect(() => {
    pathRef.current = pathname
    if (popped.current) {
      popped.current = false
      // Restore even a 0 offset: with native restoration off, the new page
      // would otherwise keep the old page's scroll position.
      restore(saved(pathname))
    } else if (skipHash.current) {
      skipHash.current = false
    } else if (window.location.hash) {
      settleHash()
    }
  }, [pathname])

  return null
}
