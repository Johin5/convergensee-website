import WorkPage from '@/WorkPage'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Our Work',
  description:
    'A showcase of ConvergenSEE’s creative output: campaigns, reels, platform builds and brand work across automotive, banking, FMCG and more.',
  path: '/work',
})

export default function Page() {
  return <WorkPage />
}
