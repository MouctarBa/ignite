import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { Pagination } from '@/components/Pagination'

function CaseStudy({ caseStudy, index }) {
  // Safety check: if there are no attributes, don't render anything.
  if (!caseStudy || !caseStudy.attributes) {
    return null
  }

  const { attributes } = caseStudy

  // Safety check for thumbnail before rendering
  if (!attributes.thumbnail || !attributes.thumbnail.data) {
    return (
      <div className='rounded-2xl bg-red-100 p-8 text-center'>
        <p>Case study "{attributes.title}" is missing a thumbnail image.</p>
      </div>
    )
  }

  return (
    <div
      key={attributes.title}
      className={clsx(
        'flex flex-col gap-12 rounded-3xl bg-slate-50 px-7 py-12 sm:gap-14 sm:p-16 lg:px-10 lg:py-14 xl:gap-16 xl:p-16',
        index % 2 === 0
          ? 'rounded-tl-[64px]'
          : 'transform rounded-br-[64px] lg:translate-y-24 xl:translate-y-32'
      )}
    >
      <Link
        href={`/work/${attributes.slug}`}
        className={clsx(
          'group aspect-h-9 aspect-w-16 relative block w-full overflow-hidden rounded-xl md:aspect-h-2 md:aspect-w-3',
          index % 2 === 0 ? 'order-1' : 'order-2'
        )}
      >
        <Image
          src={attributes.thumbnail.data.attributes.url}
          alt={attributes.title}
          fill
          className='w-full rounded-xl bg-slate-100 object-cover object-top transition duration-300 group-hover:scale-105'
          sizes='(min-width: 1280px) 27rem, (min-width: 1024px) calc(50vw - 8.25rem), (min-width: 640px) 28rem, calc(100vw - 6rem)'
        />
        <div className='absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/5'></div>
      </Link>
      <div
        className={clsx(
          'flex flex-col items-center',
          index % 2 === 0 ? 'order-2' : 'order-1'
        )}
      >
        <h3 className='text-center font-display text-[28px] font-medium text-slate-900'>
          {attributes.title}
        </h3>
        <p className='mt-5 text-center text-base leading-8 text-slate-700'>
          {attributes.description}
        </p>
        <Link
          href={`/work/${attributes.slug}`}
          className='group mt-12 inline-flex items-center justify-center gap-2 rounded-full bg-white px-9 py-3 text-md font-medium text-sky-900 shadow-sm shadow-sky-100/50 ring-1 ring-slate-100/90 transition duration-300 hover:bg-white/60 hover:text-sky-700 hover:shadow-md hover:shadow-sky-100'
        >
          View Case study
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='h-5 w-5 text-sky-800 duration-300 ease-in-out group-hover:text-sky-700'
          >
            <path
              fillRule='evenodd'
              d='M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z'
              clipRule='evenodd'
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export function CaseStudies({
  caseStudies,
  pagination = { page: 1, pageCount: 1 },
}) {
  const { page, pageCount } = pagination

  return (
    <>
      <div
        className={clsx(
          'mx-auto mt-12 grid max-w-xl gap-12 sm:mt-16 lg:mx-0 lg:mt-24 lg:max-w-none lg:grid-cols-2 lg:gap-10 xl:gap-24',
          caseStudies.length % 2 === 0 && 'lg:pb-32'
        )}
      >
        {caseStudies.map((caseStudy, index) => (
          <CaseStudy key={caseStudy.id} caseStudy={caseStudy} index={index} />
        ))}
      </div>
      {pageCount > 1 && <Pagination page={page} pageCount={pageCount} />}
    </>
  )
}
