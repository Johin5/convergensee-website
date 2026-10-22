'use client'

// Socials Page — social media hub
import { useState } from 'react'
import Image from 'next/image'
import LazyVideo from './LazyVideo'
import useResponsive from './useResponsive'
import Footer from './Footer'
import { NAV_H } from './theme'

const G = '#34cc32'
const DARK = '#000718'
const CARD = '#0f1520'
const MUTED = 'rgba(255,255,255,0.7)'
const DIM = '#666a74'
const BORDER = 'rgba(255,255,255,0.1)'

const PLATFORMS = [
  {
    name: 'Instagram',
    handle: '@convergensee',
    followers: '12.4K',
    url: 'https://instagram.com/convergensee',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="3" width="26" height="26" rx="7" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="8" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'ConvergenSEE',
    followers: '8.2K',
    url: 'https://linkedin.com/company/convergensee',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="3" width="26" height="26" rx="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="10" cy="12" r="2" fill="currentColor" />
        <rect x="9" y="15" width="2" height="8" fill="currentColor" />
        <path d="M15 15v8m0-5a4 4 0 0 1 8 0v5" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: 'ConvergenSEE',
    followers: '3.1K',
    url: 'https://youtube.com/@convergensee',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="6" width="26" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
        <path d="M13 12v8l7-4-7-4z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    handle: '@convergensee',
    followers: '5.6K',
    url: 'https://x.com/convergensee',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M5 5L14 16.5M27 27L18 15.5M14 16.5L27 5M14 16.5L5 27M18 15.5L27 5M18 15.5L5 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
]

const POSTS = [
  { type: 'image', platform: 'Instagram', caption: 'Behind the scenes of our latest Mahindra campaign shoot', img: '/thar-mountains.webp' },
  { type: 'image', platform: 'Instagram', caption: 'Scorpio N launch creative - 10M+ impressions in 48 hours', img: '/scorpio-n.webp' },
  { type: 'video', platform: 'Instagram', caption: 'Reel: How we create content at scale for automobile brands', src: '/people-tech.mp4' },
  { type: 'image', platform: 'LinkedIn', caption: 'Our team at the Digital Marketing Summit 2025', img: '/creative-1.webp' },
  { type: 'image', platform: 'Instagram', caption: 'F&B creative showcase - Tiramisu campaign', img: '/tiramisu.webp' },
  { type: 'video', platform: 'YouTube', caption: 'Client review: How CHNC transformed their marketing', src: '/review-reel.mp4' },
  { type: 'image', platform: 'Instagram', caption: 'Thar ROXX Delhi launch event recap', img: '/thar-roxx-delhi.webp' },
  { type: 'image', platform: 'LinkedIn', caption: 'New office vibes - our creative studio in Powai', img: '/creative-5.webp' },
  { type: 'image', platform: 'Instagram', caption: 'XUV400 EV awareness campaign - going green', img: '/xuv400.webp' },
  { type: 'image', platform: 'Instagram', caption: 'Coffee story - brewing creativity one post at a time', img: '/coffee-story.webp' },
  { type: 'image', platform: 'Instagram', caption: 'Chocolate cake campaign - sweet success', img: '/chocolate-cake.webp' },
  { type: 'image', platform: 'LinkedIn', caption: 'Award-winning creative for automobile sector', img: '/ev.webp' },
]

function PlatformCard({ platform }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1, padding: 'clamp(20px, 4vw, 30px)',
        display: 'flex', flexDirection: 'column', gap: 20,
        textDecoration: 'none', cursor: 'pointer',
        border: `1px solid ${hovered ? G : BORDER}`,
        transition: 'border-color 0.3s ease, transform 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ color: hovered ? G : DIM, transition: 'color 0.3s ease' }}>
          {platform.icon}
        </div>
        <div style={{
          background: hovered ? G : 'transparent',
          border: `1px solid ${hovered ? G : BORDER}`,
          padding: '5px 12px',
          transition: 'all 0.3s ease',
        }}>
          <span style={{
            fontFamily: "'Saira Condensed', sans-serif", fontSize: 12, fontWeight: 700,
            textTransform: 'uppercase', color: hovered ? DARK : DIM,
            transition: 'color 0.3s ease',
          }}>Follow</span>
        </div>
      </div>
      <div>
        <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 28, fontWeight: 700, lineHeight: 1.1, color: '#fff', margin: 0, textTransform: 'uppercase' }}>
          {platform.name}
        </p>
        <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 13, color: DIM, margin: '4px 0 0' }}>
          {platform.handle}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 36, fontWeight: 800, color: G }}>{platform.followers}</span>
        <span style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: DIM }}>followers</span>
      </div>
    </a>
  )
}

function PostCard({ post }) {
  const { isSmall } = useResponsive()
  const [hovered, setHovered] = useState(false)
  const isVideo = post.type === 'video'
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden', aspectRatio: '1/1',
        cursor: 'pointer', background: CARD,
      }}
    >
      {isVideo ? (
        <LazyVideo
          src={post.src}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.6s ease',
          }}
        />
      ) : (
        <Image src={post.img} alt={post.caption} fill sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 25vw" style={{
          objectFit: 'cover',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.6s ease',
        }} />
      )}

      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered ? 'rgba(0,7,24,0.8)' : 'rgba(0,7,24,0.1)',
        transition: 'background 0.4s ease',
      }} />

      {/* Video play icon */}
      {isVideo && !hovered && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 48, height: 48, borderRadius: '50%',
          background: 'rgba(0,0,0,0.6)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 2v14l12-7L4 2z" fill="#fff" />
          </svg>
        </div>
      )}

      {/* Platform badge */}
      <div style={{
        position: 'absolute', top: 12, left: 12,
        background: 'rgba(0,7,24,0.7)', backdropFilter: 'blur(8px)',
        padding: '5px 12px',
      }}>
        <span style={{ fontFamily: "'Archivo', sans-serif", fontSize: isSmall ? 12 : 10, fontWeight: 600, color: '#fff' }}>
          {post.platform}
        </span>
      </div>

      {/* Caption — appears on hover */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: 20,
        background: 'linear-gradient(to top, rgba(0,7,24,0.95) 0%, transparent 100%)',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}>
        <p style={{
          fontFamily: "'Archivo', sans-serif", fontSize: 13, color: MUTED,
          lineHeight: '18px', margin: 0,
        }}>{post.caption}</p>
      </div>

      {/* Green border on hover */}
      <div style={{
        position: 'absolute', inset: 0,
        border: `2px solid ${G}`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

export default function SocialsPage() {
  const { isMobile, isSmall } = useResponsive()
  const [filter, setFilter] = useState('ALL')
  const filters = ['ALL', ...PLATFORMS.map(p => p.name.toUpperCase())]
  const filtered = filter === 'ALL' ? POSTS : POSTS.filter(p => p.platform.toUpperCase() === filter)

  return (
    <div style={{ background: DARK, minHeight: '100vh', paddingTop: isSmall ? NAV_H.small : NAV_H.desktop, color: '#fff' }}>

      {/* Hero */}
      <section style={{ padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px) 0', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center' }}>
            <h1 style={{
              fontFamily: "'Saira Condensed', sans-serif",
              fontSize: 'clamp(56px, 14vw, 150px)', fontWeight: 800, lineHeight: 1,
              textTransform: 'uppercase', letterSpacing: '-3px', margin: 0,
              whiteSpace: 'nowrap',
            }}>
              <span style={{ color: '#fff' }}>OUR </span>
              <span style={{ color: G }}>SOCIALS</span>
            </h1>
            <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: '#fff', lineHeight: 1.5, maxWidth: 600, margin: 0 }}>
              Follow us across platforms. We share insights, behind-the-scenes, campaigns, and the occasional meme.
            </p>
          </div>
        </div>
      </section>

      {/* Platform cards */}
      <section style={{ padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isSmall ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 8 }}>
            {PLATFORMS.map(p => <PlatformCard key={p.name} platform={p} />)}
          </div>
        </div>
      </section>

      {/* Feed */}
      <section style={{ padding: '0 clamp(20px, 6vw, 100px) clamp(56px, 8vw, 100px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', justifyContent: 'space-between', alignItems: isSmall ? 'flex-start' : 'center', gap: isSmall ? 24 : 0 }}>
            <h2 style={{
              fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800,
              textTransform: 'uppercase', lineHeight: 1, margin: 0,
            }}>
              Latest <span style={{ color: G }}>posts</span>
            </h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    background: f === filter ? 'transparent' : CARD,
                    border: f === filter ? `1px solid ${G}` : `1px solid transparent`,
                    height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
                    fontFamily: "'Saira Condensed', sans-serif",
                    fontSize: 16, fontWeight: f === filter ? 700 : 500,
                    color: f === filter ? G : DIM,
                    textTransform: 'uppercase', cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >{f}</button>
              ))}
            </div>
          </div>

          <div style={{ maxWidth: 1240, margin: '0 auto', width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isSmall ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 8 }}>
              {filtered.map((post, i) => <PostCard key={i} post={post} />)}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
