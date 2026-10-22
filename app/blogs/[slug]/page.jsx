import { notFound } from 'next/navigation'
import BlogReadPage from '@/BlogReadPage'
import { BLOG_POSTS, findPostBySlug } from '@/lib/blogPosts'
import { buildMetadata, articleJsonLd, breadcrumbJsonLd, JsonLd } from '@/lib/seo'

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = findPostBySlug(slug)
  // Unknown slug: the page calls notFound(), so match app/not-found.jsx's title.
  if (!post) return { title: 'Page not found' }
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blogs/${post.slug}`,
    image: post.heroImage,
    type: 'article',
  })
}

export default async function Page({ params }) {
  const { slug } = await params
  const post = findPostBySlug(slug)
  if (!post) notFound()
  return (
    <>
      <JsonLd data={articleJsonLd(post, `/blogs/${post.slug}`)} />
      <JsonLd
        data={breadcrumbJsonLd([
          ['Home', '/'],
          ['Blog', '/blogs'],
          [post.title, `/blogs/${post.slug}`],
        ])}
      />
      <BlogReadPage post={post} />
    </>
  )
}
