import Image from 'next/image'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import ReactMarkdown from 'react-markdown'

import { fetchAPI, getGlobal } from '@/lib/strapi'
import { PostFooter } from './PostFooter'
import { Footer } from '@/components/Footer'
import {
  WebDevelopmentIcon,
  TutorialIcon,
  BusinessIcon,
  ContentCreationIcon,
} from '@/components/CategoryIcons'

const iconOptions = {
  'Web Development': WebDevelopmentIcon,
  Business: BusinessIcon,
  'Content Creation': ContentCreationIcon,
  Tutorials: TutorialIcon,
}

export async function generateStaticParams() {
  const posts = await fetchAPI('/posts');
  return posts.data.map((post) => ({
    slug: post.attributes.slug,
  }));
}

export async function generateMetadata({ params }) {
  const posts = await fetchAPI('/posts', { filters: { slug: { $eq: params.slug } } });
  const post = posts.data[0].attributes;
  return { title: post.title, description: post.description }
}

export default async function BlogPost({ params }) {
  const postsRes = await fetchAPI('/posts', {
    filters: { slug: { $eq: params.slug } },
    populate: { image: { fields: ['url', 'alternativeText'] } }
  });

  const post = postsRes.data[0].attributes;
  const categorySlug = post.category.replace(/ /g, '-').toLowerCase()
  const CategoryIcon = iconOptions[post.category]
  const global = await getGlobal()

  return (
    <>
      <main>
        <article>
          {/* Article Header */}
          <header className="relative bg-slate-50 py-16 sm:pt-24 lg:pt-28">
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-white" />
            <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
              <Link
                href={`/blog/categories/${categorySlug}`}
                className="group inline-flex items-center justify-center gap-3.5 text-base leading-5 tracking-wide text-sky-700 transition duration-200 ease-in-out hover:text-sky-600 sm:text-lg"
              >
                <CategoryIcon className="h-[18px] w-[18px] text-sky-700/90 transition duration-200 group-hover:text-sky-600 sm:h-5 sm:w-5" />
                {post.category}
              </Link>
              <h1 className="mt-6 text-center font-display text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl sm:leading-tight">
                {post.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-700">
                {post.description}
              </p>
              <div className="mt-8 flex items-center justify-center gap-4 text-md text-slate-500">
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.75"
                    stroke="currentColor"
                    className="h-6 w-6 text-slate-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                  </svg>
                  <time dateTime={post.date}>
                    {format(parseISO(post.date), 'LLL d, yyyy')}
                  </time>
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.75"
                    stroke="currentColor"
                    className="h-6 w-6 text-slate-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {`${post.timeToRead} minute read`}
                </span>
              </div>
              <div className="mx-auto mt-16 w-full max-w-4xl">
                <div className="aspect-h-9 aspect-w-16 relative block w-full overflow-hidden rounded-3xl shadow-lg shadow-sky-100/50 md:aspect-h-2 md:aspect-w-3">
                  <Image
                    src={post.image.data.attributes.url}
                    alt={post.title}
                    fill={true}
                    className="w-full rounded-3xl bg-slate-100 object-cover"
                    sizes="(min-width: 1024px) 56rem, calc(100vw - 2.5rem)"
                  />
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate-900/10"></div>
                </div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
            <div className="prose prose-lg mx-auto max-w-2xl">
              <ReactMarkdown>{post.body}</ReactMarkdown>
            </div>
            <PostFooter />
          </div>
        </article>
      </main>
      <Footer {...(global.footer || {})} />
    </>
  )
}

export const dynamicParams = true