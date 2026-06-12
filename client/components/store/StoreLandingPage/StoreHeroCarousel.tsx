"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

interface FeaturedVendorsProps {
  insta_mart: string;
  image_link: string;
}

const FEATURED_VENDORS: FeaturedVendorsProps[] = [
  {
    insta_mart: "",
    image_link:
      "https://res.cloudinary.com/dno4rbyve/image/upload/v1780913587/vendors/6a26935e3e5f707a7802d8fb/logo/1780913587811-Untitled%20design%20%282%29.png",
  },
  {
    insta_mart: "",
    image_link:
      "https://res.cloudinary.com/dno4rbyve/image/upload/v1778787212/vendors/6a06210663b9806f77758df5/logo/1778787211832-IMG_0471.png",
  },
];
const StoreHeroCarousel = () => {
  const emblaOptions: EmblaOptionsType = {
    align: "start",
    containScroll: "trimSnaps",
  };

  const autoplay = Autoplay();

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, [autoplay]);

  return (
    <div className="overflow-hidden sm:w-[700px] w-[30rem]  " ref={emblaRef}>
      <div className="flex gap-5">
        {emblaApi &&
          FEATURED_VENDORS.map((vendor, index) => (
            <div key={index} className=" sm:min-w-full ">
              <button
                className={`group relative sm:h-[350px] h-[280px] sm:w-full w-[20rem]  overflow-hidden rounded-lg transition`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center " />
                <Image
                  alt="Card example background"
                  className="z-0 w-full h-full scale-125 -translate-y-6 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  src={vendor.image_link || ""}
                  fill
                />
                {/* Dark Gradient Overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 transition-opacity duration-500 ease-in-out group-hover:from-black/60 group-hover:via-black/70 group-hover:to-black/90" /> */}

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col items-start justify-between sm:p-6 pb-6 p-4 text-white transition-all duration-500 ease-in-out ">
                  {/* Title */}

                  {/* Tagline */}
                  <Link
                    href={vendor.insta_mart}
                    className="mt-2 translate-y-4 text-left text-xs opacity-80 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    Visit store
                  </Link>
                </div>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StoreHeroCarousel;
