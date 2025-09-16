import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import groq from 'groq'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2025-01-01'
const token = process.env.SANITY_READ_TOKEN || undefined
const useCdn = !token && process.env.NODE_ENV === 'production'

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
      case '/blog-page': {
        const doc = await sanityClient.fetch(groq`*[_type == "blogPage"][0]`)
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
              "image": coverImage
            }`,
            { slug: slugEq }
          )
          return { data: doc ? [wrapRecord(mapCaseStudy(doc))] : [] }
        }
        const list = await sanityClient.fetch(
          groq`*[_type == "caseStudy"] | order(publishedAt ${order})[0...$limit]{
            _id, title, description, slug, publishedAt,
            tags[]->{name},
            "image": coverImage
          }`,
          { limit: limit ?? 100 }
        )
        return wrapList(list.map(mapCaseStudy))
      }
      case '/testimonials': {
        const list = await sanityClient.fetch(groq`*[_type == "testimonial"][0...$limit]`, { limit: limit ?? 50 })
        return wrapList(list)
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
    image: cs?.image
      ? { data: { attributes: { url: urlForImage(cs.image) } } }
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

export async function getPage(slug) {
  const res = await fetchAPI('/pages', { filters: { slug: { $eq: slug } } })
  const rec = res?.data?.[0]
  const attrs = rec?.attributes ?? rec
  return attrs || {}
}

export function getStrapiMedia(media) {
  const url = media?.data?.attributes?.url ?? media?.url
  return url || null
}

