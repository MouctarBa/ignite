import Image from 'next/image'
import { Container } from './Container'

import awwwards from '@/images/logos/awards/awwwards.svg'
import cssDesignAwards from '@/images/logos/awards/css-design-awards.svg'

const defaultAwards = [
  {
    logo: awwwards,
    alt: 'Investors in People Silver Award badge (ISLC)',
    label: 'Investors in People Silver Award (ISLC), 2022',
  },
  {
    logo: cssDesignAwards,
    alt: 'Lighthouse Christian Chapel Award of Excellence.',
    label: 'Lighthouse Christian Chapel Award of Excellence, 2021',
  },
]

export function Awards({ awards = defaultAwards }) {
  // Determine number of columns from awards array length (at least 1)
  const cols = awards.length > 0 ? awards.length : 1

  return (
    <section className="overflow-hidden bg-emerald-900 py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="text-center">
          <h2 className="font-display text-4xl font-semibold text-white sm:text-5xl">
            My honors & recognitions
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-slate-50">
            These acknowledgements reflect a career dedicated to educational
            leadership, teacher empowerment, and community impact.
          </p>
        </div>
        <div className="relative mt-14 sm:mt-16 md:mt-20">
          <div
            className="grid gap-4"
            style={{
              // create exactly `cols` equal-width columns
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            }}
          >
            {awards.map((award, index) => (
              <div
                key={`award-${index}`}
                className="flex h-40 w-full shrink-0 items-center justify-center border border-sky-100 sm:h-48 lg:h-52"
              >
                <Image
                  src={award.logo}
                  alt={award.alt}
                  className="relative z-10 shrink-0 scale-[.7] sm:scale-75 md:scale-90 lg:scale-75 xl:scale-100"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 overflow-hidden bg-gradient-radial from-slate-900/25 via-slate-900/95 to-slate-900" />
        </div>
      </Container>
    </section>
  )
}
