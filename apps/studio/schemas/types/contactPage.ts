import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'subheading', type: 'string' }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'content', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    // Reach me section texts
    defineField({ name: 'reachMeHeading', type: 'string' }),
    defineField({ name: 'emailTitle', type: 'string' }),
    defineField({ name: 'emailSubtitle', type: 'string' }),
    defineField({ name: 'callTitle', type: 'string' }),
    defineField({ name: 'callSubtitle', type: 'string' }),
    // Contact form configuration
    defineField({ name: 'formHeading', type: 'string' }),
    defineField({ name: 'submitLabel', type: 'string' }),
    defineField({ name: 'namePlaceholder', type: 'string' }),
    defineField({ name: 'emailPlaceholder', type: 'string' }),
    defineField({ name: 'phonePlaceholder', type: 'string' }),
    defineField({ name: 'messagePlaceholder', type: 'string' }),
    defineField({ name: 'servicesHeading', type: 'string' }),
    defineField({
      name: 'servicesOptions',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
