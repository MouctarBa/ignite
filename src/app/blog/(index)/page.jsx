import { BlogGrid } from '@/components/blog/BlogGrid'
import { fetchAPI } from '@/lib/strapi';

// This is the main page for your blog that displays all posts.
export default async function BlogPage() {
  // 1. Fetch all posts from your Strapi API.
  // We use populate: '*' to ensure that all related fields, like the image, are included in the response.
  const postsRes = await fetchAPI('/posts', { populate: '*' });

  // 2. The data from Strapi is nested. We need to map over it to create a
  // simpler array of objects that our components can easily use.
  const posts = postsRes.data.map(post => {
    const attributes = post.attributes;
    return {
      // These are the properties our <Post> component expects
      title: attributes.title,
      description: attributes.description,
      date: attributes.date,
      category: attributes.category,
      timeToRead: attributes.timeToRead,
      slug: attributes.slug,
      url: `/blog/${attributes.slug}`,
      // Make sure to access the image URL correctly from the nested structure
      image: attributes.image.data.attributes.url,
    };
  });

  // 3. Pass the simplified posts array to the BlogGrid component.
  return <BlogGrid posts={posts} />;
}