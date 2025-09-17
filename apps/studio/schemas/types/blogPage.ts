import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogPage',
  title: 'Blog Page',
  type: 'document',
  fields: [
    defineField({ name: 'enabled', type: 'boolean', initialValue: true }),
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'description', type: 'text'}),
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'subtext', type: 'string' }),
    defineField({ name: 'ctaLabel', type: 'string' }),
    defineField({ name: 'ctaHref', type: 'string' }),
    defineField({ name: 'background', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'latestArticlesHeading', type: 'string' }),
  ],
})
