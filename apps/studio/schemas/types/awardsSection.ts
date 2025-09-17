import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'awardsSection',
  title: 'Awards Section',
  type: 'document',
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'subtext', type: 'text' }),
    defineField({
      name: 'awards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'logo', type: 'image', options: { hotspot: true } },
          { name: 'alt', type: 'string' },
          { name: 'label', type: 'string' },
        ],
      }],
    }),
  ],
})

