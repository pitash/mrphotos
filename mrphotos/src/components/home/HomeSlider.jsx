"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      tag: "TRAVELLING",
      title: "Incredible Iceland",
      image: "/images/slider/1.jpg",
      link: "/portfolio"
    },
    {
      id: 2,
      tag: "TRAVELLING",
      title: "jhjhj Iceland",
      image: "/images/slider/2.jpg",
      link: "/portfolio"
    },
    {
      id: 3,
      tag: "TRAVELLING",
      title: "Incredjbkhkjnd",
      image: "/images/slider/3.jpg",
      link: "/portfolio"
    }
  ];

  return (
    <div className="relative mx-auto mt-20 h-[calc(100vh-200px)]">
      <Swiper
      effect={'fade'}
      slidesPerView={1}
      speed={1000}
      loop={true}
      modules={[EffectFade, Navigation]}
      onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
      className="h-full w-full"
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
    >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
                <div className="slide-content">
                  <span 
                    className="mb-2 inline-block text-2xl font-normal tracking-widest text-white transform transition-all duration-1000 delay-300"
                    style={{
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)'
                    }}
                  >
                    {slide.tag}
                  </span>
                  
                  <h1 
                    className="font-bombes mb-9 text-[92px] leading-none text-white transform transition-all duration-1000 delay-500"
                    style={{
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)'
                    }}
                  >
                    {slide.title}
                  </h1>

                  <Link 
                    href={slide.link}
                    className="button inline-block border border-[#dddddd] px-10 py-3 text-sm font-normal uppercase tracking-wider text-white transition-all hover:bg-white hover:text-gray-900 transform duration-500"
                    style={{
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)'
                    }}
                  >
                    Explore Gallery
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Controls */}
      <div className="absolute -bottom-16 left-0 right-0 flex items-center justify-center z-10">
        {/* Prev Button */}
        <button 
          className="swiper-button-prev text-primary uppercase text-sm tracking-wider"
          style={{ position: 'static', margin: 0 }}  // Override Swiper's default styles
        >
          PREV
        </button>

        {/* Dots with dashed lines */}
        <div className="flex items-center mx-4">
          <div className="w-10 h-[1px] border-t border-dashed border-primary" />
          <div className="flex items-center gap-2 px-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => swiper?.slideTo(index)}
                className={`h-5 w-5 rounded-full border border-primary transition-all
                  ${currentSlide === index ? 'scale-100' : 'scale-50'}
                  before:absolute before:left-1/2 before:top-1/2 before:h-1.5 
                  before:w-1.5 before:-translate-x-1/2 before:-translate-y-1/2 
                  before:rounded-full before:bg-primary relative
                  ${currentSlide === index ? 'before:opacity-100' : 'before:opacity-0'}
                `}
              />
            ))}
          </div>
          <div className="w-10 h-[1px] border-t border-dashed border-primary" />
        </div>

        {/* Next Button */}
        <button 
          className="swiper-button-next text-primary uppercase text-sm tracking-wider"
          style={{ position: 'static', margin: 0 }}  // Override Swiper's default styles
        >
          NEXT
        </button>
      </div>

      {/* Last Works text */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-10">
        <span className="block -rotate-90 text-sm font-semibold uppercase tracking-wider text-primary">
          Last Works
        </span>
      </div>
    </div>
  );
}