'use client'

import { useEffect, useRef, useState } from 'react'
import useResponsive from './useResponsive'

// One card for every place a colleague appears — the home-page strip and the
// full Team page — so the two never drift apart. `variant` only changes how the
// card is sized by its parent: 'strip' is a fixed cell in a horizontal
// scroller, 'grid' fills a wrapping grid and collapses to full width on mobile.

const G = '#34cc32'

export default function TeamMemberCard({ member, variant = 'grid' }) {
  const { name, role, photo, pose, video, bio, lowercaseName } = member
  const [hovered, setHovered] = useState(false)
  const [poseLoaded, setPoseLoaded] = useState(false)
  // The pose/video only downloads once the card is first touched, so a 45-card
  // grid doesn't pull double its weight up front.
  const requested = useRef(false)
  const videoRef = useRef(null)
  const { isMobile, isSmall } = useResponsive()

  const close = () => setHovered(false)
  const open  = () => { requested.current = true; setHovered(true) }

  // Hover is mouse-only (pointerType check), so a tap's emulated mouseenter
  // can't double-toggle. Touch toggles on pointerup, and only for a real tap:
  // a scroll swipe either cancels the pointer or moves past TAP_SLOP.
  const TAP_SLOP = 10
  const tapStart = useRef(null)
  const onPointerEnter = e => { if (e.pointerType === 'mouse') open() }
  const onPointerLeave = e => { if (e.pointerType === 'mouse') close() }
  const onPointerDown  = e => { tapStart.current = e.pointerType === 'mouse' ? null : { x: e.clientX, y: e.clientY } }
  const onPointerUp    = e => {
    const s = tapStart.current
    tapStart.current = null
    if (!s || e.pointerType === 'mouse') return
    if (Math.abs(e.clientX - s.x) > TAP_SLOP || Math.abs(e.clientY - s.y) > TAP_SLOP) return
    hovered ? close() : open()
  }

  // Drive playback from an effect, not from the hover handler: on the first
  // hover the `src` is only attached by the render that `setHovered` triggers,
  // so calling play() inline would fire against a source-less element and the
  // clip would never start. `muted` is asserted here too — React can drop it on
  // first mount, and an unmuted video is refused autoplay.
  useEffect(() => {
    const v = videoRef.current
    if (!video || !v) return
    if (hovered) {
      v.muted = true
      v.play().catch(() => {})
    } else {
      v.pause()
      v.currentTime = 0
    }
  }, [hovered, video])

  // Deliberately not gated on a readiness event. The video carries the portrait
  // as its poster, so it stays pixel-identical to the still until the first
  // frame decodes — a clip that is slow to load (or never loads) degrades to the
  // photo rather than flashing an empty box or sticking on a missed event.
  const showVideo = video && hovered
  const showPose  = !video && pose && hovered && poseLoaded
  const revealed  = showVideo || showPose
  const isStrip   = variant === 'strip'
  // In the 3-across mobile grid a cell is ~130px wide — the labeled bio rows
  // can't fit legibly, so a tap reveals only the pose, name and role there.
  const smallCell = !isStrip && isSmall
  const showBio   = bio && !(isMobile && !isStrip)

  return (
    <div
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => { tapStart.current = null }}
      style={{
        // Grid cells are a fluid quarter (third on mobile) of the row so the
        // wrap always lands on 4 / 3 columns; the 2px gaps are subtracted so
        // the last column never spills to a new line. Strip cells shrink on a
        // phone so the scroller shows a real slice of the next card.
        width: isStrip ? (isMobile ? 240 : 320) : (isMobile ? 'calc((100% - 2px) / 2)' : 'calc((100% - 6px) / 4)'),
        maxWidth: 320,
        flex: '0 0 auto',
        flexShrink: 0,
        position: 'relative', overflow: 'hidden', cursor: 'pointer',
        border: `1px solid ${hovered ? G : 'transparent'}`,
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* portrait — cross-fades to the person's own quirky pose on hover */}
      <div style={{
        // Cards scale with their cell, so the portrait keeps the 320×440
        // proportion instead of a fixed height (at full width it is still 440).
        aspectRatio: '320 / 440',
        overflow: 'hidden', position: 'relative', background: '#e9eaec',
      }}>
        <img
          src={photo} alt={name} loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            opacity: revealed ? 0 : 1,
            transform: hovered && !pose && !video ? 'scale(1.06)' : 'scale(1)',
            transition: 'opacity 0.35s ease, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
        {video ? (
          <video
            ref={videoRef}
            src={requested.current ? video : undefined}
            // Nothing is fetched before the first hover because `src` is
            // withheld until then — so `preload` may as well be eager once it
            // does attach. `autoPlay` is the fallback for browsers that refuse
            // a programmatic play() outside a click/tap gesture.
            autoPlay={requested.current || undefined}
            poster={photo}
            muted loop playsInline preload="auto"
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              opacity: showVideo ? 1 : 0,
              transition: 'opacity 0.35s ease',
              pointerEvents: 'none',
            }}
          />
        ) : pose && (
          <img
            src={requested.current ? pose : undefined} alt="" aria-hidden="true"
            onLoad={() => setPoseLoaded(true)}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              opacity: showPose ? 1 : 0,
              transform: showPose ? 'scale(1.02)' : 'scale(1)',
              transition: 'opacity 0.35s ease, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      {/* bottom gradient */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
        background: 'linear-gradient(to top, rgba(0,7,24,0.95) 0%, rgba(0,7,24,0.6) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Deeper scrim, hover only — buys the bio enough contrast to read while
          still leaving the top of the frame (and the face) in the clear. */}
      {showBio && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '78%',
          background: 'linear-gradient(to top, rgba(0,7,24,0.96) 30%, rgba(0,7,24,0.72) 62%, transparent 100%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
          pointerEvents: 'none',
        }} />
      )}

      {/* text overlay */}
      <div className={isStrip ? undefined : 'team-card-text'} style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: smallCell ? 10 : isStrip && isMobile ? 16 : 24,
        pointerEvents: 'none',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.35s ease',
      }}>
        {/* bio rows — grow upward from the bottom-anchored block on hover */}
        {showBio && (
          <div style={{
            maxHeight: hovered ? 220 : 0,
            opacity: hovered ? 1 : 0,
            overflow: 'hidden',
            marginBottom: hovered ? 16 : 0,
            transition: 'max-height 0.4s ease, opacity 0.3s ease, margin-bottom 0.4s ease',
          }}>
            {bio.map(([label, value], i) => (
              <div key={label} style={{ marginTop: i ? 10 : 0 }}>
                <p style={{
                  fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, fontSize: isSmall ? 12 : 11,
                  textTransform: 'uppercase', letterSpacing: '1.4px', color: G,
                  margin: '0 0 2px',
                }}>{label}</p>
                <p style={{
                  fontFamily: "'Archivo', sans-serif", fontSize: isSmall ? 12.5 : 11.5, lineHeight: 1.4,
                  color: 'rgba(255,255,255,0.7)', margin: 0,
                }}>{value}</p>
              </div>
            ))}
          </div>
        )}

        {/* green accent line */}
        <div style={{
          width: hovered ? (smallCell ? 24 : 40) : 0, height: 2, background: G,
          marginBottom: smallCell ? 6 : 10,
          transition: 'width 0.35s ease',
        }} />
        <p className={isStrip ? undefined : 'team-card-name'} style={{
          fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700,
          fontSize: isStrip ? (isMobile ? 20 : 28) : smallCell ? (isMobile ? 15 : 12) : 22,
          textTransform: lowercaseName ? 'lowercase' : 'uppercase', letterSpacing: '0.02em', color: '#fff',
          margin: 0, lineHeight: 1.1,
          // Narrow cells (2-up on phones, 4-up on tablets): wrap to two lines max,
          // and let a single long surname break rather than spill past the card.
          ...(smallCell && {
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            overflow: 'hidden', overflowWrap: 'anywhere',
          }),
        }}>{name}</p>
        {/* designation — hidden until hover, like the advisory-board cards */}
        <p style={{
          fontFamily: "'Archivo', sans-serif", fontSize: smallCell ? (isMobile ? 12 : 11) : 13, margin: 0,
          lineHeight: smallCell ? 1.3 : undefined,
          // Tall enough for the longest titles (5 lines at 11px in a 360px
          // phone cell) so none is sliced mid-line.
          maxHeight: hovered ? 90 : 0,
          marginTop: hovered ? (smallCell ? 3 : 6) : 0,
          opacity: hovered ? 1 : 0,
          overflow: 'hidden',
          color: G,
          transition: 'max-height 0.35s ease, opacity 0.3s ease, margin-top 0.35s ease',
        }}>{role}</p>
      </div>
    </div>
  )
}
