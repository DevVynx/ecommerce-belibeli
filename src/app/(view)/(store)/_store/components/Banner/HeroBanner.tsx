"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { heroBanners, BannerIndicator, CarouselButton } from "./index";

export const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState<number | null>(null);
  const threshold = 30;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex === heroBanners.length - 1) {
        setCurrentIndex(0);
        return;
      }
      setCurrentIndex(currentIndex + 1);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <section className="relative flex w-screen justify-center overflow-hidden pt-14.5 lg:pt-0">
      <div
        className="flex w-full flex-row transition-transform duration-650"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={(e) => setStartX(e.touches[0].clientX)}
        onTouchMove={(e) => setCurrentX(e.touches[0].clientX)}
        onTouchEnd={() => {
          if (!currentX || !startX) return;
          const deltaX = currentX - startX;
          if (deltaX > threshold)
            setCurrentIndex(currentIndex === 0 ? heroBanners.length - 1 : currentIndex - 1);
          if (deltaX < -threshold)
            setCurrentIndex(currentIndex === heroBanners.length - 1 ? 0 : currentIndex + 1);
          setStartX(null);
          setCurrentX(null);
        }}
      >
        {heroBanners.map((banner) => (
          <React.Fragment key={banner.alt}>
            <Image src={banner.mobile} alt="Hero-Banner" className="w-full shrink-0 md:hidden" />
            <Image
              src={banner.desktop}
              alt="Hero-Banner"
              className="hidden w-full shrink-0 md:block"
            />
          </React.Fragment>
        ))}
      </div>

      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 transform gap-4">
        {heroBanners.map((_, index) => (
          <BannerIndicator
            key={index}
            index={index}
            currentIndex={currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <CarouselButton
        key={"prev"}
        direction="prev"
        onClick={() =>
          setCurrentIndex(currentIndex === 0 ? heroBanners.length - 1 : currentIndex - 1)
        }
      />
      <CarouselButton
        key={"next"}
        direction="next"
        onClick={() =>
          setCurrentIndex(currentIndex === heroBanners.length - 1 ? 0 : currentIndex + 1)
        }
      />
    </section>
  );
};
