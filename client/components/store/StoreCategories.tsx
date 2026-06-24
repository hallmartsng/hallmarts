"use client";
import React from "react";
import { StoreCategoryIcons } from "./StoreCategoryIcons";
import Link from "next/link";

import {
  useGetCategoriesQuery,
  useGetCategorySummaryQuery,
} from "@/lib/services/store/categories.api";
import { Spinner } from "@heroui/react";

const StoreCategories = () => {
  const { data, isLoading } = useGetCategorySummaryQuery();
  return (
    <div className="bg-white rounded-md py-4 flex flex-col text-sm  gap-4 font-semibold sm:h-[350px] capitalize sm:w-[250px] w-full">
      <ul className="flex flex-col text-sm  gap-4">
        {isLoading ? (
          <Spinner size="sm" variant="spinner" color="primary" />
        ) : (
          data?.data.map((category) => {
            return (
              <li key={category._id}>
                <Link
                  href={`/store/category/${category.title}`}
                  className="flex hover:text-primary items-center gap-1 px-4"
                >
                  <StoreCategoryIcons value={category.icon} />
                  {category.title} [{category.productCount}]
                </Link>
              </li>
            );
          })
        )}
      </ul>

      <Link href={"/store"} className="px-4 flex items-center gap-1">
        {" "}
        <StoreCategoryIcons value={"bid"} /> <span>bid & swap</span>
        <small className="text-xs text-white bg-blue-500 rounded-md px-2 py-1">
          Coming soon
        </small>
      </Link>
    </div>
  );
};

export default StoreCategories;
