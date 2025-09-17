import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: r => r.required()}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}, validation: r => r.required()}),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'date', type: 'date'}),
    defineField({name: 'category', type: 'string'}),
    defineField({name: 'timeToRead', type: 'number'}),
    defineField({name: 'coverImage', type: 'image', options: {hotspot: true}}),
    defineField({name: 'publishedAt', type: 'datetime'}),
    defineField({name: 'content', type: 'array', of: [{type: 'block'}]}),
  ],
})

