import React, { Suspense } from "react";
import ResetPassword from "@/components/authentication/ResetPassword";

const page = () => {
  return (
    <section className="sm:w-[350px] w-full">
      <Suspense fallback={"loading..."}>
        <ResetPassword />
      </Suspense>
    </section>
  );
};

export default page;
