'use client'

// Blog Page — built from Figma node 1:2081 (Landing Page - Dark-Blog)
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useResponsive from './useResponsive'
import SectionLabel from './SectionLabel'

import Footer from './Footer'
import ContactForm from './ContactForm'
import { BLOG_POSTS } from './lib/blogPosts'
const G      = '#34cc32'
const DARK   = '#000718'
const CARD   = '#0f1520'
const MUTED  = 'rgba(255,255,255,0.7)'
const DIM    = '#666a74'
const BORDER = 'rgba(255,255,255,0.1)'

const FILTERS = ['ALL', 'AUTO', 'FMCG', 'RETAIL', 'FSI', 'OTHERS']

function BlogCard({ img, tags, title, desc, author, role, date, href }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'block', position: 'relative', overflow: 'hidden', aspectRatio: '16/9', cursor: 'pointer', background: CARD, color: 'inherit', textDecoration: 'none' }}
    >
      <Image src={img} alt={title} fill sizes="(max-width: 480px) 100vw, 50vw" style={{
        objectFit: 'cover',
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform 0.6s ease',
      }} />
      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered ? 'rgba(0,7,24,0.85)' : 'rgba(0,7,24,0.45)',
        transition: 'background 0.4s ease',
      }} />

      {/* Top — tags + date */}
      <div style={{ position: 'absolute', top: 20, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {tags.map((t, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center', height: 30, padding: '0 14px',
              background: 'transparent',
              border: `2px solid ${BORDER}`,
              fontFamily: "'Saira Condensed', sans-serif",
              fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
              color: '#fff',
            }}>{t}</span>
          ))}
        </div>
        <span style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{date}</span>
      </div>

      {/* Centre title — visible when not hovered */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered ? 0 : 1,
        transform: hovered ? 'scale(0.85)' : 'scale(1)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        pointerEvents: 'none', padding: '0 40px', textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'Saira Condensed', sans-serif",
          fontWeight: 800, fontSize: 'clamp(22px, 3vw, 42px)',
          textTransform: 'uppercase', lineHeight: 1.1,
          color: '#fff', margin: 0,
        }}>{title}</p>
      </div>

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 160,
        background: 'linear-gradient(to top, rgba(0,7,24,0.95) 0%, transparent 100%)',
        pointerEvents: 'none',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }} />

      {/* Bottom — slides up on hover */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24,
        transform: hovered ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.45s ease',
      }}>
        <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 22, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 8 }}>{title}</p>
        <p style={{
          fontFamily: "'Archivo', sans-serif", fontSize: 13, color: MUTED, lineHeight: '18px', marginBottom: 12,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease 0.1s',
        }}>{desc}</p>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.35s ease 0.15s',
        }}>
          <span style={{ fontFamily: "'Archivo', sans-serif", fontSize: 13, color: G, fontWeight: 600 }}>{author}</span>
          <span style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{role}</span>
        </div>
      </div>

      {/* Green border on hover */}
      <div style={{ position: 'absolute', inset: 0, border: `2px solid ${G}`, opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }} />
    </Link>
  )
}

export default function BlogPage() {
  const [filter, setFilter] = useState('ALL')
  const { isMobile } = useResponsive()

  return (
    <div style={{ background: DARK, minHeight: '100vh', color: '#fff' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section style={{
        // 100vh isn't compensated by the laptop-scale body zoom — divide by --pz
        // so the hero still covers the full screen on 1025–1727px viewports.
        position: 'relative', height: 'calc(100vh / var(--pz, 1))', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', textAlign: 'center',
        background: DARK, padding: '0 clamp(20px, 6vw, 100px)',
      }}>
        {/* Background video slot — blogs showreel, same markup as the home hero:
            <video autoPlay muted loop playsInline preload="metadata" poster="/blogs-hero-poster.webp"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}>
              <source src="/blogs-hero.mp4" type="video/mp4" />
            </video> */}

        {/* Dark overlays for text readability over the video */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            linear-gradient(to bottom, ${DARK} 0%, rgba(0,7,24,0.2) 40%, rgba(0,7,24,0.2) 60%, ${DARK} 100%),
            linear-gradient(to right, ${DARK} 0%, transparent 30%, transparent 70%, ${DARK} 100%)
          `,
          zIndex: 1,
        }} />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center' }}>
          <h1 style={{
            fontFamily: "'Saira Condensed', sans-serif",
            fontSize: 'clamp(56px, 14vw, 150px)', fontWeight: 800, lineHeight: 1,
            textTransform: 'uppercase', letterSpacing: '-3px', margin: 0,
            whiteSpace: 'nowrap', textShadow: '0 2px 24px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.6)',
          }}>
            <span style={{ color: '#fff' }}>WE </span>
            <span style={{ color: G }}>DARE </span>
            <span style={{ color: '#fff' }}>YOU</span>
          </h1>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: '#fff', lineHeight: 1.5, maxWidth: 798, margin: 0, textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>
            Discover the power of our secure and rewarding copy. Explore our range of copy and take control of your copy today. Discover the power of our secure and rewarding copy. Explore our range of copy and take control of your copy today. Discover us.
          </p>
        </div>
      </section>

      {/* ── Blog grid ────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(56px, 8vw, 100px) clamp(20px, 6vw, 100px)' }}>
        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 'clamp(8px, 1.5vw, 20px)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 30 }}>
          {FILTERS.map(f => (
            <button
              key={f}
              className="pill-hover"
              onClick={() => setFilter(f)}
              style={{
                background: 'transparent',
                border: `1px solid ${f === filter ? G : BORDER}`,
                height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
                fontFamily: "'Saira Condensed', sans-serif",
                fontSize: 16, fontWeight: f === filter ? 700 : 500,
                color: f === filter ? G : DIM,
                textTransform: 'uppercase', cursor: 'pointer',
              }}
            >{f}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 8, width: '100%' }}>
          {BLOG_POSTS.map(post => (
            <BlogCard
              key={post.slug}
              img={post.image}
              tags={post.tags}
              title={post.title}
              desc={post.description}
              author={post.author}
              role={post.role}
              date={post.dateLabel}
              href={`/blogs/${post.slug}`}
            />
          ))}
        </div>
        {/* Load more */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
          <button className="btn-outline" style={{ background: 'transparent', border: '1px solid #fff', height: 46, padding: '0 20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', fontFamily: "'Saira Condensed', sans-serif", fontSize: 16, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
            Load More
          </button>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: '0 clamp(20px, 6vw, 100px) clamp(56px, 8vw, 100px)', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <SectionLabel>Connect with us</SectionLabel>
          <h2 style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800, lineHeight: 1, textTransform: 'uppercase', textAlign: 'center', margin: 0 }}>
            <span style={{ color: '#fff' }}>We will </span>
            <span style={{ color: G }}>shoot </span>
            <span style={{ color: '#fff' }}>you</span>
          </h2>
        </div>
        <ContactForm />
      </section>

      <Footer />
    </div>
  )
}
