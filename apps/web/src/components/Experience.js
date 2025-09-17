import { Container } from './Container'
import { getStrapiMedia } from '@/lib/strapi'

export function Experience({
  video,
  titlePrefix,
  titleHighlight,
  titleSuffix,
  introText,
  items = [],
  differentiator,
}) {
  const localVideo = '/videos/ignite-doris-chinedu-okoro-UT8GZaaV8fQ-360p.mp4'
  const localPoster = '/videos/ignite-doris-chinedu-okoro-UT8GZaaV8fQ-poster.jpg'
  const videoUrl = (typeof video === 'string' ? video : getStrapiMedia(video)) || localVideo

  const defaultTitlePrefix = "I'm your"
  const defaultTitleHighlight = 'partner in'
  const defaultTitleSuffix = 'transformational education'
  const defaultIntroText =
    'Experience the advantage of an all-inclusive educational consulting solution, where excellence, efficiency and responsiveness converge to build thriving schools and empower teachers.'
  const defaultItems = [
    {
      icon: 'Excellence',
      title: 'Excellence',
      description:
        'I take pride in doing things well. From curriculum design to teacher training, every project is delivered with the highest standards.',
    },
    {
      icon: 'Efficiency',
      title: 'Efficiency',
      description:
        'I bring structured processes and practical frameworks that save time and create measurable results in schools and classrooms.',
    },
    {
      icon: 'Responsiveness',
      title: 'Responsiveness',
      description:
        'I work closely with teams, adapt quickly, and respond to emerging needs to keep your goals on track.',
    },
  ]
  const defaultDifferentiator = 'What differentiates me from others'

  return (
    <section className="relative pt-20 pb-40 overflow-hidden bg-gradient-to-b from-slate-50 via-slate-50 to-white sm:pt-24 lg:pb-64 lg:pt-32">
      <Container>
        <div className="grid items-center max-w-xl gap-6 mx-auto lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-4xl font-semibold font-display text-slate-900 sm:text-5xl">
              {titlePrefix || defaultTitlePrefix}{' '}
              <span className="relative whitespace-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="249" height="22" viewBox="0 0 249 22" fill="currentColor" className="absolute left-0 top-2/3 h-[0.6em] w-full fill-sky-200/75">
                  <path d="M247.564 18.5808C241.772 13.3568 232.473 12.7526 225.225 11.4427C217.124 9.97398 208.996 8.57034 200.846 7.46096C186.542 5.51305 172.169 4.08857 157.79 3.01565C126.033 0.645858 94.0929 0.0338786 62.3387 2.36982C42.1785 3.85419 22.008 5.90888 2.32917 10.8464C-0.0155171 11.4349 0.207047 14.6719 2.6889 14.7084C22.0261 14.9896 41.3866 12.6406 60.7109 11.8568C79.9471 11.0808 99.2274 10.6719 118.484 10.9558C142.604 11.3125 166.719 12.8334 190.722 15.5156C199.956 16.5469 209.195 17.6016 218.411 18.8255C227.864 20.0808 237.259 22 246.767 20.7422C247.709 20.6198 248.426 19.3568 247.564 18.5808Z" />
                </svg>
                <span className="relative text-sky-700">{titleHighlight || defaultTitleHighlight}</span>
              </span>{' '}
              {titleSuffix || defaultTitleSuffix}
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-slate-700">{introText || defaultIntroText}</p>
          </div>
        </div>
        <div className="grid max-w-xl mx-auto mt-16 gap-14 lg:mx-0 lg:mt-24 lg:max-w-none lg:grid-cols-12 lg:gap-7">
          <div className="max-w-lg lg:col-span-4">
            <ul className="relative">
              {(items && items.length ? items : defaultItems).map((it, idx) => (
              <li key={`exp-item-${idx}`}>
                <div className="relative pb-24 lg:pb-20">
                  <span
                    className="absolute -ml-px border border-dashed bottom-4 left-10 top-24 border-slate-300"
                    aria-hidden="true"
                  ></span>
                  <div className="relative flex space-x-7">
                    <div>
                      <span className="flex items-center justify-center w-20 h-20 rounded-full shadow-lg bg-slate-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="w-6 h-6 text-sky-50"
                        >
                          <g clipPath="url(#clip0_112_3)">
                            <path
                              d="M3.5 19.5V23.5H21.5V19.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14.5 12.5V5.5L17.5 4.5V1.5H7.5V4.5L10.5 5.5V12.5L2.868 15.044C2.051 15.316 1.5 16.081 1.5 16.942V19.5H23.5V16.942C23.5 16.081 22.949 15.317 22.132 15.045L14.5 12.5Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_112_3">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium font-display text-slate-900 ">{it.title}</h3>
                      <p className="mt-2.5 text-base text-slate-700">{it.description}</p>
                    </div>
                  </div>
                </div>
              </li>
              ))}
              {/* Keep the bottom graphic/handwritten note */}
              <li>
                <div className="relative pb-24 lg:pb-20">
                  <span
                    className="absolute -ml-px border border-dashed bottom-4 left-10 top-24 border-slate-300"
                    aria-hidden="true"
                  ></span>
                  <div className="relative flex space-x-7">
                    <div>
                      <span className="flex items-center justify-center w-20 h-20 rounded-full shadow-lg bg-slate-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="w-6 h-6 text-sky-50"
                        >
                          <g clipPath="url(#clip0_112_53)">
                            <path
                              d="M3.5 1.5H21.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3.5 23.5H21.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.5 20.5V19.711C8.50005 19.5142 8.55814 19.3219 8.667 19.158L11.667 14.658C11.7583 14.521 11.882 14.4087 12.0272 14.3311C12.1723 14.2534 12.3344 14.2128 12.499 14.2128C12.6636 14.2128 12.8257 14.2534 12.9708 14.3311C13.116 14.4087 13.2397 14.521 13.331 14.658L16.331 19.158C16.4406 19.3223 16.499 19.5155 16.499 19.713V20.5H8.5Z"
                              fill="currentColor"
                            />
                            <path
                              d="M5.5 23.5V19.711C5.50002 18.9212 5.73384 18.1491 6.172 17.492L9.5 12.5L6.172 7.508C5.73384 6.8509 5.50002 6.07879 5.5 5.289V1.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M19.5 1.5V5.289C19.5 6.07879 19.2662 6.8509 18.828 7.508L15.5 12.5L18.828 17.492C19.2662 18.1491 19.5 18.9212 19.5 19.711V23.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_112_53">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium font-display text-slate-900 ">
                        Speed
                      </h3>
                      <p className="mt-2.5 text-base text-slate-700">
                        I work fast and effectively. I know how important timelines and budgets are when launching or improving schools.
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative">
                  <div className="relative flex space-x-7">
                    <div>
                      <span className="flex items-center justify-center w-20 h-20 rounded-full shadow-lg bg-slate-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="w-6 h-6 text-sky-50"
                        >
                          <g clipPath="url(#clip0_112_46)">
                            <path
                              d="M23.5 1.5H11.5V11.5L16.5 7.5H23.5V1.5Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10.5 22.336C10.5 21.732 10.235 21.157 9.762 20.782C9.039 20.208 7.785 19.5 6 19.5C4.215 19.5 2.961 20.208 2.238 20.782C1.765 21.157 1.5 21.732 1.5 22.336V23.5H10.5V22.336Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6 16.5C7.38071 16.5 8.5 15.3807 8.5 14C8.5 12.6193 7.38071 11.5 6 11.5C4.61929 11.5 3.5 12.6193 3.5 14C3.5 15.3807 4.61929 16.5 6 16.5Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M23.5 22.336C23.5 21.732 23.235 21.157 22.762 20.782C22.039 20.208 20.785 19.5 19 19.5C17.215 19.5 15.961 20.208 15.238 20.782C14.765 21.157 14.5 21.732 14.5 22.336V23.5H23.5V22.336Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M19 16.5C20.3807 16.5 21.5 15.3807 21.5 14C21.5 12.6193 20.3807 11.5 19 11.5C17.6193 11.5 16.5 12.6193 16.5 14C16.5 15.3807 17.6193 16.5 19 16.5Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_112_46">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium font-display text-slate-900 ">
                        Responsiveness
                      </h3>
                      <p className="mt-2.5 text-base text-slate-700">
                        You can rely on me to be responsive and clear whenever we work together. I listen to your needs and adapt to your context.
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <div className="absolute hidden gap-6 -bottom-36 -right-8 lg:flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="81"
                  height="83"
                  viewBox="0 0 81 83"
                  fill="none"
                  className="relative w-20 h-auto -top-2 text-slate-600"
                >
                  <g clipPath="url(#clip0_112_68)">
                    <path
                      d="M79.0279 62.2024C58.1227 60.567 37.0551 52.8379 23.5836 35.8709C19.6389 30.9027 16.5994 23.913 14.6598 17.809C14.25 16.519 14.0629 15.1736 13.8444 13.8392C13.6447 12.6204 8.83154 19.8767 8.22696 20.6903C1.76323 29.3888 8.93024 20.1844 10.9563 16.5611C12.5286 13.7492 13.3857 10.1847 15.3992 7.63962C17.0205 5.59024 20.2035 9.67344 21.5513 10.8281C22.9371 12.0152 33.1749 18.4514 29.1817 20.1187C22.0175 23.1101 14.7009 22.4979 7.21764 22.9016"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_112_68">
                      <rect
                        width="85"
                        height="29"
                        fill="white"
                        transform="translate(21.4469 0.837036) rotate(46.0556)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span className="inline-block max-w-[220px] -rotate-12 transform font-writing text-2xl tracking-wide text-slate-600">{differentiator || defaultDifferentiator}</span>
              </div>
            </ul>
          </div>
          <div className="lg:col-span-8 lg:pl-8 xl:pl-24">
            <div className="relative w-full aspect-h-2 aspect-w-3">
              {videoUrl ? (
                <video
                  className="object-cover object-center w-full h-full rounded-3xl"
                  src={videoUrl}
                  poster={localPoster}
                  controls
                  preload="metadata"
                  playsInline
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full rounded-3xl bg-slate-200">
                  <span className="text-sm text-slate-600">Video coming soon</span>
                </div>
              )}
                {/* <dl className="absolute bottom-0 grid grid-cols-2 gap-5 px-6 py-8 text-center translate-x-1/2 right-1/2 w-max translate-y-3/4 rounded-2xl bg-sky-700/90 backdrop-blur-sm sm:translate-y-1/2 sm:gap-12 sm:p-10 lg:right-20 lg:translate-x-0">
                  <div className="flex flex-col gap-1">
                    <dt className="text-sm font-semibold leading-6 text-sky-50">
                      Years of experience
                    </dt>
                    <dd className="order-first text-3xl font-extrabold text-white sm:text-4xl">
                      20
                    </dd>
                  </div>

                  <div className="flex flex-col gap-1">
                    <dt className="text-sm font-semibold leading-6 text-sky-50">
                      Teachers trained
                    </dt>
                    <dd className="order-first text-3xl font-extrabold text-white sm:text-4xl">
                      200+
                    </dd>
                  </div>
                </dl> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="82"
                  height="84"
                  viewBox="0 0 82 84"
                  className="absolute w-20 h-auto -right-8 -top-8 text-slate-700"
                >
                  <g clipPath="url(#clip0_102_2463)">
                    <path
                      d="M41.5816 1.21606C39.7862 5.82482 40.3852 10.0977 40.5593 14.9633C40.7854 21.2812 40.9774 27.5593 41.4363 33.8661"
                      stroke="currentColor"
                      strokeWidth="1.90596"
                      strokeLinecap="round"
                    />
                    <path
                      d="M41.0651 45.1798C39.7505 51.5096 40.3418 57.6794 40.8893 64.0791C41.4093 70.1568 42.1389 76.2117 42.8566 82.2682"
                      stroke="currentColor"
                      strokeWidth="1.90596"
                      strokeLinecap="round"
                    />
                    <path
                      d="M1.13412 46.6647C5.16695 44.8703 8.9688 44.7974 13.3092 44.5029C19.8761 44.0572 26.2025 43.2089 32.656 41.952"
                      stroke="currentColor"
                      strokeWidth="1.90596"
                      strokeLinecap="round"
                    />
                    <path
                      d="M47.2629 40.0959C58.4139 39.3819 69.3895 37.5305 80.4472 35.9965"
                      stroke="currentColor"
                      strokeWidth="1.90596"
                      strokeLinecap="round"
                    />
                    <path
                      d="M49.3429 34.6508L52.917 28.1667"
                      stroke="currentColor"
                      strokeWidth="1.90596"
                      strokeLinecap="round"
                    />
                    <path
                      d="M32.9786 50.3504L28.6387 54.6391"
                      stroke="currentColor"
                      strokeWidth="1.90596"
                      strokeLinecap="round"
                    />
                    <path
                      d="M52.6361 48.6656L56.9506 51.5758"
                      stroke="currentColor"
                      strokeWidth="1.90596"
                      strokeLinecap="round"
                    />
                    <path
                      d="M31.549 30.8471C26.8741 29.4323 22.7143 27.3543 18.2738 25.3586"
                      stroke="currentColor"
                      strokeWidth="1.90596"
                      strokeLinecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_102_2463">
                      <rect width="82" height="84" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </Container>
      </section>
    )
  }

