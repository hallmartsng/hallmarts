"use client";
import React from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

const VendorDashboard = () => {
  return (
    <section className="max-w-7xl py-5">
      {/* Email verification warning  */}
      <div className="flex gap-2 items-start bg-white  rounded-md shadow p-4">
        <div>
          <EnvelopeIcon className="size-10" />
        </div>
        <div className="flex sm:flex-row items-end gap-5  w-full justify-between flex-col">
          <div>
            <h2 className="font-semibold">Verify your email</h2>
            <p className="sm:text-sm text-xs font-medium">
              You are almost done, verify your email to enable you get started
              with sales on Hallmarts.
            </p>
          </div>
          <Button size="sm" className="bg-primary text-white font-medium">
            Verify email
          </Button>
        </div>
      </div>

      {/* Analytics cards  */}
      <div></div>
    </section>
  );
};

export default VendorDashboard;
