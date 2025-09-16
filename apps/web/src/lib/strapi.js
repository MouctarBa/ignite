// Proxy to selected CMS provider. Default is Strapi; set CMS_PROVIDER=sanity to switch.
import * as strapi from './providers/strapi'
import * as sanity from './providers/sanity'

const providerName = (process.env.NEXT_PUBLIC_CMS_PROVIDER || process.env.CMS_PROVIDER || 'strapi').toLowerCase()
const provider = providerName === 'sanity' ? sanity : strapi

export const fetchAPI = provider.fetchAPI
export const getSiteSettings = provider.getSiteSettings
export const getFooterSettings = provider.getFooterSettings
export const getGlobal = provider.getGlobal
export const getAboutPage = provider.getAboutPage
export const getContactPage = provider.getContactPage
export const getBlogPage = provider.getBlogPage
export const getPage = provider.getPage
export const getStrapiMedia = provider.getStrapiMedia

