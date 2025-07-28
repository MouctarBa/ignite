import Image from 'next/image'

import { Container } from './Container'

import awwwards from '@/images/logos/awards/awwwards.svg'
import cssDesignAwards from '@/images/logos/awards/css-design-awards.svg'

const defaultAwards = [
  {
    logo: awwwards,
    alt: 'Investors in People Silver Award badge \u2013 Evergreen Group of Schools.',
  },
  {
    logo: cssDesignAwards,
    alt: 'Lighthouse Christian Chapel Award of Excellence.',
  },
]

export function Awards({ awards = defaultAwards }) {
  return (
    <section className='overflow-hidden bg-emerald-900 py-16 sm:py-24 lg:py-32'>
      <Container>
        <div className='text-center'>
          <h2 className='font-display text-4xl font-semibold text-white sm:text-5xl'>
            My awards and acknowledgements
          </h2>
          <p className='mx-auto mt-6 max-w-md text-lg leading-8 text-slate-50'>
            Recognitions are like tattoos, you only show them off to people you
            want to impress.
          </p>
        </div>
        <div className='relative mt-14 sm:mt-16 md:mt-20'>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
            {awards.map((award, index) => {
              const logo = award.logo || award
              const alt = award.alt || ''
              return (
                <div
                  key={`award-border-${index}`}
                  className='flex h-40 w-full shrink-0 items-center justify-center border border-sky-100 sm:h-48 lg:h-52'
                >
                  <Image
                    src={logo}
                    alt={alt}
                    className='relative z-10 shrink-0 scale-[.7] sm:scale-75 md:scale-90 lg:scale-75 xl:scale-100'
                  />
                </div>
              )
            })}
          </div>
          <div className='absolute inset-0 overflow-hidden bg-gradient-radial from-slate-900/25 via-slate-900/95 to-slate-900'></div>
        </div>
      </Container>
    </section>
  )
}
