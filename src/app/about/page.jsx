import { AboutHero } from '@/components/AboutHero'
import { WorkExperience } from '@/components/WorkExperience'
import { Awards } from '@/components/Awards'
import { Press } from '@/components/Press'
import { Footer } from '@/components/Footer'
import { getGlobal, getPage } from '@/lib/strapi'

export const metadata = {
  title: 'About',
  description:
    "Hi, I'm Doris Chinedu-okoro, a passionate developer, entrepreneur, and general technology enthusiast living in San Francisco.",
}

export default async function AboutPage() {
  const page = await getPage('about')
  const global = await getGlobal()

  return (
    <>
      <AboutHero data={page.hero} />
      <WorkExperience experiences={page.workExperiences} />
      <Awards awards={page.awards} />
      <Press items={page.pressItems} />
      <Footer {...global.footer} />
    </>
  )
}
