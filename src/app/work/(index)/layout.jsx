import { Tabs } from '@/components/Tabs'
import { Pagination } from '@/components/Pagination'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { getFeaturedTags } from '@/lib/caseStudies'

export const metadata = {
  title: {
    template: 'Work - %s - Jane Doe',
    default: 'Work',
  },
  description:
    'Explore an impressive collection of case studies showcasing my diverse skill set, innovative solutions, and successful projects.',
}

export default async function WorkLayout({ children }) {
  // Await the tags to ensure they are fetched before rendering
  const featuredTags = await getFeaturedTags();

  return (
    <>
      <section className="overflow-hidden bg-white py-16 sm:pt-24 lg:pt-32">
        <Container>
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="font-display text-5xl font-semibold text-slate-900 sm:text-6xl lg:leading-none">
                Case Studies
              </h2>
              <p className="text-lg text-slate-700 lg:ml-auto lg:max-w-lg">
                Dive into my diverse range of projects, showcasing my expertise
                in software development, design, and dedication to delivering
                exceptional results.
              </p>
            </div>
            <Tabs
              className="mt-14 gap-x-1.5 gap-y-4 md:gap-x-1 lg:mt-16 lg:gap-2"
              tabs={featuredTags}
              directory={'work'}
            />
            {children}
            <Pagination />
          </div>
        </Container>
      </section>
      <Footer />
    </>
  )
}