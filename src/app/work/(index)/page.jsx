import { fetchAPI } from '@/lib/strapi'
import { CaseStudies } from '@/components/work/CaseStudies'

export default async function WorkPage() {
  const caseStudiesRes = await fetchAPI('/case-studies', {
    sort: { date: 'desc' },
    populate: '*', // Populate all fields to be safe
  });

  if (!caseStudiesRes || !caseStudiesRes.data) {
    return <div className="text-center py-10"><p>Could not load case studies. Please check your API connection and permissions.</p></div>
  }

  // Filter out any entries that are missing essential data to prevent crashes
  const validCaseStudies = caseStudiesRes.data.filter(study => {
    const { attributes } = study;
    return attributes && attributes.slug && attributes.thumbnail && attributes.thumbnail.data;
  });

  return <CaseStudies caseStudies={validCaseStudies} />
}