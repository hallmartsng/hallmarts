import React, { Suspense } from "react";

import AuthLayout from "@/components/vendor/authentication/AuthLayout";
import "react-phone-number-input/style.css";
export default function AuthPage() {
  return (
    <Suspense fallback={"loading..."}>
      <AuthLayout page="vendor" />;
    </Suspense>
  );
}
