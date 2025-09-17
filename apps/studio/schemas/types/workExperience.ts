import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'workExperience',
  title: 'Work Experience (My Journey)',
  type: 'document',
  fields: [
    defineField({ name: 'headingPrefix', type: 'string' }),
    defineField({ name: 'headingHighlight', type: 'string' }),
    defineField({ name: 'headingSuffix', type: 'string' }),
    defineField({ name: 'intro', type: 'text' }),
    defineField({ name: 'journeyNote', type: 'string' }),
    defineField({
      name: 'experiences',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string', validation: r => r.required() },
          { name: 'dates', type: 'string' },
          { name: 'description', type: 'text' },
          { name: 'website', type: 'url' },
        ],
      }],
    }),
  ],
})

