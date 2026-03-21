"use client";
import SectionHeader from "@/components/store/SectionHeader";
import StoreHero from "@/components/store/StoreLandingPage/StoreHero";
import StoreProductLists from "@/components/store/StoreProductLists";
import StoreTrends from "@/components/store/StoreTrends";
import {
  ArrowRightIcon,
  BookmarkIcon,
  CalendarDaysIcon,
  ShoppingBagIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { Calendar } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { today, getLocalTimeZone } from "@internationalized/date";

export default function StorePage() {
  return (
    <section className="flex items-center flex-col gap-6 sm:pt-0 pt-8">
      <StoreHero />

      {/* Uniport Merch  */}
      <div className="flex w-full max-w-[1230px] sm:flex-row flex-col justify-between items-center gap-4 mb-10 sm:mb-0">
        <div className="flex font-honk flex-col sm:w-[32rem] gap-4 items-start sm:px-0 px-4">
          <SectionHeader
            props={{
              headline: "Campus Merch",
              headerText: "Steeze : Uniport launched their merch",
              paragraphText: " Come in your merch for 2027 Campus THRILL!",
            }}
          />
          <Link
            href={"/"}
            className="rounded-lg sm:flex hidden text-sm  items-center gap-1 px-4 py-2 text-white font-semibold bg-primary"
          >
            <span>
              <ShoppingBagIcon className="size-5" />
            </span>
            <span> Uniport store</span>
          </Link>
        </div>
        <StoreProductLists gridColsDesktop="sm:grid-cols-4" />
        <Link
          href={"/"}
          className="rounded-lg sm:hidden  text-sm flex items-center gap-1 px-4 py-2 text-white font-semibold bg-primary"
        >
          <span>
            <ShoppingBagIcon className="size-5" />
          </span>
          <span> Uniport store</span>
        </Link>
      </div>

      {/* New Arrival  */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-left w-full font-semibold ">Food & provisions</h3>
          <Link
            href={"/store"}
            className="w-[70px] text-primary font-semibold flex items-center gap-1"
          >
            <span>More</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
        <StoreProductLists />
      </div>

      {/* Campus trendz  */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-left w-full font-semibold ">Campus Trendz</h3>
          <Link
            href={"/store"}
            className="w-[70px] text-primary font-semibold flex items-center gap-1"
          >
            <span>More</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
        <StoreTrends />
      </div>

      {/* New Arrival  */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-left w-full font-semibold ">New Arrival</h3>
          <Link
            href={"/store"}
            className="w-[70px] text-primary font-semibold flex items-center gap-1"
          >
            <span>More</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
        <StoreProductLists />
      </div>

      {/* Campus female  */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-left w-full font-semibold ">Campus Female</h3>
          <Link
            href={"/store"}
            className="w-[70px] text-primary font-semibold flex items-center gap-1"
          >
            <span>More</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
        <StoreProductLists />
      </div>

      {/* Campus discount  */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-left w-full font-semibold ">Campus Discount</h3>
          <Link
            href={"/store"}
            className="w-[70px] text-primary font-semibold flex items-center gap-1"
          >
            <span>More</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
        <StoreProductLists />
      </div>

      {/* Unilag week  */}
      <div className="flex max-w-[1230px] sm:flex-row flex-col items-center sm:justify-between w-full gap-4">
        <div
          className={`group relative flex  sm:h-[350px] h-[380px] sm:w-full w-[20rem] overflow-hidden rounded-lg transition`}
        >
          <div className="absolute z-10 h-full w-full sm:w-1/2 flex flex-col justify-center gap-4 items-start p-4 sm:p-8">
            <h1 className="font-honk text-white font-extrabold text-5xl">
              This Weekend
            </h1>

            <p className="font-bold  text-white">
              With semester & session calendars, you stay active every campus
              week for hot deals.
            </p>
            <Link
              href={"/"}
              className="rounded-lg text-sm flex items-center gap-1 px-4 py-2 text-white font-semibold bg-primary"
            >
              <span>
                <CalendarDaysIcon className="size-5" />
              </span>
              <span>Check calendar</span>
            </Link>
          </div>
          <Image
            src={"https://heroui.com/images/hero-card-complete.jpeg"}
            alt="Campus weekend"
            className="z-0 w-full h-full scale-125 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            fill
          />
        </div>

        <div className="flex font-honk flex-col gap-4 items-start sm:px-0 px-4">
          <SectionHeader
            props={{
              headline: "Campus Events!",
              headerText: "Campus Week : Unilag this Friday",
              paragraphText:
                "Join unilag campus sales this week for the best deals!",
            }}
          />
          <Link
            href={"/"}
            className="rounded-lg text-sm flex items-center gap-1 px-4 py-2 text-white font-semibold bg-primary"
          >
            <span>
              <ShoppingBagIcon className="size-5" />
            </span>
            <span> Unilag store</span>
          </Link>
        </div>
      </div>

      {/* Holiday   */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-left w-full font-semibold ">
            What&apos;s for Holiday?
          </h3>
          <Link
            href={"/store"}
            className="w-[70px] text-primary font-semibold flex items-center gap-1"
          >
            <span>More</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
        <StoreProductLists />
      </div>

      {/* Calendar  */}
      <div className="flex w-full max-w-[1230px] rounded-md shadow sm:p-8 p-4 sm:flex-row flex-col gap-10 justify-between  items-center bg-fuchsia-800">
        <div className="sm:w-[800px] w-full flex flex-col sm:items-start items-center gap-4">
          <div className="flex font-honk text-white flex-col gap-4 items-start sm:px-0 px-4">
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
        <div className="w-full flex  flex-col items-end">
          <div className="grid grid-cols-2 gap-x-2 gap-y-7">
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
                    src="https://heroui.com/images/hero-card-complete.jpeg"
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
              <div className="flex flex-col gap-1 text-white">
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
                    src="https://heroui.com/images/hero-card-complete.jpeg"
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
              <div className="flex flex-col gap-1 text-white">
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
                    src="https://heroui.com/images/hero-card-complete.jpeg"
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
              <div className="flex flex-col gap-1 text-white">
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
                    src="https://heroui.com/images/hero-card-complete.jpeg"
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
              <div className="flex flex-col gap-1 text-white">
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

          <Link
            href={"/"}
            className="rounded-md text-sm mt-4 flex sm:hidden items-center gap-1 px-4 py-2 text-black font-semibold bg-primary-50 "
          >
            <span>
              <TicketIcon className="size-5" />
            </span>
            <span>Get tickets</span>
          </Link>
        </div>
        {/* <Card isFooterBlurred className="border-none" radius="lg">
          <Image
            alt="Woman listing to music"
            className="object-cover"
            height={200}
            src="https://heroui.com/images/hero-card.jpeg"
            width={200}
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-white/80">Available soon.</p>
            <Button
              className="text-tiny text-white bg-black/20"
              color="default"
              radius="lg"
              size="sm"
              variant="flat"
            >
              Notify me
            </Button>
          </CardFooter>
        </Card> */}
      </div>
    </section>
  );
}
