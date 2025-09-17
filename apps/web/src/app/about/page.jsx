import { AboutHero } from '@/components/AboutHero'
import { WorkExperience } from '@/components/WorkExperience'
import { Awards } from '@/components/Awards'
import { Press } from '@/components/Press'
import { getAboutPage, getWorkExperience, getAwardsSection, getPressSection } from '@/lib/strapi'

export const metadata = {
  title: 'About Doris Chinedu-Okoro',
  description:
    'Doris Chinedu-Okoro is an education consultant and CEO of Evergreen Group of Schools specializing in teacher training and school startups.',
}

export default async function AboutPage() {
  let page = {}
  let experience = {}
  let awards = {}
  let press = {}
  try { page = await getAboutPage() } catch (e) { console.warn('About page content unavailable:', e?.message || e) }
  try { experience = await getWorkExperience() } catch (e) { console.warn('Work experience unavailable:', e?.message || e) }
  try { awards = await getAwardsSection() } catch (e) { console.warn('Awards section unavailable:', e?.message || e) }
  try { press = await getPressSection() } catch (e) { console.warn('Press section unavailable:', e?.message || e) }

  return (
    <>
      <AboutHero data={page.hero} />
      <WorkExperience
        experiences={experience.experiences || page.workExperiences}
        headingPrefix={experience.headingPrefix}
        headingHighlight={experience.headingHighlight}
        headingSuffix={experience.headingSuffix}
        intro={experience.intro}
        journeyNote={experience.journeyNote}
      />
      <Awards
        awards={awards.awards || page.awards}
        heading={awards.heading}
        subtext={awards.subtext}
      />
      <Press
        items={press.items || page.pressItems}
        heading={press.heading}
        subtext={press.subtext}
      />
    </>
  )
}
