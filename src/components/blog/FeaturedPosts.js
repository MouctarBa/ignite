import { Container } from '@/components/Container'
import { BlogGrid } from '@/components/blog/BlogGrid'

const samplePosts = [
  {
    title: 'Improving Teacher Training Programs',
    description: 'Key takeaways from the SEEC conference.',
    date: '2024-01-15',
    category: 'Education',
    timeToRead: 4,
    slug: 'improving-teacher-training-programs',
    url: '/blog/improving-teacher-training-programs',
    image: '/images/articles/article-03.jpg',
  },
  {
    title: 'Building Student-Centred Schools',
    description: 'Lessons learned from launching Evergreen campuses.',
    date: '2024-02-10',
    category: 'Leadership',
    timeToRead: 5,
    slug: 'building-student-centred-schools',
    url: '/blog/building-student-centred-schools',
    image: '/images/articles/article-04.jpg',
  },
]

export { samplePosts }

export function FeaturedPosts({ posts }) {
  let transformedPosts = []

  if (posts && posts.length > 0) {
    const validPosts = posts.filter(
      (post) =>
        post &&
        post.attributes &&
        post.attributes.image?.data?.attributes?.url
    )

    if (validPosts.length > 0) {
      transformedPosts = validPosts.map((post) => {
        const { attributes } = post
        return {
          title: attributes.title,
          description: attributes.description,
          date: attributes.date,
          category: attributes.category,
          timeToRead: attributes.timeToRead,
          slug: attributes.slug,
          url: `/blog/${attributes.slug}`,
          image: attributes.image.data.attributes.url,
        }
      })
    }
  }

  if (transformedPosts.length === 0) {
    transformedPosts = samplePosts
  }

  return (
    <section className="py-16 overflow-hidden bg-white sm:pt-24 lg:pt-28">
      <Container>
        <h2 className="max-w-2xl mx-auto text-4xl font-semibold leading-tight text-center font-display text-slate-900 sm:text-5xl sm:leading-tight">
          <span className="relative whitespace-nowrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="249"
              height="22"
              viewBox="0 0 249 22"
              fill="currentColor"
              className="absolute left-0 top-2/3 h-[0.6em] w-full fill-sky-200/75"
            >
              <path d="M247.564 18.5808C241.772 13.3568 232.473 12.7526 225.225 11.4427C217.124 9.97398 208.996 8.57034 200.846 7.46096C186.542 5.51305 172.169 4.08857 157.79 3.01565C126.033 0.645858 94.0929 0.0338786 62.3387 2.36982C42.1785 3.85419 22.008 5.90888 2.32917 10.8464C-0.0155171 11.4349 0.207047 14.6719 2.6889 14.7084C22.0261 14.9896 41.3866 12.6406 60.7109 11.8568C79.9471 11.0808 99.2274 10.6719 118.484 10.9558C142.604 11.3125 166.719 12.8334 190.722 15.5156C199.956 16.5469 209.195 17.6016 218.411 18.8255C227.864 20.0808 237.259 22 246.767 20.7422C247.709 20.6198 248.426 19.3568 247.564 18.5808Z" />
            </svg>
            <span className="relative text-sky-700 ">Insights</span>
          </span>{' '}
          on education and school leadership
        </h2>
        <BlogGrid posts={transformedPosts} featured={true} />
      </Container>
    </section>
  );
}