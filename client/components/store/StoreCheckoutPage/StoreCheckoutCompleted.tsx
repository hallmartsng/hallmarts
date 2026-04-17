"use client";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

const StoreCheckoutCompleted = () => {
  return (
    <div className="sm:max-w-5xl w-full h-full items-center justify-center  flex flex-col gap-4">
      <CheckCircleIcon className="size-20 text-primary" />
      <h1 className="sm:text-4xl text-2xl font-extrabold">
        Order & Payment completed!
      </h1>
      <p>Check your dashboard to view your order.</p>
      <Button
        // onPress={(e) => {
        //   onSubmit(e as React.FormEvent<HTMLFormElement>);
        // }}
        as={"a"}
        href="/store/dashboard/orders"
        className="bg-primary text-white font-semibold"
      >
        My orders
      </Button>
      or
      <Link href={"/store"} className="text-primary font-semibold">
        {" "}
        Continue shopping
      </Link>
    </div>
  );
};

export default StoreCheckoutCompleted;
