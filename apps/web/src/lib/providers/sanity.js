import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import groq from 'groq'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2025-01-01'
const token = process.env.SANITY_READ_TOKEN || undefined
const useCdn = (process.env.SANITY_USE_CDN ?? (
  !token && process.env.NODE_ENV === 'production' ? 'true' : 'false'
)) === 'true'

export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn, token })
  : null

const builder = projectId ? imageUrlBuilder({ projectId, dataset }) : null
export function urlForImage(source) {
  try {
    return builder?.image(source).auto('format').url() || null
  } catch {
    return null
  }
}

function wrapRecord(record) {
  // Return a Strapi-like shape: { attributes: { ... } }
  if (!record) return null
  return { id: record._id || record._rev || undefined, attributes: record }
}

function wrapList(list) {
  return { data: (list || []).map(wrapRecord) }
}

export async function fetchAPI(path, params = {}, _options = {}) {
  if (!sanityClient) {
    console.warn('Sanity client is not configured. Set SANITY_PROJECT_ID/SANITY_DATASET.')
    return { data: null }
  }

  // Normalize common params
  const limit = params?.pagination?.limit || params?.limit || undefined
  const sort = params?.sort || '' // e.g., 'publishedAt:desc'
  const slugEq = params?.filters?.slug?.$eq || params?.filters?.slug?.$eqi || undefined

  try {
    switch (path) {
      case '/homepage': {
        const doc = await sanityClient.fetch(groq`*[_type == "homepage"][0]`)
        return { data: doc ? wrapRecord(doc) : null }
      }
      case '/site-setting':
      case '/siteSettings': {
        const doc = await sanityClient.fetch(groq`*[_type == "siteSettings"][0]`)
        return { data: doc ? wrapRecord(doc) : null }
      }
      case '/footer-setting':
      case '/footerSettings': {
        const doc = await sanityClient.fetch(groq`*[_type == "footerSettings"][0]`)
        return { data: doc ? wrapRecord(doc) : null }
      }
      case '/about-page': {
        const doc = await sanityClient.fetch(groq`*[_type == "aboutPage"][0]`)
        return { data: doc ? wrapRecord(doc) : null }
      }
      case '/contact-page': {
        const doc = await sanityClient.fetch(groq`*[_type == "contactPage"][0]`)
        return { data: doc ? wrapRecord(doc) : null }
      }
      case '/work-experience': {
        const doc = await sanityClient.fetch(groq`*[_type == "workExperience"][0]`)
        return { data: doc ? wrapRecord(doc) : null }
      }
      case '/awards': {
        const doc = await sanityClient.fetch(groq`*[_type == "awardsSection"][0]`)
        return { data: doc ? wrapRecord(doc) : null }
      }
      case '/press': {
        const doc = await sanityClient.fetch(groq`*[_type == "pressSection"][0]`)
        return { data: doc ? wrapRecord(doc) : null }
      }
      case '/blog-page': {
        const doc = await sanityClient.fetch(groq`*[_type == "blogPage"][0]`)
        return { data: doc ? wrapRecord(doc) : null }
      }
      case '/work-page': {
        const doc = await sanityClient.fetch(groq`*[_type == "workPage"][0]`)
        return { data: doc ? wrapRecord(doc) : null }
      }
      case '/pages': {
        if (!slugEq) return wrapList([])
        const doc = await sanityClient.fetch(groq`*[_type == "page" && slug.current == $slug][0]`, { slug: slugEq })
        return { data: doc ? [wrapRecord(doc)] : [] }
      }
      case '/posts': {
        // Basic list of posts
        const order = sort.includes('publishedAt:desc') ? 'desc' : sort.includes('publishedAt:asc') ? 'asc' : 'desc'
        if (slugEq) {
          const doc = await sanityClient.fetch(
            groq`*[_type == "post" && slug.current == $slug][0]{
              _id, title, description, date, category, timeToRead, slug, 
              "image": coverImage,
              publishedAt
            }`,
            { slug: slugEq }
          )
          return { data: doc ? [wrapRecord(mapPost(doc))] : [] }
        }
        const list = await sanityClient.fetch(
          groq`*[_type == "post"] | order(publishedAt ${order})[0...$limit]{
            _id, title, description, date, category, timeToRead, slug, 
            "image": coverImage,
            publishedAt
          }`,
          { limit: limit ?? 100 }
        )
        return wrapList(list.map(mapPost))
      }
      case '/case-studies': {
        const order = sort.includes('publishedAt:desc') ? 'desc' : sort.includes('publishedAt:asc') ? 'asc' : 'desc'
        if (slugEq) {
          const doc = await sanityClient.fetch(
            groq`*[_type == "caseStudy" && slug.current == $slug][0]{
              _id, title, description, slug, publishedAt,
              tags[]->{name},
              "thumbnail": coverImage
            }`,
            { slug: slugEq }
          )
          return { data: doc ? [wrapRecord(mapCaseStudy(doc))] : [] }
        }
        const list = await sanityClient.fetch(
          groq`*[_type == "caseStudy"] | order(publishedAt ${order})[0...$limit]{
            _id, title, description, slug, publishedAt,
            tags[]->{name},
            "thumbnail": coverImage
          }`,
          { limit: limit ?? 100 }
        )
        return wrapList(list.map(mapCaseStudy))
      }
      case '/testimonials': {
        const list = await sanityClient.fetch(
          groq`*[_type == "testimonial"][0...$limit]{
            _id,
            author,
            role,
            quote,
            avatar
          }`,
          { limit: limit ?? 50 }
        )
        return wrapList(list.map(mapTestimonial))
      }
      default:
        console.warn('Sanity provider: unhandled path', path)
        return { data: null }
    }
  } catch (e) {
    console.warn('Sanity query failed:', e?.message || e)
    return { data: null }
  }
}

function mapPost(p) {
  // Map a Sanity post to a Strapi-like attributes object
  return {
    ...p,
    slug: p?.slug?.current || p?.slug,
    image: p?.image
      ? { data: { attributes: { url: urlForImage(p.image) } } }
      : null,
  }
}

function mapCaseStudy(cs) {
  return {
    ...cs,
    slug: cs?.slug?.current || cs?.slug,
    tags: {
      data: (cs?.tags || []).map((t, idx) => ({ id: t?._id || idx, attributes: { name: t?.name } })),
    },
    // The site expects Strapi-like 'thumbnail' shape for case studies
    thumbnail: cs?.thumbnail
      ? { data: { attributes: { url: urlForImage(cs.thumbnail) } } }
      : null,
  }
}

function mapTestimonial(t) {
  return {
    headline: t?.headline || undefined,
    content: t?.content || t?.quote || undefined,
    author_name: t?.author || undefined,
    author_role: t?.role || undefined,
    author_image: t?.avatar
      ? { data: { attributes: { url: urlForImage(t.avatar) } } }
      : null,
  }
}

export async function getSiteSettings() {
  const res = await fetchAPI('/site-setting')
  const record = res?.data
  const attrs = record?.attributes ?? record
  return attrs || {}
}

export async function getFooterSettings() {
  const res = await fetchAPI('/footer-setting')
  const record = res?.data
  const attrs = record?.attributes ?? record
  return attrs || {}
}

export async function getGlobal() {
  const res = await fetchAPI('/homepage')
  const record = res?.data
  const attrs = record?.attributes ?? record
  return attrs || {}
}

export async function getAboutPage() {
  const res = await fetchAPI('/about-page')
  const record = res?.data
  const attrs = record?.attributes ?? record
  return attrs || {}
}

export async function getWorkExperience() {
  const res = await fetchAPI('/work-experience')
  const record = res?.data
  const attrs = record?.attributes ?? record
  return attrs || {}
}

export async function getAwardsSection() {
  const res = await fetchAPI('/awards')
  const record = res?.data
  const attrs = record?.attributes ?? record
  // Map awards logos to URL
  if (attrs?.awards?.length) {
    attrs.awards = attrs.awards.map((a) => ({
      ...a,
      logo: urlForImage(a.logo) || a.logo,
    }))
  }
  return attrs || {}
}

export async function getPressSection() {
  const res = await fetchAPI('/press')
  const record = res?.data
  const attrs = record?.attributes ?? record
  return attrs || {}
}

export async function getContactPage() {
  const res = await fetchAPI('/contact-page')
  const record = res?.data
  const attrs = record?.attributes ?? record
  return attrs || {}
}

export async function getBlogPage() {
  const res = await fetchAPI('/blog-page')
  const record = res?.data
  const attrs = record?.attributes ?? record
  return attrs || {}
}

export async function getWorkPage() {
  const res = await fetchAPI('/work-page')
  const record = res?.data
  const attrs = record?.attributes ?? record
  return attrs || {}
}

export async function getPage(slug) {
  const res = await fetchAPI('/pages', { filters: { slug: { $eq: slug } } })
  const rec = res?.data?.[0]
  const attrs = rec?.attributes ?? rec
  return attrs || {}
}

export function getStrapiMedia(media) {
  const url = media?.data?.attributes?.url ?? media?.url
  if (url) return url
  try {
    return urlForImage(media)
  } catch {
    return null
  }
}
