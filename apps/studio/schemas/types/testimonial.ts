import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({name: 'author', type: 'string', validation: r => r.required()}),
    defineField({name: 'role', type: 'string'}),
    defineField({name: 'quote', type: 'text', validation: r => r.required()}),
    defineField({name: 'avatar', type: 'image'}),
  ],
})

