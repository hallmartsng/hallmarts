"ue client";
import React from "react";
import {
  BuildingLibraryIcon,
  MinusIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { Button } from "@heroui/react";

const ProductOverView = () => {
  return (
    <div className="sm:w-1/2 flex flex-col gap-5 items-start">
      <div className="w-full flex sm:flex-row flex-col sm:items-center items-start gap-3 justify-between">
        <p className="text-primary font-semibold">Fashion</p>
        <div className="flex items-center gap-1 bg-white rounded-lg shadow px-4 py-2 w-auto">
          <BuildingLibraryIcon className="sm:size-5 size-4" />
          <span className="text-sm">: Babcock university</span>
        </div>
      </div>
      {/* product name  */}
      <h1 className="sm:text-3xl font-extrabold">Nike Sportware</h1>
      {/* price  */}
      <div>
        <p className="text-gray-600 font-semibold">$45.00</p>
        <h1 className="sm:text-5xl text-3xl font-extrabold">$35.00</h1>
      </div>
      {/* Description text  */}
      <p>
        Made with your favourite high-end mid-rise pants in mind. This cropped
        hoddie is a perfectly cozy option for everyday wear. The curved
        overlovked stitched and ribbed panels at the hem put a fresh spin on
        this layering staple.
      </p>

      {/* vendor details  */}
      <p className="flex items-center gap-2 sm:-mb-0 -mb-3">
        <UserIcon className="size-5" /> <span>Mercy Anulla</span>
      </p>
      <Link
        href={"/store/product/123"}
        className="flex text-primary items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>{" "}
        <span>merc_wears</span>
      </Link>

      {/* Sizes  */}
      <div>
        <p className="font-semibold">Sizes</p>
        <div className="flex gap-2 items-center">
          <span className="w-10 h-10 font-semibold rounded-lg bg-white flex items-center justify-center p-2">
            SM
          </span>
          <span className="w-10 h-10 font-semibold rounded-lg bg-white flex items-center justify-center p-2">
            MD
          </span>
          <span className="w-10 h-10 font-semibold rounded-lg bg-white flex items-center justify-center p-2">
            LG
          </span>
        </div>
      </div>

      {/* quantity */}
      <div>
        <p className="font-semibold mb-1">Quantity</p>
        <div className="flex items-center gap-2">
          <button className="px-2 py-2 bg-white rounded-lg">
            <MinusIcon className="size-5" />
          </button>
          <span>3</span>
          <button className="px-2 py-2 bg-white rounded-lg">
            <PlusIcon className="size-5" />
          </button>
        </div>
      </div>
      {/* Buy now  */}
      <Button className="bg-primary text-white sm:w-auto w-full font-semibold">
        Buy now
      </Button>
    </div>
  );
};

export default ProductOverView;
