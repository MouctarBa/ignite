import { NextResponse } from 'next/server'

function getStrapiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_STRAPI_API_URL ||
    process.env.STRAPI_API_URL ||
    'http://localhost:1337'
  )
}

async function probe(url, timeoutMs = 3000) {
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      signal: controller.signal,
    })
    const ct = res.headers.get('content-type') || ''
    let body = null
    // Keep the response small in case it’s large
    if (ct.includes('application/json')) {
      try {
        body = await res.json()
      } catch {
        body = null
      }
    }
    return { ok: res.ok, status: res.status, contentType: ct, body }
  } catch (e) {
    return { ok: false, error: String(e?.message || e) }
  } finally {
    clearTimeout(t)
  }
}

export async function GET() {
  const base = getStrapiBaseUrl()
  const api = `${base.replace(/\/$/, '')}/api`
  const endpoints = ['/', '/homepage', '/about-page', '/contact-page', '/footer-setting']

  const checks = {}
  for (const ep of endpoints) {
    // Root '/' is just the API base; others are content endpoints
    const url = ep === '/' ? api : `${api}${ep}?populate=*`
    // eslint-disable-next-line no-await-in-loop
    checks[ep] = await probe(url)
  }

  const env = {
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL || null,
    STRAPI_API_URL: process.env.STRAPI_API_URL || null,
    REVALIDATE_INTERVAL: process.env.REVALIDATE_INTERVAL || null,
    NODE_ENV: process.env.NODE_ENV || null,
  }

  return NextResponse.json({
    time: new Date().toISOString(),
    baseUrl: base,
    apiBase: api,
    env,
    checks,
  })
}

