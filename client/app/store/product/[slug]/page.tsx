import StoreProductDetails from "@/components/store/StoreProductDetailsPage/StoreProductDetails";
import React from "react";

interface PageProps {
  params: {
    slug: string;
  };
}
export default function ProductPage({ params }: PageProps) {
  const { slug } = params;
  const productId = slug.split("-").pop(); // get last part

  return (
    <section className="flex items-center flex-col w-full gap-6 sm:pt-0 pt-10 ms:px-0 px-4">
      <div className="sm:w-[1230px] mx-auto w-full gap-5 flex flex-col items-start justify-start">
        <StoreProductDetails productId={productId || ""} />
      </div>
    </section>
  );
}
