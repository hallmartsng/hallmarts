"use client";
import React from "react";
import StoreCategories from "../StoreCategories";
import StoreHeroCarousel from "./StoreHeroCarousel";

const StoreHero = () => {
  return (
    <div className="flex relative items-center gap-4 ">
      <div className="sm:flex hidden">
        <StoreCategories />
      </div>
      <div className="sm:w-[700px] w-full relative sm:h-[350px] sm:pl-0 pl-32 rounded-md">
        <StoreHeroCarousel />
      </div>
      <div className="sm:w-[250px] sm:h-[350px]  rounded-md sm:flex hidden">
        <StoreHeroCarousel />
      </div>
    </div>
  );
};

export default StoreHero;
