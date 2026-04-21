"use client";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@heroui/react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import {
  CalendarIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  StoreCategoryIcons,
  StoreCategoryIconsTypes,
} from "./StoreCategoryIcons";
import { IoExitOutline, IoGridOutline } from "react-icons/io5";
import Logo from "../Logo";
import { useAppSelector } from "@/hooks/useReduxHook";
import { signOut, useSession } from "next-auth/react";

type CategoriesType = {
  title: string;
  title_id: StoreCategoryIconsTypes;
  id: string;
};

const StoreNavbar = () => {
  const cartTotal = useAppSelector((state) => state.cart.totalItems);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data: session } = useSession();

  const closeMenu = () => setIsMenuOpen(false);

  const icons = {
    dashboard: <IoGridOutline className="size-5" />,
    order: <ShoppingBagIcon className="size-5" />,
    profile: <UserIcon className="size-5" />,
    logout: <IoExitOutline className="size-5" />,
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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="h-20"
    >
      {/* MOBILE TOGGLE */}
      <NavbarContent className="sm:hidden basis-1" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      {/* LOGO */}
      <NavbarContent className="basis-1/5 sm:basis-full flex sm:justify-start  justify-center">
        <NavbarBrand
          as="li"
          className="gap-3 sm:max-w-fit  w-full flex justify-center "
        >
          <Link
            className="flex justify-start sm:-ml-0 items-center gap-1"
            href="/store"
            onClick={closeMenu}
          >
            <Logo />
            <span className="font-extrabold sm:flex hidden">
              Hall<span className="font-extrabold text-primary">Marts</span>
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* DESKTOP SEARCH */}
      <div className="hidden sm:flex basis-1/2 ">
        <SearchBar />
      </div>

      {/*  RIGHT */}
      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
        <ul className="flex  gap-5 justify-start">
          <NavbarItem className="flex gap-5 ">
            <Link
              href={"/store/calendar"}
              className="sm:flex hidden gap-1 items-center"
            >
              <CalendarIcon className="size-5" />
            </Link>
            <Link href={"/store/cart"} className="flex gap-1 items-center">
              {mounted && (
                <Badge color="primary" content={cartTotal ?? 0}>
                  <ShoppingBagIcon className="size-5" />
                </Badge>
              )}
            </Link>
          </NavbarItem>

          {/* User Icon  */}
          <Dropdown>
            <DropdownTrigger>
              <button
                className="p-0  data-[hover=true]:bg-transparent"
                aria-label="Campus store"
              >
                <UserIcon className="size-6" />
              </button>
            </DropdownTrigger>

            <DropdownMenu
              aria-label="ACME features"
              itemClasses={{ base: "gap-4" }}
            >
              <DropdownItem
                key="dashboard"
                href="/store/dashboard"
                startContent={icons.dashboard}
              >
                Dashboard
              </DropdownItem>
              <DropdownItem
                key="order"
                href="/store/dashboard/orders"
                startContent={icons.order}
              >
                Orders
              </DropdownItem>
              <DropdownItem
                key="profile"
                href="/store/dashboard/profile"
                startContent={icons.profile}
              >
                Profile
              </DropdownItem>
              <DropdownItem
                onPress={() => {
                  signOut({
                    callbackUrl: "/store/auth",
                  });
                }}
                key="logout"
                startContent={icons.logout}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ul>
      </NavbarContent>

      {/* MOBILE MENU */}
      <NavbarMenu className="w-full">
        <div className="mt-[6rem] w-full flex flex-col gap-2">
          {/* Categories */}
          <ul className="flex flex-col text-sm gap-4 w-full ">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/store/product-list/${category.id}`}
                  onClick={closeMenu}
                  className="flex hover:text-primary items-center gap-2 capitalize"
                >
                  <StoreCategoryIcons value={category.title_id} />
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
          {session?.user.email && (
            <div className=" justify-start mt-3">
              {" "}
              <button
                onClick={() => {
                  signOut({
                    callbackUrl: "/store/auth",
                  });
                }}
                className="bg-primary rounded-md shadow text-white font-semibold text-xs px-3 py-2"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </NavbarMenu>

      {/* MOBILE SEARCH */}
      <NavbarContent className="flex sm:hidden w-full absolute text-center top-[4.5rem] left-0">
        <div className="w-full mx-auto px-2">
          <SearchBar />
        </div>
      </NavbarContent>
    </HeroUINavbar>
  );
};

export default StoreNavbar;
