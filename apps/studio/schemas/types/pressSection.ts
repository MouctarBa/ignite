import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pressSection',
  title: 'Press & Interviews',
  type: 'document',
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'subtext', type: 'text' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', validation: r => r.required() },
          { name: 'category', type: 'string' },
          {
            name: 'link',
            type: 'object',
            fields: [
              { name: 'url', type: 'url', validation: r => r.required() },
              { name: 'label', type: 'string' },
              { name: 'displayUrl', type: 'string' },
            ],
          },
        ],
      }],
    }),
  ],
})

