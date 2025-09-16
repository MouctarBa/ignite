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
  // Load homepage (non-fatal)
  let homepageRes = null
  try {
    homepageRes = await fetchAPI('/homepage', { populate: '*' })
  } catch (err) {
    console.warn('Homepage single type not reachable, falling back:', err)
  }

  // Fallback: allow homepage content to come from the Page collection
  // Create a Page with slug `home` (or `homepage`/`index`) and fill its `hero` component.
  // We'll map `hero.heading` -> heroText and `hero.image` -> heroMedia for the Hero component.
  let homepageAttrs = homepageRes?.data?.attributes || null
  if (!homepageAttrs) {
    try {
      const pageRes = await fetchAPI('/pages', {
        filters: { slug: { $in: ['home', 'homepage', 'index'] } },
        populate: '*',
      })
      const record = pageRes?.data?.[0]
      const pageAttrs = record?.attributes
      if (pageAttrs) {
        homepageAttrs = {
          heroText: pageAttrs.hero?.heading,
          heroMedia: pageAttrs.hero?.image,
          footer: pageAttrs.footer,
        }
      }
    } catch (err) {
      console.warn('Page collection fallback for homepage failed:', err)
    }
  }

  // Always fetch collections so the homepage can render content even if not embedded in single type
  let testimonialsRes = { data: [] }
  let caseStudiesRes = { data: [] }
  let postsRes = { data: [] }
  try {
    const ENABLE_TESTIMONIALS =
      (process.env.NEXT_PUBLIC_ENABLE_TESTIMONIALS || process.env.ENABLE_TESTIMONIALS) === 'true'

    const promises = [
      fetchAPI('/case-studies', {
        sort: 'publishedAt:desc',
        pagination: { limit: 4 },
        populate: '*',
      }).catch(() => ({ data: [] })),
      fetchAPI('/posts', {
        sort: 'publishedAt:desc',
        pagination: { limit: 3 },
        populate: '*',
      }).catch(() => ({ data: [] })),
    ]

    if (ENABLE_TESTIMONIALS) {
      promises.unshift(
        fetchAPI('/testimonials', { populate: '*' }).catch(() => ({ data: [] }))
      )
    }

    const results = await Promise.all(promises)
    if (ENABLE_TESTIMONIALS) {
      ;[testimonialsRes, caseStudiesRes, postsRes] = results
    } else {
      ;[caseStudiesRes, postsRes] = results
    }
  } catch (err) {
    console.warn('Collection content failed to load:', err)
  }

  homepageAttrs = homepageAttrs || {}

  // Prefer explicitly selected featured content when available
  if (homepageAttrs.featuredCaseStudies?.data?.length) {
    caseStudiesRes = { data: homepageAttrs.featuredCaseStudies.data }
  }
  if (homepageAttrs.featuredPosts?.data?.length) {
    postsRes = { data: homepageAttrs.featuredPosts.data }
  }
  return {
    ...homepageAttrs,
    testimonials: testimonialsRes.data || [],
    caseStudies: caseStudiesRes.data || [],
    posts: postsRes.data || [],
    experienceVideo: homepageAttrs.experienceVideo,
  }
}

export default async function HomePage() {
  const homepage = (await getHomepageData()) || {};
  const {
    testimonials = [],
    caseStudies = [],
    posts = [],
    experienceVideo,
    heroText,
    heroMedia,
  } = homepage;

  return (
    <>
      <Hero heroText={heroText} heroMedia={heroMedia} />
      <Experience video={experienceVideo} />
      <FeaturedWork caseStudies={caseStudies} />
      <Testimonials testimonials={testimonials} />
      <FeaturedPosts posts={posts} />
    </>
  )
}

