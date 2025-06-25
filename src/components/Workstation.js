import Image from 'next/image'

import { Button } from './Button'
import { Container } from './Container'
import { TwitterIcon } from './SocialIcons'

import workstationImage1 from '@/images/workstation-01.jpg'
import workstationImage2 from '@/images/workstation-02.jpg'

export function Workstation() {
  return (
    <section className="py-16 overflow-hidden bg-slate-50 sm:py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="max-w-2xl mx-auto lg:mx-0">
              <h2 className="text-4xl font-semibold font-display text-slate-900 sm:text-5xl">
                A tour of my gadgets and workstation
              </h2>
              <p className="max-w-lg mt-6 text-lg leading-8 text-slate-700">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores impedit perferendis suscipit eaque, iste dolor
                cupiditate blanditiis ratione. Instant extraction mazagran milk
                instant milk foam café iced aftertaste iced brewed.
              </p>
              <Button
                href="https://twitter.com/raguila8"
                className="mt-10 gap-x-3.5 bg-slate-200/75"
                variant="secondary"
              >
                <TwitterIcon className="w-4 h-4 text-sky-500" />
                Follow me on Twitter
              </Button>
            </div>
          </div>
          <div className="relative w-full max-w-xl pb-24 mx-auto lg:mx-0 lg:max-w-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="79"
              viewBox="0 0 80 79"
              fill="none"
              className="absolute left-0 scale-75 top-8 sm:top-11 sm:-left-4 sm:scale-100"
            >
              <g clipPath="url(#clip0_253_8)">
                <path
                  d="M80 18.6138H20.9109"
                  stroke="#0369A1"
                  strokeOpacity="0.2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M80 23.9209H20.9109"
                  stroke="#0369A1"
                  strokeOpacity="0.2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M80 29.3069H20.9109"
                  stroke="#0369A1"
                  strokeOpacity="0.2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M80 34.6929H20.9109"
                  stroke="#0369A1"
                  strokeOpacity="0.2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M80 40.0792H20.9109"
                  stroke="#0369A1"
                  strokeOpacity="0.2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M80 45.3859H20.9109"
                  stroke="#0369A1"
                  strokeOpacity="0.2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M80 50.7723H20.9109"
                  stroke="#0369A1"
                  strokeOpacity="0.2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M80 56.1583H20.9109"
                  stroke="#0369A1"
                  strokeOpacity="0.2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M80 61.5447H20.9109"
                  stroke="#0369A1"
                  strokeOpacity="0.2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M80 66.8513H20.9109"
                  stroke="#0369A1"
                  strokeOpacity="0.2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M80 72.2377H20.9109"
                  stroke="#0369A1"
                  strokeOpacity="0.2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M80 77.6237H20.9109"
                  stroke="#0369A1"
                  strokeOpacity="0.2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M61.9059 61.507V0.6752H1.07428V61.507H61.9059Z"
                  stroke="#BAE6FD"
                  strokeMiterlimit="10"
                />
                <path
                  d="M61.9059 61.507V0.6752H1.07428V61.507H61.9059Z"
                  stroke="#0369A1"
                  strokeOpacity="0.2"
                  strokeMiterlimit="10"
                />
              </g>
              <defs>
                <clipPath id="clip0_253_8">
                  <rect
                    width="80"
                    height="78.4158"
                    fill="white"
                    transform="matrix(-1 0 0 -1 80 78.4158)"
                  />
                </clipPath>
              </defs>
            </svg>
            <div className="relative w-4/5 ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="190"
                height="180"
                viewBox="0 0 190 180"
                fill="none"
                className="absolute -right-20 -bottom-20 h-44 w-44"
              >
                <g clipPath="url(#clip0_253_45)">
                  <path
                    d="M150.567 128.664L157.691 121.466"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M126.488 153.583L139.547 140.243"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M127.834 131.469L176.327 81.1082"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M103.079 157.091L112.911 146.74"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M142.062 95.6753L184.792 51.4535"
                    stroke="#BAE6FD"
                    strokeOpacity="0.95"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M142.062 95.6753L184.792 51.4535"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M77.6277 162.359L123.068 115.157"
                    stroke="#BAE6FD"
                    strokeOpacity="0.95"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M77.6277 162.359L123.068 115.157"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M92.7031 125.688L167.989 47.7732"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M61.5034 157.976L77.4424 141.48"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M134.23 61.6403L152.377 43.036"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22.8296 177.105L115.242 81.4667"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M76.2266 100.774L166.604 7.24091"
                    stroke="#BAE6FD"
                    strokeOpacity="0.95"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M76.2266 100.774L166.604 7.24091"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M36.3792 142.012L57.4051 120.252"
                    stroke="#BAE6FD"
                    strokeOpacity="0.95"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M36.3792 142.012L57.4051 120.252"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M73.1582 82.8795L131.488 22.5132"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.6411 144.474L56.7103 99.9007"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M100.614 33.5686L131.136 1.98228"
                    stroke="#BAE6FD"
                    strokeOpacity="0.95"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M100.614 33.5686L131.136 1.98228"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.3926 117.626L78.3978 56.3851"
                    stroke="#BAE6FD"
                    strokeOpacity="0.95"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.3926 117.626L78.3978 56.3851"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M50.4067 64.4586L91.6108 21.8161"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.60767 112.891L34.2987 81.1289"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M66.3306 26.91L82.4421 10.4116"
                    stroke="#BAE6FD"
                    strokeOpacity="0.95"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M66.3306 26.91L82.4421 10.4116"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.4917 87.8014L48.19 45.8579"
                    stroke="#BAE6FD"
                    strokeOpacity="0.95"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.4917 87.8014L48.19 45.8579"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M37.4919 35.8599L47.3266 25.6818"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.1963 53.7595L26.9788 46.7402"
                    stroke="#0369A1"
                    strokeOpacity="0.2"
                    strokeWidth="1.1533"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_253_45">
                    <rect
                      width="176"
                      height="186.353"
                      fill="white"
                      transform="translate(3.01904 179.171) rotate(-90.9829)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <div className="aspect-w-6 aspect-h-5">
                <Image
                  src={workstationImage1}
                  alt=""
                  className="object-cover object-center w-full h-full rounded-2xl"
                  sizes="(min-width: 1280px) 30rem, (min-width: 1024px) 40vw, (min-width: 640px) 29rem, 80vw"
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-1/2">
              <div className="aspect-w-1 aspect-h-1">
                <Image
                  src={workstationImage2}
                  alt=""
                  className="object-cover object-center w-full h-full rounded-2xl"
                  sizes="(min-width: 1280px) 18.5rem, (min-width: 1024px) 25vw, (min-width: 640px) 18rem, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
