import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'workPage',
  title: 'Work Page',
  type: 'document',
  fields: [
    defineField({ name: 'enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
  ],
})

