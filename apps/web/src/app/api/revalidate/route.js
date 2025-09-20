import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

function pickSlug(doc) {
  return (
    doc?.slug?.current ||
    doc?.slug ||
    doc?.document?.slug?.current ||
    doc?.document?.slug ||
    null
  )
}

function pickType(doc) {
  return doc?._type || doc?.type || doc?.document?._type || null
}

export async function POST(request) {
  const url = new URL(request.url)
  const secret = url.searchParams.get('secret') || request.headers.get('x-revalidate-secret')

  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'REVALIDATE_SECRET not set' }, { status: 500 })
  }
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  let payload = {}
  try {
    payload = await request.json()
  } catch {}

  const docType = pickType(payload)
  const slug = pickSlug(payload)

  const touched = new Set()

  // Always refresh the home shell to catch global/header/footer state
  touched.add('/')

  switch (docType) {
    case 'homepage':
    case 'siteSettings':
    case 'footerSettings':
      touched.add('/')
      touched.add('/about')
      touched.add('/contact')
      touched.add('/blog')
      touched.add('/work')
      break
    case 'aboutPage':
    case 'workExperience':
    case 'awardsSection':
    case 'pressSection':
      touched.add('/about')
      break
    case 'contactPage':
      touched.add('/contact')
      break
    case 'blogPage':
      // Blog page settings affect header/nav visibility; refresh common shells
      touched.add('/')
      touched.add('/about')
      touched.add('/contact')
      touched.add('/blog')
      touched.add('/work')
      break
    case 'workPage':
      // Work page settings affect header/nav visibility; refresh common shells
      touched.add('/')
      touched.add('/about')
      touched.add('/contact')
      touched.add('/blog')
      touched.add('/work')
      break
    case 'post':
      touched.add('/blog')
      if (slug) touched.add(`/blog/${slug}`)
      break
    case 'caseStudy':
      touched.add('/work')
      if (slug) touched.add(`/work/${slug}`)
      break
    default:
      // Fallback: refresh the main index pages
      touched.add('/blog')
      touched.add('/work')
  }

  for (const p of touched) {
    try {
      revalidatePath(p)
    } catch {}
  }

  return NextResponse.json({ revalidated: Array.from(touched), type: docType, slug })
}

// Optional quick test via GET: /api/revalidate?secret=...
export async function GET(request) {
  const url = new URL(request.url)
  const secret = url.searchParams.get('secret')
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }
  revalidatePath('/')
  return NextResponse.json({ ok: true, revalidated: ['/'] })
}

