import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  fields: [
    defineField({name: 'newsletter', type: 'boolean', initialValue: true}),
    defineField({name: 'newsletterHeading', type: 'string'}),
    defineField({name: 'newsletterSubtext', type: 'text'}),
    defineField({name: 'newsletterButtonLabel', type: 'string'}),
    defineField({name: 'newsletterEmailPlaceholder', type: 'string'}),
    defineField({name: 'ctaHeading', type: 'string'}),
    defineField({name: 'ctaText', type: 'text'}),
    defineField({name: 'copyright', type: 'string'}),
    defineField({
      name: 'links',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'label', type: 'string'},
        {name: 'href', type: 'url'}
      ]}],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links (optional, overrides site settings)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'platform', type: 'string', validation: r => r.required()},
          {name: 'icon', type: 'string', options: {list: ['Facebook','Instagram','LinkedIn','Email']}},
          {name: 'url', type: 'url'},
        ]
      }]
    }),
  ],
})
