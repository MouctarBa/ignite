import { AboutHero } from '@/components/AboutHero'
import { WorkExperience } from '@/components/WorkExperience'
import { Awards } from '@/components/Awards'
import { Press } from '@/components/Press'
import { getPage } from '@/lib/strapi'

export const metadata = {
  title: 'About Doris Chinedu-Okoro',
  description:
    'Doris Chinedu-Okoro is an education consultant and CEO of Evergreen Group of Schools specializing in teacher training and school startups.',
}

export default async function AboutPage() {
  let page = {}
  try {
    page = await getPage('about')
  } catch (e) {
    console.warn('About page content unavailable:', e?.message || e)
  }

  return (
    <>
      <AboutHero data={page.hero} />
      <WorkExperience experiences={page.workExperiences} />
      <Awards awards={page.awards} />
      <Press items={page.pressItems} />
    </>
  )
}
