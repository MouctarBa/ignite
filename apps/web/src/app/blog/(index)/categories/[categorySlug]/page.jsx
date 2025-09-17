import { BlogGrid } from '@/components/blog/BlogGrid'
import { fetchAPI, getBlogPage } from '@/lib/strapi'

const parseCategory = (categorySlug) => {
  const category = categorySlug
    .replace(/-/g, ' ')
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ')
  return category
}

export async function generateStaticParams() {
  const posts = await fetchAPI('/posts')
  const categories = [...new Set(posts.data.map((post) => post.attributes.category))]
  return categories.map((category) => ({
    categorySlug: category.replace(/ /g, '-').toLowerCase(),
  }))
}

export async function generateMetadata({ params }) {
  const category = parseCategory(params.categorySlug)
  return { title: category }
}

export default async function BlogCategoryPage({ params }) {
  try {
    const blog = await getBlogPage()
    if (blog.enabled === false) {
      return (
        <div className='py-16 text-center'>
          <h2 className='text-2xl font-semibold'>Blog coming soon</h2>
          <p className='mt-2 text-slate-600'>This section is temporarily unavailable.</p>
        </div>
      )
    }
  } catch {}
  const categoryName = parseCategory(params.categorySlug)

  const postsRes = await fetchAPI('/posts', {
    filters: { category: { $eq: categoryName } },
    populate: { image: { fields: ['url'] } },
  })

  const posts = postsRes.data.map((post) => {
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

  return <BlogGrid posts={posts} />
}

export const dynamicParams = true
