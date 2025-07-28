import { CaseStudyHero } from '@/components/work/CaseStudyHero'
import { CaseStudyDetails } from '@/components/work/CaseStudyDetails'
import { CaseStudyGallery } from '@/components/work/CaseStudyGallery'
import { CaseStudyTestimonial } from '@/components/work/CaseStudyTestimonial'
import { CaseStudyNavigation } from '@/components/work/CaseStudyNavigation'
import { Footer } from '@/components/Footer'
import ReactMarkdown from 'react-markdown'
import { fetchAPI, getGlobal } from '@/lib/strapi'

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
      tags: { fields: ['name'] }, // Populate the new tags relation
      client: true, // Populate the client component
      testimonial: { populate: { author: { populate: 'image' } } }, // Populate nested components
    }
  });

  const caseStudy = caseStudiesRes.data[0].attributes;

  const galleryImages = caseStudy.images.data.map(img => img.attributes.url);
  const tagNames = caseStudy.tags.data.map(tag => tag.attributes.name);
  const global = await getGlobal();

  return (
    <>
      <CaseStudyHero
        title={caseStudy.title}
        subtitle={caseStudy.subtitle}
        tags={tagNames} // Pass the array of tag names
        coverImage={caseStudy.coverImage.data.attributes.url}
      />
      <CaseStudyDetails
        client={caseStudy.client} // Pass the client component data directly
        description={caseStudy.description}
        projectDuration={caseStudy.projectDuration}
        projectURL={caseStudy.projectURL}
      >
        <ReactMarkdown>{caseStudy.body}</ReactMarkdown>
      </CaseStudyDetails>
      <CaseStudyGallery images={galleryImages} />
      <CaseStudyTestimonial
        clientName={caseStudy.client.name}
        testimonial={caseStudy.testimonial} // Pass the testimonial component data
      />
      <CaseStudyNavigation caseStudySlug={caseStudy.slug} />
      <Footer newsletter={false} {...global.footer} />
    </>
  )
}

export const dynamicParams = false