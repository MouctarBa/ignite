import Link from 'next/link'

import { Container } from './Container'

function PodcastIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      {...props}
    >
      <g
        strokeWidth="1.25"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5.5" y="0.5" width="5" height="11" rx="1"></rect>
        <line x1="5.5" y1="4.5" x2="6.5" y2="4.5"></line>
        <line x1="5.5" y1="7.5" x2="6.5" y2="7.5"></line>
        <line x1="9.5" y1="4.5" x2="10.5" y2="4.5"></line>
        <line x1="9.5" y1="7.5" x2="10.5" y2="7.5"></line>
        <line x1="7" y1="11.5" x2="7" y2="15.502"></line>
        <line x1="9" y1="11.5" x2="9" y2="15.502"></line>
        <path d="M2.964,2.964a5,5,0,0,0,0,7.072" stroke="currentColor"></path>
        <path d="M13.036,2.967a5,5,0,0,1,0,7.071" stroke="currentColor"></path>
      </g>
    </svg>
  )
}

function ArticleIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      {...props}
    >
      <g
        strokeWidth="1.25"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5,15.5L2.5,15.5 c-1.105,0-2-0.895-2-2v-5h4v5C4.5,14.605,3.605,15.5,2.5,15.5z"></path>{' '}
        <path d="M4.5,8.5v-8h11v13 c0,1.105-0.895,2-2,2h-11"></path>{' '}
        <line x1="7.5" y1="3.5" x2="12.5" y2="3.5" stroke="currentColor"></line>{' '}
        <line x1="7.5" y1="6.5" x2="12.5" y2="6.5" stroke="currentColor"></line>{' '}
        <line x1="7.5" y1="9.5" x2="12.5" y2="9.5" stroke="currentColor"></line>{' '}
        <line
          x1="7.5"
          y1="12.5"
          x2="9.5"
          y2="12.5"
          stroke="currentColor"
        ></line>
      </g>
    </svg>
  )
}

function ConferenceIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      {...props}
    >
      <title>show</title>
      <g
        strokeWidth="1.25"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1.5" y="0.5" width="13" height="7"></rect>
        <polyline
          points="6.5 11.5 6.5 9.5 3.5 9.5 3.5 11.5"
          stroke="currentColor"
        ></polyline>
        <polyline
          points="12.5 11.5 12.5 9.5 9.5 9.5 9.5 11.5"
          stroke="currentColor"
        ></polyline>
        <polyline
          points="3.5 15.5 3.5 13.5 0.5 13.5 0.5 15.5"
          stroke="currentColor"
        ></polyline>
        <polyline
          points="15.5 15.5 15.5 13.5 12.5 13.5 12.5 15.5"
          stroke="currentColor"
        ></polyline>
        <polyline
          points="9.5 15.5 9.5 13.5 6.5 13.5 6.5 15.5"
          stroke="currentColor"
        ></polyline>
      </g>
    </svg>
  )
}

const items = [
  {
    title: 'The Future of Software Engineering with Jane Doe',
    category: 'Podcast',
    icon: PodcastIcon,
    link: {
      href: '#',
      label: 'Listen to podcast',
      displayUrl: 'spotify.com',
    },
  },
  {
    title:
      'Building a Sense of Community Around Your Business - with Duncan Jones Junior',
    category: 'Podcast',
    icon: PodcastIcon,
    link: {
      href: '#',
      label: 'Listen to podcast',
      displayUrl: 'spotify.com',
    },
  },
  {
    title: '14 Things You Should Know Before Starting With Ruby On Rails',
    category: 'Article',
    icon: ArticleIcon,
    link: {
      href: '#',
      label: 'Read the article',
      displayUrl: 'gorails.com',
    },
  },
  {
    title:
      "Why Service Objects Aren't Evil (And Why You Should Start Using Them)",
    category: 'RailsConf 2022',
    icon: ConferenceIcon,
    link: {
      href: '#',
      label: 'Watch the talk',
      displayUrl: 'youtube.com',
    },
  },
  {
    title: 'Meet the top 10 developers to watch in 2021',
    category: 'Article',
    icon: ArticleIcon,
    link: {
      href: '#',
      label: 'Read the article',
      displayUrl: 'hackernews.com',
    },
  },
  {
    title:
      'Flow State for Software Engineers – Cultivate flow with the people who build software',
    category: 'Podcast',
    icon: PodcastIcon,
    link: {
      href: '#',
      label: 'Listen to podcast',
      displayUrl: 'youtube.com',
    },
  },
  {
    title:
      'Building a Sense of Community Around Your Business - with Duncan Jones Junior',
    category: 'Podcast',
    icon: PodcastIcon,
    link: {
      href: '#',
      label: 'Listen to podcast',
      displayUrl: 'spotify.com',
    },
  },
  {
    title:
      'How much money can a web developer with 100k subscribers on Youtube make with AdSense, affiliates and sponsors?',
    category: 'Press',
    icon: ArticleIcon,
    link: {
      href: '#',
      label: 'Read the article',
      displayUrl: 'businessinsider.com',
    },
  },
  {
    title:
      'Extending and Embedding Rich Media in the Rails Universe with the Trix Editor',
    category: 'RailsConf 2021',
    icon: ConferenceIcon,
    link: {
      href: '#',
      label: 'Watch the talk',
      displayUrl: 'youtube.com',
    },
  },
]

export function Press() {
  return (
    <section className="py-16 overflow-hidden bg-white sm:py-24 lg:pt-32">
      <Container>
        <div className="text-center">
          <h2 className="text-4xl font-semibold font-display text-slate-900 sm:text-5xl">
            Press and Interviews
          </h2>
          <p className="max-w-md mx-auto mt-6 text-lg leading-8 text-slate-700">
            Recognitions are like tattoos, you only show them off to people you
            want to impress.
          </p>
        </div>
        <div className="max-w-lg gap-6 mx-auto space-y-6 mt-14 columns-1 sm:mt-16 sm:max-w-2xl sm:columns-2 lg:mx-0 lg:max-w-none lg:columns-3 xl:gap-8 xl:space-y-8">
          {items.map((item, index) => (
            <div key={`press-item-${index}`} className="py-px break-inside-avoid-column">
              <div 
                className="shadow-sm rounded-xl bg-slate-50/75 p-7 shadow-sky-100/50 ring-1 ring-slate-900/5 lg:p-10"
              >
                <div className="flex items-center gap-2 text-md text-slate-600">
                  <item.icon className="w-4 h-4 text-slate-500" />
                  {item.category}
                </div>
                <h3 className="mt-6 text-lg font-medium font-display text-slate-900 lg:text-xl">
                  {item.title}
                </h3>
                <div className="space-y-1 mt-9">
                  <Link
                    href={item.link.href}
                    className="flex items-center gap-2 font-medium duration-200 ease-in-out group text-md text-sky-600 hover:text-sky-700"
                  >
                    {item.link.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 text-sky-500 duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                  <p className="text-xs text-slate-500 sm:text-[13px]">
                    {item.link.displayUrl}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
