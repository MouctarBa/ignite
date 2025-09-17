import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string' },
        { name: 'description1', type: 'text' },
        { name: 'description2', type: 'text' },
        { name: 'name', type: 'string' },
        { name: 'image', type: 'image', options: { hotspot: true } },
        { name: 'background', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({ name: 'content', type: 'array', of: [{ type: 'block' }] }),
  ],
})
