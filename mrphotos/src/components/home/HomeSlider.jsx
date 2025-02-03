"use client";


import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function HomeSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

 

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative mx-auto mt-20 h-[calc(100vh-120px)]">
      <Swiper
        effect={"fade"}
        slidesPerView={1}
        speed={1500}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Autoplay]}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <Image
                src={`http://127.0.0.1:8000/storage/${slide.image_path}`}
                alt="Slide Image"
                fill
                sizes="100vw"
                
                priority={true}
                className="object-cover"
                loading="eager"
                placeholder="blur"
                blurDataURL={`http://127.0.0.1:8000/storage/${slide.image_path}`}
                style={{
                  objectFit: 'cover',
                  transform: 'none'
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}