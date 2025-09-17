import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'heroTitle', type: 'string'}),
    defineField({name: 'heroSubtitle', type: 'string'}),
    defineField({name: 'heroText', type: 'text'}),
    defineField({name: 'heroImage', type: 'image', options: {hotspot: true}}),
    // Visibility toggles for homepage sections
    defineField({ name: 'showFeaturedPosts', type: 'boolean', initialValue: true }),
    defineField({ name: 'showFeaturedWork', type: 'boolean', initialValue: true }),
    defineField({ name: 'showTestimonials', type: 'boolean', initialValue: true }),
    // Experience section
    defineField({
      name: 'experience',
      title: 'Experience Section',
      type: 'object',
      fields: [
        { name: 'titlePrefix', type: 'string' },
        { name: 'titleHighlight', type: 'string' },
        { name: 'titleSuffix', type: 'string' },
        { name: 'introText', type: 'text' },
        {
          name: 'items',
          title: 'Timeline Items',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'icon', type: 'string', description: 'Icon key (e.g., Excellence, Efficiency, Responsiveness)' },
              { name: 'title', type: 'string' },
              { name: 'description', type: 'text' },
            ]
          }]
        },
        { name: 'differentiator', type: 'string', description: 'Small handwritten note text' },
      ],
    }),
    defineField({ name: 'experienceVideo', type: 'file' }),
    // Featured work section
    defineField({
      name: 'featuredWork',
      title: 'Featured Work',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string' },
        { name: 'subtext', type: 'text' },
      ],
    }),
    // Testimonials section labels
    defineField({ name: 'testimonialsHeading', type: 'string' }),
    defineField({ name: 'companiesHeading', type: 'string' }),
    defineField({
      name: 'partnerLogos',
      title: 'Partner Logos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    // Featured posts heading on home
    defineField({ name: 'featuredPostsHeading', type: 'string' }),
  ],
})
