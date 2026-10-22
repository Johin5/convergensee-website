import { notFound } from 'next/navigation'
import JobPage from '@/JobPage'
import { ALL_JOBS, slugify, findJobBySlug, jobPath } from '@/lib/routes'
import { buildMetadata, jobPostingJsonLd, breadcrumbJsonLd, JsonLd } from '@/lib/seo'

export function generateStaticParams() {
  return ALL_JOBS.map((job) => ({ role: slugify(job.title) }))
}

export async function generateMetadata({ params }) {
  const { role } = await params
  const job = findJobBySlug(role)
  // Unknown slug: the page calls notFound(), so match app/not-found.jsx's title.
  if (!job) return { title: 'Page not found' }
  return buildMetadata({
    title: `${job.title} - Careers`,
    description: `ConvergenSEE is hiring a ${job.title} for its ${job.team} team in Mumbai. See the role, responsibilities and requirements, and apply.`,
    path: jobPath(job),
  })
}

export default async function Page({ params }) {
  const { role } = await params
  const job = findJobBySlug(role)
  if (!job) notFound()
  return (
    <>
      <JsonLd data={jobPostingJsonLd(job, jobPath(job))} />
      <JsonLd
        data={breadcrumbJsonLd([
          ['Home', '/'],
          ['Careers', '/careers'],
          [job.title, jobPath(job)],
        ])}
      />
      <JobPage job={job} />
    </>
  )
}
