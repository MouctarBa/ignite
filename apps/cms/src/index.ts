import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const shouldBootstrap =
      process.env.NODE_ENV !== 'production' ||
      process.env.ENABLE_DEV_BOOTSTRAP === 'true';

    if (!shouldBootstrap) {
      return;
    }

    // 1) Loosen public permissions for read-only content in dev
    try {
      const roleService = (strapi as any).plugins['users-permissions'].services.role
      const roles = await roleService.find()
      const publicRole = roles.find((role: any) => role.type === 'public')
      if (publicRole) {
        await roleService.updateRole(publicRole.id, {
          permissions: {
            ...publicRole.permissions,
            'api::homepage.homepage': { find: true },
            'api::site-setting.site-setting': { find: true },
            'api::page.page': { find: true },
            'api::post.post': { find: true },
            'api::tag.tag': { find: true },
            'api::case-study.case-study': { find: true },
          },
        })
      }
    } catch (e) {
      strapi.log.warn('Could not adjust public role permissions:', e)
    }

    // 2) Seed minimal content so the frontend has data to render
    const es = strapi.entityService
    try {
      // Site Settings (single type)
      const existingSettings = await es.findMany('api::site-setting.site-setting')
      if (!existingSettings || (Array.isArray(existingSettings) && existingSettings.length === 0)) {
        await es.create('api::site-setting.site-setting', {
          data: {
            bookCallUrl: 'https://example.com/book',
            socialLinks: [
              { platform: 'Facebook', url: 'https://facebook.com/yourpage', icon: 'Facebook' },
              { platform: 'Instagram', url: 'https://instagram.com/yourpage', icon: 'Instagram' },
              { platform: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile', icon: 'LinkedIn' },
            ],
          },
        })
      }

      // Homepage (single type)
      const existingHomepage = await es.findMany('api::homepage.homepage')
      if (!existingHomepage || (Array.isArray(existingHomepage) && existingHomepage.length === 0)) {
        await es.create('api::homepage.homepage', {
          data: {
            heroText: 'Welcome to the site',
            footer: {
              newsletter: true,
              newsletterHeading: 'Subscribe to my educator insights',
              newsletterSubtext:
                'Join a community of forward-thinking school leaders and receive exclusive tips delivered straight to your inbox.',
              links: [
                { label: 'Home', href: 'https://localhost:3000/' },
                { label: 'About', href: 'https://localhost:3000/about' },
                { label: 'Contact', href: 'https://localhost:3000/contact' },
              ],
              socialLinks: [
                { platform: 'Facebook', url: 'https://facebook.com/yourpage', icon: 'Facebook' },
                { platform: 'Instagram', url: 'https://instagram.com/yourpage', icon: 'Instagram' },
                { platform: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile', icon: 'LinkedIn' },
              ],
            },
            publishedAt: new Date(),
          },
        })
      }

      // Pages (collection type) - About
      const aboutPage = await es.findMany('api::page.page', { filters: { slug: 'about' } as any })
      if (!aboutPage || (Array.isArray(aboutPage) && aboutPage.length === 0)) {
        await es.create('api::page.page', {
          data: {
            title: 'About',
            slug: 'about',
            hero: {
              heading: 'About Me',
              description1:
                "Doris Chinedu-Okoro is known as 'The Teacher\u2019s Teacher' for a reason...",
              description2:
                "Doris is also the convenor of the South East Educators Conference (SEEC)...",
              name: 'Doris Chinedu-Okoro'
            },
            workExperiences: [
              {
                name: 'CEO & Founder, Evergreen Group of Schools',
                dates: '2008 \u2013 Present',
                description:
                  'Grew Evergreen into a multi-campus institution known for holistic learning.',
                website: 'https://evergreenschools.com.ng/'
              },
              {
                name: 'School Startup Consultant',
                dates: '2012 \u2013 Present',
                description:
                  'Helps entrepreneurs launch and manage new schools: curriculum, teacher training, governance.',
                website: 'https://evergreenschools.com.ng/consult/'
              }
            ],
            awards: [
              { alt: 'Investors in People Silver Award', label: 'Investors in People Silver Award (ISLC), 2022' },
              { alt: 'Lighthouse Christian Chapel Award', label: 'Lighthouse Christian Chapel Award of Excellence, 2021' }
            ],
            pressItems: [
              {
                title: 'The Teacher\u2019s Teacher on Building Great Schools',
                category: 'Podcast',
                link: { url: 'https://example.com/podcast', label: 'Listen to podcast', displayUrl: 'example.com' }
              }
            ],
            publishedAt: new Date(),
          },
        })
      }

      // Pages (collection type) - Contact
      const contactPage = await es.findMany('api::page.page', { filters: { slug: 'contact' } as any })
      if (!contactPage || (Array.isArray(contactPage) && contactPage.length === 0)) {
        await es.create('api::page.page', {
          data: {
            title: 'Contact',
            slug: 'contact',
            heading: 'How can I help you? Let\u2019s get in touch',
            subheading: 'Your next breakthrough starts right here \u2014 let\u2019s build it together.',
            email: 'Ceo@evergreenschool.com.ng',
            phone: '+(234) 080-6878-2862',
            publishedAt: new Date(),
          },
        })
      }

      // 3) Seed tags, posts and case studies with media
      async function ensureTag(name: string) {
        const found = await es.findMany('api::tag.tag', { filters: { name } as any })
        if (Array.isArray(found) && found.length > 0) return found[0].id
        const created = await es.create('api::tag.tag', { data: { name, slug: name.toLowerCase().replace(/\s+/g, '-') } })
        return created.id
      }

      async function findFileIdContains(fragment: string) {
        try {
          const results = await es.findMany('plugin::upload.file', {
            filters: { name: { $containsi: fragment } } as any,
            sort: 'createdAt:desc',
            limit: 1,
          })
          if (Array.isArray(results) && results.length > 0) return results[0].id
        } catch {}
        return null
      }

      // Ensure some tags exist
      const tagEducation = await ensureTag('Education')
      const tagLeadership = await ensureTag('Leadership')
      const tagConsulting = await ensureTag('Consulting')
      const tagBranding = await ensureTag('Branding')
      const tagWebDev = await ensureTag('Web Development')

      // Seed posts if empty
      const posts = await es.findMany('api::post.post', { limit: 1 })
      if (!posts || (Array.isArray(posts) && posts.length === 0)) {
        const cover1 = (await findFileIdContains('article_03')) || (await findFileIdContains('1_'))
        const cover2 = (await findFileIdContains('article_04')) || (await findFileIdContains('2_'))
        await es.create('api::post.post', {
          data: {
            title: 'Improving Teacher Training Programs',
            slug: 'improving-teacher-training-programs',
            category: 'Education',
            content:
              'Key takeaways from the SEEC conference and practical steps to strengthen teacher training pipelines across schools.',
            coverImage: cover1,
            tags: ([tagEducation] as any),
            publishedAt: new Date(),
          },
        })
        await es.create('api::post.post', {
          data: {
            title: 'Building Student-Centred Schools',
            slug: 'building-student-centred-schools',
            category: 'Leadership',
            content:
              'Lessons learned from launching Evergreen campuses and how to create a culture that puts learners first.',
            coverImage: cover2,
            tags: ([tagLeadership] as any),
            publishedAt: new Date(),
          },
        })
      }

      // Seed case studies if empty
      const caseStudies = await es.findMany('api::case-study.case-study', { limit: 1 })
      if (!caseStudies || (Array.isArray(caseStudies) && caseStudies.length === 0)) {
        const thumb1 = (await findFileIdContains('3_')) || (await findFileIdContains('large_3_'))
        const thumb2 = (await findFileIdContains('4_')) || (await findFileIdContains('large_4_'))
        await es.create('api::case-study.case-study', {
          data: {
            title: 'Evergreen Campus Expansion',
            slug: 'evergreen-campus-expansion',
            summary: 'Scaled the Evergreen model to a new campus with improved outcomes.',
            description:
              'We designed the expansion blueprint, trained teachers, and established governance processes to sustain growth.',
            thumbnail: thumb1,
            tags: ([tagEducation, tagWebDev] as any),
            publishedAt: new Date(),
          },
        })
        await es.create('api::case-study.case-study', {
          data: {
            title: 'Teacher Coaching Program',
            slug: 'teacher-coaching-program',
            summary: 'A 12-week coaching program to elevate classroom practice.',
            description:
              'Structured mentoring, peer observations, and feedback cycles boosted teacher efficacy and learner engagement.',
            thumbnail: thumb2,
            tags: ([tagConsulting, tagLeadership] as any),
            publishedAt: new Date(),
          },
        })
      }
    } catch (e) {
      strapi.log.warn('Bootstrap seeding skipped or failed:', e)
    }
  },
};
