"use client";

import { motion } from "framer-motion";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

import GlobeNetworkPro from "@/components/GlobeNetworkPro";

const Hero = () => {
  return (
    <section className="flex sm:pt-0 pt-16 sm:flex-row flex-col items-center justify-center gap-4 ">
      <div className="mx-auto max-w-7xl sm:px-0 px-4 flex sm:flex-row flex-col items-center">
        <div className="sm:space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
            Now powering campus vendors
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            Campus stores, <span className="text-primary">connected.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-600 text-lg max-w-lg"
          >
            Hallmarts powers buying and selling across universities — connecting
            vendors, students, and transactions in one seamless network.
          </motion.p>

          <div className="w-full sm:hidden flex flex-col items-center justify-center -mt-20">
            {/* Trust / Stats */}
            <motion.div
              initial={{ opacity: 0, x: 70 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: "linear" }}
              className="flex sm:flex-row flex-col gap-8 text-sm text-gray-400"
            >
              <GlobeNetworkPro />
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-4 sm:pt-2"
          >
            <Button
              as={"a"}
              href="/vendor/auth?tab=signup"
              className="px-3 py-2 bg-primary hover:bg-primary/90 text-white transition rounded-lg font-medium"
            >
              Start selling
            </Button>

            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered"> Explore marketplace</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="whatsapp">
                  <span className="flex gap-2 items-center">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                      />
                    </svg>
                    <span> WhatsApp Channel</span>
                  </span>
                </DropdownItem>
                <DropdownItem key="store">
                  <span className="flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>

                    <span>Store</span>
                  </span>
                </DropdownItem>

                {/* <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  Delete file
                </DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
          </motion.div>
        </div>
        <div className="w-full flex flex-col items-center sm:justify-center">
          <div className="w-full sm:flex hidden">
            <GlobeNetworkPro />
          </div>
          {/* Trust / Stats */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex w-full sm:w-auto mb-20 gap-8 pt-6 text-sm text-gray-400"
          >
            <div>
              <p className="font-semibold text-primary">13+ Campuses</p>
              <p className="text-gray-600">Active network</p>
            </div>
            <div>
              <p className="font-semibold text-primary">₦6 Millions+</p>
              <p className="text-gray-600">Transactions</p>
            </div>
            <div>
              <p className="font-semibold text-primary">87%</p>
              <p className="text-gray-600">Growth</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
