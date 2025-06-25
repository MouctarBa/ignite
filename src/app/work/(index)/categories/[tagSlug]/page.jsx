import { CaseStudies } from '@/components/work/CaseStudies'
import { fetchAPI } from '@/lib/strapi'

const parseTag = (tagSlug) => {
  const tag = tagSlug
    .replace(/-/g, ' ')
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ')
  return tag
}

export async function generateStaticParams() {
    const caseStudies = await fetchAPI('/case-studies');
    const tags = new Set(caseStudies.data.flatMap(study => study.attributes.tags));
    return Array.from(tags).map((tag) => ({
        tagSlug: tag.replace(/ /g, '-').toLowerCase(),
    }));
}

export async function generateMetadata({ params }) {
  const tag = parseTag(params.tagSlug)
  return { title: tag }
}

export default async function WorkCategoryPage({ params }) {
    const tagName = parseTag(params.tagSlug);

    const caseStudiesRes = await fetchAPI('/case-studies', {
        filters: { tags: { $containsi: tagName } },
        populate: '*',
    });

    const caseStudies = caseStudiesRes.data.map(study => ({
        ...study.attributes,
        id: study.id,
        url: `/work/${study.attributes.slug}`,
        thumbnail: study.attributes.thumbnail.data.attributes.url,
    }));

  return <CaseStudies caseStudies={caseStudies} />
}

export const dynamicParams = false