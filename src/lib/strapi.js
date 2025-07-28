import qs from 'qs';

const STRAPI_API_URL =
  process.env.STRAPI_API_URL ||
  'http://localhost:1337';
const STRAPI_API_TOKEN =
  process.env.STRAPI_API_TOKEN;
const REVALIDATE_INTERVAL =
  Number(process.env.REVALIDATE_INTERVAL || 60);

export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Check if the token is missing and provide a clear error
  if (!STRAPI_API_TOKEN) {
    throw new Error(
      'The Strapi API token is missing. Please define STRAPI_API_TOKEN in your environment.'
    );
  }

  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    next: { revalidate: REVALIDATE_INTERVAL },
    ...options,
  }

  const queryString = qs.stringify(urlParamsObject, { encodeValuesOnly: true })
  const requestUrl = `${STRAPI_API_URL}/api${path}${queryString ? `?${queryString}` : ''}`

  let response
  try {
    response = await fetch(requestUrl, mergedOptions)
  } catch (err) {
    console.error('Failed to fetch from Strapi:', err)
    throw new Error('Unable to reach Strapi. Please try again later.')
  }

  if (response.status === 404) {
    console.warn('Strapi returned 404 for', path)
    return { data: null }
  }

  if (!response.ok) {
    console.error('Error response from Strapi:', await response.text())
    throw new Error(`An error occurred please try again. Status: ${response.status}`)
  }


  const data = await response.json()
  return data

}

export async function getGlobal() {
  const globalRes = await fetchAPI('/global', { populate: '*' })
  return globalRes.data?.attributes || {}
}

export async function getPage(slug) {
  const pageRes = await fetchAPI('/pages', {
    filters: { slug: { $eq: slug } },
    populate: '*',
  })
  return pageRes.data?.[0]?.attributes || {}
}

