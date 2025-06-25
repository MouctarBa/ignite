import { Hero } from '@/components/Hero'
import { Experience } from '@/components/Experience'
import { StackIconsRow } from '@/components/StackIconsRow'
import { FeaturedWork } from '@/components/work/FeaturedWork'
import { Testimonials } from '@/components/Testimonials'
import { FeaturedPosts } from '@/components/blog/FeaturedPosts'
import { Footer } from '@/components/Footer'

export const metadata = {
  description:
    "I'm a passionate developer, entrepreneur, and general technology enthusiast living in San Francisco. I've worked with hundreds of startups to help them develop their ideas into profitable businesses.",
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Experience />
      <StackIconsRow />
      <FeaturedWork />
      <Testimonials />
      <FeaturedPosts />
      <Footer />
    </>
  )
}
