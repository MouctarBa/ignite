import Image from 'next/image'
import clsx from 'clsx'

import { Container } from './Container'
import heroImage from '@/images/evening.jpg'
import heroBG from '@/images/about-hero-gradient.svg'
import { Mr_Dafoe } from 'next/font/google'

const mrDafoe = Mr_Dafoe({
  subsets: ['latin'],
  variable: '--font-mr-dafoe',
  weight: '400',
})

export function AboutHero({ data = {} }) {
  const {
    heading = 'Empowering Educators Across Africa',
    description1 =
      'Doris Chinedu-Okoro is known as “The Teacher’s Teacher” for a reason. As the CEO of Evergreen Group of Schools and a sought-after school startup consultant, she has helped countless educators turn their vision into thriving, student-centred institutions. Her mission is to elevate teaching standards and build the next generation of leaders.',
    description2 =
      'Doris is also the convenor of the South East Educators Conference (SEEC), the first conference of its kind dedicated to professional development for teachers in the region. When she’s not mentoring educators, she’s writing and speaking about education reform, running the Evergreen Foundation, or participating in executive programmes at Lagos Business School. Join her journey to transform education for all.',
    name = 'Doris Chinedu-Okoro',
    image,
    background,
  } = data

  return (
    <section className="relative bg-slate-50/50">
      <Image
        src={background?.url || heroBG}
        alt="Classroom background"
        className="absolute inset-0 object-cover object-left w-full h-full lg:w-2/3"
      />
      <Container className="relative py-16 sm:py-24 lg:py-32">
        <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:mx-0 lg:w-2/3 lg:max-w-none lg:px-8 lg:pr-16">
          <h1 className="text-5xl font-semibold font-display text-slate-900 sm:text-6xl">
            <span className="relative whitespace-nowrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="249"
                height="22"
                viewBox="0 0 249 22"
                fill="currentColor"
                className="absolute left-0 top-2/3 h-[0.6em] w-full fill-sky-200/75"
              >
                <path d="M247.564 18.5807C241.772 13.3568 232.473 12.7526 225.225 11.4427C217.124 9.97395 208.996 8.57031 200.846 7.46093C186.542 5.51302 172.169 4.08854 157.79 3.01562C126.033 0.645827 94.0929 0.0338481 62.3387 2.36979C42.1785 3.85416 22.008 5.90885 2.32917 10.8463C-0.0155171 11.4349 0.207047 14.6719 2.6889 14.7083C22.0261 14.9896 41.3866 12.6406 60.7109 11.8568C79.9471 11.0807 99.2274 10.6719 118.484 10.9557C142.604 11.3125 166.719 12.8333 190.722 15.5156C199.956 16.5469 209.195 17.6016 218.411 18.8255C227.864 20.0807 237.259 22 246.767 20.7422C247.709 20.6198 248.426 19.3568 247.564 18.5807Z" />
              </svg>
              <span className="relative">{heading}</span>
            </span>
          </h1>
          <p className="mt-8 text-lg leading-8 text-slate-700">
            {description1}
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            {description2}
          </p>
          <p
            className={clsx('mt-16 text-3xl text-slate-700', mrDafoe.className)}
          >
            {name}
          </p>
        </div>
      </Container>
      <div className="relative h-96 w-full md:h-[600px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/3">
        <Image
          src={image?.url || heroImage}
          alt="Doris Chinedu-Okoro, founder of Evergreen Group of Schools"
          className="absolute inset-0 object-cover object-top w-full h-full"
          sizes="(min-width: 1024px) 33vw, 100vw"
          priority
        />
        <svg
          width="229"
          height="40"
          viewBox="0 0 229 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-0 w-auto h-8 -translate-x-1/2 bottom-16 mt-14 sm:mt-20 sm:h-10"
        >
          <g clipPath="url(#clip0_204_150)">
            <path
              d="M1 19L29.4 39L57.7 19L86.1 39L114.5 19L142.8 39L171.2 19L199.6 39L228 19"
              stroke="#0369A1"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 19L29.4 39L57.7 19L86.1 39L114.5 19L142.8 39L171.2 19L199.6 39L228 19"
              stroke="black"
              strokeOpacity="0.2"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 1L29.4 21L57.7 1L86.1 21L114.5 1L142.8 21L171.2 1L199.6 21L228 1"
              stroke="#BAE6FD"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_204_150">
              <rect width="229" height="40" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </section>
  )
}
