"use client";
import React from "react";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@heroui/react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  StoreCategoryIcons,
  StoreCategoryIconsTypes,
} from "./StoreCategoryIcons";

type CategoriesType = {
  title: string;
  title_id: StoreCategoryIconsTypes;
  id: string;
};
const StoreNavbar = () => {
  const icons = {
    delivery: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    ),
    marketing: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
        />
      </svg>
    ),
    blogs: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
        />
      </svg>
    ),
  };
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
    <HeroUINavbar maxWidth="xl" position="sticky" shouldHideOnScroll>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link className="flex justify-start items-center gap-1" href="/store">
            {/* <Logo /> */}
            <span className="font-extrabold">
              Hall<span className="font-extrabold text-primary">Marts</span>
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full">
        <SearchBar />
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <ul className="flex gap-4 justify-start">
          <NavbarItem className="flex gap-5">
            <Link href={"/store/cart"} className="flex gap-1 items-center">
              <ShoppingBagIcon className="size-5" /> Cart
            </Link>
            <Link href={"/"} className="flex gap-1 items-center">
              <UserIcon className="size-5" /> Account
            </Link>
          </NavbarItem>
        </ul>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mt-16 flex flex-col gap-2">
          <ul className="flex flex-col text-sm gap-4">
            {CATEGORIES.map((category) => {
              return (
                <li key={category.id}>
                  <Link
                    href={`/store/product-list/${category.id}`}
                    className="flex hover:text-primary items-center gap-1"
                  >
                    <StoreCategoryIcons value={category.title_id} />
                    {category.title}{" "}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="flex gap-4 justify-start mt-10">
            <NavbarItem className="flex flex-col gap-2">
              <Link href={"/store/cart"} className="flex gap-1 items-center">
                <ShoppingBagIcon className="size-4" /> Cart
              </Link>
              <Link href={"/"} className="flex gap-1 items-center">
                <UserIcon className="size-4" /> Account
              </Link>
            </NavbarItem>
          </ul>
        </div>
      </NavbarMenu>

      <NavbarContent className="flex sm:hidden w-full absolute text-center top-14  left-0">
        <div className="w-full mx-auto px-2">
          <SearchBar />
        </div>
      </NavbarContent>
    </HeroUINavbar>
  );
};

export default StoreNavbar;
