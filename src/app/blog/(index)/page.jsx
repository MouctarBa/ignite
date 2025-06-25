import { BlogGrid } from '@/components/blog/BlogGrid'
import { allPosts } from 'contentlayer/generated'

export default async function BlogPage() {
  return <BlogGrid posts={allPosts} />
}
