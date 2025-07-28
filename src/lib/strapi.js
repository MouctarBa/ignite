import qs from 'qs';

const STRAPI_API_URL =
  process.env.STRAPI_API_URL ||
  'http://localhost:1337';
const STRAPI_API_TOKEN =
  process.env.STRAPI_API_TOKEN;

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
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    },
    ...options,
  };

  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${STRAPI_API_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    console.error("Error response from Strapi:", await response.text());
    throw new Error(`An error occurred please try again. Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}