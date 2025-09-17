import { CaseStudies } from '@/components/work/CaseStudies'
import { fetchAPI, getWorkPage } from '@/lib/strapi'
import { getAllTags } from '@/lib/caseStudies'

const parseTag = (tagSlug) => {
  const tag = tagSlug
    .replace(/-/g, ' ')
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ')
  return tag
}

export async function generateStaticParams() {
  // Use helper that understands the Sanity-mapped tag shape
  const tags = await getAllTags()
  return tags.map((tag) => ({
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

  // Fetch all and filter locally by tag, since the Sanity provider
  // does not implement Strapi-style tag filtering.
  const caseStudiesRes = await fetchAPI('/case-studies', { populate: '*' })
  const all = Array.isArray(caseStudiesRes?.data) ? caseStudiesRes.data : []

  const filtered = all.filter((study) => {
    const tags = study?.attributes?.tags?.data || []
    return tags.some(
      (t) => (t?.attributes?.name || '').toLowerCase() === tagName.toLowerCase()
    )
  })

  const pagination = caseStudiesRes?.meta?.pagination || { page: 1, pageCount: 1 }

  // Pass through the original Strapi-like shape (with attributes) expected by UI
  return <CaseStudies caseStudies={filtered} pagination={pagination} />
}

export const dynamicParams = true
