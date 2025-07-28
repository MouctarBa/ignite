import Link from 'next/link'
import Image from 'next/image'

import { Button } from './Button'
import { Container } from './Container'
import { InstagramIcon, EmailIcon, LinkedInIcon } from './SocialIcons'
import {EducationIcon, ConsultingIcon, BusinessIcon} from './CategoryIcons'
import heroPortrait from '@/images/hero-image.png'
import heroBG from '@/images/home-hero-gradient.svg'
import figma from '@/images/logos/icons/figma.png'
import tailwind from '@/images/logos/icons/tailwindcss.png'
import sketch from '@/images/logos/icons/sketch.png'

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link
      className="flex items-center justify-center duration-200 border rounded-full h-11 w-11 border-slate-200 hover:bg-slate-50"
      {...props}
    >
      <Icon className="w-4 h-4 transition fill-slate-600 group-hover:fill-slate-700" />
    </Link>
  )
}

export function Hero() {
  return (
    <section className="relative py-20 overflow-hidden lg:py-24">
      {/* Light blue gradient background */}
      <Image src={heroBG} alt="" className="absolute inset-x-0 w-auto top-56 lg:inset-y-0" />

      <Container className="relative z-10 grid items-center gap-16 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col items-center max-w-2xl mx-auto lg:items-start">
          <h1 className="text-5xl font-semibold text-center font-display text-slate-900 sm:text-6xl lg:text-left">
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
              <span className="relative">Empowering</span>
            </span>{' '}
            educators across Africa
          </h1>
          <p className="mt-6 text-lg leading-8 text-center text-slate-700 lg:text-left">
            Known as “The Teacher’s Teacher,” Doris Chinedu-Okoro helps schools across Africa deliver high-quality, student-centred education through training and consulting.
          </p>
          <div className="flex flex-wrap items-center justify-center mt-10 gap-x-10 gap-y-6 lg:justify-start">
            <Button variant='secondary' href="#" className="h-11">
              Book a call with me
            </Button>

            <div className="flex gap-3 sm:gap-4">
              <SocialLink
                href="https://instagram.com"
                aria-label="Follow on Instagram"
                icon={InstagramIcon}
              />
              <SocialLink
                href="#"
                aria-label="Follow on LinkedIn"
                icon={LinkedInIcon}
              />
            </div>
          </div>
        </div>
        <div className="w-full max-w-lg mx-auto lg:mr-0">
          <div className="relative aspect-h-5 aspect-w-4 rounded-2xl bg-slate-50">
            <Image
              className="object-cover object-center w-full h-full rounded-2xl"
              src={heroPortrait}
              alt="Doris Chinedu-Okoro, founder of Evergreen Group of Schools"
              sizes="(min-width: 552px) 32rem, calc(100vw - 2.5rem)"
              fill
              priority
            />
            <div>
              <div className="absolute hidden w-max md:left-full md:top-16 md:block lg:-left-28 lg:-top-8 2xl:left-full 2xl:top-16 ">
                <span className="inline-block transform font-writing text-2xl tracking-wide text-slate-600 md:rotate-[16deg] lg:translate-x-6 lg:rotate-[-18deg] 2xl:rotate-12">
                  Hi, I'm Doris!
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="103"
                  height="102"
                  viewBox="0 0 103 102"
                  fill="none"
                  className="h-auto w-28 text-slate-600 md:-translate-x-1/2 md:-translate-y-6 md:rotate-0 lg:-translate-y-3 lg:translate-x-3/4 lg:rotate-12 lg:-scale-x-100 2xl:-translate-x-1/2 2xl:-translate-y-6 2xl:rotate-0 2xl:scale-x-100"
                >
                  <g>
                    <path
                      d="M100.676 26.5417C93.9574 46.1137 83.3723 65.5204 62.3048 74.1115C51.0557 78.6989 36.7215 76.3709 36.7673 62.5332C36.7985 53.1087 42.243 38.3844 53.849 37.3949C66.6654 36.3021 46.8111 57.0334 44.2548 58.8791C32.2897 67.5184 20.2216 71.4112 5.76428 74.151C0.348605 75.1774 3.24474 76.5966 6.85897 77.2296C9.99484 77.7788 13.5771 78.3248 16.755 78.0657C17.7243 77.9867 11.502 77.2793 10.5148 77.213C6.28171 76.9284 1.40658 76.4418 2.9682 71.2948C3.21916 70.4678 6.25335 62.9691 7.53037 63.112C8.19484 63.1864 9.21134 68.8129 9.5344 69.5548C11.6329 74.3731 14.1134 76.5032 19.3253 77.6737"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
              </div>
              <div className="absolute -top-6 right-12 inline-flex h-12 w-max items-center justify-center gap-3.5 rounded-2xl bg-white/90 px-8 text-sm font-semibold text-slate-700 shadow-lg shadow-sky-100/50 ring-1 ring-slate-900/5 backdrop-blur-md md:-left-28 md:top-14 lg:-top-6 lg:left-44 lg:px-10 2xl:-left-48 2xl:top-14">
                <EducationIcon className="h-5 w-5 text-slate-700" />20
                years of Education Experience
              </div>
              <div className="absolute left-12 top-full inline-flex h-12 w-max -translate-y-6 items-center justify-center gap-3.5 rounded-2xl bg-white/90 px-8 text-sm font-semibold text-slate-700 shadow-lg shadow-sky-100/50 ring-1 ring-slate-900/5 backdrop-blur-md md:left-0 md:-translate-x-20 md:-translate-y-24 lg:-left-3 lg:-translate-y-24 lg:px-10 xl:-left-6 xl:-translate-x-28 xl:-translate-y-32">
                <ConsultingIcon className="h-6 w-6 text-indigo-600" />
                  <span className="text-sm font-medium text-slate-800">10 years Consulting Services Experience</span>
              </div>
              <div className="absolute top-[350px] hidden h-12 w-max items-center justify-center gap-3.5 rounded-2xl bg-white/90 px-8 text-sm font-semibold text-slate-700 shadow-lg shadow-sky-100/50 ring-1 ring-slate-900/5 backdrop-blur-md md:left-full md:inline-flex md:-translate-x-32 lg:left-48 lg:hidden lg:px-10 2xl:left-full 2xl:inline-flex 2xl:-translate-x-28">
                <BusinessIcon className="h-6 w-6 text-teal-500" />
                <span className="text-sm font-medium text-slate-800">15 years Business Strategy Experience</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
