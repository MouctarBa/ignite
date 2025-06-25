import { BlogGrid } from '@/components/blog/BlogGrid'
import { fetchAPI } from '@/lib/strapi';

export default async function BlogPage() {
  const postsRes = await fetchAPI('/posts', { 
    sort: { date: 'desc' },
    populate: '*' 
  });

  // Safety check to ensure data was fetched correctly
  if (!postsRes || !postsRes.data) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">Could not load posts.</h2>
        <p className="mt-2">Please ensure you have published posts in Strapi and that API permissions are correct.</p>
      </div>
    );
  }

  // Filter out any entries that are missing essential data to prevent crashes
  const validPosts = postsRes.data.filter(post => {
      const { attributes } = post;
      return attributes && attributes.slug && attributes.image && attributes.image.data;
  });

  // Map over only the valid posts
  const posts = validPosts.map(post => {
    const { attributes } = post;
    return {
      title: attributes.title,
      description: attributes.description,
      date: attributes.date,
      category: attributes.category,
      timeToRead: attributes.timeToRead,
      slug: attributes.slug,
      url: `/blog/${attributes.slug}`,
      image: attributes.image.data.attributes.url,
    };
  });

  return <BlogGrid posts={posts} />
}