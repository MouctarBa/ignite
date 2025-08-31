'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverBackdrop,
  Disclosure,
  DisclosureButton,
} from '@headlessui/react'

import { Button } from './Button'
import { Container } from './Container'
import logo from '@/images/logo-image.png'
import logoIcon from '@/images/logo-icon.png'
import { getStrapiMedia } from '@/lib/strapi'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  // { label: 'Work', href: '/work' },
  // { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const pathname = usePathname()
  const [logoUrl, setLogoUrl] = useState(null)
  const [logoWidth, setLogoWidth] = useState(null)
  const [logoHeight, setLogoHeight] = useState(null)
  const [bookCallUrl, setBookCallUrl] = useState('#')

  useEffect(() => {
    const controller = new AbortController()
    async function loadSettings() {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_STRAPI_API_URL ||
          process.env.STRAPI_API_URL ||
          'http://localhost:1337'
        const url = new URL('/api/site-setting', baseUrl)
        url.searchParams.set('populate', 'logo')
        const res = await fetch(url.toString(), { signal: controller.signal })
        if (!res.ok) {
          throw new Error('Failed to fetch site settings')
        }
        const json = await res.json()
        const data = json.data?.attributes || json.data
        const media = data?.logo?.data?.attributes
        const mediaUrl = getStrapiMedia(data?.logo)
        if (
          mediaUrl &&
          Number.isFinite(media?.width) &&
          Number.isFinite(media?.height)
        ) {
          setLogoUrl(mediaUrl)
          setLogoWidth(media.width)
          setLogoHeight(media.height)
        }
        const callUrl = data?.bookCallUrl
        try {
          const parsed = new URL(callUrl)
          if (parsed.protocol === 'https:') {
            setBookCallUrl(parsed.toString())
          }
        } catch {
          /* ignore invalid URLs */
        }
      } catch (err) {
        console.error('Error loading site settings', err)
      }
    }
    loadSettings()
    return () => controller.abort()
  }, [])

  function Hamburger() {
    return (
      <PopoverButton
        className='group relative z-50 flex cursor-pointer items-center justify-center rounded-full bg-emerald-100/80 p-3 shadow-sm shadow-sky-100/50 ring-1 ring-slate-900/5 transition duration-300 ease-in-out hover:bg-slate-200/60 focus:outline-none md:hidden'
        aria-label='Toggle Navigation'
      >
        <span className='relative h-3.5 w-4'>
          <span className='absolute left-0 top-0 block h-0.5 w-full rotate-0 transform rounded-full bg-slate-700 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-slate-900 group-data-[open]:left-1/2 group-data-[open]:top-1.5 group-data-[open]:w-0' />
          <span className='absolute left-0 top-1.5 block h-0.5 w-full transform rounded-full bg-slate-700 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-slate-900 group-data-[open]:rotate-45' />
          <span className='absolute left-0 top-1.5 block h-0.5 w-full transform rounded-full bg-slate-700 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-slate-900 group-data-[open]:-rotate-45' />
          <span className='absolute left-0 top-3 block h-0.5 w-full rotate-0 transform rounded-full bg-slate-700 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-slate-900 group-data-[open]:left-1/2 group-data-[open]:top-1.5 group-data-[open]:w-0' />
        </span>
      </PopoverButton>
    )
  }

  function MobileNav() {
    return (
      <Popover>
        <Hamburger />
        <PopoverBackdrop
          transition
          className='fixed inset-0 z-20 bg-slate-900 bg-opacity-50 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in'
        />
        <PopoverPanel
          transition
          className='absolute inset-x-0 top-full z-30 mt-4 origin-top overflow-hidden rounded-2xl bg-emerald-50 px-6 py-7 shadow-xl shadow-sky-100/40 ring-1 ring-slate-900/5 transition-all duration-300 data-[closed]:scale-90 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
        >
          <div>
            <div className='flex flex-col space-y-4'>
              {links.map((link) => (
                <Link
                  key={`${link.label}-mobile`}
                  href={link.href}
                  className='block text-base font-semibold text-white duration-200 hover:text-slate-900'
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </PopoverPanel>
      </Popover>
    )
  }

  return (
    <header className='h-24 border-b border-emerald-200/80 bg-emerald-900'>
      <Container className='flex h-full w-full items-center'>
        <nav className='relative z-50 flex w-full items-center justify-between'>
          <div className='flex shrink-0 items-center'>
            <Link
              href='/'
              aria-label='Home'
              className='flex flex-shrink-0 items-center'
            >
              <Image
                src={logoUrl || logo}
                width={logoUrl ? logoWidth || logo.width : logo.width}
                height={logoUrl ? logoHeight || logo.height : logo.height}
                alt=''
                className='h-8 w-auto sm:h-9 md:hidden lg:block lg:h-16'
                priority
              />
              <Image
                src={logoUrl || logoIcon}
                width={logoUrl ? logoWidth || logoIcon.width : logoIcon.width}
                height={logoUrl ? logoHeight || logoIcon.height : logoIcon.height}
                alt=''
                className='hidden h-8 w-auto md:block lg:hidden'
                priority
              />
            </Link>
          </div>
          <div className='hidden items-center md:flex md:space-x-6 lg:space-x-8'>
            {links.map((link) => (
              <Link
                key={`${link.label}-desktop`}
                href={link.href}
                className={clsx(
                  'relative duration-200 after:absolute after:-bottom-2.5 after:left-1/2 after:h-0.5 after:w-4 after:-translate-x-1/2 after:rounded-full after:bg-slate-900 after:opacity-0 after:content-[""]',
                  pathname == link.href
                    ? 'font-semibold text-white after:opacity-100'
                    : 'font-medium text-white hover:text-yellow-200 hover:after:opacity-25'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className='flex items-center'>
            <Button variant='primary' href={bookCallUrl}>
              Book a call
            </Button>
            <div className='ml-4 md:hidden'>
              <MobileNav />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
