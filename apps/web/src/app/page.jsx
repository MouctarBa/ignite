import { Hero } from '@/components/Hero'
import { Experience } from '@/components/Experience'
import { FeaturedWork } from '@/components/work/FeaturedWork'
import { Testimonials } from '@/components/Testimonials'
import { FeaturedPosts } from '@/components/blog/FeaturedPosts'
import { Footer } from '@/components/Footer'
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

  // Fallback for older Strapi setups
  const [testimonialsRes, caseStudiesRes, postsRes] = await Promise.all([
    fetchAPI('/testimonials', { populate: '*' }),
    fetchAPI('/case-studies', { sort: { date: 'desc' }, pagination: { limit: 4 }, populate: '*' }),
    fetchAPI('/posts', { sort: { date: 'desc' }, pagination: { limit: 3 }, populate: '*' }),
  ])

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
      <Footer {...(homepage.footer || {})} />
    </>
  )
}

