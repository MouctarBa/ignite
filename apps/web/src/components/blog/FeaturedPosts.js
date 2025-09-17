import { Container } from '@/components/Container'
import { BlogGrid } from '@/components/blog/BlogGrid'
import { getStrapiMedia } from '@/lib/strapi'

const samplePosts = [
  {
    title: 'Improving Teacher Training Programs',
    description: 'Key takeaways from the SEEC conference.',
    date: '2024-01-15',
    category: 'Education',
    timeToRead: 4,
    slug: 'improving-teacher-training-programs',
    url: '/blog/improving-teacher-training-programs',
    image: '/images/articles/article-03.jpg',
  },
  {
    title: 'Building Student-Centred Schools',
    description: 'Lessons learned from launching Evergreen campuses.',
    date: '2024-02-10',
    category: 'Leadership',
    timeToRead: 5,
    slug: 'building-student-centred-schools',
    url: '/blog/building-student-centred-schools',
    image: '/images/articles/article-04.jpg',
  },
]

export { samplePosts }

export function FeaturedPosts({ posts, heading }) {
  let transformedPosts = []

  if (posts && posts.length > 0) {
    const validPosts = posts.filter((post) => post && post.attributes)

    if (validPosts.length > 0) {
      transformedPosts = validPosts
        .map((post) => {
          const { attributes } = post
          const imageUrl = getStrapiMedia(attributes.coverImage)
          // Derive a short description from richtext content if no dedicated field
          const content = attributes.content || ''
          const plain = String(content).replace(/<[^>]+>/g, '')
          const description = attributes.description || plain.slice(0, 140)
          const date = attributes.publishedAt || attributes.updatedAt || attributes.createdAt
          const category = attributes.category || 'Education'
          const timeToRead = attributes.timeToRead || Math.max(1, Math.round(plain.split(/\s+/).length / 200))
          if (!imageUrl) return null
          return {
            title: attributes.title,
            description,
            date,
            category,
            timeToRead,
            slug: attributes.slug,
            url: `/blog/${attributes.slug}`,
            image: imageUrl,
          }
        })
        .filter(Boolean)
    }
  }

  if (transformedPosts.length === 0) {
    transformedPosts = samplePosts
  }

  return (
    <section className="py-16 overflow-hidden bg-white sm:pt-24 lg:pt-28">
      <Container>
        <h2 className="max-w-2xl mx-auto text-4xl font-semibold leading-tight text-center font-display text-slate-900 sm:text-5xl sm:leading-tight">
          {heading || 'Insights on education and school leadership'}
        </h2>
        <BlogGrid posts={transformedPosts} featured={true} />
      </Container>
    </section>
  );
}
