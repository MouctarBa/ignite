import qs from 'qs';

// Strapi provider (existing implementation)
const STRAPI_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
  process.env.STRAPI_API_URL ||
  'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const REVALIDATE_INTERVAL = parseInt(
  process.env.REVALIDATE_INTERVAL ?? '60',
  10
);

export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  } else if (process.env.NODE_ENV !== 'development') {
    throw new Error(
      'STRAPI_API_TOKEN must be defined when NODE_ENV is not development.'
    );
  } else {
    console.warn(
      'The Strapi API token is missing. Define STRAPI_API_TOKEN to access private content.'
    );
  }

  const mergedOptions = {
    headers,
    next: { revalidate: REVALIDATE_INTERVAL },
    ...options,
  };

  const queryString = qs.stringify(urlParamsObject, {
    encodeValuesOnly: true,
  });
  const requestUrl = `${STRAPI_API_URL}/api${path}${
    queryString ? `?${queryString}` : ''
  }`;

  let response;
  try {
    response = await fetch(requestUrl, mergedOptions);
  } catch (err) {
    console.error('Failed to fetch from Strapi:', err);
    if (process.env.NODE_ENV === 'development') {
      // In dev, fail soft so pages can render with fallbacks
      return { data: null };
    }
    throw new Error('Unable to reach Strapi. Please try again later.');
  }

  if (response.status === 404) {
    console.warn('Strapi returned 404 for', path);
    return { data: null };
  }

  if (!response.ok) {
    console.error('Strapi request URL:', requestUrl);
    console.error('Error response from Strapi:', await response.text());
    if (process.env.NODE_ENV === 'development') {
      return { data: null };
    }
    throw new Error(
      `An error occurred please try again. Status: ${response.status}`
    );
  }

  const data = await response.json();
  return data;
}

export async function getSiteSettings() {
  const settingsRes = await fetchAPI('/site-setting', {
    populate: '*',
  });
  const record = settingsRes.data;
  const attrs = record?.attributes ?? record;
  return attrs || {};
}

export async function getFooterSettings() {
  const res = await fetchAPI('/footer-setting', { populate: '*' });
  const record = res?.data;
  const attrs = record?.attributes ?? record;
  return attrs || {};
}

export async function getGlobal() {
  let globalRes = await fetchAPI('/homepage', { populate: '*' });

  if (!globalRes.data) {
    globalRes = await fetchAPI('/global', { populate: '*' });
  }
  if (!globalRes.data) {
    globalRes = await fetchAPI('/globals', { populate: '*' });
  }

  const record = globalRes.data;
  const attrs = record?.attributes ?? record;
  return attrs || {};
}

export async function getAboutPage() {
  const res = await fetchAPI('/about-page', { populate: '*' });
  const record = res?.data;
  const attrs = record?.attributes ?? record;
  return attrs || {};
}

export async function getContactPage() {
  const res = await fetchAPI('/contact-page', { populate: '*' });
  const record = res?.data;
  const attrs = record?.attributes ?? record;
  return attrs || {};
}

export async function getBlogPage() {
  const res = await fetchAPI('/blog-page', { populate: '*' });
  const record = res?.data;
  const attrs = record?.attributes ?? record;
  return attrs || {};
}

export async function getPage(slug) {
  const pageRes = await fetchAPI('/pages', {
    filters: { slug: { $eq: slug } },
    populate: '*',
  });

  const record = pageRes.data?.[0];
  if (!record) {
    return {};
  }

  const attrs = record.attributes ?? record;
  return attrs || {};
}

export function getStrapiMedia(media) {
  const url = media?.data?.attributes?.url ?? media?.url
  if (!url) return null
  try {
    const absoluteUrl = new URL(url, STRAPI_API_URL)
    return absoluteUrl.toString()
  } catch {}
  return null
}

