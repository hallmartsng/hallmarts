import ResetPassword from "@/components/vendor/authentication/ResetPassword";
import React, { Suspense } from "react";

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
