import { CaseStudies } from '@/components/work/CaseStudies'
import { fetchAPI, getWorkPage } from '@/lib/strapi'

const parseTag = (tagSlug) => {
  const tag = tagSlug
    .replace(/-/g, ' ')
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ')
  return tag
}

export async function generateStaticParams() {
  const caseStudies = await fetchAPI('/case-studies')
  const tags = new Set(
    caseStudies.data.flatMap((study) => study.attributes.tags)
  )
  return Array.from(tags).map((tag) => ({
    tagSlug: tag.replace(/ /g, '-').toLowerCase(),
  }))
}

export async function generateMetadata({ params }) {
  const tag = parseTag(params.tagSlug)
  return { title: tag }
}

export default async function WorkCategoryPage({ params }) {
  try {
    const work = await getWorkPage()
    if (work.enabled === false) {
      return (
        <div className='py-16 text-center'>
          <h2 className='text-2xl font-semibold'>Case studies coming soon</h2>
          <p className='mt-2 text-slate-600'>This section is temporarily unavailable.</p>
        </div>
      )
    }
  } catch {}
  const tagName = parseTag(params.tagSlug)

  const caseStudiesRes = await fetchAPI('/case-studies', {
    filters: { tags: { $containsi: tagName } },
    populate: '*',
  })

  const caseStudies = caseStudiesRes.data.map((study) => ({
    ...study.attributes,
    id: study.id,
    url: `/work/${study.attributes.slug}`,
    thumbnail: study.attributes.thumbnail.data.attributes.url,
  }))

  const pagination = caseStudiesRes.meta?.pagination || {
    page: 1,
    pageCount: 1,
  }

  return <CaseStudies caseStudies={caseStudies} pagination={pagination} />
}

export const dynamicParams = true
