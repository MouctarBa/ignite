import { BlogGrid } from '@/components/blog/BlogGrid'
import { fetchAPI } from '@/lib/strapi'

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