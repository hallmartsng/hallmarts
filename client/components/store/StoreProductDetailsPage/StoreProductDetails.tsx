"use client";
import React, { useState } from "react";

import { Tab, Tabs } from "@heroui/react";
import ProductOverView from "./ProductOverView";
import ProductReview from "./ProductReview";
import ProductVendorBio from "./ProductVendorBio";
import StoreProductLists from "../StoreProductLists";
import ProductImageGallery from "./ProductImageGallery";
import ProductDescription from "./ProductDescription";
import {
  useGetProductByIdQuery,
  useGetVendorProductsQuery,
} from "@/lib/services/store/product.api";

const StoreProductDetails = ({ productId }: { productId: string }) => {
  const { data, isLoading } = useGetProductByIdQuery(productId);

  const { data: vendorProducts, isLoading: isLoadingVendorProducts } =
    useGetVendorProductsQuery(data?.data.vendor._id || "");

  if (isLoading || !data?.data) {
    return null;
  }

  console.log(data);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex justify-start w-full">
        <h1>
          <strong>{data?.data.title}</strong>{" "}
        </h1>
      </div>
      {/* <div className="flex sm:flex-row flex-col gap-5 item-start w-full justify-between">
        <ProductImageGallery />

        <ProductOverView />
      </div> */}
      <div className="flex lg:flex-row flex-col gap-10 items-start">
        <div className="lg:w-[400px] w-full">
          <ProductImageGallery productImages={data?.data.images || []} />
        </div>
        <ProductOverView data={data?.data} />
        {/* <div className="p-4 w-[200px] text-sm border-gray-300 border-1 rounded-lg sm:flex hidden flex-col gap-5">
          <ul>
            <li>
              <strong>Campus:</strong> {data?.data.vendor.campus}
            </li>
            <li>
              <strong>Department:</strong> {data?.data.vendor.department}
            </li>
          </ul>
          <p> {data?.data.vendor.fname}</p>
        </div> */}
      </div>

      {/* Descriptions and comments  */}
      <div className=" bg-white py-4 rounded-lg shadow flex flex-col gap-4">
        <Tabs aria-label="Tabs variants" variant={"underlined"} color="primary">
          <Tab key="description" title="Description">
            <ProductDescription
              data={{
                description: data.data.description,
                features: data.data.features || [],
                brand: data.data.brand || "",
                colors: data.data.colors || [],
                sizes: data.data.sizes || [],
              }}
            />
          </Tab>
          <Tab key="reviews" title="Reviews">
            <ProductReview />
          </Tab>
          <Tab key="about" title="About Vendor">
            <ProductVendorBio
              data={{
                fName: data.data.vendor.fname,
                department: data.data.vendor.department,
                campus: data.data.vendor.campus,
              }}
            />
          </Tab>
        </Tabs>
      </div>

      {/* More from vendor  */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-left w-full font-semibold ">
            Similar products by {data.data.vendor.fname}
          </h3>
        </div>
        {isLoadingVendorProducts ? (
          "Loading more products ..."
        ) : (
          <StoreProductLists products={vendorProducts?.data || []} />
        )}
      </div>
      {/* More from campus  */}
      <div className="mt-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-left w-full font-semibold ">
            {data.data.vendor.campus} market
          </h3>
        </div>
        {/* <StoreProductLists /> */}
      </div>
    </div>
  );
};

export default StoreProductDetails;
