import {
  CheckCircleIcon,
  ClockIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const StoreProfileOverview = () => {
  return (
    <section className="w-full flex flex-col gap-10 sm:pt-10 pt-5">
      <div className="flex sm:justify-between sm:flex-row flex-col sm:items-end items-start gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold capitalize">Hi John</h1>
          <p className="text-gray-600 sm:w-[350px]">
            Welcome to your account, you can manage your orders and profile
            details
          </p>
        </div>
        <button className="text-primary font-semibold">Log Out</button>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-10 gap-4 w-full">
        <Link
          href={"/store/dashboard/orders"}
          className="flex bg-white w-full rounded-lg sm:gap-8 gap-5 shadow p-4 items-center"
        >
          <ShoppingBagIcon className="sm:size-20 size-10" />
          <div className="flex flex-col gap-3">
            <h3 className="sm:text-3xl text-lg font-bold uppercase">Orders</h3>
            <div className="flex items-center sm:gap-5 gap-2">
              <span className="bg-amber-200/50 px-2 text-sm rounded-lg w-auto py-1 text-yellow-500 flex items-center gap-1">
                <ClockIcon className="size-5 sm:flex hidden" />
                Pending: 4
              </span>
              <span className="bg-green-200/50 px-2 text-sm rounded-lg w-auto py-1 text-green-500 flex items-center gap-1">
                <CheckCircleIcon className="size-5 sm:flex hidden" />
                Delivered: 10
              </span>
            </div>
          </div>
        </Link>
        <Link
          href={"/store/dashboard/profile"}
          className="flex bg-white w-full rounded-lg sm:gap-8 gap-5 shadow p-4 items-center"
        >
          <UserIcon className="sm:size-20 size-10" />
          <div className="flex flex-col">
            <h3 className="sm:text-3xl text-lg font-bold uppercase">Profile</h3>
            <div className="flex items-center gap-5">
              <p className="text-sm">Manage your profile and password</p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default StoreProfileOverview;
