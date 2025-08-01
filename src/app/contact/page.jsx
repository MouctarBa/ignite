import Link from 'next/link'
import Image from 'next/image'

import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'
import { getGlobal, getPage } from '@/lib/strapi'

import image from '@/images/quote.jpg'

export const metadata = {
  title: 'Contact me',
  description:
    "Whether you're looking to kickstart a new web project or simply want to say hi, feel free to get in touch.",
}

function Form() {
  const inputClasses =
    'block w-full px-4 py-4 leading-4 transition-colors duration-200 ease-in-out border-0 shadow-sm rounded-xl bg-slate-50 text-md text-slate-900 shadow-sky-100/50 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 hover:bg-white focus:border-0 focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600/60'

  function Label({ name, description, children }) {
    return (
      <div className='flex justify-between text-md leading-6'>
        <label htmlFor={name} className='block font-medium text-slate-900'>
          {children}
        </label>
        {description && (
          <p id={`${name}-description`} className='text-slate-500/80'>
            {description}
          </p>
        )}
      </div>
    )
  }

  function TextField({
    label,
    name,
    type = 'text',
    rows = 5,
    className,
    ...props
  }) {
    return (
      <div className={className}>
        {label && <Label name={name}>{label}</Label>}
        <div className='mt-2'>
          {type === 'textarea' ? (
            <textarea
              id={name}
              name={name}
              rows={rows}
              {...props}
              className={inputClasses}
            />
          ) : (
            <input
              id={name}
              name={name}
              type={type}
              {...props}
              className={inputClasses}
            />
          )}
        </div>
      </div>
    )
  }

  function CheckboxField({ label, name }) {
    return (
      <div className='flex items-start'>
        <div className='flex h-6 items-center'>
          <input
            id={name}
            name={name}
            type='checkbox'
            className='h-4 w-4 rounded border-slate-300/80 bg-slate-50 text-sky-600 shadow-sm shadow-sky-100/50 focus:outline-none focus:ring-transparent'
          />
        </div>
        <div className='ml-3 text-sm leading-6'>
          <label htmlFor={name} className='text-slate-700'>
            {label}
          </label>
        </div>
      </div>
    )
  }

  return (
    <form action='#' method='POST' className='mt-10'>
      <div className='space-y-7'>
        <TextField
          label='Name'
          name='name'
          autoComplete='name'
          placeholder='Adebayo Adedji'
        />
        <TextField
          label='Email'
          name='email'
          type='email'
          autoComplete='email'
          placeholder='adebayo@email.com'
        />
        <TextField
          label='Phone'
          name='phone'
          type='tel'
          autoComplete='tel'
          aria-describedby='phone-description'
          placeholder='+1 (800) 123-4567'
        />
        <TextField
          label='Message'
          name='message'
          type='textarea'
          aria-describedby='message-description'
          placeholder='Tell me a little bit about your request...'
        />
        <fieldset>
          <legend className='block text-md font-medium leading-6 text-slate-900'>
            Expected services
          </legend>
          <div className='mt-4 space-y-3'>
            <CheckboxField label='Coaching' name='coaching' />
            <CheckboxField label='Mentorship' name='mentorship' />
            <CheckboxField label='Speaking' name='speacking' />
            <CheckboxField label='Other' name='other' />
          </div>
        </fieldset>
      </div>
      <div className='mt-10 border-t border-slate-200 pt-8'>
        <Button type='submit' variant="secondary" className='w-full text-base sm:text-lg'>
          Get started
        </Button>
      </div>
    </form>
  )
}

export default async function ContactPage() {
  const page = await getPage('contact')
  const global = await getGlobal()
  const email = page.email || 'Ceo@evergreenschool.com.ng'
  const phone = page.phone || '+(234) 080-6878-2862'
  const heading = page.heading || 'How can I help you? Let\u2019s get in touch'
  const subheading = page.subheading || 'Your next breakthrough starts right here let\u2019s build it together.'
  return (
    <>
      <section className='relative overflow-hidden'>
        <div className='mx-auto max-w-screen-xl'>
          <div className='lg:columns-2 lg:gap-8'>
            <div className='relative bg-slate-50 px-5 py-16 sm:px-6 sm:py-24 lg:col-span-6 lg:rounded-br-[64px] lg:px-8 lg:pt-32 2xl:pl-0'>
              <div className='absolute inset-y-0 -left-full hidden w-full bg-slate-50 lg:block' />
              <div className='relative mx-auto max-w-2xl lg:mx-0 lg:max-w-none'>
                <h2 className='font-display text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-[40px] lg:leading-tight xl:text-5xl xl:leading-tight'>
                  {heading}
                  <span className='ml-4 sm:ml-6'>👋</span>
                </h2>

                <div className='aspect-h-2 aspect-w-3 mt-12 sm:mt-16'>
                  <Image
                    src={image}
                    alt=''
                    className='h-full w-full rounded-3xl object-cover xl:left-16'
                    sizes='(min-width: 1280px) 35rem, (min-width: 1024px) calc(50vw - 5rem), (min-width: 768px) 42rem, calc(100vw - 2.5rem)'
                  />
                </div>
                <div className='relative mt-14 h-fit w-fit font-writing text-2xl tracking-wide text-slate-600 sm:mt-20 sm:text-[27px]'>
                  <span className='inline-block w-52 max-w-[220px] transform sm:w-auto sm:-rotate-6'>
                    You can <span className='text-sky-700'>reach me</span> at
                    the following
                  </span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='124'
                    height='121'
                    viewBox='0 0 124 121'
                    fill='none'
                    className='absolute -right-16 top-4 h-24 w-auto -rotate-90 transform text-slate-600 sm:-right-20 sm:-top-1 sm:translate-y-2 sm:rotate-[-100deg]'
                  >
                    <g clipPath='url(#clip0_257_335)'>
                      <path
                        d='M101.672 26.3321C96.8237 38.134 92.186 44.0573 79.0339 44.4141C70.6979 44.6403 60.8529 42.694 53.4527 38.7688C49.1632 36.4936 56.8633 35.9887 58.3238 36.046C75.2213 36.7084 91.469 47.7751 94.8076 64.9225C96.9834 76.0979 88.4245 81.9067 78.6041 84.1752C63.6278 87.6349 47.752 81.2525 36.0397 72.0991C32.1436 69.0541 19.8172 60.5149 22.0934 54.2698C23.9793 49.0954 31.7507 55.0061 34.018 56.9118C37.2506 59.6288 44.0244 65.7437 43.9149 70.3449C43.7576 76.9438 32.7995 78.0771 28.2217 77.7848C19.5283 77.2298 10.3327 73.6012 2.05876 71.0225C1.4496 70.8325 5.37871 69.9759 6.06477 69.8198C8.02976 69.3721 9.72632 68.1441 11.7325 67.8657C13.2208 67.6592 21.2769 68.287 16.2554 69.947C14.4855 70.532 2.71379 69.3189 2.58655 69.7453C2.06535 71.4868 10.2182 79.8642 11.7371 81.4008C15.3955 85.1003 14.5874 73.4626 14.2296 71.9325'
                        stroke='currentColor'
                        strokeWidth='1.75'
                        strokeLinecap='round'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_257_335'>
                        <rect
                          width='106'
                          height='67'
                          fill='white'
                          transform='matrix(-0.748497 0.663138 0.663138 0.748497 79.3407 0)'
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className='mt-16 grid gap-8 sm:mt-20 sm:grid-cols-2 sm:gap-6 xl:gap-8'>
                  <div className='flex gap-[18px]'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.75'
                      stroke='currentColor'
                      className='h-6 w-6 shrink-0 text-sky-600'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
                      />
                    </svg>
                    <div className='sm:pt-0.5'>
                      <p className='font-display text-lg text-slate-900'>
                        Email me
                      </p>
                      <p className='mt-1.5 text-base text-slate-600 sm:mt-2'>
                        I will usually email you back within an hour
                      </p>
                      <Link
                        href={`mailto:${email}`}
                        className='mt-5 inline-block text-sky-700 duration-200 ease-in-out hover:text-sky-600 sm:mt-6'
                      >
                        {email}
                      </Link>
                    </div>
                  </div>
                  <div className='flex gap-[18px]'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.75'
                      stroke='currentColor'
                      className='h-6 w-6 shrink-0 text-sky-600'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z'
                      />
                    </svg>

                    <div className='sm:pt-0.5'>
                      <p className='font-display text-lg text-slate-900'>
                        Call me
                      </p>
                      <p className='mt-2 text-base text-slate-600'>
                        I’m available weekdays from 9AM to 5PM
                      </p>
                      <Link
                        href={`tel:${phone}`}
                        className='mt-6 inline-block text-sky-700 duration-200 ease-in-out hover:text-sky-600'
                      >
                        {phone}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='px-5 py-16 sm:px-6 sm:py-24 lg:col-span-6 lg:pl-0 lg:pr-8 lg:pt-32 xl:col-span-5 xl:col-start-8 2xl:pr-0'>
              <div className='mx-auto max-w-lg lg:mr-0'>
                <h3 className='font-display text-3xl font-semibold text-slate-900'>
                  Fill out the form below to get started
                </h3>
                <p className='mt-4 text-lg text-slate-600'>
                  {subheading}
                </p>
                <Form />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer {...(global.footer || {})} />
    </>
  )
}
