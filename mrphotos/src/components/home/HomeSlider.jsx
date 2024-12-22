
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import Loading from "@/app/loading"; // Import the Loading component

export default function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);
  const swiperRef = useRef(null); // Reference to the Swiper instance

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/sliders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch sliders");
        }
        const data = await response.json();

        if (Array.isArray(data.data)) {
          setSlides(data.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchSlides();
  }, []);

  if (loading) {
    return <Loading />; // Display the Loading component while loading
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDotClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(index); // Corrected method for navigating slides
    }
  };

  return (
    <div className="relative mx-auto mt-20 h-[calc(100vh-200px)] pt-10">
      <Swiper
        ref={swiperRef} // Attach the swiper instance to the ref
        effect={"fade"}
        slidesPerView={1}
        speed={1000}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Navigation, Autoplay]}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        className="h-full w-full"
        navigation={{
          nextEl: ".custom-swiper-button-next",
          prevEl: ".custom-swiper-button-prev",
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <Image
                src={`http://127.0.0.1:8000/${slide.image_path}`}
                alt={slide.heading || "Slide Image"}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40" />

              {/* Slide Content */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
                <div className="slide-content">
                  <span
                    className="mb-2 inline-block text-2xl font-normal tracking-widest text-white transform transition-all duration-1000 delay-300"
                    style={{
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index
                        ? "translateY(0)"
                        : "translateY(20px)",
                    }}
                  >
                    {slide.heading}
                  </span>

                  <h1
                    className="font-bombes mb-9 text-[92px] leading-none text-white transform transition-all duration-1000 delay-500"
                    style={{
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index
                        ? "translateY(0)"
                        : "translateY(20px)",
                    }}
                  >
                    {slide.tag}
                  </h1>

                  <Link
                    href="/portfolio"
                    className="button inline-block border border-[#dddddd] px-10 py-3 text-sm font-normal uppercase tracking-wider text-white transition-all hover:bg-white hover:text-gray-900 transform duration-500"
                    style={{
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index
                        ? "translateY(0)"
                        : "translateY(20px)",
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
          className="custom-swiper-button-prev text-black uppercase text-sm tracking-wider"
          style={{ position: "static", margin: 0 }}
        >
          PREV
        </button>

        {/* Dots */}
        <div className="flex items-center mx-4">
          <div className="w-10 h-[1px] border-t border-dashed border-primary" />
          <div className="flex items-center gap-2 px-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)} // Navigate to specific slide
                className={`h-5 w-5 rounded-full border border-primary transition-all ${
                  currentSlide === index ? "scale-100 bg-primary" : "scale-50"
                }`}
              />
            ))}
          </div>
          <div className="w-10 h-[1px] border-t border-dashed border-primary" />
        </div>

        {/* Next Button */}
        <button
          className="custom-swiper-button-next text-black uppercase text-sm tracking-wider"
          style={{ position: "static", margin: 0 }}
        >
          NEXT
        </button>
      </div>

      {/* Side Text */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-10">
        <span className="block -rotate-90 text-sm font-semibold uppercase tracking-wider text-primary">
          Last Works
        </span>
      </div>
    </div>
  );
}