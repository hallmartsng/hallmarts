import Otp from "@/components/authentication/Otp";
import React, { Suspense } from "react";

const page = () => {
  return (
    <section className="sm:w-[350px] w-full">
      <Suspense fallback={"loading..."}>
        <Otp />
      </Suspense>
    </section>
  );
};

export default page;
