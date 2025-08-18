import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/Container'
import {
  WebDevelopmentIcon,
  ConsultingIcon,
  BrandingIcon,
  ProductDevelopmentIcon,
} from '../CategoryIcons'
import workBG from '@/images/featured-work-item-bg.svg'

const iconOptions = {
  'Web Development': WebDevelopmentIcon,
  Consulting: ConsultingIcon,
  Branding: BrandingIcon,
  'Product Development': ProductDevelopmentIcon,
}

function CategoryIcon({ category, ...props }) {
  const Icon = category ? iconOptions[category] : null;
  if (!Icon) return null;
  return <Icon {...props} />
}

function CaseStudy({ caseStudy }) {
  const { attributes } = caseStudy;
  const firstTag = attributes.tags?.data?.[0]?.attributes?.name || 'General';

  return (
    <div
      key={attributes.slug}
      className="relative grid items-center gap-8 overflow-hidden rounded-2xl bg-slate-50 px-4 pb-14 pt-5 shadow-sm shadow-sky-100/50 ring-1 ring-slate-100 sm:gap-12 sm:px-8 sm:pt-8 lg:grid-cols-12 lg:px-0 lg:py-0 xl:gap-16 xl:pt-16"
    >
      <Image src={workBG} alt="" className="absolute inset-x-0 bottom-0 h-auto w-full lg:top-6 lg:h-full" />
      <div className="relative order-2 px-1 sm:px-4 lg:order-1 lg:col-span-6 lg:pb-16 lg:pl-12 lg:pt-16 xl:col-span-5 xl:pb-24 xl:pl-16 xl:pt-8">
        <div className="inline-flex items-center gap-2.5  text-sm font-medium leading-[16px] text-sky-900/80 sm:text-md">
          <CategoryIcon category={firstTag} className="h-4 w-4 text-sky-900/75" />
          {firstTag}
        </div>
        <h3 className="mt-5 font-display text-2xl font-medium text-slate-900 sm:mt-6 sm:text-3xl">
          {attributes.title}
        </h3>
        <p className="mt-3 text-md leading-8 text-slate-700 sm:mt-4 sm:text-base sm:leading-8">
          {attributes.description}
        </p>
        <Link href={`/work/${attributes.slug}`} className="group mt-14 flex items-center gap-2 text-sm font-medium text-sky-600 duration-200 ease-in-out hover:text-sky-700 sm:mt-16 sm:text-md">
          View Case Study
        </Link>
      </div>
      <Link href={`/work/${attributes.slug}`} className="group aspect-h-9 aspect-w-16 relative order-1 h-full w-full overflow-hidden rounded-2xl ring-1 ring-slate-100/75 lg:order-2 lg:col-span-6 lg:rounded-l-none lg:rounded-r-none xl:col-span-7 xl:rounded-tl-2xl">
        <Image
          src={attributes.thumbnail.data.attributes.url}
          alt={attributes.title}
          className="absolute inset-0 object-cover object-top transition duration-300 group-hover:scale-105"
          fill
          sizes="(min-width: 1280px) 43rem, (min-width: 1024px) calc(50vw - 3.5rem), (min-width: 640px) 32rem, calc(100vw - 4.5rem)"
        />
      </Link>
    </div>
  )
}

export function FeaturedWork({ caseStudies }) {
  if (!caseStudies || caseStudies.length === 0) {
    return null;
  }
  
  // Filter for valid data before rendering
  const validCaseStudies = caseStudies.filter(study => study && study.attributes && study.attributes.thumbnail?.data?.attributes?.url);

  if (validCaseStudies.length === 0) {
    return null;
  }

  return (
    <section className="overflow-x-clip bg-white pb-16 pt-8 sm:pb-24 sm:pt-12 md:pt-16">
      <Container>
        <div className="text-center">
          <h2 className="font-display text-4xl font-semibold text-slate-900 sm:text-5xl">
            Explore my recent education projects
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg leading-8 text-slate-700 sm:mt-5">
            These case studies highlight how I support schools and teachers to
            achieve excellence.
          </p>
        </div>
        <div className="relative mx-auto mt-16 max-w-xl space-y-16 lg:mx-0 lg:max-w-none">
          {validCaseStudies.map((caseStudy) => (
            <CaseStudy key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      </Container>
    </section>
  )
}