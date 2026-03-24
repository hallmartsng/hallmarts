"use client";
import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import { Button, useDisclosure } from "@heroui/react";
import useDebounce from "@/hooks/useDebounceHook";
import { PlusIcon } from "@heroicons/react/24/outline";
import CampusCalendar from "@/components/CampusCalendar";
import CampusCalendarModal from "@/components/CampusCalendarModal";

const DashboardCalendar = () => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [search, setSearch] = React.useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  return (
    <section className="sm:max-w-7xl w-full py-5">
      <div className="flex w-full flex-col gap-4">
        {" "}
        <div className="flex sm:flex-row flex-col gap-4 sm:items-center items-end justify-between w-full">
          <DashboardHeader
            header="Campus Calendar"
            subHeader="Plan your sales, deliveries, and campus activities."
          />
          <Button
            onPress={() => {
              onOpen();
            }}
            className="bg-primary text-white font-semibold"
          >
            <PlusIcon className="size-4" /> <span>Add Event</span>
          </Button>
        </div>
        <CampusCalendar />
      </div>
      <CampusCalendarModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </section>
  );
};

export default DashboardCalendar;
