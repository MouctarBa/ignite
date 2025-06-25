import { AboutHero } from '@/components/AboutHero'
import { WorkExperience } from '@/components/WorkExperience'
import { Workstation } from '@/components/Workstation'
import { Stack } from '@/components/Stack'
import { Awards } from '@/components/Awards'
import { Press } from '@/components/Press'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'About',
  description:
    "Hi, I'm Jane Doe, a passionate developer, entrepreneur, and general technology enthusiast living in San Francisco.",
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WorkExperience />
      <Workstation />
      <Stack />
      <Awards />
      <Press />
      <Footer />
    </>
  )
}
