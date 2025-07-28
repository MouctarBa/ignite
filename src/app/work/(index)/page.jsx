import { fetchAPI } from '@/lib/strapi'
import { CaseStudies } from '@/components/work/CaseStudies'

const sampleCaseStudies = [
  {
    id: 1,
    attributes: {
      title: 'Launching Evergreen Primary',
      description:
        'How we built a thriving student-centred school from scratch.',
      slug: 'evergreen-primary',
      thumbnail: {
        data: { attributes: { url: '/images/case_studies/case-study-03-thumbnail.jpg' } },
      },
    },
  },
  {
    id: 2,
    attributes: {
      title: 'Training Teachers for Success',
      description:
        'A look at our intensive professional development workshops.',
      slug: 'teacher-training-success',
      thumbnail: {
        data: { attributes: { url: '/images/case_studies/case-study-02-cover-image.png' } },
      },
    },
  },
]

export default async function WorkPage() {
  const caseStudiesRes = await fetchAPI('/case-studies', {
    sort: { date: 'desc' },
    populate: '*', // Populate all fields to be safe
  });

  if (!caseStudiesRes || !caseStudiesRes.data) {
    return <div className="text-center py-10"><p>Could not load case studies. Please check your API connection and permissions.</p></div>
  }

  // Filter out any entries that are missing essential data to prevent crashes
  const validCaseStudies = caseStudiesRes.data.filter((study) => {
    const { attributes } = study
    return (
      attributes &&
      attributes.slug &&
      attributes.thumbnail &&
      attributes.thumbnail.data
    )
  })

  const finalCaseStudies =
    validCaseStudies.length > 0 ? validCaseStudies : sampleCaseStudies

  return <CaseStudies caseStudies={finalCaseStudies} />
}