"use client";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
  ChatBubbleBottomCenterIcon,
  CheckCircleIcon,
  ClockIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Alert, Select, SelectItem } from "@heroui/react";
import React, { useState } from "react";
import { IoCloseCircleOutline, IoMail } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import DashboardHeader from "./DashboardHeader";
import LineChart from "@/components/charts/LineChart";
import Link from "next/link";
import { useSession } from "next-auth/react";

const DashboardOverview = () => {
  const { data: session } = useSession();
  const [filterBy, setFilterBy] = useState<"daily" | "weekly" | "monthly">(
    "weekly",
  );

  const chartData = {
    daily: {
      labels: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM"],
      series: [
        {
          name: "Sales",
          data: [2000, 5000, 3000, 7000, 4000, 6000],
        },
      ],
    },

    weekly: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        {
          name: "Sales",
          data: [5000, 7000, 4000, 9000, 3000, 8000, 6000],
        },
      ],
    },

    monthly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      series: [
        {
          name: "Sales",
          data: [20000, 35000, 28000, 40000],
        },
      ],
    },
  };
  const filters = [
    { key: "daily", label: "Daily" },
    { key: "weekly", label: "Weekly" },
    { key: "monthly", label: "Monthly" },
  ];

  return (
    <section className="max-w-7xl py-5">
      <div className="flex flex-col gap-4">
        {" "}
        <Alert
          icon={<IoMail className="size-4" />}
          color={"warning"}
          title={`You are almost done, verify your email to get started with sales
              on Hallmarts.`}
          endContent={
            <button>
              <ArrowRightIcon className="size-4" />
            </button>
          }
        />
        {/* Greetings  */}
        <DashboardHeader
          header={`Welcome ${session?.user.name ? session?.user.name : "Vendor"} 👋`}
          subHeader="Here’s what’s happening in your campus store today."
        />
        {/* Analytics cards  */}
        <div className="grid sm:grid-cols-4 grid-cols-1 gap-4">
          {/* Sales card  */}
          <div className="flex items-center bg-white rounded-lg p-4 shadow justify-between">
            <div className="flex flex-col">
              <ChartBarIcon className="size-6 text-success" />
              <p className="sm:text-3xl font-semibold">₦25,000</p>
              <small>Total Revenue</small>
            </div>
            <div className="flex flex-col gap-2">
              <span className="flex bg-success-50 rounded-lg text-success px-2 py-1 gap-1 items-center text-sm">
                <ArrowUpIcon className="size-4" />
                <span>+5%</span>
              </span>
            </div>
          </div>
          {/* Orders card  */}
          <div className="flex items-center bg-white rounded-lg p-4 shadow justify-between">
            <div className="flex flex-col">
              <ShoppingBagIcon className="size-6" />
              <p className="sm:text-3xl font-semibold">10</p>
              <small>All orders</small>
            </div>
            <div className="flex flex-col gap-2">
              <span className="flex bg-success-50 rounded-lg text-success px-2 py-1 gap-1 items-center text-sm">
                <CheckCircleIcon className="size-4" />
                <span className="sm:text-sm text-xs">Completed:</span>
                <span>5</span>
              </span>
              <span className="flex bg-warning-50 rounded-lg text-warning px-2 py-1 gap-1 items-center text-sm">
                <ClockIcon className="size-4" />
                <span className="sm:text-sm text-xs">Pending:</span>
                <span>3</span>
              </span>
              <span className="flex bg-primary-50 rounded-lg text-primary px-2 py-1 gap-1 items-center text-sm">
                <IoCloseCircleOutline className="size-4" />
                <span className="sm:text-sm text-xs">Cancelled:</span>
                <span>2</span>
              </span>
            </div>
          </div>
          {/* Products card  */}
          <div className="flex items-center bg-white rounded-lg p-4 shadow justify-between">
            <div className="flex flex-col">
              <AiOutlineProduct className="size-6" />
              <p className="sm:text-3xl font-semibold">26</p>
              <small>All products</small>
            </div>
            <div className="flex flex-col gap-2">
              <span className="flex bg-success-50 rounded-lg text-success px-2 py-1 gap-1 items-center text-sm">
                <CheckCircleIcon className="size-4" />
                <span className="sm:text-sm text-xs">Approved:</span>
                <span>5</span>
              </span>

              <span className="flex bg-primary-50 rounded-lg text-primary px-2 py-1 gap-1 items-center text-sm">
                <IoCloseCircleOutline className="size-4" />
                <span className="sm:text-sm text-xs">Declined:</span>
                <span>2</span>
              </span>
            </div>
          </div>

          {/* Customers card  */}
          <div className="flex items-center bg-white rounded-lg p-4 shadow justify-between">
            <div className="flex flex-col">
              <UsersIcon className="size-6" />
              <p className="sm:text-3xl font-semibold">7</p>
              <small>Customers reached</small>
            </div>
            <div className="flex flex-col gap-2">
              <span className="flex gap-1 items-center text-sm">
                <span className="sm:text-sm text-xs">Inbound:</span>
                <span>5</span>
              </span>

              <span className="flex items-center gap-1 text-sm">
                <span className="sm:text-sm text-xs">Outbound:</span>
                <span>2</span>
              </span>
            </div>
          </div>
        </div>
        {/* Sales Analytics + Top Products (Split Layout)  */}
        <div className="w-full flex sm:flex-row flex-col gap-4">
          <div className="w-full bg-white rounded-lg sm:p-4 shadow">
            <div className="w-full flex justify-between items-center p-4">
              <h4 className="sm:text-2xl font-bold text-medium">
                Sales Overview
              </h4>
              <Select
                className="sm:w-[200px] w-[120px] capitalize"
                defaultSelectedKeys={["all"]}
                aria-label="Filter sales chart"
                items={filters}
                selectedKeys={[filterBy]}
                //   startContent={"Location:"}
                onChange={(e) =>
                  setFilterBy(
                    (e.target.value as "weekly") || "monthly" || "daily",
                  )
                }
              >
                {filters.map((filter) => (
                  <SelectItem key={filter.key} className=" capitalize">
                    {filter.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <LineChart
              labels={chartData[filterBy].labels}
              series={chartData[filterBy].series}
            />
          </div>

          {/* Top Seeling Products  */}
          <div className="bg-white rounded-lg p-4 shadow sm:w-[500px] w-full">
            <h4 className="sm:text-2xl font-bold text-medium">
              Top Selling Products
            </h4>
            <p>Track your sold products and supply more</p>
            <ul className="list-decimal  flex flex-col gap-2 mt-4 bg-gray-50 rounded-lg p-4">
              <li className="border-b-1 text-sm pl-8 border-gray-200 pb-2">
                Sneakers : 12
              </li>
              <li className="border-b-1 text-sm pl-8 border-gray-200 pb-2">
                Hoodie : 6
              </li>
              <li className="border-b-1 text-sm pl-8 border-gray-200 pb-2">
                Cap : 14
              </li>
            </ul>
          </div>
        </div>
        {/* Performance update and calendar  */}
        <div className="w-full flex sm:flex-row flex-col gap-4">
          <div className="flex flex-col gap-4">
            {/* Perfomance Update  */}
            <div className="bg-white rounded-lg p-4 shadow sm:w-[400px] w-full">
              <h4 className="sm:text-2xl font-bold text-medium">
                Perfomance Update
              </h4>
              <p>
                You're up <strong className="text-success">%5</strong> this
                week. Orders are increasing steadily.
              </p>
            </div>
            {/* Recent Activities  */}
            <div className="bg-white rounded-lg p-4 shadow sm:w-[400px] w-full">
              <h4 className="sm:text-2xl font-bold text-medium">
                Recent Activities
              </h4>
              <p className="text-sm">Track your orders and comments here</p>
              <ul className=" flex flex-col gap-2 mt-3 rounded-lg ">
                <li className="border-b-1 flex items-center gap-2 text-sm border-gray-200 pb-2">
                  <ShoppingBagIcon className="size-4" /> <span>New order </span>
                </li>
                <li className="border-b-1 flex items-center gap-2 text-sm border-gray-200 pb-2">
                  <ChatBubbleBottomCenterIcon className="size-4" />{" "}
                  <span>New comment on product </span>
                </li>
                <li className="border-b-1 flex items-center gap-2 text-sm border-gray-200 pb-2">
                  <AiOutlineProduct className="size-4" />{" "}
                  <span>
                    Product <strong>Sneakers</strong> is live!
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Campus calendar  */}
          <div className="bg-white rounded-lg p-4 shadow sm:w-[500px] w-full">
            <h4 className="sm:text-2xl font-bold text-medium">
              Campus Calendar
            </h4>
            <p className="mb-3 text-sm">
              Working with campus calendar helps your business to provide
              products based on campus events.
            </p>
            <ul className="flex flex-col gap-3 text-sm relative overflow-y-scroll h-[200px] pb-5">
              <Link href={"/campus/events"}>
                <li className="flex justify-between items-center shadow rounded-lg p-4">
                  <span className="flex gap-1">
                    <span className="font-semibold">University of Lagos:</span>
                    <span className="sm:w-auto w-20 truncate">
                      Faculty of Engineering week
                    </span>
                  </span>

                  <ArrowRightIcon className="size-4 text-primary" />
                </li>
              </Link>
              <Link href={"/campus/events"}>
                <li className="flex justify-between items-center shadow rounded-lg p-4">
                  <span className="flex gap-1">
                    <span className="font-semibold">Covenant University:</span>
                    <span className="sm:w-auto w-20 truncate">
                      College week
                    </span>
                  </span>

                  <ArrowRightIcon className="size-4 text-primary" />
                </li>
              </Link>
              <Link href={"/campus/events"}>
                <li className="flex justify-between items-center shadow rounded-lg p-4">
                  <span className="flex gap-1">
                    <span className="font-semibold">Nile University:</span>
                    <span className="sm:w-auto w-20 truncate">
                      Customer week
                    </span>
                  </span>

                  <ArrowRightIcon className="size-4 text-primary" />
                </li>
              </Link>
            </ul>
          </div>

          {/*  Campus reached  */}
          <div className="bg-white rounded-lg p-4 shadow sm:w-[400px] w-full">
            <h4 className="sm:text-2xl font-bold text-medium">
              Campus Reached
            </h4>
            <p className="text-sm">
              Insight on campuses that love your products
            </p>
            <ul className=" flex flex-col gap-2 mt-3 rounded-lg ">
              <li className=" flex items-center gap-2 text-sm  pb-2">
                <BuildingLibraryIcon className="size-4" />{" "}
                <span>Babcock University </span>
              </li>
              <li className=" flex items-center gap-2 text-sm  pb-2">
                <BuildingLibraryIcon className="size-4" />{" "}
                <span>Landmark University </span>
              </li>
              <li className=" flex items-center gap-2 text-sm  pb-2">
                <BuildingLibraryIcon className="size-4" />{" "}
                <span>University of bening</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardOverview;
