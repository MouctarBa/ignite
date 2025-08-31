import { Hero } from '@/components/Hero'
import { Experience } from '@/components/Experience'
import { FeaturedWork } from '@/components/work/FeaturedWork'
import { Testimonials } from '@/components/Testimonials'
import { FeaturedPosts } from '@/components/blog/FeaturedPosts'
import { fetchAPI } from '@/lib/strapi'

export const metadata = {
  description:
    'Doris Chinedu-Okoro is an education consultant and CEO of Evergreen Group of Schools helping teachers build student-centred institutions.',
}

async function getHomepageData() {
  const homepageRes = await fetchAPI('/homepage', { populate: '*' })

  if (homepageRes?.data) {
    return homepageRes.data.attributes
  }

  // Fallback for older/alternate Strapi setups
  // - Strapi v4/v5 accept `sort` as a string like 'publishedAt:desc'
  // - Avoid object sort syntax which can trigger 400s (e.g., `sort[date]`)
  let testimonialsRes = { data: [] }
  let caseStudiesRes = { data: [] }
  let postsRes = { data: [] }
  try {
    ;[testimonialsRes, caseStudiesRes, postsRes] = await Promise.all([
      fetchAPI('/testimonials', { populate: '*' }),
      fetchAPI('/case-studies', {
        sort: 'publishedAt:desc',
        pagination: { limit: 4 },
        populate: '*',
      }),
      fetchAPI('/posts', {
        sort: 'publishedAt:desc',
        pagination: { limit: 3 },
        populate: '*',
      }),
    ])
  } catch (err) {
    console.warn('Fallback content failed to load:', err)
  }

  return {
    testimonials: testimonialsRes.data || [],
    caseStudies: caseStudiesRes.data || [],
    posts: postsRes.data || [],
  }
}

export default async function HomePage() {
  const homepage = (await getHomepageData()) || {};
  const {
    testimonials = [],
    caseStudies = [],
    posts = [],
    experienceVideo,
  } = homepage;

  return (
    <>
      <Hero />
      <Experience video={experienceVideo} />
      <FeaturedWork caseStudies={caseStudies} />
      <Testimonials testimonials={testimonials} />
      <FeaturedPosts posts={posts} />
    </>
  )
}

