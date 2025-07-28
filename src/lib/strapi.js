import qs from 'qs';

const STRAPI_API_URL =
  process.env.STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const REVALIDATE_INTERVAL = parseInt(
  process.env.REVALIDATE_INTERVAL ?? '60',
  10
);

export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
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
    throw new Error('Unable to reach Strapi. Please try again later.');
  }

  if (response.status === 404) {
    console.warn('Strapi returned 404 for', path);
    return { data: null };
  }

  if (!response.ok) {
    console.error('Error response from Strapi:', await response.text());
    throw new Error(
      `An error occurred please try again. Status: ${response.status}`
    );
  }

  const data = await response.json();
  return data;
}

// Updated to return data whether it's under `attributes` (v4) or directly on the record (v5).
export async function getGlobal() {
  let globalRes = await fetchAPI('/homepage', { populate: '*' });

  if (!globalRes.data) {
    globalRes = await fetchAPI('/global', { populate: '*' });
  }
  if (!globalRes.data) {
    globalRes = await fetchAPI('/globals', { populate: '*' });
  }

  const record = globalRes.data;
  // Strapi v4 puts everything under `attributes`; Strapi v5 flattens it
  const attrs = record?.attributes ?? record;
  return attrs || {};
}

// Updated to handle v4 and v5 response shapes
export async function getPage(slug) {
  const pageRes = await fetchAPI('/pages', {
    filters: { slug: { $eq: slug } },
    populate: '*',
  });

  const record = pageRes.data?.[0];
  if (!record) {
    return {};
  }

  // Use `record.attributes` if present (Strapi v4), otherwise the record itself (Strapi v5)
  const attrs = record.attributes ?? record;
  return attrs || {};
}
