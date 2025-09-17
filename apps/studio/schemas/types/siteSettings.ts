import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'siteName', type: 'string'}),
    defineField({name: 'tagline', type: 'string'}),
    defineField({name: 'logo', type: 'image'}),
    // Page enablement toggles
    // Header visibility toggles (fixed links)
    defineField({ name: 'showHome', type: 'boolean', initialValue: true }),
    defineField({ name: 'showAbout', type: 'boolean', initialValue: true }),
    defineField({ name: 'showWork', type: 'boolean', initialValue: true }),
    defineField({ name: 'showBlog', type: 'boolean', initialValue: true }),
    defineField({ name: 'showContact', type: 'boolean', initialValue: true }),
    defineField({name: 'bookCallUrl', type: 'url'}),
    defineField({name: 'bookCallLabel', type: 'string'}),
    defineField({
      name: 'navLinks',
      title: 'Header Navigation Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'label', type: 'string', validation: r => r.required()},
          {name: 'href', type: 'string', description: 'Can be a relative path (/about) or absolute URL'},
        ]
      }]
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
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
