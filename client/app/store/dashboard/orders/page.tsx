import React from "react";
import StoreProfileOrders from "@/components/store/StoreProfile/StoreProfileOrders";

const Page = () => {
  return (
    <section className="flex items-center flex-col w-full gap-6 sm:pt-0 pt-10 ms:px-0 px-4">
      <div className="sm:w-[1230px] mx-auto w-full gap-5 flex flex-col items-start justify-start">
        <StoreProfileOrders />
      </div>
    </section>
  );
};

export default Page;
