import { fetchAPI } from './strapi'

export async function getAllTags() {
  // THE FIX: Use populate: '*' to fetch all relations, including tags.
  const caseStudiesRes = await fetchAPI('/case-studies', {
    populate: '*',
  });
  
  if (!caseStudiesRes || !caseStudiesRes.data) {
    return [];
  }

  const validCaseStudies = caseStudiesRes.data.filter(study => study.attributes && study.attributes.tags);

  let repeatingTags = validCaseStudies.flatMap(
    (caseStudy) => caseStudy.attributes.tags.data.map(tag => tag.attributes.name)
  );

  const tagCount = new Map()

  repeatingTags.forEach((tag) => {
    if (tagCount.has(tag)) {
      tagCount.set(tag, tagCount.get(tag) + 1)
    } else {
      tagCount.set(tag, 1)
    }
  })

  const uniqueTags = [...new Set(repeatingTags)]

  const tags = uniqueTags.sort((tag1, tag2) => {
    let freq1 = tagCount.get(tag1)
    let freq2 = tagCount.get(tag2)

    return freq2 - freq1
  })

  return tags
}

export async function getFeaturedTags() {
  const tags = await getAllTags()
  return tags.slice(0, 4)
}