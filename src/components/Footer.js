import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'

import { Button } from './Button'
import { Container } from './Container'
import newsletterBg from '@/images/Newsletter-bg_yellow.png'
import {
  InstagramIcon,
  LinkedInIcon,
  EmailIcon,
} from './SocialIcons'

const defaultLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const defaultSocialLinks = [
  {
    label: 'Email me',
    icon: EmailIcon,
    href: '#',
  },
  {
    label: 'Instagram',
    icon: InstagramIcon,
    href: '#',
  },
  {
    label: 'LinkedIn',
    icon: LinkedInIcon,
    href: '#',
  },
]

function SocialLink({ icon: Icon, label, ...props }) {
  return (
    <Link
      className="flex items-center justify-center gap-2.5 rounded-full border border-emerald-600/90 py-2.5 text-sm text-slate-50 duration-200 ease-in-out hover:bg-emerald-800 hover:text-white lg:gap-2 xl:gap-2.5"
      {...props}
    >
      <Icon className="h-4 w-4 shrink-0 text-slate-200 duration-200 ease-in-out group-hover:fill-slate-100" />
      {label}
    </Link>
  )
}

export function Footer({
  newsletter = true,
  links = defaultLinks,
  socialLinks = defaultSocialLinks,
  newsletterHeading = 'Subscribe to my educator insights',
  newsletterSubtext =
    'Join a community of forward‑thinking school leaders and receive exclusive tips on teacher training, starting and growing schools, and building student‑centred institutions delivered straight to your inbox.',
  copyright = `© ${new Date().getFullYear()} Bah Digital Designs. All rights reserved.`,
}) {
  return (
    <section className={clsx(newsletter && 'pt-12 sm:pt-16')}>
      {newsletter && (
        <div id="newsletter" className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-emerald-900"></div>
          <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl bg-emerald-700 px-5 py-12 sm:px-16 lg:py-14">
              <Image
                src={newsletterBg}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-right"
              />
              <div className="relative flex w-full flex-col items-center lg:flex-row">
                <div className="max-w-2xl text-center lg:pr-4 lg:text-left">
                  <h3 className="font-display text-4xl font-semibold text-white sm:text-5xl">
                    {newsletterHeading}
                  </h3>
                  <p className="mx-auto mt-4 max-w-lg text-lg text-emerald-50 lg:mx-0 lg:mt-6">
                    {newsletterSubtext}
                  </p>
                </div>
                <form
                  action="#"
                  method="post"
                  className="relative mt-10 w-full max-w-lg lg:mt-0"
                >
                  <input
                    type="email"
                    className="h-14 w-full rounded-full border-0 bg-white/10 py-3.5 pl-5 pr-32 text-sm leading-5 text-emeral-50 placeholder-emerald-100/90 outline-none ring-1 ring-white/25 backdrop-blur  duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/30 sm:pl-6"
                    required
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 inline-flex h-11 items-center rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-emerald-50 outline-none transition duration-200 ease-in-out hover:bg-emerald-800 focus:outline-none sm:px-7 sm:text-md"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <footer className="overflow-hidden bg-emerald-900 pb-8 pt-20 sm:pb-12 sm:pt-24 lg:pt-32">
        <Container>
          <div className="mx-auto grid max-w-xl items-center gap-5 lg:mx-0 lg:max-w-none lg:grid-cols-12 lg:gap-12 xl:gap-20">
            <div className="lg:col-span-7">
              <h3 className="text-center font-display text-4xl font-semibold text-white sm:text-5xl lg:max-w-xl lg:text-left">
                Let’s transform education together
              </h3>
              <div className="hidden lg:block">
                <Button href="#" variant="primary" className="mt-12">
                  Book a call
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center lg:col-span-5 lg:items-start">
              <p className="text-center text-lg text-slate-50 lg:max-w-sm lg:text-left">
                I’m currently partnering with educators, entrepreneurs and NGOs across Africa to build exemplary schools and empower teachers. Let’s connect and discuss how I can support your vision.
              </p>

              <Button
                href="#"
                variant="primary"
                className="mt-10 lg:hidden"
              >
                Book a call
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
              <div className="mt-16 grid w-full max-w-sm grid-cols-2 gap-3.5 sm:max-w-none sm:grid-cols-3 lg:mt-8 lg:gap-2.5 xl:gap-3.5">
                {socialLinks.map((socialLink) => (
                  <SocialLink
                    key={`footer-social-link-${socialLink.label}`}
                    icon={socialLink.icon}
                    label={socialLink.label}
                    href={socialLink.href}
                  />
                ))}
              </div>
            </div>
          </div>
          <hr className="mb-6 mt-12 h-px w-full border-emerald-600/90 sm:mb-10 sm:mt-16" />
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center gap-6">
              {links.map((link, index) => (
                <Link
                  key={`footer-link-${index}`}
                  href={link.href}
                  className="text-base font-medium text-slate-100 duration-200 ease-in-out hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="mt-8 text-base text-slate-300/90 md:mt-0">
              {copyright}
            </p>
          </div>
        </Container>
      </footer>
    </section>
  )
}
