"use client";
import React from "react";

import { today, getLocalTimeZone } from "@internationalized/date";
import SectionHeader from "../SectionHeader";
import { Calendar } from "@heroui/react";
import {
  BookmarkIcon,
  CalendarDaysIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

const StoreCalendarBanner = () => {
  return (
    <div className="flex w-full sm:max-w-[1230px] rounded-md sm:shadow sm:p-8 mt-10  sm:flex-row flex-col gap-10 justify-between  items-center sm:bg-fuchsia-950">
      <div className="sm:w-[800px] w-full flex flex-col sm:items-start items-center gap-4">
        <div className="flex font-honk sm:text-white flex-col gap-4 items-start sm:px-0 px-4">
          <SectionHeader
            props={{
              headline: "Campus Events!",
              headerText: "We celebrate : After a long semester!",
              paragraphText:
                "Don't miss the next campus event, check your campus calendar",
            }}
          />
        </div>
        <Calendar
          isReadOnly
          aria-label="Date (Read Only)"
          value={today(getLocalTimeZone())}
          className="hidden sm:flex"
          visibleMonths={3}
        />
        <Calendar
          isReadOnly
          aria-label="Date (Read Only)"
          value={today(getLocalTimeZone())}
          className="sm:hidden flex"
          // visibleMonths={3}
        />
        <Link
          href={"/"}
          className="rounded-lg text-sm sm:flex hidden items-center gap-1 px-4 py-2  font-semibold bg-primary-50"
        >
          <span>
            <TicketIcon className="size-5" />
          </span>
          <span>Get tickets</span>
        </Link>
      </div>
      <div className="w-full flex  flex-col sm:items-end">
        <div className="grid grid-cols-2 sm:px-0 px-2 gap-x-2 gap-y-7">
          <div className="flex flex-col gap-2">
            <div className="min-w-[50%] h-[150px] sm:min-w-[45%]">
              <button
                className={`group relative h-full  w-full overflow-hidden rounded-lg transition`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center " />
                <Image
                  alt="Card example background"
                  className="z-0 w-full h-full scale-125 -translate-y-6 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  src="/banner.png"
                  fill
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 transition-opacity duration-500 ease-in-out group-hover:from-black/60 group-hover:via-black/70 group-hover:to-black/90" />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col items-start p-4 justify-between  text-white transition-all duration-500 ease-in-out ">
                  {/* Title */}
                  <h3 className="text-xl text-left leading-tight font-bold capitalize transition-transform duration-500 ease-in-out group-hover:translate-y-2">
                    Summer Body
                  </h3>

                  {/* Tagline */}
                  <p className=" text-left text-xs opacity-80 transition-all duration-500 ease-in-out group-hover:-translate-y-2 group-hover:opacity-100">
                    Gold stone
                  </p>
                </div>
              </button>
            </div>
            <div className="flex flex-col gap-1 sm:text-white">
              <span className="flex items-center gap-1">
                <CalendarDaysIcon className="size-4" />
                <span className="text-xs font-semibold">Nov 20, 2026</span>
              </span>
              <span className="flex items-center gap-1">
                <BookmarkIcon className="size-4" />
                <span className="text-xs font-semibold">
                  University of Abuja
                </span>
              </span>
              <span className="flex items-center gap-1">
                <TicketIcon className="size-4" />
                <span className="text-xs font-semibold">#3,500</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="min-w-[50%] h-[150px] sm:min-w-[45%]">
              <button
                className={`group relative h-full  w-full overflow-hidden rounded-lg transition`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center " />
                <Image
                  alt="Card example background"
                  className="z-0 w-full h-full scale-125 -translate-y-6 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  src="/banner.png"
                  fill
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 transition-opacity duration-500 ease-in-out group-hover:from-black/60 group-hover:via-black/70 group-hover:to-black/90" />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col items-start p-4 justify-between  text-white transition-all duration-500 ease-in-out ">
                  {/* Title */}
                  <h3 className="text-xl text-left leading-tight font-bold capitalize transition-transform duration-500 ease-in-out group-hover:translate-y-2">
                    Summer Body
                  </h3>

                  {/* Tagline */}
                  <p className=" text-left text-xs opacity-80 transition-all duration-500 ease-in-out group-hover:-translate-y-2 group-hover:opacity-100">
                    Gold stone
                  </p>
                </div>
              </button>
            </div>
            <div className="flex flex-col gap-1 sm:text-white">
              <span className="flex items-center gap-1">
                <CalendarDaysIcon className="size-4" />
                <span className="text-xs font-semibold">Nov 20, 2026</span>
              </span>
              <span className="flex items-center gap-1">
                <BookmarkIcon className="size-4" />
                <span className="text-xs font-semibold">
                  University of Abuja
                </span>
              </span>
              <span className="flex items-center gap-1">
                <TicketIcon className="size-4" />
                <span className="text-xs font-semibold">#3,500</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="min-w-[50%] h-[150px] sm:min-w-[45%]">
              <button
                className={`group relative h-full  w-full overflow-hidden rounded-lg transition`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center " />
                <Image
                  alt="Card example background"
                  className="z-0 w-full h-full scale-125 -translate-y-6 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  src="/banner.png"
                  fill
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 transition-opacity duration-500 ease-in-out group-hover:from-black/60 group-hover:via-black/70 group-hover:to-black/90" />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col items-start p-4 justify-between  text-white transition-all duration-500 ease-in-out ">
                  {/* Title */}
                  <h3 className="text-xl text-left leading-tight font-bold capitalize transition-transform duration-500 ease-in-out group-hover:translate-y-2">
                    Summer Body
                  </h3>

                  {/* Tagline */}
                  <p className=" text-left text-xs opacity-80 transition-all duration-500 ease-in-out group-hover:-translate-y-2 group-hover:opacity-100">
                    Gold stone
                  </p>
                </div>
              </button>
            </div>
            <div className="flex flex-col gap-1 sm:text-white">
              <span className="flex items-center gap-1">
                <CalendarDaysIcon className="size-4" />
                <span className="text-xs font-semibold">Nov 20, 2026</span>
              </span>
              <span className="flex items-center gap-1">
                <BookmarkIcon className="size-4" />
                <span className="text-xs font-semibold">
                  University of Abuja
                </span>
              </span>
              <span className="flex items-center gap-1">
                <TicketIcon className="size-4" />
                <span className="text-xs font-semibold">#3,500</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="min-w-[50%] h-[150px] sm:min-w-[45%]">
              <button
                className={`group relative h-full  w-full overflow-hidden rounded-lg transition`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center " />
                <Image
                  alt="Card example background"
                  className="z-0 w-full h-full scale-125 -translate-y-6 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  src="/banner.png"
                  fill
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 transition-opacity duration-500 ease-in-out group-hover:from-black/60 group-hover:via-black/70 group-hover:to-black/90" />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col items-start p-4 justify-between  text-white transition-all duration-500 ease-in-out ">
                  {/* Title */}
                  <h3 className="text-xl text-left leading-tight font-bold capitalize transition-transform duration-500 ease-in-out group-hover:translate-y-2">
                    Summer Body
                  </h3>

                  {/* Tagline */}
                  <p className=" text-left text-xs opacity-80 transition-all duration-500 ease-in-out group-hover:-translate-y-2 group-hover:opacity-100">
                    Gold stone
                  </p>
                </div>
              </button>
            </div>
            <div className="flex flex-col gap-1 sm:text-white">
              <span className="flex items-center gap-1">
                <CalendarDaysIcon className="size-4" />
                <span className="text-xs font-semibold">Nov 20, 2026</span>
              </span>
              <span className="flex items-center gap-1">
                <BookmarkIcon className="size-4" />
                <span className="text-xs font-semibold">
                  University of Abuja
                </span>
              </span>
              <span className="flex items-center gap-1">
                <TicketIcon className="size-4" />
                <span className="text-xs font-semibold">#3,500</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full py-5">
          <Link
            href={"/"}
            className="rounded-md text-sm mt-4 flex sm:hidden items-center gap-1 px-4 py-2 text-white font-semibold bg-primary "
          >
            <span>
              <TicketIcon className="size-5" />
            </span>
            <span>Get tickets</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreCalendarBanner;
