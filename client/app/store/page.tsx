"use client";
import SectionHeader from "@/components/store/SectionHeader";
import StoreHero from "@/components/store/StoreLandingPage/StoreHero";
import StoreProductLists from "@/components/store/StoreProductLists";
import StoreTrends from "@/components/store/StoreTrends";
import {
  ArrowLeftCircleIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
  HeartIcon,
  PauseCircleIcon,
  ShoppingBagIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Calendar,
  Card,
  CardBody,
  CardFooter,
  Slider,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { today, getLocalTimeZone } from "@internationalized/date";
import { IoRepeat, IoShuffle } from "react-icons/io5";

export default function StorePage() {
  return (
    <section className="flex items-center flex-col gap-6 sm:pt-0 pt-8">
      <StoreHero />

      {/* Uniport Merch  */}
      <div className="flex w-full sm:flex-row flex-col justify-between items-center gap-4 mb-10 sm:mb-0">
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
            className="rounded-md sm:flex hidden text-sm  items-center gap-1 px-4 py-2 text-white font-semibold bg-primary"
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
          className="rounded-md sm:hidden  text-sm flex items-center gap-1 px-4 py-2 text-white font-semibold bg-primary"
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
      <div className="flex sm:flex-row flex-col items-center sm:justify-between w-full gap-4">
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
              className="rounded-md text-sm flex items-center gap-1 px-4 py-2 text-white font-semibold bg-primary"
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
            className="rounded-md text-sm flex items-center gap-1 px-4 py-2 text-white font-semibold bg-primary"
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
      <div className="flex w-full rounded-md shadow sm:p-8 p-4 sm:flex-row flex-col gap-4 items-center bg-fuchsia-800">
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
            className="rounded-md text-sm sm:flex hidden items-center gap-1 px-4 py-2 text-white font-semibold bg-primary "
          >
            <span>
              <TicketIcon className="size-5" />
            </span>
            <span>Get tickets</span>
          </Link>
        </div>
        <div className="w-[200px]">
          List some events and dates and artist: campus artist and top artist
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
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 bg-green-300 gap-6 md:gap-4 items-center justify-center">
            <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="Album cover"
                className="object-cover"
                height={200}
                width={500}
                // shadow="md"
                src="https://heroui.com/images/album-cover.png"
                // width="100%"
              />
            </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h3 className="font-semibold text-foreground/90">
                    Daily Mix
                  </h3>
                  <p className="text-small text-foreground/80">12 Tracks</p>
                  <h1 className="text-large font-medium mt-2">
                    Frontend Radio
                  </h1>
                </div>
                <Button
                  isIconOnly
                  className="text-default-900/60 data-hover:bg-foreground/10! -translate-y-2 translate-x-2"
                  radius="full"
                  variant="light"
                  // onPress={() => setLiked((v) => !v)}
                >
                  <HeartIcon />
                </Button>
              </div>

              <div className="flex flex-col mt-3 gap-1">
                <Slider
                  aria-label="Music progress"
                  classNames={{
                    track: "bg-default-500/30",
                    thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                  }}
                  color="foreground"
                  defaultValue={33}
                  size="sm"
                />
                <div className="flex justify-between">
                  <p className="text-small">1:23</p>
                  <p className="text-small text-foreground/50">4:32</p>
                </div>
              </div>

              <div className="flex w-full items-center justify-center">
                <Button
                  isIconOnly
                  className="data-hover:bg-foreground/10!"
                  radius="full"
                  variant="light"
                >
                  <IoRepeat className="text-foreground/80" />
                </Button>
                <Button
                  isIconOnly
                  className="data-hover:bg-foreground/10!"
                  radius="full"
                  variant="light"
                >
                  <ArrowLeftCircleIcon />
                </Button>
                <Button
                  isIconOnly
                  className="w-auto h-auto data-hover:bg-foreground/10!"
                  radius="full"
                  variant="light"
                >
                  <PauseCircleIcon className="size-5" />
                </Button>
                <Button
                  isIconOnly
                  className="data-hover:bg-foreground/10!"
                  radius="full"
                  variant="light"
                >
                  <ArrowRightIcon className="size-5" />
                </Button>
                <Button
                  isIconOnly
                  className="data-hover:bg-foreground/10!"
                  radius="full"
                  variant="light"
                >
                  <IoShuffle className="text-foreground/80" />
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
