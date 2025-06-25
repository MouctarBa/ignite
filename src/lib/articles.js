import { fetchAPI } from './strapi'

export async function getAllCategories() {
  const postsRes = await fetchAPI('/posts')

  // Safety Check: If there's no data or the data array is empty, return an empty array.
  if (!postsRes || !postsRes.data || postsRes.data.length === 0) {
    console.warn("getAllCategories: No posts found, returning empty array for categories.");
    return [];
  }

  // Filter out any posts that might be missing attributes before mapping
  const validPosts = postsRes.data.filter(post => post.attributes && post.attributes.category);

  let repeatingCategories = validPosts.map((post) => post.attributes.category)

  const categoryCount = new Map()

  repeatingCategories.forEach((category) => {
    if (categoryCount.has(category)) {
      categoryCount.set(category, categoryCount.get(category) + 1)
    } else {
      categoryCount.set(category, 1)
    }
  })

  const uniqueCategories = [...new Set(repeatingCategories)]

  const categories = uniqueCategories.sort((category1, category2) => {
    let freq1 = categoryCount.get(category1)
    let freq2 = categoryCount.get(category2)

    return freq2 - freq1
  })

  return categories
}