


"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function HomeSlider() {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(`${process.env.baseUrl}/sliders`, {
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
        console.error("Error fetching slides:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="relative">
          {/* Placeholder Logo */}
          <Image
            src="/images/logo_1.png"
            alt="Loading..."
            width={100}
            height={100}
            priority
          />
          {/* Loading Bar */}
          <div className="absolute bottom-0 left-0 w-full">
            <div className="bg-gray-200 rounded-full overflow-hidden w-[100px]">
              <div className="bg-gray-800 h-2 rounded-full animate-barLoader"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto mt-20 h-[calc(100vh-100px)] pt-10">
    <Swiper
      ref={swiperRef}
      effect={"fade"}
      slidesPerView={1}
      speed={1000}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[EffectFade, Navigation, Autoplay]}
      className="h-full w-full"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative h-full w-full">
            <Image
              src={`${process.env.ImagebaseUrl}/${slide.image_path}`}
              alt="Slide Image"
              fill
              className="object-cover rounded-md"
              priority
              unoptimized
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  );
}

