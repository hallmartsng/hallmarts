"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

interface FeaturedProjectProps {
  header: string;
  image_link: string;
  category: string;
  filter: string;
}

const FEATURED_PROJECT: FeaturedProjectProps[] = [
  {
    header: "Northside Commerce (Commercial Office - Kaduna)",
    image_link: "https://heroui.com/images/hero-card-complete.jpeg",
    category: "Commercial",
    filter: "smart-homes",
  },
  {
    header: "Warm Nest (Boho homes)",
    image_link: "https://heroui.com/images/hero-card-complete.jpeg",
    category: "home",
    filter: "smart-homes",
  },
  {
    header: "Vintage Barrel (Wine Store)",
    image_link: "https://heroui.com/images/hero-card-complete.jpeg",
    category: "Vintage",
    filter: "smart-homes",
  },
  {
    header: "Project Haven (3 Bed Shortlet)",
    image_link: "https://heroui.com/images/hero-card-complete.jpeg",
    category: "Shortlet",
    filter: "smart-homes",
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
    <div
      className="overflow-hidden sm:w-[700px] w-[20rem] mx-auto"
      ref={emblaRef}
    >
      <div className="flex gap-5">
        {emblaApi &&
          FEATURED_PROJECT.map((project, index) => (
            <div key={index} className=" sm:min-w-full">
              <button
                className={`group relative sm:h-[350px] h-[280px] sm:w-full w-[20rem] overflow-hidden rounded-lg transition`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center " />
                <Image
                  alt="Card example background"
                  className="z-0 w-full h-full scale-125 -translate-y-6 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  src={project.image_link}
                  fill
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 transition-opacity duration-500 ease-in-out group-hover:from-black/60 group-hover:via-black/70 group-hover:to-black/90" />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col items-start justify-between sm:p-6 pb-6 p-4 text-white transition-all duration-500 ease-in-out ">
                  {/* Title */}
                  <h3 className="text-xl text-left leading-tight font-bold capitalize transition-transform duration-500 ease-in-out group-hover:translate-y-2">
                    {project.header}
                  </h3>

                  {/* Tagline */}
                  <p className="mt-2 translate-y-4 text-left text-xs opacity-80 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                    {project.category}
                  </p>
                </div>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StoreHeroCarousel;
