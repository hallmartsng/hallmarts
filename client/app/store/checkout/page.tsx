"use client";
import React from "react";
import { Switch } from "@heroui/react";
import StoreCheckout from "@/components/store/StoreCheckoutPage/StoreCheckout";

export default function StoreCartPage() {
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <section className="flex items-center flex-col w-full gap-6 sm:pt-0 pt-10 ms:px-0 px-4">
      <div className="sm:w-[1230px] mx-auto w-full gap-5 flex flex-col items-start justify-start">
        <div className="flex justify-start  w-full">
          <div className="flex justify-between items-center sm:w-[870px] w-full">
            <h1 className="font-extrabold text-left sm:text-3xl text-xl">
              Checkout
            </h1>
            <Switch
              isSelected={isSelected}
              className="w-full"
              size="sm"
              onValueChange={setIsSelected}
            >
              Campus address
            </Switch>
          </div>
        </div>
        <StoreCheckout />
      </div>
    </section>
  );
}
