"use client";
import React from "react";
import StoreCategories from "../StoreCategories";
import { Input, NumberInput } from "@heroui/react";
import FilterCampuses from "@/components/FilterCampus";
import StoreFilterForm from "../forms/StoreFilterForm";

const StoreProductsPage = () => {
  return (
    <div className="flex items-center flex-col gap-6">
      <div className="flex gap-14">
        <div className="sm:flex flex-col gap-5 hidden">
          <StoreCategories />
          {/* Vendor */}
          <div className="bg-white rounded-md shadow p-4 w-[250px]">
            {/* Vendor */}
            <Input
              label="Vendor"
              labelPlacement="outside"
              name="vendor"
              placeholder="Enter vendor name"
            />
          </div>
          {/* campus */}
          <div className="bg-white rounded-md shadow p-4 w-[250px]">
            <FilterCampuses isRequired={false} code={"NG"} name={"campus"} />
          </div>
          {/* Budget */}
          <div className="bg-white rounded-md shadow p-4 w-[250px]">
            {/* Budget */}
            <NumberInput
              hideStepper
              type="number"
              label="Budget"
              labelPlacement="outside"
              name="budget"
              formatOptions={{
                style: "currency",
                currency: "NGN",
              }}
              placeholder="Enter product budget"
              min={1500}
              defaultValue={0}
            />
          </div>
        </div>
        <div>
          {" "}
          <div className="flex mb-4 flex-col gap-3 w-full sm:mt-0 mt-5">
            <p>
              120 <strong>results</strong> found for Oraimo{" "}
            </p>
            <div className="flex items-center justify-between">
              <div className="w-full">Filter by:</div>
              <StoreFilterForm />
            </div>
          </div>
          {/*Serch result  */}
          <div>
            {/* <StoreProductLists gridColsDesktop="sm:grid-cols-6" /> */}
          </div>
          <div className="my-5 flex justify-center">
            <button className="bg-white px-4 py-2 rounded-lg shadow text-xs font-semibold">
              Load more products
            </button>
          </div>
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

export default StoreProductsPage;
