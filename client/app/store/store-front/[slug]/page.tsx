import React from "react";
import { Metadata } from "next";

import StoreFront from "@/components/vendor/StoreFront";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Next.js automatically calls this function to build the page <head>
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const vendorId = slug.split("-").pop(); // get last part

  // Fetch your data from an API or database
  const vendor = await fetch(
    `https://hallmarts-api.vercel.app/api/v1/vendor/profile/${vendorId}/public/`,
  ).then((res) => res.json());

  return {
    title: `${vendor.title} | My Store`,
    description: vendor.description,
  };
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
