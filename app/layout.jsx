import '@/globals.css'
import Nav from '@/Nav'
import ScrollRestorer from '@/ScrollRestorer'
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, orgJsonLd, webSiteJsonLd, JsonLd } from '@/lib/seo'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ConvergenSEE - Digital Marketing Agency, Mumbai',
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

// Tints the mobile browser chrome (iOS Safari / Android Chrome tab bar) to the
// site's navy; the manifest's theme_color only applies to installed PWAs.
export const viewport = { themeColor: '#000718' }

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {/* Runs while the HTML is still parsing, long before React hydrates:
            on a reload/back-forward load it starts pinning the scroll to the
            offset ScrollRestorer saved, so the first painted frame is already
            at the reader's position instead of flashing the hero and jumping.
            ScrollRestorer calls window.__earlyRestore.stop() when it takes
            over; the loop also stops if the user scrolls, or after ~4s. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
  try {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    var nav = performance.getEntriesByType('navigation')[0]
    if (!nav || (nav.type !== 'reload' && nav.type !== 'back_forward')) return
    var y = +sessionStorage.getItem('scroll:' + location.pathname) || 0
    if (!y) return
    var html = document.documentElement
    html.style.scrollBehavior = 'auto'
    var done = false
    var stop = function () {
      if (done) return
      done = true
      html.style.scrollBehavior = ''
      removeEventListener('wheel', onWheel)
      removeEventListener('touchmove', stop)
    }
    var onWheel = function (e) {
      if (Math.abs(e.deltaY) > 4 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) stop()
    }
    addEventListener('wheel', onWheel, { passive: true })
    addEventListener('touchmove', stop, { passive: true })
    var tries = 0
    var step = function () {
      if (done || tries++ > 240) return stop()
      if (Math.abs(scrollY - y) > 1) scrollTo(0, y)
      requestAnimationFrame(step)
    }
    step()
    window.__earlyRestore = { stop: stop }
  } catch (e) {}
})()`,
          }}
        />
        {/* React 19 hoists these into <head>: fetch the above-the-fold fonts
            (hero headline, buttons, body copy) before the CSS discovers them,
            so first paint uses the brand fonts instead of a fallback flash. */}
        <link rel="preload" as="font" type="font/woff2" href="/fonts/saira-condensed-latin-800.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/saira-condensed-latin-700.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/archivo-latin-var.woff2" crossOrigin="anonymous" />
        <JsonLd data={orgJsonLd()} />
        <JsonLd data={webSiteJsonLd()} />
        <ScrollRestorer />
        <Nav />
        {children}
      </body>
    </html>
  )
}
