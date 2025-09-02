import { BlogGrid } from '@/components/blog/BlogGrid'
import { samplePosts } from '@/components/blog/FeaturedPosts'
import { fetchAPI } from '@/lib/strapi'

export default async function BlogPage() {
  const postsRes = await fetchAPI('/posts', {
    // Strapi v5 expects sort as a string like 'field:order'
    sort: 'publishedAt:desc',
    populate: '*'
  });

  // Safety check to ensure data was fetched correctly
  if (!postsRes || !postsRes.data) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">Could not load posts.</h2>
        <p className="mt-2">Please ensure you have published posts in Strapi and that API permissions are correct.</p>
      </div>
    );
  }

  // Filter out any entries that are missing essential data to prevent crashes
  const validPosts = postsRes.data.filter(post => {
      const { attributes } = post;
      return attributes && attributes.slug && attributes.image && attributes.image.data;
  });

  // Map over only the valid posts
  const posts = validPosts.map((post) => {
    const { attributes } = post
    return {
      title: attributes.title,
      description: attributes.description,
      date: attributes.date,
      category: attributes.category,
      timeToRead: attributes.timeToRead,
      slug: attributes.slug,
      url: `/blog/${attributes.slug}`,
      image: attributes.image.data.attributes.url,
    }
  })

  const finalPosts = posts.length > 0 ? posts : samplePosts

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-center font-display text-4xl font-semibold text-slate-900 sm:text-5xl">
          Educational Insights
        </h1>
        <BlogGrid posts={finalPosts} />
      </div>
    </section>
  )
}
