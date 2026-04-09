import React from "react";
import SectionHeader from "./SectionHeader";
import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import StoreProductLists from "./StoreProductLists";
import { ProductRequest } from "@/types/product.types";

interface CampusMerchProps {
  headerText: string;
  subHeaderText: string;
  headline: string;
  products: ProductRequest[];
}
const CampusMerch = ({
  headerText,
  subHeaderText,
  headline,
  products,
}: CampusMerchProps) => {
  return (
    <div className="flex w-full sm:max-w-[1230px] sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mb-10 sm:mb-0">
      <div className="flex font-honk flex-col sm:w-[32rem] gap-4 items-start sm:px-0 px-2">
        <SectionHeader
          props={{
            headline: headline,
            headerText: headerText,
            paragraphText: subHeaderText,
          }}
        />
        <Link
          href={"/"}
          className="rounded-lg sm:flex hidden text-sm  items-center gap-1 px-4 py-2 text-white font-semibold bg-primary"
        >
          <span>
            <ShoppingBagIcon className="size-5" />
          </span>
          <span> Uniport store</span>
        </Link>
      </div>
      <div className="sm:px-0 px-2">
        <StoreProductLists
          gridColsDesktop="sm:grid-cols-4"
          products={products}
        />
      </div>
      <div className="sm:hidden pl-4 flex justify-center w-full mt-10">
        <Link
          href={"/"}
          className="rounded-lg sm:hidden  text-sm flex items-center gap-1 px-4 py-2 text-black shadow font-semibold bg-white"
        >
          <span>
            <ShoppingBagIcon className="size-5" />
          </span>
          <span> Uniport store</span>
        </Link>
      </div>
    </div>
  );
};

export default CampusMerch;
