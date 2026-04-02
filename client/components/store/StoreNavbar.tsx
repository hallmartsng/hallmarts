"use client";
import React, { useState } from "react";
import {
  Button,
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
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  StoreCategoryIcons,
  StoreCategoryIconsTypes,
} from "./StoreCategoryIcons";
import { IoExitOutline, IoGridOutline } from "react-icons/io5";
import Logo from "../Logo";

type CategoriesType = {
  title: string;
  title_id: StoreCategoryIconsTypes;
  id: string;
};

const StoreNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="h-20"
    >
      {/* LOGO */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link
            className="flex justify-start -ml-4 sm:-ml-0 items-center gap-1"
            href="/store"
            onClick={closeMenu}
          >
            <Logo />
            <span className="font-extrabold">
              Hall<span className="font-extrabold text-primary">Marts</span>
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* DESKTOP SEARCH */}
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full">
        <SearchBar />
      </NavbarContent>

      {/* DESKTOP RIGHT */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <ul className="flex gap-4 justify-start">
          <NavbarItem className="flex gap-5">
            <Link href={"/store/cart"} className="flex gap-1 items-center">
              <ShoppingBagIcon className="size-5" /> Cart
            </Link>
          </NavbarItem>

          <Dropdown>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
                aria-label="Campus store"
              >
                <UserIcon className="size-5" /> Account
              </Button>
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
              <DropdownItem key="logout" startContent={icons.logout}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ul>
      </NavbarContent>

      {/* MOBILE TOGGLE */}
      <NavbarContent className="sm:hidden basis-1" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      {/* MOBILE MENU */}
      <NavbarMenu>
        <div className="mt-16 flex flex-col gap-2">
          {/* Categories */}
          <ul className="flex flex-col text-sm gap-4">
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

          {/* Bottom Section */}
          <ul className="flex gap-4 justify-start mt-10">
            <NavbarItem className="flex flex-col gap-2">
              <Link
                href={"/store/cart"}
                onClick={closeMenu}
                className="flex gap-1 text-sm items-center"
              >
                <ShoppingBagIcon className="size-4" /> Cart
              </Link>

              <Dropdown>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                    radius="sm"
                    variant="light"
                    aria-label="Campus store"
                  >
                    <UserIcon className="size-5" />
                    Account
                  </Button>
                </DropdownTrigger>

                <DropdownMenu
                  aria-label="ACME features"
                  itemClasses={{ base: "gap-4" }}
                >
                  <DropdownItem
                    key="dashboard"
                    href="/store/dashboard"
                    startContent={icons.dashboard}
                    onClick={closeMenu}
                  >
                    Dashboard
                  </DropdownItem>
                  <DropdownItem
                    key="order"
                    href="/store/dashboard/orders"
                    startContent={icons.order}
                    onClick={closeMenu}
                  >
                    Orders
                  </DropdownItem>
                  <DropdownItem
                    key="profile"
                    href="/store/dashboard/profile"
                    startContent={icons.profile}
                    onClick={closeMenu}
                  >
                    Profile
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    startContent={icons.logout}
                    onClick={closeMenu}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </ul>
        </div>
      </NavbarMenu>

      {/* MOBILE SEARCH */}
      <NavbarContent className="flex sm:hidden w-full absolute text-center top-16 left-0">
        <div className="w-full mx-auto px-2">
          <SearchBar />
        </div>
      </NavbarContent>
    </HeroUINavbar>
  );
};

export default StoreNavbar;
