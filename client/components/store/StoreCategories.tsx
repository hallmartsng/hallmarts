"use client";
import React from "react";
import {
  StoreCategoryIcons,
  StoreCategoryIconsTypes,
} from "./StoreCategoryIcons";
import Link from "next/link";

type CategoriesType = {
  title: string;
  title_id: StoreCategoryIconsTypes;
  id: string;
};
const StoreCategories = () => {
  const [categories, setCategories] = React.useState<CategoriesType[]>();
  const CATEGORIES: CategoriesType[] = [
    {
      title: "phones & tablets",
      title_id: "phones",
      id: "77486554849933773",
    },
    {
      title: "Health & beauty",
      title_id: "health",
      id: "77555554849933773",
    },
    {
      title: "electronics",
      title_id: "electronics",
      id: "775599854849933773",
    },
    {
      title: "fashion",
      title_id: "fashion",
      id: "775599854800933773",
    },
    {
      title: "gaming",
      title_id: "gaming",
      id: "775539354800933773",
    },
    {
      title: "academics",
      title_id: "academics",
      id: "775590954800933773",
    },
  ];
  return (
    <div className="bg-white rounded-md py-4 flex flex-col text-sm  gap-4 font-semibold sm:h-[350px] capitalize sm:w-[250px] w-full">
      <ul className="flex flex-col text-sm  gap-4">
        {CATEGORIES.map((category) => {
          return (
            <li key={category.id}>
              <Link
                href={`/store/product-list/${category.id}`}
                className="flex hover:text-primary items-center gap-1 px-4"
              >
                <StoreCategoryIcons value={category.title_id} />
                {category.title}{" "}
              </Link>
            </li>
          );
        })}
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
