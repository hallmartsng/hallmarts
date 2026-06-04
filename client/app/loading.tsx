"use client";

import Logo from "@/components/Logo";

export default function Loading() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-5">
        <Logo />
        <p>Loading page...</p>
      </div>
    </div>
  );
}
