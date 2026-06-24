"use client";
import React from "react";
import StoreCategories from "../StoreCategories";
import { Form, Input, NumberInput, Spinner } from "@heroui/react";
import FilterCampuses from "@/components/FilterCampus";
import StoreFilterForm from "../forms/StoreFilterForm";
import useDebounce from "@/hooks/useDebounceHook";
import { useFilterProductsQuery } from "@/lib/services/store/product.api";
import StoreProductLists from "../StoreProductLists";

const StoreProductsPage = ({ slug }: { slug: string }) => {
  const [search, setSearch] = React.useState<string>(slug);
  const [vendor, setVendor] = React.useState("");
  const [campus, setCampus] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [minPrice, setMinPrice] = React.useState<number | undefined>();
  const [maxPrice, setMaxPrice] = React.useState<number | undefined>();
  const debouncedSearch = useDebounce(search, 900);
  const { data, isLoading, isFetching } = useFilterProductsQuery({
    search: debouncedSearch,
    campus,
    categories: category ? [category] : [],
    minPrice,
    maxPrice,
    limit: 10,
  });

  return (
    <div className="flex items-center flex-col gap-6">
      <div className="flex sm:gap-14">
        <div className="sm:flex flex-col gap-5 hidden">
          <StoreCategories />

          <Form
            className=""
            onReset={() => console.log("Form reset")}
            onSubmit={() => {
              console.log("form submitted");
            }}
          >
            {/* Vendor */}
            <div className="bg-white rounded-md shadow p-4 w-[250px]">
              {/* Vendor */}
              <Input
                label="Vendor"
                labelPlacement="outside"
                name="vendor"
                placeholder="Enter vendor name"
                value={vendor}
                onValueChange={setVendor}
              />
            </div>
            {/* campus */}
            <div className="bg-white rounded-md shadow p-4 w-[250px]">
              <FilterCampuses isRequired={false} code={"NG"} name={"campus"} />
            </div>

            {/* Budget */}
            <div className="bg-white rounded-md shadow p-4 w-[250px]">
              <NumberInput
                hideStepper
                label="Min Price"
                labelPlacement="outside"
                placeholder="Min price"
                onValueChange={(val) => setMinPrice(Number(val))}
              />
            </div>

            <div className="bg-white rounded-md shadow p-4 w-[250px]">
              <NumberInput
                hideStepper
                label="Max Price"
                labelPlacement="outside"
                placeholder="Max price"
                onValueChange={(val) => setMaxPrice(Number(val))}
              />
            </div>
          </Form>
        </div>

        {/* Products list  */}
        <div className="w-full sm:w-[920px]">
          {isLoading || isFetching ? (
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

export default StoreProductsPage;
