"use client";
import React from "react";
import StoreCategories from "../StoreCategories";
import StoreHeroCarousel from "./StoreHeroCarousel";

const StoreHero = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="sm:flex hidden">
        <StoreCategories />
      </div>
      <div className="sm:w-[700px] sm:h-[350px] rounded-md">
        <StoreHeroCarousel />
      </div>
      <div className="sm:w-[250px] sm:h-[350px]  rounded-md sm:flex hidden">
        <StoreHeroCarousel />
      </div>
    </div>
  );
};

export default StoreHero;
