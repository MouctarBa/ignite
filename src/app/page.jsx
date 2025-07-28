import { Hero } from '@/components/Hero'
import { Experience } from '@/components/Experience'
import { FeaturedWork } from '@/components/work/FeaturedWork'
import { Testimonials } from '@/components/Testimonials'
import { FeaturedPosts } from '@/components/blog/FeaturedPosts'
import { Footer } from '@/components/Footer'
import { fetchAPI, getGlobal } from '@/lib/strapi'

export const metadata = {
  description:
    "I'm a passionate developer, entrepreneur, and general technology enthusiast living in San Francisco. I've worked with hundreds of startups to help them develop their ideas into profitable businesses.",
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
  const { testimonials = [], caseStudies = [], posts = [] } = homepage;
  const global = await getGlobal();

  return (
    <>
      <Hero />
      <Experience />
      <FeaturedWork caseStudies={caseStudies} />
      <Testimonials testimonials={testimonials} />
      <FeaturedPosts posts={posts} />
      <Footer {...(global.footer || {})} />
    </>
  )
}

