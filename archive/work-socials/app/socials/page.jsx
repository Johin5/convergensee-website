import SocialsPage from '@/SocialsPage'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Socials',
  description:
    'ConvergenSEE across the feeds: the latest reels, creatives and campaigns we’re shipping for our brands and ourselves.',
  path: '/socials',
})

export default function Page() {
  return <SocialsPage />
}
