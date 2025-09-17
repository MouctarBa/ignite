/*
  Seed Sanity dataset with minimal content matching the frontend.

  Required env vars (set in apps/studio/.env or process env):
    - SANITY_STUDIO_PROJECT_ID or SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID
    - SANITY_STUDIO_DATASET or SANITY_DATASET (default: production)
    - SANITY_SEED_TOKEN (Editor/Write token). Fallbacks: SANITY_WRITE_TOKEN, SANITY_TOKEN, SANITY_READ_TOKEN

  Run:
    npm run dev:studio   # optional, to open Studio
    node apps/studio/scripts/seed.js
*/

const path = require('path')
const fs = require('fs')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })
require('dotenv').config() // also load root env as a fallback

const { createClient } = require('@sanity/client')

function getEnv(name, ...alts) {
  for (const key of [name, ...alts]) {
    if (process.env[key]) return process.env[key]
  }
  return undefined
}

const projectId = (getEnv('SANITY_STUDIO_PROJECT_ID', 'SANITY_PROJECT_ID', 'NEXT_PUBLIC_SANITY_PROJECT_ID') || '').trim()
const dataset = (getEnv('SANITY_STUDIO_DATASET', 'SANITY_DATASET') || 'production').trim()
const token = (getEnv('SANITY_SEED_TOKEN', 'SANITY_WRITE_TOKEN', 'SANITY_TOKEN', 'SANITY_READ_TOKEN') || '').trim()

if (!projectId) {
  console.error('Missing projectId: set SANITY_STUDIO_PROJECT_ID (or SANITY_PROJECT_ID)')
  process.exit(1)
}
if (!token) {
  console.error('Missing API token: set SANITY_SEED_TOKEN (Editor/Write)')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2025-01-01', token, useCdn: false })

async function uploadImageIfExists(relPath) {
  const abs = path.join(process.cwd(), relPath)
  if (!fs.existsSync(abs)) {
    console.warn('Image not found, skipping upload:', relPath)
    return null
  }
  const stream = fs.createReadStream(abs)
  const filename = path.basename(abs)
  const asset = await client.assets.upload('image', stream, { filename })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function ensureDoc(id, doc) {
  // Create or replace doc with stable _id to avoid duplicates on re-runs
  return client.createOrReplace({ _id: id, ...doc })
}

async function run() {
  console.log(`Seeding Sanity project ${projectId}, dataset ${dataset} ...`)

  // Create tags
  const tags = [
    { id: 'tag.education', name: 'Education' },
    { id: 'tag.leadership', name: 'Leadership' },
    { id: 'tag.strategy', name: 'Strategy' },
  ]
  for (const t of tags) {
    await ensureDoc(t.id, { _type: 'tag', name: t.name, slug: { _type: 'slug', current: t.name.toLowerCase() } })
  }

  // Upload a couple of images from the web app assets (fallbacks if unavailable)
  const image1 = await uploadImageIfExists('apps/web/src/images/experience-image.jpg')
  const image2 = await uploadImageIfExists('apps/web/src/images/contact.jpg')

  // Case studies
  await ensureDoc('caseStudy.evergreen-primary', {
    _type: 'caseStudy',
    title: 'Launching Evergreen Primary',
    slug: { _type: 'slug', current: 'evergreen-primary' },
    description: 'How we built a thriving student-centred school from scratch.',
    coverImage: image1 || null,
    tags: [
      { _type: 'reference', _ref: 'tag.education' },
      { _type: 'reference', _ref: 'tag.strategy' },
    ],
    publishedAt: new Date().toISOString(),
  })

  await ensureDoc('caseStudy.teacher-training-success', {
    _type: 'caseStudy',
    title: 'Training Teachers for Success',
    slug: { _type: 'slug', current: 'teacher-training-success' },
    description: 'A look at our intensive professional development workshops.',
    coverImage: image2 || image1 || null,
    tags: [
      { _type: 'reference', _ref: 'tag.education' },
      { _type: 'reference', _ref: 'tag.leadership' },
    ],
    publishedAt: new Date().toISOString(),
  })

  // Posts
  const postCover = image2 || image1 || null
  await ensureDoc('post.first-steps', {
    _type: 'post',
    title: 'First Steps with Ignite',
    slug: { _type: 'slug', current: 'first-steps' },
    description: 'How to get the most out of your Ignite site.',
    date: new Date().toISOString().slice(0, 10),
    category: 'Guides',
    timeToRead: 5,
    coverImage: postCover,
    publishedAt: new Date().toISOString(),
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Welcome to Ignite!' }] },
    ],
  })

  await ensureDoc('post.strategy-insights', {
    _type: 'post',
    title: 'Strategy Insights for 2025',
    slug: { _type: 'slug', current: 'strategy-insights-2025' },
    description: 'Key trends shaping education strategy this year.',
    date: new Date().toISOString().slice(0, 10),
    category: 'Strategy',
    timeToRead: 7,
    coverImage: postCover,
    publishedAt: new Date().toISOString(),
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Strategy matters more than ever.' }] },
    ],
  })

  // Singleton-like docs
  await ensureDoc('siteSettings.default', {
    _type: 'siteSettings',
    siteName: 'Ignite',
    tagline: 'Educational Insights & Case Studies',
    enableBlog: true,
    enableWork: true,
    showHome: true,
    showAbout: true,
    showWork: true,
    showBlog: true,
    showContact: true,
    bookCallUrl: 'https://cal.com/your-link',
    bookCallLabel: 'Book a call',
    navLinks: [
      { _type: 'object', label: 'Home', href: '/' },
      { _type: 'object', label: 'About', href: '/about' },
      { _type: 'object', label: 'Contact', href: '/contact' },
    ],
    socialLinks: [
      { _type: 'object', platform: 'Facebook', icon: 'Facebook', url: 'https://facebook.com' },
      { _type: 'object', platform: 'Instagram', icon: 'Instagram', url: 'https://instagram.com' },
      { _type: 'object', platform: 'LinkedIn', icon: 'LinkedIn', url: 'https://linkedin.com' },
    ],
  })

  await ensureDoc('footerSettings.default', {
    _type: 'footerSettings',
    newsletter: true,
    newsletterHeading: 'Subscribe to my educator insights',
    newsletterSubtext: 'Join a community of forward-thinking school leaders and receive exclusive tips on teacher training, starting and growing schools, and building student-centred institutions delivered straight to your inbox.',
    newsletterButtonLabel: 'Subscribe',
    newsletterEmailPlaceholder: 'Enter your email',
    ctaHeading: "Let's transform education together",
    ctaText: "I'm currently partnering with educators, entrepreneurs and NGOs across Africa to build exemplary schools and empower teachers. Let's connect and discuss how I can support your vision.",
    copyright: `© ${new Date().getFullYear()} Ignite`,
    links: [
      { _type: 'object', label: 'About', href: 'https://example.com/about' },
      { _type: 'object', label: 'Contact', href: 'https://example.com/contact' },
    ],
    socialLinks: [
      { _type: 'object', platform: 'Facebook', icon: 'Facebook', url: 'https://facebook.com' },
      { _type: 'object', platform: 'Instagram', icon: 'Instagram', url: 'https://instagram.com' },
      { _type: 'object', platform: 'LinkedIn', icon: 'LinkedIn', url: 'https://linkedin.com' },
    ],
  })

  await ensureDoc('homepage.default', {
    _type: 'homepage',
    title: 'Ignite',
    heroTitle: 'Empowering educators across Africa',
    heroSubtitle: 'Educational Insights that Spark Change',
    heroText: 'Known as "The Teacher\'s Teacher," Doris Chinedu-Okoro helps schools across Africa deliver high-quality, student-centred education through training and consulting.',
    heroImage: image1 || image2 || null,
    showFeaturedPosts: true,
    showFeaturedWork: true,
    showTestimonials: true,
    experience: {
      titlePrefix: "I'm your",
      titleHighlight: 'partner in',
      titleSuffix: 'transformational education',
      introText:
        'Experience the advantage of an all-inclusive educational consulting solution, where excellence, efficiency and responsiveness converge to build thriving schools and empower teachers.',
      items: [
        { icon: 'Excellence', title: 'Excellence', description: 'I take pride in doing things well. From curriculum design to teacher training, every project is delivered with the highest standards.' },
        { icon: 'Efficiency', title: 'Efficiency', description: 'I bring structured processes and practical frameworks that save time and create measurable results in schools and classrooms.' },
        { icon: 'Responsiveness', title: 'Responsiveness', description: 'I work closely with teams, adapt quickly, and respond to emerging needs to keep your goals on track.' },
      ],
      differentiator: 'What differentiates me from others',
    },
    featuredWork: {
      heading: 'Explore my recent education projects',
      subtext: 'These case studies highlight how I support schools and teachers to achieve excellence.',
    },
    testimonialsHeading: "Here's what past clients are saying about me",
    companiesHeading: 'These are some companies I have worked with',
    featuredPostsHeading: 'Insights on education and school leadership',
  })

  await ensureDoc('aboutPage.default', {
    _type: 'aboutPage',
    title: 'About',
    hero: {
      heading: 'About Me',
      description1: 'Doris Chinedu-Okoro is known as "The Teacher\'s Teacher" for a reason. As the CEO of Evergreen Group of Schools and a sought-after school startup consultant, she has helped countless educators turn their vision into thriving, student-centred institutions. Her mission is to elevate teaching standards and build the next generation of leaders.',
      description2: 'Doris is also the convenor of the South East Educators Conference (SEEC), the first conference of its kind dedicated to professional development for teachers in the region. When she\'s not mentoring educators, she\'s writing and speaking about education reform, running the Evergreen Foundation, or participating in executive programmes at Lagos Business School. Join her journey to transform education for all.',
      name: 'Doris Chinedu-Okoro',
      image: image1 || image2 || null,
      background: image2 || image1 || null,
    },
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'About Ignite' }] },
    ],
  })

  await ensureDoc('contactPage.default', {
    _type: 'contactPage',
    title: 'Contact',
    heading: 'How can I help you? Let\u2019s get in touch',
    subheading: 'Your next breakthrough starts right here - let\u2019s build it together.',
    heroImage: image2 || image1 || null,
    email: 'hello@example.com',
    phone: '+1 (555) 010-0100',
    reachMeHeading: 'You can reach me at the following',
    emailTitle: 'Email me',
    emailSubtitle: 'I will usually email you back within an hour',
    callTitle: 'Call me',
    callSubtitle: "I'm available weekdays from 9AM to 5PM",
    formHeading: 'Fill out the form below to get started',
    submitLabel: 'Get started',
    namePlaceholder: 'Your full name',
    emailPlaceholder: 'you@example.com',
    phonePlaceholder: '+1 (555) 010-0100',
    messagePlaceholder: 'Tell me a little bit about your request... ',
    servicesHeading: 'Expected services',
    servicesOptions: ['Coaching', 'Mentorship', 'Speaking', 'Other'],
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "We'd love to hear from you." }] },
    ],
  })

  await ensureDoc('blogPage.default', {
    _type: 'blogPage',
    enabled: true,
    title: 'Educational Insights',
    description: 'Latest posts and updates',
    heading: 'Welcome to my blog',
    subtext: 'Scroll down and subscribe in the footer to get exclusive insights on school leadership, teacher training, and community impact.',
    ctaLabel: 'Go to Subscribe',
    ctaHref: '#newsletter',
    latestArticlesHeading: 'Latest Articles',
  })

  await ensureDoc('workPage.default', {
    _type: 'workPage',
    enabled: true,
    title: 'Case Studies',
    description: 'Explore education projects and case studies.',
  })

  await ensureDoc('page.privacy-policy', {
    _type: 'page',
    title: 'Privacy Policy',
    slug: { _type: 'slug', current: 'privacy-policy' },
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Your privacy matters.' }] },
    ],
  })

  await ensureDoc('testimonial.jane-doe', {
    _type: 'testimonial',
    author: 'Jane Doe',
    role: 'Principal, Evergreen Primary',
    quote: 'Ignite transformed our approach to learning and leadership.',
    avatar: image2 || image1 || null,
  })

  console.log('Seeding complete.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
