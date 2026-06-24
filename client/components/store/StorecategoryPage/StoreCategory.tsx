"use client";
import React from "react";
import StoreCategories from "../StoreCategories";
import { Spinner } from "@heroui/react";
import { useFilterProductsQuery } from "@/lib/services/store/product.api";
import StoreProductLists from "../StoreProductLists";
import StoreFilterForm from "../forms/StoreFilterForm";

const StoreCategory = ({ slug }: { slug: string }) => {
  const { data, isLoading } = useFilterProductsQuery({
    categories: slug ? [slug] : [],
  });
  console.log("data: ", data?.data);

  return (
    <div className="flex items-center flex-col gap-6">
      <div className="flex sm:gap-14">
        <div className="sm:flex flex-col gap-5 hidden">
          <StoreCategories />
        </div>

        {/* Products list  */}
        <div className="w-full sm:w-[920px]">
          {isLoading ? (
            <div className="w-full h-1/2 mt-10 flex flex-col gap-3 items-center justify-center">
              <Spinner size="sm" variant="spinner" color="primary" />
              <small>Loading search results for {slug}</small>
            </div>
          ) : (
            <>
              <div className="flex mb-4 flex-col w-full gap-3 sm:mt-0 mt-5">
                <p>
                  {data?.data.length} <strong>results</strong> found for{" "}
                  {slug}{" "}
                </p>
                <div className="flex items-center justify-between">
                  <div className="w-full">Filter by:</div>
                  <StoreFilterForm />
                </div>
              </div>
              {/*Serch result  */}

              <StoreProductLists
                products={data?.data || []}
                gridColsDesktop="sm:grid-cols-6"
              />

              <div className="my-5 flex justify-center">
                <button className="bg-white px-4 py-2 rounded-lg shadow text-xs font-semibold">
                  Load more products
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Top vendors  */}
      {/* <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-left w-full font-semibold ">Top vendors</h3>
        </div>
        <StoreProductLists />
      </div> */}

      {/* Trendz  */}
      {/* <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-left w-full font-semibold ">Similar trendz</h3>
        </div>
        <StoreProductLists />
      </div> */}

      {/* More products  */}
      {/* <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-left w-full font-semibold ">
            More products from Unilag
          </h3>
        </div>
        <StoreProductLists />
      </div> */}
    </div>
  );
};

export default StoreCategory;
