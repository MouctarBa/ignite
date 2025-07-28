import Image from 'next/image'

import { Button } from './Button'
import { Container } from './Container'

import adobe from '@/images/logos/icons/adobe.png'
import dropbox from '@/images/logos/icons/dropbox.png'
import gumroad from '@/images/logos/icons/gumroad.png'
import mailchimp from '@/images/logos/icons/mailchimp.png'
import shopify from '@/images/logos/icons/shopify.png'

const defaultCompanies = [
  {
    name: 'CEO & Founder, Evergreen Group of Schools',
    dates: '2008 \u2013 Present',
    description:
      'Doris founded Evergreen Group of Schools with the goal of providing high-quality, values-based education in Nigeria. Under her leadership, Evergreen has grown into a multi-campus institution known for its holistic approach to learning.',
    logo: adobe,
  },
  {
    name: 'School Startup Consultant',
    dates: '2012 \u2013 Present',
    description:
      'As a consultant, Doris helps entrepreneurs and communities design, launch and manage new schools. Her expertise covers curriculum development, teacher training and sustainable school governance.',
    logo: dropbox,
  },
  {
    name: 'Convenor, South East Educators Conference (SEEC)',
    dates: '2019 \u2013 Present',
    description:
      'Doris founded SEEC, the first conference dedicated to educators in the South-East. The annual event brings teachers together to share best practices, network and receive world-class professional development.',
    logo: gumroad,
  },
  {
    name: 'Author & Education Advocate',
    dates: '2015 \u2013 Present',
    description:
      'Doris has written extensively about education reform and teacher empowerment. She uses her platform to advocate for policies that improve student outcomes and teacher welfare.',
    logo: mailchimp,
  },
  {
    name: 'Lagos Business School, Executive Education',
    dates: '2023 \u2013 Present',
    description:
      'To stay at the forefront of educational leadership, Doris continues her professional development through executive programmes at Lagos Business School.',
    logo: shopify,
  },
]

export function WorkExperience({ experiences = defaultCompanies }) {
  return (
    <section className="relative overflow-x-clip bg-white py-16 sm:py-24 lg:py-32">
      <Container className="relative">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div>
            <h2 className="font-display text-4xl font-semibold text-slate-900 sm:text-5xl">
              My career{' '}
              <span className="relative whitespace-nowrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="167"
                  height="24"
                  viewBox="0 0 167 24"
                  fill="currentColor"
                  className="absolute left-0 top-2/3 h-[0.6em] w-full fill-sky-200/75"
                >
                  <g clipPath="url(#clip0_257_225)">
                    <path d="M166.409 20.2699C162.515 14.571 156.265 13.9119 151.392 12.4829C145.948 10.8807 140.484 9.3494 135.006 8.13918C125.391 6.01418 115.729 4.4602 106.064 3.28974C84.7177 0.704517 63.2477 0.036903 41.9031 2.5852C28.3517 4.20452 14.7934 6.44599 1.5656 11.8324C-0.0104672 12.4744 0.139137 16.0057 1.8074 16.0454C14.8056 16.3522 27.8194 13.7897 40.8089 12.9346C53.7392 12.088 66.6991 11.642 79.6433 11.9517C95.8562 12.3409 112.066 14 128.2 16.9261C134.407 18.0511 140.617 19.2017 146.812 20.5369C153.167 21.9062 159.481 24 165.873 22.6278C166.506 22.4943 166.988 21.1164 166.409 20.2699Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0_257_225">
                      <rect width="167" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span className="relative text-sky-700">journey</span>
              </span>{' '}
              so far
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              From founding Evergreen Schools to mentoring new educators, my
              journey continues to focus on excellence in teaching.
            </p>
            <Button href="#" className="mt-10" variant="secondary">
              Download CV
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px] text-slate-600"
              >
                <title>move-layer-down</title>
                <g fill="currentColor">
                  <path
                    d="M12,1a1,1,0,0,0-1,1v8H7a1,1,0,0,0-.768,1.641l5,6a1,1,0,0,0,1.536,0l5-6A1,1,0,0,0,17,10H13V2A1,1,0,0,0,12,1Z"
                    fill="currentColor"
                  ></path>
                  <path d="M22,21H2a1,1,0,0,0,0,2H22a1,1,0,0,0,0-2Z"></path>
                </g>
              </svg>
            </Button>
          </div>
          <ol className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 [counter-reset:section] sm:grid-cols-2 lg:gap-y-16">
            {experiences.map((company) => (
              <li
                key={company.name}
                className="relative [counter-increment:section] before:absolute before:-top-7 before:right-0 before:font-mono before:text-9xl before:font-black before:leading-none before:text-slate-50 before:content-[counter(section,decimal-leading-zero)]"
              >
                <div>
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-sky-50 via-slate-50 to-sky-50 ring-1 ring-slate-900/5">
                    <Image src={company.logo} alt={company.name} />
                  </div>
                  <p className="text-sm font-medium text-sky-700">
                    {company.dates}
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold text-slate-900">
                    {company.name}
                  </p>
                </div>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  {company.description}
                </p>
              </li>
            ))}
            <li className="relative mt-3 flex h-fit items-center font-writing text-2xl tracking-wide text-slate-600 sm:left-14 sm:top-6 sm:mt-0 sm:block sm:text-[27px] md:left-20">
              <span className="inline-block w-52 max-w-[240px] transform sm:w-auto sm:-rotate-12">
                I am currently here in my journey :D
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="124"
                height="121"
                viewBox="0 0 124 121"
                fill="none"
                className="relative -left-4 h-auto w-24 -translate-y-5 rotate-90 -scale-y-100 transform text-slate-600 sm:-left-8 sm:w-32 sm:translate-y-2 sm:-rotate-6 sm:scale-100"
              >
                <g clipPath="url(#clip0_257_335)">
                  <path
                    d="M101.672 26.3321C96.8237 38.134 92.186 44.0573 79.0339 44.4141C70.6979 44.6403 60.8529 42.694 53.4527 38.7688C49.1632 36.4936 56.8633 35.9887 58.3238 36.046C75.2213 36.7084 91.469 47.7751 94.8076 64.9225C96.9834 76.0979 88.4245 81.9067 78.6041 84.1752C63.6278 87.6349 47.752 81.2525 36.0397 72.0991C32.1436 69.0541 19.8172 60.5149 22.0934 54.2698C23.9793 49.0954 31.7507 55.0061 34.018 56.9118C37.2506 59.6288 44.0244 65.7437 43.9149 70.3449C43.7576 76.9438 32.7995 78.0771 28.2217 77.7848C19.5283 77.2298 10.3327 73.6012 2.05876 71.0225C1.4496 70.8325 5.37871 69.9759 6.06477 69.8198C8.02976 69.3721 9.72632 68.1441 11.7325 67.8657C13.2208 67.6592 21.2769 68.287 16.2554 69.947C14.4855 70.532 2.71379 69.3189 2.58655 69.7453C2.06535 71.4868 10.2182 79.8642 11.7371 81.4008C15.3955 85.1003 14.5874 73.4626 14.2296 71.9325"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_257_335">
                    <rect
                      width="106"
                      height="67"
                      fill="white"
                      transform="matrix(-0.748497 0.663138 0.663138 0.748497 79.3407 0)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </li>
          </ol>
        </div>
      </Container>
    </section>
  )
}
