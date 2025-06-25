import { CaseStudyHero } from '@/components/work/CaseStudyHero'
import { CaseStudyDetails } from '@/components/work/CaseStudyDetails'
import { CaseStudyGallery } from '@/components/work/CaseStudyGallery'
import { CaseStudyTestimonial } from '@/components/work/CaseStudyTestimonial'
import { CaseStudyNavigation } from '@/components/work/CaseStudyNavigation'
import { Footer } from '@/components/Footer'
import ReactMarkdown from 'react-markdown'
import { fetchAPI } from '@/lib/strapi'

export async function generateStaticParams() {
  const caseStudies = await fetchAPI('/case-studies');
  return caseStudies.data.map((caseStudy) => ({
    slug: caseStudy.attributes.slug,
  }));
}

export async function generateMetadata({ params }) {
  const caseStudies = await fetchAPI('/case-studies', { filters: { slug: { $eq: params.slug } } });
  const caseStudy = caseStudies.data[0].attributes;
  return { title: caseStudy.title, description: caseStudy.description }
}

export default async function CaseStudyPage({ params }) {
  const caseStudiesRes = await fetchAPI('/case-studies', {
    filters: { slug: { $eq: params.slug } },
    populate: {
      coverImage: { fields: ['url', 'alternativeText'] },
      images: { fields: ['url', 'alternativeText'] },
      thumbnail: { fields: ['url', 'alternativeText'] },
      testimonial: { populate: '*' },
      client: { populate: '*' }
    }
  });

  const caseStudy = caseStudiesRes.data[0].attributes;

  // Helper to extract image URLs from the Strapi response
  const galleryImages = caseStudy.images.data.map(img => img.attributes.url);

  return (
    <>
      <CaseStudyHero
        title={caseStudy.title}
        subtitle={caseStudy.subtitle}
        tags={caseStudy.tags}
        coverImage={caseStudy.coverImage.data.attributes.url}
      />
      <CaseStudyDetails
        client={caseStudy.client}
        description={caseStudy.description}
        projectDuration={caseStudy.projectDuration}
        projectURL={caseStudy.projectURL}
      >
        {/* Use ReactMarkdown to render the body content from Strapi */}
        <ReactMarkdown>{caseStudy.body}</ReactMarkdown>
      </CaseStudyDetails>
      <CaseStudyGallery images={galleryImages} />
      <CaseStudyTestimonial
        clientName={caseStudy.client.name}
        testimonial={caseStudy.testimonial}
      />
      <CaseStudyNavigation caseStudySlug={caseStudy.slug} />
      <Footer newsletter={false} />
    </>
  )
}

export const dynamicParams = false