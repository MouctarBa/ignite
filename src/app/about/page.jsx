import { AboutHero } from '@/components/AboutHero'
import { WorkExperience } from '@/components/WorkExperience'
import { Awards } from '@/components/Awards'
import { Press } from '@/components/Press'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'About',
  description:
    "Hi, I'm Doris Chinedu-okoro, a passionate developer, entrepreneur, and general technology enthusiast living in San Francisco.",
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WorkExperience />
      <Awards />
      <Press />
      <Footer />
    </>
  )
}
