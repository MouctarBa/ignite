"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Container } from './Container';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import zendesk from '@/images/logos/zendesk.svg';
import intercom from '@/images/logos/intercom.svg';
import coursera from '@/images/logos/coursera.svg';
import unbounce from '@/images/logos/unbounce.svg';
import prismic from '@/images/logos/prismic.svg';
import codesee from '@/images/logos/codesee.svg';
import booqable from '@/images/logos/booqable.svg';
import tapcart from '@/images/logos/tapcart.svg';
import mailchimp from '@/images/logos/mailchimp.svg';
import instagram from '@/images/logos/instagram.svg';

const companies = [
    { name: 'Zendesk', logo: zendesk },
    { name: 'Intercom', logo: intercom },
    { name: 'Coursera', logo: coursera },
    { name: 'Unbounce', logo: unbounce },
    { name: 'Prismic', logo: prismic },
    { name: 'Codesee', logo: codesee },
    { name: 'Booqable', logo: booqable },
    { name: 'Tapcart', logo: tapcart },
    { name: 'Mailchimp', logo: mailchimp },
    { name: 'Instagram', logo: instagram },
];

export function Testimonials({ testimonials }) {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [carouselProgress, setCarouselProgress] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    const testimonialsCount = parseFloat(testimonials.length);
    const indexOffset = 3;
    setCarouselProgress(((swiperIndex + indexOffset) / testimonialsCount) * 100);
  }, [swiperIndex, testimonials]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative py-20 overflow-hidden bg-slate-50 sm:py-24 lg:pt-32 ">
      <Container className="relative">
        <div className="grid max-w-xl gap-6 mx-auto lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-4xl font-semibold font-display text-slate-900 sm:text-5xl">
              Here’s what past clients are saying about me
            </h2>
            <div className="mt-10 hidden h-[7px] w-full rounded-full bg-slate-200 lg:mt-16 lg:block">
              <div
                className="h-full duration-200 rounded-full bg-slate-900"
                style={{ width: `${carouselProgress}%` }}
              ></div>
            </div>
          </div>
          <div className="lg:ml-auto lg:max-w-sm">
            <p className="text-lg text-slate-700">
              Iced pumpkin ristretto irish trifecta robusta trade froth affogato
              barista con barista cappuccino filter roast.
            </p>
            <div className="mt-14 flex gap-2.5 lg:mt-12">
              <button className="carousel-prev inline-flex items-center justify-center w-12 h-12 duration-200 bg-white rounded-full shadow-sm shadow-sky-200/75 ring-1 ring-slate-200/60 hover:bg-sky-50/50" aria-label="Previous testimonials">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-sky-700/70"><path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" /></svg>
              </button>
              <button className="carousel-next inline-flex items-center justify-center w-12 h-12 duration-200 bg-white rounded-full shadow-sm shadow-sky-200/75 ring-1 ring-slate-200/60 hover:bg-sky-50/50" aria-label="Next testimonials">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-sky-700/70"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" /></svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
      <div className="relative mt-8 lg:mt-24">
        <Container className="relative">
          <Swiper
            modules={[Navigation]}
            navigation={{ nextEl: '.carousel-next', prevEl: '.carousel-prev' }}
            scrollbar={{ draggable: true }}
            spaceBetween={0}
            slidesPerView="auto"
            grabCursor={true}
            loop={testimonials.length > 1}
            centeredSlides={false}
            initialSlide={0}
            onSlideChange={(swiper) => setSwiperIndex(swiper.activeIndex)}
            className="!overflow-visible"
          >
            <div className="flex w-full">
              {testimonials.map((testimonial) => {
                const { attributes: t } = testimonial;
                if (!t || !t.author_image?.data?.attributes?.url) {
                    return null;
                }
                return (
                    <SwiperSlide
                        key={testimonial.id}
                        className="swiper-slide !h-auto !w-auto shrink-0 border-b border-l border-t border-slate-200 p-10 shadow-sm shadow-sky-100/50 first:rounded-l-2xl last:rounded-r-2xl last:border-r"
                    >
                        <div className="flex flex-col w-full h-full max-w-[272px] flex-1">
                          <div className="flex-1">
                              <div className="flex gap-0.5">
                              {[...Array(5)].map((i, n) => (
                                  <svg key={`testimonial-${testimonial.id}-star-${n}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-yellow-400"><path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" /></svg>
                              ))}
                              </div>
                              <p className="mt-7 text-xl font-medium font-display text-slate-900">{t.headline}</p>
                              <p className="mt-3 text-sm leading-7 text-slate-700">{t.content}</p>
                          </div>
                          <div>
                              <hr className="w-full h-px my-6 bg-slate-200" />
                              <div className="flex items-center justify-between">
                              <div className="">
                                  <p className="font-medium font-display text-md text-slate-900">{t.author_name}</p>
                                  <p className="mt-1.5 text-sm text-slate-600">{t.author_role}</p>
                              </div>
                              <Image
                                  src={t.author_image.data.attributes.url}
                                  alt={t.author_name || 'Author image'}
                                  className="object-cover rounded-full h-14 w-14"
                                  width={56} height={56} sizes="3.5rem"
                              />
                              </div>
                          </div>
                        </div>
                    </SwiperSlide>
                )
              })}
            </div>
          </Swiper>
        </Container>
      </div>
      <Container className="mt-16 sm:mt-20">
        <div className="max-w-xl mx-auto lg:mx-0 lg:max-w-none">
          <h3 className="relative max-w-xs font-writing text-[27px] tracking-wide text-slate-600">
            These are some <span className="text-sky-700">companies</span> I have worked with
          </h3>
          <div className="grid grid-cols-2 gap-2.5 mt-12 sm:mt-14 lg:mt-20 lg:grid-cols-5">
            {companies.map((company) => (
              <div key={company.name} className="flex items-center justify-center py-7 border rounded-xl shadow-sm border-slate-200/90 shadow-sky-100/50">
                <Image src={company.logo} alt={company.name} unoptimized className="w-32 h-auto sm:w-36" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}