import SectionHeader from "@/components/store/SectionHeader";
import StoreHero from "@/components/store/StoreLandingPage/StoreHero";
import StoreProductLists from "@/components/store/StoreProductListPage/StoreProductLists";
import StoreTrends from "@/components/store/StoreTrends";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import CampusMerch from "@/components/store/CampusMerch";
import { getHomepageFeed } from "@/lib/services/ssr/products.api";
import StoreCalendarBanner from "@/components/store/StoreLandingPage/StoreCalendarBanner";

export default async function StorePage() {
  const products = await getHomepageFeed("campusIdHere"); // SSR fetch
  console.log("products: ", products);

  return (
    <section className="flex items-center flex-col gap-6 sm:pt-0 pt-8">
      <StoreHero />

      {/* Uniport Merch  */}
      <CampusMerch
        headerText={"Steeze : Uniport launched their merch"}
        subHeaderText={"Come in your merch for 2027 Campus THRILL!"}
        headline={"Campus Merch"}
      />

      {/* New Arrival  */}
      <div className="w-full sm:max-w-[1230px] sm:px-0 px-2">
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
      <div className="w-full sm:max-w-[1230px] sm:px-0 px-2">
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
      <div className="w-full sm:max-w-[1230px] sm:px-0 px-2">
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
      <div className="w-full sm:max-w-[1230px] sm:px-0 px-2">
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
      <div className="w-full sm:max-w-[1230px] sm:px-0 px-2">
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
      <div className="flex sm:max-w-[1230px] sm:px-0 px-4  sm:flex-row flex-col items-center sm:justify-between w-full gap-4">
        <div
          className={`group relative flex  sm:h-[350px] h-[380px] w-full overflow-hidden rounded-lg transition`}
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
            src={"/banner.png"}
            alt="Campus weekend"
            className="z-0 w-full h-full scale-125 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            fill
          />
        </div>

        <div className="flex font-honk flex-col gap-4 items-start ">
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
      <div className="w-full sm:max-w-[1230px] sm:px-0 px-2">
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
      <StoreCalendarBanner />
    </section>
  );
}
