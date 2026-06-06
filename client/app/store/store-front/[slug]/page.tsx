import StoreFront from "@/components/vendor/StoreFront";
import React from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function StoreFrontPage({ params }: PageProps) {
  const { slug } = await params;

  console.log("slug: ", slug);

  const vendorId = slug.split("-").pop(); // get last part

  return (
    <section className="flex items-center flex-col w-full gap-6 sm:pt-0 pt-10 ms:px-0 px-4">
      <div className="sm:w-[1230px] mx-auto w-full gap-5 flex flex-col items-start justify-start">
        <StoreFront vendorId={vendorId || ""} />
      </div>
    </section>
  );
}
