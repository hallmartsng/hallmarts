"use client";
import StoreCheckoutCompleted from "@/components/store/StoreCheckoutPage/StoreCheckoutCompleted";
import React from "react";

export default function StoreCartPage() {
  return (
    <section className="flex items-center flex-col w-full gap-6 sm:pt-0 pt-10 ms:px-0 px-4">
      <div className="sm:w-[1230px] mx-auto pt-20 w-full gap-5 flex flex-col items-center justify-start">
        <StoreCheckoutCompleted />
      </div>
    </section>
  );
}
