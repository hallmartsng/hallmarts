"use client";
import React from "react";

import { Rating } from "react-simple-star-rating";
import { useGetPublicProductsQuery } from "@/lib/services/vendor/products.api";
import { useGetVendorPublicProfileQuery } from "@/lib/services/vendor/vendor.api";
import { Image, Spinner, Tab, Tabs } from "@heroui/react";
import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import StoreProductLists from "../store/StoreProductLists";
import { useSession } from "next-auth/react";

const StoreFront = ({ vendorId }: { vendorId: string }) => {
  const { data: session } = useSession();
  const { data: vendorData, isLoading: isLoadingProfile } =
    useGetVendorPublicProfileQuery(vendorId);
  const { data: productsData, isLoading: isLoadingProducts } =
    useGetPublicProductsQuery(vendorId);
  console.log("productsData: ", productsData);
  return (
    <section className="flex flex-col gap-4">
      <div className="flex sm:items-center items-start gap-4">
        <Image
          alt={vendorData?.data.fname}
          className="sm:w-[150px] object-cover sm:h-[150px] w-16 h-16"
          radius="full"
          shadow="sm"
          src={vendorData?.data.store_logo?.url}
          width="100%"
        />
        <div className="flex flex-col">
          <p className="font-semibold">{vendorData?.data.fname}</p>
          <small>{vendorData?.data.store_name}</small>
          <Rating
            initialValue={1}
            SVGclassName="inline-block size-4"
            readonly
            allowFraction
            // className="size-20"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-sm">{vendorData?.data.store_description}</p>
        <p className="flex items-center gap-1 rounded-lg shadow w-max bg-white py-1 px-1.5">
          <BuildingLibraryIcon className="size-4" />
          <small>{vendorData?.data.campus}</small>
        </p>
      </div>

      <div className=" flex flex-col gap-4">
        <Tabs aria-label="Tabs variants" variant={"underlined"} color="primary">
          <Tab key="products" title="Products">
            {isLoadingProducts ? (
              <Spinner size="sm" variant="spinner" color="white" />
            ) : (
              <StoreProductLists
                products={productsData?.data || []}
                displayActionBtn={session?.user.id === vendorId}
              />
            )}
          </Tab>

          {/* <Tab key="hotSales" title="Hot Sales">
            {isLoadingProducts ? (
              <Spinner size="sm" variant="spinner" color="white" />
            ) : (
              <StoreProductLists products={productsData?.data || []} />
            )}
          </Tab> */}
        </Tabs>
      </div>
    </section>
  );
};

export default StoreFront;
