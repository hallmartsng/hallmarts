"use client";
import React, { useState } from "react";

import { Tab, Tabs } from "@heroui/react";
import ProductOverView from "./ProductOverView";
import ProductReview from "./ProductReview";
import ProductVendor from "./ProductVendor";
import StoreProductLists from "../StoreProductLists";
import ProductImageGallery from "./ProductImageGallery";
import ProductDescription from "./ProductDescription";

const StoreProductDetails = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex justify-start w-full">
        <h1>
          Product details: <strong>Nike Sportware</strong>{" "}
        </h1>
      </div>
      {/* <div className="flex sm:flex-row flex-col gap-5 item-start w-full justify-between">
        <ProductImageGallery />

        <ProductOverView />
      </div> */}
      <div className="flex lg:flex-row flex-col gap-10 items-start">
        <div className="lg:w-[400px] w-full">
          <ProductImageGallery />
        </div>
        <ProductOverView />
        <div className="p-4 w-[200px] text-sm border-gray-300 border-1 rounded-lg sm:flex hidden flex-col gap-5">
          <ul>
            <li>
              <strong>Campus:</strong> Babcock univeristy
            </li>
            <li>
              <strong>Department:</strong> Sociology
            </li>
          </ul>
          <p>
            {" "}
            Mercy Anulla is a student of Babcock univeristy, in the department
            of Sociology, that provides quality fashion pieces for campus
            students at affordable prices.
          </p>
        </div>
      </div>

      {/* Descriptions and comments  */}
      <div className=" bg-white py-4 rounded-lg shadow flex flex-col gap-4">
        <Tabs aria-label="Tabs variants" variant={"underlined"} color="primary">
          <Tab key="description" title="Description">
            <ProductDescription />
          </Tab>
          <Tab key="reviews" title="Reviews">
            <ProductReview />
          </Tab>
          <Tab key="about" title="About Vendor">
            <ProductVendor />
          </Tab>
        </Tabs>
      </div>

      {/* More from vendor  */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-left w-full font-semibold ">
            Similar products by Mercy Annulla
          </h3>
        </div>
        <StoreProductLists />
      </div>
      {/* More from campus  */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-left w-full font-semibold ">Babcock market</h3>
        </div>
        <StoreProductLists />
      </div>
    </div>
  );
};

export default StoreProductDetails;
